 // Select the elements from the DOM
const result = document.getElementById('result');  // Display area for the calculator
const buttons = document.getElementById('button'); // Buttons container

// Variables to store the current expression and whether we need to reset the display
let currentExpression = '';  // Stores the ongoing calculation as a string
let shouldReset = false;     // Indicates if the display should reset after a result is shown

// Add an event listener to handle button clicks
buttons.addEventListener('click', (event) => {
    const target = event.target;  // The clicked button
    const value = target.textContent;  // The button's text (number/operator)

    // Handle "AC" button click (clear all)
    if (target.id === 'ac') {
        resetCalculator();  // Reset the calculator
        return;
    }

    // Handle "C" button click (clear last entry)
    if (target.id === 'c') {
        clearLastEntry();  // Remove the last input
        return;
    }

    // Handle "=" button click (calculate the result)
    if (target.id === 'equal') {
        calculateResult();  // Calculate and display the result
        return;
    }

    // For all other buttons (numbers/operators), handle input
    handleInput(value);  // Process the number or operator
});

// Add an event listener for key presses (for keyboard input)
document.addEventListener('keydown', (event) => {
    const key = event.key;  // The key that was pressed

    // Check if the key is a number or operator
    if (/[0-9+\-*/.]/.test(key)) {
        handleInput(key);
    }

    // Handle "Enter" key for "=" (calculate result)
    if (key === 'Enter') {
        calculateResult();
    }

    // Handle "Backspace" key for clearing the last entry
    if (key === 'Backspace') {
        clearLastEntry();
    }

    // Handle "Escape" key for "AC" (clear all)
    if (key === 'Escape') {
        resetCalculator();
    }
});

// Function to handle numbers and operators input
function handleInput(input) {
    // Reset the expression if a result was previously shown
    if (shouldReset) {
        currentExpression = '';  // Clear the expression
        shouldReset = false;     // Stop resetting on the next input
    }

    // Add the clicked button's value (number/operator) to the current expression
    currentExpression += input;

    // Update the calculator display with the current expression
    updateDisplay(currentExpression);
}

// Function to evaluate and calculate the result
function calculateResult() {
    try {
        // Use eval() to evaluate the mathematical expression (simple and effective for basic calculations)
        const resultValue = eval(currentExpression);

        // Display the result in the format "expression = result"
        updateDisplay(`${currentExpression} = ${resultValue}`);

        // Save the result for future calculations
        currentExpression = resultValue.toString();

        // Set the flag to reset the display after showing the result
        shouldReset = true;
    } catch (error) {
        // If there's an error in the expression (like division by zero), show "Error"
        updateDisplay('Error');
        currentExpression = '';  // Reset the expression
    }
}

// Function to clear the last input (like a backspace feature)
function clearLastEntry() {
    // Remove the last character from the current expression
    currentExpression = currentExpression.slice(0, -1);

    // Update the display, or show "0" if the expression is empty
    updateDisplay(currentExpression || '');
}

// Function to reset the calculator when "AC" is pressed (clear all)
function resetCalculator() {
    currentExpression = '';  // Clear the current expression
    shouldReset = false;     // Stop resetting for future inputs
    updateDisplay('0');      // Set the display to "0"
}

// Function to update the display with the provided value
function updateDisplay(value) {
    result.value = value;  // Show the value on the calculator display
}
