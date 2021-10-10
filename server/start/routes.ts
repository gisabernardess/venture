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
 * Private Routes
 */
Route.group(() => {
  /**
   * Auth
   */
  Route.post("/logout", "AuthController.logout");

  /**
   * Users
   */
  Route.get("/users", "UsersController.index");
  Route.get("/users/:id", "UsersController.show");
  Route.post("/users", "UsersController.create");
  Route.put("/users/:id", "UsersController.update");
  Route.delete("/users/:id", "UsersController.destroy");

  /**
   * Posts
   */
  Route.get("/posts", "PostsController.index");
  Route.get("/posts/:slug", "PostsController.show");
  Route.post("/posts", "PostsController.create");
  Route.put("/posts/:slug", "PostsController.update");
  Route.delete("/posts/:slug", "PostsController.destroy");

  /**
   * Comments
   */
  Route.post("/comments", "CommentsController.create");
  Route.delete("/comments/:id", "CommentsController.destroy");
}).middleware("auth");
