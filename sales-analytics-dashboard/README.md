# Sales Analytics Dashboard | Tableau + Web Portfolio Project

A professional sales analytics dashboard project for a data analyst portfolio. This project includes an interactive web dashboard preview, sales dataset, SQL queries, Tableau dashboard build guide, KPI analysis, regional sales insights, and executive reporting sections.

## Live Portfolio Usage

Upload this complete folder inside your existing GitHub Pages portfolio repository:

```text
portfolio/
├── index.html
├── css/
├── js/
├── resume/
└── sales-analytics-dashboard/
    ├── index.html
    ├── README.md
    ├── data/
    ├── sql/
    └── assets/
```

After upload, your project page will be live at:

```text
https://codewith-atif.github.io/portfolio/sales-analytics-dashboard/
```

## Project Objective

The objective of this dashboard is to help executives and sales managers track sales performance, monitor key KPIs, analyze regional performance, identify profitable product categories, and make data-driven business decisions.

## Key Features

- Executive KPI cards
- Sales and profit performance tracking
- Monthly revenue trend analysis
- Regional sales comparison
- Product category and sub-category performance
- Customer segment analysis
- Interactive region and category filters
- Sales target progress tracking
- Executive insights and recommendations

## Tools Used

- Tableau Public / Tableau Desktop
- SQL
- Excel / CSV
- HTML, CSS, JavaScript
- Plotly.js for the interactive web preview
- GitHub Pages

## Dashboard KPIs

- Total Revenue
- Total Profit
- Total Orders
- Average Order Value
- Profit Margin
- Top Region
- Top Category
- Sales Growth

## Dataset Columns

- Order ID
- Order Date
- Region
- State
- City
- Category
- Sub-Category
- Customer Segment
- Sales
- Profit
- Quantity
- Discount
- Shipping Cost

## Tableau Build Steps

1. Open Tableau Public or Tableau Desktop.
2. Connect to `data/sales_data.csv`.
3. Create calculated fields:
   - Profit Margin = SUM([Profit]) / SUM([Sales])
   - Average Order Value = SUM([Sales]) / COUNTD([Order ID])
   - Sales Growth = current period sales vs previous period sales
4. Create KPI cards for Sales, Profit, Orders, AOV, and Profit Margin.
5. Create charts:
   - Monthly Sales Trend
   - Sales by Region
   - Profit by Category
   - Sales by Customer Segment
   - Top 10 Cities by Revenue
6. Add filters for Region, Category, Segment, and Order Date.
7. Publish the dashboard to Tableau Public.
8. Add your Tableau Public link inside `index.html` where marked.

## Business Insights

- West and South regions generate strong revenue contribution.
- Technology products produce higher profit margins than Furniture.
- Consumer segment has high order volume, while Corporate segment contributes stable revenue.
- Discounts above 20% often reduce profit margin.
- Top cities can be prioritized for targeted sales campaigns.

## Author

Atif | Data Analytics Portfolio

GitHub: https://github.com/Codewith-Atif
Portfolio: https://codewith-atif.github.io/portfolio/
