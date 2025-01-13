
// Age Category Calculation
// Age input handler in form2.js
function handleAgeInput(agevalue) {
    localStorage.setItem('age', agevalue); // Store age in localStorage
/*     toggleEducationFields();
 */}
function handleGenderInput(gendervalue) {
    localStorage.setItem('gender', gendervalue); // Store age in localStorage
/*      toggleEducationFields();
 */} 
function handleWeightInput(weightvalue) {
    localStorage.setItem('weight', weightvalue); // Store age in localStorage
/*     toggleEducationFields();
 */}
function handleHeightInput(heightvalue) {
    localStorage.setItem('height', heightvalue.toFixed(2)); // Store age in localStorage
}









function setDateLimits() {
    const dobInput = document.getElementById('dob');

    // Set the earliest date (1900-01-01)
    const minDate = new Date(1900, 0, 1); // January 1, 1900
    // Set the latest date (June 10, 2024)
    const maxDate = new Date(2024, 5, 10); // Months are 0-indexed

    // Assign the limits in 'YYYY-MM-DD' format
    dobInput.min = minDate.toISOString().split('T')[0];
    dobInput.max = maxDate.toISOString().split('T')[0];
}

// Call setDateLimits on page load
document.addEventListener('DOMContentLoaded', setDateLimits);

