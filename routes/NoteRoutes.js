const express = require('express');
const noteModel = require('../models/NotesModel');
const router = express.Router();

// TODO - Create a new Note
router.post('/notes', (req, res) => {
    console.log("Received POST request:", req.body);
    // Validate request
    if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note title, description, and priority can not be empty"
        });
    }
    // Create a new note
    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority
    });
    // Save the note
    note.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        }));
});

// TODO - Retrieve all Notes
router.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => res.send(notes))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        }));
});

// TODO - Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: err.message || "Error retrieving note with id " + req.params.noteId
        }));
});

// TODO - Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
    // Validate request
    if(!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note title, description, and priority can not be empty"
        });
    }
    // Find note and update it
    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority,
        dateUpdated: Date.now()
    }, { new: true })
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: err.message || "Error updating note with id " + req.params.noteId
        }));
});

// TODO - Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndDelete(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => res.status(500).send({
            message: err.message || "Could not delete note with id " + req.params.noteId
        }));
});

module.exports = router;
