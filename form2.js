age = parseInt(localStorage.getItem('age')) || 0; // Default to 0 if no age is set



function calculateInfra(xcond, xfac) {

    xcond = parseFloat(xcond);
    xfac = parseFloat(xfac);

    return (0.508 * xcond) + (0.492 * xfac);
}









// Function to toggle indoor details visibility
function toggleWorkplaceDetails() {
    const workplace = document.getElementById('workplace').value;
    const indoorDetails = document.getElementById('indoorDetails');
    if (workplace === 'indoor') {
        indoorDetails.classList.remove('hidden');
    } else {
        indoorDetails.classList.add('hidden');
        document.getElementById('indoorStructureDetails').classList.add('hidden');
    }
}

function toggleIndoorStructure() {
    const heavyMachinery = document.getElementById('heavy_machinery').value;
    const indoorStructureDetails = document.getElementById('indoorStructureDetails');
    if (heavyMachinery === 'no') {
        indoorStructureDetails.classList.remove('hidden');
    } else {
        indoorStructureDetails.classList.add('hidden');
    }
}

function calculateWorkplaceCategory() {
    const workplace = document.getElementById('workplace').value;
    const heavyMachinery = document.getElementById('heavy_machinery').value;
    const structure = document.getElementById('indoor_structure').value;

    if (workplace === 'indoor') {
        if (heavyMachinery === 'yes') {
            return 1.00; // Indoor with heavy machinery (High)
        } else if (structure === 'indoor_well') {
            return 0.33; // Indoor, well-constructed (Low)
        } else if (structure === 'indoor_temp') {
            return 0.66; // Indoor, temporary structure (Medium)
        }
    } else if (workplace === 'outdoor') {
        return 1.00; // Outdoor (High)
    }
    return 0; // Invalid selection
}

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

