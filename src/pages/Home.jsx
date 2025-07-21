import React from "react";
import { useState, useEffect } from "react";
import { Container } from "../components";
import { PostCard } from "../components";
import appwriteService from "../appWrite/config";
import reader from "../assets/reader.jpg";
import reader2 from "../assets/reader2.jpg";
import Transition from "../Transition";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    appwriteService.getPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const text = "Hey, Welcome to AvidReader";
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        const nextChar = text.charAt(index); // safer than text[index]
        setDisplayedText((prev) => prev + nextChar);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-8 mt-[10vh]">
      <Container className="min-h-[40vh]">
      {posts.length === 0 ? (
        <h1 className=" font-extrabold text-gray-900 dark:text-white md:text-3xl">
        <span className=" text-8xl bg-gradient-to-l from-[#3e2b1f] via-buttonsT to-black bg-clip-text text-transparent">{displayedText}</span></h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      )}
    </Container>

    </div>
  );
}

export default Transition(Home);
