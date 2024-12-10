age = parseInt(localStorage.getItem('age')) || 0; // Default to 0 if no age is set



function calculateInfra(xcond, xfac) {
    const residence = document.getElementById('residence').value;

    if (residence === 'homeless') {
        return 1.00; // Homeless (High)
    }
    return (0.508 * xcond) + (0.492 * xfac);
}









// Function to toggle indoor details visibility

function toggleWorkplaceDetails() {
    const workplace = document.getElementById('workplace').value;
    const indoorDetails = document.getElementById('workDetails');
    if (workplace === 'indoor') {
        indoorDetails.classList.remove('hidden');
    } else {
        indoorDetails.classList.add('hidden');
    }
}

function calculateWorkplaceCategory() {
    const workplace = document.getElementById('workplace').value;
    const structure = document.getElementById('indoor_structure').value;

    if (workplace === 'indoor' && structure === 'indoor_well') {
        return 0.33; // Indoor, well-constructed (Low)
    } else if (workplace === 'indoor' && (structure === 'indoor_temp' || structure === 'machinery')) {
        return 0.66; // Indoor, temporary or machinery (Medium)
    } else if (workplace === 'outdoor') {
        return 1.00; // Outdoor (High)
    }
    return 0; // Invalid selection
}

// Function to calculate workplace facility category
function calculateWorkplaceFacilityCategory() {
    const services = document.getElementById('services').value;

    if (services === 'extra_facility') {
        return 0.33; // Facility: ACs (Low)
    } else if (services === 'basic_service') {
        return 0.66; // Basic Services (Medium)
    } else if (services === 'no_service') {
        return 1.00; // No services (High)
    }
    return 0; // Invalid selection
}

// Function to update work risk display
function updateWork(workrisk) {

    const displayRisk = document.getElementById('displayWorkRisk');
    displayRisk.innerText = `Risk: ${workrisk}`;
}




















// Function to toggle home details visibility

function toggleResidenceDetails() {
    const residence = document.getElementById('residence').value;
    const homeDetails = document.getElementById('homeDetails');
    if (residence === 'home') {
        homeDetails.classList.remove('hidden');
    } else {
        homeDetails.classList.add('hidden');
    }
}

// Function to calculate residence category

function calculateResidenceCategory() {
    const residence = document.getElementById('residence').value;
    const homeStructure = document.getElementById('structure').value;

    if (residence === 'home' && homeStructure === 'pukka_large') {
        return 0.33; // Pukka House > 30 sq.mt. (Low)
    } else if (residence === 'home' && homeStructure === 'pukka_small') {
        return 0.66; // Indoor, Kutcha (Medium)
    } else if (residence === 'homeless') {
        return 1.00; // Homeless (High)
    }
    return 0; // Invalid selection
}
// Function to calculate home facility category
function calculateHomeFacilityCategory() {
    const homeServices = document.getElementById('home_services').value;

    if (homeServices === 'extra_facility') {
        return 0.33; // Facilities: ACs (Low)
    } else if (homeServices === 'basic_service') {
        return 0.66; // Basic Services (Medium)
    } else if (homeServices === 'no_service') {
        return 1.00; // No services (High)
    }
    return 0; // Invalid selection
}

// Function to update home risk display
function updateHome(homerisk) {
    const displayRisk = document.getElementById('displayHomeRisk'); // Update display element ID
    displayRisk.innerText = `Risk: ${homerisk.toFixed(2)}`;

}













function calculateTransitCategory() {
    const transport_type = document.getElementById('transport_type').value;

    if (transport_type === "motorized_ac") {
        return 0.33; // Air-conditioned spaces (Low)
    } else if (transport_type === "motorized_non_ac") {
        return 0.66; // Non-air-conditioned motorized (Medium)
    } else if (transport_type === "non_motorized") {
        return 1.00; // Non-motorized (High)
    }
    return 0;
}

function updatetrans(transvalue) {
    const displaytrans = document.getElementById("displaytrans");
    displaytrans.innerText = transvalue;
}

















// Function to toggle alcohol details based on the first question
function toggleAlcoholDetails() {
    const alcohol = document.getElementById("alcohol").value;
    const alcoholDetails = document.getElementById("alcoholDetails");

    // Check if user is below the legal drinking age or is pregnant
    let age = parseInt(localStorage.getItem("age"));
    let isPregnant = localStorage.getItem("ispregnent");

    if (alcohol === "yes") {
        if (age <= 25 || isPregnant === "true") {
            // Hide further questions if conditions are met
            alcoholDetails.classList.add("hidden");
        } else {
            // Show further questions for valid users
            alcoholDetails.classList.remove("hidden");
        }
    } else {
        // Hide alcohol details and update risk for "no" selection
        alcoholDetails.classList.add("hidden");
    }
}

