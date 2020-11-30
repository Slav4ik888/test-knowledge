import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import DocumentsModuleRow from '../../documents/documents-module-row/documents-module-row';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import ListSelect from '../../list-select/list-select';
import SectionsContainer from '../../sections/sections-container/sections-container';
import { typePosModule } from '../../../../types';

const useStyles = makeStyles((theme) => {
  // console.log('theme: ', theme);

  return ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: `center`,
      width: `100%`,
      height: `100%`,
      marginTop: theme.spacing(2),
      // '& > *': {
      //   margin: theme.spacing(1),
      //   width: theme.spacing(16),
      //   height: theme.spacing(16),
      // },
    },
    paper: {
      width: `100%`,
    },
    content: {
      padding: theme.spacing(4),
    },
    row: {
      display: 'flex',
      alignItems: `center`,
      margin: theme.spacing(2, 0, 4, 0),
    },
    avatar: { 
      marginRight: theme.spacing(3),
    },
    editIcon: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(3),
    },
  })
});


const RulesContainer = ({ loading, documents }) => {

  if (loading) return null;

  const classes = useStyles();

  // Выбранный документ
  const [docSelected, setDocSelected] = useState(null);
  const handleDocSelected = (doc) => {
    setDocSelected(doc);
  };

  // Выбранный раздел
  const [sectionSelected, SetSectionSelected] = useState(null);
  
  const [isSections, setIsSections] = useState(false);
  const handleSectionsOpen = () => setIsSections(true);
  const handleSectionsClose = () => setIsSections(false);
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <DialogTitle >Новое правило</DialogTitle>
        <div className={classes.content}>

          <DocumentsModuleRow onDocumentSelected={handleDocSelected} />

          <PositionsModuleRow item={docSelected} type={typePosModule.DOC} />

          <div className={classes.row}>
            <Avatar className={classes.avatar}>
              <InsertDriveFileIcon />
            </Avatar>

            <ListSelect
              title={`Раздел`}
              items={docSelected && docSelected.sections}
              valueField={`title`}
              label={`sections`}
              placeholder={`Не указан`}
              disabled={!Boolean(docSelected)}
              onSelected={SetSectionSelected}
              onItemAdd={handleSectionsOpen}
            />

            <Tooltip title="Редактировать разделы" placement="bottom" arrow>
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

          {/* <Button onClick={handleSectionsOpen} disabled={!docSelected}>
            Разделы
          </Button> */}
        
        </div>
      </Paper>
    </div>
  );
};


RulesContainer.propTypes = {
  documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  documents: state.data.documents,
  loading: state.UI.loading,
});

const mapActionsToProps = {
  
};

export default connect(mapStateToProps, mapActionsToProps)(RulesContainer);
