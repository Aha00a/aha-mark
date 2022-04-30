require('chai').should();
const forEach = require('mocha-each');

const ahaMark = require('./index');



describe('test', function () {
    forEach([
        {
            input: null,
            parseInterpreter: [],
            renderHtml: `<div class="ahaMark"></div>`,
        },
        {
            input: '',
            parseInterpreter: [],
            renderHtml: `<div class="ahaMark"></div>`,
        },
        {
            input: 'a',
            parseInterpreter: [{i: 0, v: 'a',},],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div data-i="0">a</div></div></div>`,
        },
        {
            input: 'aa',
            parseInterpreter: [{i: 0, v: 'aa',},],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div data-i="0">aa</div></div></div>`,
        },
        {
            input: '[[[]]]',
            parseInterpreter: [{i: 0, v: []},],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div class="ahaMark"></div></div></div>`,
        },
        {
            input: '[[[',
            parseInterpreter: [{i: 0, v: '[[['},],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div data-i="0">[[[</div></div></div>`,
        },
        {
            input: ']]]',
            parseInterpreter: [{i: 0, v: ']]]'},],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div data-i="0">]]]</div></div></div>`,
        },
        {
            input: '[[[a]]]',
            parseInterpreter: [{i: 0, v: [{i: 3, v: 'a'}]},],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div class="ahaMark"><div class="Wiki"><div data-i="3">a</div></div></div></div></div>`,
        },
        {
            input: '[[[aa]]]',
            parseInterpreter: [{i: 0, v: [{i: 3, v: 'aa'}]},],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div class="ahaMark"><div class="Wiki"><div data-i="3">aa</div></div></div></div></div>`,
        },
        {
            input: 'a[[[a]]]a',
            parseInterpreter: [{i: 0, v: "a"}, {i: 1, v: [{i: 4, v: "a"}],}, {i: 8, v: "a"}],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div data-i="0">a</div><div class="ahaMark"><div class="Wiki"><div data-i="4">a</div></div></div><div data-i="8">a</div></div></div>`,
        },
        {
            input: 'ab[[[cd]]]ef',
            parseInterpreter: [{i: 0, v: "ab"}, {i: 2, v: [{i: 5, v: "cd"}],}, {i: 10, v: "ef"}],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div data-i="0">ab</div><div class="ahaMark"><div class="Wiki"><div data-i="5">cd</div></div></div><div data-i="10">ef</div></div></div>`,
        },
        {
            input: '[[[]]][[[]]]',
            parseInterpreter: [{i: 0, v: []}, {i: 6, v: []}],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div class="ahaMark"></div><div class="ahaMark"></div></div></div>`,
        },
        {
            input: '[[[[[[]]]]]]',
            parseInterpreter: [{i: 0, v: [{i: 3, v: []}]}],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div class="ahaMark"><div class="Wiki"><div class="ahaMark"></div></div></div></div></div>`,
        },
        {
            input: '[[[[[[]]][[[]]]]]]',
            parseInterpreter: [{i: 0, v: [{i: 3, v: []}, {i: 9, v: []}]}],
            renderHtml: `<div class="ahaMark"><div class="Wiki"><div class="ahaMark"><div class="Wiki"><div class="ahaMark"></div><div class="ahaMark"></div></div></div></div></div>`,
        },
    ]).it('%j', ({input, parseInterpreter, renderHtml}) => {
        ahaMark.parseInterpreter(input).should.eql(parseInterpreter);
        ahaMark.renderHtml(input).should.eql(renderHtml);
    });
});

describe('detectShebang', function () {
    forEach([
        {ast: null, expected: 'Wiki',},
        {ast: '', expected: 'Wiki',},
        {ast: [], expected: 'Wiki',},
        {ast: [{v: '#!Wiki'}], expected: 'Wiki',},
        {ast: [{v: '#!Text'}], expected: 'Text',},
    ]).it('%j', ({ast, expected}) => {
        ahaMark.detectShebang(ast).should.eql(expected);
    });
});
