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
import Button from '@material-ui/core/Button';
// Icons
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import QuestionsContainer from '../questions-container/questions-container';
import { typePosModule } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(1, 3, 1, 3),
    color: theme.palette.primary.light,
    borderRadius: `5px`,
  },
  buttonHover: {
    backgroundColor: theme.palette.background.bodyfield,
    color: theme.palette.primary.main,
  },
}));

// Кнопка нажав на которую открывается контейнер с вопросами по текущему rule
const QuestionsBtnContainer = ({ rule }) => {
  const classes = useStyles();

  const [isHover, setIsHover] = useState(false);
  const handleIsHoverOn = () => setIsHover(true);
  const handleIsHoverOff = () => setIsHover(false);

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <>
      <Button
        className={cl(classes.button, { [classes.buttonHover]: isHover })}
        onMouseEnter={handleIsHoverOn} onMouseLeave={handleIsHoverOff}
        onClick={handleExpandClick}
      >
        Вопросы
      </Button>
      {
        expanded && <QuestionsContainer
          open={expanded}
          onClose={handleExpandClick}
          ruleId={rule.id}
        />
      }
    </>
  );
};


QuestionsBtnContainer.propTypes = {
  rule: pt.object.isRequired,
  // updateRule: pt.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   ruleStored: state.UI.ruleStored,
// });

const mapActionsToProps = {
  // updateRule,
};

export default connect(undefined, mapActionsToProps)(QuestionsBtnContainer);
