import { keys as _keys } from "ramda";

export const getKeys = _keys as <T extends object>(target: T) => Array<keyof T>;
