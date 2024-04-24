import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BillingAndDelivery from "../billingAndDelivery";

describe("billingAndDelivery Phone Validation", () => {
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

describe("billingAndDelivery VAT Validation", () => {
  it("Checks if there is no error for 8 digits", async () => {
    render(<BillingAndDelivery />);

    const vatInput = screen.getByLabelText("VAT");
    await userEvent.type(vatInput, "12345678");

    const errorMessage = screen.queryByText("Invalid VAT for Denmark.");
    expect(errorMessage).not.toBeInTheDocument();
  });
  it("Checks if there is error for 7 digits", async () => {
    render(<BillingAndDelivery />);

    const vatInput = screen.getByLabelText("VAT");
    await userEvent.type(vatInput, "1234567");

    const errorMessage = screen.queryByText("Invalid VAT for Denmark.");
    expect(errorMessage).toBeInTheDocument();
  });
  it("Checks if there is error for 9 digits", async () => {
    render(<BillingAndDelivery />);

    const vatInput = screen.getByLabelText("VAT");
    await userEvent.type(vatInput, "123456789");

    const errorMessage = screen.queryByText("Invalid VAT for Denmark.");
    expect(errorMessage).toBeInTheDocument();
  });
});

//TODO: add mock for testing API
// describe('billingAndDelivery ZIP Validation', () => {
//     it("Checks if there is no error for 1050", async () => {
//         render(<BillingAndDelivery />);

//         const zipInput = screen.getByLabelText("Zip code");
//         await userEvent.type(zipInput, "1050");

//         const errorMessage = screen.queryByText("Invalid ZIP code for Denmark.");
//         expect(errorMessage).not.toBeInTheDocument();
//     });
//     it("Checks if there is error for 1234", async () => {
//         render(<BillingAndDelivery />);

//         const zipInput = screen.getByLabelText("Zip code");
//         await userEvent.type(zipInput, "1234");

//         const errorMessage = await screen.queryByText("Invalid ZIP code for Denmark.");
//         expect(errorMessage).toBeInTheDocument();
//     });
// });
