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
import { typeElem } from '../../../../types';
import { addSectionInDocument, addRuleInSection, addAnswerInAnswers } from '../../../utils/moveItemInArray';


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
    color: theme.palette.background.bodyfield,
    // color: theme.palette.primary.light,
  },
  hoverIcon: {
    // color: theme.palette.background.section,
    color: theme.palette.primary.light,
  },
}));

// Выводит новый элемент выше или ниже
const AddIconRow = ({ loading, type, up, items, item, docSelected, section, updateDocument, onAdd }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);
  
  const upDown = up ? `up` : `down`; // Куда выводим новый элемент

  const handleAddItem = () => {
    if (!loading) {
      if (type === typeElem.SECTION) {
        // Добавляем пустой раздел сверху или снизу
        addSectionInDocument(upDown, docSelected, section, updateDocument);

      } else if (type === typeElem.RULE) {
        // Добавляем пустое правило сверху или снизу 
        addRuleInSection(upDown, items, item, onAdd);

      } else if (type === typeElem.ANSWER) {
        // Добавляем пустой ответ сверху или снизу 
        addAnswerInAnswers(upDown, items, item, onAdd);
      }

    }
  };

  let tooltip = ``;
  let placement = ``;

  switch (type) {
    case typeElem.SECTION:
      tooltip = upDown === `up` ? `Добавить раздел выше` : `Добавить раздел`;
      placement = upDown === `up` ? `top` : `bottom`;
      break;
    
    case typeElem.RULE:
      tooltip = upDown === `up` ? `Добавить правило выше` : `Добавить правило`;
      placement = upDown === `up` ? `top` : `bottom`;
      break;
    
    case typeElem.ANSWER:
      tooltip = upDown === `up` ? `Добавить ответ выше` : `Добавить ответ`;
      placement = upDown === `up` ? `top` : `bottom`;
      break;
  }
  

  return (
    <>
      <div className={classes.container}
        onMouseEnter={handleIsHoverOn}
        onMouseLeave={handleIsHoverOff}
      >
        <Tooltip title={tooltip} placement={placement} arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton onClick={handleAddItem} className={cl(classes.addIcon, { [classes.hoverIcon]: isHover })}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};


AddIconRow.propTypes = {
  loading: pt.bool.isRequired,
  type: pt.oneOf([typeElem.SECTION, typeElem.RULE, typeElem.ANSWER]).isRequired,
  up: pt.bool,
  items: pt.array,
  item: pt.object,
  updateDocument: pt.func.isRequired,
  onAdd: pt.func,
  docSelected: pt.object,
  section: pt.object,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});

const mapActionsToProps = {
  updateDocument
};

export default connect(mapStateToProps, mapActionsToProps)(AddIconRow);
