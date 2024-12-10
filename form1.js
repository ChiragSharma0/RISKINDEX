
// Age Category Calculation
// Age input handler in form2.js
function handleAgeInput(agevalue) {
    localStorage.setItem('age', agevalue); // Store age in localStorage
/*     toggleEducationFields();
 */}

function setDateLimits() {
    const dobInput = document.getElementById('dob');
    const today = new Date();

    // Set the earliest date (1900-01-01)
    const minDate = new Date(1900, 0, 1); // January 1, 1900
    // Set the latest date (today)
    const maxDate = today;

    // Assign the limits in 'YYYY-MM-DD' format
    dobInput.min = minDate.toISOString().split('T')[0];
    dobInput.max = maxDate.toISOString().split('T')[0];
}

// Call setDateLimits on page load
document.addEventListener('DOMContentLoaded', setDateLimits);

// Function to calculate age based on DOB
function calculateAge(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();
    const dayDifference = today.getDate() - dobDate.getDate();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}

// Function to calculate the age category based on the calculated age
function calculateAgeCategory() {
    const dobInput = document.getElementById('dob').value;
    console.log(dobInput);
    if (!dobInput) {
        alert('Please select a valid Date of Birth.');
        return 1.0; // Default fallback value
    }

    const age = calculateAge(dobInput);
    handleAgeInput(age);
    if (age >= 24 && age <= 40) {
        console.log('calculateAgeCategory:', 0.33);
        return 0.33;
    } else if ((age >= 5 && age < 24) || (age > 40 && age <= 65)) {
        console.log('calculateAgeCategory:', 0.66);
        return 0.66;
    } else {
        console.log('calculateAgeCategory:', 1.00);
        return 1.00;
    }
}

// Function to update the displayed age category
function updateAge(ageValue) {
    const ageField = document.getElementById('displayage');
    ageField.innerText = ageValue;
}



















// Convert weight to kg if necessary
function convertWeightToKg(weight, unit) {
    if (unit === 'lb') {
        return weight * 0.453592; // Convert pounds to kilograms
    }
    return weight; // Already in kilograms
}

// Convert height to meters if necessary
function convertHeightToMeters(height, unit) {
    if (unit === 'cm') {
        return height / 100; // Convert centimeters to meters
    } else if (unit === 'ft') {
        return height * 0.3048; // Convert feet to meters
    }
    return height; // Already in meters
}

// Calculate BMI
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const height = parseFloat(document.getElementById('height').value);
    const heightUnit = document.getElementById('height-unit').value;

    if (!weight || !height) {
        alert('Please enter valid weight and height.');
        return 0;
    }

    // Convert inputs to standard units
    const weightInKg = convertWeightToKg(weight, weightUnit);
    const heightInMeters = convertHeightToMeters(height, heightUnit);

    // BMI formula
    return weightInKg / (heightInMeters ** 2);
}

// Categorize BMI
function calculateBMICategory() {
    const bmi = calculateBMI();
    if (bmi === null) return 0;

    // Evaluate BMI categories
    if (bmi >= 18.5 && bmi <= 24.9) {
        console.log("calculateBMICategory:", 0.33);
        return 0.33;
    } else if ((bmi > 17.0 && bmi < 18.5) || (bmi > 25.0 && bmi < 30)) {
        console.log("calculateBMICategory:", 0.66);
        return 0.66;
    } else {
        console.log("calculateBMICategory:", 1.00);
        return 1.00;
    }
}

// Update BMI display
function updateBmi(bmiValue) {
    const bmiField = document.getElementById('displaybmi');
    bmiField.innerText = bmiValue !== null ? bmiValue : "Invalid input";
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



    if (educationLevel === "post_graduate") {
        result = 0.33;
    } else if (educationLevel === "ssc") {
        result = 0.66;
    } else if (educationLevel === "below_10th") {

        if (age <= 25) {
            if (enrolled === "yes") {
                result = 0.33;
            }
            else{
                result = 1.00;
            }
        }
        else{
            result = 1.00;
        }
    }

    console.log("calculateEducationCategory:", result);
    return result;
}
function updateedu(eduvalue) {
    document.getElementById('displayedu').innerText = eduvalue;
}

function toggleEducationFields() {
   const enrollmemt = document.getElementById('enrollmentField');
   const educationLevel = document.getElementById('educationLevel').value;

    const age = localStorage.getItem("age");
    if ((age <= 25) && (educationLevel === "below_10th")) {
    enrollmemt.classList.remove('hidden');

    }
    else{
        enrollmemt.classList.add('hidden');

    }
}






















// Gender Category Calculation
function calculateGenderCategory() {
    const gender = document.getElementById('gender').value;
    let pregnant = document.getElementById('pregnantbx');
    let result = 0;

    pregnant.classList.add('hidden');
    if (gender === "male") {
        result = 0.66;
    } else if (gender === "female") {
        pregnant.classList.remove('hidden');
        result = 1.00;
    }
    else if(gender === "intersex"){
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

function setpregnancy(){
   let pragnent = document.getElementById("pregnant").value;
   if(pragnent === "yes"){
    localStorage.setItem("ispregnant",true);
   }
   else{
     localStorage.setItem("ispregnant",false);
   }
}























// Health Issues Category Calculation
function calculateHealthIssuesCategory() {
    const chronic = document.getElementById('chronic_issues').value;
    const hospital = document.getElementById("health_issues").value;
    let result = 0;
    if(chronic === "yes"){
        result = 1.00;
    }
    else if (chronic === "no"){
        result =  (hospital === "low") ? 0.33 : (hospital === "medium") ? 0.66 : 1.00;
    }
    console.log("calculateHealthIssuesCategory:", result);
    return result;
}

function togglechronic(){
    const chronic = document.getElementById("chronic_issues");
    const hospital = document.getElementById("hospital");
    hospital.classList.add("hidden");

    if(chronic.value === "no"){
       hospital.classList.remove("hidden");
    }
}
function updateHI(HIvalue) {
    document.getElementById('displayHI').innerText = HIvalue;
}








// Medication Category Calculation
function calculateMedicationCategory() {
    const medication = document.getElementById('medication').value;
    const result = (medication === "no_medication") ? 0.33 : 1.00;
    console.log("calculateMedicationCategory:", result);
    return result;
}
function updateMed(MEDvalue){
    const medication = document.getElementById('displaymed');
    medication.textContent = MEDvalue;

}




// Health Issues & Medication Index Calculation
function calculateHealthIssuesIndex() {
    const healthIssues = calculateHealthIssuesCategory();
    const medication = calculateMedicationCategory();

    const result = (0.53 * healthIssues + 0.47 * medication);
    console.log("calculateHealthIssuesIndex:", result);
    return result;
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
function updatedisable(disvalue){
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
        (0.142 * xg) +
        (0.198 * xhi) +
        (0.100 * xdi);

    console.log("calculateVulnerabilityIndex:", vi);
    return vi;
}

(0.160 * 1) +
        (0.117 * 1) +
        (0.142 * 1) +
        (0.092 * 1) +
        (0.094 * 1) +
        (0.142 * 1) +
        (0.198 * 1) +
        (0.100 * 1)

// Form submit handler
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const vulnerabilityIndex = calculateVulnerabilityIndex();
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





