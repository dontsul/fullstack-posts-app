import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../utils/axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { removePost } from '../redux/features/post/postSlice';
import { toast } from 'react-toastify';
import { createComment, getPostComments } from '../redux/features/comments/commentSlice';
import { CommentItem } from '../components/CommentItem';
import { Loader } from '../components/Loader';

export const PostPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState('');
  const [post, setPost] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast('Пост был удален');
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    try {
      if (comment === '') return;
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        <Loader type={'Загрузка'} />
      </div>
    );
  }

  return (
    <div className="">
      <button className="flex justify-center items-center bg-gray-600 rounded-sm text-xs text-white py-2 px-4">
        <Link to={-1}>Назад</Link>
      </button>
      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
              {post.imgUrl && (
                <img
                  className="object-cover w-full rounded-md"
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt={post.title}
                />
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-10">{post.username}</div>
              <div className="text-xs text-white opacity-10">
                {<Moment date={post.createdAt} format="D MMM YYYY" />}
              </div>
            </div>
            <div className="text-white text-xl">{post.title}</div>
            <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>
            <div className="flex items-center gap-3 mt-2 justify-between">
              <div className="flex gap-3 mt-4">
                <button className="flex justify-center items-center gap-2 text-white opacity-50">
                  <AiFillEye />
                  <span>{post.views}</span>
                </button>
                <button className="flex justify-center items-center gap-2 text-white opacity-50">
                  <AiOutlineMessage />
                  <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {user?._id === post.author && (
                <div className="flex gap-3 mt-4">
                  <button className="flex justify-center items-center gap-2 text-white opacity-50">
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit size={20} />
                    </Link>
                  </button>
                  <button
                    onClick={removePostHandler}
                    className="flex justify-center items-center gap-2 text-white opacity-50"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-600 flex flex-col gap-2 rounded-sm">
          {user && (
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="comment"
                className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs placeholder:text-gray-700"
              />

              <button
                onClick={handleSubmit}
                type="submit"
                className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4 hover:bg-gray-700"
              >
                Отправить
              </button>
            </form>
          )}
          <>
            {comments?.map((comment) => {
              return <CommentItem key={comment._id} comment={comment} />;
            })}
          </>
        </div>
      </div>
    </div>
  );
};
