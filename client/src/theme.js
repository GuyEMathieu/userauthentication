import { createTheme } from '@material-ui/core/styles'



// // Create theme instance
export const theme = createTheme({
    palette: {
        primary: {
            main: "#f00"
        }
    },

    overrides: {
        MuiAccordionSummary: {
            root: {
                //backgroundColor: '#f00',
                //margin: '3px'
            }
        },

        MuiAccordionDetails: {
            root: {
                //marginTop: '16px',
                //backgroundColor: '#eeeeee',
            }
        },

        MuiAppBar: {
            root: {
                padding: '0px'
            }
        }, 
        MuiPaper: {
            root: {
                padding: '16px',
            },
        },

        MuiButton: {
            root: {
                //borderRadius: 20,
                textTransform: 'none' // Prevent All Caps
            }
        }
    },


    props: {
        MuiPaper: {
            elevation: 1,
            square: true
        },
        MuiButton: {
            size: "medium",
            variant: "contained",
            color: 'primary',
            fullWidth: true,
            disableRipple: true
        },

        MuiTextField: {
            //disabled: true,
            size: "small",
            variant: "outlined",
            fullWidth: true,
            
            InputLabelProps: {
                shrink: true,
                color: 'primary'
            }
        },
    }
})