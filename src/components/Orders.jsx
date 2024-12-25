// import React, { useState, useEffect } from 'react';
// import { Typography, InputNumber, Button, Card, Table, Alert, Modal, Select, Input, Form, Popconfirm } from 'antd';
// import { fetchProductsFromNebim, checkStockInNebim, fetchRecipeForProduct } from '../services/nebimIntegration';

// const { Title } = Typography;
// const { Option } = Select;

// const Orders = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [stockStatus, setStockStatus] = useState([]);
//   const [orderError, setOrderError] = useState(null);
//   const [missingProducts, setMissingProducts] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isProductionModalVisible, setIsProductionModalVisible] = useState(false);
//   const [productionDetails, setProductionDetails] = useState({});
//   const [isStationModalVisible, setIsStationModalVisible] = useState(false);
//   const [stations, setStations] = useState([]);
//   const [editingStation, setEditingStation] = useState(null);
//   const [form] = Form.useForm();

//   // Add this new state to store users
//   const [users, setUsers] = useState([
//     { id: 1, username: 'saha_sorumlusu_1', role: 'Saha Sorumlusu' },
//     { id: 2, username: 'saha_sorumlusu_2', role: 'Saha Sorumlusu' },
//     { id: 3, username: 'saha_sorumlusu_3', role: 'Saha Sorumlusu' },
//   ]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (editingStation) {
//       form.setFieldsValue(editingStation);
//     } else {
//       form.resetFields();
//     }
//   }, [editingStation, form]);

//   const fetchProducts = async () => {
//     try {
//       const productsData = await fetchProductsFromNebim();
//       setProducts(productsData);
//     } catch (error) {
//       console.error('Ürünler yüklenirken hata oluştu:', error);
//     }
//   };

//   const handleProductSelect = async (productId) => {
//     try {
//       const product = products.find((p) => p.id === productId);
//       if (!product) return;

//       const stock = await checkStockInNebim(productId);
//       const recipe = await fetchRecipeForProduct(productId);

//       setSelectedProduct({ ...product, availableStock: stock, recipe });
//     } catch (error) {
//       console.error('Ürün seçimi sırasında hata oluştu:', error);
//     }
//   };

//   const handleOrder = async () => {
//     if (!selectedProduct) return;

//     const { recipe } = selectedProduct || {};
//     if (!recipe || recipe.length === 0) {
//       setOrderError('Reçete bilgisi bulunamadı.');
//       return;
//     }

//     const requiredMaterials = recipe.map((item) => ({
//       material: item.material,
//       required: item.amount * quantity,
//       available: item.stock,
//       status: item.amount * quantity <= item.stock ? 'Yeterli' : 'Eksik',
//       missing: item.amount * quantity > item.stock ? item.amount * quantity - item.stock : 0,
//     }));

//     setStockStatus(requiredMaterials);

//     const missing = requiredMaterials.filter((item) => item.status === 'Eksik');
//     setMissingProducts(missing);

//     const hasShortages = missing.length > 0;

//     if (hasShortages) {
//       setOrderError('Sipariş için yeterli stok bulunmuyor. Eksik malzemeleri kontrol ediniz.');
//       setIsModalVisible(true);
//     } else {
//       setProductionDetails({ productName: selectedProduct.name, quantity });
//       setIsProductionModalVisible(true);
//       setOrderError(null);
//     }
//   };

//   const handleCreateStations = () => {
//     setIsStationModalVisible(true);
//     setEditingStation(null);
//     form.resetFields();
//   };

//   const handleAddStation = (values) => {
//     setStations((prevStations) => [...prevStations, values]);
//     form.resetFields();
//   };

//   const handleEditStation = (values) => {
//     setStations((prevStations) =>
//       prevStations.map((station) =>
//         station.stationName === editingStation.stationName ? { ...station, ...values } : station
//       )
//     );
//     setEditingStation(null);
//     form.resetFields();
//   };

//   const handleEdit = (station) => {
//     setEditingStation(station);
//     setIsStationModalVisible(true);
//   };

//   const handleDeleteStation = (stationName) => {
//     setStations((prevStations) => prevStations.filter((station) => station.stationName !== stationName));
//   };

//   const handleNotifyProduction = () => {
//     setIsProductionModalVisible(false);
//   };

