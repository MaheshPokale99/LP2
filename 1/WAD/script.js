const products = [
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Wireless Headphones',
      price: '₹7,999',
      description: 'Noise-cancelling over-ear headphones.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Smartwatch',
      price: '₹12,999',
      description: 'Fitness tracking smartwatch.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Gaming Mouse',
      price: '₹2,499',
      description: 'Ergonomic gaming mouse.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Laptop Stand',
      price: '₹1,999',
      description: 'Adjustable aluminium stand.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Bluetooth Speaker',
      price: '₹3,999',
      description: 'Portable bluetooth speaker.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Power Bank',
      price: '₹1,299',
      description: '10000mAh power bank.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Mechanical Keyboard',
      price: '₹4,499',
      description: 'RGB mechanical keyboard.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Fitness Band',
      price: '₹1,999',
      description: 'Activity and sleep tracker.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Wireless Charger',
      price: '₹2,299',
      description: 'Fast wireless charging pad.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Noise Cancelling Earbuds',
      price: '₹8,499',
      description: 'In-ear noise cancelling earbuds.',
    },
    {
      image: '/Images/133867702232076911.jpg',
      name: 'Portable Monitor',
      price: '₹14,999',
      description: '15.6" portable monitor.',
    },
  ];
  
  const itemsPerPage = 5;
  let currentPage = 1;
  
  const productBody = document.getElementById('productBody');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const pageInfo = document.getElementById('pageInfo');
  
  const renderTable = () => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleProducts = products.slice(startIdx, endIdx);
  
    productBody.innerHTML = visibleProducts.map(product => `
      <tr>
        <td><img src="${product.image}" alt="${product.name}"></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
      </tr>
    `).join('');
  
    updatePagination();
  };
  
  const updatePagination = () => {
    const totalPage = Math.ceil(products.length / itemsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPage}`;
    prev.disabled = currentPage === 1;
    next.disabled = currentPage === totalPage;
  };
  
  prev.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });
  
  next.addEventListener('click', () => {
    const totalPage = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPage) {
      currentPage++;
      renderTable();
    }
  });
  
  renderTable();
  