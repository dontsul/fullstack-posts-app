import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { updatePost } from '../redux/features/post/postSlice';

export const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const clearFormHandler = () => {
    setTitle('');
    setText('');
    setNewImage('');
  };
  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', title);
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
      updatedPost.append('image', newImage);

      dispatch(updatePost(updatedPost));

      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/3 mx-auto py-10">
      <label className="text-grey-30 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение
        <input
          className="hidden"
          type="file"
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage('');
          }}
        />
      </label>
      <div className="flex object-cover py-2">
        {oldImage && (
          <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
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
          Обновить пост
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
