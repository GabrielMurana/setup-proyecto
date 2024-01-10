const map = L.map('mapa_principal').setView([-34.8386011, -56.1320522], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Marcadores
var marker = L.marker([-34.8386011, -56.1320522]).addTo(map);
var marker = L.marker([-34.8505188,-56.1338887]).addTo(map);