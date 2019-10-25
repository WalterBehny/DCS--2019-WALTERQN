import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _professors = [];

class ProfessorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getProfessors() {    
    return _professors;
  }

  getProfessorById(id) {
    return _professors.find(professor => professor.id === id);
  }
}

const store = new ProfessorStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.DELETE_PROFESSOR:
      //debugger;
      _professors = _professors.filter(
        professor => professor.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.CREATE_PROFESSOR:
      _professors.push(action.professors);
      store.emitChange();
      break;
    case actionTypes.UPDATE_PROFESSOR:
      _professors = _professors.map(professor =>
        professor.id === action.professors.id ? action.professors : professor
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_PROFESSORS:
      _professors = action.professors;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
});

export default store;