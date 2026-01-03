import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/theme.css";

function MonthlySubscriptions() {
  const email = localStorage.getItem("email");
  const [subs, setSubs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newSub, setNewSub] = useState({ name: "", amount: "", cycle: "", nextPayment: "" });
  const [totalSpend, setTotalSpend] = useState(0);

  // Fetch subscriptions
  useEffect(() => {
    axios.get("http://localhost:8080/api/subscriptions", { params: { email } })
      .then(res => {
        setSubs(res.data);
        calculateTotal(res.data);
      })
      .catch(err => console.error(err));
  }, [email]);

  // Calculate total monthly spend
  const calculateTotal = (subscriptions) => {
    const total = subscriptions.reduce((sum, sub) => sum + Number(sub.amount || 0), 0);
    setTotalSpend(total);
  };

  // Save edited subscription
  const saveEdit = (sub) => {
    axios.put(`http://localhost:8080/api/subscriptions/${sub.id}`, sub)
      .then(res => {
        const updatedSubs = subs.map(s => s.id === sub.id ? res.data : s);
        setSubs(updatedSubs);
        calculateTotal(updatedSubs);
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  // Add new subscription
  const addSubscription = () => {
    if (!newSub.name || !newSub.amount) return; // simple validation
    axios.post("http://localhost:8080/api/subscriptions", newSub, { params: { email } })
      .then(res => {
        const updatedSubs = [...subs, res.data];
        setSubs(updatedSubs);
        calculateTotal(updatedSubs);
        setNewSub({ name: "", amount: "", cycle: "", nextPayment: "" });
      })
      .catch(err => console.error(err));
  };

  // Remove subscription with fade-out animation
  const removeSubscription = (id) => {
    const element = document.getElementById(`sub-${id}`);
    if (element) element.classList.add("removing"); // CSS animation
    setTimeout(() => {
      axios.delete(`http://localhost:8080/api/subscriptions/${id}`)
        .then(() => {
          const updatedSubs = subs.filter(sub => sub.id !== id);
          setSubs(updatedSubs);
          calculateTotal(updatedSubs);
        })
        .catch(err => console.error(err));
    }, 300); // match CSS transition duration
  };

  return (
    <div className="page dashboard-container">
      {/* Total Monthly Spend Bar */}
      <div className="subscription-total" style={{ marginBottom: "30px", textAlign: "center" }}>
        <h3>Total Monthly Spend</h3>
        <hr style={{ borderColor: "#D4AF37" }} />
        <h2 className="gold">£{totalSpend}</h2>
      </div>

      <h2 className="dashboard-title">Monthly Subscriptions</h2>

      {/* Subscription Cards */}
      <div className="dashboard-cards">
        {subs.map(sub => (
          <div className="card page" id={`sub-${sub.id}`} key={sub.id}>
            {editingId === sub.id ? (
              <>
                <input className="form-input" value={sub.name} placeholder="Name"
                  onChange={e => sub.name = e.target.value} />
                <input className="form-input" type="number" value={sub.amount} placeholder="Amount"
                  onChange={e => sub.amount = e.target.value} />
                <input className="form-input" value={sub.cycle} placeholder="Cycle"
                  onChange={e => sub.cycle = e.target.value} />
                <input className="form-input" value={sub.nextPayment} placeholder="Next Payment"
                  onChange={e => sub.nextPayment = e.target.value} />
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <button className="button-gold" onClick={() => saveEdit(sub)}>Save</button>
                  <button className="button-gold" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="gold">{sub.name}</h3>
                <p>£{sub.amount}</p>
                <p>{sub.cycle}</p>
                <p className="muted">{sub.nextPayment}</p>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <button className="button-gold" onClick={() => setEditingId(sub.id)}>Edit</button>
                  <button className="button-gold" onClick={() => removeSubscription(sub.id)}>Remove</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add New Subscription */}
      <div className="subscription-total page" style={{ marginTop: "40px" }}>
        <h3>Add Subscription</h3>
        <input className="form-input" placeholder="Name" value={newSub.name}
          onChange={e => setNewSub({ ...newSub, name: e.target.value })} />
        <input className="form-input" type="number" placeholder="Amount" value={newSub.amount}
          onChange={e => setNewSub({ ...newSub, amount: e.target.value })} />
        <input className="form-input" placeholder="Cycle" value={newSub.cycle}
          onChange={e => setNewSub({ ...newSub, cycle: e.target.value })} />
        <input className="form-input" placeholder="Next Payment" value={newSub.nextPayment}
          onChange={e => setNewSub({ ...newSub, nextPayment: e.target.value })} />
        <button className="button-gold" style={{ marginTop: "10px" }} onClick={addSubscription}>Add</button>
      </div>
    </div>
  );
}

export default MonthlySubscriptions;
