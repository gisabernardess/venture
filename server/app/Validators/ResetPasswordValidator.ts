import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email({
        sanitize: true, // transform the local part of the email (before the @ symbol) to all lowercase.
      }),
      rules.unique({ table: "users", column: "email" }),
    ]),
  });

  public messages = {
    required: "{{ field }} is required",
    "email.email": "Enter a valid email",
  };
}
