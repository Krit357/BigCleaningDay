import ListItem from "./ListItem";

const UlContainer = ({ children, duties }) => {
  return (
    <div className="pb-5 flex flex-col items-center ">
      <p className="font-bold">{children}</p>
      <ListItem employees={duties} />
    </div>
  );
};

export default UlContainer;
