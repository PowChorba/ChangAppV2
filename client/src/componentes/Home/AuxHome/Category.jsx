/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions";
import s from './Category.module.css'


export default function Category() {
  const category = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      <div className={s.divEnunciado}>
      <h2 className={s.enunciado}>Categorias mas concurridas</h2>
      </div>
      <div className={s.categoryContainer}>
        {category &&
          category?.map((e) => {
            return (
              <Link key={e.id} to={`/home/${e.name}`}>
                
                  <div className={s.cardCategory} style={{backgroundImage:`url(${e.img})`}}>
                    <div className={s.divTitulo}>
                      <h3 className={s.title}>{e.name} {'>'}</h3>
                    </div>
                  </div>
                
              </Link>
            );
          })}
      </div>
    </div>
  );
}
