 DROP TABLE    users  ;
 CREATE TABLE    users    
   (
   Username       varchar(20)    default NULL;
   Useremail      varchar(50)    default NULL;
   Userpassword   binary(100)    default NULL;
   UserID         varchar(100)   default NOT NULL;
   PRIMARY KEY  (UserID)
   )
   CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO users VALUES ('newUser', 'newUser@mail.com', '$2a$10$IHl5IrnI7Pt3YhCUGfDAruj16BuRzMQAcYo2PKFCQrtuF5419fT7q', 'nj3na');
INSERT INTO users VALUES ('newUser2', 'newUser2@mail.com', '$2a$10$knt51GWUcJc72miVF0fqMuWJhRQ7goC1RwUbBm9qk8HVM9lJlsL3O', 'ch5sfo');
INSERT INTO users VALUES ('newUser3', 'newUser3@mail.com', '$2a$10$EkpK8/bMLoCzxihwqh.JJuV5zd/KOeos2sfOyc7HvTiusUwiQn2cG', '2uihkg');
INSERT INTO users VALUES ('newUser4', 'newUser4@mail.com', '$2a$10$teAiwp2/M00bh/dpHlouK.vi51KbtPbpXutLymb8ykSpKAAoewApu', 'xdu8k');
INSERT INTO users VALUES ('april4test', 'april4test@mail.com', '$2a$10$AA7W0f4JGKUSCuDRIiB4ZuYzm3RCiXk6CTbrspYCo/HhzhQ6mOaEK', '9trl625');
INSERT INTO users VALUES ('testUser2', 'testUser2@mail.com', '$2a$10$Ew5TSNUFH7Nro8VPr/5wJO5pwAGumad6PN3yk8bZIVuftW1Bo.E9W', '5o1pel');