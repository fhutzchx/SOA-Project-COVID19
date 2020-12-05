const getMap = (data) => {

const parseData = JSON.parse(data);

var map = L.map('map').setView([51.505, -0.09], 1.5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    for(const key in parseData){
        L.marker([parseData[key].lat, parseData[key].long]).addTo(map);
    }

}



