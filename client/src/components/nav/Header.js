import React, { useState } from 'react'
import { Badge, Menu } from 'antd';
import {UserAddOutlined,UserOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined, SearchOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../../firebase';
import {useDispatch,useSelector} from 'react-redux'
import Search from '../forms/Search';


const {SubMenu,Item}=Menu
const Header=()=> {
    const [current,setCurrent]=useState('home')
    let dispatch=useDispatch()
    let navigate=useNavigate()
    const {user,cart}=useSelector((state)=>({...state}))
    const {search} =useSelector((state)=>({...state}))
    const {text}=search;
    
    const handleSubmit=(e)=>{
    e.preventDefault();
    navigate(`/shop?${text}`)   
  }
    const handleClick=(e)=>{
        console.log(e.key);
        setCurrent(e.key )
    }

    const logout=()=>{
        auth.signOut()
        dispatch({
            type:"LOGOUT",
            payload: null,
        });
        navigate('/login')
    }
    const clicked=()=>{
        console.log("clicked");
    }

    return (
        <div style={{display:"flex"}}>
<Menu 
onClick={handleClick} 
selectedKeys={[current]} 
mode="horizontal" 
>
    {user && <SubMenu key="username" 
    icon={<SettingOutlined/>}
    title={user.email && user.email.split("@")[0]} 
    className="float-end"
    >
    {user && user.role==='subscriber' && (
    <Item>
    <Link to="/user/history">User History</Link></Item>
    )}
    {user && user.role==='admin' && (
        <Item>
        <Link to="/admin/dashboard">Admin Dashboard</Link></Item>
    )}
    <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
    </SubMenu>
}
    <Item key="home" icon={<AppstoreOutlined/>}>
    <Link to='/'>Home</Link>  
    </Item>
    <Item key="shop" icon={<ShoppingOutlined/>}>
    <Link to='/shop'>Shop</Link>  
    </Item>
    <Item key="cart" icon={<ShoppingCartOutlined/>}>
    <Link to='/cart'>
        <Badge count={cart.length} offset={[9,0]}>
            Cart
        </Badge>
        </Link>  
    </Item>
    {!user && <Item key="register"
    icon={<UserAddOutlined/>}
    className="float-end"
    >
   <Link to='/register'> Register</Link>
    </Item>
   }
   {!user && <Item key="login" icon={<UserOutlined/>}
    className="float-end"
    >
    <Link to='/login'>Login</Link>
    </Item>
   }
    {/* {user && <SubMenu key="username" 
    icon={<SettingOutlined/>} 
    title={user.email && user.email.split("@")[0]} 
    className="float-end"
    >
    {user && user.role==='subscriber' && (
    <Item>
    <Link to="/user/history">User History</Link></Item>
    )}
    {user && user.role==='admin' && (
        <Item>
        <Link to="/admin/dashboard">Admin Dashboard</Link></Item>
    )}
    <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
    </SubMenu>
} */}
<span className="float-start p-1" style={{marginRight:"1px"}}>
    <Search/>
</span>
<SearchOutlined 
   onClick={handleSubmit} 
   style={{cursor:"pointer",display:"inline",marginLeft:"3px"}}
   className="btn btn-outline-light float-end row-1 col-1 mt-auto mb-auto"/>
    </Menu>
        </div>
  )
}
export default Header









//   <Menu onClick={handleClick} mode="horizontal" selectedKeys={['current']}>
//   <Menu.Item key="mail" icon={<MailOutlined />}>
//     Navigation One
//   </Menu.Item>
//   <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu" icon={<SettingOutlined />}>
//     <Menu.Item key="two" icon={<AppstoreOutlined />}>
//       Navigation Two
//     </Menu.Item>
//     <Menu.Item key="three" icon={<AppstoreOutlined />}>
//       Navigation Three
//     </Menu.Item>
//     <Menu.ItemGroup title="Item Group">
//       <Menu.Item key="four" icon={<AppstoreOutlined />}>
//         Navigation Four
//       </Menu.Item>
//       <Menu.Item key="five" icon={<AppstoreOutlined />}>
//         Navigation Five
//       </Menu.Item>
//     </Menu.ItemGroup>
//   </Menu.SubMenu>
// </Menu>





// const items = [
//     {
//         label: 'Home',
//         key: 'home',
//         icon: <AppstoreOutlined/>,
//     },
//       {
//         label: 'Login',
//         key: 'login',
//         icon: <UserOutlined/>,
//       },
//       {
//         label: 'Register',
//         key: 'register',
//         icon: <UserAddOutlined/>,
//       },
//       // {
//     //   label: 'Navigation Two',
//     //   key: 'app',
//     //   icon: <AppstoreOutlined />,
//     //   disabled: true,
//     // },
//     {
//       label: 'Username',
//       key: 'SubMenu',
//       icon: <SettingOutlined />,
//       children: [
//             {
//               label: 'Option 1',
//               key: 'setting:1',
//             },
//             {
//               label: 'Option 2',
//               key: 'setting:2',
//             }, 
//       ],
//     }
// ]
