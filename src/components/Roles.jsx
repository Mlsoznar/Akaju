import React from 'react';

function Roles() {
  return (
    <div>
      <h1>Roller ve Görevler</h1>
      <div>
        <h2>Yönetici</h2>
        <p>
          Yönetici, sistemin genel yönetimini sağlar. Üretim istasyonlarını oluşturabilir, güncelleyebilir ve silebilir. 
          Ayrıca, siparişlerin hangi aşamada olduğunu izleyebilir ve depo ya da üretim sorumlularından gelen bildirimleri takip eder.
        </p>
      </div>
      <div>
        <h2>Depo Sorumlusu</h2>
        <p>
          Depo sorumlusu, stok yönetimini yapar ve eksik malzemeler için tedarik sürecini başlatır. Stoklar tamamlandığında, üretimin 
          devam edebilmesi için gerekli bildirimleri iletir.
        </p>
      </div>
      <div>
        <h2>Üretim Sorumlusu</h2>
        <p>
          Üretim sorumlusu, üretim planlamasını yapar ve istasyonlara gerekli talimatları gönderir. Üretim sürecini başlatır 
          ve ilerlemeyi takip eder.
        </p>
      </div>
      <div>
        <h2>Saha Sorumlusu</h2>
        <p>
          Saha sorumlusu, istasyonlardaki işlemleri yürütür ve yapılan işleri sisteme kaydeder. Bu bilgiler, üretim sürecinin 
          takibi için önemlidir.
        </p>
      </div>
    </div>
  );
}

export default Roles;
