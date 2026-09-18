import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:8000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 1. Lifecycle Data Ingestion (Fetch notes on mount)
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // 2. Controlled Submission Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const response = await axios.post(API_URL, { title, content });
      // Update local state immediately with the new note placed at the top
      setNotes([response.data, ...notes]);
      
      // Clear inputs
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // 3. Interactive Deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Synchronize local state: remove the deleted note without refreshing
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container">
      <h1>Student Notes Manager</h1>

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          required
        ></textarea>
        <button type="submit">Add Note</button>
      </form>

      <div className="notes-list">
        {/* Defensive States: Loading and Empty States */}
        {loading ? (
          <p className="status-message">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="status-message">No notes yet — add one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <div className="note-header">
                <h2>{note.title}</h2>
                <button onClick={() => handleDelete(note._id)} className="delete-btn">
                  Delete
                </button>
              </div>
              <p className="note-content">{note.content}</p>
              <small className="note-date">
                {new Date(note.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;