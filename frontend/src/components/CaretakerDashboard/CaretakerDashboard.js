import { useState } from "react";
import { format, subDays, isToday, isBefore, startOfDay } from "date-fns";
import { DayPicker } from "react-day-picker"; // Or any calendar component you are using
import {
  Users, Bell, Calendar as CalendarIcon, Mail, AlertTriangle, Check, Clock, Camera
} from "lucide-react";
import NotificationSettings from "../NotificationSettings/NotificationSettings";
import Header from '../Header/Header.js'

import "./CaretakerDashboard.css";

const CaretakerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const patientName = "Eleanor Thompson";
  const adherenceRate = 85;
  const currentStreak = 5;
  const missedDoses = 3;

  const takenDates = new Set([
    "2024-06-10", "2024-06-09", "2024-06-07", "2024-06-06", 
    "2024-06-05", "2024-06-04", "2024-06-02", "2024-06-01"
  ]);

  const recentActivity = [
    { date: "2024-06-10", taken: true, time: "8:30 AM", hasPhoto: true },
    { date: "2024-06-09", taken: true, time: "8:15 AM", hasPhoto: false },
    { date: "2024-06-08", taken: false, time: null, hasPhoto: false },
    { date: "2024-06-07", taken: true, time: "8:45 AM", hasPhoto: true },
    { date: "2024-06-06", taken: true, time: "8:20 AM", hasPhoto: false },
  ];

  const dailyMedication = {
    name: "Daily Medication Set",
    time: "8:00 AM",
    status: takenDates.has(format(new Date(), 'yyyy-MM-dd')) ? "completed" : "pending"
  };

  return (
    <div className="dashboard-container">
      <Header/>
      <div className="header-section">
        <div className="header-info">
          <div className="icon-box"><Users size={32} /></div>
          <div>
            <h2>Caretaker Dashboard</h2>
            <p>Monitoring {patientName}'s medication adherence</p>
          </div>
        </div>
        <div className="summary-grid">
          <div><div className="metric">{adherenceRate}%</div><div>Adherence Rate</div></div>
          <div><div className="metric">{currentStreak}</div><div>Current Streak</div></div>
          <div><div className="metric">{missedDoses}</div><div>Missed This Month</div></div>
          <div><div className="metric">{recentActivity.filter(a => a.taken).length}</div><div>Taken This Week</div></div>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-list">
          {["overview", "activity", "calendar", "notifications"].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="grid-two">
              <div className="card">
                <h3><CalendarIcon size={18} /> Today's Status</h3>
                <div className="status-row">
                  <div>
                    <p>{dailyMedication.name}</p>
                    <small>{dailyMedication.time}</small>
                  </div>
                  <span className={`badge ${dailyMedication.status}`}>{dailyMedication.status}</span>
                </div>
              </div>

              <div className="card">
                <h3>Quick Actions</h3>
                <button onClick={() => alert("Reminder email sent")}>
                  <Mail size={16} /> Send Reminder Email
                </button>
                <button onClick={() => setActiveTab("notifications")}>
                  <Bell size={16} /> Configure Notifications
                </button>
                <button onClick={() => setActiveTab("calendar")}>
                  <CalendarIcon size={16} /> View Calendar
                </button>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="card">
              <h3>Recent Activity</h3>
              {recentActivity.map((a, i) => (
                <div className="activity-row" key={i}>
                  <div className={`circle ${a.taken ? "green" : "red"}`}>
                    {a.taken ? <Check size={16} /> : <AlertTriangle size={16} />}
                  </div>
                  <div className="activity-info">
                    <p>{format(new Date(a.date), "EEEE, MMM d")}</p>
                    <small>{a.taken ? `Taken at ${a.time}` : "Missed"}</small>
                  </div>
                  <div>
                    {a.hasPhoto && <span className="badge">📸 Photo</span>}
                    <span className={`badge ${a.taken ? "completed" : "missed"}`}>{a.taken ? "Completed" : "Missed"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="calendar-section">
              <DayPicker selected={selectedDate} onSelect={setSelectedDate} />
              <div className="calendar-info">
                <h4>{format(selectedDate, "MMMM d, yyyy")}</h4>
                {takenDates.has(format(selectedDate, 'yyyy-MM-dd')) ? (
                  <p className="calendar-taken">✔ Medication Taken</p>
                ) : isBefore(selectedDate, startOfDay(new Date())) ? (
                  <p className="calendar-missed">✘ Missed Medication</p>
                ) : isToday(selectedDate) ? (
                  <p className="calendar-today">📅 Today</p>
                ) : (
                  <p>📆 Future Date</p>
                )}
              </div>
            </div>
          )}

          {activeTab === "notifications" && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
};

export default CaretakerDashboard;
