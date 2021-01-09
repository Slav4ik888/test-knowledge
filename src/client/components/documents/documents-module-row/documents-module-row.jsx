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

// 
const DocumentsModuleRow = ({ onDocumentSelected, documents, activeDocument }) => {
  const classes = useStyles();

  const placeholder = activeDocument ? activeDocument.title : `Не указан`;

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

      </div>

      <DocumentsContainer open={isDocuments} onClose={handleDocumentsClose} />
    </>
  );
};


DocumentsModuleRow.propTypes = {
  documents: pt.array.isRequired,
  onDocumentSelected: pt.func.isRequired,
  activeDocument: pt.object,
};

const mapStateToProps = (state) => ({
  documents: state.data.documents,
  activeDocument: state.data.activeDocument,
});


export default connect(mapStateToProps)(DocumentsModuleRow);
