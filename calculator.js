

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('[fs-element="form"]');
  // Additional selectors for the mortgage type
  const mortgageTypeRepayment = document.querySelector('input[name="mortgageType"][value="repaymentOption"]');
  const mortgageTypeInterestOnly = document.querySelector('input[name="mortgageType"][value="interestOnlyOption"]');
  // Existing selectors remain the same

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(form);
    const amount = parseFloat(formData.get('amount'));
    const interestRate = parseFloat(formData.get('interest')) / 100 / 12;
    const term = parseFloat(formData.get('term')) * 12;

    let monthlyPayment;
    if (mortgageTypeRepayment.checked) {
      // Repayment mortgage calculation
      const x = Math.pow(1 + interestRate, term);
      monthlyPayment = (amount * x * interestRate) / (x - 1);
    } else if (mortgageTypeInterestOnly.checked) {
      // Interest-only mortgage calculation
      monthlyPayment = (amount * interestRate);
    }

    const totalPayment = monthlyPayment * term;

    // Update UI elements with calculated values
    resultMonthly.textContent = `£${monthlyPayment.toFixed(2)}`;
    resultTotal.textContent = `£${totalPayment.toFixed(2)}`;
  });
});
