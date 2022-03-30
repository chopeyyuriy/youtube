import React from "react";
import styled from "styled-components";
import { Layout, Menu } from "antd";
import {
    HomeFilled,
    PlayCircleFilled,
    FolderOpenFilled,
    StarFilled
} from '@ant-design/icons';
import { CreatePlaylist } from "./CreatePlaylist";
import useGettingCategories from "../../hooks/categories/useGettingCategories";
import { Link } from "react-router-dom";
import { CATEGORY_SECTION } from "../../constats/routes";
const { Sider } = Layout;

export const SideBar = () => {
    const { categories } = useGettingCategories();
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
            <CreatePlaylist />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                <Menu.Item icon={<HomeFilled />}>
                    <Link to={`/`}>
                        Головна
                    </Link>
                </Menu.Item>
                {
                    categories?.length > 0 &&
                    categories.map((category, index) => (
                        <Menu.Item
                            key={index}
                            icon={<PlayCircleFilled />}
                        >
                            <Link to={`/${CATEGORY_SECTION}/${category.id}`}>
                                {category.name}
                            </Link>
                            <StyledVideoCounts>{category.count_videos}</StyledVideoCounts>
                        </Menu.Item>
                    ))
                }
                <Menu.Item icon={<StarFilled />}>
                    <Link to={`/favorites`}>
                        Вибране
                    </Link>
                </Menu.Item>
                <Menu.Item icon={<FolderOpenFilled />}>
                    <Link to={`/archive`}>
                        Архів
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

const StyledVideoCounts = styled.span`
    position: absolute;
    right: 20px;
`;