// export const fetchProductsFromNebim = async () => {
//     return Promise.resolve([
//       { id: 1, name: 'Ahşap Masa', recipe: 'Masa Üstü, 4x Masa Ayağı', stock: 10 },
//       { id: 2, name: 'Deri Koltuk', recipe: 'Deri Kaplama, Koltuk İskeleti, 4x Ayak', stock: 5 },
//     ]);
//   };
  
//   export const checkStockInNebim = async (productId) => {
//     const products = await fetchProductsFromNebim();
//     const product = products.find(p => p.id === productId);
//     return Promise.resolve(product ? product.stock : 0);
//   };




//135 sonrası
// export const fetchProductsFromNebim = async () => {
//   // Ürünleri getir
//   return [{ id: 1, name: 'Dolap' }, { id: 2, name: 'Masa' }];
// };

// export const checkStockInNebim = async (productId) => {
//   // Stok kontrolü yap
//   return 100; // Örneğin
// };

// export const fetchRecipeForProduct = async (productId) => {
//   // Ürün reçetesi getir
//   return [
//     { material: 'Menteşe', amount: 2, stock: 100 },
//     { material: 'Ahşap', amount: 5, stock: 50 },
//   ];
// };





const mockProducts = [
  { id: 1, name: 'Dolap', recipeId: 101 },
  { id: 2, name: 'Masa', recipeId: 102 },
];

const mockRecipes = {
  101: [
    { material: 'Menteşe', amount: 4, stock: 100 },
    { material: 'Ahşap', amount: 20, stock: 200 },
  ],
  102: [
    { material: 'Vida', amount: 10, stock: 50 },
    { material: 'Ahşap', amount: 15, stock: 200 },
  ],
};

export const fetchProductsFromNebim = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProducts), 500);
  });
};

export const checkStockInNebim = async (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === productId);
      resolve(product ? 100 : 0); // Her ürün için 100 stok olduğunu varsayıyoruz
    }, 500);
  });
};

export const fetchRecipeForProduct = async (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === productId);
      // Reçete bilgisi varsa, o reçeteyi döndür
      resolve(product && mockRecipes[product.recipeId] ? mockRecipes[product.recipeId] : []);
    }, 500);
  });
};

