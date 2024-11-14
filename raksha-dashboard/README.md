Databse Query Details:

GRANT ALL PRIVILEGES ON _._ TO 'admin'@'localhost';
FLUSH PRIVILEGES;
CREATE DATABASE rakshdata;
GRANT ALL PRIVILEGES ON rakshdata.\* TO 'admin'@'localhost';
CREATE TABLE support_metrics (
id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(50) NOT NULL,
average_response_time FLOAT,
csat_score FLOAT,
ces_score FLOAT,
nps_score FLOAT,
promoters_percentage FLOAT,
passives_percentage FLOAT,
detractors_percentage FLOAT,
timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO support_metrics (
product_name, average_response_time, csat_score, ces_score, nps_score,
promoters_percentage, passives_percentage, detractors_percentage, timestamp
) VALUES
('Product 01', 8.11, 75.0, 75.94, 59.0, 67.76, 20.43, 11.81, '2024-01-01 10:00:00'),
('Product 01', 8.25, 73.5, 76.12, 60.5, 68.00, 19.90, 12.10, '2024-02-01 10:00:00'),
('Product 01', 8.00, 74.3, 76.00, 61.2, 66.50, 21.00, 12.50, '2024-03-01 10:00:00'),
('Product 01', 8.30, 72.0, 75.50, 58.8, 67.30, 20.00, 12.70, '2024-04-01 10:00:00'),
('Product 01', 7.90, 74.8, 76.20, 60.0, 68.00, 20.30, 11.70, '2024-05-01 10:00:00'),
('Product 01', 8.50, 73.0, 75.70, 59.5, 67.20, 20.50, 12.30, '2024-06-01 10:00:00'),
('Product 01', 8.20, 73.8, 76.10, 60.2, 67.80, 20.00, 12.20, '2024-07-01 10:00:00'),
('Product 01', 8.10, 74.0, 75.90, 61.0, 68.10, 20.40, 11.50, '2024-08-01 10:00:00'),
('Product 01', 8.00, 75.5, 76.30, 62.0, 67.90, 20.20, 11.90, '2024-09-01 10:00:00'),
('Product 01', 8.15, 76.0, 76.50, 63.0, 68.30, 19.80, 11.90, '2024-10-01 10:00:00'),
('Product 01', 8.12, 74.2, 75.80, 60.8, 67.50, 20.60, 11.90, '2024-11-01 10:00:00');
SELECT \* FROM rakshdata.support_metrics;

USE rakshdata;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);
INSERT INTO users (username, password)
VALUES ('admin', 'admin123');

CREATE TABLE rakshdata.kpi_data (
id INT AUTO_INCREMENT PRIMARY KEY,
period VARCHAR(50),
revenue DECIMAL(15, 2),
target_revenue DECIMAL(15, 2),
revenue_per_customer DECIMAL(10, 2),
target_revenue_per_customer DECIMAL(10, 2),
customers INT,
target_customers INT,
acquisition_cost DECIMAL(10, 2),
target_acquisition_cost DECIMAL(10, 2),
promoters_percentage DECIMAL(5, 2),
passives_percentage DECIMAL(5, 2),
detractors_percentage DECIMAL(5, 2),
due_date DATE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rakshdata.kpi_data (period, revenue, target_revenue, revenue_per_customer, target_revenue_per_customer, customers, target_customers, acquisition_cost, target_acquisition_cost, promoters_percentage, passives_percentage, detractors_percentage, due_date)
VALUES
('Q4 2023', 2180000, 2325000, 1987, 2500, 309, 300, 372, 333, 50.00, 30.00, 20.00, '2024-12-31'),
('Q3 2023', 2000000, 2150000, 1900, 2400, 280, 300, 390, 350, 48.00, 32.00, 20.00, '2024-09-30'),
('Q2 2023', 1950000, 2100000, 1800, 2300, 260, 300, 385, 340, 52.00, 28.00, 20.00, '2024-06-30'),
('Q1 2023', 1850000, 2000000, 1750, 2250, 240, 300, 400, 360, 49.00, 31.00, 20.00, '2024-03-31');

SELECT \* FROM rakshdata.kpi_data;
