'use strict';
window.Webflow || (window.Webflow = []);
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector('[fs-element="form"]');
  const resultMonthly = document.querySelector('[fs-element="result-monthly"]'); // Element for monthly capital & interest payments
  const resultInterest = document.querySelector('[fs-element="result-interest"]'); // Element for monthly interest-only payments

  if (!form || !resultMonthly || !resultInterest) {
    console.error("Required elements are missing.");
    return; // Exit if any required elements are missing
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default form submission

    const formData = new FormData(form);
    const amount = parseFloat(formData.get('amount').replace(/[^\d.]/g, ''));
    const interest = parseFloat(formData.get('interest').replace(/[^\d.]/g, ''));
    const term = parseInt(formData.get('term').replace(/[^\d.]/g, ''));

    if (isNaN(amount) || isNaN(interest) || isNaN(term)) {
      console.error("Invalid input values");
      return; // Validate inputs
    }

    // Calculate the monthly interest rate
    const monthlyInterestRate = interest / 100 / 12;

    // Calculate the monthly repayment (capital and interest)
    const x = Math.pow(1 + monthlyInterestRate, term * 12);
    const monthlyRepayment = (amount * monthlyInterestRate * x) / (x - 1);

    // Calculate the monthly interest-only payment
    const interestOnlyMonthlyPayment = (amount * monthlyInterestRate).toFixed(2);

    // Display the monthly repayment formatted as currency
    resultMonthly.textContent = monthlyRepayment.toLocaleString('en-GB', {style: 'currency', currency: 'GBP', minimumFractionDigits: 2});

    // Display the monthly interest-only payment formatted as currency
    resultInterest.textContent = parseFloat(interestOnlyMonthlyPayment).toLocaleString('en-GB', {style: 'currency', currency: 'GBP', minimumFractionDigits: 2});
  });
});
