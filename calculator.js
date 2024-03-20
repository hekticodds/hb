// console test

form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();

  const formData = new FormData(form);
  const mortgageType = formData.get('mortgageType'); // Getting the mortgage type from the form

  console.log("Selected mortgage type:", mortgageType); // This will print the selected mortgage type to the console

// code

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('[fs-element="form"]');
  const resultMonthly = document.querySelector('[fs-element="result-monthly"]');
  const resultTotal = document.querySelector('[fs-element="result-total"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(form);
    const amount = parseFloat(formData.get('amount'));
    const interestRate = parseFloat(formData.get('interest')) / 100 / 12;
    const term = parseFloat(formData.get('term')) * 12;
    const mortgageType = formData.get('mortgageType');

    let monthlyPayment, totalPayment;

    if (mortgageType === 'repaymentOption') {
      // Repayment mortgage calculation
      const x = Math.pow(1 + interestRate, term);
      monthlyPayment = (amount * x * interestRate) / (x - 1);
    } else if (mortgageType === 'interestOnlyOption') {
      // Interest Only mortgage calculation
      monthlyPayment = (amount * interestRate);
    }

    totalPayment = monthlyPayment * term;

    // Update UI elements with calculated values
    resultMonthly.textContent = `£${monthlyPayment.toFixed(2)}`;
    resultTotal.textContent = `£${totalPayment.toFixed(2)}`;
  });
});
