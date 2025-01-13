// Function to fetch heat stress value from the API
async function fetchHeatStress() {
    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    const utciKey = document.getElementById('utciKey').value;

    if (!lat || !lng || !utciKey) {
        alert("Please provide valid latitude, longitude, and UTCI key.");
        return;
    }

    try {
        const response = await fetch(`/api/search?lat=${lat}&lng=${lng}&utciKey=${utciKey}`);
        const data = await response.json();

        if (response.ok) {
            const T = parseFloat(data.value); // UTCI temperature
            let K;
 
            // Determine normalized range based on UTCI value
            if (T >= 9 && T <= 26) {
                K = 0 + ((T - 9) / (26 - 9)) * (0.25 - 0); // No thermal Stress
            } else if (T > 26 && T <= 32) {
                K = 0.25 + ((T - 26) / (32 - 26)) * (0.50 - 0.25); // Moderate Heat Stress
            } else if (T > 32 && T <= 38) {
                K = 0.50 + ((T - 32) / (38 - 32)) * (0.75 - 0.50); // Strong Heat Stress
            } else if (T > 38 && T <= 46) {
                K = 0.75 + ((T - 38) / (46 - 38)) * (1.00 - 0.75); // Very Strong Heat Stress
            } else if (T > 46) {
                K = 1.00; // Extreme Heat Stress
            } else {
                K = 0; // Default for values below +9
                document.getElementById('result').innerText = "The UTCI value is below the acceptable range.";
                return;
            }

            K = K.toFixed(2); // Limit precision to 2 decimal places

            document.getElementById('result').innerText = `The normalized UTCI heat stress value (K) is: ${K}`;
            localStorage.setItem('HI', K);

        } else {
            document.getElementById('result').innerText = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById('result').innerText = "An error occurred while fetching data.";
    }
}
