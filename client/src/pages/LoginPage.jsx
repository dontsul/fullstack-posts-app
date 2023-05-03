import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const isAuth = useSelector(checkIsAuth);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status) {
      toast.info(status);
    }
    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  return (
    <form
      className="w-1/4 h-6 mx-auto mt-40"
      onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-white text-lg text-center">Авторизация</h1>
      <label className="text-xs text-gray-400" htmlFor="">
        Логин:
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Логин"
          className="mt-1  text-black w-full rounded-lg  bg-gray-400 border py-1 px-2 text-xs outline-none  placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-gray-400" htmlFor="">
        Пароль:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Пароль"
          className="mt-1  text-black w-full rounded-lg  bg-gray-400 border py-1 px-2 text-xs outline-none  placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          onClick={handleSubmit}
          type="submit"
          className="flex justify-center items-center bg-gray-600 text-white rounded-sm py-2 px-4"
        >
          Войти{' '}
        </button>
        <Link
          to="/registration"
          className="flex justify-center items-center text-xs text-white"
        >
          Нет аккаунта?
        </Link>
      </div>
    </form>
  );
};
