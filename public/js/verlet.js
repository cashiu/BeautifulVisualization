/**
 *
 */
define(function(require, exports, module) {

    // 加载依赖模块
    var VerletJS = require('../angel/verlet');
    var constraint = require('../angel/constraint');
    require('../angel/objects');
    window.Vec2 = require('../angel/vec2');
    window.VerletJS = VerletJS;
    window.Particle = VerletJS.Particle;

    window.DistanceConstraint = constraint.DistanceConstraint;
    window.PinConstraint = constraint.PinConstraint;
    window.AngleConstraint = constraint.AngleConstraint;





    var canvas = document.getElementById('scratch');

    var width = parseInt(canvas.style.width);
    var height = parseInt(canvas.style.height);

    var dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.getContext('2d').scale(dpr, dpr);

    var sim = new VerletJS(width, height, canvas);
    sim.friction = 1;

    var tire = sim.tire(new Vec2(600, 50), 70, 3, 1, 1);

    var loop = function() {
        sim.frame(16);
        sim.draw();
        requestAnimFrame(loop);
    };

    loop();


});