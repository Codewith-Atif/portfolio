"""Clean, validate and summarize airport operational data."""
from pathlib import Path
import pandas as pd

ROOT=Path(__file__).resolve().parents[1]
INPUT=ROOT/"data"/"airport_operations.csv"
OUTPUT=ROOT/"data"/"kpi_summary.csv"

def main():
    df=pd.read_csv(INPUT,parse_dates=["date"])
    numeric=["seat_capacity","passengers","departure_delay_min","security_wait_min","baggage_delivery_min","satisfaction_score"]
    df[numeric]=df[numeric].apply(pd.to_numeric,errors="coerce")
    df=df.dropna(subset=["date","flight_id","airline"])
    df["on_time"]=df["departure_delay_min"].le(15)
    df["load_factor"]=df["passengers"].div(df["seat_capacity"]).clip(0,1)
    assert df["flight_id"].is_unique, "flight_id must be unique"
    assert df["load_factor"].between(0,1).all(), "invalid load factor"
    summary=pd.DataFrame({"metric":["Flights","Passengers","On-time performance","Average delay","Load factor","Average security wait"],"value":[len(df),int(df.passengers.sum()),df.on_time.mean(),df.departure_delay_min.mean(),df.load_factor.mean(),df.security_wait_min.mean()]})
    summary.to_csv(OUTPUT,index=False)
    print(summary.to_string(index=False)); print(f"\nSaved {OUTPUT}")

if __name__=="__main__": main()
