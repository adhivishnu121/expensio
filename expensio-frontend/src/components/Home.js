import React from 'react';
import Footer from './Footer';
import '../styles/theme.css';

function Home() {
  return (
    <>

      <section style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1>
          Take Control of Your <span className="gold">Expenses</span>
        </h1>
        <p style={{ color: '#B3B3B3', fontSize: '18px' }}>
          Track, manage, and grow your finances smarter with Expensio.
        </p>

        <button className="button-gold" style={{ marginTop: '30px' }}>
          Get Started
        </button>
      </section>

      <section style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '60px',
        backgroundColor: '#1A1A1A'
      }}>
        <Feature title="Track Expenses" />
        <Feature title="Secure Login" />
        <Feature title="Smart Insights" />
      </section>

      <Footer />
    </>
  );
}

function Feature({ title }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '200px' }}>
      <h3 className="gold">{title}</h3>
      <p style={{ color: '#B3B3B3' }}>
        Simple, fast and reliable financial management.
      </p>
    </div>
  );
}

export default Home;
