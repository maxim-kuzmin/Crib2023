import React from 'react';
import { Layout, theme } from 'antd';
import styles from './LayoutControl.module.css';
import type LayoutControlProps from './LayoutControlProps';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

export default function LayoutControl ({ contentView, logoView, topicPathView, topicTreeView }: LayoutControlProps) {
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
        {logoView}
        {topicTreeView}
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer }}>
          {topicPathView}
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          {contentView}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}
