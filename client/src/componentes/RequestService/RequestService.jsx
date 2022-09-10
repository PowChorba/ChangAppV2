/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allRequest,
  getDetail,
  getUserEmail,
  postNotification,
  postRequest,
} from "../../redux/actions/index.js";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Box, Typography, Button, TextField } from "@mui/material";
import userImg from "../../user.png";
import Navbar from "../PrivateRoute/Navbar";
import Footer from "../Footer";
import toast, { Toaster } from "react-hot-toast";
import s from './RequestService.module.css'

export default function RequestService(props) {
  const { user } = useAuth(); // author

  const [request, setRequest] = useState({
    day: "",
    hours: "",
    service_id: "",
    requester_id: "",
    email: "",
  });

  const [btn, setBtn] = useState(true)

  useEffect(() => {
    if(request.day && request.hours){
      setBtn(false)
    }else{
      setBtn(true)
    }
  })

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const service = useSelector((state) => state.serviceDetail);
  let requests = useSelector((state) => state.allRequest);
  const userDb = useSelector((state) => state.filter);
  requests = requests.filter((p) => p.service_id === id);
  requests = requests.filter((p) => p.requester_id === userDb[0]?.id);

  // PARA MANDAR UNA NOTIFICACION
  const [noti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });
  const [solicitador] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getUserEmail(user?.email));
    dispatch(allRequest());
    setLoading(false);
  }, [dispatch, user?.email]);
  
  const weekDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handlePrev = (e) => {
    e.preventDefault();
    window.history.back();
  };

  const handleDay = (e) => {
    if (request.day !== "") {
      document.getElementById(request.day).style = "color: #1F2937";
    }
    e.target.style.cssText = "color: white; background-color: #1F2937";
    setRequest({
      ...request,
      day: e.target.value,
    });
  };

  const handleHour = (e) => {
    if (request.hours === "") {
      setRequest({
        ...request,
        hours: e.target.value,
      });
    } else if (request.hours !== e.target.value) {
      document.getElementById(request.hours).checked = false;
      setRequest({
        ...request,
        hours: e.target.value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDb.length === 0) {
      toast.error(
        "Para solicitar un servicio, primero debes completar los datos de tu perfil. Dirigete hacia tu perfil."
      );
    }
    else if (userDb[0]?.id === service.user?.id) {
      toast.error("No puedes hacer un pedido a un servicio que publicaste.");
    }
    else if(requests.length !== 0){
      toast.error('Ya tienes una solicitud para este pedido, dirigete a tu perfil para modificarla.')
    }
    else if(userDb[0]?.id !== service.user?.id) {

      let requestService = {
        ...request,
        service_id: service.id,
        requester_id: userDb[0].id,
        email: service?.user.email,
      };

      if (
        noti.message === "" &&
        noti.userNotification_id === "" &&
        noti.userNotificated_id === "" &&
        solicitador.message === "" &&
        solicitador.userNotification_id === "" &&
        solicitador.userNotificated_id === ""
      ) {
        noti.message = `Recibiste una solicitud de servicio, dirigete a tu casilla para confirmar.`;
        noti.userNotification_id = userDb[0]?.id;
        noti.userNotificated_id = service.user?.id;
        solicitador.message = `Servicio solicitado, dirigete a tu perfil para mas informacion.`;
        solicitador.userNotification_id = userDb[0]?.id;
        solicitador.userNotificated_id = userDb[0]?.id;
      }
      dispatch(postNotification(solicitador));
      dispatch(postNotification(noti));
      dispatch(postRequest(requestService));
      setRequest({
        day: "",
        hours: "",
      });
      toast.success("Servicio solicitado correctamente");
      setTimeout(() => {
        navigate('/home')
      }, 1000);

    }
    
  };

  if (loading) return <h1>loading</h1>;
  else
    return (
      <div>
        <Navbar />
        {user?.email === null ? (
          <p>
            No tienes acceso a estos datos ya que ingresaste como un usuario
            anonimo. Ve a la seccion de registrar para poder utilizar estos
            servicios.
            <Link to="/register">Registrarse</Link>
          </p>
        ) : (
          <Box className={s.container}>
            <Toaster position="top-center" reverseOrder={false} />
            <Box className={s.boxUno}>
              <Box className={s.containerRequest}>
                <Box className={s.containerService}>
                  <Box
                    className={s.boxDos}
                  >
                    <Typography variant="h4">{service.name}</Typography>
                    <Box className={s.box}>
                      <Typography variant="h4">Precio: </Typography>
                      <Typography
                        className={s.titutloUno}
                        variant="h4"
                      >
                        {` $${service.price}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={s.boxTres}>
                    <Typography variant="h5">{`Descripción: ${service.description}`}</Typography>
                  </Box>
                </Box>
                <Box className={s.containerRequestForm}>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <Box className={s.boxCuatro}>
                      {weekDays.map((el) => {
                        if (service.day?.split(",").includes(el)) {
                          return (
                            <Button
                              variant="outlined"
                              id={el}
                              value={el}
                              onClick={(e) => handleDay(e)}
                              sx={{ color: "#1F2937", margin: "5px" }}
                            >
                              {el}
                            </Button>
                          );
                        } else
                          return (
                            <Button
                              disabled
                              variant="outlined"
                              sx={{ color: "#1F2937", margin: "5px" }}
                            >
                              {el}
                            </Button>
                          );
                      })}
                    </Box>
                    <Box className={s.containerHours}>
                      {service?.hours?.split(",").map((el) => {
                        return (
                          <Box className={s.hours}>
                            <Typography>{el}</Typography>
                            <input
                              id={el}
                              onChange={(e) => handleHour(e)}
                              type="checkbox"
                              value={el}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                    <Box
                      className={s.boxCinco}
                    >
                      <Button
                        onClick={handlePrev}
                        variant="outlined"
                        style={{ color: "#1F2937" }}
                      >
                        Volver atras
                      </Button>

                      <Button
                        variant="outlined"
                        sx={{ color: "#1F2937" }}
                        type="submit"
                        disabled={btn}
                      >
                        Solicitar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
              <Box className={s.containerUser}>
                <Box className={s.userDetail}>
                  <Box className={s.userName}>
                    <Typography variant="h4">
                      {service?.user?.firstName}
                    </Typography>
                    <Typography variant="h6">
                      {service?.user?.lastName}
                    </Typography>
                  </Box>
                  <img
                    className={s.userPic}
                    src={service?.user?.img ? service?.user?.img : userImg}
                    alt="user-pic"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        <Footer />
      </div>
    );
}
