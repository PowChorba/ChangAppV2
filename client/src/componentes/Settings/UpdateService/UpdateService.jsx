import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServices,
  getServiceById,
  postNotification,
  updateService,
} from "../../../redux/actions";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import toast, {Toaster} from 'react-hot-toast'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import styles from "../../Servicios/AuxService/style";

function validate(service) {
  let error = {};

  if (!/^[a-z ñ]+$/i.test(service.name))
    error.name = "El nombre solo puede contener letras";
  else if (service.description > 150)
    error.description =
      "La descripcion no puede contener mas de 150 caracteres";

  return error;
}

export default function UpdateService() {
  const filterService = useSelector((state) => state.services);
  const dispatch = useDispatch();
  const param = useParams();
  const idService = filterService.filter((e) => e.id === param.id);
  const navigate = useNavigate();
  const [service, setService] = useState({
    name: "",
    day: [],
    hours: [],
    price: "",
    description: "",
    email: "",
  });
  const [error, setError] = useState("");

  //PARA RECIBIR NOTIFICACION AUTOMATICA
  const [noti] = useState({
    message: "",
    userNotification_id: "",
    userNotificated_id: "",
  });
  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getServiceById(param.id));
  }, [dispatch, param.id]);



  //PARA LEER LOS CAMBIOS
  const handleOnChange = (e) => {
    e.preventDefault();
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...service,
        [e.target.name]: e.target.value,
      })
    );
  };

  //AGREGAR DIAS DISPONIBLES
  const handleOnClick = (e) => {
    if (!service.day.includes(e.target.value)) {
      e.target.style.cssText = "color: #E5E7EB; background-color: #1F2937";
      setService({
        ...service,
        day: [...service.day, e.target.value],
      });
    } else {
      e.target.style.cssText = "color: #1F2937; background-color: #E5E7EB";
      console.log("Ya lo agregaste");
    }
  };

  // const handleDay = (e) => {
  //   if (!service.day.includes(e.target.value)) {
  //     e.target.style.cssText = "color: #E5E7EB; background-color: #1F2937";
  //     setService({
  //       ...service,
  //       day: [...service.day, e.target.value],
  //     });
  //   } else {
  //     e.target.style.cssText = "color: #1F2937; background-color: #E5E7EB";
  //     setService({
  //       ...service,
  //       day: service.day.filter((el) => el !== e.target.value),
  //     });
  //   }
  // };



//manejo de horarios de disponibilidad
const handleTime = (e) => {
  let inputValue = document.getElementById("time");
  if (inputValue.value !== "" && !service.hours.includes(inputValue.value)) {
    setService({
      ...service,
      hours: [...service.hours, inputValue.value],
    });
  }
};

const handlePlusTime = (e) => {
  let element = document.getElementById("time");
  if (!element.value) element.value = "00:00";
  let input = document.getElementById("time").value;
  input = input.split(":");

  if (element.value === "23:30") {
    element.value = "00:00";
  } else {
    if (Number(input[1]) === 30) {
      input[1] = "00";
      input[0] = (Number(input[0]) + 1).toString();
      input[0] = input[0] < 10 ? "0".concat(input[0]) : input[0];
    } else if (Number(input[1]) !== 30) {
      input[1] = "30";
    } else if (element.value === "23:30") {
      element.value = "00:00";
    }

    element.value = input.join(":");
  }
};

const handleLessTime = (e) => {
  let element = document.getElementById("time");
  if (!element.value) element.value = "00:00";
  let input = document.getElementById("time").value;
  input = input.split(":");

  if (element.value === "00:00") {
    element.value = "23:30";
  } else {
    if (input[1] === "00") {
      input[1] = "30";
      input[0] = (Number(input[0]) - 1).toString();
      input[0] = input[0] < 10 ? "0".concat(input[0]) : input[0];
    } else if (input[1] !== "00") {
      input[1] = "00";
    }
    element.value = input.join(":");
  }
};

