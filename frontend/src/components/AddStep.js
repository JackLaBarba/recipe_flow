import { useState } from "react"

export default function AddStep({ stepId, addStep }) {
    const [title, setTitle] = useState("");
    const [parents, setParents] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        let parentIds = parents.split(",");
        if (parentIds[0] === "") {
            parentIds = [];
        }
        console.log(parentIds);
        addStep({
            id: stepId.toString(), 
            title,
            description: "placeholder",
            imageSource: "https://images.pexels.com/photos/4198169/pexels-photo-4198169.jpeg",
            parentIds,
        });
    }

    return <form onSubmit={onSubmit}>
        <label>
            <p>Step name</p>
            <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
        </label>
        <label>
            <p>Parents (comma separated)</p>
            <input type="test" onChange={(e) => setParents(e.target.value)}></input>
        </label>
        <div>
            <button type="submit">Add Step</button>
        </div>
    </form>

}