function calculateAgeInDetail(dob) {
    const dobDate = new Date(dob);
    const today = new Date(2024, 5, 10); // Fixed to June 10, 2024

    let years = today.getFullYear() - dobDate.getFullYear();
    let months = today.getMonth() - dobDate.getMonth();
    let days = today.getDate() - dobDate.getDate();

    // Adjust if necessary
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the previous month
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

// Function to calculate age category based on age
function calculateAgeCategory() {
    const dobInput = document.getElementById('dob').value;
    console.log('Date of Birth:', dobInput);

    if (!dobInput) {
        alert('Please select a valid Date of Birth.');
        return 1.0; // Default fallback value
    }

    const ageDetail = calculateAgeInDetail(dobInput);
    let age = ageDetail.years;
    const month = ageDetail.months;
    const days =ageDetail.days;

    
    

    

    console.log('Calculated Age:', age);
    handleAgeInput(age);

    if (age >= 24 && age <= 39) {
        console.log('calculateAgeCategory:', 0.33);
        return 0.33; // Low risk
    } else if ((age >= 5 && age < 24) || (age >= 40 && age <= 65)) {
        // Special case for age 65
        if (age === 65 && (days > 0 || month > 0)) {
            console.log('calculateAgeCategory (special case for age 65):', 1.00);
            return 1.00; // High risk
        }
        console.log('calculateAgeCategory:', 0.66);
        return 0.66; // Medium risk
    } else {
        console.log('calculateAgeCategory:', 1.00);
        return 1.00; // High risk
    }
    
}

// Function to display both age category and detailed age
function updateAgeCategory() {
    const dobInput = document.getElementById('dob').value;
    if (!dobInput) {
        alert('Please select a valid Date of Birth.');
        return;
    }

    // Calculate age details
    const ageDetail = calculateAgeInDetail(dobInput);
    const ageCategory = calculateAgeCategory();

    // Update display
    const ageDisplay = document.getElementById('displayAgeCategory');
    ageDisplay.innerText = ageCategory !== null ? `Category: ${ageCategory}` : 'Invalid input';

    const ageDetailDisplay = document.getElementById('displayAgeDetail');
    ageDetailDisplay.innerText =
        `Age: ${ageDetail.years} years, ${ageDetail.months} months, and ${ageDetail.days} days`;
}





















// Convert weight to kg if necessary
function convertWeightToKg(weight, unit) {
    if (unit === 'lb') {
        return weight * 0.453592; // Convert pounds to kilograms
    }
    return weight; // Already in kilograms
}

// Toggle visibility of feet and inches inputs
function toggleFeetInchesInputs() {
    const heightUnit = document.getElementById('height-unit').value;
    const feetInchesContainer = document.getElementById('feet-inches-container');
    const heightInput = document.getElementById('height');

    if (heightUnit === 'ft') {
        feetInchesContainer.style.display = 'block';
        heightInput.style.display = 'none';
    } else {
        feetInchesContainer.style.display = 'none';
        heightInput.style.display = 'block';
    }
}

// Convert height to meters if necessary
function convertHeightToMeters() {
    const heightUnit = document.getElementById('height-unit').value;

    if (heightUnit === 'm') {
        return parseFloat(document.getElementById('height').value); // Already in meters
    } else if (heightUnit === 'cm') {
        return parseFloat(document.getElementById('height').value) / 100; // Convert cm to meters
    } else if (heightUnit === 'ft') {
        const feet = parseFloat(document.getElementById('height-feet').value) || 0;
        const inches = parseFloat(document.getElementById('height-inches').value) || 0;
        return feet * 0.3048 + inches * 0.0254; // Convert feet and inches to meters
    }

    return null; // Invalid input
}

// Calculate BMI
function calculateBMI() {
    console.log("Starting calculateBMI...");

    const weight = parseFloat(document.getElementById('weight').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const heightUnit = document.getElementById('height-unit').value;

    console.log(`Weight entered: ${weight} ${weightUnit}`);
    console.log(`Height unit selected: ${heightUnit}`);

    if (!weight) {
        console.error("Invalid weight input.");
        alert('Please enter a valid weight.');
        return null; // Return null for invalid weight
    }

    // Convert weight to kg
    const weightInKg = convertWeightToKg(weight, weightUnit);
    console.log(`Converted Weight in Kg: ${weightInKg}`);
    handleWeightInput(weightInKg);

    // Handle height based on the selected unit
    let heightInMeters = null;
    if (heightUnit === 'ft') {
        const feet = parseFloat(document.getElementById('height-feet').value) || 0;
        const inches = parseFloat(document.getElementById('height-inches').value) || 0;

        if (feet === 0 && inches === 0) {
            console.error("Invalid height input for feet and inches.");
            alert('Please enter valid height in feet and inches.');
            return null; // Return null for invalid height
        }

        heightInMeters = feet * 0.3048 + inches * 0.0254; // Convert feet and inches to meters
    } else {
        const height = parseFloat(document.getElementById('height').value);
        if (!height) {
            console.error("Invalid height input.");
            alert('Please enter a valid height.');
            return null; // Return null for invalid height
        }
        heightInMeters = convertHeightToMeters();
    }

    console.log(`Converted Height in Meters: ${heightInMeters}`);
    handleHeightInput(heightInMeters);

    // BMI formula
    const bmi = weightInKg / (heightInMeters ** 2);
    const bmiRounded = parseFloat(bmi.toFixed(1)); // Round to 1 decimal place
    console.log(`Calculated BMI (Rounded): ${bmiRounded}`);
    return bmiRounded;
}


// Categorize BMI
function calculateBMICategory() {
    console.log("Starting calculateBMICategory...");

    const bmi = calculateBMI();

    if (bmi === null) {
        console.warn("BMI calculation returned null. Exiting.");
        return null;
    }

    console.log(`BMI to categorize: ${bmi}`);

    // Categorize BMI based on the ranges
    if (bmi >= 18.5 && bmi < 25) {
        console.log("BMI falls in the Normal weight range: Returning 0.33");
        return 0.33; // Normal weight
    } else if ((bmi >= 17.0 && bmi < 18.5) || (bmi >= 25.0 && bmi < 30.0)) {
        console.log("BMI falls in the Slightly underweight/overweight range: Returning 0.66");
        return 0.66; // Slightly underweight or overweight
    } else if (bmi < 17.0 || bmi >= 30.0) {
        console.log("BMI falls in the Severely underweight/obese range: Returning 1.00");
        return 1.00; // Severely underweight or obese
    }

    console.warn("BMI does not fall in any defined range. Returning 0.");
    return 0; // Return a fallback value if no range matches
}

// Update BMI display
function updateBmi() {
    let BMI = calculateBMI();
    let bmiValue = calculateBMICategory();
    const bmiField = document.getElementById('displaybmi');
    bmiField.innerText = bmiValue !== null ? `BMI:${BMI} and Value is:${bmiValue}` : "Invalid input";

}






















// Economic Status Category Calculation
function calculateEconomicCategory() {
    const income = document.getElementById('income').value;
    const result = (income === "low") ? 0.33 : (income === "medium") ? 0.66 : 1.00;
    console.log("calculateEconomicCategory:", result);
    return result;
}
function updateeco(ecovalue) {
    document.getElementById('displayeco').innerText = ecovalue;
}




















// Social Isolation Category Calculation
function calculateSocialIsolationCategory() {
    const adults = document.getElementById('adults').value;
    const result = (adults === "low") ? 0.33 : (adults === "medium") ? 0.66 : 1.00;
    console.log("calculateSocialIsolationCategory:", result);
    return result;
}
function updateSI(sivalue) {
    document.getElementById('displaySI').innerText = sivalue;
}




















// Education Category Calculation
function calculateEducationCategory() {
    const age = localStorage.getItem("age");

    const educationLevel = document.getElementById('educationLevel').value;
    const enrolled = document.getElementById('enrolled').value;

    let result = 0;



    if (educationLevel === "post_graduate" || educationLevel === "graduate" || educationLevel === "Above_post_graduate") {
        result = 0.33;
    } else if (educationLevel === "ssc") {
        result = 0.66;
    } else if (educationLevel === "below_10th") {

        if (age <= 25) {
            if (enrolled === "yes") {
                result = 0.33;
            }
            else {
                result = 1.00;
            }
        }
        else {
            result = 1.00;
        }
    }

    console.log("calculateEducationCategory:", result);
    return result;
}
function updateedu() {
    let eduvalue = calculateEducationCategory();
    document.getElementById('displayedu').innerText = eduvalue;
}

function toggleEducationFields() {
    const enrollmemt = document.getElementById('enrollmentField');
    const educationLevel = document.getElementById('educationLevel').value;

    const age = localStorage.getItem("age");
    if ((age <= 25) && (educationLevel === "below_10th")) {
        enrollmemt.classList.remove('hidden');

    }
    else {
        enrollmemt.classList.add('hidden');

    }
}






















// Gender Category Calculation
function calculateGenderCategory() {
    const gender = document.getElementById('gender').value;
    let pregnant = document.getElementById('pregnantbx');
    let result = 0;
    handleGenderInput(gender);
    pregnant.classList.add('hidden');
    if (gender === "male") {
        localStorage.setItem("ispregnant", false);

        result = 0.66;
    } else if (gender === "female") {
        pregnant.classList.remove('hidden');
        result = 1.00;
    }
    else if (gender === "intersex") {
        localStorage.setItem("ispregnant", false);

        result = 1.00;

    }
    console.log("calculateGenderCategory:", result);
    return result;
}

function togglePregnancyField() {
    const gender = document.getElementById('gender').value;
    document.getElementById('pregnantbx').classList.toggle('hidden', gender !== 'female');
}

function updategender(genvalue) {

    document.getElementById('displaygender').innerText = genvalue;
}

function setpregnancy() {
    let pragnent = document.getElementById("pregnant").value;
    if (pragnent === "yes") {
        localStorage.setItem("ispregnant", true);
    }
    else {
        localStorage.setItem("ispregnant", false);
    }
}























// Health Issues Category Calculation
function calculateHealthIssuesCategory() {
    const chronic = document.getElementById('chronic_issues').value;
    const hospital = document.getElementById("health_issues").value;
    let result = 0;
    if (chronic === "yes") {
        result = 1.00;
    }
    else if (chronic === "no") {
        result = (hospital === "low") ? 0.33 : (hospital === "medium") ? 0.66 : 1.00;
    }
    console.log("calculateHealthIssuesCategory:", result);
    return result;
}

function togglechronic() {
    const chronic = document.getElementById("chronic_issues");
    const hospital = document.getElementById("hospital");
    hospital.classList.add("hidden");

    if (chronic.value === "no") {
        hospital.classList.remove("hidden");
    }
}
function updateHI(HIvalue) {
    document.getElementById('displayHI').innerText = HIvalue;
}








// Medication Category Calculation
function calculateMedicationCategory() {
    // Get the value of the selected option from the dropdown
    const medication = document.getElementById('medication').value;

    // Check if the medication value is valid (not empty)
    if (!medication) {
        console.error("No medication option selected.");
        return null;  // Return null if no option is selected
    }

    // Determine the result based on the selected value
    let result;
    if (medication === "no_medication") {
        result = 0.33;  // If no medication, return 0.33
    } else if (medication === "yes_medication") {
        result = 1.00;  // If on medication, return 1.00
    } else {
        console.warn("Unexpected value selected for medication.");
        return 0;  // Return 0 if the value is unexpected (safety fallback)
    }

    console.log("calculateMedicationCategory:", result);  // Log the result for debugging
    return result;
}

function updateMed(MEDvalue) {
    const medication = document.getElementById('displaymed');
    medication.textContent = MEDvalue;

}




// Health Issues & Medication Index Calculation
function calculateHealthIssuesIndex() {
    const healthIssues = calculateHealthIssuesCategory();
    const medication = calculateMedicationCategory();
    if (medication == 0) {
        const result = (1 * healthIssues);
        console.log("calculateHealthIssuesIndex:", result);
        return result;
    } else {
        const result = (0.53 * healthIssues + 0.47 * medication);
        console.log("calculateHealthIssuesIndex:", result);
        return result;
    }

}









//Disability index
function calculateDisabilityCategory() {
    const disability = document.getElementById('disability').value;
    const benchmarkDisability = document.getElementById('benchmarkDisability').value;
    let disabilityCategory;

    if (disability === "no") disabilityCategory = 0.33;
    else if (benchmarkDisability === "less_than_benchmark") disabilityCategory = 0.66;
    else disabilityCategory = 1.00;

    console.log("calculateDisabilityCategory:", disabilityCategory);
    return disabilityCategory;
}
function toggleDisabilityOptions() {
    const disability = document.getElementById('disability').value;
    document.getElementById('benchmarkField').classList.toggle('hidden', disability !== 'yes');
}
function updatedisable(disvalue) {
    const medication = document.getElementById('displaydis');
    medication.textContent = disvalue;

}













// Vulnerability Index Calculation
function calculateVulnerabilityIndex() {
    const xage = calculateAgeCategory();
    const xbmi = calculateBMICategory();
    const xes = calculateEconomicCategory();
    const xsi = calculateSocialIsolationCategory();
    const xed = calculateEducationCategory();
    const xg = calculateGenderCategory();
    const xhi = calculateHealthIssuesIndex();
    const xdi = calculateDisabilityCategory(); // Default for disability

    const vi = (0.160 * xage) +
        (0.117 * xbmi) +
        (0.142 * xes) +
        (0.092 * xsi) +
        (0.094 * xed) +
        (0.097 * xg) +
        (0.198 * xhi) +
        (0.100 * xdi);


    console.log("calculateVulnerabilityIndex:", vi);
    return vi;
}


// Form submit handler
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    let vulnerabilityIndex = calculateVulnerabilityIndex();
    
    // Assuming vulnerabilityIndex is already calculated
    localStorage.setItem('VI', vulnerabilityIndex.toFixed(2));

    alert("Your Vulnerability Index is: " + vulnerabilityIndex.toFixed(2));
});


























