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
import FolderIcon from '@material-ui/icons/Folder';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// Components
import PositionsContainer from '../positions-container/positions-container';
import PositionsListChip from '../positions-list-chip/positions-list-chip';
import PositionsAddInItem from '../positions-add-in-item/positions-add-item';


const useStyles = makeStyles((theme) => {
  // console.log('theme: ', theme);

  return ({
    row: {
      display: 'flex',
      alignItems: `center`,
      margin: theme.spacing(2, 0, 4, 0),
    },
    paperChip: {
      width: `100%`,
      padding: theme.spacing(1),
      border: `1px solid #ccc`,
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
  })
});

// item - переданный документ или пользователь
const PositionsModuleRow = ({ type, item, positions }) => {
  console.log('item: ', item);
  if (!item) return null;

  const classes = useStyles();
  // Выбираем должности закреплённые за данным документом item
  const positionsInItem = positions.filter((pos) => item.positions.find((itemPos) => itemPos.id === pos.id));
  
  // Открыт ли контейнер для редактирования должностей
  const [isPosEdit, setIsPosEdit] = useState(false);
  const handlePosEditOpen = () => setIsPosEdit(true);
  const handlePosEditClose = () => setIsPosEdit(false);

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

      <Tooltip title="Изменить закреплённые должности" placement="bottom" arrow>
        <Paper elevation={0} onClick={handlePosToggleOpen} className={classes.paperChip}>
          <PositionsListChip positions={positionsInItem} />
        </Paper>
      </Tooltip>

      <Tooltip title="Редактировать должности" placement="bottom" arrow>
        <IconButton aria-label="Edit" onClick={handlePosEditOpen} className={classes.editIcon}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <PositionsAddInItem
        open={posToggle}
        type={type}
        item={item}
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
};

const mapStateToProps = (state) => ({
  positions: state.data.positions,
});


export default connect(mapStateToProps)(PositionsModuleRow);
