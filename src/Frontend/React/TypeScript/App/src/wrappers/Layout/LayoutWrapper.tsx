import React from 'react';
import { Layout, theme } from 'antd';
import styles from './LayoutWrapper.module.css';
import type LayoutWrapperProps from './LayoutWrapperProps';

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutWrapper ({
  createAsideView,
  createContentView,
  createFooterView,
  createHeaderView
}: LayoutWrapperProps) {
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
        className={styles.root}
      >
        {createAsideView()}
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer }}>
          {createHeaderView()}
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          {createContentView(colorBgContainer)}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          {createFooterView()}
        </Footer>
      </Layout>
    </Layout>
  );
}
