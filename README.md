# 💊 Medication Management System

A role-based web application for tracking daily medication schedules, ensuring adherence, and enabling caretakers to monitor patient progress.

## ✅ Features

### 👤 Patient
- Track daily medication
- Visual calendar with taken/missed indicators
- Day streaks and adherence percentage

### 👥 Caretaker
- Monitor patient adherence
- View recent activity and status
- Configure email notifications
- Send manual reminders
- Access medication calendar

### 🔐 Authentication
- JWT-based login system
- Role-based dashboards (Patient & Caretaker)


## 🛠️ Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express 
- **Database**: SQLite
- **State Management**: React Context API
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Styling**: Normal CSS 

## 📁 Project Structure

```
medication-management-system/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   └── medications.js
│   ├── utils/
│   │   ├── database.sqlite
│   │   └── db.js
│   ├── app.http
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── axiosInstance.js
    │   ├── auth/
    │   │   ├── AuthContext.js
    │   │   └── ProtectedRoute.js
    │   ├── components/
    │   │   ├── CaretakerDashboard/
    │   │   │   ├── CaretakerDashboard.css
    │   │   │   └── CaretakerDashboard.js
    │   │   ├── Header/
    │   │   │   ├── Header.js
    │   │   │   └── index.css
    │   │   ├── MedicationDashboard/
    │   │   │   ├── MedicationDashboard.js
    │   │   │   └── PatientDashboard.css
    │   │   ├── NotificationSettings/
    │   │   │   ├── NotificationSettings.css
    │   │   │   └── NotificationSettings.js
    │   │   ├── LoginForm.js
    │   │   └── SignupForm.js
    │   ├── pages/
    │   │   ├── DashboardPage.js
    │   │   ├── LoginPage.js
    │   │   └── SignupPage.js
    │   ├── styles/
    │   │   └── styles.css
    │   ├── App.js
    ├── package.json
    └── README.md
```

## 🚀 Usage
- Register users (either Patient or Caretaker)
- Login via /login
- Based on role:
- Patients see the Patient Dashboard
- Caretakers see the Caretaker Dashboard
- Caretaker views logs and sends reminders or configures alerts
