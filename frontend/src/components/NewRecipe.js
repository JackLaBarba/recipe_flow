import { useState } from "react"
import Config from "../config";

export default function NewRecipe() {
    const [title, setTitle] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetch(`${Config.recipe_service_url}/recipe`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            }
        );
    };

    return <form onSubmit={onSubmit}>
        <label>
            <p>Recipe Title</p>
            <input type="text" onChange={e => setTitle(e.target.value) }></input>
        </label>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
}