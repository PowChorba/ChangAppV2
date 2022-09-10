import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import Navbar from "../../PrivateRoute/Navbar";
import FormCategory from "./FormCategory/FormCategory";
import { Link, NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import error from '../../../404.png'
import s from './FilterCategory.module.css'

export default function AllCategorys() {
  const services = useSelector((state) => state.services);
  const dispath = useDispatch();

  //PAGINADO 
  const paginas = Math.ceil(services?.length / 3)
  const [pages, setPages] = useState(1)
  const [servicePerPage] = useState(3)
  const ultimo = pages * servicePerPage
  const primero = ultimo - servicePerPage
  const userSlice = services.slice(primero, ultimo)

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



  useEffect(() => {
    dispath(getAllServices());
  }, [dispath]);

  return (
    <div>
      <Navbar />
      <div className={s.contenedor}>
      <div> 
      <FormCategory />
      </div>

      <div className={s.containerSegundo}>
        <div className={s.contenedorTodo}>
          <Typography variant='h5'>Todos los servicios</Typography>
        </div>
        {
        services.length === 0 ? (
          <div className={s.emptyContainer}>
            <Box>
                <Typography variant="h5" mb={5}>  
                    No se encuentra ningun servicio actualmente{" "}
                    <NavLink className='linkk' to="/home/createService">Se el primero en publicar un servicio!</NavLink>
                </Typography>
            { 
              <img src={error} alt="?" width="182px" height="182px" />
            }
            </Box>

          </div>
        ) : 

       ( services &&
        userSlice?.map((e) => {
            return (
              <div className={s.cardServices}
              key={e.id}
            >
              <div className={s.cardServicesUno}>
                <img src={e.user?.img} alt="No tiene" className={s.imagen}/>
              </div>
              <div className={s.cardServicesDos}>
                <h3>Servicio: {e.name}</h3>
                <h4>{e.user?.firstName}</h4>
                <p>{e.description}</p>
                <p>${e.price}</p>
                <Link to={`/home/services/${e.id}`}>
                  <button className={s.btn} >Haz tu reserva</button>
                </Link>
                <Link to={`/home/public/${e.user?.id}`}>
                  <button  className={s.btn} >Ver Perfil</button>
                </Link>
              </div>
            </div>
            );
          }))}
      <div className={s.noHide}>
      <button  className={s.btn} onClick={handleAnterior}>{'<'}</button>
      <span>{pages} de {paginas} </span>
      <button  className={s.btn} onClick={handleSiguiente}>{'>'}</button>
      </div>
      </div>
    </div>
    </div>
  );
}
