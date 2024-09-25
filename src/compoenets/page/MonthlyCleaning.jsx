import PageLayout from "./PageLayout";
import employees from "../../../employeelist"; // Import the employee list directly
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import UlContainer from "../code/UlContainer";
import Button from "../code/Button";
import Header from "../code/Header";
import SideBar from "../sideBar/SideBar";

const peoples = [
  "Yok",
  "Ethan",
  "Chris",
  "Day",
  "Mook",
  "Rose",
  "Moss",
  "Bella",
  "Lucus",
  "Sky",
  "Hut",
  "Christian",
  "Min",
];

const initialDuties = {
  foodAndShelfCleaning: {
    task: "Food and Shelf cleaning",
    requiredPersons: 3,
    assignedPersons: ["Yok", "Moss", "Min"],
  },
  dusting: { task: "Dusting", requiredPersons: 1, assignedPersons: ["Sky"] },
  sweepFloor: {
    task: "Sweep the floor",
    requiredPersons: 4,
    assignedPersons: ["Bella", "Ethan", "Hut", "Christian"],
  },
  mopFloor: {
    task: "Mop the floor",
    requiredPersons: 4,
    assignedPersons: ["Mook", "Day", "Lucus", "Rose"],
  },
  meetingRoom: {
    task: "Meeting room",
    requiredPersons: 1,
    assignedPersons: ["Chris"],
  }, // Ensure this is included
};
const shuffleArray = (arr) => {
  let shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MonthlyCleaning = () => {
  const [duties, setDuties] = useState(() => {
    // Load duties from localStorage if available, otherwise use initialDuties
    const savedDuties = localStorage.getItem("cleaningDuties");
    return savedDuties ? JSON.parse(savedDuties) : initialDuties;
  });

  const [lastAssignment, setLastAssignment] = useState(() => {
    const savedLastAssignment = localStorage.getItem("lastAssignment");
    return savedLastAssignment
      ? JSON.parse(savedLastAssignment)
      : {
          foodAndShelfCleaning: [],
          dusting: [],
          sweepFloor: [],
          mopFloor: [],
          meetingRoom: [], // Ensure it's here
        };
  });

  // Save to localStorage whenever duties or lastAssignment change
  useEffect(() => {
    console.log("Saving to localStorage");
    localStorage.setItem("cleaningDuties", JSON.stringify(duties));
    localStorage.setItem("lastAssignment", JSON.stringify(lastAssignment));
  }, [duties, lastAssignment]);

  const assignDuties = () => {
    const newDuties = JSON.parse(JSON.stringify(duties)); // Deep copy the duties object
    let availablePeople = shuffleArray(peoples);

    console.log(Object.keys(newDuties)); // Check that meetingRoom is present

    Object.keys(newDuties).forEach((task) => {
      const { requiredPersons } = newDuties[task];
      let newAssignments = [];

      const lastTaskAssignment = lastAssignment[task] || [];

      newAssignments = availablePeople
        .filter((person) => !lastTaskAssignment.includes(person))
        .slice(0, requiredPersons);

      if (newAssignments.length < requiredPersons) {
        const remainingPeople = availablePeople.slice(newAssignments.length);
        newAssignments = newAssignments.concat(
          remainingPeople.slice(0, requiredPersons - newAssignments.length)
        );
      }

      newDuties[task].assignedPersons = newAssignments;
      availablePeople = availablePeople.filter(
        (person) => !newAssignments.includes(person)
      );
    });

    // Update the duties and lastAssignment state
    setDuties(newDuties);
    setLastAssignment({
      foodAndShelfCleaning: [...newDuties.foodAndShelfCleaning.assignedPersons],
      dusting: [...newDuties.dusting.assignedPersons],
      sweepFloor: [...newDuties.sweepFloor.assignedPersons],
      mopFloor: [...newDuties.mopFloor.assignedPersons],
      meetingRoom: [...newDuties.meetingRoom.assignedPersons], // Ensure meetingRoom is updated here
    });
  };

  console.log(duties);
  return (
    <PageLayout>
      <div className="flex flex-col h-screen justify-center items-center bg-slate-100">
        <h1 className="text-center font-bold text-xl">
          Cleaning Duty Assignment
        </h1>
        <h3>{peoples.join(", ")}</h3>
        <Button
          className="bg-slate-200 rounded-md p-2 mt-4"
          onClick={assignDuties}
        >
          Assign Duties
        </Button>
        <div className=" w-96 bg-slate-200">
          {Object.keys(duties).map((taskKey) => (
            <div key={taskKey} className="bg-gray-300 m-5 p-2 rounded-md">
              <h2 className="text-center  font-bold">
                {duties[taskKey].task} {/* This should render the task name */}
              </h2>
              <p className="text-center  mb-4">
                Assigned Persons:{" "}
                <span className="font-bold">
                  {duties[taskKey].assignedPersons.join(", ") || "None"}{" "}
                  {/* This should render the assigned persons */}
                </span>
              </p>
            </div>
          ))}
        </div>
        <footer className="mt-6 bg-orange-50 w-full flex justify-center items-center text-center h-24">
          เครื่องดื่ม 🍸บ้านไม้🍸
        </footer>
      </div>
    </PageLayout>
  );
};

export default MonthlyCleaning;
