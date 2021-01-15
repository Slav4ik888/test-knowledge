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
import FolderIcon from '@material-ui/icons/Folder';
// Components
import DocumentsContainer from '../documents-container/documents-container';
import route from '../../../utils/routes';


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


const DocumentsNavBtn = ({ open, onDrawerOpen, onDrawerClose }) => {
  const classes = useStyles();

  const [isDocuments, setIsDocuments] = useState(false);
  const handleDocumentsOpen = () => setIsDocuments(true);
  const handleDocumentsClose = () => setIsDocuments(false);


  return (
    <>
      <ListItem button onClick={onDrawerOpen} className={classes.button}>
        <ListItemIcon><FolderIcon /></ListItemIcon>
        <ListItemText primary="ДОКУМЕНТЫ" />
      </ListItem>
        
      {
        open &&
          <>
            <ListItem button onClick={handleDocumentsOpen} className={classes.subButton}>
              <ListItemText primary="Создать" />
            </ListItem>
          
            <Link to={route.CREATE_RULE} onClick={onDrawerClose} >
              <ListItem button className={cl(classes.subButton, classes.lastSubButton)}>
                <ListItemText primary="Редактировать" />
              </ListItem>
            </Link>
            <Divider />
          </>
      }

      <DocumentsContainer
        open={isDocuments}
        onClose={handleDocumentsClose}
      />
    </>
  )
};

DocumentsNavBtn.propTypes = {
  open: pt.bool.isRequired,
  onDrawerOpen: pt.func.isRequired,
  onDrawerClose: pt.func.isRequired,
};

export default DocumentsNavBtn;