function updateWork(workrisk) {
    let workplacerisk = calculateWorkplaceCategory();
    let WorkplaceFacilityCategory = calculateWorkplaceFacilityCategory();
    const displayRisk = document.getElementById('displayWorkRisk');
    displayRisk.innerText = `Workplacerisk: ${workplacerisk} \nWorkFacilityRisk: ${WorkplaceFacilityCategory} \nRisk: ${workrisk.toFixed(2)}`;
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
    let Homerisk = calculateResidenceCategory();
    let homeFacilityCategory = calculateHomeFacilityCategory();
    displayRisk.innerText = `
    Homerisk : ${Homerisk} \n
      HomeFcilityRisk: ${homeFacilityCategory} \n
       Risk: ${homerisk.toFixed(2)}`;

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

    if (dailyConsumption === "no") {
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
        else if (dailyConsumption === "yes") {
            return 1.00;
        }
        else if (dailyConsumption === "no") {
            if (quarterlyFrequency === "no") {
                return 0.66;
            }
            else {
                return 1.00;
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









 



function toggleTobaccoQuestions() {
    const tobaccoConsumed = document.getElementById('tobaccoConsumed').value;
    const tobaccoDetails = document.getElementById('tobaccoDetails');
    const displayRisk = document.getElementById('displayTobaccoRisk');
    const userAge = parseInt(localStorage.getItem('age'), 10);
    const isPregnant = localStorage.getItem('ispregnant') === 'true';

    if (tobaccoConsumed === 'no') {
        displayRisk.innerText = 'Risk: 0.33';
        tobaccoDetails.classList.add('hidden');
    } else {
        if (userAge < 25 || isPregnant) {
            displayRisk.innerText = 'Risk: 1.00';
            tobaccoDetails.classList.add('hidden');
        } else {
            tobaccoDetails.classList.remove('hidden');
        }
    }
}

function toggleTobaccoAmountQuestion() {
    document.getElementById('tobaccoAmountDetails').classList.remove('hidden');
}

function toggleFurtherQuestions() {
    const tobaccoAmount = document.getElementById('tobaccoAmount').value;
    const tobaccoType = document.getElementById('tobaccoType').value;

    document.getElementById('recentTobaccoDetails').classList.add('hidden');
    document.getElementById('smokelessDetails').classList.add('hidden');
    document.getElementById('smokedDetails').classList.add('hidden');

    if (tobaccoAmount === 'no') {
        document.getElementById('recentTobaccoDetails').classList.remove('hidden');
    } else if (tobaccoAmount === 'yes') {
        if (tobaccoType === 'smoke' || tobaccoType === 'both') {
            document.getElementById('smokedDetails').classList.remove('hidden');
        }
        if (tobaccoType === 'smokeless' || tobaccoType === 'both') {
            document.getElementById('smokelessDetails').classList.remove('hidden');
        }
    }
}

function calculateTobaccoRisk() {
    const tobaccoConsumed = document.getElementById('tobaccoConsumed').value;
    const tobaccoType = document.getElementById('tobaccoType').value;
    const tobaccoAmount = document.getElementById('tobaccoAmount').value;
    const recentTobacco = document.getElementById('recentTobacco').value;
    const smokelessTobacco = document.getElementById('smokelessTobacco').value;
    const smokedTobacco = document.getElementById('smokedTobacco').value;
    const userAge = parseInt(localStorage.getItem('age'), 10);
    const isPregnant = localStorage.getItem('ispregnant') === 'true';

    let risk = 0;

    if (tobaccoConsumed === 'no') {
        risk = 0.33;
    } else if (userAge < 25 || isPregnant) {
        risk = 1.00;
    } else if (tobaccoAmount === 'no') {
        risk = recentTobacco === 'yes' ? 0.66 : 0.33;
    } else if (tobaccoAmount === 'yes') {
        if (tobaccoType === 'smoke' || tobaccoType === 'both') {
            risk = smokedTobacco === 'yes' ? 1.00 : 0.66;
        }
        if (tobaccoType === 'smokeless' || tobaccoType === 'both') {
            risk = smokelessTobacco === 'yes' ? 1.00 : 0.33;
        }
        if (tobaccoType === 'both') {
            if (smokedTobacco === 'yes' && smokelessTobacco === 'yes') {
                risk = 1.00;
            } else if (smokedTobacco === 'no' && smokelessTobacco === 'no') {
                risk = 0.33;
            } else {
                risk = 0.66;
            }
        }
    }

    return risk.toFixed(2);
}

function updateTobaccoRisk() {
    const risk = calculateTobaccoRisk();
    document.getElementById('displayTobaccoRisk').innerText = `Risk: ${risk}`;
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





















function evaluateFluidIntake(userFluidIntakeLiters, activityStatus) {
    console.log("User input fluid intake (liters):", userFluidIntakeLiters);

    const weight = parseFloat(localStorage.getItem('weight')); // User's weight in kg
    if (!weight || isNaN(userFluidIntakeLiters)) {
        alert("Missing or invalid weight or fluid intake.");
        return null;
    }

    // Convert fluid intake from liters to milliliters
    const userFluidIntake = userFluidIntakeLiters * 1000;
    console.log("User input fluid intake (milliliters):", userFluidIntake);

    // Calculate fluid needs using Holliday-Segar formula
    const fluidHollidaySegar = calculateFluidIntakeHollidaySegar(weight);
    console.log("Holliday-Segar fluid requirement (mL):", fluidHollidaySegar);

    // Calculate fluid needs using BMR-based formula
    const fluidBMR = calculateFluidIntakeBMR(activityStatus);
    console.log("BMR-based fluid requirement (mL):", fluidBMR);

    // Find the larger of the two fluid requirements
    const largerFluidRequirement = Math.max(fluidHollidaySegar, fluidBMR);
    console.log("Larger fluid requirement (mL):", largerFluidRequirement);

    // Thresholds based on body weight
    const lowCategoryThreshold = largerFluidRequirement;
    const twoPercentLess = lowCategoryThreshold * 0.98;
    const fourPercentLess = lowCategoryThreshold * 0.96;

    console.log("Low category threshold (mL):", lowCategoryThreshold);
    console.log("2% less than low category (mL):", twoPercentLess);
    console.log("4% less than low category (mL):", fourPercentLess);

    // Determine the category based on user's fluid intake
    if (userFluidIntake >= lowCategoryThreshold) {
        return 0.33; // Meets or exceeds larger fluid requirement
    } else if (userFluidIntake >= twoPercentLess) {
        return 0.66; // Less than 2% below requirement
    } else if (userFluidIntake >= fourPercentLess) {
        return 1.00; // Less than 4% below requirement
    } else {
        return 1.00; // Extreme deficiency (fallback to high risk)
    }
}

function calculateFluidIntakeHollidaySegar(weight) {
    if (weight <= 10) {
        return 100 * weight; // 100ml/kg for the first 10 kg
    } else if (weight <= 20) {
        return 1000 + (50 * (weight - 10)); // 1000ml for first 10kg + 50ml/kg for next 10kg
    } else {
        return 1000 + 500 + (20 * (weight - 20)); // 1000ml + 500ml + 20ml/kg for remaining weight
    }
}

function calculateFluidIntakeBMR(activityStatus) {
    const weight = parseFloat(localStorage.getItem('weight'));
    const height = parseFloat(localStorage.getItem('height')) * 100;
    const age = parseInt(localStorage.getItem('age'));
    const gender = localStorage.getItem('gender');

    if (!weight || !height || !age || !gender) {
        alert("Missing one or more values (weight, height, age, gender) from localStorage.");
        return null;
    }

    let BMR;
    if (gender === 'male') {
        BMR = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else if (gender === 'female' || gender === 'intersex') {
        BMR = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    } else {
        alert("Invalid gender in localStorage.");
        return null;
    }

    console.log("Calculated BMR:", BMR);

    const activityMultiplier = getActivityMultiplier(activityStatus);
    console.log("Activity multiplier:", activityMultiplier);

    const adjustedBMR = BMR * activityMultiplier;
    console.log("Adjusted BMR (with activity level):", adjustedBMR);

    return (adjustedBMR / 100) * 50; // Fluid intake in mL (50ml/100kcal)
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

function updatefluid() {
    const fluidInputElement = document.getElementById('fluidIntake');
    const activityStatusElement = document.getElementById('activityStatus');

    if (!fluidInputElement || !activityStatusElement) {
        alert("Missing input elements for fluid intake or activity status.");
        return;
    }

    const userFluidIntake = parseFloat(fluidInputElement.value);
    const activityStatus = activityStatusElement.value;

    if (isNaN(userFluidIntake) || !activityStatus) {
        alert("Please provide valid fluid intake and select an activity level.");
        return;
    }

    console.log("User entered fluid intake (liters):", userFluidIntake);
    console.log("User selected activity status:", activityStatus);

    // Evaluate fluid intake
    const fluidCategory = evaluateFluidIntake(userFluidIntake, activityStatus);

    if (fluidCategory === null) {
        return; // Exit if evaluation failed
    }

    // Retrieve additional information for display
    const weight = parseFloat(localStorage.getItem('weight'));
    const fluidHollidaySegar = calculateFluidIntakeHollidaySegar(weight);
    const fluidBMR = calculateFluidIntakeBMR(activityStatus);
    const userFluidIntakeMl = userFluidIntake * 1000;

    if (fluidHollidaySegar === null || fluidBMR === null) {
        alert("Unable to calculate fluid requirements due to missing data.");
        return;
    }

    // Prepare the message for display
    const message = `
        User Fluid Intake: ${userFluidIntakeMl.toFixed(2)} mL
        Holliday-Segar Requirement: ${fluidHollidaySegar.toFixed(2)} mL
        BMR-Based Requirement: ${fluidBMR.toFixed(2)} mL
        Fluid Category: ${fluidCategory}
    `;

    const displayElement = document.getElementById("displayfluid");
    if (!displayElement) {
        console.error("Element with ID 'displayfluid' not found.");
        return;
    }

    // Display the message
    displayElement.innerText = message.trim();
    console.log("Displayed fluid category and details:", message.trim());
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

    // Function to determine current status based on time
    const getCurrentStatus = () => {
        const hour = new Date().getHours();

        if (hour >= 9 && hour < 17) {
            return "at work";
        } else if ((hour >= 8 && hour < 9) || (hour >= 17 && hour < 18)) {
            return "traveling";
        } else {
            return "at home";
        }
    };

    // Determine transit infra risk
    const currentStatus = getCurrentStatus();
    const xinfra_transit =
        currentStatus === "at work" ? workrisk :
            currentStatus === "at home" ? homerisk :
                transitrisk;

    // Lifestyle risk
    const liferisk = calculateLifestyle(alcoholrisk, tobaccorisk, caffeinerisk, sleeprisk);

    // Fluid risk
    const fluidInputElement = document.getElementById('fluidIntake');
    const activityStatusElement = document.getElementById('activityStatus');


    const userFluidIntake = parseFloat(fluidInputElement.value);
    const activityStatus = activityStatusElement.value;


    const fluidrisk = evaluateFluidIntake(userFluidIntake, activityStatus);



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
