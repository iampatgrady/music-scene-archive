'use client';
// components/GenericCRUD.tsx
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from 'firebase/firestore';

interface GenericCRUDProps {
  collectionName: string;
}

interface Document extends DocumentData {
  id: string;
}

const GenericCRUD: React.FC<GenericCRUDProps> = ({ collectionName }) => {
  const [data, setData] = useState<Document[]>([]);
  const [newDocument, setNewDocument] = useState<Partial<Document>>({});
  const [editDocument, setEditDocument] = useState<Document | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents: Document[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
      } catch (e) {
        console.error('Error getting documents: ', e);
      }
    };

    fetchData();
  }, [collectionName]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDocument({
      ...newDocument,
      [event.target.name]: event.target.value,
    });
  };

  const createDocument = async () => {
    try {
      await addDoc(collection(db, collectionName), newDocument);
      setNewDocument({}); // Clear the form
      // Refetch data or update state accordingly
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const editDocumentById = (id: string) => {
    const documentToEdit = data.find((doc) => doc.id === id);
    setEditDocument(documentToEdit ?? null);
  };

  const handleEditInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editDocument) {
      setEditDocument({
        ...editDocument,
        [event.target.name]: event.target.value,
      });
    }
  };

  const updateDocument = async () => {
    try {
      if (editDocument) {
        await updateDoc(doc(db, collectionName, editDocument.id), editDocument);
        setEditDocument(null); // Clear the edit form
        // Refetch data or update state accordingly
      }
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      // Refetch data or update state accordingly
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  return (
    <div>
      <h2>{collectionName}</h2>

      <h3>Add New {collectionName.slice(0, -1)}</h3>
      <div>
        {/* Example input fields - adjust based on your collection */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={(newDocument.name as string) || ''}
          onChange={handleInputChange}
        />
        <button onClick={createDocument}>Create</button>
      </div>

      <h3>Existing {collectionName}</h3>
      <ul>
        {data.map((doc) => (
          <li key={doc.id}>
            {/* Display document data */}
            {Object.entries(doc).map(([key, value]) => (
              <div key={key}>
                {key}: {JSON.stringify(value)}
              </div>
            ))}
            <button onClick={() => editDocumentById(doc.id)}>Edit</button>
            <button onClick={() => deleteDocument(doc.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editDocument && (
        <div>
          <h3>Edit {collectionName.slice(0, -1)}</h3>
          <div>
            {/* Example input fields - adjust based on your collection */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={(editDocument.name as string) || ''}
              onChange={handleEditInputChange}
            />
            <button onClick={updateDocument}>Update</button>
            <button onClick={() => setEditDocument(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCRUD;