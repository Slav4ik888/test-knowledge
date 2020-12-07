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


const RuleRowCreate = ({ createRule, activeRules: {docId, sectionId} }) => {

  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);
  const handleHoverOn = () => setIsHover(true);
  const handleHoverOff = () => setIsHover(false);

  const handleCreateRule = () => {
    const newRule = {
      docId,
      sectionId,
      title: ``,
      rule: ``,
    }
    createRule(newRule);
  };


  return (
    <>
      <Tooltip title="Добавить правило" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
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
