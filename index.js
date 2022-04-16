
const ahaMark = {
    mapInterpreter: {
        Comment: function (ast) {
            return "";
        },
        Wiki: function () {

        },
    },
    renderHtml: s => {
        return [s]
            .map(ahaMark.parseInterpreter)
            .map(ahaMark.todoInterpretAsComment)
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
    todoInterpretAsComment: ast => {
        if(!ast)
            return "";

        if(!ast.v)
            return "";

        if(!ast.v.length)
            return;

        return ahaMark.mapInterpreter.Comment(ast);
    },
};

module.exports = ahaMark;
