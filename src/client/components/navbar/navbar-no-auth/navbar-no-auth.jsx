import React from 'react';
import {Link} from 'react-router-dom';
import route from '../../../utils/routes';
// MUI Stuff
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// Icons
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

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
      <Button
        component={Link}
        to={route.LOGIN}
        endIcon={<AccountCircle />}
      >
        Войти
      </Button>
      
    </>
  );
};

export default NavbarNoAuth;
