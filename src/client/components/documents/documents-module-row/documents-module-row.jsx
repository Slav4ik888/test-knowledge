import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import FolderIcon from '@material-ui/icons/Folder';
// Components
import DocumentsContainer from '../documents-container/documents-container';
import ListSelect from '../../list-select/list-select';
import { typeListSelect } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `flex-end`,
    margin: theme.spacing(2, 0, 4, 0),
    padding: theme.spacing(2, 0, 2, 2),
  },
  avatar: {
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.light,
    cursor: `pointer`,
  },
}));

// item - переданный документ или пользователь
const DocumentsModuleRow = ({ onDocumentSelected, documents, ruleStored }) => {
  const classes = useStyles();

  const placeholder = ruleStored.docSelected ? ruleStored.docSelected.title : `Не указан`;

  const [isDocuments, setIsDocuments] = useState(false);
  const handleDocumentsOpen = () => setIsDocuments(true);
  const handleDocumentsClose = () => setIsDocuments(false);

  return (
    <>
      <div className={classes.row}>
        <Tooltip title="Редактировать документы" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
          <Avatar onClick={handleDocumentsOpen}  className={classes.avatar}> 
            <FolderIcon />
          </Avatar>
        </Tooltip>

        <ListSelect
          type={typeListSelect.DOC}
          title={`Документ`}
          items={documents}
          valueField={`title`}
          label={`documents`}
          placeholder={placeholder}
          onSelected={onDocumentSelected}
          onItemAdd={handleDocumentsOpen}
        />

        {/* <Tooltip title="Редактировать документы" placement="bottom" arrow enterDelay={1000} enterNextDelay={1000}>
          <IconButton aria-label="Edit" onClick={handleDocumentsOpen} className={classes.editIcon}>
            <EditIcon />
          </IconButton>
        </Tooltip> */}
      </div>

      <DocumentsContainer open={isDocuments} onClose={handleDocumentsClose} />
    </>
  );
};


DocumentsModuleRow.propTypes = {
  documents: pt.array.isRequired,
  onDocumentSelected: pt.func.isRequired,
  ruleStored: pt.object,
};

const mapStateToProps = (state) => ({
  documents: state.data.documents,
  ruleStored: state.UI.ruleStored,
});


export default connect(mapStateToProps)(DocumentsModuleRow);
