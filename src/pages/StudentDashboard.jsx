import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaClock, FaCheckCircle, FaClipboardList, FaHourglassHalf, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';

// This component handles viewing and submitting a single assignment
const AssignmentSubmissionView = ({ assignment, studentId, onBack, onSuccess }) => {
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const submissionData = {
            studentId,
            assignmentId: assignment.assignmentId,
            fileUrl: answer,
        };
        try {
            await axios.post('http://localhost:8080/api/student/submissions', submissionData);
            alert("✅ Assignment submitted successfully!");
            onSuccess({ ...assignment, status: 'Submitted' });
        } catch (error) {
            console.error("Failed to submit assignment:", error);
            alert("❌ Submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={onBack}
                className="absolute top-0 left-0 p-3 text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors flex items-center gap-2 text-sm font-semibold"
                aria-label="Back to assignments"
            >
                <FaArrowLeft /> Back
            </button>
            <div className="pt-16">
                <h3 className="text-3xl font-bold mb-2 text-gray-900">{assignment.title}</h3>
                <p className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
                    <FaClock className="text-gray-400" /> Due Date: {new Date(assignment.dueDate).toLocaleString()}
                </p>
                <div className="bg-purple-50 p-6 rounded-lg mb-6 border border-purple-100 shadow-inner">
                    <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
                </div>
                {assignment.status === "Not Submitted" ? (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="answer" className="block text-lg font-semibold mb-2 text-gray-900">Your Submission</label>
                        <textarea
                            id="answer"
                            rows="8"
                            className="w-full p-4 border border-purple-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            placeholder="✏️ Enter your assignment solution here..."
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg font-bold hover:scale-[1.02] transition-transform shadow-md"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Assignment"}
                        </button>
                    </form>
                ) : (
                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-100 shadow-inner">
                        <h4 className="text-lg font-semibold text-gray-900">Your Submission Status:</h4>
                        <p className="mt-2 text-gray-700">
                            Status: <span className="font-bold">{assignment.status}</span>
                        </p>
                        {assignment.grade && (
                            <p className="mt-1 text-gray-700 flex items-center gap-1.5">
                                <FaCheckCircle className="text-green-500" /> Grade: <span className="font-bold text-green-500">{assignment.grade}</span>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


const StudentDashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const studentId = localStorage.getItem('userId');

    useEffect(() => {
        if (!studentId) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const profilePromise = axios.get(`http://localhost:8080/api/student/${studentId}/profile`);
                const assignmentsPromise = axios.get(`http://localhost:8080/api/student/${studentId}/assignments`);
                const [profileResponse, assignmentsResponse] = await Promise.all([profilePromise, assignmentsPromise]);
                setProfile(profileResponse.data);
                setAssignments(assignmentsResponse.data);
            } catch (err) {
                setError("Failed to load student data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [studentId, navigate]);

    const handleSubmissionSuccess = (updatedAssignment) => {
        setAssignments(prev => prev.map(a => a.assignmentId === updatedAssignment.assignmentId ? updatedAssignment : a));
        setSelectedAssignment(null);
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear all items from local storage
        navigate('/login'); // Redirect to the login page
    };

    const totalAssignments = assignments.length;
    const submittedAssignments = assignments.filter(a => a.status === 'Submitted').length;
    const gradedAssignments = assignments.filter(a => a.status === 'Graded').length;

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-xl font-semibold">Loading...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-500 font-bold">{error}</div>;

    return (
        <div 
            className="min-h-screen p-4 lg:p-8 font-sans bg-cover bg-center"
            style={{ backgroundImage: "url('https://media.istockphoto.com/id/979027138/photo/blur-image-of-many-people-are-training-in-the-big-training-room-with-computer.jpg?s=612x612&w=0&k=20&c=vRW2icu3sqhfwzC1-v2uMuQBlz6gfEKPMdKVXp7X1tY=')" }}
        >
            <div className="max-w-6xl mx-auto space-y-8">
                {profile && (
                    <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border">
                        <div className="bg-gradient-to-r from-[#141e30a5] to-[#243b55] p-6">
                            <div className="flex justify-between items-center text-white">
                                <div>
                                    <p className="text-sm font-light">Welcome back,</p>
                                    <h1 className="text-3xl font-bold mt-1">{profile.studentName}</h1>
                                    <p className="text-md opacity-90">{profile.registerNo}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-sm">Course: {profile.courseName}</p>
                                        <p className="text-sm">Email: {profile.email}</p>
                                    </div>
                                    {/* Logout Button */}
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="p-4 rounded-xl bg-white/80 border"><FaClipboardList className="mx-auto text-2xl text-blue-700 mb-2" /><h3 className="text-lg font-semibold">{totalAssignments}</h3><p className="text-sm text-gray-700">Total</p></div>
                            <div className="p-4 rounded-xl bg-white/80 border"><FaHourglassHalf className="mx-auto text-2xl text-blue-500 mb-2" /><h3 className="text-lg font-semibold">{submittedAssignments}</h3><p className="text-sm text-gray-700">Submitted</p></div>
                            <div className="p-4 rounded-xl bg-white/80 border"><FaCheckCircle className="mx-auto text-2xl text-green-700 mb-2" /><h3 className="text-lg font-semibold">{gradedAssignments}</h3><p className="text-sm text-gray-700">Graded</p></div>
                        </div>
                    </div>
                )}

                <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border">
                    {selectedAssignment ? (
                        <AssignmentSubmissionView
                            assignment={selectedAssignment}
                            studentId={studentId}
                            onBack={() => setSelectedAssignment(null)}
                            onSuccess={handleSubmissionSuccess}
                        />
                    ) : (
                        <>
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">📚 Your Assignments</h2>
                            <ul className="space-y-4">
                                {assignments.length > 0 ? (
                                    assignments.map(assignment => (
                                        <div key={assignment.assignmentId} onClick={() => setSelectedAssignment(assignment)} className="group p-5 rounded-xl border bg-white/90 shadow-md transition-all duration-300 hover:border-blue-500 hover:scale-[1.02] cursor-pointer">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                <div className="flex items-center space-x-4">
                                                    <FaBook className="text-blue-700 text-xl" />
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                                                        <p className="text-xs text-gray-600 mt-1 flex items-center gap-1.5"><FaClock /> Due: {new Date(assignment.dueDate).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <span className={`mt-3 md:mt-0 px-3 py-1 text-xs font-bold rounded-full text-white ${
                                                    assignment.status === 'Graded' ? 'bg-green-600' :
                                                    assignment.status === 'Submitted' ? 'bg-blue-600' :
                                                    'bg-yellow-500'
                                                }`}>
                                                    {assignment.status} {assignment.status === 'Graded' && `(${assignment.grade})`}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-700 py-8">🎉 No assignments found. You’re all caught up!</p>
                                )}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
