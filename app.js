//Listen for submit

document.getElementById('loan-form').addEventListener('submit', calculateResults);

//Calculate Results
function calculateResults(e){
  console.log('Calculating...');
  //UI Vars
  const amountEL = document.getElementById('amount');
  const interestEL = document.getElementById('interest');
  const yearsEL = document.getElementById('years');
  const monthlyPaymentEL = document.getElementById('monthly-payment');
  const totalPaymentEL = document.getElementById('total-payment');
  const totalInterestEL = document.getElementById('total-interest');

  const principal = parseFloat(amountEL.value);
  const calculatedInterest = parseFloat(interestEL.value) / 100 /12;
  const calculatedPayments = parseFloat(yearsEL.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
  monthlyPaymentEL.value = monthly.toFixed(2);
  totalPaymentEL.value = (monthly * calculatedPayments).toFixed(2);
  totalInterestEL.value = ((monthly * calculatedPayments)-principal).toFixed(2);
   } else {
    //console.log('Please check your numbers');
    showError('Invalid numbers');
  }


  e.preventDefault();
}

//Errors
function showError(error){
  //Create a div
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className ='alert alert-danger';

  //Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 5 seconds
  setTimeout(clearError, 5000);
}

//Clear Error

function clearError(){
  document.querySelector('.alert').remove();
}