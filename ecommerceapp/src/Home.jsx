import { useState, useEffect } from 'react';
import Container from './Container';
import { get, del, post } from 'aws-amplify/api';
import { List, Button, message } from 'antd';

function Home() {
  const [state, setState] = useState({ products: [], loading: true });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  async function fetchProducts() {
    try {
      const request = await get({
        apiName: 'ecommerceapi', // Ensure this matches the API name in aws-exports.js
        path: '/products',
      });

      const { body } = await request.response;
      const data = await body.json();
      setState({
        products: data.data.Items,
        loading: false,
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      message.error('Failed to fetch products.');
    }
  }

  // Delete a product
  async function deleteItem(id) {
    try {
      await del({
        apiName: 'ecommerceapi', // Ensure this matches the API name in aws-exports.js
        path: `/products/${id}`,
      });
      message.success('Product deleted successfully!');
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error deleting product:', err);
      message.error('Failed to delete product.');
    }
  }

  // Like a product
  async function likeItem(id) {
    try {
      await post({
        apiName: 'ecommerceapi', // Ensure this matches the API name in aws-exports.js
        path: `/products/${id}/like`,
      });
      message.success('Product liked!');
      fetchProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error liking product:', err);
      message.error('Failed to like product.');
    }
  }

  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="default"
                onClick={() => likeItem(item.id)}
                key={`like-${item.id}`}
              >
                Like ({item.likes || 0})
              </Button>,
              <Button
                type="danger"
                onClick={() => deleteItem(item.id)}
                key={`delete-${item.id}`}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`$${item.price}`}
            />
          </List.Item>
        )}
      />
    </Container>
  );
}

export default Home;
