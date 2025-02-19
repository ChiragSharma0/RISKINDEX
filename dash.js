


const imageFolder = "./MAPIMAGES/";
const images = [];

// Generate filenames dynamically
for (let hour = 10; hour <= 12; hour++) { // UTCI_10 to UTCI_12
    for (let minute = 0; minute <= 23; minute++) {
        let hh = hour.toString().padStart(2, '0'); // Ensure 2-digit hour
        let mm = minute.toString().padStart(2, '0'); // Ensure 2-digit minute
        images.push(`${imageFolder}UTCI_${hh}_${mm}.png`);
    }
}

let intervalId = null; // Store interval reference
let autoUpdate = true; // Control whether the time updates automatically
const imgElement = document.getElementById("img");




function renderImage(date, hrs) {
    if (date === 10 && hrs < 12) {
        hrs = 12;
    }
    let formattedPath = `${imageFolder}UTCI_${String(date).padStart(2, '0')}_${String(hrs).padStart(2, '0')}.png`;
    imgElement.src = formattedPath;
    imgElement.alt = `Displayed Image: UTCI_${date}_${hrs}`;
}

/**
 * Stop automatic rendering of images
 */





// Function to update date and time every second (only if autoUpdate is true)
function updateDateTime() {
    if (!autoUpdate) return; // Stop updating if user selects custom date/time

    const now = new Date();
    let utcDay = now.getUTCDate();
    let utcHour = now.getUTCHours();

    // Update image based on current UTC time

    const formattedDate = `${String(utcDay).padStart(2, '0')}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${now.getUTCFullYear()}`;
    const formattedTime = `${String(utcHour).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;
    
    document.getElementById('dateTime').textContent = `${formattedDate} | ${formattedTime} UTC`;
}

// Start updating time and image every second
setInterval(updateDateTime, 1000);

updateDateTime(); // Initial call

// Function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                document.getElementById('lat').textContent = position.coords.latitude.toFixed(3);
                document.getElementById('lon').textContent = position.coords.longitude.toFixed(3);
            },
            (error) => {
                console.error("Error getting location:", error);
                document.getElementById('lat').textContent = "Unavailable";
                document.getElementById('lon').textContent = "Unavailable";
            }
        );
    } else {
        document.getElementById('lat').textContent = "Not supported";
        document.getElementById('lon').textContent = "Not supported";
    }
}

// Get location on page load
getLocation();

// Open modal
function openModal() {
    document.getElementById('dateTimeModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('dateTimeModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none';
}

// Populate hours dynamically (0-23)
const hourSelect = document.getElementById('hourSelect');
for (let i = 0; i < 24; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i.toString().padStart(2, '0');
    hourSelect.appendChild(option);
}
// Save selected date & time (and stop auto-updating)
function saveDateTime() {
    const selectedDate = document.getElementById('dateSelect').value;
    const selectedHour = document.getElementById('hourSelect').value.padStart(2, '0');

    // Update the dateTime display
    document.getElementById('dateTime').textContent = `Date: ${selectedDate} | Hour: ${selectedHour}:00 UTC`;
    renderImage(selectedDate,selectedHour);
    // Store in localStorage
    localStorage.setItem("UTCI", `UTCI_${selectedDate}_${selectedHour}`);

    // Stop auto-updating the time
    autoUpdate = false;

    closeModal();
}











































// Function to classify numerical values into 'low', 'medium', or 'high'
function classifyVulnerability(value) {
    if (value <= 0.33) return 'low';
    if (value <= 0.66) return 'medium';
    return 'high';
}

// Load stored vulnerability data (do not modify or save back)
const savedVulnerabilityData = localStorage.getItem("vulnerabilityData");
const vulnerabilityData = savedVulnerabilityData ? JSON.parse(savedVulnerabilityData) : null;

// Default Vulnerability Index Schema
const defaultVulnerabilityIndex = [
    { title: 'Age', key: 'age', level: 'low' },
    { title: 'Body-Mass Index', key: 'bmi', level: 'low' },
    { title: 'Economic Status', key: 'economicStatus', level: 'low' },
    { title: 'Social Isolation', key: 'socialIsolation', level: 'low' },
    { title: 'Education', key: 'education', level: 'low' },
    { title: 'Gender (Sex)', key: 'gender', level: 'low' },
    { title: 'Health Issues', key: 'healthIssuesIndex', level: 'none' },
    { title: 'Medication', key: 'medication', level: 'low' },
    { title: 'Disability', key: 'disability', level: 'low' },
];

// Function to determine cell background color
const getCellStyleForVulnerability = (rowLevel, cellType) => {
    if (rowLevel === 'low' && cellType === 'low') return 'background-color: rgb(174, 225, 91);'; // Green
    if (rowLevel === 'medium' && cellType === 'medium') return 'background-color: yellow;'; // Yellow
    if (rowLevel === 'high' && cellType === 'high') return 'background-color: red;'; // Red
    return ''; // Default style
};

// Populate the table dynamically
const vulnerabilityTableBody = document.getElementById('vulnerability-table');

function renderVulnerabilityTable() {
    vulnerabilityTableBody.innerHTML = ''; // Clear table before re-rendering

    defaultVulnerabilityIndex.forEach(row => {
        const tr = document.createElement('tr');

        // Vulnerability title column
        const tdTitle = document.createElement('td');
        tdTitle.textContent = row.title;
        tr.appendChild(tdTitle);

        // Get level dynamically from localStorage data (without saving back)
        let level = row.level;
        if (vulnerabilityData && vulnerabilityData[row.key] !== undefined) {
            level = classifyVulnerability(vulnerabilityData[row.key]);
        }

        // If level is "none", leave columns empty
        if (level === "none") {
            ['low', 'medium', 'high'].forEach(() => {
                const emptyTd = document.createElement('td');
                tr.appendChild(emptyTd);
            });
        } else {
            // Low, Medium, High columns with styles
            ['low', 'medium', 'high'].forEach(cellType => {
                const td = document.createElement('td');
                td.style = getCellStyleForVulnerability(level, cellType);
                tr.appendChild(td);
            });
        }

        vulnerabilityTableBody.appendChild(tr);
    });
}

// Initial Render
renderVulnerabilityTable();









































// Function to classify numerical values into 'low', 'medium', or 'high'
function classifyExposure(value) {
    if (value < 0.33) return 'low';
    if (value < 0.66) return 'medium';
    return 'high';
}

// Retrieve stored exposure data (if available)
const savedExposureData = localStorage.getItem("exposureData");
const exposureData = savedExposureData ? JSON.parse(savedExposureData) : null;

// Default Exposure Index Schema
const defaultExposureIndex = [
    { title: 'Infrastructure (Workplace)', key: 'workplaceInfrastructure', level: 'low' },
    { title: 'Infrastructure Facility', key: 'facilityInfrastructure', level: 'low' },
    { title: 'Lifestyle', key: 'lifestyle', level: 'none' },
    { title: 'Alcohol', key: 'alcohol', level: 'low' },
    { title: 'Tobacco', key: 'tobacco', level: 'low' },
    { title: 'Caffeine', key: 'caffeine', level: 'low' },
    { title: 'Sleep', key: 'sleep', level: 'low' },
    { title: 'Fluid (w.r.t Physical Activity)', key: 'fluidIntake', level: 'low' },
    { title: 'Air Quality Index (AQI)', key: 'airQuality', level: 'low' },
    { title: 'Accessibility to Health', key: 'healthAccessibility', level: 'low' }
];

// Function to determine cell background color
function getCellStyleForExposure(rowLevel, cellType) {
    if (rowLevel === 'low' && cellType === 'low') return 'background-color: rgb(174, 225, 91);'; // Green
    if (rowLevel === 'medium' && cellType === 'medium') return 'background-color: yellow;'; // Yellow
    if (rowLevel === 'high' && cellType === 'high') return 'background-color: red;'; // Red
    return ''; // Default style
}

// Populate the exposure table dynamically
const exposureTableBody = document.getElementById('exposure-table');

function renderExposureTable() {
    exposureTableBody.innerHTML = ''; // Clear table before re-rendering

    defaultExposureIndex.forEach(row => {
        const tr = document.createElement('tr');

        // Exposure title column
        const tdTitle = document.createElement('td');
        tdTitle.textContent = row.title;
        tr.appendChild(tdTitle);

        // Get level dynamically from localStorage data (without saving back)
        let level = row.level;
        if (exposureData && exposureData[row.key] !== undefined) {
            level = classifyExposure(exposureData[row.key]);
        }

        // If level is "none", leave columns empty
        if (level === "none") {
            ['low', 'medium', 'high'].forEach(() => {
                const emptyTd = document.createElement('td');
                tr.appendChild(emptyTd);
            });
        } else {
            // Low, Medium, High columns with styles
            ['low', 'medium', 'high'].forEach(cellType => {
                const td = document.createElement('td');
                td.style = getCellStyleForExposure(level, cellType);
                tr.appendChild(td);
            });
        }

        exposureTableBody.appendChild(tr);
    });
}

// Initial render
renderExposureTable();




































document.getElementById("VI").textContent=localStorage.getItem("VI")||0;
document.getElementById("EI").textContent=localStorage.getItem("EI")||0;



































let selectedLat, selectedLon, selectedLocality;
let map; // Global variable to store map instance

function openLocationModal() {
    document.getElementById("locationModal").style.display = "block";

    // If map already exists, remove it
    if (map !== undefined) {
        map.remove();
    }

    // Define Delhi Boundaries
    const southWest = L.latLng(28.40, 76.84);
    const northEast = L.latLng(28.88, 77.30);
    const delhiBounds = L.latLngBounds(southWest, northEast);

    // Initialize Map
    map = L.map('map', {
        center: [28.6139, 77.2090], // Delhi Center
        zoom: 12,
        minZoom: 10,
        maxZoom: 17,
        maxBounds: delhiBounds,
        maxBoundsViscosity: 1.0
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Click event to get locality
    map.on('click', async function (e) {
        selectedLat = e.latlng.lat.toFixed(5);
        selectedLon = e.latlng.lng.toFixed(5);

        selectedLocality = await getLocalityName(selectedLat, selectedLon);

        // Display Selected Location
        document.getElementById('selectedLocation').textContent = `📍 ${selectedLocality}`;
    });
}

async function getLocalityName(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();

        if (data.address) {
            // Try different location details, fallback to a known place
            selectedLocality =
                data.address.suburb ||
                data.address.neighbourhood ||
                data.address.village ||
                data.address.town ||
                data.address.city_district ||
                data.address.road ||
                "Unknown Area";

            // If still "Unknown Area", try using nearby known location
            if (selectedLocality === "Unknown Area") {
                selectedLocality = data.display_name.split(",")[0] || "Unmapped Location";
                selectedLocality = "Near " + selectedLocality;
            }
        } else {
            selectedLocality = "Unmapped Location";
        }
    } catch (error) {
        console.error("Error fetching locality:", error);
        selectedLocality = "Error fetching location";
    }

    return selectedLocality;
}



// Save location & close modal
function saveLocation() {
    if (selectedLat && selectedLon && selectedLocality) {
        localStorage.setItem("latitude", selectedLat);
        localStorage.setItem("longitude", selectedLon);
        

        document.getElementById('lat').textContent = selectedLat;
        document.getElementById('lon').textContent = selectedLon;
        document.getElementById('localityName').textContent = selectedLocality;
    }
    closeLocationModal();
}

// Close Modal
function closeLocationModal() {
    document.getElementById("locationModal").style.display = "none";
}
































































document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded, initializing chart...");

    // Initialize Chart.js with dummy data
    initializeChart();

    // Fetch actual data
    fetchDataAndProcess();
});

// Global variable to store the chart instance
let myChart;

// Function to initialize chart with dummy data
function initializeChart() {
    const ctx = document.getElementById("myChart").getContext("2d");

    myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // 00:00 to 23:00
            datasets: [
                {
                    label: "Hourly K Value",
                    data: Array(24).fill(0.5), // Dummy values (0.5 for all hours)
                    borderColor: "rgba(200, 200, 200, 1)",
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: "rgba(200, 200, 200, 0.2)",
                },
            ],
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Function to update chart with real data
function updateChart(labels, data) {
    console.log("Updating chart with real data...");

    myChart.data.labels = labels;
    myChart.data.datasets[0].data = data;
    myChart.data.datasets[0].borderColor = "rgba(75, 192, 192, 1)";
    myChart.data.datasets[0].backgroundColor = "rgba(75, 192, 192, 0.2)";

    myChart.update(); // Refresh chart with new data
}

// Function to fetch and process data
async function fetchDataAndProcess() {
    try {
        console.log("Fetching JSON data...");
        const response = await fetch("./data.json");
        const jsonData = await response.json();
        console.log("Data fetched successfully!");
        processData(jsonData);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// Function to process and extract UTCI data
function processData(jsonData) {
    console.log("Processing data...");

    const savedLat = localStorage.getItem("latitude");
    const savedLon = localStorage.getItem("longitude");
    const utcKey = localStorage.getItem("UTCI");

    if (!savedLat || !savedLon || !utcKey) {
        console.warn("Missing latitude, longitude, or UTCI key in localStorage.");
        return;
    }

    const datePart = utcKey.split("_")[1]; // Extract "10" from "UTCI_10_00"
    if (!datePart) {
        console.warn("Invalid UTCI key format.");
        return;
    }

    console.log(`Extracted date from UTCI key: ${datePart}`);

    const targetLat = parseFloat(savedLat);
    const targetLon = parseFloat(savedLon);

    let closestMatch = null;
    let minDistance = Infinity;

    jsonData.forEach(entry => {
        const entryLat = parseFloat(entry.Latitude);
        const entryLon = parseFloat(entry.Longitude);

        let distance = Math.sqrt(
            Math.pow(entryLat - targetLat, 2) + Math.pow(entryLon - targetLon, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestMatch = entry;
        }
    });

    if (!closestMatch) {
        console.warn("No matching location found.");
        updateKValue(0);
        return;
    }

    console.log("Closest location found!");

    let utcValues = [];
    let labels = [];

    for (let hour = 0; hour < 24; hour++) {
        let key = `UTCI_${datePart}_${hour.toString().padStart(2, "0")}`;
        if (closestMatch[key] !== undefined) {
            let utcValue = parseFloat(closestMatch[key]);
            utcValues.push(calculateK(utcValue)); // Convert to K value
            labels.push(`${hour}:00`);
        }
    }

    console.log("Extracted UTCI values:", utcValues);

    if (utcValues.length > 0) {
        updateKValue(utcValues[utcValues.length - 1]);
        updateChart(labels, utcValues);
    } else {
        console.warn("No UTCI data available for the selected date.");
        updateKValue(0);
    }
}

// Function to calculate K value from UTCI
function calculateK(T) {
    let Tmin, Tmax, Tmin_cat, Tmax_cat;

    console.log(`Determining category range for UTCI: ${T}`);

    if (T >= 9 && T <= 26) {
        Tmin = 9; Tmax = 26; Tmin_cat = 0; Tmax_cat = 0.25;
    } else if (T > 26 && T <= 32) {
        Tmin = 26; Tmax = 32; Tmin_cat = 0.25; Tmax_cat = 0.50;
    } else if (T > 32 && T <= 38) {
        Tmin = 32; Tmax = 38; Tmin_cat = 0.50; Tmax_cat = 0.75;
    } else if (T > 38 && T <= 46) {
        Tmin = 38; Tmax = 46; Tmin_cat = 0.75; Tmax_cat = 1.00;
    } else if (T > 46) {
        console.log("UTCI above 46°C - Extreme Heat Stress. K = 1.00");
        return 1.00;
    } else {
        console.log("UTCI below 9°C - No thermal stress. K = 0");
        return 0;
    }

    let K = Tmin_cat + (((T - Tmin) / (Tmax - Tmin)) * (Tmax_cat - Tmin_cat));
    console.log(`Calculated K: ${K}`);
    return K;
}

// Function to update K value in the DOM
function updateKValue(K) {
    console.log(`Updating K value in the DOM: ${K}`);
    const hiElement = document.getElementById("HI");

    if (hiElement) {
        hiElement.textContent = `${K.toFixed(2)}`;
    } else {
        console.warn('Element with ID "HI" not found.');
    }
}

// Re-fetch and process data when localStorage changes
window.addEventListener("storage", function (event) {
    if (["latitude", "longitude", "UTCI"].includes(event.key)) {
        console.log(`Storage updated: ${event.key} changed. Re-fetching data...`);
        fetchDataAndProcess();
    }
});































































// Function to open the sidebar
function openSidebar() {
    document.getElementById("sidebar").classList.add("active");
}

// Function to close the sidebar
function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
}

