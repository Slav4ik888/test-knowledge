import React, {useState} from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Redux Stuff
// import { connect } from 'react-redux';
// import { getPositions } from '../../../redux/actions/data-actions';
// MUI Stuff
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
// Icons
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
// Components
import MyButton from '../../buttons/button-icon/button-icon';
import ProfilesMenu from '../../profiles/profiles-menu/profiles-menu';
import UsersMenu from '../../users/users-menu/users-menu';
import PositionsContainer from '../../positions/positions-container/positions-container';
import DocumentsContainer from '../../documents/documents-container/documents-container';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionButtons: {

  },
  sectionUserBlock: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const NavbarAuth = ({ open, onOpen }) => {
  const classes = useStyles();

  const [anchorPro, setAnchorPro] = useState(null);
  const isProfilesOpen = Boolean(anchorPro);
  const profilesMenuId = `profile-menu`;
  const handleProfilesMenuOpen = (event) => setAnchorPro(event.currentTarget);
  const handleProfilesMenuClose = () => setAnchorPro(null);
  
  const [anchorUsr, setAnchorUsr] = useState(null);
  const isUsers = Boolean(anchorUsr);
  const usersMenuId = `users-menu`
  const handleUserMenuOpen = (event) => setAnchorUsr(event.currentTarget);
  const handleUserMenuClose = () => setAnchorUsr(null);

  const [isPositions, setIsPositions] = useState(false);
  const handlePositionsOpen = () => setIsPositions(true);
  const handlePositionsClose = () => setIsPositions(false);

  const [isDocuments, setIsDocuments] = useState(false);
  const handleDocumentsOpen = () => setIsDocuments(true);
  const handleDocumentsClose = () => setIsDocuments(false);
  

  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     id="account-menu"
  //     keepMounted
  //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //     open={isProfileOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>
  //       <AccountCircle />
  //       <p>My account</p>
  //     </MenuItem>
  //   </Menu>
  // );


  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onOpen}
        edge="start"
        className={cl(classes.menuButton, { [classes.hide]: open })}
      >
        <MenuIcon />
      </IconButton>

      <Typography className={classes.title} variant="h6" noWrap>
        T-Knowledge
      </Typography>

      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>

      <Button onClick={handleUserMenuOpen} >
        Сотрудники
      </Button>
      <Button onClick={handlePositionsOpen} >
        Должности
      </Button>
      <Button onClick={handleDocumentsOpen} >
        Документы
      </Button>
      
      <div className={classes.grow} />

      <div className={classes.sectionUserBlock}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={profilesMenuId}
          aria-haspopup="true"
          onClick={handleProfilesMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>

      <ProfilesMenu
        open={isProfilesOpen}
        onClose={handleProfilesMenuClose}
        profilesMenuId={profilesMenuId}
        anchorEl={anchorPro}
      />
      <UsersMenu
        open={isUsers}
        onClose={handleUserMenuClose}
        usersMenuId={usersMenuId}
        anchorEl={anchorUsr}
      />
      <PositionsContainer
        open={isPositions}
        onClose={handlePositionsClose}
      />
      <DocumentsContainer
        open={isDocuments}
        onClose={handleDocumentsClose}
      />
      
      {/* {renderMenu} */}
    </>
  );
};

NavbarAuth.propTypes = {
  open: pt.bool.isRequired,
  onOpen: pt.func.isRequired,
};
// const mapStateToProps = (state) => ({
//   positions: state.data.positions,
// });

// export default connect(mapStateToProps, { getPositions })(NavbarAuth);
export default NavbarAuth;