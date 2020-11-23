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


const useStyles = makeStyles((theme) => ({
  delIcon: {
    marginRight: 30,
  },
}));


const DeleteDocumentAvatar = ({ onDel }) => {
  const classes = useStyles();

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
        <Tooltip title="Удалить" placement="bottom" arrow>
          <IconButton aria-label="Delete">
            <Delete />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>

      <Confirm
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        title="Вы действительно хотите удалить документ без возможности восстановления?"
      />

    </>
  )
}

export default DeleteDocumentAvatar;
