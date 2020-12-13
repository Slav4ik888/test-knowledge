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
// Components
import { typeUpDown } from '../../../../types';
import { createId, getNewOrder } from '../../../../server/utils/utils';



const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(0.25, 0, 0.25, 0),
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  addIcon: {
    width: `5px`,
    height: `5px`, 
    // color: theme.palette.background.default,
    color: `#ffffff`,
  },
  hoverIcon: {
    color: theme.palette.background.default,
  },
}));

// Выводит стрелки вверх и вниз, а при нажатии перемещает объект выше или ниже
const UpAndDownAdd = ({ loading, type, docSelected, section, up, down, updateDocument }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);
  

  const handleAddItem = () => {
    if (!loading) {
      if (up) {
        console.log(`Нажали добавить выше`);
        handleAddSection(`up`);
      }
      if (down) {
        console.log(`Нажали добавить ниже`);
        handleAddSection(`down`);
      }
    }
  };

  const handleAddSection = (type) => {
      const newSection = {
        title: ``,
        id: createId(docSelected.sections),
        order: getNewOrder(type, docSelected, section),
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
      };
      docSelected.sections.push(newSection);
      updateDocument(docSelected);
  };

  let tooltip = ``;

  switch (type) {
    case typeUpDown.SECTION:
      tooltip = up ? `Добавить раздел выше` : `Добавить раздел ниже`;
      break;
    
    case typeUpDown.RULE:
      tooltip = down ? `Добавить правило выше` : `Добавить правило ниже`;
      break;
  }
  

  return (
    <>
      <div className={classes.container}
        onMouseEnter={handleIsHoverOn}
        onMouseLeave={handleIsHoverOff}
      >
        <Tooltip title={tooltip} placement="right" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton onClick={handleAddItem} className={cl(classes.addIcon, { [classes.hoverIcon]: isHover })}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};


UpAndDownAdd.propTypes = {
  loading: pt.bool.isRequired,
  type: pt.string.isRequired,
  up: pt.bool,
  down: pt.bool,
  updateDocument: pt.func.isRequired,
  docSelected: pt.object.isRequired,
  section: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});


export default connect(mapStateToProps, { updateDocument })(UpAndDownAdd);
