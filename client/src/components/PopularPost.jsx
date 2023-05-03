import { Link } from 'react-router-dom';

export const PopularPost = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={`${post._id}`}
        className="flex text-gray-300 hover:bg-gray-800 hover:text-white text-xs p-2 cursor-pointer"
      >
        {post.title}
      </Link>
    </div>
  );
};
