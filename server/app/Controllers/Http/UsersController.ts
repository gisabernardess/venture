import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { string } from "@ioc:Adonis/Core/Helpers";

import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.all();
    const limit = 10;

    const users = await User.query().paginate(page, limit);

    return users.toJSON();
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params();
    return await User.findOrFail(id);
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const { name, email, role } = await request.validate(CreateUserValidator);

      return await User.create({
        name,
        email,
        role: role ?? "PLAYER",
        password: string.generateRandom(8),
      });
    } catch (error) {
      response.notImplemented(error.message);
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { id, avatarUrl, name, email, oldPassword, password, role } =
        request.all();

      const user = await User.find(id);
      if (!user) return response.status(404).send({ error: "User not found" });

      if (email && email !== user.email) {
        const userExists = await User.find({ where: { email } });
        if (userExists)
          return response.status(400).send({
            error: "There is a user with this email. Try another one",
          });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return response.status(400).send({ error: "Invalid current password" });
      }

      return await user
        .merge({
          avatarUrl,
          name,
          email,
          password,
          role,
        })
        .save();
    } catch (error) {
      response.notImplemented(error.message);
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();

    const user = await User.findOrFail(id);
    if (!user) return response.status(404).send({ error: "User not found" });

    return await user.delete();
  }
}