//   return (
//     <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
//       <Title level={2}>İş Emirleri</Title>

//       <Select
//         placeholder="Ürün Seçiniz"
//         style={{ width: '100%', marginBottom: '16px' }}
//         onChange={(value) => handleProductSelect(value)}
//         allowClear
//       >
//         {products.map((product) => (
//           <Option key={product.id} value={product.id}>
//             {product.name}
//           </Option>
//         ))}
//       </Select>

//       {selectedProduct && (
//         <Card title="Seçili Ürün" style={{ marginTop: '24px' }}>
//           <p>Ürün: {selectedProduct.name}</p>
//           <p>Reçete:</p>
//           <Table
//             dataSource={selectedProduct.recipe}
//             columns={[
//               { title: 'Malzeme', dataIndex: 'material', key: 'material' },
//               { title: 'Gerekli Miktar', dataIndex: 'amount', key: 'amount', render: (text) => text * quantity },
//               { title: 'Mevcut Stok', dataIndex: 'stock', key: 'stock' },
//               {
//                 title: 'Durum',
//                 key: 'status',
//                 render: (text, record) => {
//                   const requiredAmount = record.amount * quantity;
//                   const status = requiredAmount <= record.stock ? 'Yeterli' : 'Eksik';
//                   return <span style={{ color: status === 'Eksik' ? 'red' : 'green' }}>{status}</span>;
//                 },
//               },
//             ]}
//             rowKey="material"
//             pagination={false}
//             size="small"
//           />
//           <InputNumber
//             min={1}
//             value={quantity}
//             onChange={(value) => setQuantity(value)}
//             style={{ marginRight: '8px' }}
//           />
//           <Button type="primary" onClick={handleOrder}>
//             Sipariş Ver
//           </Button>
//           <Button style={{ marginLeft: '8px' }} onClick={handleCreateStations}>
//             İstasyon Oluştur
//           </Button>
//         </Card>
//       )}

//       {orderError && <Alert message={orderError} type="error" style={{ marginTop: '16px' }} />}

//       <Modal
//         title="Eksik Ürünler"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsModalVisible(false)}>
//             Kapat
//           </Button>,
//           <Button key="notify" type="primary" onClick={() => setIsModalVisible(false)}>
//             Depo Görevlisine Bildirim Gönder
//           </Button>,
//         ]}
//       >
//         <Table
//           dataSource={missingProducts}
//           columns={[
//             { title: 'Malzeme', dataIndex: 'material', key: 'material' },
//             { title: 'Gerekli Miktar', dataIndex: 'required', key: 'required' },
//             { title: 'Üretilmesi Gereken Miktar', dataIndex: 'missing', key: 'missing' },
//           ]}
//           rowKey="material"
//           pagination={false}
//           size="small"
//         />
//       </Modal>

//       <Modal
//         title="Üretim Bildirimi"
//         visible={isProductionModalVisible}
//         onCancel={() => setIsProductionModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setIsProductionModalVisible(false)}>
//             Kapat
//           </Button>,
//           <Button key="notify" type="primary" onClick={handleNotifyProduction}>
//             Üretim Görevlisine Bildirim Gönder
//           </Button>,
//         ]}
//       >
//         <p><strong>Ürün:</strong> {productionDetails.productName}</p>
//         <p><strong>Miktar:</strong> {productionDetails.quantity}</p>
//       </Modal>

