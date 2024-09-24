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
    assignedPersons: [],
  },
  dusting: {
    task: "Dusting",
    requiredPersons: 1,
    assignedPersons: [],
  },
  sweepFloor: {
    task: "Sweep the floor",
    requiredPersons: 4,
    assignedPersons: [],
  },
  mopFloor: {
    task: "Mop the floor",
    requiredPersons: 4,
    assignedPersons: [],
  },
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
    // Load lastAssignment from localStorage if available
    const savedLastAssignment = localStorage.getItem("lastAssignment");
    return savedLastAssignment
      ? JSON.parse(savedLastAssignment)
      : {
          foodAndShelfCleaning: [],
          dusting: [],
          sweepFloor: [],
          mopFloor: [],
        };
  });

  // Save to localStorage whenever duties or lastAssignment change
  useEffect(() => {
    console.log("Saving to localStorage");
    localStorage.setItem("cleaningDuties", JSON.stringify(duties));
    localStorage.setItem("lastAssignment", JSON.stringify(lastAssignment));
  }, [duties, lastAssignment]);

  const assignDuties = () => {
    // Deep copy of the duties object
    const newDuties = JSON.parse(JSON.stringify(duties));
    let availablePeople = shuffleArray(peoples);

    Object.keys(newDuties).forEach((task) => {
      const { requiredPersons } = newDuties[task];
      let newAssignments = [];

      // Ensure that lastAssignment[task] exists and is an array
      const lastTaskAssignment = lastAssignment[task] || [];

      // Filter out the people who were assigned last time to avoid repetition
      newAssignments = availablePeople
        .filter((person) => !lastTaskAssignment.includes(person))
        .slice(0, requiredPersons);

      // If there are not enough unique people, assign from remaining
      if (newAssignments.length < requiredPersons) {
        const remainingPeople = availablePeople.slice(newAssignments.length);
        newAssignments = newAssignments.concat(
          remainingPeople.slice(0, requiredPersons - newAssignments.length)
        );
      }

      // Assign new people to the task
      newDuties[task].assignedPersons = newAssignments;

      // Remove assigned people from the available pool
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
    });
  };

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
        <div className="mt-8 w-96 bg-slate-200">
          {Object.keys(duties).map((taskKey) => (
            <div key={taskKey} className="bg-gray-300 m-5 p-2 rounded-md">
              <h2 className="text-center mt-4 font-bold	">
                {duties[taskKey].task}
              </h2>
              <p className="text-center mt-4 mb-4">
                Assigned Persons:{" "}
                <span className="font-bold">
                  {duties[taskKey].assignedPersons.join(", ") || "None"}
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
