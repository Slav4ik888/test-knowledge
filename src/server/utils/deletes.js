// [START delete_document]
async function deleteDocument(db, pathCollection, pathDoc) {
  const res = await db.collection(pathCollection)
    .doc(pathDoc)
    .delete();

  console.log('Delete: ', res);
};
// [END delete_document]

async function deleteUsersCollection(db, docPath, batchSize) {
  const collectionRef = db.collection(`users`).doc(docPath).collection(`users`);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
};

// [START firestore_data_delete_collection]
async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
};

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  console.log('batchSize: ', batchSize);
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  console.log('batch: ', batch);
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
};

// [END firestore_data_delete_collection]
module.exports = { deleteDocument, deleteCollection, deleteUsersCollection };
