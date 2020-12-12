import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updatePosition, updateEmployee } from '../../../redux/actions/data-actions';
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
import { getPositionsByDocId, getPositionsByUser } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
}));

const PositionsAddInItem = ({ open, type, onClose, UI: { loading }, item, positions, updatePosition, updateEmployee }) => {
  if (!open) return null;

  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  let title = ``;
  let positionsInItem = []; // Должности закреплённые за item
  
  switch (type) {
    case typePosModule.DOC:
      title = `Выберите те должности, которым нужно полностью знать этот документ`;
      positionsInItem = getPositionsByDocId(item.id, positions);
      break;
    
    case typePosModule.EMPLOYEE:
      title = `Выберите должности, которые занимает данный сотрудник`;
      positionsInItem = getPositionsByUser(item.positions, positions);
      console.log('USER positionsInItem: ', positionsInItem);
      break;
    
    default: break;
  };
  
  
  // Не использованные positions
  const remainingPositions = positions 
    .filter((pos) => Boolean(positionsInItem
      .find((posInItem) => posInItem.id === pos.id)) === false);

  const [selected, setSelected] = useState(positionsInItem);
  const handleSelected = (newSelected) => {
    setSelected(newSelected);
    setIsChange(true); // Произошло изменение
  };

  
  // Сохраняем обновлённые данные
  const handleSetPosToItem = () => {
     

    switch (type) {
      case typePosModule.DOC:
        // Проверяем открепили ли должность от документа
        positionsInItem.forEach((pos) => {
          const resOut = selected.find((selPos) => pos.id === selPos.id);
          if (!resOut) { // Открепили
            const resOutDoc = pos.documents.findIndex((docId) => docId === item.id);
            if (resOutDoc !== -1) {
              let updateDocList = [...pos.documents.slice(0, resOutDoc), ...pos.documents.slice(resOutDoc + 1)];
              pos.documents = updateDocList;
              console.log('Открепили: ', pos);
              updatePosition(pos);
            }
          }
        });

        // Проверяем закрепили ли должность за документом
        selected.forEach((pos) => {
          const resIn = positionsInItem.find((selPos) => pos.id === selPos.id);
          if (!resIn) { // Добавили
            pos.documents.push(item.id);
            console.log('Добавили: ', pos);
            updatePosition(pos);
          }
        });
        break;
      
      case typePosModule.EMPLOYEE:
        let newUserDetails = Object.assign({}, item);
        newUserDetails.positions = selected.map((sel) => sel.id);
        updateEmployee(newUserDetails);
        
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
  positions: pt.array.isRequired,
  updatePosition: pt.func.isRequired, 
  updateEmployee: pt.func.isRequired, 
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  positions: state.data.positions,
});

const mapActionsToProps = {
  updatePosition,
  updateEmployee
};

export default connect(mapStateToProps, mapActionsToProps)(PositionsAddInItem);
