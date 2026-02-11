import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AssessmentForm from './pages/AssessmentForm';
import FeedbackForm from './pages/FeedbackForm';
import AdminAssessment from './pages/AdminAssessment';
import AdminFeedback from './pages/AdminFeedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default redirect to assessment or create a home page */}
          <Route index element={<Navigate to="/assessment" replace />} />
          <Route path="assessment" element={<AssessmentForm />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="admin/assessments" element={<AdminAssessment />} />
          <Route path="admin/feedback" element={<AdminFeedback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
