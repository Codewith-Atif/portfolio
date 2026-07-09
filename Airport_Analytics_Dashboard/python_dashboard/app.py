import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="Airport Analytics Dashboard", layout="wide")

df = pd.read_csv("../data/airport_data.csv")

st.title("✈️ Airport Analytics Dashboard")

airport = st.sidebar.multiselect(
    "Select Airport",
    df["Airport"].unique(),
    default=list(df["Airport"].unique())
)

filtered = df[df["Airport"].isin(airport)]

col1, col2, col3, col4 = st.columns(4)

col1.metric("Passengers", int(filtered.Passengers.sum()))
col2.metric("Flights", int(filtered.Flights.sum()))
col3.metric("Avg Delay", round(filtered.Delay_Minutes.mean(),2))
col4.metric("Airlines", filtered.Airline.nunique())

st.subheader("Passenger Flow Trend")
fig = px.line(
    filtered,
    x="Date",
    y="Passengers",
    color="Airport",
    markers=True
)
st.plotly_chart(fig, use_container_width=True)

st.subheader("Airline Performance")
bar = px.bar(
    filtered,
    x="Airline",
    y="Flights",
    color="Airport"
)
st.plotly_chart(bar, use_container_width=True)

st.subheader("Delay Analysis")
delay = px.scatter(
    filtered,
    x="Flights",
    y="Delay_Minutes",
    size="Passengers",
    color="Airline"
)
st.plotly_chart(delay, use_container_width=True)

st.dataframe(filtered)