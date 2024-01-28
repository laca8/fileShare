import React from "react";
import { useState } from "react";
import logo from "../styles/logo.png";
import downloadLogo from "../styles/download-sd.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FileDownload from "js-file-download";
import axios from "axios";
const Download = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [file, setFile] = useState(null);
  console.log(uuid);
  const fetchFiles = async (uuid) => {
    console.log(uuid);
    try {
      const res = await axios.get(`/api/show/${uuid}`);
      setFile(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const downloadFiles = async (uuid) => {
    //console.log(uuid);
    try {
      const res = await axios.get(`/api/download/${uuid}`);
      console.log(res.data);
      FileDownload(`${res.data}`, file?.fileName);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchFiles(uuid);
  }, [uuid]);
  return (
    <>
      <img src={logo} alt="Inshare logo" class="logo" />
      <section class="download">
        <img class="download__icon" src={downloadLogo} alt="inshare-download" />
        <h4>error 😏</h4>
        <h2>Your file is ready to download</h2>
        <p>Link expires in 24 hours</p>
        <div class="download__meta">
          <h4> {file?.fileName} </h4>
          <img
            src={`${file?.fileName}`}
            style={{ width: "300px", height: "200px" }}
          />
          <small>{file?.fileSize} KB</small>
        </div>
        <div class="send-btn-container">
          <button onClick={() => downloadFiles(file?.uuid)}>
            Download file
          </button>
        </div>
      </section>
    </>
  );
};

export default Download;