//       <Modal
//         title={editingStation ? "İstasyon Düzenle" : "İstasyon Oluştur"}
//         visible={isStationModalVisible}
//         onCancel={() => {
//           setIsStationModalVisible(false);
//           setEditingStation(null);
//           form.resetFields();
//         }}
//         footer={null}
//       >
//         <Form
//           form={form}
//           onFinish={(values) => {
//             if (editingStation) {
//               handleEditStation(values);
//             } else {
//               handleAddStation(values);
//             }
//           }}
//           layout="vertical"
//         >
//           <Form.Item
//             label="İstasyon Adı"
//             name="stationName"
//             rules={[{ required: true, message: 'Lütfen istasyon adını girin.' }]}
//           >
//             <Input disabled={!!editingStation} />
//           </Form.Item>
//           <Form.Item
//             label="Görev"
//             name="task"
//             rules={[{ required: true, message: 'Lütfen görev açıklamasını girin.' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             label="Sorumlu Kişi"
//             name="responsiblePerson"
//             rules={[{ required: true, message: 'Lütfen sorumlu kişiyi seçin.' }]}
//           >
//             <Select>
//               {users.map((user) => (
//                 <Option key={user.id} value={user.username}>
//                   {user.username} ({user.role})
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Button type="primary" htmlType="submit">
//             {editingStation ? 'Güncelle' : 'İstasyon Ekle'}
//           </Button>
//           {editingStation && (
//             <Button style={{ marginLeft: 8 }} onClick={() => {
//               setEditingStation(null);
//               form.resetFields();
//             }}>
//               İptal
//             </Button>
//           )}
//         </Form>
//         <Table
//           dataSource={stations}
//           columns={[
//             { title: 'İstasyon Adı', dataIndex: 'stationName', key: 'stationName' },
//             { title: 'Görev', dataIndex: 'task', key: 'task' },
//             { title: 'Sorumlu Kişi', dataIndex: 'responsiblePerson', key: 'responsiblePerson' },
//             {
//               title: 'İşlemler',
//               key: 'actions',
//               render: (text, record) => (
//                 <span>
//                   <Button onClick={() => handleEdit(record)} style={{ marginRight: '8px' }}>
//                     Düzenle
//                   </Button>
//                   <Popconfirm
//                     title="Bu istasyonu silmek istediğinizden emin misiniz?"
//                     onConfirm={() => handleDeleteStation(record.stationName)}
//                     okText="Evet"
//                     cancelText="Hayır"
//                   >
//                     <Button danger>Sil</Button>
//                   </Popconfirm>
//                 </span>
//               ),
//             },
//           ]}
//           rowKey="stationName"
//           style={{ marginTop: '16px' }}
//           pagination={false}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Orders;

// import React, { useState, useEffect } from 'react';
// import { Typography, InputNumber, Button, Card, Table, Alert, Modal, Select, Input, Form, Popconfirm, Row, Col } from 'antd';
// import { fetchProductsFromNebim, checkStockInNebim, fetchRecipeForProduct } from '../services/nebimIntegration';

// const { Title } = Typography;
// const { Option } = Select;

// const Orders = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [stockStatus, setStockStatus] = useState([]);
//   const [orderError, setOrderError] = useState(null);
//   const [missingProducts, setMissingProducts] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isProductionModalVisible, setIsProductionModalVisible] = useState(false);
//   const [productionDetails, setProductionDetails] = useState({});
//   const [isStationModalVisible, setIsStationModalVisible] = useState(false);
//   const [stations, setStations] = useState([]);
//   const [editingStation, setEditingStation] = useState(null);
//   const [form] = Form.useForm();
//   const [users, setUsers] = useState([
//     { id: 1, username: 'saha_sorumlusu_1', role: 'Saha Sorumlusu' },
//     { id: 2, username: 'saha_sorumlusu_2', role: 'Saha Sorumlusu' },
//     { id: 3, username: 'saha_sorumlusu_3', role: 'Saha Sorumlusu' },
//   ]);

//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       productName: 'Masa',
//       quantity: 5,
//       stations: [
//         { stationName: 'Kesim', task: 'Ahşap kesimi', responsiblePerson: 'saha_sorumlusu_1' },
//         { stationName: 'Montaj', task: 'Parçaları birleştirme', responsiblePerson: 'saha_sorumlusu_2' },
//       ],
//     },
//     {
//       id: 2,
//       productName: 'Sandalye',
//       quantity: 10,
//       stations: [
//         { stationName: 'Kesim', task: 'Ahşap kesimi', responsiblePerson: 'saha_sorumlusu_3' },
//         { stationName: 'Boyama', task: 'Renk uygulama', responsiblePerson: 'saha_sorumlusu_2' },
//       ],
//     },
//   ]);

//   const [showProductSelection, setShowProductSelection] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (editingStation) {
//       form.setFieldsValue(editingStation);
//     } else {
//       form.resetFields();
//     }
//   }, [editingStation, form]);

