import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header = ({ profile, handleDrawerOpen, open }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const history = useHistory();

  const onClickLogout = () => {
    if (window.confirm("Do you really want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      history.push("/");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Toolbar>
            <IconButton
              color='default'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Link className={styles.logo} to='/'>
              <div>
                <span>Til</span>earn
              </div>
            </Link>
          </Toolbar>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/profile'>
                  <Button variant='outlined'>{profile?.email}</Button>
                </Link>
                <Link to={"/add-post"}>
                  <Button variant='contained'>Write an article</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant='contained'
                  color='error'
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Login</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Create an account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
