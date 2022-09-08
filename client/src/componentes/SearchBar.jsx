import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName, searchCategory } from "../redux/actions/index.js";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

const styles = {
  button: {
    color: "white",
  },
  input: {
    padding: "7px",
  },
};
export default function SearchBar() {
  const location = useLocation()
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleInput(e) {
    e.preventDefault();
    const value = e.target.value;
    const value2 = value.charAt(0).toUpperCase() + value.slice(1);
    setName(value2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getName(name));

    setName("");
  }

  const handleSearchCat = (e) =>{
    e.preventDefault();
    dispatch(searchCategory(name))
    setName('')
  }
  return (
    <div>
      <form onSubmit={location.pathname === '/home' ? (e) => handleSearchCat(e) : (e) => handleSubmit(e)}>
      <input
        style={styles.input}
        placeholder={location.pathname === '/home' ? 'Buscar categoria...' : 'Buscar servicio...'}
        type="text"
        value={name}
        onChange={(e) => handleInput(e)}
      ></input>
      <Button
        style={styles.button}
        type="submit"
      >
        <SearchIcon></SearchIcon>
      </Button>
      </form>
    </div>
  );
}
