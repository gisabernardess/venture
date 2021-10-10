import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Comment from "./Comment";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public slug: string;

  @column()
  public title: string;

  @column()
  public excerpt: string;

  @column()
  public content: string;

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    localKey: "id",
    foreignKey: "userId",
    serializeAs: "user",
  })
  public user: BelongsTo<typeof User>;

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>;
}
