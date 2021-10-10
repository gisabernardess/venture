import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public postId: number;

  @column()
  public userId: number;

  @column()
  public text: string;

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @hasOne(() => User, {
    localKey: "userId",
    foreignKey: "id",
    serializeAs: "author",
  })
  public user: HasOne<typeof User>;
}
