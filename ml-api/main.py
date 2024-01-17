from typing import Annotated
from contextlib import asynccontextmanager
import json

from fastapi import Body, FastAPI
from pydantic import BaseModel
from dotenv import dotenv_values

from joblib import load
import pandas as pd

import requests


config = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    config["model"] = load("./boston_housing_lin_model.joblib")
    config["env"] = dotenv_values(".env")
    yield


app = FastAPI(lifespan=lifespan)


class PredRequest(BaseModel):
    CRIM: float
    ZN: float
    INDUS: float
    CHAS: int
    NOX: float
    RM: float
    AGE: float
    DIS: float
    RAD: int
    TAX: float
    PTRATIO: float
    B: float
    LSTAT: float
    save: bool


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/predict-price")
async def predict_price(pred_request: Annotated[PredRequest, Body(embed=True)]):
    pred_request = pred_request.model_dump()
    features = pd.json_normalize(
        {"LSTAT": pred_request["LSTAT"], "RM": pred_request["RM"]}
    )
    prediction = config["model"].predict(features)[0]
    pred_request["MEDV"] = round(prediction * 1000, 2)
    save = pred_request.pop("save")
    if save:
        headers = {"Content-Type": "application/json"}
        response = requests.request(
            "POST",
            f'{config["env"]["DB_API_URL"]}/houses',
            headers=headers,
            data=json.dumps(pred_request),
        )
        response.raise_for_status()
    return {"MEDV": pred_request["MEDV"], "saved": save}
