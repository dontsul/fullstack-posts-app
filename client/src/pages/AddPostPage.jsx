import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createPost } from '../redux/features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clearFormHandler = () => {
    setTitle('');
    setText('');
    setImage('');
  };

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);

      dispatch(createPost(data));
      toast.success('Пост добавлен');
      navigate('/');
      clearFormHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/3 mx-auto py-10">
      <label className="text-grey-30 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение
        <input
          className="hidden"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <div className="flex object-cover py-2">
        {image && <img src={URL.createObjectURL(image)} alt="post" />}
      </div>
      <label className="text-xs text-white opacity-70">
        Заголовок поста:
        <input
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Текст поста:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 resize-none h-40 px-2 text-xs outline-none placeholder:text-gray-700"
          placeholder="Текст поста"
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex items-center bg-gray-600 hover:bg-gray-700  text-xs text-white py-2 px-4 rounded-sm "
        >
          Добавить пост
        </button>
        <button
          onClick={clearFormHandler}
          className="flex items-center bg-red-500 hover:bg-red-600 text-xs text-white py-2 px-4 rounded-sm "
        >
          Отменить
        </button>
      </div>
    </form>
  );
};
