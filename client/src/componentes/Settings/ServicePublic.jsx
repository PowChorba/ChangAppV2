import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";

import { deleteService, getUserEmail } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/system";
import { Avatar, Button, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import "../css/empty.css";
import { useState } from "react";
import error from "../../404.png";

export default function PublicServices() {
  const { user } = useAuth();
  const userState = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserEmail(user?.email));
  // }, [dispatch, user?.email]);

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

  const styles = {
    infoText: {
      fontSize: "1.2rem",
      padding: "1%",
    },
    btnPaginado: {
      cursor: "pointer",
      backgroundColor: "#1F2937",
      border: "none",
      padding: "5px 20px",
      borderRadius: "20px",
      color: "#fff",
      outline: "0",
    },
    paginadoDiv: {
      // marginTop: '5px',
      textAlign: "center",
      marginBottom: "5px",
    },
  };

  return (
    <Box sx={{
      width: "70%",
      height:'88vh',
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection:'column'
    }}>
      <Toaster position="top-center" reverseOrder={false} />
      {userState[0]?.services?.length === 0 ? (
        <Box className="empty-container">
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            ¡No tenes ningun servicio registrado!
          </Typography>
          <Box className="low-section">
            {<img src={error} alt="?" width="182px" height="182px" />}
            <Typography variant="p">
              Si quieres publicar servicios, dirigete a la seccion{" "}
              <NavLink className="linkk" to="/home/createService">
                crear servicios
              </NavLink>{" "}
            </Typography>
          </Box>
        </Box>
      ) : (
        typeof serviceSlice === "object" &&
        serviceSlice?.map((e) => {
          return (
            <Box sx={{display:'flex', width:'90%', alignItems:'center', justifyContent:'center', height:'100%'}}>
            <Box
            key={e.id}
              sx={{
                width:'100%',
                display: "flex",
                border: "solid grey 1px",
                flexDirection: "column",
                borderRadius: "10px",
                padding: "2%",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Nombre: ${e.name}`}</Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography style={styles.infoText} variant="h7">
                      Precio:
                    </Typography>
                    <Typography
                      sx={{
                        color: "green",
                        marginLeft: "10px",
                        fontSize: "1.2rem",
                        padding: "1% 1% 1% 0",
                      }}
                      variant="h7"
                    >
                      {` $${e.price}`}
                    </Typography>
                  </Box>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Categoría: ${e.category?.name}`}</Typography>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Solicitudes: ${e.request?.length}`}</Typography>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Días: ${e.day.split(",").join(", ")}`}</Typography>
                  <Typography
                    style={styles.infoText}
                    variant="h7"
                  >{`Horarios: ${e.hours.split(",").join(", ")}`}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                  }}
                >
                  <Box
                    sx={{
                      height: "70%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      style={styles.infoText}
                      sx={{ textAlign: "center" }}
                      variant="h7"
                    >
                      Descripción:
                    </Typography>
                    <Typography
                      style={styles.infoText}
                      sx={{ textAlign: "center" }}
                      variant="h7"
                    >
                      {e.description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "30%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <NavLink
                      style={{ textDecoration: "none", color: "blue" }}
                      to={`${e.id}`}
                    >
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#1F2937" }}
                      >
                        Modificar Servicio
                      </Button>
                    </NavLink>

                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#1F2937" }}
                      id={e.id}
                      onClick={handleDelete}
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
        <Box style={styles.paginadoDiv}>
          <button style={styles.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button style={styles.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </Box>
    </Box>
  );
}
