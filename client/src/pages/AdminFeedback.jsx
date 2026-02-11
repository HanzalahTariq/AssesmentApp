import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminFeedback = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await api.get('/feedback');
            setFeedback(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const exportCSV = () => {
        if (feedback.length === 0) return;

        const headers = Object.keys(feedback[0]).join(',');
        const rows = feedback.map(obj => Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
        const csvContent = [headers, ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'feedback_export.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="animate-fade-in glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Feedback Submissions</h2>
                <button className="btn btn-secondary" onClick={exportCSV}>Export CSV</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Dept</th>
                            <th>EmpID</th>
                            <th>Satisfaction</th>
                            <th>Expectations</th>
                            <th>Relevance</th>
                            <th>Expertise</th>
                            <th>Pacing</th>
                            <th>Confidence</th>
                            <th>Key Takeaway</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback.map((f) => (
                            <tr key={f.id}>
                                <td>{f.id}</td>
                                <td>{f.name}</td>
                                <td>{f.department}</td>
                                <td>{f.employee_id}</td>
                                <td>{f.overall_satisfaction}</td>
                                <td>{f.expectations}</td>
                                <td>{f.relevance}</td>
                                <td>{f.trainer_expertise}</td>
                                <td>{f.pacing}</td>
                                <td>{f.confidence}</td>
                                <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.key_takeaway}</td>
                                <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminFeedback;
