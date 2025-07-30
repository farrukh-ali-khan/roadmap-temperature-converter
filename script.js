document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const temperatureInput = document.getElementById("temperature-input");
  const fromUnit = document.getElementById("from-unit");
  const toUnit = document.getElementById("to-unit");
  const resultElement = document.getElementById("result");
  const fromUnitBox = document.getElementById("from-unit-box");
  const toUnitBox = document.getElementById("to-unit-box");
  const yearElement = document.getElementById("current-year");

  // Set current year in footer (if present)
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Function to check if all fields are filled and trigger auto-convert
  function checkFields() {
    const tempValue = temperatureInput.value.trim();
    const fromValue = fromUnit.value;
    const toValue = toUnit.value;

    // Update unit box active styles
    fromUnitBox.classList.toggle("active", fromValue !== "");
    toUnitBox.classList.toggle("active", toValue !== "");

    if (tempValue !== "" && fromValue !== "" && toValue !== "") {
      convertTemperature(); // Auto-convert when all fields are valid
    } else {
      resultElement.textContent =
        "Please enter a valid temperature and select units.";
    }
  }

  // Conversion logic
  function convertTemperature() {
    const inputValue = parseFloat(temperatureInput.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (isNaN(inputValue)) {
      resultElement.textContent = "Please enter a valid number.";
      return;
    }

    let result;
    let celsius;

    // Step 1: Convert input to Celsius
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
        resultElement.textContent = "Please select both units.";
        return;
    }

    // Step 2: Convert Celsius to target unit
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
        resultElement.textContent = "Please select both units.";
        return;
    }

    // Format and show result
    const fromText =
      fromUnit.options[fromUnit.selectedIndex].text.split(" ")[0];
    const toText = toUnit.options[toUnit.selectedIndex].text.split(" ")[0];
    resultElement.innerHTML = `${inputValue} ${fromText} = <strong>${result.toFixed(
      2
    )} ${toText}</strong>`;
  }

  // Event listeners for auto conversion
  temperatureInput.addEventListener("input", checkFields);
  fromUnit.addEventListener("change", checkFields);
  toUnit.addEventListener("change", checkFields);

  // Optional: Trigger conversion when pressing Enter
  temperatureInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      checkFields();
    }
  });

  // Initialize default value (if needed)
  temperatureInput.value = "34";
  checkFields();
});
