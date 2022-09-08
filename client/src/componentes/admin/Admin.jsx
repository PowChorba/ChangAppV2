import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allRequest,
  allUsers,
  getAllCategories,
  getAllServices,
} from "../../redux/actions";
import styles from "./Estilos/style";
import { NavLink } from "react-router-dom";

export default function Admin() {
  const dispatch = useDispatch();
  const usersDb = useSelector((state) => state.users);
  const servicesDb = useSelector((state) => state.services);
  const categoriesDb = useSelector((state) => state.categories);
  const requestDb = useSelector((state) => state.allRequest);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAllCategories());
    dispatch(allUsers());
    dispatch(allRequest());
  }, [dispatch]);

  return (
    <div>
      <Box component="section" sx={styles.contenedor}>
        <Box sx={styles.cajas}>
          <Typography sx={styles.titulo}>Usuarios Registrados</Typography>
          <Typography sx={styles.numeros}>{usersDb.length}</Typography>
          <NavLink style={styles.link} to="/admin/users">
            Ver todos
          </NavLink>
        </Box>
        <Box sx={styles.cajas}>
          <Typography sx={styles.titulo}>Servicios Creados</Typography>
          <Typography sx={styles.numeros}>{servicesDb.length}</Typography>
          <NavLink style={styles.link} to="/admin/services">
            Ver todos
          </NavLink>
        </Box>
        <Box sx={styles.cajas}>
          <Typography sx={styles.titulo}>Categorias habilitadas</Typography>
          <Typography sx={styles.numeros}>{categoriesDb.length}</Typography>
          <NavLink style={styles.link} to="/admin/categories">
            Ver todos
          </NavLink>
        </Box>
        <Box sx={styles.cajas}>
          <Typography sx={styles.titulo}>Solicitudes de Servicios</Typography>
          <Typography sx={styles.numeros}>{requestDb.length}</Typography>
          <NavLink style={styles.link} to="/admin/requests">
            Ver todos
          </NavLink>
        </Box>
      </Box>
    </div>
  );
}
