// src/components/Header.js
import React from 'react';
import '../css/Header.css'; // 引入 Header 的样式
import logo from '../img/logo.svg';  // 使用 import 引入图片
import menuIcon from '../img/menu-1.svg';  // 引入菜单图标

function Header() {
  return (
    <div className="nav">
      <div className="main">
        <div className="logo">
          <img className="img" src={logo} alt="Logo" />  {/* 使用变量引用图片 */}
          <div className="text-wrapper">Image recognition competition</div>
        </div>
        <div className="web-design">
          <div className="div">Web Design</div>
        </div>
        <div className="web-design">
          <div className="div">Design To Code</div>
        </div>
      </div>
      <img className="img-2" src={menuIcon} alt="Menu" />  {/* 使用变量引用图片 */}
    </div>
  );
}

export default Header;


