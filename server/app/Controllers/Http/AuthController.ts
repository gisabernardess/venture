// import Mail from "@ioc:Adonis/Addons/Mail";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ResponseContract } from "@ioc:Adonis/Core/Response";
import { string } from "@ioc:Adonis/Core/Helpers";
import { AllyDriverContract, Oauth2AccessToken } from "@ioc:Adonis/Addons/Ally";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";

import User from "App/Models/User";

import RegisterUserValidator from "App/Validators/RegisterUserValidator";
import ResetPasswordValidator from "App/Validators/ResetPasswordValidator";

type OAuthProviderUser = {
  email: string | null;
  name: string | null;
};

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    try {
      const { name, email, password } = await request.validate(
        RegisterUserValidator
      );

      const user = await User.create({
        name,
        email,
        password,
      });

      const { token, expiresIn } = await auth
        .use("api")
        .attempt(email, password, {
          expiresIn: "24hours",
        });

      return response.ok({
        user: user,
        access: { token: token, expiresIn: expiresIn },
      });
    } catch (error) {
      response.notImplemented(error.message);
    }
  }

  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = request.all();

      const user = await User.findBy("email", email);
      if (!user) return response.notFound({ error: "User not found!" });

      if (!(await user.checkPassword(password))) {
        return response.badRequest({
          error: "Invalid password!",
        });
      }

      const { token, expiresIn } = await auth
        .use("api")
        .attempt(email, password, {
          expiresIn: "24hours",
        });

      return response.ok({
        user: user,
        access: { token: token, expiresIn: expiresIn },
      });
    } catch (error) {
      response.notImplemented(error);
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").revoke();
    return response.ok({ revoked: true });
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    try {
      const { email } = await request.validate(ResetPasswordValidator);

      const user = await User.findBy("email", email);
      if (!user) return response.notFound({ error: "User not found!" });

      const newPassword = string.generateRandom(8);

      await user.merge({ password: newPassword }).save();

      // await Mail.send((message) => {
      //   message
      //     .from("admin@venture.vercel.app")
      //     .to("giiselebernardes@gmail.com")
      //     .subject("Welcome Onboard!")
      //     .htmlView("emails/welcome", {
      //       user: { fullName: "Some Name" },
      //       url: "https://your-app.com/verification-url",
      //     });
      // });

      return response.ok({ password: newPassword });
    } catch (error) {
      console.log(error);
      return response.notImplemented(error);
    }
  }

  public async githubAuthentication({
    ally,
    auth,
    response,
  }: HttpContextContract) {
    await this.authenticateUser(ally.use("github"), auth, response);
  }

  public async discordAuthentication({
    ally,
    auth,
    response,
  }: HttpContextContract) {
    await this.authenticateUser(ally.use("discord"), auth, response);
  }

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

    const user = await User.firstOrCreate(
      { email: providerUser.email },
      {
        name: providerUser.name,
        role: "PLAYER",
        password: string.generateRandom(8),
      }
    );

    const { token, expiresIn } = await auth.use("api").login(user);

    return response.ok({
      user,
      access: { token: token, expiresIn: expiresIn },
    });
  }
}
