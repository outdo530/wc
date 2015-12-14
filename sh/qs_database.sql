/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2014/11/17 21:48:31                          */
/*==============================================================*/


drop table if exists area;

drop table if exists class;

drop table if exists class__question;

drop table if exists knowledge;

drop table if exists question;

drop table if exists question__knowledge;

drop table if exists question__solution;

drop table if exists question_type;

drop table if exists solution;

drop table if exists test_paper;

drop table if exists test_paper__question;

drop table if exists user;

/*==============================================================*/
/* Table: area                                                  */
/*==============================================================*/
create table area
(
   area_id              int not null auto_increment,
   name                 varchar(256) not null,
   parent_id            int not null default 0,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (area_id)
);

/*==============================================================*/
/* Table: class                                                 */
/*==============================================================*/
create table class
(
   class_id             int not null auto_increment,
   name                 varchar(256) not null,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (class_id)
);

/*==============================================================*/
/* Table: class__question                                       */
/*==============================================================*/
create table class__question
(
   cq_id                int not null auto_increment,
   question_id          int,
   class_id             int,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (cq_id)
);

/*==============================================================*/
/* Table: knowledge                                             */
/*==============================================================*/
create table knowledge
(
   knowledge_id         int not null auto_increment,
   class_id             int,
   name                 varchar(4096) not null,
   content              varchar(8192) not null,
   level                int not null default 0,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (knowledge_id)
);

/*==============================================================*/
/* Table: question                                              */
/*==============================================================*/
create table question
(
   question_id          int not null auto_increment,
   question_type_id     int,
   area_id              int,
   name                 varchar(200),
   origin_mark          int comment '原始分数',
   level                int not null default 0 comment '难度等级：   1,2,3， 初始可以分为： 难，中，易；以后可以，根据需要划分。',
   weight               numeric(20,4) not null default 0 comment '权重，以后如果有需要可以使用， 分析',
   title                varchar(4096) not null,
   answer               varchar(8192) not null,
   option_1             varchar(2048),
   option_2             varchar(2048),
   option_3             varchar(2048),
   option_4             varchar(2048),
   option_5             varchar(2048),
   option_6             varchar(2048),
   option_7             varchar(2048),
   option_9             varchar(2048),
   option_8             varchar(2048),
   option_10            varchar(2048),
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (question_id)
);

/*==============================================================*/
/* Table: question__knowledge                                   */
/*==============================================================*/
create table question__knowledge
(
   qk_id                int not null auto_increment,
   question_id          int,
   knowledge_id         int,
   relevance            int not null default 100 comment '相关度--  0 ~100； 默认100',
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (qk_id)
);

/*==============================================================*/
/* Table: question__solution                                    */
/*==============================================================*/
create table question__solution
(
   question_solution_id int not null auto_increment,
   question_id          int,
   solution_id          int,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (question_solution_id)
);

/*==============================================================*/
/* Table: question_type                                         */
/*==============================================================*/
create table question_type
(
   question_type_id     int not null auto_increment,
   name                 varchar(256) not null,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (question_type_id)
);

/*==============================================================*/
/* Table: solution                                              */
/*==============================================================*/
create table solution
(
   solution_id          int not null auto_increment,
   name                 varchar(4096),
   content              varchar(20480) not null,
   level                int not null default 0,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (solution_id)
);

/*==============================================================*/
/* Table: test_paper                                            */
/*==============================================================*/
create table test_paper
(
   test_paper_id        int not null auto_increment,
   name                 varchar(2048) not null,
   target_mark          int not null default 0,
   remark               varchar(4096),
   crt_id               int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (test_paper_id)
);

/*==============================================================*/
/* Table: test_paper__question                                  */
/*==============================================================*/
create table test_paper__question
(
   tpq_id               int not null auto_increment,
   question_id          int,
   test_paper_id        int,
   real_mark            int not null default 0,
   remark               varchar(4096),
   user_id              int not null default 0,
   crt_dt               timestamp not null default CURRENT_TIMESTAMP,
   upd_dt               timestamp,
   is_del               int not null default 0,
   primary key (tpq_id)
);

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   user_id              int not null auto_increment,
   name                 varchar(256) not null,
   title                varchar(128),
   remark               varchar(4096),
   crt_id               int not null,
   crt_dt               timestamp not null,
   upd_dt               timestamp,
   is_del               int not null,
   primary key (user_id)
);

