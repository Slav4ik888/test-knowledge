import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument} from '../../../redux/actions/data-actions';
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
import { getPositionsFromDocPosId } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
}));


const PositionsAddInItem = ({ open, type, onClose, UI: { loading }, item,
  documents, positions, updateDocument, updateUserDetails }) => {
  
  if (!open) return null;

  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  const title = type === typePosModule.DOC ?
    `Выберите те должности, которым нужно полностью знать этот документ` :
    `Выберите должности, которые занимает данный сотрудник`;
  
  const positionsInItem = getPositionsFromDocPosId(item.positions, positions); // Те должности которые есть в item
  
  const remainingPositions = positions // Не использованные positions
    .filter((pos) => Boolean(positionsInItem
      .find((posInItem) => posInItem.id === pos.id)) === false);

  const [selected, setSelected] = useState(positionsInItem);
  const handleSelected = (newSelected) => {
    setSelected(newSelected);
    setIsChange(true); // Произошло изменение
  };

  const handleSetPosToItem = () => {
    switch (type) {
      case typePosModule.DOC:
        let doc = item;
        doc.positions = selected.map(pos => pos.id);
        console.log('doc.positions: ', doc.positions);
        updateDocument(doc);
        break;
      
      case typePosModule.USER:
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
          onSubmit={handleSetPosToItem}
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
  updateDocument: pt.func.isRequired, 
  updateUserDetails: pt.func.isRequired, 
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  documents: state.data.documents,
  positions: state.data.positions,
});

const mapActionsToProps = {
  updateDocument,
  updateUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(PositionsAddInItem);
