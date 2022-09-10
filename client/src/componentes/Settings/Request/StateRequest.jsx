import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import {
  postNotification,
  updateRequest,
} from "../../../redux/actions";
import { NavLink } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import userImg from "../../../user.png";
import toast, { Toaster } from "react-hot-toast";
import error from '../../../404.png'
import s from './StateRequest.module.css'

export default function StateRequest() {
  const { user } = useAuth();
  const serviceState = useSelector((state) => state.services);
  const allRequests = useSelector((state) => state.allRequest)
  const filtroRequestsUsers = allRequests.filter(e => e.services?.user?.email === user?.email).reverse()
  const dispatch = useDispatch();
  const filterEmail = serviceState.filter(
    (state) => state.user?.email === user?.email
  );
  const [btn, setBtn] = useState({
    state: "",
    id: "",
    email: "",
  });


  //Paginado para los servicios
  const paginas = Math.ceil(filtroRequestsUsers.length / 2)
  const [pages, setPages] = useState(1)
  const [requestPerPage] = useState(2)
  const ultima = pages * requestPerPage
  const primera = ultima - requestPerPage
  const requestSlice = filtroRequestsUsers.slice(primera, ultima)

  const handleAnterior = (e) => {
    e.preventDefault()
    setPages(pages - 1)
      if(pages < 2){
        setPages(1)
      }
      window.scrollTo(0,0)
  }

  const handleSiguiente = () => {
    setPages(pages + 1)
    if(pages >= paginas){
      setPages(paginas)
    }
    window.scrollTo(0,0)
}

  //ESTADO PARA LA NOTIFICACION AUTOMATICA
  const [noti, setNoti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });

  //PARA CAMBIAR EL VALOR DEL ESTADO
  const handleOnClick = (e) => {
    if (btn.state === "") {
      setBtn({
        ...btn,
        state: e.target.name,
        id: e.target.value,
      });
      //ESTO ES PARA ENVIAR LA NOTIFICACION AUTOMATICA
      setNoti({
        message: `Tu pedido del trabajo ${filterEmail[0].name} fue aceptado.`,
        userNotification_id: filterEmail[0]?.user.id,
        userNotificated_id: e.target.className,
      });
    } else if (btn.state !== e.target.name) {
      document.getElementById(btn.state).checked = false;
      setBtn({
        ...btn,
        state: e.target.name,
        id: e.target.value,
      });
      //ESTO ES PARA ENVIAR LA NOTIFICACION AUTOMATICA
      setNoti({
        message: `Tu pedido del trabajo ${filterEmail[0]?.name} fue rechazado.`,
        userNotification_id: filterEmail[0]?.user.id,
        userNotificated_id: e.target.className,
      });
    }
  };
  // PARA ENVIAR EL FORMULARIO AL BACK
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (btn.state !== "") {
      dispatch(postNotification(noti));
      dispatch(updateRequest({ ...btn, email: e.target.name }));
      toast('Solicitud Actualizada', {
        icon: '👏',
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    }
  };

  return (
    <Box className={s.contenedorGeneral}>
      <Toaster position="top-center" reverseOrder={false} />
      {filterEmail.length === 0 ? (
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
      ): requestSlice.length === 0 ? <Box
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
          Aun no has recibido ninguna solicitud
        </Typography>
      </Box>
    </Box>: (
          requestSlice.map((e) => {
            return e.state === "rechazado" || e.state === "Pagado" ? (
              <Box
              key={e.id}
                className={
                  e.state === "rechazado" ? s.rejected : s.acepted
                }
              >
                <Typography>
                  La orden #{e.id} del servicio {filterEmail[0].name} fue{" "}
                  {e.state === "Pagado" ? "Pagada" : "Rechazada"}
                </Typography>
              </Box>
            ) : (
              <Box
              key={e.id}
                className={
                  e.state === "rechazado"
                    ? s.rejected
                    : e.state === "aceptado"
                    ? s.acepted
                    : s.pending
                }
              >
                <Box
                  className={s.boxUno}
                >
                  <Typography sx={{ padding: "5%" }}>
                    Reservado por:{" "}
                  </Typography>
                  <img
                    style={{ width: "100px" }}
                    src={e.userRequester?.img ? e.userRequester?.img : userImg}
                    alt="asd"
                  />
                  <Typography sx={{ padding: "5%" }}>
                    {e.userRequester?.firstName.concat(
                      ` ${e.userRequester.lastName}`
                    )}
                  </Typography>
                </Box>
                <Box
                  className={s.boxDos}
                >
                  <Typography>
                    Nombre del servicio: {e.services?.name}
                  </Typography>
                  <Typography>Estado: {e.state}</Typography>
                  <Typography>
                    Trabajo solicitado para el dia {e.day} a las {e.hours}hs
                  </Typography>
                </Box>
                <Box sx={{ width: "25%" }}>
                  {e.state === "aceptado" ? (
                    <form
                      className={s.boxTres}
                      name={e.userRequester.email}
                      onSubmit={(e) => handleOnSubmit(e)}
                    >
                      <Button
                        name="rechazado"
                        variant="contained"
                        value={e.id}
                        onClick={handleOnClick}
                      >
                        Cancelar
                      </Button>

                      <Button variant="contained" type="submit">
                        Actualizar
                      </Button>
                    </form>
                  ) : e.state === "pendiente" ? (
                    <form
                      name={e.userRequester.email}
                      onSubmit={(e) => handleOnSubmit(e)}
                      className={s.boxTres}
                    >
                      <Button
                        id="aceptado"
                        name="aceptado"
                        value={e.id}
                        onClick={handleOnClick}
                        variant="contained"
                      >
                        Aceptar
                      </Button>

                      <Button
                        id="rechazado"
                        name="rechazado"
                        email={e.userRequester.email}
                        value={e.id}
                        onClick={handleOnClick}
                        variant="contained"
                      >
                        Rechazar
                      </Button>

                      <Button type="submit" variant="contained">
                        Confirmar
                      </Button>
                    </form>
                  ) : (
                    console.log("No mas ternarios")
                  )}
                </Box>
              </Box>
            );
          })
        // })
      )}
      <div className={s.paginadoDiv}>
          <button className={s.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button className={s.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </div>
    </Box>
  );
}
