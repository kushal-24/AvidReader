import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appWrite/config.js";
import parse from "html-react-parser";

function PostCard({ $id, title, coverImg, className, content}) {

  const preview=content.slice(0,70)
  return (
    <Link to={`/post/${$id}`} className="h-full block">
      {coverImg ? (
        <>
          <div className={`${className} w-full bg-lightBlue rounded-xl p-4 h-full min-h-[30vh] `} >
            <div className="w-full justify-center mb-4">
              <img
                src={appwriteService.getFilePreview(coverImg)}
                alt={title}
                className="rounded-xl"
              />
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        </>
      ) : (
        <>
          <div className="w-full bg-lightBlue rounded-xl p-4 h-full min-h-[10vh] ">
            <div className="w-full justify-center mb-4">
            </div>
            <div className="h-[22vh]">{parse(preview)}</div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        </>
      )}
    </Link>
  );
}

export default PostCard;
