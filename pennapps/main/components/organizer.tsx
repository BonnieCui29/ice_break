import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Image } from "@nextui-org/image";
import { GenerateAFormQuestions } from "./ai_calls";

export default function Organizer({
	GoBackAction,
}: {
	GoBackAction: Function;
}) {
	const [isRoomCreated, setIsRoomCreated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [eventName, setEventName] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventType, setEventType] = useState("");
	const [targetAudienceDescription, setTargetAudienceDescription] =
		useState("");

	return (
		<div className="flex gap-4 flex-col">
			{isRoomCreated ? (
				<>
					<h1 className="text-center">Room ID: 12442</h1>
					<Card>
						<CardBody className="overflow-visible w-fit">
							<Image
								alt="Card background"
								className="object-cover rounded-xl"
								src="https://media.istockphoto.com/id/1358621997/vector/qr-code-smartphone-scanner-linear-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=ePiWZHIbseW9GwmM498rRKC_Dvk8IsKv41nqnC8iZhQ="
							/>
						</CardBody>
					</Card>
					<Button
						color="danger"
						onClick={() => setIsRoomCreated(false)}
					>
						Close Room
					</Button>
				</>
			) : (
				<>
					<div>
						<Button onClick={() => GoBackAction()}>Go back</Button>
					</div>
					<h1 className="text-3xl">Organizer Page</h1>
					<Input
						type="text"
						onChange={(e) => {
							setEventName(e.target.value);
						}}
						label="Event name"
						className="w-full"
					/>
					<Input
						type="text"
						onChange={(e) => {
							setEventDescription(e.target.value);
						}}
						label="Event description"
						className="w-full"
					/>
					<Input
						type="text"
						onChange={(e) => {
							setEventType(e.target.value);
						}}
						label="Event Type"
						className="w-full"
					/>
					<Input
						type="text"
						onChange={(e) => {
							setTargetAudienceDescription(e.target.value);
						}}
						label="Target audience description"
						className="w-full"
					/>
					<div>
						<Button
							color="primary"
							onClick={() => {
								setLoading(true);
								GenerateAFormQuestions({
									EventName: eventName,
									EventType: eventType,
									TargetAudience: eventDescription,
									TargetAudienceDescription:
										targetAudienceDescription,
								})
									.then((res) => {
										console.log(res);
									})
									.finally(() => {
										setLoading(false);
										setIsRoomCreated(true);
									});
							}}
							isLoading={loading}
						>
							Create Room
						</Button>
					</div>
				</>
			)}
		</div>
	);
}
