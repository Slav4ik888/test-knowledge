import React from 'react';
import cl from 'classnames';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// Components
import {drawerWidth} from '../../../utils/consts';
import TestsNavBtn from '../../tests/tests-nav-btn/tests-nav-btn';
import RulesNavBtn from '../../rules/rules-nav-btn/rules-nav-btn';
import DocumentsNavBtn from '../../documents/documents-nav-btn/documents-nav-btn';
import PositionsNavBtn from '../../positions/positions-nav-btn/positions-nav-btn';
import EmployeesNavBtn from '../../employees/employees-nav-btn/employees-nav-btn';


const useStyles = makeStyles((theme) => ({
  
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.primary.contrastText,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
    backgroundColor: theme.palette.background .bodyfield,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  // },
  // button: {
  //   marginTop: theme.spacing(1),
  // },
  // subButton: {
  //   fontStyle: `italic`,
  //   color: `#666666`,
  //   paddingLeft: theme.spacing(9),
  //   height: 30,
  // },
  // lastSubButton: {
  //   marginBottom: theme.spacing(1),
  // },
}));

const MiniDrawer = ({ open, onOpen, onClose}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      className={cl(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: cl({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />

      <List>
        <TestsNavBtn open={open} onDrawerOpen={onOpen} onDrawerClose={onClose} />
        <RulesNavBtn open={open} onDrawerOpen={onOpen} onDrawerClose={onClose} />
        <DocumentsNavBtn />
        <PositionsNavBtn />
        <EmployeesNavBtn />
      </List>

      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
};

MiniDrawer.propTypes = {
  open: pt.bool.isRequired,
  onOpen: pt.func.isRequired,
  onClose: pt.func.isRequired,
};

export default MiniDrawer;
