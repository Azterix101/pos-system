CREATE DATABASE IF NOT EXISTS pos_system;

-- Check if the user exists, and if not, create the user and grant privileges
CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'user_password';
GRANT ALL PRIVILEGES ON pos_system.* TO 'user'@'%';
FLUSH PRIVILEGES;
