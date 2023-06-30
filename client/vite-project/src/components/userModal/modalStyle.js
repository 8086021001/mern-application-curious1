export const modalStyles = {
    wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        boxShadow: 50,
        p: 5,
        height: 'auto',
        background: '#223',
        display: 'grid',
        placeItems: 'center',
        border: " solid 1px rgb(25,118,210)",
    },
    inputFields: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '15px',
        '.MuiInput-root': {
            marginBottom: '20px',
            marginTop:'5px'
        },
        gap: 2,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'end',
        color:'black',
        bgcolor:"white",
        '&:hover': {
            backgroundColor: 'white', 
          },
    },

};