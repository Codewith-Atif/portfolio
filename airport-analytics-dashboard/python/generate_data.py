"""Generate a reproducible synthetic flight-level airport operations dataset."""
from __future__ import annotations
import csv, random
from datetime import date, timedelta
from pathlib import Path

random.seed(42)
OUT = Path(__file__).resolve().parents[1] / "data" / "airport_operations.csv"
AIRLINES = [("IndiGo",186),("Air India",180),("Vistara",188),("SpiceJet",174),("Akasa Air",189)]
ROUTES = ["DEL-BOM","DEL-BLR","DEL-HYD","DEL-CCU","DEL-GOI","DEL-PNQ","DEL-LKO","DEL-JAI"]
TERMINALS = ["T1","T2","T3"]
CAUSES = ["None","Weather","Air Traffic","Late Aircraft","Crew","Technical"]

def build_rows(days=45, flights_per_day=34):
    start=date(2026,1,1); rows=[]; flight_no=1000
    for d in range(days):
        current=start+timedelta(days=d)
        weekend=current.weekday()>=5
        for _ in range(flights_per_day):
            airline,capacity=random.choice(AIRLINES); route=random.choice(ROUTES); terminal=random.choices(TERMINALS,[.27,.29,.44])[0]
            hour=random.choices(range(5,24),[2,3,5,8,9,8,6,5,6,7,8,9,8,7,6,5,4,3,2])[0]
            weather=random.choices([0,1],[.9,.1])[0]; base=max(0,random.gauss(8,12)); delay=round(base+weather*random.randint(18,65))
            cause="None" if delay<=15 else random.choices(CAUSES[1:],[.18,.22,.31,.11,.18])[0]
            demand=random.uniform(.69,.98)+(0.025 if weekend else 0); passengers=min(capacity,round(capacity*demand))
            security=round(max(4,random.gauss(11+(5 if hour in [8,9,18,19] else 0)+(2 if terminal=="T3" else 0),3)),1)
            baggage=round(max(8,random.gauss(17+(delay*.035),4)),1)
            satisfaction=round(max(2.5,min(5,4.65-delay*.012-security*.025+random.uniform(-.25,.25))),1)
            rows.append([current.isoformat(),f"{airline[:2].upper()}{flight_no}",airline,route,terminal,f"{hour:02d}:{random.choice([0,15,30,45]):02d}",capacity,passengers,delay,cause,security,baggage,satisfaction])
            flight_no+=1
    return rows

def main():
    OUT.parent.mkdir(parents=True,exist_ok=True)
    header=["date","flight_id","airline","route","terminal","scheduled_departure","seat_capacity","passengers","departure_delay_min","delay_cause","security_wait_min","baggage_delivery_min","satisfaction_score"]
    with OUT.open("w",newline="",encoding="utf-8") as f:
        w=csv.writer(f); w.writerow(header); w.writerows(build_rows())
    print(f"Created {OUT}")

if __name__=="__main__": main()
