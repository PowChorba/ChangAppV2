import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from './ServicePublic.module.css'
import { deleteService} from "../../redux/actions";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import error from "../../404.png";

export default function PublicServices() {
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  //Paginado para los servicios
  const paginas = Math.ceil(userState[0]?.services.length / 2)
  const [pages, setPages] = useState(1)
  const [servicePerPage] = useState(2)
  const ultima = pages * servicePerPage
  const primera = ultima - servicePerPage
  const serviceSlice = userState[0]?.services.slice(primera, ultima)

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

  //BORRAR SERVICIO
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteService(e.target.id));
    toast.success("Servicio borrado con exito");
    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  return (
    <Box className={s.boxContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      {userState[0]?.services?.length === 0 ? (
        <Box className={s.emptyContainer}>
          <Typography variant="h5" className={s.typography}>
            ¡No tenes ningun servicio registrado!
          </Typography>
          <Box className={s.lowSection}>
            {<img src={error} alt="?" width="182px" height="182px" />}
            <Typography variant="p">
              Si quieres publicar servicios, dirigete a la seccion{" "}
              <NavLink className={s.linkk} to="/home/createService">
                crear servicios
              </NavLink>{" "}
            </Typography>
          </Box>
        </Box>
      ) : (
        typeof serviceSlice === "object" &&
        serviceSlice?.map((e) => {
          return (
            <Box className={s.containerServices}>
            <Box
            key={e.id}
              className={s.boxAdentroServices}
            >
              <Box className={s.boxUno}>
                <Box
                  className={s.boxDos}
                >
                  <Typography
                    className={s.infoText}
                    variant="h7"
                  >{`Nombre: ${e.name}`}</Typography>
                  <Box className={s.boxUno}>
                    <Typography className={s.infoText} variant="h7">
                      Precio:
                    </Typography>
                    <Typography
                      className={s.typographyUno}
                      variant="h7"
                    >
                      {` $${e.price}`}
                    </Typography>
                  </Box>
                  <Typography
                    className={s.infoText}
                    variant="h7"
                  >{`Categoría: ${e.category?.name}`}</Typography>
                  <Typography
                    className={s.infoText}
                    variant="h7"
                  >{`Solicitudes: ${e.request?.length}`}</Typography>
                  <Typography
                    className={s.infoText}
                    variant="h7"
                  >{`Días: ${e.day.split(",").join(", ")}`}</Typography>
                  <Typography
                    className={s.infoText}
                    variant="h7"
                  >{`Horarios: ${e.hours.split(",").join(", ")}`}</Typography>
                </Box>
                <Box
                  className={s.boxTres}
                >
                  <Box
                    className={s.boxCuatro}
                  >
                    <Typography
                      className={s.infoText}
                      variant="h7"
                    >
                      Descripción:
                    </Typography>
                    <Typography
                      className={s.infoText}
                      variant="h7"
                    >
                      {e.description}
                    </Typography>
                  </Box>
                  <Box
                    className={s.boxCinco}
                  >
                    <NavLink
                      className={s.buttonNavLink}
                      to={`${e.id}`}
                    >
                      <Button
                        variant="contained"
                        sx={{margin: '5px'}}
                      >
                        Modificar Servicio
                      </Button>
                    </NavLink>

                    <Button
                      variant="contained"
                      id={e.id}
                      onClick={handleDelete}
                      sx={{margin: '5px'}}
                    >
                      Borrar Servicio
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            </Box>
          );
        })
        )}
        <Box className={s.paginadoDiv}>
          <button className={s.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button className={s.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </Box>
    </Box>
  );
}
