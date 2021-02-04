import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./login.css";

export default function Login() {
  return (
    <div className="login-body">
      <Navbar />
      <div className="login-container">
        <div className="login-card-left">
          <div className="login-card-text">Please Sign In To Continue:</div>
          <a href="http://localhost:5000/auth/google" className="login-link">
            <div className="google-button-container">
              <img
                src={require("../../images/unnamed (1).png")}
                alt=""
                className="google-button-logo"
              />
              <div className="google-button-text">Continue with Google</div>
            </div>
          </a>
          <a
            href="http://localhost:5000/auth/twitch/redirect"
            className="login-link"
          >
            <div className="twitch-button-container">
              <img
                src={require("../../images/605ed697591984b037b5b94521541ebf.png")}
                alt=""
                className="twitch-button-logo"
              />
              <div className="twitch-button-text">Continue with Twitch</div>
            </div>
          </a>
          <a
            href="http://localhost:5000/auth/github/redirect"
            className="login-link"
          >
            <div className="github-button-container">
              <img
                src={require("../../images/1164606_telegram-icon-github-icon-png-white-png-download (1).png")}
                alt=""
                className="github-button-logo"
              />
              <div className="github-button-text">Continue with Github</div>
            </div>
          </a>
        </div>
        <div className="login-card-right">
          <img
            className="login-card-img"
            src={require("../../images/3b63473b3d3a9f9881acb64b28a3a1b4.jpg")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
