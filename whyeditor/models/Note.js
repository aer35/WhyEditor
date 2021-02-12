import * as SQLite from "expo-sqlite";
import { BaseModel, types } from "expo-sqlite-orm";

export default class Note extends BaseModel {
  constructor(obj) {
    super(obj);
  }

  static get database() {
    return async () => SQLite.openDatabase("database.db");
  }

  static get tableName() {
    return "Notes";
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      text: { type: types.TEXT, not_null: true },
      timestamp: {
        type: types.DATETIME,
        not_null: true,
        default: () => Date.now()
      }
    };
  }
}
