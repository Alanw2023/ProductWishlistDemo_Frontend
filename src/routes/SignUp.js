import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'; // Add this line to your imports
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Copyright from "../components/Copyright";
import {useNavigate} from "react-router-dom";
import {ADMIN_SIGN_UP_URL, BACKEND_ADDRESS, USER_SIGN_UP_URL} from "../config";
import {performPostActionAsync} from "../utils";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        // Make a POST request to the appropriate endpoint (this is just an example)
        const formData = new FormData(event.currentTarget);

        const secretCode = formData.get("secretCode");

        const endpoint = BACKEND_ADDRESS + (secretCode ? ADMIN_SIGN_UP_URL : USER_SIGN_UP_URL);

        const data = {
            displayName: formData.get("displayName"),
            email: formData.get('email'),
            password: formData.get('password'),
            ...(secretCode && {secretCode})
        };

        const response = await performPostActionAsync(endpoint, data);

        if (response.error) {
            alert(response.message);
        } else {
            alert("You've successfully signed up!");
            navigate("/");
        }

        setLoading(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="displayName"
                                    required
                                    fullWidth
                                    id="displayName"
                                    label="Display Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="secretCode"
                                    label="Secret Code (Optional)"
                                    type="password"
                                    id="secretCode"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                        </Button>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Home
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}
