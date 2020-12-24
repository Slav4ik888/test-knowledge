import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument, createRule } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import AddIcon from '@material-ui/icons/Add';
// Components
import { addSectionInDocument } from '../../sections/utils';
import { addRuleInSection } from '../../rules/util';
import { typeUpDown } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    justifyContent: `center`,
    margin: theme.spacing(2, 0, 4, 0),
    borderRadius: `5px`,
    width: `100%`,
    height: `50px`,
    backgroundColor: theme.palette.background.light,
  },
  hover: {
    color: theme.textSecondary,
    backgroundColor: `#d7d8da`,
    boxShadow: `1px 1px 3px rgba(0, 0, 0, 0.15)`,
  },
}));


const NewRowCreate = ({ loading, type, updateDocument, createRule, docSelected, section }) => {

  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);
  const handleHoverOn = () => setIsHover(true);
  const handleHoverOff = () => setIsHover(false);

  const handleCreate = () => {
    if (!loading) {
      if (type === typeUpDown.SECTION) {
        addSectionInDocument(`up`, docSelected, section, updateDocument);
      } else if (type === typeUpDown.RULE) {
        addRuleInSection(`up`, null, { docId: docSelected.id, sectionId: section.id }, createRule);
      }
    }
  };

  let tooltip = ``;
  switch (type) {
    case typeUpDown.SECTION:
      tooltip = `Добавить раздел `;
      break;
    
    case typeUpDown.RULE:
      tooltip = `Добавить правило`;
      break;
  }

  return (
    <>
      <Tooltip title={tooltip} placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
        <div className={cl(classes.row, {[classes.hover]: isHover})} onClick={handleCreate}
          onPointerEnter={handleHoverOn}
          onPointerLeave={handleHoverOff}
        >
          <AddIcon color="disabled"/>
        </div>
      </Tooltip>
    </>
  );
};


NewRowCreate.propTypes = {
  updateDocument: pt.func.isRequired,
  createRule: pt.func.isRequired,
  loading: pt.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});

const mapActionsToProps = {
  updateDocument,
  createRule,
};

export default connect(mapStateToProps, mapActionsToProps)(NewRowCreate);
