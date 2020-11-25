import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import List from '@material-ui/core/List';
// Component
import SectionItem from '../section-item/section-item';


const SectionsList = ({ sections, onEdit, onDel }) => {

  return (
    <>
      <List height={200}>
        {sections.map((section) => <SectionItem key={section.id}
            section={section}
            onEdit={onEdit}
            onDel={onDel}
          />)
        }
      </List> 
    </>
  );
}

SectionsList.propTypes = {
  onEdit: pt.func.isRequired,
  onDel: pt.func.isRequired,
  sections: pt.array.isRequired,
};

export default SectionsList;
