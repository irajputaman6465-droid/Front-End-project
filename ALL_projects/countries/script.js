const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const container = document.getElementById("countriesList");
const backToTop = document.getElementById("backToTop");
 
let countriesData = [];
 
/* FETCH COUNTRIES */
 
async function fetchCountries() {
 
    try {
 
        const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,capital,flags,currencies,region"
        );
 
        const data = await response.json();
 
        countriesData = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
        );
 
        renderCountries(countriesData);
 
    } catch (error) {
        console.error("Error loading countries:", error);
    }
 
}
 
/* RENDER TABLE */
 
function renderCountries(countries) {
 
    tableBody.innerHTML = "";
 
    countries.forEach(country => {
 
        const name = country.name?.common || "N/A";
        const capital = country.capital ? country.capital[0] : "N/A";
        const flag = country.flags?.png || "";
 
        let currency = "N/A";
 
        if (country.currencies) {
            currency = Object.values(country.currencies)[0].name;
        }
 
        const row = document.createElement("tr");
 
        row.innerHTML = `
            <td><img class="flag" src="${flag}"></td>
            <td>${name}</td>
            <td>${capital}</td>
            <td>${currency}</td>
        `;
 
        tableBody.appendChild(row);
 
    });
 
}
 
/* SEARCH */
 
searchInput.addEventListener("input", () => {
 
    const value = searchInput.value.toLowerCase();
 
    const filtered = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(value)
    );
 
    renderCountries(filtered);
 
});
 
/* FILTER */
 
regionFilter.addEventListener("change", () => {
 
    const region = regionFilter.value;
 
    if (region === "") {
        renderCountries(countriesData);
        return;
    }
 
    const filtered = countriesData.filter(country =>
        country.region === region
    );
 
    renderCountries(filtered);
 
});
 
/* BACK TO TOP — show button when scrolled down, hide when at top */
 
container.addEventListener("scroll", () => {
    if (container.scrollTop > 200) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});
 
backToTop.addEventListener("click", () => {
    container.scrollTo({ top: 0, behavior: "smooth" });
});
 
fetchCountries();
 