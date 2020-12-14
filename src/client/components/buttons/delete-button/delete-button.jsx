import React, {useState} from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// Icons
import Delete from '@material-ui/icons/Delete';
// Components
import Confirm from '../../confirm/confirm';
import { typeConfirm } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.background.bodyfield,
  },  
  iconActiveSave: {
    color: theme.palette.primary.main,
  },
  iconActiveDel: {
    color: theme.palette.secondary.main,
  },
}));


const typeComp = {
  position: {
    tooltipTitle: `Удалить`,
    buttonTitle: `Удалить`,
    titleConfirm: `Вы действительно хотите удалить должность, без возможности восстановления?`,
  },
  companyProfile: {
    tooltipTitle: `Удалить аккаунт, все созданые документы и данные по всем зарегистрированным пользователям`,
    buttonTitle: `Удалить аккаунт`,
    titleConfirm: `Вы действительно хотите удалить аккаунт компании, без возможности восстановления?`,
  },
  rule: {
    tooltipTitle: `Удалить правило`,
    buttonTitle: `Удалить правило`,
    titleConfirm: `Вы действительно хотите удалить это правило, без возможности восстановления?`,
  },
  section: {
    tooltipTitle: `Удалить раздел`,
    buttonTitle: `Удалить раздел`,
    titleConfirm: `Вы действительно хотите удалить этот раздел со всеми созданными в нём правилами, без возможности восстановления?`,
  },
  document: {
    tooltipTitle: `Удалить документ`,
    buttonTitle: `Удалить документ`,
    titleConfirm: `Вы действительно хотите удалить этот документ со всеми созданными в нём правилами, без возможности восстановления?`,
  },
};

const DeleteButton = ({ type, icon, button, placement, onDel, classname, classesActiveDel }) => {

  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOk = () => {
    setIsOpen(false);
    onDel();
  };
  const handleOpenConfirm = () => setIsOpen(true);
  
  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);

  const iconActiveDel = classesActiveDel ? classesActiveDel : classes.iconActiveDel;
  
  return (
    <>
      {
        icon &&
          <Tooltip
            title={typeComp[type].tooltipTitle}
            placement={placement ? placement : "bottom"}
            arrow
            enterDelay={1000}
            enterNextDelay={1000}
          >
            <IconButton
              edge="end" aria-label="Delete"
              className={cl(classes.icon, { [iconActiveDel]: isHover }, classname)}
              onMouseEnter={handleIsHoverOn} onMouseLeave={handleIsHoverOff}
              onClick={handleOpenConfirm}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        }
        {
          button &&
            <Tooltip
              title={typeComp[type].tooltipTitle}
              placement={placement ? placement : "bottom"}
              arrow
              enterDelay={1000}
              enterNextDelay={1000}
            >
              <Button
                // className={cl(classes.icon, { [classes.iconActiveDel]: isHover })}
                onClick={handleOpenConfirm}
              >
                {typeComp[type].buttonTitle}
              </Button>
            </Tooltip>
        }

      <Confirm
        typeOk={typeConfirm.DEL}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        title={typeComp[type].titleConfirm}
      />

    </>
  )
};

DeleteButton.propTypes = {
  type: pt.string.isRequired,
  icon: pt.bool,
  button: pt.bool,
  onDel: pt.func.isRequired,
};

export default DeleteButton;
