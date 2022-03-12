import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Config from "../config";
import AddStep from "./AddStep";
import { Dag } from "./Dag";
import Modal from "react-modal";

export default function NewRecipe() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState(""); 
    const [steps, setSteps] = useState([]);
    const [stepId, setSetId] = useState(1);
    const [modalIsOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();

    const openModal = (d) => {
        Modal.setAppElement("#recipe-flow");
        setIsOpen(true);
    };

    function closeModal() {
        setIsOpen(false);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${Config.recipe_service_url}/recipe`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, ingredients, steps })
            }
        );
        navigate("/recipes/");
    };

    const addStep = (new_step) => {
        console.log(JSON.stringify(new_step));
        setSteps(arr => [...arr, new_step]);
        setSetId(stepId + 1);
        closeModal();
    }

    const addIngredient = (e) => {
        e.preventDefault();
        setIngredients([...ingredients, newIngredient]);
        setNewIngredient("");
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Step"
            >
                <AddStep stepId={stepId} addStep={addStep} otherSteps={steps}></AddStep>

            </Modal>
            <label>
                <h2>Title</h2>
                <input type="text" onChange={e => setTitle(e.target.value)}></input>
            </label>
            <label>
                <h2>Description</h2>
                <textarea onChange={e => setDescription(e.target.value)} ></textarea>
            </label>
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((el, i) => <li key={i}>{el}</li> )}
            </ul>
            <label>
                <input type="text" onChange={e => setNewIngredient(e.target.value)} value={newIngredient}></input>
                <button onClick={addIngredient} className="inline-button">Add</button>
            </label>

            <h2>Steps</h2>
            <div>
                <button onClick={openModal}>Add a step</button>
            </div>

            {steps.length > 0 && <Dag data={steps}></Dag>}
            <div>
                <button type="submit" onClick={onSubmit} className="done-action">Publish Recipe!</button>
            </div>
        </div>)
}