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
import { typeElem } from '../../../../types';
import { getPositionsByDocId, getPositionsByRuleId, getPositionsByUser } from '../../../utils/utils';


// Проверяет какие изменения произошли (открепили или прикрепили) и запускает ф-ю обновления
const updateChangesInPositions = (positionsInItem, selected, field, item, updateFunc) => {
  // Проверяем открепили ли должность от документа || правила
  positionsInItem.forEach((pos) => {
    const result = selected.find((selPos) => pos.id === selPos.id);
    if (!result) { // Открепили
      const idx = pos[field].findIndex((docId) => docId === item.id);
      if (idx !== -1) {
        pos[field] = [...pos[field].slice(0, idx), ...pos[field].slice(idx + 1)];
        updateFunc(pos);
      }
    }
  });

  // Проверяем закрепили ли должность за документом || правилом
  selected.forEach((pos) => {
    const result = positionsInItem.find((selPos) => pos.id === selPos.id);
    if (!result) { // Добавили
      pos[field].push(item.id);
      updateFunc(pos);
    }
  });
};


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
}));

const PositionsAddInItem = ({ open, type, onClose, loading, item, positions, updatePosition, updateEmployee }) => {
  if (!open) return null;

  const classes = useStyles();
  const [isChange, setIsChange] = useState(false);

  let title = ``;
  let positionsInItem = []; // Должности закреплённые за item
  
  switch (type) {
    case typeElem.DOC:
      title = `Выберите те должности, которым нужно полностью знать этот документ`;
      positionsInItem = getPositionsByDocId(item.id, positions);
      break;
    
    case typeElem.RULE:
      title = `Выберите те должности, которым нужно знать это правило`;
      positionsInItem = getPositionsByRuleId(item.id, positions);
      break;
    
    case typeElem.EMPLOYEE:
      title = `Выберите должности, которые занимает данный сотрудник`;
      positionsInItem = getPositionsByUser(item.positions, positions);
      console.log('USER positionsInItem: ', positionsInItem);
      break;
    
    default: break;
  };
  
  
  // Не использованные positions
  const remainingPositions = positions 
    .filter((pos) => Boolean(positionsInItem.find((posInItem) => posInItem.id === pos.id)) === false);

  const [selected, setSelected] = useState(positionsInItem);
  const handleSelected = (newSelected) => {
    setSelected(newSelected);
    setIsChange(true); // Произошло изменение
  };

  
  // Сохраняем обновлённые данные
  const handleSetPosToItem = () => {
     
    switch (type) {
      case typeElem.DOC:
        updateChangesInPositions(positionsInItem, selected, `documents`, item, updatePosition);
        break;
      
      case typeElem.RULE:
        updateChangesInPositions(positionsInItem, selected, `rules`, item, updatePosition);
        break;
      
      case typeElem.EMPLOYEE:
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
  open: pt.bool.isRequired,
  type: pt.oneOf([typeElem.DOC, typeElem.RULE, typeElem.RULE, typeElem.EMPLOYEE]).isRequired,
  onClose: pt.func.isRequired,
  loading: pt.bool.isRequired,
  item: pt.object.isRequired,
  positions: pt.array.isRequired,
  updatePosition: pt.func.isRequired, 
  updateEmployee: pt.func.isRequired, 
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  positions: state.data.positions,
});

const mapActionsToProps = {
  updatePosition,
  updateEmployee
};

export default connect(mapStateToProps, mapActionsToProps)(PositionsAddInItem);