// Function to toggle quarterly details based on daily consumption
function toggleQuarterlyDetails() {
    const dailyConsumption = document.getElementById("daily_consumption").value;
    const quarterlyDetails = document.getElementById("quarterlyDetails");

    if (dailyConsumption === "yes") {
        quarterlyDetails.classList.remove("hidden");
    } else {
        quarterlyDetails.classList.add("hidden");
    }
}

// Function to calculate alcohol risk category
function calculateAlcoholCategory() {
    const alcohol = document.getElementById("alcohol").value;
    const dailyConsumption = document.getElementById("daily_consumption").value;
    const quarterlyFrequency = document.getElementById("quarterly_frequency").value;

    let age = parseInt(localStorage.getItem("age"));
    let isPregnant = localStorage.getItem("ispregnent");

    // Check for legal drinking age or pregnancy


    if (alcohol === "no") {
        return 0.33; // No alcohol consumption (Low)
    } else if (alcohol === "yes") {
        if (age <= 25 || isPregnant === "true") {
            return 1.00; // High risk
        }
        else if (dailyConsumption === "no") {
            return 0.66; // Social drinking, less than once/month in the last quarter (Medium)
        } else if (dailyConsumption === "yes") {
            if (quarterlyFrequency === "yes") {
                return 1.00; // Frequent drinking, more than once a month in the last quarter (High)
            } else if (quarterlyFrequency === "no") {
                return 0.66; // Social drinking, less than once/month in the last quarter (Medium)
            }
        }
    }
    return 0; // Default case for invalid selections
}

// Function to update alcohol risk display
function updateol(olValue) {
    const displayRisk = document.getElementById("displayol");
    displayRisk.innerText = `Risk: ${olValue}`;
}




















function calculateTobaccoRisk() {
    const tobacco = document.getElementById("tobacco").value; // Did you ever consume tobacco?

    // Additional conditions: Pregnancy and age
    const age = parseInt(localStorage.getItem("age"));
    const isPregnant = localStorage.getItem("ispregnant") === "true";

    // Check pregnancy or age < legal drinking age

    // Default risk level

    if (tobacco === "yes") {
        if (age < 25 || isPregnant) {
            return 1.00; // High risk
        }
        return 1.00

    } else if (tobacco === "never") {
        return 0.33;
    }

    return 0;
}

// Function to toggle the visibility of additional questions
function toggleTobaccoQuestions() {
    const tobacco = document.getElementById("tobacco").value;
    const tobaccoType = document.getElementById("tobacco_type");
    const lifetimeConsumption = document.getElementById("tobacco_70g");
    const recentTobacco = document.getElementById("recent_tobacco");
    const smokedLast5Years = document.getElementById("smoked_last_5years");
    const smokelessLast1Year = document.getElementById("smokeless_last_1year");

    const isPregnant = localStorage.getItem("ispregnant") === "true";
    const age = parseInt(localStorage.getItem("age"));

    // If age < 25 or pregnant, hide all subsequent questions
    if (age < 25 || isPregnant) {
        tobaccoType.parentElement.classList.add("hidden");
        lifetimeConsumption.parentElement.classList.add("hidden");
        recentTobacco.parentElement.classList.add("hidden");
        smokedLast5Years.parentElement.classList.add("hidden");
        smokelessLast1Year.parentElement.classList.add("hidden");
        return;
    }

    // Show questions based on the user's responses
    if (tobacco === "yes") {
        tobaccoType.parentElement.classList.remove("hidden");
        lifetimeConsumption.parentElement.classList.remove("hidden");
    } else {
        tobaccoType.parentElement.classList.add("hidden");
        lifetimeConsumption.parentElement.classList.add("hidden");
        recentTobacco.parentElement.classList.add("hidden");
        smokedLast5Years.parentElement.classList.add("hidden");
        smokelessLast1Year.parentElement.classList.add("hidden");
    }

    if (lifetimeConsumption && lifetimeConsumption.value === "no") {
        recentTobacco.parentElement.classList.remove("hidden");
    } else {
        recentTobacco.parentElement.classList.add("hidden");
    }

    if (lifetimeConsumption && lifetimeConsumption.value === "yes") {
        smokedLast5Years.parentElement.classList.remove("hidden");
        smokelessLast1Year.parentElement.classList.remove("hidden");
    } else {
        smokedLast5Years.parentElement.classList.add("hidden");
        smokelessLast1Year.parentElement.classList.add("hidden");
    }
}

// Function to update the risk display
function updateTobaccoRisk() {
    const riskLevel = calculateTobaccoRisk();
    document.getElementById("tobaccoRisk").innerText = `Risk Level: ${riskLevel}`;
}


















