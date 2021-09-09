import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import { BaseModel, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";

/**
 *  @swagger
 *  components:
 *   schemas:
 *    User:
 *      description: A representation of a user
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *        avatarUrl:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
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

  @column()
  public role: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
