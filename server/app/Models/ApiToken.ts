import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class ApiToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public token: string;

  @column.dateTime()
  public expiresAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @belongsTo(() => User, {
    localKey: "id",
    foreignKey: "userId",
    serializeAs: "user",
  })
  public user: BelongsTo<typeof User>;
}
