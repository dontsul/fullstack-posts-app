import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// create post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name; //создание названия для картинки
      const __dirname = dirname(fileURLToPath(import.meta.url)); // получаем путь к текущей папке
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName)); //  при помощи функции mv перемещаем картинку в папку uploads

      const newPostWithImg = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImg.save(); //созданте поста в базе данных
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImg },
      }); // нашли юзера которому пост принадлежал и запушили данный пост этому юзеру

      return res.json(newPostWithImg);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: '',
      author: req.userId,
    });
    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Что-то пошло не так' });
  }
};

// get all post
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (!posts) {
      return res.json({
        message: 'Постов нет!',
      });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json({
      message: 'Что-то пошло не так',
    });
  }
};

// get my posts
export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );

    res.json(list);
  } catch (error) {
    res.json({
      message: 'Что-то пошло не так',
    });
  }
};

//remove post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.json({ message: 'Такого поста не существует' });

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({ message: 'Пост был удален.' });
  } catch (error) {
    res.json({ message: 'Что-то пошло не так.' });
  }
};

//update post
export const updatePost = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name; //создание названия для картинки
      const __dirname = dirname(fileURLToPath(import.meta.url)); // получаем путь к текущей папке
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName)); //  при помощи функции mv перемещаем картинку в папку uploads
      post.imgUrl = fileName || '';
    }

    post.title = title;
    post.text = text;

    await post.save();

    res.json(post);
  } catch (error) {
    res.json({ message: 'Что-то пошло не так.' });
  }
};
// get by id
export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.json(post);
  } catch (error) {
    res.json({ message: 'Что-то пошло не так.' });
  }
};
