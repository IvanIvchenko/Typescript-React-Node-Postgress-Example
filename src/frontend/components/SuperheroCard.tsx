import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import React, { FC, MouseEventHandler } from 'react';
import { SuperheroShort } from '../utils/interfaces';

interface SuperheroCardInputProps{
    superhero: SuperheroShort,
    onClick: (id: number)=> void
}

const SuperheroCard: FC<SuperheroCardInputProps> = ({ superhero, onClick, ...rest }) => {

    return (
        <Card sx={{ width: 500, m: 2 }} key={superhero.id}>
            <CardActionArea id={superhero.id.toString()} onClick={() => onClick(superhero.id)}>
                <CardMedia
                    component="img"
                    height="140"
                    image={superhero.mainImage}
                    alt={superhero.nickname}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        {superhero.nickname}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SuperheroCard