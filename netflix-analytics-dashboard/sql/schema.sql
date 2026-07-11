DROP TABLE IF EXISTS netflix_titles;
CREATE TABLE netflix_titles(show_id VARCHAR(12) PRIMARY KEY,type VARCHAR(10) NOT NULL,title VARCHAR(200) NOT NULL,country VARCHAR(80),release_year INTEGER,rating VARCHAR(12),genres VARCHAR(250),duration VARCHAR(30));
CREATE INDEX idx_release_year ON netflix_titles(release_year);CREATE INDEX idx_country ON netflix_titles(country);CREATE INDEX idx_type ON netflix_titles(type);
