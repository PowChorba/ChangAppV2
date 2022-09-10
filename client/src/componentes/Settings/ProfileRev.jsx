import React, { useState } from "react";
import { useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import userImg from "../../user.png";
import error from '../../404.png'
import s from './ProfileRev.module.css'

export default function ProfileRev() {
  let allReviews = useSelector((state) => state.reviews);
  const userDb = useSelector((state) => state.filter);
  allReviews = allReviews.filter((r) => r.user_id === userDb[0]?.id).reverse();

  //Paginado para las reviews
  const paginas = Math.ceil(allReviews.length / 4);
  const [pages, setPages] = useState(1);
  const [notisPerPage] = useState(4);
  const ultima = pages * notisPerPage;
  const primera = ultima - notisPerPage;
  const revSlice = allReviews?.slice(primera, ultima);

  const handleAnterior = (e) => {
    e.preventDefault();
    setPages(pages - 1);
    if (pages < 2) {
      setPages(1);
    }
    window.scrollTo(0, 0);
  };

  const handleSiguiente = () => {
    setPages(pages + 1);
    if (pages >= paginas) {
      setPages(paginas);
    }
    window.scrollTo(0, 0);
  };

  return (
    <Box className={s.container}>

      <Box className={s.boxUno}>
        {allReviews?.length === 0 ? (
          <Box
          className={s.emptyContainer}
        >
          <Box className={s.lowSection} pl={2}>
              {
                <img
                  src={error}
                  alt="?"
                  width="182px"
                  height="182px"
                />
              }
            <Typography variant="h6" mb={5}>
              Para ver los estados del servicio, primero debes publicar uno,
              dirigete a la seccion{" "}
              <NavLink className={s.linkk} to="/home/createService">
                publicar servicio
              </NavLink>
            </Typography>
          </Box>
        </Box>
        ) : (
          revSlice?.map((e) => {
            return (
              <Box
                key={e.id}
                className={s.boxDos}
              >
                <Box
                  className={s.boxTres}
                >
                  <img
                    src={e.author?.img ? e.author?.img : userImg}
                    alt="Rompio"
                    className={s.imagen}
                  />
                  <Typography className={s.typographyUno}>
                    {e.author?.firstName} {e.author?.lastName}
                  </Typography>
                </Box>
                <Box>
                <Typography
                    className={s.typographyDos}
                  >
                  <Rating defaultValue={e.rate} readOnly />
                  </Typography>
                </Box>
                <Box>
                  <Typography className={s.typographyUno}>
                   {e.message}
                  </Typography>
                
                </Box>
              </Box>
            );
          })
        )}
      </Box>
      
      <Box className={s.paginadoDiv}>
        <button className={s.btnPaginado} onClick={handleAnterior}>
          {"<"}
        </button>
        {pages} of {paginas}
        <button className={s.btnPaginado} onClick={handleSiguiente}>
          {">"}
        </button>
      </Box>
    </Box>
  );
}
