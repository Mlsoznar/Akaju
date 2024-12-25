// import React from 'react';
// import { Menu } from 'antd';
// import { Link } from 'react-router-dom';
// import logo from '../assets/akaju_logo.png'; // Eğer Navbar.jsx dosyanız assets ile aynı seviyedeyse


// const Navbar = () => {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#001529', padding: '0 16px' }}>
//       {/* Logo */}
//       <div style={{ marginRight: '16px' }}>
//         <img src={logo} alt="Logo" style={{ height: '20px' }} />
//       </div>
//       {/* Menü */}
//       <Menu
//         mode="horizontal"
//         theme="dark"
//         style={{
//           flex: 1,
//           fontWeight: 'bold', // Menü yazılarını bold yapar
//           borderBottom: 'none', // Menü alt çizgisini kaldırır
//         }}
//       >
//         <Menu.Item key="dashboard" style={{ borderBottom: 'none' }}>
//           <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Anasayfa</Link>
//         </Menu.Item>
//         <Menu.Item key="orders" style={{ borderBottom: 'none' }}>
//           <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>İş Emirleri</Link>
//         </Menu.Item>
//         <Menu.Item key="users" style={{ borderBottom: 'none' }}>
//           <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>Kullanıcılar</Link>
//         </Menu.Item>
//         <Menu.Item key="products" style={{ borderBottom: 'none' }}>
//           <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Ürünler</Link>
//         </Menu.Item>
//         <Menu.Item key="notificationList" style={{ borderBottom: 'none' }}>
//           <Link to="/notificationList" style={{ textDecoration: 'none', color: 'inherit' }}>Bildirimler</Link>
//         </Menu.Item>
//         <Menu.Item key="roles" style={{ borderBottom: 'none' }}>
//           <Link to="/roles" style={{ textDecoration: 'none', color: 'inherit' }}>Roller</Link>
//         </Menu.Item>
//       </Menu>
//     </div>
//   );
// };

// export default Navbar;







// import React from 'react';
// import { Menu, Button } from 'antd';
// import { Link } from 'react-router-dom';
// import { LogoutOutlined } from '@ant-design/icons'; // Çıkış yap ikonu
// import logo from '../assets/akaju_logo.png';
// import '../styles/style.css';

// const Navbar = () => {
//   return (
//     <div style={{ backgroundColor: '#001529', padding: '16px 32px' }}>
//       <div 
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           flexWrap: 'wrap', // Responsive için sarma özelliği
//           maxWidth: '1200px',
//           margin: '0 auto',
//         }}
//       >
//         {/* Logo */}
//         <div style={{ marginRight: '32px', flexShrink: 0 }}>
//           <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Logo boyutunu artırdık */}
//         </div>

//         {/* Menü */}
//         <Menu
//           mode="horizontal"
//           theme="dark"
//           style={{
//             flex: '1 1 auto',
//             fontWeight: 'bold',
//             borderBottom: 'none',
//             backgroundColor: 'transparent', // Menü arka planını şeffaf yaptık
//             display: 'flex',
//             justifyContent: 'flex-start', // Menü sola yaslandı
//             flexWrap: 'wrap', // Responsive sarma
//           }}
//         >
//           <Menu.Item
//             key="dashboard"
//             style={{
//               borderBottom: 'none',
//               borderRadius: '8px',
//               margin: '0 8px',
//               padding: '8px 16px',
//             }}
//             className="menu-item"
//           >
//             <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Anasayfa</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="orders"
//             style={{
//               borderBottom: 'none',
//               borderRadius: '8px',
//               margin: '0 8px',
//               padding: '8px 16px',
//             }}
//             className="menu-item"
//           >
//             <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}>İş Emirleri</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="users"
//             style={{
//               borderBottom: 'none',
//               borderRadius: '8px',
//               margin: '0 8px',
//               padding: '8px 16px',
//             }}
//             className="menu-item"
//           >
//             <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>Kullanıcılar</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="products"
//             style={{
//               borderBottom: 'none',
//               borderRadius: '8px',
//               margin: '0 8px',
//               padding: '8px 16px',
//             }}
//             className="menu-item"
//           >
//             <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Ürünler</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="notificationList"
//             style={{
//               borderBottom: 'none',
//               borderRadius: '8px',
//               margin: '0 8px',
//               padding: '8px 16px',
//             }}
//             className="menu-item"
//           >
//             <Link to="/notificationList" style={{ textDecoration: 'none', color: 'inherit' }}>Bildirimler</Link>
//           </Menu.Item>
//           <Menu.Item
//             key="roles"
//             style={{
//               borderBottom: 'none',
//               borderRadius: '8px',
//               margin: '0 8px',
//               padding: '8px 16px',
//             }}
//             className="menu-item"
//           >
//             <Link to="/roles" style={{ textDecoration: 'none', color: 'inherit' }}>Roller</Link>
//           </Menu.Item>
//         </Menu>

//         {/* Çıkış Yap Butonu */}
//         <Button
//           type="primary"
//           icon={<LogoutOutlined />}
//           style={{
//             borderRadius: '8px',
//             backgroundColor: 'red',
//             color: 'white',
//             marginLeft: '16px',
//             height: '40px',
//             fontSize: '14px',
//             // flexShrink: 0, // Butonun sıkışmasını engeller
//           }}
//           onClick={() => {
//             console.log('Çıkış yapıldı');
//           }}
//         >
//           Çıkış Yap
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


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

