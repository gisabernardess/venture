import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseContract } from "@ioc:Adonis/Core/Response";
import { string } from "@ioc:Adonis/Core/Helpers";
import { AllyDriverContract, Oauth2AccessToken } from "@ioc:Adonis/Addons/Ally";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";

import { endOfDay } from "date-fns";

import User from "App/Models/User";
import ApiToken from "App/Models/ApiToken";

import CreateUserValidator from "App/Validators/CreateUserValidator";
import ResetPasswordValidator from "App/Validators/ResetPasswordValidator";

type OAuthProviderUser = {
  email: string | null;
  name: string | null;
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
   *               - password_confirmation
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
  public async register({ auth, request, response }: HttpContextContract) {
    try {
      const { name, email, password } = await request.validate(
        CreateUserValidator
      );

      const user = await User.create({
        name,
        email,
        password,
      });

      const { token, expiresAt } = await this.generateToken(
        auth,
        email,
        password
      );

      return response.ok({ user: user, access: { token, expiresAt } });
    } catch (error) {
      response.notImplemented(error.message);
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
   *       404:
   *         description: user not found
   *       501:
   *         description: not implemented
   */
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = request.all();

      const user = await User.query()
        .where({
          email: email,
        })
        .preload("tokens", (query) =>
          query
            .where("expiresAt", ">", endOfDay(new Date()))
            .orderBy("expiresAt", "desc")
        )
        .first();

      if (!user) return response.notFound({ error: "User not found!" });

      if (!(await user.checkPassword(password))) {
        return response.badRequest({
          error: "Invalid password!",
        });
      }

      const { token, expiresAt } = await this.generateToken(
        auth,
        email,
        password,
        user.tokens
      );

      return response.ok({ user: user, access: { token, expiresAt } });
    } catch (error) {
      response.notImplemented(error);
    }
  }

  /**
   * @swagger
   * /logout:
   *   post:
   *     tags:
   *       - auth
   *     summary: revokes a user's token
   *     responses:
   *       200:
   *         description: logout successful
   */
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").revoke();
    return response.ok({ revoked: true });
  }

  /**
   * @swagger
   * /reset:
   *   post:
   *     tags:
   *       - auth
   *     summary: user's reset password
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *                 example: email@domain.com
   *     responses:
   *       200:
   *         description: email sent
   *       400:
   *         description: validation fails
   *       404:
   *         description: user not found
   *       500:
   *         description: server error
   */
  public async resetPassword({ request, response }: HttpContextContract) {
    try {
      const { email } = await request.validate(ResetPasswordValidator);

      const user = await User.findBy("email", email);
      if (!user) return response.notFound({ error: "User not found!" });

      await user.merge({ password: string.generateRandom(8) }).save();

      // await Mail.send((message) => {
      //   message
      //     .from("no-reply@bio2game.com")
      //     .to(userProvider.user!.email)
      //     .subject("Changement de mot de passe sur Bio2Game.com")
      //     .htmlView("emails/forget-password", {
      //       token: Encryption.encrypt({
      //         id: userProvider.user!.id,
      //         token: userProvider.getRememberMeToken(),
      //       }),
      //       domain: process.env.WEB_URL || "https://www.bio2game.com",
      //     });
      // }).catch(() => null);

      return response.ok({ success: true });
    } catch (error) {
      return response.notImplemented(error);
    }
  }

  /**
   * @swagger
   * /github/callback:
   *   get:
   *     tags:
   *       - auth
   *     summary: authenticates a user using the GitHub OAuth provider
   *     responses:
   *       200:
   *         description: authentication successful
   *       400:
   *         description: authentication failed
   */
  public async githubAuthentication({
    ally,
    auth,
    response,
  }: HttpContextContract) {
    await this.authenticateUser(ally.use("github"), auth, response);
  }

  /**
   * @swagger
   * /discord/callback:
   *   get:
   *     tags:
   *       - auth
   *     summary: authenticates a user using the Discord OAuth provider
   *     responses:
   *       200:
   *         description: authentication successful
   *       400:
   *         description: authentication failed
   */
  public async discordAuthentication({
    ally,
    auth,
    response,
  }: HttpContextContract) {
    await this.authenticateUser(ally.use("discord"), auth, response);
  }

  /**
   * @swagger
   * /google/callback:
   *   get:
   *     tags:
   *       - auth
   *     summary: authenticates a user using the Google OAuth provider
   *     responses:
   *       200:
   *         description: authentication successful
   *       400:
   *         description: authentication failed
   */
  public async googleAuthentication({
    ally,
    auth,
    response,
  }: HttpContextContract) {
    await this.authenticateUser(ally.use("google"), auth, response);
  }

  private async authenticateUser(
    provider: AllyDriverContract<Oauth2AccessToken, string>,
    auth: AuthContract,
    response: ResponseContract
  ) {
    const providerUser: OAuthProviderUser = await provider.user();

    if (provider.accessDenied()) {
      return response.status(400).send({ error: "Access was denied" });
    }

    if (provider.stateMisMatch()) {
      return response.status(400).send({ error: "Request expired. Try again" });
    }

    if (provider.hasError()) {
      return response.status(400).send({ error: provider.getError() });
    }

    if (!providerUser.email || !providerUser.name) {
      return response.status(400).send({ error: "Invalid account." });
    }

    const user = User.firstOrCreate(
      { email: providerUser.email },
      {
        name: providerUser.name,
        role: "PLAYER",
        password: string.generateRandom(8),
      }
    );

    await auth.use("api").login(user);
  }

  private async generateToken(
    auth: AuthContract,
    email: string,
    password: string,
    activeToken?: Pick<ApiToken, "token" | "expiresAt">[]
  ) {
    if (activeToken && activeToken?.length > 0) {
      return {
        token: activeToken[0].token,
        expiresAt: activeToken[0].expiresAt.toSeconds(),
      };
    }

    const { token, expiresIn } = await auth
      .use("api")
      .attempt(email, password, {
        expiresIn: "24hours",
      });
    return { token, expiresAt: expiresIn };
  }
}
