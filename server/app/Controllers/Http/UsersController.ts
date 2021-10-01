import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class UsersController {
  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - user
   *     summary: list all users
   *     responses:
   *       200:
   *         description: users listed
   */
  public async index() {
    return await User.all();
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     tags:
   *       - user
   *     summary: finds a user by id
   *     description: return a single user
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of user to return
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *     responses:
   *       200:
   *         description: user exists
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/User"
   *       404:
   *         description: user not found
   */
  public async show({ request }: HttpContextContract) {
    const { id } = request.params();
    return await User.findOrFail(id);
  }

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
   *               - password_confirmation
   *             properties:
   *               name:
   *                 type: string
   *                 example: Jane Doe
   *               email:
   *                 type: string
   *                 example: email@domain.com
   *               role:
   *                 type: string
   *                 enum:
   *                   - PLAYER
   *                   - MODERATOR
   *                   - ADMIN
   *               password:
   *                 type: string
   *                 format: password
   *               password_confirmation:
   *                 type: string
   *                 format: password
   *     responses:
   *       201:
   *         description: user created
   *       400:
   *         description: validation fails
   *       501:
   *         description: not implemented
   */
  public async create({ request, response }: HttpContextContract) {
    try {
      const { name, email, role, password } = await request.validate(
        CreateUserValidator
      );

      return await User.create({
        name,
        email,
        role: role ?? "PLAYER",
        password,
      });
    } catch (error) {
      response.notImplemented(error.message);
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     tags:
   *       - user
   *     summary: updates an existing user
   *     description: this can only be done by the logged user.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: ID of user to return
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               avatarUrl:
   *                 type: string
   *               name:
   *                 type: string
   *                 example: Jane Doe
   *               email:
   *                 type: string
   *                 example: email@domain.com
   *               password:
   *                 type: string
   *                 format: password
   *               role:
   *                 type: string
   *                 enum:
   *                 - PLAYER
   *                 - MODERATOR
   *                 - ADMIN
   *     responses:
   *       200:
   *         description: user updated
   *       400:
   *         description: validation fails
   *       404:
   *         description: user not found
   */
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

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     tags:
   *       - user
   *     summary: deletes an existing user
   *     description: this can only be done by the logged user.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: the id that needs to be deleted
   *         required: true
   *         schema:
   *           $ref: #/components/schemas/User
   *     responses:
   *       200:
   *         description: user deleted
   *       404:
   *         description: user not found
   */
  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();

    const user = await User.findOrFail(id);
    if (!user) return response.status(404).send({ error: "User not found" });

    return await user.delete();
  }
}