function calculateCaffeineCategory() {
    const caffeine = document.getElementById('caffeine').value;
    if (caffeine === "low") {
        return 0.33; // < 145 mg/day (Low)
    } else if (caffeine === "medium") {
        return 0.66; // 145 - 300 mg/day (Medium)
    } else if (caffeine === "high") {
        return 1.00; // > 300 mg/day (High)
    }
    return 0;
}

function updatecaff(caffvalue) {
    document.getElementById("displaycaff").innerText = caffvalue;
}






















function getSleepRecommendationByAge() {
    let age = parseInt(localStorage.getItem("age"));

    if (age >= 1 && age <= 2) {
        return { recommended: "11-14 hours", mayBeAppropriate: "9-10 or 15-16 hours", notRecommended: "Less than 9 or more than 16 hours" };
    } else if (age >= 3 && age <= 5) {
        return { recommended: "10-13 hours", mayBeAppropriate: "8-9 or 14 hours", notRecommended: "Less than 8 or more than 14 hours" };
    } else if (age >= 6 && age <= 13) {
        return { recommended: "9-11 hours", mayBeAppropriate: "7-8 or 12 hours", notRecommended: "Less than 7 or more than 12 hours" };
    } else if (age >= 14 && age <= 17) {
        return { recommended: "8-10 hours", mayBeAppropriate: "7 or 11 hours", notRecommended: "Less than 7 or more than 11 hours" };
    } else if (age >= 18 && age <= 25) {
        return { recommended: "7-9 hours", mayBeAppropriate: "6 or 10-11 hours", notRecommended: "Less than 6 or more than 11 hours" };
    } else if (age >= 26 && age <= 64) {
        return { recommended: "7-9 hours", mayBeAppropriate: "6 or 10 hours", notRecommended: "Less than 6 or more than 10 hours" };
    } else if (age >= 65) {
        return { recommended: "7-8 hours", mayBeAppropriate: "5-6 or 9 hours", notRecommended: "Less than 5 or more than 9 hours" };
    } else {
        return { message: "Invalid age" };
    }
}

function updateSleepOptions() {
    const sleepSelect = document.getElementById("sleep");

    let recommendations = getSleepRecommendationByAge();

    if (recommendations) {
        // Update each option text based on the recommendations
        sleepSelect.options[1].text = ` ${recommendations.recommended}`;
        sleepSelect.options[2].text = ` ${recommendations.mayBeAppropriate}`;
        sleepSelect.options[3].text = ` ${recommendations.notRecommended}`;
    }
}


document.addEventListener('DOMContentLoaded', updateSleepOptions);


function calculateSleepCategory() {
    const sleep = document.getElementById('sleep').value;
    if (sleep === "recommended") {
        return 0.33; // Recommended sleep (Low)
    } else if (sleep === "maybeAppropriate") {
        return 0.66; // May be appropriate (Medium)
    } else if (sleep === "notRecommended") {
        return 1.00; // Not recommended (High)
    }
    return 0;
}

function updatesleep() {
    let sleepvalue = calculateSleepCategory();
    document.getElementById("displaysleep").innerText = sleepvalue;
}



















/* function calculateRecommendations() {
    const fluidIntakeElement = document.getElementById('fluidIntake');
    const activityStatusElement = document.getElementById('activityStatus');

    if (!fluidIntakeElement || !activityStatusElement) {
        alert("Required input elements are missing.");
        return null; // Return null if DOM elements are missing
    }

    const fluidIntake = parseFloat(fluidIntakeElement.value);
    const activityStatus = activityStatusElement.value;

    if (isNaN(fluidIntake) || !activityStatus) {
        alert("Please fill in all fields.");
        return null; // Return null if inputs are invalid
    }

    const fluidCategory = calculateFluidCategory(fluidIntake, activityStatus);
    return fluidCategory; // Return the calculated fluid category
}

function calculateFluidCategory(fluidIntake, activityStatus) {
    const bodyWeight = 70; // Assumed average weight in kg; replace with actual input if needed
    const dailyFluidNeed = calculateFluidIntake(bodyWeight);
    const activityAdjustedFluidNeed = dailyFluidNeed * getActivityMultiplier(activityStatus);

    // Thresholds based on conditions
    const highThreshold = activityAdjustedFluidNeed;
    const mediumThreshold = highThreshold * 0.98;
    const lowThreshold = highThreshold * 0.96;

    if (fluidIntake >= highThreshold) {
        return 1.00;
    } else if (fluidIntake >= mediumThreshold) {
        return 0.66;
    } else {
        return 0.33;
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
            return 1.0; // Default multiplier
    }
}

function calculateFluidIntake(weight) {
    if (weight <= 10) {
        return 100 * weight; // 100ml/kg for the first 10 kg
    } else if (weight <= 20) {
        return 1000 + (50 * (weight - 10)); // 1000ml for first 10kg + 50ml/kg for next 10kg
    } else {
        return 1000 + 500 + (20 * (weight - 20)); // 1000ml + 500ml + 20ml/kg for remaining weight
    }
} */


