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

  if (!form || !resultMonthly || !resultInterest || !resultYear || !resultTotal ||
      !labelAmount || !labelYear || !labelMonthly || !labelRate)
    return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent Webflow JS to do anything else

    const formData = new FormData(form);
    const amount = formData.get('amount');
    const interest = formData.get('interest');
    const term = formData.get('term');

    if (!amount || !interest || !term) return;

    // Calculate interest rate per month
    const monthlyInterestRate = Number(interest) / 100 / 12;

    // Calculate interest-only monthly payment
    const interestOnlyMonthlyPayment = (Number(amount) * monthlyInterestRate).toFixed(2);

    // Set results
    labelAmount.textContent = '£' + amount.toString().replace(/\d(?=(\d{3})+\.)/g, '£&,');
    labelYear.textContent = term.toString();
    labelMonthly.textContent = '£' + interestOnlyMonthlyPayment.toString().replace(/\d(?=(\d{3})+\.)/g, '£&,');
    labelRate.textContent = interest.toString() + '%';

    resultMonthly.textContent = '£' + interestOnlyMonthlyPayment.toString().replace(/\d(?=(\d{3})+\.)/g, '£&,');
    resultInterest.textContent = '£0.00'; // No principal is paid
    resultYear.textContent = term.toString();
    resultTotal.textContent = '£' + (Number(interestOnlyMonthlyPayment) * Number(term) * 12).toFixed(2).toString().replace(/\d(?=(\d{3})+\.)/g, '£&,');
  });
});
