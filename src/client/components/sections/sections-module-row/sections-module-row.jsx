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
import Collapse from '@material-ui/core/Collapse';
import Card from '@material-ui/core/Card';
// Icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import SectionDelete from '../section-delete/section-delete';
import UpAndDownAdd from '../../buttons/up-and-down-add/up-and-down-add';
import UpAndDownArrows from '../../buttons/up-and-down-arrows/up-and-down-arrows';
import { typeUpDown } from '../../../../types';
import RulesListModule from '../../rules/rules-list-module/rules-list-module';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: `column`,
    width: `100%`,
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
    padding: theme.spacing(1, 2, 1, 2),
    // borderRadius: `10px`,
    // border: `1px solid`,
    // borderColor: theme.border.light,
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
    backgroundColor: theme.palette.primary.light,
  },
  textFieldTitle: {
    fontSize: theme.fontSize.section,
    fontColor: theme.palette.fontColor.section,
    fontWeight: theme.fontWeight.section,
  },
  // editIcon: {
  //   marginRight: theme.spacing(1),
  //   color: theme.palette.background.bodyfield,
  // },
  // delIcon: {
  //   marginRight: theme.spacing(1),
  // },
  // hoverIcon: {
  //   color: theme.palette.background.iconHover,
  // },
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
}));


const SectionsModuleRow = ({ docSelected, section, updateDocument }) => {
  
  // if (loading) return null;
  const classes = useStyles();

  // Рендер rules
  const [isShowRules, setIsShowRules] = useState(false);
  const handleToggleShowRules = () => setIsShowRules(!isShowRules);
  
  const [isHover, setIsHover] = useState(false);
  const handlePointerEnter = () => setIsHover(true);
  const handlePointerLeave = () => {
    setIsHover(false);
    if (section.title !== newTitle) {
      handleUpdateSection();
    }
  };

  const [newTitle, setNewTitle] = useState(section.title);
  const handleEditTitle = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.target.blur();
    }
    const value = e.target.value;
    setNewTitle(value);
  };

  // Сохраняем при изменении title 
  const handleUpdateSection = () => {
    if (section.title !== newTitle) {
      const updatedSection = Object.assign({}, section);
      updatedSection.lastChange = new Date().toISOString();
      updatedSection.title = newTitle;

      const idx = docSelected.sections.findIndex((sec) => sec.id === updatedSection.id);
      if (idx !== -1) {
        docSelected.sections = [...docSelected.sections.slice(0, idx), updatedSection, ...docSelected.sections.slice(idx + 1)];
        updateDocument(docSelected);
      }
    }
  };

  return (
    <>
      <div className={classes.container}>
        <UpAndDownAdd type={typeUpDown.SECTION} docSelected={docSelected} section={section} up />
        
        <Card className={classes.box} >
        
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
                  isHover && <>
                    <SectionDelete docSelected={docSelected} section={section} />
                    <UpAndDownArrows type={typeUpDown.SECTION} docSelected={docSelected} section={section} />
                  </>
                }
              </div>


              <IconButton
                className={cl(classes.expand, { [classes.expandOpen]: isShowRules })}
                onClick={handleToggleShowRules}
                aria-expanded={isShowRules}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </div>
        </Card>

        <UpAndDownAdd type={typeUpDown.SECTION} docSelected={docSelected} section={section} down/>
      </div>

      <Collapse in={isShowRules} timeout="auto" unmountOnExit>
        <RulesListModule docSelected={docSelected} section={section} />
      </Collapse>
    </>
  );
};


SectionsModuleRow.propTypes = {
  // loading: pt.bool.isRequired,
  docSelected: pt.object,
  section: pt.object,
  // rules: pt.array.isRequired,
  updateDocument: pt.func.isRequired,
  // getAllRulesById: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  // rules: state.data.rules,
  // loading: state.UI.loading,
});


export default connect(mapStateToProps, { updateDocument })(SectionsModuleRow);