function submitFluidDropdown() {
    // Get the selected value from the dropdown
    const dropdown = document.getElementById("fluidDropdown");
    const selectedValue = dropdown.value;

    // If no option is selected, alert the user
    if (!selectedValue) {
        alert("Please select an option.");
        return;
    }

    const fluidCategory = parseFloat(selectedValue);

    // Display the result
    const resultElement = document.getElementById("dropdownFluidResult");
    if (resultElement) {
        resultElement.textContent = `Your fluid consumption is categorized as ${fluidCategory}.`;
    }

    // Return the fluid category value
    return fluidCategory;
}


function updatefluid() {
    const fluidCategory = submitFluidDropdown();

    if (fluidCategory === null) {
        return; // Exit if input validation failed
    }

    const displayElement = document.getElementById("displayfluid");
    if (!displayElement) {
        console.error("Element with ID 'displayfluid' not found.");
        return;
    }

    displayElement.innerText = `Fluid Category: ${fluidCategory}`;
}
























function calculateAirQualityCategory() {
    const air_quality = document.getElementById('air_quality').value;
    if (air_quality === "good") {
        return 0.33; // Good air quality (Low)
    } else if (air_quality === "moderate") {
        return 0.66; // Moderately polluted (Medium)
    } else if (air_quality === "poor") {
        return 1.00; // Poor and severe AQI (High)
    }
    return 0;
}
function updateair() {
    let airvalue = calculateAirQualityCategory();
    document.getElementById("displayair").innerText = airvalue;
}








function calculateHospitalAccessibilityCategory() {
    const hospital_access_home = document.getElementById('hospital_access_home').value;
    if (hospital_access_home === "less_than_30") {
        return 0.33; // Hospital accessible within 30 minutes (Low)
    } else if (hospital_access_home === "30-60") {
        return 0.66; // Hospital accessible between 30 to 60 minutes (Medium)
    } else if (hospital_access_home === "more_than_60") {
        return 1.00; // Hospital accessible after more than 60 minutes (High)
    }
    return 0;
}
function updatehdis() {
    let hvalue = calculateHospitalAccessibilityCategory();
    document.getElementById("displayhospitaldis").innerText = hvalue;
}




document.getElementById('healthAssessmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Calculate categories
    const workplaceCategory = calculateWorkplaceCategory();
    const workplaceFacilityCategory = calculateWorkplaceFacilityCategory();
    const residenceCategory = calculateResidenceCategory();
    const homeFacilityCategory = calculateHomeFacilityCategory();
    const transitrisk = calculateTransitCategory();

    const alcoholrisk = calculateAlcoholCategory();
    const tobaccorisk = calculateTobaccoRisk();
    const caffeinerisk = calculateCaffeineCategory();
    const sleeprisk = calculateSleepCategory();
    const airQualityrisk = calculateAirQualityCategory();
    const hospitalAccessrisk = calculateHospitalAccessibilityCategory();

    // Infra risk calculation
    const homerisk = calculateInfra(residenceCategory, homeFacilityCategory);
    const workrisk = calculateInfra(workplaceCategory, workplaceFacilityCategory);



    let currentStatus = function timed() {
        let now = new Date();
        let hour = now.getHours();

        if (hour >= 9 && hour < 17) {
            return "at work";
        } else if ((hour >= 8 && hour < 9) || (hour >= 17 && hour < 18)) {
            return "traveling";
        } else {
            return "at home";
        }
    }();
    // Determine transit infra risk
    const xinfra_transit = currentStatus === "at work" ? workrisk :
        currentStatus === "at home" ? homerisk :
            transitrisk;

    // Lifestyle risk
    const liferisk = calculateLifestyle(alcoholrisk, tobaccorisk, caffeinerisk, sleeprisk);

    // Fluid risk
    const fluidrisk = /* calculateFluidCategory(fluidIntake, activityStatus)? */submitFluidDropdown();

    // Exposure Index
    const ExposureIndex = calculateExposureIndex(xinfra_transit, liferisk, fluidrisk, airQualityrisk, hospitalAccessrisk).toFixed(2);

    // Store and alert result
    localStorage.setItem('EI', ExposureIndex);
    alert("The Exposure Index is: " + ExposureIndex);
});





function calculateExposureIndex(xinfra_transit, xli, fluid, xairquality, xaccestohospital) {
    return (0.282 * xinfra_transit) + (0.184 * xli) + (0.282 * fluid) + (0.126 * xairquality) + (0.125 * xaccestohospital);
}



function calculateLifestyle(alcohol, tobacco, caffeine, sleep) {
    return (0.341 * alcohol) + (0.218 * tobacco) + (0.208 * caffeine) + (0.232 * sleep);
}







console.log(age);