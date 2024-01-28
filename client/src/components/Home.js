import React from "react";
import logo from "../styles/logo.png";

import copyIcon from "../styles/copy-icon.svg";
import Head from "./Head";
import { useState } from "react";
import axios from "axios";
import UploadForm from "../pages/UploadForm";
import EmailsForm from "../pages/EmailsForm";
const Home = () => {
  const [link, setLink] = useState("");
  return (
    <>
      <img src={logo} alt="Inshare logo" className="logo" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <section className="upload-container">
          <UploadForm setLink={setLink} />
          <div className="progress-container">
            <div className="bg-progress"></div>

            <div className="inner-container">
              <div className="status">Uploading...</div>
              <div
                className={
                  link ? "percent-container-blue" : "percent-container"
                }
              >
                {link ? (
                  <span className="percentage" id="progressPercent">
                    100%
                  </span>
                ) : (
                  <span className="percentage" id="progressPercent">
                    0%
                  </span>
                )}
              </div>
              <div className="progress-bar"></div>
            </div>
          </div>
          <div className="sharing-container">
            <p className="expire">Link expires in 24 hrs</p>

            <div className="input-container">
              <input type="text" id="fileURL" value={link && link} />
              <img
                src={copyIcon}
                id="copyURLBtn"
                alt="copy to clipboard icon"
              />
            </div>

            <p className="email-info">Or Send via Email</p>
            <div className="email-container">
              <EmailsForm />
            </div>
          </div>
        </section>
        <>
          <Head />
        </>
      </div>
    </>
  );
};

export default Home;
