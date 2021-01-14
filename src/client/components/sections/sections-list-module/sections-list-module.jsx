import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
// Readux Stuff
import { connect } from 'react-redux';
import { updateDocument } from '../../../redux/actions/data-actions';
// MUI Stuffsrc/client

// Component
import SectionsModuleRow from '../sections-module-row/sections-module-row';
import AddIconRow from '../../buttons/add-icon-row/add-icon-row';
import NewRowCreate from '../../buttons/new-row-create/new-row-create';
import { typeElem } from '../../../../types';
import { sortingArr } from '../../../utils/utils';


// В открытом document выводит список всех section в виде модулей с вложенными rules
const SectionsListModule = ({ errors, activeDocument, updateDocument }) => {
  if (!activeDocument) return null;

  let sectionsShow = [];

  // Получаем sections отсортированные по order
  sectionsShow = sortingArr(activeDocument.sections, `order`);

  return (
    <>
      {
        sectionsShow.length ? <>
          <AddIconRow up type={typeElem.SECTION} items={activeDocument} item={sectionsShow[0]} onAdd={updateDocument} />
          {
            sectionsShow.map((section) => <SectionsModuleRow key={`${activeDocument.id} ${section.id}`}
              section={section}
              docSelected={activeDocument}
            />)
          }
          </> : <NewRowCreate type={typeElem.SECTION} docSelected={activeDocument} />
      }

    </>
  );
}

SectionsListModule.propTypes = {
  errors: pt.object.isRequired,
  activeDocument: pt.object,
  updateDocument: pt.func.isRequired,
  // documents: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.UI.errors,
  // documents: state.data.documents,
  activeDocument: state.data.activeDocument,
});


export default connect(mapStateToProps, { updateDocument })(SectionsListModule);
