import React, { useState } from "react";
import "../styles/theme.css";

function SavingsGoalCalculator() {
  const [goalAmount, setGoalAmount] = useState("");
  const [targetMonth, setTargetMonth] = useState("");
  const [targetYear, setTargetYear] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [result, setResult] = useState(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const years = Array.from({ length: 2100 - 2026 + 1 }, (_, i) => 2026 + i);

  const calculateSavings = () => {
    const goal = parseFloat(goalAmount);
    const saved = parseFloat(currentSavings) || 0;

    if (!goal || targetMonth === "" || !targetYear) {
      setResult(null);
      return;
    }

    const now = new Date();
    const targetDate = new Date(targetYear, targetMonth, 1);

    const monthsNeeded =
      (targetDate.getFullYear() - now.getFullYear()) * 12 +
      (targetDate.getMonth() - now.getMonth());

    if (monthsNeeded <= 0) {
      setResult(null);
      return;
    }

    const remaining = goal - saved;
    const monthlyRequired = Math.ceil(remaining / monthsNeeded);
    const totalSaved = monthlyRequired * monthsNeeded + saved;

    const targetMonthYear = targetDate.toLocaleString("en-GB", {
      month: "long",
      year: "numeric"
    });

    setResult({
      monthlyRequired,
      targetMonthYear,
      totalSaved
    });
  };

  return (
    <div className="page dashboard-container">
      <h2 className="dashboard-title">
        How Much Do I Need to Save to Reach My Goal?
      </h2>

      <div className="subscription-total">
        <label>Savings Goal (£)</label>
        <input
          className="form-input"
          type="number"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
        />

        <label>When do you need your savings by?</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            className="form-input"
            value={targetMonth}
            onChange={(e) => setTargetMonth(Number(e.target.value))}
          >
            <option value="">Month</option>
            {months.map((m, index) => (
              <option key={m} value={index}>
                {m}
              </option>
            ))}
          </select>

          <select
            className="form-input"
            value={targetYear}
            onChange={(e) => setTargetYear(Number(e.target.value))}
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

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
          onClick={calculateSavings}
          style={{ marginTop: "10px" }}
        >
          Calculate
        </button>

        {result && (
          <div className="results-card">
            <h3>Your results</h3>
            <p className="muted-text">
              To adjust the results, edit your answers.
            </p>

            <div className="result-block">
              <span className="result-label">You will need to save:</span>
              <span className="result-value">
                £{result.monthlyRequired.toLocaleString()} per month
              </span>
            </div>

            <div className="result-block">
              <span className="result-label">To meet your target of:</span>
              <span className="result-value">{result.targetMonthYear}</span>
            </div>

            <div className="result-block">
              <span className="result-label">
                Total you will save by this date:
              </span>
              <span className="result-value">
                £{result.totalSaved.toLocaleString()}
              </span>
            </div>
          </div>
        )}<h3>You Savings progress</h3>

      <div className="progress-container">

  <div
    className="progress-bar"
    style={{
      width: `${Math.min((currentSavings / goalAmount) * 100, 100)}%`
    }}
  />
</div>
<p className="muted-text">
  {Math.round((currentSavings / goalAmount) * 100)}% of your goal saved
</p>
      </div>
                

    </div>
  );
}

export default SavingsGoalCalculator;
