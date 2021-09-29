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

/**
 *  @swagger
 *  components:
 *   schemas:
 *    User:
 *      description: Representation of a user
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *        avatarUrl:
 *          type: string
 *        name:
 *          type: string
 *          example: Jane Doe
 *        email:
 *          type: string
 *          example: email@domain.com
 *        password:
 *          type: string
 *          format: password
 *        role:
 *          type: string
 *          enum:
 *          - PLAYER
 *          - MODERATOR
 *          - ADMIN
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *      required:
 *        - id
 *        - email
 *        - password
 *        - role
 */
export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
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
