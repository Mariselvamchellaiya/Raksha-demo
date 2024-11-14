from pydantic import BaseModel
from typing import Optional,List
from datetime import datetime,date

class SupportMetricsResponse(BaseModel):
    average_response_time: Optional[float] = None
    csat_score: Optional[float] = None
    ces_score: Optional[float] = None
    nps_score: Optional[float] = None
    promoters_percentage: Optional[float] = None
    passives_percentage: Optional[float] = None
    detractors_percentage: Optional[float] = None
    timestamp: Optional[datetime] = None

    class Config:
        orm_mode = True

class KPIDataSchema(BaseModel):
    id: int
    period: str
    revenue: float
    target_revenue: float
    revenue_per_customer: float
    target_revenue_per_customer: float
    customers: int
    target_customers: int
    acquisition_cost: float
    target_acquisition_cost: float
    promoters_percentage: float
    passives_percentage: float
    detractors_percentage: float
    due_date: Optional[datetime] = None
    created_at: Optional[datetime] = None  # Allow null values

    class Config:
        orm_mode = True