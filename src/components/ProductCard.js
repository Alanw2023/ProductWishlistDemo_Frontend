import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Button, CardActionArea, CardActions} from '@mui/material';
import {Link} from "react-router-dom";

export default function ProductCard({course: {id, title, description, thumbnailURL}}) {
    return (
        <Card sx={{ width: "240px", height: "320px"}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={thumbnailURL}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" noWrap>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"
                                sx={{
                                    height: '60px',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button component={Link} to={`/course/${id}`}
                        size="small" color="primary">
                        View Course
                </Button>
            </CardActions>
        </Card>
    );
}
