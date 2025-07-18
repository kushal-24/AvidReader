import React, { useState, useEffect } from "react";
import appwriteService from "../appWrite/config";
import { PostCard, Container } from "../components";

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
        <div className="flex flex-wrap items-stretch">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4 h-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
