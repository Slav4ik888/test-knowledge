import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
// Components
import EmployeeAdd from '../employee-add/employee-add';
import ListSelect from '../../list-select/list-select';
import { typeListSelect } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    margin: theme.spacing(2, 0, 4, 0),
  },
  avatar: {
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.light,
    // cursor: `pointer`,
  },
}));


const EmployeesModuleRow = ({ onEmployeeSelected, employees, disabled }) => {
  const classes = useStyles();
  
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const handleAddEmployeeOpen = () => setOpenAddEmployee(true);
  const handleAddEmployeeClose = () => setOpenAddEmployee(false);

  const handleUserSelected = (employee) => onEmployeeSelected(employee);

  return (
    <>
      <div className={classes.row}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>

        <ListSelect
          type={typeListSelect.EMPLOYEE}
          // title={`Выберите сотрудника`}
          disabled={disabled}
          items={employees}
          valueField={`email`}
          label={`employees`}
          placeholder={`Не выбран`}
          onSelected={handleUserSelected}
          onItemAdd={handleAddEmployeeOpen}
          itemTextAdd={`пригласить нового`}
        />
        
      </div>
      <EmployeeAdd open={openAddEmployee} onClose={handleAddEmployeeClose}/>
    </>
  );
};

EmployeesModuleRow.propTypes = {
  employees: pt.array.isRequired,
  onEmployeeSelected: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.data.employees,
});

export default connect(mapStateToProps)(EmployeesModuleRow);
