import React, { useState } from "react";
import "../styles/theme.css";

function SavingsCalculator() {
  const [goalAmount, setGoalAmount] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);

  const calculateTime = () => {
    const goal = parseFloat(goalAmount);
    const saved = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlySaving);

    if (!goal || !monthly || monthly <= 0) {
      setResult(null);
      return;
    }

    const remaining = goal - saved;
    const monthsNeeded = Math.ceil(remaining / monthly);

    const years = Math.floor(monthsNeeded / 12);
    const months = monthsNeeded % 12;

    const now = new Date();
    const targetDate = new Date(
      now.getFullYear(),
      now.getMonth() + monthsNeeded,
      1
    );

    const targetMonthYear = targetDate.toLocaleString("en-GB", {
      month: "long",
      year: "numeric"
    });

    const duration =
      `${years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""}` +
      `${years > 0 && months > 0 ? " and " : ""}` +
      `${months > 0 ? `${months} month${months > 1 ? "s" : ""}` : ""}`;

    setResult({
      targetMonthYear,
      duration,
      goalAmount: goal,
      monthlySaving: monthly
    });
  };

  return (
    <div className="page dashboard-container">
      <h2 className="dashboard-title">How Long to Reach Your Savings Goal</h2>

      <div className="subscription-total">
        <label>Savings Goal (£)</label>
        <input
          className="form-input"
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
        />

        <label>How much can you save each month (£)</label>
        <input
          className="form-input"
          type="number"
          value={monthlySaving}
          onChange={(e) => setMonthlySaving(e.target.value)}
        />

        <label>Current Savings (£, optional)</label>
        <input
          className="form-input"
          type="number"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(e.target.value)}
        />

        <label>Gross Annual Interest Rate (%) (optional)</label>
        <input
          className="form-input"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />

        <button
          className="button-gold"
          onClick={calculateTime}
          style={{ marginTop: "10px" }}
        >
          Calculate
        </button>

        {result && (
          <div className="results-card">
            <h3>Your results</h3>
            <p className="muted-text">To adjust the results, edit your answers.</p>

            <div className="result-block">
              <span className="result-label">It will take until:</span>
              <span className="result-value">{result.targetMonthYear}</span>
              <span className="result-sub">({result.duration})</span>
            </div>

            <div className="result-block">
              <span className="result-label">To hit your goal of:</span>
              <span className="result-value">
                £{result.goalAmount.toLocaleString()}
              </span>
            </div>

            <div className="result-block">
              <span className="result-label">If you save:</span>
              <span className="result-value">
                £{result.monthlySaving} a month
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavingsCalculator;