//   const fetchProducts = async () => {
//     try {
//       const productsData = await fetchProductsFromNebim();
//       setProducts(productsData);
//     } catch (error) {
//       console.error('Ürünler yüklenirken hata oluştu:', error);
//     }
//   };

//   const handleProductSelect = async (productId) => {
//     try {
//       const product = products.find((p) => p.id === productId);
//       if (!product) return;

//       const stock = await checkStockInNebim(productId);
//       const recipe = await fetchRecipeForProduct(productId);

//       setSelectedProduct({ ...product, availableStock: stock, recipe });
//     } catch (error) {
//       console.error('Ürün seçimi sırasında hata oluştu:', error);
//     }
//   };

//   const handleOrder = async () => {
//     if (!selectedProduct) return;

//     const { recipe } = selectedProduct || {};
//     if (!recipe || recipe.length === 0) {
//       setOrderError('Reçete bilgisi bulunamadı.');
//       return;
//     }

//     const requiredMaterials = recipe.map((item) => ({
//       material: item.material,
//       required: item.amount * quantity,
//       available: item.stock,
//       status: item.amount * quantity <= item.stock ? 'Yeterli' : 'Eksik',
//       missing: item.amount * quantity > item.stock ? item.amount * quantity - item.stock : 0,
//     }));

//     setStockStatus(requiredMaterials);

//     const missing = requiredMaterials.filter((item) => item.status === 'Eksik');
//     setMissingProducts(missing);

//     const hasShortages = missing.length > 0;

//     if (hasShortages) {
//       setOrderError('Sipariş için yeterli stok bulunmuyor. Eksik malzemeleri kontrol ediniz.');
//       setIsModalVisible(true);
//     } else {
//       setProductionDetails({ productName: selectedProduct.name, quantity });
//       setIsProductionModalVisible(true);
//       setOrderError(null);
//     }
//   };

//   const handleCreateStations = () => {
//     setIsStationModalVisible(true);
//     setEditingStation(null);
//     form.resetFields();
//   };

//   const handleAddStation = (values) => {
//     setStations((prevStations) => [...prevStations, values]);
//     form.resetFields();
//   };

//   const handleEditStation = (values) => {
//     setStations((prevStations) =>
//       prevStations.map((station) =>
//         station.stationName === editingStation.stationName ? { ...station, ...values } : station
//       )
//     );
//     setEditingStation(null);
//     form.resetFields();
//   };

//   const handleEdit = (station) => {
//     setEditingStation(station);
//     setIsStationModalVisible(true);
//   };

//   const handleDeleteStation = (stationName) => {
//     setStations((prevStations) => prevStations.filter((station) => station.stationName !== stationName));
//   };

//   const handleNotifyProduction = () => {
//     setIsProductionModalVisible(false);
//   };

//   return (
//     <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
//       <Title level={2}>İş Emirleri</Title>

//       {!showProductSelection && (
//         <div>
//           <Row gutter={[16, 16]}>
//             {orders.map((order) => (
//               <Col span={8} key={order.id}>
//                 <Card title={`Sipariş: ${order.productName}`} bordered>
//                   <p>Miktar: {order.quantity}</p>
//                   <p>İstasyonlar:</p>
//                   <ul>
//                     {order.stations.map((station, index) => (
//                       <li key={index}>{`${station.stationName} - ${station.task} (${station.responsiblePerson})`}</li>
//                     ))}
//                   </ul>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//           <Button type="primary" onClick={() => setShowProductSelection(true)} style={{ marginTop: '16px' }}>
//             İş Emri Ver
//           </Button>
//         </div>
//       )}

//       {showProductSelection && (
//         <>
//           <Select
//             placeholder="Ürün Seçiniz"
//             style={{ width: '100%', marginBottom: '16px' }}
//             onChange={(value) => handleProductSelect(value)}
//             allowClear
//           >
//             {products.map((product) => (
//               <Option key={product.id} value={product.id}>
//                 {product.name}
//               </Option>
//             ))}
//           </Select>

