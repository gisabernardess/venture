import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.number(),
    slug: schema.string({ trim: true }, [
      rules.unique({ table: "posts", column: "slug" }),
    ]),
    title: schema.string({ trim: true }),
    excerpt: schema.string.optional({ trim: true }),
    content: schema.string({ trim: true }),
  });

  public messages = {
    required: "{{ field }} is required",
    "slug.unique": "Post already registered with this slug",
  };
}
