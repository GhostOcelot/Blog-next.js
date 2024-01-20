import Head from 'next/head';
import PostContent from '../../components/posts/post-details/post-content';
import { getAllPostsNames, getPostData } from '../../lib/posts-util';

const PostDetailsPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={`${post.title} page`} />
      </Head>
      <PostContent post={post} />;
    </>
  );
};

export const getStaticProps = ({ params: { slug } }) => {
  const post = getPostData(slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const slugs = getAllPostsNames().map((path) => ({ params: { slug: path.replace(/\.md$/, '') } }));

  return {
    paths: slugs,
    fallback: false,
  };
};

export default PostDetailsPage;
