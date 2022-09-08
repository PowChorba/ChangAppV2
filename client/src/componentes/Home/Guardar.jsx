/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Footer from "../Footer";
import Navbar from "../PrivateRoute/Navbar";
import Reviews from "../reviews/Reviews";
import Category from "./AuxHome/Category";
import CircularProgress from '@mui/material/CircularProgress';
import '../css/revwievs.css'
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
        <Box className="rev-section">
          <Typography variant="h4" sx={{position: 'relative ',margin: '70px auto', borderBottom:'solid 2px black', paddingBottom: '40px', width:'700px'}}>Algunos comentarios de nuestros Usuarios</Typography>
          <Reviews />
        </Box>
        <Footer />
      </div>
    );
}


