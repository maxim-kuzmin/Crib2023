import React from 'react';
import { Layout, theme } from 'antd';
import styles from './App.module.css';
import logo from './logo.svg';
import ArticleTable from './components/ArticleTable';
import TopicPath from './components/TopicPath';
import TopicTree from './components/TopicTree';

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
        <div className={styles.logo}>
          <div className={styles['logo-image']} style={{ backgroundImage: `url(${logo})` }}/>
        </div>
        <TopicTree/>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer }}>
          <TopicPath/>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <ArticleTable/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
