import { useState } from 'react';
import './App.css';
import { Input, Button, message } from 'antd';
import { post } from 'aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';

const initialState = {
  name: '',
  price: '',
};

function Admin() {
  const [itemInfo, updateItemInfo] = useState(initialState);

  // Update form state
  function updateForm(e) {
    const formData = {
      ...itemInfo,
      [e.target.name]: e.target.value,
    };
    updateItemInfo(formData);
  }

  // Add a product (admin only)
  async function addItem() {
    if (!itemInfo.name || !itemInfo.price) {
      message.error('Please enter both item name and price.');
      return;
    }

    try {
      const data = {
        body: { ...itemInfo, price: parseInt(itemInfo.price) },
      };
      updateItemInfo(initialState);
      await post({
        apiName: 'ecommerceapi', // Ensure this matches the API name in aws-exports.js
        path: '/products',
        options: data,
      });
      message.success('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      message.error('Failed to add product.');
    }
  }

  return (
    <div style={containerStyle}>
      <Input
        name="name"
        onChange={updateForm}
        value={itemInfo.name}
        placeholder="Item name"
        style={inputStyle}
      />
      <Input
        name="price"
        onChange={updateForm}
        value={itemInfo.price}
        style={inputStyle}
        placeholder="Item price"
      />
      <Button style={buttonStyle} onClick={addItem}>
        Add Product
      </Button>
    </div>
  );
}

const containerStyle = {
  width: 400,
  margin: '20px auto',
  backgroundColor: '#adb5ff',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 4px 8px rgba(238, 6, 6, 0.2)',
};
const inputStyle = { marginTop: 10 };
const buttonStyle = { marginTop: 10 };

export default withAuthenticator(Admin);
