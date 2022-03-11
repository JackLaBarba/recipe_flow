import { Dag } from "./Dag";
import StepActions from "./StepActions";
import Modal from "react-modal";

import { useState } from "react";

function Recipe(props) {
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
        contentLabel="Step"
      >
        <h2>Step: {modalContents.title}</h2>
        <img
          className="step-img"
          src={modalContents.imageSource}
          alt={modalContents.title}
        ></img>
        <h3>Description</h3>
        <div>{modalContents.description}</div>

        <button onClick={closeModal}>close</button>
        <StepActions isDone={modalContents.isDone} stepId={modalContents.id} markStepDoneness={props.markStepDoneness} closeModal={closeModal} />
      </Modal>
      <h2>{props.recipe.title}</h2>
      <h3>Description</h3>
      <p>{props.recipe.description}</p>
      <h3>Ingredients</h3>
      <h3>Steps</h3>
      <Dag data={props.recipe.steps} onNodeClick={openModal} />
    </div>
  );
};

export default Recipe;
