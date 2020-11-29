import React from 'react';
import cl from 'classnames';
import pt from 'prop-types';
import { Link } from 'react-router-dom';
// MUI Stuff
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import {drawerWidth} from '../../../utils/consts';
import route from '../../../utils/routes';
import DocumentsNavBtn from '../../documents/documents-nav-btn/documents-nav-btn';
import PositionsNavBtn from '../../positions/positions-nav-btn/positions-nav-btn';
import UsersNavBtn from '../../users/users-nav-btn/users-nav-btn';


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
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  subButton: {
    fontStyle: `italic`,
    color: `#666666`,
    paddingLeft: theme.spacing(9),
    height: 30,
  },
  lastSubButton: {
    marginBottom: theme.spacing(1),
  },
}));

const MiniDrawer = ({ onClose, open }) => {
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
        <ListItem button className={classes.button}>
          <ListItemIcon><QueryBuilderIcon /></ListItemIcon>
          <ListItemText primary="ТЕСТИРОВАНИЕ" />
        </ListItem>
        {
          open && <>
            <ListItem button className={classes.subButton}>
              <ListItemText primary="Создать" />
            </ListItem>
            <ListItem button className={classes.subButton}>
              <ListItemText primary="Редактировать" />
            </ListItem>
            <ListItem button className={cl(classes.subButton, classes.lastSubButton)}>
              <ListItemText primary="Запустить" />
            </ListItem>
            <Divider />
          </>
        }

        <ListItem button className={classes.button}>
          <ListItemIcon><DescriptionIcon /></ListItemIcon>
          <ListItemText primary="ПРАВИЛА" />
        </ListItem>

        {
          open &&
            <>
              <Link to={route.CREATE_RULE} >
                <ListItem button className={classes.subButton}>
                  <ListItemText primary="Создать" />
                </ListItem>
              </Link>
            
              <ListItem button className={cl(classes.subButton, classes.lastSubButton)}>
                <ListItemText primary="Редактировать" />
              </ListItem>
            
              <Divider />
            </>
        }

        <DocumentsNavBtn />
        <PositionsNavBtn />
        <UsersNavBtn />
        
        
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
  onClose: pt.func.isRequired,
};

export default MiniDrawer;
