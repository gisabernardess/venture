import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

/**
 *  @swagger
 *  components:
 *   schemas:
 *    ApiToken:
 *      description: Opaque Access Token to authenticate the user requests
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *        userId:
 *          type: integer
 *          format: int64
 *        name:
 *          type: string
 *        type:
 *          type: string
 *        token:
 *          type: string
 *          format: byte
 *        expiresAt:
 *          type: string
 *          format: date-time
 *        createdAt:
 *          type: string
 *          format: date-time
 *      required:
 *        - id
 *        - userId
 *        - name
 *        - type
 *        - token
 *        - createdAt
 */
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
