
function StepActions({ isDone, stepId, markStepDoneness, closeModal }) {
    function markComplete() {
        markStepDoneness(stepId, true);
        closeModal();
      }
    
    function markIncomplete() {
        markStepDoneness(stepId, false);
        closeModal();
    }

    if (isDone) {
        return <button onClick={markIncomplete}>Mark Incomplete</button>
    }
    return <button onClick={markComplete}>Mark completed</button>
}

export default StepActions;