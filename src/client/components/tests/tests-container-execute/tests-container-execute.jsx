import React, {useState} from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// import {  } from '../../../redux/actions/data-actions';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Component
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import ListSelect from '../../list-select/list-select';
import { getPositionsByUser } from '../../../utils/utils';
import { typeListSelect } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
    minHeight: `300px`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.bodyfield,
  },
}));


// Запуск тестирования
const TestsContainerExecute = ({ open, onClose, errors, allPositions, userEmail, employees }) => {
  
  if (!open) return null;
  
  const classes = useStyles();

  const userPositions = employees.find(employee => employee.email === userEmail).positions;
  const positions = getPositionsByUser(userPositions, allPositions);

  const placeholder = `Не выбрана`;
  const listTitle = `Должность для тестирования`;
  
  // Выбранная должность для тестирования
  const [posSeleted, setPosSelected] = useState(positions.length ? positions[0].title : null);
  console.log('posSeleted: ', posSeleted);
  const handleSetPosSelected = (pos) => setPosSelected(pos);


  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        disableBackdropClick fullWidth
        className={classes.dialog} maxWidth="sm" scroll={`paper`}
        open={open} onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>Тестирование</DialogTitle>

        <DialogContent dividers className={classes.container} >
          
          <ListSelect
            type={typeListSelect.POSITION}
            title={listTitle}
            items={positions}
            valueField={`title`}
            label={`positions`}
            placeholder={placeholder}
            onSelected={handleSetPosSelected}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

TestsContainerExecute.propTypes = {
  // createDocument: pt.func.isRequired,
  // updateDocument: pt.func.isRequired,
  // deleteDocument: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  errors: pt.object.isRequired,
  // userPositions: pt.array,
  allPositions: pt.array.isRequired,
  userEmail: pt.string,
  employees: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  // userPositions: state.user.userProfile.positions,
  userEmail: state.user.userProfile.email,
  employees: state.data.employees,
  allPositions: state.data.positions,
});

const mapActionsToProps = {
  // createDocument,
  // updateDocument,
  // deleteDocument,
};

export default connect(mapStateToProps, mapActionsToProps)(TestsContainerExecute);
