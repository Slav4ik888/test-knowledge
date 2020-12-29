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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DocumentsList from '../documents-list/documents-list';
import ElementAdd from '../../buttons/element-add/element-add';
import { typeElem } from '../../../../types';
// import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    backgroundColor: theme.palette.background.bodyfield,
  },
  snack: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
  },
}));

const DocumentsContainer = ({ open, onClose, UI, documents, createDocument, updateDocument, deleteDocument }) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const { loading, errors } = UI;
  
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

  const handleAddDoc = ({ title }) => {
    if (title.trim()) {
      const newDocument = {
        title,
        positions: [],
        sections: [],
      };
      const firstSection = {
        title: ``,
        id: `1`,
        order: 100,
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
      };
      newDocument.sections.push(firstSection);
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

  const [isSnack, setIsSnack] = useState(false);
  useEffect(() => {
    if (errors.general) {
      setIsSnack(true); 
    }
  }, [errors.general]);
  const handleCloseSnackBar = () => setIsSnack(false); 

  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Настройка документов</DialogTitle>
        <DialogContent dividers ref={listRef} className={classes.container} >
          <DocumentsList
            open={open}
            documents={documents}
            onEdit={handleEditDoc}
            onDel={handleDelDoc}
          />
        </DialogContent>

        <ElementAdd type={typeElem.DOC} onAdd={handleAddDoc} />

        <Snackbar open={isSnack} autoHideDuration={6000} onClose={handleCloseSnackBar} >
          <Alert onClose={handleCloseSnackBar} severity="warning" className={classes.snack}>
            {errors.general}
          </Alert>
        </Snackbar>

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
