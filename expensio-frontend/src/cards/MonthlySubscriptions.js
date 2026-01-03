import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/theme.css";

function MonthlySubscriptions() {
  const email = localStorage.getItem("email");

  const [subs, setSubs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newSub, setNewSub] = useState({
    name: "",
    amount: "",
    cycle: "",
    nextPayment: ""
  });

  useEffect(() => {
    if (!email) return;

    axios
      .get("http://localhost:8080/api/subscriptions", { params: { email } })
      .then(res => setSubs(res.data));
  }, [email]);

  const saveEdit = (sub) => {
    axios
      .put(`http://localhost:8080/api/subscriptions/${sub.id}`, sub)
      .then(() => {
        setEditingId(null);
        return axios.get("http://localhost:8080/api/subscriptions", { params: { email } });
      })
      .then(res => setSubs(res.data));
  };

  const addSubscription = () => {
    axios
      .post("http://localhost:8080/api/subscriptions", newSub, { params: { email } })
      .then(res => {
        setSubs([...subs, res.data]);
        setNewSub({ name: "", amount: "", cycle: "", nextPayment: "" });
      });
  };

  if (!email) return <p>Please login again</p>;

  return (
    <div className="page dashboard-container">
      <h2 className="dashboard-title">Monthly Subscriptions</h2>

      <div className="dashboard-cards">
        {subs.map(sub => (
          <div className="card" key={sub.id}>
            {editingId === sub.id ? (
              <>
                <input
                  className="form-input"
                  value={sub.name}
                  onChange={e =>
                    setSubs(subs.map(s =>
                      s.id === sub.id ? { ...s, name: e.target.value } : s
                    ))
                  }
                />
                <input
                  className="form-input"
                  type="number"
                  value={sub.amount}
                  onChange={e =>
                    setSubs(subs.map(s =>
                      s.id === sub.id ? { ...s, amount: e.target.value } : s
                    ))
                  }
                />
                <input
                  className="form-input"
                  value={sub.cycle}
                  onChange={e =>
                    setSubs(subs.map(s =>
                      s.id === sub.id ? { ...s, cycle: e.target.value } : s
                    ))
                  }
                />
                <input
                  className="form-input"
                  value={sub.nextPayment}
                  onChange={e =>
                    setSubs(subs.map(s =>
                      s.id === sub.id ? { ...s, nextPayment: e.target.value } : s
                    ))
                  }
                />
                <button className="button-gold" onClick={() => saveEdit(sub)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="gold">{sub.name}</h3>
                <p>£{sub.amount}</p>
                <p>{sub.cycle}</p>
                <p>{sub.nextPayment}</p>
                <button className="button-gold" onClick={() => setEditingId(sub.id)}>
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="subscription-total">
        <h3>Add Subscription</h3>

        <input className="form-input" placeholder="Name"
          value={newSub.name}
          onChange={e => setNewSub({ ...newSub, name: e.target.value })} />

        <input className="form-input" type="number" placeholder="Amount"
          value={newSub.amount}
          onChange={e => setNewSub({ ...newSub, amount: e.target.value })} />

        <input className="form-input" placeholder="Cycle"
          value={newSub.cycle}
          onChange={e => setNewSub({ ...newSub, cycle: e.target.value })} />

        <input className="form-input" placeholder="Next Payment"
          value={newSub.nextPayment}
          onChange={e => setNewSub({ ...newSub, nextPayment: e.target.value })} />

        <button className="button-gold" onClick={addSubscription}>
          Add
        </button>
      </div>
    </div>
  );
}

export default MonthlySubscriptions;
