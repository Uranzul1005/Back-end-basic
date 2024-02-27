CREATE TABLE task (
    id BIGINT PRIMARY KEY, title VARCHAR (255), description TEXT
);

DESC task;

select * from task

select title from task

select id, title, description from task

INSERT INTO task VALUES(1, Үгээ цээжлэх, Англи үгс)

DELETE FROM task WHERE id = 5;

UPDATE task SET description = 'Япон 100 үгс' WHERE id=1
