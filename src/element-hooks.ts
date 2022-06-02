export type HookFunction = (element: Element) => boolean;

export interface ElementHookConfig {
    [elementName: string]: HookFunction;
}

export function invokeHooks(element: Element, config: ElementHookConfig): void {
    for (let elIdx = 0; elIdx < element.children.length; elIdx++) {
        const child = element.children.item(elIdx);
        if (child == null) {
            continue;
        }

        const name = child.tagName.toLowerCase();
        if (name in config) {
            if (!config[name](child)) {
                continue;
            }
        }
        invokeHooks(child, config);
    }
}
