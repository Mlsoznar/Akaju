// api.js
let stations = [
  { id: 1, name: 'Tahta Kesim İstasyonu', description: 'Ahşap kesim işlemleri', status: 'Bekliyor' },
  { id: 2, name: 'Ayak Kesim İstasyonu', description: 'Parça montajı', status: 'Bekliyor' },
  { id: 3, name: 'Zımpara İstasyonu', description: 'zımparalama', status: 'Bekliyor'},
];

export const getStations = () => {
  return Promise.resolve(stations);
};

export const createStation = (station) => {
  const newStation = { ...station, id: Date.now() };
  stations.push(newStation);
  return Promise.resolve(newStation);
};

export const updateStation = (id, updatedStation) => {
  stations = stations.map(station =>
    station.id === id ? { ...station, ...updatedStation } : station
  );
  return Promise.resolve(updatedStation);
};

export const deleteStation = (id) => {
  stations = stations.filter(station => station.id !== id);
  return Promise.resolve();
};
