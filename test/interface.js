#!/usr/bin/env node
var sys = require('sys');
var Traverse = require('traverse');

exports['interface map'] = function (assert) {
    var obj = { a : [ 5,6,7 ], b : { c : [8] } };
    
    assert.equal(
        Traverse.paths(obj)
            .sort()
            .map(function (path) { return path.join('/') })
            .slice(1)
            .join(' ')
         ,
         'a a/0 a/1 a/2 b b/c b/c/0'
    );
    
    assert.equal(
        Traverse.nodes(obj)
            .map(function (node) { return sys.inspect(node) })
            .join(' ')
        ,
        '{ a: [ 5, 6, 7 ], b: { c: [ 8 ] } } [ 5, 6, 7 ] 5 6 7 { c: [ 8 ] } [ 8 ] 8'
    );
    
    assert.equal(
        sys.inspect(Traverse.map(obj, function (node) {
            if (typeof node == 'number') {
                return node + 1000;
            }
            else if (Array.isArray(node)) {
                return node.join(' ');
            }
        })),
        "{ a: '5 6 7', b: { c: '8' } }"
    );
    
    var nodes = 0;
    Traverse.forEach(obj, function (node) { nodes ++ });
    assert.equal(nodes, 8);
};

