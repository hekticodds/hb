document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('[fs-element="form"]');
    const resultMonthly = document.querySelector('[fs-element="result-monthly"]');
    const resultInterest = document.querySelector('[fs-element="result-interest"]');
    const resultYear = document.querySelector('[fs-element="result-year"]');
    const resultTotal = document.querySelector('[fs-element="result-total"]');

    if (!form || !resultMonthly || !resultInterest || !resultYear || !resultTotal)
        return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents Webflow JS from executing further actions.

        const formData = new FormData(form);
        const amount = parseFloat(formData.get('amount').replace(/[^\d.]/g, ''));
        const interest = parseFloat(formData.get('interest').replace(/[^\d.]/g, ''));
        const term = parseInt(formData.get('term').replace(/[^\d.]/g, ''));

        if (isNaN(amount) || isNaN(interest) || isNaN(term)) {
            console.log("Invalid input");
            return;
        }

        // Calculate interest rate per month
        const monthlyInterestRate = interest / 100 / 12;

        // Calculate interest-only monthly payment
        const interestOnlyMonthlyPayment = amount * monthlyInterestRate;

        // Display results as plain numbers without formatting
        resultMonthly.textContent = interestOnlyMonthlyPayment.toFixed(2);
        resultInterest.textContent = "0.00";  // No principal is paid
        resultYear.textContent = term.toString();
        resultTotal.textContent = (interestOnlyMonthlyPayment * term * 12).toFixed(2);
    });
});
