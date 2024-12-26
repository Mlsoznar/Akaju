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
  Checkbox,
  message,
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
  const [isProductionModalVisible, setIsProductionModalVisible] = useState(false);
  const [isMissingProductsModalVisible, setIsMissingProductsModalVisible] = useState(false);
  const [productionDetails, setProductionDetails] = useState({});
  const [isStationModalVisible, setIsStationModalVisible] = useState(false);
  const [stations, setStations] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);
  const [showProductSelection, setShowProductSelection] = useState(false);
  const [editingStations, setEditingStations] = useState({});
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [missingProducts, setMissingProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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
    setProductionDetails({ productName: selectedProduct.name, quantity });
    setOrderError(null);
  };

  const handleCreateStations = () => {
    setIsStationModalVisible(true);
  };

  const handleStationSelectionChange = (selectedValues) => {
    setSelectedStations(selectedValues);
  };

  const handleAddSelectedStations = () => {
    const newStations = selectedStations.map((stationName) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: stationName,
      inputProduct: "",
      outputProduct: "",
      nextStation: "",
    }));
    setStations([...stations, ...newStations]);
    setIsStationModalVisible(false);
    setEditingStations(
      newStations.reduce((acc, station) => {
        acc[station.id] = true;
        return acc;
      }, {})
    );
  };

  const handleUpdateStation = (updatedStation) => {
    setStations((prevStations) => {
      const newStations = prevStations.map((s) =>
        s.id === updatedStation.id ? updatedStation : s
      );

      // Sonraki istasyonun giriş ürününü güncelle
      if (updatedStation.nextStation && updatedStation.nextStation !== "son") {
        const nextStationIndex = newStations.findIndex(
          (s) => s.id === updatedStation.nextStation
        );
        if (nextStationIndex !== -1) {
          newStations[nextStationIndex] = {
            ...newStations[nextStationIndex],
            inputProduct: updatedStation.outputProduct,
          };
        }
      }

      // Son istasyon kontrolü
      const lastStation = newStations.find(s => s.nextStation === "son");
      setIsOrderComplete(!!lastStation);

      return newStations;
    });
    setEditingStations((prev) => ({ ...prev, [updatedStation.id]: false }));
  };

  const handleDeleteStation = (stationId) => {
    setStations(stations.filter((station) => station.id !== stationId));
  };

  const handleEditStation = (stationId) => {
    setEditingStations((prev) => ({ ...prev, [stationId]: true }));
  };

  const handleCompleteOrder = () => {
    const missingItems = stockStatus.filter(item => item.status === "Eksik");
    if (missingItems.length > 0) {
      setMissingProducts(missingItems);
      setIsMissingProductsModalVisible(true);
    } else {
      setIsProductionModalVisible(true);
    }
    setCompletedOrders([...completedOrders, { product: selectedProduct, quantity, stations }]);
    setShowProductSelection(false);
    setStations([]);
    setSelectedProduct(null);
    setQuantity(1);
    setIsOrderComplete(false);
  };

  const handleNotifyWarehouse = () => {
    message.success("Depo görevlisine bildirim gönderildi.");
    setIsMissingProductsModalVisible(false);
  };

  const handleNotifyProduction = () => {
    message.success("Üretim görevlisine bildirim gönderildi.");
    setIsProductionModalVisible(false);
  };

  // Önceden tanımlı istasyonlar
  const predefinedStations = [
    "Ahşap Kesim İstasyonu",
    "Boyama İstasyonu",
    "Birleştirme İstasyonu",
    "Fazlalık",
  ];

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      <Title level={2}>İş Emirleri</Title>

      {completedOrders.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <Title level={3}>Tamamlanan Siparişler</Title>
          {completedOrders.map((order, index) => (
            <Card key={index} style={{ marginBottom: "16px" }}>
              <p><strong>Ürün:</strong> {order.product.name}</p>
              <p><strong>Miktar:</strong> {order.quantity}</p>
              <p><strong>İstasyonlar:</strong></p>
              <ul>
                {order.stations.map((station, stationIndex) => (
                  <li key={stationIndex}>
                    {station.name} - Giriş: {station.inputProduct}, Çıkış: {station.outputProduct}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}

      {!showProductSelection && (
        <Button
          type="primary"
          onClick={() => setShowProductSelection(true)}
          style={{ marginTop: "16px" }}
        >
          İş Emri Ver
        </Button>
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
              <Button
                style={{ marginLeft: "8px" }}
                onClick={handleCreateStations}
              >
                İstasyon Ekle
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
            title="İstasyon Seçimi"
            visible={isStationModalVisible}
            onCancel={() => setIsStationModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsStationModalVisible(false)}>
                Kapat
              </Button>,
              <Button key="add" type="primary" onClick={handleAddSelectedStations}>
                Seçilen İstasyonları Ekle
              </Button>,
            ]}
          >
            <Checkbox.Group
              options={predefinedStations}
              value={selectedStations}
              onChange={handleStationSelectionChange}
            />
          </Modal>

          {/* Seçilen İstasyonlar Kartları */}
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            {stations.map((station) => (
              <Col span={8} key={station.id}>
                <Card title={`İstasyon: ${station.name}`} bordered>
                  {editingStations[station.id] ? (
                    <Form
                      initialValues={station}
                      onFinish={(values) => handleUpdateStation({ ...station, ...values })}
                    >
                      <Form.Item name="inputProduct" label="Giriş Ürünü">
                        <Select placeholder="Giriş ürünü seçin">
                          {selectedProduct?.recipe.map((item) => (
                            <Option key={item.material} value={item.material}>
                              {item.material}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="outputProduct" label="Çıkış Ürünü">
                        <Select placeholder="Çıkış ürünü seçin">
                          {selectedProduct?.recipe.map((item) => (
                            <Option key={item.material} value={item.material}>
                              {item.material}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item name="nextStation" label="Sonraki İstasyon">
                        <Select placeholder="Sonraki istasyonu seçin">
                          {stations
                            .filter((s) => s.id !== station.id)
                            .map((s) => (
                              <Option key={s.id} value={s.id}>
                                {s.name}
                              </Option>
                            ))}
                          <Option value="son">Son İstasyon</Option>
                        </Select>
                      </Form.Item>
                      <Button type="primary" htmlType="submit">
                        Tamam
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <p>Giriş Ürünü: {station.inputProduct}</p>
                      <p>Çıkış Ürünü: {station.outputProduct}</p>
                      <p>Sonraki İstasyon: {station.nextStation === "son" ? "Son İstasyon" : stations.find(s => s.id === station.nextStation)?.name}</p>
                      <Button onClick={() => handleEditStation(station.id)}>Düzenle</Button>
                      <Popconfirm
                        title="Bu istasyonu silmek istediğinizden emin misiniz?"
                        onConfirm={() => handleDeleteStation(station.id)}
                        okText="Evet"
                        cancelText="Hayır"
                      >
                        <Button danger style={{ marginLeft: "8px" }}>
                          Sil
                        </Button>
                      </Popconfirm>
                    </>
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          {isOrderComplete && (
            <Button
              type="primary"
              onClick={handleCompleteOrder}
              style={{ marginTop: "16px" }}
            >
              Siparişi Tamamla
            </Button>
          )}
        </>
      )}

      <Modal
        title="Eksik Ürünler"
        visible={isMissingProductsModalVisible}
        onCancel={() => setIsMissingProductsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsMissingProductsModalVisible(false)}>
            Kapat
          </Button>,
          <Button
            key="notify"
            type="primary"
            onClick={handleNotifyWarehouse}
          >
            Depo Görevlisine Bildirim Gönder
          </Button>,
        ]}
      >
        <p>Aşağıdaki ürünler stokta eksik. Depo görevlisine bildirim gönderildi.</p>
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
              title: "Eksik Miktar",
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
        ]}
      >
        <p>Tüm ürünler stokta mevcut. Üretim görevlisine bildirim gönderildi.</p>
      </Modal>
    </div>
  );
};

export default Orders;



















