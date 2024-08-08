import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateEvent = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [attendees, setAttendees] = useState("");
    const [location, setLocation] = useState(""); 

    const { id } = useParams();

    const handleUpdate = async (event) => {
        event.preventDefault(); 
        try {
            const response = await fetch(`http://localhost:3001/api/event/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    date,
                    location,
                    attendees,
                    description: desc
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert(result.message); 
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleView = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/event/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const eventData = await response.json();

            if (eventData.length > 0) {
                const event = eventData[0];
                setTitle(event.title || "");
                setDesc(event.description || "");
                setDate(event.date.substring(0, 10) || ""); // Extract date in YYYY-MM-DD format
                setLocation(event.location || "");
                setAttendees(event.attendees || "");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleView();
    }); 

    return (
        <div className='reg'>
            <form id='regform' onSubmit={handleUpdate}>
                <div className="form-group">
                    <label htmlFor="titleInput">Title</label>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                        id="titleInput"
                        value={title} 
                    />
                    <small id="titleHelp" className="form-text">We'll never share your title with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="descInput">Description</label>
                    <input
                        onChange={(e) => setDesc(e.target.value)}
                        type="text"
                        className="form-control"
                        id="descInput"
                        value={desc}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateInput">Date</label>
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        className="form-control"
                        id="dateInput"
                        value={date} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="locationInput">Location</label>
                    <input
                        onChange={(e) => setLocation(e.target.value)}
                        type="text"
                        className="form-control"
                        id="locationInput"
                        value={location} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="attendeesInput">Attendees</label>
                    <input
                        onChange={(e) => setAttendees(e.target.value)}
                        type="number"
                        className="form-control"
                        id="attendeesInput"
                        value={attendees} 
                    />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    );
};

export default UpdateEvent;