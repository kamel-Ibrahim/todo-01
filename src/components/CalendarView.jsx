import React, { useContext, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import "../styles/CalendarView.css";

function getDayKey(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function formatDayLabel(date) {
  const weekday = date.toLocaleDateString(undefined, { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString(undefined, { month: "short" });
  return `${weekday} ${day} ${month}`;
}

const CalendarView = () => {
  const { tasks } = useContext(TaskContext);
  const today = new Date();
  const days = Array.from({ length: 5 }, (_, i) => addDays(today, i));

  const events = useMemo(() => {
    return tasks
      .filter((t) => t.dueAt)
      .map((t) => {
        const d = new Date(t.dueAt);
        if (Number.isNaN(d.getTime())) return null;

        const dateKey = d.toISOString().slice(0, 10);
        const timeStr = d.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          id: t.id,
          title: t.title || "Untitled task",
          date: dateKey,
          start: timeStr,
          color: t.done ? "#22c55e" : "#2563eb",
        };
      })
      .filter(Boolean);
  }, [tasks]);

  const eventsByDay = days.reduce((acc, d) => {
    const key = getDayKey(d);
    acc[key] = events.filter((e) => e.date === key);
    return acc;
  }, {});

  return (
    <div className="calendar-card">
      <div className="calendar-header">
        <div>
          <h2>Schedule</h2>
          <p>Tasks by date & time</p>
        </div>
        <span className="calendar-range">
          {formatDayLabel(days[0])} – {formatDayLabel(days[days.length - 1])}
        </span>
      </div>

      <div className="calendar-strip">
        {days.map((day) => {
          const key = getDayKey(day);
          const dayEvents = eventsByDay[key] || [];
          const isToday = getDayKey(day) === getDayKey(new Date());

          return (
            <div
              key={key}
              className={`calendar-day ${isToday ? "today" : ""}`}
            >
              <div className="calendar-day-header">
                <span className="cd-weekday">
                  {day.toLocaleDateString(undefined, { weekday: "short" })}
                </span>
                <span className="cd-day">{day.getDate()}</span>
              </div>

              <div className="calendar-events">
                {dayEvents.length === 0 && (
                  <div className="calendar-empty">No tasks</div>
                )}

                {dayEvents.map((e) => (
                  <div
                    key={e.id}
                    className="calendar-event"
                    style={{ borderLeftColor: e.color }}
                  >
                    <div className="ce-time">{e.start}</div>
                    <div className="ce-title">{e.title}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
