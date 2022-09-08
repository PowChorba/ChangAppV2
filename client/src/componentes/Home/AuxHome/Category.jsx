/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions";
import CircularProgress from '@mui/material/CircularProgress';
import "../../css/home.css";

export default function Category() {
  const category = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="allCategories-container">
    <div className="typography">
      <Typography
        variant="h4"
        sx={{
          position: "relative ",
          margin: "auto",
          borderBottom: "solid 2px black",
          paddingBottom: "30px",
          width: "500px",
          padding:"40px"
        }}
      >
        Categorias mas concurridas
      </Typography>
      </div>
      <div className="card-category-container">
        {category &&
          category?.map((e) => {
            return (
              <Link key={e.id} to={`/home/${e.name}`}>
                
                  <div className="card-category" style={{backgroundImage:`url(${e.img})`}}>
                  </div>
                    <h3 className="title-category">{e.name}</h3>
                
              </Link>
            );
          })}
      </div>
    </div>
  );
}
