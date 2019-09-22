const express = require('express');
const router = express.Router();
const { Pool } = require('../../middleware');

router.get('/', (req, res) => {
    res.json({
        'Public': 'Test'
    })
});

router.get('/items', (req, res) => {
    Pool.connect((err, client, release) => {
        if (err) {
            return console.log('Error acquiring client', err);
        }else{
            client.query('SELECT * FROM public.items', (err, result) => {
                release();
                if (err) {
                    return console.log('Error Executing query', err);
                }
                res.json(result.rows);
            })
        }
    })
});

/*
router.get('/test', (req, res) => {
    req.pool.connect(err, client, release) => {
        if(err) {
            return
        }
        client.query('SELECT * FROM public.items', (err, result) => {
            release();
            if(err) {
                return
            }
            res.json(result.rows);
        })
        req.release();
    }
    res.json(result.rows);
})
*/

module.exports = router;