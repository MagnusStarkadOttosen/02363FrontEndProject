import React, { FunctionComponent, ReactNode, createContext, useContext, useReducer } from "react";
import { FormState, FormAction } from "./types";
import { formReducer, initialFormState } from "./reducer";

const FormStateContext = createContext<FormState | undefined>(undefined);
const FormDispatchContext = createContext<React.Dispatch<FormAction> | undefined>(undefined);

export const FormProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, initialFormState);

    return (
        <FormStateContext.Provider value={state}>
            <FormDispatchContext.Provider value={dispatch}>
                {children}
            </FormDispatchContext.Provider>
        </FormStateContext.Provider>
    );
};

export const useFormState = () => {
    const context = useContext(FormStateContext);
    if (context === undefined) {
        throw new Error("useFormState must be used within a FormProvider");
    }
    return context;
};

export const useFormDispatch = () => {
    const context = useContext(FormDispatchContext);
    if (context === undefined) {
        throw new Error("useFormDispatch must be used within a FormProvider");
    }
    return context;
};