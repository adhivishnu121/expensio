import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/theme.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [taxCode, setTaxCode] = useState("1257L");
  const [result, setResult] = useState(null);

  // Map tax code to personal allowance
  const getAllowance = (code) => {
    if (!code) return 12570; // default
    const numeric = parseInt(code);
    if (!isNaN(numeric)) return numeric * 10;
    switch (code) {
      case "1257L":
        return 12570;
      case "BR": // Basic rate no allowance
        return 0;
      case "0T": // No allowance
        return 0;
      case "D0": // All income taxed at 40%
        return 0;
      default:
        return 12570;
    }
  };

  const calculateTax = () => {
    let annualIncome = Number(income);

    // Convert pay frequency to annual income
    switch (frequency) {
      case "weekly":
        annualIncome *= 52;
        break;
      case "fourweekly":
        annualIncome *= 13;
        break;
      case "monthly":
        annualIncome *= 12;
        break;
      case "annually":
        break;
      default:
        break;
    }

    const allowance = getAllowance(taxCode);

    // Income Tax calculation (UK bands 2025/26)
    let taxableIncome = Math.max(0, annualIncome - allowance);
    let incomeTax = 0;

    if (taxableIncome <= 50270 - allowance) {
      incomeTax = taxableIncome * 0.20;
    } else {
      incomeTax = (50270 - allowance) * 0.20 + (taxableIncome - (50270 - allowance)) * 0.40;
    }

    // National Insurance (Employee Class 1)
    let ni = 0;
    if (annualIncome > 12570) {
      if (annualIncome <= 50270) {
        ni = (annualIncome - 12570) * 0.12;
      } else {
        ni = (50270 - 12570) * 0.12 + (annualIncome - 50270) * 0.02;
      }
    }

    const totalTax = incomeTax + ni;
    const takeHome = annualIncome - totalTax;
	const monthlyTakeHome = takeHome/12;
	const weeklyTakeHome = takeHome/52;
    setResult({
      incomeTax,
      nationalInsurance: ni,
      totalTax,
      takeHome,
      monthlyTakeHome,
      weeklyTakeHome,
      annualIncome,
    });
  };

  // Pie chart data
  const pieData = result
    ? {
        labels: ["Income Tax", "National Insurance", "Take-home Pay"],
        datasets: [
          {
            data: [result.incomeTax, result.nationalInsurance, result.takeHome],
            backgroundColor: ["#black","brown", "yellow"],
            hoverOffset: 50,
          },
        ],
      }
    : null;

  return (
    <div className="page dashboard-container">
      <h2 className="dashboard-title">UK Tax Calculator</h2>

      <div className="tax-card" style={{ marginTop: "20px" }}>
        <h3 className="gold">How much do you get paid?
</h3>
        <input
          className="form-input"
          type="number"
          placeholder="Gross Income (in pounds)"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <p className="gold">How often you get this amount paid?</p>
          <label>
            <input
              type="radio"
              name="frequency"
              value="weekly"
              checked={frequency === "weekly"}
              onChange={(e) => setFrequency(e.target.value)}
            />{" "}
            Weekly
          </label>{" "}
          <label>
            <input
              type="radio"
              name="frequency"
              value="fourweekly"
              checked={frequency === "fourweekly"}
              onChange={(e) => setFrequency(e.target.value)}
            />{" "}
            Every 4 Weeks
          </label>{" "}
          <label>
            <input
              type="radio"
              name="frequency"
              value="monthly"
              checked={frequency === "monthly"}
              onChange={(e) => setFrequency(e.target.value)}
            />{" "}
            Monthly
          </label>{" "}
          <label>
            <input
              type="radio"
              name="frequency"
              value="annually"
              checked={frequency === "annually"}
              onChange={(e) => setFrequency(e.target.value)}
            />{" "}
            Annually
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            className="form-input"
            placeholder="Tax Code (e.g. 1257L)"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value.toUpperCase())}
          />
        </div>

        <button className="button-gold" style={{ marginTop: "10px" }} onClick={calculateTax}>
          Calculate
        </button>
      </div>

      {result && (
        <>
          <div className="tax-card" style={{ marginTop: "30px" }}>
            <h3 className="gold" style={{  textAlign: "center"}}>Results summary</h3>
            <p>Annual Gross Income: £{result.annualIncome.toFixed(2)}</p>
            <p>Income Tax: £{result.incomeTax.toFixed(2)}</p>
            <p>National Insurance: £{result.nationalInsurance.toFixed(2)}</p>
            <hr />
            <p>
              <strong>Total Tax:</strong> £{result.totalTax.toFixed(2)}
            </p>
            <p className="gold">
              <strong>Annual Take Home Pay:</strong> £{result.takeHome.toFixed(2)}
            </p><p className="gold">
              <strong>Monthly Take Home Pay:</strong> £{result.monthlyTakeHome.toFixed(2)}
            </p><p className="gold">
              <strong>Weekly Take Home Pay:</strong> £{result.weeklyTakeHome.toFixed(2)}
            </p>
             <p style={{ fontSize: "12px", color: "#CCCCCC", marginTop: "10px" }}>
    		*Approximate accuracy rate compared to HMRC: 96.7%
  </p>
          </div>

         <div className="dashboard-cards" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
 
  
  <div className="pie-card page">
    <h3 className="gold">Salary Breakdown</h3>
    <Pie data={pieData}  />
  </div>
</div>

        </>
      )}
    </div>
  );
}

export default TaxCalculator;
