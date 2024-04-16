$(document).ready(function () {
  $("#taxForm").submit(function (event) {
    event.preventDefault();
    validateForm();
  });
});

function validateForm() {
  const income = $("#income").val();
  const extraIncome = $("#extraIncome").val();
  const deductions = $("#deductions").val();
  const age = $("#age").val();

  let valid = true;

  if (!income) {
    $("#incomeError").show();
    valid = false;
  } else {
    $("#incomeError").hide();
  }

  if (!extraIncome) {
    $("#extraIncomeError").show();
    valid = false;
  } else {
    $("#extraIncomeError").hide();
  }

  if (!deductions) {
    $("#deductionsError").show();
    valid = false;
  } else {
    $("#deductionsError").hide();
  }

  if (age === "") {
    $("#ageError").show();
    valid = false;
  } else {
    $("#ageError").hide();
  }

  if (valid) {
    calculateTax(
      parseFloat(income),
      parseFloat(extraIncome),
      parseFloat(deductions),
      age
    );
  }
}

function calculateTax(income, extraIncome, deductions, age) {
  let grossIncome = income + extraIncome - deductions;
  let tax = 0;

  if (grossIncome > 8) {
    if (age === "<40") {
      tax = 0.3 * (grossIncome - 8);
    } else if (age === ">=40 & <60") {
      tax = 0.4 * (grossIncome - 8);
    } else if (age === ">=60") {
      tax = 0.1 * (grossIncome - 8);
    }
  }

  const result = `Taxable Income: ₹${grossIncome} Lakhs\nTax Amount: ₹${tax} Lakhs`;
  $("#resultBody").text(result);
  $("#resultModal").modal("show");
}
