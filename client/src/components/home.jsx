import React, { useEffect, useState } from "react";
import queryString from "query-string";

function Home(props) {
  let [userId, serUserId] = useState();

  useEffect(() => {
    let query = queryString.parse(props.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      window.localStorage.setItem("id", query.id);
      props.history.push("/");
      const userr = () => serUserId(query.id);
      userr();
      console.log(window.localStorage.jwt);
    }
  });
  return (
    <div>
      <div>This is the Home page {userId}</div>
      <a href="http://localhost:3000/logout">
        <button
          onClick={() => {
            window.localStorage.removeItem("jwt");
          }}
        >
          Logout
        </button>
      </a>
      <a href="http://localhost:3000/profile">
        <button>Profile</button>
      </a>
    </div>
  );
}

export default Home;
