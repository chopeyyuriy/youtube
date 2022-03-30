import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';
import { SideBar } from './components/Sidebar/Sidebar';
import { PagesRotes } from './pages/PagesRotes';
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <SideBar />
      <Layout>
        <Content className='content-wrapper'>
          <div className="site-layout-background">
            <PagesRotes/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
