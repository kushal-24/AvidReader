import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index.js";
import appwriteService from "../appWrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({post}) {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.coverImg[0]
        ? appwriteService.uploadFile(data.coverImg[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.coverImg);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        coverImg: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.coverImg[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.coverImg = fileId;
        await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          coverImg: fileId,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };


  const slugTransform= useCallback((value)=>{
    if(value && value==='string'){
      return value
      .trim()
      .toLowerCase()
      .replace(/^[a-zA-Z\d\s]+/g,'-')

      return ''
    }
  },[])


  useEffect(()=>{
    const subscription=watch((value, {name})=>{
      if(name==='title'){
        setValue('slug', slugTransform(value.title,
          {shouldValidate: true}))
      }
    })

    return ()=>subscription.unsubscribe()
  },[watch, slugTransform, setValue])

  return <div>PostForm</div>;
}

export default PostForm;
