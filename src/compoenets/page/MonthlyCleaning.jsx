import PageLayout from "./PageLayout";
import employees from "../../../employeelist"; // Import the employee list directly
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import UlContainer from "../code/UlContainer";
import Button from "../code/Button";
import Header from "../code/Header";

const MonthlyCleaning = () => {
  const [addText, setAddText] = useState("");
  const [submitText, setSubmitText] = useState([]);
  const [hide, setHide] = useState(true);
  const [duties, setDuties] = useState(null);

  const handleChange = (e) => {
    setAddText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!addText) {
      return alert("โปรดกรอกข้อมูล");
    }

    const newEmployee = { id: submitText.length + 1, name: addText };
    setSubmitText([...submitText, newEmployee]);
    setAddText("");
  };

  const shuffleArray = (array) => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled;
  };

  useEffect(() => {
    const shuffledEmployees = shuffleArray(employees.concat(submitText));
    setDuties(assignDuties(shuffledEmployees));
  }, [submitText]); // Trigger shuffle and duty assignment when submitText changes

  const assignDuties = (shuffledEmployees) => {
    const foodAndShelf = shuffledEmployees.slice(0, 3);
    const dustTheFurniture = shuffledEmployees.slice(3, 4);
    const sweepTheFloor = shuffledEmployees.slice(4, 8);
    const mopTheFloor = shuffledEmployees.slice(8, 12);
    const meetingRoom = shuffledEmployees.slice(12);

    return {
      foodAndShelf,
      dustTheFurniture,
      sweepTheFloor,
      mopTheFloor,
      meetingRoom,
    };
  };

  const toggleDutyVisibility = () => {
    setHide(!hide);
  };

  return (
    <PageLayout>
      <div className="flex flex-col h-screen">
        <Header>Monthly Cleaning</Header>
        <div className="p-2">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center h-15"
          >
            <label>Add Employee</label>
            <input
              type="text"
              placeholder="add here..."
              className="border rounded pl-2 ml-2 my-3"
              onChange={handleChange}
              value={addText}
            />
            <Button
              className=" ml-5 px-3 bg-slate-200 rounded"
              onClick={handleSubmit}
              type="submit"
            >
              Add
            </Button>
          </form>

          <div className="">
            <p className="text-lg font-semibold text-center">Employee List</p>
            <ul className="flex justify-center">
              {[...employees, ...submitText].map((emp) => (
                <li className="ml-1" key={uuidv4()}>
                  {emp.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <Button onClick={toggleDutyVisibility}>
              {hide ? "Show" : "Hide"} Duty
            </Button>
            {!hide && duties && (
              <div className="flex flex-col border-2 px-5 rounded ">
                <h2 className="font-semibold text-xl text-center mb-2">Duty</h2>
                <div className="flex flex-col items-center text-center">
                  <div>
                    <div className="pb-1">
                      <UlContainer duties={duties.foodAndShelf}>
                        Food and Shelf
                      </UlContainer>
                    </div>
                  </div>
                  <div className="pb-1">
                    <UlContainer duties={duties.dustTheFurniture}>
                      Dust The Furniture
                    </UlContainer>
                  </div>
                  <div className="pb-1">
                    <UlContainer duties={duties.sweepTheFloor}>
                      Sweep The Floor
                    </UlContainer>
                  </div>
                  <div className="pb-1">
                    <UlContainer duties={duties.mopTheFloor}>
                      Mop The Floor
                    </UlContainer>
                  </div>
                  <div className="pb-1">
                    <UlContainer duties={duties.meetingRoom}>
                      Meeting Room
                    </UlContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <footer className="bg-slate-300 mt-auto flex justify-center py-2">
          🍸 Snack น้ำบ้านไม้ 🍸
        </footer>
      </div>
    </PageLayout>
  );
};

export default MonthlyCleaning;
