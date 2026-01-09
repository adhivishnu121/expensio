import React from 'react';
import Footer from './Footer';
import '../styles/theme.css';

// Import images/icons from assets
import ukTaxIcon from '../assets/taxes.png';
import savingsCalcIcon from '../assets/piggy-bank.png';
import expensesSorterIcon from '../assets/spending.png';
import savingsGoalsIcon from '../assets/saving.png';
import subscriptionsIcon from '../assets/calendar.png';

function Features() {
  const features = [
    {
      title: 'UK Tax Calculator',
      description:
        'Estimate your UK taxes quickly by entering your income, deductions, and allowances. Expensio helps you plan your finances efficiently and avoid surprises at the end of the year.',
      image: ukTaxIcon,
    },
    {
      title: 'Savings Goal Calculator',
      description:
        'Set your target savings amount and timeframe, and let Expensio calculate how much you need to save regularly. Visualize your progress and adjust your goals as needed.',
      image: savingsCalcIcon,
    },
    {
      title: 'Expenses Sorter',
      description:
        'Add your expenses and categorize them for better tracking. Understand where your money goes, identify spending patterns, and optimize your budget efficiently.',
      image: expensesSorterIcon,
    },
    {
      title: 'Monthly Subscriptions',
      description:
        'Keep track of all your recurring subscriptions in one place. Expensio reminds you about upcoming payments and helps you manage monthly expenses without surprises.',
      image: subscriptionsIcon,
    },
    {
      title: 'Savings Goals',
      description:
        'Monitor your savings goals with clear dashboards and progress bars. Track multiple goals at once and stay motivated as you watch your savings grow.',
      image: savingsGoalsIcon,
    },
  ];

  return (
    <>
      <section style={{ backgroundColor: '#0F0F0F', color: '#FFFFFF', paddingTop: '60px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '42px', marginBottom: '60px' }}>
          Explore <span className="gold">Expensio Features</span>
        </h1>

        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', // alternate left/right
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '60px 20px',
              gap: '40px',
              flexWrap: 'wrap',
            }}
          >
            {/* Image/Icon */}
            <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
              <img
                src={feature.image}
                alt={feature.title}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                }}
              />
            </div>

            {/* Text */}
            <div style={{ flex: '1 1 400px' }}>
              <h2 className="gold" style={{ fontSize: '32px', marginBottom: '20px' }}>
                {feature.title}
              </h2>
              <p style={{ color: '#CCCCCC', fontSize: '18px', lineHeight: '1.8' }}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}

export default Features;
