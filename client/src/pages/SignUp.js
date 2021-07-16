import React, { useState, useContext } from 'react';
import {
    Button, CssBaseline, makeStyles, Checkbox,
    TextField, Typography, FormControlLabel,
    Link, Grid, Box, Container, Avatar, MenuItem
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { AuthContext } from '../context/authContext/AuthState'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { registerUser, alerts, removeAlert, addUIAlert } = authContext;



    const [newUser, setNewUser] = useState({})
    const { username, password, passwordConfirm } = newUser;


    const handleChange = e => setNewUser({
        ...newUser,
        [e.target.name]: e.target.value
    })

    const handleRegisterUser = async e => {
        e.preventDefault();

        if(!username){
            addUIAlert([{severity: 'error', msg: 'A valid username is required'}])
            return
        }

        if(!password || password.length < 6){
            addUIAlert([{severity: 'error', msg: 'A valid password  of 6 or more characteris required'}])
            return
        }

        if(passwordConfirm !== password){
            addUIAlert([{severity: 'error', msg: 'Your password and confirm password do not match'}])
            return
        }

        await registerUser(newUser)
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                {alerts &&
                    <Grid container spacing={2}>
                        {alerts.map(alert => (
                            <Grid item xs={12}>
                                <Alert onClose={() => removeAlert(alert._id)} key={alert._id} severity={alert.severity}>{alert.msg}</Alert>
                            </Grid>
                        ))}
                    </Grid>
                }
                <form className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required onChange={handleChange}
                        fullWidth value={username}
                        label="username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth onChange={handleChange}
                        name="password" value={password}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth onChange={handleChange}
                        name="passwordConfirm" value={passwordConfirm}
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth onClick={handleRegisterUser}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    {/* <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}