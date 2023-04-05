create database social;

CREATE TABLE social_users
(
    id_user bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    s_first_name character varying(50) NOT NULL,
    s_last_name character varying(50) NOT NULL,
    s_email character varying(50) NOT NULL,
    s_password character varying(20) NOT NULL,
    b_del integer NOT NULL DEFAULT 0,
    dt_ins timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user)
);

ALTER TABLE social_users
    ADD CONSTRAINT "CNST_SOCIAL_USERS_MAIL" UNIQUE (s_email);
create index "IDX_SOCIAL_USERS_MAIL_PASS" on SOCIAL_USERS (s_email, s_password);

CREATE TABLE social_messages
(
    id_msg bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_sender bigint NOT NULL,
    id_reciever bigint NOT NULL,
    s_msg character varying(500) NOT NULL,
    dt_ins timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_msg)
);

ALTER TABLE social_messages
    ADD CONSTRAINT "FK_SOCIAL_MSG_SENDER" FOREIGN KEY (id_sender)
    REFERENCES social_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
ALTER TABLE social_messages
    ADD CONSTRAINT "FK_SOCIAL_MSG_RECIEVER" FOREIGN KEY (id_reciever)
    REFERENCES social_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

CREATE TABLE social_files
(
    id_file bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    id_user bigint NOT NULL,
    s_name character varying(50) NOT NULL,
    dt_ins timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_file)
);

ALTER TABLE social_files
    ADD CONSTRAINT "FK_SOCIAL_FILES_USER" FOREIGN KEY (id_user)
    REFERENCES social_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

CREATE TABLE social_msg_files
(
    id_msg bigint NOT NULL,
    id_file bigint NOT NULL,
    PRIMARY KEY (id_msg, id_file)
);

ALTER TABLE social_msg_files
    ADD CONSTRAINT "FK_SOCIAL_MF_MSG" FOREIGN KEY (id_msg)
    REFERENCES social_messages (id_msg)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
ALTER TABLE social_msg_files
    ADD CONSTRAINT "FK_SOCIAL_MF_FILE" FOREIGN KEY (id_file)
    REFERENCES social_files (id_file)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

CREATE TABLE social_friends
(
    id_user bigint NOT NULL,
    id_friend bigint NOT NULL,
    PRIMARY KEY (id_user, id_friend)
);

ALTER TABLE social_friends
    ADD CONSTRAINT "FK_SOCIAL_FRIENDS_USER" FOREIGN KEY (id_user)
    REFERENCES social_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
ALTER TABLE social_friends
    ADD CONSTRAINT "FK_SOCIAL_FRIENDS_FRIEND" FOREIGN KEY (id_friend)
    REFERENCES social_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

CREATE TABLE social_friend_request
(
    id_user bigint NOT NULL,
    id_user_request bigint NOT NULL,
    i_state integer NOT NULL DEFAULT 0, -- 0 - request; 1 - accept; 2 - decline
    dt_ins timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_user_request)
);

ALTER TABLE social_friend_request
    ADD CONSTRAINT "FK_SOCIAL_FR_REQ_USER" FOREIGN KEY (id_user)
    REFERENCES social_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
ALTER TABLE social_friend_request
    ADD CONSTRAINT "FK_SOCIAL_FR_REQ_USER_REQ" FOREIGN KEY (id_user_request)
    REFERENCES social_users (id_user)
    ON UPDATE CASCADE
    ON DELETE CASCADE;
