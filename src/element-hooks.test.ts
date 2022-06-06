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
    <div attribute-selector>
        <p>This has some advanced logic</p>
        <p>It replace text from two places</p>
        <input type="text"/>
        <button>Change text</button>
    </div>
    `;

    const hooks: ElementHookConfig = {
        'hooked-1': (element, invokeHooks) => {
            element.setAttribute('class', 'dynamic-class');
            invokeHooks(element);
        },
        'hooked-2': (element, invokeHooks) => {
            element.innerHTML = '<b>Changed content!</b>';
            invokeHooks(element);
        },
        'hooked-3': () => { },
        '*[attribute-selector]': (element, invokeHooks) => {
            const input = element.querySelector('input');
            const button = element.querySelector('button');

            button.addEventListener('click', () => {
                invokeHooks(element, {
                    'p': element => (<HTMLElement>element).innerHTML = input.value
                });
            });
        }
    };

    let element: Element;

    beforeEach(() => {
        element = document.createElement('test');
        element.innerHTML = html;
        invokeHooks(element, hooks);
    });

    it('should call hooks correctly', () => {
        let hookElements = element.querySelectorAll('hooked-1');

        expect(hookElements.length).toBe(2);
        expect(hookElements[0].hasAttribute('class')).toBeTrue();
        expect(hookElements[0].getAttribute('class')).toBe('dynamic-class');
        expect(hookElements[1].hasAttribute('class')).toBeFalse();
    });

    it('should override hooks correctly', () => {
        const div = element.querySelector('div');
        const paragraphs = div.querySelectorAll('p');
        const input = div.querySelector('input');
        const button = div.querySelector('button');
        const enteredText = 'Test text';

        input.value = enteredText;
        button.click();

        expect(paragraphs[0].innerText).toBe(enteredText);
        expect(paragraphs[1].innerText).toBe(enteredText);
    });
});
