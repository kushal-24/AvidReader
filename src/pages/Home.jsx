import React from "react";
import { useState, useEffect } from "react";
import { Container } from "../components";
import { PostCard } from "../components";
import appwriteService from "../appWrite/config";
import reader from '../assets/reader.jpg';
import reader2 from '../assets/reader2.jpg';

function Home() {
  const [posts, setPosts] = useState([]);
  const[displayedText, setDisplayedText]=useState("");


  useEffect(() => {
    appwriteService.getPost([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

    useEffect(()=>{
      const text="Hey, Welcome to AvidReader "
      let index=0;
      const interval= setInterval(()=>{
        if (index < text.length) {
          const nextChar = text.charAt(index); // safer than text[index]
          setDisplayedText((prev) => prev + nextChar);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 70)
      return () => clearInterval(interval);
    },[]);

  if (posts.length === 0) {
    return (
      <div className="w-full text-center">
        <Container className="!p-0 !max-w-full flex-grow ">
          <div className="flex flex-wrap">
            <div className="w-[100vw]">
              <img src={reader2} className=" w-full brightness-69 "></img>
              <h2 className=" absolute text-6xl font-extrabold px-[20px] top-[90px]">{displayedText}</h2>
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8 mt-[15vh] h-[40vh]">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
