import React from 'react';
import Footer from './Footer';
import '../styles/theme.css';
import { useNavigate } from 'react-router-dom';

function Home() {
	  const navigate = useNavigate();

  return (
    <>

      {/* Hero Section */}
      <section
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // full screen
    backgroundImage: 'url(/images/wallpaper.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  }}
>
  {/* Gradient overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))',
      zIndex: 1,
    }}
  />

  {/* Hero Content */}
  <div
    style={{
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      color: '#FFFFFF',
      padding: '60px 40px',
      borderRadius: '20px',
      maxWidth: '800px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(5px)', // subtle glass effect
    }}
  >
    <h1 style={{ fontSize: '48px', lineHeight: '1.2' }}>
      Take Control of Your <span className="gold">Finances</span>
    </h1>
    <p
      style={{
        color: '#CCCCCC',
        fontSize: '20px',
        marginTop: '20px',
        maxWidth: '600px',
        margin: '20px auto 0',
      }}
    >
      Track expenses, plan savings, calculate taxes, and manage subscriptions — all in one place.
    </p>

  <button
      className="button-gold"
      style={{ marginTop: '40px', padding: '14px 36px', fontSize: '18px', cursor: 'pointer' }}
      onClick={() => navigate('/features')}
    >
      Get Started
    </button>
  </div>
</section>


      {/* Features Section */}
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '80px 20px',
          backgroundColor: '#111111',
        }}
      >
        <Feature
          title="UK Tax Calculator"
          description="Quickly estimate your taxes and plan your finances efficiently."
        />
        <Feature
          title="Savings Goal Calculator"
          description="Calculate how much to save regularly to reach your financial goals."
        />
        <Feature
          title="Expenses Sorter"
          description="Organize your expenses by category and track your spending habits."
        />
        <Feature
          title="Monthly Subscriptions"
          description="Manage all your recurring subscriptions in one place for better budgeting."
        />
        <Feature
          title="Savings Goals"
          description="Track your savings goals and visualize progress with a clear dashboard."
        />
      </section>

      <Footer />
    </>
  );
}

function Feature({ title, description }) {
  return (
    <div
      style={{
        textAlign: 'center',
        maxWidth: '220px',
        margin: '20px',
        padding: '20px',
        backgroundColor: '#1E1E1E',
        borderRadius: '12px',
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.5)';
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h3 className="gold" style={{ marginBottom: '12px' }}>{title}</h3>
      <p style={{ color: '#B3B3B3', fontSize: '15px' }}>{description}</p>
    </div>
  );
}

export default Home;
