'use strict';
window.Webflow || (window.Webflow = []);
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector('[fs-element="form"]');
  const resultMonthly = document.querySelector('[fs-element="result-monthly"]');
  const resultInterest = document.querySelector('[fs-element="result-interest"]');
  const resultYear = document.querySelector('[fs-element="result-year"]');
  const resultTotal = document.querySelector('[fs-element="result-total"]');

  if (!form || !resultMonthly || !resultInterest || !resultYear || !resultTotal)
    return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent Webflow JS to do anything else

    const formData = new FormData(form);
    const amount = parseFloat(formData.get('amount'));
    const interest = parseFloat(formData.get('interest'));
    const term = parseInt(formData.get('term'));

    if (isNaN(amount) || isNaN(interest) || isNaN(term)) {
      console.log("Invalid input");
      return;
    }

    // Calculate interest rate per month
    const monthlyInterestRate = interest / 100 / 12;
    const interestOnlyMonthlyPayment = amount * monthlyInterestRate;

    // Format and display results
    const formatCurrency = value => '£' + value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }).slice(1);

    resultMonthly.textContent = formatCurrency(interestOnlyMonthlyPayment);
    resultInterest.textContent = '£0.00'; // No principal is paid
    resultYear.textContent = term.toString();
    resultTotal.textContent = formatCurrency(interestOnlyMonthlyPayment * term * 12);
  });
});


