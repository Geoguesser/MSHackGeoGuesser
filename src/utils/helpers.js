const rad = function(x) {
  return (x * Math.PI) / 180;
};

const getDistance = function(p1, p2) {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
};

const getScore = (pt1, pt2) => {
  const distance = getDistance(pt1, pt2) / 1000;
  return Math.round(5000 * Math.exp(-distance / 1200)) + 1;
};

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function pickCity() {
  const json = require("../assets/cities.json");
  const item = json[Math.floor(Math.random() * json.length)];
  return item;
}

function getLat(lat) {
  const min = lat - 0.5;
  const max = lat + 0.5;
  const l = random(min, max);
  return l;
}

function getLng(lng) {
  const min = lng - 0.5;
  const max = lng + 0.5;
  const l = random(min, max);
  return l;
}

export { getDistance, getScore, getLat, getLng, pickCity };
