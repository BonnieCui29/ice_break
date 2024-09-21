"use client";

import Organizer from "@/components/organizer";
import Participant from "@/components/participant";
import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useState } from "react";

export default function HomePage() {
	const [isOrganiser, setIsOrganiser] = useState(true);
	const [madeChoice, setMadeChoice] = useState(false);
	const [choice, setChoice] = useState("");

	return (
		<div className="max-w-xl mx-auto">
			<div className={madeChoice ? "hidden" : ""}>
				<RadioGroup
					label="Select what describe you the most"
					onChange={(e) => {
						setChoice(e.target.value);
						setIsOrganiser(e.target.value === "organizer");
					}}
				>
					<Radio value="organizer">Organizer</Radio>
					<Radio value="participant">Participant</Radio>
				</RadioGroup>

				<Button
					className="mt-2 w-full"
					disabled={!choice}
					onClick={() => setMadeChoice(true)}
				>
					Next
				</Button>
			</div>

			{isOrganiser && madeChoice ? (
				<Organizer GoBackAction={() => setMadeChoice(false)} />
			) : (
				!isOrganiser &&
				madeChoice && (
					<Participant GoBackAction={() => setMadeChoice(false)} />
				)
			)}
		</div>
	);
}
