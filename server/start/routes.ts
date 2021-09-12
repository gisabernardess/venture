/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";

Route.get("/", ({ response }) => {
  response.send({
    info: {
      title: "Venture",
      subtitle: "Player management for online tabletop RPG games",
      description:
        "Final project of the Graduate Course in Full Stack Web Development at the Pontifical Catholic University of Minas Gerais as a requirement for obtaining the graduate degree.",
    },
    specification: "/docs",
  });
});

Route.group(() => {
  Route.post("/register", "AuthController.register");
  Route.post("/login", "AuthController.login");

  Route.get("/github/redirect", async ({ ally }) => {
    return ally.use("github").redirect();
  });

  // TODO: decide if this URL should be changed to something like /github/callback
  Route.get("/api/auth/callback", "AuthController.githubAuthentication");
});

Route.group(() => {
  Route.get("/users", "UsersController.index");

  Route.get("/users/:id", "UsersController.show");

  Route.put("/users/:id", "UsersController.update");

  Route.delete("/users/:id", "UsersController.destroy");
}).middleware("auth");
