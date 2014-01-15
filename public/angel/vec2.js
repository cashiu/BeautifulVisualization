/**
 * @class Vec2
 * 一个简单的二维向量实现
 */
define(function(require, exports, module) {

    function Vec2(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    /**
     * @method add
     * 加
     * @param {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.add = function(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    /**
     * @method sub
     * 减
     * @param {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.sub = function(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    /**
     * @method mul
     * 乘
     * @param {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.mul = function(v) {
        return new Vec2(this.x * v.x, this.y * v.y);
    }

    /**
     * @method div
     * 除
     * @param {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.div = function(v) {
        return new Vec2(this.x / v.x, this.y / v.y);
    }

    /**
     * @method scale
     * 缩放
     * @param  {Number} coef 系数
     */
    Vec2.prototype.scale = function(coef) {
        return new Vec2(this.x * coef, this.y * coef);
    }

    /**
     * @method mutableSet
     *
     * @param  {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.mutableSet = function(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    /**
     * @method mutableAdd
     *
     * @param  {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.mutableAdd = function(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    /**
     * @method mutableSub
     *
     * @param  {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.mutableSub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    /**
     * @method mutableMul
     *
     * @param  {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.mutableMul = function(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    /**
     * @method mutableDiv
     *
     * @param  {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.mutableDiv = function(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    /**
     * @method mutableScale
     *
     * @param  {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.mutableScale = function(coef) {
        this.x *= coef;
        this.y *= coef;
        return this;
    }

    /**
     * @method equals
     *
     * @param  {Object} v 例如{x: 1, y: 2}
     */
    Vec2.prototype.equals = function(v) {
        return this.x == v.x && this.y == v.y;
    }

    Vec2.prototype.epsilonEquals = function(v, epsilon) {
        return Math.abs(this.x - v.x) <= epsilon && Math.abs(this.y - v.y) <= epsilon;
    }

    Vec2.prototype.length = function(v) {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    Vec2.prototype.length2 = function(v) {
        return this.x * this.x + this.y * this.y;
    }

    Vec2.prototype.dist = function(v) {
        return Math.sqrt(this.dist2(v));
    }

    Vec2.prototype.dist2 = function(v) {
        var x = v.x - this.x;
        var y = v.y - this.y;
        return x * x + y * y;
    }

    Vec2.prototype.normal = function() {
        var m = Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vec2(this.x / m, this.y / m);
    }

    Vec2.prototype.dot = function(v) {
        return this.x * v.x + this.y * v.y;
    }

    Vec2.prototype.angle = function(v) {
        return Math.atan2(this.x * v.y - this.y * v.x, this.x * v.x + this.y * v.y);
    }

    Vec2.prototype.angle2 = function(vLeft, vRight) {
        return vLeft.sub(this).angle(vRight.sub(this));
    }

    Vec2.prototype.rotate = function(origin, theta) {
        var x = this.x - origin.x;
        var y = this.y - origin.y;
        return new Vec2(x * Math.cos(theta) - y * Math.sin(theta) + origin.x, x * Math.sin(theta) + y * Math.cos(theta) + origin.y);
    }

    Vec2.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")";
    }

    module.exports = Vec2;
});