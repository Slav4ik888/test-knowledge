import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
// Icons
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import PositionsIconShow from '../../positions/positions-icon-show/positions-icon-show';
import { typePosModule } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: `center`,
    justifyContent: `flex-end`,
    flexDirection: `row`,
    marginTop: theme.spacing(2),
    width: `100%`,
    // paddingBottom: theme.spacing(1),
    // borderRadius: `5px`,
    // backgroundColor: theme.palette.background.main,
  },
  
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.primary.light,
  },
  buttonHover: {
    backgroundColor: theme.palette.background.bodyfield,
    color: theme.palette.primary.main,
  },
}));


const RuleTestBox = ({ rule }) => {
  // if (!open) return null;

  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <div className={cl(classes.button)}>Тесты</div>
        
        <PositionsIconShow type={typePosModule.RULE} item={rule} />
      </div>
    </>
  );
};


RuleTestBox.propTypes = {
  rule: pt.object.isRequired,
  // updateRule: pt.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   ruleStored: state.UI.ruleStored,
// });

const mapActionsToProps = {
  // updateRule,
};

export default connect(undefined, mapActionsToProps)(RuleTestBox);
