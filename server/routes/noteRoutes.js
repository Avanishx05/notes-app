const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET /api/notes — Query and return all notes, ordered chronologically descending
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching notes", error: error.message });
  }
});

// POST /api/notes — Persist new document and return 201 Created
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Server error creating note", error: error.message });
  }
});

// DELETE /api/notes/:id — Delete note by ID, return 200 or 404
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    res.status(200).json({ message: "Note deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting note", error: error.message });
  }
});

module.exports = router;