import React, { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const value = useContext(UserContext);
  const user = value[0];

  return (
    <div>
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>{user._id}</div>
      <img src={user.img} width="200" alt="" />
    </div>
  );
}
