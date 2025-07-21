import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index.js";
import appwriteService from "../appWrite/config.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({post}) {
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    control, 
    getValues } = 
    useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      coverImg: post?.coverImg || null,
    },
  });
  //post is an optional prop. passed with postform If passed, you're in edit mode, 
  //otherwise you're creating a new post.
  
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.coverImg?.[0]
        ? await appwriteService.uploadFile(data.coverImg[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.coverImg);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        coverImg: file ? file.$id : post.coverImg,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = 
      data.coverImg?.[0] ? await appwriteService.uploadFile(data.coverImg[0])
        : null;


      if (file) {
        const fileId = file.$id;
        data.coverImg = fileId;
      }
    }
    const dbPost= await appwriteService.createPost({
      ...data,
      userId: userData.$id,
      coverImg: data?.coverImg || null,
    });
    if (dbPost) {
      navigate(`/post/${dbPost.$id}`);
    }
  };

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
  <div className="w-2/3 px-2 ">
      <Input
          labelClassName="text-white"
          label="Title :"
          placeholder="Title"
          className="mb-4 backdrop-blur-sm bg-white/60 border border-buttonsT rounded-xl shadow-xl"
          {...register("title", { required: true })}
      />
      <Input
          labelClassName="text-white"
          label="Slug :"
          placeholder="Slug"
          className="mb-4 backdrop-blur-sm bg-white/60 border border-buttonsT rounded-xl shadow-xl"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
      />
      <RTE name="content" control={control} defaultValue={getValues("content")} />
  </div>
  <div className="w-1/3 px-2">
      <Input
          labelClassName="text-white"
          label="Cover Image :"
          type="file"
          className="mb-4 backdrop-blur-sm bg-white/60 border border-buttonsT rounded-xl shadow-xl"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("coverImg")}
      />
      {post?(
          <div className="w-full mb-4 bg-orange-300">
              <img 
                  src={appwriteService.getFilePreview(post.coverImg)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      ):null}
      <label htmlFor="Status" className="text-white font-poppins text-lg">Status</label>
      <Select
          options={["active", "inactive"]}
          className="mb-4 backdrop-blur-sm bg-white/60 border border-buttonsT rounded-xl shadow-xl "
          {...register("status", { required: true })}
      />
      <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full bg-buttonsT text-white">
          {post ? "Update" : "Submit"}
      </Button>
  </div>
</form>
);
}

export default PostForm;
