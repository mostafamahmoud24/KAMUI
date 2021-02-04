import React, { useEffect } from "react";
import { getCookie, deleteCookie } from "../utils/cookies";

export default function Logout(props) {
  useEffect(() => {
    if (getCookie("jwt")) {
      deleteCookie("jwt");
      deleteCookie("id");
      props.history.push("/login");
    }
    props.history.push("/login");
  });

  return <div></div>;
}
