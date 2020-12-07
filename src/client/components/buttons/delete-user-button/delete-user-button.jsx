import React, {useState} from 'react';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// Icons
import DeleteIcon from '@material-ui/icons/Delete';
// Components
import Confirm from '../../confirm/confirm';
import { typeConfirm } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 0, 1, 0),
    color: `#999999`,
  },
}));

const DeleteUserButton = ({ onDel }) => {
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
      <Tooltip title="Удалить аккаунт" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
        <Button
          className={classes.button}
          endIcon={<DeleteIcon />}
          onClick={handleOpenConfirm}
        >
          Удалить аккаунт
        </Button>
      </Tooltip>

      <Confirm
        typeOk={typeConfirm.DEL}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        title="Вы действительно хотите удалить аккаунт без возможности восстановления?"
      />

    </>
  )
}

export default DeleteUserButton;
