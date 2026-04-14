export function maps(data) {
  const indonesiaCoor = [-2.548926, 118.0148634];

  // Base Tile: OpenStreetMap
  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  });

  // Base Tile: OSM Humanitarian (HOT)
  const osmHOT = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
    },
  );

  // Inisialisasi map
  const map = L.map("map", {
    center: indonesiaCoor,
    zoom: 5,
    scrollWheelZoom: false,
    layers: [osm], // default layer
  });

  // Layer groups untuk control
  const baseMaps = {
    OpenStreetMap: osm,
    "OpenStreetMap HOT": osmHOT,
  };

  data?.forEach((data) => {
    if (data.lat && data.lon) {
      L.marker([data.lat, data.lon])
        .addTo(map)
        .bindPopup(data.description)
        .openPopup();
    }
  });

  // Tambahkan control
  L.control.layers(baseMaps).addTo(map);

  return map;
}
