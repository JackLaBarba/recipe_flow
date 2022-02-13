import { Dag } from "./Dag";
import Modal from "react-modal";
import { useState } from "react";

const Recipe = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContents, setModalContents] = useState({});

  const openModal = (d) => {
    Modal.setAppElement("#recipe-flow");
    console.log(d);
    setModalContents(d);
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Step: {modalContents.title}</h2>

        <button onClick={closeModal}>close</button>
        <button onClick={closeModal}>Mark completed</button>
      </Modal>
      <h2>{props.recipe.title}</h2>
      <h3>Description</h3>
      <p>
        This onion soup isn't very delicious but it's good for demonstrating a
        user experience.
      </p>
      <h3>Ingredients</h3>
      <ul>
        <li>1 onion</li>
        <li>1 quart water</li>
      </ul>
      <h3>Steps</h3>
      <Dag data={props.recipe.steps} onNodeClick={openModal} />
    </div>
  );
};

export default Recipe;
