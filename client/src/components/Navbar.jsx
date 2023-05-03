import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { BiAtom } from 'react-icons/bi';
export const Navbar = () => {
  const activeStyles = {
    color: 'white',
  };
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast.info('Вы вышли из системы');
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <Link
        to="/"
        className="flex justify-center items-center w-6 h-6 bg-gray-600 text-white rounded-sm cursor-pointer"
      >
        <BiAtom size={20} />
      </Link>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              to="/"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              to="/posts"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-xs text-gray-400 hover:text-white"
              to="/new"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler}>Выйти</button>
        ) : (
          <Link to="login">Войти</Link>
        )}
      </div>
    </div>
  );
};
