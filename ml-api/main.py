from typing import Annotated

from fastapi import Body, FastAPI
from pydantic import BaseModel

from joblib import load
import pandas as pd


app = FastAPI()

model = load("./boston_housing_lin_model.joblib")


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
    pred_request = pred_request.dict()
    features = pd.json_normalize({"LSTAT": pred_request["LSTAT"], "RM": pred_request["RM"]})
    predictions = model.predict(features)
    return {"price": round(predictions[0]*1000, 2), "saved":pred_request["save"]}
