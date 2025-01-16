import os
from dotenv import load_dotenv
from pymongo import AsyncMongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

_client = AsyncMongoClient(MONGODB_URI)
bbb_db = _client["bbb25"]