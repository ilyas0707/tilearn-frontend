import React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";

export function WordsPage(props) {
  const { words } = props;
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {words.map(({ id, title, wordsMap }) => {
        return (
          <Grid key={id} item xs={4}>
            <Card
              style={{ borderBottom: "3px solid #ce3f3f" }}
              sx={{ maxWidth: 345 }}
            >
              <CardContent>
                <Typography
                  style={{ margin: "0" }}
                  gutterBottom
                  variant='h5'
                  component='div'
                >
                  <Link
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      display: "inline-block",
                      marginBottom: "10px",
                    }}
                    to={`/words/${id}`}
                  >
                    {title}
                  </Link>
                  <br />
                  <Chip label={`Total of ${wordsMap.size} terms.`} />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
