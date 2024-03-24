import { Outlet } from "react-router-dom";
import React from "react";
import { Stack, Container } from "@mui/material";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";


const Layout = () => {
    return (
        <Container>
            <Stack direction="column" justifyContent="space-between" alignContent="center" minHeight="98vh">
                <Stack direction="column" spacing={2}>
                    <Navigation />
                    <Container style={{ marginLeft: "auto", marginRight: "auto" }} maxWidth="sm">
                        <Stack minHeight="70vh" justifyContent="center" alignContent="center">
                            <Outlet />
                        </Stack>
                    </Container>
                </Stack>
                <Footer />
            </Stack>
        </Container>
    );
}

export default Layout;