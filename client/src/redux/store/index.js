import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import persistState from 'redux-localstorage';
import { routerMiddleware } from 'connected-react-router';

import createReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState, history) {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [routerMiddleware(history), sagaMiddleware];

    const enhancers = [
        applyMiddleware(...middlewares),
        persistState(['local', 'comparison']),
    ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
      
        if (typeof devToolsExtension === 'function') {
          enhancers.push(devToolsExtension())
        }
      }

    const rootReducer = createReducer(history);
    const store = createStore(
        rootReducer,
        initialState,
        compose(...enhancers)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
