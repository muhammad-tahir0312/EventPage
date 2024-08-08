import React, { useEffect, useState } from 'react';

const ViewEvents = () => {   
    const [data, setData] = useState([]);

    const handleUpdate = (id) => {
        window.location.href = `/${id}`;
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/event/${id}`,{
                method:"DELETE",
                headers:{
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => alert(data.message))
             window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        try {
            fetch('http://localhost:3001/api/event/', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => setData(data))
                .then(error => console.log(error))

        } catch (error) {
            console.log(error);
        }
    })

    return (
        <div id='viewDiv'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Location</th>
                        <th scope="col">Attendees</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.map((el, index) => (
                        <tr key={index}>
                            <td>{el.title}</td>
                            <td>{el.description}</td>
                            <td>{el.date}</td>
                            <td>{el.location}</td>
                            <td>{el.attendees}</td>
                            <td><button onClick={() => handleUpdate(el._id)}>Update</button></td>
                            <td><button onClick={() => handleDelete(el._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewEvents;
