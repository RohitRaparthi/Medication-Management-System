import { useState } from "react";
import "./NotificationSettings.css";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    emailAddress: "caretaker@example.com",
    reminderTime: "20:00",
    pushNotifications: true,
    criticalAlerts: true,
    missedMedNotification: true,
    missedMedDelay: "2"
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log("Notification settings saved:", settings);
    alert("Settings saved!");
  };

  return (
    <div className="notification-settings-container">
      {/* Notification Preferences */}
      <div className="card">
        <h2 className="card-title">
          🔔 Notification Preferences
        </h2>
        <div className="section">
          <div className="field-row">
            <div>
              <label>Email Notifications</label>
              <p className="subtext">Receive medication alerts via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
            />
          </div>

          {settings.emailNotifications && (
            <div className="nested-field">
              <label>Email Address</label>
              <input
                type="email"
                value={settings.emailAddress}
                onChange={(e) => handleSettingChange("emailAddress", e.target.value)}
              />
            </div>
          )}
        </div>

        <hr />

        {/* Missed Med Alerts */}
        <div className="section">
          <div className="field-row">
            <div>
              <label>Missed Medication Alerts</label>
              <p className="subtext">Get notified when medication is not taken on time</p>
            </div>
            <input
              type="checkbox"
              checked={settings.missedMedNotification}
              onChange={(e) => handleSettingChange("missedMedNotification", e.target.checked)}
            />
          </div>

          {settings.missedMedNotification && (
            <div className="nested-field">
              <label>Alert me if medication isn't taken within:</label>
              <select
                value={settings.missedMedDelay}
                onChange={(e) => handleSettingChange("missedMedDelay", e.target.value)}
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="6">6 hours</option>
              </select>

              <label>Daily Reminder Time:</label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => handleSettingChange("reminderTime", e.target.value)}
              />
              <p className="subtext">Time to check if today's medication was taken</p>
            </div>
          )}
        </div>
      </div>

      {/* Email Preview */}
      <div className="card">
        <h2 className="card-title">📧 Email Preview</h2>
        <div className="email-preview">
          <strong>Subject:</strong> Medication Alert - Eleanor Thompson
          <p>Hello,</p>
          <p>This is a reminder that Eleanor Thompson has not taken her medication today.</p>
          <p>Please check with her to ensure she takes her prescribed medication.</p>
          <p>Current adherence rate: 85% (5-day streak)</p>
        </div>
      </div>

      <div className="save-button-container">
        <button className="save-button" onClick={handleSaveSettings}>
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
