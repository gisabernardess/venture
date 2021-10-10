import { schema } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateCommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    postId: schema.number(),
    userId: schema.number(),
    text: schema.string({ trim: true }),
  });

  public messages = {};
}
