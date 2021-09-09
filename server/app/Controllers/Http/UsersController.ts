import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";

export default class UsersController {
  public async index() {
    return await User.all();
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *       - User
   *     summary: creates a new user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: user
   *         description: information to create a new user
   *         schema:
   *           type: object
   *           required:
   *             - email
   *             - password
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *     responses:
   *       200:
   *         description: user created
   */
  public async create({ request }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);

    const user = await User.create({
      email,
      password,
      role: "PLAYER",
    });

    return user;
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
