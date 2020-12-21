--CREATE TABLES---

--DHT
create table dht
(
	id int identity,
	timestamp datetime not null,
	temperature double precision default null,
	humidity double precision default null
)
go

create unique index dht_id_uindex
	on dht (id)
go

alter table dht
	add constraint dht_pk
		primary key nonclustered (id)
go

--Soil Moisture
create table soilmoisture
(
	id int identity,
	timestamp datetime not null,
	soilmoisture int default null
)
go

create unique index soilmoisture_id_uindex
	on soilmoisture (id)
go

alter table soilmoisture
	add constraint soilmoisture_pk
		primary key nonclustered (id)
go

--Waterlevel
create table waterlevel
(
	id int identity,
	timestamp datetime not null,
	waterlevel double precision default null
)
go

create unique index waterlevel_id_uindex
	on waterlevel (id)
go

alter table waterlevel
	add constraint waterlevel_pk
		primary key nonclustered (id)
go

--Motor
create table motor
(
	id int identity,
	timestamp datetime not null,
	powerOn bit default null
)
go

create unique index motor_id_uindex
	on motor (id)
go

alter table motor
	add constraint motor_pk
		primary key nonclustered (id)
go


--Last System Boot
create table lastsystemboot
(
	id int identity,
	timestamp datetime not null
)
go

create unique index lastsystemboot_id_uindex
	on motor (id)
go

alter table lastsystemboot
	add constraint lastsystemboot_pk
		primary key nonclustered (id)
go