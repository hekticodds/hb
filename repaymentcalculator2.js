'use strict';
window.Webflow || (window.Webflow = []);
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector('[fs-element="form"]');
  const resultMonthly = document.querySelector('[fs-element="result-monthly"]');
  const resultInterest = document.querySelector('[fs-element="result-interest"]');
  const resultYear = document.querySelector('[fs-element="result-year"]');
  const resultTotal = document.querySelector('[fs-element="result-total"]');

  // Query label elements
  const labelAmount = document.querySelector('[fs-element="label-amount"]');
  const labelYear = document.querySelector('[fs-element="label-year"]');
  const labelMonthly = document.querySelector('[fs-element="label-monthly"]');
  const labelRate = document.querySelector('[fs-element="label-rate"]');

  // Check if necessary elements are present
  if (
    !form ||
    !resultMonthly ||
    !resultInterest ||
    !resultYear ||
    !resultTotal ||
    !labelAmount ||
    !labelYear ||
    !labelMonthly ||
    !labelRate
  )
    return; // Exit if any elements are missing

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent Webflow JS from executing further actions

    // Retrieve and sanitize input data
    const formData = new FormData(form);
    const amount = formData.get('amount'); // Returning the value of the amount input
    const interest = formData.get('interest');
    const term = formData.get('term');

    // Validate input data
    if (!amount || !interest || !term) return;

    // Calculate monthly interest rate
    const monthlyInterestRate = Number(interest) / 100 / 12;

    // Compute interest-only monthly payment
    const interestOnlyMonthlyPayment = (Number(amount) * monthlyInterestRate).toFixed(2);

    // Display results
    labelAmount.textContent = '£' + parseFloat(amount).toFixed(2);
    labelYear.textContent = term.toString();
    labelMonthly.textContent = '£' + parseFloat(interestOnlyMonthlyPayment).toFixed(2);
    labelRate.textContent = interest.toString() + '%';

    resultMonthly.textContent = '£' + parseFloat(interestOnlyMonthlyPayment).toFixed(2); // Display monthly payment
    resultInterest.textContent = '£' + parseFloat(interestOnlyMonthlyPayment).toFixed(2); // Display monthly interest
    resultYear.textContent = term.toString();
    resultTotal.textContent = '£' + (parseFloat(interestOnlyMonthlyPayment) * term * 12).toFixed(2); // Display total interest over the term
  });
});
