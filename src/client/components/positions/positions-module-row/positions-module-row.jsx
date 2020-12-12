import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
// Components
import PositionsContainer from '../positions-container/positions-container';
import PositionsListChip from '../positions-list-chip/positions-list-chip';
import PositionsAddInItem from '../positions-add-in-item/positions-add-item';
import { typePosModule } from '../../../../types';
import { getPositionsByDocId } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    margin: theme.spacing(2, 0, 4, 0),
    padding: theme.spacing(2),
  },
  paperChip: {
    width: `100%`,
    padding: theme.spacing(1),
    border: `1px solid`,
    borderColor: theme.border.light,
    borderRadius: `5px`,
  },
  block: {
    display: `block`,
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
  editIcon: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
}));

// item - переданный документ или пользователь
const PositionsModuleRow = ({ type, item, employees, positions }) => {
  if (!item) return null;

  const classes = useStyles();
  let updatedItem = Object.assign({}, item);
  let titleItem = ``;
  let positionsInItem = []; // Контейнер для positions которые есть в item

  switch (type) {
    case typePosModule.DOC:
      titleItem = `документом`;
      // Выбираем должности закреплённые за данным item
      positionsInItem = getPositionsByDocId(item.id, positions)
      console.log('positionsInItem: ', positionsInItem);
      break;
    
    case typePosModule.EMPLOYEE:
      titleItem = `сотрудником`;
      const upIdx = employees.findIndex((it) => it.userId === item.userId);
      updatedItem = employees[upIdx];
      // Выбираем должности закреплённые за данным item
      positionsInItem = positions.filter((pos) => updatedItem.positions.find((itemPos) => itemPos === pos.id));
      break;
  }

  // Открыт ли контейнер для редактирования должностей
  const [isPosEdit, setIsPosEdit] = useState(false);
  const handlePosEditOpen = () => setIsPosEdit(true);
  const handlePosEditClose = () => setIsPosEdit(false);

  // Открыто ли добавление/удаление должностей
  const [posToggle, setPosToggle] = useState(false);
  const handlePosToggleOpen = () => {
    if (item) {
      setPosToggle(true);
    }
  };
  const handlePosToggleClose = () => setPosToggle(false);

  
  return (
    <div className={classes.row}>
      <Avatar className={classes.avatar}>
        <SupervisedUserCircleIcon />
      </Avatar>

      <Tooltip title={`Изменить закреплённые за ${titleItem} должности`} placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
        <Paper elevation={0} onClick={handlePosToggleOpen} className={classes.paperChip}>
          <PositionsListChip positions={positionsInItem} />
        </Paper>
      </Tooltip>

      <Tooltip title="Редактировать должности" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
        <IconButton aria-label="Edit" onClick={handlePosEditOpen} className={classes.editIcon}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <PositionsAddInItem
        open={posToggle}
        type={type}
        item={updatedItem}
        onClose={handlePosToggleClose}
      />

      <PositionsContainer
        open={isPosEdit}
        onClose={handlePosEditClose}
      />
    </div>
  );
};


PositionsModuleRow.propTypes = {
  positions: pt.array.isRequired,
  employees: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  positions: state.data.positions,
  employees: state.data.employees,
});


export default connect(mapStateToProps)(PositionsModuleRow);
