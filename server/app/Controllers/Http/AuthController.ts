import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";

type GitHubUser = {
  email: string | null;
};

export default class AuthController {
  /**
   * @swagger
   * /register:
   *   post:
   *     tags:
   *       - auth
   *     summary: creates a user
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - password
   *             properties:
   *               name:
   *                 type: string
   *                 example: Jane Doe
   *               email:
   *                 type: string
   *                 example: email@domain.com
   *               password:
   *                 type: string
   *                 format: password
   *     responses:
   *       201:
   *         description: user created
   *       400:
   *         description: validation fails
   */
  public async register({ request, response }: HttpContextContract) {
    try {
      const { name, email, password } = await request.validate(
        CreateUserValidator
      );

      const user = await User.create({
        name,
        email,
        password,
      });

      return response.status(201).send(user);
    } catch (error) {
      response.badRequest(error.message);
    }
  }

  /**
   * @swagger
   * /login:
   *   post:
   *     tags:
   *       - auth
   *     summary: authenticates a user
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
   *     responses:
   *       200:
   *         description: login successful
   *       400:
   *         description: validation fails
   */
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = request.all();

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "24hours",
      });

      return response.status(200).send(token.toJSON());
    } catch (error) {
      response.badRequest(error.message);
    }
  }

  public async githubAuthentication({
    ally,
    auth,
    response,
  }: HttpContextContract) {
    const github = ally.use("github");
    const githubUser: GitHubUser = await github.user();

    if (github.accessDenied()) {
      return response.status(400).send({ error: "Access was denied" });
    }

    if (github.stateMisMatch()) {
      return response.status(400).send({ error: "Request expired. Try again" });
    }

    if (github.hasError()) {
      return response.status(400).send({ error: github.getError() });
    }

    if (!githubUser.email) {
      return response.status(400).send({ error: "Invalid account." });
    }

    const user = await User.firstOrCreate(
      { email: githubUser.email },
      // TODO: decide if the password should be null in such cases
      { role: "PLAYER", password: "AUTHENTICATED_WITH_GITHUB" }
    );

    await auth.use("api").login(user);
  }
}
