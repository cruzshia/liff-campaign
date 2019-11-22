'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

/*
  # id: int
  # uid: string
  # rid: string
  status: string
  waist_circumference: number
  offal_fat: number
  wc_diff: number
  of_diff: number
  week: number
  created_at: datetime
  updated_at: datetime
*/
exports.up = function(db) {
  return db.createTable('estimation_logs', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    uid: { type:'string', notNull: true, },
    rid: { type:'string', notNull: true, },
    status: { type:'string', notNull: true, defaultValue: 'requested' },
    waist_circumference: 'real',
    offal_fat: 'real',
    wc_diff: 'real',
    of_diff: 'real',
    week: { type:'int', notNull: true, defaultValue: 1 },
    created_at: 'datetime',
    updated_at: 'datetime',
  });
};

exports.down = function(db) {
  return db.dropTable('estimation_logs');
};

exports._meta = {
  "version": 1
};
