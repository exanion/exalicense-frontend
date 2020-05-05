import React, { useState } from "react";
import axios from "axios";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { message as antMessage, Typography } from "antd";

export const AuthContext = React.createContext({});
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const gql = new ApolloClient({
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
                        console.warn(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        );
                        
                        if((extensions || {}).code === "UNAUTHENTICATED"){
                            localStorage.removeItem("token");
                            if(window) window.location.reload();
                        }

                        antMessage.error(
                            <>
                                <b>An error occured (GraphQL error): </b>
                                <br />
                                <Typography.Text>{message}</Typography.Text>
                            </>
                        );
                    });
                if (networkError) {
                    console.warn(`[Network error]: ${networkError}`);
                    antMessage.error(
                        <>
                            <b>An error occured (network error): </b>
                            <br />
                            <Typography.Text>{networkError.message}</Typography.Text>
                        </>
                    );
                }
            }),
            new HttpLink({
                uri: `${window.API_PATH}/admin/graphql`,
                headers: {
                    authorization: token,
                },
            }),
        ]),
        cache: new InMemoryCache(),
    });

    return (
        <AuthContext.Provider
            value={{
                storeUsername(username) {
                    localStorage.setItem("rememberedUser", username);
                },
                getStoredUsername() {
                    return localStorage.getItem("rememberedUser");
                },
                unstoreUsername() {
                    localStorage.removeItem("rememberedUser");
                },
                storeToken(token) {
                    localStorage.setItem("token", token);
                },
                unstoreToken() {
                    localStorage.removeItem("token");
                },
                async login(username, password) {
                    let res;
                    try {
                        res = await axios.post(
                            `${window.API_PATH}/admin/auth/token`,
                            {
                                grant_type: "password",
                                username,
                                password,
                            }
                        );
                    } catch (err) {
                        if (
                            ((err.response || {}).data || {}).error ===
                            "access_denied"
                        ) {
                            throw new Error(
                                "Couldn't find the given account/ password"
                            );
                        }
                        throw new Error(
                            `Unknown authentication error. This might be a problem of the backend! (Status ${err.status} while creating token)`
                        );
                    }
                    const data = res.data || {};

                    if (
                        data.type &&
                        data.type.match(/bearer/i) &&
                        data.access_token
                    ) {
                        this.storeToken(data.access_token);
                        setToken(data.access_token);
                        return;
                    }
                    throw new Error(
                        `Unknown authentication error. This might be a problem of the backend! (Invalid response)`
                    );
                },
                logout() {
                    this.unstoreToken();
                    setToken(null);
                },
                token,
            }}>
            <ApolloProvider client={gql}>{children}</ApolloProvider>
        </AuthContext.Provider>
    );
};
