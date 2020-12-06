import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
// Components


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    justifyContent: `center`,
    margin: theme.spacing(2, 0, 4, 0),
    borderRadius: `5px`,
    borderStyle: `solid`,
    border: `1px`,
    borderColor: theme.border.light,
    width: `100%`,
    height: `50px`,
  },
  hover: {
    color: theme.textSecondary,
    backgroundColor: theme.palette.background.light,
  },
}));


const RuleRowAdd = ({ onAdd }) => {

  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);
  const handleHoverOn = () => setIsHover(true);
  const handleHoverOff = () => setIsHover(false);

  return (
    <>
      <Tooltip title="Добавить правило" placement="bottom" arrow>
        <div className={cl(classes.row, {[classes.hover]: isHover})} onClick={onAdd}
          onPointerEnter={handleHoverOn}
          onPointerLeave={handleHoverOff}
        >
          <AddIcon color="disabled"/>
        </div>
      </Tooltip>
    </>
  );
};


RuleRowAdd.propTypes = {
  onAdd: pt.func.isRequired,
};

export default RuleRowAdd;
