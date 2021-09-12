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
   *       200:
   *         description: users listed
   */
  public async index() {
    return await User.all();
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
    const { id } = request.params();
    const { avatarUrl, name, email, oldPassword, password, role } =
      request.body();

    const user = await User.find(id);
    if (!user) return response.status(404).send({ error: "User not found" });

    if (email && email !== user.email) {
      const userExists = await User.find({ where: { email } });
      if (userExists)
        return response.status(400).send({ error: "User already exists!" });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(400).send({ error: "Password does not match!" });
    }

    await user
      .merge({
        avatarUrl,
        name,
        email,
        password,
        role,
      })
      .save();

    return user;
  }

  /**
   * @swagger
   * /users/{id}:
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
