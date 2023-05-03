//registration

// req - то что приходит к нам со стороны клиента
// res - то что мы отправляем клиенту

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registration = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.json({
        message: 'Данный username уже занят',
      });
    }

    const salt = bcrypt.genSaltSync(10); // создание сложности хеширования пароля
    const hash = bcrypt.hashSync(password, salt); // хеширование пароля

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    await newUser.save(); //сохранение нового юзера в базе данных

    res.json({
      token,
      newUser,
      message: 'Регистрация прошла успешно',
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при создании пользователя' });
  }
};
//login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }); // ищем узера в базе данных

    if (!user) {
      return res.json({ message: 'Юзера не существует' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); // сравнивает пароль в базе данных и тот который получили от клиента

    if (!isPasswordCorrect) {
      return res.json({
        message: 'Неверный пароль',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    ); //создание токена. проверка авторизовались или нет

    res.json({
      token,
      user,
      message: 'Вы вошли в систему',
    });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Ошибка при авторизации пользователя' });
  }
};
//getme

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ message: 'Юзера не существует' });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ message: 'Нет доступа' });
  }
};
