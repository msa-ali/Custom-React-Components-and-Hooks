import Accordion from "./components/Accordion";
import ButtonPage from "./pages/ButtonPage";

function App() {

  const items = [
    {
      id: 1,
      label: 'Can I use React on a project',
      content: 'React is Awesome. You can use React on any project you want.',
    },
    {
      id: 2,
      label: 'Can I use Javascript on a project',
      content: 'Yes, Javascript is Awesome. You can use Javascript on any project you want.',
    },
    {
      id: 3,
      label: 'Can I use CSS on a project',
      content: <span>Yes, <b>CSS</b> is Awesome. You can use CSS on any project you want.</span>,
    }
  ];


  return (
    <div className="flex flex-col justify-center items-center">
      <ButtonPage />
      <div className=" w-3/5 mb-8">
      <Accordion items={items} />
      </div>
    </div>
  );
}

export default App;
