import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import User from "App/Models/User";

export default class UsersController {
  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *       - user
   *     summary: list all users
   *     responses:
   *       '200':
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
   *       200:
   *         description: user created
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
   *                 example: 123456
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
   *         description: user created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/User"
   *       400:
   *         description: Invalid ID supplied
   *       404:
   *         description: User not found
   */
  public async show() {
    return "Return a single user";
  }

  /**
   * @swagger
   * /user/{id}:
   *   put:
   *     tags:
   *       - user
   *     summary: updates an existing user
   *     description: this can only be done by the logged in user.
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: User object that needs to be added to the store
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
   */
  public async update() {
    return "Handle user update form submission";
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
    return "Delete user";
  }
}
