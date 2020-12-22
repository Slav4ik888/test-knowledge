import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { createRule } from '../../../redux/actions/data-actions';
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
    // borderStyle: `solid`,
    // border: `1px`,
    // borderColor: theme.border.light,
    width: `100%`,
    height: `50px`,
    backgroundColor: theme.palette.background.light,
  },
  hover: {
    color: theme.textSecondary,
    backgroundColor: `#d7d8da`,
    boxShadow: `1px 1px 3px rgba(0, 0, 0, 0.15)`,
    // transition: `transform 2s`,
  },
}));


const RuleRowCreate = ({ createRule, docSelected, section }) => {

  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);
  const handleHoverOn = () => setIsHover(true);
  const handleHoverOff = () => setIsHover(false);

  const handleCreateRule = () => {
    const newRule = {
      docId: docSelected.id,
      sectionId: section.id,
      order: 100,
      title: ``,
      rule: ``,
    }
    createRule(newRule);
  };


  return (
    <>
      <Tooltip title="Создать правило" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
        <div className={cl(classes.row, {[classes.hover]: isHover})} onClick={handleCreateRule}
          onPointerEnter={handleHoverOn}
          onPointerLeave={handleHoverOff}
        >
          <AddIcon color="disabled"/>
        </div>
      </Tooltip>
    </>
  );
};


RuleRowCreate.propTypes = {
  createRule: pt.func.isRequired,
  activeRules: pt.object.isRequired,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
  activeRules: state.data.activeRules,
});

const mapActionsToProps = {
  createRule,
};

export default connect(mapStateToProps, mapActionsToProps)(RuleRowCreate);
