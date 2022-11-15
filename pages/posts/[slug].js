import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";

const graphcms = new GraphQLClient(
  "https://api-ap-northeast-1.hygraph.com/v2/clagw6emf067601tcgynudmut/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
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

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
      revaldiate: 10,
    },
  };
}

export default function BlogPost({ post }) {
  return (
    <div className="px-8 py-4 ">
      <div className="font-black text-2xl pb-8">{post.title}</div>

      <img src={post.coverPhoto.url} alt="" className="rounded-xl w-full" />
      <div className="flex items-center justify-between py-8 text-sm">
        <div className="flex items-center space-x-2">
          <img
            src={post.author.avatar.url}
            alt=""
            className="rounded-full w-10 h-10"
          />
          <h3 className="font-semibold text-gray-700">
            by {post.author.createdBy.name}
          </h3>
        </div>
        <h3>Published Date: {post.datePublished}</h3>
      </div>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
    </div>
  );
}
