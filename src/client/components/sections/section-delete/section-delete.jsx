import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument, deleteAllRulesById } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
// Icons
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// Components
import DeleteButton from '../../buttons/delete-button/delete-button';
import { typeUpDown } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  container: {
    // display: 'flex',
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

// Удаляем Section 
const SectionDelete = ({ docSelected, section, updateDocument, deleteAllRulesById }) => {
  const classes = useStyles();

  const handleDeleteSection = () => {
    const idx = docSelected.sections.findIndex((sec) => sec.id === section.id);
    if (idx !== -1) {
      docSelected.sections = [...docSelected.sections.slice(0, idx), ...docSelected.sections.slice(idx + 1)];
      updateDocument(docSelected);
      // Удаление правил которые есть в данной секции
      deleteAllRulesById({ docId: docSelected.id, sectionId: section.id });
    }
  };
  

  return (
    <>
      <div className={classes.container}>
        <DeleteButton type={`section`} icon placement="right" onDel={handleDeleteSection}
                        classname={classes.delIcon} classesActiveDel={classes.hoverIcon} />
      </div>
    </>
  );
};


SectionDelete.propTypes = {
  docSelected: pt.object,
  section: pt.object,
  updateDocument: pt.func.isRequired,
  deleteAllRulesById: pt.func.isRequired,
};

export default connect(undefined, { updateDocument, deleteAllRulesById })(SectionDelete);
