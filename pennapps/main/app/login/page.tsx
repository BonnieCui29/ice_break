"use client";

import { Button } from "@nextui-org/button";

export default function LoginPage() {
	function SignInWihtPraupel() {
		window.location.href = "https://17263177.propelauthtest.com/en/login";
	}

	return (
		<div>
			<Button
				size="lg"
				color="primary"
				onClick={() => SignInWihtPraupel()}
			>
				Continue with Google
			</Button>
		</div>
	);
}
