const ListItem = ({ employees }) => {
  return (
    <ul className="flex">
      {employees.map((emp) => (
        <li
          key={emp.id}
          className="flex justify-center items-center bg-red-200 w-20 mb-1 p-1 first:ml-0 ml-3 rounded drop-shadow "
        >
          {emp.name}
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
