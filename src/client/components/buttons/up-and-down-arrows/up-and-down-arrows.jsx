import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import AddIcon from '@material-ui/icons/Add';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import { typeUpDown } from '../../../../types';



const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: theme.spacing(1),
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  addIcon: {
    width: `14px`,
    height: `14px`, 
    // color: theme.palette.background.default,
    color: `#ffffff`,
  },
  hoverIcon: {
    color: theme.palette.background.default,
  },
}));

// Выводит стрелки вверх и вниз, а при нажатии перемещает объект выше или ниже
const UpAndDownArrows = ({ type }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);
  

  const handleMoveItemUp = () => {
    console.log(`Нажали переместить вверх`);
  };

  const handleMoveItemDown = () => {
    console.log(`Нажали переместить вниз`);
  };

  let tooltipUp = ``;
  let tooltipDown = ``;

  switch (type) {
    case typeUpDown.SECTION:
      tooltipUp = `Переместить раздел выше`;
      tooltipDown = `Переместить раздел ниже`;
      break;
    
    case typeUpDown.RULE:
      tooltipUp = `Переместить правило выше`;
      tooltipDown = `Переместить правило ниже`;
      break;
  }
  

  return (
    <>
      <div className={classes.container}
        onMouseEnter={handleIsHoverOn}
        onMouseLeave={handleIsHoverOff}
      >
        <Tooltip title={tooltipUp} placement="right" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton onClick={handleMoveItemUp} className={cl(classes.addIcon, { [classes.hoverIcon]: isHover })}>
            <ExpandLessIcon />
          </IconButton>
        </Tooltip>

        {/* <AddIcon className={cl(classes.addIcon, { [classes.hoverIcon]: isHover })}/> */}
        
        <Tooltip title={tooltipDown} placement="right" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton onClick={handleMoveItemDown} className={cl(classes.addIcon, { [classes.hoverIcon]: isHover })}>
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};


UpAndDownArrows.propTypes = {
  type: pt.string.isRequired,
  // updateDocument: pt.func.isRequired,
  // ruleStored: pt.object,
};

const mapStateToProps = (state) => ({
  // ruleStored: state.UI.ruleStored,
});


export default connect(mapStateToProps, { updateDocument })(UpAndDownArrows);
