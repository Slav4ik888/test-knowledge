import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
// MUI Stuff

// Component
import SectionsModuleRow from '../sections-module-row/sections-module-row';
import NewRowCreate from '../../buttons/new-row-create/new-row-create';
import { typeElem } from '../../../../types';
import { sortingArr } from '../../../utils/utils';


// В открытом document выводит список всех section в виде модулей с вложенными rules
const SectionsListModule = ({ activeDocument }) => {
  if (!activeDocument) return null;

  let sectionsShow = [];

  // Получаем sections отсортированные по order
  sectionsShow = sortingArr(activeDocument.sections, `order`);

  return (
    <>
      {
        sectionsShow.length ?
          sectionsShow.map((section) => <SectionsModuleRow key={`${activeDocument.id} ${section.id}`}
              section={section}
              docSelected={activeDocument}
            />) : <NewRowCreate type={typeElem.SECTION} docSelected={activeDocument} />
      }

    </>
  );
}

SectionsListModule.propTypes = {
  activeDocument: pt.object,
  // documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  // loading: state.UI.loading,
  // documents: state.data.documents,
  activeDocument: state.data.activeDocument,
});


export default connect(mapStateToProps)(SectionsListModule);
