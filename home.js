// home.js

document.addEventListener('DOMContentLoaded', () => {
    const VI = localStorage.getItem('VI');
    const EI = localStorage.getItem('EI');
    const HI = localStorage.getItem('HI');

    document.getElementById('VI').textContent = VI || 'N/A';
    document.getElementById('EI').textContent = EI || 'N/A';
    document.getElementById('HI').textContent = HI || 'N/A';



    
    // Event listener for the Calculate button
    document.getElementById('calculateButton').addEventListener('click', () => {
        if (VI && EI && HI) {
            // Example calculation using the values
            const finalResult = (parseFloat(VI) + parseFloat(EI) + parseFloat(HI));
            document.getElementById('result').textContent = `Calculated Result: ${finalResult.toFixed(2)}`;
        } else {
            document.getElementById('result').textContent = 'One or more values are missing.';
        }
    });


});