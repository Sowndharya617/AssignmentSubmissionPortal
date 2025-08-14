    import React, { useState } from 'react';
    import axios from 'axios';
    import { FaArrowLeft, FaCheckCircle, FaClock } from 'react-icons/fa';

    const AssignmentSubmissionView = ({ assignment, studentId, onBack, onSuccess }) => {
        const [answer, setAnswer] = useState('');
        const [loading, setLoading] = useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            const submissionData = { studentId, assignmentId: assignment.assignmentId, fileUrl: answer };
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
                    className="cursor-target absolute top-0 left-0 p-3 text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors flex items-center gap-1"
                    aria-label="Back to assignments"
                >
                    <FaArrowLeft /> Back
                </button>
                <div className="pt-16">
                    <h3 className="text-3xl font-bold mb-2 text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
                        <FaClock className="text-gray-400" /> Due Date: {new Date(assignment.dueDate).toLocaleString()}
                    </p>
                    <div className="cursor-target bg-purple-50 p-6 rounded-lg mb-6 border border-purple-100 shadow-inner">
                        <p className="text-gray-700 whitespace-pre-wrap">{assignment.description}</p>
                    </div>
                    {assignment.status === "Not Submitted" ? (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="answer" className="block text-lg font-semibold mb-2 text-gray-900">Your Submission</label>
                            <textarea
                                id="answer"
                                rows="6"
                                className="cursor-target w-full p-4 border border-purple-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                                placeholder="✏ Enter your assignment solution here..."
                            ></textarea>
                            <button
                                type="submit"
                                className="cursor-target mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-lg font-bold hover:scale-[1.02] transition-transform shadow-md"
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Assignment"}
                            </button>
                        </form>
                    ) : (
                        <div className="cursor-target p-6 bg-purple-50 rounded-lg border border-purple-100 shadow-inner">
                            <h4 className="text-lg font-semibold text-gray-900">Your Submission Status:</h4>
                            <p className="mt-2 text-gray-700">
                                Status: <span className="font-bold">{assignment.status}</span>
                            </p>
                            {assignment.grade && (
                                <p className="mt-1 text-gray-700 flex items-center gap-1">
                                    <FaCheckCircle className="text-green-500" /> Grade: <span className="font-bold text-green-500">{assignment.grade}</span>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    export default AssignmentSubmissionView;
    