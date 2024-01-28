import React from "react";
import { useState } from "react";
import axios from "axios";
const EmailsForm = () => {
  const [uuid, setUuid] = useState("");
  const [emailForm, setEmailForm] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [message, setMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const data = {
      uuid,
      emailForm,
      emailTo,
    };
    try {
      const res = await axios.post("/api/files/send", data, config);
      console.log(res);
      setMessage(res.data);
      setEmailForm("");
      setEmailTo("");
      setUuid("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form id="emailForm" onSubmit={submitHandler}>
      <h3
        style={{
          backgroundColor: "#03a9f4",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
        }}
      >
        {message && message}
      </h3>
      <div className="filed">
        <label>uuid</label>
        <input
          type="text"
          required
          name="from-email"
          id="fromEmail"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
        />
      </div>
      <div className="filed">
        <label>Your email</label>
        <input
          type="email"
          required
          name="from-email"
          id="fromEmail"
          value={emailForm}
          onChange={(e) => setEmailForm(e.target.value)}
        />
      </div>

      <div class="filed">
        <label>Receiver's email</label>
        <input
          type="email"
          required
          name="to-email"
          id="toEmail"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
        />
      </div>
      <div className="send-btn-container">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default EmailsForm;
