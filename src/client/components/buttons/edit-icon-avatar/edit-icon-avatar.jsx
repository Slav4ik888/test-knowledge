import React, {useState} from 'react';
import pt from 'prop-types';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
// Icons
import Edit from '@material-ui/icons/Edit';

// Components
import Confirm from '../../confirm/confirm';
import { typeConfirm, typeElem } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  editIcon: {
    position: `absolute`,
    top: 9,
    right: 60,
    // marginRight: 30,
  },
}));


const EditIconAvatar = ({ type, onEdit }) => {
  const classes = useStyles();

  let titleTooltip = ``;

  switch (type) {
    case (typeElem.DOC):
      titleTooltip = `Редактировать этот докумен`;
      break;
    
    case (typeElem.POS):
      titleTooltip = `Редактировать эту должность`;
      break;
    
    case (typeElem.EMPLOYEE):
      titleTooltip = `Редактировать аккаунт сотрудника`;
      break;
    
    case (typeElem.QUESTION):
      titleTooltip = `Редактировать этот вопрос`;
      break;
    
    case (typeElem.ANSWER):
      titleTooltip = `Редактировать этот ответ`;
      break;
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
    onEdit();
  };

  const handleClose = () => setIsOpen(false);

  const handleOpenConfirm = () => setIsOpen(true);
  

  return (
    <Tooltip title={titleTooltip} placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
      <IconButton aria-label="Edit" onClick={handleOk} className={classes.editIcon}>
        <Edit />
      </IconButton>
    </Tooltip>
  )
};

EditIconAvatar.propTypes = {
  type: pt.oneOf([typeElem.DOC, typeElem.POS, typeElem.EMPLOYEE, typeElem.QUESTION, typeElem.ANSWER]).isRequired,
  onEdit: pt.func.isRequired,
};

export default EditIconAvatar;
