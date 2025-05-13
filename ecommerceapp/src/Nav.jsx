
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ProfileOutlined }
  from '@ant-design/icons';
import './App.css';

function Nav() {
  return (
    <div style={navStyle}>
      <Link to="/" style={linkStyle}>
        <HomeOutlined /> Home
      </Link>
      <Link to="/profile" style={linkStyle}>
        <ProfileOutlined /> Profile
      </Link>
      <Link to="/admin" style={linkStyle}>
        <UserOutlined /> Admin
      </Link>
    </div>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  gap: '3em',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#cbddff',
  color: '#333',
  fontSize: '1.2em',
  borderBottom: '1px solid #ddd',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export default Nav;