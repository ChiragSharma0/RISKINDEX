
//    FORM2

//   RESIDENCE



/* function toogleFeilds() {
    let workfeild = document.getElementById("workfeild");
    let homefeild = document.getElementById("homefeild");
    let travelfeild = document.getElementById("travelfeild");
} */

function toggleWorkplaceDetails() {
    const workplaceSelect = document.getElementById('workplace');
    const indoorDetails = document.getElementById('indoorDetails');

    if (workplaceSelect.value === 'indoor') {
         indoorDetails.classList.remove('hidden');
    } else {
        indoorDetails.classList.add('hidden');
    }
}

function toggleResidenceDetails() {
    const residenceSelect = document.getElementById('residence');
    const homeDetails = document.getElementById('homeDetails');

    if (residenceSelect.value === 'home') {
        homeDetails.classList.remove('hidden');
    } else {
        homeDetails.classList.add('hidden');
    }
}



//      LIFESTYLE

function toggleAlcoholDetails() {
    const alcoholSelect = document.getElementById('alcohol');
    const alcoholDetails = document.getElementById('alcoholDetails');

    if (alcoholSelect.value === 'yes') {
        alcoholDetails.classList.remove('hidden');
    } else {
        alcoholDetails.classList.add('hidden');
    }
}

function toggleTobaccoDetails() {
    const tobaccoSelect = document.getElementById("tobacco");
    const tobaccoDetails = document.getElementById("tobaccoDetails");

    if (tobaccoSelect.value === "yes") {
        tobaccoDetails.classList.remove("hidden");
    } else {
        tobaccoDetails.classList.add("hidden");
        resetTobaccoOptions();  // Reset all tobacco-related options if "never" is selected
    }
}

function toggleTobaccoTypeDetails() {
    const tobaccoTypeSelect = document.getElementById("tobacco_type");
    const smokedDetails = document.getElementById("smokedDetails");
    const smokelessDetails = document.getElementById("smokelessDetails");

    // Show/hide based on selection
    if (tobaccoTypeSelect.value === "smoked") {
        smokedDetails.classList.remove("hidden");
        smokelessDetails.classList.add("hidden");
    } else if (tobaccoTypeSelect.value === "smokeless") {
        smokedDetails.classList.add("hidden");
        smokelessDetails.classList.remove("hidden");
    } else if (tobaccoTypeSelect.value === "both") {
        smokedDetails.classList.remove("hidden");
        smokelessDetails.classList.add("hidden");
    }
}

function resetTobaccoOptions() {
    document.getElementById("tobacco_type").selectedIndex = 0;
    document.getElementById("tobacco_70g").selectedIndex = 0;
    document.getElementById("recent_tobacco").selectedIndex = 0;
    document.getElementById("smoked_last_5years").selectedIndex = 0;
    document.getElementById("smokeless_last_1year").selectedIndex = 0;
    document.getElementById("smokedDetails").classList.add("hidden");
    document.getElementById("smokelessDetails").classList.add("hidden");
}






// sleep











toogleFeilds();
toggleAlcoholDetails();
toggleResidenceDetails();
toggleTobaccoDetails();
toggleWorkplaceDetails();
updateSleepOptions();