/* src/Nav.js */
import React, { useState, useEffect } from 'react'
import { Link, Outlet,useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons'
import { Hub } from 'aws-amplify/utils'
import checkUser from './checkUser'

const navLinks = (isAdmin) => {

    const navLinks = [
    {
        key:'Home',
        label: (
            <Link to = "/">
                <HomeOutlined />
                Home
            </Link>
        )
    }
    ,
    {
        key:'Profile',
        label: (
            <Link to = "/profile">
                <ProfileOutlined />
                Profile
            </Link>
        )
    }
]
if (isAdmin) {
    navLinks.push({
        key:'Admin',
        label: (
            <Link to = "/admin">
                <UserOutlined />
                Admin
            </Link>
        )
    })
}

return navLinks
}


const Nav = () => {
  const [selectedpage,setSelectedPage] = useState('home');

  const location = useLocation();

  const [user, updateUser] = useState({})
  useEffect(() => {

    //see  if the user is authorized and listens login status changes
    checkUser(updateUser)
    Hub.listen('auth', (data) => {
      const { payload: { event } } = data;
      console.log('event: ', event)
      if (event === 'signIn' || event === 'signOut')  
        checkUser(updateUser)
    })


        // determine the current page
    const currentPage = location.pathname.split('/')[1];
    console.log('current page is : ',location)
    setSelectedPage(currentPage ? currentPage : 'home')

  }, [location])

  return (
    <>
      <Menu items = {navLinks(user.isAuthorized)} selectedKeys={[selectedpage]} mode="horizontal"/>
    <Outlet />
    </>
  )
}

export default Nav 