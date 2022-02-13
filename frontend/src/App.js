import { Dag } from "./components/Dag";

/* App */
export default function App() {
  return (
    <div className="my-app">
      <Dag data={[1, 2, 3, 4]} />
    </div>
  );
}
