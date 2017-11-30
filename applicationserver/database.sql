create table users(
	id int primary key auto_increment, 
	name varchar(50) not null,
	email varchar(50) not null,
	password varchar(150) not null
)engine=innodb;
create table images(
	id int primary key auto_increment,
	url varchar(150) not null,
	name varchar(100) not null,
	idus int not null,
	foreign key(idus) references users(id)
)engine=innodb;