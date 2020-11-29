import React, { useState } from 'react';
import pt from 'prop-types';
import cl from 'classnames';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
// Components
import ListSelect from '../../list-select/list-select';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import DocumentsContainer from '../../documents/documents-container/documents-container';
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
      // '& > *': {
      //   margin: theme.spacing(1),
      //   width: theme.spacing(16),
      //   height: theme.spacing(16),
      // },
    },
    paper: {
      width: `100%`,
      padding: theme.spacing(4),
      marginTop: theme.spacing(2),
    },
    paperChip: {
      width: `100%`,
      padding: theme.spacing(1),
      marginTop: theme.spacing(2),
      border: `1px solid #ccc`,
      borderRadius: `5px`,
    },
    block: {
      display: `block`,
    },
    row: {
      display: 'flex',
      alignItems: `center`,
    },
    avatar: {
      marginTop: theme.spacing(1),
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

  const [isDocuments, setIsDocuments] = useState(false);
  const handleDocumentsOpen = () => setIsDocuments(true);
  const handleDocumentsClose = () => setIsDocuments(false);

  // Выбранный раздел
  const [sectionSelected, SetSectionSelected] = useState(null);
  
  const [isSections, setIsSections] = useState(false);
  const handleSectionsOpen = () => setIsSections(true);
  const handleSectionsClose = () => setIsSections(false);
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" >
          Новое правило
        </Typography>

        <div className={classes.row}>
          <Avatar className={classes.avatar}> 
            <FolderIcon />
          </Avatar>

          <ListSelect
            title={`Документ`}
            items={documents}
            valueField={`title`}
            label={`documents`}
            placeholder={`Не указан`}
            onSelected={handleDocSelected}
            onItemAdd={handleDocumentsOpen}
          />

          <Tooltip title="Редактировать документы" placement="bottom" arrow>
            <IconButton aria-label="Edit" onClick={handleDocumentsOpen} className={classes.editIcon}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <DocumentsContainer
            open={isDocuments}
            onClose={handleDocumentsClose}
          />
        </div>

        <PositionsModuleRow item={docSelected} type={typePosModule.DOC} />

        {/* <div className={classes.row}>
          <Avatar className={classes.avatar}>
            <SupervisedUserCircleIcon />
          </Avatar>

          <Tooltip title="Изменить закреплённые должности" disableHoverListener={!Boolean(docSelected)} placement="bottom" arrow>
            <Paper elevation={0} onClick={handlePosEditOpen} className={classes.paperChip}>
              <PositionsListChip positions={posFromDoc} />
            </Paper>
          </Tooltip>

          <Tooltip title="Редактировать должности" placement="bottom" arrow>
            <IconButton aria-label="Edit" onClick={handlePositionsOpen} className={classes.editIcon}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <PositionsAddDocument
            open={posEdit}
            doc={docSelected}
            onClose={handlePosEditClose}
          />
          
          <PositionsContainer
            open={isPositions}
            onClose={handlePositionsClose}
          />
        </div> */}

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
