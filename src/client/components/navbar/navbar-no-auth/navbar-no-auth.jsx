import React from 'react';
// MUI Stuff
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// Icons
import MenuIcon from '@material-ui/icons/Menu';
// Components
import Entrance from '../../entrance/entrance';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const NavbarNoAuth = () => {
  const classes = useStyles();

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
      >
        <MenuIcon />
      </IconButton>
      <Typography className={classes.title} variant="h6" noWrap>
        Team-Knowledge - тестирование сотрудников на знание обязанностей
      </Typography>
      <div className={classes.grow} />
      <Entrance />
      
    </>
  );
};

export default NavbarNoAuth;
