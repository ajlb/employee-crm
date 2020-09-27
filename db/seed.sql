USE employeeCRM_DB;

/*Data for the table department */

INSERT INTO department(id,name) VALUES (1,'Administration');
INSERT INTO department(id,name) VALUES (2,'Marketing');
INSERT INTO department(id,name) VALUES (3,'Purchasing');
INSERT INTO department(id,name) VALUES (4,'Human Resources');
INSERT INTO department(id,name) VALUES (5,'Shipping');
INSERT INTO department(id,name) VALUES (6,'IT');
INSERT INTO department(id,name) VALUES (7,'Public Relations');
INSERT INTO department(id,name) VALUES (8,'Sales');
INSERT INTO department(id,name) VALUES (9,'Executive');
INSERT INTO department(id,name) VALUES (10,'Finance');
INSERT INTO department(id,name) VALUES (11,'Accounting');

/*Data for the table role */
INSERT INTO role(id,title,salary,department_id) VALUES (1,'Public Accountant',60000.00,11);
INSERT INTO role(id,title,salary,department_id) VALUES (2,'Accounting Manager',82000.00,10);
INSERT INTO role(id,title,salary,department_id) VALUES (3,'Administrative Assistant',42000.00,1);
INSERT INTO role(id,title,salary,department_id) VALUES (4,'President',300000.00,9);
INSERT INTO role(id,title,salary,department_id) VALUES (5,'Vice President',210000.00,9);
INSERT INTO role(id,title,salary,department_id) VALUES (6,'Accountant',58000.00,10);
INSERT INTO role(id,title,salary,department_id) VALUES (7,'Finance Manager',92000.00,10);
INSERT INTO role(id,title,salary,department_id) VALUES (8,'HR Representative',51000.00,4);
INSERT INTO role(id,title,salary,department_id) VALUES (9,'Programmer',97000.00,6);
INSERT INTO role(id,title,salary,department_id) VALUES (10,'Marketing Manager',90000.00,2);
INSERT INTO role(id,title,salary,department_id) VALUES (11,'Marketing Representative',74000.00,2);
INSERT INTO role(id,title,salary,department_id) VALUES (12,'PR Representative',65000.00,7);
INSERT INTO role(id,title,salary,department_id) VALUES (13,'Purchasing Clerk',55000.00,3);
INSERT INTO role(id,title,salary,department_id) VALUES (14,'Purchasing Manager',80000.00,3);
INSERT INTO role(id,title,salary,department_id) VALUES (15,'Sales Manager',850000.00,8);
INSERT INTO role(id,title,salary,department_id) VALUES (16,'Sales Representative',64000.00,8);
INSERT INTO role(id,title,salary,department_id) VALUES (17,'Jr Developer',9100.00,6);
INSERT INTO role(id,title,salary,department_id) VALUES (18,'Staff Developer',102000.00,6);
INSERT INTO role(id,title,salary,department_id) VALUES (19,'Engineering Manager',12500.00,6);

/* Data for the table employee */
/* Managers First */
INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`) VALUES (1,"Kelsey","Bird","4"),(2,"Tanisha","Alvarado","2"),(3,"Rooney","Andrews","5"),(4,"Perry","Stephenson","7"),(5,"Cadman","Sparks","10"),(6,"Ora","Stanton","15"),(7,"Nell","Albert","14"),(8,"Keefe","Howell","19"),(9,"Autumn","Oneil","2"),(10,"Courtney","Banks","19");
/* Non-managers next */
INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`) VALUES (11,"Alexa","Gutierrez","12"),(12,"Wendy","Silva","13"),(13,"Ignacia","Kent","16"),(14,"Ann","Randall","9"),(15,"Odessa","Chang","17"),(16,"Kameko","Buchanan","12"),(17,"Abel","Dominguez","12"),(18,"Cherokee","French","8"),(19,"Paki","Mcknight","17"),(20,"Ruby","Byers","11");
INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`) VALUES (21,"Jaquelyn","Barber","18"),(22,"Britanney","Roberts","16"),(23,"Fredericka","Guthrie","12"),(24,"Timon","Adams","1"),(25,"Slade","Bishop","12"),(26,"Flynn","Drake","3"),(27,"Lacy","Wood","16"),(28,"Christine","Soto","1"),(29,"Iona","Burke","16"),(30,"Samantha","Conner","6");
