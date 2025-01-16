import os
from dotenv import load_dotenv
from pymongo import AsyncMongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")

_client = AsyncMongoClient(MONGO_URI)
DB = _client[MONGO_DB]