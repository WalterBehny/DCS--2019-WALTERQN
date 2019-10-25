import dispatcher from "../appDispatcher";
import * as professorApi from "../api/professorApi";
import actionTypes from "./actionTypes";


export function loadProfessors() {
  console.log("professors action");
  return professorApi.getProfessors().then(professors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_PROFESSORS,
      professors: professors
    });
  });
}

