import React, {useState} from 'react';
// MUI Stuff
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
// Icons
import Delete from '@material-ui/icons/Delete';
// Components
import Confirm from '../../confirm/confirm';


const DeleteUserAvatar = ({ onDel }) => {

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOk = () => {
    setIsOpen(false);
    onDel();
  };
  const handleOpenConfirm = () => setIsOpen(true);
  

  return (
    <>
      <ListItemSecondaryAction onClick={handleOpenConfirm}>
        <Tooltip title="Удалить аккаунт" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton edge="end" aria-label="Delete">
            <Delete />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>

      <Confirm
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        title="Вы действительно хотите удалить аккаунт без возможности восстановления?"
      />

    </>
  )
}

export default DeleteUserAvatar;
