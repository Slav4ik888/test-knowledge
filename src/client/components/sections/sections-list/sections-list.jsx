import React from 'react';
import pt from 'prop-types';
// MUI Stuff
import List from '@material-ui/core/List';
// Component
import SectionItem from '../section-item/section-item';


const SectionsList = ({ documents, idxDoc, onEdit, onDel }) => {
  const sections = documents[idxDoc].sections;
  console.log('sections: ', sections);
  if (!sections) return null;

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
  documents: pt.array.isRequired,
  idxDoc: pt.number.isRequired,
};

export default SectionsList;
