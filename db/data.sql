insert  into `User`(`ID`,`Name`,`Password`,`Limit`,`Version`) values
(1,'admin','ap',100,0),
(2,'user','up',200,0);

insert  into `Authorities`(`ID`,`UserID`,`Authority`) values
(1,1,'CRUD_RECORD'),
(2,1,'CRUD_USER'),
(3,2,'USE_APP');

insert  into `Record`(`ID`,`UserID`,`Date`,`Time`,`Description`,`Value`,`Version`) values
(1,2,'2016-03-18 14:06:04','1970-01-01 01:06:04','Meal-1',50,0),
(2,2,'2016-03-19 15:06:04','1970-01-01 02:06:04','Meal-2',100,0),
(3,2,'2016-03-20 16:06:04','1970-01-01 03:06:04','Meal-3',200,0),
(4,2,'2016-03-21 17:06:04','1970-01-01 04:06:04','Meal-4',300,0),
(5,2,'2016-03-22 18:06:04','1970-01-01 05:06:04','Meal-5',450,0),
(6,2,'2016-03-23 19:06:04','1970-01-01 06:06:04','Meal-6',500,0),
(7,2,'2016-03-24 20:06:04','1970-01-01 07:06:04','Meal-7',550,0),
(8,2,'2016-03-25 21:06:04','1970-01-01 08:06:04','Meal-8',600,0),
(9,2,'2016-03-26 22:06:04','1970-01-01 09:06:04','Meal-9',660,0),
(10,2,'2016-03-27 14:06:04','1970-01-01 10:06:04','Meal-10',100,0),
(11,2,'2016-03-28 15:06:04','1970-01-01 11:06:04','Meal-11',200,0),
(12,2,'2016-03-29 16:06:04','1970-01-01 12:06:04','Meal-12',300,0),
(13,2,'2016-03-30 17:06:04','1970-01-01 13:06:04','Meal-13',400,0),
(14,2,'2016-03-31 18:06:04','1970-01-01 14:06:04','Meal-14',500,0),
(15,2,'2016-04-01 19:06:04','1970-01-01 15:06:04','Meal-15',50,0),
(16,2,'2016-04-02 20:06:04','1970-01-01 16:06:04','Meal-16',50,0),
(17,2,'2016-04-03 10:06:04','1970-01-01 17:06:04','Meal-17',50,0),
(18,2,'2016-04-04 11:06:04','1970-01-01 18:06:04','Meal-18',50,0),
(19,2,'2016-04-05 08:06:04','1970-01-01 19:06:04','Meal-19',50,0),
(20,2,'2016-04-06 07:06:04','1970-01-01 20:06:04','Meal-20',50,0),
(21,1,'2016-03-07 14:06:23','1970-01-01 14:06:23','Meal asdf',200,0),
(22,1,'2016-03-18 15:06:23','1970-01-01 15:06:23','Meal sdfg',24,0),
(23,1,'2016-03-19 16:06:23','1970-01-01 16:06:23','Meal sfdggf g',300,0),
(24,1,'2016-03-20 17:06:23','1970-01-01 17:06:23','Meal se',400,0),
(25,1,'2016-03-21 18:06:23','1970-01-01 18:06:23','Meal 2dfs 5',500,0),
(26,1,'2016-03-22 19:06:23','1970-01-01 19:06:23','Meal 43',243,0),
(27,1,'2016-03-23 20:06:23','1970-01-01 20:06:23','Meal 61',273,0),
(28,1,'2016-03-24 21:06:23','1970-01-01 21:06:23','Meal 100',340,0),
(29,1,'2016-04-25 22:06:23','1970-01-01 22:06:23','Meal 200',250,0),
(30,1,'2016-04-26 23:06:23','1970-01-01 23:06:23','Meal 300',720,0);