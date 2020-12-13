import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import DeleteButton from '../../buttons/delete-button/delete-button';
import UpAndDownAdd from '../../buttons/up-and-down-add/up-and-down-add';
import UpAndDownArrows from '../../buttons/up-and-down-arrows/up-and-down-arrows';
import { typeUpDown } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: `column`,
    width: `100%`,
    margin: theme.spacing(2, 0, 4, 0),
  },
  box: {
    display: 'flex',
    flexDirection: `row`,
    alignItems: `center`,
    width: `100%`,
  },
  row: {
    width: `100%`,
    display: 'flex',
    alignItems: `center`,
    // margin: theme.spacing(2, 0, 4, 0),
    padding: theme.spacing(1, 2, 1, 2),
    borderRadius: `10px`,
    border: `1px solid`,
    borderColor: theme.border.light,
    backgroundColor: theme.palette.background.section,
  },
  hover: {
    backgroundColor: theme.palette.background.sectionHover, // `#e9f6fc`,
  },
  sprite: {
    width: `100%`,
    display: `flex`,
    flexDirection: `row`,
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
  textFieldTitle: {
    fontSize: theme.fontSize.section,
    fontColor: theme.palette.fontColor.section,
    fontWeight: theme.fontWeight.section,
  },
  editIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.background.default,
  },
  delIcon: {
    marginRight: theme.spacing(1),
  },
  expandIcon: {
    color: theme.palette.background.default,
  },
  hoverIcon: {
    color: theme.palette.background.iconHover,
  },
}));

// item - переданный документ или пользователь
const SectionsModuleRow = ({ docSelected, section, updateDocument }) => {
  const classes = useStyles();

  const [isShowRules, setIsShowRules] = useState(false);
  const handleToggleShowRules = () => setIsShowRules(!isShowRules);
  
  const ExpandIcon = isShowRules ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  const ExpandTitle = isShowRules ? `Свернуть` : `Развернуть`;

  const [isHover, setIsHover] = useState(false);
  const handlePointerEnter = () => setIsHover(true);
  const handlePointerLeave = () => {
    setIsHover(false);
    if (section.title !== newTitle) {
      handleUpdateSection();
    }
  };
  
  const [isHoverEditIcon, setIsHoverEditIcon] = useState(false);
  const handlePointerEditIconOn = () => setIsHoverEditIcon(true);
  const handlePointerEditIconOff = () => setIsHoverEditIcon(false);
  

  const [newTitle, setNewTitle] = useState(section.title);
  const handleEditTitle = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
      // handleBlur();
    }
    const value = e.target.value;
    // if (value !== section.title) {
    //   handleUpdateSection();
    // }
    setNewTitle(value);
  };

  const handleUpdateSection = () => {
    if (section.title !== newTitle) {
      console.log(`Есть изменения, обновляем название секции`);
      const newSection = Object.assign({}, section);
      newSection.lastChange = new Date().toISOString();
      newSection.title = newTitle;

      const idx = docSelected.sections.findIndex((sec) => sec.id === newSection.id);
      if (idx !== -1) {
        docSelected.sections = [...docSelected.sections.slice(0, idx), newSection, ...docSelected.sections.slice(idx + 1)];
        updateDocument(docSelected);
      }
    }
  };

  const handleDeleteSection = () => {
    console.log(`Нажали удалить раздел`);
    // TODO: deleteSection();
  };

  

  return (
    <>
      <div className={classes.container}>
        <UpAndDownAdd type={typeUpDown.SECTION} docSelected={docSelected} section={section} up />
        
        <div className={classes.box}>
          <div className={cl(classes.row, {[classes.hover]: isHover})}>
            <Avatar className={classes.avatar}>
              <InsertDriveFileIcon />
            </Avatar>

            <div className={classes.sprite}>
              <div style={{ display: `flex`, flexDirection: `row`, width: `100%` }}
                onMouseEnter={handlePointerEnter}
                onMouseLeave={handlePointerLeave}
              >
                <Tooltip title="Нажмите, чтобы изменить заголовок раздела" placement="top" arrow enterDelay={1000} enterNextDelay={1000}>
                  <InputBase
                    className={classes.textFieldTitle}
                    value={newTitle}
                    fullWidth
                    placeholder="Введите заголовок раздела"
                    onChange={handleEditTitle} 
                    onKeyDown={handleEditTitle}
                  />
                </Tooltip>
                {
                  isHover &&
                    <>
                      {/* <Tooltip title="Редактировать заголовок раздела" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
                        <IconButton aria-label="Edit"
                          className={cl(classes.editIcon, { [classes.hoverIcon]: isHoverEditIcon })}
                          onMouseEnter={handlePointerEditIconOn}
                          onMouseLeave={handlePointerEditIconOff}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip> */}
                    
                      <DeleteButton type={`section`} icon placement="right" onDel={handleDeleteSection}
                        classname={classes.delIcon} classesActiveDel={classes.hoverIcon} />
                    </>
                }
              </div>

              <Tooltip title={ExpandTitle} placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
                <IconButton onClick={handleToggleShowRules} className={classes.expandIcon}>
                  {ExpandIcon}
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <UpAndDownArrows type={typeUpDown.SECTION} />
        </div>

        <UpAndDownAdd type={typeUpDown.SECTION} docSelected={docSelected} section={section} down/>
      </div>
    </>
  );
};


SectionsModuleRow.propTypes = {
  docSelected: pt.object,
  section: pt.object,
  updateDocument: pt.func.isRequired,
  // ruleStored: pt.object,
};

const mapStateToProps = (state) => ({
  // ruleStored: state.UI.ruleStored,
});


export default connect(mapStateToProps, { updateDocument })(SectionsModuleRow);
