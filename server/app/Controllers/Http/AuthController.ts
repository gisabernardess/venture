import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class AuthController {
  /**
   * @swagger
   * /register:
   *   post:
   *     tags:
   *       - auth
   *     summary: creates a user
   *     responses:
   *       201:
   *         description: user created
   *       400:
   *         description: validation fails
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: email@domain.com
   *               password:
   *                 type: string
   *                 format: password
   */
  public async register({ request, response }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(CreateUserValidator);

      const user = await User.create({
        email,
        password,
        role: "PLAYER",
      });

      return response.status(201).send(user);
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - auth
   *     summary: authenticates a user
   *     responses:
   *       200:
   *         description: login successful
   *       400:
   *         description: validation fails
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: email@domain.com
   *               password:
   *                 type: string
   *                 format: password
   */
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = request.all();

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "24hours",
      });

      return response.status(200).send(token.toJSON());
    } catch (error) {
      response.badRequest(error.messages);
    }
  }
}
