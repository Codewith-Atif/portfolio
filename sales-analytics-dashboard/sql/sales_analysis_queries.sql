-- Sales Analytics Dashboard SQL Queries

-- 1. Total Sales, Profit, Orders, Quantity
SELECT
    ROUND(SUM(sales), 2) AS total_sales,
    ROUND(SUM(profit), 2) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders,
    SUM(quantity) AS total_quantity
FROM sales_data;

-- 2. Monthly Sales Trend
SELECT
    DATE_TRUNC('month', order_date) AS month,
    ROUND(SUM(sales), 2) AS monthly_sales,
    ROUND(SUM(profit), 2) AS monthly_profit
FROM sales_data
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- 3. Sales by Region
SELECT
    region,
    ROUND(SUM(sales), 2) AS total_sales,
    ROUND(SUM(profit), 2) AS total_profit,
    COUNT(DISTINCT order_id) AS orders
FROM sales_data
GROUP BY region
ORDER BY total_sales DESC;

-- 4. Profit Margin by Category
SELECT
    category,
    ROUND(SUM(sales), 2) AS total_sales,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND((SUM(profit) / NULLIF(SUM(sales), 0)) * 100, 2) AS profit_margin_percent
FROM sales_data
GROUP BY category
ORDER BY profit_margin_percent DESC;

-- 5. Top 10 Cities by Revenue
SELECT
    city,
    state,
    region,
    ROUND(SUM(sales), 2) AS total_sales,
    ROUND(SUM(profit), 2) AS total_profit
FROM sales_data
GROUP BY city, state, region
ORDER BY total_sales DESC
LIMIT 10;

-- 6. Customer Segment Performance
SELECT
    customer_segment,
    ROUND(SUM(sales), 2) AS total_sales,
    ROUND(SUM(profit), 2) AS total_profit,
    COUNT(DISTINCT order_id) AS total_orders,
    ROUND(SUM(sales) / COUNT(DISTINCT order_id), 2) AS average_order_value
FROM sales_data
GROUP BY customer_segment
ORDER BY total_sales DESC;

-- 7. Discount Impact on Profit
SELECT
    CASE
        WHEN discount = 0 THEN 'No Discount'
        WHEN discount <= 0.10 THEN 'Low Discount'
        WHEN discount <= 0.20 THEN 'Medium Discount'
        ELSE 'High Discount'
    END AS discount_band,
    ROUND(SUM(sales), 2) AS total_sales,
    ROUND(SUM(profit), 2) AS total_profit,
    ROUND((SUM(profit) / NULLIF(SUM(sales), 0)) * 100, 2) AS profit_margin_percent
FROM sales_data
GROUP BY discount_band
ORDER BY total_sales DESC;
