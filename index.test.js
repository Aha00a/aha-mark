const ahaMark = require('./index');


test('ahaMark.parseInterpreter', () => {
    expect(''.charAt(2)).toEqual('');

    expect(ahaMark.parseInterpreter()).toEqual([]);
    expect(ahaMark.parseInterpreter(null)).toEqual([]);
    expect(ahaMark.parseInterpreter('')).toEqual([]);

    expect(ahaMark.parseInterpreter('a')).toEqual([{i: 0, v: 'a',},]);
    expect(ahaMark.parseInterpreter('aa')).toEqual([{i: 0, v: 'aa',},]);

    expect(ahaMark.parseInterpreter('[[[]]]')).toEqual([{i: 0, v: []},]);
    expect(ahaMark.parseInterpreter('[[[')).toEqual([{i: 0, v: '[[['},]);
    expect(ahaMark.parseInterpreter(']]]')).toEqual([{i: 0, v: ']]]'},]);
    expect(ahaMark.parseInterpreter('[[[a]]]')).toEqual([{i: 0, v: [{i: 3, v: 'a'}]},]);
    expect(ahaMark.parseInterpreter('[[[aa]]]')).toEqual([{i: 0, v: [{i: 3, v: 'aa'}]},]);

    expect(ahaMark.parseInterpreter('a[[[a]]]a')).toEqual([{i: 0, v: "a"}, {i: 1, v: [{i: 4, v: "a"}],}, {i: 8, v: "a"}]);
    expect(ahaMark.parseInterpreter('ab[[[cd]]]ef')).toEqual([{i: 0, v: "ab"}, {i: 2, v: [{i: 5, v: "cd"}],}, {i: 10, v: "ef"}]);

    expect(ahaMark.parseInterpreter('[[[]]][[[]]]')).toEqual([{i: 0, v: []}, {i: 6, v: []}]);
    expect(ahaMark.parseInterpreter('[[[[[[]]]]]]')).toEqual([{i: 0, v: [{i: 3, v: []}]}]);
    expect(ahaMark.parseInterpreter('[[[[[[]]][[[]]]]]]')).toEqual([{i: 0, v: [{i: 3, v: []}, {i: 9, v: []}]}]);

    const abcdefghijklmn = ahaMark.parseInterpreter('ab[[[cd[[[ef]]]gh[[[ij]]]kl]]]mn');
    expect(abcdefghijklmn).toEqual([
        {i: 0, v: "ab"},
        {
            i: 2, v: [
                {i: 5, v: "cd"},
                {
                    i: 7, v: [
                        {i: 10, v: "ef"}
                    ]
                },
                {i: 15, v: "gh"},
                {
                    i: 17, v: [{i: 20, v: "ij"}]
                },
                {i: 25, v: "kl"}
            ]
        },
        {i: 30, v: "mn"}
    ]);
});

