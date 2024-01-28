import React from "react";
import fileIcon from "../styles/file.svg";
import { useState } from "react";
import axios from "axios";
const UploadForm = ({ setLink }) => {
  const [image, setImage] = useState("");

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; //because upload single image
    const formData = new FormData();
    formData.append("myfile", file);
    setImage(formData);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios.post("/api/files", image, config);
      console.log(res);
      setLink(res.data.file);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="drop-zone">
        <div className="icon-container">
          <img
            src={fileIcon}
            draggable="false"
            className="center"
            alt="File Icon"
          />
        </div>
        <input type="file" id="fileInput" onChange={uploadFileHandler} />

        <div className="title">
          Drop your Files here or,{" "}
          <button id="browseBtn" type="submit">
            browse
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
