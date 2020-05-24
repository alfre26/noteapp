'use strict'
const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('./links/add');
});

router.post('/add', async (req, res) =>{
    const {name, descripcion} = req.body;
    const newNote = {
        name,
        descripcion
    };
    await pool.query("INSERT INTO note SET ?", [newNote]);
    res.redirect('/links/list');
});

router.get('/list', async (req, res) =>{
    const note = await pool.query('SELECT * FROM note');
    res.render('./links/list', {note});
    
});

router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM note WHERE id = ?', [id]);
    res.redirect('/links/list'); 
});

router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const note = await pool.query('SELECT * FROM note WHERE id = ?', [id]);
    console.log(note[0]);
    res.render('links/edit', {note: note[0]});
});

router.post('/edit/:id',async (req, res) => {
    const {id} = req.params;
    const {name, descripcion} = req.body;
    const newNote = {
        name,
        descripcion
    };

    await pool.query('UPDATE note SET ? WHERE id = ?',[newNote,id]);
    res.redirect('/links/list');

});


  



module.exports = router;