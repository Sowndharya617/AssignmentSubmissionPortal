import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaBook, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, classesRes] = await Promise.all([
                axios.get('http://localhost:8080/api/admin/users'),
                axios.get('http://localhost:8080/api/admin/courses')
            ]);
            setUsers(usersRes.data);
            setClasses(classesRes.data);
        } catch (err) {
            setError('Failed to fetch data. Please check the server connection.');
            toast.error('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openConfirmationModal = (type, id) => {
        setModalType(type);
        setSelectedId(id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        const id = selectedId;
        const type = modalType;
        setShowModal(false);

        const url = type === 'user' 
            ? `http://localhost:8080/api/admin/users/${id}` 
            : `http://localhost:8080/api/admin/courses/${id}`;
        
        const successMessage = type === 'user' ? 'User deleted successfully!' : 'Class deleted successfully!';
        const errorMessage = type === 'user' ? 'Failed to delete user.' : 'Failed to delete class.';

        try {
            await axios.delete(url);
            toast.success(successMessage);
            fetchData(); // Refresh data
        } catch {
            toast.error(errorMessage);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-dark-purple text-white">Loading...</div>;
    }

    return (
        <div 
            className="min-h-screen bg-cover bg-center p-8"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}
        >
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            
            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-bold text-dark-purple mb-4">Confirm Deletion</h3>
                        <p className="text-gray-700 mb-6">
                            Are you sure? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800">Cancel</button>
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 p-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold text-dark-purple flex items-center gap-3">
                        <FaUsers /> Admin Dashboard
                    </h1>
                    <button onClick={handleLogout} className="flex items-center gap-2 bg-dark-purple text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-opacity-90">
                        <FaSignOutAlt /> Logout
                    </button>
                </header>

                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Class Management */}
                    <section className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-dark-purple mb-4 flex items-center gap-2"><FaBook /> Class Management</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-200 text-dark-purple text-sm">
                                    <tr>
                                        <th className="p-3 text-left">Class Name</th>
                                        <th className="p-3 text-center">Students</th>
                                        <th className="p-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map(course => (
                                        <tr key={course.courseId} className="border-b hover:bg-[#b3d4ff] transition transform hover:scale-[1.01] hover:z-10 cursor-pointer">
                                            <td className="p-3 text-gray-800">{course.courseName}</td>
                                            <td className="p-3 text-center"><span className="bg-mild-green text-dark-purple px-3 py-1 rounded-full text-sm font-medium">{course.students.length}</span></td>
                                            <td className="p-3 text-center"><button onClick={() => openConfirmationModal('course', course.courseId)} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"><FaTrash /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* User Management */}
                    <section className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-dark-purple mb-4 flex items-center gap-2"><FaUsers /> User Management</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-200 text-dark-purple text-sm">
                                    <tr>
                                        <th className="p-3 text-left">Username</th>
                                        <th className="p-3 text-left">Email</th>
                                        <th className="p-3 text-center">Role</th>
                                        <th className="p-3 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id} className="border-b hover:bg-[#b3d4ff] transition transform hover:scale-[1.01] hover:z-10 cursor-pointer">
                                            <td className="p-3 text-gray-800">{user.username}</td>
                                            <td className="p-3 text-gray-800">{user.email}</td>
                                            <td className="p-3 text-center"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'}`}>{user.role}</span></td>
                                            <td className="p-3 text-center"><button onClick={() => openConfirmationModal('user', user.id)} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"><FaTrash /></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
