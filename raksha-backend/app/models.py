from sqlalchemy import Column, Integer, String, DECIMAL, Date, TIMESTAMP,Float,DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column

Base = declarative_base()

class SupportMetric(Base):
    __tablename__ = "support_metrics"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(50), nullable=False)
    average_response_time = Column(Float)
    csat_score = Column(Float)
    ces_score = Column(Float)
    nps_score = Column(Float)
    promoters_percentage = Column(Float)
    passives_percentage = Column(Float)
    detractors_percentage = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class KPIData(Base):
    __tablename__ = "kpi_data"
    
    id = Column(Integer, primary_key=True, index=True)
    period = Column(String(50))
    revenue = Column(DECIMAL(15, 2))
    target_revenue = Column(DECIMAL(15, 2))
    revenue_per_customer = Column(DECIMAL(10, 2))
    target_revenue_per_customer = Column(DECIMAL(10, 2))
    customers = Column(Integer)
    target_customers = Column(Integer)
    acquisition_cost = Column(DECIMAL(10, 2))
    target_acquisition_cost = Column(DECIMAL(10, 2))
    promoters_percentage = Column(DECIMAL(5, 2))
    passives_percentage = Column(DECIMAL(5, 2))
    detractors_percentage = Column(DECIMAL(5, 2))
    due_date = Column(Date)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)