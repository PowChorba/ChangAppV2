const service = {
    titulo: {
        width: '90%',
        margin: '0px auto',
        textAlign: 'center',
        borderBottom: '3px solid #000'
    },
    contenedorCard: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        
    },
    card: {
        textAlign: 'center',
        backgroundColor: '#1F2937',
        padding: '20px',
        color: '#fff',
        borderRadius: '20px',
        width: '75%',
        margin: '10px auto',
    },
    link: {
        color: '#fff',
        borderBottom: '1px solid white'
    },
    
    btn: {
        backgroundColor: '#fff',
        border: 'none',
        padding: '5px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontWeight: '600'


    },
    sinSolicitudes: {
        gridColumn: '1/3',
        width: '50%',
        margin: '10px auto',
        backgroundColor: '#1F2937',
        textAlign: 'center',
        color: '#fff',
        padding: '50px',
        borderRadius: '20px'
    },
    btnPaginado: {
        cursor: "pointer",
        backgroundColor: "#1F2937",
         border: "none",
          padding: "5px 20px",
          borderRadius: "20px",
          color: '#fff',
          outline: '0'
      },
      paginadoDiv: {
        // marginTop: '5px',
        textAlign: 'center',
        marginBottom:"5px"
      }
}

export default service