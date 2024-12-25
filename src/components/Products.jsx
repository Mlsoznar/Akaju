// import React, { useState, useEffect } from 'react';
// import { fetchProductsFromNebim } from '../services/nebimIntegration';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const productsData = await fetchProductsFromNebim();
//     setProducts(productsData);
//   };

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//   };

//   return (
//     <div>
//       <h2>Ürünler</h2>
//       <div>
//         <h3>Ürün Listesi</h3>
//         <ul>
//           {products.map((product) => (
//             <li key={product.id} onClick={() => handleProductSelect(product)}>
//               {product.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {selectedProduct && (
//         <div>
//           <h3>Seçili Ürün Detayları</h3>
//           <p>Ürün: {selectedProduct.name}</p>
//           <p>Reçete: {selectedProduct.recipe}</p>
//           <p>Stok: {selectedProduct.stock}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;

//İYİYYYYYİİİİİİİİİ

// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Form, Input, Button } from 'antd';
// import { fetchProductsFromNebim } from '../services/nebimIntegration';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     const productsData = await fetchProductsFromNebim();
//     setProducts(productsData);
//   };

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//     setIsModalVisible(true);
//   };

//   const columns = [
//     {
//       title: 'Ürün Adı',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'İşlem',
//       key: 'action',
//       render: (_, record) => (
//         <Button type="primary" onClick={() => handleProductSelect(record)}>
//           Detay
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Ürünler</h2>
//       <Table dataSource={products} columns={columns} rowKey="id" />

//       <Modal
//         title="Ürün Detayları"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         {selectedProduct && (
//           <Form layout="vertical">
//             <Form.Item label="Ürün Adı">
//               <Input value={selectedProduct.name} disabled />
//             </Form.Item>
//             <Form.Item label="Reçete">
//               <Input value={selectedProduct.recipe} disabled />
//             </Form.Item>
//             <Form.Item label="Stok">
//               <Input value={selectedProduct.stock} disabled />
//             </Form.Item>
//           </Form>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Products;





import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';
import { fetchProductsFromNebim, fetchRecipeForProduct, checkStockInNebim } from '../services/nebimIntegration';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const productsData = await fetchProductsFromNebim();
    setProducts(productsData);
  };

  const handleProductSelect = async (product) => {
    try {
      const recipe = await fetchRecipeForProduct(product.id);
      const stock = await checkStockInNebim(product.id);
      setSelectedProduct({ ...product, recipe, stock });
      setIsModalVisible(true);
    } catch (error) {
      console.error("Ürün detayları yüklenirken hata oluştu:", error);
    }
  };

  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'İşlem',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleProductSelect(record)}>
          Detay
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ürünler</h2>
      <Table dataSource={products} columns={columns} rowKey="id" />

      <Modal
        title="Ürün Detayları"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedProduct && (
          <Form layout="vertical">
            <Form.Item label="Ürün Adı">
              <Input value={selectedProduct.name} disabled />
            </Form.Item>
            <Form.Item label="Reçete">
              <Table
                dataSource={selectedProduct.recipe}
                columns={[
                  {
                    title: 'Malzeme',
                    dataIndex: 'material',
                    key: 'material',
                  },
                  {
                    title: 'Gerekli Miktar',
                    dataIndex: 'amount',
                    key: 'amount',
                  },
                  {
                    title: 'Mevcut Stok',
                    dataIndex: 'stock',
                    key: 'stock',
                  },
                ]}
                rowKey="material"
                pagination={false}
                size="small"
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Products;
