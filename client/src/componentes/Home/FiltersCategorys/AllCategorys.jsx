import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import Navbar from "../../PrivateRoute/Navbar";
import FormCategory from "./FormCategory";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "../../css/card-services.css"
import '../../css/empty.css'
import error from '../../../404.png'


export default function AllCategorys() {
  const services = useSelector((state) => state.services);
  const dispath = useDispatch();

  //PAGINADO 
  const paginas = Math.ceil(services?.length / 4)
  const [pages, setPages] = useState(1)
  const [servicePerPage] = useState(4)
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
    <div className="service-container-full">
      <Navbar />
      <FormCategory />

      <div className="container-services">
        <div style={{ margin:"15px", color: '#fff'}}>
          <Typography variant='h5'>Todos los servicios</Typography>
        </div>
        {
        services.length === 0 ? (
          <Box>
              <Box className="asdasd" sx={{textAlign: 'center', display: 'flex', flexDirection:'column', alignItems: 'center', maxWidth:'80%', position: 'relative', margin: '40px auto'  }} >
            <Box>
                <Typography variant="h5" mb={5}>  
                    No se encuentra ningun servicio actualmente{" "}
                    <NavLink className='linkk' to="/home/createService">Se el primero en publicar un servicio!</NavLink>
                </Typography>
                {/* <Avatar sx={{ width: 182, height: 182, boxShadow:' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px', position: 'relative', margin: '0 auto' }}> */}
            { 
              <img src={error} alt="?" width="182px" height="182px" />
            }
          {/* </Avatar> */}

            </Box>
        </Box>
          </Box>
        ) : 

       ( services &&
        userSlice?.map((e) => {
            return (
              <div className="cards-services"

                key={e.id}
                >
                <img src={e.user?.img} alt="No tiene imagen de perfil" width='64px' height="64px"/>
                <h3>Servicio: {e.name}</h3>
                <h4>{e.user?.firstName}</h4>

                <p>{e.description}</p>
                <p>${e.price}</p>
                <Link to={`/home/services/${e.id}`}>
                <Button variant="contained"  sx={{ backgroundColor: "#354152", margin: '5px' }} >Haz tu reserva</Button>
              </Link>
              <Link to={`/home/public/${e.user?.id}`}>
                <Button variant="contained"  sx={{ backgroundColor: "#354152" }} >Ver Perfil</Button>
              </Link>
              </div>
            );
          }))}
      </div>
      <div style={{textAlign: 'center'}}>
      <Button sx={{ backgroundColor: "#354152", margin: '5px', color: '#fff' }} onClick={handleAnterior}>{'<'}</Button>
      <span style={{color: '#fff'}}>{pages} de {paginas}</span>
      <Button sx={{ backgroundColor: "#354152", margin: '5px', color: '#fff' }} onClick={handleSiguiente}>{'>'}</Button>
    </div>
    </div>
  );
}
