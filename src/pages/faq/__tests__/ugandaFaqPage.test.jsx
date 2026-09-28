import React from "react";
import { render, screen } from "@testing-library/react";
import { LocaleProvider } from "../../../components/LocaleProvider";
import FrenchCivFaqPage from "../ugandaFaqPage";

describe("French CI FAQ page translations", () => {
  beforeEach(() => {
    window.localStorage.setItem("siteLanguage", "EN");
  });

  it("renders the English FAQ content when the English locale is selected", () => {
    render(
      <LocaleProvider>
        <FrenchCivFaqPage />
      </LocaleProvider>,
    );

    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
    expect(screen.getByText(/General Questions/i)).toBeInTheDocument();
    expect(
      screen.getByText(/What data requires consent\?/i),
    ).toBeInTheDocument();
  });
});
