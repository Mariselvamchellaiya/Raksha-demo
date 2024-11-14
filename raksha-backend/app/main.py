from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import List
import jwt
from passlib.context import CryptContext
from services.database import database, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
import schemas
import logging
from models import User
from pydantic import BaseModel
from passlib.context import CryptContext
from models import KPIData
from schemas import KPIDataSchema

# Create a Pydantic model for the login request
class LoginRequest(BaseModel):
    username: str
    password: str


# CORS configuration
origins = [
    "http://16.170.215.225/",
    "http://16.170.215.225",
    "http://16.170.215.225/*",
    "http://localhost:5173",
    "http://localhost:5174",  # React development server
    "http://localhost",  # If you plan to run your React app on localhost without a port
]

# FastAPI initialization
app = FastAPI()

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # React app's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allowing all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allowing all headers
)

# Set up logging
logging.basicConfig(level=logging.INFO)

# Initialize the password context for hashing passwords using bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Login endpoint to validate username and password
@app.post("/login")
async def login_user(login: LoginRequest, db: Session = Depends(get_db)):
    # Fetch the user from the database based on the username
    db_user = db.query(User).filter(User.username == login.username).first()

    # Check if user exists
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="User not found"
        )

    # Compare the password directly
    if login.password != db_user.password:  # Direct comparison of plain text passwords
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Incorrect password"
        )

    return {"message": "Login successful", "username": db_user.username}

# Endpoint to get all KPI data
@app.get("/kpi-data", response_model=List[KPIDataSchema])
def read_kpi_data(db: Session = Depends(get_db)):
    return db.query(KPIData).all()


# Connect to the database when the app starts
@app.on_event("startup")
async def startup():
    await database.connect()

# Disconnect from the database when the app shuts down
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Endpoint to get average response time
@app.get("/metrics/average-response-time", response_model=schemas.SupportMetricsResponse)
async def get_average_response_time():
    try:
        query = """
        SELECT AVG(average_response_time) as average_response_time
        FROM support_metrics
        WHERE timestamp >= NOW() - INTERVAL 30 DAY
        """
        result = await database.fetch_one(query=query)
        if not result:
            raise HTTPException(status_code=404, detail="No data found")
        return result
    except Exception as e:
        logging.error(f"Error fetching average response time: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Endpoint to get Customer Satisfaction Score (CSAT)
@app.get("/metrics/csat", response_model=schemas.SupportMetricsResponse)
async def get_csat_score():
    try:
        query = """
        SELECT AVG(csat_score) as csat_score
        FROM support_metrics
        WHERE timestamp >= NOW() - INTERVAL 30 DAY
        """
        result = await database.fetch_one(query=query)
        if not result:
            raise HTTPException(status_code=404, detail="No data found")
        return result
    except Exception as e:
        logging.error(f"Error fetching CSAT score: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Endpoint to get Customer Effort Score (CES)
@app.get("/metrics/ces", response_model=schemas.SupportMetricsResponse)
async def get_ces_score():
    try:
        query = """
        SELECT AVG(ces_score) as ces_score
        FROM support_metrics
        WHERE timestamp >= NOW() - INTERVAL 30 DAY
        """
        result = await database.fetch_one(query=query)
        if not result:
            raise HTTPException(status_code=404, detail="No data found")
        return result
    except Exception as e:
        logging.error(f"Error fetching CES score: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Endpoint to get Net Promoter Score (NPS)
@app.get("/metrics/nps", response_model=schemas.SupportMetricsResponse)
async def get_nps_score():
    try:
        query = """
        SELECT AVG(nps_score) as nps_score
        FROM support_metrics
        WHERE timestamp >= NOW() - INTERVAL 30 DAY
        """
        result = await database.fetch_one(query=query)
        if not result:
            raise HTTPException(status_code=404, detail="No data found")
        return result
    except Exception as e:
        logging.error(f"Error fetching NPS score: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Endpoint to get satisfaction breakdown (Promoters, Passives, Detractors)
@app.get("/metrics/breakdown", response_model=schemas.SupportMetricsResponse)
async def get_satisfaction_breakdown():
    try:
        query = """
        SELECT AVG(promoters_percentage) as promoters_percentage,
               AVG(passives_percentage) as passives_percentage,
               AVG(detractors_percentage) as detractors_percentage
        FROM support_metrics
        WHERE timestamp >= NOW() - INTERVAL 30 DAY
        """
        result = await database.fetch_one(query=query)
        if not result:
            raise HTTPException(status_code=404, detail="No data found")
        return result
    except Exception as e:
        logging.error(f"Error fetching satisfaction breakdown: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Endpoint to get data trends over time (for line charts)
@app.get("/metrics/trends", response_model=List[schemas.SupportMetricsResponse])
async def get_metrics_trends():
    try:
        query = """
        SELECT timestamp, average_response_time, csat_score
        FROM support_metrics
        WHERE timestamp >= NOW() - INTERVAL 6 MONTH
        ORDER BY timestamp
        """
        results = await database.fetch_all(query=query)
        if not results:
            raise HTTPException(status_code=404, detail="No data found")
        return results
    except Exception as e:
        logging.error(f"Error fetching metrics trends: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
