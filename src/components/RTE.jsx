import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, label, control, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1 font-poppins text-[1.09rem] text-lightBlue">{label}</label>}

      <Controller //Controller wraps your custom component (here, TinyMCE's Editor).
      /*Without Controller, React Hook Form won’t track changes inside TinyMCE, 
      and your form won't work correctly — values won't be submitted or validated properly. */
        name={name || "content"}
        control={control}//It tells the Controller how to manage the form field's state and validation.
        render={({ field: { onChange } }) => (
          <Editor  
            className="bg-lightBlue"   
            apiKey="bsykej9oehx324q8fmxklkud0wdwzpberp8nqusawu8bvizv"
            initialValue={defaultValue} //initial value swhich is by default
            init={{
              branding: false, //branding: false removes the "Powered by TinyMCE" footer.
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | styleselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

/*<Editor
initialValue='default value'//initial value swhich is by default
init={
    {branding: false,//to remove the branding from tinymce
    height: 500,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount'
    ]
    } 
} 
>    
</Editor> */
