from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from databases import Database
from models import Base

DATABASE_URL = "mysql://root:Admin%40123@localhost:3306/rakshdata"


# SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# FastAPI async database connection
database = Database(DATABASE_URL)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

