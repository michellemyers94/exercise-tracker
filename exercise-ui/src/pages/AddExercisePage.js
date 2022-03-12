import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');


    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            swal({
                title: "Succeess!",
                text: "Exercise Added",
                icon: "success",
                button: "OK",
            });
        } else {
            swal({
                title: "Failed to add exercise",
                text: `status code = ${response.status}`,
                icon: "error",
                button: "OK",
            });
        }
        history.push("/");
    };

    return (
        <div>
        <h1>Add Exercise</h1>
        <table id="exercises">
            <thead>
            <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Unit</th>
                <th>Date</th>

            </tr>
            </thead>
            <tbody>
            <tr>
                <td> 

                    {/* exercise name */}
                <input
                    type="text"
                    placeholder="Enter Exercise Here"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                </td>

                <td>
                    {/*  reps */}
                <input 
                    type="number"
                    placeholder="# of reps"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                </td>

                <td>
                    {/*  weight */}
                <input
                    type="number"
                    placeholder="Enter Weight"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                </td>

                <td>
                    {/* unit */}
                    <input
                    type="string"
                    value={unit}
                    onChange={e => setUnit(e.target.value)} />
                </td>

                <td>
                <input
                    type="string"
                    placeholder="MM-DD-YY"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                </td>



            </tr>
            </tbody>

            </table>

<button onClick={addExercise}>Add</button>
        </div>
    );
}
export default AddExercisePage;