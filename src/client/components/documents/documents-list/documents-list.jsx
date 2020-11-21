import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import List from '@material-ui/core/List';
// Component
import DocumentItem from '../document-item/document-item';


const DocumentsList = ({ documents, onEdit, onDel }) => {

  if (!documents) {
    return null;
  }

  return (
    <>
      <List height={200}>
        {documents.map((doc) => <DocumentItem key={doc.id}
            title={doc.title}
            id={doc.id}
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
