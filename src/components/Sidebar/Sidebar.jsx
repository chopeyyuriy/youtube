import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { PlayCircleOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { CreatePlaylist } from "./CreatePlaylist";
import useGettingCategories from "../../hooks/categories/useGettingCategories";
import { Link } from "react-router-dom";
import { CATEGORY_SECTION } from "../../contants/routes";
const { Sider } = Layout;

export const SideBar = () => {
    const [items, setItems] = useState([{ label: 'test' }]);
    const { categories } = useGettingCategories();

    const handleCreateItem = (item) => setItems([item, ...items]);

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <CreatePlaylist onCreate={handleCreateItem} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                {
                    categories?.length > 0 &&
                    categories.map((category, index) => (
                        <Menu.Item key={index} icon={<PlayCircleOutlined />}>
                            <Link to={`/${CATEGORY_SECTION}/${category.id}`}>
                                {category.name}
                            </Link>
                        </Menu.Item>
                    ))
                }
                <Menu.Item icon={<FolderOpenOutlined />}>
                    <Link to={`/archive`}>
                        Архів
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}