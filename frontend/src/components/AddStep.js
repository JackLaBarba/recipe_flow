import { useEffect, useRef, useState } from "react"
import Config from "../config";
import debounce from "lodash.debounce";

/** 
 * Finds and image that matches the provided query.
 * 
 * @param {String} query the search string to give to the image search service
 * @returns {String} the URL of that image
*/
async function getStockImageUrl(query) {
    if (query.length === 0) {
        return "";
    }
    const encoded_query = query.replace(' ', '_');
    const response = await fetch(Config.stock_image_service_url + encoded_query);
    return await response.text();
}

export default function AddStep({ stepId, addStep, otherSteps }) {
    const [title, setTitle] = useState("");
    const [imageSource, setImageSource] = useState("");
    const [parents, setParents] = useState([]);
    const [selectedParentId, setSelectedParentId] = useState();
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (otherSteps.length > 0) {
            setSelectedParentId(otherSteps[0].id);
        }
    }, [otherSteps]);

    // Debounce requests to the stock image service so we don't overwhelm it
    // with requests generating from each of the user's keystrokes.
    const debouncedGetStockImageUrl = useRef(debounce(
        async (query, setImageSource) => {
            const url = await getStockImageUrl(query);
            setImageSource(url);
        }, Config.input_debounce_ms
    )).current;

    const updateTitle = async (new_title) => {
        setTitle(new_title);
        debouncedGetStockImageUrl(new_title, setImageSource);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let parentIds = parents.map((step) => step.id);
        if (parentIds[0] === "") {
            parentIds = [];
        }
        addStep({
            id: stepId.toString(),
            title,
            description,
            imageSource,
            parentIds,
        });
    }

    const renderImage = (src) => {
        if (src.length > 0) {
            return <img className="step-img" alt={title} src={src}></img>;
        }
        return <p></p>;
    }

    const newSelectedParent = (e) => {
        e.preventDefault();
        setSelectedParentId(e.target.value);
    }

    const addSelectedParent = (e) => {
        e.preventDefault();
        let parentStep = null;
        console.log(selectedParentId);
        for (const step of otherSteps) {
            if (step.id === selectedParentId) {
                parentStep = step;
                break;
            }
        }
        if (!parentStep) {
            console.error("Attempted to add a parent step, but I couldn't find it");
            return;
        }
        setParents([...parents, parentStep]);
    }

    const blockingSteps = () => {
        if (otherSteps.length === 0) {
            return <div></div>
        }
        return <div>
            <h2>Blocking steps</h2>
            <ul>
                {parents.map((step, key) => {
                    return <li key={key}>{step.title}</li>
                })}
            </ul>
            <select value={selectedParentId} onChange={newSelectedParent}>
                {otherSteps.map((step, index) => {
                    return <option value={step.id} key={index}>{step.title}</option>
                })}
            </select>
            <button onClick={addSelectedParent}>Add Blocking Step</button>
        </div>
    }

    const updateDescription = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    }

    return <form onSubmit={onSubmit}>
        <label>
            <p>Step name</p>
            <input type="text" onChange={(e) => updateTitle(e.target.value)}>
            </input>
        </label>
        <label>
            <p>Description</p>
            <textarea onChange={updateDescription}></textarea>
        </label>

        {blockingSteps()}

        <div>
            <button type="submit">Add Step</button>
        </div>

        <div>
            {renderImage(imageSource)}
        </div>
    </form>

}