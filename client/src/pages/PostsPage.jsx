import { useCallback, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { PostItem } from '../components/PostItem';

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPost = useCallback(async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMyPost();
  }, [fetchMyPost]);
  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {posts?.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
};
