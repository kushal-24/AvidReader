import React, { useState, useEffect } from "react";
import appwriteService from "../appWrite/config";
import { PostCard, Container } from "../components";
import Transition from "../Transition";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 text-center text-gray-600 text-lg">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="">
          {/*items-stretch makes all flex children stretch vertically to the same height of the tallest sibling.*/}
          {posts.map((post) => (
            <div key={post.$id} className="w-1/4 h-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Transition(AllPosts);

/**
 -->items-stretch makes all flex children stretch vertically to the same height of the tallest sibling.
->h-full on the card container makes each one take full height.
->t ensures a consistent minimum height for all PostCards even if the content is very short or empty.
Without it, some cards might still look smaller (especially those with no image or short titles), despite items-stretch.

 */