import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { PostContext } from "../context/PostContext"; // Adjust the path as necessary

const WriteBlog = () => {
  const navigate = useNavigate();
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imagelink", file);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/post/create-post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Blog published successfully!");
        addPost(response.data.post);
        navigate("/blog");
      } else {
        alert("Failed to publish blog");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while publishing the blog");
    }
  };

  return (
    <div className="flex justify-center mt-20 pt-[20px] font-roboto">
      <div className="md:w-[600px] w-[90vw] flex flex-col items-center">
        <h1 className="font-extrabold text-4xl my-2">Create Blog</h1>
        <div className="flex w-full my-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
            placeholder="Title"
            type="text"
          />
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 ml-2 hover:border-black hover:bg-black hover:text-white text-black border-2 border-black bg-white"
          >
            Publish
          </button>
        </div>
        <div className="flex w-full my-2">
          <input
            onChange={handleFileChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            type="file"
          />
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground h-10 px-4 py-2 ml-2 w-[120px] hover:text-black hover:border-black border-2 border-black hover:bg-white">
            Upload Picture
          </button>
        </div>
        {file && (
          <div className="w-full my-2">
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              className="w-full h-auto"
            />
          </div>
        )}
        <div className="w-full">
          <ReactQuill
            value={content}
            onChange={setContent}
            className="w-full h-[300px] mb-[20px]"
            theme="snow"
          />
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
