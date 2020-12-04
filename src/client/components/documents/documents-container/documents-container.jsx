import React, {useState, useRef, useEffect} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { createDocument, updateDocument, deleteDocument } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Component
import DocumentsList from '../documents-list/documents-list';
import DocumentAdd from '../document-add/document-add';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
// import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  iconButton: {
    padding: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const DocumentsContainer = ({ open, onClose, UI, documents, createDocument, updateDocument, deleteDocument }) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const { loading } = UI;
  
  // const [isChange, setIsChange] = useState(false);

  const handleEditDoc = (id, newTitle) => {
    const idx = documents.findIndex((doc) => doc.id === id);
    let newDocument = documents[idx];
    newDocument.title = newTitle;
    updateDocument(newDocument);
  };

  const handleDelDoc = (id) => {
    const idx = documents.findIndex((doc) => doc.id === id);
    let newDocument = documents[idx];
    deleteDocument(newDocument);
  };

  const handleAddDoc = (title) => {
    if (title.trim()) {
      const newDocument = {
        title,
        positions: [],
        sections: [],
      }
      createDocument(newDocument);
    }
  };

  const handleClose = () => onClose();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsChange(true);
  //   updateDocumentsServer(documents);
  //   handleClose();
  // };

  const listRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: listElement } = listRef;
      if (listElement !== null) {
        listElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Настройка документов</DialogTitle>
        <DialogContent dividers ref={listRef} >
          <DocumentsList
            open={open}
            documents={documents}
            onEdit={handleEditDoc}
            onDel={handleDelDoc}
          />
        </DialogContent>

        <DocumentAdd onAdd={handleAddDoc} UI={UI} />

        <DialogActions className={classes.dialog}>
          {/* <CancelSubmitBtn
            onCancel={handleClose}
            onSubmit={handleSubmit}
            disabled={loading || !isChange}
            loading={loading}
          /> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

DocumentsContainer.propTypes = {
  createDocument: pt.func.isRequired,
  updateDocument: pt.func.isRequired,
  deleteDocument: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  documents: state.data.documents,
});

const mapActionsToProps = {
  createDocument,
  updateDocument,
  deleteDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(DocumentsContainer);
