import React, { useState } from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
// import { deleteUser, updateUserDetails } from '../../../redux/actions/user-actions';
import { deleteEmployee, updateEmployee } from '../../../redux/actions/data-actions';
// MUI Stuff
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
// Components
import DialogTitle from '../../dialogs/dialog-title/dialog-title';
import EmployeesModuleRow from '../employees-module-row/employees-module-row';
import PositionsModuleRow from '../../positions/positions-module-row/positions-module-row';
import EmployeesStatusRow from '../employees-status-row/employees-status-row';
import DeleteUserButton from '../../buttons/delete-user-button/delete-user-button';
// import CancelSubmitBtn from '../../buttons/cancel-submit-btn/cancel-submit-btn';
import { typePosModule } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
  },
  textField: {
    margin: `10px auto 10px auto`,
  },
  row: {
    display: 'flex',
    alignItems: `center`,
  },
  
  // button: {
  //   marginTop: 30,
  //   position: `relative`,
  //   float: `right`,
  // },
}));

const EmployeesChange = ({ open, onClose, UI: { loading, errors, messages }, deleteEmployee, updateEmployee}) => {

  if (!open) {
    return null;
  }
  const classes = useStyles();
  // const [isChange, setIsChange] = useState(false);

  const [employeeSeleted, setEmployeeSelected] = useState(null);

  const handleEmployeeSelected = (user) => {
    if (user) {
      setEmployeeSelected(user);
      // setIsChange(false);
    } else {
      setEmployeeSelected(null);
      // setIsChange(false);
    }
  };

  const handleSetEmployeeRole = (role) => {
    if (role !== employeeSeleted.role) {
      const employeeChangeRole = employeeSeleted;
      employeeChangeRole.role = role;
      setEmployeeSelected(employeeChangeRole);
      updateEmployee(employeeChangeRole);
      // setIsChange(true);
    }
  };

  const handleDeleteEmployee = () => {
    deleteEmployee(employeeSeleted);
    onClose();
  };

  const handleClose = () => onClose();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateUserDetails(userSeleted);
  //   // setIsChange(false);
  // };

  return (
    <>
      <Dialog disableBackdropClick className={classes.dialog}
        open={open} onClose={handleClose} fullWidth maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>Настройки пользователей</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Typography variant="h5" color="primary">
            {employeeSeleted ? `Сотрудник` : `Выберите сотрудника`}
          </Typography>
          <EmployeesModuleRow onEmployeeSelected={handleEmployeeSelected} />
          
          {
            employeeSeleted &&
              <>
                <Typography variant="h5" color="primary" >Занимаемые должности</Typography>
                <PositionsModuleRow item={employeeSeleted} type={typePosModule.EMPLOYEE} />
              
                <Typography variant="h5" color="primary">Статус в приложении</Typography>
                <EmployeesStatusRow employee={employeeSeleted} onSetRole={handleSetEmployeeRole}/>
              
                <DeleteUserButton onDel={handleDeleteEmployee} />
              </>
          }

          {
            errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )
          }
        </DialogContent>

        <DialogActions className={classes.dialog}>
          {/* <CancelSubmitBtn
            onCancel={handleClose}
            onSubmit={handleSubmit}
            disabled={loading || !isChange}
            loading={loading}
          /> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

EmployeesChange.propTypes = {
  deleteEmployee: pt.func.isRequired,
  updateEmployee: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  // users: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  // users: state.data.users,
});

export default connect(mapStateToProps, {deleteEmployee, updateEmployee})(EmployeesChange);
