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

/**
 * Auth Routes
 */
Route.group(() => {
  Route.post("/register", "AuthController.register");
  Route.post("/login", "AuthController.login");
  Route.post("/logout", "AuthController.logout");
  Route.post("/reset", "AuthController.resetPassword");

  Route.get("/github/redirect", async ({ ally }) => {
    return ally.use("github").redirect();
  });

  Route.get("/discord/redirect", async ({ ally }) => {
    return ally.use("discord").redirect();
  });

  Route.get("/google/redirect", async ({ ally }) => {
    return ally.use("google").redirect();
  });

  Route.get("/github/callback", "AuthController.githubAuthentication");
  Route.get("/discord/callback", "AuthController.discordAuthentication");
  Route.get("/google/callback", "AuthController.googleAuthentication");
});

/**
 * Public Routes
 */
Route.group(() => {
  Route.get("/users", "UsersController.index");
  Route.get("/users/:id", "UsersController.show");
});

/**
 * Private Routes
 */
Route.group(() => {
  Route.get("/me", "AuthController.show");
  Route.put("/users/:id", "UsersController.update");
  Route.delete("/users/:id", "UsersController.destroy");
}).middleware("auth");
