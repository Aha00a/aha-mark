require('chai').should();
const forEach = require('mocha-each');

const ahaMark = require('./index');

describe('parsing', function () {
    forEach([
        {
            input: null,
            parseInterpreter: [],
            renderHtml: '<div/>',
        },
        {
            input: '',
            parseInterpreter: [],
            renderHtml: '<div/>',
        },
        {
            input: 'a',
            parseInterpreter: [{i: 0, v: 'a',},],
            renderHtml: '<div>a</div>',
        },
        {
            input: 'aa',
            parseInterpreter: [{i: 0, v: 'aa',},],
            renderHtml: '<div>aa</div>',
        },
        {
            input: '[[[]]]',
            parseInterpreter: [{i: 0, v: []},],
            renderHtml: '<div><div/></div>',
        },
        {
            input: '[[[',
            parseInterpreter: [{i: 0, v: '[[['},],
            renderHtml: '<div>[[[</div>',
        },
        {
            input: ']]]',
            parseInterpreter: [{i: 0, v: ']]]'},],
            renderHtml: '<div>]]]</div>',
        },
        {
            input: '[[[a]]]',
            parseInterpreter: [{i: 0, v: [{i: 3, v: 'a'}]},],
            renderHtml: '<div><div>a</div></div>',
        },
        {
            input: '[[[aa]]]',
            parseInterpreter: [{i: 0, v: [{i: 3, v: 'aa'}]},],
            renderHtml: '<div><div>aa</div></div>',
        },
        {
            input: 'a[[[a]]]a',
            parseInterpreter: [{i: 0, v: "a"}, {i: 1, v: [{i: 4, v: "a"}],}, {i: 8, v: "a"}],
            renderHtml: '<div><div>a</div>a</div>',
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
    ]).it('%j', ({input, parseInterpreter, renderHtml}) => {
        ahaMark.parseInterpreter(input).should.eql(parseInterpreter);
        // ahaMark.renderHtml(input).should.eql(renderHtml)
    });
});
