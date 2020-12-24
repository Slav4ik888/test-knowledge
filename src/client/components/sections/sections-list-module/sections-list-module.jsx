import React from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff

// Component
import SectionsModuleRow from '../sections-module-row/sections-module-row';
import NewRowCreate from '../../buttons/new-row-create/new-row-create';
import { typeUpDown } from '../../../../types';
import { sortingArr } from '../../../utils/utils';


// В открытом document выводит список всех section в виде модулей с вложенными rules
const SectionsListModule = ({ activeDocument, documents }) => {
  
  if (!activeDocument) return null;
  
  const document = documents.find((doc) => doc.id === activeDocument.id);
  // Получаем sections отсортированные по order
  let sectionsShow = [];

  if (document) {
    sectionsShow = sortingArr(document.sections, `order`);
  }

  return (
    <>
      {
        sectionsShow.length ?
          sectionsShow.map((section) => <SectionsModuleRow key={section.id}
              section={section}
              docSelected={activeDocument}
            />) : <NewRowCreate type={typeUpDown.SECTION} docSelected={activeDocument} />
      }

    </>
  );
}

SectionsListModule.propTypes = {
  activeDocument: pt.object,
  documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  documents: state.data.documents,
  activeDocument: state.data.activeDocument,
});


export default connect(mapStateToProps)(SectionsListModule);
