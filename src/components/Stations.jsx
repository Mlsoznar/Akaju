// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Form, Input, Button } from 'antd';
// import { getStations, createStation, updateStation, deleteStation } from '../services/api';

// const Stations = () => {
//   const [stations, setStations] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [currentStation, setCurrentStation] = useState({ name: '', description: '' });

//   useEffect(() => {
//     fetchStations();
//   }, []);

//   const fetchStations = async () => {
//     const stationsData = await getStations();
//     setStations(stationsData);
//   };

//   const handleEditStation = (station) => {
//     setCurrentStation(station);
//     setIsModalVisible(true);
//   };

//   const handleSaveStation = async () => {
//     if (currentStation.id) {
//       await updateStation(currentStation.id, currentStation);
//     } else {
//       await createStation(currentStation);
//     }
//     setIsModalVisible(false);
//     setCurrentStation({ name: '', description: '' });
//     fetchStations();
//   };

//   const handleDeleteStation = async (id) => {
//     await deleteStation(id);
//     fetchStations();
//   };

//   const columns = [
//     {
//       title: 'İstasyon Adı',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Açıklama',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'İşlem',
//       key: 'action',
//       render: (_, record) => (
//         <div>
//           <Button onClick={() => handleEditStation(record)} style={{ marginRight: 8 }}>
//             Düzenle
//           </Button>
//           <Button danger onClick={() => handleDeleteStation(record.id)}>
//             Sil
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>İstasyonlar</h2>
//       <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
//         Yeni İstasyon
//       </Button>
//       <Table dataSource={stations} columns={columns} rowKey="id" />

//       <Modal
//         title="İstasyon Detayları"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         onOk={handleSaveStation}
//       >
//         <Form layout="vertical">
//           <Form.Item label="İstasyon Adı">
//             <Input
//               value={currentStation.name}
//               onChange={(e) => setCurrentStation({ ...currentStation, name: e.target.value })}
//             />
//           </Form.Item>
//           <Form.Item label="Açıklama">
//             <Input
//               value={currentStation.description}
//               onChange={(e) => setCurrentStation({ ...currentStation, description: e.target.value })}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Stations;




// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'antd';
// import { getStations, updateStation } from '../services/api'; // api.js'den updateStation fonksiyonunu kullanacağız

// const Stations = ({ stationStatuses, updateStationStatusCallback }) => {
//   const [stations, setStations] = useState([]);

//   useEffect(() => {
//     fetchStations();
//   }, []);

//   const fetchStations = async () => {
//     // İstasyonları API'den çekme (bu örnekte sabit veri kullandık)
//     const stationsData = await getStations();
//     setStations(stationsData);
//   };

//   const handleStartProcess = async (stationId) => {
//     const updatedStation = { status: 'Başladı' }; // Durumu güncelliyoruz

//     // İstasyonun durumunu API'ye güncellemek
//     await updateStation(stationId, updatedStation);

//     // Durumun güncellendiğini UI'da yansıtmak için:
//     setStations((prevStations) =>
//       prevStations.map((station) =>
//         station.id === stationId ? { ...station, status: 'Başladı' } : station
//       )
//     );

//     // Durumu callback ile üst component'e bildir
//     updateStationStatusCallback(stationId, 'Başladı');
//   };

//   const handleCompleteProcess = async (stationId) => {
//     const updatedStation = { status: 'Tamamlandı' }; // Durumu "Tamamlandı" olarak güncelliyoruz

//     // İstasyonun durumunu API'ye güncellemek
//     await updateStation(stationId, updatedStation);

//     // Durumun güncellendiğini UI'da yansıtmak için:
//     setStations((prevStations) =>
//       prevStations.map((station) =>
//         station.id === stationId ? { ...station, status: 'Tamamlandı' } : station
//       )
//     );

//     // Durumu callback ile üst component'e bildir
//     updateStationStatusCallback(stationId, 'Tamamlandı');
//   };

//   const columns = [
//     {
//       title: 'İstasyon Adı',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Durum',
//       dataIndex: 'status',
//       key: 'status',
//       render: (text, record) => (
//         <span style={{ color: text === 'Başladı' ? 'green' : text === 'Tamamlandı' ? 'blue' : 'red' }}>
//           {text}
//         </span>
//       ),
//     },
//     {
//       title: 'İşlem',
//       key: 'action',
//       render: (_, record) => (
//         <div>
//           <Button
//             onClick={() => handleStartProcess(record.id)}
//             disabled={record.status === 'Başladı' || record.status === 'Tamamlandı'}
//             style={{ marginRight: '10px' }}
//           >
//             Başlat
//           </Button>
//           <Button
//             onClick={() => handleCompleteProcess(record.id)}
//             disabled={record.status !== 'Başladı'}
//           >
//             Tamamlandı
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>İstasyonlar</h2>
//       <Table dataSource={stations} columns={columns} rowKey="id" />
//     </div>
//   );
// };

// export default Stations;


