import { useState } from "react"
import Config from "../config";
import AddStep from "./AddStep";
import { Dag } from "./Dag";

export default function NewRecipe() {
    const [title, setTitle] = useState("");
    const [steps, setSteps] = useState([]);
    const [stepId, setSetId] = useState(1);

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${Config.recipe_service_url}/recipe`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, steps })
            }
        );

    };

    const addStep = (new_step) => {
        console.log(JSON.stringify(new_step));
        setSteps(arr => [...arr, new_step]);
        setSetId(stepId + 1);
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <label>
                <p>Recipe Title</p>
                <input type="text" onChange={e => setTitle(e.target.value)}></input>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        
            <AddStep stepId={stepId} addStep={addStep}></AddStep>
            {steps.length}

        {steps.length > 0 && <Dag data={steps}></Dag>}


    </div>)
}