import { put, call } from 'redux-saga/effects';


function* apiCall(api, payload) {
    let { data, error } = yield call(api, payload);

    return { data, error };
}

function* execRequest({
    types,
    api,
    payload
}) {
    const [SUCCESS, FAIL] = types;

    try {

        const { data: rawData, error } = yield apiCall(api, payload);

        if (!!error) {
            const errorObj = { message: error.message };

            if (error.response) {
                errorObj.message = error.response.data.message || error.response.data.error;
                errorObj.code = error.response.status;
            }

            yield put({
                type: FAIL,
                error: errorObj,
                requestPayload: payload,
            });

            return;
        }

        const data = rawData.data ? rawData.data : rawData;

        const normalized = { data: data || [] };

        yield put({
            type: SUCCESS,
            ...normalized,
            requestPayload: payload,
        });

        yield payload && payload.onSuccessCb && payload.onSuccessCb();
        
    } catch (err) {
        console.error(err);
    }
}

export { execRequest };
