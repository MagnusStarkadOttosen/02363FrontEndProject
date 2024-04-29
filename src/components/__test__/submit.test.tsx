import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { FormProvider } from "../../context/FormContext";
import BillingAndDelivery from "../billingAndDelivery";
import { MemoryRouter } from "react-router-dom";

describe("submit", () => {
    it("Test for submit button when terms are not accepted", async () => {

        const alertMock = vi.fn();
        vi.spyOn(window, 'alert').mockImplementation(alertMock);

        const { getByRole } = render(
            <MemoryRouter>
                <FormProvider>
                    <BillingAndDelivery />
                </FormProvider>
            </MemoryRouter>
        );

        fireEvent.click(getByRole("button", { name: /submit order/i }));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("Please accept the terms and conditions.");
        });

        alertMock.mockRestore();
    });
});