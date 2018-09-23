create table temperature
(
    tid integer NOT NULL UNIQUE AUTO_INCREMENT,
    tdate date NOT NULL,
    ttime time NOT NULL,
    temperature float NOT NULL,
    primary key (tid)
);

create table dryness
(
    did integer NOT NULL UNIQUE AUTO_INCREMENT,
    flower integer NOT NULL,
    ddate date NOT NULL,
    dtime time NOT NULL,
    dryness float NOT NULL,
    primary key (did)
);