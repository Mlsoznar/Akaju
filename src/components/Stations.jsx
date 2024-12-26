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




import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select } from 'antd';
import '../styles/style.css';

const { Option } = Select;

const Stations = () => {
  const [stations, setStations] = useState([]); // İstasyonlar listesi
  const [users] = useState([
    { id: 1, username: 'depo_sorumlusu', role: 'Depo Sorumlusu' },
    { id: 2, username: 'uretim_sorumlusu', role: 'Üretim Sorumlusu' },
    { id: 3, username: 'saha_sorumlusu_1', role: 'Saha Sorumlusu' },
    { id: 4, username: 'saha_sorumlusu_2', role: 'Saha Sorumlusu' },
    { id: 5, username: 'saha_sorumlusu_3', role: 'Saha Sorumlusu' },
  ]); // Kullanıcı listesi

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStation, setNewStation] = useState({ name: '', responsible: '' });

  const handleAddStation = () => {
    if (newStation.name && newStation.responsible) {
      setStations([...stations, { ...newStation, id: Date.now() }]);
      setNewStation({ name: '', responsible: '' });
      setIsModalVisible(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>İstasyon Yönetimi</h2>

      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        İstasyon Ekle
      </Button>

      <div className="stations-container">
        {stations.map((station) => (
          <Card key={station.id} title={station.name} className="station-card">
            <p><strong>Sorumlu:</strong> {station.responsible}</p>
          </Card>
        ))}
      </div>

      <Modal
        title="Yeni İstasyon"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddStation}
      >
        <Form layout="vertical">
          <Form.Item label="İstasyon Adı" required>
            <Input
              value={newStation.name}
              onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
              placeholder="İstasyon adını giriniz"
            />
          </Form.Item>

          <Form.Item label="Sorumlu" required>
            <Select
              value={newStation.responsible}
              onChange={(value) => setNewStation({ ...newStation, responsible: value })}
              placeholder="Sorumlu kullanıcı seçiniz"
            >
              {users.map((user) => (
                <Option key={user.id} value={user.username}>
                  {user.username} ({user.role})
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Stations;



