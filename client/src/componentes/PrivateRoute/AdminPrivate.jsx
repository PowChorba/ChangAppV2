import React from "react";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function AdminPrivate({ children }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.filter);
  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  if (userState[0]?.admin === true) {
    return <>{children}</>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <Navbar />
        <h1>
          No tienes acceso a estos datos, redirigete a la{" "}
          <Link to="/home">home</Link>
        </h1>
      </div>
    );
  }
}
