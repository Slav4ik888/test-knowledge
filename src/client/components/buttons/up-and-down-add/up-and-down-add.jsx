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
import { createId, getNewOrderForItem } from '../../../../server/utils/utils';
import { getIdxRulesFromDocAndSection } from '../../../utils/utils';


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
  },
  hoverIcon: {
    color: theme.palette.background.section,
  },
}));

// Выводит стрелки вверх и вниз, а при нажатии перемещает объект выше или ниже
const UpAndDownAdd = ({ loading, type, docSelected, section, rule, up, down, rules, updateDocument, createRule }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);
  

  const handleAddItem = () => {
    if (!loading) {
      if (type === typeUpDown.SECTION) {
        if (up) {
          handleAddSection(`up`);
        }
        if (down) {
          handleAddSection(`down`);
        }
      } else if (type === typeUpDown.RULE) {
        if (up) {
          handleAddRule(`up`);
        }
        if (down) {
          handleAddRule(`down`);
        }
      }

    }
  };

  // Добавляем пустой раздел сверху или снизу
  const handleAddSection = (condition) => {
      const newSection = {
        title: ``,
        id: createId(docSelected.sections),
        order: getNewOrderForItem(condition, `section`, docSelected, section),
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
      };
      docSelected.sections.push(newSection);
      updateDocument(docSelected);
  };

  // Добавляем пустое правило сверху или снизу
  const handleAddRule = (condition) => {
    // Находим индекс где храниться нужная секция в rules так как там массив посекционный с rules
    const idxRule = getIdxRulesFromDocAndSection(rules, rule, rule);
    const rulesInSection = rules[idxRule].rules;
    
    const newRule = {
      title: ``,
      rule: ``,
      order: getNewOrderForItem(condition, `rule`, rulesInSection, rule),
      docId: rule.docId,
      sectionId: rule.sectionId,
    };
    createRule(newRule);
  };

  let tooltip = ``;
  let placement = ``;

  switch (type) {
    case typeUpDown.SECTION:
      tooltip = up ? `Добавить раздел выше` : `Добавить раздел ниже`;
      placement = up ? `top` : `bottom`;
      break;
    
    case typeUpDown.RULE:
      tooltip = down ? `Добавить правило выше` : `Добавить правило ниже`;
      placement = down ? `top` : `bottom`;
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
  up: pt.bool,
  down: pt.bool,
  updateDocument: pt.func.isRequired,
  createRule: pt.func.isRequired,
  docSelected: pt.object,
  section: pt.object,
  rule: pt.object,
  rules: pt.array,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  rules: state.data.rules,
});


export default connect(mapStateToProps, { updateDocument, createRule })(UpAndDownAdd);
