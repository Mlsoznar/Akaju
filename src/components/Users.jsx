import React, { useState } from 'react';
import { Table, Modal, Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'depo_sorumlusu', role: 'Depo Sorumlusu' },
    { id: 2, username: 'uretim_sorumlusu', role: 'Üretim Sorumlusu' },
    { id: 3, username: 'saha_sorumlusu_1', role: 'Saha Sorumlusu' },
    { id: 4, username: 'saha_sorumlusu_2', role: 'Saha Sorumlusu' },
    { id: 5, username: 'saha_sorumlusu_3', role: 'Saha Sorumlusu' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });

  const handleCreateUser = () => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ username: '', password: '', role: '' });
    setIsModalVisible(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const columns = [
    {
      title: 'Kullanıcı Adı',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteUser(record.id)}>
          Sil
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Kullanıcılar</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Yeni Kullanıcı Ekle
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />

      <Modal
        title="Yeni Kullanıcı"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleCreateUser}
      >
        <Form layout="vertical">
          <Form.Item label="Kullanıcı Adı">
            <Input
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Şifre">
            <Input.Password
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Rol">
            <Select
              value={newUser.role}
              onChange={(value) => setNewUser({ ...newUser, role: value })}
            >
              <Option value="Depo Sorumlusu">Depo Sorumlusu</Option>
              <Option value="Üretim Sorumlusu">Üretim Sorumlusu</Option>
              <Option value="Saha Sorumlusu">Saha Sorumlusu</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;