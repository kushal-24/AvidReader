import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

import appwriteService from "../appWrite/config";
import { Button, Container } from "../components";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  //This compares the two to see if the current user is the same person who created the post

  const divRef = useRef(null);
  const imgRef = useRef(null);
  const [isTaller, setIsTaller] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.coverImg);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 mt-[10vh]">
      <Container>
        <div
          className={`${
            isTaller
              ? "flex flex-col gap-8 flex-wrap lg:flex-row"
              : " flex flex-row items-start gap-8"
          }`}
        >
          {/* Content box */}
          <div
            ref={divRef}
            className={`${
              isTaller ? "w-[30vw]" : "w-[50vw]"
            } p-4 rounded-xl bg-defaults`}
          >
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>

          {/* Image box */}
          {post?.coverImg ? (
            <div
              ref={imgRef}
              className={`h-fit relative border rounded-xl p-2`}
            >
              {console.log(appwriteService.getFilePreview(post.coverImg))}
              <a
                href={appwriteService.getFilePreview(post.coverImg)}
                target="_blank"
              >
                <img
                  src={appwriteService.getFilePreview(post.coverImg)} // Switched from getFilePreview to getFileUrl (no error)
                  alt={post.title}
                  className={`${
                    isTaller ? "w-full" : "w-[50vw]"
                  } rounded-xl object-cover `}
                />
              </a>

              {isAuthor && (
                <div className="absolute right-6 top-6 flex gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500">Edit</Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              {isAuthor && (
                <div className="flex justify-end mb-4 gap-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500">Edit</Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
