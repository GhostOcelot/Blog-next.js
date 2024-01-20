import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export const getPostData = (fileIdentifier) => {
  const slug = fileIdentifier.replace(/\.md$/, '');

  const filePath = path.join(postsDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);

  const postData = {
    ...data,
    content,
    slug,
  };

  return postData;
};

export const getAllPostsNames = () => fs.readdirSync(postsDir);

export const getAllPosts = () => {
  const postsFiles = getAllPostsNames();

  const allPosts = postsFiles
    .map((file) => getPostData(file))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return allPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};
