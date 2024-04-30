import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'; // Add this line to your imports
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "../components/Copyright";
import {FIREBASE_API_KEY, FIREBASE_SIGN_IN_URL} from "../config";
import {useNavigate} from "react-router-dom";
import {performPostActionAsync} from "../utils";
import jwtDecode from 'jwt-decode';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const requestData = {
            email: formData.get('email'),
            password: formData.get('password'),
            returnSecureToken: true
        };

        const response = await performPostActionAsync(FIREBASE_SIGN_IN_URL + FIREBASE_API_KEY, requestData);

        console.log(response);

        if (response.error) {
            alert(`Error: ${response.error.message}`);
        } else {
            const token = response.idToken;
            localStorage.setItem('jwt', token);

            const decodedToken = jwtDecode(token);
            const custom_claims = decodedToken.custom_claims;
            console.log(decodedToken);

            if (custom_claims && custom_claims.includes('ADMIN')) {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }
        }

        setLoading(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                            </Button>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {"Home"}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
