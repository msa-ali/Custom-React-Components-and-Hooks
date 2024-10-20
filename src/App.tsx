import Route from './components/route';
import Sidebar from "./components/sidebar";
import AccordionPage from "./pages/accordionPage";
import ButtonPage from "./pages/buttonPage";
import DropdownPage from "./pages/dropdownPage";
import ModalPage from "./pages/modalPage";
import TablePage from './pages/tablePage';
import CounterPage from './pages/counterPage';
import DragAndDropPage from './pages/dragAndDropPage';
import TicTacToePage from './pages/ticTacToePage';
import InteractiveShape from './interview-problems/interactiveShape';
import ProgressBar from './interview-problems/progressBar';

function App() {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <Sidebar />
      <div className="col-span-5">
        <Route path="/accordion">
          <AccordionPage />
        </Route>
        <Route path="/buttons">
          <ButtonPage />
        </Route>
        <Route path="/">
          <DropdownPage />
        </Route>
        <Route path="/modal">
          <ModalPage />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
        <Route path='/counter'>
          <CounterPage initialCount={0} />
        </Route>
        <Route path='/drag-and-drop'>
          <DragAndDropPage />
        </Route>
        <Route path='/tic-tac-toe'>
          <TicTacToePage />
        </Route>
        <Route path='/interactive-shape'>
          <InteractiveShape />
        </Route>
        <Route path='/progress-bar'>
          <ProgressBar />
        </Route>
      </div>
    </div>
  );
}

export default App;
