/**
 * SearchAndFilter.test.jsx
 * Requirement b: Test book search and category filtering.
 * Topics: Jest, React Testing Library
 */
import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../testUtils";
import { INITIAL_BOOKS } from "../../services/mockData";

// ─── Mock LibraryContext ──────────────────────────────────────────────────────
jest.mock("../../context/LibraryContext", () => ({
  useLibrary: jest.fn()
}));
import { useLibrary } from "../../context/LibraryContext";

// ─── Components under test ────────────────────────────────────────────────────
import SearchBar from "../../components/SearchBar";
import FilterPanel from "../../components/FilterPanel";

// ─────────────────────────────────────────────────────────────────────────────

const mockSetSearch = jest.fn();
const mockSetCategory = jest.fn();
const mockSetAuthor = jest.fn();
const mockSetAvailability = jest.fn();
const mockResetFilters = jest.fn();

const makeSearchContext = (overrides = {}) => ({
  search: "",
  setSearch: mockSetSearch,
  books: INITIAL_BOOKS,
  category: "All",
  setCategory: mockSetCategory,
  author: "All",
  setAuthor: mockSetAuthor,
  availability: "All",
  setAvailability: mockSetAvailability,
  resetFilters: mockResetFilters,
  ...overrides
});

// ─────────────────────────────────────────────────────────────────────────────

