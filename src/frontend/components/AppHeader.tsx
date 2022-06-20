import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function AppHeader() {
    const navigate = useNavigate();
    return (
        <AppBar position="fixed" >
            <Toolbar>
                <Button
                    onClick={() => navigate('/')}
                    style={{ textTransform: 'none' }}
                    color="inherit">
                    <Typography
                        variant="h4"
                    >
                        Superheroes
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader