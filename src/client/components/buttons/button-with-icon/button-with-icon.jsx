import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({children, onClick, btnClassName, title, titleClassName, placement}) => {
  return (
    <Tooltip title={title} className={titleClassName} placement={placement} arrow enterDelay={1000} enterNextDelay={1000}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  )
};
