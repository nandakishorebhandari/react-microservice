import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import createHistory from './history';
import reducers from '../reducers';

const history = createHistory();

const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history),
});

export default rootReducer;
