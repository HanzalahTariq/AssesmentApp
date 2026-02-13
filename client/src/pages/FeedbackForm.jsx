import React, { useState } from 'react';
import api from '../api';

import logo from '../assets/logo.jpg';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        employee_id: '',
        overall_satisfaction: '',
        expectations: '',
        relevance: '',
        trainer_expertise: '',
        pacing: '',
        confidence: '',
        key_takeaway: '',
        suggestions: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/feedback', formData);
            setSubmitted(true);
        } catch (error) {
            console.error(error);
            alert('Failed to submit feedback.');
        }
    };

    if (submitted) {
        return (
            <div className="glass-card text-center animate-fade-in" style={{ padding: '4rem' }}>
                <h2 style={{ color: 'var(--success)' }}>Feedback Submitted!</h2>
                <p>We appreciate your valuable feedback.</p>
                <button className="btn btn-primary mt-4" onClick={() => {
                    setSubmitted(false); setFormData({
                        name: '', department: '', employee_id: '',
                        overall_satisfaction: '', expectations: '', relevance: '', trainer_expertise: '', pacing: '', confidence: '', key_takeaway: '', suggestions: ''
                    });
                }}>Submit Another Response</button>
            </div>
        );
    }

    const LikertScale = ({ label, name, value, onChange }) => (
        <div className="form-group glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
            <label style={{ fontSize: '1.05rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: '600' }}>{label}</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px', margin: '0 auto' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                        <span style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{num}</span>
                        <input
                            type="radio"
                            name={name}
                            value={num}
                            checked={parseInt(value) === num}
                            onChange={onChange}
                            required
                            style={{ width: '1.25rem', height: '1.25rem' }}
                        />
                    </label>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px', margin: '0.5rem auto 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Poor</span>
                <span>Excellent</span>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            <div className="glass-card">
                <div className="form-header">
                    <h2 style={{ margin: 0 }}>Participant Feedback</h2>
                    <img src={logo} alt="Logo" style={{ maxWidth: '120px', height: 'auto' }} />
                </div>
                <p className="mb-4">Please take a moment to provide feedback on the training session.</p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <h3 style={{ marginBottom: '1rem' }}>Personal Information</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="grid-2">
                            <div className="form-group">
                                <label>Department</label>
                                <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Employee ID</label>
                                <input type="text" name="employee_id" value={formData.employee_id} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 style={{ marginTop: '2rem' }}>I. Overall Experience</h3>
                    <LikertScale label="Overall Satisfaction: How would you rate the overall quality of this training?" name="overall_satisfaction" value={formData.overall_satisfaction} onChange={handleChange} />
                    <LikertScale label="Expectations: To what extent did the training meet your initial expectations?" name="expectations" value={formData.expectations} onChange={handleChange} />

                    <h3 style={{ marginTop: '2rem' }}>II. Content & Delivery</h3>
                    <LikertScale label="Relevance: The content was relevant to my professional role and daily tasks." name="relevance" value={formData.relevance} onChange={handleChange} />
                    <LikertScale label="Trainer Expertise: The trainer demonstrated deep knowledge of the subject matter." name="trainer_expertise" value={formData.trainer_expertise} onChange={handleChange} />
                    <LikertScale label="Pacing: The pace of the training was appropriate for the complexity of the topics." name="pacing" value={formData.pacing} onChange={handleChange} />

                    <h3 style={{ marginTop: '2rem' }}>III. Application & Impact</h3>
                    <LikertScale label="Confidence: I feel confident in applying the skills learned today in my work." name="confidence" value={formData.confidence} onChange={handleChange} />

                    <div className="form-group glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
                        <label style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: '600' }}>Key Takeaway: What is the most valuable thing you learned during this session?</label>
                        <textarea name="key_takeaway" value={formData.key_takeaway} onChange={handleChange} rows="4" required placeholder="Your answer..." />
                    </div>

                    <h3 style={{ marginTop: '2rem' }}>IV. Improvement</h3>
                    <div className="form-group glass-card" style={{ padding: '1.5rem', marginTop: '1rem' }}>
                        <label style={{ fontSize: '1.05rem', color: 'var(--primary)', fontWeight: '600' }}>Suggestions: What is one specific way we can improve this training for future participants?</label>
                        <textarea name="suggestions" value={formData.suggestions} onChange={handleChange} rows="4" placeholder="Your answer..." />
                    </div>

                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
                            Submit Feedback
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
