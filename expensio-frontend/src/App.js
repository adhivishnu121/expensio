import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MonthlySubscriptions from "./cards/MonthlySubscriptions";
import TaxCalculator from "./cards/TaxCalculator";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesSorter from './cards/ExpensesSorter';
import SavingsCalculator from './cards/SavingsCalculator';
import SavingsGoalCalculator from './cards/SavingsGoalCalculator';

function App() {
  return (
	  
    <BrowserRouter>
      <Navbar />  {/* Navbar appears on all pages */}
     <div className="main-content"> <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
		<Route path="/subscriptions" element={<MonthlySubscriptions />} />
		<Route path="/tax-calculator" element={<TaxCalculator />} />
		<Route path="/expenses-sorter" element={<ExpensesSorter />} />
		<Route path="/savings-calculator" element={<SavingsCalculator />} />
		<Route path="/savings-goal-calculator" element={<SavingsGoalCalculator />} />

      </Routes>   <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />    </div>

    </BrowserRouter>
  );
}

export default App;
