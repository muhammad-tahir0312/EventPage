import React, { useState } from 'react';

const Register = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [attendees, setAttendees] = useState("");
    const [location, setLocation] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const eventRegister = async () => {
        try {
            await fetch('http://localhost:3001/api/event/register', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: desc,
                date: date,
                attendees: attendees,
                location: location
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => handleFinal(data))
            .catch(error => alert(error));
        } catch (error) {
            alert(error);
        }
    };

    const handleFinal = (data) => {
        const form = document.querySelector(".r2");
        form.innerHTML = `<h3>Registeration is successfull</h3><h4>ID: ${data.id}</h4> <h4>Title: ${data.title}</h4>`;
        setShowConfirmation(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        eventRegister();
    };

    return (
        <div className='reg'>
            <form id='regform'>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input onChange={(e) => { setTitle(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter title" />
                    <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input onChange={(e) => { setDesc(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Description" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputDate">Date</label>
                    <input onChange={(e) => { setDate(e.target.value) }} type="date" className="form-control" id="exampleInputDate" placeholder="Enter date" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputLocation">Location</label>
                    <input onChange={(e) => { setLocation(e.target.value) }} type="text" className="form-control" id="exampleInputLocation" placeholder="Location" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputAttendees">Attendees</label>
                    <input onChange={(e) => { setAttendees(e.target.value) }} type="text" className="form-control" id="exampleInputAttendees" placeholder="Attendees" />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn">Submit</button>
            </form>

            <div className="r2" style={{ display: showConfirmation ? 'block' : 'none' }}>
            </div>
        </div>
    )
}

export default Register;