import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectEventById } from "../../../redux/userApiSlices/eventApiSlice";
import { Dialog } from "primereact/dialog";
import RegisterEvent from "./RegisterEvent";
import RegTeam from "./RegTeam";

const EventCard = ({ eventId }) => {
	const event = useSelector(state => selectEventById(state, eventId));

	const [showDescription, setShowDescription] = useState(false);
	const [dialogContent, setDialogContent] = useState({});

	if (event) {
		return (
			<>
				<div className="h-full p-2 k rounded bg-slate-200 shadow-md shadow-black">
					<h1 className="text-center lg:text-xl font-bold">{event.name}</h1>
					<div className="grid grid-cols-1 h-[90%] md:grid-cols-2">
						<div className="flex flex-col justify-between md:p-5">
							<p className="text-left p-4">
								{event.description.slice(0, 90)}
								<span
									className="text-blue-600 cursor-pointer"
									onClick={() => {
										setShowDescription(true);
										setDialogContent({
											header: event.name,
											description: event.description,
										});
									}}
								>
									more
								</span>
							</p>
							<div className="w-full flex flex-col p-4">
								<h1 className="text-sm text-neutral-700 font-semibold text-center uppercase">
									Available slots
								</h1>
								<div className="w-full flex justify-between">
									<div className="border w-full border-black flex flex-col text-left p-2">
										<h1>Team</h1>
										<h1>Players</h1>
									</div>
									<div className="border w-full border-black flex flex-col text-right p-2">
										<h1>
											{event.registereddTeams.length}/{event.teamLimit}
										</h1>
										<h1>
											{event.registeredIndividuals.length}/{event.playersLimit}
										</h1>
									</div>
								</div>
							</div>
							<div className="w-full text-xs flex justify-between font-semibold p-4 text-gray-600">
								<div>
									<h1>Event started on : </h1>
									<h1 className="mt-2">Event ends on :</h1>
								</div>
								<div>
									<h1>{event.startingDate.slice(0, 10)}</h1>
									<h1 className="mt-2">{event.endingDate.slice(0, 10)}</h1>
								</div>
							</div>
						</div>
						<div className="h-full p-2 flex flex-col items-center justify-between">
							<img
								className="h-full object-contain rounded"
								src={event.image}
								alt=""
							/>
							<div className="w-full flex justify-between p-1 text-sm">
								<RegisterEvent eventId={event.id} />
								<RegTeam eventId={event.id} />
							</div>
						</div>
					</div>
				</div>
				<Dialog
					visible={showDescription}
					onHide={() => setShowDescription(false)}
					className="md:w-[50%] w-[95%]"
					header={dialogContent.header}
				>
					{dialogContent.description}
					<div className="w-full flex justify-between p-2">
						<RegisterEvent eventId={event.id} />
						<RegTeam eventId={event.id} />
					</div>
				</Dialog>
			</>
		);
	}
	return <div></div>;
};

export default EventCard;
