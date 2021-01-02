import React from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { deleteRule } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
// Icons
// Components
import DeleteButton from '../../buttons/delete-button/delete-button';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: `center`,
    // flexDirection: `column`,
    // width: `100%`,
    // margin: theme.spacing(2, 0, 4, 0),
  },
  delIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.background.sectionIcon,
  },
  hoverIcon: {
    color: theme.palette.background.sectionIconHover,
  },
}));

// item - переданный документ или пользователь
const RuleDelete = ({ rule, deleteRule }) => {
  const classes = useStyles();

  const handleDeleteRule = () => {
    console.log(`Нажали удалить правило`);
    deleteRule(rule);
  };
  

  return (
    <>
      <div className={classes.container}>
        <DeleteButton
          type={`rule`}
          icon
          placement="right"
          onDel={handleDeleteRule}
          classname={classes.delIcon}
          classesActiveDel={classes.hoverIcon}
        />
      </div>
    </>
  );
};


RuleDelete.propTypes = {
  rule: pt.object.isRequired,
  deleteRule: pt.func.isRequired,
};

export default connect(undefined, { deleteRule })(RuleDelete);
