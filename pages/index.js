import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogPost from "../components/BlogCard";

const graphcms = new GraphQLClient(
  "https://api-ap-northeast-1.hygraph.com/v2/clagw6emf067601tcgynudmut/master"
);

const QUERY = gql`
  {
    posts(orderBy: publishedAt_DESC) {
      title
      id
      slug
      datePublished
      description
      coverPhoto {
        url
        id
      }
      content {
        html
      }
      author {
        createdBy {
          name
          createdAt
          picture
        }
        avatar {
          url
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
      revaldiate: 10,
    },
  };
}

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <Head>
        <meta property="og:title" content="__OG_TITLE__" />
        <meta property="og:description" content="__OG_DESCRIPTION__" />
        <title>Rean2Rean Blog</title>
      </Head>
      <div className=" py-10 text-center">
        <div className="">
          <p className="text-xl px-8 md:text-2xl lg:text-3xl">
            ប្លុកដែលចែករំលែកអ្នកទាំងអស់គ្នាអំពីរៀនពីរបៀបរៀន
          </p>
        </div>
      </div>
      <div className="grid grid-rows-1 lg:grid-cols-2 xl:grid-cols-3 lg:mx-8 justify-center ">
        {posts.map((post) => (
          <BlogPost
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
            description={post.description}
          />
        ))}
      </div>
    </div>
  );
}
