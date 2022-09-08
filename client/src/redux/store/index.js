import { createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducer";
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))) //con esto inicialice el store tras crear reducer tambien
/**
 * El store reducer un reducer y un middleware. En este caso es thunk, que lo que hace dar la posiblidad de trabajr de manera asincrona entre las peticiones ala db/api y las acciones que vienen de ellas. Permite que el store pueda recibir asyncs
 */

export default store