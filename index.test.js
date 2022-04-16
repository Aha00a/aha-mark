const ahaMark = require('./index');

describe.each([
    {
        input: undefined,
        parseInterpreter: [],
        renderHtml: '',
    },
    {
        input: null,
        parseInterpreter: [],
        renderHtml: '',
    },
    {
        input: '',
        parseInterpreter: [],
        renderHtml: '',
    },
    {
        input: 'a',
        parseInterpreter: [{i: 0, v: 'a',},],
        renderHtml: '',
    },
    {
        input: 'aa',
        parseInterpreter: [{i: 0, v: 'aa',},],
        renderHtml: '',
    },
    {
        input: '[[[]]]',
        parseInterpreter: [{i: 0, v: []},],
        renderHtml: '',
    },
    {
        input: '[[[',
        parseInterpreter: [{i: 0, v: '[[['},],
        renderHtml: '',
    },
    {
        input: ']]]',
        parseInterpreter: [{i: 0, v: ']]]'},],
        renderHtml: '',
    },
    {
        input: '[[[a]]]',
        parseInterpreter: [{i: 0, v: [{i: 3, v: 'a'}]},],
        renderHtml: '',
    },
    {
        input: '[[[aa]]]',
        parseInterpreter: [{i: 0, v: [{i: 3, v: 'aa'}]},],
        renderHtml: '',
    },
    {
        input: 'a[[[a]]]a',
        parseInterpreter: [{i: 0, v: "a"}, {i: 1, v: [{i: 4, v: "a"}],}, {i: 8, v: "a"}],
        renderHtml: '',
    },
    {
        input: 'ab[[[cd]]]ef',
        parseInterpreter: [{i: 0, v: "ab"}, {i: 2, v: [{i: 5, v: "cd"}],}, {i: 10, v: "ef"}],
        renderHtml: '',
    },
    {
        input: '[[[]]][[[]]]',
        parseInterpreter: [{i: 0, v: []}, {i: 6, v: []}],
        renderHtml: '',
    },
    {
        input: '[[[[[[]]]]]]',
        parseInterpreter: [{i: 0, v: [{i: 3, v: []}]}],
        renderHtml: '',
    },
    {
        input: '[[[[[[]]][[[]]]]]]',
        parseInterpreter: [{i: 0, v: [{i: 3, v: []}, {i: 9, v: []}]}],
        renderHtml: '',
    },
])('ahaMark', ({input, parseInterpreter, renderHtml}) => {
    test(`parseInterpreter\n${input}\n${parseInterpreter}`, () => {
        expect(ahaMark.parseInterpreter(input)).toEqual(parseInterpreter);
    });
    test(`renderHtml\n${input}\n${renderHtml}`, () => {
        expect(ahaMark.renderHtml(input)).toEqual(renderHtml);
    });
});
