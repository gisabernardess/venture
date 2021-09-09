import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";

export default class UsersController {
  public async index() {
    return await User.all();
  }

  public async store({ request }: HttpContextContract) {
    return "Handle user creation form request";
  }

  public async show() {
    return "Return a single user";
  }

  public async update() {
    return "Handle user update form submission";
  }

  public async destroy() {
    return "Delete user";
  }
}
