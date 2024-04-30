import './index.css';
import React from 'react';
import {Link} from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

function App() {
    return (
        <div className="App d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <img src="company-logo.png" style={{width: "200px"}} alt="Company Logo" className="mb-4" />
                <div className="mb-5">
                    <h3>Product Wishlist Demo</h3>
                </div>
                <div>
                    <Button
                        component={Link}
                        to="/login"
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{mb: 2}}
                    >
                        Login
                    </Button>
                    <Button
                        component={Link}
                        to="/signup"
                        type="button"
                        fullWidth
                        variant="outlined"
                    >
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default App;
