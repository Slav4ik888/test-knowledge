import React, {useRef, useEffect} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { createDocument, updateDocument, deleteDocument } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DocumentsList from '../documents-list/documents-list';
import ElementAdd from '../../buttons/element-add/element-add';
// import Snackbar from '../../dialogs/snackbar/snackbar';
import { typeElem } from '../../../../types';


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
}));

// Настройка документов: создать, изменить название, удалить 
// TODO: изменить порядок - переместить выше/ниже, создать каталоги
const DocumentsContainer = ({ open, onClose, errors, documents, createDocument, updateDocument, deleteDocument }) => {
  if (!open) return null;

  const classes = useStyles();

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
        <DialogContent dividers ref={listRef} className={classes.container} >
          <DocumentsList
            open={open}
            documents={documents}
            onEdit={handleEditDoc}
            onDel={handleDelDoc}
          />
        </DialogContent>

        <ElementAdd type={typeElem.DOC} onAdd={handleAddDoc} />

        {/* <Snackbar errors={errors} /> */}

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
  errors: pt.object.isRequired,
  documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  documents: state.data.documents,
});

const mapActionsToProps = {
  createDocument,
  updateDocument,
  deleteDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(DocumentsContainer);
