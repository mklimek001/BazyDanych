from datetime import datetime, timedelta

from pymongo import MongoClient
import dotenv
import os

import numpy as np
import pandas as pd
from scipy import sparse
from scipy.sparse.linalg import svds


class Recommendations:
    def __init__(self, user_ids, article_ids):
        self.users = {user_ids[i]: i for i in range(len(user_ids))}
        self.user_ids = user_ids
        self.articles = {article_ids[i]: i for i in range(len(article_ids))}
        self.article_ids = article_ids

        self.df = pd.DataFrame(columns=['user_id', 'article_id', 'score'])
        self.matrix = None
        self.article_features = None
        self.user_features = None

    def add_user_score(self, user_id, article_id, score):
        self.df.loc[len(self.df)] = [user_id, article_id, score]

    def get_avg_score(self, per=None):
        if per is None:
            return self.df.score.mean()
        elif per == 'user':
            groupby_col = 'user_id'
        elif per == 'article':
            groupby_col = 'article_id'
        else:
            raise ValueError('per must be one of: user, article or None')

        return self.df.groupby(groupby_col).mean()['score'].to_dict()

    def build_matrix(self):
        self.df['user_no'] = self.df['user_id'].map(self.users)
        self.df['article_no'] = self.df['article_id'].map(self.articles)

        self.matrix = sparse.coo_matrix(
            (self.df.score, (self.df.user_no, self.df.article_no)),
            shape=(len(self.users), len(self.articles)),
            dtype=np.float32).tocsr()

    def build_svd(self, k=5):
        u, s, vt = svds(self.matrix, k)

        v_norms = np.linalg.norm(vt.T, axis=1, keepdims=True)
        v_norms[v_norms == 0] = 1
        self.article_features = vt.T / v_norms

        u_norms = np.linalg.norm(u, axis=1, keepdims=True)
        u_norms[u_norms == 0] = 1
        self.user_features = u / u_norms

    def get_user_recommendations(self, user_id, n=10, unseen_only=True):
        user_no = self.users[user_id]
        user_features = self.user_features[user_no]

        matches = self.article_features @ user_features
        if unseen_only:
            unseen = self.matrix[user_no].toarray().flatten() == 0
            matches = matches[unseen]

        rec_article_nos = np.argsort(-matches)[:n]

        return [self.article_ids[x] for x in rec_article_nos]


if __name__ == '__main__':
    # init db connection
    dotenv.load_dotenv()
    client = MongoClient(os.environ["FLASK_MONGO_URI"])
    db = client.get_default_database()
    users = db.get_collection("users")
    articles = db.get_collection("articles")
    interactions = db.get_collection("interactions")

    # Init the recommender
    user_ids = [user['user_id'] for user in users.find()]
    article_ids = [article['article_id'] for article in articles.find()]
    R = Recommendations(user_ids, article_ids)

    # load all users' ratings
    scores = interactions.aggregate( [
    { "$match": { "date_start": {"$gt": datetime.utcnow() - timedelta(days=40)}}},
    { "$project": {"interactions": "$interactions"} },
    { "$unwind": "$interactions" },
    { "$group": {
        "_id": {
            "user_id":"$interactions.user_id",
            "article_id":"$interactions.article_id"
        },
        "score": {"$sum": 1 }
    } }
    ])
    for score in scores:
        user_id = score["_id"]['user_id']
        article_id = score["_id"]['article_id']
        R.add_user_score(user_id, article_id, score["score"])

    # build
    R.build_matrix()
    R.build_svd(k=6)

    # get recommendations for each user and save to db
    for user_id in user_ids:
        rec_articles = R.get_user_recommendations(user_id, n=30)
        users.update_one(
            {"user_id": user_id},
            {"$set": {
                "recommended_articles": rec_articles
            }},
        )


