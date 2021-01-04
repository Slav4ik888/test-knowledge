import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument, createRule } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import AddIcon from '@material-ui/icons/Add';
// Components
import { typeUpDown } from '../../../../types';
import { addSectionInDocument } from '../../sections/utils';
import { addRuleInSection } from '../../rules/util';
import { addAnswerInAnswers } from '../../questions/util';


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

// Выводит стрелки вверх и вниз, а при нажатии перемещает объект выше или ниже
const UpAndDownAdd = ({ loading, type, items, item, docSelected, section, rule, upDown, rules, updateDocument, createRule, onAddAnswer }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);
  
  const handleAddItem = () => {
    if (!loading) {
      if (type === typeUpDown.SECTION) {
        // Добавляем пустой раздел сверху или снизу
        addSectionInDocument(upDown, docSelected, section, updateDocument);

      } else if (type === typeUpDown.RULE) {
        // Добавляем пустое правило сверху или снизу 
        addRuleInSection(upDown, rules, rule, createRule);

      } else if (type === typeUpDown.ANSWER) {
        // Добавляем пустой ответ сверху или снизу 
        addAnswerInAnswers(upDown, items, item, onAddAnswer);
      }

    }
  };

  let tooltip = ``;
  let placement = ``;

  switch (type) {
    case typeUpDown.SECTION:
      tooltip = upDown === `up` ? `Добавить раздел выше` : `Добавить раздел ниже`;
      placement = upDown === `up` ? `top` : `bottom`;
      break;
    
    case typeUpDown.RULE:
      tooltip = upDown === `up` ? `Добавить правило выше` : `Добавить правило ниже`;
      placement = upDown === `up` ? `top` : `bottom`;
      break;
    
    case typeUpDown.ANSWER:
      tooltip = upDown === `up` ? `Добавить ответ выше` : `Добавить ответ ниже`;
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


UpAndDownAdd.propTypes = {
  loading: pt.bool.isRequired,
  type: pt.string.isRequired,
  upDown: pt.string.isRequired,
  items: pt.array,
  item: pt.object,
  updateDocument: pt.func.isRequired,
  createRule: pt.func.isRequired,
  onAddAnswer: pt.func,
  docSelected: pt.object,
  section: pt.object,
  rule: pt.object,
  rules: pt.array,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  rules: state.data.rules,
});

const mapActionsToProps = {
  updateDocument, createRule
};

export default connect(mapStateToProps, mapActionsToProps)(UpAndDownAdd);
