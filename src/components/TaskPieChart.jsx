import React from "react";
import "./TaskPieChart.css";

const TaskPieChart = ({ completed = 0, missed = 0 }) => {
  const total = completed + missed || 1;
  const completedPct = Math.round((completed / total) * 100);
  const completedDeg = (completedPct / 100) * 360;

  return (
    <div className="tp-chart-card">
      <div className="tp-chart-header">Task Progress</div>

      <div className="tp-chart-main">
        <div
          className="tp-pie"
          style={{ "--tp-completed-deg": `${completedDeg}deg` }}
        >
          <div className="tp-pie-center">
            <span>{completedPct}%</span>
          </div>
        </div>

        <div className="tp-legend">
          <div className="tp-legend-item">
            <span className="tp-dot tp-dot-completed" />
            <span>Completed [{completed}]</span>
          </div>
          <div className="tp-legend-item">
            <span className="tp-dot tp-dot-missed" />
            <span>Missed [{missed}]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPieChart;
