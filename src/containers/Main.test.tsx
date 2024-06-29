import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./Main";
import { geocode, getWeather } from "../services/weather";

// Mock the external services and hooks
jest.mock("../services/weather");
jest.mock("use-debounce", () => ({
  useDebouncedCallback: (fn: any) => fn,
}));

describe("Main", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Weather App title", () => {
    render(<Main />);
    expect(screen.getByText("Weather App")).toBeInTheDocument();
  });

  test("displays error message when geocode fails", async () => {
    (geocode as jest.Mock).mockRejectedValue(new Error("Geocode failed"));

    render(<Main />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "London" } });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch locations")).toBeInTheDocument();
    });
  });

  test("displays weather data when location is selected", async () => {
    const mockLocation = {
      name: "London",
      state: "England",
      country: "GB",
      lat: 51.5074,
      lon: -0.1278,
    };
    const mockWeather = { temp: 20, humidity: 50, wind_speed: 5 };

    (geocode as jest.Mock).mockResolvedValue([mockLocation]);
    (getWeather as jest.Mock).mockResolvedValue({ current: mockWeather });

    render(<Main />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "London" } });

    await waitFor(() => {
      const locationOption = screen.getByText("London, England GB");
      fireEvent.click(locationOption);
    });

    await waitFor(() => {
      expect(screen.getByText(/London/)).toBeInTheDocument();
      expect(screen.getByText(/England/)).toBeInTheDocument();
      expect(screen.getByText(/Temperature: 20/)).toBeInTheDocument();
      expect(screen.getByText(/Humidity: 50/)).toBeInTheDocument();
      expect(screen.getByText(/Wind Speed: 5/)).toBeInTheDocument();
    });
  });

  test("displays error message when weather fetch fails", async () => {
    const mockLocation = {
      name: "London",
      state: "England",
      country: "GB",
      lat: 51.5074,
      lon: -0.1278,
    };

    (geocode as jest.Mock).mockResolvedValue([mockLocation]);
    (getWeather as jest.Mock).mockRejectedValue(
      new Error("Weather fetch failed")
    );

    render(<Main />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "London" } });

    await waitFor(() => {
      const locationOption = screen.getByText("London, England GB");
      fireEvent.click(locationOption);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch weather data")
      ).toBeInTheDocument();
    });
  });

  test("clears data when input is cleared", async () => {
    const mockLocation = {
      name: "London",
      state: "England",
      country: "GB",
      lat: 51.5074,
      lon: -0.1278,
    };
    const mockWeather = { temp: 20, humidity: 50, wind_speed: 5 };

    (geocode as jest.Mock).mockResolvedValue([mockLocation]);
    (getWeather as jest.Mock).mockResolvedValue({ current: mockWeather });

    render(<Main />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "London" } });

    await waitFor(() => {
      const locationOption = screen.getByText(/London/);
      fireEvent.click(locationOption);
    });

    await waitFor(() => {
      expect(screen.getByText(/London/)).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryByText(/London/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Temperature: 20/)).not.toBeInTheDocument();
    });
  });
});
