import { Button } from "@nextui-org/button";

export default function Participant({
	GoBackAction,
}: {
	GoBackAction: Function;
}) {
	return (
		<>
			<Button onClick={() => GoBackAction()}>Back</Button>

			{/* Camera */}

			<h1>Participants Page</h1>
		</>
	);
}
