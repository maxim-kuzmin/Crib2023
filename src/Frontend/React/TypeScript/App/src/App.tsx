import React from 'react';
import logo from './logo.svg';
import LayoutControl from './controls/Layout/LayoutControl';
import LayoutAsideView from './views/Layout/Aside/LayoutAsideView';
import LayoutContentView from './views/Layout/Content/LayoutContentView';
import LayoutFooterView from './views/Layout/Footer/LayoutFooterView';
import LayoutHeaderView from './views/Layout/Header/LayoutHeaderView';

export default function App () {
  return <LayoutControl
    createAsideView={() => <LayoutAsideView logoUrl={logo}/>}
    createContentView={(backgroundColor) => <LayoutContentView backgroundColor={backgroundColor}/>}
    createFooterView={() => <LayoutFooterView/>}
    createHeaderView={() => <LayoutHeaderView/>}
    />;
}
