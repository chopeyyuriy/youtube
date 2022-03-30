import React from "react";
import { Routes, Route } from "react-router-dom";
import { ARCHIVE_ROUTE, CATEGORY_ROUTE, ROOT_ROUTE } from "../constats/routes";
import { ArchivePage } from "./ArchivePage";
import { CategoryPage } from "./CategoryPage";
import { Dashboard } from "./Dashboard";

export const PagesRotes = () => {
    return (
        <Routes >
            <Route
                path={ROOT_ROUTE}
                element={<Dashboard />}
                exact
            />
            <Route
                path={CATEGORY_ROUTE}
                element={<CategoryPage />}
                exact
            />
            <Route
                path={ARCHIVE_ROUTE}
                element={<ArchivePage />}
                exact
            />
        </Routes >
    )
}