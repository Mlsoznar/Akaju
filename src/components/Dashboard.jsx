import React from 'react';
import { Layout, Typography } from 'antd';

const { Paragraph } = Typography;
const { Header } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{ background: '#fff', borderBottom: '1px solid #ddd' }}
      >
        <Typography.Title level={3}>
          Akaju Mobilya Üretim Takip Sistemi
        </Typography.Title>
      </Header>
      <div style={{ padding: '24px', background: '#f5f5f5' }}>
        <Paragraph>
          Hoş geldiniz! Lütfen yukarıdaki menüden bir seçenek seçin.
        </Paragraph>
      </div>
    </Layout>
  );
};

export default Dashboard;

