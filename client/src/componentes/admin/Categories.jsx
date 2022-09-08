import React, { useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions";
import categories from "./Estilos/categories";

export default function Categories() {
  const dispatch = useDispatch();
  const categoriesDb = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Categoría", width: 130 },
    { field: "img", headerName: "Imagen", width: 130 },
  ];

  return (
    <div>
      <div style={categories.titulo}>
        <h2>Categorias</h2>
      </div>
      <div style={categories.grid}>
      <DataGrid
        columns={columns}
        rows={categoriesDb}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{backgroundColor: '#1F2937', color: '#fff'}}
      />
      
    </div>

    </div>
  );
}
