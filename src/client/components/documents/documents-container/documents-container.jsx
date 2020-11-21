import React, {useState, useRef, useEffect} from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { createId, getMaxOrder } from '../../../utils/utils';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocuments, updateDocumentsServer } from '../../../redux/actions/data-actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
// Component
import DocumentsList from '../documents-list/documents-list';
import DocumentAdd from '../document-add/document-add';


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
  customError: {
    color: `red`,
    fontSize: `0.8rem`,
    marginTop: 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  documentAdd: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  }
}));

const DoumentsContainer = ({ open, onClose, UI: { loading, errors, messages }, documents,
  updateDocuments, updateDocumentsServer }) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  console.log(documents);
  
  const handleEditDoc = (id, newTitle) => {
    let newDocuments = [...documents];
    const idx = documents.findIndex((doc) => doc.id === id);
    newDocuments[idx].title = newTitle;
    updateDocuments(newDocuments);
  };

  const handleDelDoc = (id) => {
    console.log(`handleDelDoc id: `, id);
    const idx = documents.findIndex((doc) => doc.id === id);
    let newDocuments = [...documents.slice(0, idx), ...documents.slice(idx + 1)];
    updateDocumentsServer(newDocuments);
  };

  const handleAddDoc = (title) => {
    if (title.trim()) {
      const newDoc = {
        title,
        id: createId(documents),
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
        disableBackdropClick
        disableEscapeKeyDown
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        scroll={`paper`}
      >
        <DialogTitle>Настройка документов</DialogTitle>
        <DialogContent dividers ref={listRef} >
            <DocumentsList
              open={open}
              documents={documents}
              onEdit={handleEditDoc}
              onDel={handleDelDoc}
            />
        </DialogContent>

        <div className={classes.documentAdd}>
          <DocumentAdd onAdd={handleAddDoc} />

          {
            errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )
          }

        </div>

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
