// Example: Separate component for input fields
type InputFieldType = {
  label: string;
  value: string | null | any;
  onChange: () => void;
  placeholder: string;
  type: string;
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: InputFieldType) => {
  return (
    <label htmlFor={label}>
      {label}:
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        name={label.toLowerCase()}
        placeholder={placeholder}
        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
      />
    </label>
  );
};