//           {selectedProduct && (
//             <Card title="Seçili Ürün" style={{ marginTop: '24px' }}>
//               <p>Ürün: {selectedProduct.name}</p>
//               <p>Reçete:</p>
//               <Table
//                 dataSource={selectedProduct.recipe}
//                 columns={[
//                   { title: 'Malzeme', dataIndex: 'material', key: 'material' },
//                   { title: 'Gerekli Miktar', dataIndex: 'amount', key: 'amount', render: (text) => text * quantity },
//                   { title: 'Mevcut Stok', dataIndex: 'stock', key: 'stock' },
//                   {
//                     title: 'Durum',
//                     key: 'status',
//                     render: (text, record) => {
//                       const requiredAmount = record.amount * quantity;
//                       const status = requiredAmount <= record.stock ? 'Yeterli' : 'Eksik';
//                       return <span style={{ color: status === 'Eksik' ? 'red' : 'green' }}>{status}</span>;
//                     },
//                   },
//                 ]}
//                 rowKey="material"
//                 pagination={false}
//                 size="small"
//               />
//               <InputNumber
//                 min={1}
//                 value={quantity}
//                 onChange={(value) => setQuantity(value)}
//                 style={{ marginRight: '8px' }}
//               />
//               <Button type="primary" onClick={handleOrder}>
//                 Sipariş Ver
//               </Button>
//               <Button style={{ marginLeft: '8px' }} onClick={handleCreateStations}>
//                 İstasyon Oluştur
//               </Button>
//             </Card>
//           )}

//           {orderError && <Alert message={orderError} type="error" style={{ marginTop: '16px' }} />}

//           <Modal
//             title="Eksik Ürünler"
//             visible={isModalVisible}
//             onCancel={() => setIsModalVisible(false)}
//             footer={[
//               <Button key="cancel" onClick={() => setIsModalVisible(false)}>
//                 Kapat
//               </Button>,
//               <Button key="notify" type="primary" onClick={() => setIsModalVisible(false)}>
//                 Depo Görevlisine Bildirim Gönder
//               </Button>,
//             ]}
//           >
//             <Table
//               dataSource={missingProducts}
//               columns={[
//                 { title: 'Malzeme', dataIndex: 'material', key: 'material' },
//                 { title: 'Gerekli Miktar', dataIndex: 'required', key: 'required' },
//                 { title: 'Üretilmesi Gereken Miktar', dataIndex: 'missing', key: 'missing' },
//               ]}
//               rowKey="material"
//               pagination={false}
//               size="small"
//             />
//           </Modal>

//           <Modal
//             title="Üretim Bildirimi"
//             visible={isProductionModalVisible}
//             onCancel={() => setIsProductionModalVisible(false)}
//             footer={[
//               <Button key="close" onClick={() => setIsProductionModalVisible(false)}>
//                 Kapat
//               </Button>,
//               <Button key="notify" type="primary" onClick={handleNotifyProduction}>
//                 Üretim Görevlisine Bildirim Gönder
//               </Button>,
//             ]}
//           >
//             <p><strong>Ürün:</strong> {productionDetails.productName}</p>
//             <p><strong>Miktar:</strong> {productionDetails.quantity}</p>
//           </Modal>

