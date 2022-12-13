import { useState } from "react";
import Dropdown, { DropdownItem } from "../components/Dropdown";


function DropdownPage() {
  const [selection, setSelection] = useState<DropdownItem | null>(null);

  const handleSelection = (option: DropdownItem) => setSelection(option);

  const options = [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
  ];


  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between">
        <Dropdown options={options} value={selection} onChange={handleSelection} />
      </div>
    </div>
  );
}

export default DropdownPage;
