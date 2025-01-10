import Header from './components/Header';
import NotesBox from './components/NoteBox';
import SideBar from './components/SideBar';
import { useState, useEffect } from 'react';
import './style.css';


export default function NoteManager() {

    const [notesArray, setNotes] = useState([])

    // const endopint = 'http://localhost:4000/'
    const endpoint = 'https://mswgsfgwleficsndtcdz.supabase.co/rest/v1/notes'
    const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zd2dzZmd3bGVmaWNzbmR0Y2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODk1NTAsImV4cCI6MjA1MTE2NTU1MH0.P7jWF0-7Qa2ZcXd4bUvi1M7pOnsbhoZ5O21EoFIXe6Q'

    // Fetch notes from the server
    const fetchData = async () => {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apikey,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNotes(data);
            console.log('Notes loaded successfully:', data);
        } catch (error) {
            console.error('Error loading note:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [editingNote, setEditingNote] = useState(null); // Selected Note to edit

    // Add a new note
    const AddNote = async (note) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apikey,
                },
                body: JSON.stringify(note),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchData();
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    const [showArchivedMessage, setShowArchivedMessage] = useState(false);
    const [flagArchivedMessage, setFlagArchivedMessage] = useState(false);

    // Change the archived status of a note
    const ChangeArchiveStatus = async (note, newIsArchivedValue) => {
        try {
            const updatedNote = {
                id: note.id,
                title: note.title,
                content: note.content,
                isArchived: !newIsArchivedValue,
            };
            const response = await fetch(`${endpoint}?id=eq.${note.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apikey,
                },
                body: JSON.stringify(updatedNote),
            });
            if (!response.ok) {
                throw new Error(`Error al actualizar la nota: ${response.statusText}`);
            }
            setFlagArchivedMessage(newIsArchivedValue);
            setShowArchivedMessage(true);
            fetchData();
            setTimeout(() => {
                setShowArchivedMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error actualizando la nota:', error);
        }
    };

    // Edit a note
    const EditeNote = async (title, text) => {
        try {
            const updatedNote = {
                id: editingNote.id,
                title: title,
                content: text
            };
            const response = await fetch(`${endpoint}?id=eq.${editingNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apikey,
                },
                body: JSON.stringify(updatedNote)
            });
            if (!response.ok) {
                throw new Error(`Error updating the note: ${response.statusText}`);
            }
            setEditingNote(null);
            fetchData();
        } catch (error) {
            console.error('Error updating the note:', error);
        }
    };

    const SelectNoteToEdit = (note) => {
        setEditingNote(note);
    };

    const [showDeletedMessage, setShowDeletedMessage] = useState(false);

    // Remove a note from the box
    const RemoveNoteFromBox = async (noteId) => {
        try {
            const response = await fetch(`${endpoint}?id=eq.${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apikey,
                },
            });
            if (!response.ok) {
                throw new Error(`Error al eliminar la nota: ${response.statusText}`);
            }
            setShowDeletedMessage(true);
            fetchData();
            setTimeout(() => {
                setShowDeletedMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error eliminando la nota:', error);
        }
    };

    // Render the NoteManager component
    return (
        <div className='note-manager'>
            <Header />
            <div className='note-manager-content'>
                <SideBar AddNote={AddNote}
                    editingNote={editingNote}
                    setEditingNote={setEditingNote}
                    EditeNote={EditeNote}
                    showDeletedMessage={showDeletedMessage}
                    showArchivedMessage={showArchivedMessage}
                    flag={flagArchivedMessage}
                />
                <NotesBox RemoveNoteFromBox={RemoveNoteFromBox}
                    onEdit={SelectNoteToEdit}
                    onArchive={ChangeArchiveStatus}
                    notesArray={notesArray}
                />
            </div>
        </div>
    );
}