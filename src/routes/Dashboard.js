import * as React from 'react';
import {useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import Copyright from "../components/Copyright";
import {useNavigate} from "react-router-dom";
import {performAuthenticatedGetActionAsync} from "../utils";
import {BACKEND_ADDRESS} from "../config";
import DrawerListItem from "../components/DrawerListItem";
import {AppBar} from "../components/AppBar";
import {Drawer} from "../components/Drawer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import * as PropTypes from "prop-types";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const drawerWidth = 240;

export default function Dashboard({userInfoURL}) {
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(true);

    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleDashboardBtnClick = () => navigate("/dashboard");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            const response = await performAuthenticatedGetActionAsync(BACKEND_ADDRESS + userInfoURL);

            if (response.tokenExpired) {
                setLoading(false);
                handleLogout();
                alert(response.message);
                return;
            }

            if (response.error) {
                setLoading(false);
                alert(response.message);
                return;
            }

            setUserInfo(response);
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open} drawerwidth={drawerWidth}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit" onClick={handleDashboardBtnClick} title="Home">
                            <DashboardIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleLogout} title="Log Out">
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} drawerwidth={drawerWidth}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <DrawerListItem title="User Info">
                            <DashboardIcon />
                        </DrawerListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="div" gutterBottom>
                                            User Information
                                        </Typography>
                                        <Divider />
                                        <List>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Display Name"
                                                    secondary={userInfo.displayName} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Email"
                                                    secondary={userInfo.email} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Firebase UID"
                                                    secondary={userInfo.firebaseUID} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Roles"
                                                    secondary={userInfo.roles} />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
