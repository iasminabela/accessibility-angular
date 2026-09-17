import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DropdownComponent } from "./dropdown.component";

const options = [
  { label: "Berlin", value: "berlin" },
  { label: "London", value: "london" },
];

function findByText(root: HTMLElement, text: string): HTMLElement | undefined {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>("div, span"));
  return nodes.find((node) => node.textContent?.trim() === text);
}

describe("DropdownComponent", () => {
  let fixture: ComponentFixture<DropdownComponent>;
  let component: DropdownComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
  });

  it("opens on click and selects an option", () => {
    component.options = options;
    component.value = "";
    component.placeholder = "Pick";
    const changes: string[] = [];
    component.valueChange.subscribe((value) => changes.push(value));
    fixture.detectChanges();

    expect(findByText(fixture.nativeElement, "London")).toBeUndefined();

    const trigger = fixture.nativeElement.querySelector(
      ".relative > div",
    ) as HTMLElement;
    trigger.click();
    fixture.detectChanges();

    findByText(fixture.nativeElement, "London")!.click();
    fixture.detectChanges();

    expect(changes).toContain("london");
  });

  it("shows the selected label", () => {
    component.options = options;
    component.value = "berlin";
    fixture.detectChanges();

    expect(findByText(fixture.nativeElement, "Berlin")).toBeDefined();
  });
});
