INSERT INTO department (name)
VALUES ('HR'),
       ('Investment'),
       ('Executives'),
       ('Accounting'),
       ('Solutions');

INSERT INTO role (salary, title, department_id)
VALUES ('50000', 'Specialist', 1),
       ('26000', 'Stooge', 3),
       ('27000', 'Assistant', 2),
       ('250000', 'Head Hancho', 3),
       ('28000', 'Recovery person', 5),
       ('29000', 'Recruiter', 1),
       ('30000', 'Numbers', 4),
       ('31000', 'Calculator', 2),
       ('32000', 'Excel person', 4),
       ('33000', 'Call center', 5);



INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (1, 'Fred', 'Fllinstone', 1),
        (3, 'Betty', 'Crocker', 1),
        (1, 'Jake', 'Diaz', 1),
        (1, 'Sam', 'Smith', 2),
        (1, 'Ariana', 'Grande', 3),
        (1, 'Shawn', 'Mendez', 1),
        (1, 'Niall', 'Horan', 3),
        (1, 'Jason', 'Mraz', 1),
        (1, 'Beyonce', 'Knowles', null),
        (1, 'Solange', 'Knowles', null),
        (1, 'Maggie', 'Rogers', 1);