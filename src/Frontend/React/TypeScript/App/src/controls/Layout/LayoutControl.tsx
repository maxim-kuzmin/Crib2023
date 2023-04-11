import React, { memo } from 'react';
import { Layout, theme } from 'antd';
import styles from './LayoutControl.module.css';
import { type LayoutControlProps } from '../../all';

const { Header, Content, Footer, Sider } = Layout;

export const LayoutControl: React.FC<LayoutControlProps> = memo(
    function LayoutControl ({
      createAsideView,
      createContentView,
      createFooterView,
      createHeaderView
    }: LayoutControlProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
        className={styles.sider}
        width="auto"
      >
        {createAsideView()}
      </Sider>
      <Layout>
        <Header style={{
          padding: '0 16px',
          background: colorBgContainer,
          alignItems: 'center',
          display: 'flex',
          height: 'auto',
          minHeight: '64px'
          }}>
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
});
