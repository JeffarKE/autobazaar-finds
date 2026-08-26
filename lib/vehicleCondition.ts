const CONDITION_OPTIONS = ["Used", "New"] as const;
const ORIGIN_OPTIONS = ["Local", "Import"] as const;
const HISTORY_OPTIONS = ["Accident-free", "Salvage title"] as const;

export function serializeVehicleCondition(
  condition: string,
  origin: string,
  history: string
): string | null {
  const selectedValues = [condition, origin, history]
    .map((value) => value.trim())
    .filter(Boolean);

  return selectedValues.length > 0 ? selectedValues.join(" | ") : null;
}

export function parseVehicleCondition(value: unknown) {
  const selectedValues =
    typeof value === "string"
      ? value.split("|").map((part) => part.trim()).filter(Boolean)
      : [];
  const normalizedValues = selectedValues.map((part) =>
    part.toLowerCase() === "accident free" ? "Accident-free" : part
  );

  return {
    condition: normalizedValues.find((part) => CONDITION_OPTIONS.includes(part as (typeof CONDITION_OPTIONS)[number])) ?? "",
    origin: normalizedValues.find((part) => ORIGIN_OPTIONS.includes(part as (typeof ORIGIN_OPTIONS)[number])) ?? "",
    history: normalizedValues.find((part) => HISTORY_OPTIONS.includes(part as (typeof HISTORY_OPTIONS)[number])) ?? "",
  };
}
