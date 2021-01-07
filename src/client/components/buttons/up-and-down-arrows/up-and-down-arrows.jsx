import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument, updateRule } from '../../../redux/actions/data-actions';
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
import { getNewOrderForMoveItem } from '../../../../server/utils/utils';
import { getIdxRulesFromDocAndSection } from '../../../utils/utils';


const useStyles = makeStyles((theme) => ({
  container: {
    // marginLeft: theme.spacing(1),
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    justifyContent: `center`,
    maxHeight: `max-content`,
  },
  addIcon: {
    width: `24px`,
    height: `24px`, 
    color: theme.palette.background.sectionIcon,
  },
  answerUp: {
    position: `absolute`,
    top: 13,
    right: 110,
  },
  answerDown: {
    position: `absolute`,
    top: 33,
    right: 110,
  },
  hoverIcon: {
    color: theme.palette.background.sectionIconHover,
  },
}));

// Выводит стрелки вверх и вниз, а при нажатии перемещает объект выше или ниже
const UpAndDownArrows = ({ loading, type, docSelected, section, rules, rule, items, item, updateDocument, updateRule, update }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);
  

  const handleMoveItemUp = () => {
    if (!loading) {
      if (type === typeUpDown.SECTION) {
        handleMoveSection(`up`);
      } else if (type === typeUpDown.RULE) {
        handleMoveRule(`up`);
      } else if (type === typeUpDown.ANSWER) {
        handleMoveAnswer(`up`);
      }
    }
  };

  const handleMoveItemDown = () => {
    if (!loading) {
      if (type === typeUpDown.SECTION) {
        handleMoveSection(`down`);
      } else if (type === typeUpDown.RULE) {
        handleMoveRule(`down`);
      } else if (type === typeUpDown.ANSWER) {
        handleMoveAnswer(`down`);
      }
    }
  };

  // Перемещаем раздел
  const handleMoveSection = (condition) => {
    const idx = docSelected.sections.findIndex((sec) => sec.id === section.id);
    if (idx !== -1) {
      const order = section.order;
      const newOrder = getNewOrderForMoveItem(condition, `section`, docSelected, section);

      if (newOrder !== order) { // Сохраняем если есть изменения
        docSelected.sections[idx].order = newOrder;
        updateDocument(docSelected);
      }
    }
  };

  // Перемещаем правило
  const handleMoveRule = (condition) => {
    // Если в разделе уже есть хотя бы одно правило
    // Находим индекс где храниться нужная секция в rules так как там массив посекционный с rules
    const idxRule = getIdxRulesFromDocAndSection(rules, rule, rule);
    if (idxRule !== -1) {
      const rulesInSection = rules[idxRule].rules;
      const newOrder = getNewOrderForMoveItem(condition, `rule`, rulesInSection, rule);

      if (newOrder !== rule.order) {
        // console.log(`Перемещаем правило`);
        rule.order = newOrder;
        updateRule(rule);
      }
    }
  };

  // Перемещаем ответ
  const handleMoveAnswer = (condition) => {
    item.order = getNewOrderForMoveItem(condition, `answer`, items, item);
    update(item);
  }

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
    
    case typeUpDown.ANSWER:
      tooltipUp = `Переместить ответ выше`;
      tooltipDown = `Переместить ответ ниже`;
      break;
  }
  

  return (
    <>
      <div className={classes.container}
        onMouseEnter={handleIsHoverOn}
        onMouseLeave={handleIsHoverOff}
      >
        <Tooltip title={tooltipUp} placement="right" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton onClick={handleMoveItemUp} className={cl(classes.addIcon,
            { [classes.answerUp]: type === typeUpDown.ANSWER },
            { [classes.hoverIcon]: isHover }
          )}>
            <ExpandLessIcon />
          </IconButton>
        </Tooltip>

        {/* <AddIcon className={cl(classes.addIcon, { [classes.hoverIcon]: isHover })}/> */}
        
        <Tooltip title={tooltipDown} placement="right" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton onClick={handleMoveItemDown} className={cl(classes.addIcon,
            { [classes.answerDown]: type === typeUpDown.ANSWER },
            { [classes.hoverIcon]: isHover })
          }>
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
  items: pt.array,
  item: pt.object,
  docSelected: pt.object,
  section: pt.object,
  rules: pt.array,
  rule: pt.object,
  updateDocument: pt.func.isRequired,
  updateRule: pt.func.isRequired,
  update: pt.func,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  rules: state.data.rules,
});


export default connect(mapStateToProps, { updateDocument, updateRule })(UpAndDownArrows);
