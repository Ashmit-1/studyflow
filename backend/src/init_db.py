from src.database import Base, engine
from src import models 
from src.models import AITable

Base.metadata.create_all(bind=engine)

print("Tables created successfully")