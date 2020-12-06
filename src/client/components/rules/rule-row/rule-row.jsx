import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateRule } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// Icons
import SaveIcon from '@material-ui/icons/Save';
import DescriptionIcon from '@material-ui/icons/Description';
// Components


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `flex-start`,
    margin: theme.spacing(2, 0, 4, 0),
    width: `100%`,
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
    marginTop: theme.spacing(0.5),
  },
  textFieldTitle: {
    fontSize: `24px`,
    fontWeight: `bold`,
  },
  body: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2, 4, 2),
    resize: `vertical`,
    width: `100%`,
    borderColor: theme.border.light,
    outline: 0,   
  },
  button: {
    marginTop: theme.spacing(2),
    position: `relative`,
    float: `right`,
  },
}));

// item - переданный документ или пользователь
const RuleRow = ({ rule, onEditTitle, onEditRule, updateRule }) => {
  if (!rule) return null;

  const classes = useStyles();

  const [isChange, setIsChange] = useState(false);

  const [newTitle, setNewTitle] = useState(rule.title);
  const handleEditTitle = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      handleBlur();
    }
    if (e.target.value !== rule.rule) {
      setIsChange(true);
    }
    setNewTitle(e.target.value);
  };

  const [newRule, setNewRule] = useState(rule.rule);
  const handleEditRule = (e) => {
    setNewRule(e.target.value);
    if (e.target.value !== rule.rule) {
      setIsChange(true);
    }
  };
  
  const handleBlur = () => {
    if (rule.title !== newTitle) {
      onEditTitle(rule.docId, rule.sectionSelected, newTitle);
    }
    if (rule.rule !== newRule) {
      onEditRule(rule.docId, rule.sectionSelected, newRule);
    }
  };

  const handleUpdateRule = () => {
    rule.title = newTitle;
    rule.rule = newRule;
    updateRule(rule);
  };

  return (
    <>
      <div className={classes.row}>
        <Avatar className={classes.avatar}>
          <DescriptionIcon />
        </Avatar>

        <div className={classes.rule}>
          <TextField 
            name={newTitle.id} type="text" className={classes.textFieldTitle} fullWidth
            value={newTitle}
            onChange={handleEditTitle} 
            onBlur={handleBlur}
            onKeyDown={handleEditTitle}
          />
              
          <TextareaAutosize
            className={classes.body}
            placeholder="Введите текст правила"
            value={newRule}
            onBlur={handleBlur}
            onChange={handleEditRule} 
          />

          {
            isChange &&
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                endIcon={<SaveIcon />}
                onClick={handleUpdateRule}
              >
                Сохранить изменения
              </Button>
          }
        </div>
      </div>
    </>
  );
};


RuleRow.propTypes = {
  rule: pt.object.isRequired,
  onEditTitle: pt.func.isRequired,
  onEditRule: pt.func.isRequired,
  updateRule: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
});

const mapActionsToProps = {
  updateRule,
};

export default connect(mapStateToProps, mapActionsToProps)(RuleRow);
