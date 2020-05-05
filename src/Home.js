import React, { useContext } from "react";
import { Layout, Menu, Col, Row } from "antd";
import {
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    PaperClipOutlined,
    UsergroupAddOutlined,
    ContainerOutlined,
} from "@ant-design/icons";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
} from "react-router-dom";

import LicensesPage from "./pages/Licenses";
import CustomersPage from "./pages/Customers";
import ProductsPage from "./pages/Products";
import SettingsPage from "./pages/Settings";

import { AuthContext } from "./AuthContext";

const { SubMenu } = Menu;
const { Footer, Content, Sider } = Layout;

const AppMenu = props => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    return (
        <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["licenses"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}>
            <Menu.Item key="title" disabled={true}>
                <h2 style={{ color: "#fff" }}>ExaLicense</h2>
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item
                key="licenses"
                icon={<PaperClipOutlined />}
                onClick={() => history.push("/licenses")}>
                Licenses
            </Menu.Item>
            <Menu.Item
                key="products"
                icon={<ContainerOutlined />}
                onClick={() => history.push("/products")}>
                Products
            </Menu.Item>
            <Menu.Item
                key="customers"
                icon={<UsergroupAddOutlined />}
                onClick={() => history.push("/customers")}>
                Customers
            </Menu.Item>
            <SubMenu key="acc" icon={<UserOutlined />} title="My Account">
                <Menu.Item
                    key="settings"
                    icon={<SettingOutlined />}
                    onClick={() => history.push("/settings")}>
                    Settings
                </Menu.Item>

                <Menu.Item
                    key="logout"
                    icon={<LogoutOutlined />}
                    onClick={() => auth.logout()}>
                    Logout
                </Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default function () {
    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <AppMenu />
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                backgroundColor: "#fff",
                                padding: 24,
                            }}>
                            <Switch>
                                <Route path="/licenses">
                                    <LicensesPage />
                                </Route>
                                <Route path="/products">
                                    <ProductsPage />
                                </Route>
                                <Route path="/customers">
                                    <CustomersPage />
                                </Route>
                                <Route path="/settings">
                                    <SettingsPage />
                                </Route>
                                <Route path="/">
                                    <Redirect to="/licenses" />
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
                <Footer>
                    <Row>
                        <Col>
                            <a
                                href="https://exanion.de/exalicense"
                                target="_blank"
                                rel="noopener noreferrer">
                                <h2>ExaLicense</h2>
                            </a>
                        </Col>
                        <Col flex="1 1 auto"></Col>
                        <Col style={{textAlign: "right"}}>
                            <a href="https://exanion.de">Powered by Exanion</a>{" "}
                            &ndash; &copy; Exanion UG (haftungsbeschränkt) 2020
                            <br />
                            <small>
                                Version {process.env.VERSION || "UNKNOWN"},
                                Build {process.env.BUILD || "unknown"}
                            </small>
                        </Col>
                    </Row>
                </Footer>
            </Layout>
        </Router>
    );
}
