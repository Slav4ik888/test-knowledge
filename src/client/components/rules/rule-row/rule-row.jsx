import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateRule, deleteRule } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import SaveIcon from '@material-ui/icons/Save';
import DescriptionIcon from '@material-ui/icons/Description';
import Delete from '@material-ui/icons/Delete';
// Components


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `flex-start`,
    margin: theme.spacing(2, 0, 4, 0),
    width: `100%`,
    // padding: theme.spacing(2),
    // borderRadius: `5px`,
    // backgroundColor: theme.palette.background.main,
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
    fontSize: theme.fontSize.ruleTitle,
    fontColor: theme.palette.fontColor.ruleTitle,
    fontWeight: theme.fontWeight.ruleTitle,
  },
  body: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2, 4, 2),
    resize: `vertical`,
    width: `100%`,
    borderColor: theme.border.light,
    outline: 0,  
  },
  bodyStyle: {
    fontSize: theme.fontSize.rule,
    fontColor: theme.palette.fontColor.rule,
    fontWeight: theme.fontWeight.rule,
  },
  helpBox: {
    marginLeft: theme.spacing(2),
    width: `50px`,
  },
  icon: {
    color: theme.palette.background.default,
  },
  iconActiveSave: {
    color: theme.palette.primary.main,
  },
  iconActiveDel: {
    color: theme.palette.secondary.main,
  },
}));


const RuleRow = ({ rule, onEditTitle, onEditRule, updateRule, deleteRule }) => {
  if (!rule) return null;

  const classes = useStyles();

  const [isChange, setIsChange] = useState(false);
  const [isHoverDel, setIsHoverDel] = useState(false);
  const handleIsHoverDelOn = () => setIsHoverDel(true);
  const handleIsHoverDelOff = () => setIsHoverDel(false);

  const [newTitle, setNewTitle] = useState(rule.title);
  const handleEditTitle = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      // handleBlur();
    }
    const value = e.target.value;
    if (value !== rule.rule) {
      setIsChange(true);
    }
    setNewTitle(value);
  };

  const [newRule, setNewRule] = useState(rule.rule);
  const handleEditRule = (e) => {
    const value = e.target.value;
    setNewRule(value);
    if (value !== rule.rule) {
      setIsChange(true);
    }
  };
  
  // const handleBlur = () => {
  //   if (rule.title !== newTitle) {
  //     onEditTitle(rule.docId, rule.sectionSelected, newTitle);
  //   }
  //   if (rule.rule !== newRule) {
  //     onEditRule(rule.docId, rule.sectionSelected, newRule);
  //   }
  // };

  const handleUpdateRule = () => {
    if (newTitle !== rule.title || newRule !== rule.rule) {
      console.log(`Есть изменения, обновляем правило`);
      rule.title = newTitle;
      rule.rule = newRule;
      updateRule(rule);
    }
  };

  const handleDeleteRule = () => {
    console.log(`Нажали удалить правило`);
    deleteRule(rule);
  };
  
  return (
    <>
      <div className={classes.row}>
        <Avatar className={classes.avatar}>
          <DescriptionIcon />
        </Avatar>

        <div className={classes.rule}>
          <TextField 
            name={newTitle.id} type="text" fullWidth
            value={newTitle}
            placeholder="Введите заголовок правила"
            onChange={handleEditTitle} 
            // onBlur={handleBlur}
            onKeyDown={handleEditTitle}
            InputProps={{
              classes: {
                input: classes.textFieldTitle,
              },
            }} 
          />
              
          <TextareaAutosize
            className={classes.body}
            placeholder="Введите текст правила"
            value={newRule}
            // onBlur={handleBlur}
            onChange={handleEditRule} 
            InputProps={{
              classes: {
                input: classes.bodyStyle,
              },
            }} 
          />

        </div>

        <div className={classes.helpBox}>
          <Tooltip title="Сохранить изменения" placement="right" arrow enterDelay={1000} enterNextDelay={1000}>
            <IconButton onClick={handleUpdateRule} className={cl(classes.icon, {[classes.iconActiveSave]: isChange})}>
              <SaveIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Удалить правило" placement="right" arrow enterDelay={1000} enterNextDelay={1000}>
            <IconButton onClick={handleDeleteRule} className={cl(classes.icon, { [classes.iconActiveDel]: isHoverDel })}
              onMouseEnter={handleIsHoverDelOn} onMouseLeave={handleIsHoverDelOff}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </>
  );
};


RuleRow.propTypes = {
  rule: pt.object.isRequired,
  // onEditRule: pt.func.isRequired,
  updateRule: pt.func.isRequired,
  deleteRule: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
});

const mapActionsToProps = {
  updateRule,
  deleteRule,
};

export default connect(mapStateToProps, mapActionsToProps)(RuleRow);
