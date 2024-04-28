export interface FormState {
    orderFirstName: string;
    orderLastName: string;
    orderPhone: string;
    orderEmail: string;
    orderAddress1: string;
    orderAddress2: string;
    orderZip: string;
    orderCity: string;
    orderCountry: string;
    orderCompany: string;
    orderVAT: string;
    billingAddress: string;
    billingZip: string;
    billingCity: string;
    billingCountry: string;
    isTermsAccepted: boolean;
    isMarketingAccepted: boolean;
    orderComment: string;
    isBillingDifferent: boolean;
    errors: { [key: string]: string | undefined };
    isLoading: boolean
}

export type FormAction =
    | { type: 'SET_FIELD', payload: { field: keyof FormState, value: any } }
    | { type: 'SET_VALIDATION_RESULT'; payload: { field: keyof FormState; valid: boolean; message?: string; city?: string; } }
    | { type: 'SET_LOADING', payload: boolean }