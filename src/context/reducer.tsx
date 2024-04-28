import { FormState, FormAction } from "./types";

export const initialFormState: FormState = {
    orderFirstName: "",
    orderLastName: "",
    orderPhone: "",
    orderEmail: "",
    orderAddress1: "",
    orderAddress2: "",
    orderZip: "",
    orderCity: "",
    orderCountry: "DK",
    orderCompany: "",
    orderVAT: "",
    billingAddress: "",
    billingZip: "",
    billingCity: "",
    billingCountry: "",
    isTermsAccepted: false,
    isMarketingAccepted: true,
    orderComment: "",
    isBillingDifferent: false,
    errors: {},
    isLoading: false
}

export const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                [action.payload.field]: action.payload.value,
            };
        case "SET_VALIDATION_RESULT":
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.field]: action.payload.message
                },
                orderCity: action.payload.city ?? state.orderCity
            };
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
}