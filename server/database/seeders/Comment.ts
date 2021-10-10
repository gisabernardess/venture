import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Comment from "App/Models/Comment";

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    await Comment.createMany([
      {
        postId: 1,
        userId: 1,
        text: "Sed pulvinar pretium arcu, rhoncus tempor metus. Quisque dapibus lectus id odio dictum, in commodo erat maximus. Ut elementum fermentum scelerisque. Sed dapibus, metus vel laoreet commodo, sem tortor tincidunt tortor, quis tempor lacus odio et arcu.",
      },
      {
        postId: 1,
        userId: 2,
        text: "Morbi elementum maximus sem, at facilisis turpis tristique et.",
      },
    ]);
  }
}
