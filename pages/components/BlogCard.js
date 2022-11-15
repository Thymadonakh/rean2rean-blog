import React from "react";
import Link from "next/link";

const BlogPost = ({
  title,
  author,
  coverPhoto,
  datePublished,
  description,
  slug,
}) => {
  return (
    <div className="p-4 max-w-[450px]  rounded-xl hover:scale-125 transition duration-700 ">
      <Link href={"/posts/" + slug}>
        <div className="">
          <img
            src={coverPhoto.url}
            alt=""
            className="rounded-lg w-[450px] h-[300px] object-cover"
          />
        </div>
        <div className="">
          <h2 className="font-bold text-xl py-4">{title}</h2>
        </div>
        <div className="">
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex items-center justify-between py-4 text-sm">
          <div className="flex items-center space-x-2 ">
            <img
              src={author.avatar.url}
              alt=""
              className="rounded-full w-10 h-10"
            />
            <h3 className="font-semibold text-gray-700 ">
              {author.createdBy.name}
            </h3>
          </div>
          <div className="">
            <h3>{datePublished}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPost;
