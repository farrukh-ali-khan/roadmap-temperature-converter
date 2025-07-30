document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const temperatureInput = document.getElementById("temperature-input");
  const fromUnit = document.getElementById("from-unit");
  const toUnit = document.getElementById("to-unit");
  const convertBtn = document.getElementById("convert-btn");
  const resultElement = document.getElementById("result");
  const fromUnitBox = document.getElementById("from-unit-box");
  const toUnitBox = document.getElementById("to-unit-box");
  const yearElement = document.getElementById("current-year");

  // Set current year in footer
  yearElement.textContent = new Date().getFullYear();

  // Function to check if all fields are filled
  function checkFields() {
    const tempValue = temperatureInput.value.trim();
    const fromValue = fromUnit.value;
    const toValue = toUnit.value;

    if (tempValue !== "" && fromValue !== "" && toValue !== "") {
      convertBtn.disabled = false;
    } else {
      convertBtn.disabled = true;
    }

    // Update unit box active styles
    fromUnitBox.classList.toggle("active", fromValue !== "");
    toUnitBox.classList.toggle("active", toValue !== "");

    // If all fields are valid, auto-convert
    if (!convertBtn.disabled) {
      convertTemperature(); // Automatically convert
    } else {
      resultElement.textContent =
        "Please enter a valid temperature and select units.";
    }
  }

  // Conversion function
  function convertTemperature() {
    const inputValue = parseFloat(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (isNaN(inputValue)) {
      resultElement.textContent = "Please enter a valid number";
      return;
    }

    let result;
    let celsius;

    // Convert input to Celsius
    switch (from) {
      case "celsius":
        celsius = inputValue;
        break;
      case "fahrenheit":
        celsius = ((inputValue - 32) * 5) / 9;
        break;
      case "kelvin":
        celsius = inputValue - 273.15;
        break;
      default:
        resultElement.textContent = "Please select both units";
        return;
    }

    // Convert Celsius to target unit
    switch (to) {
      case "celsius":
        result = celsius;
        break;
      case "fahrenheit":
        result = (celsius * 9) / 5 + 32;
        break;
      case "kelvin":
        result = celsius + 273.15;
        break;
      default:
        resultElement.textContent = "Please select both units";
        return;
    }

    const fromText =
      fromUnit.options[fromUnit.selectedIndex].text.split(" ")[0];
    const toText = toUnit.options[toUnit.selectedIndex].text.split(" ")[0];
    resultElement.innerHTML = `${inputValue} ${fromText} = <strong>${result.toFixed(
      2
    )} ${toText}</strong>`;
  }

  // Event listeners
  temperatureInput.addEventListener("input", checkFields);
  fromUnit.addEventListener("change", checkFields);
  toUnit.addEventListener("change", checkFields);

  convertBtn.addEventListener("click", convertTemperature);

  temperatureInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !convertBtn.disabled) {
      convertTemperature();
    }
  });

  // Initialize with default values
  temperatureInput.value = "34";
  checkFields();
});