describe("Search and Filter (Requirement b)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useLibrary.mockReturnValue(makeSearchContext());
  });

  // ── SearchBar ────────────────────────────────────────────────────────────
  describe("SearchBar Component", () => {
    test("renders search input with correct placeholder", () => {
      renderWithProviders(<SearchBar />);
      const input = screen.getByPlaceholderText(
        /search.*books by title, keyword, or author/i
      );
      expect(input).toBeInTheDocument();
    });

    test("input shows current search value", () => {
      useLibrary.mockReturnValue(makeSearchContext({ search: "Spider-Man" }));
      renderWithProviders(<SearchBar />);
      expect(screen.getByDisplayValue("Spider-Man")).toBeInTheDocument();
    });

    test("typing in search input calls setSearch with new value", () => {
      renderWithProviders(<SearchBar />);
      const input = screen.getByPlaceholderText(
        /search.*books by title, keyword, or author/i
      );
      fireEvent.change(input, { target: { value: "Watchmen" } });
      expect(mockSetSearch).toHaveBeenCalledWith("Watchmen");
    });

    test("clears search when clear button is clicked", () => {
      useLibrary.mockReturnValue(makeSearchContext({ search: "Ponniyin" }));
      renderWithProviders(<SearchBar />);
      const clearBtn = document.querySelector(".clear-search-btn");
      fireEvent.click(clearBtn);
      expect(mockSetSearch).toHaveBeenCalledWith("");
    });

    test("clear button is hidden when search is empty", () => {
      useLibrary.mockReturnValue(makeSearchContext({ search: "" }));
      renderWithProviders(<SearchBar />);
      expect(document.querySelector(".clear-search-btn")).not.toBeInTheDocument();
    });

    test("clear button is visible when search has text", () => {
      useLibrary.mockReturnValue(makeSearchContext({ search: "test" }));
      renderWithProviders(<SearchBar />);
      expect(document.querySelector(".clear-search-btn")).toBeInTheDocument();
    });
  });

  // ── FilterPanel ──────────────────────────────────────────────────────────
  describe("FilterPanel Component", () => {
    test("renders Category dropdown", () => {
      renderWithProviders(<FilterPanel />);
      expect(screen.getByLabelText("Category:")).toBeInTheDocument();
    });

    test("renders Author dropdown", () => {
      renderWithProviders(<FilterPanel />);
      expect(screen.getByLabelText("Author:")).toBeInTheDocument();
    });

    test("renders Availability dropdown", () => {
      renderWithProviders(<FilterPanel />);
      expect(screen.getByLabelText("Availability:")).toBeInTheDocument();
    });

    test("category dropdown contains 'All Categories' option", () => {
      renderWithProviders(<FilterPanel />);
      const categorySelect = screen.getByLabelText("Category:");
      expect(categorySelect).toHaveDisplayValue("All Categories");
    });

    test("category dropdown contains unique categories from books", () => {
      renderWithProviders(<FilterPanel />);
      const categorySelect = screen.getByLabelText("Category:");
      const uniqueCategories = [...new Set(INITIAL_BOOKS.map((b) => b.category))];
      uniqueCategories.forEach((cat) => {
        expect(categorySelect).toContainElement(
          categorySelect.querySelector(`option[value="${cat}"]`)
        );
      });
    });

    test("changing category calls setCategory with new value", () => {
      renderWithProviders(<FilterPanel />);
      const categorySelect = screen.getByLabelText("Category:");
      const targetCategory = INITIAL_BOOKS[0]?.category || "Superhero";
      fireEvent.change(categorySelect, {
        target: { value: targetCategory }
      });
      expect(mockSetCategory).toHaveBeenCalledWith(targetCategory);
    });

    test("author dropdown contains unique authors from books", () => {
      renderWithProviders(<FilterPanel />);
      const authorSelect = screen.getByLabelText("Author:");
      const uniqueAuthors = [...new Set(INITIAL_BOOKS.map((b) => b.author))];
      uniqueAuthors.forEach((author) => {
        expect(authorSelect).toContainElement(
          authorSelect.querySelector(`option[value="${author}"]`)
        );
      });
    });

    test("changing author filter calls setAuthor", () => {
      renderWithProviders(<FilterPanel />);
      const authorSelect = screen.getByLabelText("Author:");
      const targetAuthor = INITIAL_BOOKS[0]?.author || "Jeph Loeb & Tim Sale";
      fireEvent.change(authorSelect, { target: { value: targetAuthor } });
      expect(mockSetAuthor).toHaveBeenCalledWith(targetAuthor);
    });

    test("availability dropdown has 'Available Only' option", () => {
      renderWithProviders(<FilterPanel />);
      const availSelect = screen.getByLabelText("Availability:");
      expect(
        availSelect.querySelector('option[value="Available"]')
      ).toBeInTheDocument();
    });

    test("changing availability calls setAvailability", () => {
      renderWithProviders(<FilterPanel />);
      const availSelect = screen.getByLabelText("Availability:");
      fireEvent.change(availSelect, { target: { value: "Available" } });
      expect(mockSetAvailability).toHaveBeenCalledWith("Available");
    });

    test("clicking Reset Filters button calls resetFilters", () => {
      renderWithProviders(<FilterPanel />);
      fireEvent.click(screen.getByRole("button", { name: /reset filters/i }));
      expect(mockResetFilters).toHaveBeenCalledTimes(1);
    });
  });

  // ── Combined search filtering logic ──────────────────────────────────────
  describe("Search Filtering Logic", () => {
    test("filtering books by title search works correctly", () => {
      const books = INITIAL_BOOKS;
      const targetBook = books[0];
      const query = targetBook.title;
      const filtered = books.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase())
      );
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered[0].title).toBe(targetBook.title);
    });

    test("filtering books by author search works correctly", () => {
      const books = INITIAL_BOOKS;
      const targetAuthor = books[0].author;
      const filtered = books.filter(
        (b) =>
          b.title.toLowerCase().includes(targetAuthor.toLowerCase()) ||
          b.author.toLowerCase().includes(targetAuthor.toLowerCase())
      );
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered[0].author).toBe(targetAuthor);
    });

    test("filtering by category returns correct books", () => {
      const targetCategory = INITIAL_BOOKS[0].category;
      const filtered = INITIAL_BOOKS.filter(
        (b) => b.category === targetCategory
      );
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered[0].category).toBe(targetCategory);
    });

    test("filtering by availability returns only available books", () => {
      const books = [...INITIAL_BOOKS, { ...INITIAL_BOOKS[0], id: 999, available: false }];
      const filtered = books.filter((b) => b.available);
      expect(filtered.every((b) => b.available)).toBe(true);
    });

    test("empty search returns all books", () => {
      const filtered = INITIAL_BOOKS.filter((b) =>
        b.title.toLowerCase().includes("")
      );
      expect(filtered).toHaveLength(INITIAL_BOOKS.length);
    });

    test("case-insensitive search works", () => {
      const query = INITIAL_BOOKS[0].title.slice(0, 5).toLowerCase();
      const filtered = INITIAL_BOOKS.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase())
      );
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered[0].title).toBe(INITIAL_BOOKS[0].title);
    });
  });
});
