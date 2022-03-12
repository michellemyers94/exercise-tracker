// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    'mongodb://localhost:27017/exercise_db',
    { useNewUrlParser: true}
);

// Connect to the database
const db = mongoose.connection;


// The open event is called when the database connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});


/**
 * Defining the Schema
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true },
    reps: {type: Number, required: true },
    weight: {type: Number, required: true },
    unit: {type: String, required: true },
    date: {type: String, required: true },
});

/**
 * Compile the model from the schema. Done after defining the schema.
 */

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * * Create an Exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the json object for the document created by calling save
 */

const createExercise = async (name, reps, weight, unit, date) => {
    // calls the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // calls save to persist this object as a document in MongoDb
    return exercise.save();

}

/**
 * ? Retrieve exercises based on the filter, projection and limit parameters
 * @param filter
 * @param projection
 * @param limit
 * @returns {Promise<Array<HydratedDocument<unknown, {}, {}>>>}
 */

const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}

const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * Replace the name, reps, weight, unit, date properties of the exercise with the id value provided
 * @param _id
 * @param name
 * @param reps
 * @param weight
 * @param unit
 * @param date
 * @returns {Promise<*>}
 */

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, { name: name, reps: reps, weight: weight, unit: unit, date: date});
    console.log(result)
    return result.modifiedCount;
}


/**
 *
 * @param _id
 * @returns {Promise<*>}
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id});
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { createExercise, findExercises, findExerciseById, replaceExercise, deleteById };