//           <Modal
//             title={editingStation ? "İstasyon Düzenle" : "İstasyon Oluştur"}
//             visible={isStationModalVisible}
//             onCancel={() => {
//               setIsStationModalVisible(false);
//               setEditingStation(null);
//               form.resetFields();
//             }}
//             footer={null}
//           >
//             <Form
//               form={form}
//               onFinish={(values) => {
//                 if (editingStation) {
//                   handleEditStation(values);
//                 } else {
//                   handleAddStation(values);
//                 }
//               }}
//               layout="vertical"
//             >
//               <Form.Item
//                 label="İstasyon Adı"
//                 name="stationName"
//                 rules={[{ required: true, message: 'Lütfen istasyon adını girin.' }]}
//               >
//                 <Input disabled={!!editingStation} />
//               </Form.Item>
//               <Form.Item
//                 label="Görev"
//                 name="task"
//                 rules={[{ required: true, message: 'Lütfen görev açıklamasını girin.' }]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 label="Sorumlu Kişi"
//                 name="responsiblePerson"
//                 rules={[{ required: true, message: 'Lütfen sorumlu kişiyi seçin.' }]}
//               >
//                 <Select>
//                   {users.map((user) => (
//                     <Option key={user.id} value={user.username}>
//                       {user.username} ({user.role})
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               <Button type="primary" htmlType="submit">
//                 {editingStation ? 'Güncelle' : 'İstasyon Ekle'}
//               </Button>
//               {editingStation && (
//                 <Button style={{ marginLeft: 8 }} onClick={() => {
//                   setEditingStation(null);
//                   form.resetFields();
//                 }}>
//                   İptal
//                 </Button>
//               )}
//             </Form>
//             <div style={{ marginTop: '16px' }}>
//               <Row gutter={[16, 16]}>
//                 {stations.map((station) => (
//                   <Col span={8} key={station.stationName}>
//                     <Card title={station.stationName} bordered>
//                       <p><strong>Görev:</strong> {station.task}</p>
//                       <p><strong>Sorumlu:</strong> {station.responsiblePerson}</p>
//                       <Button onClick={() => handleEdit(station)} style={{ marginRight: '8px' }}>
//                         Düzenle
//                       </Button>
//                       <Popconfirm
//                         title="Bu istasyonu silmek istediğinizden emin misiniz?"
//                         onConfirm={() => handleDeleteStation(station.stationName)}
//                         okText="Evet"
//                         cancelText="Hayır"
//                       >
//                         <Button danger>Sil</Button>
//                       </Popconfirm>
//                     </Card>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           </Modal>
//         </>
//       )}
//     </div>
//   );
// };

// export default Orders;

import React, { useState, useEffect } from "react";
import {
  Typography,
  InputNumber,
  Button,
  Card,
  Table,
  Alert,
  Modal,
  Select,
  Input,
  Form,
  Popconfirm,
  Row,
  Col,
} from "antd";
import {
  fetchProductsFromNebim,
  checkStockInNebim,
  fetchRecipeForProduct,
} from "../services/nebimIntegration";

const { Title } = Typography;
const { Option } = Select;

