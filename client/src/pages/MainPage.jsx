import { PostItem } from '../components/PostItem';
import { PopularPost } from '../components/PopularPost';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPosts } from '../redux/features/post/postSlice';
import { v4 as uuidv4 } from 'uuid';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className="text-xl py-10 text-center text-white">
        Постов не существует
      </div>
    );
  }
  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post) => {
            return <PostItem post={post} key={uuidv4()} />;
          })}
        </div>
        <div className="basis 1/5">
          <div className="text-xs uppercase text-white">Популярные:</div>
          {popularPosts?.map((post, index) => {
            return <PopularPost key={index} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
};
