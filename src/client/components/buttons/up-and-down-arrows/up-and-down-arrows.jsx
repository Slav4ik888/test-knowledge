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
import { getNewOrderForMoveSection } from '../../../../server/utils/utils';


const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: theme.spacing(1),
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    maxHeight: `max-content`,
  },
  addIcon: {
    width: `24px`,
    height: `24px`, 
    // color: theme.palette.background.default,
    color: `#ffffff`,
  },
  hoverIcon: {
    color: theme.palette.background.default,
  },
}));

// Выводит стрелки вверх и вниз, а при нажатии перемещает объект выше или ниже
const UpAndDownArrows = ({ loading, type, docSelected, section, updateDocument }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);
  

  const handleMoveItemUp = () => {
    if (!loading) {
      handleMoveSection(`up`);
    }
  };

  const handleMoveItemDown = () => {
    if (!loading) {
      handleMoveSection(`down`);
    }
  };

  const handleMoveSection = (type) => {
    const idx = docSelected.sections.findIndex((sec) => sec.id === section.id);
    const order = section.order;
    const newOrder = getNewOrderForMoveSection(type, docSelected, section);

    if (newOrder !== order) { // Сохраняем если есть изменения
      docSelected.sections[idx].order = newOrder;
      updateDocument(docSelected);
    }
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
  loading: pt.bool.isRequired,
  type: pt.string.isRequired,
  docSelected: pt.object.isRequired,
  section: pt.object.isRequired,
  updateDocument: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});


export default connect(mapStateToProps, { updateDocument })(UpAndDownArrows);
