import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = "email";

    await User.updateOrCreateMany(uniqueKey, [
      {
        name: "Admin",
        email: "admin@venture.vercel.app",
        role: "ADMIN",
        password: "adminadmin",
      },
      {
        name: "Moderator",
        email: "moderator@venture.vercel.app",
        role: "MODERATOR",
        password: "moderator",
      },
      {
        name: "Player",
        email: "player@venture.vercel.app",
        password: "playerzero",
      },
    ]);
  }
}
