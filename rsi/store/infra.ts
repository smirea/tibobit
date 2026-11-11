import { readTable } from "./tables";
import { INFRA_CSV } from "./paths";

export const INFRA_COLUMNS = ["date", "run", "status", "request", "why"] as const;

export type InfraRow = Record<(typeof INFRA_COLUMNS)[number], string>;

export const readInfra = () => readTable(INFRA_CSV, INFRA_COLUMNS);
