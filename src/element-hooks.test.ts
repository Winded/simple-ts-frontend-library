import { ElementHookConfig, invokeHooks } from './element-hooks';

describe('element-hooks', () => {
    const html = `
    <hooked-1>
        <p>This is inside a hooked element</p>
    </hooked-1>
    <hooked-2>
        <hooked-1>This should not exist after processing</hooked-1>
    </hooked-2>
    <hooked-3>
        <hooked-1>This should not be hooked</hooked-1>
    </hooked-3>
    `;

    const hooks: ElementHookConfig = {
        'hooked-1': element => {
            element.setAttribute('class', 'dynamic-class');
            return true;
        },
        'hooked-2': element => {
            element.innerHTML = '<b>Changed content!</b>';
            return true;
        },
        'hooked-3': _ => {
            return false;
        }
    };

    let element: Element;

    beforeEach(() => {
        element = document.createElement('test');
        element.innerHTML = html;
    });

    it('should call hooks correctly', () => {
        invokeHooks(element, hooks);
        let hookElements = element.querySelectorAll('hooked-1');

        expect(hookElements.length).toBe(2);
        expect(hookElements[0].hasAttribute('class')).toBeTrue();
        expect(hookElements[0].getAttribute('class')).toBe('dynamic-class');
        expect(hookElements[1].hasAttribute('class')).toBeFalse();
    });
});
