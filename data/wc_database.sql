/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2014/11/17 21:48:31                          */
/*==============================================================*/


drop table if exists tbl_user;

/*==============================================================*/
/* Table: tbl_user                                                  */
/*==============================================================*/
create table tbl_user
(
   user_id              int not null auto_increment,
   name                 varchar(256) not null,
   pwd			varchar(256) not null,
   user_type		int not null ,
   nickname		varchar(256),
   email		varchar(256),
   mobile		varchar(256),
   question		varchar(256),
   answer		varchar(256),
   question2		varchar(256),
   answer2		varchar(256),
   question3		varchar(256),
   answer3		varchar(256),
   remark               varchar(4096),
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (user_id)
);


