import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appWrite/config.js";
import parse from "html-react-parser";

function PostCard({ $id, title, coverImg, className, content }) {
  const preview = content.slice(0, 70);

  return (
    <Link to={`/post/${$id}`} className="h-full">
      {coverImg ? (
        <>
          <div
            className={`${className} 
          transition-all duration-300 ease-in-out hover: translate-y-1 hover:scale-105
          w-full rounded-xl p-4 h-full bg-gradient-to-br from-[#594a3d] via-[#9c8371] to-[#7c6858]/60`}
          >
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
          <div
            className="
          transition-all duration-300 ease-in-out hover:scale-105
          w-full bg-gradient-to-br from-[#594a3d] via-[#9c8371] to-[#7c6858]/60 rounded-xl p-4 h-full min-h-[10vh] "
          >
            <div className="w-full justify-center mb-4"></div>
            <div className="h-[31vh]">{parse(preview)}</div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        </>
      )}
    </Link>
  );
}

export default PostCard;
