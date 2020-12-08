// const getMap = (data) => {

//     const parseData = JSON.parse(data)

//     var map = L.map('map').setView([15, 101], 1);

    

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
//     }).addTo(map);


//     for (const key in parseData) {
//         if (parseData[key].value == null) {
//             L.circle([parseData[key].lat, parseData[key].long], {
//                 color: 'red',
//                 fillColor: '#b30000',
//                 fillOpacity: 0.5,
//                 radius: 100000
//             }).addTo(map).bindPopup(`<a class="font-weight-bold h5" href="country/${parseData[key].state}/${parseData[key].country}">${parseData[key].state}</a>`)
//             .openPopup();
//         }
//         else if (parseData[key].value >= 5000) {
//             L.circle([parseData[key].lat, parseData[key].long], {
//                 color: 'red',
//                 fillColor: '#f03',
//                 fillOpacity: 0.5,
//                 radius: 100000
//             }).addTo(map);
//         }
//         else if (parseData[key].value < 5000 && parseData[key].value >= 500) {
//             L.circle([parseData[key].lat, parseData[key].long], {
//                 color: 'orange',
//                 fillColor: '#ffa64d',
//                 fillOpacity: 0.5,
//                 radius: 100000
//             }).addTo(map);
//         } else if (parseData[key].value < 500) {
//             L.circle([parseData[key].lat, parseData[key].long], {
//                 color: 'green',
//                 fillColor: '#33cc33',
//                 fillOpacity: 0.5,
//                 radius: 100000
//             }).addTo(map);


            
//         }
//     }
// }


const getMap = (data) => {
    const parseData = JSON.parse(data)
    console.log(parseData);
    const url = "https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-continent.json";

    var map = L.map('map').setView([28.0339, 1.6596], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    $.getJSON(url, function (result) {
        for (const key in parseData) {
            for (const index in result) {
                if (parseData[key].country == result[index].country) {
                    if (parseData[key].state != null) {
                        L.marker([parseData[key].lat, parseData[key].long], { tags: [`${result[index].continent}`] }).addTo(map)
                            .bindPopup(`<a class="font-weight-bold h5" href="country/${parseData[key].state}/${parseData[key].country}">${parseData[key].state}</a>`)
                            .openPopup();
                    } else {
                        L.marker([parseData[key].lat, parseData[key].long], { tags: [`${result[index].continent}`] }).addTo(map)
                            .bindPopup(`<a class="font-weight-bold h5" href="country/null/${parseData[key].country}">${parseData[key].country}</a>`)
                            .openPopup();
                    }
                }
            }
        }
    })
}