import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        <Loader type={'Загрузка'} />
      </div>
    );
  }
  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col flex-grow basis-1/4">
        <div
          className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}
        >
          {post.imgUrl && (
            <img
              className="object-cover w-full rounded-md"
              src={`https://fullstack-posts-app.vercel.app/${post.imgUrl}`}
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
        <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
          {post.text}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <button className="flex justify-center items-center gap-2 text-white opacity-50">
            <AiFillEye />
            <span>{post.views}</span>
          </button>
          <button className="flex justify-center items-center gap-2 text-white opacity-50">
            <AiOutlineMessage />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
