import React, { useState } from 'react';
import { List, Button, Tag } from 'antd';

const NotificationList = () => {
  const [warehouseNotifications, setWarehouseNotifications] = useState([
    {
      message: 'Eksik ürün: Vida, İhtiyaç olan miktar: 100, Mevcut: 50, Eksik: 50',
      read: false,
      readAt: null,
    },
  ]);

  const [productionNotifications, setProductionNotifications] = useState([
    {
      message: 'Ürün: Dolap, Adet: 1',
      read: false,
      readAt: null,
    },
  ]);

  const markAsRead = (type, index) => {
    const currentTime = new Date().toLocaleString(); // Tarih ve saat bilgisi
    if (type === 'Depo') {
      const updatedWarehouseNotifications = [...warehouseNotifications];
      updatedWarehouseNotifications[index] = {
        ...updatedWarehouseNotifications[index],
        read: true,
        readAt: currentTime,
      };
      setWarehouseNotifications(updatedWarehouseNotifications);
    } else if (type === 'Üretim') {
      const updatedProductionNotifications = [...productionNotifications];
      updatedProductionNotifications[index] = {
        ...updatedProductionNotifications[index],
        read: true,
        readAt: currentTime,
      };
      setProductionNotifications(updatedProductionNotifications);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Bildirimler</h2>
      <List
        header="Depo Bildirimleri"
        bordered
        dataSource={warehouseNotifications}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => markAsRead('Depo', index)}>
                {item.read ? (
                  <Tag color="green">Okundu - {item.readAt}</Tag>
                ) : (
                  'Oku'
                )}
              </Button>,
            ]}
          >
            {item.message.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </List.Item>
        )}
      />
      <List
        header="Üretim Bildirimleri"
        bordered
        dataSource={productionNotifications}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => markAsRead('Üretim', index)}>
                {item.read ? (
                  <Tag color="green">Okundu - {item.readAt}</Tag>
                ) : (
                  'Oku'
                )}
              </Button>,
            ]}
          >
            {item.message}
          </List.Item>
        )}
      />
    </div>
  );
};

export default NotificationList;
