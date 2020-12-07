const getMap = (data) => {

    const parseData = JSON.parse(data)

    var map = L.map('map').setView([15, 101], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
    }).addTo(map);

    for (const key in parseData) {
        if (parseData[key].value == null) {
            L.circle([parseData[key].lat, parseData[key].long], {
                color: 'red',
                fillColor: '#b30000',
                fillOpacity: 0.5,
                radius: 100000
            }).addTo(map);
        }
        else if (parseData[key].value >= 5000) {
            L.circle([parseData[key].lat, parseData[key].long], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 100000
            }).addTo(map);
        }
        else if (parseData[key].value < 5000 && parseData[key].value >= 500) {
            L.circle([parseData[key].lat, parseData[key].long], {
                color: 'orange',
                fillColor: '#ffa64d',
                fillOpacity: 0.5,
                radius: 100000
            }).addTo(map);
        } else if (parseData[key].value < 500) {
            L.circle([parseData[key].lat, parseData[key].long], {
                color: 'green',
                fillColor: '#33cc33',
                fillOpacity: 0.5,
                radius: 100000
            }).addTo(map);
        }
    }
}