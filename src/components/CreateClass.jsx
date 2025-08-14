import React, { useState } from 'react';
import axios from 'axios';

const CreateClass = () => {
  const [className, setClassName] = useState('');
  const [students, setStudents] = useState([
    { name: '', registerNo: '', email: '', dob: '' },
  ]);

  const handleStudentChange = (index, event) => {
    const newStudents = [...students];
    newStudents[index][event.target.name] = event.target.value;
    setStudents(newStudents);
  };

  const addStudentRow = () => {
    setStudents([...students, { name: '', registerNo: '', email: '', dob: '' }]);
  };

  const removeStudentRow = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { className, students };
    try {
      const response = await axios.post('http://localhost:8080/api/staff/create-class', payload);
      alert(`Class "${response.data.name}" and its students created successfully!`);
      setClassName('');
      setStudents([{ name: '', registerNo: '', email: '', dob: '' }]);
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Failed to create class. Check the console for details.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h3 className="text-2xl font-bold text-dark-purple mb-6">Create a New Class</h3>
      <form onSubmit={handleSubmit}>
        {/* Class Name Input */}
        <div className="mb-8">
          <label htmlFor="className" className="block text-lg font-medium text-gray-700 mb-2">Class Name</label>
          <input
            type="text"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple"
            placeholder="e.g., Computer Science - 2nd Year"
            required
          />
        </div>

        {/* Student List Section */}
        <h4 className="text-xl font-bold mb-4 text-dark-purple">Add Students to Class</h4>
        <div className="space-y-3">
          {/* Header Row for Student Inputs */}
          <div className="grid grid-cols-12 gap-4 px-2 text-sm font-semibold text-gray-600">
            <div className="col-span-1">S.No</div>
            <div className="col-span-3">Student Name</div>
            <div className="col-span-2">Register No.</div>
            <div className="col-span-3">Email ID</div>
            <div className="col-span-3">Date of Birth</div>
          </div>

          {/* Dynamic Student Input Rows */}
          {students.map((student, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <span className="col-span-1 font-bold text-gray-500 text-center">{index + 1}</span>
              <div className="col-span-3">
                <input type="text" name="name" value={student.name} onChange={(e) => handleStudentChange(index, e)} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>
              <div className="col-span-2">
                <input type="text" name="registerNo" value={student.registerNo} onChange={(e) => handleStudentChange(index, e)} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>
              <div className="col-span-3">
                <input type="email" name="email" value={student.email} onChange={(e) => handleStudentChange(index, e)} className="w-full p-2 border border-gray-300 rounded-lg" required />
              </div>
              <div className="col-span-3 flex items-center gap-2">
                <input type="date" name="dob" value={student.dob} onChange={(e) => handleStudentChange(index, e)} className="w-full p-2 border border-gray-300 rounded-lg" required />
                <button type="button" onClick={() => removeStudentRow(index)} className="bg-red-500 text-white h-10 w-10 flex-shrink-0 rounded-lg hover:bg-red-600" disabled={students.length <= 1}>X</button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={addStudentRow}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Add Another Student
          </button>
          <button
            type="submit"
            className="bg-mild-green text-dark-purple px-8 py-3 rounded-lg hover:bg-mild-green/80 text-lg font-bold transition-colors"
          >
            Create Class & Add Students
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClass;
