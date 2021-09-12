import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { DateTime } from "luxon";

import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import UpdateUserValidator from "App/Validators/UpdateUserValidator";
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
   * /users:
   *   post:
   *     tags:
   *       - user
   *     summary: creates a new user
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
  public async store({ request, response }: HttpContextContract) {
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
   * /user/{id}:
   *   get:
   *     tags:
   *       - user
   *     summary: finds a user by id
   *     description: return a single user
   *     parameters:
   *       - name: userId
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
   * /user/{id}:
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
   *         description: user object that needs to be updated
   *         required: true
   *         schema:
   *           $ref: #/components/schemas/User
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
      const user = await request.validate(UpdateUserValidator);
    } catch (error) {
      response.badRequest(error.messages);
    }
    const { id } = request.params();
    const user = await User.findOrFail(id);
    await user.merge({ updatedAt: DateTime.local() }).save();
    return user;
  }

  /**
   * @swagger
   * /user/{id}:
   *   delete:
   *     tags:
   *       - user
   *     summary: deletes an existing user
   *     description: this can only be done by the logged in user.
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
   *       400:
   *         description: Invalid ID supplied
   *       404:
   *         description: User not found
   *       405:
   *         description: Validation exception
   *
   */
  public async destroy() {
    const user = await User.findOrFail(1);
    await user.delete();
    return "Delete user";
  }
}
