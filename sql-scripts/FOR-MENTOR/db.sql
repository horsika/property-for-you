-- create database moovsmart;

create table address
(
    address_id   bigint auto_increment
        primary key,
    city         varchar(255) null,
    door         varchar(255) null,
    floor        int          null,
    house_number varchar(255) null,
    postcode     int          null,
    road         varchar(255) null
);

create table hibernate_sequence
(
    next_val bigint null
);

create table user
(
    id              bigint auto_increment
        primary key,
    email           varchar(255) null,
    first_name      varchar(255) null,
    is_enabled      bit          not null,
    last_name       varchar(255) null,
    password_hash   varchar(255) null,
    profile_picture varchar(255) null,
    role            varchar(255) null
);

create table email_token
(
    id               bigint       not null
        primary key,
    expiry_date_time datetime(6)  null,
    token            varchar(255) null,
    user_id          bigint       not null,
    constraint FKr09ag0ercq2i63an8pcxmh2bm
        foreign key (user_id) references user (id)
);

create table message
(
    id          bigint auto_increment
        primary key,
    message     text        null,
    timestamp   datetime(6) null,
    receiver_id bigint      null,
    sender_id   bigint      null,
    constraint FK86f0kc2mt26ifwupnivu6v8oa
        foreign key (receiver_id) references user (id),
    constraint FKcnj2qaf5yc36v2f90jw2ipl9b
        foreign key (sender_id) references user (id)
);

create table property
(
    property_id         bigint auto_increment
        primary key,
    activated_at        datetime(6)  null,
    air_conditioning    bit          null,
    archived_at         datetime(6)  null,
    created_at          datetime(6)  null,
    description         text         null,
    floor_area          double       null,
    heating_type        varchar(255) null,
    latitude            double       not null,
    listing_status      varchar(255) null,
    listing_type        varchar(255) null,
    longitude           double       not null,
    name                varchar(200) not null,
    number_of_bathrooms double       null,
    number_of_bedrooms  int          null,
    price               double       null,
    property_type       varchar(255) null,
    property_uuid       varchar(255) null,
    address_id          bigint       null,
    owner_user_id       bigint       null,
    constraint FKgcduyfiunk1ewg7920pw4l3o9
        foreign key (address_id) references address (address_id),
    constraint FKl5wyfd7jklotrfg5krwx9qfp7
        foreign key (owner_user_id) references user (id)
);

create table open_house
(
    open_house_id        bigint auto_increment
        primary key,
    created_at           datetime(6) null,
    current_participants int         null,
    from_time            datetime(6) null,
    is_active            bit         null,
    max_participants     int         null,
    to_time              datetime(6) null,
    property_id          bigint      null,
    constraint FKfvm0v3wkr3vqfauq5o9v7ltkr
        foreign key (property_id) references property (property_id)
);

create table booking
(
    booking_id     bigint auto_increment
        primary key,
    places_to_book int    null,
    open_house_id  bigint null,
    user_id        bigint null,
    constraint FKgaeook59gatnixvya3ax99a3c
        foreign key (open_house_id) references open_house (open_house_id),
    constraint FKkgseyy7t56x7lkjgu3wah5s3t
        foreign key (user_id) references user (id)
);

create table property_images
(
    property_property_id bigint       not null,
    images               varchar(255) null,
    constraint FK6kvlamqvp6mxs9qhqx7rbo1uf
        foreign key (property_property_id) references property (property_id)
);

create table user_like_property
(
    property_id bigint not null,
    user_id     bigint not null,
    primary key (property_id, user_id),
    constraint FK4dj7xkkp1vm3hn8cm465tujmr
        foreign key (user_id) references user (id),
    constraint FKelmdijmpf3tnj0793cce3y2xm
        foreign key (property_id) references property (property_id)
);

INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (1, 'Budapest', '4', 3, 42, 1111, 'Irinyi Dániel utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (3, 'Budapest', '1', 4, 14, 1132,'Kresz utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (4, 'Budapest', null, null, 4, 1132, 'Váci út');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (5, 'Budapest', null, null, 4, 1111, 'Szép utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (6, 'Pécs', null, null, 19, 7632, 'Irma utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (7, 'Szeged', '2', 5, 8, 2000, 'Tisza utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (8, 'Budapest', null, null, 1, 1139, 'Frangepán utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (9, 'Pécs', null, null, 61, 7627, 'Hársfa út');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (10, 'Budapest', '8', 3, 5, 1203, 'Kossuth Lajos utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (11, 'Pécs', null, null, 5, 7633, 'Jedlik Ányos utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (12, 'Szeged', null, null, 2, 6724, 'Gergely köz');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (13, 'Budapest', null, null, 24, 1191, 'Kossuth tér');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (14, 'Budapest', null, null, 24, 1191, 'Kossuth tér');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (15, 'Budapest', '0', 0, 24, 1191, 'Kossuth tér');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (16, 'Budapest', null, null, 85, 1205, 'Mikszáth utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (17, 'Budapest', '', null, 61, 1163, 'Margit utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (18, 'Budapest', '1', 5, 64, 1148, 'Nagy Lajos király útja');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (19, 'Budapest', '', null, 30, 1054, 'Vadász utca');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (20, 'Budapest', '', null, 6, 1148, 'Teleki Pál köz');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (21, 'Budapest', '', null, 5, 1046, 'Házy Erzsébet sétány');
INSERT INTO moovsmart.address (address_id, city, door, floor, house_number, postcode, road) VALUES (22, 'Budapest', '', null, 5, 1204, 'Szabadság utca');

INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (1, 'orsolyahegedus97@gmail.com', 'Hegedüs', true, 'Orsolya', '$2a$10$TOG.t24rSbRXdRQAXAzme.PT2xj.Iw0okwaQEcNC9FrhdK6Lug7zW', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--F08d-9YX--/v1694177084/profile_pic/44252-Blue-British-Shorthair-cat-sitting-white-background_caqjo6.jpg', 'ROLE_ADMIN');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (2, 'kovesdy.kristof@gmail.com', 'Kristóf', true, 'Kövesdy', '$2a$10$FJlnjn0zUzZOe.vgVIWfquB3gZga5sMDgojKzxgUPRsOJ3JseLffK', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--RjctjDts--/v1694778552/profile_pic/Flat-Bedroom-alt_fuczfr.jpg', 'ROLE_USER');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (3, 'pinterevalive@gmail.com', 'Pinter', true, 'Eva', '$2a$10$q4aLSaCEdjV7sNkxxxq6qOgk8USaCS6lMce2iQWqY8lVBZfcsQeJG', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--guHfDiKD--/v1695900651/profile_pic/cat2_eyqpvt.jpg', 'ROLE_PREMIUM');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (7, 'takacslaci87@gmail.com', 'Teszt', true, 'Laci', '$2a$10$VVfVCYus7ormSbUHwXzmAuJgr/uXY5bHwdHpvBOZKZQsxqA8wrCE6', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--AqbThKdC--/v1695228625/profile_pic/small.._zm2i1f.jpg', 'ROLE_PREMIUM');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (8, 'tesztlaszlo87@gmail.com', 'Teszt', true, 'Elek', '$2a$10$x2kjTy5rSCAvUsBkWAxz..JRAREgqlQzX9wzkQgG1yWhp/NqlAKzi', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--AqbThKdC--/v1695228625/profile_pic/small.._zm2i1f.jpg', 'ROLE_USER');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (10, 'horsika97@gmail.com', 'Orsolya', true, 'Hegedus', '$2a$10$zO3UU3UzDvS/RA8jKGpAiegnvcw4jU0WVPPw/en5Ts8WywhnviMFm', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--SV_-Ukb3--/v1695052572/profile_pic/pexels-photo-1525041_gclhy0.jpg', 'ROLE_PREMIUM');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (11, 'takacs.laszlo@kodo.hu', 'Teszt', true, 'Géza', '$2a$10$Puk4cDpax3j2fKRnfE59QuQQtwRIDJFqtR9AGUGoxgsiSFlmvJw8m', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--psq7ZxMs--/v1694451032/profile_pic/nopic_rpcebm.jpg', 'ROLE_USER');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (12, 'orsolyah97@gmail.com', 'Orsi', true, 'Hegedus', '$2a$10$FKGWEeMvaewB9jyUQ9tncelaXF2UT6Pbrk/F.8jkNg9uG570Y0c6.', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--psq7ZxMs--/v1694451032/profile_pic/nopic_rpcebm.jpg', 'ROLE_USER');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (13, 'weecanbkk@gmail.com', 'Kristóf', true, 'Kövesdy', '$2a$10$z10fYPKyGJOYMrDdYVYJ3OfWAHSaqLNTfLP6ZQ7/.vj7mCUG90XHW', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--PEtI2WcQ--/v1694782846/profile_pic/turtle_ximm0j.jpg', 'ROLE_PREMIUM');
INSERT INTO moovsmart.user (id, email, first_name, is_enabled, last_name, password_hash, profile_picture, role) VALUES (14, 'larahorvath27@gmail.com', 'Laura', true, 'Horváth', '$2a$10$4aSHBBy482E3lGsidSKvzOCFqhqo3XMMPneLpJ9jFh1VXJAaD.1Ou', 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--psq7ZxMs--/v1694451032/profile_pic/nopic_rpcebm.jpg', 'ROLE_USER');

INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (1, '2023-09-27 11:09:44.811885', true, null, '2023-09-08 11:09:44.811878', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Lectus magna fringilla urna porttitor rhoncus dolor purus non. Sed vulputate mi sit amet mauris. Quam nulla porttitor massa id neque. Bibendum at varius vel pharetra vel turpis nunc. Phasellus egestas tellus rutrum tellus. Tortor condimentum lacinia quis vel eros donec. Neque gravida in fermentum et sollicitudin ac orci. Velit euismod in pellentesque massa placerat duis ultricies.', 230, 'ELECTRIC', 47.47343, 'ACTIVE', 'SELL', 19.0532, 'Családi ház', 2.5, 5, 'ROW_HOUSE', null, 1, 13, 12);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (3, '2023-09-08 11:12:03.380432', false, null, '2023-09-08 11:12:03.380425', 'Ez a tágas és világos lakás minden igényt kielégít. A praktikus elrendezés és a modern kialakítás tökéletes kombinációját nyújtja. A közelsége a közlekedési csomópontokhoz és a bevásárlási lehetőségekhez még kényelmesebbé teszi mindennapi életét. Ne hagyja ki ezt a remek lehetőséget!', 100, 'GAS', 47.49498279413341, 'ACTIVE', 'SELL', 19.051209225791826, 'Budapest property', 1, 2, 'HOUSE', null, 3, 3, 29);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (4, '2023-09-08 11:18:12.054441', false, null, '2023-09-08 11:18:12.054435', 'Ez a hangulatos családi ház ideális otthon a természet és a város közötti harmóniát keresőknek. A nyugalom és csend együtt él a modern kényelemmel, miközben a környék kiváló lehetőségeket kínál a szabadidős tevékenységekhez. Fedezze fel ezt az egyedülálló lehetőséget!', 150, 'ELECTRIC', 47.52716699701925, 'ACTIVE', 'RENT', 19.082918841135964, 'Nice property', 2, 3, 'APARTMENT', null, 4, 3, 40);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (5, '2023-09-08 11:19:02.349229', true, null, '2023-09-08 11:19:02.349221', 'Ez a gyönyörű, két szintes családi ház minden igényt kielégít. A ház modern stílusban lett tervezve, és magas minőségű anyagokból épült. A tágas nappali nagy ablakokkal rendelkezik, így természetes fény árad be a helyiségbe. A modern konyha új konyhai eszközökkel és elegáns csempekkel van felszerelve, és közvetlen hozzáférést biztosít az étkezőhöz.
A ház négy hálószobával rendelkezik, amelyek mindegyike tágas és kényelmes. Az egyik hálószoba a földszinten található, így ideális lehet idősebb családtagoknak vagy vendégeknek.', 500, 'GAS', 47.52213880663478, 'ACTIVE', 'SELL', 19.161252788279292, 'Egy szép ház', 2, 4, 'SUMMER_HOUSE', null, 5, 1, 50);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (6, '2023-09-08 11:19:39.500874', false, null, '2023-09-08 11:19:39.500867', '1 szoba kiadó a lakásban, másik 3 emberrel megosztva van fürdőszoba, konyha, állatokat nem lehet hozni', 25, 'CENTRAL_HEATING', 46.083112462935816, 'ACTIVE', 'RENT', 18.237067527571934, 'Pécsi szoba', 1, 1, 'CONDO', null, 6, 2, 15);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (7, '2023-09-08 11:21:46.515955', true, null, '2023-09-08 11:21:46.515947', 'Nagyon délen Nagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délenNagyon délen', 300, 'ELECTRIC', 46.24779553754815, 'ACTIVE', 'SELL', 20.14061182573053, 'Szegeden jó!', 3, 5, 'MULTI_FAMILY', null, 7, 3, 100);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (8, '2023-09-15 08:47:04.983131', true, null, '2023-09-15 08:47:04.983950', 'Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 50, 'CENTRAL_HEATING', 47.53641243322743, 'ACTIVE', 'SELL', 19.06965019549939, 'Hangulatos lakás Budapesten', 1, 2, 'APARTMENT', null, 8, 10, 30);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (9, '2023-09-15 09:10:27.262651', true, null, '2023-09-15 09:10:27.262687', 'Szép kertes ház, csendes, nyugodt környéken, ideális fiatal pároknak, akik családot szeretnének kezdeni, állatbarát', 135, 'GAS', 46.08750963769074, 'ACTIVE', 'SELL', 18.249404132366184, 'Kertes ház', 1.5, 3, 'HOUSE', null, 9, 2, 19.5);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (10, '2023-09-15 10:35:43.013517', false, null, '2023-09-15 10:35:43.013553', 'Ez a tágas és világos lakás minden igényt kielégít. A praktikus elrendezés és a modern kialakítás tökéletes kombinációját nyújtja. A közelsége a közlekedési csomópontokhoz és a bevásárlási lehetőségekhez még kényelmesebbé teszi mindennapi életét. Ne hagyja ki ezt a remek lehetőséget!', 35, 'CENTRAL_HEATING', 47.4350486, 'ACTIVE', 'SELL', 19.0976808, 'Lakás Erzsébetfalván', 1, 2, 'APARTMENT', null, 10, 10, 46);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (11, '2023-09-15 10:38:19.749340', false, null, '2023-09-15 10:38:19.749376', 'Kiadó lakás, 2 hálószobával és 1 fürdőszobával, csak kisállatokat lehet hozni (hörcsög, halak, stb)', 30, 'CENTRAL_HEATING', 46.066685567632454, 'ACTIVE', 'RENT', 18.20405870676041, 'Pécsi lakás', 1, 2, 'APARTMENT', null, 11, 2, 0.3);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (12, '2023-09-15 11:51:40.453344', true, null, '2023-09-15 11:51:40.453409', 'Szegeden a külvárosban található 4 szobás ház, ideális kisgyerekes családok részére, állatokat is lehet hozni, elég nagy a kert.', 180, 'ELECTRIC', 46.26969284924324, 'ACTIVE', 'SELL', 20.133704245090485, 'Szegedi nyaraló', 2, 4, 'SUMMER_HOUSE', null, 12, 2, 50);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (13, '2023-09-15 12:35:44.377522', true, null, '2023-09-15 12:35:44.377571', 'Szegeden a külvárosban található 4 szobás ház, ideális kisgyerekes családok részére, állatokat is lehet hozni, elég nagy a kert.', 180, 'ELECTRIC', 47.458129127850036, 'INACTIVE', 'SELL', 19.14418369531632, 'Szegedi nyaraló', 2, 3, 'HOUSE', null, 13, 13, 19.5);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (14, '2023-09-15 12:55:02.459230', true, null, '2023-09-15 12:55:02.459279', 'Szegeden a külvárosban található 4 szobás ház, ideális kisgyerekes családok részére, állatokat is lehet hozni, elég nagy a kert.', 120, 'ELECTRIC', 47.458013062518035, 'ACTIVE', 'SELL', 19.14416760206223, 'Budapesti ház', 1.5, 4, 'HOUSE', null, 14, 13, 20);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (15, '2023-09-15 13:48:47.067487', true, null, '2023-09-15 13:48:47.067531', 'Budapesten a külvárosban található 4 szobás ház, ideális kisgyerekes családok részére, állatokat is lehet hozni, elég nagy a kert.', 130, 'ELECTRIC', 47.45800943547228, 'ACTIVE', 'SELL', 19.144065678119663, 'Budapesti lakás', 1.5, 4, 'HOUSE', null, 15, 13, 23.3);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (16, '2023-09-18 15:52:46.832796', true, null, '2023-09-18 15:52:46.833266', 'Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 35, 'GAS', 47.44660539405646, 'ACTIVE', 'SELL', 19.12460280461833, 'A kedvenc lakásom', 1, 1, 'APARTMENT', null, 16, 3, 30);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (17, '2023-09-21 12:45:52.490673', false, null, '2023-09-21 12:45:52.490707', 'Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 77, 'GAS', 47.51321852876996, 'INACTIVE', 'SELL', 19.180181423906014, 'A Kertek Alatt', 2, 3, 'HOUSE', null, 17, 10, 77);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (18, '2023-09-21 13:52:03.158022', false, null, '2023-09-21 13:52:03.158082', 'Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 55, 'CENTRAL_HEATING', 47.50961127653377, 'ACTIVE', 'SELL', 19.12668418207164, 'Budapesti lakas', 1, 2, 'APARTMENT', null, 18, 1, 55);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (19, '2023-09-21 15:11:33.892675', true, null, '2023-09-21 15:11:33.892713', 'Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 100, 'ELECTRIC', 47.50542445, 'INACTIVE', 'RENT', 19.05337385219467, 'New property', 1, 3, 'APARTMENT', null, 19, 3, 90);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (20, '2023-09-22 06:20:26.775533', true, null, '2023-09-22 06:20:26.776129', 'Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 100, 'CENTRAL_HEATING', 47.518268270057966, 'INACTIVE', 'SELL', 19.130805056885347, 'Egy szép ház', 2.5, 3, 'APARTMENT', null, 20, 10, 55);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (21, '2023-09-22 06:50:16.846422', false, null, '2023-09-22 06:50:16.847102', '
Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 100, 'GAS', 47.567812402254155, 'INACTIVE', 'SELL', 19.099211683313783, 'Nice house', 2.5, 3, 'HOUSE', null, 21, 10, 55);
INSERT INTO moovsmart.property (property_id, activated_at, air_conditioning, archived_at, created_at, description, floor_area, heating_type, latitude, listing_status, listing_type, longitude, name, number_of_bathrooms, number_of_bedrooms, property_type, property_uuid, address_id, owner_user_id, price) VALUES (22, '2023-09-22 08:47:35.991882', false, null, '2023-09-22 08:47:35.991911', '
Ez a lenyűgöző lakás a Budapest szívében található, kiváló elhelyezkedése révén könnyű hozzáférést biztosít a város minden kincséhez. A gyönyörű kilátás és a modern berendezések egyedülálló otthont teremtenek, ahol minden kényelmet megtalál. Budapest legjobb részei csak egy rövid sétára vannak innen, így ne hagyja ki ezt a ritka lehetőséget!', 55, 'CENTRAL_HEATING', 47.43400806665913, 'ACTIVE', 'SELL', 19.11569518256852, 'Egy szép ház', 3.5, 3, 'HOUSE', null, 22, 10, 66);


INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (1, '2023-09-13 15:46:49.196397', 4, '2023-09-20 18:46:00', false, 10, '2023-09-20 20:46:00', 3);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (2, '2023-09-15 07:37:02.662771', 6, '2023-09-22 09:36:00', false, 10, '2023-09-22 12:36:00', 4);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (3, '2023-09-15 10:39:41.626584', 0, '2023-09-23 14:15:00', false, 12, '2023-09-23 16:00:00', 9);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (4, '2023-09-15 10:43:07.398108', 0, '2023-09-16 16:00:00', false, 8, '2023-09-16 18:00:00', 6);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (5, '2023-09-15 10:43:48.623499', 0, '2023-09-18 18:00:00', false, 5, '2023-09-18 20:00:00', 11);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (6, '2023-09-15 11:54:06.902427', 0, '2023-09-19 13:53:00', false, 10, '2023-09-19 17:53:00', 3);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (7, '2023-09-15 12:31:34.008643', 6, '2023-09-16 17:30:00', false, 10, '2023-09-16 19:30:00', 1);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (8, '2023-09-15 12:51:40.379638', 4, '2023-09-16 14:54:00', false, 10, '2023-09-16 15:57:00', 1);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (9, '2023-09-15 13:45:05.446280', 0, '2023-09-16 17:44:00', false, 11, '2023-09-16 20:44:00', 1);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (10, '2023-09-21 12:08:51.690921', 2, '2023-09-25 14:08:00', false, 15, '2023-09-25 17:08:00', 3);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (11, '2023-09-21 12:41:48.852390', 4, '2023-09-23 14:41:00', false, 10, '2023-09-23 14:50:00', 8);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (13, '2023-09-22 06:34:19.710077', 4, '2023-09-25 08:34:00', false, 15, '2023-09-25 12:34:00', 16);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (14, '2023-09-22 06:34:44.818766', 0, '2023-09-27 08:34:00', false, 10, '2023-09-27 12:34:00', 16);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (15, '2023-09-22 06:35:06.768994', 0, '2023-09-29 08:34:00', false, 15, '2023-09-29 08:35:00', 16);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (16, '2023-09-28 09:08:59.547562', 0, '2023-09-30 11:08:00', false, 20, '2023-09-30 04:08:00', 8);
INSERT INTO moovsmart.open_house (open_house_id, created_at, current_participants, from_time, is_active, max_participants, to_time, property_id) VALUES (17, '2023-09-28 09:09:43.231757', 0, '2023-09-30 11:09:00', false, 20, '2023-09-30 05:09:00', 10);

INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (1, 2, 2, 3);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (2, 2, 1, 3);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (3, 2, 1, 2);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (4, 3, 7, 13);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (5, 4, 8, 13);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (6, 3, 7, 13);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (7, 2, 2, 3);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (8, 2, 10, 3);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (9, 3, 11, 10);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (10, 1, 11, 1);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (12, 2, 2, 3);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (13, 1, 13, 2);
INSERT INTO moovsmart.booking (booking_id, places_to_book, open_house_id, user_id) VALUES (14, 3, 13, 10);


INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (1, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F106399%2Fpexels-photo-106399.jpeg%3Fcs%3Dsrgb%26dl%3Darchitecture-family-house-front-yard-106399.jpg%26fm%3Djpg&f=1&nofb=1&ipt=9fbb8a4f4cafba7a01a275f5a99139743127e8f');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (1, 'https://www.thewowstyle.com/wp-content/uploads/2015/06/interior2.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (3, 'https://photos.zillowstatic.com/fp/159313813ec8ea2cdab543913544871f-cc_ft_960.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (3, 'https://photos.zillowstatic.com/fp/9edbfa43c77fc184d7468d5d5acbe048-cc_ft_384.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (3, 'https://photos.zillowstatic.com/fp/d765088da6f5a6fcb15a86d6516d1edd-cc_ft_384.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (4, 'https://photos.zillowstatic.com/fp/fa837cc3b8eec9265eaa2737e366f19b-cc_ft_1536.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (4, 'https://photos.zillowstatic.com/fp/295425ed56704d4356ff82dcfebac464-cc_ft_384.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (4, 'https://photos.zillowstatic.com/fp/8ece847eaf329fd8311143a86f2095af-cc_ft_384.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (5, 'https://img.staticmb.com/mbcontent/images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (6, 'https://mt.ingatlancdn.com/db/64/120875583_l_0.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (6, 'https://mt.ingatlancdn.com/17/d0/120875584_m_0.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (6, 'https://mt.ingatlancdn.com/20/d6/120875585_m_0.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (7, 'https://photos.zillowstatic.com/fp/22d289da849779e9d77e929e087fbd3c-cc_ft_1536.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (1, 'https://www.architectureartdesigns.com/wp-content/uploads/2016/07/16-Charming-Mediterranean-Kitchen-Designs-That-Will-Mesmerize-You-15.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (1, 'https://www.thewowstyle.com/wp-content/uploads/2015/02/Traditional-bedroom-interior-design-4.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (8, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--LfSv25jZ--/v1694767626/property/ParkLine-apartment-in-Miami-FL_tfkc4c.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (8, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--umkqsoBU--/v1694767627/property/Renting_an_Apartment_in_Seattle_BellCentre_1_csyjcy.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (8, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--EMuUDw3M--/v1694767628/property/Screen-Shot-2022-02-04-at-2.28.40-PM_yocfar.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (9, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--kVdOwzIB--/v1694769028/property/f7194d77e895906ab91aa50f60a20627-1976646446_i9fmik.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (9, 'https://kowalske.com/wp-content/uploads/2022/01/oconomowoc-remodel-2048x1024.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (9, 'https://www.decorilla.com/online-decorating/wp-content/uploads/2020/07/Shabby-chic-house-bedroom-design-inside.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (10, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--PuSiGOl4--/v1694774143/property/10218504_26d1f2def0b909932367c7ac329a2ff1_wm_u3dbec.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (10, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--lj3182f6--/v1694774145/property/download_puj9ap.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (11, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--4fE1rijk--/v1694774300/property/Flat-Bedroom-alt_uqjux2.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (11, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--l5h4RlUQ--/v1694774301/property/download_qbzxmr.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (11, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--YVvyKfGC--/v1694774302/property/at_house_tours_archive_BEN_AND_TOM_APARTMENT_TOUR_43f3722f515f0af715df151ed71c5bf958696282_odkdh5.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (12, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--o36HHwY---/v1694778701/property/f7194d77e895906ab91aa50f60a20627-1976646446_day0bx.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (12, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--qelA5dNT--/v1694778702/property/bedrooms-1890378534_lyt67a.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (12, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--s9l068MX--/v1694778704/property/2016-Simple-Small-House-Kitchen-Designs-413385488_o5eryq.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (13, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--zGdsYQx---/v1694781345/property/f7194d77e895906ab91aa50f60a20627-1976646446_qkezaa.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (13, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--xcBzQXLw--/v1694781346/property/bedrooms-1890378534_g2rrix.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (13, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--gRX6YFmT--/v1694781347/property/2016-Simple-Small-House-Kitchen-Designs-413385488_dtpsnx.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (14, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--K8kSZ_E_--/v1694782503/property/f7194d77e895906ab91aa50f60a20627-1976646446_n3if1c.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (14, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--4WoLiXY1--/v1694782504/property/bedrooms-1890378534_npgxkj.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (14, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--5yav-I3u--/v1694782505/property/2016-Simple-Small-House-Kitchen-Designs-413385488_ls86bd.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (15, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--R2-vRg0f--/v1694785728/property/f7194d77e895906ab91aa50f60a20627-1976646446_ecywzb.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (15, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--AoGsW3FW--/v1694785729/property/bedrooms-1890378534_cthqgf.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (15, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--SADrL9Zw--/v1694785730/property/2016-Simple-Small-House-Kitchen-Designs-413385488_sco609.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (16, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--s_PhOHQG--/v1695052367/property/10218504_26d1f2def0b909932367c7ac329a2ff1_wm_xf0kdb.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (16, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--xnXRzi-i--/v1695052374/property/download_q7rh0u.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (16, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--nufme2OZ--/v1695052377/property/dsc06230_bxspje.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (16, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--ysGZqvUJ--/v1695052378/property/ParkLine-apartment-in-Miami-FL_eorgvg.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (17, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--Eq2a8Vwq--/v1695300353/property/Screen-Shot-2022-02-04-at-2.28.40-PM_cjwaji.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (18, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--Dpubjwrz--/v1695304324/property/Screen-Shot-2022-02-04-at-2.28.40-PM_badthh.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (18, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--CzFZ__6T--/v1695304442/property/dsc06230_iscgqd.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (19, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--sBeq8W_6--/v1695309094/property/bayview_3_oalaa9.png');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (19, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--8nA1jnpz--/v1695309095/property/bayview_2_rxk7up.png');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (20, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--Y-7VkpW6--/v1695363627/property/Renting_an_Apartment_in_Seattle_BellCentre_1_a5trzb.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (20, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--AcJ39xMi--/v1695363629/property/Screen-Shot-2022-02-04-at-2.28.40-PM_excwvx.webp');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (21, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--R4smpDid--/v1695365417/property/download_ho93i1.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (21, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--5lyWMC1L--/v1695365418/property/dsc06230_s7ef1v.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (22, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--blpiYtVx--/v1695372456/property/download_k98onb.jpg');
INSERT INTO moovsmart.property_images (property_property_id, images) VALUES (22, 'http://res.cloudinary.com/dai5h04h9/image/authenticated/s--khO6f2OT--/v1695372457/property/Renting_an_Apartment_in_Seattle_BellCentre_1_vfou6s.jpg');


INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (6, 1);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (18, 1);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (3, 2);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (11, 2);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (1, 3);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (3, 3);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (4, 3);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (15, 3);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (16, 3);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (18, 3);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (4, 7);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (6, 7);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (9, 7);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (16, 7);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (22, 7);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (7, 8);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (11, 8);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (15, 8);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (8, 10);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (15, 10);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (16, 10);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (18, 10);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (1, 13);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (3, 13);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (4, 13);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (10, 13);
INSERT INTO moovsmart.user_like_property (property_id, user_id) VALUES (15, 14);
