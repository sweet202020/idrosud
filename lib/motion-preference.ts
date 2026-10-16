export const motionChangeEvent = "idrosud:motion-change";
export function motionIsEnabled(reducedBySystem: boolean, override?: string) {
  return override === "enabled" || (override !== "reduced" && !reducedBySystem);
}
