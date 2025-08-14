import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostAssignment = () => {
  // State for the form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [targetClassId, setTargetClassId] = useState('');

  // State for the dynamic dropdown
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This effect runs when the component loads to fetch the list of classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Fetch the list of classes from your backend API
        const response = await axios.get('http://localhost:8080/api/staff/classes');
        setClasses(response.data); // Store the fetched classes in state
        setError(null);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
        setError("Could not load classes. Please ensure the backend is running and you have created at least one class.");
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };
    
    fetchClasses();
  }, []); // The empty array [] ensures this runs only once when the component mounts

  // This function is called when the form is submitted
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!targetClassId) {
      alert("Please select a target class for the assignment.");
      return;
    }

    // Prepare the data payload to send to the backend
    const assignmentData = {
      title,
      description,
      dueDate,
      courseId: targetClassId,
    };

    try {
      // Send the new assignment data to your backend
      const response = await axios.post('http://localhost:8080/api/staff/assignments', assignmentData);
      alert(`Assignment "${response.data.title}" was posted successfully!`);
      
      // Reset the form fields after successful submission
      setTitle('');
      setDescription('');
      setDueDate('');
      setTargetClassId('');
    } catch (error) {
      console.error("Error posting assignment:", error);
      alert("Failed to post assignment. Please check the console for details.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h3 className="text-2xl font-bold text-dark-purple mb-6">Post a New Assignment</h3>

      {/* Display an error message if fetching classes failed */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Assignment Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="dueDate" className="block text-lg font-medium text-gray-700 mb-2">Deadline</label>
            <input
              type="datetime-local" // Allows selecting both date and time
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dark-purple"
              required
            />
          </div>
          <div>
            <label htmlFor="targetClassId" className="block text-lg font-medium text-gray-700 mb-2">Target Class</label>
            <select
              id="targetClassId"
              value={targetClassId}
              onChange={(e) => setTargetClassId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-dark-purple"
              required
              disabled={loading} // Disable dropdown while classes are loading
            >
              <option value="">
                {loading ? 'Loading classes...' : 'Select a class'}
              </option>
              {/* Map over the fetched classes to create dropdown options */}
              {classes.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-mild-green text-dark-purple p-3 rounded-lg hover:bg-mild-green/80 text-lg font-bold transition-colors"
          disabled={loading}
        >
          Post Assignment
        </button>
      </form>
    </div>
  );
};

export default PostAssignment;
