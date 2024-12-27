import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import logo from '../assets/akaju_logo.png';
import '../styles/style.css';

const Navbar = () => {
  // Butonun sabit pozisyonunu tutmak için state
  const [position, setPosition] = useState({ x: '16px', y: '16px' });

  // Sürükleme başlangıcı
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        offsetX: e.clientX - e.target.getBoundingClientRect().left,
        offsetY: e.clientY - e.target.getBoundingClientRect().top,
      })
    );
  };

  // Sürükleme bitişi: Yeni pozisyonu güncelle
  const handleDrop = (e) => {
    e.preventDefault();
    const { offsetX, offsetY } = JSON.parse(e.dataTransfer.getData('application/json'));
    const newLeft = e.clientX - offsetX;
    const newTop = e.clientY - offsetY;

    // Pozisyonu güncelle
    setPosition({ x: `${newLeft}px`, y: `${newTop}px` });
  };

  return (
    <div
      style={{ backgroundColor: '#001529', padding: '16px 32px' }}
      onDragOver={(e) => e.preventDefault()} // Drop olayı için gerekli
      onDrop={handleDrop} // Drop işlemi
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap', // Responsive için sarma özelliği
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Logo */}
        <div style={{ marginRight: '20px', flexShrink: 0 }}>
          <img src={logo} alt="Logo" style={{ height: '40px' }} />
        </div>

        {/* Menü */}
        <Menu
          mode="horizontal"
          theme="dark"
          style={{
            flex: '1 1 auto',
            fontWeight: 'bold',
            borderBottom: 'none',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}
        >
          <Menu.Item key="dashboard" className="menu-item">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', margin:'20px' }}>
              Anasayfa
            </Link>
          </Menu.Item>
          <Menu.Item key="orders" className="menu-item">
            <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit', margin:'20px' }}>
              İş Emirleri
            </Link>
          </Menu.Item>
          <Menu.Item key="stations" className="menu-item">
            <Link to="/stations" style={{ textDecoration: 'none', color: 'inherit', margin:'20px' }}>
              İstasyonlar
            </Link>
          </Menu.Item>
          <Menu.Item key="users" className="menu-item">
            <Link to="/users" style={{ textDecoration: 'none', color: 'inherit', margin:'20px' }}>
              Kullanıcılar
            </Link>
          </Menu.Item>
          <Menu.Item key="products" className="menu-item">
            <Link to="/products" style={{ textDecoration: 'none', color: 'inherit', margin:'20px' }}>
              Ürünler
            </Link>
          </Menu.Item>
          <Menu.Item key="notificationList" className="menu-item">
            <Link to="/notificationList" style={{ textDecoration: 'none', color: 'inherit', margin:'20px'}}>
              Bildirimler
            </Link>
          </Menu.Item>
          <Menu.Item key="roles" className="menu-item">
            <Link to="/roles" style={{ textDecoration: 'none', color: 'inherit', margin:'20px' }}>
              Roller
            </Link>
          </Menu.Item>
        </Menu>
      </div>

      {/* Hareket Ettirilebilir Çıkış Yap Butonu */}
      <button
        draggable // Sürüklenebilir yap
        onDragStart={handleDragStart}
        style={{
          position: 'fixed',
          right: position.x,  // Sağ tarafa sabitlenmiş durumda
          bottom: position.y, // Alt tarafa sabitlenmiş durumda
          borderRadius: '8px',
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'move', // Sürükleme işaretçisi
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
        }}
        onClick={() => {
          console.log('Çıkış yapıldı');
        }}
      >
        <LogoutOutlined style={{ marginRight: '8px' }} />
        Çıkış Yap
      </button>
    </div>
  );
};

export default Navbar;

