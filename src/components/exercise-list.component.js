import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// const Exercise = props => (
//     <tr>
//       <td>{props.exercise.username}</td>
//       <td>{props.exercise.description}</td>
//       <td>{props.exercise.duration}</td>
//       <td>{props.exercise.date.substring(0,10)}</td>
//       <td>
//         <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
//       </td>
//     </tr>
//   )


const ExercisesList = () => {

    const [exercises,setExercises] = useState({exercises: []});

    useEffect(()=>{
        axios.get('http://localhost:5000/exercises/')
      .then(response => {
        setExercises({ exercises: response.data });
        
      })
      .catch((error) => {
        console.log(error);
      })
    },[]);

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

      setExercises({exercises:exercises.exercises.filter(el => el._id !== id)})
    
    }
    
   


    return ( 
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.exercises.map(currentexercise => {
            //return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
            return  (
                <tr key={currentexercise._id}>
                  <td>{currentexercise.username}</td>
                  <td>{currentexercise.description}</td>
                  <td>{currentexercise.duration}</td>
                  <td>{currentexercise.date.substring(0,10)}</td>
                  <td>
                    <button  className="btn btn-small btn-info"><Link to={"/edit/"+currentexercise._id}>edit</Link></button> | <button className="btn btn-small btn-danger" onClick={() => { deleteExercise(currentexercise._id) }}>delete</button>
                  </td>
                </tr>
              )
              
          })}
          </tbody>
        </table>
        </div>
    );
}
 
export default ExercisesList;