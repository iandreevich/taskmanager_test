const FormMessage = ({ type = "error", children }) => {
  return (
    <div
      role="alert"
      style={{ color: type === "error" ? "#9a3f38" : "#6597a7" }}
    >
      {children}
    </div>
  );
};

export default FormMessage;
