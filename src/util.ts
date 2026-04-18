export type FastCommentsRegion = 'eu';

export interface ConfigWithRegion {
    region?: FastCommentsRegion;
}

export type SerializableValue =
    | string
    | number
    | boolean
    | null
    | SerializableValue[]
    | { [key: string]: SerializableValue };

export type SerializableObject = { [key: string]: SerializableValue };

export function makeContainerId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function getCdnBase(region: FastCommentsRegion | undefined): string {
    return region === 'eu' ? 'https://cdn-eu.fastcomments.com' : 'https://cdn.fastcomments.com';
}

export function sanitizeConfig<T extends object>(config: T | undefined | null): SerializableObject {
    const out: SerializableObject = {};
    if (!config || typeof config !== 'object') {
        return out;
    }
    for (const key of Object.keys(config)) {
        if (key === '__keywords') {
            continue;
        }
        const value = (config as Record<string, unknown>)[key];
        if (typeof value === 'function' || typeof value === 'undefined' || typeof value === 'symbol') {
            continue;
        }
        out[key] = value as SerializableValue;
    }
    return out;
}

export function escapeForScript(json: string): string {
    return json
        .replace(/</g, '\\u003C')
        .replace(/>/g, '\\u003E')
        .replace(/&/g, '\\u0026')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
}

export function escapeAttr(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export function jsonForScript(value: unknown): string {
    return escapeForScript(JSON.stringify(value));
}
