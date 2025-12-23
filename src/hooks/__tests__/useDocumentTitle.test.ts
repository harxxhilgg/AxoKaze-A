import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDocumentTitle } from "../useDocumentTitle";

describe("useDocumentTitle", () => {
  const originalTitle = document.title;

  beforeEach(() => {
    document.title = originalTitle;
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it("sets document title on mount", () => {
    renderHook(() => useDocumentTitle("Test Page"));
    expect(document.title).toContain("Test Page");
  });

  it("updates title when title changes", () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "First" },
    });

    expect(document.title).toContain("First");

    rerender({ title: "Second" });
    expect(document.title).toContain("Second");
  });
});
