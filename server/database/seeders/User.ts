import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = "email";

    await User.updateOrCreateMany(uniqueKey, [
      {
        name: "Admin",
        email: "admin@venture.com",
        role: "ADMIN",
        password: "adminadmin",
      },
      {
        name: "Moderator",
        email: "moderator@venture.com",
        role: "MODERATOR",
        password: "moderator",
      },
      {
        name: "Player",
        email: "player@venture.com",
        password: "playerzero",
      },
    ]);
  }
}
