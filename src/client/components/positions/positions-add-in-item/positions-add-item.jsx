import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocumentsServer } from '../../../redux/actions/data-actions';
import { updateUserDetails } from '../../../redux/actions/user-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import ToggleItems from '../../toggle-items/toggle-items';
import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import { typePosModule } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
}));


const PositionsAddInItem = ({ open, type, onClose, UI: { loading }, item,
  documents, positions, updateDocumentsServer, updateUserDetails }) => {
  
  if (!open) return null;

  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const title = type === typePosModule.DOC ?
    `Выберите те должности, которым нужно полностью знать этот документ` :
    `Выберите должности, которые занимает данный сотрудник`;
  
  const positionsInItem = item.positions; // Те должности которые есть в item
  
  const remainingPositions = positions // Не использованные positions
    .filter((pos) => Boolean(positionsInItem
      .find((posInItem) => posInItem.id === pos.id)) === false);

  const [selected, setSelected] = useState(positionsInItem);
  const handleSelected = (newSelected) => {
    setSelected(newSelected);
    setIsChange(true); // Произошло изменение
  };

  const handleSetPosToDoc = () => {
    switch (type) {
      case typePosModule.DOC:
        console.log(1);
        // Индекс документа doc в documents
        const idxDoc = documents.findIndex(document => document.id === item.id);
        let newDocuments = documents;
        newDocuments[idxDoc].positions = selected;
        updateDocumentsServer(newDocuments);
        break;
      
      case typePosModule.USER:
        console.log(2);
        let newUserDetails = item;
        newUserDetails.positions = selected;
        updateUserDetails(newUserDetails);
        break;
    };
    onClose();
  };

  
  return (
    <Dialog
      disableBackdropClick fullWidth
      className={classes.dialog} maxWidth="md" scroll={`paper`}
      open={open} onClose={onClose}
    >
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      <DialogContent dividers>
        
        <ToggleItems
          elemsLeft={positionsInItem}
          elemsRight={remainingPositions}
          whatSelected={`должности`}
          onSelected={handleSelected}
        />

      </DialogContent>
      <DialogActions className={classes.dialog}>
        <CancelSubmitBtn
          onCancel={onClose}
          onSubmit={handleSetPosToDoc}
          disabled={loading || !isChange}
          loading={loading}
        />
      </DialogActions>

    </Dialog>
  );
};

PositionsAddInItem.propTypes = {
  doc: pt.object,
  documents: pt.array.isRequired,
  positions: pt.array.isRequired,
  updateDocumentsServer: pt.func.isRequired, 
  updateUserDetails: pt.func.isRequired, 
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  documents: state.data.documents,
  positions: state.data.positions,
});

const mapActionsToProps = {
  updateDocumentsServer,
  updateUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(PositionsAddInItem);
