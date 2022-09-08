const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#E5E7EB",
      color: "#1F2937",
    },
    containerRequest: {
      width: "60%",
      margin: "20px 10px 20px 20px",
    },
    containerUser: {
      margin: "20px 20px 20px 10px",
      flexDirection: "column",
      width: "40%",
      display: "flex",
    },
    userDetail: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      border:'solid grey 0.5px', 
      borderRadius:'3px'
    },
    containerService: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      border:'solid grey 0.5px', 
      borderRadius:'3px',
      padding: "20px",
    },
    containerRequestForm: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      border:'solid grey 0.5px', 
      borderRadius:'3px',
      marginTop: "20px",
      padding: "20px",
    },
    box: {
      display: "flex",
    },
    userPic: {
      width: "100px",
      height: '100px',
      borderRadius: "50%",
      padding: "20px",
    },
    userName: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px",
    },
    reviews: {
      width: "100%",
      border:'solid grey 0.5px', 
      borderRadius:'3px',
      marginTop: "20px",
    },
    selectedButton: {
      color: "white",
      backgroundColor: "black",
    },
    containerHours: {
      display:'flex', 
      justifyContent:'space-around', 
      padding:'10px'
    },
    hours: {
      display:'flex', 
      alignItems:'center', 
      padding:'5px', 
      border:'solid grey 0.5px', 
      borderRadius:'3px'
    }
  };

  export default styles;