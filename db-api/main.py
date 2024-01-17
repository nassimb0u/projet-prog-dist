from contextlib import asynccontextmanager

from fastapi import FastAPI, Body, status, Query
from dotenv import dotenv_values
from pymongo import MongoClient

from typing import List

from models import House


config = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    config["env"] = dotenv_values(".env")
    mongodb_client = MongoClient(config["env"]["MONGODB_CONNECTION_URI"])
    config["db"] = mongodb_client[config["env"]["DB_NAME"]]
    yield
    mongodb_client.close()


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post(
    "/houses",
    response_description="create a house record",
    status_code=status.HTTP_201_CREATED,
    response_model=House,
)
def create_house(house: House = Body(...)):
    new_house = config["db"]["houses"].insert_one(
        house.model_dump(by_alias=True, exclude=["id"])
    )
    created_house = config["db"]["houses"].find_one({"_id": new_house.inserted_id})

    return created_house


@app.get("/houses", response_description="list houses", response_model=List[House])
def show_houses(
    page_size: int | None = Query(default=10, ge=1),
    page_num: int | None = Query(default=1, ge=1),
):
    skips = page_size * (page_num - 1)
    houses = config["db"]["houses"].find().skip(skips).limit(page_size)
    return houses
