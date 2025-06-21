import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import MedicationDashboard from '../components/MedicationDashboard/MedicationDashboard';
import CaretakerDashboard from '../components/CaretakerDashboard/CaretakerDashboard';
import { Navigate } from 'react-router-dom';

export default function DashboardRouter() {
  const { auth } = useContext(AuthContext);

  if (!auth?.user) return <Navigate to="/login" />;

  if (auth.user.role === 'patient') {
    return <MedicationDashboard />;
  } else if (auth.user.role === 'caretaker') {
    return <CaretakerDashboard />;
  } else {
    return <div>Unknown role</div>;
  }
}
