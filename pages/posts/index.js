import Head from 'next/head';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

const AllPostsPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="posts page" />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      posts: getAllPosts(),
    },
    revalidate: 600,
  };
};

export default AllPostsPage;
