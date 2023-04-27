import React from "react";
import { Lesson } from "../db/types";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

type Props = {
  lessons: Lesson[];
};

function LessonsPage(props: Props): JSX.Element {
  const { lessons } = props;
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {lessons.map<JSX.Element>(({ id, title, text, points, color }) => {
        return (
          <Grid key={id} item>
            <Card sx={{ maxWidth: 345 }}>
              <div
                style={{
                  height: "70px",
                  background: color,
                  padding: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Chip label={`+${points}XP`} />
              </div>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  <Link
                    style={{
                      color: "#000",
                      textDecoration: "none",
                    }}
                    to={`/lessons/${id}`}
                  >
                    {title}
                  </Link>
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default LessonsPage;
