import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// Icons
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
// Components
import TestsContainerExecute from '../tests-container-execute/tests-container-execute';


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


const TestsNavBtn = ({ open, onDrawerOpen, onDrawerClose }) => {
  const classes = useStyles();

  const [isTests, setIsTests] = useState(false);
  const handleTestsOpen = () => {
    setIsTests(true);
    onDrawerClose();
  };
  const handleTestsClose = () => setIsTests(false);

  return (
    <>
      <ListItem button onClick={onDrawerOpen} className={classes.button}>
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
          <ListItem button onClick={handleTestsOpen} className={cl(classes.subButton, classes.lastSubButton)}>
            <ListItemText primary="Запустить" />
          </ListItem>
          <Divider />
        </>
      }

      <TestsContainerExecute
        open={isTests}
        onClose={handleTestsClose}
      />
    </>
  )
};

TestsNavBtn.propTypes = {
  open: pt.bool.isRequired,
  onDrawerOpen: pt.func.isRequired,
};

export default TestsNavBtn;