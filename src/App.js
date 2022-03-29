import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom'
import { SideBar } from './components/Sidebar/Sidebar';
import { Playlist } from './components/Playlist/Playlist';
import { ARCHIVE_ROUTE, CATEGORY_ROUTE } from './contants/routes';
import { Archive } from './components/Archive/Archive';
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <SideBar />
      <Layout>
        <Content className='content-wrapper'>
          <div className="site-layout-background">
            <Routes >
              <Route
                path={CATEGORY_ROUTE}
                element={<Playlist />}
                exact
              />
              <Route
                path={ARCHIVE_ROUTE}
                element={<Archive />}
                exact
              />
            </Routes >
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
