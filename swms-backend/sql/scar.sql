create table temperature
(
    tid integer NOT NULL UNIQUE AUTO_INCREMENT,
    tdate date NOT NULL,
    ttime time NOT NULL,
    temperature float NOT NULL,
    primary key (tid)
);

create table humidity
(
    hid integer NOT NULL UNIQUE AUTO_INCREMENT,
    flower integer NOT NULL,
    hdate date NOT NULL,
    htime time NOT NULL,
    humidity float NOT NULL,
    primary key (hid)
);