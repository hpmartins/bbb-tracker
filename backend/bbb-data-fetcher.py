import asyncio
from datetime import datetime
import json
import re
from typing import Dict, Optional

import aiohttp
from aiohttp import ClientSession

from apscheduler import AsyncScheduler
from apscheduler.triggers.cron import CronTrigger

from defaults import PARTICIPANTES_BBB
from database import bbb_db



def log(text: str):
    """Logs the given text with a timestamp."""
    print(f"[{datetime.now().strftime('%H:%M:%S')}] [bbb-stats] {text}")


async def fetch_data(session: ClientSession, name: str) -> Optional[Dict]:
    """Fetches participant data from the website."""
    url = f"https://gshow.globo.com/realities/bbb/bbb-25/participantes/{name}/"
    try:
        async with session.get(url) as response:
            text = await response.text()
            text = text.replace("\n", "").replace("  ", " ")
            
            # found2 = re.findall(
            #     r'<script type="text/javascript">([\s\S]*?)</script>', text
            # )
            # for match in found2:
            #     if "window.mosaicodata" not in match:
            #         continue
            #     mosaico_data_string = match.split("data = ")[1].rstrip(';')
            #     mosaico_json = json.loads(mosaico_data_string)
            #     print(mosaico_json)

            found = re.findall(
                r'<script id="bstn-launcher-bundle">([\s\S]*?)</script>', text
            )
            if found:
                script_search = re.findall(r"\({([\s\S]*?)}\)", found[0])
                if "specialItems" in script_search[-1]:
                    json_string = "{" + script_search[-1].split(", {lazy")[0]
                    data = json.loads(json_string)
                    participant_data = data["specialItems"][0]["externalData"]
                    modified = participant_data.pop("modified")

                    return {
                        "_id": {
                            "name": name,
                            "modified_at": datetime.fromisoformat(modified).replace(tzinfo=None),
                        },
                        "created_at": datetime.now(),
                        "data": participant_data,
                    }
    except aiohttp.ClientError as e:
        log(f"Error fetching data for {name}: {e}")
    return None


async def check_eliminado(name: str) -> bool:
    """Checks if the participant has been eliminated."""
    data = (
        await bbb_db["participants"].find({"_id.name": name})
        .sort("_id.modified_at", -1)
        .to_list(length=1)
    )
    if data and data[0].get("eliminado"):
        return True
    return False


async def get_last_modified(name: str) -> datetime:
    """Gets the last modified date for the participant."""
    data = (
        await bbb_db["participants"].find({"_id.name": name})
        .sort("_id.modified_at", -1)
        .to_list(length=1)
    )
    if data:
        return data[0]["_id"]["modified_at"]
    return datetime.min


async def update_participant(session: ClientSession, name: str):
    """Updates the participant data in the database."""
    # if await check_eliminado(name):
    #     return

    data = await fetch_data(session, name)
    last_modified = await get_last_modified(name)
    if data and data["_id"]["modified_at"] > last_modified:
        log(f"Adding new data for {name}")
        await bbb_db["participants"].insert_one(data)


async def update_all():
    """Updates data for all participants."""
    log("Updating all participants...")
    async with aiohttp.ClientSession() as session:
        tasks = [update_participant(session, name) for name in PARTICIPANTES_BBB]
        await asyncio.gather(*tasks)

async def main():
    """Main function to schedule and run the updates."""
    await update_all()
    
    async with AsyncScheduler() as scheduler:
        await scheduler.add_schedule(update_all, CronTrigger.from_crontab('*/20 * * * *'))
        await scheduler.run_until_stopped()

if __name__ == "__main__":
    asyncio.run(main())
