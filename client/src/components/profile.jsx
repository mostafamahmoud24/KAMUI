import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../redux/user/userActions";
import Swiper from "./carousel/SwiperCarousel";

export default function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);
  return (
    <div style={{ color: "white" }}>
      {user.username}
      <Swiper />
    </div>
  );
}
