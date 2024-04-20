'use strict';
window.Webflow || (window.Webflow = []);
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector('[fs-element="form"]');
  const resultMonthly = document.querySelector('[fs-element="result-monthly"]');
  const resultInterest = document.querySelector('[fs-element="result-interest"]');
  const resultYear = document.querySelector('[fs-element="result-year"]');
  const resultTotal = document.querySelector('[fs-element="result-total"]');

  //Query label elements
  const labelAmount = document.querySelector('[fs-element="label-amount"]');
  const labelYear = document.querySelector('[fs-element="label-year"]');
  const labelMonthly = document.querySelector('[fs-element="label-monthly"]');
  const labelRate = document.querySelector('[fs-element="label-rate"]');

  // if there's no form or any of the below elements, just return from the function and don't do anything else
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
    return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent Webflow JS to do anything else
    // Get the data from the calculator
    // * the data outputted will be in string format, will need to convert to number type later *

    const formData = new FormData(form);
    const amount = formData.get('amount'); // returning the value of amount
    const interest = formData.get('interest');
    const term = formData.get('term');

    if (!amount || !interest || !term) return;

    // Calculate interest rate per month
    const monthlyInterestRate = Number(interest) / 100 / 12;

    // Compute interest-only monthly payment
    const interestOnlyMonthlyPayment = (Number(amount) * monthlyInterestRate).toFixed(2);

    // Display results using plain formatting to avoid complications
    labelAmount.textContent = '£' + parseFloat(amount).toFixed(2);
    labelYear.textContent = term.toString();
    labelMonthly.textContent = '£' + parseFloat(interestOnlyMonthlyPayment).toFixed(2);
    labelRate.textContent = interest.toString() + '%';

    resultMonthly.textContent = '£' + parseFloat(interestOnlyMonthlyPayment).toFixed(2);
    resultInterest.textContent = '£' + parseFloat(interestOnlyMonthlyPayment).toFixed(2); // Monthly interest displayed as "Interest"
    resultYear.textContent = term.toString();
    resultTotal.textContent = '£' + (parseFloat(interestOnlyMonthlyPayment) * term * 12).toFixed(2);
  });
});
