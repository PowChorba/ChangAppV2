import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import {deleteCategory} from '../../redux/actions/index.js'

export default function DeleteCategory() {
    const [category, setCategory] = useState({
        id: "",
      });
    
      const [error, setError] = useState("");
     
   
      const dispatch = useDispatch()
    
      const handleOnChange = (e) => {
        setCategory({
          ...category,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSumbit = (e) => {
        e.preventDefault();
  
        dispatch(deleteCategory(category.id))
        setError("");
     
        window.location.reload()
       
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
               Eliminar Categoría
              </Typography>
              <form style={styles.form} onSubmit={(e) => handleSumbit(e)}>
                {error && <p>{error}</p>}
                <Box
                  sx={{ width: "100%", display: "flex", flexDirection: "column" }}
                >
                  <TextField
                    id="outlined-basic"
                    label="ID"
                    variant="outlined"
                    style={styles.input}
                    type="number"
                    name="id"
                    value={category.id}
                    onChange={handleOnChange}
                  />

                  <Button variant="contained" style={styles.button} type="submit">
                    Eliminar
                  </Button>
                </Box>
              </form>
      
            
             
            </Box>
          </Box>
        </div>
      );
}