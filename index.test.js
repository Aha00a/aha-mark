const ahaMark = require('./index');

test('ahaMark.hello', () => {
    expect(ahaMark.hello()).toBe('Hello, aha-mark.');
    expect(ahaMark.hello('AhaMark')).toBe('Hello, AhaMark.');
});

