import { SessionNotes } from "./components/SessionNotes";
import { Actions } from "./components/Actions";

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <Actions />
      <SessionNotes />
    </div>
  );
}

export default App;
