import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000

const app = express();

app.use(express.json());


/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed ' });
        })
});

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found '});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed '});
        })
});

/**
 * Retrieve exercises.
 *
 */

app.get('/exercises', (req, res) => {
    let filter = {};
    //Is there a query paramter named year? if so add a filter based on its value
    if (req.query.reps !==undefined) {
        filter = { reps: req.query.reps };
    }
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.json(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed '});
        })

});


app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            console.log(numUpdated);
            if (numUpdated === 1) {
                res.json({_id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})

            } else {
                res.status(404).json({ Error: 'Resource not found! '});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed '});
        });
});

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' })
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed '});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});