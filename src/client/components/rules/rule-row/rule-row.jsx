import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateRule } from '../../../redux/actions/data-actions';
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
import RuleDelete from '../rule-delete/rule-delete';
import UpAndDownAdd from '../../buttons/up-and-down-add/up-and-down-add';
import UpAndDownArrows from '../../buttons/up-and-down-arrows/up-and-down-arrows';
import RuleTestBox from '../rule-test-box/rule-test-box';
import { typeUpDown } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // alignItems: `flex-start`,
    alignItems: `center`,
    flexDirection: `column`,
    // margin: theme.spacing(2, 0, 4, 0),
    width: `100%`,
    // borderRadius: `5px`,
    // backgroundColor: theme.palette.background.main,
  },
  sprite: {
    width: `calc(100% - 120px)`,
    display: `flex`,
    flexDirection: `row`,
  },
  avatar: {
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    height: `min-content`,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: `row`,
    alignItems: `center`,
    width: `100%`,
    minWidth: 220,
    color: theme.palette.primary.main,
    padding: theme.spacing(0, 2, 0, 2),
  },
  outPadding: {
    paddingBottom: `0px !important`,
  },
  input: {
    width: `calc(100% - 130px)`,
    flex: 1,
    padding: theme.spacing(1, 3, 1, 3),
    fontSize: `25px`,
  },
  // textFieldTitle: {
  //   fontSize: theme.fontSize.ruleTitle,
  //   fontColor: theme.palette.fontColor.ruleTitle,
  //   fontWeight: theme.fontWeight.ruleTitle,
  //   width: `100%`,
  // },
  rule: {
    width: `100%`,
    margin: 0,
  },
  body: {
    // marginTop: theme.spacing(2),
    padding: theme.spacing(2, 2, 2, 2),
    resize: `vertical`,
    borderColor: theme.border.light,
    outline: 0,  
    width: `100%`,
  },
}));

// Строка (модуль) с rule
const RuleRow = ({ rule, updateRule }) => {
  if (!rule) return null;

  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  const [newTitle, setNewTitle] = useState(rule.title);
  const handleEditTitle = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      handleUpdateRule();
    }
    const value = e.target.value;
    setNewTitle(value);
  };

  const handleBlur = () => handleUpdateRule();

  const [newRule, setNewRule] = useState(rule.rule);
  const handleEditRule = (e) => {
    const value = e.target.value;
    setNewRule(value);
  };

  const handleUpdateRule = () => {
    if (newTitle !== rule.title || newRule !== rule.rule) {
      // console.log(`Есть изменения, обновляем правило`);
      rule.title = newTitle;
      rule.rule = newRule;
      updateRule(rule);
    }
  };
  
  return (
    <>
      <UpAndDownAdd type={typeUpDown.RULE} rule={rule} upDown={`up`} />
      
      <Card className={classes.container} onMouseLeave={handleUpdateRule} >
        <div className={classes.header} >
          <Avatar className={classes.avatar}>
            <DescriptionIcon />
          </Avatar>

          <div className={classes.sprite} onMouseEnter={handleIsHoverOn} onMouseLeave={handleIsHoverOff}>
            <Tooltip title="Нажмите, чтобы изменить заголовок правила" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
              <InputBase
                className={classes.input}
                inputProps={{ 'aria-label': 'Заголовок правила' }}
                value={newTitle}
                type="text"
                placeholder="Введите заголовок правила"
                onChange={handleEditTitle} 
                onKeyDown={handleEditTitle}
                onBlur={handleBlur}
              />
            </Tooltip>

            {
              isHover && <>
                <RuleDelete rule={rule} />
                <UpAndDownArrows type={typeUpDown.RULE} rule={rule} />
              </>
            }
          </div>
          <IconButton
            className={cl(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        
        {/* Положение - {rule.order}  */}

        <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.rule}>
          <CardContent >
            <TextareaAutosize
              className={classes.body}
              placeholder="Введите текст правила"
              value={newRule}
              rowsMin={4}
              onChange={handleEditRule} 
            />
            
            <RuleTestBox rule={rule} />
          </CardContent>
        </Collapse>


      </Card>

      <UpAndDownAdd type={typeUpDown.RULE} rule={rule} upDown={`down`} />
    </>
  );
};


RuleRow.propTypes = {
  rule: pt.object.isRequired,
  updateRule: pt.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   ruleStored: state.UI.ruleStored,
// });

const mapActionsToProps = {
  updateRule,
};

export default connect(undefined, mapActionsToProps)(RuleRow);
