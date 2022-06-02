import { DependencyInjectionContainer, Provider, Token } from './di-container';

describe('di-container', () => {
    const testToken1 = new Token<number>('Test token 1');
    const testToken2 = new Token<number>('Test token 2');

    const providers: Provider<any>[] = [
        {
            provides: testToken1,
            with: (): number => Math.random(),
        },
        {
            provides: testToken2,
            with: (container): number => container.get(testToken1) + 1,
        },
    ];

    let container: DependencyInjectionContainer;

    beforeEach(() => {
        container = new DependencyInjectionContainer(providers);
    });

    it('should return the same instance when asking twice', () => {
        let number1 = container.get(testToken1);
        let number2 = container.get(testToken1);
        expect(number1).toBe(number2);
    });

    it('should create dependant instances', () => {
        let number2 = container.get(testToken2);
        let number1 = container.get(testToken1);
        expect(number2).toBe(number1 + 1);
    });

    it('should throw error on unknown token', () => {
        expect(() => container.get(new Token<string>('Unknown')))
            .toThrow(new Error('No provider for token: Unknown'));
    });
});
