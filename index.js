
const ahaMark = {
    mapInterpreter: {
        Comment: {
            renderHtml: ast => {
                return "";
            }
        },
        Wiki: {
            renderHtml: ast => {
                console.log(JSON.stringify(ast));
                return `<div class="Wiki">${ast.map((v => {
                    if(Array.isArray(v.v))
                        return ahaMark.interpret(v.v);
                    
                    return (
                        `<div data-i="${v.i}">${v.v}</div>`
                    );
                })).join('')}</div>`;
            }
        },
    },
    renderHtml: s => {
        return [s]
            .map(ahaMark.parseInterpreter)
            .map(ahaMark.interpret)
            [0];
    },
    parseInterpreter: s => {
        if (!s)
            return [];

        let array = s.split(/(?<!\\)(\[\[\[|]]])/).filter(_ => _);
        let arrayIndexValue = array.reduce((a, v) => {
            return {
                i: a.i + v.length,
                a: [...a.a, {i: a.i, v,}],
            };
        }, {i: 0, a: []}).a;

        while(true) {
            const indexClose = array.indexOf(']]]');
            if(indexClose < 0)
                return arrayIndexValue;

            const indexOpen = array.lastIndexOf("[[[", indexClose);
            if(indexOpen < 0)
                return arrayIndexValue;

            array = [
                ...array.slice(0, indexOpen),
                {v: array.slice(indexOpen + 1, indexClose)},
                ...array.slice(indexClose + 1)
            ];
            arrayIndexValue = [
                ...arrayIndexValue.slice(0, indexOpen),
                {
                    i: arrayIndexValue[indexOpen]?.i ?? 0,
                    v: arrayIndexValue.slice(indexOpen + 1, indexClose),
                },
                ...arrayIndexValue.slice(indexClose + 1)
            ];
        }
    },
    interpret: ast => {
        if(!ast)
            return `<div class="ahaMark"></div>`;

        if(!ast.length)
            return `<div class="ahaMark"></div>`;

        const shebang = ahaMark.detectShebang(ast, 'Wiki');
        const interpreter = ahaMark.mapInterpreter[shebang] ?? ahaMark.mapInterpreter.Comment;
        return `<div class="ahaMark">${interpreter.renderHtml(ast)}</div>`;
    },

    detectShebang: (ast, defaultShebang = 'Wiki') => {
        if(!ast)
            return defaultShebang;

        if(!ast.length)
            return defaultShebang;

        const v = ast[0].v;
        if(!v)
            return defaultShebang;

        if(Array.isArray(v))
            return ahaMark.detectShebang(v);

        if(!v.startsWith('#!'))
            return defaultShebang;

        return v.substring(2);
    },
};

module.exports = ahaMark;
