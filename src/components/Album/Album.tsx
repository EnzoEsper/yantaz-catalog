import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Chip } from "@mui/material";
import SimpleDialog from "../SimpleDialog/SimpleDialog";
import logo from "../../assets/images/Recurso 1.svg";
import Copyright from "../Copyright/Copyright";

const emails = ["username@gmail.com", "user02@gmail.com"];

const getModelFromDescription = (description: string) => {
  let arDesc = description.split("-");
  const model = arDesc[0].trim();

  return model;
};

const getGenreFromDescription = (description: string) => {
  let arDesc = description.split("-");
  const genre = arDesc[1].trim();

  return genre;
};

const getSizesFromDescription = (description: string) => {
  let arDesc = description.split("-");
  const sizes = arDesc[2].trim().split(" ");

  return sizes;
};

const getAlbumHashFromDescription = (description: string) => {
  let arDesc = description.split("-");
  const hash = arDesc[3].trim();

  return hash;
};

const theme = createTheme();

// MAIN COMPONENT
const Album = () => {
  const [images, setImages] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedAlbumHash, setSelectedAlbumHash] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedAlbumHash = (albumHash: string) => {
    setSelectedAlbumHash(albumHash);
  };

  useEffect(() => {
    const getAlbumImages = async () => {
      try {
        const response = await axios.get(
          `https://api.imgur.com/3/album/JP4IPq2/images`,
          {
            headers: {
              Authorization: "Client-ID 0ddd9bb0bc00518",
            },
          }
        );
        setImages(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAlbumImages();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ justifyContent: "center" }}>
          <img src={logo} alt="sneaker" style={{ height: "2.5em" }} />
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        {/* <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box> */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {images.map((image: any) => (
              <Grid item key={image.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={
                      {
                        // 16:9
                        // pt: '56.25%',
                      }
                    }
                    image={image.link}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {getModelFromDescription(image.description)}
                    </Typography>
                    {
                      <Chip
                        label={getGenreFromDescription(image.description)}
                        variant="outlined"
                        size="small"
                        style={{ marginRight: "0.3em", marginTop: "0.2em" }}
                      />
                    }
                    {getSizesFromDescription(image.description).map((size) => (
                      <Chip
                        key={size}
                        label={size}
                        size="small"
                        style={{ marginRight: "0.3em", marginTop: "0.2em" }}
                      />
                    ))}
                    {/* <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography> */}
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      onClick={() => {
                        handleSelectedAlbumHash(
                          getAlbumHashFromDescription(image.description)
                        );
                        handleClickOpen();
                      }}
                    >
                      VER MAS
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <SimpleDialog
            albumHash={selectedAlbumHash}
            open={open}
            onClose={handleClose}
          />
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        {/* <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography> */}
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
};

export default Album;