const handleDeleteTime = (e) => {
  setService({
    ...service,
    hours: service.hours.filter((el) => el !== e.target.value),
  });
};


  //ENVIAR DATA DEL FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();
    service.day = service.day.join(",");
    service.hours = service.hours.join(",");
    if (service.name === "") service.name = idService[0]?.name;
    if (service.price === "") service.price = idService[0]?.price;
    if (service.description === "")
      service.description = idService[0]?.description;
    service.email = idService[0].user.email;
    if (service.day === "") service.day = idService[0]?.day;
    if (service.hours === '') service.hours = idService[0]?.hours
    if (
      noti.message === "" &&
      noti.userNotification_id === "" &&
      noti.userNotificated_id === ""
    ) {
      noti.message = `Publicacion actualizada.`;
      noti.userNotification_id = idService[0]?.user_id;
      noti.userNotificated_id = idService[0]?.user_id;
    }
    dispatch(postNotification(noti));
    dispatch(updateService(param.id, service));
    toast.success('Servicio actualizado')
    setTimeout(() => {
      navigate("/settings/services");
    }, 2000);
  };

  return (
    <Box sx={{ width:'70%', display: "flex", flexDirection: "column", gap: "20px", textAlign: 'center' }} pt={2}>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h6">Modificar servicio</Typography>
      {error && <p>{error.name}</p>}
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <Box sx={{ display: "flex", gap: "20px", justifyContent: 'center' }}>
          <label>Nombre </label>
          <TextField
            type="text"
            name="name"
            placeholder={idService[0]?.name}
            value={service.name}
            onChange={handleOnChange}
          />
            <label>Precio</label>
          <TextField
            type="number"
            name="price"
            placeholder={idService[0]?.price.toString()}
            value={service.price}
            onChange={handleOnChange}
          />
        </Box>
        <Box variant='contained' sx={{ display: "flex", gap: "20px", flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', justifyContent: '' }}>
          <label>Dias disponibles</label>
          <Box>
          {[
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
          ].map((e) => {
            return (
              <Button
              sx={{ maxWidth: "100px" }}
              onClick={handleOnClick}
              value={e}
              type="button"
              key={e}
              >
                {e}
              </Button>
            );
          })}
          </Box>
        </Box>
        <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h7"
                  sx={{ textAlign: "center", padding: "30px" }}
                >
                  Agregá horarios de disponibilidad
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "30%",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <input
                      style={styles.time}
                      id="time"
                      type="time"
                      step={1800}
                      
                    />

                    <Box sx={{ display: "flex" }}>
                      <Button
                        variant="outlined"
                        onClick={(e) => handlePlusTime(e)}
                        sx={{ minWidth: "30px" }}
                      >
                        <ExpandLessIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={(e) => handleLessTime(e)}
                        sx={{ minWidth: "30px" }}
                      >
                        <ExpandMoreIcon />
                      </Button>
                    </Box>
                  </Box>
                  <Button
                    onClick={handleTime}
                    sx={{ width: "40px", height: "45px", outline: "none" }}
                    variant="outlined"
                  >
                    ➕
                  </Button>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }}>
                  <Box style={styles.hourAdded}>
                    {service?.hours?.map((el) => {
                      return (
                        <Box
                          key={el.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            padding: "5px",
                          }}
                        >
                          <Typography>{el}</Typography>
                          <Button
                            value={el}
                            onClick={(e) => handleDeleteTime(e)}
                            sx={{ minWidth: "20px", padding: "0" }}
                          >
                            ✖
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
        <Box sx={{ display: "flex", gap: "80px", justifyContent: 'center' }}>
          <label>Descripcion</label>
          <textarea
            style={{backgroundColor: 'inherit'}}
            name="description"
            cols="40"
            rows="4"
            placeholder={idService[0]?.description}
            value={service.description}
            onChange={handleOnChange}
          />
        </Box>
        <Button type="submit">Cargar cambios</Button>
      </form>
      <NavLink style={{ textDecoration: "none" }} to="/settings/services">
        <Button>Volver Atras</Button>
      </NavLink>
    </Box>
  );
}
