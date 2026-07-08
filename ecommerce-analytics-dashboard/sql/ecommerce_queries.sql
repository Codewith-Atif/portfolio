-- E-Commerce Analytics Dashboard SQL Queries

SELECT COUNT(DISTINCT order_id) AS total_orders,
       SUM(sales) AS total_revenue,
       SUM(profit) AS total_profit,
       AVG(sales) AS avg_order_value
FROM ecommerce_data;

SELECT category, SUM(sales) AS revenue, SUM(profit) AS profit
FROM ecommerce_data
GROUP BY category
ORDER BY revenue DESC;

SELECT region, SUM(sales) AS revenue, SUM(profit) AS profit
FROM ecommerce_data
GROUP BY region
ORDER BY revenue DESC;

SELECT customer_segment, SUM(sales) AS revenue, COUNT(DISTINCT customer_id) AS customers
FROM ecommerce_data
GROUP BY customer_segment
ORDER BY revenue DESC;

SELECT product, SUM(sales) AS revenue, SUM(profit) AS profit
FROM ecommerce_data
GROUP BY product
ORDER BY revenue DESC
LIMIT 10;

SELECT payment_method, COUNT(order_id) AS orders
FROM ecommerce_data
GROUP BY payment_method
ORDER BY orders DESC;

SELECT month, SUM(sales) AS monthly_revenue
FROM ecommerce_data
GROUP BY month
ORDER BY month;

SELECT category,
       SUM(CASE WHEN returned = 'Yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS return_rate
FROM ecommerce_data
GROUP BY category
ORDER BY return_rate DESC;
