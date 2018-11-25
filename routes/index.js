import express from 'express';
import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fil_rouge',
});

connection.connect(err => {
  if(err) {
    console.log('Error : ', err);
  } else {
    console.log('Connecté !');
  }
});

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  connection.query('SELECT * FROM moto', (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results);
    }
  })
});

router.get('/api/names', (req, res) => {
  connection.query('SELECT model, cc FROM moto', (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results);
    }
  })
});

router.get('/api/contain', (req, res) => {
  connection.query('SELECT * FROM moto WHERE model LIKE "%M%"', (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results);
    }
  })
});

router.get('/api/start', (req, res) => {
  connection.query('SELECT * FROM moto WHERE model LIKE "M%"', (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results);
    }
  })
});

router.get('/api/sup', (req, res) => {
  connection.query('SELECT * FROM moto WHERE cc >= 1000', (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results);
    }
  })
});

router.get('/api/sort', (req, res) => {
  connection.query('SELECT * FROM moto ORDER BY date', (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log(results);
      res.json(results);
    }
  })
});

router.post('/api/add', (req, res) => {
  const formData = req.body;
  console.log(formData);
  connection.query('INSERT INTO moto SET ?', formData, (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500).send('Erreur lors de la sauvegarde de la moto !');
    } else {
      console.log(results);
      res.sendStatus(200);
    }
  })
});

router.put('/api/modif/:id', (req, res) => {
  const formData = req.body, idMoto = req.params.id;
  connection.query('UPDATE moto SET ? WHERE id=?', [formData, idMoto], (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500).send('Erreur lors de la modification de la moto !');
    } else {
      console.log(results);
      res.sendStatus(200);
    }
  })
});

router.put('/api/toggle/:id', (req, res) => {
  const formData = req.body, idMoto = req.params.id;
  connection.query('UPDATE moto SET good=? WHERE id=?', [formData, idMoto], (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500).send('Erreur lors de la modification de la moto !');
    } else {
      console.log(results);
      res.sendStatus(200);
    }
  })
});

router.delete('/api/delete/:id', (req, res) => {
  const idMoto = req.params.id;
  connection.query('DELETE FROM moto WHERE id=?', [idMoto], (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500).send('Erreur lors de la suppression de la moto !');
    } else {
      console.log(results);
      res.sendStatus(200);
    }
  })
});

router.delete('/api/delete/false', (req, res) => {;
  connection.query('DELETE FROM moto WHERE good=false', (err, results) => {
    if(err) {
      console.log(err);
      res.sendStatus(500).send('Erreur lors de la suppression de la moto !');
    } else {
      console.log(results);
      res.sendStatus(200);
    }
  })
});

export default router;