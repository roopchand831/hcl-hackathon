import "./Input.css";

function Input(props: any) {
  const inputClasses = ["InputElement"];

  let inputElement = (
    <input
      className={inputClasses.join(" ")}
      value={props.value}
      onChange={props.changed}
      type={props.type}
    />
  );

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
}

export default Input;
