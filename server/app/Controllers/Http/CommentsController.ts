import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Comment from "App/Models/Comment";
import CreateCommentValidator from "App/Validators/CreateCommentValidator";

export default class CommentsController {
  public async create({ request, response }: HttpContextContract) {
    try {
      const { postId, userId, text } = await request.validate(
        CreateCommentValidator
      );

      return await Comment.create({
        postId,
        userId,
        text,
      });
    } catch (error) {
      response.badRequest(error.messages.errors[0]);
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();

    const comment = await Comment.findOrFail(id);
    if (!comment) return response.notFound({ message: "Comment not found" });

    return await comment.delete();
  }
}
