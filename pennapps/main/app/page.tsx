"use client";

import React, { useState } from "react";
import LoginPage from "./login/page";
import HomePage from "./home/page";

export default function Home() {
	const [isSignedIn, setIsSignedIn] = useState(true);

	return <>{isSignedIn ? <HomePage /> : <LoginPage />}</>;
}
