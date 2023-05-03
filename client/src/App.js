import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/features/auth/authSlice';
import { Layout } from './layout/Layout';
import { MainPage } from './pages/MainPage';
import { PostsPage } from './pages/PostsPage';
import { PostPage } from './pages/PostPage';
import { AddPostPage } from './pages/AddPostPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { EditPostPage } from './pages/EditPostPage';
import { LoginPage } from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path=":id" element={<PostPage />} />
          <Route path=":id/edit" element={<EditPostPage />} />
          <Route path="new" element={<AddPostPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route />
        </Routes>
        <ToastContainer position="bottom-right" />
      </Layout>
    </div>
  );
}

export default App;
