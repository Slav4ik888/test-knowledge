import React, { useState } from 'react';
import pt from 'prop-types';
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


const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
}));


const DocumentsNavBtn = () => {
  const classes = useStyles();
  const [isDocuments, setIsDocuments] = useState(false);
  const handleDocumentsOpen = () => setIsDocuments(true);
  const handleDocumentsClose = () => setIsDocuments(false);


  return (
    <>
      <ListItem button onClick={handleDocumentsOpen} className={classes.button}>
        <ListItemIcon><FolderIcon /></ListItemIcon>
        <ListItemText primary="ДОКУМЕНТЫ" />
      </ListItem>
        
      <DocumentsContainer
        open={isDocuments}
        onClose={handleDocumentsClose}
      />
    </>
  )
};

DocumentsNavBtn.propTypes = {
};

export default DocumentsNavBtn;