function calculateRecommendations() {
    const fluidIntake = parseFloat(document.getElementById('fluidIntake').value);
    const activityStatus = document.getElementById('activityStatus').value;

    if (isNaN(fluidIntake) || !activityStatus) {
        alert("Please fill in all fields.");
        return;
    }

    const bodyWeight = 70; // Assume average weight for calculation (in kg), can be replaced by an input
    const bmr = calculateBMR(bodyWeight, 25, 'male'); // Replace 25 with actual age and gender as needed
    const activityMultiplier = getActivityMultiplier(activityStatus);
    const dailyFluidIntake = calculateFluidIntake(bodyWeight);

    const adjustedBMR = bmr * activityMultiplier;
    const fluidRecommendation = adjustedBMR * 0.05; // 50ml for every 100kcal

    let recommendationMessage;

    if (fluidIntake > fluidRecommendation) {
        recommendationMessage = "Your daily fluid intake is adequate.";
    } else if (fluidIntake < (dailyFluidIntake * 0.98)) {
        recommendationMessage = "Your fluid intake is below the recommended levels.";
    } else if (fluidIntake < (dailyFluidIntake * 0.96)) {
        recommendationMessage = "Your fluid intake is significantly below the recommended levels.";
    } else {
        recommendationMessage = "Your fluid intake is marginally below the recommended levels.";
    }

    document.getElementById('recommendationMessage').textContent = recommendationMessage;
    document.getElementById('result').classList.remove('hidden');
}

function calculateBMR(weight, age, gender) {
    if (gender === 'male') {
        return 66 + (13.7 * weight) + (5 * 175) - (6.8 * age); // Assume height is 175 cm for demo
    } else {
        return 655 + (9.6 * weight) + (1.8 * 175) - (4.7 * age); // Assume height is 175 cm for demo
    }
}

function getActivityMultiplier(activityStatus) {
    switch (activityStatus) {
        case 'sedentary':
            return 1.2;
        case 'lightly_active':
            return 1.375;
        case 'moderately_active':
            return 1.55;
        case 'very_active':
            return 1.725;
        case 'extra_active':
            return 1.9;
        default:
            return 1.0;
    }
}

function calculateFluidIntake(weight) {
    let fluidIntake = 0;
    if (weight <= 10) {
        fluidIntake = 100 * weight; // 100ml/kg for the first 10 kg
    } else if (weight <= 20) {
        fluidIntake = 1000 + (50 * (weight - 10)); // 1000ml for first 10kg + 50ml/kg for the next 10kg
    } else {
        fluidIntake = 1000 + 500 + (20 * (weight - 20)); // 1000ml + 500ml + 20ml/kg for the remaining weight
    }
    return fluidIntake; // Total fluid in ml
}





