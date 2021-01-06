
# PSQL

CREATE TABLE post(
  post_id int not null,
  title text not null,
  likes int not null,
  views bigint not null,
  PRIMARY KEY(post_id)
);
CREATE TABLE comment(
  comment_id serial not null,
  post_id int not null,
  alias varchar(30) not null,
  content varchar(3000) not null,
  avatar text,
  status text DEFAULT 'review' not null,
  admin boolean DEFAULT false not null,
  created timestamp with time zone DEFAULT CURRENT_TIMESTAMP not null,
  updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP not null,
  PRIMARY KEY(comment_id),
  CONSTRAINT fk_post
    FOREIGN KEY(post_id)
      REFERENCES post(post_id)
);
CREATE TABLE admin(
  email text not null,
  password text not null,
  PRIMARY KEY(email)
);

drop table comment CASCADE;
drop table post CASCADE;
drop table admin CASCADE;

UPDATE admin SET password='' WHERE email='';

INSERT INTO comment(post_id, alias, content) VALUES (12, 'ms. puff', 'no they are nice and smooth');

INSERT INTO admin(email, password) VALUES ('EMAIL_HERE', 'PASSWORD_HERE');
INSERT INTO post(post_id, title, likes, views) VALUES (1, 'Photography Website', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (2, 'Django Personal Blog', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (3, 'Django Social Media', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (4, 'Tech Support Shop', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (5, 'Ellucian Help Desk Technician', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (6, 'Asteroid BattleGrounds: Game Jam Orlando', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (7, 'Ellucian DevOps Intership Details', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (8, 'Creation of this Blog', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (9, 'Ellucian Cloud Internship Extenstion', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (10, 'Creating the Landing Page', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (11, 'eCRM Dashboard', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (12, 'Senior Project Trafficking Spotters', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (13, 'Senior Semester Final, E-commerce Site', 0, 0);
INSERT INTO post(post_id, title, likes, views) VALUES (14, 'Ellucian Search Engine', 0, 0);