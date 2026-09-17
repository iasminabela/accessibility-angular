import { SortableData } from "./sortable-data";

interface Row {
  name: string;
  age: number;
}

const rows: Row[] = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 40 },
];

const accessors = {
  name: (row: Row) => row.name.toLowerCase(),
  age: (row: Row) => row.age,
};

describe("SortableData", () => {
  it("returns the original order when no sort is set", () => {
    const sortable = new SortableData(rows, accessors);
    expect(sortable.sorted.map((row) => row.name)).toEqual([
      "Charlie",
      "Alice",
      "Bob",
    ]);
  });

  it("sorts ascending then toggles to descending", () => {
    const sortable = new SortableData(rows, accessors);

    sortable.toggleSort("name");
    expect(sortable.sorted.map((row) => row.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);

    sortable.toggleSort("name");
    expect(sortable.sorted.map((row) => row.name)).toEqual([
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });
});
