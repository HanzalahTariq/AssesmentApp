import React, { useState } from 'react';
import { mcqs, trueFalseQuestions } from '../data/questions';
import api from '../api';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.jpg';

const AssessmentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        employee_id: ''
    });
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all questions answered if strictly required
        const allMcqAnswered = mcqs.every(q => answers[q.id]);
        const allTfAnswered = trueFalseQuestions.every(q => answers[q.id] !== undefined);

        if (!allMcqAnswered || !allTfAnswered) {
            alert('Please answer all questions before submitting.');
            return;
        }

        try {
            const payload = {
                ...formData,
                ...answers,
                // Convert 'True'/'False' strings to boolean for backend if needed? or keep as is?
                // Backend expects boolean for TF.
                // If the value is "True", convert to true.
                ...Object.keys(answers).reduce((acc, key) => {
                    if (key.startsWith('tf')) {
                        acc[key] = answers[key] === 'True';
                    } else {
                        acc[key] = answers[key];
                    }
                    return acc;
                }, {})
            };

            await api.post('/assessments', payload);
            setSubmitted(true);
            setTimeout(() => {
                // navigate('/'); // Stay or go somewhere?
            }, 2000);
        } catch (error) {
            console.error(error);
            alert('Failed to submit assessment.');
        }
    };

    if (submitted) {
        return (
            <div className="glass-card text-center animate-fade-in" style={{ padding: '4rem' }}>
                <h2 style={{ color: 'var(--success)' }}>Assessment Submitted Successfully!</h2>
                <p>Thank you for your participation.</p>
                <button className="btn btn-primary mt-4" onClick={() => { setSubmitted(false); setAnswers({}); setFormData({ name: '', department: '', employee_id: '' }); }}>
                    Take Another Assessment
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="glass-card" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <img src={logo} alt="Logo" style={{ maxWidth: '120px', height: 'auto' }} />
                </div>
                <h2 className="mb-4">Participant Assessment Form</h2>
                <form onSubmit={handleSubmit}>

                    {/* Personal Info */}
                    <div className="mb-4">
                        <h3 style={{ marginBottom: '1rem' }}>Personal Information</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Department</label>
                                <input type="text" name="department" value={formData.department} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Employee ID</label>
                                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>

                    <hr />

                    {/* MCQs */}
                    <div className="mb-4">
                        <h3 style={{ marginBottom: '1rem' }}>Section 1: Multiple Choice Questions</h3>
                        {mcqs.map((q, index) => (
                            <div key={q.id} className="form-group glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                                <p style={{ color: 'var(--text-main)', fontWeight: '500' }}>{index + 1}. {q.question}</p>
                                <div className="radio-group">
                                    {q.options.map((option, idx) => (
                                        <label key={idx} className="radio-option">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={option} // Or just index/letter
                                                checked={answers[q.id] === option}
                                                onChange={() => handleAnswerChange(q.id, option)}
                                                required
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <hr />

                    {/* True/False */}
                    <div className="mb-4">
                        <h3 style={{ marginBottom: '1rem' }}>Section 2: True / False</h3>
                        {trueFalseQuestions.map((q, index) => (
                            <div key={q.id} className="form-group glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                                <p style={{ color: 'var(--text-main)', fontWeight: '500' }}>{index + 1}. {q.question}</p>
                                <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
                                    {['True', 'False'].map((option) => (
                                        <label key={option} className="radio-option" style={{ flex: 1 }}>
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={option}
                                                checked={answers[q.id] === option}
                                                onChange={() => handleAnswerChange(q.id, option)}
                                                required
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
                            Submit Assessment
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AssessmentForm;
