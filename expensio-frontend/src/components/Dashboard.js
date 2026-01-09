import React from 'react';
import '../styles/theme.css'; // Make sure your CSS file is imported
import ukTaxIcon from '../assets/taxes.png';
import savingsCalcIcon from '../assets/piggy-bank.png';
import expensesSorterIcon from '../assets/spending.png';
import savingsGoalsIcon from '../assets/saving.png';
import subscriptionsIcon from '../assets/calendar.png';
import { useNavigate} from 'react-router-dom';

function Dashboard() {
	  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName") || "User";

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to £xpensio, {firstName}</h1>
      <div className="dashboard-cards">

        {/* UK Tax Calculator */}
        <div className="card">
          <img src={ukTaxIcon} alt="UK Tax Calculator" className="card-icon" />
          <h3>UK Tax Calculator</h3>
          <p>Quickly estimate your UK taxes here.</p>
<button className="button-gold" onClick={() => navigate("/tax-calculator")}>
  Go
</button>        </div>

        {/* Savings Goal Calculator */}
        <div className="card">
          <img src={savingsCalcIcon} alt="Savings Goal Calculator" className="card-icon" />
          <h3>Savings Goal Calculator</h3>
          <p>Want to see how much you need to save regularly?</p>
          <button className="button-gold "onClick={()=> navigate("/savings-goal-calculator")}>Calculate</button>
        </div>

        {/* Expenses Sorter */}
        <div className="card">
          <img src={expensesSorterIcon} alt="Expenses Sorter" className="card-icon" />
          <h3>Expenses Sorter</h3>
          <p>Organize your expenses by category.</p>
          <button className="button-gold "onClick={() => navigate("/expenses-sorter")}>Sort</button>
        </div>

        {/* Savings Calculator */}
        <div className="card">
          <img src={savingsGoalsIcon} alt="Savings Goals" className="card-icon" />
          <h3>Savings Calculator</h3>
          <p>Want to save, but not sure how long it will take?</p>
          <button className="button-gold "onClick={() => navigate("/savings-calculator")}>View</button>
        </div>

        {/* Monthly Subscriptions */}
        <div className="card">
          <img src={subscriptionsIcon} alt="Monthly Subscriptions" className="card-icon" />
          <h3>Monthly Subscriptions</h3>
          <p>Manage all your monthly subscriptions.</p>
          <button onClick={() => navigate("/subscriptions")}
className="button-gold ">Manage </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
