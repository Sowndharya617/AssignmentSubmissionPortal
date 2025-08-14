import React, { useState } from 'react';
import CreateClass from '../components/CreateClass';
import PostAssignment from '../components/PostAssignment';
import ViewSubmissions from '../components/ViewSubmissions';
import ViewClasses from '../components/ViewClasses';

const StaffDashboard = () => {
    const [activeTab, setActiveTab] = useState('view-classes');
    const staffName = "Malleswari";

    const renderContent = () => {
        switch (activeTab) {
            case 'view-classes':
                return <ViewClasses />;
            case 'create-class':
                return <CreateClass />;
            case 'post-assignment':
                return <PostAssignment />;
            case 'view-submissions':
                return <ViewSubmissions />;
            default:
                return <ViewClasses />;
        }
    };

    const getButtonClass = (tabName) => {
        return `w-full text-left p-3 rounded-lg transition-colors duration-300 ${
            activeTab === tabName
                ? 'bg-mild-green text-dark-purple font-semibold shadow-md'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`;
    };

    return (
        <div className="min-h-screen bg-dark-purple flex justify-center p-4 sm:p-6 lg:p-8">
            <div className="flex w-full max-w-7xl">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900/50 text-white flex flex-col p-4 rounded-l-xl">
                    <div className="text-2xl font-bold mb-10 px-2 text-center text-mild-green">Staff Portal</div>
                    <nav className="flex-1">
                        <ul>
                            <li className="mb-3">
                                <button
                                    onClick={() => setActiveTab('view-classes')}
                                    className={getButtonClass('view-classes')}
                                >
                                    View Classes
                                </button>
                            </li>
                            <li className="mb-3">
                                <button
                                    onClick={() => setActiveTab('create-class')}
                                    className={getButtonClass('create-class')}
                                >
                                    Create Class
                                </button>
                            </li>
                            <li className="mb-3">
                                <button
                                    onClick={() => setActiveTab('post-assignment')}
                                    className={getButtonClass('post-assignment')}
                                >
                                    Post Assignment
                                </button>
                            </li>
                            <li className="mb-3">
                                <button
                                    onClick={() => setActiveTab('view-submissions')}
                                    className={getButtonClass('view-submissions')}
                                >
                                    View Submissions
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Main Content Area with a semi-transparent background */}
                    <div className="flex-1 p-8 bg-blue-100/70 backdrop-blur-sm rounded-r-xl overflow-y-auto">
                    {/* The "Welcome" card with a solid mild green background */}
                    <div className="p-6 mb-8 bg-darkpurple rounded-xl shadow-lg">
                        <h2 className="text-3xl font-bold text-dark-purple">Welcome, {staffName}!</h2>
                        <p className="text-gray-600 mt-1">Manage your classes and assignments below.</p>
                    </div>
                    <main>
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
