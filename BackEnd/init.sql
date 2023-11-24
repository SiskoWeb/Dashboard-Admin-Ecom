
CREATE DATABASE product_management;
USE product_management;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    isActive BOOLEAN DEFAULT false,
    role ENUM('admin', 'user') NOT NULL
);
