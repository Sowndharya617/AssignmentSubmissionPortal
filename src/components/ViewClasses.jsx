import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddStudentsModal from './AddStudentsModal'; // Import the new modal component

const ViewClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);
    
    // State to manage the "Add Students" modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/staff/classes');
            setClasses(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch classes.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleCardClick = (courseId) => {
        setExpandedCardId(prev => prev === courseId ? null : courseId);
    };

    const openAddStudentsModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    if (loading) return <div className="text-center p-8">Loading classes...</div>;
    if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

    return (
        <div className="w-full">
            <h3 className="text-2xl font-bold text-dark-purple mb-6">Created Classes</h3>
            
            {/* Render the modal conditionally */}
            {isModalOpen && (
                <AddStudentsModal 
                    course={selectedCourse} 
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchClasses} // Refresh the class list on success
                />
            )}

            {classes.length === 0 ? (
                <p className="text-gray-500">No classes have been created yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {classes.map((course) => (
                        <div key={course.courseId} className="bg-white backdrop-blur-sm p-4 rounded-lg shadow-md flex flex-col">
                            <div className="cursor-pointer" onClick={() => handleCardClick(course.courseId)}>
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-bold text-dark-purple">{course.courseName}</h4>
                                    <span className="text-sm font-semibold bg-mild-green text-dark-purple px-2 py-1 rounded-full">
                                        {course.students.length} Students
                                    </span>
                                </div>
                            </div>

                            {expandedCardId === course.courseId && (
                                <div className="mt-4 pt-4 border-t">
                                    <h5 className="font-semibold text-gray-700 mb-2">Student List:</h5>
                                    <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                        {course.students.map((student, index) => (
                                            <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                                <strong>{student.name}</strong> ({student.registerNo})
                                                <br />
                                                <span className="text-xs text-gray-500">{student.email}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* "Add Students" button */}
                            <div className="mt-4 pt-4 border-t">
                                <button 
                                    onClick={() => openAddStudentsModal(course)}
                                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Add New Students
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewClasses;