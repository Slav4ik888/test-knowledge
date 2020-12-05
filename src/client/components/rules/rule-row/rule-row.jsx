import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
// Components


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    margin: theme.spacing(2, 0, 4, 0),
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
  rule: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: `column`,
    width: `100%`,
    minWidth: 220,
    color: theme.textSecondary,
  },
  title: {
    marginTop: theme.spacing(2),

  },
  body: {
    marginTop: theme.spacing(2),

  },
}));

// item - переданный документ или пользователь
const RuleRow = ({ rule, docSelected, sectionSelected, ruleStored }) => {
  console.log('rule: ', rule);
  if (!rule) return null;

  const classes = useStyles();


  return (
    <>
      <div className={classes.row}>
        <Avatar className={classes.avatar}>
          <DescriptionIcon />
        </Avatar>

        <div className={classes.rule}>
          <Typography variant="h6" className={classes.title}>{rule.title}</Typography>

          <div className={classes.body}>
            {rule.rule}
          </div>
        </div>

        <Tooltip title="Редактировать правило" placement="bottom" arrow>
          <IconButton aria-label="Edit" onClick={() => {}} className={classes.editIcon}>
            <EditIcon />
          </IconButton>
        </Tooltip>

      </div>
    </>
  );
};


RuleRow.propTypes = {
  rule: pt.object, // .isRequired,
  docSelected: pt.object,
  sectionSelected: pt.object,
  // onSectionSelected: pt.func.isRequired,
  ruleStored: pt.object,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
});


export default connect(mapStateToProps)(RuleRow);
