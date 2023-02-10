const searchButton = document.querySelector("#search");
const resultIP = document.querySelector("#resultIP");
const resultLocation = document.querySelector("#resultLocation");
const resultTime = document.querySelector("#resultTime");
const resultIsp = document.querySelector("#resultIsp");
const backblue = document.querySelector(".back-blue");
window.addEventListener("load", () => {
    document.getElementById("loading").style.display = "none";
    adressRequest("");

});
searchButton.addEventListener("click",()=>{
    const input = document.querySelector("#ipInput").value;
    adressRequest(input);
})
document.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        const input = document.querySelector("#ipInput").value;
        adressRequest(input);
    }
  });
const adressRequest = (input)=>{
    !isNaN(input.charAt(0)) ? search="ipAddress" : search = "domain";
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_CGtfDSznM9WvUg1esKzTobF6aw9xH&${search}=${input}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.code === 422 || data.code === 400){
            swal("Invalid IP or Domain", "Check the input", "error",{
                buttons: false,
                timer: 4000});
        }else{
            resultIP.innerHTML=`<div class="fade-in-bottom">${data.ip}</div>`;
            resultLocation.innerHTML=`<div class="fade-in-bottom">${data.location.region}</div>`;
            resultTime.innerHTML=`<div class="fade-in-bottom">${data.location.timezone}</div>`;
            resultIsp.innerHTML=`<div class="fade-in-bottom">${data.isp}</div>`;
        }
        initMap(data.location.lat,data.location.lng);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
const initMap = (lat,lang)=>{
    document.querySelector("#mapRender").innerHTML="<div id='map'></div>"
    let map = L.map('map').setView([lat, lang], 14);
    let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var myIcon = L.icon({iconUrl: 'images/icon-location.svg'});
    var marker = L.marker([lat, lang],{icon: myIcon}).addTo(map);
}




