import { useRef, useState } from "react"
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

export default function AddStep({ stepId, addStep }) {
    const [title, setTitle] = useState("");
    const [imageSource, setImageSource] = useState("");
    const [parents, setParents] = useState("");

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
        let parentIds = parents.split(",");
        if (parentIds[0] === "") {
            parentIds = [];
        }
        addStep({
            id: stepId.toString(),
            title,
            description: "placeholder",
            imageSource,
            parentIds,
        });
    }

    const renderImage = (src) => {
        if (src.length > 0) {
            return <img className="step-img" alt={title} src={src}></img>;
        }
        return <p>stock image</p>;
    }

    return <form onSubmit={onSubmit}>
        <label>
            <p>Step name</p>
            <input type="text" onChange={(e) => updateTitle(e.target.value)}>
            </input>
        </label>
        <label>
            <p>Parents (comma separated)</p>
            <input type="test" onChange={(e) => setParents(e.target.value)}>
            </input>
        </label>
        <div>
            {renderImage(imageSource)}
        </div>
        <div>
            <button type="submit">Add Step</button>
        </div>
    </form>

}