import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminAssessment = () => {
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        fetchAssessments();
    }, []);

    const fetchAssessments = async () => {
        try {
            const response = await api.get('/assessments');
            setAssessments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const exportCSV = () => {
        if (assessments.length === 0) return;

        // Convert to CSV
        const headers = Object.keys(assessments[0]).join(',');
        const rows = assessments.map(obj => Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
        const csvContent = [headers, ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'assessments_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="animate-fade-in glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Assessment Submissions</h2>
                <button className="btn btn-secondary" onClick={exportCSV}>Export CSV</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Dept</th>
                            <th>Emp ID</th>
                            <th>Score (Optional)</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.department}</td>
                                <td>{a.employee_id}</td>
                                <td>-</td>
                                <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAssessment;
