

CREATE DATABASE database_link ;

USE database_link;

CREATE TABLE users (
   
    id INT(11) NOT NULL, 
    username VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL

);

ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
DESCRIBE users;

--   CREATE OTHER TABLE 

CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    user_id  INT (11) , 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

alter table links add PRIMARY KEY (id);
alter table links modify id int(11) AUTO_INCREMENT;