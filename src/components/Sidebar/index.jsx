import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import { Chip } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { Header } from "../Header";
import { Switch, Route, Link, useParams, Redirect } from "react-router-dom";
import LessonPage from "../../pages/lesson";
import LessonsPage from "../../pages/lessons";
import { lessonDb } from "../../db";
import { Container, ListItemText, Tooltip, Typography } from "@mui/material";
import {
  Home,
  Registration,
  Login,
  ProfileCard,
  Words,
  WordsPage,
  WordPage,
  FullPost,
  AddPost,
  PageNotFound,
} from "../../pages";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { words } from "../../db/words/words";

function LessonsPageRouter() {
  const { where } = lessonDb;
  return <LessonsPage lessons={where()} />;
}

function LessonPageRouter() {
  const { find } = lessonDb;
  const { id } = useParams();
  const lesson = find(id);
  return <LessonPage lesson={lesson} />;
}

function WordPageRouter() {
  const { id } = useParams();
  return <WordPage words={words.filter((el) => el.id === id)} />;
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export function Sidebar({ profile }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isAuth = useSelector(selectIsAuth);

  console.log(window.location.pathname);

  if (window.location.pathname === "/lessons" && !isAuth) {
    return <Redirect to='/' />;
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Header
          profile={profile}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
        />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <Link
              style={{ color: "#000", textDecoration: "none", width: "100%" }}
              to={"/words"}
            >
              <ListItemButton>
                <ListItemText primary={"Words"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              style={{ color: "#000", textDecoration: "none", width: "100%" }}
              to={"/grammar"}
            >
              <ListItemButton>
                <ListItemText primary={"Grammar"} />
                <Chip label='Soon' />
              </ListItemButton>
            </Link>
          </ListItem>
          {isAuth ? (
            <ListItem disablePadding>
              <Link
                style={{ color: "#000", textDecoration: "none", width: "100%" }}
                to={"/lessons"}
              >
                <ListItemButton>
                  <ListItemText primary={"Lessons"} />
                </ListItemButton>
              </Link>
            </ListItem>
          ) : (
            <ListItem disablePadding>
              <Tooltip title='You need to create an account!'>
                <ListItemButton>
                  <ListItemText
                    primary={
                      <Typography
                        variant='body2'
                        style={{
                          color: "#8f8f8f",
                          textDecoration: "line-through",
                        }}
                      >
                        Lessons
                      </Typography>
                    }
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          )}
        </List>
      </Drawer>
      <Main
        style={{
          height: "calc(100vh - 70px)",
          marginTop: "70px",
          paddingBottom: "30px",
          boxSizing: "border-box",
        }}
        open={open}
      >
        <Container style={{ paddingBottom: "30px" }} maxWidth='lg'>
          <Switch>
            <Route path='/lessons/:id'>
              <LessonPageRouter />
            </Route>
            <Route path='/words/:id'>
              <WordPageRouter />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Registration />
            </Route>
            <Route path='/profile'>
              <ProfileCard profile={profile} />
            </Route>
            <Route path='/posts/:id'>
              <FullPost />
            </Route>
            {/* <Route path='/posts/:id/edit'>
              <AddPost />
            </Route> */}
            <Route path='/add-post'>
              <AddPost />
            </Route>
            <Route path='/grammar'>
              <PageNotFound />
            </Route>
            <Route exact path='/words'>
              <WordsPage words={words} />
            </Route>
            <Route exact path='/lessons'>
              <LessonsPageRouter />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Container>
      </Main>
    </Box>
  );
}
