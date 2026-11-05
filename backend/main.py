import json
import subprocess

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ram's portfolio")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        f"http://{host}:{port}"
        for host in ("localhost", "127.0.0.1")
        for port in (3000, 5173)
    ],
    allow_methods=["GET"],
)

QUERY = """
query {
  user(login: "rammohanrediee") {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}
"""
LEVELS = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"]


@app.get("/api/github/contributions")
def contributions():
    try:
        result = subprocess.run(
            ["gh", "api", "--hostname", "github.com", "--cache", "1h", "graphql", "-f", f"query={QUERY}"],
            capture_output=True, text=True, check=True, timeout=12,
        )
        user = json.loads(result.stdout)["data"]["user"]
        calendar = user["contributionsCollection"]["contributionCalendar"]
        weeks = []
        for week in calendar["weeks"]:
            days = [None] * 7
            for day in week["contributionDays"]:
                days[day["weekday"]] = {
                    "date": day["date"],
                    "count": day["contributionCount"],
                    "level": LEVELS.index(day["contributionLevel"]),
                }
            weeks.append(days)
        return {"total": calendar["totalContributions"], "weeks": weeks}
    except (OSError, subprocess.SubprocessError, KeyError, TypeError, ValueError, IndexError) as exc:
        raise HTTPException(503, "GitHub contributions are temporarily unavailable.") from exc
