import { createSlice, current } from "@reduxjs/toolkit"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        mobile : null,
        wechatUserId: null,
        result : []
    },
    reducers : {
        setMobile : (state, action) => {
            state.mobile = action.payload
        },
        setWechatUserId : (state, action) => {
            state.wechatUserId = action.payload
        },
        pushResultAction : (state, action) => {
            console.log('pushResultAction: ', action.payload);
            state.result.push(action.payload);
            console.log(current(state.result));
        },

        // update usually means we've moved to previous. 
        // And that's why we want to fill 
        updateResultAction : (state, action) => {
            const { questionIndex, checked } = action.payload;
            // given: [1,0,3,(2),0,0];
            // if we're only question index 3
            // if checked is 4
            // then we update the element at index 3, and < 4.
            //  [1, 0, 3, (4), 0, 0]
            state.result.fill(checked, questionIndex, questionIndex + 1);

            // check how to do log state.result
            console.log('======> updateResultAction - state.result', current(state.result));
        },
        resetResultAction : () => {
            return {
                userId : null,
                result : []
            }
        }
    }
})

export const { setWechatUserId, setMobile, pushResultAction, resetResultAction, updateResultAction } = resultReducer.actions;

export default resultReducer.reducer;
