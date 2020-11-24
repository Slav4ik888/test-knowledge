import React, {useState, useRef, useEffect} from 'react';
import pt from 'prop-types';
import { createId, getMaxOrder } from '../../../utils/utils';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocuments, updateDocumentsServer } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
// Component
import DocumentsList from '../documents-list/documents-list';
import DocumentAdd from '../document-add/document-add';
import DialogTitle from '../../dialogs/dialog-title/dialog-title';


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

const DoumentsContainer = ({ open, onClose, UI, documents, updateDocuments, updateDocumentsServer }) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  const { loading } = UI;
  
  const handleEditDoc = (id, newTitle) => {
    let newDocuments = [...documents];
    const idx = documents.findIndex((doc) => doc.id === id);
    newDocuments[idx].title = newTitle;
    newDocuments[idx].lastChange = new Date().toISOString();
    updateDocuments(newDocuments);
  };

  const handleDelDoc = (id) => {
    const idx = documents.findIndex((doc) => doc.id === id);
    let newDocuments = [...documents.slice(0, idx), ...documents.slice(idx + 1)];
    updateDocuments(newDocuments);
  };

  const handleAddDoc = (title) => {
    if (title.trim()) {
      const newDoc = {
        title,
        id: createId(documents),
        order: getMaxOrder(documents),
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
        positions: [],
        sections: [],
      }
      let newDocuments = [newDoc, ...documents];
      updateDocuments(newDocuments);
    }
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDocumentsServer(documents);
  };

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
          <Button onClick={handleClose} >
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading} variant="contained" color="primary">
            Сохранить
            {
              loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )
            }
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DoumentsContainer.propTypes = {
  updateDocuments: pt.func.isRequired,
  updateDocumentsServer: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  documents: state.data.documents,
});

export default connect(mapStateToProps, {updateDocuments, updateDocumentsServer})(DoumentsContainer);
