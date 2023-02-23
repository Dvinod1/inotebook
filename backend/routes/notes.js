const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
const Note = require('../models/Note')
const {
    body,
    validationResult
} = require('express-validator');

//Route 1: Get All the notes Using  : GET "./api/auth/fatchallNotes". login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {

        const notes = await Note.find({
            user: req.user.id
        });
        res.json(notes)
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router


//Route 2: Add a new notes Using  : POST "./api/auth/addnote". login required
router.post('/addnote', fetchUser, [

    body('title', 'Enter a valid title ').isLength({
        min: 4
    }),
    body('description', 'Enter a valid description').isLength({
        min: 4
    }),
    //if there are errors , return Bad request and the errors
], async (req, res) => {
    try {


        const {
            title,
            description,
            tag
        } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()

            })
        }
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route3 :Update an exiting note using : Put "/api/auth/updatenote". login required.
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {


        const {
            title,
            description,
            tag,
        } = req.body;
        // Create a new Note object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (tag) {
            newNote.tag = tag
        }
        if (description) {
            newNote.description = description
        }

        //Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //if note user is not same to req user 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed to user someone's data ")
        }
        note = await Note.findByIdAndUpdate(req.params.id, {
            $set: newNote
        }, {
            new: true
        })
        res.json({
            note
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//Route3 :Delete an exiting note using : Delete "/api/auth/deletenote". login required.
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {


        //Find the note to be deleted and delete it 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //allow delete if the user owns it ...
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed to user someone's data ")
        }
        note = await Note.findByIdAndDelete(req.params.id, {})
        res.json({
            "Success": "note hase been deleted",
            note: note
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router