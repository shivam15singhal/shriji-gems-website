import React from "react";
import "./OrderTimeline.css";

const STATUS_FLOW = ["Placed", "Processing", "Shipped", "Delivered"];

function OrderTimeline({ status }) {
  if (status === "Cancelled") {
    return (
      <div className="timeline cancelled">
        <div className="timeline-item active cancelled">
          <span className="dot"></span>
          <span className="label">Cancelled</span>
        </div>
      </div>
    );
  }

  const activeIndex = STATUS_FLOW.indexOf(status);

  return (
    <div className="timeline">
      {STATUS_FLOW.map((step, index) => {
        const isActive = index <= activeIndex;

        return (
          <div
            key={step}
            className={`timeline-item ${isActive ? "active" : ""}`}
          >
            <span className="dot"></span>
            <span className="label">{step}</span>
            {index !== STATUS_FLOW.length - 1 && (
              <span className="line"></span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default OrderTimeline;
