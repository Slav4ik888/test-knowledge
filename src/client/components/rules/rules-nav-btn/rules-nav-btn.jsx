import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pt from 'prop-types';
import cl from 'classnames';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import DescriptionIcon from '@material-ui/icons/Description';
// Components
import route from '../../../utils/routes';
import RulesContainer from '../rules-container/rules-container';


const useStyles = makeStyles((theme) => ({
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


const RulesNavBtn = ({ open, onDrawerOpen, onDrawerClose }) => {
  const classes = useStyles();

  const [isRules, setIsRules] = useState(false);
  const handleRulesOpen = () => setIsRules(true);
  const handleRulesClose = () => setIsRules(false);

  return (
    <>
      <ListItem button onClick={onDrawerOpen} className={classes.button}>
        <ListItemIcon><DescriptionIcon /></ListItemIcon>
        <ListItemText primary="ПРАВИЛА" />
      </ListItem>

      {
        open &&
          <>
            <Link to={route.CREATE_RULE} onClick={onDrawerClose} >
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

      {/* <RulesContainer
        open={isRules}
        onClose={handleRulesClose}
      /> */}
    </>
  )
};

RulesNavBtn.propTypes = {
  open: pt.bool.isRequired,
  onDrawerOpen: pt.func.isRequired,
  onDrawerClose: pt.func.isRequired,
};

export default RulesNavBtn;