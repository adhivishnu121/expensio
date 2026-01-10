import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/theme.css";

function MonthlySubscriptions() {
  const email = localStorage.getItem("email");

  const [subs, setSubs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editSub, setEditSub] = useState(null); // separate state for editing
  const [showAdd, setShowAdd] = useState(false); // toggle add form
  const [newSub, setNewSub] = useState({ name: "", amount: "", cycle: "", nextPayment: "" });
  const [totalSpend, setTotalSpend] = useState(0);

  // Fetch subscriptions
  useEffect(() => {
    axios.get("https://expensio-production.up.railway.app/api/subscriptions", { params: { email } })
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
  const saveEdit = () => {
    axios.put(`https://expensio-production.up.railway.app/api/subscriptions/${editSub.id}`, editSub)
      .then(res => {
        const updatedSubs = subs.map(s => s.id === editSub.id ? res.data : s);
        setSubs(updatedSubs);
        calculateTotal(updatedSubs);
        setEditingId(null);
        setEditSub(null);
      })
      .catch(err => console.error(err));
  };

  // Add new subscription
  const addSubscription = () => {
    axios.post("https://expensio-production.up.railway.app/api/subscriptions", newSub, { params: { email } })
      .then(res => {
        const updatedSubs = [...subs, res.data];
        setSubs(updatedSubs);
        calculateTotal(updatedSubs);
        setNewSub({ name: "", amount: "", cycle: "", nextPayment: "" });
        setShowAdd(false);
      })
      .catch(err => console.error(err));
  };

  // Remove subscription
  const removeSubscription = (id) => {
    axios.delete(`https://expensio-production.up.railway.app/api/subscriptions/${id}`)
      .then(() => {
        const updatedSubs = subs.filter(sub => sub.id !== id);
        setSubs(updatedSubs);
        calculateTotal(updatedSubs);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="page dashboard-container">

      {/* Total Monthly Spend */}
      <div className="subscription-total" style={{ marginBottom: "30px", textAlign: "center" }}>
        <h3>Total Monthly Spend</h3>
        <hr style={{ borderColor: "#D4AF37" }} />
        <h2 className="gold">£{totalSpend.toFixed(2)}</h2>
      </div>

      <h2 className="dashboard-title">Monthly Subscriptions</h2>

      {/* Subscription Cards */}
      <div className="dashboard-cards">
        {subs.map(sub => (
          <div className="card page" key={sub.id}>
            {editingId === sub.id ? (
              <>
                <input
                  className="form-input"
                  value={editSub.name}
                  onChange={e => setEditSub({ ...editSub, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  className="form-input"
                  type="number"
                  value={editSub.amount}
                  onChange={e => setEditSub({ ...editSub, amount: e.target.value })}
                  placeholder="Amount"
                />
                <input
                  className="form-input"
                  value={editSub.cycle}
                  onChange={e => setEditSub({ ...editSub, cycle: e.target.value })}
                  placeholder="Cycle"
                />
                <input
                  className="form-input"
                  value={editSub.nextPayment}
                  onChange={e => setEditSub({ ...editSub, nextPayment: e.target.value })}
                  placeholder="Next Payment"
                />
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <button className="button-gold" onClick={saveEdit}>Save</button>
                  <button className="button-gold" onClick={() => { setEditingId(null); setEditSub(null); }}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="gold">{sub.name}</h3>
                <p>£{sub.amount}</p>
                <p>{sub.cycle}</p>
                <p className="muted">{sub.nextPayment}</p>
                <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <button className="button-gold" onClick={() => { setEditingId(sub.id); setEditSub({ ...sub }); }}>Edit</button>
                  <button className="button-gold" onClick={() => removeSubscription(sub.id)}>Remove</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Toggle Add Subscription */}
      {!showAdd && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="button-gold" onClick={() => setShowAdd(true)}>Add New Subscription</button>
        </div>
      )}

      {/* Add New Subscription Form */}
      {showAdd && (
        <div className="subscription-total page" style={{ marginTop: "20px" }}>
          <h3>Add Subscription</h3>
          <input className="form-input" placeholder="Name"
            value={newSub.name} onChange={e => setNewSub({ ...newSub, name: e.target.value })} />
          <input className="form-input" type="number" placeholder="Amount"
            value={newSub.amount} onChange={e => setNewSub({ ...newSub, amount: e.target.value })} />
          <input className="form-input" placeholder="Cycle"
            value={newSub.cycle} onChange={e => setNewSub({ ...newSub, cycle: e.target.value })} />
          <input className="form-input" placeholder="Next Payment"
            value={newSub.nextPayment} onChange={e => setNewSub({ ...newSub, nextPayment: e.target.value })} />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
            <button className="button-gold" onClick={addSubscription}>Add</button>
            <button className="button-gold" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default MonthlySubscriptions;
