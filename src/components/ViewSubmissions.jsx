import React, { useState, useEffect } from 'react';
import axios from 'axios';

// A new component for the Modal popup
const AnswerModal = ({ submission, onClose }) => {
    if (!submission) return null;

    return (
        // Backdrop - Corrected background color
        <div className="fixed inset-0 bg-white/75 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            {/* Modal Content */}
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl text-dark-purple" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold">Submission by: {submission.studentName}</h3>
                    <button onClick={onClose} className="text-2xl font-bold">&times;</button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Submitted Answer:</h4>
                    <p className="whitespace-pre-wrap">{submission.answerText || "No answer text submitted."}</p>
                </div>
            </div>
        </div>
    );
};


const ViewSubmissions = () => {
    const [assignments, setAssignments] = useState([]);
    const [loadingAssignments, setLoadingAssignments] = useState(true);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);
    const [gradeInputs, setGradeInputs] = useState({});
    
    // NEW STATE: To control the answer modal
    const [viewingSubmission, setViewingSubmission] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/staff/assignments');
                setAssignments(response.data);
            } catch (error) { console.error("Failed to fetch assignments:", error); } 
            finally { setLoadingAssignments(false); }
        };
        fetchAssignments();
    }, []);

    const handleAssignmentClick = async (assignment) => {
        if (selectedAssignment && selectedAssignment.id === assignment.id) {
            setSelectedAssignment(null);
            return;
        }
        setSelectedAssignment(assignment);
        setLoadingSubmissions(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/staff/assignments/${assignment.id}/submissions`);
            setSubmissions(response.data);
        } catch (error) { console.error(`Failed to fetch submissions for assignment ${assignment.id}:`, error); } 
        finally { setLoadingSubmissions(false); }
    };

    const handleGradeInputChange = (submissionId, value) => {
        setGradeInputs(prev => ({ ...prev, [submissionId]: value }));
    };

    const handleGradeSubmit = async (submissionId) => {
        const grade = gradeInputs[submissionId];
        if (!grade || grade.trim() === '') {
            alert("Please enter a grade.");
            return;
        }
        try {
            await axios.put(`http://localhost:8080/api/staff/submissions/${submissionId}/grade`, { grade });
            handleAssignmentClick(selectedAssignment);
            alert("Grade submitted successfully!");
        } catch (error) {
            console.error(`Failed to grade submission ${submissionId}:`, error);
            alert("Failed to submit grade.");
        }
    };

    return (
        <div className="w-full">
            <h3 className="text-2xl font-bold text-dark-purple mb-6">View Submissions</h3>
            
            {/* Render the Answer Modal */}
            <AnswerModal submission={viewingSubmission} onClose={() => setViewingSubmission(null)} />

            {loadingAssignments ? <p>Loading assignments...</p> : (
                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <div key={assignment.id} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => handleAssignmentClick(assignment)}>
                                <h4 className="text-lg font-bold text-dark-purple">{assignment.title}</h4>
                                <span className="text-sm text-gray-500">Due: {new Date(assignment.dueDate).toLocaleString()}</span>
                            </div>

                            {selectedAssignment && selectedAssignment.id === assignment.id && (
                                <div className="mt-4 pt-4 border-t">
                                    {loadingSubmissions ? <p>Loading submissions...</p> : (
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="p-2">Student Name</th>
                                                    <th className="p-2">Register No.</th>
                                                    <th className="p-2">Status</th>
                                                    <th className="p-2">Grade</th>
                                                    <th className="p-2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {submissions.map((sub) => (
                                                    <tr key={sub.studentId} className="border-b">
                                                        <td className="p-2">
                                                            {/* Make the student name a clickable button */}
                                                            <button 
                                                                onClick={() => setViewingSubmission(sub)} 
                                                                className="text-blue-600 hover:underline font-semibold"
                                                                disabled={!sub.submissionId}
                                                            >
                                                                {sub.studentName}
                                                            </button>
                                                        </td>
                                                        <td className="p-2">{sub.registerNo}</td>
                                                        <td className="p-2">{sub.status}</td>
                                                        <td className="p-2">{sub.grade || '--'}</td>
                                                        <td className="p-2">
                                                            {sub.status === "Submitted" && (
                                                                <form onSubmit={(e) => { e.preventDefault(); handleGradeSubmit(sub.submissionId); }}>
                                                                    <input type="text" placeholder="Enter Grade" className="w-24 p-1 border rounded"
                                                                        value={gradeInputs[sub.submissionId] || ''}
                                                                        onChange={(e) => handleGradeInputChange(sub.submissionId, e.target.value)} />
                                                                    <button type="submit" className="ml-2 bg-mild-green text-dark-purple px-2 py-1 rounded">Save</button>
                                                                </form>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewSubmissions;
