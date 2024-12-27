import React, { useState } from 'react';
import { Card, Layout, Typography, Button } from 'antd';

const { Paragraph } = Typography;
const { Header } = Layout;

const Dashboard = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'notStarted', 'inProgress', 'completed'

  const orders = [
    {
      id: 1,
      status: 'completed',
      product: {
        name: 'Dolap',
      },
      quantity: 1,
      stations: [
        {
          id: '3sabju5m6',
          name: 'Ahşap Kesim İstasyonu',
          inputProduct: 'Ahşap',
          outputProduct: 'Dolap Kapağı',
        },
        {
          id: 'bi5j7x8ed',
          name: 'Birleştirme İstasyonu',
          inputProduct: 'Ahşap',
          outputProduct: 'Dolap Kapağı',
        },
      ],
    },
    {
      id: 2,
      status: 'inProgress',
      product: {
        name: 'Kanepe',
      },
      quantity: 2,
      stations: [
        {
          id: '3sabju5m6',
          name: 'Ahşap Kesim İstasyonu',
          inputProduct: 'Ahşap',
          outputProduct: 'Dolap Kapağı',
        },
        {
          id: 'bi5j7x8ed',
          name: 'Birleştirme İstasyonu',
          inputProduct: 'Ahşap',
          outputProduct: 'Dolap Kapağı',
        },
      ],
    },
    {
      id: 3,
      status: 'notStarted',
      product: {
        name: 'Sandalye',
      },
      quantity: 5,
      stations: [
        {
          id: '3sabju5m6',
          name: 'Ahşap Kesim İstasyonu',
          inputProduct: 'Ahşap',
          outputProduct: 'Dolap Kapağı',
        },
        {
          id: 'bi5j7x8ed',
          name: 'Birleştirme İstasyonu',
          inputProduct: 'Ahşap',
          outputProduct: 'Dolap Kapağı',
        },
      ],
    },
  ];

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', borderBottom: '1px solid #ddd' }}>
        <Typography.Title style={{ marginTop: '15px' }} level={3}>
          Akaju Mobilya Üretim Takip Sistemi
        </Typography.Title>
      </Header>
      <div style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ marginBottom: '16px', textAlign: 'center' }}>
          <Button.Group>
            <Button type={filter === 'all' ? 'primary' : 'default'} onClick={() => setFilter('all')}>
              Tümü
            </Button>
            <Button
              type={filter === 'notStarted' ? 'primary' : 'default'}
              onClick={() => setFilter('notStarted')}
            >
              Başlamadı
            </Button>
            <Button
              type={filter === 'inProgress' ? 'primary' : 'default'}
              onClick={() => setFilter('inProgress')}
            >
              Devam Ediyor
            </Button>
            <Button
              type={filter === 'completed' ? 'primary' : 'default'}
              onClick={() => setFilter('completed')}
            >
              Tamamlandı
            </Button>
          </Button.Group>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <Card key={order.id} style={{ marginBottom: '16px' }}>
              <p>
                <strong>Ürün:</strong> {order.product.name}
              </p>
              <p>
                <strong>Miktar:</strong> {order.quantity}
              </p>
              <p>
                <strong>Durum:</strong> {order.status === 'completed'
                  ? 'Tamamlandı'
                  : order.status === 'inProgress'
                  ? 'Devam Ediyor'
                  : 'Başlamadı'}
              </p>
              <p>
                <strong>İstasyonlar:</strong>
              </p>
              <ul>
                {order.stations.map(station => (
                  <li key={station.id}>
                    {station.name} - Giriş: {station.inputProduct}, Çıkış: {station.outputProduct}
                  </li>
                ))}
              </ul>
            </Card>
          ))
        ) : (
          <p>Bu durumda herhangi bir iş emri bulunamadı.</p>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
