import { useState } from "react";
import Dropdown, { DropdownItem } from "./components/Dropdown";


function App() {
  const [selection, setSelection] = useState<DropdownItem | null>(null);

  const handleSelection = (option: DropdownItem) => setSelection(option);

  const options = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
  ];


  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="flex justify-between">
        <Dropdown options={options} value={selection} onChange={handleSelection} />
        <Dropdown options={options} value={selection} onChange={handleSelection} />
      </div>
    </div>
  );
}

export default App;
