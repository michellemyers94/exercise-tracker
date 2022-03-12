import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';

export const EditExercisePage = ({exerciseToEdit}) => {
   
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if(response.status === 200){
            swal({
                title: "Success!",
                text: "Exercise Edited",
                icon: "success",
                button: "OK",
            });
        } else {
            swal({
                title: "Failed to edit exercise",
                text: `status code = ${response.status}`,
                icon: "error",
                button: "OK",
        });
    }
        history.push("/");

};

return (
    <div>
        <h1>Edit Exercise</h1>

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
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
                </td>

                <td>
                    {/*  weight */}
                <input
                    type="number"
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
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                </td>



            </tr>


            </table>


<button
                onClick={editExercise}
            >Save</button>
        </div>
);

}

export default EditExercisePage;