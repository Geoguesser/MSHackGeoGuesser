const rad = function(x: number): number {
  return (x * Math.PI) / 180;
};

const getDistance = function(
  p1: { lat: number | null; lng: number | null },
  p2: { lat: number; lng: number }
): number {
  const R: number = 6378137; // Earth’s mean radius in meter
  const dLat: number = rad(p2.lat - (p1.lat || 0));
  const dLong: number = rad(p2.lng - (p1.lng || 0));
  const a: number =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat || 0)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d: number = R * c;
  return d; // returns the distance in meter
};

const getScore = (
  pt1: { lat: number | null; lng: number | null },
  pt2: { lat: number; lng: number }
): number => {
  const distance = getDistance(pt1, pt2) / 1000;
  return Math.round(5000 * Math.exp(-distance / 1200)) + 1;
};

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function pickCity(): {
  lat: number;
  lng: number;
  population: number;
} {
  const json = require("../assets/cities.json");
  const item = json[Math.floor(Math.random() * json.length)];
  return item;
}

function getLat(lat: number | undefined): number {
  const min = lat ? lat - 0.5 : 0;
  const max = lat ? lat + 0.5 : 0;
  const l = random(min, max);
  return l;
}

function getLng(lng: number | undefined): number {
  const min = lng ? lng - 0.5 : 0;
  const max = lng ? lng + 0.5 : 0;
  const l = random(min, max);
  return l;
}

function leaderboardResolver(): string | undefined {
  return process.env.REACT_APP_PLAYFAB_LEADERBOARD;
}

export { getDistance, getScore, getLat, getLng, pickCity, leaderboardResolver };
