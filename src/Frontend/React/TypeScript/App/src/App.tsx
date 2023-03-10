import React from 'react';
import { Layout, theme } from 'antd';
import logo from './logo.svg';
import TopicPathView from './views/TopicPath/TopicPathView';
import TopicTreeView from './views/TopicTree/TopicTreeView';
import { Outlet } from 'react-router-dom';
import LogoView from './views/Logo/LogoView';

const { Header, Content, Footer, Sider } = Layout;

function App () {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ padding: '16px' }}
      >
        <LogoView imageUrl={logo}/>
        <TopicTreeView/>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer }}>
          <TopicPathView/>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
