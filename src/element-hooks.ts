export type InvokeHooksFunction = (element: Element, overrideConfig?: ElementHookConfig) => void;

export type HookFunction = (element: Element, invokeHooks: InvokeHooksFunction) => void;

export interface ElementHookConfig {
    [selector: string]: HookFunction;
}

export function invokeHooks(element: Element, config: ElementHookConfig): void {
    const invoke: InvokeHooksFunction = (element, overrideConfig) => {
        if (!overrideConfig) {
            overrideConfig = config;
        }

        for (let elIdx = 0; elIdx < element.children.length; elIdx++) {
            const child = element.children.item(elIdx);
            if (child == null) {
                continue;
            }
    
            for (let [selector, hookFunc] of Object.entries(overrideConfig)) {
                if (child.matches(selector)) {
                    hookFunc(child, invoke);
                }
            }
        }
    };

    invoke(element);
}
