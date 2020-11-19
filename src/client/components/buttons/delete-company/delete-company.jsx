import React, {useState} from 'react';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// Components
import Confirm from '../../confirm/confirm';


const DeleteCompany = ({ callback }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOk = () => {
    setIsOpen(false);
    callback();
  };
  const handleOpenConfirm = () => setIsOpen(true);
  

  return (
    <>
      <Tooltip
        title={`Удалить аккаунт, все созданые документы и данные по всем зарегистрированным пользователям`}
        placement="bottom"
        arrow
      >
        <Button onClick={handleOpenConfirm}>
            Удалить аккаунт
        </Button>
      </Tooltip>
        
      <Confirm
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        title="Вы действительно хотите удалить аккаунт компании без возможности восстановления?"
      />
    </>
  )
}

export default DeleteCompany;
