/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Footer from "../Footer";
import Navbar from "../PrivateRoute/Navbar";
import Reviews from "./AuxHome/Reviews";
import Category from "./AuxHome/Category";
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";


export default function Guardar() {
  const { user } = useAuth();
  const category = useSelector((state) => state.categories);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategories())
  },[dispatch]);

  if (category.length === 0)
    return (
      <div style={{backgroundColor: 'rgba(0, 0, 0, 0.644)'}}>
        <Navbar />
      <div style={{display:'flex' ,height: '80vh', alignItems:'center', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
        <Footer />
      </div>
    );
  else
    return (
      <div>
        <Navbar />
        <div>
          <Category />
        </div>
        <div className="rev-section">
          <Reviews />
        </div>
        <Footer />
      </div>
    );
}


