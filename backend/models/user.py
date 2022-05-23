from datetime import datetime

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field
from typing import List, Optional

from .objectid import PydanticObjectId
from flask_login import UserMixin


class Rating(BaseModel):
    article_id: int
    grade: int

    def to_bson(self):
        data = self.dict(by_alias=True, exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id", None)
        return data


class View(BaseModel):
    article_id: int
    n_view: int

    def to_bson(self):
        data = self.dict(by_alias=True, exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id", None)
        return data


class User(UserMixin, BaseModel):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    user_id: int
    name: str
    login: str
    password: Optional[str]
    ratings: List[Rating] = []
    views: List[View] = []

    recommended_articles: List[int] = []

    date_added: Optional[datetime] = datetime.utcnow()
    date_updated: Optional[datetime] = datetime.utcnow()

    def to_json(self):
        return jsonable_encoder(self, exclude_none=True)

    def to_bson(self):
        data = self.dict(by_alias=True, exclude_none=True)
        if data.get("_id") is None:
            data.pop("_id", None)
        return data


