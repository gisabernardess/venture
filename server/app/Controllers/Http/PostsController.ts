import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Post from "App/Models/Post";
import CreatePostValidator from "App/Validators/CreatePostValidator";

export default class PostsController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.all();
    const limit = 8;

    const posts = await Post.query().preload("user").paginate(page, limit);

    return posts.serialize();
  }

  public async show({ request }: HttpContextContract) {
    const { slug } = request.params();

    const post = await Post.query()
      .preload("user")
      .preload("comments", (commentsQuery) => {
        commentsQuery.preload("user");
      })
      .where("slug", slug)
      .firstOrFail();

    return post.serialize();
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const { userId, slug, title, excerpt, content } = await request.validate(
        CreatePostValidator
      );

      return await Post.create({
        userId,
        slug,
        title,
        excerpt,
        content,
      });
    } catch (error) {
      response.badRequest(error.messages.errors[0]);
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const { slug, title, excerpt, content } = request.all();

      const post = await Post.findBy("slug", slug);
      if (!post) return response.notFound({ message: "Post not found" });

      if (slug && slug !== post.slug) {
        const postExists = await Post.find({ where: { slug } });
        if (postExists)
          return response.badRequest({
            message: "There is a post with this slug. Try another one",
          });
      }

      return await post
        .merge({
          slug,
          title,
          excerpt,
          content,
        })
        .save();
    } catch (error) {
      response.notImplemented(error.message);
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { slug } = request.params();

    const post = await Post.findByOrFail("slug", slug);
    if (!post) return response.notFound({ message: "Post not found" });

    return await post.delete();
  }
}
