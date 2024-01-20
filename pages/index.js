import Head from 'next/head';
import Hero from '../components/home/hero';
import FeaturedPosts from '../components/home/featured-posts';
import { getFeaturedPosts } from '../lib/posts-util';

const HomePage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="home page" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      posts: getFeaturedPosts(),
    },
    revalidate: 600,
  };
};

export default HomePage;
