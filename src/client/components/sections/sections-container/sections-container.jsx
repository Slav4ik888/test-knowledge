import React, {useState, useRef, useEffect} from 'react';
import pt from 'prop-types';
import { createId, getMaxOrder } from '../../../../server/utils/utils';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument } from '../../../redux/actions/data-actions';
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
import SectionsList from '../sections-list/sections-list';
import SectionAdd from '../section-add/section-add';
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

const SectionsContainer = ({ open, onClose, UI, document, documents, updateDocuments, updateDocumentsServer }) => {

  if (!open) return null;
  if (!document) return null;
  
  const classes = useStyles();
  const { loading } = UI;
  const [isChange, setIsChange] = useState(false);

  const idxDoc = documents.findIndex(doc => doc.id === document.id);
  const [docEdit, setDocEdit] = useState(documents[idxDoc]);
  const [sections, setSections] = useState(documents[idxDoc].sections);

  const handleEditSection = (id, newTitle) => {
    let newDocument = docEdit;
    const idxSec = newDocument.sections.findIndex((section) => section.id === id);
    newDocument.sections[idxSec].title = newTitle;
    newDocument.sections[idxSec].lastChange = new Date().toISOString();
    newDocument.lastChange = new Date().toISOString();
    setDocEdit(newDocument);
    setSections(newDocument.sections);
    setIsChange(true);

    let newDocuments = documents;
    newDocuments[idxDoc] = newDocument;
    // TODO: updateDocument(newDocument);
  };

  const handleDelSection = (id) => {
    let newDocument = docEdit;
    const idxSec = newDocument.sections.findIndex((section) => section.id === id);
    newDocument.sections = [...newDocument.sections.slice(0, idxSec), ...newDocument.sections.slice(idxSec + 1)];
    newDocument.lastChange = new Date().toISOString();
    setDocEdit(newDocument);
    setSections(newDocument.sections);
    setIsChange(true);
    
    let newDocuments = documents;
    newDocuments[idxDoc] = newDocument;
    // TODO: updateDocuments(newDocuments);
  };

  const handleAddSection = (title) => {
    if (title.trim()) {
      let newDocument = docEdit;
      const newSection = {
        title,
        id: createId(newDocument.sections),
        order: getMaxOrder(newDocument.sections),
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
      };
      newDocument.sections = [newSection, ...newDocument.sections];
      newDocument.lastChange = new Date().toISOString();
      setDocEdit(newDocument);
      setSections(newDocument.sections);
      setIsChange(true);

      let newDocuments = documents;
      newDocuments[idxDoc] = newDocument;
      // TODO: updateDocuments(newDocuments);
    }
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsChange(true);
    // TODO: updateDocumentsServer(documents);
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
        <DialogTitle onClose={handleClose}>Настройка разделов документа</DialogTitle>
        <DialogContent dividers ref={listRef} >
          <SectionsList
            open={open}
            sections={sections}
            onEdit={handleEditSection}
            onDel={handleDelSection}
          />
        </DialogContent>

        <SectionAdd onAdd={handleAddSection} UI={UI} />

        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} >
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !isChange} variant="contained" color="primary">
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

SectionsContainer.propTypes = {
  updateDocument: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  document: pt.object,
  documents: pt.array.isRequired,
  UI: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  documents: state.data.documents,
});

export default connect(mapStateToProps, {updateDocument})(SectionsContainer);
