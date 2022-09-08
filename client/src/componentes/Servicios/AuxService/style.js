const styles = {
    container: {
      // padding:'30px',
      minHeight:'100vh',
      height:`calc(100vh - 82px)`,
      padding:'20px',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
    },
    containerForm: {
      padding:'30px',
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    form: {
      alignItems: "center",
      width: "100%",
      display:'flex',
      flexDirection:'column'
    },
    input: {
      width: "100%",
      margin: "10px 0 10px 0",
      
    },
    time: {
      width: '80px',
      fontSize:'2em',
      height: '30px',
      backgroundColor: 'transparent',
      border: 'solid grey 0.5px',
      borderRadius:'3px',
      padding: '7px',
      outline:'none'
      
    },
    hourAdded: {
      height:'50px',
      margin:'10px',
      width:'100%', 
      borderRadius:'10px', 
      border:'solid grey 0.5px', 
      display:'flex'
    },
    bottomButtons: {
      display: "flex", 
      justifyContent: "space-around", 
      padding:'50px', 
      width:'50%'
    }
  };

export default styles;  