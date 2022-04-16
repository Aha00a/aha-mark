const ahaMark = require('./index');

describe.each([
    {
        input: undefined,
        expectParsed: []
    },
    {
        input: null,
        expectParsed: []
    },
    {
        input: '',
        expectParsed: []
    },
    {
        input: 'a',
        expectParsed: [{i: 0, v: 'a',},],
    },
    {
        input: 'aa',
        expectParsed: [{i: 0, v: 'aa',},],
    },
    {
        input: '[[[]]]',
        expectParsed: [{i: 0, v: []},],
    },
    {
        input: '[[[',
        expectParsed: [{i: 0, v: '[[['},],
    },
    {
        input: ']]]',
        expectParsed: [{i: 0, v: ']]]'},],
    },
    {
        input: '[[[a]]]',
        expectParsed: [{i: 0, v: [{i: 3, v: 'a'}]},],
    },
    {
        input: '[[[aa]]]',
        expectParsed: [{i: 0, v: [{i: 3, v: 'aa'}]},],
    },
    {
        input: 'a[[[a]]]a',
        expectParsed: [{i: 0, v: "a"}, {i: 1, v: [{i: 4, v: "a"}],}, {i: 8, v: "a"}],
    },
    {
        input: 'ab[[[cd]]]ef',
        expectParsed: [{i: 0, v: "ab"}, {i: 2, v: [{i: 5, v: "cd"}],}, {i: 10, v: "ef"}],
    },
    {
        input: '[[[]]][[[]]]',
        expectParsed: [{i: 0, v: []}, {i: 6, v: []}],
    },
    {
        input: '[[[[[[]]]]]]',
        expectParsed: [{i: 0, v: [{i: 3, v: []}]}],
    },
    {
        input: '[[[[[[]]][[[]]]]]]',
        expectParsed: [{i: 0, v: [{i: 3, v: []}, {i: 9, v: []}]}],
    },
])('ahaMark', ({input, expectParsed}) => {
    test(`parseInterpreter\n${input}\n${expectParsed}`, () => {
        expect(ahaMark.parseInterpreter(input)).toEqual(expectParsed);
    });
    test(`parseInterpreter\n${input}\n${expectParsed}`, () => {
        expect(ahaMark.renderHtml(input)).toEqual("");
    });
});
