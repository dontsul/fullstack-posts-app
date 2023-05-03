import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req, res) => {
  const { postId, comment } = req.body;

  if (!comment) {
    return res.json({ message: 'Комментарий не может буть пустым' });
  }

  const newComment = new Comment({ comment });
  await newComment.save();
  try {
    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: newComment._id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.json(newComment);
  try {
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
    console.log(error);
  }
};

//get post comments

export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment);
      })
    );

    return res.json(list);
  } catch (error) {
    res.json({ message: 'Что-то пошло не так' });
  }
};
