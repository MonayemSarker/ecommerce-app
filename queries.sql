-- getMonthlySalesReport

SELECT
  TO_CHAR(o."createdAt", 'YYYY-MM') AS month,
  SUM(o."totalAmount") AS total_sales
FROM
  "Order" o
WHERE
  TO_CHAR(o."createdAt", 'YYYY-MM') != TO_CHAR(NOW(), 'YYYY-MM')
  AND o."createdAt" >= NOW() - INTERVAL '6 months'
GROUP BY
  TO_CHAR(o."createdAt", 'YYYY-MM')
ORDER BY
  TO_CHAR(o."createdAt", 'YYYY-MM') DESC;


-- getUserOrderReport
SELECT
  u.name AS user_name,
  u.id AS user_id,
  TO_CHAR(o."createdAt", 'YYYY-MM') AS month,
  COUNT(o.id)::INTEGER AS total_orders,
  ROUND(SUM("totalAmount")::numeric, 2) AS total_sales
FROM
  "User" u
LEFT JOIN
  "Order" o ON u.id = o."userId"
GROUP BY
  u.name, u.id, TO_CHAR(o."createdAt", 'YYYY-MM')
ORDER BY
  u.name, TO_CHAR(o."createdAt", 'YYYY-MM') DESC;


-- getProductSalesReport
SELECT
  p.name AS product_name,
  p.id AS product_id,
  SUM(oi.quantity)::INTEGER AS total_quantity_sold,
  ROUND(SUM(oi.price)::numeric, 2) AS total_sales
FROM
  "Product" p
JOIN
  "OrderItem" oi ON p.id = oi."productId"
GROUP BY
  p.id, p.name
ORDER BY
  total_quantity_sold DESC;
