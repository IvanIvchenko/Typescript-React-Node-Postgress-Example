import React, { FC } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

interface AppHeaderInputProps{
    onClick: () => void
}

const AppHeader: FC<AppHeaderInputProps> = ({onClick}) => {
    const navigate = useNavigate();
    return (
        <AppBar position="fixed" >
            <Toolbar>
                <Button
                    onClick={onClick}
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