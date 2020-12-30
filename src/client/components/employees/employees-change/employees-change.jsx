import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Readux Stuff
import { connect } from 'react-redux';
import { deleteEmployee } from '../../../redux/actions/data-actions';
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
import DeleteIconAvatar from '../../buttons/delete-icon-avatar/delete-icon-avatar';
import { typeElem } from '../../../../types';


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
}));

const EmployeesChange = ({ open, onClose, UI: { errors }, employees, deleteEmployee}) => {
  if (!open) return null;

  const classes = useStyles();

  const [employeeSeleted, setEmployeeSelected] = useState(null);
  useEffect(() => {
    if (employeeSeleted && employees && employees.length) {
      const updated = employees.find((emp) => emp.email === employeeSeleted.email);
      if (updated) {
        setEmployeeSelected(updated);
      }
    }
  }, [employees]); 
  
  const handleEmployeeSelected = (user) => {
    if (user) {
      setEmployeeSelected(user);
    } else {
      setEmployeeSelected(null);
    }
  };

  const handleDeleteEmployee = () => {
    deleteEmployee(employeeSeleted);
    handleEmployeeSelected(null);
  };

  const handleClose = () => onClose();


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
                <PositionsModuleRow item={employeeSeleted} type={typeElem.EMPLOYEE} />
              
                <Typography variant="h5" color="primary">Статус в приложении</Typography>
                <EmployeesStatusRow employee={employeeSeleted} />
              
                <DeleteIconAvatar type={typeElem.EMPLOYEE} onDel={handleDeleteEmployee} />
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
      </Dialog>
    </>
  );
}

EmployeesChange.propTypes = {
  deleteEmployee: pt.func.isRequired,
  open: pt.bool.isRequired,
  onClose: pt.func.isRequired,
  UI: pt.object.isRequired,
  employees: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.data.employees,
  UI: state.UI,
});

export default connect(mapStateToProps, {deleteEmployee})(EmployeesChange);
