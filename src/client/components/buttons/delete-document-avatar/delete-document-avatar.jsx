import React, {useState} from 'react';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
// Icons
import Delete from '@material-ui/icons/Delete';

// Components
import Confirm from '../../confirm/confirm';
import { typeConfirm } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  delIcon: {
    marginRight: 30,
  },
}));


const DeleteDocumentAvatar = ({ onDel, title }) => {
  const classes = useStyles();

  const titleValue = `Вы действительно хотите удалить ${title} без возможности восстановления?`;

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOk = () => {
    setIsOpen(false);
    onDel();
  };
  const handleOpenConfirm = () => setIsOpen(true);
  

  return (
    <>
      <ListItemSecondaryAction onClick={handleOpenConfirm} className={classes.delIcon}>
        <Tooltip title="Удалить" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton aria-label="Delete">
            <Delete />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>

      <Confirm
        typeOk={typeConfirm.DEL}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        title={titleValue}
      />

    </>
  )
}

export default DeleteDocumentAvatar;
