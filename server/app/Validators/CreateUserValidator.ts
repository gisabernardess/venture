import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email({
        sanitize: true, // transform the local part of the email (before the @ symbol) to all lowercase.
      }),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [
      rules.confirmed("password_confirmation"),
      rules.minLength(8),
    ]),
  });

  public messages = {
    required: "{{ field }} is required to sign up",
    minLength: "The password must have {{ options.minLength }} characters",
    "email.unique": "Email already registered",
  };
}
