import {
    type ConfigWithRegion,
    type SerializableObject,
    escapeAttr,
    getCdnBase,
    jsonForScript,
    makeContainerId,
    sanitizeConfig
} from './util';

export interface ContainerWidgetSpec {
    /** Tag for the container element ("div", "span"). */
    containerTag: 'div' | 'span';
    /** Prefix used for the generated container id. */
    containerIdPrefix: string;
    /** Path to the widget script on the CDN, e.g. "/js/embed-v2.min.js". */
    scriptPath: string;
    /** Marker attribute on the script tag so we only inject it once per page. */
    scriptMarkerAttr: string;
    /** Name of the global function on `window` that initializes the widget. */
    globalName: string;
    /**
     * If true, the widget global is invoked as `global(el, config, function(error){...})`
     * (used by widgets that take a node-style callback like reviews-summary and user-activity).
     */
    useCallback?: boolean;
    /** Human-readable name used inside the callback's error message. */
    errorLabel?: string;
}

export interface SelectorWidgetSpec {
    /** Path to the widget script on the CDN, e.g. "/js/embed-collab-chat.min.js". */
    scriptPath: string;
    /** Marker attribute on the script tag so we only inject it once per page. */
    scriptMarkerAttr: string;
    /** Name of the global function on `window` that initializes the widget. */
    globalName: string;
    /** Friendly name of the shortcode for error messages when `target` is missing. */
    shortcodeName: string;
}

export function renderContainerWidget<T extends ConfigWithRegion>(
    spec: ContainerWidgetSpec,
    config: T | undefined | null
): string {
    const cleanConfig: SerializableObject = sanitizeConfig(config ?? undefined);
    const region = (cleanConfig['region'] as ConfigWithRegion['region']) ?? undefined;
    const containerId = makeContainerId(spec.containerIdPrefix);
    const scriptSrc = `${getCdnBase(region)}${spec.scriptPath}`;

    const containerIdJson = jsonForScript(containerId);
    const configJson = jsonForScript(cleanConfig);
    const scriptSrcJson = jsonForScript(scriptSrc);
    const markerJson = jsonForScript(spec.scriptMarkerAttr);
    const globalName = spec.globalName;
    const slowWarnJson = jsonForScript(
        `FastComments ${spec.errorLabel || globalName} script did not load within 5s; continuing to retry every 1s.`
    );

    const initBody = spec.useCallback
        ? `if(window.${globalName}){window.${globalName}(el,config,function(error){if(error){console.error(${jsonForScript('FastComments ' + (spec.errorLabel || globalName) + ' Load Failure')},error);}});}else{schedule();}`
        : `if(window.${globalName}){window.${globalName}(el,config);}else{schedule();}`;

    const tag = spec.containerTag;

    return (
        `<${tag} id="${escapeAttr(containerId)}"></${tag}>` +
        `<script>` +
        `(function(){` +
        `var containerId=${containerIdJson};` +
        `var config=${configJson};` +
        `var scriptSrc=${scriptSrcJson};` +
        `var marker=${markerJson};` +
        `var startedAt=Date.now();` +
        `var warned=false;` +
        `function schedule(){var elapsed=Date.now()-startedAt;if(elapsed>=5000&&!warned){warned=true;console.warn(${slowWarnJson});}setTimeout(init,elapsed<5000?50:1000);}` +
        `function init(){var el=document.getElementById(containerId);${initBody}}` +
        `if(!document.querySelector('script['+marker+']')){` +
        `var s=document.createElement('script');` +
        `s.src=scriptSrc;` +
        `s.setAttribute(marker,'');` +
        `document.head.appendChild(s);` +
        `}` +
        `init();` +
        `})();` +
        `</script>`
    );
}

export function renderSelectorWidget<T extends ConfigWithRegion & { target: string }>(
    spec: SelectorWidgetSpec,
    config: T | undefined | null
): string {
    if (!config || typeof config.target !== 'string' || config.target.length === 0) {
        throw new Error(
            `${spec.shortcodeName} shortcode requires a "target" option (CSS selector for the target element).`
        );
    }
    const cleanConfig: SerializableObject = sanitizeConfig(config);
    const target = cleanConfig['target'] as string;
    delete cleanConfig['target'];
    const region = (cleanConfig['region'] as ConfigWithRegion['region']) ?? undefined;
    const scriptSrc = `${getCdnBase(region)}${spec.scriptPath}`;

    const targetJson = jsonForScript(target);
    const configJson = jsonForScript(cleanConfig);
    const scriptSrcJson = jsonForScript(scriptSrc);
    const markerJson = jsonForScript(spec.scriptMarkerAttr);
    const globalName = spec.globalName;
    const slowWarnJson = jsonForScript(
        `FastComments ${spec.shortcodeName} script did not load within 5s; continuing to retry every 1s.`
    );

    return (
        `<script>` +
        `(function(){` +
        `var target=${targetJson};` +
        `var config=${configJson};` +
        `var scriptSrc=${scriptSrcJson};` +
        `var marker=${markerJson};` +
        `var startedAt=Date.now();` +
        `var warned=false;` +
        `function schedule(){var elapsed=Date.now()-startedAt;if(elapsed>=5000&&!warned){warned=true;console.warn(${slowWarnJson});}setTimeout(init,elapsed<5000?50:1000);}` +
        `function init(){if(window.${globalName}){var el=document.querySelector(target);if(el){window.${globalName}(el,config);}}else{schedule();}}` +
        `if(!document.querySelector('script['+marker+']')){` +
        `var s=document.createElement('script');` +
        `s.src=scriptSrc;` +
        `s.setAttribute(marker,'');` +
        `document.head.appendChild(s);` +
        `}` +
        `init();` +
        `})();` +
        `</script>`
    );
}
