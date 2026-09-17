import { setupZoneTestEnv } from "jest-preset-angular/setup-env/zone";
import "jest-axe/extend-expect";

setupZoneTestEnv();

afterEach(() => {
  window.localStorage.clear();
});
