drop table GameScores;

create table if not exists GameScores (
    UserID varchar(100) not NULL,
    Game1 int default NULL,
    Game2 int default NULL,
    Game3 int default NULL,
    Game4 int default NULL,
    PRIMARY KEY (UserID)
    )
    CHARACTER SET utf8 COLLATE utf8_general_ci;

    insert into GameScores (UserID, Game1, Game2, Game3, Game4) values
    ("nj3na", 0, 10, 0, 5),
    ("ch5sfo", 5, 5, 23, 55),
    ("2uihkg", 2, 10, 80, 555),
    ("xdu8k", 111, 100, 0, 5555),
    ("9trl625", 3222, 50, 7, 55555);
