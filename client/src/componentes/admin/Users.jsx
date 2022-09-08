import React, { useEffect, useState } from "react";
import user from "./Estilos/users";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allUsers } from "../../redux/actions";


export default function Users() {
  const dispatch = useDispatch();
  const usersDb = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  //Paginado para los servicios
  const paginas = Math.ceil(usersDb.length / 10)
  const [pages, setPages] = useState(1)
  const [requestPerPage] = useState(10)
  const ultima = pages * requestPerPage
  const primera = ultima - requestPerPage
  const userSlice = usersDb.slice(primera, ultima)

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


  return (
    <div style={user.contenedor}>
      <div style={user.titulo}>
        <h2>Usuarios Registrados</h2>
      </div>
      <div style={user.gridUno}>
        <p>ID</p>
        <p>Nombre</p>
        <p>Apellido</p>
        <p>Email</p>
        <p>Admin</p>
        <p>Banneado</p>
        <p>Detalles</p>
      </div>
      {userSlice &&
        userSlice.map((e) => {
          return (
            <div style={user.gridUno}>
              <p>{e.id}</p>
              <p>{e.firstName}</p>
              <p>{e.lastName}</p>
              <p style={user.columnas}>{e.email}</p>
              <p>{e.admin ? "true" : "false"}</p>
              <p>{e.banned ? "true" : "false"}</p>
              <button
                style={user.btn}
                onClick={() => navigate(`/admin/users/${e.id}`)}
              >
                Detalles
              </button>
            </div>
          );
        })}
        <div style={user.paginadoDiv}>
          <button style={user.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {''} {pages} de {paginas} {''}
          <button style={user.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </div>
    </div>
  );
}

