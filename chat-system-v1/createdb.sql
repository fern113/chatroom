CREATE TABLE USER(
   ID   BIGINT                      NOT NULL AUTO_INCREMENT,
   USERNAME VARCHAR (30)            NOT NULL,
   EMAIL  VARCHAR(48)               NOT NULL,
   PASSWORD  VARCHAR (64) ,         NOT NULL,
   ROLE   ENUM ('admin', 'member')  NOT NULL,       
   UNIQUE KEY (USERNAME, EMAIL),
   PRIMARY KEY (ID)
);