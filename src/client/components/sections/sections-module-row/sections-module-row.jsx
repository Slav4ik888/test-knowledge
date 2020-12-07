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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// Components
import ListSelect from '../../list-select/list-select';
import SectionsContainer from '../../sections/sections-container/sections-container';
import { typeListSelect } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    margin: theme.spacing(2, 0, 4, 0),
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
}));

// item - переданный документ или пользователь
const SectionsModuleRow = ({ onSectionSelected, docSelected, ruleStored }) => {
  const classes = useStyles();

  const placeholder = ruleStored.sectionSelected ? ruleStored.sectionSelected.title : `Не указан`;

  const [isSections, setIsSections] = useState(false);
  const handleSectionsOpen = () => setIsSections(true);
  const handleSectionsClose = () => setIsSections(false);

  return (
    <>
      <div className={classes.row}>
        <Avatar className={classes.avatar}>
          <InsertDriveFileIcon />
        </Avatar>

        <ListSelect
          type={typeListSelect.SECTION}
          title={`Раздел`}
          items={docSelected && docSelected.sections}
          valueField={`title`}
          label={`sections`}
          placeholder={placeholder}
          disabled={!Boolean(docSelected)}
          onSelected={onSectionSelected}
          onItemAdd={handleSectionsOpen}
        />

        <Tooltip title="Редактировать разделы" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton aria-label="Edit" onClick={handleSectionsOpen} className={classes.editIcon}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <SectionsContainer
          open={isSections}
          document={docSelected}
          onClose={handleSectionsClose}
        />
      </div>
    </>
  );
};


SectionsModuleRow.propTypes = {
  docSelected: pt.object,
  onSectionSelected: pt.func.isRequired,
  ruleStored: pt.object,
};

const mapStateToProps = (state) => ({
  ruleStored: state.UI.ruleStored,
});


export default connect(mapStateToProps)(SectionsModuleRow);
