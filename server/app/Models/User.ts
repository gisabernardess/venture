import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  beforeSave,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import ApiToken from "./ApiToken";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: "avatarUrl" })
  public avatarUrl: string | null;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  public oldPassword: string;

  @column()
  public role: string;

  @column.dateTime({ autoCreate: true, serializeAs: "createdAt" })
  public createdAt: DateTime;

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: "updatedAt",
  })
  public updatedAt: DateTime;

  @hasMany(() => ApiToken, {
    serializeAs: null,
  })
  public tokens: HasMany<typeof ApiToken>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  checkPassword(password: string) {
    return Hash.verify(this.password, password);
  }
}
