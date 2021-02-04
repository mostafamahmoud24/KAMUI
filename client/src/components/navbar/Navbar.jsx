import React, { useEffect } from "react";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/user/userActions";
import { getCookie } from "../../utils/cookies";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (getCookie("jwt")) {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  if (vw <= 600) {
    //close hamburger menu when clicking outside
    window.addEventListener("mouseup", function (event) {
      event.preventDefault();
      let box = document.getElementById("nav-list");
      let sideMenu = document.getElementById("nav-list-cont-burger");
      if (event.target !== sideMenu && event.target.parentNode !== box) {
        box.classList.remove("nav-list-burger-opened");
        box.classList.add("nav-list-burger-closed");
        document.getElementById("root").style.overflowY = "unset";
        document.getElementById("root").style.overflowX = "unset";
      }
    });
  }

  //toggle the hamburger menu
  const hamburgerHandler = () => {
    let times = document.getElementById("times");
    let nav = document.querySelector("#nav-list");
    if (nav.matches(".nav-list-burger-closed")) {
      nav.classList.remove("nav-list-burger-closed");
      nav.classList.add("nav-list-burger-opened");
      times.classList.add("rotate-times");
      document.body.style.overflowY = "hidden";
      document.getElementById("root").style.overflowY = "hidden";
      document.getElementById("root").style.overflowX = "hidden";
    } else {
      nav.classList.add("nav-list-burger-closed");
      nav.classList.remove("nav-list-burger-opened");
      times.classList.remove("rotate-times");
      document.getElementById("root").style.overflowY = "unset";
      document.getElementById("root").style.overflowX = "unset";
    }
  };

  return (
    <div className="navabr-container" id="navabr-container">
      <div className="logo">
        <img className="kanji" src={require("../../images/logo.png")} alt="" />
      </div>
      <div className="nav-list">
        <div className="nav-list-cont">
          <a href="http://localhost:3000/" className="list-item">
            <div className="test" data-text="Home">
              Home
            </div>
          </a>
          <a href="http://localhost:3000/anime" className="list-item">
            Anime
          </a>
          <a href="http://localhost:3000/manga" className="list-item">
            Manga
          </a>
          <a href="http://localhost:3000/about" className="list-item">
            About Us
          </a>
          {user.img && (
            <a href="http://localhost:3000/profile" className="avatar-item">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                  marginTop: "-15px",
                  marginRight: "5px",
                }}
              >
                <img
                  src={user.img}
                  alt={user.username}
                  style={{ width: "100%", borderRadius: "100%" }}
                />
              </div>
            </a>
          )}
        </div>
      </div>
      <div
        className="burger-menu-icon"
        id="burger-open-icon"
        onClick={hamburgerHandler}
      >
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="nav-list-burger-closed" id="nav-list">
        <i
          id="times"
          className="fa fa-times"
          aria-hidden="true"
          onClick={hamburgerHandler}
        ></i>
        <div className="nav-list-cont-burger" id="nav-list-cont-burger">
          <a href="http://localhost:3000/" className="list-item-burger">
            <div className="burger-item" data-text="Home">
              Home
            </div>
          </a>
          <a href="http://localhost:3000/anime" className="list-item-burger">
            <div className="burger-item">Anime</div>
          </a>
          <a href="http://localhost:3000/manga" className="list-item-burger">
            <div className="burger-item">Manga</div>
          </a>
          <a href="http://localhost:3000/about" className="list-item-burger">
            <div className="burger-item">About Us</div>
          </a>
          <div className="burger-logo">
            <img
              className="kanji-burger"
              src={require("../../images/logo.png")}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
