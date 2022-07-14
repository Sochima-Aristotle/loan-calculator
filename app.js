const form = document.getElementById("loan-form");

const UIamount = document.querySelector("#amount");

const interestEl = document.querySelector("#interest");

const yrs = document.getElementById("years");

const monthlyPayment = document.querySelector("#monthly-payment");

const totalPay = document.querySelector("#total-payment");

const totalInt = document.querySelector("#total-interest");

const card = document.querySelector(".card");

const heading = document.querySelector(".heading");

const loader = document.querySelector("#loading");

const output = document.querySelector("#result");

form.addEventListener("submit", (e) => {
  // hide result
  output.style.display = "none";

  // show loader
  loader.style.display = "block";
  setTimeout(calcResult, 3000);

  e.preventDefault();
});

function calcResult() {
  console.log("Calculate");

  const principal = parseFloat(UIamount.value);

  const calInterest = parseFloat(interestEl.value) / 100 / 12;

  const calPay = parseFloat(yrs.value) * 12;

  //   compute monthly payment

  const x = Math.pow(1 + calInterest, calPay);

  const monthly = (principal * x * calInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(3);

    totalPay.value = (monthly * calPay).toFixed(3);

    totalInt.value = (monthly * calPay - principal).toFixed(3);
    // show result
    output.style.display = "block";

    // hide loader
    loader.style.display = "none";
  } else {
    showError("Please check your input(s)");
  }

  // e.preventDefault();
}
function showError(error) {
  // hide result
  output.style.display = "none";

  // hide loader
  loader.style.display = "none";
  // create div
  const errorDiv = document.createElement("div");

  // addclass
  errorDiv.className = "alert alert-danger";

  // create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading

  // card.insertBefore(error, heading)

  card.insertBefore(errorDiv, heading.nextSibling);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
