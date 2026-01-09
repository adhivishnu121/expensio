import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/theme.css";

function ExpensesSorter() {
  const email = localStorage.getItem("email");
  const [expenses, setExpenses] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [csvFile, setCsvFile] = useState(null);

  // Hardcoded category mapping
  const categoryMap = new Map([
    ["tesco", "Groceries"],
    ["sainsbury", "Groceries"],
    ["uber", "Transport"],
    ["bolt", "Transport"],
    ["netflix", "Subscriptions"],
    ["spotify", "Subscriptions"],
    ["amazon", "Shopping"],
    ["rent", "Housing"],
    ["electric", "Utilities"],
    ["water", "Utilities"],
    ["gas", "Utilities"]
  ]);

  // Fetch expenses on load
  useEffect(() => {
    fetchExpenses();
  }, [email]);

  const fetchExpenses = () => {
    axios.get("http://localhost:8080/api/expenses", { params: { email } })
      .then(res => {
        setExpenses(res.data);
        calculateCategoryTotals(res.data);
      })
      .catch(err => console.error(err));
  };

  // Aggregate total spending per category
  const calculateCategoryTotals = (expenses) => {
    const totals = {};
    expenses.forEach(exp => {
      const cat = exp.category || "Others";
      if (totals[cat]) {
        totals[cat] += Number(exp.amount);
      } else {
        totals[cat] = Number(exp.amount);
      }
    });
    setCategoryTotals(totals);
  };

  // Handle CSV file selection
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // Parse CSV and send to backend
  const uploadCsv = () => {
    if (!csvFile) return alert("Please select a CSV file");

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n").slice(1); // skip header
      const parsedExpenses = [];

      lines.forEach(line => {
        if (!line.trim()) return;
        const [date, description, type, amountStr] = line.split(",");
        if (!amountStr) return;
        const amount = parseFloat(amountStr.replace(/[^0-9.-]+/g, ""));
        let category = "Others";

        const descLower = description.toLowerCase();
        for (const [key, value] of categoryMap) {
          if (descLower.includes(key)) {
            category = value;
            break;
          }
        }

        parsedExpenses.push({
          description,
          amount,
          category,
          date
        });
      });

      // Send each parsed expense to backend
      const requests = parsedExpenses.map(exp =>
        axios.post("http://localhost:8080/api/expenses", exp, { params: { email } })
      );

      Promise.all(requests)
        .then(responses => {
          const allExpenses = [...expenses, ...responses.map(r => r.data)];
          setExpenses(allExpenses);
          calculateCategoryTotals(allExpenses);
          alert("CSV uploaded successfully!");
          setCsvFile(null);
        })
        .catch(err => console.error(err));
    };
    reader.readAsText(csvFile);
  };

  return (
    <div className="page dashboard-container">
      <h2 className="dashboard-title">Expenses Summary</h2>

      {/* CSV Upload */}
      <div className="subscription-total" style={{ marginBottom: "30px" }}>
        <h3>Upload your expense statement</h3>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button className="button-gold" onClick={uploadCsv} style={{ marginLeft: "10px" }}>Upload</button>
      </div>

      {/* Category totals */}
      <div className="dashboard-cards">
        {Object.keys(categoryTotals).map(cat => (
          <div className="card" key={cat}>
            <h3 className="gold">{cat}</h3>
            <p>£{categoryTotals[cat].toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpensesSorter;
