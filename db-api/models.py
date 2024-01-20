from pydantic import BaseModel, Field
from pydantic.functional_validators import BeforeValidator

from typing import Optional
from typing_extensions import Annotated

PyObjectId = Annotated[str, BeforeValidator(str)]


class House(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    CRIM: float = Field(...)
    ZN: float = Field(...)
    INDUS: float = Field(...)
    CHAS: int = Field(...)
    NOX: float = Field(...)
    RM: float = Field(...)
    AGE: float = Field(...)
    DIS: float = Field(...)
    RAD: int = Field(...)
    TAX: float = Field(...)
    PTRATIO: float = Field(...)
    B: float = Field(...)
    LSTAT: float = Field(...)
    MEDV: float = Field(...)
