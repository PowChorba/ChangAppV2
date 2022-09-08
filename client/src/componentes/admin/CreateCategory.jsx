import { Box, Button, IconButton, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { postCategory } from "../../redux/actions/index.js";
import axios from "axios";
import { CLODUNIARY_API } from "../../Secret/Secret.js";



export default function CreateCategory() {
  const [category, setCategory] = useState({
    name: "",
    img: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "changApp");

      const cloudinary = await axios.post(CLODUNIARY_API, data);

      setCategory({
        ...category,
        img: cloudinary.data.secure_url,
      });
    } catch (error) {
      console.log(error);
    }
  };




  const handleSumbit = async (e) => {
    e.preventDefault();
    dispatch(postCategory(category));
    setError("");
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  };

  const styles = {
    container: {
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
      height: "100vh",
    },
    login: {
      display: "flex",
      flexDirection: "column",
      width: "40%",

      alignItems: "center",
      border: "solid 3px lightblue",
      borderRadius: "15px",
      padding: "35px",
    },
    form: {
      width: "100%",
    },
    button: {
      width: "100%",
      margin: "10px 0",
    },
    input: {
      width: "100%",
      margin: "10px 0 10px 0",
    },
  };

  return (
    <div>
      <Box style={styles.container}>
        <Box style={styles.login}>
          <Typography variant="h4" sx={{ marginBottom: "30px" }}>
            Categoría Nueva
          </Typography>
          <form style={styles.form} onSubmit={(e) => handleSumbit(e)}>
            {error && <p>{error}</p>}
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                style={styles.input}
                type="text"
                name="name"
                value={category.name}
                onChange={handleOnChange}
              />
              {/* <TextField
                id="outlined-basic"
                label="Imagen"
                variant="outlined"
                style={styles.input}
                type="text"
                name="img"
                value={category.img}
                onChange={handleOnChange}
              /> */}
              <IconButton color="primary" aria-label="subir imagen" type="file" component="label" >
                <Input
                variant="outlined"
                hidden
                accept="image/jpeg, image/png"  
                type="file"
                name="img"
                // value={category.img}
                onChange={handleImage}
                 />
                 {/* <AddAPhotoIcon /> */}
              </IconButton>
              <Button variant="contained" style={styles.button} type="submit">
                Crear
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          ></Box>
        </Box>
      </Box>
    </div>
  );
}
