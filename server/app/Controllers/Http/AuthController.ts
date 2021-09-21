import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseContract } from "@ioc:Adonis/Core/Response";
import { string } from "@ioc:Adonis/Core/Helpers";

import User from "App/Models/User";
import CreateUserValidator from "App/Validators/CreateUserValidator";
import { AllyDriverContract, Oauth2AccessToken } from "@ioc:Adonis/Addons/Ally";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
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

      const user = await User.findBy("email", email);

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "24hours",
      });

      return response.status(200).send({ user: user, token: token.toJSON() });
    } catch (error) {
      response.badRequest(error.message);
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

    return response.status(200).send({ revoked: true });
  }

  /**
   * @swagger
   * /login:
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
   *         description: login successful
   *       400:
   *         description: validation fails
   *       404:
   *         description: user not found
   *       500:
   *         description: server error
   */
  public async resetPassword({ auth, request, response }: HttpContextContract) {
    try {
      const { email } = await request.validate(ResetPasswordValidator);

      const userProvider = await auth.use("api").provider.findByUid(email);

      if (!userProvider.user) {
        return response.status(404).json({
          success: false,
          messages: {
            errors: [
              {
                rule: "exist",
                field: "email",
                message: "This email address does not exist",
              },
            ],
          },
        });
      }

      userProvider.setRememberMeToken(string.generateRandom(10));
      await auth.use("api").provider.updateRememberMeToken(userProvider);

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

      return response.json({ success: true });
    } catch (error) {
      if (error.code === "E_VALIDATION_FAILURE") {
        return response.status(400).json({
          success: false,
          messages: error.messages,
        });
      }
      return response.status(500).json({
        success: false,
        messages: error.messages,
        error,
      });
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
}
