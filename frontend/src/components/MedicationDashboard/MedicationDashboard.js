import { useState } from "react";
import "./PatientDashboard.css";
import { format, isToday, isBefore, startOfDay } from "date-fns";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../../api/axiosInstance';
import { Check } from "lucide-react";
import Header from "../Header/Header";

const PatientDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [takenDates, setTakenDates] = useState(new Set());

  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const isTodaySelected = isToday(selectedDate);
  const isSelectedDateTaken = takenDates.has(selectedDateStr);

  const handleMarkTaken = (date, imageFile) => {
    setTakenDates(prev => new Set(prev).add(date));
    if (imageFile) console.log("Image uploaded:", imageFile.name);
  };

  const getStreakCount = () => {
    let streak = 0;
    let currentDate = new Date(today);
    while (takenDates.has(format(currentDate, 'yyyy-MM-dd')) && streak < 30) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
  };

  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: '', dosage: '', frequency: '' });

  const { data, isLoading } = useQuery('medications', async () => {
    const res = await api.get('/medications');
    return res.data;
  });

  const addMutation = useMutation(
    () => api.post('/medications', form),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('medications');
        setForm({ name: '', dosage: '', frequency: '' });
      },
    }
  );

  const takeMutation = useMutation((id) => api.patch(`/medications/${id}/take`), {
    onSuccess: () => queryClient.invalidateQueries('medications'),
  });

  const adherence = data ?
    (data.filter((m) => m.taken_today).length / data.length) * 100 : 0;


  return (
    <div className="dashboard-container">
      <Header/>
      <div className="welcome-banner">
        <div className="welcome-header">
          <div className="icon-circle">👤</div>
          <div>
            <h2>
              Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}!
            </h2>
            <p>Ready to stay on track with your medication?</p>
          </div>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div>{getStreakCount()}</div>
            <div>Day Streak</div>
          </div>
          <div className="stat-card">
            <div>{takenDates.has(todayStr) ? "✓" : "○"}</div>
            <div>Today's Status</div>
          </div>
          <div className="stat-card">
            <div>{Math.round((takenDates.size / 30) * 100)}%</div>
            <div>Monthly Rate</div>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="medication-section">
          <div className="card">
            <h3>
              📅 {isTodaySelected ? "Today's Medication" : `Medication for ${format(selectedDate, 'MMMM d, yyyy')}`}
            </h3>
            <form
        onSubmit={(e) => {
          e.preventDefault();
          addMutation.mutate();
        }}
      >
        <input
          type="text"
          placeholder="Medication Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Dosage"
          value={form.dosage}
          onChange={(e) => setForm({ ...form, dosage: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Frequency"
          value={form.frequency}
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          required
        />
        <button type="submit">Add Medication</button>
      </form>

      <p>Adherence Rate: {Math.round(adherence)}%</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((med) => (
            <li key={med.id}>
              {med.name} - {med.dosage} - {med.frequency}
              {!med.taken_today && (
                <button
                  onClick={() => takeMutation.mutate(med.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Mark as Taken
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
          </div>
        </div>

        <div className="calendar-section">
          <div className="card">
            <h3>Medication Calendar</h3>
            <div className="calendar">
              {[...Array(30)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = format(date, 'yyyy-MM-dd');
                const isTaken = takenDates.has(dateStr);
                const isCurrentDay = isToday(date);
                const isPast = isBefore(date, startOfDay(today));

                return (
                  <div
                    key={dateStr}
                    className={`calendar-day ${isTaken ? "taken" : isPast ? "missed" : ""} ${isCurrentDay ? "today" : ""}`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {date.getDate()}
                    {isTaken && <span className="tick">✔</span>}
                    {!isTaken && isPast && !isCurrentDay && <span className="dot" />}
                  </div>
                );
              })}
            </div>
            <div className="legend">
              <span><span className="legend-dot green" /> Medication taken</span>
              <span><span className="legend-dot red" /> Missed medication</span>
              <span><span className="legend-dot blue" /> Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;