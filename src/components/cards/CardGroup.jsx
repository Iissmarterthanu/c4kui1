import { Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import image2 from "../../assets/1b.jpg";

export default function CardGroup({group}) {

  let history = useHistory();

  const handleOnClick = (event => {
    const path = "/shop/" + event.target.alt;
    // console.log(path);
    history.push(path);
  })
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleOnClick}>
        <CardMedia
          component="img"
          height="140"
          image={image2}
          alt={group.id}
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="div">
            {group.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}