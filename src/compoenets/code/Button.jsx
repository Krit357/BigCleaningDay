const Button = ({ children, onClick }) => {
  return (
    <div
      className="bg-slate-200 ml-5 px-3 py-2 my-2 rounded cursor-pointer hover:bg-slate-300  "
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
