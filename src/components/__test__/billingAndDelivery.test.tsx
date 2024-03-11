import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BillingAndDelivery from '../billingAndDelivery';

describe('billingAndDelivery Phone Validation', () => {
    it("Checks if there is no error for 8 digits", async () => {
        render(<BillingAndDelivery />);

        const phoneInput = screen.getByLabelText("Phone");
        await userEvent.type(phoneInput, "12345678");

        const errorMessage = screen.queryByText("Invalid phone for Denmark.");
        expect(errorMessage).not.toBeInTheDocument();
    });
    it("Checks if there is error for 7 digits", async () => {
        render(<BillingAndDelivery />);

        const phoneInput = screen.getByLabelText("Phone");
        await userEvent.type(phoneInput, "1234567");

        const errorMessage = screen.queryByText("Invalid phone for Denmark.");
        expect(errorMessage).toBeInTheDocument();
    });
    it("Checks if there is error for 9 digits", async () => {
        render(<BillingAndDelivery />);

        const phoneInput = screen.getByLabelText("Phone");
        await userEvent.type(phoneInput, "123456789");

        const errorMessage = screen.queryByText("Invalid phone for Denmark.");
        expect(errorMessage).toBeInTheDocument();
    });
});
