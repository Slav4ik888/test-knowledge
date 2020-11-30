import React, { useState } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import HowToRegIcon from '@material-ui/icons/HowToReg';
// Components
import { arrFromObj } from '../../../utils/utils';
import { role } from '../../../../types';


const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: `center`,
    margin: theme.spacing(2, 0, 4, 0),
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
  formControl: {
    display: 'flex',
    flexWrap: 'wrap',
    width: `100%`,
    minWidth: 100,
    color: theme.textSecondary,
  },
}));


// item - переданный документ или пользователь
const UsersModuleRow = ({ user, onSetRole, companyProfile }) => {
  const classes = useStyles();

  // Создаём массив из объекта
  const roles = arrFromObj(role); 
  
  // Если выбранный пользователь является Владельцем компании
  const disabled = Boolean(companyProfile.owner === user.email);

  const handleSetRole = (e) => onSetRole(e.target.value);

  return (
    <>      
      <div className={classes.row}>
        <Avatar className={classes.avatar}>
          <HowToRegIcon />
        </Avatar>

        <Tooltip title="Нельзя изменить статус пользователя, на кого зарегистрирован аккаунт компании" disableHoverListener={!disabled} placement="bottom" arrow>
          <FormControl variant="outlined" className={classes.formControl} >
            <InputLabel id={`role-label`}></InputLabel>

            <Select
              labelId={`role-label`}
              id={`role-select`}
              value={user.role}
              onChange={handleSetRole}
              disabled={disabled}
              input={<Input />}
            >
              {
                roles.map((role) => <MenuItem key={role} value={role}>{role}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Tooltip>
      </div>
    </>
  );
};

UsersModuleRow.propTypes = {
  user: pt.object.isRequired,
  companyProfile: pt.object.isRequired,
  onSetRole: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  companyProfile: state.user.companyProfile,
});

export default connect(mapStateToProps)(UsersModuleRow);
