interface props {
  name: string;
  id: string;
  options: string[];
  values?: string[];
  default: string;
  currentValue: string;
  onChange: (value: string) => void;
}

function InputOptions(props: props) {
  return (
    <select
      name={props.name}
      id={props.id}
      value={props.currentValue}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option value={null}>{props.default}</option>

      {props.options.map((option, index) => (
        <option key={index + option} value={props.values[index].toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default InputOptions;
