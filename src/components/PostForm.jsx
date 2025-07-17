import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index.js";
import appwriteService from "../appWrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({post}) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  //post is an optional prop. passed with postform If passed, you're in edit mode, 
  //otherwise you're creating a new post.
  
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

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
      const file = data.coverImg[0]
        ? await appwriteService.uploadFile(data.coverImg[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.coverImg = fileId;
        const dbPost= await appwriteService.createPost({
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


  /*const slugTransform= useCallback((value)=>{
    if(value && typeof value==='string'){
      return value
      .trim()
      .toLowerCase()
      .replace(/^[a-zA-Z\d\s]+/g,'-')

      return ''
    }
  },[])*/

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-_]/g, '-')   // keep only valid chars
        .replace(/^-+/, '')                // remove leading hyphens
        .slice(0, 36);                     // trim to 36 chars
    }
    return "";
  }, []);
  


  useEffect(()=>{
    const subscription=watch((value, {name})=>{
      if(name==='title'){
        setValue('slug', slugTransform(value.title,
          {shouldValidate: true}))
      }
    })

    return ()=>subscription.unsubscribe()
  },[watch, slugTransform, setValue])

  return(
  <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
  <div className="w-2/3 px-2">
      <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
      />
      <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
      />
      <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
  </div>
  <div className="w-1/3 px-2">
      <Input
          label="Cover Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("coverImg", { required: !post })}
      />
      {post && (
          <div className="w-full mb-4">
              <img
                  src={appwriteService.getFilePreview(post.coverImg)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      )}
      <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
      />
      <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
      </Button>
  </div>
</form>
);
}

export default PostForm;
