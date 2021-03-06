import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
// Component
import DocumentItem from '../document-item/document-item';

const useStyles = makeStyles((theme) => ({
  list: {
    width: `100%`,
  },
}));

const DocumentsList = ({ documents, onEdit, onDel }) => {
  
  if (!documents) {
    return null;
  }

  const classes = useStyles();

  return (
    <>
      <List height={200} className={classes.list}>
        {documents.map((doc) => <DocumentItem key={doc.id}
            doc={doc}
            onEdit={onEdit}
            onDel={onDel}
          />)
        }
      </List> 
    </>
  );
}

DocumentsList.propTypes = {
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
  documents: pt.array.isRequired,
};

export default DocumentsList;
