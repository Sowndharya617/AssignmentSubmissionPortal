import React, { useState } from 'react';
import axios from 'axios';

const AddStudentsModal = ({ course, onClose, onSuccess }) => {
    const [students, setStudents] = useState([{ name: '', registerNo: '', email: '', dob: '' }]);
    const [error, setError] = useState('');

    const handleStudentChange = (index, event) => {
        const newStudents = [...students];
        newStudents[index][event.target.name] = event.target.value;
        setStudents(newStudents);
    };

    const addStudentRow = () => {
        setStudents([...students, { name: '', registerNo: '', email: '', dob: '' }]);
    };

    const removeStudentRow = (index) => {
        setStudents(students.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post(`http://localhost:8080/api/staff/classes/${course.courseId}/students`, { students });
            alert(`Successfully added students to ${course.courseName}!`);
            onSuccess(); // This will trigger a refresh on the main page
            onClose();   // This will close the modal
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to add students. Please try again.");
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl text-dark-purple">
                <h3 className="text-2xl font-bold mb-4">Add Students to "{course.courseName}"</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
                        {students.map((student, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                <span className="font-bold text-gray-500 hidden md:block">{index + 1}</span>
                                <input type="text" name="name" value={student.name} onChange={(e) => handleStudentChange(index, e)} className="p-2 border rounded" placeholder="Student Name" required />
                                <input type="text" name="registerNo" value={student.registerNo} onChange={(e) => handleStudentChange(index, e)} className="p-2 border rounded" placeholder="Register No." required />
                                <input type="email" name="email" value={student.email} onChange={(e) => handleStudentChange(index, e)} className="p-2 border rounded" placeholder="Email ID" required />
                                <div className="flex items-center gap-2">
                                    <input type="date" name="dob" value={student.dob} onChange={(e) => handleStudentChange(index, e)} className="flex-1 p-2 border rounded" required />
                                    <button type="button" onClick={() => removeStudentRow(index)} className="bg-red-500 text-white h-10 w-10 flex-shrink-0 rounded" disabled={students.length <= 1}>X</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6 pt-6 border-t">
                        <button type="button" onClick={addStudentRow} className="bg-gray-600 text-white px-4 py-2 rounded">Add Row</button>
                        <div>
                            <button type="button" onClick={onClose} className="text-gray-600 mr-4">Cancel</button>
                            <button type="submit" className="bg-mild-green text-dark-purple px-6 py-2 rounded font-bold">Save Students</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentsModal;