const Orders = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stockStatus, setStockStatus] = useState([]);
  const [orderError, setOrderError] = useState(null);
  const [missingProducts, setMissingProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProductionModalVisible, setIsProductionModalVisible] =
    useState(false);
  const [productionDetails, setProductionDetails] = useState({});
  const [isStationModalVisible, setIsStationModalVisible] = useState(false);
  const [stations, setStations] = useState([]);
  const [editingStation, setEditingStation] = useState(null);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([
    { id: 1, username: "saha_sorumlusu_1", role: "Saha Sorumlusu" },
    { id: 2, username: "saha_sorumlusu_2", role: "Saha Sorumlusu" },
    { id: 3, username: "saha_sorumlusu_3", role: "Saha Sorumlusu" },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: "Masa",
      quantity: 5,
      stations: [
        {
          stationName: "Kesim",
          task: "Ahşap kesimi",
          responsiblePerson: "saha_sorumlusu_1",
        },
        {
          stationName: "Montaj",
          task: "Parçaları birleştirme",
          responsiblePerson: "saha_sorumlusu_2",
        },
      ],
    },
    {
      id: 2,
      productName: "Sandalye",
      quantity: 10,
      stations: [
        {
          stationName: "Kesim",
          task: "Ahşap kesimi",
          responsiblePerson: "saha_sorumlusu_3",
        },
        {
          stationName: "Boyama",
          task: "Renk uygulama",
          responsiblePerson: "saha_sorumlusu_2",
        },
      ],
    },
  ]);

  const [showProductSelection, setShowProductSelection] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (editingStation) {
      form.setFieldsValue(editingStation);
    } else {
      form.resetFields();
    }
  }, [editingStation, form]);

  const fetchProducts = async () => {
    try {
      const productsData = await fetchProductsFromNebim();
      setProducts(productsData);
    } catch (error) {
      console.error("Ürünler yüklenirken hata oluştu:", error);
    }
  };

  const handleProductSelect = async (productId) => {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const stock = await checkStockInNebim(productId);
      const recipe = await fetchRecipeForProduct(productId);

      setSelectedProduct({ ...product, availableStock: stock, recipe });
    } catch (error) {
      console.error("Ürün seçimi sırasında hata oluştu:", error);
    }
  };

  const handleOrder = async () => {
    if (!selectedProduct) return;

    const { recipe } = selectedProduct || {};
    if (!recipe || recipe.length === 0) {
      setOrderError("Reçete bilgisi bulunamadı.");
      return;
    }

    const requiredMaterials = recipe.map((item) => ({
      material: item.material,
      required: item.amount * quantity,
      available: item.stock,
      status: item.amount * quantity <= item.stock ? "Yeterli" : "Eksik",
      missing:
        item.amount * quantity > item.stock
          ? item.amount * quantity - item.stock
          : 0,
    }));

    setStockStatus(requiredMaterials);

    const missing = requiredMaterials.filter((item) => item.status === "Eksik");
    setMissingProducts(missing);

    const hasShortages = missing.length > 0;

    if (hasShortages) {
      setOrderError(
        "Sipariş için yeterli stok bulunmuyor. Eksik malzemeleri kontrol ediniz."
      );
      setIsModalVisible(true);
    } else {
      setProductionDetails({ productName: selectedProduct.name, quantity });
      setIsProductionModalVisible(true);
      setOrderError(null);
    }
  };

  const handleCreateStations = () => {
    setIsStationModalVisible(true);
    setEditingStation(null);
    form.resetFields();
  };

  const handleAddStation = (values) => {
    setStations((prevStations) => [...prevStations, values]);
    form.resetFields();
  };

  const handleEditStation = (values) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.stationName === editingStation.stationName
          ? { ...station, ...values }
          : station
      )
    );
    setEditingStation(null);
    form.resetFields();
  };

  const handleEdit = (station) => {
    setEditingStation(station);
    setIsStationModalVisible(true);
  };

  const handleDeleteStation = (stationName) => {
    setStations((prevStations) =>
      prevStations.filter((station) => station.stationName !== stationName)
    );
  };

  const handleNotifyProduction = () => {
    setIsProductionModalVisible(false);
  };

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      <Title level={2}>İş Emirleri</Title>

      {!showProductSelection && (
        <div>
          <Row gutter={[16, 16]}>
            {orders.map((order) => (
              <Col span={8} key={order.id}>
                <Card title={`Sipariş: ${order.productName}`} bordered>
                  <p>Miktar: {order.quantity}</p>
                  <p>İstasyonlar:</p>
                  <ul>
                    {order.stations.map((station, index) => (
                      <li
                        key={index}
                      >{`${station.stationName} - ${station.task} (${station.responsiblePerson})`}</li>
                    ))}
                  </ul>
                </Card>
              </Col>
            ))}
          </Row>
          <Button
            type="primary"
            onClick={() => setShowProductSelection(true)}
            style={{ marginTop: "16px" }}
          >
            İş Emri Ver
          </Button>
        </div>
      )}

      {showProductSelection && (
        <>
          <Select
            placeholder="Ürün Seçiniz"
            style={{ width: "100%", marginBottom: "16px" }}
            onChange={(value) => handleProductSelect(value)}
            allowClear
          >
            {products.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name}
              </Option>
            ))}
          </Select>

          {selectedProduct && (
            <Card title="Seçili Ürün" style={{ marginTop: "24px" }}>
              <p>Ürün: {selectedProduct.name}</p>
              <p>Reçete:</p>
              <Table
                dataSource={selectedProduct.recipe}
                columns={[
                  { title: "Malzeme", dataIndex: "material", key: "material" },
                  {
                    title: "Gerekli Miktar",
                    dataIndex: "amount",
                    key: "amount",
                    render: (text) => text * quantity,
                  },
                  { title: "Mevcut Stok", dataIndex: "stock", key: "stock" },
                  {
                    title: "Durum",
                    key: "status",
                    render: (text, record) => {
                      const requiredAmount = record.amount * quantity;
                      const status =
                        requiredAmount <= record.stock ? "Yeterli" : "Eksik";
                      return (
                        <span
                          style={{
                            color: status === "Eksik" ? "red" : "green",
                          }}
                        >
                          {status}
                        </span>
                      );
                    },
                  },
                ]}
                rowKey="material"
                pagination={false}
                size="small"
              />
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value)}
                style={{ marginRight: "8px" }}
              />
              <Button type="primary" onClick={handleOrder}>
                Sipariş Ver
              </Button>
              <Button
                style={{ marginLeft: "8px" }}
                onClick={handleCreateStations}
              >
                İstasyon Oluştur
              </Button>
            </Card>
          )}

          {orderError && (
            <Alert
              message={orderError}
              type="error"
              style={{ marginTop: "16px" }}
            />
          )}

          <Modal
            title="Eksik Ürünler"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                Kapat
              </Button>,
              <Button
                key="notify"
                type="primary"
                onClick={() => setIsModalVisible(false)}
              >
                Depo Görevlisine Bildirim Gönder
              </Button>,
            ]}
          >
            <Table
              dataSource={missingProducts}
              columns={[
                { title: "Malzeme", dataIndex: "material", key: "material" },
                {
                  title: "Gerekli Miktar",
                  dataIndex: "required",
                  key: "required",
                },
                {
                  title: "Üretilmesi Gereken Miktar",
                  dataIndex: "missing",
                  key: "missing",
                },
              ]}
              rowKey="material"
              pagination={false}
              size="small"
            />
          </Modal>

          <Modal
            title="Üretim Bildirimi"
            visible={isProductionModalVisible}
            onCancel={() => setIsProductionModalVisible(false)}
            footer={[
              <Button
                key="close"
                onClick={() => setIsProductionModalVisible(false)}
              >
                Kapat
              </Button>,
              <Button
                key="notify"
                type="primary"
                onClick={handleNotifyProduction}
              >
                Üretim Görevlisine Bildirim Gönder
              </Button>,
            ]}
          >
            <p>
              <strong>Ürün:</strong> {productionDetails.productName}
            </p>
            <p>
              <strong>Miktar:</strong> {productionDetails.quantity}
            </p>
          </Modal>

          <Modal
            title={editingStation ? "İstasyon Düzenle" : "İstasyon Oluştur"}
            visible={isStationModalVisible}
            onCancel={() => {
              setIsStationModalVisible(false);
              setEditingStation(null);
              form.resetFields();
            }}
            footer={null}
          >
            <Form
              form={form}
              onFinish={(values) => {
                if (editingStation) {
                  handleEditStation(values);
                } else {
                  handleAddStation(values);
                }
              }}
              layout="vertical"
            >
              <Form.Item
                label="İstasyon Adı"
                name="stationName"
                rules={[
                  { required: true, message: "Lütfen istasyon adını girin." },
                ]}
              >
                <Input disabled={!!editingStation} />
              </Form.Item>
              <Form.Item
                label="Görev"
                name="task"
                rules={[
                  {
                    required: true,
                    message: "Lütfen görev açıklamasını girin.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Sorumlu Kişi"
                name="responsiblePerson"
                rules={[
                  { required: true, message: "Lütfen sorumlu kişiyi seçin." },
                ]}
              >
                <Select>
                  {users.map((user) => (
                    <Option key={user.id} value={user.username}>
                      {user.username} ({user.role})
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                {editingStation ? "Güncelle" : "İstasyon Ekle"}
              </Button>
              {editingStation && (
                <Button
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    setEditingStation(null);
                    form.resetFields();
                  }}
                >
                  İptal
                </Button>
              )}
            </Form>
            <div style={{ marginTop: "16px" }}>
              <Table
                dataSource={stations}
                columns={[
                  {
                    title: "İstasyon Adı",
                    dataIndex: "stationName",
                    key: "stationName",
                  },
                  {
                    title: "Görev",
                    dataIndex: "task",
                    key: "task",
                  },
                  {
                    title: "Sorumlu Kişi",
                    dataIndex: "responsiblePerson",
                    key: "responsiblePerson",
                  },
                  {
                    title: "Aksiyonlar",
                    key: "actions",
                    render: (text, record) => (
                      <>
                        <Button
                          onClick={() => handleEdit(record)}
                          style={{ marginRight: "8px" }}
                        >
                          Düzenle
                        </Button>
                        <Popconfirm
                          title="Bu istasyonu silmek istediğinizden emin misiniz?"
                          onConfirm={() =>
                            handleDeleteStation(record.stationName)
                          }
                          okText="Evet"
                          cancelText="Hayır"
                        >
                          <Button danger>Sil</Button>
                        </Popconfirm>
                      </>
                    ),
                  },
                ]}
                rowKey="stationName"
                pagination={false}
              />
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Orders;
