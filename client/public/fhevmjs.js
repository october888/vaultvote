var Yw = Object.defineProperty;
var yf = (r) => {
  throw TypeError(r);
};
var Zw = (r, t, e) => t in r ? Yw(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var z = (r, t, e) => Zw(r, typeof t != "symbol" ? t + "" : t, e), Yu = (r, t, e) => t.has(r) || yf("Cannot " + e);
var g = (r, t, e) => (Yu(r, t, "read from private field"), e ? e.call(r) : t.get(r)), D = (r, t, e) => t.has(r) ? yf("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), E = (r, t, e, n) => (Yu(r, t, "write to private field"), n ? n.call(r, e) : t.set(r, e), e), ct = (r, t, e) => (Yu(r, t, "access private method"), e);
var La = (r, t, e, n) => ({
  set _(i) {
    E(r, t, i, e);
  },
  get _() {
    return g(r, t, n);
  }
});
const hc = globalThis || void 0 || self;
var se = {}, Vc = {};
Vc.byteLength = ey;
Vc.toByteArray = ny;
Vc.fromByteArray = ay;
var xr = [], Ve = [], Xw = typeof Uint8Array < "u" ? Uint8Array : Array, Zu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var os = 0, ty = Zu.length; os < ty; ++os)
  xr[os] = Zu[os], Ve[Zu.charCodeAt(os)] = os;
Ve[45] = 62;
Ve[95] = 63;
function nh(r) {
  var t = r.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var e = r.indexOf("=");
  e === -1 && (e = t);
  var n = e === t ? 0 : 4 - e % 4;
  return [e, n];
}
function ey(r) {
  var t = nh(r), e = t[0], n = t[1];
  return (e + n) * 3 / 4 - n;
}
function ry(r, t, e) {
  return (t + e) * 3 / 4 - e;
}
function ny(r) {
  var t, e = nh(r), n = e[0], i = e[1], s = new Xw(ry(r, n, i)), a = 0, u = i > 0 ? n - 4 : n, l;
  for (l = 0; l < u; l += 4)
    t = Ve[r.charCodeAt(l)] << 18 | Ve[r.charCodeAt(l + 1)] << 12 | Ve[r.charCodeAt(l + 2)] << 6 | Ve[r.charCodeAt(l + 3)], s[a++] = t >> 16 & 255, s[a++] = t >> 8 & 255, s[a++] = t & 255;
  return i === 2 && (t = Ve[r.charCodeAt(l)] << 2 | Ve[r.charCodeAt(l + 1)] >> 4, s[a++] = t & 255), i === 1 && (t = Ve[r.charCodeAt(l)] << 10 | Ve[r.charCodeAt(l + 1)] << 4 | Ve[r.charCodeAt(l + 2)] >> 2, s[a++] = t >> 8 & 255, s[a++] = t & 255), s;
}
function iy(r) {
  return xr[r >> 18 & 63] + xr[r >> 12 & 63] + xr[r >> 6 & 63] + xr[r & 63];
}
function sy(r, t, e) {
  for (var n, i = [], s = t; s < e; s += 3)
    n = (r[s] << 16 & 16711680) + (r[s + 1] << 8 & 65280) + (r[s + 2] & 255), i.push(iy(n));
  return i.join("");
}
function ay(r) {
  for (var t, e = r.length, n = e % 3, i = [], s = 16383, a = 0, u = e - n; a < u; a += s)
    i.push(sy(r, a, a + s > u ? u : a + s));
  return n === 1 ? (t = r[e - 1], i.push(
    xr[t >> 2] + xr[t << 4 & 63] + "=="
  )) : n === 2 && (t = (r[e - 2] << 8) + r[e - 1], i.push(
    xr[t >> 10] + xr[t >> 4 & 63] + xr[t << 2 & 63] + "="
  )), i.join("");
}
var B_ = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
B_.read = function(r, t, e, n, i) {
  var s, a, u = i * 8 - n - 1, l = (1 << u) - 1, p = l >> 1, f = -7, h = e ? i - 1 : 0, b = e ? -1 : 1, k = r[t + h];
  for (h += b, s = k & (1 << -f) - 1, k >>= -f, f += u; f > 0; s = s * 256 + r[t + h], h += b, f -= 8)
    ;
  for (a = s & (1 << -f) - 1, s >>= -f, f += n; f > 0; a = a * 256 + r[t + h], h += b, f -= 8)
    ;
  if (s === 0)
    s = 1 - p;
  else {
    if (s === l)
      return a ? NaN : (k ? -1 : 1) * (1 / 0);
    a = a + Math.pow(2, n), s = s - p;
  }
  return (k ? -1 : 1) * a * Math.pow(2, s - n);
};
B_.write = function(r, t, e, n, i, s) {
  var a, u, l, p = s * 8 - i - 1, f = (1 << p) - 1, h = f >> 1, b = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = n ? 0 : s - 1, R = n ? 1 : -1, x = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
  for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (u = isNaN(t) ? 1 : 0, a = f) : (a = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -a)) < 1 && (a--, l *= 2), a + h >= 1 ? t += b / l : t += b * Math.pow(2, 1 - h), t * l >= 2 && (a++, l /= 2), a + h >= f ? (u = 0, a = f) : a + h >= 1 ? (u = (t * l - 1) * Math.pow(2, i), a = a + h) : (u = t * Math.pow(2, h - 1) * Math.pow(2, i), a = 0)); i >= 8; r[e + k] = u & 255, k += R, u /= 256, i -= 8)
    ;
  for (a = a << i | u, p += i; p > 0; r[e + k] = a & 255, k += R, a /= 256, p -= 8)
    ;
  r[e + k - R] |= x * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(r) {
  const t = Vc, e = B_, n = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  r.Buffer = f, r.SlowBuffer = M, r.INSPECT_MAX_BYTES = 50;
  const i = 2147483647;
  r.kMaxLength = i;
  const { Uint8Array: s, ArrayBuffer: a, SharedArrayBuffer: u } = globalThis;
  f.TYPED_ARRAY_SUPPORT = l(), !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function l() {
    try {
      const y = new s(1), _ = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(_, s.prototype), Object.setPrototypeOf(y, _), y.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(f.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (f.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(f.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (f.isBuffer(this))
        return this.byteOffset;
    }
  });
  function p(y) {
    if (y > i)
      throw new RangeError('The value "' + y + '" is invalid for option "size"');
    const _ = new s(y);
    return Object.setPrototypeOf(_, f.prototype), _;
  }
  function f(y, _, d) {
    if (typeof y == "number") {
      if (typeof _ == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return R(y);
    }
    return h(y, _, d);
  }
  f.poolSize = 8192;
  function h(y, _, d) {
    if (typeof y == "string")
      return x(y, _);
    if (a.isView(y))
      return m(y);
    if (y == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
      );
    if (le(y, a) || y && le(y.buffer, a) || typeof u < "u" && (le(y, u) || y && le(y.buffer, u)))
      return B(y, _, d);
    if (typeof y == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const A = y.valueOf && y.valueOf();
    if (A != null && A !== y)
      return f.from(A, _, d);
    const P = C(y);
    if (P) return P;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof y[Symbol.toPrimitive] == "function")
      return f.from(y[Symbol.toPrimitive]("string"), _, d);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof y
    );
  }
  f.from = function(y, _, d) {
    return h(y, _, d);
  }, Object.setPrototypeOf(f.prototype, s.prototype), Object.setPrototypeOf(f, s);
  function b(y) {
    if (typeof y != "number")
      throw new TypeError('"size" argument must be of type number');
    if (y < 0)
      throw new RangeError('The value "' + y + '" is invalid for option "size"');
  }
  function k(y, _, d) {
    return b(y), y <= 0 ? p(y) : _ !== void 0 ? typeof d == "string" ? p(y).fill(_, d) : p(y).fill(_) : p(y);
  }
  f.alloc = function(y, _, d) {
    return k(y, _, d);
  };
  function R(y) {
    return b(y), p(y < 0 ? 0 : U(y) | 0);
  }
  f.allocUnsafe = function(y) {
    return R(y);
  }, f.allocUnsafeSlow = function(y) {
    return R(y);
  };
  function x(y, _) {
    if ((typeof _ != "string" || _ === "") && (_ = "utf8"), !f.isEncoding(_))
      throw new TypeError("Unknown encoding: " + _);
    const d = V(y, _) | 0;
    let A = p(d);
    const P = A.write(y, _);
    return P !== d && (A = A.slice(0, P)), A;
  }
  function S(y) {
    const _ = y.length < 0 ? 0 : U(y.length) | 0, d = p(_);
    for (let A = 0; A < _; A += 1)
      d[A] = y[A] & 255;
    return d;
  }
  function m(y) {
    if (le(y, s)) {
      const _ = new s(y);
      return B(_.buffer, _.byteOffset, _.byteLength);
    }
    return S(y);
  }
  function B(y, _, d) {
    if (_ < 0 || y.byteLength < _)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (y.byteLength < _ + (d || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let A;
    return _ === void 0 && d === void 0 ? A = new s(y) : d === void 0 ? A = new s(y, _) : A = new s(y, _, d), Object.setPrototypeOf(A, f.prototype), A;
  }
  function C(y) {
    if (f.isBuffer(y)) {
      const _ = U(y.length) | 0, d = p(_);
      return d.length === 0 || y.copy(d, 0, 0, _), d;
    }
    if (y.length !== void 0)
      return typeof y.length != "number" || Me(y.length) ? p(0) : S(y);
    if (y.type === "Buffer" && Array.isArray(y.data))
      return S(y.data);
  }
  function U(y) {
    if (y >= i)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
    return y | 0;
  }
  function M(y) {
    return +y != y && (y = 0), f.alloc(+y);
  }
  f.isBuffer = function(_) {
    return _ != null && _._isBuffer === !0 && _ !== f.prototype;
  }, f.compare = function(_, d) {
    if (le(_, s) && (_ = f.from(_, _.offset, _.byteLength)), le(d, s) && (d = f.from(d, d.offset, d.byteLength)), !f.isBuffer(_) || !f.isBuffer(d))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (_ === d) return 0;
    let A = _.length, P = d.length;
    for (let L = 0, W = Math.min(A, P); L < W; ++L)
      if (_[L] !== d[L]) {
        A = _[L], P = d[L];
        break;
      }
    return A < P ? -1 : P < A ? 1 : 0;
  }, f.isEncoding = function(_) {
    switch (String(_).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, f.concat = function(_, d) {
    if (!Array.isArray(_))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (_.length === 0)
      return f.alloc(0);
    let A;
    if (d === void 0)
      for (d = 0, A = 0; A < _.length; ++A)
        d += _[A].length;
    const P = f.allocUnsafe(d);
    let L = 0;
    for (A = 0; A < _.length; ++A) {
      let W = _[A];
      if (le(W, s))
        L + W.length > P.length ? (f.isBuffer(W) || (W = f.from(W)), W.copy(P, L)) : s.prototype.set.call(
          P,
          W,
          L
        );
      else if (f.isBuffer(W))
        W.copy(P, L);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      L += W.length;
    }
    return P;
  };
  function V(y, _) {
    if (f.isBuffer(y))
      return y.length;
    if (a.isView(y) || le(y, a))
      return y.byteLength;
    if (typeof y != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof y
      );
    const d = y.length, A = arguments.length > 2 && arguments[2] === !0;
    if (!A && d === 0) return 0;
    let P = !1;
    for (; ; )
      switch (_) {
        case "ascii":
        case "latin1":
        case "binary":
          return d;
        case "utf8":
        case "utf-8":
          return Ye(y).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return d * 2;
        case "hex":
          return d >>> 1;
        case "base64":
          return Or(y).length;
        default:
          if (P)
            return A ? -1 : Ye(y).length;
          _ = ("" + _).toLowerCase(), P = !0;
      }
  }
  f.byteLength = V;
  function Z(y, _, d) {
    let A = !1;
    if ((_ === void 0 || _ < 0) && (_ = 0), _ > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, _ >>>= 0, d <= _))
      return "";
    for (y || (y = "utf8"); ; )
      switch (y) {
        case "hex":
          return F(this, _, d);
        case "utf8":
        case "utf-8":
          return gt(this, _, d);
        case "ascii":
          return Ct(this, _, d);
        case "latin1":
        case "binary":
          return Vt(this, _, d);
        case "base64":
          return at(this, _, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return H(this, _, d);
        default:
          if (A) throw new TypeError("Unknown encoding: " + y);
          y = (y + "").toLowerCase(), A = !0;
      }
  }
  f.prototype._isBuffer = !0;
  function K(y, _, d) {
    const A = y[_];
    y[_] = y[d], y[d] = A;
  }
  f.prototype.swap16 = function() {
    const _ = this.length;
    if (_ % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let d = 0; d < _; d += 2)
      K(this, d, d + 1);
    return this;
  }, f.prototype.swap32 = function() {
    const _ = this.length;
    if (_ % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let d = 0; d < _; d += 4)
      K(this, d, d + 3), K(this, d + 1, d + 2);
    return this;
  }, f.prototype.swap64 = function() {
    const _ = this.length;
    if (_ % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let d = 0; d < _; d += 8)
      K(this, d, d + 7), K(this, d + 1, d + 6), K(this, d + 2, d + 5), K(this, d + 3, d + 4);
    return this;
  }, f.prototype.toString = function() {
    const _ = this.length;
    return _ === 0 ? "" : arguments.length === 0 ? gt(this, 0, _) : Z.apply(this, arguments);
  }, f.prototype.toLocaleString = f.prototype.toString, f.prototype.equals = function(_) {
    if (!f.isBuffer(_)) throw new TypeError("Argument must be a Buffer");
    return this === _ ? !0 : f.compare(this, _) === 0;
  }, f.prototype.inspect = function() {
    let _ = "";
    const d = r.INSPECT_MAX_BYTES;
    return _ = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (_ += " ... "), "<Buffer " + _ + ">";
  }, n && (f.prototype[n] = f.prototype.inspect), f.prototype.compare = function(_, d, A, P, L) {
    if (le(_, s) && (_ = f.from(_, _.offset, _.byteLength)), !f.isBuffer(_))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof _
      );
    if (d === void 0 && (d = 0), A === void 0 && (A = _ ? _.length : 0), P === void 0 && (P = 0), L === void 0 && (L = this.length), d < 0 || A > _.length || P < 0 || L > this.length)
      throw new RangeError("out of range index");
    if (P >= L && d >= A)
      return 0;
    if (P >= L)
      return -1;
    if (d >= A)
      return 1;
    if (d >>>= 0, A >>>= 0, P >>>= 0, L >>>= 0, this === _) return 0;
    let W = L - P, It = A - d;
    const Qt = Math.min(W, It), Gt = this.slice(P, L), Jt = _.slice(d, A);
    for (let Mt = 0; Mt < Qt; ++Mt)
      if (Gt[Mt] !== Jt[Mt]) {
        W = Gt[Mt], It = Jt[Mt];
        break;
      }
    return W < It ? -1 : It < W ? 1 : 0;
  };
  function tt(y, _, d, A, P) {
    if (y.length === 0) return -1;
    if (typeof d == "string" ? (A = d, d = 0) : d > 2147483647 ? d = 2147483647 : d < -2147483648 && (d = -2147483648), d = +d, Me(d) && (d = P ? 0 : y.length - 1), d < 0 && (d = y.length + d), d >= y.length) {
      if (P) return -1;
      d = y.length - 1;
    } else if (d < 0)
      if (P) d = 0;
      else return -1;
    if (typeof _ == "string" && (_ = f.from(_, A)), f.isBuffer(_))
      return _.length === 0 ? -1 : ht(y, _, d, A, P);
    if (typeof _ == "number")
      return _ = _ & 255, typeof s.prototype.indexOf == "function" ? P ? s.prototype.indexOf.call(y, _, d) : s.prototype.lastIndexOf.call(y, _, d) : ht(y, [_], d, A, P);
    throw new TypeError("val must be string, number or Buffer");
  }
  function ht(y, _, d, A, P) {
    let L = 1, W = y.length, It = _.length;
    if (A !== void 0 && (A = String(A).toLowerCase(), A === "ucs2" || A === "ucs-2" || A === "utf16le" || A === "utf-16le")) {
      if (y.length < 2 || _.length < 2)
        return -1;
      L = 2, W /= 2, It /= 2, d /= 2;
    }
    function Qt(Jt, Mt) {
      return L === 1 ? Jt[Mt] : Jt.readUInt16BE(Mt * L);
    }
    let Gt;
    if (P) {
      let Jt = -1;
      for (Gt = d; Gt < W; Gt++)
        if (Qt(y, Gt) === Qt(_, Jt === -1 ? 0 : Gt - Jt)) {
          if (Jt === -1 && (Jt = Gt), Gt - Jt + 1 === It) return Jt * L;
        } else
          Jt !== -1 && (Gt -= Gt - Jt), Jt = -1;
    } else
      for (d + It > W && (d = W - It), Gt = d; Gt >= 0; Gt--) {
        let Jt = !0;
        for (let Mt = 0; Mt < It; Mt++)
          if (Qt(y, Gt + Mt) !== Qt(_, Mt)) {
            Jt = !1;
            break;
          }
        if (Jt) return Gt;
      }
    return -1;
  }
  f.prototype.includes = function(_, d, A) {
    return this.indexOf(_, d, A) !== -1;
  }, f.prototype.indexOf = function(_, d, A) {
    return tt(this, _, d, A, !0);
  }, f.prototype.lastIndexOf = function(_, d, A) {
    return tt(this, _, d, A, !1);
  };
  function wt(y, _, d, A) {
    d = Number(d) || 0;
    const P = y.length - d;
    A ? (A = Number(A), A > P && (A = P)) : A = P;
    const L = _.length;
    A > L / 2 && (A = L / 2);
    let W;
    for (W = 0; W < A; ++W) {
      const It = parseInt(_.substr(W * 2, 2), 16);
      if (Me(It)) return W;
      y[d + W] = It;
    }
    return W;
  }
  function kt(y, _, d, A) {
    return Ze(Ye(_, y.length - d), y, d, A);
  }
  function Nt(y, _, d, A) {
    return Ze(_i(_), y, d, A);
  }
  function jt(y, _, d, A) {
    return Ze(Or(_), y, d, A);
  }
  function X(y, _, d, A) {
    return Ze(fi(_, y.length - d), y, d, A);
  }
  f.prototype.write = function(_, d, A, P) {
    if (d === void 0)
      P = "utf8", A = this.length, d = 0;
    else if (A === void 0 && typeof d == "string")
      P = d, A = this.length, d = 0;
    else if (isFinite(d))
      d = d >>> 0, isFinite(A) ? (A = A >>> 0, P === void 0 && (P = "utf8")) : (P = A, A = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const L = this.length - d;
    if ((A === void 0 || A > L) && (A = L), _.length > 0 && (A < 0 || d < 0) || d > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    P || (P = "utf8");
    let W = !1;
    for (; ; )
      switch (P) {
        case "hex":
          return wt(this, _, d, A);
        case "utf8":
        case "utf-8":
          return kt(this, _, d, A);
        case "ascii":
        case "latin1":
        case "binary":
          return Nt(this, _, d, A);
        case "base64":
          return jt(this, _, d, A);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return X(this, _, d, A);
        default:
          if (W) throw new TypeError("Unknown encoding: " + P);
          P = ("" + P).toLowerCase(), W = !0;
      }
  }, f.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function at(y, _, d) {
    return _ === 0 && d === y.length ? t.fromByteArray(y) : t.fromByteArray(y.slice(_, d));
  }
  function gt(y, _, d) {
    d = Math.min(y.length, d);
    const A = [];
    let P = _;
    for (; P < d; ) {
      const L = y[P];
      let W = null, It = L > 239 ? 4 : L > 223 ? 3 : L > 191 ? 2 : 1;
      if (P + It <= d) {
        let Qt, Gt, Jt, Mt;
        switch (It) {
          case 1:
            L < 128 && (W = L);
            break;
          case 2:
            Qt = y[P + 1], (Qt & 192) === 128 && (Mt = (L & 31) << 6 | Qt & 63, Mt > 127 && (W = Mt));
            break;
          case 3:
            Qt = y[P + 1], Gt = y[P + 2], (Qt & 192) === 128 && (Gt & 192) === 128 && (Mt = (L & 15) << 12 | (Qt & 63) << 6 | Gt & 63, Mt > 2047 && (Mt < 55296 || Mt > 57343) && (W = Mt));
            break;
          case 4:
            Qt = y[P + 1], Gt = y[P + 2], Jt = y[P + 3], (Qt & 192) === 128 && (Gt & 192) === 128 && (Jt & 192) === 128 && (Mt = (L & 15) << 18 | (Qt & 63) << 12 | (Gt & 63) << 6 | Jt & 63, Mt > 65535 && Mt < 1114112 && (W = Mt));
        }
      }
      W === null ? (W = 65533, It = 1) : W > 65535 && (W -= 65536, A.push(W >>> 10 & 1023 | 55296), W = 56320 | W & 1023), A.push(W), P += It;
    }
    return vt(A);
  }
  const At = 4096;
  function vt(y) {
    const _ = y.length;
    if (_ <= At)
      return String.fromCharCode.apply(String, y);
    let d = "", A = 0;
    for (; A < _; )
      d += String.fromCharCode.apply(
        String,
        y.slice(A, A += At)
      );
    return d;
  }
  function Ct(y, _, d) {
    let A = "";
    d = Math.min(y.length, d);
    for (let P = _; P < d; ++P)
      A += String.fromCharCode(y[P] & 127);
    return A;
  }
  function Vt(y, _, d) {
    let A = "";
    d = Math.min(y.length, d);
    for (let P = _; P < d; ++P)
      A += String.fromCharCode(y[P]);
    return A;
  }
  function F(y, _, d) {
    const A = y.length;
    (!_ || _ < 0) && (_ = 0), (!d || d < 0 || d > A) && (d = A);
    let P = "";
    for (let L = _; L < d; ++L)
      P += Xe[y[L]];
    return P;
  }
  function H(y, _, d) {
    const A = y.slice(_, d);
    let P = "";
    for (let L = 0; L < A.length - 1; L += 2)
      P += String.fromCharCode(A[L] + A[L + 1] * 256);
    return P;
  }
  f.prototype.slice = function(_, d) {
    const A = this.length;
    _ = ~~_, d = d === void 0 ? A : ~~d, _ < 0 ? (_ += A, _ < 0 && (_ = 0)) : _ > A && (_ = A), d < 0 ? (d += A, d < 0 && (d = 0)) : d > A && (d = A), d < _ && (d = _);
    const P = this.subarray(_, d);
    return Object.setPrototypeOf(P, f.prototype), P;
  };
  function Q(y, _, d) {
    if (y % 1 !== 0 || y < 0) throw new RangeError("offset is not uint");
    if (y + _ > d) throw new RangeError("Trying to access beyond buffer length");
  }
  f.prototype.readUintLE = f.prototype.readUIntLE = function(_, d, A) {
    _ = _ >>> 0, d = d >>> 0, A || Q(_, d, this.length);
    let P = this[_], L = 1, W = 0;
    for (; ++W < d && (L *= 256); )
      P += this[_ + W] * L;
    return P;
  }, f.prototype.readUintBE = f.prototype.readUIntBE = function(_, d, A) {
    _ = _ >>> 0, d = d >>> 0, A || Q(_, d, this.length);
    let P = this[_ + --d], L = 1;
    for (; d > 0 && (L *= 256); )
      P += this[_ + --d] * L;
    return P;
  }, f.prototype.readUint8 = f.prototype.readUInt8 = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 1, this.length), this[_];
  }, f.prototype.readUint16LE = f.prototype.readUInt16LE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 2, this.length), this[_] | this[_ + 1] << 8;
  }, f.prototype.readUint16BE = f.prototype.readUInt16BE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 2, this.length), this[_] << 8 | this[_ + 1];
  }, f.prototype.readUint32LE = f.prototype.readUInt32LE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 4, this.length), (this[_] | this[_ + 1] << 8 | this[_ + 2] << 16) + this[_ + 3] * 16777216;
  }, f.prototype.readUint32BE = f.prototype.readUInt32BE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 4, this.length), this[_] * 16777216 + (this[_ + 1] << 16 | this[_ + 2] << 8 | this[_ + 3]);
  }, f.prototype.readBigUInt64LE = ie(function(_) {
    _ = _ >>> 0, yt(_, "offset");
    const d = this[_], A = this[_ + 7];
    (d === void 0 || A === void 0) && St(_, this.length - 8);
    const P = d + this[++_] * 2 ** 8 + this[++_] * 2 ** 16 + this[++_] * 2 ** 24, L = this[++_] + this[++_] * 2 ** 8 + this[++_] * 2 ** 16 + A * 2 ** 24;
    return BigInt(P) + (BigInt(L) << BigInt(32));
  }), f.prototype.readBigUInt64BE = ie(function(_) {
    _ = _ >>> 0, yt(_, "offset");
    const d = this[_], A = this[_ + 7];
    (d === void 0 || A === void 0) && St(_, this.length - 8);
    const P = d * 2 ** 24 + this[++_] * 2 ** 16 + this[++_] * 2 ** 8 + this[++_], L = this[++_] * 2 ** 24 + this[++_] * 2 ** 16 + this[++_] * 2 ** 8 + A;
    return (BigInt(P) << BigInt(32)) + BigInt(L);
  }), f.prototype.readIntLE = function(_, d, A) {
    _ = _ >>> 0, d = d >>> 0, A || Q(_, d, this.length);
    let P = this[_], L = 1, W = 0;
    for (; ++W < d && (L *= 256); )
      P += this[_ + W] * L;
    return L *= 128, P >= L && (P -= Math.pow(2, 8 * d)), P;
  }, f.prototype.readIntBE = function(_, d, A) {
    _ = _ >>> 0, d = d >>> 0, A || Q(_, d, this.length);
    let P = d, L = 1, W = this[_ + --P];
    for (; P > 0 && (L *= 256); )
      W += this[_ + --P] * L;
    return L *= 128, W >= L && (W -= Math.pow(2, 8 * d)), W;
  }, f.prototype.readInt8 = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 1, this.length), this[_] & 128 ? (255 - this[_] + 1) * -1 : this[_];
  }, f.prototype.readInt16LE = function(_, d) {
    _ = _ >>> 0, d || Q(_, 2, this.length);
    const A = this[_] | this[_ + 1] << 8;
    return A & 32768 ? A | 4294901760 : A;
  }, f.prototype.readInt16BE = function(_, d) {
    _ = _ >>> 0, d || Q(_, 2, this.length);
    const A = this[_ + 1] | this[_] << 8;
    return A & 32768 ? A | 4294901760 : A;
  }, f.prototype.readInt32LE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 4, this.length), this[_] | this[_ + 1] << 8 | this[_ + 2] << 16 | this[_ + 3] << 24;
  }, f.prototype.readInt32BE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 4, this.length), this[_] << 24 | this[_ + 1] << 16 | this[_ + 2] << 8 | this[_ + 3];
  }, f.prototype.readBigInt64LE = ie(function(_) {
    _ = _ >>> 0, yt(_, "offset");
    const d = this[_], A = this[_ + 7];
    (d === void 0 || A === void 0) && St(_, this.length - 8);
    const P = this[_ + 4] + this[_ + 5] * 2 ** 8 + this[_ + 6] * 2 ** 16 + (A << 24);
    return (BigInt(P) << BigInt(32)) + BigInt(d + this[++_] * 2 ** 8 + this[++_] * 2 ** 16 + this[++_] * 2 ** 24);
  }), f.prototype.readBigInt64BE = ie(function(_) {
    _ = _ >>> 0, yt(_, "offset");
    const d = this[_], A = this[_ + 7];
    (d === void 0 || A === void 0) && St(_, this.length - 8);
    const P = (d << 24) + // Overflow
    this[++_] * 2 ** 16 + this[++_] * 2 ** 8 + this[++_];
    return (BigInt(P) << BigInt(32)) + BigInt(this[++_] * 2 ** 24 + this[++_] * 2 ** 16 + this[++_] * 2 ** 8 + A);
  }), f.prototype.readFloatLE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 4, this.length), e.read(this, _, !0, 23, 4);
  }, f.prototype.readFloatBE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 4, this.length), e.read(this, _, !1, 23, 4);
  }, f.prototype.readDoubleLE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 8, this.length), e.read(this, _, !0, 52, 8);
  }, f.prototype.readDoubleBE = function(_, d) {
    return _ = _ >>> 0, d || Q(_, 8, this.length), e.read(this, _, !1, 52, 8);
  };
  function lt(y, _, d, A, P, L) {
    if (!f.isBuffer(y)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (_ > P || _ < L) throw new RangeError('"value" argument is out of bounds');
    if (d + A > y.length) throw new RangeError("Index out of range");
  }
  f.prototype.writeUintLE = f.prototype.writeUIntLE = function(_, d, A, P) {
    if (_ = +_, d = d >>> 0, A = A >>> 0, !P) {
      const It = Math.pow(2, 8 * A) - 1;
      lt(this, _, d, A, It, 0);
    }
    let L = 1, W = 0;
    for (this[d] = _ & 255; ++W < A && (L *= 256); )
      this[d + W] = _ / L & 255;
    return d + A;
  }, f.prototype.writeUintBE = f.prototype.writeUIntBE = function(_, d, A, P) {
    if (_ = +_, d = d >>> 0, A = A >>> 0, !P) {
      const It = Math.pow(2, 8 * A) - 1;
      lt(this, _, d, A, It, 0);
    }
    let L = A - 1, W = 1;
    for (this[d + L] = _ & 255; --L >= 0 && (W *= 256); )
      this[d + L] = _ / W & 255;
    return d + A;
  }, f.prototype.writeUint8 = f.prototype.writeUInt8 = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 1, 255, 0), this[d] = _ & 255, d + 1;
  }, f.prototype.writeUint16LE = f.prototype.writeUInt16LE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 2, 65535, 0), this[d] = _ & 255, this[d + 1] = _ >>> 8, d + 2;
  }, f.prototype.writeUint16BE = f.prototype.writeUInt16BE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 2, 65535, 0), this[d] = _ >>> 8, this[d + 1] = _ & 255, d + 2;
  }, f.prototype.writeUint32LE = f.prototype.writeUInt32LE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 4, 4294967295, 0), this[d + 3] = _ >>> 24, this[d + 2] = _ >>> 16, this[d + 1] = _ >>> 8, this[d] = _ & 255, d + 4;
  }, f.prototype.writeUint32BE = f.prototype.writeUInt32BE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 4, 4294967295, 0), this[d] = _ >>> 24, this[d + 1] = _ >>> 16, this[d + 2] = _ >>> 8, this[d + 3] = _ & 255, d + 4;
  };
  function T(y, _, d, A, P) {
    Pt(_, A, P, y, d, 7);
    let L = Number(_ & BigInt(4294967295));
    y[d++] = L, L = L >> 8, y[d++] = L, L = L >> 8, y[d++] = L, L = L >> 8, y[d++] = L;
    let W = Number(_ >> BigInt(32) & BigInt(4294967295));
    return y[d++] = W, W = W >> 8, y[d++] = W, W = W >> 8, y[d++] = W, W = W >> 8, y[d++] = W, d;
  }
  function O(y, _, d, A, P) {
    Pt(_, A, P, y, d, 7);
    let L = Number(_ & BigInt(4294967295));
    y[d + 7] = L, L = L >> 8, y[d + 6] = L, L = L >> 8, y[d + 5] = L, L = L >> 8, y[d + 4] = L;
    let W = Number(_ >> BigInt(32) & BigInt(4294967295));
    return y[d + 3] = W, W = W >> 8, y[d + 2] = W, W = W >> 8, y[d + 1] = W, W = W >> 8, y[d] = W, d + 8;
  }
  f.prototype.writeBigUInt64LE = ie(function(_, d = 0) {
    return T(this, _, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), f.prototype.writeBigUInt64BE = ie(function(_, d = 0) {
    return O(this, _, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), f.prototype.writeIntLE = function(_, d, A, P) {
    if (_ = +_, d = d >>> 0, !P) {
      const Qt = Math.pow(2, 8 * A - 1);
      lt(this, _, d, A, Qt - 1, -Qt);
    }
    let L = 0, W = 1, It = 0;
    for (this[d] = _ & 255; ++L < A && (W *= 256); )
      _ < 0 && It === 0 && this[d + L - 1] !== 0 && (It = 1), this[d + L] = (_ / W >> 0) - It & 255;
    return d + A;
  }, f.prototype.writeIntBE = function(_, d, A, P) {
    if (_ = +_, d = d >>> 0, !P) {
      const Qt = Math.pow(2, 8 * A - 1);
      lt(this, _, d, A, Qt - 1, -Qt);
    }
    let L = A - 1, W = 1, It = 0;
    for (this[d + L] = _ & 255; --L >= 0 && (W *= 256); )
      _ < 0 && It === 0 && this[d + L + 1] !== 0 && (It = 1), this[d + L] = (_ / W >> 0) - It & 255;
    return d + A;
  }, f.prototype.writeInt8 = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 1, 127, -128), _ < 0 && (_ = 255 + _ + 1), this[d] = _ & 255, d + 1;
  }, f.prototype.writeInt16LE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 2, 32767, -32768), this[d] = _ & 255, this[d + 1] = _ >>> 8, d + 2;
  }, f.prototype.writeInt16BE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 2, 32767, -32768), this[d] = _ >>> 8, this[d + 1] = _ & 255, d + 2;
  }, f.prototype.writeInt32LE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 4, 2147483647, -2147483648), this[d] = _ & 255, this[d + 1] = _ >>> 8, this[d + 2] = _ >>> 16, this[d + 3] = _ >>> 24, d + 4;
  }, f.prototype.writeInt32BE = function(_, d, A) {
    return _ = +_, d = d >>> 0, A || lt(this, _, d, 4, 2147483647, -2147483648), _ < 0 && (_ = 4294967295 + _ + 1), this[d] = _ >>> 24, this[d + 1] = _ >>> 16, this[d + 2] = _ >>> 8, this[d + 3] = _ & 255, d + 4;
  }, f.prototype.writeBigInt64LE = ie(function(_, d = 0) {
    return T(this, _, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), f.prototype.writeBigInt64BE = ie(function(_, d = 0) {
    return O(this, _, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function G(y, _, d, A, P, L) {
    if (d + A > y.length) throw new RangeError("Index out of range");
    if (d < 0) throw new RangeError("Index out of range");
  }
  function Y(y, _, d, A, P) {
    return _ = +_, d = d >>> 0, P || G(y, _, d, 4), e.write(y, _, d, A, 23, 4), d + 4;
  }
  f.prototype.writeFloatLE = function(_, d, A) {
    return Y(this, _, d, !0, A);
  }, f.prototype.writeFloatBE = function(_, d, A) {
    return Y(this, _, d, !1, A);
  };
  function ot(y, _, d, A, P) {
    return _ = +_, d = d >>> 0, P || G(y, _, d, 8), e.write(y, _, d, A, 52, 8), d + 8;
  }
  f.prototype.writeDoubleLE = function(_, d, A) {
    return ot(this, _, d, !0, A);
  }, f.prototype.writeDoubleBE = function(_, d, A) {
    return ot(this, _, d, !1, A);
  }, f.prototype.copy = function(_, d, A, P) {
    if (!f.isBuffer(_)) throw new TypeError("argument should be a Buffer");
    if (A || (A = 0), !P && P !== 0 && (P = this.length), d >= _.length && (d = _.length), d || (d = 0), P > 0 && P < A && (P = A), P === A || _.length === 0 || this.length === 0) return 0;
    if (d < 0)
      throw new RangeError("targetStart out of bounds");
    if (A < 0 || A >= this.length) throw new RangeError("Index out of range");
    if (P < 0) throw new RangeError("sourceEnd out of bounds");
    P > this.length && (P = this.length), _.length - d < P - A && (P = _.length - d + A);
    const L = P - A;
    return this === _ && typeof s.prototype.copyWithin == "function" ? this.copyWithin(d, A, P) : s.prototype.set.call(
      _,
      this.subarray(A, P),
      d
    ), L;
  }, f.prototype.fill = function(_, d, A, P) {
    if (typeof _ == "string") {
      if (typeof d == "string" ? (P = d, d = 0, A = this.length) : typeof A == "string" && (P = A, A = this.length), P !== void 0 && typeof P != "string")
        throw new TypeError("encoding must be a string");
      if (typeof P == "string" && !f.isEncoding(P))
        throw new TypeError("Unknown encoding: " + P);
      if (_.length === 1) {
        const W = _.charCodeAt(0);
        (P === "utf8" && W < 128 || P === "latin1") && (_ = W);
      }
    } else typeof _ == "number" ? _ = _ & 255 : typeof _ == "boolean" && (_ = Number(_));
    if (d < 0 || this.length < d || this.length < A)
      throw new RangeError("Out of range index");
    if (A <= d)
      return this;
    d = d >>> 0, A = A === void 0 ? this.length : A >>> 0, _ || (_ = 0);
    let L;
    if (typeof _ == "number")
      for (L = d; L < A; ++L)
        this[L] = _;
    else {
      const W = f.isBuffer(_) ? _ : f.from(_, P), It = W.length;
      if (It === 0)
        throw new TypeError('The value "' + _ + '" is invalid for argument "value"');
      for (L = 0; L < A - d; ++L)
        this[L + d] = W[L % It];
    }
    return this;
  };
  const v = {};
  function I(y, _, d) {
    v[y] = class extends d {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: _.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${y}]`, this.stack, delete this.name;
      }
      get code() {
        return y;
      }
      set code(P) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: P,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${y}]: ${this.message}`;
      }
    };
  }
  I(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(y) {
      return y ? `${y} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), I(
    "ERR_INVALID_ARG_TYPE",
    function(y, _) {
      return `The "${y}" argument must be of type number. Received type ${typeof _}`;
    },
    TypeError
  ), I(
    "ERR_OUT_OF_RANGE",
    function(y, _, d) {
      let A = `The value of "${y}" is out of range.`, P = d;
      return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? P = J(String(d)) : typeof d == "bigint" && (P = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (P = J(P)), P += "n"), A += ` It must be ${_}. Received ${P}`, A;
    },
    RangeError
  );
  function J(y) {
    let _ = "", d = y.length;
    const A = y[0] === "-" ? 1 : 0;
    for (; d >= A + 4; d -= 3)
      _ = `_${y.slice(d - 3, d)}${_}`;
    return `${y.slice(0, d)}${_}`;
  }
  function nt(y, _, d) {
    yt(_, "offset"), (y[_] === void 0 || y[_ + d] === void 0) && St(_, y.length - (d + 1));
  }
  function Pt(y, _, d, A, P, L) {
    if (y > d || y < _) {
      const W = typeof _ == "bigint" ? "n" : "";
      let It;
      throw _ === 0 || _ === BigInt(0) ? It = `>= 0${W} and < 2${W} ** ${(L + 1) * 8}${W}` : It = `>= -(2${W} ** ${(L + 1) * 8 - 1}${W}) and < 2 ** ${(L + 1) * 8 - 1}${W}`, new v.ERR_OUT_OF_RANGE("value", It, y);
    }
    nt(A, P, L);
  }
  function yt(y, _) {
    if (typeof y != "number")
      throw new v.ERR_INVALID_ARG_TYPE(_, "number", y);
  }
  function St(y, _, d) {
    throw Math.floor(y) !== y ? (yt(y, d), new v.ERR_OUT_OF_RANGE("offset", "an integer", y)) : _ < 0 ? new v.ERR_BUFFER_OUT_OF_BOUNDS() : new v.ERR_OUT_OF_RANGE(
      "offset",
      `>= 0 and <= ${_}`,
      y
    );
  }
  const Ne = /[^+/0-9A-Za-z-_]/g;
  function $(y) {
    if (y = y.split("=")[0], y = y.trim().replace(Ne, ""), y.length < 2) return "";
    for (; y.length % 4 !== 0; )
      y = y + "=";
    return y;
  }
  function Ye(y, _) {
    _ = _ || 1 / 0;
    let d;
    const A = y.length;
    let P = null;
    const L = [];
    for (let W = 0; W < A; ++W) {
      if (d = y.charCodeAt(W), d > 55295 && d < 57344) {
        if (!P) {
          if (d > 56319) {
            (_ -= 3) > -1 && L.push(239, 191, 189);
            continue;
          } else if (W + 1 === A) {
            (_ -= 3) > -1 && L.push(239, 191, 189);
            continue;
          }
          P = d;
          continue;
        }
        if (d < 56320) {
          (_ -= 3) > -1 && L.push(239, 191, 189), P = d;
          continue;
        }
        d = (P - 55296 << 10 | d - 56320) + 65536;
      } else P && (_ -= 3) > -1 && L.push(239, 191, 189);
      if (P = null, d < 128) {
        if ((_ -= 1) < 0) break;
        L.push(d);
      } else if (d < 2048) {
        if ((_ -= 2) < 0) break;
        L.push(
          d >> 6 | 192,
          d & 63 | 128
        );
      } else if (d < 65536) {
        if ((_ -= 3) < 0) break;
        L.push(
          d >> 12 | 224,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else if (d < 1114112) {
        if ((_ -= 4) < 0) break;
        L.push(
          d >> 18 | 240,
          d >> 12 & 63 | 128,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return L;
  }
  function _i(y) {
    const _ = [];
    for (let d = 0; d < y.length; ++d)
      _.push(y.charCodeAt(d) & 255);
    return _;
  }
  function fi(y, _) {
    let d, A, P;
    const L = [];
    for (let W = 0; W < y.length && !((_ -= 2) < 0); ++W)
      d = y.charCodeAt(W), A = d >> 8, P = d % 256, L.push(P), L.push(A);
    return L;
  }
  function Or(y) {
    return t.toByteArray($(y));
  }
  function Ze(y, _, d, A) {
    let P;
    for (P = 0; P < A && !(P + d >= _.length || P >= y.length); ++P)
      _[P + d] = y[P];
    return P;
  }
  function le(y, _) {
    return y instanceof _ || y != null && y.constructor != null && y.constructor.name != null && y.constructor.name === _.name;
  }
  function Me(y) {
    return y !== y;
  }
  const Xe = function() {
    const y = "0123456789abcdef", _ = new Array(256);
    for (let d = 0; d < 16; ++d) {
      const A = d * 16;
      for (let P = 0; P < 16; ++P)
        _[A + P] = y[d] + y[P];
    }
    return _;
  }();
  function ie(y) {
    return typeof BigInt > "u" ? za : y;
  }
  function za() {
    throw new Error("BigInt not supported");
  }
})(se);
const Oe = se.Buffer, oy = se.Blob, cy = se.BlobOptions, uy = se.Buffer, ly = se.File, _y = se.FileOptions, fy = se.INSPECT_MAX_BYTES, dy = se.SlowBuffer, py = se.TranscodeEncoding, hy = se.atob, gy = se.btoa, wy = se.constants, yy = se.isAscii, by = se.isUtf8, my = se.kMaxLength, vy = se.kStringMaxLength, Ay = se.resolveObjectURL, Iy = se.transcode, Ey = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Blob: oy,
  BlobOptions: cy,
  Buffer: uy,
  File: ly,
  FileOptions: _y,
  INSPECT_MAX_BYTES: fy,
  SlowBuffer: dy,
  TranscodeEncoding: py,
  atob: hy,
  btoa: gy,
  constants: wy,
  default: Oe,
  isAscii: yy,
  isUtf8: by,
  kMaxLength: my,
  kStringMaxLength: vy,
  resolveObjectURL: Ay,
  transcode: Iy
}, Symbol.toStringTag, { value: "Module" })), ky = "6.13.1";
function xy(r, t, e) {
  const n = t.split("|").map((s) => s.trim());
  for (let s = 0; s < n.length; s++)
    switch (t) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof r === t)
          return;
    }
  const i = new Error(`invalid value for type ${t}`);
  throw i.code = "INVALID_ARGUMENT", i.argument = `value.${e}`, i.value = r, i;
}
async function ve(r) {
  const t = Object.keys(r);
  return (await Promise.all(t.map((n) => Promise.resolve(r[n])))).reduce((n, i, s) => (n[t[s]] = i, n), {});
}
function mt(r, t, e) {
  for (let n in t) {
    let i = t[n];
    const s = e ? e[n] : null;
    s && xy(i, s, n), Object.defineProperty(r, n, { enumerable: !0, value: i, writable: !1 });
  }
}
function ys(r) {
  if (r == null)
    return "null";
  if (Array.isArray(r))
    return "[ " + r.map(ys).join(", ") + " ]";
  if (r instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let e = "0x";
    for (let n = 0; n < r.length; n++)
      e += t[r[n] >> 4], e += t[r[n] & 15];
    return e;
  }
  if (typeof r == "object" && typeof r.toJSON == "function")
    return ys(r.toJSON());
  switch (typeof r) {
    case "boolean":
    case "symbol":
      return r.toString();
    case "bigint":
      return BigInt(r).toString();
    case "number":
      return r.toString();
    case "string":
      return JSON.stringify(r);
    case "object": {
      const t = Object.keys(r);
      return t.sort(), "{ " + t.map((e) => `${ys(e)}: ${ys(r[e])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function ye(r, t) {
  return r && r.code === t;
}
function P_(r) {
  return ye(r, "CALL_EXCEPTION");
}
function qt(r, t, e) {
  let n = r;
  {
    const s = [];
    if (e) {
      if ("message" in e || "code" in e || "name" in e)
        throw new Error(`value will overwrite populated values: ${ys(e)}`);
      for (const a in e) {
        if (a === "shortMessage")
          continue;
        const u = e[a];
        s.push(a + "=" + ys(u));
      }
    }
    s.push(`code=${t}`), s.push(`version=${ky}`), s.length && (r += " (" + s.join(", ") + ")");
  }
  let i;
  switch (t) {
    case "INVALID_ARGUMENT":
      i = new TypeError(r);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      i = new RangeError(r);
      break;
    default:
      i = new Error(r);
  }
  return mt(i, { code: t }), e && Object.assign(i, e), i.shortMessage == null && mt(i, { shortMessage: n }), i;
}
function q(r, t, e, n) {
  if (!r)
    throw qt(t, e, n);
}
function N(r, t, e, n) {
  q(r, t, "INVALID_ARGUMENT", { argument: e, value: n });
}
function ih(r, t, e) {
  e == null && (e = ""), e && (e = ": " + e), q(r >= t, "missing arguemnt" + e, "MISSING_ARGUMENT", {
    count: r,
    expectedCount: t
  }), q(r <= t, "too many arguments" + e, "UNEXPECTED_ARGUMENT", {
    count: r,
    expectedCount: t
  });
}
["NFD", "NFC", "NFKD", "NFKC"].reduce((r, t) => {
  try {
    if ("test".normalize(t) !== "test")
      throw new Error("bad");
    if (t === "NFD" && "é".normalize("NFD") !== "é")
      throw new Error("broken");
    r.push(t);
  } catch {
  }
  return r;
}, []);
function Qc(r, t, e) {
  if (e == null && (e = ""), r !== t) {
    let n = e, i = "new";
    e && (n += ".", i += " " + e), q(!1, `private constructor; use ${n}from* methods`, "UNSUPPORTED_OPERATION", {
      operation: i
    });
  }
}
function sh(r, t, e) {
  if (r instanceof Uint8Array)
    return e ? new Uint8Array(r) : r;
  if (typeof r == "string" && r.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const n = new Uint8Array((r.length - 2) / 2);
    let i = 2;
    for (let s = 0; s < n.length; s++)
      n[s] = parseInt(r.substring(i, i + 2), 16), i += 2;
    return n;
  }
  N(!1, "invalid BytesLike value", t || "value", r);
}
function Lt(r, t) {
  return sh(r, t, !1);
}
function Ae(r, t) {
  return sh(r, t, !0);
}
function Wt(r, t) {
  return !(typeof r != "string" || !r.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && r.length !== 2 + 2 * t || t === !0 && r.length % 2 !== 0);
}
function O_(r) {
  return Wt(r, !0) || r instanceof Uint8Array;
}
const bf = "0123456789abcdef";
function dt(r) {
  const t = Lt(r);
  let e = "0x";
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    e += bf[(i & 240) >> 4] + bf[i & 15];
  }
  return e;
}
function ee(r) {
  return "0x" + r.map((t) => dt(t).substring(2)).join("");
}
function xs(r) {
  return Wt(r, !0) ? (r.length - 2) / 2 : Lt(r).length;
}
function Yt(r, t, e) {
  const n = Lt(r);
  return e != null && e > n.length && q(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: n,
    length: n.length,
    offset: e
  }), dt(n.slice(t ?? 0, e ?? n.length));
}
function ah(r, t, e) {
  const n = Lt(r);
  q(t >= n.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(n),
    length: t,
    offset: t + 1
  });
  const i = new Uint8Array(t);
  return i.fill(0), e ? i.set(n, t - n.length) : i.set(n, 0), dt(i);
}
function Yi(r, t) {
  return ah(r, t, !0);
}
function Ry(r, t) {
  return ah(r, t, !1);
}
const Jc = BigInt(0), ur = BigInt(1), bs = 9007199254740991;
function Sy(r, t) {
  const e = Wc(r, "value"), n = BigInt(Rt(t, "width"));
  if (q(e >> n === Jc, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: r
  }), e >> n - ur) {
    const i = (ur << n) - ur;
    return -((~e & i) + ur);
  }
  return e;
}
function oh(r, t) {
  let e = pt(r, "value");
  const n = BigInt(Rt(t, "width")), i = ur << n - ur;
  if (e < Jc) {
    e = -e, q(e <= i, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: r
    });
    const s = (ur << n) - ur;
    return (~e & s) + ur;
  } else
    q(e < i, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: r
    });
  return e;
}
function ja(r, t) {
  const e = Wc(r, "value"), n = BigInt(Rt(t, "bits"));
  return e & (ur << n) - ur;
}
function pt(r, t) {
  switch (typeof r) {
    case "bigint":
      return r;
    case "number":
      return N(Number.isInteger(r), "underflow", t || "value", r), N(r >= -bs && r <= bs, "overflow", t || "value", r), BigInt(r);
    case "string":
      try {
        if (r === "")
          throw new Error("empty string");
        return r[0] === "-" && r[1] !== "-" ? -BigInt(r.substring(1)) : BigInt(r);
      } catch (e) {
        N(!1, `invalid BigNumberish string: ${e.message}`, t || "value", r);
      }
  }
  N(!1, "invalid BigNumberish value", t || "value", r);
}
function Wc(r, t) {
  const e = pt(r, t);
  return q(e >= Jc, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: r
  }), e;
}
const mf = "0123456789abcdef";
function T_(r) {
  if (r instanceof Uint8Array) {
    let t = "0x0";
    for (const e of r)
      t += mf[e >> 4], t += mf[e & 15];
    return BigInt(t);
  }
  return pt(r);
}
function Rt(r, t) {
  switch (typeof r) {
    case "bigint":
      return N(r >= -bs && r <= bs, "overflow", t || "value", r), Number(r);
    case "number":
      return N(Number.isInteger(r), "underflow", t || "value", r), N(r >= -bs && r <= bs, "overflow", t || "value", r), r;
    case "string":
      try {
        if (r === "")
          throw new Error("empty string");
        return Rt(BigInt(r), t);
      } catch (e) {
        N(!1, `invalid numeric string: ${e.message}`, t || "value", r);
      }
  }
  N(!1, "invalid numeric value", t || "value", r);
}
function By(r) {
  return Rt(T_(r));
}
function oi(r, t) {
  let n = Wc(r, "value").toString(16);
  if (t == null)
    n.length % 2 && (n = "0" + n);
  else {
    const i = Rt(t, "width");
    for (q(i * 2 >= n.length, `value exceeds width (${i} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: r
    }); n.length < i * 2; )
      n = "0" + n;
  }
  return "0x" + n;
}
function Ie(r) {
  const t = Wc(r, "value");
  if (t === Jc)
    return new Uint8Array([]);
  let e = t.toString(16);
  e.length % 2 && (e = "0" + e);
  const n = new Uint8Array(e.length / 2);
  for (let i = 0; i < n.length; i++) {
    const s = i * 2;
    n[i] = parseInt(e.substring(s, s + 2), 16);
  }
  return n;
}
function ms(r) {
  let t = dt(O_(r) ? r : Ie(r)).substring(2);
  for (; t.startsWith("0"); )
    t = t.substring(1);
  return t === "" && (t = "0"), "0x" + t;
}
const vf = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
BigInt(0);
const Af = BigInt(58);
function Py(r) {
  const t = Lt(r);
  let e = T_(t), n = "";
  for (; e; )
    n = vf[Number(e % Af)] + n, e /= Af;
  for (let i = 0; i < t.length && !t[i]; i++)
    n = vf[0] + n;
  return n;
}
function Oy(r) {
  r = atob(r);
  const t = new Uint8Array(r.length);
  for (let e = 0; e < r.length; e++)
    t[e] = r.charCodeAt(e);
  return Lt(t);
}
function Ty(r) {
  const t = Lt(r);
  let e = "";
  for (let n = 0; n < t.length; n++)
    e += String.fromCharCode(t[n]);
  return btoa(e);
}
var Fs;
class ch {
  /**
   *  Create a new **EventPayload** for %%emitter%% with
   *  the %%listener%% and for %%filter%%.
   */
  constructor(t, e, n) {
    /**
     *  The event filter.
     */
    z(this, "filter");
    /**
     *  The **EventEmitterable**.
     */
    z(this, "emitter");
    D(this, Fs);
    E(this, Fs, e), mt(this, { emitter: t, filter: n });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    g(this, Fs) != null && await this.emitter.off(this.filter, g(this, Fs));
  }
}
Fs = new WeakMap();
function Ny(r, t, e, n, i) {
  N(!1, `invalid codepoint at offset ${t}; ${r}`, "bytes", e);
}
function uh(r, t, e, n, i) {
  if (r === "BAD_PREFIX" || r === "UNEXPECTED_CONTINUE") {
    let s = 0;
    for (let a = t + 1; a < e.length && e[a] >> 6 === 2; a++)
      s++;
    return s;
  }
  return r === "OVERRUN" ? e.length - t - 1 : 0;
}
function Cy(r, t, e, n, i) {
  return r === "OVERLONG" ? (N(typeof i == "number", "invalid bad code point for replacement", "badCodepoint", i), n.push(i), 0) : (n.push(65533), uh(r, t, e));
}
const Fy = Object.freeze({
  error: Ny,
  ignore: uh,
  replace: Cy
});
function zy(r, t) {
  t == null && (t = Fy.error);
  const e = Lt(r, "bytes"), n = [];
  let i = 0;
  for (; i < e.length; ) {
    const s = e[i++];
    if (!(s >> 7)) {
      n.push(s);
      continue;
    }
    let a = null, u = null;
    if ((s & 224) === 192)
      a = 1, u = 127;
    else if ((s & 240) === 224)
      a = 2, u = 2047;
    else if ((s & 248) === 240)
      a = 3, u = 65535;
    else {
      (s & 192) === 128 ? i += t("UNEXPECTED_CONTINUE", i - 1, e, n) : i += t("BAD_PREFIX", i - 1, e, n);
      continue;
    }
    if (i - 1 + a >= e.length) {
      i += t("OVERRUN", i - 1, e, n);
      continue;
    }
    let l = s & (1 << 8 - a - 1) - 1;
    for (let p = 0; p < a; p++) {
      let f = e[i];
      if ((f & 192) != 128) {
        i += t("MISSING_CONTINUE", i, e, n), l = null;
        break;
      }
      l = l << 6 | f & 63, i++;
    }
    if (l !== null) {
      if (l > 1114111) {
        i += t("OUT_OF_RANGE", i - 1 - a, e, n, l);
        continue;
      }
      if (l >= 55296 && l <= 57343) {
        i += t("UTF16_SURROGATE", i - 1 - a, e, n, l);
        continue;
      }
      if (l <= u) {
        i += t("OVERLONG", i - 1 - a, e, n, l);
        continue;
      }
      n.push(l);
    }
  }
  return n;
}
function Zr(r, t) {
  N(typeof r == "string", "invalid string value", "str", r);
  let e = [];
  for (let n = 0; n < r.length; n++) {
    const i = r.charCodeAt(n);
    if (i < 128)
      e.push(i);
    else if (i < 2048)
      e.push(i >> 6 | 192), e.push(i & 63 | 128);
    else if ((i & 64512) == 55296) {
      n++;
      const s = r.charCodeAt(n);
      N(n < r.length && (s & 64512) === 56320, "invalid surrogate pair", "str", r);
      const a = 65536 + ((i & 1023) << 10) + (s & 1023);
      e.push(a >> 18 | 240), e.push(a >> 12 & 63 | 128), e.push(a >> 6 & 63 | 128), e.push(a & 63 | 128);
    } else
      e.push(i >> 12 | 224), e.push(i >> 6 & 63 | 128), e.push(i & 63 | 128);
  }
  return new Uint8Array(e);
}
function Ly(r) {
  return r.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function gc(r, t) {
  return Ly(zy(r, t));
}
function lh(r) {
  async function t(e, n) {
    q(n == null || !n.cancelled, "request cancelled before sending", "CANCELLED");
    const i = e.url.split(":")[0].toLowerCase();
    q(i === "http" || i === "https", `unsupported protocol ${i}`, "UNSUPPORTED_OPERATION", {
      info: { protocol: i },
      operation: "request"
    }), q(i === "https" || !e.credentials || e.allowInsecureAuthentication, "insecure authorized connections unsupported", "UNSUPPORTED_OPERATION", {
      operation: "request"
    });
    let s = null;
    const a = new AbortController(), u = setTimeout(() => {
      s = qt("request timeout", "TIMEOUT"), a.abort();
    }, e.timeout);
    n && n.addListener(() => {
      s = qt("request cancelled", "CANCELLED"), a.abort();
    });
    const l = {
      method: e.method,
      headers: new Headers(Array.from(e)),
      body: e.body || void 0,
      signal: a.signal
    };
    let p;
    try {
      p = await fetch(e.url, l);
    } catch (k) {
      throw clearTimeout(u), s || k;
    }
    clearTimeout(u);
    const f = {};
    p.headers.forEach((k, R) => {
      f[R.toLowerCase()] = k;
    });
    const h = await p.arrayBuffer(), b = h == null ? null : new Uint8Array(h);
    return {
      statusCode: p.status,
      statusMessage: p.statusText,
      headers: f,
      body: b
    };
  }
  return t;
}
const Uy = 12, Dy = 250;
let If = lh();
const My = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"), jy = new RegExp("^ipfs://(ipfs/)?(.*)$", "i");
let Xu = !1;
async function _h(r, t) {
  try {
    const e = r.match(My);
    if (!e)
      throw new Error("invalid data");
    return new si(200, "OK", {
      "content-type": e[1] || "text/plain"
    }, e[2] ? Oy(e[3]) : Hy(e[3]));
  } catch {
    return new si(599, "BAD REQUEST (invalid data: URI)", {}, null, new tn(r));
  }
}
function fh(r) {
  async function t(e, n) {
    try {
      const i = e.match(jy);
      if (!i)
        throw new Error("invalid link");
      return new tn(`${r}${i[2]}`);
    } catch {
      return new si(599, "BAD REQUEST (invalid IPFS URI)", {}, null, new tn(e));
    }
  }
  return t;
}
const Lo = {
  data: _h,
  ipfs: fh("https://gateway.ipfs.io/ipfs/")
}, dh = /* @__PURE__ */ new WeakMap();
var Ii, Gn;
class Gy {
  constructor(t) {
    D(this, Ii);
    D(this, Gn);
    E(this, Ii, []), E(this, Gn, !1), dh.set(t, () => {
      if (!g(this, Gn)) {
        E(this, Gn, !0);
        for (const e of g(this, Ii))
          setTimeout(() => {
            e();
          }, 0);
        E(this, Ii, []);
      }
    });
  }
  addListener(t) {
    q(!g(this, Gn), "singal already cancelled", "UNSUPPORTED_OPERATION", {
      operation: "fetchCancelSignal.addCancelListener"
    }), g(this, Ii).push(t);
  }
  get cancelled() {
    return g(this, Gn);
  }
  checkSignal() {
    q(!this.cancelled, "cancelled", "CANCELLED", {});
  }
}
Ii = new WeakMap(), Gn = new WeakMap();
function Uo(r) {
  if (r == null)
    throw new Error("missing signal; should not happen");
  return r.checkSignal(), r;
}
var zs, Ls, sr, zr, Us, Ds, ae, ze, Lr, Ei, ki, xi, yr, ar, Hn, Ri, Ga;
const Lc = class Lc {
  /**
   *  Create a new FetchRequest instance with default values.
   *
   *  Once created, each property may be set before issuing a
   *  ``.send()`` to make the request.
   */
  constructor(t) {
    D(this, Ri);
    D(this, zs);
    D(this, Ls);
    D(this, sr);
    D(this, zr);
    D(this, Us);
    D(this, Ds);
    D(this, ae);
    D(this, ze);
    D(this, Lr);
    // Hooks
    D(this, Ei);
    D(this, ki);
    D(this, xi);
    D(this, yr);
    D(this, ar);
    D(this, Hn);
    E(this, Ds, String(t)), E(this, zs, !1), E(this, Ls, !0), E(this, sr, {}), E(this, zr, ""), E(this, Us, 3e5), E(this, ar, {
      slotInterval: Dy,
      maxAttempts: Uy
    }), E(this, Hn, null);
  }
  /**
   *  The fetch URL to request.
   */
  get url() {
    return g(this, Ds);
  }
  set url(t) {
    E(this, Ds, String(t));
  }
  /**
   *  The fetch body, if any, to send as the request body. //(default: null)//
   *
   *  When setting a body, the intrinsic ``Content-Type`` is automatically
   *  set and will be used if **not overridden** by setting a custom
   *  header.
   *
   *  If %%body%% is null, the body is cleared (along with the
   *  intrinsic ``Content-Type``).
   *
   *  If %%body%% is a string, the intrinsic ``Content-Type`` is set to
   *  ``text/plain``.
   *
   *  If %%body%% is a Uint8Array, the intrinsic ``Content-Type`` is set to
   *  ``application/octet-stream``.
   *
   *  If %%body%% is any other object, the intrinsic ``Content-Type`` is
   *  set to ``application/json``.
   */
  get body() {
    return g(this, ae) == null ? null : new Uint8Array(g(this, ae));
  }
  set body(t) {
    if (t == null)
      E(this, ae, void 0), E(this, ze, void 0);
    else if (typeof t == "string")
      E(this, ae, Zr(t)), E(this, ze, "text/plain");
    else if (t instanceof Uint8Array)
      E(this, ae, t), E(this, ze, "application/octet-stream");
    else if (typeof t == "object")
      E(this, ae, Zr(JSON.stringify(t))), E(this, ze, "application/json");
    else
      throw new Error("invalid body");
  }
  /**
   *  Returns true if the request has a body.
   */
  hasBody() {
    return g(this, ae) != null;
  }
  /**
   *  The HTTP method to use when requesting the URI. If no method
   *  has been explicitly set, then ``GET`` is used if the body is
   *  null and ``POST`` otherwise.
   */
  get method() {
    return g(this, zr) ? g(this, zr) : this.hasBody() ? "POST" : "GET";
  }
  set method(t) {
    t == null && (t = ""), E(this, zr, String(t).toUpperCase());
  }
  /**
   *  The headers that will be used when requesting the URI. All
   *  keys are lower-case.
   *
   *  This object is a copy, so any changes will **NOT** be reflected
   *  in the ``FetchRequest``.
   *
   *  To set a header entry, use the ``setHeader`` method.
   */
  get headers() {
    const t = Object.assign({}, g(this, sr));
    return g(this, Lr) && (t.authorization = `Basic ${Ty(Zr(g(this, Lr)))}`), this.allowGzip && (t["accept-encoding"] = "gzip"), t["content-type"] == null && g(this, ze) && (t["content-type"] = g(this, ze)), this.body && (t["content-length"] = String(this.body.length)), t;
  }
  /**
   *  Get the header for %%key%%, ignoring case.
   */
  getHeader(t) {
    return this.headers[t.toLowerCase()];
  }
  /**
   *  Set the header for %%key%% to %%value%%. All values are coerced
   *  to a string.
   */
  setHeader(t, e) {
    g(this, sr)[String(t).toLowerCase()] = String(e);
  }
  /**
   *  Clear all headers, resetting all intrinsic headers.
   */
  clearHeaders() {
    E(this, sr, {});
  }
  [Symbol.iterator]() {
    const t = this.headers, e = Object.keys(t);
    let n = 0;
    return {
      next: () => {
        if (n < e.length) {
          const i = e[n++];
          return {
            value: [i, t[i]],
            done: !1
          };
        }
        return { value: void 0, done: !0 };
      }
    };
  }
  /**
   *  The value that will be sent for the ``Authorization`` header.
   *
   *  To set the credentials, use the ``setCredentials`` method.
   */
  get credentials() {
    return g(this, Lr) || null;
  }
  /**
   *  Sets an ``Authorization`` for %%username%% with %%password%%.
   */
  setCredentials(t, e) {
    N(!t.match(/:/), "invalid basic authentication username", "username", "[REDACTED]"), E(this, Lr, `${t}:${e}`);
  }
  /**
   *  Enable and request gzip-encoded responses. The response will
   *  automatically be decompressed. //(default: true)//
   */
  get allowGzip() {
    return g(this, Ls);
  }
  set allowGzip(t) {
    E(this, Ls, !!t);
  }
  /**
   *  Allow ``Authentication`` credentials to be sent over insecure
   *  channels. //(default: false)//
   */
  get allowInsecureAuthentication() {
    return !!g(this, zs);
  }
  set allowInsecureAuthentication(t) {
    E(this, zs, !!t);
  }
  /**
   *  The timeout (in milliseconds) to wait for a complete response.
   *  //(default: 5 minutes)//
   */
  get timeout() {
    return g(this, Us);
  }
  set timeout(t) {
    N(t >= 0, "timeout must be non-zero", "timeout", t), E(this, Us, t);
  }
  /**
   *  This function is called prior to each request, for example
   *  during a redirection or retry in case of server throttling.
   *
   *  This offers an opportunity to populate headers or update
   *  content before sending a request.
   */
  get preflightFunc() {
    return g(this, Ei) || null;
  }
  set preflightFunc(t) {
    E(this, Ei, t);
  }
  /**
   *  This function is called after each response, offering an
   *  opportunity to provide client-level throttling or updating
   *  response data.
   *
   *  Any error thrown in this causes the ``send()`` to throw.
   *
   *  To schedule a retry attempt (assuming the maximum retry limit
   *  has not been reached), use [[response.throwThrottleError]].
   */
  get processFunc() {
    return g(this, ki) || null;
  }
  set processFunc(t) {
    E(this, ki, t);
  }
  /**
   *  This function is called on each retry attempt.
   */
  get retryFunc() {
    return g(this, xi) || null;
  }
  set retryFunc(t) {
    E(this, xi, t);
  }
  /**
   *  This function is called to fetch content from HTTP and
   *  HTTPS URLs and is platform specific (e.g. nodejs vs
   *  browsers).
   *
   *  This is by default the currently registered global getUrl
   *  function, which can be changed using [[registerGetUrl]].
   *  If this has been set, setting is to ``null`` will cause
   *  this FetchRequest (and any future clones) to revert back to
   *  using the currently registered global getUrl function.
   *
   *  Setting this is generally not necessary, but may be useful
   *  for developers that wish to intercept requests or to
   *  configurege a proxy or other agent.
   */
  get getUrlFunc() {
    return g(this, Hn) || If;
  }
  set getUrlFunc(t) {
    E(this, Hn, t);
  }
  toString() {
    return `<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${g(this, ae) ? dt(g(this, ae)) : "null"}>`;
  }
  /**
   *  Update the throttle parameters used to determine maximum
   *  attempts and exponential-backoff properties.
   */
  setThrottleParams(t) {
    t.slotInterval != null && (g(this, ar).slotInterval = t.slotInterval), t.maxAttempts != null && (g(this, ar).maxAttempts = t.maxAttempts);
  }
  /**
   *  Resolves to the response by sending the request.
   */
  send() {
    return q(g(this, yr) == null, "request already sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.send" }), E(this, yr, new Gy(this)), ct(this, Ri, Ga).call(this, 0, Ef() + this.timeout, 0, this, new si(0, "", {}, null, this));
  }
  /**
   *  Cancels the inflight response, causing a ``CANCELLED``
   *  error to be rejected from the [[send]].
   */
  cancel() {
    q(g(this, yr) != null, "request has not been sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.cancel" });
    const t = dh.get(this);
    if (!t)
      throw new Error("missing signal; should not happen");
    t();
  }
  /**
   *  Returns a new [[FetchRequest]] that represents the redirection
   *  to %%location%%.
   */
  redirect(t) {
    const e = this.url.split(":")[0].toLowerCase(), n = t.split(":")[0].toLowerCase();
    q(this.method === "GET" && (e !== "https" || n !== "http") && t.match(/^https?:/), "unsupported redirect", "UNSUPPORTED_OPERATION", {
      operation: `redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(t)})`
    });
    const i = new Lc(t);
    return i.method = "GET", i.allowGzip = this.allowGzip, i.timeout = this.timeout, E(i, sr, Object.assign({}, g(this, sr))), g(this, ae) && E(i, ae, new Uint8Array(g(this, ae))), E(i, ze, g(this, ze)), i;
  }
  /**
   *  Create a new copy of this request.
   */
  clone() {
    const t = new Lc(this.url);
    return E(t, zr, g(this, zr)), g(this, ae) && E(t, ae, g(this, ae)), E(t, ze, g(this, ze)), E(t, sr, Object.assign({}, g(this, sr))), E(t, Lr, g(this, Lr)), this.allowGzip && (t.allowGzip = !0), t.timeout = this.timeout, this.allowInsecureAuthentication && (t.allowInsecureAuthentication = !0), E(t, Ei, g(this, Ei)), E(t, ki, g(this, ki)), E(t, xi, g(this, xi)), E(t, ar, Object.assign({}, g(this, ar))), E(t, Hn, g(this, Hn)), t;
  }
  /**
   *  Locks all static configuration for gateways and FetchGetUrlFunc
   *  registration.
   */
  static lockConfig() {
    Xu = !0;
  }
  /**
   *  Get the current Gateway function for %%scheme%%.
   */
  static getGateway(t) {
    return Lo[t.toLowerCase()] || null;
  }
  /**
   *  Use the %%func%% when fetching URIs using %%scheme%%.
   *
   *  This method affects all requests globally.
   *
   *  If [[lockConfig]] has been called, no change is made and this
   *  throws.
   */
  static registerGateway(t, e) {
    if (t = t.toLowerCase(), t === "http" || t === "https")
      throw new Error(`cannot intercept ${t}; use registerGetUrl`);
    if (Xu)
      throw new Error("gateways locked");
    Lo[t] = e;
  }
  /**
   *  Use %%getUrl%% when fetching URIs over HTTP and HTTPS requests.
   *
   *  This method affects all requests globally.
   *
   *  If [[lockConfig]] has been called, no change is made and this
   *  throws.
   */
  static registerGetUrl(t) {
    if (Xu)
      throw new Error("gateways locked");
    If = t;
  }
  /**
   *  Creates a getUrl function that fetches content from HTTP and
   *  HTTPS URLs.
   *
   *  The available %%options%% are dependent on the platform
   *  implementation of the default getUrl function.
   *
   *  This is not generally something that is needed, but is useful
   *  when trying to customize simple behaviour when fetching HTTP
   *  content.
   */
  static createGetUrlFunc(t) {
    return lh();
  }
  /**
   *  Creates a function that can "fetch" data URIs.
   *
   *  Note that this is automatically done internally to support
   *  data URIs, so it is not necessary to register it.
   *
   *  This is not generally something that is needed, but may
   *  be useful in a wrapper to perfom custom data URI functionality.
   */
  static createDataGateway() {
    return _h;
  }
  /**
   *  Creates a function that will fetch IPFS (unvalidated) from
   *  a custom gateway baseUrl.
   *
   *  The default IPFS gateway used internally is
   *  ``"https:/\/gateway.ipfs.io/ipfs/"``.
   */
  static createIpfsGatewayFunc(t) {
    return fh(t);
  }
};
zs = new WeakMap(), Ls = new WeakMap(), sr = new WeakMap(), zr = new WeakMap(), Us = new WeakMap(), Ds = new WeakMap(), ae = new WeakMap(), ze = new WeakMap(), Lr = new WeakMap(), Ei = new WeakMap(), ki = new WeakMap(), xi = new WeakMap(), yr = new WeakMap(), ar = new WeakMap(), Hn = new WeakMap(), Ri = new WeakSet(), Ga = async function(t, e, n, i, s) {
  var f, h, b;
  if (t >= g(this, ar).maxAttempts)
    return s.makeServerError("exceeded maximum retry limit");
  q(Ef() <= e, "timeout", "TIMEOUT", {
    operation: "request.send",
    reason: "timeout",
    request: i
  }), n > 0 && await Vy(n);
  let a = this.clone();
  const u = (a.url.split(":")[0] || "").toLowerCase();
  if (u in Lo) {
    const k = await Lo[u](a.url, Uo(g(i, yr)));
    if (k instanceof si) {
      let R = k;
      if (this.processFunc) {
        Uo(g(i, yr));
        try {
          R = await this.processFunc(a, R);
        } catch (x) {
          (x.throttle == null || typeof x.stall != "number") && R.makeServerError("error in post-processing function", x).assertOk();
        }
      }
      return R;
    }
    a = k;
  }
  this.preflightFunc && (a = await this.preflightFunc(a));
  const l = await this.getUrlFunc(a, Uo(g(i, yr)));
  let p = new si(l.statusCode, l.statusMessage, l.headers, l.body, i);
  if (p.statusCode === 301 || p.statusCode === 302) {
    try {
      const k = p.headers.location || "";
      return ct(f = a.redirect(k), Ri, Ga).call(f, t + 1, e, 0, i, p);
    } catch {
    }
    return p;
  } else if (p.statusCode === 429 && (this.retryFunc == null || await this.retryFunc(a, p, t))) {
    const k = p.headers["retry-after"];
    let R = g(this, ar).slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
    return typeof k == "string" && k.match(/^[1-9][0-9]*$/) && (R = parseInt(k)), ct(h = a.clone(), Ri, Ga).call(h, t + 1, e, R, i, p);
  }
  if (this.processFunc) {
    Uo(g(i, yr));
    try {
      p = await this.processFunc(a, p);
    } catch (k) {
      (k.throttle == null || typeof k.stall != "number") && p.makeServerError("error in post-processing function", k).assertOk();
      let R = g(this, ar).slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
      return k.stall >= 0 && (R = k.stall), ct(b = a.clone(), Ri, Ga).call(b, t + 1, e, R, i, p);
    }
  }
  return p;
};
let tn = Lc;
var ho, go, wo, Le, Ms, Si;
const hf = class hf {
  constructor(t, e, n, i, s) {
    D(this, ho);
    D(this, go);
    D(this, wo);
    D(this, Le);
    D(this, Ms);
    D(this, Si);
    E(this, ho, t), E(this, go, e), E(this, wo, Object.keys(n).reduce((a, u) => (a[u.toLowerCase()] = String(n[u]), a), {})), E(this, Le, i == null ? null : new Uint8Array(i)), E(this, Ms, s || null), E(this, Si, { message: "" });
  }
  toString() {
    return `<FetchResponse status=${this.statusCode} body=${g(this, Le) ? dt(g(this, Le)) : "null"}>`;
  }
  /**
   *  The response status code.
   */
  get statusCode() {
    return g(this, ho);
  }
  /**
   *  The response status message.
   */
  get statusMessage() {
    return g(this, go);
  }
  /**
   *  The response headers. All keys are lower-case.
   */
  get headers() {
    return Object.assign({}, g(this, wo));
  }
  /**
   *  The response body, or ``null`` if there was no body.
   */
  get body() {
    return g(this, Le) == null ? null : new Uint8Array(g(this, Le));
  }
  /**
   *  The response body as a UTF-8 encoded string, or the empty
   *  string (i.e. ``""``) if there was no body.
   *
   *  An error is thrown if the body is invalid UTF-8 data.
   */
  get bodyText() {
    try {
      return g(this, Le) == null ? "" : gc(g(this, Le));
    } catch {
      q(!1, "response body is not valid UTF-8 data", "UNSUPPORTED_OPERATION", {
        operation: "bodyText",
        info: { response: this }
      });
    }
  }
  /**
   *  The response body, decoded as JSON.
   *
   *  An error is thrown if the body is invalid JSON-encoded data
   *  or if there was no body.
   */
  get bodyJson() {
    try {
      return JSON.parse(this.bodyText);
    } catch {
      q(!1, "response body is not valid JSON", "UNSUPPORTED_OPERATION", {
        operation: "bodyJson",
        info: { response: this }
      });
    }
  }
  [Symbol.iterator]() {
    const t = this.headers, e = Object.keys(t);
    let n = 0;
    return {
      next: () => {
        if (n < e.length) {
          const i = e[n++];
          return {
            value: [i, t[i]],
            done: !1
          };
        }
        return { value: void 0, done: !0 };
      }
    };
  }
  /**
   *  Return a Response with matching headers and body, but with
   *  an error status code (i.e. 599) and %%message%% with an
   *  optional %%error%%.
   */
  makeServerError(t, e) {
    let n;
    t ? n = `CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${t})` : (t = `${this.statusCode} ${this.statusMessage}`, n = `CLIENT ESCALATED SERVER ERROR (${t})`);
    const i = new hf(599, n, this.headers, this.body, g(this, Ms) || void 0);
    return E(i, Si, { message: t, error: e }), i;
  }
  /**
   *  If called within a [request.processFunc](FetchRequest-processFunc)
   *  call, causes the request to retry as if throttled for %%stall%%
   *  milliseconds.
   */
  throwThrottleError(t, e) {
    e == null ? e = -1 : N(Number.isInteger(e) && e >= 0, "invalid stall timeout", "stall", e);
    const n = new Error(t || "throttling requests");
    throw mt(n, { stall: e, throttle: !0 }), n;
  }
  /**
   *  Get the header value for %%key%%, ignoring case.
   */
  getHeader(t) {
    return this.headers[t.toLowerCase()];
  }
  /**
   *  Returns true if the response has a body.
   */
  hasBody() {
    return g(this, Le) != null;
  }
  /**
   *  The request made for this response.
   */
  get request() {
    return g(this, Ms);
  }
  /**
   *  Returns true if this response was a success statusCode.
   */
  ok() {
    return g(this, Si).message === "" && this.statusCode >= 200 && this.statusCode < 300;
  }
  /**
   *  Throws a ``SERVER_ERROR`` if this response is not ok.
   */
  assertOk() {
    if (this.ok())
      return;
    let { message: t, error: e } = g(this, Si);
    t === "" && (t = `server response ${this.statusCode} ${this.statusMessage}`);
    let n = null;
    this.request && (n = this.request.url);
    let i = null;
    try {
      g(this, Le) && (i = gc(g(this, Le)));
    } catch {
    }
    q(!1, t, "SERVER_ERROR", {
      request: this.request || "unknown request",
      response: this,
      error: e,
      info: {
        requestUrl: n,
        responseBody: i,
        responseStatus: `${this.statusCode} ${this.statusMessage}`
      }
    });
  }
};
ho = new WeakMap(), go = new WeakMap(), wo = new WeakMap(), Le = new WeakMap(), Ms = new WeakMap(), Si = new WeakMap();
let si = hf;
function Ef() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function Hy(r) {
  return Zr(r.replace(/%([0-9a-f][0-9a-f])/gi, (t, e) => String.fromCharCode(parseInt(e, 16))));
}
function Vy(r) {
  return new Promise((t) => setTimeout(t, r));
}
function Qy(r) {
  let t = r.toString(16);
  for (; t.length < 2; )
    t = "0" + t;
  return "0x" + t;
}
function kf(r, t, e) {
  let n = 0;
  for (let i = 0; i < e; i++)
    n = n * 256 + r[t + i];
  return n;
}
function xf(r, t, e, n) {
  const i = [];
  for (; e < t + 1 + n; ) {
    const s = ph(r, e);
    i.push(s.result), e += s.consumed, q(e <= t + 1 + n, "child data too short", "BUFFER_OVERRUN", {
      buffer: r,
      length: n,
      offset: t
    });
  }
  return { consumed: 1 + n, result: i };
}
function ph(r, t) {
  q(r.length !== 0, "data too short", "BUFFER_OVERRUN", {
    buffer: r,
    length: 0,
    offset: 1
  });
  const e = (n) => {
    q(n <= r.length, "data short segment too short", "BUFFER_OVERRUN", {
      buffer: r,
      length: r.length,
      offset: n
    });
  };
  if (r[t] >= 248) {
    const n = r[t] - 247;
    e(t + 1 + n);
    const i = kf(r, t + 1, n);
    return e(t + 1 + n + i), xf(r, t, t + 1 + n, n + i);
  } else if (r[t] >= 192) {
    const n = r[t] - 192;
    return e(t + 1 + n), xf(r, t, t + 1, n);
  } else if (r[t] >= 184) {
    const n = r[t] - 183;
    e(t + 1 + n);
    const i = kf(r, t + 1, n);
    e(t + 1 + n + i);
    const s = dt(r.slice(t + 1 + n, t + 1 + n + i));
    return { consumed: 1 + n + i, result: s };
  } else if (r[t] >= 128) {
    const n = r[t] - 128;
    e(t + 1 + n);
    const i = dt(r.slice(t + 1, t + 1 + n));
    return { consumed: 1 + n, result: i };
  }
  return { consumed: 1, result: Qy(r[t]) };
}
function Kc(r) {
  const t = Lt(r, "data"), e = ph(t, 0);
  return N(e.consumed === t.length, "unexpected junk after rlp payload", "data", r), e.result;
}
function Rf(r) {
  const t = [];
  for (; r; )
    t.unshift(r & 255), r >>= 8;
  return t;
}
function hh(r) {
  if (Array.isArray(r)) {
    let n = [];
    if (r.forEach(function(s) {
      n = n.concat(hh(s));
    }), n.length <= 55)
      return n.unshift(192 + n.length), n;
    const i = Rf(n.length);
    return i.unshift(247 + i.length), i.concat(n);
  }
  const t = Array.prototype.slice.call(Lt(r, "object"));
  if (t.length === 1 && t[0] <= 127)
    return t;
  if (t.length <= 55)
    return t.unshift(128 + t.length), t;
  const e = Rf(t.length);
  return e.unshift(183 + e.length), e.concat(t);
}
const Sf = "0123456789abcdef";
function Zi(r) {
  let t = "0x";
  for (const e of hh(r))
    t += Sf[e >> 4], t += Sf[e & 15];
  return t;
}
const Ee = 32, Ul = new Uint8Array(Ee), Jy = ["then"], Do = {}, gh = /* @__PURE__ */ new WeakMap();
function hi(r) {
  return gh.get(r);
}
function Bf(r, t) {
  gh.set(r, t);
}
function Ua(r, t) {
  const e = new Error(`deferred error during ABI decoding triggered accessing ${r}`);
  throw e.error = t, e;
}
function Dl(r, t, e) {
  return r.indexOf(null) >= 0 ? t.map((n, i) => n instanceof va ? Dl(hi(n), n, e) : n) : r.reduce((n, i, s) => {
    let a = t.getValue(i);
    return i in n || (e && a instanceof va && (a = Dl(hi(a), a, e)), n[i] = a), n;
  }, {});
}
var js;
const Is = class Is extends Array {
  /**
   *  @private
   */
  constructor(...e) {
    const n = e[0];
    let i = e[1], s = (e[2] || []).slice(), a = !0;
    n !== Do && (i = e, s = [], a = !1);
    super(i.length);
    // No longer used; but cannot be removed as it will remove the
    // #private field from the .d.ts which may break backwards
    // compatibility
    D(this, js);
    i.forEach((p, f) => {
      this[f] = p;
    });
    const u = s.reduce((p, f) => (typeof f == "string" && p.set(f, (p.get(f) || 0) + 1), p), /* @__PURE__ */ new Map());
    if (Bf(this, Object.freeze(i.map((p, f) => {
      const h = s[f];
      return h != null && u.get(h) === 1 ? h : null;
    }))), E(this, js, []), g(this, js) == null && g(this, js), !a)
      return;
    Object.freeze(this);
    const l = new Proxy(this, {
      get: (p, f, h) => {
        if (typeof f == "string") {
          if (f.match(/^[0-9]+$/)) {
            const k = Rt(f, "%index");
            if (k < 0 || k >= this.length)
              throw new RangeError("out of result range");
            const R = p[k];
            return R instanceof Error && Ua(`index ${k}`, R), R;
          }
          if (Jy.indexOf(f) >= 0)
            return Reflect.get(p, f, h);
          const b = p[f];
          if (b instanceof Function)
            return function(...k) {
              return b.apply(this === h ? p : this, k);
            };
          if (!(f in p))
            return p.getValue.apply(this === h ? p : this, [f]);
        }
        return Reflect.get(p, f, h);
      }
    });
    return Bf(l, hi(this)), l;
  }
  /**
   *  Returns the Result as a normal Array. If %%deep%%, any children
   *  which are Result objects are also converted to a normal Array.
   *
   *  This will throw if there are any outstanding deferred
   *  errors.
   */
  toArray(e) {
    const n = [];
    return this.forEach((i, s) => {
      i instanceof Error && Ua(`index ${s}`, i), e && i instanceof Is && (i = i.toArray(e)), n.push(i);
    }), n;
  }
  /**
   *  Returns the Result as an Object with each name-value pair. If
   *  %%deep%%, any children which are Result objects are also
   *  converted to an Object.
   *
   *  This will throw if any value is unnamed, or if there are
   *  any outstanding deferred errors.
   */
  toObject(e) {
    const n = hi(this);
    return n.reduce((i, s, a) => (q(s != null, `value at index ${a} unnamed`, "UNSUPPORTED_OPERATION", {
      operation: "toObject()"
    }), Dl(n, this, e)), {});
  }
  /**
   *  @_ignore
   */
  slice(e, n) {
    e == null && (e = 0), e < 0 && (e += this.length, e < 0 && (e = 0)), n == null && (n = this.length), n < 0 && (n += this.length, n < 0 && (n = 0)), n > this.length && (n = this.length);
    const i = hi(this), s = [], a = [];
    for (let u = e; u < n; u++)
      s.push(this[u]), a.push(i[u]);
    return new Is(Do, s, a);
  }
  /**
   *  @_ignore
   */
  filter(e, n) {
    const i = hi(this), s = [], a = [];
    for (let u = 0; u < this.length; u++) {
      const l = this[u];
      l instanceof Error && Ua(`index ${u}`, l), e.call(n, l, u, this) && (s.push(l), a.push(i[u]));
    }
    return new Is(Do, s, a);
  }
  /**
   *  @_ignore
   */
  map(e, n) {
    const i = [];
    for (let s = 0; s < this.length; s++) {
      const a = this[s];
      a instanceof Error && Ua(`index ${s}`, a), i.push(e.call(n, a, s, this));
    }
    return i;
  }
  /**
   *  Returns the value for %%name%%.
   *
   *  Since it is possible to have a key whose name conflicts with
   *  a method on a [[Result]] or its superclass Array, or any
   *  JavaScript keyword, this ensures all named values are still
   *  accessible by name.
   */
  getValue(e) {
    const n = hi(this).indexOf(e);
    if (n === -1)
      return;
    const i = this[n];
    return i instanceof Error && Ua(`property ${JSON.stringify(e)}`, i.error), i;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(e, n) {
    return new Is(Do, e, n);
  }
};
js = new WeakMap();
let va = Is;
function Pf(r) {
  let t = Ie(r);
  return q(t.length <= Ee, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: t, length: Ee, offset: t.length }), t.length !== Ee && (t = Ae(ee([Ul.slice(t.length % Ee), t]))), t;
}
class nn {
  constructor(t, e, n, i) {
    // The coder name:
    //   - address, uint256, tuple, array, etc.
    z(this, "name");
    // The fully expanded type, including composite types:
    //   - address, uint256, tuple(address,bytes), uint256[3][4][],  etc.
    z(this, "type");
    // The localName bound in the signature, in this example it is "baz":
    //   - tuple(address foo, uint bar) baz
    z(this, "localName");
    // Whether this type is dynamic:
    //  - Dynamic: bytes, string, address[], tuple(boolean[]), etc.
    //  - Not Dynamic: address, uint256, boolean[3], tuple(address, uint8)
    z(this, "dynamic");
    mt(this, { name: t, type: e, localName: n, dynamic: i }, {
      name: "string",
      type: "string",
      localName: "string",
      dynamic: "boolean"
    });
  }
  _throwError(t, e) {
    N(!1, t, this.localName, e);
  }
}
var Ur, Bi, Gs, Ko;
class Ml {
  constructor() {
    D(this, Gs);
    // An array of WordSize lengthed objects to concatenation
    D(this, Ur);
    D(this, Bi);
    E(this, Ur, []), E(this, Bi, 0);
  }
  get data() {
    return ee(g(this, Ur));
  }
  get length() {
    return g(this, Bi);
  }
  appendWriter(t) {
    return ct(this, Gs, Ko).call(this, Ae(t.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(t) {
    let e = Ae(t);
    const n = e.length % Ee;
    return n && (e = Ae(ee([e, Ul.slice(n)]))), ct(this, Gs, Ko).call(this, e);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(t) {
    return ct(this, Gs, Ko).call(this, Pf(t));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const t = g(this, Ur).length;
    return g(this, Ur).push(Ul), E(this, Bi, g(this, Bi) + Ee), (e) => {
      g(this, Ur)[t] = Pf(e);
    };
  }
}
Ur = new WeakMap(), Bi = new WeakMap(), Gs = new WeakSet(), Ko = function(t) {
  return g(this, Ur).push(t), E(this, Bi, g(this, Bi) + t.length), t.length;
};
var Re, Ue, Pi, Oi, Vn, ns, Gl, wh;
const gf = class gf {
  constructor(t, e, n) {
    D(this, ns);
    // Allows incomplete unpadded data to be read; otherwise an error
    // is raised if attempting to overrun the buffer. This is required
    // to deal with an old Solidity bug, in which event data for
    // external (not public thoguh) was tightly packed.
    z(this, "allowLoose");
    D(this, Re);
    D(this, Ue);
    D(this, Pi);
    D(this, Oi);
    D(this, Vn);
    mt(this, { allowLoose: !!e }), E(this, Re, Ae(t)), E(this, Pi, 0), E(this, Oi, null), E(this, Vn, n ?? 1024), E(this, Ue, 0);
  }
  get data() {
    return dt(g(this, Re));
  }
  get dataLength() {
    return g(this, Re).length;
  }
  get consumed() {
    return g(this, Ue);
  }
  get bytes() {
    return new Uint8Array(g(this, Re));
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(t) {
    const e = new gf(g(this, Re).slice(g(this, Ue) + t), this.allowLoose, g(this, Vn));
    return E(e, Oi, this), e;
  }
  // Read bytes
  readBytes(t, e) {
    let n = ct(this, ns, wh).call(this, 0, t, !!e);
    return ct(this, ns, Gl).call(this, t), E(this, Ue, g(this, Ue) + n.length), n.slice(0, t);
  }
  // Read a numeric values
  readValue() {
    return T_(this.readBytes(Ee));
  }
  readIndex() {
    return By(this.readBytes(Ee));
  }
};
Re = new WeakMap(), Ue = new WeakMap(), Pi = new WeakMap(), Oi = new WeakMap(), Vn = new WeakMap(), ns = new WeakSet(), Gl = function(t) {
  var e;
  if (g(this, Oi))
    return ct(e = g(this, Oi), ns, Gl).call(e, t);
  E(this, Pi, g(this, Pi) + t), q(g(this, Vn) < 1 || g(this, Pi) <= g(this, Vn) * this.dataLength, `compressed ABI data exceeds inflation ratio of ${g(this, Vn)} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
    buffer: Ae(g(this, Re)),
    offset: g(this, Ue),
    length: t,
    info: {
      bytesRead: g(this, Pi),
      dataLength: this.dataLength
    }
  });
}, wh = function(t, e, n) {
  let i = Math.ceil(e / Ee) * Ee;
  return g(this, Ue) + i > g(this, Re).length && (this.allowLoose && n && g(this, Ue) + e <= g(this, Re).length ? i = e : q(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
    buffer: Ae(g(this, Re)),
    length: g(this, Re).length,
    offset: g(this, Ue) + i
  })), g(this, Re).slice(g(this, Ue), g(this, Ue) + i);
};
let jl = gf;
function wc(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error(`Wrong positive integer: ${r}`);
}
function N_(r, ...t) {
  if (!(r instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${r.length}`);
}
function Wy(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  wc(r.outputLen), wc(r.blockLen);
}
function Aa(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function yh(r, t) {
  N_(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const tl = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const bh = (r) => r instanceof Uint8Array, Ky = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4)), el = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength), pr = (r, t) => r << 32 - t | r >>> t, $y = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!$y)
  throw new Error("Non little-endian hardware is not supported");
function qy(r) {
  if (typeof r != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function $c(r) {
  if (typeof r == "string" && (r = qy(r)), !bh(r))
    throw new Error(`expected Uint8Array, got ${typeof r}`);
  return r;
}
function Yy(...r) {
  const t = new Uint8Array(r.reduce((n, i) => n + i.length, 0));
  let e = 0;
  return r.forEach((n) => {
    if (!bh(n))
      throw new Error("Uint8Array expected");
    t.set(n, e), e += n.length;
  }), t;
}
class C_ {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function F_(r) {
  const t = (n) => r().update($c(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function Zy(r = 32) {
  if (tl && typeof tl.getRandomValues == "function")
    return tl.getRandomValues(new Uint8Array(r));
  throw new Error("crypto.getRandomValues must be defined");
}
class mh extends C_ {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, Wy(t);
    const n = $c(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const i = this.blockLen, s = new Uint8Array(i);
    s.set(n.length > i ? t.create().update(n).digest() : n);
    for (let a = 0; a < s.length; a++)
      s[a] ^= 54;
    this.iHash.update(s), this.oHash = t.create();
    for (let a = 0; a < s.length; a++)
      s[a] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(t) {
    return Aa(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Aa(this), N_(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: n, finished: i, destroyed: s, blockLen: a, outputLen: u } = this;
    return t = t, t.finished = i, t.destroyed = s, t.blockLen = a, t.outputLen = u, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const vh = (r, t, e) => new mh(r, t).update(e).digest();
vh.create = (r, t) => new mh(r, t);
function Xy(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const i = BigInt(32), s = BigInt(4294967295), a = Number(e >> i & s), u = Number(e & s), l = n ? 4 : 0, p = n ? 0 : 4;
  r.setUint32(t + l, a, n), r.setUint32(t + p, u, n);
}
class Ah extends C_ {
  constructor(t, e, n, i) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = i, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = el(this.buffer);
  }
  update(t) {
    Aa(this);
    const { view: e, buffer: n, blockLen: i } = this;
    t = $c(t);
    const s = t.length;
    for (let a = 0; a < s; ) {
      const u = Math.min(i - this.pos, s - a);
      if (u === i) {
        const l = el(t);
        for (; i <= s - a; a += i)
          this.process(l, a);
        continue;
      }
      n.set(t.subarray(a, a + u), this.pos), this.pos += u, a += u, this.pos === i && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Aa(this), yh(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: i, isLE: s } = this;
    let { pos: a } = this;
    e[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > i - a && (this.process(n, 0), a = 0);
    for (let h = a; h < i; h++)
      e[h] = 0;
    Xy(n, i - 8, BigInt(this.length * 8), s), this.process(n, 0);
    const u = el(t), l = this.outputLen;
    if (l % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const p = l / 4, f = this.get();
    if (p > f.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let h = 0; h < p; h++)
      u.setUint32(4 * h, f[h], s);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: i, finished: s, destroyed: a, pos: u } = this;
    return t.length = i, t.pos = u, t.finished = s, t.destroyed = a, i % e && t.buffer.set(n), t;
  }
}
const tb = (r, t, e) => r & t ^ ~r & e, eb = (r, t, e) => r & t ^ r & e ^ t & e, rb = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), an = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), on = /* @__PURE__ */ new Uint32Array(64);
class nb extends Ah {
  constructor() {
    super(64, 32, 8, !1), this.A = an[0] | 0, this.B = an[1] | 0, this.C = an[2] | 0, this.D = an[3] | 0, this.E = an[4] | 0, this.F = an[5] | 0, this.G = an[6] | 0, this.H = an[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: i, E: s, F: a, G: u, H: l } = this;
    return [t, e, n, i, s, a, u, l];
  }
  // prettier-ignore
  set(t, e, n, i, s, a, u, l) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = i | 0, this.E = s | 0, this.F = a | 0, this.G = u | 0, this.H = l | 0;
  }
  process(t, e) {
    for (let h = 0; h < 16; h++, e += 4)
      on[h] = t.getUint32(e, !1);
    for (let h = 16; h < 64; h++) {
      const b = on[h - 15], k = on[h - 2], R = pr(b, 7) ^ pr(b, 18) ^ b >>> 3, x = pr(k, 17) ^ pr(k, 19) ^ k >>> 10;
      on[h] = x + on[h - 7] + R + on[h - 16] | 0;
    }
    let { A: n, B: i, C: s, D: a, E: u, F: l, G: p, H: f } = this;
    for (let h = 0; h < 64; h++) {
      const b = pr(u, 6) ^ pr(u, 11) ^ pr(u, 25), k = f + b + tb(u, l, p) + rb[h] + on[h] | 0, x = (pr(n, 2) ^ pr(n, 13) ^ pr(n, 22)) + eb(n, i, s) | 0;
      f = p, p = l, l = u, u = a + k | 0, a = s, s = i, i = n, n = k + x | 0;
    }
    n = n + this.A | 0, i = i + this.B | 0, s = s + this.C | 0, a = a + this.D | 0, u = u + this.E | 0, l = l + this.F | 0, p = p + this.G | 0, f = f + this.H | 0, this.set(n, i, s, a, u, l, p, f);
  }
  roundClean() {
    on.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Ih = /* @__PURE__ */ F_(() => new nb()), Mo = /* @__PURE__ */ BigInt(2 ** 32 - 1), Hl = /* @__PURE__ */ BigInt(32);
function Eh(r, t = !1) {
  return t ? { h: Number(r & Mo), l: Number(r >> Hl & Mo) } : { h: Number(r >> Hl & Mo) | 0, l: Number(r & Mo) | 0 };
}
function kh(r, t = !1) {
  let e = new Uint32Array(r.length), n = new Uint32Array(r.length);
  for (let i = 0; i < r.length; i++) {
    const { h: s, l: a } = Eh(r[i], t);
    [e[i], n[i]] = [s, a];
  }
  return [e, n];
}
const ib = (r, t) => BigInt(r >>> 0) << Hl | BigInt(t >>> 0), sb = (r, t, e) => r >>> e, ab = (r, t, e) => r << 32 - e | t >>> e, ob = (r, t, e) => r >>> e | t << 32 - e, cb = (r, t, e) => r << 32 - e | t >>> e, ub = (r, t, e) => r << 64 - e | t >>> e - 32, lb = (r, t, e) => r >>> e - 32 | t << 64 - e, _b = (r, t) => t, fb = (r, t) => r, xh = (r, t, e) => r << e | t >>> 32 - e, Rh = (r, t, e) => t << e | r >>> 32 - e, Sh = (r, t, e) => t << e - 32 | r >>> 64 - e, Bh = (r, t, e) => r << e - 32 | t >>> 64 - e;
function db(r, t, e, n) {
  const i = (t >>> 0) + (n >>> 0);
  return { h: r + e + (i / 2 ** 32 | 0) | 0, l: i | 0 };
}
const pb = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0), hb = (r, t, e, n) => t + e + n + (r / 2 ** 32 | 0) | 0, gb = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0), wb = (r, t, e, n, i) => t + e + n + i + (r / 2 ** 32 | 0) | 0, yb = (r, t, e, n, i) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (i >>> 0), bb = (r, t, e, n, i, s) => t + e + n + i + s + (r / 2 ** 32 | 0) | 0, Et = {
  fromBig: Eh,
  split: kh,
  toBig: ib,
  shrSH: sb,
  shrSL: ab,
  rotrSH: ob,
  rotrSL: cb,
  rotrBH: ub,
  rotrBL: lb,
  rotr32H: _b,
  rotr32L: fb,
  rotlSH: xh,
  rotlSL: Rh,
  rotlBH: Sh,
  rotlBL: Bh,
  add: db,
  add3L: pb,
  add3H: hb,
  add4L: gb,
  add4H: wb,
  add5H: bb,
  add5L: yb
}, [mb, vb] = Et.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((r) => BigInt(r))), cn = /* @__PURE__ */ new Uint32Array(80), un = /* @__PURE__ */ new Uint32Array(80);
class Ab extends Ah {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: n, Bl: i, Ch: s, Cl: a, Dh: u, Dl: l, Eh: p, El: f, Fh: h, Fl: b, Gh: k, Gl: R, Hh: x, Hl: S } = this;
    return [t, e, n, i, s, a, u, l, p, f, h, b, k, R, x, S];
  }
  // prettier-ignore
  set(t, e, n, i, s, a, u, l, p, f, h, b, k, R, x, S) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = n | 0, this.Bl = i | 0, this.Ch = s | 0, this.Cl = a | 0, this.Dh = u | 0, this.Dl = l | 0, this.Eh = p | 0, this.El = f | 0, this.Fh = h | 0, this.Fl = b | 0, this.Gh = k | 0, this.Gl = R | 0, this.Hh = x | 0, this.Hl = S | 0;
  }
  process(t, e) {
    for (let C = 0; C < 16; C++, e += 4)
      cn[C] = t.getUint32(e), un[C] = t.getUint32(e += 4);
    for (let C = 16; C < 80; C++) {
      const U = cn[C - 15] | 0, M = un[C - 15] | 0, V = Et.rotrSH(U, M, 1) ^ Et.rotrSH(U, M, 8) ^ Et.shrSH(U, M, 7), Z = Et.rotrSL(U, M, 1) ^ Et.rotrSL(U, M, 8) ^ Et.shrSL(U, M, 7), K = cn[C - 2] | 0, tt = un[C - 2] | 0, ht = Et.rotrSH(K, tt, 19) ^ Et.rotrBH(K, tt, 61) ^ Et.shrSH(K, tt, 6), wt = Et.rotrSL(K, tt, 19) ^ Et.rotrBL(K, tt, 61) ^ Et.shrSL(K, tt, 6), kt = Et.add4L(Z, wt, un[C - 7], un[C - 16]), Nt = Et.add4H(kt, V, ht, cn[C - 7], cn[C - 16]);
      cn[C] = Nt | 0, un[C] = kt | 0;
    }
    let { Ah: n, Al: i, Bh: s, Bl: a, Ch: u, Cl: l, Dh: p, Dl: f, Eh: h, El: b, Fh: k, Fl: R, Gh: x, Gl: S, Hh: m, Hl: B } = this;
    for (let C = 0; C < 80; C++) {
      const U = Et.rotrSH(h, b, 14) ^ Et.rotrSH(h, b, 18) ^ Et.rotrBH(h, b, 41), M = Et.rotrSL(h, b, 14) ^ Et.rotrSL(h, b, 18) ^ Et.rotrBL(h, b, 41), V = h & k ^ ~h & x, Z = b & R ^ ~b & S, K = Et.add5L(B, M, Z, vb[C], un[C]), tt = Et.add5H(K, m, U, V, mb[C], cn[C]), ht = K | 0, wt = Et.rotrSH(n, i, 28) ^ Et.rotrBH(n, i, 34) ^ Et.rotrBH(n, i, 39), kt = Et.rotrSL(n, i, 28) ^ Et.rotrBL(n, i, 34) ^ Et.rotrBL(n, i, 39), Nt = n & s ^ n & u ^ s & u, jt = i & a ^ i & l ^ a & l;
      m = x | 0, B = S | 0, x = k | 0, S = R | 0, k = h | 0, R = b | 0, { h, l: b } = Et.add(p | 0, f | 0, tt | 0, ht | 0), p = u | 0, f = l | 0, u = s | 0, l = a | 0, s = n | 0, a = i | 0;
      const X = Et.add3L(ht, kt, jt);
      n = Et.add3H(X, tt, wt, Nt), i = X | 0;
    }
    ({ h: n, l: i } = Et.add(this.Ah | 0, this.Al | 0, n | 0, i | 0)), { h: s, l: a } = Et.add(this.Bh | 0, this.Bl | 0, s | 0, a | 0), { h: u, l } = Et.add(this.Ch | 0, this.Cl | 0, u | 0, l | 0), { h: p, l: f } = Et.add(this.Dh | 0, this.Dl | 0, p | 0, f | 0), { h, l: b } = Et.add(this.Eh | 0, this.El | 0, h | 0, b | 0), { h: k, l: R } = Et.add(this.Fh | 0, this.Fl | 0, k | 0, R | 0), { h: x, l: S } = Et.add(this.Gh | 0, this.Gl | 0, x | 0, S | 0), { h: m, l: B } = Et.add(this.Hh | 0, this.Hl | 0, m | 0, B | 0), this.set(n, i, s, a, u, l, p, f, h, b, k, R, x, S, m, B);
  }
  roundClean() {
    cn.fill(0), un.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Ib = /* @__PURE__ */ F_(() => new Ab());
function Eb() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof hc < "u")
    return hc;
  throw new Error("unable to locate global object");
}
const Of = Eb();
Of.crypto || Of.msCrypto;
function kb(r) {
  switch (r) {
    case "sha256":
      return Ih.create();
    case "sha512":
      return Ib.create();
  }
  N(!1, "invalid hashing algorithm name", "algorithm", r);
}
const [Ph, Oh, Th] = [[], [], []], xb = /* @__PURE__ */ BigInt(0), Da = /* @__PURE__ */ BigInt(1), Rb = /* @__PURE__ */ BigInt(2), Sb = /* @__PURE__ */ BigInt(7), Bb = /* @__PURE__ */ BigInt(256), Pb = /* @__PURE__ */ BigInt(113);
for (let r = 0, t = Da, e = 1, n = 0; r < 24; r++) {
  [e, n] = [n, (2 * e + 3 * n) % 5], Ph.push(2 * (5 * n + e)), Oh.push((r + 1) * (r + 2) / 2 % 64);
  let i = xb;
  for (let s = 0; s < 7; s++)
    t = (t << Da ^ (t >> Sb) * Pb) % Bb, t & Rb && (i ^= Da << (Da << /* @__PURE__ */ BigInt(s)) - Da);
  Th.push(i);
}
const [Ob, Tb] = /* @__PURE__ */ kh(Th, !0), Tf = (r, t, e) => e > 32 ? Sh(r, t, e) : xh(r, t, e), Nf = (r, t, e) => e > 32 ? Bh(r, t, e) : Rh(r, t, e);
function Nb(r, t = 24) {
  const e = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let a = 0; a < 10; a++)
      e[a] = r[a] ^ r[a + 10] ^ r[a + 20] ^ r[a + 30] ^ r[a + 40];
    for (let a = 0; a < 10; a += 2) {
      const u = (a + 8) % 10, l = (a + 2) % 10, p = e[l], f = e[l + 1], h = Tf(p, f, 1) ^ e[u], b = Nf(p, f, 1) ^ e[u + 1];
      for (let k = 0; k < 50; k += 10)
        r[a + k] ^= h, r[a + k + 1] ^= b;
    }
    let i = r[2], s = r[3];
    for (let a = 0; a < 24; a++) {
      const u = Oh[a], l = Tf(i, s, u), p = Nf(i, s, u), f = Ph[a];
      i = r[f], s = r[f + 1], r[f] = l, r[f + 1] = p;
    }
    for (let a = 0; a < 50; a += 10) {
      for (let u = 0; u < 10; u++)
        e[u] = r[a + u];
      for (let u = 0; u < 10; u++)
        r[a + u] ^= ~e[(u + 2) % 10] & e[(u + 4) % 10];
    }
    r[0] ^= Ob[n], r[1] ^= Tb[n];
  }
  e.fill(0);
}
let Cb = class Nh extends C_ {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, n, i = !1, s = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = n, this.enableXOF = i, this.rounds = s, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, wc(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ky(this.state);
  }
  keccak() {
    Nb(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Aa(this);
    const { blockLen: e, state: n } = this;
    t = $c(t);
    const i = t.length;
    for (let s = 0; s < i; ) {
      const a = Math.min(e - this.pos, i - s);
      for (let u = 0; u < a; u++)
        n[this.pos++] ^= t[s++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: e, pos: n, blockLen: i } = this;
    t[n] ^= e, e & 128 && n === i - 1 && this.keccak(), t[i - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    Aa(this, !1), N_(t), this.finish();
    const e = this.state, { blockLen: n } = this;
    for (let i = 0, s = t.length; i < s; ) {
      this.posOut >= n && this.keccak();
      const a = Math.min(n - this.posOut, s - i);
      t.set(e.subarray(this.posOut, this.posOut + a), i), this.posOut += a, i += a;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return wc(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (yh(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: e, suffix: n, outputLen: i, rounds: s, enableXOF: a } = this;
    return t || (t = new Nh(e, n, i, a, s)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = s, t.suffix = n, t.outputLen = i, t.enableXOF = a, t.destroyed = this.destroyed, t;
  }
};
const Fb = (r, t, e) => F_(() => new Cb(t, r, e)), zb = /* @__PURE__ */ Fb(1, 136, 256 / 8);
let Ch = !1;
const Fh = function(r) {
  return zb(r);
};
let zh = Fh;
function ne(r) {
  const t = Lt(r, "data");
  return dt(zh(t));
}
ne._ = Fh;
ne.lock = function() {
  Ch = !0;
};
ne.register = function(r) {
  if (Ch)
    throw new TypeError("keccak256 is locked");
  zh = r;
};
Object.freeze(ne);
const Lh = function(r) {
  return kb("sha256").update(r).digest();
};
let Uh = Lh, Dh = !1;
function Oa(r) {
  const t = Lt(r, "data");
  return dt(Uh(t));
}
Oa._ = Lh;
Oa.lock = function() {
  Dh = !0;
};
Oa.register = function(r) {
  if (Dh)
    throw new Error("sha256 is locked");
  Uh = r;
};
Object.freeze(Oa);
Object.freeze(Oa);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Mh = BigInt(0), qc = BigInt(1), Lb = BigInt(2), Yc = (r) => r instanceof Uint8Array, Ub = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function Ia(r) {
  if (!Yc(r))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += Ub[r[e]];
  return t;
}
function jh(r) {
  const t = r.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function z_(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return BigInt(r === "" ? "0" : `0x${r}`);
}
function Ea(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  const t = r.length;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const e = new Uint8Array(t / 2);
  for (let n = 0; n < e.length; n++) {
    const i = n * 2, s = r.slice(i, i + 2), a = Number.parseInt(s, 16);
    if (Number.isNaN(a) || a < 0)
      throw new Error("Invalid byte sequence");
    e[n] = a;
  }
  return e;
}
function Hi(r) {
  return z_(Ia(r));
}
function L_(r) {
  if (!Yc(r))
    throw new Error("Uint8Array expected");
  return z_(Ia(Uint8Array.from(r).reverse()));
}
function ka(r, t) {
  return Ea(r.toString(16).padStart(t * 2, "0"));
}
function U_(r, t) {
  return ka(r, t).reverse();
}
function Db(r) {
  return Ea(jh(r));
}
function ir(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = Ea(t);
    } catch (s) {
      throw new Error(`${r} must be valid hex string, got "${t}". Cause: ${s}`);
    }
  else if (Yc(t))
    n = Uint8Array.from(t);
  else
    throw new Error(`${r} must be hex string or Uint8Array`);
  const i = n.length;
  if (typeof e == "number" && i !== e)
    throw new Error(`${r} expected ${e} bytes, got ${i}`);
  return n;
}
function eo(...r) {
  const t = new Uint8Array(r.reduce((n, i) => n + i.length, 0));
  let e = 0;
  return r.forEach((n) => {
    if (!Yc(n))
      throw new Error("Uint8Array expected");
    t.set(n, e), e += n.length;
  }), t;
}
function Mb(r, t) {
  if (r.length !== t.length)
    return !1;
  for (let e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !1;
  return !0;
}
function jb(r) {
  if (typeof r != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function Gb(r) {
  let t;
  for (t = 0; r > Mh; r >>= qc, t += 1)
    ;
  return t;
}
function Hb(r, t) {
  return r >> BigInt(t) & qc;
}
const Vb = (r, t, e) => r | (e ? qc : Mh) << BigInt(t), D_ = (r) => (Lb << BigInt(r - 1)) - qc, rl = (r) => new Uint8Array(r), Cf = (r) => Uint8Array.from(r);
function Gh(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = rl(r), i = rl(r), s = 0;
  const a = () => {
    n.fill(1), i.fill(0), s = 0;
  }, u = (...h) => e(i, n, ...h), l = (h = rl()) => {
    i = u(Cf([0]), h), n = u(), h.length !== 0 && (i = u(Cf([1]), h), n = u());
  }, p = () => {
    if (s++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const b = [];
    for (; h < t; ) {
      n = u();
      const k = n.slice();
      b.push(k), h += n.length;
    }
    return eo(...b);
  };
  return (h, b) => {
    a(), l(h);
    let k;
    for (; !(k = b(p())); )
      l();
    return a(), k;
  };
}
const Qb = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || r instanceof Uint8Array,
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function Ro(r, t, e = {}) {
  const n = (i, s, a) => {
    const u = Qb[s];
    if (typeof u != "function")
      throw new Error(`Invalid validator "${s}", expected function`);
    const l = r[i];
    if (!(a && l === void 0) && !u(l, r))
      throw new Error(`Invalid param ${String(i)}=${l} (${typeof l}), expected ${s}`);
  };
  for (const [i, s] of Object.entries(t))
    n(i, s, !1);
  for (const [i, s] of Object.entries(e))
    n(i, s, !0);
  return r;
}
const Jb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: Hb,
  bitLen: Gb,
  bitMask: D_,
  bitSet: Vb,
  bytesToHex: Ia,
  bytesToNumberBE: Hi,
  bytesToNumberLE: L_,
  concatBytes: eo,
  createHmacDrbg: Gh,
  ensureBytes: ir,
  equalBytes: Mb,
  hexToBytes: Ea,
  hexToNumber: z_,
  numberToBytesBE: ka,
  numberToBytesLE: U_,
  numberToHexUnpadded: jh,
  numberToVarBytesBE: Db,
  utf8ToBytes: jb,
  validateObject: Ro
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ue = BigInt(0), Xt = BigInt(1), gi = BigInt(2), Wb = BigInt(3), Vl = BigInt(4), Ff = BigInt(5), zf = BigInt(8);
BigInt(9);
BigInt(16);
function Be(r, t) {
  const e = r % t;
  return e >= ue ? e : t + e;
}
function Kb(r, t, e) {
  if (e <= ue || t < ue)
    throw new Error("Expected power/modulo > 0");
  if (e === Xt)
    return ue;
  let n = Xt;
  for (; t > ue; )
    t & Xt && (n = n * r % e), r = r * r % e, t >>= Xt;
  return n;
}
function je(r, t, e) {
  let n = r;
  for (; t-- > ue; )
    n *= n, n %= e;
  return n;
}
function Ql(r, t) {
  if (r === ue || t <= ue)
    throw new Error(`invert: expected positive integers, got n=${r} mod=${t}`);
  let e = Be(r, t), n = t, i = ue, s = Xt;
  for (; e !== ue; ) {
    const u = n / e, l = n % e, p = i - s * u;
    n = e, e = l, i = s, s = p;
  }
  if (n !== Xt)
    throw new Error("invert: does not exist");
  return Be(i, t);
}
function $b(r) {
  const t = (r - Xt) / gi;
  let e, n, i;
  for (e = r - Xt, n = 0; e % gi === ue; e /= gi, n++)
    ;
  for (i = gi; i < r && Kb(i, t, r) !== r - Xt; i++)
    ;
  if (n === 1) {
    const a = (r + Xt) / Vl;
    return function(l, p) {
      const f = l.pow(p, a);
      if (!l.eql(l.sqr(f), p))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  const s = (e + Xt) / gi;
  return function(u, l) {
    if (u.pow(l, t) === u.neg(u.ONE))
      throw new Error("Cannot find square root");
    let p = n, f = u.pow(u.mul(u.ONE, i), e), h = u.pow(l, s), b = u.pow(l, e);
    for (; !u.eql(b, u.ONE); ) {
      if (u.eql(b, u.ZERO))
        return u.ZERO;
      let k = 1;
      for (let x = u.sqr(b); k < p && !u.eql(x, u.ONE); k++)
        x = u.sqr(x);
      const R = u.pow(f, Xt << BigInt(p - k - 1));
      f = u.sqr(R), h = u.mul(h, R), b = u.mul(b, f), p = k;
    }
    return h;
  };
}
function qb(r) {
  if (r % Vl === Wb) {
    const t = (r + Xt) / Vl;
    return function(n, i) {
      const s = n.pow(i, t);
      if (!n.eql(n.sqr(s), i))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (r % zf === Ff) {
    const t = (r - Ff) / zf;
    return function(n, i) {
      const s = n.mul(i, gi), a = n.pow(s, t), u = n.mul(i, a), l = n.mul(n.mul(u, gi), a), p = n.mul(u, n.sub(l, n.ONE));
      if (!n.eql(n.sqr(p), i))
        throw new Error("Cannot find square root");
      return p;
    };
  }
  return $b(r);
}
const Yb = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function Zb(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Yb.reduce((n, i) => (n[i] = "function", n), t);
  return Ro(r, e);
}
function Xb(r, t, e) {
  if (e < ue)
    throw new Error("Expected power > 0");
  if (e === ue)
    return r.ONE;
  if (e === Xt)
    return t;
  let n = r.ONE, i = t;
  for (; e > ue; )
    e & Xt && (n = r.mul(n, i)), i = r.sqr(i), e >>= Xt;
  return n;
}
function t0(r, t) {
  const e = new Array(t.length), n = t.reduce((s, a, u) => r.is0(a) ? s : (e[u] = s, r.mul(s, a)), r.ONE), i = r.inv(n);
  return t.reduceRight((s, a, u) => r.is0(a) ? s : (e[u] = r.mul(s, e[u]), r.mul(s, a)), i), e;
}
function Hh(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function e0(r, t, e = !1, n = {}) {
  if (r <= ue)
    throw new Error(`Expected Field ORDER > 0, got ${r}`);
  const { nBitLength: i, nByteLength: s } = Hh(r, t);
  if (s > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const a = qb(r), u = Object.freeze({
    ORDER: r,
    BITS: i,
    BYTES: s,
    MASK: D_(i),
    ZERO: ue,
    ONE: Xt,
    create: (l) => Be(l, r),
    isValid: (l) => {
      if (typeof l != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof l}`);
      return ue <= l && l < r;
    },
    is0: (l) => l === ue,
    isOdd: (l) => (l & Xt) === Xt,
    neg: (l) => Be(-l, r),
    eql: (l, p) => l === p,
    sqr: (l) => Be(l * l, r),
    add: (l, p) => Be(l + p, r),
    sub: (l, p) => Be(l - p, r),
    mul: (l, p) => Be(l * p, r),
    pow: (l, p) => Xb(u, l, p),
    div: (l, p) => Be(l * Ql(p, r), r),
    // Same as above, but doesn't normalize
    sqrN: (l) => l * l,
    addN: (l, p) => l + p,
    subN: (l, p) => l - p,
    mulN: (l, p) => l * p,
    inv: (l) => Ql(l, r),
    sqrt: n.sqrt || ((l) => a(u, l)),
    invertBatch: (l) => t0(u, l),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (l, p, f) => f ? p : l,
    toBytes: (l) => e ? U_(l, s) : ka(l, s),
    fromBytes: (l) => {
      if (l.length !== s)
        throw new Error(`Fp.fromBytes: expected ${s}, got ${l.length}`);
      return e ? L_(l) : Hi(l);
    }
  });
  return Object.freeze(u);
}
function Vh(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function Qh(r) {
  const t = Vh(r);
  return t + Math.ceil(t / 2);
}
function r0(r, t, e = !1) {
  const n = r.length, i = Vh(t), s = Qh(t);
  if (n < 16 || n < s || n > 1024)
    throw new Error(`expected ${s}-1024 bytes of input, got ${n}`);
  const a = e ? Hi(r) : L_(r), u = Be(a, t - Xt) + Xt;
  return e ? U_(u, i) : ka(u, i);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const n0 = BigInt(0), nl = BigInt(1);
function i0(r, t) {
  const e = (i, s) => {
    const a = s.negate();
    return i ? a : s;
  }, n = (i) => {
    const s = Math.ceil(t / i) + 1, a = 2 ** (i - 1);
    return { windows: s, windowSize: a };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(i, s) {
      let a = r.ZERO, u = i;
      for (; s > n0; )
        s & nl && (a = a.add(u)), u = u.double(), s >>= nl;
      return a;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(i, s) {
      const { windows: a, windowSize: u } = n(s), l = [];
      let p = i, f = p;
      for (let h = 0; h < a; h++) {
        f = p, l.push(f);
        for (let b = 1; b < u; b++)
          f = f.add(p), l.push(f);
        p = f.double();
      }
      return l;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(i, s, a) {
      const { windows: u, windowSize: l } = n(i);
      let p = r.ZERO, f = r.BASE;
      const h = BigInt(2 ** i - 1), b = 2 ** i, k = BigInt(i);
      for (let R = 0; R < u; R++) {
        const x = R * l;
        let S = Number(a & h);
        a >>= k, S > l && (S -= b, a += nl);
        const m = x, B = x + Math.abs(S) - 1, C = R % 2 !== 0, U = S < 0;
        S === 0 ? f = f.add(e(C, s[m])) : p = p.add(e(U, s[B]));
      }
      return { p, f };
    },
    wNAFCached(i, s, a, u) {
      const l = i._WINDOW_SIZE || 1;
      let p = s.get(i);
      return p || (p = this.precomputeWindow(i, l), l !== 1 && s.set(i, u(p))), this.wNAF(l, p, a);
    }
  };
}
function Jh(r) {
  return Zb(r.Fp), Ro(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Hh(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function s0(r) {
  const t = Jh(r);
  Ro(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: n, a: i } = t;
  if (e) {
    if (!n.eql(i, n.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: a0, hexToBytes: o0 } = Jb, bi = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(r) {
    const { Err: t } = bi;
    if (r.length < 2 || r[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = r[1], n = r.subarray(2, e + 2);
    if (!e || n.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (n[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (n[0] === 0 && !(n[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: a0(n), l: r.subarray(e + 2) };
  },
  toSig(r) {
    const { Err: t } = bi, e = typeof r == "string" ? o0(r) : r;
    if (!(e instanceof Uint8Array))
      throw new Error("ui8a expected");
    let n = e.length;
    if (n < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== n - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: i, l: s } = bi._parseInt(e.subarray(2)), { d: a, l: u } = bi._parseInt(s);
    if (u.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: i, s: a };
  },
  hexFromSig(r) {
    const t = (p) => Number.parseInt(p[0], 16) & 8 ? "00" + p : p, e = (p) => {
      const f = p.toString(16);
      return f.length & 1 ? `0${f}` : f;
    }, n = t(e(r.s)), i = t(e(r.r)), s = n.length / 2, a = i.length / 2, u = e(s), l = e(a);
    return `30${e(a + s + 4)}02${l}${i}02${u}${n}`;
  }
}, Kr = BigInt(0), $e = BigInt(1);
BigInt(2);
const Lf = BigInt(3);
BigInt(4);
function c0(r) {
  const t = s0(r), { Fp: e } = t, n = t.toBytes || ((R, x, S) => {
    const m = x.toAffine();
    return eo(Uint8Array.from([4]), e.toBytes(m.x), e.toBytes(m.y));
  }), i = t.fromBytes || ((R) => {
    const x = R.subarray(1), S = e.fromBytes(x.subarray(0, e.BYTES)), m = e.fromBytes(x.subarray(e.BYTES, 2 * e.BYTES));
    return { x: S, y: m };
  });
  function s(R) {
    const { a: x, b: S } = t, m = e.sqr(R), B = e.mul(m, R);
    return e.add(e.add(B, e.mul(R, x)), S);
  }
  if (!e.eql(e.sqr(t.Gy), s(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(R) {
    return typeof R == "bigint" && Kr < R && R < t.n;
  }
  function u(R) {
    if (!a(R))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function l(R) {
    const { allowedPrivateKeyLengths: x, nByteLength: S, wrapPrivateKey: m, n: B } = t;
    if (x && typeof R != "bigint") {
      if (R instanceof Uint8Array && (R = Ia(R)), typeof R != "string" || !x.includes(R.length))
        throw new Error("Invalid key");
      R = R.padStart(S * 2, "0");
    }
    let C;
    try {
      C = typeof R == "bigint" ? R : Hi(ir("private key", R, S));
    } catch {
      throw new Error(`private key must be ${S} bytes, hex or bigint, not ${typeof R}`);
    }
    return m && (C = Be(C, B)), u(C), C;
  }
  const p = /* @__PURE__ */ new Map();
  function f(R) {
    if (!(R instanceof h))
      throw new Error("ProjectivePoint expected");
  }
  class h {
    constructor(x, S, m) {
      if (this.px = x, this.py = S, this.pz = m, x == null || !e.isValid(x))
        throw new Error("x required");
      if (S == null || !e.isValid(S))
        throw new Error("y required");
      if (m == null || !e.isValid(m))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(x) {
      const { x: S, y: m } = x || {};
      if (!x || !e.isValid(S) || !e.isValid(m))
        throw new Error("invalid affine point");
      if (x instanceof h)
        throw new Error("projective point not allowed");
      const B = (C) => e.eql(C, e.ZERO);
      return B(S) && B(m) ? h.ZERO : new h(S, m, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(x) {
      const S = e.invertBatch(x.map((m) => m.pz));
      return x.map((m, B) => m.toAffine(S[B])).map(h.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(x) {
      const S = h.fromAffine(i(ir("pointHex", x)));
      return S.assertValidity(), S;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(x) {
      return h.BASE.multiply(l(x));
    }
    // "Private method", don't use it directly
    _setWindowSize(x) {
      this._WINDOW_SIZE = x, p.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y: S } = this.toAffine();
      if (!e.isValid(x) || !e.isValid(S))
        throw new Error("bad point: x or y not FE");
      const m = e.sqr(S), B = s(x);
      if (!e.eql(m, B))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: x } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(x);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(x) {
      f(x);
      const { px: S, py: m, pz: B } = this, { px: C, py: U, pz: M } = x, V = e.eql(e.mul(S, M), e.mul(C, B)), Z = e.eql(e.mul(m, M), e.mul(U, B));
      return V && Z;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new h(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: x, b: S } = t, m = e.mul(S, Lf), { px: B, py: C, pz: U } = this;
      let M = e.ZERO, V = e.ZERO, Z = e.ZERO, K = e.mul(B, B), tt = e.mul(C, C), ht = e.mul(U, U), wt = e.mul(B, C);
      return wt = e.add(wt, wt), Z = e.mul(B, U), Z = e.add(Z, Z), M = e.mul(x, Z), V = e.mul(m, ht), V = e.add(M, V), M = e.sub(tt, V), V = e.add(tt, V), V = e.mul(M, V), M = e.mul(wt, M), Z = e.mul(m, Z), ht = e.mul(x, ht), wt = e.sub(K, ht), wt = e.mul(x, wt), wt = e.add(wt, Z), Z = e.add(K, K), K = e.add(Z, K), K = e.add(K, ht), K = e.mul(K, wt), V = e.add(V, K), ht = e.mul(C, U), ht = e.add(ht, ht), K = e.mul(ht, wt), M = e.sub(M, K), Z = e.mul(ht, tt), Z = e.add(Z, Z), Z = e.add(Z, Z), new h(M, V, Z);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(x) {
      f(x);
      const { px: S, py: m, pz: B } = this, { px: C, py: U, pz: M } = x;
      let V = e.ZERO, Z = e.ZERO, K = e.ZERO;
      const tt = t.a, ht = e.mul(t.b, Lf);
      let wt = e.mul(S, C), kt = e.mul(m, U), Nt = e.mul(B, M), jt = e.add(S, m), X = e.add(C, U);
      jt = e.mul(jt, X), X = e.add(wt, kt), jt = e.sub(jt, X), X = e.add(S, B);
      let at = e.add(C, M);
      return X = e.mul(X, at), at = e.add(wt, Nt), X = e.sub(X, at), at = e.add(m, B), V = e.add(U, M), at = e.mul(at, V), V = e.add(kt, Nt), at = e.sub(at, V), K = e.mul(tt, X), V = e.mul(ht, Nt), K = e.add(V, K), V = e.sub(kt, K), K = e.add(kt, K), Z = e.mul(V, K), kt = e.add(wt, wt), kt = e.add(kt, wt), Nt = e.mul(tt, Nt), X = e.mul(ht, X), kt = e.add(kt, Nt), Nt = e.sub(wt, Nt), Nt = e.mul(tt, Nt), X = e.add(X, Nt), wt = e.mul(kt, X), Z = e.add(Z, wt), wt = e.mul(at, X), V = e.mul(jt, V), V = e.sub(V, wt), wt = e.mul(jt, kt), K = e.mul(at, K), K = e.add(K, wt), new h(V, Z, K);
    }
    subtract(x) {
      return this.add(x.negate());
    }
    is0() {
      return this.equals(h.ZERO);
    }
    wNAF(x) {
      return k.wNAFCached(this, p, x, (S) => {
        const m = e.invertBatch(S.map((B) => B.pz));
        return S.map((B, C) => B.toAffine(m[C])).map(h.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(x) {
      const S = h.ZERO;
      if (x === Kr)
        return S;
      if (u(x), x === $e)
        return this;
      const { endo: m } = t;
      if (!m)
        return k.unsafeLadder(this, x);
      let { k1neg: B, k1: C, k2neg: U, k2: M } = m.splitScalar(x), V = S, Z = S, K = this;
      for (; C > Kr || M > Kr; )
        C & $e && (V = V.add(K)), M & $e && (Z = Z.add(K)), K = K.double(), C >>= $e, M >>= $e;
      return B && (V = V.negate()), U && (Z = Z.negate()), Z = new h(e.mul(Z.px, m.beta), Z.py, Z.pz), V.add(Z);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(x) {
      u(x);
      let S = x, m, B;
      const { endo: C } = t;
      if (C) {
        const { k1neg: U, k1: M, k2neg: V, k2: Z } = C.splitScalar(S);
        let { p: K, f: tt } = this.wNAF(M), { p: ht, f: wt } = this.wNAF(Z);
        K = k.constTimeNegate(U, K), ht = k.constTimeNegate(V, ht), ht = new h(e.mul(ht.px, C.beta), ht.py, ht.pz), m = K.add(ht), B = tt.add(wt);
      } else {
        const { p: U, f: M } = this.wNAF(S);
        m = U, B = M;
      }
      return h.normalizeZ([m, B])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(x, S, m) {
      const B = h.BASE, C = (M, V) => V === Kr || V === $e || !M.equals(B) ? M.multiplyUnsafe(V) : M.multiply(V), U = C(this, S).add(C(x, m));
      return U.is0() ? void 0 : U;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(x) {
      const { px: S, py: m, pz: B } = this, C = this.is0();
      x == null && (x = C ? e.ONE : e.inv(B));
      const U = e.mul(S, x), M = e.mul(m, x), V = e.mul(B, x);
      if (C)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(V, e.ONE))
        throw new Error("invZ was invalid");
      return { x: U, y: M };
    }
    isTorsionFree() {
      const { h: x, isTorsionFree: S } = t;
      if (x === $e)
        return !0;
      if (S)
        return S(h, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: x, clearCofactor: S } = t;
      return x === $e ? this : S ? S(h, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(x = !0) {
      return this.assertValidity(), n(h, this, x);
    }
    toHex(x = !0) {
      return Ia(this.toRawBytes(x));
    }
  }
  h.BASE = new h(t.Gx, t.Gy, e.ONE), h.ZERO = new h(e.ZERO, e.ONE, e.ZERO);
  const b = t.nBitLength, k = i0(h, t.endo ? Math.ceil(b / 2) : b);
  return {
    CURVE: t,
    ProjectivePoint: h,
    normPrivateKeyToScalar: l,
    weierstrassEquation: s,
    isWithinCurveOrder: a
  };
}
function u0(r) {
  const t = Jh(r);
  return Ro(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function l0(r) {
  const t = u0(r), { Fp: e, n } = t, i = e.BYTES + 1, s = 2 * e.BYTES + 1;
  function a(X) {
    return Kr < X && X < e.ORDER;
  }
  function u(X) {
    return Be(X, n);
  }
  function l(X) {
    return Ql(X, n);
  }
  const { ProjectivePoint: p, normPrivateKeyToScalar: f, weierstrassEquation: h, isWithinCurveOrder: b } = c0({
    ...t,
    toBytes(X, at, gt) {
      const At = at.toAffine(), vt = e.toBytes(At.x), Ct = eo;
      return gt ? Ct(Uint8Array.from([at.hasEvenY() ? 2 : 3]), vt) : Ct(Uint8Array.from([4]), vt, e.toBytes(At.y));
    },
    fromBytes(X) {
      const at = X.length, gt = X[0], At = X.subarray(1);
      if (at === i && (gt === 2 || gt === 3)) {
        const vt = Hi(At);
        if (!a(vt))
          throw new Error("Point is not on curve");
        const Ct = h(vt);
        let Vt = e.sqrt(Ct);
        const F = (Vt & $e) === $e;
        return (gt & 1) === 1 !== F && (Vt = e.neg(Vt)), { x: vt, y: Vt };
      } else if (at === s && gt === 4) {
        const vt = e.fromBytes(At.subarray(0, e.BYTES)), Ct = e.fromBytes(At.subarray(e.BYTES, 2 * e.BYTES));
        return { x: vt, y: Ct };
      } else
        throw new Error(`Point of length ${at} was invalid. Expected ${i} compressed bytes or ${s} uncompressed bytes`);
    }
  }), k = (X) => Ia(ka(X, t.nByteLength));
  function R(X) {
    const at = n >> $e;
    return X > at;
  }
  function x(X) {
    return R(X) ? u(-X) : X;
  }
  const S = (X, at, gt) => Hi(X.slice(at, gt));
  class m {
    constructor(at, gt, At) {
      this.r = at, this.s = gt, this.recovery = At, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(at) {
      const gt = t.nByteLength;
      return at = ir("compactSignature", at, gt * 2), new m(S(at, 0, gt), S(at, gt, 2 * gt));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(at) {
      const { r: gt, s: At } = bi.toSig(ir("DER", at));
      return new m(gt, At);
    }
    assertValidity() {
      if (!b(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!b(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(at) {
      return new m(this.r, this.s, at);
    }
    recoverPublicKey(at) {
      const { r: gt, s: At, recovery: vt } = this, Ct = Z(ir("msgHash", at));
      if (vt == null || ![0, 1, 2, 3].includes(vt))
        throw new Error("recovery id invalid");
      const Vt = vt === 2 || vt === 3 ? gt + t.n : gt;
      if (Vt >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const F = vt & 1 ? "03" : "02", H = p.fromHex(F + k(Vt)), Q = l(Vt), lt = u(-Ct * Q), T = u(At * Q), O = p.BASE.multiplyAndAddUnsafe(H, lt, T);
      if (!O)
        throw new Error("point at infinify");
      return O.assertValidity(), O;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return R(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new m(this.r, u(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Ea(this.toDERHex());
    }
    toDERHex() {
      return bi.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Ea(this.toCompactHex());
    }
    toCompactHex() {
      return k(this.r) + k(this.s);
    }
  }
  const B = {
    isValidPrivateKey(X) {
      try {
        return f(X), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: f,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const X = Qh(t.n);
      return r0(t.randomBytes(X), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(X = 8, at = p.BASE) {
      return at._setWindowSize(X), at.multiply(BigInt(3)), at;
    }
  };
  function C(X, at = !0) {
    return p.fromPrivateKey(X).toRawBytes(at);
  }
  function U(X) {
    const at = X instanceof Uint8Array, gt = typeof X == "string", At = (at || gt) && X.length;
    return at ? At === i || At === s : gt ? At === 2 * i || At === 2 * s : X instanceof p;
  }
  function M(X, at, gt = !0) {
    if (U(X))
      throw new Error("first arg must be private key");
    if (!U(at))
      throw new Error("second arg must be public key");
    return p.fromHex(at).multiply(f(X)).toRawBytes(gt);
  }
  const V = t.bits2int || function(X) {
    const at = Hi(X), gt = X.length * 8 - t.nBitLength;
    return gt > 0 ? at >> BigInt(gt) : at;
  }, Z = t.bits2int_modN || function(X) {
    return u(V(X));
  }, K = D_(t.nBitLength);
  function tt(X) {
    if (typeof X != "bigint")
      throw new Error("bigint expected");
    if (!(Kr <= X && X < K))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return ka(X, t.nByteLength);
  }
  function ht(X, at, gt = wt) {
    if (["recovered", "canonical"].some((Y) => Y in gt))
      throw new Error("sign() legacy options not supported");
    const { hash: At, randomBytes: vt } = t;
    let { lowS: Ct, prehash: Vt, extraEntropy: F } = gt;
    Ct == null && (Ct = !0), X = ir("msgHash", X), Vt && (X = ir("prehashed msgHash", At(X)));
    const H = Z(X), Q = f(at), lt = [tt(Q), tt(H)];
    if (F != null) {
      const Y = F === !0 ? vt(e.BYTES) : F;
      lt.push(ir("extraEntropy", Y));
    }
    const T = eo(...lt), O = H;
    function G(Y) {
      const ot = V(Y);
      if (!b(ot))
        return;
      const v = l(ot), I = p.BASE.multiply(ot).toAffine(), J = u(I.x);
      if (J === Kr)
        return;
      const nt = u(v * u(O + J * Q));
      if (nt === Kr)
        return;
      let Pt = (I.x === J ? 0 : 2) | Number(I.y & $e), yt = nt;
      return Ct && R(nt) && (yt = x(nt), Pt ^= 1), new m(J, yt, Pt);
    }
    return { seed: T, k2sig: G };
  }
  const wt = { lowS: t.lowS, prehash: !1 }, kt = { lowS: t.lowS, prehash: !1 };
  function Nt(X, at, gt = wt) {
    const { seed: At, k2sig: vt } = ht(X, at, gt), Ct = t;
    return Gh(Ct.hash.outputLen, Ct.nByteLength, Ct.hmac)(At, vt);
  }
  p.BASE._setWindowSize(8);
  function jt(X, at, gt, At = kt) {
    var I;
    const vt = X;
    if (at = ir("msgHash", at), gt = ir("publicKey", gt), "strict" in At)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: Ct, prehash: Vt } = At;
    let F, H;
    try {
      if (typeof vt == "string" || vt instanceof Uint8Array)
        try {
          F = m.fromDER(vt);
        } catch (J) {
          if (!(J instanceof bi.Err))
            throw J;
          F = m.fromCompact(vt);
        }
      else if (typeof vt == "object" && typeof vt.r == "bigint" && typeof vt.s == "bigint") {
        const { r: J, s: nt } = vt;
        F = new m(J, nt);
      } else
        throw new Error("PARSE");
      H = p.fromHex(gt);
    } catch (J) {
      if (J.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (Ct && F.hasHighS())
      return !1;
    Vt && (at = t.hash(at));
    const { r: Q, s: lt } = F, T = Z(at), O = l(lt), G = u(T * O), Y = u(Q * O), ot = (I = p.BASE.multiplyAndAddUnsafe(H, G, Y)) == null ? void 0 : I.toAffine();
    return ot ? u(ot.x) === Q : !1;
  }
  return {
    CURVE: t,
    getPublicKey: C,
    getSharedSecret: M,
    sign: Nt,
    verify: jt,
    ProjectivePoint: p,
    Signature: m,
    utils: B
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function _0(r) {
  return {
    hash: r,
    hmac: (t, ...e) => vh(r, t, Yy(...e)),
    randomBytes: Zy
  };
}
function f0(r, t) {
  const e = (n) => l0({ ...r, ..._0(n) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Wh = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Uf = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), d0 = BigInt(1), Jl = BigInt(2), Df = (r, t) => (r + t / Jl) / t;
function p0(r) {
  const t = Wh, e = BigInt(3), n = BigInt(6), i = BigInt(11), s = BigInt(22), a = BigInt(23), u = BigInt(44), l = BigInt(88), p = r * r * r % t, f = p * p * r % t, h = je(f, e, t) * f % t, b = je(h, e, t) * f % t, k = je(b, Jl, t) * p % t, R = je(k, i, t) * k % t, x = je(R, s, t) * R % t, S = je(x, u, t) * x % t, m = je(S, l, t) * S % t, B = je(m, u, t) * x % t, C = je(B, e, t) * f % t, U = je(C, a, t) * R % t, M = je(U, n, t) * p % t, V = je(M, Jl, t);
  if (!Wl.eql(Wl.sqr(V), r))
    throw new Error("Cannot find square root");
  return V;
}
const Wl = e0(Wh, void 0, void 0, { sqrt: p0 }), ln = f0({
  a: BigInt(0),
  b: BigInt(7),
  Fp: Wl,
  n: Uf,
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: !0,
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (r) => {
      const t = Uf, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -d0 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), s = e, a = BigInt("0x100000000000000000000000000000000"), u = Df(s * r, t), l = Df(-n * r, t);
      let p = Be(r - u * e - l * i, t), f = Be(-u * n - l * s, t);
      const h = p > a, b = f > a;
      if (h && (p = t - p), b && (f = t - f), p > a || f > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + r);
      return { k1neg: h, k1: p, k2neg: b, k2: f };
    }
  }
}, Ih);
BigInt(0);
ln.ProjectivePoint;
const ro = "0x0000000000000000000000000000000000000000", Mf = "0x0000000000000000000000000000000000000000000000000000000000000000", jf = BigInt(0), Gf = BigInt(1), Hf = BigInt(2), Vf = BigInt(27), Qf = BigInt(28), jo = BigInt(35), cs = {};
function Jf(r) {
  return Yi(Ie(r), 32);
}
var Hs, Vs, Qs, Ti;
const nr = class nr {
  /**
   *  @private
   */
  constructor(t, e, n, i) {
    D(this, Hs);
    D(this, Vs);
    D(this, Qs);
    D(this, Ti);
    Qc(t, cs, "Signature"), E(this, Hs, e), E(this, Vs, n), E(this, Qs, i), E(this, Ti, null);
  }
  /**
   *  The ``r`` value for a signautre.
   *
   *  This represents the ``x`` coordinate of a "reference" or
   *  challenge point, from which the ``y`` can be computed.
   */
  get r() {
    return g(this, Hs);
  }
  set r(t) {
    N(xs(t) === 32, "invalid r", "value", t), E(this, Hs, dt(t));
  }
  /**
   *  The ``s`` value for a signature.
   */
  get s() {
    return g(this, Vs);
  }
  set s(t) {
    N(xs(t) === 32, "invalid s", "value", t);
    const e = dt(t);
    N(parseInt(e.substring(0, 3)) < 8, "non-canonical s", "value", e), E(this, Vs, e);
  }
  /**
   *  The ``v`` value for a signature.
   *
   *  Since a given ``x`` value for ``r`` has two possible values for
   *  its correspondin ``y``, the ``v`` indicates which of the two ``y``
   *  values to use.
   *
   *  It is normalized to the values ``27`` or ``28`` for legacy
   *  purposes.
   */
  get v() {
    return g(this, Qs);
  }
  set v(t) {
    const e = Rt(t, "value");
    N(e === 27 || e === 28, "invalid v", "v", t), E(this, Qs, e);
  }
  /**
   *  The EIP-155 ``v`` for legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get networkV() {
    return g(this, Ti);
  }
  /**
   *  The chain ID for EIP-155 legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get legacyChainId() {
    const t = this.networkV;
    return t == null ? null : nr.getChainId(t);
  }
  /**
   *  The ``yParity`` for the signature.
   *
   *  See ``v`` for more details on how this value is used.
   */
  get yParity() {
    return this.v === 27 ? 0 : 1;
  }
  /**
   *  The [[link-eip-2098]] compact representation of the ``yParity``
   *  and ``s`` compacted into a single ``bytes32``.
   */
  get yParityAndS() {
    const t = Lt(this.s);
    return this.yParity && (t[0] |= 128), dt(t);
  }
  /**
   *  The [[link-eip-2098]] compact representation.
   */
  get compactSerialized() {
    return ee([this.r, this.yParityAndS]);
  }
  /**
   *  The serialized representation.
   */
  get serialized() {
    return ee([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Signature { r: "${this.r}", s: "${this.s}", yParity: ${this.yParity}, networkV: ${this.networkV} }`;
  }
  /**
   *  Returns a new identical [[Signature]].
   */
  clone() {
    const t = new nr(cs, this.r, this.s, this.v);
    return this.networkV && E(t, Ti, this.networkV), t;
  }
  /**
   *  Returns a representation that is compatible with ``JSON.stringify``.
   */
  toJSON() {
    const t = this.networkV;
    return {
      _type: "signature",
      networkV: t != null ? t.toString() : null,
      r: this.r,
      s: this.s,
      v: this.v
    };
  }
  /**
   *  Compute the chain ID from the ``v`` in a legacy EIP-155 transactions.
   *
   *  @example:
   *    Signature.getChainId(45)
   *    //_result:
   *
   *    Signature.getChainId(46)
   *    //_result:
   */
  static getChainId(t) {
    const e = pt(t, "v");
    return e == Vf || e == Qf ? jf : (N(e >= jo, "invalid EIP-155 v", "v", t), (e - jo) / Hf);
  }
  /**
   *  Compute the ``v`` for a chain ID for a legacy EIP-155 transactions.
   *
   *  Legacy transactions which use [[link-eip-155]] hijack the ``v``
   *  property to include the chain ID.
   *
   *  @example:
   *    Signature.getChainIdV(5, 27)
   *    //_result:
   *
   *    Signature.getChainIdV(5, 28)
   *    //_result:
   *
   */
  static getChainIdV(t, e) {
    return pt(t) * Hf + BigInt(35 + e - 27);
  }
  /**
   *  Compute the normalized legacy transaction ``v`` from a ``yParirty``,
   *  a legacy transaction ``v`` or a legacy [[link-eip-155]] transaction.
   *
   *  @example:
   *    // The values 0 and 1 imply v is actually yParity
   *    Signature.getNormalizedV(0)
   *    //_result:
   *
   *    // Legacy non-EIP-1559 transaction (i.e. 27 or 28)
   *    Signature.getNormalizedV(27)
   *    //_result:
   *
   *    // Legacy EIP-155 transaction (i.e. >= 35)
   *    Signature.getNormalizedV(46)
   *    //_result:
   *
   *    // Invalid values throw
   *    Signature.getNormalizedV(5)
   *    //_error:
   */
  static getNormalizedV(t) {
    const e = pt(t);
    return e === jf || e === Vf ? 27 : e === Gf || e === Qf ? 28 : (N(e >= jo, "invalid v", "v", t), e & Gf ? 27 : 28);
  }
  /**
   *  Creates a new [[Signature]].
   *
   *  If no %%sig%% is provided, a new [[Signature]] is created
   *  with default values.
   *
   *  If %%sig%% is a string, it is parsed.
   */
  static from(t) {
    function e(p, f) {
      N(p, f, "signature", t);
    }
    if (t == null)
      return new nr(cs, Mf, Mf, 27);
    if (typeof t == "string") {
      const p = Lt(t, "signature");
      if (p.length === 64) {
        const f = dt(p.slice(0, 32)), h = p.slice(32, 64), b = h[0] & 128 ? 28 : 27;
        return h[0] &= 127, new nr(cs, f, dt(h), b);
      }
      if (p.length === 65) {
        const f = dt(p.slice(0, 32)), h = p.slice(32, 64);
        e((h[0] & 128) === 0, "non-canonical s");
        const b = nr.getNormalizedV(p[64]);
        return new nr(cs, f, dt(h), b);
      }
      e(!1, "invalid raw signature length");
    }
    if (t instanceof nr)
      return t.clone();
    const n = t.r;
    e(n != null, "missing r");
    const i = Jf(n), s = function(p, f) {
      if (p != null)
        return Jf(p);
      if (f != null) {
        e(Wt(f, 32), "invalid yParityAndS");
        const h = Lt(f);
        return h[0] &= 127, dt(h);
      }
      e(!1, "missing s");
    }(t.s, t.yParityAndS);
    e((Lt(s)[0] & 128) == 0, "non-canonical s");
    const { networkV: a, v: u } = function(p, f, h) {
      if (p != null) {
        const b = pt(p);
        return {
          networkV: b >= jo ? b : void 0,
          v: nr.getNormalizedV(b)
        };
      }
      if (f != null)
        return e(Wt(f, 32), "invalid yParityAndS"), { v: Lt(f)[0] & 128 ? 28 : 27 };
      if (h != null) {
        switch (Rt(h, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        e(!1, "invalid yParity");
      }
      e(!1, "missing v");
    }(t.v, t.yParityAndS, t.yParity), l = new nr(cs, i, s, u);
    return a && E(l, Ti, a), e(t.yParity == null || Rt(t.yParity, "sig.yParity") === l.yParity, "yParity mismatch"), e(t.yParityAndS == null || t.yParityAndS === l.yParityAndS, "yParityAndS mismatch"), l;
  }
};
Hs = new WeakMap(), Vs = new WeakMap(), Qs = new WeakMap(), Ti = new WeakMap();
let _r = nr;
var Dr;
const wi = class wi {
  /**
   *  Creates a new **SigningKey** for %%privateKey%%.
   */
  constructor(t) {
    D(this, Dr);
    N(xs(t) === 32, "invalid private key", "privateKey", "[REDACTED]"), E(this, Dr, dt(t));
  }
  /**
   *  The private key.
   */
  get privateKey() {
    return g(this, Dr);
  }
  /**
   *  The uncompressed public key.
   *
   * This will always begin with the prefix ``0x04`` and be 132
   * characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
   */
  get publicKey() {
    return wi.computePublicKey(g(this, Dr));
  }
  /**
   *  The compressed public key.
   *
   *  This will always begin with either the prefix ``0x02`` or ``0x03``
   *  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
   *  nibbles)
   */
  get compressedPublicKey() {
    return wi.computePublicKey(g(this, Dr), !0);
  }
  /**
   *  Return the signature of the signed %%digest%%.
   */
  sign(t) {
    N(xs(t) === 32, "invalid digest length", "digest", t);
    const e = ln.sign(Ae(t), Ae(g(this, Dr)), {
      lowS: !0
    });
    return _r.from({
      r: oi(e.r, 32),
      s: oi(e.s, 32),
      v: e.recovery ? 28 : 27
    });
  }
  /**
   *  Returns the [[link-wiki-ecdh]] shared secret between this
   *  private key and the %%other%% key.
   *
   *  The %%other%% key may be any type of key, a raw public key,
   *  a compressed/uncompressed pubic key or aprivate key.
   *
   *  Best practice is usually to use a cryptographic hash on the
   *  returned value before using it as a symetric secret.
   *
   *  @example:
   *    sign1 = new SigningKey(id("some-secret-1"))
   *    sign2 = new SigningKey(id("some-secret-2"))
   *
   *    // Notice that privA.computeSharedSecret(pubB)...
   *    sign1.computeSharedSecret(sign2.publicKey)
   *    //_result:
   *
   *    // ...is equal to privB.computeSharedSecret(pubA).
   *    sign2.computeSharedSecret(sign1.publicKey)
   *    //_result:
   */
  computeSharedSecret(t) {
    const e = wi.computePublicKey(t);
    return dt(ln.getSharedSecret(Ae(g(this, Dr)), Lt(e), !1));
  }
  /**
   *  Compute the public key for %%key%%, optionally %%compressed%%.
   *
   *  The %%key%% may be any type of key, a raw public key, a
   *  compressed/uncompressed public key or private key.
   *
   *  @example:
   *    sign = new SigningKey(id("some-secret"));
   *
   *    // Compute the uncompressed public key for a private key
   *    SigningKey.computePublicKey(sign.privateKey)
   *    //_result:
   *
   *    // Compute the compressed public key for a private key
   *    SigningKey.computePublicKey(sign.privateKey, true)
   *    //_result:
   *
   *    // Compute the uncompressed public key
   *    SigningKey.computePublicKey(sign.publicKey, false);
   *    //_result:
   *
   *    // Compute the Compressed a public key
   *    SigningKey.computePublicKey(sign.publicKey, true);
   *    //_result:
   */
  static computePublicKey(t, e) {
    let n = Lt(t, "key");
    if (n.length === 32) {
      const s = ln.getPublicKey(n, !!e);
      return dt(s);
    }
    if (n.length === 64) {
      const s = new Uint8Array(65);
      s[0] = 4, s.set(n, 1), n = s;
    }
    const i = ln.ProjectivePoint.fromHex(n);
    return dt(i.toRawBytes(e));
  }
  /**
   *  Returns the public key for the private key which produced the
   *  %%signature%% for the given %%digest%%.
   *
   *  @example:
   *    key = new SigningKey(id("some-secret"))
   *    digest = id("hello world")
   *    sig = key.sign(digest)
   *
   *    // Notice the signer public key...
   *    key.publicKey
   *    //_result:
   *
   *    // ...is equal to the recovered public key
   *    SigningKey.recoverPublicKey(digest, sig)
   *    //_result:
   *
   */
  static recoverPublicKey(t, e) {
    N(xs(t) === 32, "invalid digest length", "digest", t);
    const n = _r.from(e);
    let i = ln.Signature.fromCompact(Ae(ee([n.r, n.s])));
    i = i.addRecoveryBit(n.yParity);
    const s = i.recoverPublicKey(Ae(t));
    return N(s != null, "invalid signautre for digest", "signature", e), "0x" + s.toHex(!1);
  }
  /**
   *  Returns the point resulting from adding the ellipic curve points
   *  %%p0%% and %%p1%%.
   *
   *  This is not a common function most developers should require, but
   *  can be useful for certain privacy-specific techniques.
   *
   *  For example, it is used by [[HDNodeWallet]] to compute child
   *  addresses from parent public keys and chain codes.
   */
  static addPoints(t, e, n) {
    const i = ln.ProjectivePoint.fromHex(wi.computePublicKey(t).substring(2)), s = ln.ProjectivePoint.fromHex(wi.computePublicKey(e).substring(2));
    return "0x" + i.add(s).toHex(!!n);
  }
};
Dr = new WeakMap();
let no = wi;
const h0 = BigInt(0), g0 = BigInt(36);
function Wf(r) {
  r = r.toLowerCase();
  const t = r.substring(2).split(""), e = new Uint8Array(40);
  for (let i = 0; i < 40; i++)
    e[i] = t[i].charCodeAt(0);
  const n = Lt(ne(e));
  for (let i = 0; i < 40; i += 2)
    n[i >> 1] >> 4 >= 8 && (t[i] = t[i].toUpperCase()), (n[i >> 1] & 15) >= 8 && (t[i + 1] = t[i + 1].toUpperCase());
  return "0x" + t.join("");
}
const M_ = {};
for (let r = 0; r < 10; r++)
  M_[String(r)] = String(r);
for (let r = 0; r < 26; r++)
  M_[String.fromCharCode(65 + r)] = String(10 + r);
const Kf = 15;
function w0(r) {
  r = r.toUpperCase(), r = r.substring(4) + r.substring(0, 2) + "00";
  let t = r.split("").map((n) => M_[n]).join("");
  for (; t.length >= Kf; ) {
    let n = t.substring(0, Kf);
    t = parseInt(n, 10) % 97 + t.substring(n.length);
  }
  let e = String(98 - parseInt(t, 10) % 97);
  for (; e.length < 2; )
    e = "0" + e;
  return e;
}
const y0 = function() {
  const r = {};
  for (let t = 0; t < 36; t++) {
    const e = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    r[e] = BigInt(t);
  }
  return r;
}();
function b0(r) {
  r = r.toLowerCase();
  let t = h0;
  for (let e = 0; e < r.length; e++)
    t = t * g0 + y0[r[e]];
  return t;
}
function Ut(r) {
  if (N(typeof r == "string", "invalid address", "address", r), r.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    r.startsWith("0x") || (r = "0x" + r);
    const t = Wf(r);
    return N(!r.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === r, "bad address checksum", "address", r), t;
  }
  if (r.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    N(r.substring(2, 4) === w0(r), "bad icap checksum", "address", r);
    let t = b0(r.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return Wf("0x" + t);
  }
  N(!1, "invalid address", "address", r);
}
function m0(r) {
  const t = Ut(r.from);
  let n = pt(r.nonce, "tx.nonce").toString(16);
  return n === "0" ? n = "0x" : n.length % 2 ? n = "0x0" + n : n = "0x" + n, Ut(Yt(ne(Zi([t, n])), 12));
}
function Kh(r) {
  return r && typeof r.getAddress == "function";
}
function Vi(r) {
  try {
    return Ut(r), !0;
  } catch {
  }
  return !1;
}
async function il(r, t) {
  const e = await t;
  return (e == null || e === "0x0000000000000000000000000000000000000000") && (q(typeof r != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: r }), N(!1, "invalid AddressLike value; did not resolve to a value address", "target", r)), Ut(e);
}
function ke(r, t) {
  if (typeof r == "string")
    return r.match(/^0x[0-9a-f]{40}$/i) ? Ut(r) : (q(t != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), il(r, t.resolveName(r)));
  if (Kh(r))
    return il(r, r.getAddress());
  if (r && typeof r.then == "function")
    return il(r, r);
  N(!1, "unsupported addressable value", "target", r);
}
const Tr = {};
function ft(r, t) {
  let e = !1;
  return t < 0 && (e = !0, t *= -1), new be(Tr, `${e ? "" : "u"}int${t}`, r, { signed: e, width: t });
}
function Dt(r, t) {
  return new be(Tr, `bytes${t || ""}`, r, { size: t });
}
const $f = Symbol.for("_ethers_typed");
var Ni;
const Nr = class Nr {
  /**
   *  @_ignore:
   */
  constructor(t, e, n, i) {
    /**
     *  The type, as a Solidity-compatible type.
     */
    z(this, "type");
    /**
     *  The actual value.
     */
    z(this, "value");
    D(this, Ni);
    /**
     *  @_ignore:
     */
    z(this, "_typedSymbol");
    i == null && (i = null), Qc(Tr, t, "Typed"), mt(this, { _typedSymbol: $f, type: e, value: n }), E(this, Ni, i), this.format();
  }
  /**
   *  Format the type as a Human-Readable type.
   */
  format() {
    if (this.type === "array")
      throw new Error("");
    if (this.type === "dynamicArray")
      throw new Error("");
    return this.type === "tuple" ? `tuple(${this.value.map((t) => t.format()).join(",")})` : this.type;
  }
  /**
   *  The default value returned by this type.
   */
  defaultValue() {
    return 0;
  }
  /**
   *  The minimum value for numeric types.
   */
  minValue() {
    return 0;
  }
  /**
   *  The maximum value for numeric types.
   */
  maxValue() {
    return 0;
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedBigInt]].
   */
  isBigInt() {
    return !!this.type.match(/^u?int[0-9]+$/);
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedData]].
   */
  isData() {
    return this.type.startsWith("bytes");
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedString]].
   */
  isString() {
    return this.type === "string";
  }
  /**
   *  Returns the tuple name, if this is a tuple. Throws otherwise.
   */
  get tupleName() {
    if (this.type !== "tuple")
      throw TypeError("not a tuple");
    return g(this, Ni);
  }
  // Returns the length of this type as an array
  // - `null` indicates the length is unforced, it could be dynamic
  // - `-1` indicates the length is dynamic
  // - any other value indicates it is a static array and is its length
  /**
   *  Returns the length of the array type or ``-1`` if it is dynamic.
   *
   *  Throws if the type is not an array.
   */
  get arrayLength() {
    if (this.type !== "array")
      throw TypeError("not an array");
    return g(this, Ni) === !0 ? -1 : g(this, Ni) === !1 ? this.value.length : null;
  }
  /**
   *  Returns a new **Typed** of %%type%% with the %%value%%.
   */
  static from(t, e) {
    return new Nr(Tr, t, e);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(t) {
    return ft(t, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(t) {
    return ft(t, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(t) {
    return ft(t, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(t) {
    return ft(t, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(t) {
    return ft(t, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(t) {
    return ft(t, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(t) {
    return ft(t, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(t) {
    return ft(t, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(t) {
    return ft(t, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(t) {
    return ft(t, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(t) {
    return ft(t, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(t) {
    return ft(t, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(t) {
    return ft(t, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(t) {
    return ft(t, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(t) {
    return ft(t, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(t) {
    return ft(t, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(t) {
    return ft(t, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(t) {
    return ft(t, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(t) {
    return ft(t, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(t) {
    return ft(t, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(t) {
    return ft(t, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(t) {
    return ft(t, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(t) {
    return ft(t, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(t) {
    return ft(t, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(t) {
    return ft(t, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(t) {
    return ft(t, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(t) {
    return ft(t, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(t) {
    return ft(t, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(t) {
    return ft(t, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(t) {
    return ft(t, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(t) {
    return ft(t, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(t) {
    return ft(t, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(t) {
    return ft(t, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(t) {
    return ft(t, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(t) {
    return ft(t, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(t) {
    return ft(t, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(t) {
    return ft(t, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(t) {
    return ft(t, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(t) {
    return ft(t, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(t) {
    return ft(t, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(t) {
    return ft(t, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(t) {
    return ft(t, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(t) {
    return ft(t, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(t) {
    return ft(t, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(t) {
    return ft(t, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(t) {
    return ft(t, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(t) {
    return ft(t, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(t) {
    return ft(t, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(t) {
    return ft(t, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(t) {
    return ft(t, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(t) {
    return ft(t, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(t) {
    return ft(t, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(t) {
    return ft(t, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(t) {
    return ft(t, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(t) {
    return ft(t, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(t) {
    return ft(t, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(t) {
    return ft(t, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(t) {
    return ft(t, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(t) {
    return ft(t, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(t) {
    return ft(t, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(t) {
    return ft(t, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(t) {
    return ft(t, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(t) {
    return ft(t, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(t) {
    return ft(t, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(t) {
    return ft(t, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(t) {
    return ft(t, -256);
  }
  /**
   *  Return a new ``bytes1`` type for %%v%%.
   */
  static bytes1(t) {
    return Dt(t, 1);
  }
  /**
   *  Return a new ``bytes2`` type for %%v%%.
   */
  static bytes2(t) {
    return Dt(t, 2);
  }
  /**
   *  Return a new ``bytes3`` type for %%v%%.
   */
  static bytes3(t) {
    return Dt(t, 3);
  }
  /**
   *  Return a new ``bytes4`` type for %%v%%.
   */
  static bytes4(t) {
    return Dt(t, 4);
  }
  /**
   *  Return a new ``bytes5`` type for %%v%%.
   */
  static bytes5(t) {
    return Dt(t, 5);
  }
  /**
   *  Return a new ``bytes6`` type for %%v%%.
   */
  static bytes6(t) {
    return Dt(t, 6);
  }
  /**
   *  Return a new ``bytes7`` type for %%v%%.
   */
  static bytes7(t) {
    return Dt(t, 7);
  }
  /**
   *  Return a new ``bytes8`` type for %%v%%.
   */
  static bytes8(t) {
    return Dt(t, 8);
  }
  /**
   *  Return a new ``bytes9`` type for %%v%%.
   */
  static bytes9(t) {
    return Dt(t, 9);
  }
  /**
   *  Return a new ``bytes10`` type for %%v%%.
   */
  static bytes10(t) {
    return Dt(t, 10);
  }
  /**
   *  Return a new ``bytes11`` type for %%v%%.
   */
  static bytes11(t) {
    return Dt(t, 11);
  }
  /**
   *  Return a new ``bytes12`` type for %%v%%.
   */
  static bytes12(t) {
    return Dt(t, 12);
  }
  /**
   *  Return a new ``bytes13`` type for %%v%%.
   */
  static bytes13(t) {
    return Dt(t, 13);
  }
  /**
   *  Return a new ``bytes14`` type for %%v%%.
   */
  static bytes14(t) {
    return Dt(t, 14);
  }
  /**
   *  Return a new ``bytes15`` type for %%v%%.
   */
  static bytes15(t) {
    return Dt(t, 15);
  }
  /**
   *  Return a new ``bytes16`` type for %%v%%.
   */
  static bytes16(t) {
    return Dt(t, 16);
  }
  /**
   *  Return a new ``bytes17`` type for %%v%%.
   */
  static bytes17(t) {
    return Dt(t, 17);
  }
  /**
   *  Return a new ``bytes18`` type for %%v%%.
   */
  static bytes18(t) {
    return Dt(t, 18);
  }
  /**
   *  Return a new ``bytes19`` type for %%v%%.
   */
  static bytes19(t) {
    return Dt(t, 19);
  }
  /**
   *  Return a new ``bytes20`` type for %%v%%.
   */
  static bytes20(t) {
    return Dt(t, 20);
  }
  /**
   *  Return a new ``bytes21`` type for %%v%%.
   */
  static bytes21(t) {
    return Dt(t, 21);
  }
  /**
   *  Return a new ``bytes22`` type for %%v%%.
   */
  static bytes22(t) {
    return Dt(t, 22);
  }
  /**
   *  Return a new ``bytes23`` type for %%v%%.
   */
  static bytes23(t) {
    return Dt(t, 23);
  }
  /**
   *  Return a new ``bytes24`` type for %%v%%.
   */
  static bytes24(t) {
    return Dt(t, 24);
  }
  /**
   *  Return a new ``bytes25`` type for %%v%%.
   */
  static bytes25(t) {
    return Dt(t, 25);
  }
  /**
   *  Return a new ``bytes26`` type for %%v%%.
   */
  static bytes26(t) {
    return Dt(t, 26);
  }
  /**
   *  Return a new ``bytes27`` type for %%v%%.
   */
  static bytes27(t) {
    return Dt(t, 27);
  }
  /**
   *  Return a new ``bytes28`` type for %%v%%.
   */
  static bytes28(t) {
    return Dt(t, 28);
  }
  /**
   *  Return a new ``bytes29`` type for %%v%%.
   */
  static bytes29(t) {
    return Dt(t, 29);
  }
  /**
   *  Return a new ``bytes30`` type for %%v%%.
   */
  static bytes30(t) {
    return Dt(t, 30);
  }
  /**
   *  Return a new ``bytes31`` type for %%v%%.
   */
  static bytes31(t) {
    return Dt(t, 31);
  }
  /**
   *  Return a new ``bytes32`` type for %%v%%.
   */
  static bytes32(t) {
    return Dt(t, 32);
  }
  /**
   *  Return a new ``address`` type for %%v%%.
   */
  static address(t) {
    return new Nr(Tr, "address", t);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(t) {
    return new Nr(Tr, "bool", !!t);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(t) {
    return new Nr(Tr, "bytes", t);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(t) {
    return new Nr(Tr, "string", t);
  }
  /**
   *  Return a new ``array`` type for %%v%%, allowing %%dynamic%% length.
   */
  static array(t, e) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``tuple`` type for %%v%%, with the optional %%name%%.
   */
  static tuple(t, e) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static overrides(t) {
    return new Nr(Tr, "overrides", Object.assign({}, t));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(t) {
    return t && typeof t == "object" && "_typedSymbol" in t && t._typedSymbol === $f;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(t, e) {
    if (Nr.isTyped(t)) {
      if (t.type !== e)
        throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);
      return t.value;
    }
    return t;
  }
};
Ni = new WeakMap();
let be = Nr;
class v0 extends nn {
  constructor(t) {
    super("address", "address", t, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(t, e) {
    let n = be.dereference(e, "string");
    try {
      n = Ut(n);
    } catch (i) {
      return this._throwError(i.message, e);
    }
    return t.writeValue(n);
  }
  decode(t) {
    return Ut(oi(t.readValue(), 20));
  }
}
class A0 extends nn {
  constructor(e) {
    super(e.name, e.type, "_", e.dynamic);
    z(this, "coder");
    this.coder = e;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(e, n) {
    return this.coder.encode(e, n);
  }
  decode(e) {
    return this.coder.decode(e);
  }
}
function $h(r, t, e) {
  let n = [];
  if (Array.isArray(e))
    n = e;
  else if (e && typeof e == "object") {
    let l = {};
    n = t.map((p) => {
      const f = p.localName;
      return q(f, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: p }, value: e }), q(!l[f], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: p }, value: e }), l[f] = !0, e[f];
    });
  } else
    N(!1, "invalid tuple value", "tuple", e);
  N(t.length === n.length, "types/value length mismatch", "tuple", e);
  let i = new Ml(), s = new Ml(), a = [];
  t.forEach((l, p) => {
    let f = n[p];
    if (l.dynamic) {
      let h = s.length;
      l.encode(s, f);
      let b = i.writeUpdatableValue();
      a.push((k) => {
        b(k + h);
      });
    } else
      l.encode(i, f);
  }), a.forEach((l) => {
    l(i.length);
  });
  let u = r.appendWriter(i);
  return u += r.appendWriter(s), u;
}
function qh(r, t) {
  let e = [], n = [], i = r.subReader(0);
  return t.forEach((s) => {
    let a = null;
    if (s.dynamic) {
      let u = r.readIndex(), l = i.subReader(u);
      try {
        a = s.decode(l);
      } catch (p) {
        if (ye(p, "BUFFER_OVERRUN"))
          throw p;
        a = p, a.baseType = s.name, a.name = s.localName, a.type = s.type;
      }
    } else
      try {
        a = s.decode(r);
      } catch (u) {
        if (ye(u, "BUFFER_OVERRUN"))
          throw u;
        a = u, a.baseType = s.name, a.name = s.localName, a.type = s.type;
      }
    if (a == null)
      throw new Error("investigate");
    e.push(a), n.push(s.localName || null);
  }), va.fromItems(e, n);
}
class I0 extends nn {
  constructor(e, n, i) {
    const s = e.type + "[" + (n >= 0 ? n : "") + "]", a = n === -1 || e.dynamic;
    super("array", s, i, a);
    z(this, "coder");
    z(this, "length");
    mt(this, { coder: e, length: n });
  }
  defaultValue() {
    const e = this.coder.defaultValue(), n = [];
    for (let i = 0; i < this.length; i++)
      n.push(e);
    return n;
  }
  encode(e, n) {
    const i = be.dereference(n, "array");
    Array.isArray(i) || this._throwError("expected array value", i);
    let s = this.length;
    s === -1 && (s = i.length, e.writeValue(i.length)), ih(i.length, s, "coder array" + (this.localName ? " " + this.localName : ""));
    let a = [];
    for (let u = 0; u < i.length; u++)
      a.push(this.coder);
    return $h(e, a, i);
  }
  decode(e) {
    let n = this.length;
    n === -1 && (n = e.readIndex(), q(n * Ee <= e.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: e.bytes, offset: n * Ee, length: e.dataLength }));
    let i = [];
    for (let s = 0; s < n; s++)
      i.push(new A0(this.coder));
    return qh(e, i);
  }
}
class E0 extends nn {
  constructor(t) {
    super("bool", "bool", t, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(t, e) {
    const n = be.dereference(e, "bool");
    return t.writeValue(n ? 1 : 0);
  }
  decode(t) {
    return !!t.readValue();
  }
}
class Yh extends nn {
  constructor(t, e) {
    super(t, t, e, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(t, e) {
    e = Ae(e);
    let n = t.writeValue(e.length);
    return n += t.writeBytes(e), n;
  }
  decode(t) {
    return t.readBytes(t.readIndex(), !0);
  }
}
class k0 extends Yh {
  constructor(t) {
    super("bytes", t);
  }
  decode(t) {
    return dt(super.decode(t));
  }
}
class x0 extends nn {
  constructor(e, n) {
    let i = "bytes" + String(e);
    super(i, i, n, !1);
    z(this, "size");
    mt(this, { size: e }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(e, n) {
    let i = Ae(be.dereference(n, this.type));
    return i.length !== this.size && this._throwError("incorrect data length", n), e.writeBytes(i);
  }
  decode(e) {
    return dt(e.readBytes(this.size));
  }
}
const R0 = new Uint8Array([]);
class S0 extends nn {
  constructor(t) {
    super("null", "", t, !1);
  }
  defaultValue() {
    return null;
  }
  encode(t, e) {
    return e != null && this._throwError("not null", e), t.writeBytes(R0);
  }
  decode(t) {
    return t.readBytes(0), null;
  }
}
const B0 = BigInt(0), P0 = BigInt(1), O0 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
class T0 extends nn {
  constructor(e, n, i) {
    const s = (n ? "int" : "uint") + e * 8;
    super(s, s, i, !1);
    z(this, "size");
    z(this, "signed");
    mt(this, { size: e, signed: n }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(e, n) {
    let i = pt(be.dereference(n, this.type)), s = ja(O0, Ee * 8);
    if (this.signed) {
      let a = ja(s, this.size * 8 - 1);
      (i > a || i < -(a + P0)) && this._throwError("value out-of-bounds", n), i = oh(i, 8 * Ee);
    } else (i < B0 || i > ja(s, this.size * 8)) && this._throwError("value out-of-bounds", n);
    return e.writeValue(i);
  }
  decode(e) {
    let n = ja(e.readValue(), this.size * 8);
    return this.signed && (n = Sy(n, this.size * 8)), n;
  }
}
class N0 extends Yh {
  constructor(t) {
    super("string", t);
  }
  defaultValue() {
    return "";
  }
  encode(t, e) {
    return super.encode(t, Zr(be.dereference(e, "string")));
  }
  decode(t) {
    return gc(super.decode(t));
  }
}
class Go extends nn {
  constructor(e, n) {
    let i = !1;
    const s = [];
    e.forEach((u) => {
      u.dynamic && (i = !0), s.push(u.type);
    });
    const a = "tuple(" + s.join(",") + ")";
    super("tuple", a, n, i);
    z(this, "coders");
    mt(this, { coders: Object.freeze(e.slice()) });
  }
  defaultValue() {
    const e = [];
    this.coders.forEach((i) => {
      e.push(i.defaultValue());
    });
    const n = this.coders.reduce((i, s) => {
      const a = s.localName;
      return a && (i[a] || (i[a] = 0), i[a]++), i;
    }, {});
    return this.coders.forEach((i, s) => {
      let a = i.localName;
      !a || n[a] !== 1 || (a === "length" && (a = "_length"), e[a] == null && (e[a] = e[s]));
    }), Object.freeze(e);
  }
  encode(e, n) {
    const i = be.dereference(n, "tuple");
    return $h(e, this.coders, i);
  }
  decode(e) {
    return qh(e, this.coders);
  }
}
function Xi(r) {
  return ne(Zr(r));
}
var C0 = "AEEUdwmgDS8BxQKKAP4BOgDjATAAngDUAIMAoABoAOAAagCOAEQAhABMAHIAOwA9ACsANgAmAGIAHgAuACgAJwAXAC0AGgAjAB8ALwAUACkAEgAeAAkAGwARABkAFgA5ACgALQArADcAFQApABAAHgAiABAAGgAeABMAGAUhBe8BFxREN8sF2wC5AK5HAW8ArQkDzQCuhzc3NzcBP68NEfMABQdHBuw5BV8FYAA9MzkI9r4ZBg7QyQAWA9CeOwLNCjcCjqkChuA/lm+RAsXTAoP6ASfnEQDytQFJAjWVCkeXAOsA6godAB/cwdAUE0WlBCN/AQUCQRjFD/MRBjHxDQSJbw0jBzUAswBxme+tnIcAYwabAysG8QAjAEMMmxcDqgPKQyDXCMMxA7kUQwD3NXOrAKmFIAAfBC0D3x4BJQDBGdUFAhEgVD8JnwmQJiNWYUzrg0oAGwAUAB0AFnNcACkAFgBP9h3gPfsDOWDKneY2ChglX1UDYD30ABsAFAAdABZzIGRAnwDD8wAjAEEMzRbDqgMB2sAFYwXqAtCnAsS4AwpUJKRtFHsadUz9AMMVbwLpABM1NJEX0ZkCgYMBEyMAxRVvAukAEzUBUFAtmUwSAy4DBTER33EftQHfSwB5MxJ/AjkWKQLzL8E/cwBB6QH9LQDPDtO9ASNriQC5DQANAwCK21EFI91zHwCoL9kBqQcHBwcHKzUDowBvAQohPvU3fAQgHwCyAc8CKQMA5zMSezr7ULgFmDp/LzVQBgEGAi8FYQVgt8AFcTtlQhpCWEmfe5tmZ6IAExsDzQ8t+X8rBKtTAltbAn0jsy8Bl6utPWMDTR8Ei2kRANkDBrNHNysDBzECQWUAcwFpJ3kAiyUhAJ0BUb8AL3EfAbfNAz81KUsFWwF3YQZtAm0A+VEfAzEJDQBRSQCzAQBlAHsAM70GD/v3IZWHBwARKQAxALsjTwHZAeMPEzmXgIHwABIAGQA8AEUAQDt3gdvIEGcQZAkGTRFMdEIVEwK0D64L7REdDNkq09PgADSxB/MDWwfzA1sDWwfzB/MDWwfzA1sDWwNbA1scEvAi28gQZw9QBHUFlgWTBN4IiyZREYkHMAjaVBV0JhxPA00BBCMtSSQ7mzMTJUpMFE0LCAQ2SmyvfUADTzGzVP2QqgPTMlc5dAkGHnkSqAAyD3skNb1OhnpPcagKU0+2tYdJak5vAsY6sEAACikJm2/Dd1YGRRAfJ6kQ+ww3AbkBPw3xS9wE9QY/BM0fgRkdD9GVoAipLeEM8SbnLqWAXiP5KocF8Uv4POELUVFsD10LaQnnOmeBUgMlAREijwrhDT0IcRD3Cs1vDekRSQc9A9lJngCpBwULFR05FbkmFGKwCw05ewb/GvoLkyazEy17AAXXGiUGUQEtGwMA0y7rhbRaNVwgT2MGBwspI8sUrFAkDSlAu3hMGh8HGSWtApVDdEqLUToelyH6PEENai4XUYAH+TwJGVMLhTyiRq9FEhHWPpE9TCJNTDAEOYMsMyePCdMPiQy9fHYBXQklCbUMdRM1ERs3yQg9Bx0xlygnGQglRplgngT7owP3E9UDDwVDCUUHFwO5HDETMhUtBRGBKNsC9zbZLrcCk1aEARsFzw8pH+MQVEfkDu0InwJpA4cl7wAxFSUAGyKfCEdnAGOP3FMJLs8Iy2pwI3gDaxTrZRF3B5UOWwerHDcVwxzlcMxeD4YMKKezCV8BeQmdAWME5wgNNV+MpCBFZ1eLXBifIGVBQ14AAjUMaRWjRMGHfAKPD28SHwE5AXcHPQ0FAnsR8RFvEJkI74YINbkz/DopBFMhhyAVCisDU2zSCysm/Qz8bQGnEmYDEDRBd/Jnr2C6KBgBBx0yyUFkIfULlk/RDKAaxRhGVDIZ6AfDA/ca9yfuQVsGAwOnBxc6UTPyBMELbQiPCUMATQ6nGwfbGG4KdYzUATWPAbudA1uVhwJzkwY7Bw8Aaw+LBX3pACECqwinAAkA0wNbAD0CsQehAB0AiUUBQQMrMwEl6QKTA5cINc8BmTMB9y0EH8cMGQD7O25OAsO1AoBuZqYF4VwCkgJNOQFRKQQJUktVA7N15QDfAE8GF+NLARmvTs8e50cB43MvAMsA/wAJOQcJRQHRAfdxALsBYws1Caa3uQFR7S0AhwAZbwHbAo0A4QA5AIP1AVcAUQVd/QXXAlNNARU1HC9bZQG/AyMBNwERAH0Gz5GpzQsjBHEH1wIQHxXlAu8yB7kFAyLjE9FCyQK94lkAMhoKPAqrCqpgX2Q3CjV2PVQAEh+sPss/UgVVO1c7XDtXO1w7VztcO1c7XDtXO1wDm8Pmw+YKcF9JYe8Mqg3YRMw6TRPfYFVgNhPMLbsUxRXSJVoZQRrAJwkl6FUNDwgt12Y0CDA0eRfAAEMpbINFY4oeNApPHOtTlVT8LR8AtUumM7MNsBsZREQFS3XxYi4WEgomAmSFAmJGX1GzAV83JAKh+wJonAJmDQKfiDgfDwJmPwJmKgRyBIMDfxcDfpY5Cjl7GzmGOicnAmwhAjI6OA4CbcsCbbLzjgM3a0kvAWsA4gDlAE4JB5wMkQECD8YAEbkCdzMCdqZDAnlPRwJ4viFg30WyRvcCfEMCeswCfQ0CfPRIBEiBZygALxlJXEpfGRtK0ALRBQLQ0EsrA4hTA4fqRMmRNgLypV0HAwOyS9JMMSkH001QTbMCi0MCitzFHwshR2sJuwKOOwKOYESbhQKO3QKOYHxRuFM5AQ5S2FSJApP/ApMQAO0AIFUiVbNV1AosHymZijLleGpFPz0Cl6MC77ZYJawAXSkClpMCloCgAK1ZsFoNhVEAPwKWuQKWUlxIXNUCmc8CmWhczl0LHQKcnznGOqECnBoCn58CnryOACETNS4TAp31Ap6WALlBYThh8wKe1wKgcgGtAp6jIwKeUqljzGQrKS8CJ7MCJoICoP8CoFDbAqYzAqXSAqgDAIECp/ZogGi1AAdNaiBq1QKs5wKssgKtawKtBgJXIQJV4AKx5dsDH1JsmwKywRECsuwbbORtZ21MYwMl0QK2YD9DbpQDKUkCuGICuUsZArkue3A6cOUCvR0DLbYDMhUCvoxyBgMzdQK+HnMmc1MCw88CwwhzhnRPOUl05AM8qwEDPJ4DPcMCxYACxksCxhSNAshtVQLISALJUwLJMgJkoQLd1nh9ZXiyeSlL1AMYp2cGAmH4GfeVKHsPXpZevxUCz28Cz3AzT1fW9xejAMqxAs93AS3uA04Wfk8JAtwrAtuOAtJTA1JgA1NjAQUDVZCAjUMEzxrxZEl5A4LSg5EC2ssC2eKEFIRNp0ADhqkAMwNkEoZ1Xf0AWQLfaQLevHd7AuIz7RgB8zQrAfSfAfLWiwLr9wLpdH0DAur9AuroAP1LAb0C7o0C66CWrpcHAu5DA4XkmH1w5HGlAvMHAG0DjhqZlwL3FwORcgOSiwL3nAL53QL4apogmq+/O5siA52HAv7+AR8APZ8gAZ+3AwWRA6ZuA6bdANXJAwZuoYyiCQ0DDE0BEwEjB3EGZb1rCQC/BG/DFY8etxEAG3k9ACcDNxJRA42DAWcrJQCM8wAlAOanC6OVCLsGI6fJBgCvBRnDBvElRUYFFoAFcD9GSDNCKUK8X3kZX8QAls0FOgCQVCGbwTsuYDoZutcONxjOGJHJ/gVfBWAFXwVgBWsFYAVfBWAFXwVgBV8FYAVfBWBOHQjfjW8KCgoKbF7xMwTRA7kGN8PDAMMEr8MA70gxFroFTj5xPnhCR0K+X30/X/AAWBkzswCNBsxzzASm70aCRS4rDDMeLz49fnXfcsH5GcoscQFz13Y4HwVnBXLJycnACNdRYwgICAqEXoWTxgA7P4kACxbZBu21Kw0AjMsTAwkVAOVtJUUsJ1JCuULESUArXy9gPi9AKwnJRQYKTD9LPoA+iT54PnkCkULEUUpDX9NWV3JVEjQAc1w3A3IBE3YnX+g7QiMJb6MKaiszRCUuQrNCxDPMCcwEX9EWJzYREBEEBwIHKn6l33JCNVIfybPJtAltydPUCmhBZw/tEKsZAJOVJU1CLRuxbUHOQAo7P0s+eEJHHA8SJVRPdGM0NVrpvBoKhfUlM0JHHGUQUhEWO1xLSj8MO0ucNAqJIzVCRxv9EFsqKyA4OQgNj2nwZgp5ZNFgE2A1K3YHS2AhQQojJmC7DgpzGG1WYFUZCQYHZO9gHWCdYIVgu2BTYJlwFh8GvRbcXbG8YgtDHrMBwzPVyQonHQgkCyYBgQJ0Ajc4nVqIAwGSCsBPIgDsK3SWEtIVBa5N8gGjAo+kVwVIZwD/AEUSCDweX4ITrRQsJ8K3TwBXFDwEAB0TvzVcAtoTS20RIwDgVgZ9BBImYgA5AL4Coi8LFnezOkCnIQFjAY4KBAPh9RcGsgZSBsEAJctdsWIRu2kTkQstRw7DAcMBKgpPBGIGMDAwKCYnKTQaLg4AKRSVAFwCdl+YUZ0JdicFD3lPAdt1F9ZZKCGxuE3yBxkFVGcA/wBFEgiCBwAOLHQSjxOtQDg1z7deFRMAZ8QTAGtKb1ApIiPHADkAvgKiLy1DFtYCmBiDAlDDWNB0eo7fpaMO/aEVRRv0ATEQZBIODyMEAc8JQhCbDRgzFD4TAEMAu9YBCgCsAOkAm5I3ABwAYxvONnR+MhXJAxgKQyxL2+kkJhMbhQKDBMkSsvF0AD9BNQ6uQC7WqSQHwxEAEEIu1hkhAH2z4iQPwyJPHNWpdyYBRSpnJALzoBAEVPPsH20MxA0CCEQKRgAFyAtFAlMNwwjEDUQJRArELtapMg7DDZgJIw+TGukEIwvDFkMAqAtDEMMMBhioe+QAO3MMRAACrgnEBSPY9Q0FDnbSBoMAB8MSYxkSxAEJAPIJAAB8FWMOFtMc/HcXwxhDAC7DAvOowwAewwJdKDKHAAHDAALrFUQVwwAbwyvzpWMWv8wA/ABpAy++bcYDUKPD0KhDCwKmJ1MAAmMA5+UZwxAagwipBRL/eADfw6fDGOMCGsOjk3l6BwOpo4sAEsMOGxMAA5sAbcMOAAvDp0MJGkMDwgipnNIPAwfIqUMGAOGDAAPzABXDAAcDAAnDAGmTABrDAA7DChjDjnEWAwABYwAOcwAuUyYABsMAF8MIKQANUgC6wy4AA8MADqMq8wCyYgAcIwAB8wqpAAXOCx0V4wAHowBCwwEKAGnDAAuDAB3DAAjDCakABdIAbqcZ3QCZCCkABdIAAAFDAAfjAB2jCCkABqIACYMAGzMAbSMA5sOIAAhjAAhDABTDBAkpAAbSAOOTAAlDC6kOzPtnAAdDAG6kQFAATwAKwwwAA0MACbUDPwAHIwAZgwACE6cDAAojAApDAAoDp/MGwwAJIwADEwAQQwgAFEMAEXMAD5MADfMADcMAGRMOFiMAFUMAbqMWuwHDAMIAE0MLAGkzEgDhUwACQwAEWgAXgwUjAAbYABjDBSYBgzBaAEFNALcQBxUMegAwMngBrA0IZgJ0KxQHBREPd1N0ZzKRJwaIHAZqNT4DqQq8BwngAB4DAwt2AX56T1ocKQNXAh1GATQGC3tOxYNagkgAMQA5CQADAQEAWxLjAIOYNAEzAH7tFRk6TglSAF8NAAlYAQ+S1ACAQwQorQBiAN4dAJ1wPyeTANVzuQDX3AIeEMp9eyMgXiUAEdkBkJizKltbVVAaRMqRAAEAhyQ/SDEz6BmfVwB6ATEsOClKIRcDOF0E/832AFNt5AByAnkCRxGCOs94NjXdAwINGBonDBwPALW2AwICAgAAAAAAAAYDBQMDARrUAwAtAAAAAgEGBgYGBgYFBQUFBQUEBQYHCAkEBQUFBQQAAAICAAAAIgCNAJAAlT0A6gC7ANwApEQAwgCyAK0AqADuAKYA2gCjAOcBCAEDAMcAgQBiANIA1AEDAN4A8gCQAKkBMQDqAN8A3AsBCQ8yO9ra2tq8xuLT1tRJOB0BUgFcNU0BWgFpAWgBWwFMUUlLbhMBUxsNEAs6PhMOACcUKy0vMj5AQENDQ0RFFEYGJFdXV1dZWVhZL1pbXVxcI2NnZ2ZoZypsbnZ1eHh4eHh4enp6enp6enp6enp8fH18e2IARPIASQCaAHgAMgBm+ACOAFcAVwA3AnbvAIsABfj4AGQAk/IAnwBPAGIAZP//sACFAIUAaQBWALEAJAC2AIMCQAJDAPwA5wD+AP4A6AD/AOkA6QDoAOYALwJ7AVEBQAE+AVQBPgE+AT4BOQE4ATgBOAEcAVgXADEQCAEAUx8SHgsdHhYAjgCWAKYAUQBqIAIxAHYAbwCXAxUDJzIDIUlGTzEAkQJPAMcCVwKkAMAClgKWApYClgKWApYCiwKWApYClgKWApYClgKVApUCmAKgApcClgKWApQClAKUApQCkgKVAnUB1AKXAp8ClgKWApUeAIETBQD+DQOfAmECOh8BVBg9AuIZEjMbAU4/G1WZAXusRAFpYQEFA0FPAQYAmTEeIJdyADFoAHEANgCRA5zMk/C2jGINwjMWygIZCaXdfDILBCs5dAE7YnQBugDlhoiHhoiGiYqKhouOjIaNkI6Ij4qQipGGkoaThpSSlYaWhpeKmIaZhpqGm4aci52QnoqfhuIC4XTpAt90AIp0LHSoAIsAdHQEQwRABEIERQRDBEkERgRBBEcESQRIBEQERgRJAJ5udACrA490ALxuAQ10ANFZdHQA13QCFHQA/mJ0AP4BIQD+APwA/AD9APwDhGZ03ASMK23HAP4A/AD8AP0A/CR0dACRYnQA/gCRASEA/gCRAvQA/gCRA4RmdNwEjCttxyR0AP9idAEhAP4A/gD8APwA/QD8AP8A/AD8AP0A/AOEZnTcBIwrbcckdHQAkWJ0ASEA/gCRAP4AkQL0AP4AkQOEZnTcBIwrbcckdAJLAT50AlIBQXQCU8l0dAJfdHQDpgL0A6YDpgOnA6cDpwOnA4RmdNwEjCttxyR0dACRYnQBIQOmAJEDpgCRAvQDpgCRA4RmdNwEjCttxyR0BDh0AJEEOQCRDpU5dSgCADR03gV2CwArdAEFAM5iCnR0AF1iAAYcOgp0dACRCnQAXAEIwWZ0CnRmdHQAkWZ0CnRmdEXgAFF03gp0dEY0tlT2u3SOAQTwscwhjZZKrhYcBSfFp9XNbKiVDOD2b+cpe4/Z17mQnbtzzhaeQtE2GGj0IDNTjRUSyTxxw/RPHW/+vS7d1NfRt9z9QPZg4X7QFfhCnkvgNPIItOsC2eV6hPannZNHlZ9xrwZXIMOlu3jSoQSq78WEjwLjw1ELSlF1aBvfzwk5ZX7AUvQzjPQKbDuQ+sm4wNOp4A6AdVuRS0t1y/DZpg4R6m7FNjM9HgvW7Bi88zaMjOo6lM8wtBBdj8LP4ylv3zCXPhebMKJc066o9sF71oFW/8JXu86HJbwDID5lzw5GWLR/LhT0Qqnp2JQxNZNfcbLIzPy+YypqRm/lBmGmex+82+PisxUumSeJkALIT6rJezxMH+CTJmQtt5uwTVbL3ptmjDUQzlSIvWi8Tl7ng1NpuRn1Ng4n14Qc+3Iil7OwkvNWogLSPkn3pihIFytyIGmMhOe3n1tWsuMy9BdKyqF4Z3v2SgggTL9KVvMXPnCbRe+oOuFFP3HejBG/w9gvmfNYvg6JuWia2lcSSN1uIjBktzoIazOHPJZ7kKHPz8mRWVdW3lA8WGF9dQF6Bm673boov3BUWDU2JNcahR23GtfHKLOz/viZ+rYnZFaIznXO67CYEJ1fXuTRpZhYZkKe54xeoagkNGLs+NTZHE0rX45/XvQ2RGADX6vcAvdxIUBV27wxGm2zjZo4X3ILgAlrOFheuZ6wtsvaIj4yLY7qqawlliaIcrz2G+c3vscAnCkCuMzMmZvMfu9lLwTvfX+3cVSyPdN9ZwgDZhfjRgNJcLiJ67b9xx8JHswprbiE3v9UphotAPIgnXVIN5KmMc0piXhc6cChPnN+MRhG9adtdttQTTwSIpl8I4/j//d3sz1326qTBTpPRM/Hgh3kzqEXs8ZAk4ErQhNO8hzrQ0DLkWMA/N+91tn2MdOJnWC2FCZehkQrwzwbKOjhvZsbM95QoeL9skYyMf4srVPVJSgg7pOLUtr/n9eT99oe9nLtFRpjA9okV2Kj8h9k5HaC0oivRD8VyXkJ81tcd4fHNXPCfloIQasxsuO18/46dR2jgul/UIet2G0kRvnyONMKhHs6J26FEoqSqd+rfYjeEGwHWVDpX1fh1jBBcKGMqRepju9Y00mDVHC+Xdij/j44rKfvfjGinNs1jO/0F3jB83XCDINN/HB84axlP+3E/klktRo+vl3U/aiyMJbIodE1XSsDn6UAzIoMtUObY2+k/4gY/l+AkZJ5Sj2vQrkyLm3FoxjhDX+31UXBFf9XrAH31fFqoBmDEZvhvvpnZ87N+oZEu7U9O/nnk+QWj3x8uyoRbEnf+O5UMr9i0nHP38IF5AvzrBW8YWBUR0mIAzIvndQq9N3v/Jto3aPjPXUPl8ASdPPyAp7jENf8bk7VMM9ol9XGmlBmeDMuGqt+WzuL6CXAxXjIhCPM5vACchgMJ/8XBGLO/D1isVvGhwwHHr1DLaI5mn2Jr/b1pUD90uciDaS8cXNDzCWvNmT/PhQe5e8nTnnnkt8Ds/SIjibcum/fqDhKopxAY8AkSrPn+IGDEKOO+U3XOP6djFs2H5N9+orhOahiQk5KnEUWa+CzkVzhp8bMHRbg81qhjjXuIKbHjSLSIBKWqockGtKinY+z4/RdBUF6pcc3JmnlxVcNgrI4SEzKUZSwcD2QCyxzKve+gAmg6ZuSRkpPFa6mfThu7LJNu3H5K42uCpNvPAsoedolKV/LHe/eJ+BbaG5MG0NaSGVPRUmNFMFFSSpXEcXwbVh7UETOZZtoVNRGOIbbkig3McEtR68cG0RZAoJevWYo7Dg/lZ1CQzblWeUvVHmr8fY4Nqd9JJiH/zEX24mJviH60fAyFr0A3c4bC1j3yZU60VgJxXn8JgJXLUIsiBnmKmMYz+7yBQFBvqb2eYnuW59joZBf56/wXvWIR4R8wTmV80i1mZy+S4+BUES+hzjk0uXpC///z/IlqHZ1monzlXp8aCfhGKMti73FI1KbL1q6IKO4fuBuZ59gagjn5xU79muMpHXg6S+e+gDM/U9BKLHbl9l6o8czQKl4RUkJJiqftQG2i3BMg/TQlUYFkJDYBOOvAugYuzYSDnZbDDd/aSd9x0Oe6F+bJcHfl9+gp6L5/TgA+BdFFovbfCrQ40s5vMPw8866pNX8zyFGeFWdxIpPVp9Rg1UPOVFbFZrvaFq/YAzHQgqMWpahMYfqHpmwXfHL1/kpYmGuHFwT55mQu0dylfNuq2Oq0hTMCPwqfxnuBIPLXfci4Y1ANy+1CUipQxld/izVh16WyG2Q0CQQ9NqtAnx1HCHwDj7sYxOSB0wopZSnOzxQOcExmxrVTF2BkOthVpGfuhaGECfCJpJKpjnihY+xOT2QJxN61+9K6QSqtv2Shr82I3jgJrqBg0wELFZPjvHpvzTtaJnLK6Vb97Yn933koO/saN7fsjwNKzp4l2lJVx2orjCGzC/4ZL4zCver6aQYtC5sdoychuFE6ufOiog+VWi5UDkbmvmtah/3aArEBIi39s5ILUnlFLgilcGuz9CQshEY7fw2ouoILAYPVT/gyAIq3TFAIwVsl+ktkRz/qGfnCDGrm5gsl/l9QdvCWGsjPz3dU7XuqKfdUrr/6XIgjp4rey6AJBmCmUJMjITHVdFb5m1p+dLMCL8t55zD42cmftmLEJC0Da04YiRCVUBLLa8D071/N5UBNBXDh0LFsmhV/5B5ExOB4j3WVG/S3lfK5o+V6ELHvy6RR9n4ac+VsK4VE4yphPvV+kG9FegTBH4ZRXL2HytUHCduJazB/KykjfetYxOXTLws267aGOd+I+JhKP//+VnXmS90OD/jvLcVu0asyqcuYN1mSb6XTlCkqv1vigZPIYwNF/zpWcT1GR/6aEIRjkh0yhg4LXJfaGobYJTY4JI58KiAKgmmgAKWdl5nYCeLqavRJGQNuYuZtZFGx+IkI4w4NS2xwbetNMunOjBu/hmKCI/w7tfiiyUd//4rbTeWt4izBY8YvGIN6vyKYmP/8X8wHKCeN+WRcKM70+tXKNGyevU9H2Dg5BsljnTf8YbsJ1TmMs74Ce2XlHisleguhyeg44rQOHZuw/6HTkhnnurK2d62q6yS7210SsAIaR+jXMQA+svkrLpsUY+F30Uw89uOdGAR6vo4FIME0EfVVeHTu6eKicfhSqOeXJhbftcd08sWEnNUL1C9fnprTgd83IMut8onVUF0hvqzZfHduPjbjwEXIcoYmy+P6tcJZHmeOv6VrvEdkHDJecjHuHeWANe79VG662qTjA/HCvumVv3qL+LrOcpqGps2ZGwQdFJ7PU4iuyRlBrwfO+xnPyr47s2cXVbWzAyznDiBGjCM3ksxjjqM62GE9C8f5U38kB3VjtabKp/nRdvMESPGDG90bWRLAt1Qk5DyLuazRR1YzdC1c+hZXvAWV8xA72S4A8B67vjVhbba3MMop293FeEXpe7zItMWrJG/LOH9ByOXmYnNJfjmfuX9KbrpgLOba4nZ+fl8Gbdv/ihv+6wFGKHCYrVwmhFC0J3V2bn2tIB1wCc1CST3d3X2OyxhguXcs4sm679UngzofuSeBewMFJboIQHbUh/m2JhW2hG9DIvG2t7yZIzKBTz9wBtnNC+2pCRYhSIuQ1j8xsz5VvqnyUIthvuoyyu7fNIrg/KQUVmGQaqkqZk/Vx5b33/gsEs8yX7SC1J+NV4icz6bvIE7C5G6McBaI8rVg56q5QBJWxn/87Q1sPK4+sQa8fLU5gXo4paaq4cOcQ4wR0VBHPGjKh+UlPCbA1nLXyEUX45qZ8J7/Ln4FPJE2TdzD0Z8MLSNQiykMMmSyOCiFfy84Rq60emYB2vD09KjYwsoIpeDcBDTElBbXxND72yhd9pC/1CMid/5HUMvAL27OtcIJDzNKpRPNqPOpyt2aPGz9QWIs9hQ9LiX5s8m9hjTUu/f7MyIatjjd+tSfQ3ufZxPpmJhTaBtZtKLUcfOCUqADuO+QoH8B9v6U+P0HV1GLQmtoNFTb3s74ivZgjES0qfK+8RdGgBbcCMSy8eBvh98+et1KIFqSe1KQPyXULBMTsIYnysIwiZBJYdI20vseV+wuJkcqGemehKjaAb9L57xZm3g2zX0bZ2xk/fU+bCo7TlnbW7JuF1YdURo/2Gw7VclDG1W7LOtas2LX4upifZ/23rzpsnY/ALfRgrcWP5hYmV9VxVOQA1fZvp9F2UNU+7d7xRyVm5wiLp3/0dlV7vdw1PMiZrbDAYzIVqEjRY2YU03sJhPnlwIPcZUG5ltL6S8XCxU1eYS5cjr34veBmXAvy7yN4ZjArIG0dfD/5UpBNlX1ZPoxJOwyqRi3wQWtOzd4oNKh0LkoTm8cwqgIfKhqqGOhwo71I+zXnMemTv2B2AUzABWyFztGgGULjDDzWYwJUVBTjKCn5K2QGMK1CQT7SzziOjo+BhAmqBjzuc3xYym2eedGeOIRJVyTwDw37iCMe4g5Vbnsb5ZBdxOAnMT7HU4DHpxWGuQ7GeiY30Cpbvzss55+5Km1YsbD5ea3NI9QNYIXol5apgSu9dZ8f8xS5dtHpido5BclDuLWY4lhik0tbJa07yJhH0BOyEut/GRbYTS6RfiTYWGMCkNpfSHi7HvdiTglEVHKZXaVhezH4kkXiIvKopYAlPusftpE4a5IZwvw1x/eLvoDIh/zpo9FiQInsTb2SAkKHV42XYBjpJDg4374XiVb3ws4qM0s9eSQ5HzsMU4OZJKuopFjBM+dAZEl8RUMx5uU2N486Kr141tVsGQfGjORYMCJAMsxELeNT4RmWjRcpdTGBwcx6XN9drWqPmJzcrGrH4+DRc7+n1w3kPZwu0BkNr6hQrqgo7JTB9A5kdJ/H7P4cWBMwsmuixAzJB3yrQpnGIq90lxAXLzDCdn1LPibsRt7rHNjgQBklRgPZ8vTbjXdgXrTWQsK5MdrXXQVPp0Rinq3frzZKJ0qD6Qhc40VzAraUXlob1gvkhK3vpmHgI6FRlQZNx6eRqkp0zy4AQlX813fAPtL3jMRaitGFFjo0zmErloC+h+YYdVQ6k4F/epxAoF0BmqEoKNTt6j4vQZNQ2BoqF9Vj53TOIoNmDiu9Xp15RkIgQIGcoLpfoIbenzpGUAtqFJp5W+LLnx38jHeECTJ/navKY1NWfN0sY1T8/pB8kIH3DU3DX+u6W3YwpypBMYOhbSxGjq84RZ84fWJow8pyHqn4S/9J15EcCMsXqrfwyd9mhiu3+rEo9pPpoJkdZqHjra4NvzFwuThNKy6hao/SlLw3ZADUcUp3w3SRVfW2rhl80zOgTYnKE0Hs2qp1J6H3xqPqIkvUDRMFDYyRbsFI3M9MEyovPk8rlw7/0a81cDVLmBsR2ze2pBuKb23fbeZC0uXoIvDppfTwIDxk1Oq2dGesGc+oJXWJLGkOha3CX+DUnzgAp9HGH9RsPZN63Hn4RMA5eSVhPHO+9RcRb/IOgtW31V1Q5IPGtoxPjC+MEJbVlIMYADd9aHYWUIQKopuPOHmoqSkubnAKnzgKHqgIOfW5RdAgotN6BN+O2ZYHkuemLnvQ8U9THVrS1RtLmKbcC7PeeDsYznvqzeg6VCNwmr0Yyx1wnLjyT84BZz3EJyCptD3yeueAyDWIs0L2qs/VQ3HUyqfrja0V1LdDzqAikeWuV4sc7RLIB69jEIBjCkyZedoUHqCrOvShVzyd73OdrJW0hPOuQv2qOoHDc9xVb6Yu6uq3Xqp2ZaH46A7lzevbxQEmfrzvAYSJuZ4WDk1Hz3QX1LVdiUK0EvlAGAYlG3Md30r7dcPN63yqBCIj25prpvZP0nI4+EgWoFG95V596CurXpKRBGRjQlHCvy5Ib/iW8nZJWwrET3mgd6mEhfP4KCuaLjopWs7h+MdXFdIv8dHQJgg1xi1eYqB0uDYjxwVmri0Sv5XKut/onqapC+FQiC2C1lvYJ9MVco6yDYsS3AANUfMtvtbYI2hfwZatiSsnoUeMZd34GVjkMMKA+XnjJpXgRW2SHTZplVowPmJsvXy6w3cfO1AK2dvtZEKTkC/TY9LFiKHCG0DnrMQdGm2lzlBHM9iEYynH2UcVMhUEjsc0oDBTgo2ZSQ1gzkAHeWeBXYFjYLuuf8yzTCy7/RFR81WDjXMbq2BOH5dURnxo6oivmxL3cKzKInlZkD31nvpHB9Kk7GfcfE1t+1V64b9LtgeJGlpRFxQCAqWJ5DoY77ski8gsOEOr2uywZaoO/NGa0X0y1pNQHBi3b2SUGNpcZxDT7rLbBf1FSnQ8guxGW3W+36BW0gBje4DOz6Ba6SVk0xiKgt+q2JOFyr4SYfnu+Ic1QZYIuwHBrgzr6UvOcSCzPTOo7D6IC4ISeS7zkl4h+2VoeHpnG/uWR3+ysNgPcOIXQbv0n4mr3BwQcdKJxgPSeyuP/z1Jjg4e9nUvoXegqQVIE30EHx5GHv+FAVUNTowYDJgyFhf5IvlYmEqRif6+WN1MkEJmDcQITx9FX23a4mxy1AQRsOHO/+eImX9l8EMJI3oPWzVXxSOeHU1dUWYr2uAA7AMb+vAEZSbU3qob9ibCyXeypEMpZ6863o6QPqlqGHZkuWABSTVNd4cOh9hv3qEpSx2Zy/DJMP6cItEmiBJ5PFqQnDEIt3NrA3COlOSgz43D7gpNFNJ5MBh4oFzhDPiglC2ypsNU4ISywY2erkyb1NC3Qh/IfWj0eDgZI4/ln8WPfBsT3meTjq1Uqt1E7Zl/qftqkx6aM9KueMCekSnMrcHj1CqTWWzEzPsZGcDe3Ue4Ws+XFYVxNbOFF8ezkvQGR6ZOtOLU2lQEnMBStx47vE6Pb7AYMBRj2OOfZXfisjJnpTfSNjo6sZ6qSvNxZNmDeS7Gk3yYyCk1HtKN2UnhMIjOXUzAqDv90lx9O/q/AT1ZMnit5XQe9wmQxnE/WSH0CqZ9/2Hy+Sfmpeg8RwsHI5Z8kC8H293m/LHVVM/BA7HaTJYg5Enk7M/xWpq0192ACfBai2LA/qrCjCr6Dh1BIMzMXINBmX96MJ5Hn2nxln/RXPFhwHxUmSV0EV2V0jm86/dxxuYSU1W7sVkEbN9EzkG0QFwPhyHKyb3t+Fj5WoUUTErcazE/N6EW6Lvp0d//SDPj7EV9UdJN+Amnf3Wwk3A0SlJ9Z00yvXZ7n3z70G47Hfsow8Wq1JXcfwnA+Yxa5mFsgV464KKP4T31wqIgzFPd3eCe3j5ory5fBF2hgCFyVFrLzI9eetNXvM7oQqyFgDo4CTp/hDV9NMX9JDHQ/nyHTLvZLNLF6ftn2OxjGm8+PqOwhxnPHWipkE/8wbtyri80Sr7pMNkQGMfo4ZYK9OcCC4ESVFFbLMIvlxSoRqWie0wxqnLfcLSXMSpMMQEJYDVObYsXIQNv4TGNwjq1kvT1UOkicTrG3IaBZ3XdScS3u8sgeZPVpOLkbiF940FjbCeNRINNvDbd01EPBrTCPpm12m43ze1bBB59Ia6Ovhnur/Nvx3IxwSWol+3H2qfCJR8df6aQf4v6WiONxkK+IqT4pKQrZK/LplgDI/PJZbOep8dtbV7oCr6CgfpWa8NczOkPx81iSHbsNhVSJBOtrLIMrL31LK9TqHqAbAHe0RLmmV806kRLDLNEhUEJfm9u0sxpkL93Zgd6rw+tqBfTMi59xqXHLXSHwSbSBl0EK0+loECOPtrl+/nsaFe197di4yUgoe4jKoAJDXc6DGDjrQOoFDWZJ9HXwt8xDrQP+7aRwWKWI1GF8s8O4KzxWBBcwnl3vnl1Oez3oh6Ea1vjR7/z7DDTrFtqU2W/KAEzAuXDNZ7MY73MF216dzdSbWmUp4lcm7keJfWaMHgut9x5C9mj66Z0lJ+yhsjVvyiWrfk1lzPOTdhG15Y7gQlXtacvI7qv/XNSscDwqkgwHT/gUsD5yB7LdRRvJxQGYINn9hTpodKFVSTPrtGvyQw+HlRFXIkodErAGu9Iy1YpfSPc3jkFh5CX3lPxv7aqjE/JAfTIpEjGb/H7MO0e2vsViSW1qa/Lmi4/n4DEI3g7lYrcanspDfEpKkdV1OjSLOy0BCUqVoECaB55vs06rXl4jqmLsPsFM/7vYJ0vrBhDCm/00A/H81l1uekJ/6Lml3Hb9+NKiLqATJmDpyzfYZFHumEjC662L0Bwkxi7E9U4cQA0XMVDuMYAIeLMPgQaMVOd8fmt5SflFIfuBoszeAw7ow5gXPE2Y/yBc/7jExARUf/BxIHQBF5Sn3i61w4z5xJdCyO1F1X3+3ax+JSvMeZ7S6QSKp1Fp/sjYz6Z+VgCZzibGeEoujryfMulH7Rai5kAft9ebcW50DyJr2uo2z97mTWIu45YsSnNSMrrNUuG1XsYBtD9TDYzQffKB87vWbkM4EbPAFgoBV4GQS+vtFDUqOFAoi1nTtmIOvg38N4hT2Sn8r8clmBCXspBlMBYTnrqFJGBT3wZOzAyJDre9dHH7+x7qaaKDOB4UQALD5ecS0DE4obubQEiuJZ0EpBVpLuYcce8Aa4PYd/V4DLDAJBYKQPCWTcrEaZ5HYbJi11Gd6hjGom1ii18VHYnG28NKpkz2UKVPxlhYSp8uZr367iOmoy7zsxehW9wzcy2zG0a80PBMCRQMb32hnaHeOR8fnNDzZhaNYhkOdDsBUZ3loDMa1YP0uS0cjUP3b/6DBlqmZOeNABDsLl5BI5QJups8uxAuWJdkUB/pO6Zax6tsg7fN5mjjDgMGngO+DPcKqiHIDbFIGudxtPTIyDi9SFMKBDcfdGQRv41q1AqmxgkVfJMnP8w/Bc7N9/TR6C7mGObFqFkIEom8sKi2xYqJLTCHK7cxzaZvqODo22c3wisBCP4HeAgcRbNPAsBkNRhSmD48dHupdBRw4mIvtS5oeF6zeT1KMCyhMnmhpkFAGWnGscoNkwvQ8ZM5lE/vgTHFYL99OuNxdFBxTEDd5v2qLR8y9WkXsWgG6kZNndFG+pO/UAkOCipqIhL3hq7cRSdrCq7YhUsTocEcnaFa6nVkhnSeRYUA1YO0z5itF9Sly3VlxYDw239TJJH6f3EUfYO5lb7bcFcz8Bp7Oo8QmnsUHOz/fagVUBtKEw1iT88j+aKkv8cscKNkMxjYr8344D1kFoZ7/td1W6LCNYN594301tUGRmFjAzeRg5vyoM1F6+bJZ/Q54jN/k8SFd3DxPTYaAUsivsBfgTn7Mx8H2SpPt4GOdYRnEJOH6jHM2p6SgB0gzIRq6fHxGMmSmqaPCmlfwxiuloaVIitLGN8wie2CDWhkzLoCJcODh7KIOAqbHEvXdUxaS4TTTs07Clzj/6GmVs9kiZDerMxEnhUB6QQPlcfqkG9882RqHoLiHGBoHfQuXIsAG8GTAtao2KVwRnvvam8jo1e312GQAKWEa4sUVEAMG4G6ckcONDwRcg1e2D3+ohXgY4UAWF8wHKQMrSnzCgfFpsxh+aHXMGtPQroQasRY4U6UdG0rz1Vjbka0MekOGRZQEvqQFlxseFor8zWFgHek3v29+WqN6gaK5gZOTOMZzpQIC1201LkMCXild3vWXSc5UX9xcFYfbRPzGFa1FDcPfPB/jUEq/FeGt419CI3YmBlVoHsa4KdcwQP5ZSwHHhFJ7/Ph/Rap/4vmG91eDwPP0lDfCDRCLszTqfzM71xpmiKi2HwS4WlqvGNwtvwF5Dqpn6KTq8ax00UMPkxDcZrEEEsIvHiUXXEphdb4GB4FymlPwBz4Gperqq5pW7TQ6/yNRhW8VT5NhuP0udlxo4gILq5ZxAZk8ZGh3g4CqxJlPKY7AQxupfUcVpWT5VItp1+30UqoyP4wWsRo3olRRgkWZZ2ZN6VC3OZFeXB8NbnUrSdikNptD1QiGuKkr8EmSR/AK9Rw+FF3s5uwuPbvHGiPeFOViltMK7AUaOsq9+x9cndk3iJEE5LKZRlWJbKOZweROzmPNVPkjE3K/TyA57Rs68TkZ3MR8akKpm7cFjnjPd/DdkWjgYoKHSr5Wu5ssoBYU4acRs5g2DHxUmdq8VXOXRbunD8QN0LhgkssgahcdoYsNvuXGUK/KXD/7oFb+VGdhqIn02veuM5bLudJOc2Ky0GMaG4W/xWBxIJcL7yliJOXOpx0AkBqUgzlDczmLT4iILXDxxtRR1oZa2JWFgiAb43obrJnG/TZC2KSK2wqOzRZTXavZZFMb1f3bXvVaNaK828w9TO610gk8JNf3gMfETzXXsbcvRGCG9JWQZ6+cDPqc4466Yo2RcKH+PILeKOqtnlbInR3MmBeGG3FH10yzkybuqEC2HSQwpA0An7d9+73BkDUTm30bZmoP/RGbgFN+GrCOfADgqr0WbI1a1okpFms8iHYw9hm0zUvlEMivBRxModrbJJ+9/p3jUdQQ9BCtQdxnOGrT5dzRUmw0593/mbRSdBg0nRvRZM5/E16m7ZHmDEtWhwvfdZCZ8J8M12W0yRMszXamWfQTwIZ4ayYktrnscQuWr8idp3PjT2eF/jmtdhIfcpMnb+IfZY2FebW6UY/AK3jP4u3Tu4zE4qlnQgLFbM19EBIsNf7KhjdbqQ/D6yiDb+NlEi2SKD+ivXVUK8ib0oBo366gXkR8ZxGjpJIDcEgZPa9TcYe0TIbiPl/rPUQDu3XBJ9X/GNq3FAUsKsll57DzaGMrjcT+gctp+9MLYXCq+sqP81eVQ0r9lt+gcQfZbACRbEjvlMskztZG8gbC8Qn9tt26Q7y7nDrbZq/LEz7kR6Jc6pg3N9rVX8Y5MJrGlML9p9lU4jbTkKqCveeZUJjHB03m2KRKR2TytoFkTXOLg7keU1s1lrPMQJpoOKLuAAC+y1HlJucU6ysB5hsXhvSPPLq5J7JtnqHKZ4vYjC4Vy8153QY+6780xDuGARsGbOs1WqzH0QS765rnSKEbbKlkO8oI/VDwUd0is13tKpqILu1mDJFNy/iJAWcvDgjxvusIT+PGz3ST/J9r9Mtfd0jpaGeiLYIqXc7DiHSS8TcjFVksi66PEkxW1z6ujbLLUGNNYnzOWpH8BZGK4bCK7iR+MbIv8ncDAz1u4StN3vTTzewr9IQjk9wxFxn+6N1ddKs0vffJiS08N3a4G1SVrlZ97Q/M+8G9fe5AP6d9/Qq4WRnORVhofPIKEdCr3llspUfE0oKIIYoByBRPh+bX1HLS3JWGJRhIvE1aW4NTd8ePi4Z+kXb+Z8snYfSNcqijhAgVsx4RCM54cXUiYkjeBmmC4ajOHrChoELscJJC7+9jjMjw5BagZKlgRMiSNYz7h7vvZIoQqbtQmspc0cUk1G/73iXtSpROl5wtLgQi0mW2Ex8i3WULhcggx6E1LMVHUsdc9GHI1PH3U2Ko0PyGdn9KdVOLm7FPBui0i9a0HpA60MsewVE4z8CAt5d401Gv6zXlIT5Ybit1VIA0FCs7wtvYreru1fUyW3oLAZ/+aTnZrOcYRNVA8spoRtlRoWflsRClFcgzkqiHOrf0/SVw+EpVaFlJ0g4Kxq1MMOmiQdpMNpte8lMMQqm6cIFXlnGbfJllysKDi+0JJMotkqgIxOSQgU9dn/lWkeVf8nUm3iwX2Nl3WDw9i6AUK3vBAbZZrcJpDQ/N64AVwjT07Jef30GSSmtNu2WlW7YoyW2FlWfZFQUwk867EdLYKk9VG6JgEnBiBxkY7LMo4YLQJJlAo9l/oTvJkSARDF/XtyAzM8O2t3eT/iXa6wDN3WewNmQHdPfsxChU/KtLG2Mn8i4ZqKdSlIaBZadxJmRzVS/o4yA65RTSViq60oa395Lqw0pzY4SipwE0SXXsKV+GZraGSkr/RW08wPRvqvSUkYBMA9lPx4m24az+IHmCbXA+0faxTRE9wuGeO06DIXa6QlKJ3puIyiuAVfPr736vzo2pBirS+Vxel3TMm3JKhz9o2ZoRvaFVpIkykb0Hcm4oHFBMcNSNj7/4GJt43ogonY2Vg4nsDQIWxAcorpXACzgBqQPjYsE/VUpXpwNManEru4NwMCFPkXvMoqvoeLN3qyu/N1eWEHttMD65v19l/0kH2mR35iv/FI+yjoHJ9gPMz67af3Mq/BoWXqu3rphiWMXVkmnPSEkpGpUI2h1MThideGFEOK6YZHPwYzMBvpNC7+ZHxPb7epfefGyIB4JzO9DTNEYnDLVVHdQyvOEVefrk6Uv5kTQYVYWWdqrdcIl7yljwwIWdfQ/y+2QB3eR/qxYObuYyB4gTbo2in4PzarU1sO9nETkmj9/AoxDA+JM3GMqQtJR4jtduHtnoCLxd1gQUscHRB/MoRYIEsP2pDZ9KvHgtlk1iTbWWbHhohwFEYX7y51fUV2nuUmnoUcqnWIQAAgl9LTVX+Bc0QGNEhChxHR4YjfE51PUdGfsSFE6ck7BL3/hTf9jLq4G1IafINxOLKeAtO7quulYvH5YOBc+zX7CrMgWnW47/jfRsWnJjYYoE7xMfWV2HN2iyIqLI";
const qf = /* @__PURE__ */ new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), Yf = 4;
function F0(r) {
  let t = 0;
  function e() {
    return r[t++] << 8 | r[t++];
  }
  let n = e(), i = 1, s = [0, 1];
  for (let M = 1; M < n; M++)
    s.push(i += e());
  let a = e(), u = t;
  t += a;
  let l = 0, p = 0;
  function f() {
    return l == 0 && (p = p << 8 | r[t++], l = 8), p >> --l & 1;
  }
  const h = 31, b = 2 ** h, k = b >>> 1, R = k >> 1, x = b - 1;
  let S = 0;
  for (let M = 0; M < h; M++) S = S << 1 | f();
  let m = [], B = 0, C = b;
  for (; ; ) {
    let M = Math.floor(((S - B + 1) * i - 1) / C), V = 0, Z = n;
    for (; Z - V > 1; ) {
      let ht = V + Z >>> 1;
      M < s[ht] ? Z = ht : V = ht;
    }
    if (V == 0) break;
    m.push(V);
    let K = B + Math.floor(C * s[V] / i), tt = B + Math.floor(C * s[V + 1] / i) - 1;
    for (; !((K ^ tt) & k); )
      S = S << 1 & x | f(), K = K << 1 & x, tt = tt << 1 & x | 1;
    for (; K & ~tt & R; )
      S = S & k | S << 1 & x >>> 1 | f(), K = K << 1 ^ k, tt = (tt ^ k) << 1 | k | 1;
    B = K, C = 1 + tt - K;
  }
  let U = n - 4;
  return m.map((M) => {
    switch (M - U) {
      case 3:
        return U + 65792 + (r[u++] << 16 | r[u++] << 8 | r[u++]);
      case 2:
        return U + 256 + (r[u++] << 8 | r[u++]);
      case 1:
        return U + r[u++];
      default:
        return M - 1;
    }
  });
}
function z0(r) {
  let t = 0;
  return () => r[t++];
}
function Zh(r) {
  return z0(F0(L0(r)));
}
function L0(r) {
  let t = [];
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((i, s) => t[i.charCodeAt(0)] = s);
  let e = r.length, n = new Uint8Array(6 * e >> 3);
  for (let i = 0, s = 0, a = 0, u = 0; i < e; i++)
    u = u << 6 | t[r.charCodeAt(i)], a += 6, a >= 8 && (n[s++] = u >> (a -= 8));
  return n;
}
function U0(r) {
  return r & 1 ? ~r >> 1 : r >> 1;
}
function D0(r, t) {
  let e = Array(r);
  for (let n = 0, i = 0; n < r; n++) e[n] = i += U0(t());
  return e;
}
function io(r, t = 0) {
  let e = [];
  for (; ; ) {
    let n = r(), i = r();
    if (!i) break;
    t += n;
    for (let s = 0; s < i; s++)
      e.push(t + s);
    t += i + 1;
  }
  return e;
}
function Xh(r) {
  return so(() => {
    let t = io(r);
    if (t.length) return t;
  });
}
function tg(r) {
  let t = [];
  for (; ; ) {
    let e = r();
    if (e == 0) break;
    t.push(M0(e, r));
  }
  for (; ; ) {
    let e = r() - 1;
    if (e < 0) break;
    t.push(j0(e, r));
  }
  return t.flat();
}
function so(r) {
  let t = [];
  for (; ; ) {
    let e = r(t.length);
    if (!e) break;
    t.push(e);
  }
  return t;
}
function eg(r, t, e) {
  let n = Array(r).fill().map(() => []);
  for (let i = 0; i < t; i++)
    D0(r, e).forEach((s, a) => n[a].push(s));
  return n;
}
function M0(r, t) {
  let e = 1 + t(), n = t(), i = so(t);
  return eg(i.length, 1 + r, t).flatMap((a, u) => {
    let [l, ...p] = a;
    return Array(i[u]).fill().map((f, h) => {
      let b = h * n;
      return [l + h * e, p.map((k) => k + b)];
    });
  });
}
function j0(r, t) {
  let e = 1 + t();
  return eg(e, 1 + r, t).map((i) => [i[0], i.slice(1)]);
}
function G0(r) {
  let t = [], e = io(r);
  return i(n([]), []), t;
  function n(s) {
    let a = r(), u = so(() => {
      let l = io(r).map((p) => e[p]);
      if (l.length) return n(l);
    });
    return { S: a, B: u, Q: s };
  }
  function i({ S: s, B: a }, u, l) {
    if (!(s & 4 && l === u[u.length - 1])) {
      s & 2 && (l = u[u.length - 1]), s & 1 && t.push(u);
      for (let p of a)
        for (let f of p.Q)
          i(p, [...u, f], l);
    }
  }
}
function H0(r) {
  return r.toString(16).toUpperCase().padStart(2, "0");
}
function rg(r) {
  return `{${H0(r)}}`;
}
function V0(r) {
  let t = [];
  for (let e = 0, n = r.length; e < n; ) {
    let i = r.codePointAt(e);
    e += i < 65536 ? 1 : 2, t.push(i);
  }
  return t;
}
function xa(r) {
  let e = r.length;
  if (e < 4096) return String.fromCodePoint(...r);
  let n = [];
  for (let i = 0; i < e; )
    n.push(String.fromCodePoint(...r.slice(i, i += 4096)));
  return n.join("");
}
function Q0(r, t) {
  let e = r.length, n = e - t.length;
  for (let i = 0; n == 0 && i < e; i++) n = r[i] - t[i];
  return n;
}
var J0 = "AEUDTAHBCFQATQDRADAAcgAgADQAFAAsABQAHwAOACQADQARAAoAFwAHABIACAAPAAUACwAFAAwABAAQAAMABwAEAAoABQAIAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACgANAA0AAwAKAAkABAAdAAYAZwDSAdsDJgC0CkMB8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgsj26PTQyy8FfEQ8AY8IPAGcEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJF8AJpIBpob5AERSMAKNoAXqaQLUBMCzEiACnwRZEkkVsS7tANAsBG0RuAQLEPABv9HICTUBXigPZwRBApMDOwAamhtaABqEAY8KvKx3LQ4ArAB8UhwEBAVSagD8AEFZADkBIadVj2UMUgx5Il4ANQC9AxIB1BlbEPMAs30CGxlXAhwZKQIECBc6EbsCoxngzv7UzRQA8M0BawL6ZwkN7wABAD33OQRcsgLJCjMCjqUChtw/km+NAsXPAoP2BT84PwURAK0RAvptb6cApQS/OMMey5HJS84UdxpxTPkCogVFITaTOwERAK5pAvkNBOVyA7q3BKlOJSALAgUIBRcEdASpBXqzABXFSWZOawLCOqw//AolCZdvv3dSBkEQGyelEPcMMwG1ATsN7UvYBPEGOwTJH30ZGQ/NlZwIpS3dDO0m4y6hgFoj9SqDBe1L9DzdC01RaA9ZC2UJ4zpjgU4DIQENIosK3Q05CG0Q8wrJaw3lEUUHOQPVSZoApQcBCxEdNRW1JhBirAsJOXcG+xr2C48mrxMpevwF0xohBk0BKRr/AM8u54WwWjFcHE9fBgMLJSPHFKhQIA0lQLd4SBobBxUlqQKRQ3BKh1E2HpMh9jw9DWYuE1F8B/U8BRlPC4E8nkarRQ4R0j6NPUgiSUwsBDV/LC8niwnPD4UMuXxyAVkJIQmxDHETMREXN8UIOQcZLZckJxUIIUaVYJoE958D8xPRAwsFPwlBBxMDtRwtEy4VKQUNgSTXAvM21S6zAo9WgAEXBcsPJR/fEFBH4A7pCJsCZQODJesALRUhABcimwhDYwBfj9hTBS7LCMdqbCN0A2cU52ERcweRDlcHpxwzFb8c4XDIXguGCCijrwlbAXUJmQFfBOMICTVbjKAgQWdTi1gYmyBhQT9d/AIxDGUVn0S9h3gCiw9rEhsBNQFzBzkNAQJ3Ee0RaxCVCOuGBDW1M/g6JQRPIYMgEQonA09szgsnJvkM+GkBoxJiAww0PXfuZ6tgtiQX/QcZMsVBYCHxC5JPzQycGsEYQlQuGeQHvwPzGvMn6kFXBf8DowMTOk0z7gS9C2kIiwk/AEkOoxcH1xhqCnGM0AExiwG3mQNXkYMCb48GNwcLAGcLhwV55QAdAqcIowAFAM8DVwA5Aq0HnQAZAIVBAT0DJy8BIeUCjwOTCDHLAZUvAfMpBBvDDBUA9zduSgLDsQKAamaiBd1YAo4CSTUBTSUEBU5HUQOvceEA2wBLBhPfRwEVq0rLGuNDAd9vKwDHAPsABTUHBUEBzQHzbQC3AV8LMQmis7UBTekpAIMAFWsB1wKJAN0ANQB/8QFTAE0FWfkF0wJPSQERMRgrV2EBuwMfATMBDQB5BsuNpckHHwRtB9MCEBsV4QLvLge1AQMi3xPNQsUCvd5VoWACZIECYkJbTa9bNyACofcCaJgCZgkCn4Q4GwsCZjsCZiYEbgR/A38TA36SOQY5dxc5gjojIwJsHQIyNjgKAm3HAm2u74ozZ0UrAWcA3gDhAEoFB5gMjQD+C8IADbUCdy8CdqI/AnlLQwJ4uh1c20WuRtcCfD8CesgCfQkCfPAFWQUgSABIfWMkAoFtAoAAAoAFAn+uSVhKWxUXSswC0QEC0MxLJwOITwOH5kTFkTIC8qFdAwMDrkvOTC0lA89NTE2vAos/AorYwRsHHUNnBbcCjjcCjlxAl4ECjtkCjlx4UbRTNQpS1FSFApP7ApMMAOkAHFUeVa9V0AYsGymVhjLheGZFOzkCl58C77JYIagAWSUClo8ClnycAKlZrFoJgU0AOwKWtQKWTlxEXNECmcsCmWRcyl0HGQKcmznCOp0CnBYCn5sCnriKAB0PMSoPAp3xAp6SALU9YTRh7wKe0wKgbgGpAp6fHwKeTqVjyGQnJSsCJ68CJn4CoPsCoEwCot0CocQCpi8Cpc4Cp/8AfQKn8mh8aLEAA0lqHGrRAqzjAqyuAq1nAq0CAlcdAlXcArHh1wMfTmyXArK9DQKy6Bds4G1jbUhfAyXNArZcOz9ukAMpRQK4XgK5RxUCuSp3cDZw4QK9GQK72nCWAzIRAr6IcgIDM3ECvhpzInNPAsPLAsMEc4J0SzVFdOADPKcDPJoDPb8CxXwCxkcCxhCJAshpUQLIRALJTwLJLgJknQLd0nh5YXiueSVL0AMYo2cCAmH0GfOVJHsLXpJeuxECz2sCz2wvS1PS8xOfAMatAs9zASnqA04SfksFAtwnAtuKAtJPA1JcA1NfAQEDVYyAiT8AyxbtYEWCHILTgs6DjQLaxwLZ3oQQhEmnPAOGpQAvA2QOhnFZ+QBVAt9lAt64c3cC4i/tFAHzMCcB9JsB8tKHAuvzAulweQLq+QLq5AD5RwG5Au6JAuuclqqXAwLuPwOF4Jh5cOBxoQLzAwBpA44WmZMC9xMDkW4DkocC95gC+dkC+GaaHJqruzebHgOdgwL++gEbADmfHJ+zAwWNA6ZqA6bZANHFAwZqoYiiBQkDDEkCwAA/AwDhQRdTARHzA2sHl2cFAJMtK7evvdsBiZkUfxEEOQH7KQUhDp0JnwCS/SlXxQL3AZ0AtwW5AG8LbUEuFCaNLgFDAYD8AbUmAHUDDgRtACwCFgyhAAAKAj0CagPdA34EkQEgRQUhfAoABQBEABMANhICdwEABdUDa+8KxQIA9wqfJ7+xt+UBkSFBQgHpFH8RNMCJAAQAGwBaAkUChIsABjpTOpSNbQC4Oo860ACNOME63AClAOgAywE6gTo7Ofw5+Tt2iTpbO56JOm85GAFWATMBbAUvNV01njWtNWY1dTW2NcU1gjWRNdI14TWeNa017jX9NbI1wTYCNhE1xjXVNhY2JzXeNe02LjY9Ni41LSE2OjY9Njw2yTcIBJA8VzY4Nt03IDcPNsogN4k3MAoEsDxnNiQ3GTdsOo03IULUQwdC4EMLHA8PCZsobShRVQYA6X8A6bABFCnXAukBowC9BbcAbwNzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgBFLWZAu0BhQCjBcEAbykBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUABavAj626xQAJP0A3etzuf4NNRA7efy2Z9NQrCnC0OSyANz5BBIbJ5IFDR6miIavYS6tprjjmuKebxm5C74Q225X1pkaYYPb6f1DK4k3xMEBb9S2WMjEibTNWhsRJIA+vwNVEiXTE5iXs/wezV66oFLfp9NZGYW+Gk19J2+bCT6Ye2w6LDYdgzKMUabk595eLBCXANz9HUpWbATq9vqXVx9XDg+Pc9Xp4+bsS005SVM/BJBM4687WUuf+Uj9dEi8aDNaPxtpbDxcG1THTImUMZq4UCaaNYpsVqraNyKLJXDYsFZ/5jl7bLRtO88t7P3xZaAxhb5OdPMXqsSkp1WCieG8jXm1U99+blvLlXzPCS+M93VnJCiK+09LfaSaBAVBomyDgJua8dfUzR7ga34IvR2Nvj+A9heJ6lsl1KG4NkI1032Cnff1m1wof2B9oHJK4bi6JkEdSqeNeiuo6QoZZincoc73/TH9SXF8sCE7XyuYyW8WSgbGFCjPV0ihLKhdPs08Tx82fYAkLLc4I2wdl4apY7GU5lHRFzRWJep7Ww3wbeA3qmd59/86P4xuNaqDpygXt6M85glSBHOCGgJDnt+pN9bK7HApMguX6+06RZNjzVmcZJ+wcUrJ9//bpRNxNuKpNl9uFds+S9tdx7LaM5ZkIrPj6nIU9mnbFtVbs9s/uLgl8MVczAwet+iOEzzBlYW7RCMgE6gyNLeq6+1tIx4dpgZnd0DksJS5f+JNDpwwcPNXaaVspq1fbQajOrJgK0ofKtJ1Ne90L6VO4MOl5S886p7u6xo7OLjG8TGL+HU1JXGJgppg4nNbNJ5nlzSpuPYy21JUEcUA94PoFiZfjZue+QnyQ80ekOuZVkxx4g+cvhJfHgNl4hy1/a6+RKcKlar/J29y//EztlbVPHVUeQ1zX86eQVAjR/M3dA9w4W8LfaXp4EgM85wOWasli837PzVMOnsLzR+k3o75/lRPAJSE1xAKQzEi5v10ke+VBvRt1cwQRMd+U5mLCTGVd6XiZtgBG5cDi0w22GKcVNvHiu5LQbZEDVtz0onn7k5+heuKXVsZtSzilkLRAUmjMXEMB3J9YC50XBxPiz53SC+EhnPl9WsKCv92SM/OFFIMJZYfl0WW8tIO3UxYcwdMAj7FSmgrsZ2aAZO03BOhP1bNNZItyXYQFTpC3SG1VuPDqH9GkiCDmE+JwxyIVSO5siDErAOpEXFgjy6PQtOVDj+s6e1r8heWVvmZnTciuf4EiNZzCAd7SOMhXERIOlsHIMG399i9aLTy3m2hRLZjJVDNLS53iGIK11dPqQt0zBDyg6qc7YqkDm2M5Ve6dCWCaCbTXX2rToaIgz6+zh4lYUi/+6nqcFMAkQJKHYLK0wYk5N9szV6xihDbDDFr45lN1K4aCXBq/FitPSud9gLt5ZVn+ZqGX7cwm2z5EGMgfFpIFyhGGuDPmso6TItTMwny+7uPnLCf4W6goFQFV0oQSsc9VfMmVLcLr6ZetDZbaSFTLqnSO/bIPjA3/zAUoqgGFAEQS4IhuMzEp2I3jJzbzkk/IEmyax+rhZTwd6f+CGtwPixu8IvzACquPWPREu9ZvGkUzpRwvRRuaNN6cr0W1wWits9ICdYJ7ltbgMiSL3sTPeufgNcVqMVWFkCPDH4jG2jA0XcVgQj62Cb29v9f/z/+2KbYvIv/zzjpQAPkliaVDzNrW57TZ/ZOyZD0nlfMmAIBIAGAI0D3k/mdN4xr9v85ZbZbbqfH2jGd5hUqNZWwl5SPfoGmfElmazUIeNL1j/mkF7VNAzTq4jNt8JoQ11NQOcmhprXoxSxfRGJ9LDEOAQ+dmxAQH90iti9e2u/MoeuaGcDTHoC+xsmEeWmxEKefQuIzHbpw5Tc5cEocboAD09oipWQhtTO1wivf/O+DRe2rpl/E9wlrzBorjJsOeG1B/XPW4EaJEFdNlECEZga5ZoGRHXgYouGRuVkm8tDESiEyFNo+3s5M5puSdTyUL2llnINVHEt91XUNW4ewdMgJ4boJfEyt/iY5WXqbA+A2Fkt5Z0lutiWhe9nZIyIUjyXDC3UsaG1t+eNx6z4W/OYoTB7A6x+dNSTOi9AInctbESqm5gvOLww7OWXPrmHwVZasrl4eD113pm+JtT7JVOvnCXqdzzdTRHgJ0PiGTFYW5Gvt9R9LD6Lzfs0v/TZZHSmyVNq7viIHE6DBK7Qp07Iz55EM8SYtQvZf/obBniTWi5C2/ovHfw4VndkE5XYdjOhCMRjDeOEfXeN/CwfGduiUIfsoFeUxXeQXba7c7972XNv8w+dTjjUM0QeNAReW+J014dKAD/McQYXT7c0GQPIkn3Ll6R7gGjuiQoZD0TEeEqQpKoZ15g/0OPQI17QiSv9AUROa/V/TQN3dvLArec3RrsYlvBm1b8LWzltdugsC50lNKYLEp2a+ZZYqPejULRlOJh5zj/LVMyTDvwKhMxxwuDkxJ1QpoNI0OTWLom4Z71SNzI9TV1iXJrIu9Wcnd+MCaAw8o1jSXd94YU/1gnkrC9BUEOtQvEIQ7g0i6h+KL2JKk8Ydl7HruvgWMSAmNe+LshGhV4qnWHhO9/RIPQzY1tHRj2VqOyNsDpK0cww+56AdDC4gsWwY0XxoucIWIqs/GcwnWqlaT0KPr8mbK5U94/301i1WLt4YINTVvCFBrFZbIbY8eycOdeJ2teD5IfPLCRg7jjcFTwlMFNl9zdh/o3E/hHPwj7BWg0MU09pPrBLbrCgm54A6H+I6v27+jL5gkjWg/iYdks9jbfVP5y/n0dlgWEMlKasl7JvFZd56LfybW1eeaVO0gxTfXZwD8G4SI116yx7UKVRgui6Ya1YpixqXeNLc8IxtAwCU5IhwQgn+NqHnRaDv61CxKhOq4pOX7M6pkA+Pmpd4j1vn6ACUALoLLc4vpXci8VidLxzm7qFBe7s+quuJs6ETYmnpgS3LwSZxPIltgBDXz8M1k/W2ySNv2f9/NPhxLGK2D21dkHeSGmenRT3Yqcdl0m/h3OYr8V+lXNYGf8aCCpd4bWjE4QIPj7vUKN4Nrfs7ML6Y2OyS830JCnofg/k7lpFpt4SqZc5HGg1HCOrHvOdC8bP6FGDbE/VV0mX4IakzbdS/op+Kt3G24/8QbBV7y86sGSQ/vZzU8FXs7u6jIvwchsEP2BpIhW3G8uWNwa3HmjfH/ZjhhCWvluAcF+nMf14ClKg5hGgtPLJ98ueNAkc5Hs2WZlk2QHvfreCK1CCGO6nMZVSb99VM/ajr8WHTte9JSmkXq/i/U943HEbdzW6Re/S88dKgg8pGOLlAeNiqrcLkUR3/aClFpMXcOUP3rmETcWSfMXZE3TUOi8i+fqRnTYLflVx/Vb/6GJ7eIRZUA6k3RYR3iFSK9c4iDdNwJuZL2FKz/IK5VimcNWEqdXjSoxSgmF0UPlDoUlNrPcM7ftmA8Y9gKiqKEHuWN+AZRIwtVSxye2Kf8rM3lhJ5XcBXU9n4v0Oy1RU2M+4qM8AQPVwse8ErNSob5oFPWxuqZnVzo1qB/IBxkM3EVUKFUUlO3e51259GgNcJbCmlvrdjtoTW7rChm1wyCKzpCTwozUUEOIcWLneRLgMXh+SjGSFkAllzbGS5HK7LlfCMRNRDSvbQPjcXaenNYxCvu2Qyznz6StuxVj66SgI0T8B6/sfHAJYZaZ78thjOSIFumNWLQbeZixDCCC+v0YBtkxiBB3jefHqZ/dFHU+crbj6OvS1x/JDD7vlm7zOVPwpUC01nhxZuY/63E7g";
const ao = 44032, yc = 4352, bc = 4449, mc = 4519, ng = 19, ig = 21, Ra = 28, vc = ig * Ra, W0 = ng * vc, K0 = ao + W0, $0 = yc + ng, q0 = bc + ig, Y0 = mc + Ra;
function Ha(r) {
  return r >> 24 & 255;
}
function sg(r) {
  return r & 16777215;
}
let Kl, Zf, $l, $o;
function Z0() {
  let r = Zh(J0);
  Kl = new Map(Xh(r).flatMap((t, e) => t.map((n) => [n, e + 1 << 24]))), Zf = new Set(io(r)), $l = /* @__PURE__ */ new Map(), $o = /* @__PURE__ */ new Map();
  for (let [t, e] of tg(r)) {
    if (!Zf.has(t) && e.length == 2) {
      let [n, i] = e, s = $o.get(n);
      s || (s = /* @__PURE__ */ new Map(), $o.set(n, s)), s.set(i, t);
    }
    $l.set(t, e.reverse());
  }
}
function ag(r) {
  return r >= ao && r < K0;
}
function X0(r, t) {
  if (r >= yc && r < $0 && t >= bc && t < q0)
    return ao + (r - yc) * vc + (t - bc) * Ra;
  if (ag(r) && t > mc && t < Y0 && (r - ao) % Ra == 0)
    return r + (t - mc);
  {
    let e = $o.get(r);
    return e && (e = e.get(t), e) ? e : -1;
  }
}
function og(r) {
  Kl || Z0();
  let t = [], e = [], n = !1;
  function i(s) {
    let a = Kl.get(s);
    a && (n = !0, s |= a), t.push(s);
  }
  for (let s of r)
    for (; ; ) {
      if (s < 128)
        t.push(s);
      else if (ag(s)) {
        let a = s - ao, u = a / vc | 0, l = a % vc / Ra | 0, p = a % Ra;
        i(yc + u), i(bc + l), p > 0 && i(mc + p);
      } else {
        let a = $l.get(s);
        a ? e.push(...a) : i(s);
      }
      if (!e.length) break;
      s = e.pop();
    }
  if (n && t.length > 1) {
    let s = Ha(t[0]);
    for (let a = 1; a < t.length; a++) {
      let u = Ha(t[a]);
      if (u == 0 || s <= u) {
        s = u;
        continue;
      }
      let l = a - 1;
      for (; ; ) {
        let p = t[l + 1];
        if (t[l + 1] = t[l], t[l] = p, !l || (s = Ha(t[--l]), s <= u)) break;
      }
      s = Ha(t[a]);
    }
  }
  return t;
}
function t1(r) {
  let t = [], e = [], n = -1, i = 0;
  for (let s of r) {
    let a = Ha(s), u = sg(s);
    if (n == -1)
      a == 0 ? n = u : t.push(u);
    else if (i > 0 && i >= a)
      a == 0 ? (t.push(n, ...e), e.length = 0, n = u) : e.push(u), i = a;
    else {
      let l = X0(n, u);
      l >= 0 ? n = l : i == 0 && a == 0 ? (t.push(n), n = u) : (e.push(u), i = a);
    }
  }
  return n >= 0 && t.push(n, ...e), t;
}
function cg(r) {
  return og(r).map(sg);
}
function e1(r) {
  return t1(og(r));
}
const Xf = 45, ug = ".", lg = 65039, _g = 1, Ac = (r) => Array.from(r);
function oo(r, t) {
  return r.P.has(t) || r.Q.has(t);
}
class r1 extends Array {
  get is_emoji() {
    return !0;
  }
  // free tagging system
}
let ql, fg, mi, Yl, dg, Rs, sl, ps, di, td, Zl;
function j_() {
  if (ql) return;
  let r = Zh(C0);
  const t = () => io(r), e = () => new Set(t()), n = (f, h) => h.forEach((b) => f.add(b));
  ql = new Map(tg(r)), fg = e(), mi = t(), Yl = new Set(t().map((f) => mi[f])), mi = new Set(mi), dg = e(), e();
  let i = Xh(r), s = r();
  const a = () => {
    let f = /* @__PURE__ */ new Set();
    return t().forEach((h) => n(f, i[h])), n(f, t()), f;
  };
  Rs = so((f) => {
    let h = so(r).map((b) => b + 96);
    if (h.length) {
      let b = f >= s;
      h[0] -= 32, h = xa(h), b && (h = `Restricted[${h}]`);
      let k = a(), R = a(), x = !r();
      return { N: h, P: k, Q: R, M: x, R: b };
    }
  }), sl = e(), ps = /* @__PURE__ */ new Map();
  let u = t().concat(Ac(sl)).sort((f, h) => f - h);
  u.forEach((f, h) => {
    let b = r(), k = u[h] = b ? u[h - b] : { V: [], M: /* @__PURE__ */ new Map() };
    k.V.push(f), sl.has(f) || ps.set(f, k);
  });
  for (let { V: f, M: h } of new Set(ps.values())) {
    let b = [];
    for (let R of f) {
      let x = Rs.filter((m) => oo(m, R)), S = b.find(({ G: m }) => x.some((B) => m.has(B)));
      S || (S = { G: /* @__PURE__ */ new Set(), V: [] }, b.push(S)), S.V.push(R), n(S.G, x);
    }
    let k = b.flatMap((R) => Ac(R.G));
    for (let { G: R, V: x } of b) {
      let S = new Set(k.filter((m) => !R.has(m)));
      for (let m of x)
        h.set(m, S);
    }
  }
  di = /* @__PURE__ */ new Set();
  let l = /* @__PURE__ */ new Set();
  const p = (f) => di.has(f) ? l.add(f) : di.add(f);
  for (let f of Rs) {
    for (let h of f.P) p(h);
    for (let h of f.Q) p(h);
  }
  for (let f of di)
    !ps.has(f) && !l.has(f) && ps.set(f, _g);
  n(di, cg(di)), td = G0(r).map((f) => r1.from(f)).sort(Q0), Zl = /* @__PURE__ */ new Map();
  for (let f of td) {
    let h = [Zl];
    for (let b of f) {
      let k = h.map((R) => {
        let x = R.get(b);
        return x || (x = /* @__PURE__ */ new Map(), R.set(b, x)), x;
      });
      b === lg ? h.push(...k) : h = k;
    }
    for (let b of h)
      b.V = f;
  }
}
function G_(r) {
  return (pg(r) ? "" : `${H_(Zc([r]))} `) + rg(r);
}
function H_(r) {
  return `"${r}"‎`;
}
function n1(r) {
  if (r.length >= 4 && r[2] == Xf && r[3] == Xf)
    throw new Error(`invalid label extension: "${xa(r.slice(0, 4))}"`);
}
function i1(r) {
  for (let e = r.lastIndexOf(95); e > 0; )
    if (r[--e] !== 95)
      throw new Error("underscore allowed only at start");
}
function s1(r) {
  let t = r[0], e = qf.get(t);
  if (e) throw qa(`leading ${e}`);
  let n = r.length, i = -1;
  for (let s = 1; s < n; s++) {
    t = r[s];
    let a = qf.get(t);
    if (a) {
      if (i == s) throw qa(`${e} + ${a}`);
      i = s + 1, e = a;
    }
  }
  if (i == n) throw qa(`trailing ${e}`);
}
function Zc(r, t = 1 / 0, e = rg) {
  let n = [];
  a1(r[0]) && n.push("◌"), r.length > t && (t >>= 1, r = [...r.slice(0, t), 8230, ...r.slice(-t)]);
  let i = 0, s = r.length;
  for (let a = 0; a < s; a++) {
    let u = r[a];
    pg(u) && (n.push(xa(r.slice(i, a))), n.push(e(u)), i = a + 1);
  }
  return n.push(xa(r.slice(i, s))), n.join("");
}
function a1(r) {
  return j_(), mi.has(r);
}
function pg(r) {
  return j_(), dg.has(r);
}
function o1(r) {
  return _1(c1(r, e1, p1));
}
function c1(r, t, e) {
  if (!r) return [];
  j_();
  let n = 0;
  return r.split(ug).map((i) => {
    let s = V0(i), a = {
      input: s,
      offset: n
      // codepoint, not substring!
    };
    n += s.length + 1;
    try {
      let u = a.tokens = d1(s, t, e), l = u.length, p;
      if (!l)
        throw new Error("empty label");
      let f = a.output = u.flat();
      if (i1(f), !(a.emoji = l > 1 || u[0].is_emoji) && f.every((b) => b < 128))
        n1(f), p = "ASCII";
      else {
        let b = u.flatMap((k) => k.is_emoji ? [] : k);
        if (!b.length)
          p = "Emoji";
        else {
          if (mi.has(f[0])) throw qa("leading combining mark");
          for (let x = 1; x < l; x++) {
            let S = u[x];
            if (!S.is_emoji && mi.has(S[0]))
              throw qa(`emoji + combining mark: "${xa(u[x - 1])} + ${Zc([S[0]])}"`);
          }
          s1(f);
          let k = Ac(new Set(b)), [R] = l1(k);
          f1(R, b), u1(R, k), p = R.N;
        }
      }
      a.type = p;
    } catch (u) {
      a.error = u;
    }
    return a;
  });
}
function u1(r, t) {
  let e, n = [];
  for (let i of t) {
    let s = ps.get(i);
    if (s === _g) return;
    if (s) {
      let a = s.M.get(i);
      if (e = e ? e.filter((u) => a.has(u)) : Ac(a), !e.length) return;
    } else
      n.push(i);
  }
  if (e) {
    for (let i of e)
      if (n.every((s) => oo(i, s)))
        throw new Error(`whole-script confusable: ${r.N}/${i.N}`);
  }
}
function l1(r) {
  let t = Rs;
  for (let e of r) {
    let n = t.filter((i) => oo(i, e));
    if (!n.length)
      throw Rs.some((i) => oo(i, e)) ? gg(t[0], e) : hg(e);
    if (t = n, n.length == 1) break;
  }
  return t;
}
function _1(r) {
  return r.map(({ input: t, error: e, output: n }) => {
    if (e) {
      let i = e.message;
      throw new Error(r.length == 1 ? i : `Invalid label ${H_(Zc(t, 63))}: ${i}`);
    }
    return xa(n);
  }).join(ug);
}
function hg(r) {
  return new Error(`disallowed character: ${G_(r)}`);
}
function gg(r, t) {
  let e = G_(t), n = Rs.find((i) => i.P.has(t));
  return n && (e = `${n.N} ${e}`), new Error(`illegal mixture: ${r.N} + ${e}`);
}
function qa(r) {
  return new Error(`illegal placement: ${r}`);
}
function f1(r, t) {
  for (let e of t)
    if (!oo(r, e))
      throw gg(r, e);
  if (r.M) {
    let e = cg(t);
    for (let n = 1, i = e.length; n < i; n++)
      if (Yl.has(e[n])) {
        let s = n + 1;
        for (let a; s < i && Yl.has(a = e[s]); s++)
          for (let u = n; u < s; u++)
            if (e[u] == a)
              throw new Error(`duplicate non-spacing marks: ${G_(a)}`);
        if (s - n > Yf)
          throw new Error(`excessive non-spacing marks: ${H_(Zc(e.slice(n - 1, s)))} (${s - n}/${Yf})`);
        n = s;
      }
  }
}
function d1(r, t, e) {
  let n = [], i = [];
  for (r = r.slice().reverse(); r.length; ) {
    let s = h1(r);
    if (s)
      i.length && (n.push(t(i)), i = []), n.push(e(s));
    else {
      let a = r.pop();
      if (di.has(a))
        i.push(a);
      else {
        let u = ql.get(a);
        if (u)
          i.push(...u);
        else if (!fg.has(a))
          throw hg(a);
      }
    }
  }
  return i.length && n.push(t(i)), n;
}
function p1(r) {
  return r.filter((t) => t != lg);
}
function h1(r, t) {
  let e = Zl, n, i = r.length;
  for (; i && (e = e.get(r[--i]), !!e); ) {
    let { V: s } = e;
    s && (n = s, r.length = i);
  }
  return n;
}
const wg = new Uint8Array(32);
wg.fill(0);
function ed(r) {
  return N(r.length !== 0, "invalid ENS name; empty component", "comp", r), r;
}
function yg(r) {
  const t = Zr(g1(r)), e = [];
  if (r.length === 0)
    return e;
  let n = 0;
  for (let i = 0; i < t.length; i++)
    t[i] === 46 && (e.push(ed(t.slice(n, i))), n = i + 1);
  return N(n < t.length, "invalid ENS name; empty component", "name", r), e.push(ed(t.slice(n))), e;
}
function g1(r) {
  try {
    if (r.length === 0)
      throw new Error("empty label");
    return o1(r);
  } catch (t) {
    N(!1, `invalid ENS name (${t.message})`, "name", r);
  }
}
function Xl(r) {
  N(typeof r == "string", "invalid ENS name; not a string", "name", r), N(r.length, "invalid ENS name (empty label)", "name", r);
  let t = wg;
  const e = yg(r);
  for (; e.length; )
    t = ne(ee([t, ne(e.pop())]));
  return dt(t);
}
function w1(r, t) {
  const e = t;
  return N(e <= 255, "DNS encoded label cannot exceed 255", "length", e), dt(ee(yg(r).map((n) => {
    N(n.length <= e, `label ${JSON.stringify(r)} exceeds ${e} bytes`, "name", r);
    const i = new Uint8Array(n.length + 1);
    return i.set(n, 1), i[0] = i.length - 1, i;
  }))) + "00";
}
function al(r, t) {
  return {
    address: Ut(r),
    storageKeys: t.map((e, n) => (N(Wt(e, 32), "invalid slot", `storageKeys[${n}]`, e), e.toLowerCase()))
  };
}
function is(r) {
  if (Array.isArray(r))
    return r.map((e, n) => Array.isArray(e) ? (N(e.length === 2, "invalid slot set", `value[${n}]`, e), al(e[0], e[1])) : (N(e != null && typeof e == "object", "invalid address-slot set", "value", r), al(e.address, e.storageKeys)));
  N(r != null && typeof r == "object", "invalid access list", "value", r);
  const t = Object.keys(r).map((e) => {
    const n = r[e].reduce((i, s) => (i[s] = !0, i), {});
    return al(e, Object.keys(n).sort());
  });
  return t.sort((e, n) => e.address.localeCompare(n.address)), t;
}
function y1(r) {
  let t;
  return typeof r == "string" ? t = no.computePublicKey(r, !1) : t = r.publicKey, Ut(ne("0x" + t.substring(4)).substring(26));
}
function b1(r, t) {
  return y1(no.recoverPublicKey(r, t));
}
const ce = BigInt(0), m1 = BigInt(2), v1 = BigInt(27), A1 = BigInt(28), I1 = BigInt(35), E1 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), ol = 4096 * 32;
function rd(r, t) {
  let e = r.toString(16);
  for (; e.length < 2; )
    e = "0" + e;
  return e += Oa(t).substring(4), "0x" + e;
}
function Xc(r) {
  return r === "0x" ? null : Ut(r);
}
function V_(r, t) {
  try {
    return is(r);
  } catch (e) {
    N(!1, e.message, t, r);
  }
}
function So(r, t) {
  return r === "0x" ? 0 : Rt(r, t);
}
function te(r, t) {
  if (r === "0x")
    return ce;
  const e = pt(r, t);
  return N(e <= E1, "value exceeds uint size", t, e), e;
}
function Kt(r, t) {
  const e = pt(r, "value"), n = Ie(e);
  return N(n.length <= 32, "value too large", `tx.${t}`, e), n;
}
function Q_(r) {
  return is(r).map((t) => [t.address, t.storageKeys]);
}
function k1(r, t) {
  N(Array.isArray(r), `invalid ${t}`, "value", r);
  for (let e = 0; e < r.length; e++)
    N(Wt(r[e], 32), "invalid ${ param } hash", `value[${e}]`, r[e]);
  return r;
}
function x1(r) {
  const t = Kc(r);
  N(Array.isArray(t) && (t.length === 9 || t.length === 6), "invalid field count for legacy transaction", "data", r);
  const e = {
    type: 0,
    nonce: So(t[0], "nonce"),
    gasPrice: te(t[1], "gasPrice"),
    gasLimit: te(t[2], "gasLimit"),
    to: Xc(t[3]),
    value: te(t[4], "value"),
    data: dt(t[5]),
    chainId: ce
  };
  if (t.length === 6)
    return e;
  const n = te(t[6], "v"), i = te(t[7], "r"), s = te(t[8], "s");
  if (i === ce && s === ce)
    e.chainId = n;
  else {
    let a = (n - I1) / m1;
    a < ce && (a = ce), e.chainId = a, N(a !== ce || n === v1 || n === A1, "non-canonical legacy v", "v", t[6]), e.signature = _r.from({
      r: Yi(t[7], 32),
      s: Yi(t[8], 32),
      v: n
    });
  }
  return e;
}
function R1(r, t) {
  const e = [
    Kt(r.nonce, "nonce"),
    Kt(r.gasPrice || 0, "gasPrice"),
    Kt(r.gasLimit, "gasLimit"),
    r.to || "0x",
    Kt(r.value, "value"),
    r.data
  ];
  let n = ce;
  if (r.chainId != ce)
    n = pt(r.chainId, "tx.chainId"), N(!t || t.networkV == null || t.legacyChainId === n, "tx.chainId/sig.v mismatch", "sig", t);
  else if (r.signature) {
    const s = r.signature.legacyChainId;
    s != null && (n = s);
  }
  if (!t)
    return n !== ce && (e.push(Ie(n)), e.push("0x"), e.push("0x")), Zi(e);
  let i = BigInt(27 + t.yParity);
  return n !== ce ? i = _r.getChainIdV(n, t.v) : BigInt(t.v) !== i && N(!1, "tx.chainId/sig.v mismatch", "sig", t), e.push(Ie(i)), e.push(Ie(t.r)), e.push(Ie(t.s)), Zi(e);
}
function J_(r, t) {
  let e;
  try {
    if (e = So(t[0], "yParity"), e !== 0 && e !== 1)
      throw new Error("bad yParity");
  } catch {
    N(!1, "invalid yParity", "yParity", t[0]);
  }
  const n = Yi(t[1], 32), i = Yi(t[2], 32), s = _r.from({ r: n, s: i, yParity: e });
  r.signature = s;
}
function S1(r) {
  const t = Kc(Lt(r).slice(1));
  N(Array.isArray(t) && (t.length === 9 || t.length === 12), "invalid field count for transaction type: 2", "data", dt(r));
  const e = {
    type: 2,
    chainId: te(t[0], "chainId"),
    nonce: So(t[1], "nonce"),
    maxPriorityFeePerGas: te(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: te(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: te(t[4], "gasLimit"),
    to: Xc(t[5]),
    value: te(t[6], "value"),
    data: dt(t[7]),
    accessList: V_(t[8], "accessList")
  };
  return t.length === 9 || J_(e, t.slice(9)), e;
}
function B1(r, t) {
  const e = [
    Kt(r.chainId, "chainId"),
    Kt(r.nonce, "nonce"),
    Kt(r.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    Kt(r.maxFeePerGas || 0, "maxFeePerGas"),
    Kt(r.gasLimit, "gasLimit"),
    r.to || "0x",
    Kt(r.value, "value"),
    r.data,
    Q_(r.accessList || [])
  ];
  return t && (e.push(Kt(t.yParity, "yParity")), e.push(Ie(t.r)), e.push(Ie(t.s))), ee(["0x02", Zi(e)]);
}
function P1(r) {
  const t = Kc(Lt(r).slice(1));
  N(Array.isArray(t) && (t.length === 8 || t.length === 11), "invalid field count for transaction type: 1", "data", dt(r));
  const e = {
    type: 1,
    chainId: te(t[0], "chainId"),
    nonce: So(t[1], "nonce"),
    gasPrice: te(t[2], "gasPrice"),
    gasLimit: te(t[3], "gasLimit"),
    to: Xc(t[4]),
    value: te(t[5], "value"),
    data: dt(t[6]),
    accessList: V_(t[7], "accessList")
  };
  return t.length === 8 || J_(e, t.slice(8)), e;
}
function O1(r, t) {
  const e = [
    Kt(r.chainId, "chainId"),
    Kt(r.nonce, "nonce"),
    Kt(r.gasPrice || 0, "gasPrice"),
    Kt(r.gasLimit, "gasLimit"),
    r.to || "0x",
    Kt(r.value, "value"),
    r.data,
    Q_(r.accessList || [])
  ];
  return t && (e.push(Kt(t.yParity, "recoveryParam")), e.push(Ie(t.r)), e.push(Ie(t.s))), ee(["0x01", Zi(e)]);
}
function T1(r) {
  let t = Kc(Lt(r).slice(1)), e = "3", n = null;
  if (t.length === 4 && Array.isArray(t[0])) {
    e = "3 (network format)";
    const s = t[1], a = t[2], u = t[3];
    N(Array.isArray(s), "invalid network format: blobs not an array", "fields[1]", s), N(Array.isArray(a), "invalid network format: commitments not an array", "fields[2]", a), N(Array.isArray(u), "invalid network format: proofs not an array", "fields[3]", u), N(s.length === a.length, "invalid network format: blobs/commitments length mismatch", "fields", t), N(s.length === u.length, "invalid network format: blobs/proofs length mismatch", "fields", t), n = [];
    for (let l = 0; l < t[1].length; l++)
      n.push({
        data: s[l],
        commitment: a[l],
        proof: u[l]
      });
    t = t[0];
  }
  N(Array.isArray(t) && (t.length === 11 || t.length === 14), `invalid field count for transaction type: ${e}`, "data", dt(r));
  const i = {
    type: 3,
    chainId: te(t[0], "chainId"),
    nonce: So(t[1], "nonce"),
    maxPriorityFeePerGas: te(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: te(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: te(t[4], "gasLimit"),
    to: Xc(t[5]),
    value: te(t[6], "value"),
    data: dt(t[7]),
    accessList: V_(t[8], "accessList"),
    maxFeePerBlobGas: te(t[9], "maxFeePerBlobGas"),
    blobVersionedHashes: t[10]
  };
  n && (i.blobs = n), N(i.to != null, `invalid address for transaction type: ${e}`, "data", r), N(Array.isArray(i.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", r);
  for (let s = 0; s < i.blobVersionedHashes.length; s++)
    N(Wt(i.blobVersionedHashes[s], 32), `invalid blobVersionedHash at index ${s}: must be length 32`, "data", r);
  return t.length === 11 || J_(i, t.slice(11)), i;
}
function N1(r, t, e) {
  const n = [
    Kt(r.chainId, "chainId"),
    Kt(r.nonce, "nonce"),
    Kt(r.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    Kt(r.maxFeePerGas || 0, "maxFeePerGas"),
    Kt(r.gasLimit, "gasLimit"),
    r.to || ro,
    Kt(r.value, "value"),
    r.data,
    Q_(r.accessList || []),
    Kt(r.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
    k1(r.blobVersionedHashes || [], "blobVersionedHashes")
  ];
  return t && (n.push(Kt(t.yParity, "yParity")), n.push(Ie(t.r)), n.push(Ie(t.s)), e) ? ee([
    "0x03",
    Zi([
      n,
      e.map((i) => i.data),
      e.map((i) => i.commitment),
      e.map((i) => i.proof)
    ])
  ]) : ee(["0x03", Zi(n)]);
}
var br, Js, Ws, Ks, $s, qs, Ys, Zs, Xs, ta, ea, ra, Ci, Qn, Mr, Jn, na, qo;
const Cr = class Cr {
  /**
   *  Creates a new Transaction with default values.
   */
  constructor() {
    D(this, na);
    D(this, br);
    D(this, Js);
    D(this, Ws);
    D(this, Ks);
    D(this, $s);
    D(this, qs);
    D(this, Ys);
    D(this, Zs);
    D(this, Xs);
    D(this, ta);
    D(this, ea);
    D(this, ra);
    D(this, Ci);
    D(this, Qn);
    D(this, Mr);
    D(this, Jn);
    E(this, br, null), E(this, Js, null), E(this, Ks, 0), E(this, $s, ce), E(this, qs, null), E(this, Ys, null), E(this, Zs, null), E(this, Ws, "0x"), E(this, Xs, ce), E(this, ta, ce), E(this, ea, null), E(this, ra, null), E(this, Ci, null), E(this, Qn, null), E(this, Jn, null), E(this, Mr, null);
  }
  /**
   *  The transaction type.
   *
   *  If null, the type will be automatically inferred based on
   *  explicit properties.
   */
  get type() {
    return g(this, br);
  }
  set type(t) {
    switch (t) {
      case null:
        E(this, br, null);
        break;
      case 0:
      case "legacy":
        E(this, br, 0);
        break;
      case 1:
      case "berlin":
      case "eip-2930":
        E(this, br, 1);
        break;
      case 2:
      case "london":
      case "eip-1559":
        E(this, br, 2);
        break;
      case 3:
      case "cancun":
      case "eip-4844":
        E(this, br, 3);
        break;
      default:
        N(!1, "unsupported transaction type", "type", t);
    }
  }
  /**
   *  The name of the transaction type.
   */
  get typeName() {
    switch (this.type) {
      case 0:
        return "legacy";
      case 1:
        return "eip-2930";
      case 2:
        return "eip-1559";
      case 3:
        return "eip-4844";
    }
    return null;
  }
  /**
   *  The ``to`` address for the transaction or ``null`` if the
   *  transaction is an ``init`` transaction.
   */
  get to() {
    const t = g(this, Js);
    return t == null && this.type === 3 ? ro : t;
  }
  set to(t) {
    E(this, Js, t == null ? null : Ut(t));
  }
  /**
   *  The transaction nonce.
   */
  get nonce() {
    return g(this, Ks);
  }
  set nonce(t) {
    E(this, Ks, Rt(t, "value"));
  }
  /**
   *  The gas limit.
   */
  get gasLimit() {
    return g(this, $s);
  }
  set gasLimit(t) {
    E(this, $s, pt(t));
  }
  /**
   *  The gas price.
   *
   *  On legacy networks this defines the fee that will be paid. On
   *  EIP-1559 networks, this should be ``null``.
   */
  get gasPrice() {
    const t = g(this, qs);
    return t == null && (this.type === 0 || this.type === 1) ? ce : t;
  }
  set gasPrice(t) {
    E(this, qs, t == null ? null : pt(t, "gasPrice"));
  }
  /**
   *  The maximum priority fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxPriorityFeePerGas() {
    const t = g(this, Ys);
    return t ?? (this.type === 2 || this.type === 3 ? ce : null);
  }
  set maxPriorityFeePerGas(t) {
    E(this, Ys, t == null ? null : pt(t, "maxPriorityFeePerGas"));
  }
  /**
   *  The maximum total fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxFeePerGas() {
    const t = g(this, Zs);
    return t ?? (this.type === 2 || this.type === 3 ? ce : null);
  }
  set maxFeePerGas(t) {
    E(this, Zs, t == null ? null : pt(t, "maxFeePerGas"));
  }
  /**
   *  The transaction data. For ``init`` transactions this is the
   *  deployment code.
   */
  get data() {
    return g(this, Ws);
  }
  set data(t) {
    E(this, Ws, dt(t));
  }
  /**
   *  The amount of ether (in wei) to send in this transactions.
   */
  get value() {
    return g(this, Xs);
  }
  set value(t) {
    E(this, Xs, pt(t, "value"));
  }
  /**
   *  The chain ID this transaction is valid on.
   */
  get chainId() {
    return g(this, ta);
  }
  set chainId(t) {
    E(this, ta, pt(t));
  }
  /**
   *  If signed, the signature for this transaction.
   */
  get signature() {
    return g(this, ea) || null;
  }
  set signature(t) {
    E(this, ea, t == null ? null : _r.from(t));
  }
  /**
   *  The access list.
   *
   *  An access list permits discounted (but pre-paid) access to
   *  bytecode and state variable access within contract execution.
   */
  get accessList() {
    const t = g(this, ra) || null;
    return t ?? (this.type === 1 || this.type === 2 || this.type === 3 ? [] : null);
  }
  set accessList(t) {
    E(this, ra, t == null ? null : is(t));
  }
  /**
   *  The max fee per blob gas for Cancun transactions.
   */
  get maxFeePerBlobGas() {
    const t = g(this, Ci);
    return t == null && this.type === 3 ? ce : t;
  }
  set maxFeePerBlobGas(t) {
    E(this, Ci, t == null ? null : pt(t, "maxFeePerBlobGas"));
  }
  /**
   *  The BLOb versioned hashes for Cancun transactions.
   */
  get blobVersionedHashes() {
    let t = g(this, Qn);
    return t == null && this.type === 3 ? [] : t;
  }
  set blobVersionedHashes(t) {
    if (t != null) {
      N(Array.isArray(t), "blobVersionedHashes must be an Array", "value", t), t = t.slice();
      for (let e = 0; e < t.length; e++)
        N(Wt(t[e], 32), "invalid blobVersionedHash", `value[${e}]`, t[e]);
    }
    E(this, Qn, t);
  }
  /**
   *  The BLObs for the Transaction, if any.
   *
   *  If ``blobs`` is non-``null``, then the [[seriailized]]
   *  will return the network formatted sidecar, otherwise it
   *  will return the standard [[link-eip-2718]] payload. The
   *  [[unsignedSerialized]] is unaffected regardless.
   *
   *  When setting ``blobs``, either fully valid [[Blob]] objects
   *  may be specified (i.e. correctly padded, with correct
   *  committments and proofs) or a raw [[BytesLike]] may
   *  be provided.
   *
   *  If raw [[BytesLike]] are provided, the [[kzg]] property **must**
   *  be already set. The blob will be correctly padded and the
   *  [[KzgLibrary]] will be used to compute the committment and
   *  proof for the blob.
   *
   *  A BLOb is a sequence of field elements, each of which must
   *  be within the BLS field modulo, so some additional processing
   *  may be required to encode arbitrary data to ensure each 32 byte
   *  field is within the valid range.
   *
   *  Setting this automatically populates [[blobVersionedHashes]],
   *  overwriting any existing values. Setting this to ``null``
   *  does **not** remove the [[blobVersionedHashes]], leaving them
   *  present.
   */
  get blobs() {
    return g(this, Jn) == null ? null : g(this, Jn).map((t) => Object.assign({}, t));
  }
  set blobs(t) {
    if (t == null) {
      E(this, Jn, null);
      return;
    }
    const e = [], n = [];
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      if (O_(s)) {
        q(g(this, Mr), "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", {
          operation: "set blobs()"
        });
        let a = Lt(s);
        if (N(a.length <= ol, "blob is too large", `blobs[${i}]`, s), a.length !== ol) {
          const p = new Uint8Array(ol);
          p.set(a), a = p;
        }
        const u = g(this, Mr).blobToKzgCommitment(a), l = dt(g(this, Mr).computeBlobKzgProof(a, u));
        e.push({
          data: dt(a),
          commitment: dt(u),
          proof: l
        }), n.push(rd(1, u));
      } else {
        const a = dt(s.commitment);
        e.push({
          data: dt(s.data),
          commitment: a,
          proof: dt(s.proof)
        }), n.push(rd(1, a));
      }
    }
    E(this, Jn, e), E(this, Qn, n);
  }
  get kzg() {
    return g(this, Mr);
  }
  set kzg(t) {
    E(this, Mr, t);
  }
  /**
   *  The transaction hash, if signed. Otherwise, ``null``.
   */
  get hash() {
    return this.signature == null ? null : ne(ct(this, na, qo).call(this, !0, !1));
  }
  /**
   *  The pre-image hash of this transaction.
   *
   *  This is the digest that a [[Signer]] must sign to authorize
   *  this transaction.
   */
  get unsignedHash() {
    return ne(this.unsignedSerialized);
  }
  /**
   *  The sending address, if signed. Otherwise, ``null``.
   */
  get from() {
    return this.signature == null ? null : b1(this.unsignedHash, this.signature);
  }
  /**
   *  The public key of the sender, if signed. Otherwise, ``null``.
   */
  get fromPublicKey() {
    return this.signature == null ? null : no.recoverPublicKey(this.unsignedHash, this.signature);
  }
  /**
   *  Returns true if signed.
   *
   *  This provides a Type Guard that properties requiring a signed
   *  transaction are non-null.
   */
  isSigned() {
    return this.signature != null;
  }
  /**
   *  The serialized transaction.
   *
   *  This throws if the transaction is unsigned. For the pre-image,
   *  use [[unsignedSerialized]].
   */
  get serialized() {
    return ct(this, na, qo).call(this, !0, !0);
  }
  /**
   *  The transaction pre-image.
   *
   *  The hash of this is the digest which needs to be signed to
   *  authorize this transaction.
   */
  get unsignedSerialized() {
    return ct(this, na, qo).call(this, !1, !1);
  }
  /**
   *  Return the most "likely" type; currently the highest
   *  supported transaction type.
   */
  inferType() {
    const t = this.inferTypes();
    return t.indexOf(2) >= 0 ? 2 : t.pop();
  }
  /**
   *  Validates the explicit properties and returns a list of compatible
   *  transaction types.
   */
  inferTypes() {
    const t = this.gasPrice != null, e = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null, n = this.accessList != null, i = g(this, Ci) != null || g(this, Qn);
    this.maxFeePerGas != null && this.maxPriorityFeePerGas != null && q(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", { value: this }), q(!e || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", { value: this }), q(this.type !== 0 || !n, "legacy transaction cannot have accessList", "BAD_DATA", { value: this });
    const s = [];
    return this.type != null ? s.push(this.type) : e ? s.push(2) : t ? (s.push(1), n || s.push(0)) : n ? (s.push(1), s.push(2)) : (i && this.to || (s.push(0), s.push(1), s.push(2)), s.push(3)), s.sort(), s;
  }
  /**
   *  Returns true if this transaction is a legacy transaction (i.e.
   *  ``type === 0``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if this transaction is berlin hardform transaction (i.e.
   *  ``type === 1``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if this transaction is london hardform transaction (i.e.
   *  ``type === 2``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if this transaction is an [[link-eip-4844]] BLOB
   *  transaction.
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Create a copy of this transaciton.
   */
  clone() {
    return Cr.from(this);
  }
  /**
   *  Return a JSON-friendly object.
   */
  toJSON() {
    const t = (e) => e == null ? null : e.toString();
    return {
      type: this.type,
      to: this.to,
      //            from: this.from,
      data: this.data,
      nonce: this.nonce,
      gasLimit: t(this.gasLimit),
      gasPrice: t(this.gasPrice),
      maxPriorityFeePerGas: t(this.maxPriorityFeePerGas),
      maxFeePerGas: t(this.maxFeePerGas),
      value: t(this.value),
      chainId: t(this.chainId),
      sig: this.signature ? this.signature.toJSON() : null,
      accessList: this.accessList
    };
  }
  /**
   *  Create a **Transaction** from a serialized transaction or a
   *  Transaction-like object.
   */
  static from(t) {
    if (t == null)
      return new Cr();
    if (typeof t == "string") {
      const n = Lt(t);
      if (n[0] >= 127)
        return Cr.from(x1(n));
      switch (n[0]) {
        case 1:
          return Cr.from(P1(n));
        case 2:
          return Cr.from(S1(n));
        case 3:
          return Cr.from(T1(n));
      }
      q(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
    }
    const e = new Cr();
    return t.type != null && (e.type = t.type), t.to != null && (e.to = t.to), t.nonce != null && (e.nonce = t.nonce), t.gasLimit != null && (e.gasLimit = t.gasLimit), t.gasPrice != null && (e.gasPrice = t.gasPrice), t.maxPriorityFeePerGas != null && (e.maxPriorityFeePerGas = t.maxPriorityFeePerGas), t.maxFeePerGas != null && (e.maxFeePerGas = t.maxFeePerGas), t.maxFeePerBlobGas != null && (e.maxFeePerBlobGas = t.maxFeePerBlobGas), t.data != null && (e.data = t.data), t.value != null && (e.value = t.value), t.chainId != null && (e.chainId = t.chainId), t.signature != null && (e.signature = _r.from(t.signature)), t.accessList != null && (e.accessList = t.accessList), t.blobVersionedHashes != null && (e.blobVersionedHashes = t.blobVersionedHashes), t.kzg != null && (e.kzg = t.kzg), t.blobs != null && (e.blobs = t.blobs), t.hash != null && (N(e.isSigned(), "unsigned transaction cannot define '.hash'", "tx", t), N(e.hash === t.hash, "hash mismatch", "tx", t)), t.from != null && (N(e.isSigned(), "unsigned transaction cannot define '.from'", "tx", t), N(e.from.toLowerCase() === (t.from || "").toLowerCase(), "from mismatch", "tx", t)), e;
  }
};
br = new WeakMap(), Js = new WeakMap(), Ws = new WeakMap(), Ks = new WeakMap(), $s = new WeakMap(), qs = new WeakMap(), Ys = new WeakMap(), Zs = new WeakMap(), Xs = new WeakMap(), ta = new WeakMap(), ea = new WeakMap(), ra = new WeakMap(), Ci = new WeakMap(), Qn = new WeakMap(), Mr = new WeakMap(), Jn = new WeakMap(), na = new WeakSet(), qo = function(t, e) {
  q(!t || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
  const n = t ? this.signature : null;
  switch (this.inferType()) {
    case 0:
      return R1(this, n);
    case 1:
      return O1(this, n);
    case 2:
      return B1(this, n);
    case 3:
      return N1(this, n, e ? this.blobs : null);
  }
  q(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
};
let Ic = Cr;
const bg = new Uint8Array(32);
bg.fill(0);
const C1 = BigInt(-1), mg = BigInt(0), vg = BigInt(1), F1 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function z1(r) {
  const t = Lt(r), e = t.length % 32;
  return e ? ee([t, bg.slice(e)]) : dt(t);
}
const L1 = oi(vg, 32), U1 = oi(mg, 32), nd = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, cl = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function id(r) {
  return function(t) {
    return N(typeof t == "string", `invalid domain value for ${JSON.stringify(r)}`, `domain.${r}`, t), t;
  };
}
const D1 = {
  name: id("name"),
  version: id("version"),
  chainId: function(r) {
    const t = pt(r, "domain.chainId");
    return N(t >= 0, "invalid chain ID", "domain.chainId", r), Number.isSafeInteger(t) ? Number(t) : ms(t);
  },
  verifyingContract: function(r) {
    try {
      return Ut(r).toLowerCase();
    } catch {
    }
    N(!1, 'invalid domain value "verifyingContract"', "domain.verifyingContract", r);
  },
  salt: function(r) {
    const t = Lt(r, "domain.salt");
    return N(t.length === 32, 'invalid domain value "salt"', "domain.salt", r), dt(t);
  }
};
function ul(r) {
  {
    const t = r.match(/^(u?)int(\d+)$/);
    if (t) {
      const e = t[1] === "", n = parseInt(t[2]);
      N(n % 8 === 0 && n !== 0 && n <= 256 && t[2] === String(n), "invalid numeric width", "type", r);
      const i = ja(F1, e ? n - 1 : n), s = e ? (i + vg) * C1 : mg;
      return function(a) {
        const u = pt(a, "value");
        return N(u >= s && u <= i, `value out-of-bounds for ${r}`, "value", u), oi(e ? oh(u, 256) : u, 32);
      };
    }
  }
  {
    const t = r.match(/^bytes(\d+)$/);
    if (t) {
      const e = parseInt(t[1]);
      return N(e !== 0 && e <= 32 && t[1] === String(e), "invalid bytes width", "type", r), function(n) {
        const i = Lt(n);
        return N(i.length === e, `invalid length for ${r}`, "value", n), z1(n);
      };
    }
  }
  switch (r) {
    case "address":
      return function(t) {
        return Yi(Ut(t), 32);
      };
    case "bool":
      return function(t) {
        return t ? L1 : U1;
      };
    case "bytes":
      return function(t) {
        return ne(t);
      };
    case "string":
      return function(t) {
        return Xi(t);
      };
  }
  return null;
}
function sd(r, t) {
  return `${r}(${t.map(({ name: e, type: n }) => n + " " + e).join(",")})`;
}
function Ho(r) {
  const t = r.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);
  return t ? {
    base: t[1],
    index: t[2] + t[4],
    array: {
      base: t[1],
      prefix: t[1] + t[2],
      count: t[5] ? parseInt(t[5]) : -1
    }
  } : { base: r };
}
var yo, jr, ia, Uc, Ag;
const Ge = class Ge {
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   *
   *  This performs all necessary checking that types are valid and
   *  do not violate the [[link-eip-712]] structural constraints as
   *  well as computes the [[primaryType]].
   */
  constructor(t) {
    D(this, Uc);
    /**
     *  The primary type for the structured [[types]].
     *
     *  This is derived automatically from the [[types]], since no
     *  recursion is possible, once the DAG for the types is consturcted
     *  internally, the primary type must be the only remaining type with
     *  no parent nodes.
     */
    z(this, "primaryType");
    D(this, yo);
    D(this, jr);
    D(this, ia);
    E(this, jr, /* @__PURE__ */ new Map()), E(this, ia, /* @__PURE__ */ new Map());
    const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = {};
    Object.keys(t).forEach((l) => {
      s[l] = t[l].map(({ name: p, type: f }) => {
        let { base: h, index: b } = Ho(f);
        return h === "int" && !t.int && (h = "int256"), h === "uint" && !t.uint && (h = "uint256"), { name: p, type: h + (b || "") };
      }), e.set(l, /* @__PURE__ */ new Set()), n.set(l, []), i.set(l, /* @__PURE__ */ new Set());
    }), E(this, yo, JSON.stringify(s));
    for (const l in s) {
      const p = /* @__PURE__ */ new Set();
      for (const f of s[l]) {
        N(!p.has(f.name), `duplicate variable name ${JSON.stringify(f.name)} in ${JSON.stringify(l)}`, "types", t), p.add(f.name);
        const h = Ho(f.type).base;
        N(h !== l, `circular type reference to ${JSON.stringify(h)}`, "types", t), !ul(h) && (N(n.has(h), `unknown type ${JSON.stringify(h)}`, "types", t), n.get(h).push(l), e.get(l).add(h));
      }
    }
    const a = Array.from(n.keys()).filter((l) => n.get(l).length === 0);
    N(a.length !== 0, "missing primary type", "types", t), N(a.length === 1, `ambiguous primary types or unused types: ${a.map((l) => JSON.stringify(l)).join(", ")}`, "types", t), mt(this, { primaryType: a[0] });
    function u(l, p) {
      N(!p.has(l), `circular type reference to ${JSON.stringify(l)}`, "types", t), p.add(l);
      for (const f of e.get(l))
        if (n.has(f)) {
          u(f, p);
          for (const h of p)
            i.get(h).add(f);
        }
      p.delete(l);
    }
    u(this.primaryType, /* @__PURE__ */ new Set());
    for (const [l, p] of i) {
      const f = Array.from(p);
      f.sort(), g(this, jr).set(l, sd(l, s[l]) + f.map((h) => sd(h, s[h])).join(""));
    }
  }
  /**
   *  The types.
   */
  get types() {
    return JSON.parse(g(this, yo));
  }
  /**
   *  Returnthe encoder for the specific %%type%%.
   */
  getEncoder(t) {
    let e = g(this, ia).get(t);
    return e || (e = ct(this, Uc, Ag).call(this, t), g(this, ia).set(t, e)), e;
  }
  /**
   *  Return the full type for %%name%%.
   */
  encodeType(t) {
    const e = g(this, jr).get(t);
    return N(e, `unknown type: ${JSON.stringify(t)}`, "name", t), e;
  }
  /**
   *  Return the encoded %%value%% for the %%type%%.
   */
  encodeData(t, e) {
    return this.getEncoder(t)(e);
  }
  /**
   *  Returns the hash of %%value%% for the type of %%name%%.
   */
  hashStruct(t, e) {
    return ne(this.encodeData(t, e));
  }
  /**
   *  Return the fulled encoded %%value%% for the [[types]].
   */
  encode(t) {
    return this.encodeData(this.primaryType, t);
  }
  /**
   *  Return the hash of the fully encoded %%value%% for the [[types]].
   */
  hash(t) {
    return this.hashStruct(this.primaryType, t);
  }
  /**
   *  @_ignore:
   */
  _visit(t, e, n) {
    if (ul(t))
      return n(t, e);
    const i = Ho(t).array;
    if (i)
      return N(i.count === -1 || i.count === e.length, `array length mismatch; expected length ${i.count}`, "value", e), e.map((a) => this._visit(i.prefix, a, n));
    const s = this.types[t];
    if (s)
      return s.reduce((a, { name: u, type: l }) => (a[u] = this._visit(l, e[u], n), a), {});
    N(!1, `unknown type: ${t}`, "type", t);
  }
  /**
   *  Call %%calback%% for each value in %%value%%, passing the type and
   *  component within %%value%%.
   *
   *  This is useful for replacing addresses or other transformation that
   *  may be desired on each component, based on its type.
   */
  visit(t, e) {
    return this._visit(this.primaryType, t, e);
  }
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   */
  static from(t) {
    return new Ge(t);
  }
  /**
   *  Return the primary type for %%types%%.
   */
  static getPrimaryType(t) {
    return Ge.from(t).primaryType;
  }
  /**
   *  Return the hashed struct for %%value%% using %%types%% and %%name%%.
   */
  static hashStruct(t, e, n) {
    return Ge.from(e).hashStruct(t, n);
  }
  /**
   *  Return the domain hash for %%domain%%.
   */
  static hashDomain(t) {
    const e = [];
    for (const n in t) {
      if (t[n] == null)
        continue;
      const i = nd[n];
      N(i, `invalid typed-data domain key: ${JSON.stringify(n)}`, "domain", t), e.push({ name: n, type: i });
    }
    return e.sort((n, i) => cl.indexOf(n.name) - cl.indexOf(i.name)), Ge.hashStruct("EIP712Domain", { EIP712Domain: e }, t);
  }
  /**
   *  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static encode(t, e, n) {
    return ee([
      "0x1901",
      Ge.hashDomain(t),
      Ge.from(e).hash(n)
    ]);
  }
  /**
   *  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static hash(t, e, n) {
    return ne(Ge.encode(t, e, n));
  }
  // Replaces all address types with ENS names with their looked up address
  /**
   * Resolves to the value from resolving all addresses in %%value%% for
   * %%types%% and the %%domain%%.
   */
  static async resolveNames(t, e, n, i) {
    t = Object.assign({}, t);
    for (const u in t)
      t[u] == null && delete t[u];
    const s = {};
    t.verifyingContract && !Wt(t.verifyingContract, 20) && (s[t.verifyingContract] = "0x");
    const a = Ge.from(e);
    a.visit(n, (u, l) => (u === "address" && !Wt(l, 20) && (s[l] = "0x"), l));
    for (const u in s)
      s[u] = await i(u);
    return t.verifyingContract && s[t.verifyingContract] && (t.verifyingContract = s[t.verifyingContract]), n = a.visit(n, (u, l) => u === "address" && s[l] ? s[l] : l), { domain: t, value: n };
  }
  /**
   *  Returns the JSON-encoded payload expected by nodes which implement
   *  the JSON-RPC [[link-eip-712]] method.
   */
  static getPayload(t, e, n) {
    Ge.hashDomain(t);
    const i = {}, s = [];
    cl.forEach((l) => {
      const p = t[l];
      p != null && (i[l] = D1[l](p), s.push({ name: l, type: nd[l] }));
    });
    const a = Ge.from(e);
    e = a.types;
    const u = Object.assign({}, e);
    return N(u.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", e), u.EIP712Domain = s, a.encode(n), {
      types: u,
      domain: i,
      primaryType: a.primaryType,
      message: a.visit(n, (l, p) => {
        if (l.match(/^bytes(\d*)/))
          return dt(Lt(p));
        if (l.match(/^u?int/))
          return pt(p).toString();
        switch (l) {
          case "address":
            return p.toLowerCase();
          case "bool":
            return !!p;
          case "string":
            return N(typeof p == "string", "invalid string", "value", p), p;
        }
        N(!1, "unsupported type", "type", l);
      })
    };
  }
};
yo = new WeakMap(), jr = new WeakMap(), ia = new WeakMap(), Uc = new WeakSet(), Ag = function(t) {
  {
    const i = ul(t);
    if (i)
      return i;
  }
  const e = Ho(t).array;
  if (e) {
    const i = e.prefix, s = this.getEncoder(i);
    return (a) => {
      N(e.count === -1 || e.count === a.length, `array length mismatch; expected length ${e.count}`, "value", a);
      let u = a.map(s);
      return g(this, jr).has(i) && (u = u.map(ne)), ne(ee(u));
    };
  }
  const n = this.types[t];
  if (n) {
    const i = Xi(g(this, jr).get(t));
    return (s) => {
      const a = n.map(({ name: u, type: l }) => {
        const p = this.getEncoder(l)(s[u]);
        return g(this, jr).has(l) ? ne(p) : p;
      });
      return a.unshift(i), ee(a);
    };
  }
  N(!1, `unknown type: ${t}`, "type", t);
};
let Ec = Ge;
function xe(r) {
  const t = /* @__PURE__ */ new Set();
  return r.forEach((e) => t.add(e)), Object.freeze(t);
}
const M1 = "external public payable override", j1 = xe(M1.split(" ")), Ig = "constant external internal payable private public pure view override", G1 = xe(Ig.split(" ")), Eg = "constructor error event fallback function receive struct", kg = xe(Eg.split(" ")), xg = "calldata memory storage payable indexed", H1 = xe(xg.split(" ")), V1 = "tuple returns", Q1 = [Eg, xg, V1, Ig].join(" "), J1 = xe(Q1.split(" ")), W1 = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
}, K1 = new RegExp("^(\\s*)"), $1 = new RegExp("^([0-9]+)"), q1 = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), Rg = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), Sg = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var _e, or, bo, t_;
const Dc = class Dc {
  constructor(t) {
    D(this, bo);
    D(this, _e);
    D(this, or);
    E(this, _e, 0), E(this, or, t.slice());
  }
  get offset() {
    return g(this, _e);
  }
  get length() {
    return g(this, or).length - g(this, _e);
  }
  clone() {
    return new Dc(g(this, or));
  }
  reset() {
    E(this, _e, 0);
  }
  // Pops and returns the value of the next token, if it is a keyword in allowed; throws if out of tokens
  popKeyword(t) {
    const e = this.peek();
    if (e.type !== "KEYWORD" || !t.has(e.text))
      throw new Error(`expected keyword ${e.text}`);
    return this.pop().text;
  }
  // Pops and returns the value of the next token if it is `type`; throws if out of tokens
  popType(t) {
    if (this.peek().type !== t) {
      const e = this.peek();
      throw new Error(`expected ${t}; got ${e.type} ${JSON.stringify(e.text)}`);
    }
    return this.pop().text;
  }
  // Pops and returns a "(" TOKENS ")"
  popParen() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const e = ct(this, bo, t_).call(this, g(this, _e) + 1, t.match + 1);
    return E(this, _e, t.match + 1), e;
  }
  // Pops and returns the items within "(" ITEM1 "," ITEM2 "," ... ")"
  popParams() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const e = [];
    for (; g(this, _e) < t.match - 1; ) {
      const n = this.peek().linkNext;
      e.push(ct(this, bo, t_).call(this, g(this, _e) + 1, n)), E(this, _e, n);
    }
    return E(this, _e, t.match + 1), e;
  }
  // Returns the top Token, throwing if out of tokens
  peek() {
    if (g(this, _e) >= g(this, or).length)
      throw new Error("out-of-bounds");
    return g(this, or)[g(this, _e)];
  }
  // Returns the next value, if it is a keyword in `allowed`
  peekKeyword(t) {
    const e = this.peekType("KEYWORD");
    return e != null && t.has(e) ? e : null;
  }
  // Returns the value of the next token if it is `type`
  peekType(t) {
    if (this.length === 0)
      return null;
    const e = this.peek();
    return e.type === t ? e.text : null;
  }
  // Returns the next token; throws if out of tokens
  pop() {
    const t = this.peek();
    return La(this, _e)._++, t;
  }
  toString() {
    const t = [];
    for (let e = g(this, _e); e < g(this, or).length; e++) {
      const n = g(this, or)[e];
      t.push(`${n.type}:${n.text}`);
    }
    return `<TokenString ${t.join(" ")}>`;
  }
};
_e = new WeakMap(), or = new WeakMap(), bo = new WeakSet(), t_ = function(t = 0, e = 0) {
  return new Dc(g(this, or).slice(t, e).map((n) => Object.freeze(Object.assign({}, n, {
    match: n.match - t,
    linkBack: n.linkBack - t,
    linkNext: n.linkNext - t
  }))));
};
let fr = Dc;
function li(r) {
  const t = [], e = (a) => {
    const u = s < r.length ? JSON.stringify(r[s]) : "$EOI";
    throw new Error(`invalid token ${u} at ${s}: ${a}`);
  };
  let n = [], i = [], s = 0;
  for (; s < r.length; ) {
    let a = r.substring(s), u = a.match(K1);
    u && (s += u[1].length, a = r.substring(s));
    const l = { depth: n.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: s, value: -1 };
    t.push(l);
    let p = W1[a[0]] || "";
    if (p) {
      if (l.type = p, l.text = a[0], s++, p === "OPEN_PAREN")
        n.push(t.length - 1), i.push(t.length - 1);
      else if (p == "CLOSE_PAREN")
        n.length === 0 && e("no matching open bracket"), l.match = n.pop(), t[l.match].match = t.length - 1, l.depth--, l.linkBack = i.pop(), t[l.linkBack].linkNext = t.length - 1;
      else if (p === "COMMA")
        l.linkBack = i.pop(), t[l.linkBack].linkNext = t.length - 1, i.push(t.length - 1);
      else if (p === "OPEN_BRACKET")
        l.type = "BRACKET";
      else if (p === "CLOSE_BRACKET") {
        let f = t.pop().text;
        if (t.length > 0 && t[t.length - 1].type === "NUMBER") {
          const h = t.pop().text;
          f = h + f, t[t.length - 1].value = Rt(h);
        }
        if (t.length === 0 || t[t.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        t[t.length - 1].text += f;
      }
      continue;
    }
    if (u = a.match(q1), u) {
      if (l.text = u[1], s += l.text.length, J1.has(l.text)) {
        l.type = "KEYWORD";
        continue;
      }
      if (l.text.match(Sg)) {
        l.type = "TYPE";
        continue;
      }
      l.type = "ID";
      continue;
    }
    if (u = a.match($1), u) {
      l.text = u[1], l.type = "NUMBER", s += l.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(a[0])} at position ${s}`);
  }
  return new fr(t.map((a) => Object.freeze(a)));
}
function ad(r, t) {
  let e = [];
  for (const n in t.keys())
    r.has(n) && e.push(n);
  if (e.length > 1)
    throw new Error(`conflicting types: ${e.join(", ")}`);
}
function tu(r, t) {
  if (t.peekKeyword(kg)) {
    const e = t.pop().text;
    if (e !== r)
      throw new Error(`expected ${r}, got ${e}`);
  }
  return t.popType("ID");
}
function en(r, t) {
  const e = /* @__PURE__ */ new Set();
  for (; ; ) {
    const n = r.peekType("KEYWORD");
    if (n == null || t && !t.has(n))
      break;
    if (r.pop(), e.has(n))
      throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);
    e.add(n);
  }
  return Object.freeze(e);
}
function Bg(r) {
  let t = en(r, G1);
  return ad(t, xe("constant payable nonpayable".split(" "))), ad(t, xe("pure view payable nonpayable".split(" "))), t.has("view") ? "view" : t.has("pure") ? "pure" : t.has("payable") ? "payable" : t.has("nonpayable") ? "nonpayable" : t.has("constant") ? "view" : "nonpayable";
}
function Xr(r, t) {
  return r.popParams().map((e) => pe.from(e, t));
}
function Pg(r) {
  if (r.peekType("AT")) {
    if (r.pop(), r.peekType("NUMBER"))
      return pt(r.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function ts(r) {
  if (r.length)
    throw new Error(`unexpected tokens at offset ${r.offset}: ${r.toString()}`);
}
const Y1 = new RegExp(/^(.*)\[([0-9]*)\]$/);
function od(r) {
  const t = r.match(Sg);
  if (N(t, "invalid type", "type", r), r === "uint")
    return "uint256";
  if (r === "int")
    return "int256";
  if (t[2]) {
    const e = parseInt(t[2]);
    N(e !== 0 && e <= 32, "invalid bytes length", "type", r);
  } else if (t[3]) {
    const e = parseInt(t[3]);
    N(e !== 0 && e <= 256 && e % 8 === 0, "invalid numeric width", "type", r);
  }
  return r;
}
const $t = {}, Te = Symbol.for("_ethers_internal"), cd = "_ParamTypeInternal", ud = "_ErrorInternal", ld = "_EventInternal", _d = "_ConstructorInternal", fd = "_FallbackInternal", dd = "_FunctionInternal", pd = "_StructInternal";
var sa, Yo;
const He = class He {
  /**
   *  @private
   */
  constructor(t, e, n, i, s, a, u, l) {
    D(this, sa);
    /**
     *  The local name of the parameter (or ``""`` if unbound)
     */
    z(this, "name");
    /**
     *  The fully qualified type (e.g. ``"address"``, ``"tuple(address)"``,
     *  ``"uint256[3][]"``)
     */
    z(this, "type");
    /**
     *  The base type (e.g. ``"address"``, ``"tuple"``, ``"array"``)
     */
    z(this, "baseType");
    /**
     *  True if the parameters is indexed.
     *
     *  For non-indexable types this is ``null``.
     */
    z(this, "indexed");
    /**
     *  The components for the tuple.
     *
     *  For non-tuple types this is ``null``.
     */
    z(this, "components");
    /**
     *  The array length, or ``-1`` for dynamic-lengthed arrays.
     *
     *  For non-array types this is ``null``.
     */
    z(this, "arrayLength");
    /**
     *  The type of each child in the array.
     *
     *  For non-array types this is ``null``.
     */
    z(this, "arrayChildren");
    if (Qc(t, $t, "ParamType"), Object.defineProperty(this, Te, { value: cd }), a && (a = Object.freeze(a.slice())), i === "array") {
      if (u == null || l == null)
        throw new Error("");
    } else if (u != null || l != null)
      throw new Error("");
    if (i === "tuple") {
      if (a == null)
        throw new Error("");
    } else if (a != null)
      throw new Error("");
    mt(this, {
      name: e,
      type: n,
      baseType: i,
      indexed: s,
      components: a,
      arrayLength: u,
      arrayChildren: l
    });
  }
  /**
   *  Return a string representation of this type.
   *
   *  For example,
   *
   *  ``sighash" => "(uint256,address)"``
   *
   *  ``"minimal" => "tuple(uint256,address) indexed"``
   *
   *  ``"full" => "tuple(uint256 foo, address bar) indexed baz"``
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json") {
      const n = this.name || "";
      if (this.isArray()) {
        const s = JSON.parse(this.arrayChildren.format("json"));
        return s.name = n, s.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`, JSON.stringify(s);
      }
      const i = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: n
      };
      return typeof this.indexed == "boolean" && (i.indexed = this.indexed), this.isTuple() && (i.components = this.components.map((s) => JSON.parse(s.format(t)))), JSON.stringify(i);
    }
    let e = "";
    return this.isArray() ? (e += this.arrayChildren.format(t), e += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`) : this.isTuple() ? e += "(" + this.components.map((n) => n.format(t)).join(t === "full" ? ", " : ",") + ")" : e += this.type, t !== "sighash" && (this.indexed === !0 && (e += " indexed"), t === "full" && this.name && (e += " " + this.name)), e;
  }
  /**
   *  Returns true if %%this%% is an Array type.
   *
   *  This provides a type gaurd ensuring that [[arrayChildren]]
   *  and [[arrayLength]] are non-null.
   */
  isArray() {
    return this.baseType === "array";
  }
  /**
   *  Returns true if %%this%% is a Tuple type.
   *
   *  This provides a type gaurd ensuring that [[components]]
   *  is non-null.
   */
  isTuple() {
    return this.baseType === "tuple";
  }
  /**
   *  Returns true if %%this%% is an Indexable type.
   *
   *  This provides a type gaurd ensuring that [[indexed]]
   *  is non-null.
   */
  isIndexable() {
    return this.indexed != null;
  }
  /**
   *  Walks the **ParamType** with %%value%%, calling %%process%%
   *  on each type, destructing the %%value%% recursively.
   */
  walk(t, e) {
    if (this.isArray()) {
      if (!Array.isArray(t))
        throw new Error("invalid array value");
      if (this.arrayLength !== -1 && t.length !== this.arrayLength)
        throw new Error("array is wrong length");
      const n = this;
      return t.map((i) => n.arrayChildren.walk(i, e));
    }
    if (this.isTuple()) {
      if (!Array.isArray(t))
        throw new Error("invalid tuple value");
      if (t.length !== this.components.length)
        throw new Error("array is wrong length");
      const n = this;
      return t.map((i, s) => n.components[s].walk(i, e));
    }
    return e(this.type, t);
  }
  /**
   *  Walks the **ParamType** with %%value%%, asynchronously calling
   *  %%process%% on each type, destructing the %%value%% recursively.
   *
   *  This can be used to resolve ENS names by walking and resolving each
   *  ``"address"`` type.
   */
  async walkAsync(t, e) {
    const n = [], i = [t];
    return ct(this, sa, Yo).call(this, n, t, e, (s) => {
      i[0] = s;
    }), n.length && await Promise.all(n), i[0];
  }
  /**
   *  Creates a new **ParamType** for %%obj%%.
   *
   *  If %%allowIndexed%% then the ``indexed`` keyword is permitted,
   *  otherwise the ``indexed`` keyword will throw an error.
   */
  static from(t, e) {
    if (He.isParamType(t))
      return t;
    if (typeof t == "string")
      try {
        return He.from(li(t), e);
      } catch {
        N(!1, "invalid param type", "obj", t);
      }
    else if (t instanceof fr) {
      let u = "", l = "", p = null;
      en(t, xe(["tuple"])).has("tuple") || t.peekType("OPEN_PAREN") ? (l = "tuple", p = t.popParams().map((x) => He.from(x)), u = `tuple(${p.map((x) => x.format()).join(",")})`) : (u = od(t.popType("TYPE")), l = u);
      let f = null, h = null;
      for (; t.length && t.peekType("BRACKET"); ) {
        const x = t.pop();
        f = new He($t, "", u, l, null, p, h, f), h = x.value, u += x.text, l = "array", p = null;
      }
      let b = null;
      if (en(t, H1).has("indexed")) {
        if (!e)
          throw new Error("");
        b = !0;
      }
      const R = t.peekType("ID") ? t.pop().text : "";
      if (t.length)
        throw new Error("leftover tokens");
      return new He($t, R, u, l, b, p, h, f);
    }
    const n = t.name;
    N(!n || typeof n == "string" && n.match(Rg), "invalid name", "obj.name", n);
    let i = t.indexed;
    i != null && (N(e, "parameter cannot be indexed", "obj.indexed", t.indexed), i = !!i);
    let s = t.type, a = s.match(Y1);
    if (a) {
      const u = parseInt(a[2] || "-1"), l = He.from({
        type: a[1],
        components: t.components
      });
      return new He($t, n || "", s, "array", i, null, u, l);
    }
    if (s === "tuple" || s.startsWith(
      "tuple("
      /* fix: ) */
    ) || s.startsWith(
      "("
      /* fix: ) */
    )) {
      const u = t.components != null ? t.components.map((p) => He.from(p)) : null;
      return new He($t, n || "", s, "tuple", i, u, null, null);
    }
    return s = od(t.type), new He($t, n || "", s, s, i, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(t) {
    return t && t[Te] === cd;
  }
};
sa = new WeakSet(), Yo = function(t, e, n, i) {
  if (this.isArray()) {
    if (!Array.isArray(e))
      throw new Error("invalid array value");
    if (this.arrayLength !== -1 && e.length !== this.arrayLength)
      throw new Error("array is wrong length");
    const a = this.arrayChildren, u = e.slice();
    u.forEach((l, p) => {
      var f;
      ct(f = a, sa, Yo).call(f, t, l, n, (h) => {
        u[p] = h;
      });
    }), i(u);
    return;
  }
  if (this.isTuple()) {
    const a = this.components;
    let u;
    if (Array.isArray(e))
      u = e.slice();
    else {
      if (e == null || typeof e != "object")
        throw new Error("invalid tuple value");
      u = a.map((l) => {
        if (!l.name)
          throw new Error("cannot use object value with unnamed components");
        if (!(l.name in e))
          throw new Error(`missing value for component ${l.name}`);
        return e[l.name];
      });
    }
    if (u.length !== this.components.length)
      throw new Error("array is wrong length");
    u.forEach((l, p) => {
      var f;
      ct(f = a[p], sa, Yo).call(f, t, l, n, (h) => {
        u[p] = h;
      });
    }), i(u);
    return;
  }
  const s = n(this.type, e);
  s.then ? t.push(async function() {
    i(await s);
  }()) : i(s);
};
let pe = He;
class es {
  /**
   *  @private
   */
  constructor(t, e, n) {
    /**
     *  The type of the fragment.
     */
    z(this, "type");
    /**
     *  The inputs for the fragment.
     */
    z(this, "inputs");
    Qc(t, $t, "Fragment"), n = Object.freeze(n.slice()), mt(this, { type: e, inputs: n });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(t) {
    if (typeof t == "string") {
      try {
        es.from(JSON.parse(t));
      } catch {
      }
      return es.from(li(t));
    }
    if (t instanceof fr)
      switch (t.peekKeyword(kg)) {
        case "constructor":
          return qr.from(t);
        case "error":
          return Pe.from(t);
        case "event":
          return Rr.from(t);
        case "fallback":
        case "receive":
          return Fr.from(t);
        case "function":
          return Sr.from(t);
        case "struct":
          return Qi.from(t);
      }
    else if (typeof t == "object") {
      switch (t.type) {
        case "constructor":
          return qr.from(t);
        case "error":
          return Pe.from(t);
        case "event":
          return Rr.from(t);
        case "fallback":
        case "receive":
          return Fr.from(t);
        case "function":
          return Sr.from(t);
        case "struct":
          return Qi.from(t);
      }
      q(!1, `unsupported type: ${t.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from"
      });
    }
    N(!1, "unsupported frgament object", "obj", t);
  }
  /**
   *  Returns true if %%value%% is a [[ConstructorFragment]].
   */
  static isConstructor(t) {
    return qr.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(t) {
    return Pe.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(t) {
    return Rr.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(t) {
    return Sr.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(t) {
    return Qi.isFragment(t);
  }
}
class eu extends es {
  /**
   *  @private
   */
  constructor(e, n, i, s) {
    super(e, n, s);
    /**
     *  The name of the fragment.
     */
    z(this, "name");
    N(typeof i == "string" && i.match(Rg), "invalid identifier", "name", i), s = Object.freeze(s.slice()), mt(this, { name: i });
  }
}
function co(r, t) {
  return "(" + t.map((e) => e.format(r)).join(r === "full" ? ", " : ",") + ")";
}
class Pe extends eu {
  /**
   *  @private
   */
  constructor(t, e, n) {
    super(t, "error", e, n), Object.defineProperty(this, Te, { value: ud });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return Xi(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this fragment as %%format%%.
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json")
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((n) => JSON.parse(n.format(t)))
      });
    const e = [];
    return t !== "sighash" && e.push("error"), e.push(this.name + co(t, this.inputs)), e.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(t) {
    if (Pe.isFragment(t))
      return t;
    if (typeof t == "string")
      return Pe.from(li(t));
    if (t instanceof fr) {
      const e = tu("error", t), n = Xr(t);
      return ts(t), new Pe($t, e, n);
    }
    return new Pe($t, t.name, t.inputs ? t.inputs.map(pe.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(t) {
    return t && t[Te] === ud;
  }
}
class Rr extends eu {
  /**
   *  @private
   */
  constructor(e, n, i, s) {
    super(e, "event", n, i);
    /**
     *  Whether this event is anonymous.
     */
    z(this, "anonymous");
    Object.defineProperty(this, Te, { value: ld }), mt(this, { anonymous: s });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return Xi(this.format("sighash"));
  }
  /**
   *  Returns a string representation of this event as %%format%%.
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json")
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((i) => JSON.parse(i.format(e)))
      });
    const n = [];
    return e !== "sighash" && n.push("event"), n.push(this.name + co(e, this.inputs)), e !== "sighash" && this.anonymous && n.push("anonymous"), n.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(e, n) {
    return n = (n || []).map((s) => pe.from(s)), new Rr($t, e, n, !1).topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(e) {
    if (Rr.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return Rr.from(li(e));
      } catch {
        N(!1, "invalid event fragment", "obj", e);
      }
    else if (e instanceof fr) {
      const n = tu("event", e), i = Xr(e, !0), s = !!en(e, xe(["anonymous"])).has("anonymous");
      return ts(e), new Rr($t, n, i, s);
    }
    return new Rr($t, e.name, e.inputs ? e.inputs.map((n) => pe.from(n, !0)) : [], !!e.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(e) {
    return e && e[Te] === ld;
  }
}
class qr extends es {
  /**
   *  @private
   */
  constructor(e, n, i, s, a) {
    super(e, n, i);
    /**
     *  Whether the constructor can receive an endowment.
     */
    z(this, "payable");
    /**
     *  The recommended gas limit for deployment or ``null``.
     */
    z(this, "gas");
    Object.defineProperty(this, Te, { value: _d }), mt(this, { payable: s, gas: a });
  }
  /**
   *  Returns a string representation of this constructor as %%format%%.
   */
  format(e) {
    if (q(e != null && e !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" }), e === "json")
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((i) => JSON.parse(i.format(e)))
      });
    const n = [`constructor${co(e, this.inputs)}`];
    return this.payable && n.push("payable"), this.gas != null && n.push(`@${this.gas.toString()}`), n.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(e) {
    if (qr.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return qr.from(li(e));
      } catch {
        N(!1, "invalid constuctor fragment", "obj", e);
      }
    else if (e instanceof fr) {
      en(e, xe(["constructor"]));
      const n = Xr(e), i = !!en(e, j1).has("payable"), s = Pg(e);
      return ts(e), new qr($t, "constructor", n, i, s);
    }
    return new qr($t, "constructor", e.inputs ? e.inputs.map(pe.from) : [], !!e.payable, e.gas != null ? e.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(e) {
    return e && e[Te] === _d;
  }
}
class Fr extends es {
  constructor(e, n, i) {
    super(e, "fallback", n);
    /**
     *  If the function can be sent value during invocation.
     */
    z(this, "payable");
    Object.defineProperty(this, Te, { value: fd }), mt(this, { payable: i });
  }
  /**
   *  Returns a string representation of this fallback as %%format%%.
   */
  format(e) {
    const n = this.inputs.length === 0 ? "receive" : "fallback";
    if (e === "json") {
      const i = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type: n, stateMutability: i });
    }
    return `${n}()${this.payable ? " payable" : ""}`;
  }
  /**
   *  Returns a new **FallbackFragment** for %%obj%%.
   */
  static from(e) {
    if (Fr.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return Fr.from(li(e));
      } catch {
        N(!1, "invalid fallback fragment", "obj", e);
      }
    else if (e instanceof fr) {
      const n = e.toString(), i = e.peekKeyword(xe(["fallback", "receive"]));
      if (N(i, "type must be fallback or receive", "obj", n), e.popKeyword(xe(["fallback", "receive"])) === "receive") {
        const l = Xr(e);
        return N(l.length === 0, "receive cannot have arguments", "obj.inputs", l), en(e, xe(["payable"])), ts(e), new Fr($t, [], !0);
      }
      let a = Xr(e);
      a.length ? N(a.length === 1 && a[0].type === "bytes", "invalid fallback inputs", "obj.inputs", a.map((l) => l.format("minimal")).join(", ")) : a = [pe.from("bytes")];
      const u = Bg(e);
      if (N(u === "nonpayable" || u === "payable", "fallback cannot be constants", "obj.stateMutability", u), en(e, xe(["returns"])).has("returns")) {
        const l = Xr(e);
        N(l.length === 1 && l[0].type === "bytes", "invalid fallback outputs", "obj.outputs", l.map((p) => p.format("minimal")).join(", "));
      }
      return ts(e), new Fr($t, a, u === "payable");
    }
    if (e.type === "receive")
      return new Fr($t, [], !0);
    if (e.type === "fallback") {
      const n = [pe.from("bytes")], i = e.stateMutability === "payable";
      return new Fr($t, n, i);
    }
    N(!1, "invalid fallback description", "obj", e);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(e) {
    return e && e[Te] === fd;
  }
}
class Sr extends eu {
  /**
   *  @private
   */
  constructor(e, n, i, s, a, u) {
    super(e, "function", n, s);
    /**
     *  If the function is constant (e.g. ``pure`` or ``view`` functions).
     */
    z(this, "constant");
    /**
     *  The returned types for the result of calling this function.
     */
    z(this, "outputs");
    /**
     *  The state mutability (e.g. ``payable``, ``nonpayable``, ``view``
     *  or ``pure``)
     */
    z(this, "stateMutability");
    /**
     *  If the function can be sent value during invocation.
     */
    z(this, "payable");
    /**
     *  The recommended gas limit to send when calling this function.
     */
    z(this, "gas");
    Object.defineProperty(this, Te, { value: dd }), a = Object.freeze(a.slice()), mt(this, { constant: i === "view" || i === "pure", gas: u, outputs: a, payable: i === "payable", stateMutability: i });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return Xi(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this function as %%format%%.
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json")
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((i) => JSON.parse(i.format(e))),
        outputs: this.outputs.map((i) => JSON.parse(i.format(e)))
      });
    const n = [];
    return e !== "sighash" && n.push("function"), n.push(this.name + co(e, this.inputs)), e !== "sighash" && (this.stateMutability !== "nonpayable" && n.push(this.stateMutability), this.outputs && this.outputs.length && (n.push("returns"), n.push(co(e, this.outputs))), this.gas != null && n.push(`@${this.gas.toString()}`)), n.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(e, n) {
    return n = (n || []).map((s) => pe.from(s)), new Sr($t, e, "view", n, [], null).selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(e) {
    if (Sr.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return Sr.from(li(e));
      } catch {
        N(!1, "invalid function fragment", "obj", e);
      }
    else if (e instanceof fr) {
      const i = tu("function", e), s = Xr(e), a = Bg(e);
      let u = [];
      en(e, xe(["returns"])).has("returns") && (u = Xr(e));
      const l = Pg(e);
      return ts(e), new Sr($t, i, a, s, u, l);
    }
    let n = e.stateMutability;
    return n == null && (n = "payable", typeof e.constant == "boolean" ? (n = "view", e.constant || (n = "payable", typeof e.payable == "boolean" && !e.payable && (n = "nonpayable"))) : typeof e.payable == "boolean" && !e.payable && (n = "nonpayable")), new Sr($t, e.name, n, e.inputs ? e.inputs.map(pe.from) : [], e.outputs ? e.outputs.map(pe.from) : [], e.gas != null ? e.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(e) {
    return e && e[Te] === dd;
  }
}
class Qi extends eu {
  /**
   *  @private
   */
  constructor(t, e, n) {
    super(t, "struct", e, n), Object.defineProperty(this, Te, { value: pd });
  }
  /**
   *  Returns a string representation of this struct as %%format%%.
   */
  format() {
    throw new Error("@TODO");
  }
  /**
   *  Returns a new **StructFragment** for %%obj%%.
   */
  static from(t) {
    if (typeof t == "string")
      try {
        return Qi.from(li(t));
      } catch {
        N(!1, "invalid struct fragment", "obj", t);
      }
    else if (t instanceof fr) {
      const e = tu("struct", t), n = Xr(t);
      return ts(t), new Qi($t, e, n);
    }
    return new Qi($t, t.name, t.inputs ? t.inputs.map(pe.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(t) {
    return t && t[Te] === pd;
  }
}
const dr = /* @__PURE__ */ new Map();
dr.set(0, "GENERIC_PANIC");
dr.set(1, "ASSERT_FALSE");
dr.set(17, "OVERFLOW");
dr.set(18, "DIVIDE_BY_ZERO");
dr.set(33, "ENUM_RANGE_ERROR");
dr.set(34, "BAD_STORAGE_DATA");
dr.set(49, "STACK_UNDERFLOW");
dr.set(50, "ARRAY_RANGE_ERROR");
dr.set(65, "OUT_OF_MEMORY");
dr.set(81, "UNINITIALIZED_FUNCTION_CALL");
const Z1 = new RegExp(/^bytes([0-9]*)$/), X1 = new RegExp(/^(u?int)([0-9]*)$/);
let ll = null, hd = 1024;
function tm(r, t, e, n) {
  let i = "missing revert data", s = null;
  const a = null;
  let u = null;
  if (e) {
    i = "execution reverted";
    const p = Lt(e);
    if (e = dt(e), p.length === 0)
      i += " (no data present; likely require(false) occurred", s = "require(false)";
    else if (p.length % 32 !== 4)
      i += " (could not decode reason; invalid data length)";
    else if (dt(p.slice(0, 4)) === "0x08c379a0")
      try {
        s = n.decode(["string"], p.slice(4))[0], u = {
          signature: "Error(string)",
          name: "Error",
          args: [s]
        }, i += `: ${JSON.stringify(s)}`;
      } catch {
        i += " (could not decode reason; invalid string data)";
      }
    else if (dt(p.slice(0, 4)) === "0x4e487b71")
      try {
        const f = Number(n.decode(["uint256"], p.slice(4))[0]);
        u = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [f]
        }, s = `Panic due to ${dr.get(f) || "UNKNOWN"}(${f})`, i += `: ${s}`;
      } catch {
        i += " (could not decode panic code)";
      }
    else
      i += " (unknown custom error)";
  }
  const l = {
    to: t.to ? Ut(t.to) : null,
    data: t.data || "0x"
  };
  return t.from && (l.from = Ut(t.from)), qt(i, "CALL_EXCEPTION", {
    action: r,
    data: e,
    reason: s,
    transaction: l,
    invocation: a,
    revert: u
  });
}
var Wn, hs;
const Mc = class Mc {
  constructor() {
    D(this, Wn);
  }
  /**
   *  Get the default values for the given %%types%%.
   *
   *  For example, a ``uint`` is by default ``0`` and ``bool``
   *  is by default ``false``.
   */
  getDefaultValue(t) {
    const e = t.map((i) => ct(this, Wn, hs).call(this, pe.from(i)));
    return new Go(e, "_").defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(t, e) {
    ih(e.length, t.length, "types/values length mismatch");
    const n = t.map((a) => ct(this, Wn, hs).call(this, pe.from(a))), i = new Go(n, "_"), s = new Ml();
    return i.encode(s, e), s.data;
  }
  /**
   *  Decode the ABI %%data%% as the %%types%% into values.
   *
   *  If %%loose%% decoding is enabled, then strict padding is
   *  not enforced. Some older versions of Solidity incorrectly
   *  padded event data emitted from ``external`` functions.
   */
  decode(t, e, n) {
    const i = t.map((a) => ct(this, Wn, hs).call(this, pe.from(a)));
    return new Go(i, "_").decode(new jl(e, n, hd));
  }
  static _setDefaultMaxInflation(t) {
    N(typeof t == "number" && Number.isInteger(t), "invalid defaultMaxInflation factor", "value", t), hd = t;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    return ll == null && (ll = new Mc()), ll;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(t, e, n) {
    return tm(t, e, n, Mc.defaultAbiCoder());
  }
};
Wn = new WeakSet(), hs = function(t) {
  if (t.isArray())
    return new I0(ct(this, Wn, hs).call(this, t.arrayChildren), t.arrayLength, t.name);
  if (t.isTuple())
    return new Go(t.components.map((n) => ct(this, Wn, hs).call(this, n)), t.name);
  switch (t.baseType) {
    case "address":
      return new v0(t.name);
    case "bool":
      return new E0(t.name);
    case "string":
      return new N0(t.name);
    case "bytes":
      return new k0(t.name);
    case "":
      return new S0(t.name);
  }
  let e = t.type.match(X1);
  if (e) {
    let n = parseInt(e[2] || "256");
    return N(n !== 0 && n <= 256 && n % 8 === 0, "invalid " + e[1] + " bit length", "param", t), new T0(n / 8, e[1] === "int", t.name);
  }
  if (e = t.type.match(Z1), e) {
    let n = parseInt(e[1]);
    return N(n !== 0 && n <= 32, "invalid bytes length", "param", t), new x0(n, t.name);
  }
  N(!1, "invalid type", "type", t.type);
};
let uo = Mc;
class em {
  /**
   *  @_ignore:
   */
  constructor(t, e, n) {
    /**
     *  The matching fragment for the ``topic0``.
     */
    z(this, "fragment");
    /**
     *  The name of the Event.
     */
    z(this, "name");
    /**
     *  The full Event signature.
     */
    z(this, "signature");
    /**
     *  The topic hash for the Event.
     */
    z(this, "topic");
    /**
     *  The arguments passed into the Event with ``emit``.
     */
    z(this, "args");
    const i = t.name, s = t.format();
    mt(this, {
      fragment: t,
      name: i,
      signature: s,
      topic: e,
      args: n
    });
  }
}
class rm {
  /**
   *  @_ignore:
   */
  constructor(t, e, n, i) {
    /**
     *  The matching fragment from the transaction ``data``.
     */
    z(this, "fragment");
    /**
     *  The name of the Function from the transaction ``data``.
     */
    z(this, "name");
    /**
     *  The arguments passed to the Function from the transaction ``data``.
     */
    z(this, "args");
    /**
     *  The full Function signature from the transaction ``data``.
     */
    z(this, "signature");
    /**
     *  The selector for the Function from the transaction ``data``.
     */
    z(this, "selector");
    /**
     *  The ``value`` (in wei) from the transaction.
     */
    z(this, "value");
    const s = t.name, a = t.format();
    mt(this, {
      fragment: t,
      name: s,
      args: n,
      signature: a,
      selector: e,
      value: i
    });
  }
}
class nm {
  /**
   *  @_ignore:
   */
  constructor(t, e, n) {
    /**
     *  The matching fragment.
     */
    z(this, "fragment");
    /**
     *  The name of the Error.
     */
    z(this, "name");
    /**
     *  The arguments passed to the Error with ``revert``.
     */
    z(this, "args");
    /**
     *  The full Error signature.
     */
    z(this, "signature");
    /**
     *  The selector for the Error.
     */
    z(this, "selector");
    const i = t.name, s = t.format();
    mt(this, {
      fragment: t,
      name: i,
      args: n,
      signature: s,
      selector: e
    });
  }
}
class gd {
  /**
   *  @_ignore:
   */
  constructor(t) {
    /**
     *  The ``keccak256`` of the value logged.
     */
    z(this, "hash");
    /**
     *  @_ignore:
     */
    z(this, "_isIndexed");
    mt(this, { hash: t, _isIndexed: !0 });
  }
  /**
   *  Returns ``true`` if %%value%% is an **Indexed**.
   *
   *  This provides a Type Guard for property access.
   */
  static isIndexed(t) {
    return !!(t && t._isIndexed);
  }
}
const wd = {
  0: "generic panic",
  1: "assert(false)",
  17: "arithmetic overflow",
  18: "division or modulo by zero",
  33: "enum overflow",
  34: "invalid encoded storage byte array accessed",
  49: "out-of-bounds array access; popping on an empty array",
  50: "out-of-bounds access of an array or bytesN",
  65: "out of memory",
  81: "uninitialized function"
}, yd = {
  "0x08c379a0": {
    signature: "Error(string)",
    name: "Error",
    inputs: ["string"],
    reason: (r) => `reverted with reason string ${JSON.stringify(r)}`
  },
  "0x4e487b71": {
    signature: "Panic(uint256)",
    name: "Panic",
    inputs: ["uint256"],
    reason: (r) => {
      let t = "unknown panic code";
      return r >= 0 && r <= 255 && wd[r.toString()] && (t = wd[r.toString()]), `reverted with panic code 0x${r.toString(16)} (${t})`;
    }
  }
};
var mr, vr, Ar, he, Pr, Zo, Xo;
const yi = class yi {
  /**
   *  Create a new Interface for the %%fragments%%.
   */
  constructor(t) {
    D(this, Pr);
    /**
     *  All the Contract ABI members (i.e. methods, events, errors, etc).
     */
    z(this, "fragments");
    /**
     *  The Contract constructor.
     */
    z(this, "deploy");
    /**
     *  The Fallback method, if any.
     */
    z(this, "fallback");
    /**
     *  If receiving ether is supported.
     */
    z(this, "receive");
    D(this, mr);
    D(this, vr);
    D(this, Ar);
    //    #structs: Map<string, StructFragment>;
    D(this, he);
    let e = [];
    typeof t == "string" ? e = JSON.parse(t) : e = t, E(this, Ar, /* @__PURE__ */ new Map()), E(this, mr, /* @__PURE__ */ new Map()), E(this, vr, /* @__PURE__ */ new Map());
    const n = [];
    for (const a of e)
      try {
        n.push(es.from(a));
      } catch (u) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(a)}:`, u.message);
      }
    mt(this, {
      fragments: Object.freeze(n)
    });
    let i = null, s = !1;
    E(this, he, this.getAbiCoder()), this.fragments.forEach((a, u) => {
      let l;
      switch (a.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          mt(this, { deploy: a });
          return;
        case "fallback":
          a.inputs.length === 0 ? s = !0 : (N(!i || a.payable !== i.payable, "conflicting fallback fragments", `fragments[${u}]`, a), i = a, s = i.payable);
          return;
        case "function":
          l = g(this, Ar);
          break;
        case "event":
          l = g(this, vr);
          break;
        case "error":
          l = g(this, mr);
          break;
        default:
          return;
      }
      const p = a.format();
      l.has(p) || l.set(p, a);
    }), this.deploy || mt(this, {
      deploy: qr.from("constructor()")
    }), mt(this, { fallback: i, receive: s });
  }
  /**
   *  Returns the entire Human-Readable ABI, as an array of
   *  signatures, optionally as %%minimal%% strings, which
   *  removes parameter names and unneceesary spaces.
   */
  format(t) {
    const e = t ? "minimal" : "full";
    return this.fragments.map((i) => i.format(e));
  }
  /**
   *  Return the JSON-encoded ABI. This is the format Solidiy
   *  returns.
   */
  formatJson() {
    const t = this.fragments.map((e) => e.format("json"));
    return JSON.stringify(t.map((e) => JSON.parse(e)));
  }
  /**
   *  The ABI coder that will be used to encode and decode binary
   *  data.
   */
  getAbiCoder() {
    return uo.defaultAbiCoder();
  }
  /**
   *  Get the function name for %%key%%, which may be a function selector,
   *  function name or function signature that belongs to the ABI.
   */
  getFunctionName(t) {
    const e = ct(this, Pr, Zo).call(this, t, null, !1);
    return N(e, "no matching function", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (a function selector, function name or
   *  function signature) is present in the ABI.
   *
   *  In the case of a function name, the name may be ambiguous, so
   *  accessing the [[FunctionFragment]] may require refinement.
   */
  hasFunction(t) {
    return !!ct(this, Pr, Zo).call(this, t, null, !1);
  }
  /**
   *  Get the [[FunctionFragment]] for %%key%%, which may be a function
   *  selector, function name or function signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple functions match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single function in
   *  the ABI, this will throw.
   */
  getFunction(t, e) {
    return ct(this, Pr, Zo).call(this, t, e || null, !0);
  }
  /**
   *  Iterate over all functions, calling %%callback%%, sorted by their name.
   */
  forEachFunction(t) {
    const e = Array.from(g(this, Ar).keys());
    e.sort((n, i) => n.localeCompare(i));
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      t(g(this, Ar).get(i), n);
    }
  }
  /**
   *  Get the event name for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   */
  getEventName(t) {
    const e = ct(this, Pr, Xo).call(this, t, null, !1);
    return N(e, "no matching event", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (an event topic hash, event name or
   *  event signature) is present in the ABI.
   *
   *  In the case of an event name, the name may be ambiguous, so
   *  accessing the [[EventFragment]] may require refinement.
   */
  hasEvent(t) {
    return !!ct(this, Pr, Xo).call(this, t, null, !1);
  }
  /**
   *  Get the [[EventFragment]] for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple events match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single event in
   *  the ABI, this will throw.
   */
  getEvent(t, e) {
    return ct(this, Pr, Xo).call(this, t, e || null, !0);
  }
  /**
   *  Iterate over all events, calling %%callback%%, sorted by their name.
   */
  forEachEvent(t) {
    const e = Array.from(g(this, vr).keys());
    e.sort((n, i) => n.localeCompare(i));
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      t(g(this, vr).get(i), n);
    }
  }
  /**
   *  Get the [[ErrorFragment]] for %%key%%, which may be an error
   *  selector, error name or error signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple errors match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single error in
   *  the ABI, this will throw.
   */
  getError(t, e) {
    if (Wt(t)) {
      const i = t.toLowerCase();
      if (yd[i])
        return Pe.from(yd[i].signature);
      for (const s of g(this, mr).values())
        if (i === s.selector)
          return s;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const i = [];
      for (const [s, a] of g(this, mr))
        s.split(
          "("
          /* fix:) */
        )[0] === t && i.push(a);
      if (i.length === 0)
        return t === "Error" ? Pe.from("error Error(string)") : t === "Panic" ? Pe.from("error Panic(uint256)") : null;
      if (i.length > 1) {
        const s = i.map((a) => JSON.stringify(a.format())).join(", ");
        N(!1, `ambiguous error description (i.e. ${s})`, "name", t);
      }
      return i[0];
    }
    if (t = Pe.from(t).format(), t === "Error(string)")
      return Pe.from("error Error(string)");
    if (t === "Panic(uint256)")
      return Pe.from("error Panic(uint256)");
    const n = g(this, mr).get(t);
    return n || null;
  }
  /**
   *  Iterate over all errors, calling %%callback%%, sorted by their name.
   */
  forEachError(t) {
    const e = Array.from(g(this, mr).keys());
    e.sort((n, i) => n.localeCompare(i));
    for (let n = 0; n < e.length; n++) {
      const i = e[n];
      t(g(this, mr).get(i), n);
    }
  }
  // Get the 4-byte selector used by Solidity to identify a function
  /*
  getSelector(fragment: ErrorFragment | FunctionFragment): string {
      if (typeof(fragment) === "string") {
          const matches: Array<Fragment> = [ ];
  
          try { matches.push(this.getFunction(fragment)); } catch (error) { }
          try { matches.push(this.getError(<string>fragment)); } catch (_) { }
  
          if (matches.length === 0) {
              logger.throwArgumentError("unknown fragment", "key", fragment);
          } else if (matches.length > 1) {
              logger.throwArgumentError("ambiguous fragment matches function and error", "key", fragment);
          }
  
          fragment = matches[0];
      }
  
      return dataSlice(id(fragment.format()), 0, 4);
  }
      */
  // Get the 32-byte topic hash used by Solidity to identify an event
  /*
  getEventTopic(fragment: EventFragment): string {
      //if (typeof(fragment) === "string") { fragment = this.getEvent(eventFragment); }
      return id(fragment.format());
  }
  */
  _decodeParams(t, e) {
    return g(this, he).decode(t, e);
  }
  _encodeParams(t, e) {
    return g(this, he).encode(t, e);
  }
  /**
   *  Encodes a ``tx.data`` object for deploying the Contract with
   *  the %%values%% as the constructor arguments.
   */
  encodeDeploy(t) {
    return this._encodeParams(this.deploy.inputs, t || []);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified error (see [[getError]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeErrorResult(t, e) {
    if (typeof t == "string") {
      const n = this.getError(t);
      N(n, "unknown error", "fragment", t), t = n;
    }
    return N(Yt(e, 0, 4) === t.selector, `data signature does not match error ${t.name}.`, "data", e), this._decodeParams(t.inputs, Yt(e, 4));
  }
  /**
   *  Encodes the transaction revert data for a call result that
   *  reverted from the the Contract with the sepcified %%error%%
   *  (see [[getError]] for valid values for %%fragment%%) with the %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeErrorResult(t, e) {
    if (typeof t == "string") {
      const n = this.getError(t);
      N(n, "unknown error", "fragment", t), t = n;
    }
    return ee([
      t.selector,
      this._encodeParams(t.inputs, e || [])
    ]);
  }
  /**
   *  Decodes the %%data%% from a transaction ``tx.data`` for
   *  the function specified (see [[getFunction]] for valid values
   *  for %%fragment%%).
   *
   *  Most developers should prefer the [[parseTransaction]] method
   *  instead, which will automatically detect the fragment.
   */
  decodeFunctionData(t, e) {
    if (typeof t == "string") {
      const n = this.getFunction(t);
      N(n, "unknown function", "fragment", t), t = n;
    }
    return N(Yt(e, 0, 4) === t.selector, `data signature does not match function ${t.name}.`, "data", e), this._decodeParams(t.inputs, Yt(e, 4));
  }
  /**
   *  Encodes the ``tx.data`` for a transaction that calls the function
   *  specified (see [[getFunction]] for valid values for %%fragment%%) with
   *  the %%values%%.
   */
  encodeFunctionData(t, e) {
    if (typeof t == "string") {
      const n = this.getFunction(t);
      N(n, "unknown function", "fragment", t), t = n;
    }
    return ee([
      t.selector,
      this._encodeParams(t.inputs, e || [])
    ]);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeFunctionResult(t, e) {
    if (typeof t == "string") {
      const s = this.getFunction(t);
      N(s, "unknown function", "fragment", t), t = s;
    }
    let n = "invalid length for result data";
    const i = Ae(e);
    if (i.length % 32 === 0)
      try {
        return g(this, he).decode(t.outputs, i);
      } catch {
        n = "could not decode result data";
      }
    q(!1, n, "BAD_DATA", {
      value: dt(i),
      info: { method: t.name, signature: t.format() }
    });
  }
  makeError(t, e) {
    const n = Lt(t, "data"), i = uo.getBuiltinCallException("call", e, n);
    if (i.message.startsWith("execution reverted (unknown custom error)")) {
      const u = dt(n.slice(0, 4)), l = this.getError(u);
      if (l)
        try {
          const p = g(this, he).decode(l.inputs, n.slice(4));
          i.revert = {
            name: l.name,
            signature: l.format(),
            args: p
          }, i.reason = i.revert.signature, i.message = `execution reverted: ${i.reason}`;
        } catch {
          i.message = "execution reverted (coult not decode custom error)";
        }
    }
    const a = this.parseTransaction(e);
    return a && (i.invocation = {
      method: a.name,
      signature: a.signature,
      args: a.args
    }), i;
  }
  /**
   *  Encodes the result data (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values
   *  for %%fragment%%) with %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeFunctionResult(t, e) {
    if (typeof t == "string") {
      const n = this.getFunction(t);
      N(n, "unknown function", "fragment", t), t = n;
    }
    return dt(g(this, he).encode(t.outputs, e || []));
  }
  /*
      spelunk(inputs: Array<ParamType>, values: ReadonlyArray<any>, processfunc: (type: string, value: any) => Promise<any>): Promise<Array<any>> {
          const promises: Array<Promise<>> = [ ];
          const process = function(type: ParamType, value: any): any {
              if (type.baseType === "array") {
                  return descend(type.child
              }
              if (type. === "address") {
              }
          };
  
          const descend = function (inputs: Array<ParamType>, values: ReadonlyArray<any>) {
              if (inputs.length !== values.length) { throw new Error("length mismatch"); }
              
          };
  
          const result: Array<any> = [ ];
          values.forEach((value, index) => {
              if (value == null) {
                  topics.push(null);
              } else if (param.baseType === "array" || param.baseType === "tuple") {
                  logger.throwArgumentError("filtering with tuples or arrays not supported", ("contract." + param.name), value);
              } else if (Array.isArray(value)) {
                  topics.push(value.map((value) => encodeTopic(param, value)));
              } else {
                  topics.push(encodeTopic(param, value));
              }
          });
      }
  */
  // Create the filter for the event with search criteria (e.g. for eth_filterLog)
  encodeFilterTopics(t, e) {
    if (typeof t == "string") {
      const s = this.getEvent(t);
      N(s, "unknown event", "eventFragment", t), t = s;
    }
    q(e.length <= t.inputs.length, `too many arguments for ${t.format()}`, "UNEXPECTED_ARGUMENT", { count: e.length, expectedCount: t.inputs.length });
    const n = [];
    t.anonymous || n.push(t.topicHash);
    const i = (s, a) => s.type === "string" ? Xi(a) : s.type === "bytes" ? ne(dt(a)) : (s.type === "bool" && typeof a == "boolean" ? a = a ? "0x01" : "0x00" : s.type.match(/^u?int/) ? a = oi(a) : s.type.match(/^bytes/) ? a = Ry(a, 32) : s.type === "address" && g(this, he).encode(["address"], [a]), Yi(dt(a), 32));
    for (e.forEach((s, a) => {
      const u = t.inputs[a];
      if (!u.indexed) {
        N(s == null, "cannot filter non-indexed parameters; must be null", "contract." + u.name, s);
        return;
      }
      s == null ? n.push(null) : u.baseType === "array" || u.baseType === "tuple" ? N(!1, "filtering with tuples or arrays not supported", "contract." + u.name, s) : Array.isArray(s) ? n.push(s.map((l) => i(u, l))) : n.push(i(u, s));
    }); n.length && n[n.length - 1] === null; )
      n.pop();
    return n;
  }
  encodeEventLog(t, e) {
    if (typeof t == "string") {
      const a = this.getEvent(t);
      N(a, "unknown event", "eventFragment", t), t = a;
    }
    const n = [], i = [], s = [];
    return t.anonymous || n.push(t.topicHash), N(e.length === t.inputs.length, "event arguments/values mismatch", "values", e), t.inputs.forEach((a, u) => {
      const l = e[u];
      if (a.indexed)
        if (a.type === "string")
          n.push(Xi(l));
        else if (a.type === "bytes")
          n.push(ne(l));
        else {
          if (a.baseType === "tuple" || a.baseType === "array")
            throw new Error("not implemented");
          n.push(g(this, he).encode([a.type], [l]));
        }
      else
        i.push(a), s.push(l);
    }), {
      data: g(this, he).encode(i, s),
      topics: n
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(t, e, n) {
    if (typeof t == "string") {
      const k = this.getEvent(t);
      N(k, "unknown event", "eventFragment", t), t = k;
    }
    if (n != null && !t.anonymous) {
      const k = t.topicHash;
      N(Wt(n[0], 32) && n[0].toLowerCase() === k, "fragment/topic mismatch", "topics[0]", n[0]), n = n.slice(1);
    }
    const i = [], s = [], a = [];
    t.inputs.forEach((k, R) => {
      k.indexed ? k.type === "string" || k.type === "bytes" || k.baseType === "tuple" || k.baseType === "array" ? (i.push(pe.from({ type: "bytes32", name: k.name })), a.push(!0)) : (i.push(k), a.push(!1)) : (s.push(k), a.push(!1));
    });
    const u = n != null ? g(this, he).decode(i, ee(n)) : null, l = g(this, he).decode(s, e, !0), p = [], f = [];
    let h = 0, b = 0;
    return t.inputs.forEach((k, R) => {
      let x = null;
      if (k.indexed)
        if (u == null)
          x = new gd(null);
        else if (a[R])
          x = new gd(u[b++]);
        else
          try {
            x = u[b++];
          } catch (S) {
            x = S;
          }
      else
        try {
          x = l[h++];
        } catch (S) {
          x = S;
        }
      p.push(x), f.push(k.name || null);
    }), va.fromItems(p, f);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(t) {
    const e = Lt(t.data, "tx.data"), n = pt(t.value != null ? t.value : 0, "tx.value"), i = this.getFunction(dt(e.slice(0, 4)));
    if (!i)
      return null;
    const s = g(this, he).decode(i.inputs, e.slice(4));
    return new rm(i, i.selector, s, n);
  }
  parseCallResult(t) {
    throw new Error("@TODO");
  }
  /**
   *  Parses a receipt log, finding the matching event and extracts
   *  the parameter values along with other useful event details.
   *
   *  If the matching event cannot be found, returns null.
   */
  parseLog(t) {
    const e = this.getEvent(t.topics[0]);
    return !e || e.anonymous ? null : new em(e, e.topicHash, this.decodeEventLog(e, t.data, t.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(t) {
    const e = dt(t), n = this.getError(Yt(e, 0, 4));
    if (!n)
      return null;
    const i = g(this, he).decode(n.inputs, Yt(e, 4));
    return new nm(n, n.selector, i);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(t) {
    return t instanceof yi ? t : typeof t == "string" ? new yi(JSON.parse(t)) : typeof t.formatJson == "function" ? new yi(t.formatJson()) : typeof t.format == "function" ? new yi(t.format("json")) : new yi(t);
  }
};
mr = new WeakMap(), vr = new WeakMap(), Ar = new WeakMap(), he = new WeakMap(), Pr = new WeakSet(), // Find a function definition by any means necessary (unless it is ambiguous)
Zo = function(t, e, n) {
  if (Wt(t)) {
    const s = t.toLowerCase();
    for (const a of g(this, Ar).values())
      if (s === a.selector)
        return a;
    return null;
  }
  if (t.indexOf("(") === -1) {
    const s = [];
    for (const [a, u] of g(this, Ar))
      a.split(
        "("
        /* fix:) */
      )[0] === t && s.push(u);
    if (e) {
      const a = e.length > 0 ? e[e.length - 1] : null;
      let u = e.length, l = !0;
      be.isTyped(a) && a.type === "overrides" && (l = !1, u--);
      for (let p = s.length - 1; p >= 0; p--) {
        const f = s[p].inputs.length;
        f !== u && (!l || f !== u - 1) && s.splice(p, 1);
      }
      for (let p = s.length - 1; p >= 0; p--) {
        const f = s[p].inputs;
        for (let h = 0; h < e.length; h++)
          if (be.isTyped(e[h])) {
            if (h >= f.length) {
              if (e[h].type === "overrides")
                continue;
              s.splice(p, 1);
              break;
            }
            if (e[h].type !== f[h].baseType) {
              s.splice(p, 1);
              break;
            }
          }
      }
    }
    if (s.length === 1 && e && e.length !== s[0].inputs.length) {
      const a = e[e.length - 1];
      (a == null || Array.isArray(a) || typeof a != "object") && s.splice(0, 1);
    }
    if (s.length === 0)
      return null;
    if (s.length > 1 && n) {
      const a = s.map((u) => JSON.stringify(u.format())).join(", ");
      N(!1, `ambiguous function description (i.e. matches ${a})`, "key", t);
    }
    return s[0];
  }
  const i = g(this, Ar).get(Sr.from(t).format());
  return i || null;
}, // Find an event definition by any means necessary (unless it is ambiguous)
Xo = function(t, e, n) {
  if (Wt(t)) {
    const s = t.toLowerCase();
    for (const a of g(this, vr).values())
      if (s === a.topicHash)
        return a;
    return null;
  }
  if (t.indexOf("(") === -1) {
    const s = [];
    for (const [a, u] of g(this, vr))
      a.split(
        "("
        /* fix:) */
      )[0] === t && s.push(u);
    if (e) {
      for (let a = s.length - 1; a >= 0; a--)
        s[a].inputs.length < e.length && s.splice(a, 1);
      for (let a = s.length - 1; a >= 0; a--) {
        const u = s[a].inputs;
        for (let l = 0; l < e.length; l++)
          if (be.isTyped(e[l]) && e[l].type !== u[l].baseType) {
            s.splice(a, 1);
            break;
          }
      }
    }
    if (s.length === 0)
      return null;
    if (s.length > 1 && n) {
      const a = s.map((u) => JSON.stringify(u.format())).join(", ");
      N(!1, `ambiguous event description (i.e. matches ${a})`, "key", t);
    }
    return s[0];
  }
  const i = g(this, vr).get(Rr.from(t).format());
  return i || null;
};
let e_ = yi;
const Og = BigInt(0);
function Ss(r) {
  return r ?? null;
}
function Zt(r) {
  return r == null ? null : r.toString();
}
class bd {
  /**
   *  Creates a new FeeData for %%gasPrice%%, %%maxFeePerGas%% and
   *  %%maxPriorityFeePerGas%%.
   */
  constructor(t, e, n) {
    /**
     *  The gas price for legacy networks.
     */
    z(this, "gasPrice");
    /**
     *  The maximum fee to pay per gas.
     *
     *  The base fee per gas is defined by the network and based on
     *  congestion, increasing the cost during times of heavy load
     *  and lowering when less busy.
     *
     *  The actual fee per gas will be the base fee for the block
     *  and the priority fee, up to the max fee per gas.
     *
     *  This will be ``null`` on legacy networks (i.e. [pre-EIP-1559](link-eip-1559))
     */
    z(this, "maxFeePerGas");
    /**
     *  The additional amout to pay per gas to encourage a validator
     *  to include the transaction.
     *
     *  The purpose of this is to compensate the validator for the
     *  adjusted risk for including a given transaction.
     *
     *  This will be ``null`` on legacy networks (i.e. [pre-EIP-1559](link-eip-1559))
     */
    z(this, "maxPriorityFeePerGas");
    mt(this, {
      gasPrice: Ss(t),
      maxFeePerGas: Ss(e),
      maxPriorityFeePerGas: Ss(n)
    });
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { gasPrice: t, maxFeePerGas: e, maxPriorityFeePerGas: n } = this;
    return {
      _type: "FeeData",
      gasPrice: Zt(t),
      maxFeePerGas: Zt(e),
      maxPriorityFeePerGas: Zt(n)
    };
  }
}
function kc(r) {
  const t = {};
  r.to && (t.to = r.to), r.from && (t.from = r.from), r.data && (t.data = dt(r.data));
  const e = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const i of e)
    !(i in r) || r[i] == null || (t[i] = pt(r[i], `request.${i}`));
  const n = "type,nonce".split(/,/);
  for (const i of n)
    !(i in r) || r[i] == null || (t[i] = Rt(r[i], `request.${i}`));
  return r.accessList && (t.accessList = is(r.accessList)), "blockTag" in r && (t.blockTag = r.blockTag), "enableCcipRead" in r && (t.enableCcipRead = !!r.enableCcipRead), "customData" in r && (t.customData = r.customData), "blobVersionedHashes" in r && r.blobVersionedHashes && (t.blobVersionedHashes = r.blobVersionedHashes.slice()), "kzg" in r && (t.kzg = r.kzg), "blobs" in r && r.blobs && (t.blobs = r.blobs.map((i) => O_(i) ? dt(i) : Object.assign({}, i))), t;
}
var Gr;
class im {
  /**
   *  Create a new **Block** object.
   *
   *  This should generally not be necessary as the unless implementing a
   *  low-level library.
   */
  constructor(t, e) {
    /**
     *  The provider connected to the block used to fetch additional details
     *  if necessary.
     */
    z(this, "provider");
    /**
     *  The block number, sometimes called the block height. This is a
     *  sequential number that is one higher than the parent block.
     */
    z(this, "number");
    /**
     *  The block hash.
     *
     *  This hash includes all properties, so can be safely used to identify
     *  an exact set of block properties.
     */
    z(this, "hash");
    /**
     *  The timestamp for this block, which is the number of seconds since
     *  epoch that this block was included.
     */
    z(this, "timestamp");
    /**
     *  The block hash of the parent block.
     */
    z(this, "parentHash");
    /**
     *  The hash tree root of the parent beacon block for the given
     *  execution block. See [[link-eip-4788]].
     */
    z(this, "parentBeaconBlockRoot");
    /**
     *  The nonce.
     *
     *  On legacy networks, this is the random number inserted which
     *  permitted the difficulty target to be reached.
     */
    z(this, "nonce");
    /**
     *  The difficulty target.
     *
     *  On legacy networks, this is the proof-of-work target required
     *  for a block to meet the protocol rules to be included.
     *
     *  On modern networks, this is a random number arrived at using
     *  randao.  @TODO: Find links?
     */
    z(this, "difficulty");
    /**
     *  The total gas limit for this block.
     */
    z(this, "gasLimit");
    /**
     *  The total gas used in this block.
     */
    z(this, "gasUsed");
    /**
     *  The root hash for the global state after applying changes
     *  in this block.
     */
    z(this, "stateRoot");
    /**
     *  The hash of the transaction receipts trie.
     */
    z(this, "receiptsRoot");
    /**
     *  The total amount of blob gas consumed by the transactions
     *  within the block. See [[link-eip-4844]].
     */
    z(this, "blobGasUsed");
    /**
     *  The running total of blob gas consumed in excess of the
     *  target, prior to the block. See [[link-eip-4844]].
     */
    z(this, "excessBlobGas");
    /**
     *  The miner coinbase address, wihch receives any subsidies for
     *  including this block.
     */
    z(this, "miner");
    /**
     *  The latest RANDAO mix of the post beacon state of
     *  the previous block.
     */
    z(this, "prevRandao");
    /**
     *  Any extra data the validator wished to include.
     */
    z(this, "extraData");
    /**
     *  The base fee per gas that all transactions in this block were
     *  charged.
     *
     *  This adjusts after each block, depending on how congested the network
     *  is.
     */
    z(this, "baseFeePerGas");
    D(this, Gr);
    E(this, Gr, t.transactions.map((n) => typeof n != "string" ? new lo(n, e) : n)), mt(this, {
      provider: e,
      hash: Ss(t.hash),
      number: t.number,
      timestamp: t.timestamp,
      parentHash: t.parentHash,
      parentBeaconBlockRoot: t.parentBeaconBlockRoot,
      nonce: t.nonce,
      difficulty: t.difficulty,
      gasLimit: t.gasLimit,
      gasUsed: t.gasUsed,
      blobGasUsed: t.blobGasUsed,
      excessBlobGas: t.excessBlobGas,
      miner: t.miner,
      prevRandao: Ss(t.prevRandao),
      extraData: t.extraData,
      baseFeePerGas: Ss(t.baseFeePerGas),
      stateRoot: t.stateRoot,
      receiptsRoot: t.receiptsRoot
    });
  }
  /**
   *  Returns the list of transaction hashes, in the order
   *  they were executed within the block.
   */
  get transactions() {
    return g(this, Gr).map((t) => typeof t == "string" ? t : t.hash);
  }
  /**
   *  Returns the complete transactions, in the order they
   *  were executed within the block.
   *
   *  This is only available for blocks which prefetched
   *  transactions, by passing ``true`` to %%prefetchTxs%%
   *  into [[Provider-getBlock]].
   */
  get prefetchedTransactions() {
    const t = g(this, Gr).slice();
    return t.length === 0 ? [] : (q(typeof t[0] == "object", "transactions were not prefetched with block request", "UNSUPPORTED_OPERATION", {
      operation: "transactionResponses()"
    }), t);
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { baseFeePerGas: t, difficulty: e, extraData: n, gasLimit: i, gasUsed: s, hash: a, miner: u, prevRandao: l, nonce: p, number: f, parentHash: h, parentBeaconBlockRoot: b, stateRoot: k, receiptsRoot: R, timestamp: x, transactions: S } = this;
    return {
      _type: "Block",
      baseFeePerGas: Zt(t),
      difficulty: Zt(e),
      extraData: n,
      gasLimit: Zt(i),
      gasUsed: Zt(s),
      blobGasUsed: Zt(this.blobGasUsed),
      excessBlobGas: Zt(this.excessBlobGas),
      hash: a,
      miner: u,
      prevRandao: l,
      nonce: p,
      number: f,
      parentHash: h,
      timestamp: x,
      parentBeaconBlockRoot: b,
      stateRoot: k,
      receiptsRoot: R,
      transactions: S
    };
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.transactions;
    return {
      next: () => t < this.length ? {
        value: e[t++],
        done: !1
      } : { value: void 0, done: !0 }
    };
  }
  /**
   *  The number of transactions in this block.
   */
  get length() {
    return g(this, Gr).length;
  }
  /**
   *  The [[link-js-date]] this block was included at.
   */
  get date() {
    return this.timestamp == null ? null : new Date(this.timestamp * 1e3);
  }
  /**
   *  Get the transaction at %%indexe%% within this block.
   */
  async getTransaction(t) {
    let e;
    if (typeof t == "number")
      e = g(this, Gr)[t];
    else {
      const n = t.toLowerCase();
      for (const i of g(this, Gr))
        if (typeof i == "string") {
          if (i !== n)
            continue;
          e = i;
          break;
        } else {
          if (i.hash === n)
            continue;
          e = i;
          break;
        }
    }
    if (e == null)
      throw new Error("no such tx");
    return typeof e == "string" ? await this.provider.getTransaction(e) : e;
  }
  /**
   *  If a **Block** was fetched with a request to include the transactions
   *  this will allow synchronous access to those transactions.
   *
   *  If the transactions were not prefetched, this will throw.
   */
  getPrefetchedTransaction(t) {
    const e = this.prefetchedTransactions;
    if (typeof t == "number")
      return e[t];
    t = t.toLowerCase();
    for (const n of e)
      if (n.hash === t)
        return n;
    N(!1, "no matching transaction", "indexOrHash", t);
  }
  /**
   *  Returns true if this block been mined. This provides a type guard
   *  for all properties on a [[MinedBlock]].
   */
  isMined() {
    return !!this.hash;
  }
  /**
   *  Returns true if this block is an [[link-eip-2930]] block.
   */
  isLondon() {
    return !!this.baseFeePerGas;
  }
  /**
   *  @_ignore:
   */
  orphanedEvent() {
    if (!this.isMined())
      throw new Error("");
    return sm(this);
  }
}
Gr = new WeakMap();
class Bo {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    z(this, "provider");
    /**
     *  The transaction hash of the transaction this log occurred in. Use the
     *  [[Log-getTransaction]] to get the [[TransactionResponse]].
     */
    z(this, "transactionHash");
    /**
     *  The block hash of the block this log occurred in. Use the
     *  [[Log-getBlock]] to get the [[Block]].
     */
    z(this, "blockHash");
    /**
     *  The block number of the block this log occurred in. It is preferred
     *  to use the [[Block-hash]] when fetching the related [[Block]],
     *  since in the case of an orphaned block, the block at that height may
     *  have changed.
     */
    z(this, "blockNumber");
    /**
     *  If the **Log** represents a block that was removed due to an orphaned
     *  block, this will be true.
     *
     *  This can only happen within an orphan event listener.
     */
    z(this, "removed");
    /**
     *  The address of the contract that emitted this log.
     */
    z(this, "address");
    /**
     *  The data included in this log when it was emitted.
     */
    z(this, "data");
    /**
     *  The indexed topics included in this log when it was emitted.
     *
     *  All topics are included in the bloom filters, so they can be
     *  efficiently filtered using the [[Provider-getLogs]] method.
     */
    z(this, "topics");
    /**
     *  The index within the block this log occurred at. This is generally
     *  not useful to developers, but can be used with the various roots
     *  to proof inclusion within a block.
     */
    z(this, "index");
    /**
     *  The index within the transaction of this log.
     */
    z(this, "transactionIndex");
    this.provider = e;
    const n = Object.freeze(t.topics.slice());
    mt(this, {
      transactionHash: t.transactionHash,
      blockHash: t.blockHash,
      blockNumber: t.blockNumber,
      removed: t.removed,
      address: t.address,
      data: t.data,
      topics: n,
      index: t.index,
      transactionIndex: t.transactionIndex
    });
  }
  /**
   *  Returns a JSON-compatible object.
   */
  toJSON() {
    const { address: t, blockHash: e, blockNumber: n, data: i, index: s, removed: a, topics: u, transactionHash: l, transactionIndex: p } = this;
    return {
      _type: "log",
      address: t,
      blockHash: e,
      blockNumber: n,
      data: i,
      index: s,
      removed: a,
      topics: u,
      transactionHash: l,
      transactionIndex: p
    };
  }
  /**
   *  Returns the block that this log occurred in.
   */
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    return q(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction that this log occurred in.
   */
  async getTransaction() {
    const t = await this.provider.getTransaction(this.transactionHash);
    return q(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction receipt fot the transaction that this
   *  log occurred in.
   */
  async getTransactionReceipt() {
    const t = await this.provider.getTransactionReceipt(this.transactionHash);
    return q(!!t, "failed to find transaction receipt", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return am(this);
  }
}
var mo;
class Tg {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    z(this, "provider");
    /**
     *  The address the transaction was sent to.
     */
    z(this, "to");
    /**
     *  The sender of the transaction.
     */
    z(this, "from");
    /**
     *  The address of the contract if the transaction was directly
     *  responsible for deploying one.
     *
     *  This is non-null **only** if the ``to`` is empty and the ``data``
     *  was successfully executed as initcode.
     */
    z(this, "contractAddress");
    /**
     *  The transaction hash.
     */
    z(this, "hash");
    /**
     *  The index of this transaction within the block transactions.
     */
    z(this, "index");
    /**
     *  The block hash of the [[Block]] this transaction was included in.
     */
    z(this, "blockHash");
    /**
     *  The block number of the [[Block]] this transaction was included in.
     */
    z(this, "blockNumber");
    /**
     *  The bloom filter bytes that represent all logs that occurred within
     *  this transaction. This is generally not useful for most developers,
     *  but can be used to validate the included logs.
     */
    z(this, "logsBloom");
    /**
     *  The actual amount of gas used by this transaction.
     *
     *  When creating a transaction, the amount of gas that will be used can
     *  only be approximated, but the sender must pay the gas fee for the
     *  entire gas limit. After the transaction, the difference is refunded.
     */
    z(this, "gasUsed");
    /**
     *  The gas used for BLObs. See [[link-eip-4844]].
     */
    z(this, "blobGasUsed");
    /**
     *  The amount of gas used by all transactions within the block for this
     *  and all transactions with a lower ``index``.
     *
     *  This is generally not useful for developers but can be used to
     *  validate certain aspects of execution.
     */
    z(this, "cumulativeGasUsed");
    /**
     *  The actual gas price used during execution.
     *
     *  Due to the complexity of [[link-eip-1559]] this value can only
     *  be caluclated after the transaction has been mined, snce the base
     *  fee is protocol-enforced.
     */
    z(this, "gasPrice");
    /**
     *  The price paid per BLOB in gas. See [[link-eip-4844]].
     */
    z(this, "blobGasPrice");
    /**
     *  The [[link-eip-2718]] transaction type.
     */
    z(this, "type");
    //readonly byzantium!: boolean;
    /**
     *  The status of this transaction, indicating success (i.e. ``1``) or
     *  a revert (i.e. ``0``).
     *
     *  This is available in post-byzantium blocks, but some backends may
     *  backfill this value.
     */
    z(this, "status");
    /**
     *  The root hash of this transaction.
     *
     *  This is no present and was only included in pre-byzantium blocks, but
     *  could be used to validate certain parts of the receipt.
     */
    z(this, "root");
    D(this, mo);
    E(this, mo, Object.freeze(t.logs.map((i) => new Bo(i, e))));
    let n = Og;
    t.effectiveGasPrice != null ? n = t.effectiveGasPrice : t.gasPrice != null && (n = t.gasPrice), mt(this, {
      provider: e,
      to: t.to,
      from: t.from,
      contractAddress: t.contractAddress,
      hash: t.hash,
      index: t.index,
      blockHash: t.blockHash,
      blockNumber: t.blockNumber,
      logsBloom: t.logsBloom,
      gasUsed: t.gasUsed,
      cumulativeGasUsed: t.cumulativeGasUsed,
      blobGasUsed: t.blobGasUsed,
      gasPrice: n,
      blobGasPrice: t.blobGasPrice,
      type: t.type,
      //byzantium: tx.byzantium,
      status: t.status,
      root: t.root
    });
  }
  /**
   *  The logs for this transaction.
   */
  get logs() {
    return g(this, mo);
  }
  /**
   *  Returns a JSON-compatible representation.
   */
  toJSON() {
    const {
      to: t,
      from: e,
      contractAddress: n,
      hash: i,
      index: s,
      blockHash: a,
      blockNumber: u,
      logsBloom: l,
      logs: p,
      //byzantium, 
      status: f,
      root: h
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: a,
      blockNumber: u,
      //byzantium, 
      contractAddress: n,
      cumulativeGasUsed: Zt(this.cumulativeGasUsed),
      from: e,
      gasPrice: Zt(this.gasPrice),
      blobGasUsed: Zt(this.blobGasUsed),
      blobGasPrice: Zt(this.blobGasPrice),
      gasUsed: Zt(this.gasUsed),
      hash: i,
      index: s,
      logs: p,
      logsBloom: l,
      root: h,
      status: f,
      to: t
    };
  }
  /**
   *  @_ignore:
   */
  get length() {
    return this.logs.length;
  }
  [Symbol.iterator]() {
    let t = 0;
    return {
      next: () => t < this.length ? { value: this.logs[t++], done: !1 } : { value: void 0, done: !0 }
    };
  }
  /**
   *  The total fee for this transaction, in wei.
   */
  get fee() {
    return this.gasUsed * this.gasPrice;
  }
  /**
   *  Resolves to the block this transaction occurred in.
   */
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    if (t == null)
      throw new Error("TODO");
    return t;
  }
  /**
   *  Resolves to the transaction this transaction occurred in.
   */
  async getTransaction() {
    const t = await this.provider.getTransaction(this.hash);
    if (t == null)
      throw new Error("TODO");
    return t;
  }
  /**
   *  Resolves to the return value of the execution of this transaction.
   *
   *  Support for this feature is limited, as it requires an archive node
   *  with the ``debug_`` or ``trace_`` API enabled.
   */
  async getResult() {
    return await this.provider.getTransactionResult(this.hash);
  }
  /**
   *  Resolves to the number of confirmations this transaction has.
   */
  async confirmations() {
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return Cg(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(t) {
    return q(!t || t.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" }), Ng(this, t);
  }
}
mo = new WeakMap();
var Kn;
const wf = class wf {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    /**
     *  The provider this is connected to, which will influence how its
     *  methods will resolve its async inspection methods.
     */
    z(this, "provider");
    /**
     *  The block number of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    z(this, "blockNumber");
    /**
     *  The blockHash of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    z(this, "blockHash");
    /**
     *  The index within the block that this transaction resides at.
     */
    z(this, "index");
    /**
     *  The transaction hash.
     */
    z(this, "hash");
    /**
     *  The [[link-eip-2718]] transaction envelope type. This is
     *  ``0`` for legacy transactions types.
     */
    z(this, "type");
    /**
     *  The receiver of this transaction.
     *
     *  If ``null``, then the transaction is an initcode transaction.
     *  This means the result of executing the [[data]] will be deployed
     *  as a new contract on chain (assuming it does not revert) and the
     *  address may be computed using [[getCreateAddress]].
     */
    z(this, "to");
    /**
     *  The sender of this transaction. It is implicitly computed
     *  from the transaction pre-image hash (as the digest) and the
     *  [[signature]] using ecrecover.
     */
    z(this, "from");
    /**
     *  The nonce, which is used to prevent replay attacks and offer
     *  a method to ensure transactions from a given sender are explicitly
     *  ordered.
     *
     *  When sending a transaction, this must be equal to the number of
     *  transactions ever sent by [[from]].
     */
    z(this, "nonce");
    /**
     *  The maximum units of gas this transaction can consume. If execution
     *  exceeds this, the entries transaction is reverted and the sender
     *  is charged for the full amount, despite not state changes being made.
     */
    z(this, "gasLimit");
    /**
     *  The gas price can have various values, depending on the network.
     *
     *  In modern networks, for transactions that are included this is
     *  the //effective gas price// (the fee per gas that was actually
     *  charged), while for transactions that have not been included yet
     *  is the [[maxFeePerGas]].
     *
     *  For legacy transactions, or transactions on legacy networks, this
     *  is the fee that will be charged per unit of gas the transaction
     *  consumes.
     */
    z(this, "gasPrice");
    /**
     *  The maximum priority fee (per unit of gas) to allow a
     *  validator to charge the sender. This is inclusive of the
     *  [[maxFeeFeePerGas]].
     */
    z(this, "maxPriorityFeePerGas");
    /**
     *  The maximum fee (per unit of gas) to allow this transaction
     *  to charge the sender.
     */
    z(this, "maxFeePerGas");
    /**
     *  The [[link-eip-4844]] max fee per BLOb gas.
     */
    z(this, "maxFeePerBlobGas");
    /**
     *  The data.
     */
    z(this, "data");
    /**
     *  The value, in wei. Use [[formatEther]] to format this value
     *  as ether.
     */
    z(this, "value");
    /**
     *  The chain ID.
     */
    z(this, "chainId");
    /**
     *  The signature.
     */
    z(this, "signature");
    /**
     *  The [[link-eip-2930]] access list for transaction types that
     *  support it, otherwise ``null``.
     */
    z(this, "accessList");
    /**
     *  The [[link-eip-4844]] BLOb versioned hashes.
     */
    z(this, "blobVersionedHashes");
    D(this, Kn);
    this.provider = e, this.blockNumber = t.blockNumber != null ? t.blockNumber : null, this.blockHash = t.blockHash != null ? t.blockHash : null, this.hash = t.hash, this.index = t.index, this.type = t.type, this.from = t.from, this.to = t.to || null, this.gasLimit = t.gasLimit, this.nonce = t.nonce, this.data = t.data, this.value = t.value, this.gasPrice = t.gasPrice, this.maxPriorityFeePerGas = t.maxPriorityFeePerGas != null ? t.maxPriorityFeePerGas : null, this.maxFeePerGas = t.maxFeePerGas != null ? t.maxFeePerGas : null, this.maxFeePerBlobGas = t.maxFeePerBlobGas != null ? t.maxFeePerBlobGas : null, this.chainId = t.chainId, this.signature = t.signature, this.accessList = t.accessList != null ? t.accessList : null, this.blobVersionedHashes = t.blobVersionedHashes != null ? t.blobVersionedHashes : null, E(this, Kn, -1);
  }
  /**
   *  Returns a JSON-compatible representation of this transaction.
   */
  toJSON() {
    const { blockNumber: t, blockHash: e, index: n, hash: i, type: s, to: a, from: u, nonce: l, data: p, signature: f, accessList: h, blobVersionedHashes: b } = this;
    return {
      _type: "TransactionResponse",
      accessList: h,
      blockNumber: t,
      blockHash: e,
      blobVersionedHashes: b,
      chainId: Zt(this.chainId),
      data: p,
      from: u,
      gasLimit: Zt(this.gasLimit),
      gasPrice: Zt(this.gasPrice),
      hash: i,
      maxFeePerGas: Zt(this.maxFeePerGas),
      maxPriorityFeePerGas: Zt(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: Zt(this.maxFeePerBlobGas),
      nonce: l,
      signature: f,
      to: a,
      index: n,
      type: s,
      value: Zt(this.value)
    };
  }
  /**
   *  Resolves to the Block that this transaction was included in.
   *
   *  This will return null if the transaction has not been included yet.
   */
  async getBlock() {
    let t = this.blockNumber;
    if (t == null) {
      const n = await this.getTransaction();
      n && (t = n.blockNumber);
    }
    if (t == null)
      return null;
    const e = this.provider.getBlock(t);
    if (e == null)
      throw new Error("TODO");
    return e;
  }
  /**
   *  Resolves to this transaction being re-requested from the
   *  provider. This can be used if you have an unmined transaction
   *  and wish to get an up-to-date populated instance.
   */
  async getTransaction() {
    return this.provider.getTransaction(this.hash);
  }
  /**
   *  Resolve to the number of confirmations this transaction has.
   */
  async confirmations() {
    if (this.blockNumber == null) {
      const { tx: e, blockNumber: n } = await ve({
        tx: this.getTransaction(),
        blockNumber: this.provider.getBlockNumber()
      });
      return e == null || e.blockNumber == null ? 0 : n - e.blockNumber + 1;
    }
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(t, e) {
    const n = t ?? 1, i = e ?? 0;
    let s = g(this, Kn), a = -1, u = s === -1;
    const l = async () => {
      if (u)
        return null;
      const { blockNumber: b, nonce: k } = await ve({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (k < this.nonce) {
        s = b;
        return;
      }
      if (u)
        return null;
      const R = await this.getTransaction();
      if (!(R && R.blockNumber != null))
        for (a === -1 && (a = s - 3, a < g(this, Kn) && (a = g(this, Kn))); a <= b; ) {
          if (u)
            return null;
          const x = await this.provider.getBlock(a, !0);
          if (x == null)
            return;
          for (const S of x)
            if (S === this.hash)
              return;
          for (let S = 0; S < x.length; S++) {
            const m = await x.getTransaction(S);
            if (m.from === this.from && m.nonce === this.nonce) {
              if (u)
                return null;
              const B = await this.provider.getTransactionReceipt(m.hash);
              if (B == null || b - B.blockNumber + 1 < n)
                return;
              let C = "replaced";
              m.data === this.data && m.to === this.to && m.value === this.value ? C = "repriced" : m.data === "0x" && m.from === m.to && m.value === Og && (C = "cancelled"), q(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                cancelled: C === "replaced" || C === "cancelled",
                reason: C,
                replacement: m.replaceableTransaction(s),
                hash: m.hash,
                receipt: B
              });
            }
          }
          a++;
        }
    }, p = (b) => {
      if (b == null || b.status !== 0)
        return b;
      q(!1, "transaction execution reverted", "CALL_EXCEPTION", {
        action: "sendTransaction",
        data: null,
        reason: null,
        invocation: null,
        revert: null,
        transaction: {
          to: b.to,
          from: b.from,
          data: ""
          // @TODO: in v7, split out sendTransaction properties
        },
        receipt: b
      });
    }, f = await this.provider.getTransactionReceipt(this.hash);
    if (n === 0)
      return p(f);
    if (f) {
      if (await f.confirmations() >= n)
        return p(f);
    } else if (await l(), n === 0)
      return null;
    return await new Promise((b, k) => {
      const R = [], x = () => {
        R.forEach((m) => m());
      };
      if (R.push(() => {
        u = !0;
      }), i > 0) {
        const m = setTimeout(() => {
          x(), k(qt("wait for transaction timeout", "TIMEOUT"));
        }, i);
        R.push(() => {
          clearTimeout(m);
        });
      }
      const S = async (m) => {
        if (await m.confirmations() >= n) {
          x();
          try {
            b(p(m));
          } catch (B) {
            k(B);
          }
        }
      };
      if (R.push(() => {
        this.provider.off(this.hash, S);
      }), this.provider.on(this.hash, S), s >= 0) {
        const m = async () => {
          try {
            await l();
          } catch (B) {
            if (ye(B, "TRANSACTION_REPLACED")) {
              x(), k(B);
              return;
            }
          }
          u || this.provider.once("block", m);
        };
        R.push(() => {
          this.provider.off("block", m);
        }), this.provider.once("block", m);
      }
    });
  }
  /**
   *  Returns ``true`` if this transaction has been included.
   *
   *  This is effective only as of the time the TransactionResponse
   *  was instantiated. To get up-to-date information, use
   *  [[getTransaction]].
   *
   *  This provides a Type Guard that this transaction will have
   *  non-null property values for properties that are null for
   *  unmined transactions.
   */
  isMined() {
    return this.blockHash != null;
  }
  /**
   *  Returns true if the transaction is a legacy (i.e. ``type == 0``)
   *  transaction.
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if the transaction is a Berlin (i.e. ``type == 1``)
   *  transaction. See [[link-eip-2070]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if the transaction is a London (i.e. ``type == 2``)
   *  transaction. See [[link-eip-1559]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if hte transaction is a Cancun (i.e. ``type == 3``)
   *  transaction. See [[link-eip-4844]].
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that evict this transaction.
   */
  removedEvent() {
    return q(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Cg(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(t) {
    return q(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), q(!t || t.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Ng(this, t);
  }
  /**
   *  Returns a new TransactionResponse instance which has the ability to
   *  detect (and throw an error) if the transaction is replaced, which
   *  will begin scanning at %%startBlock%%.
   *
   *  This should generally not be used by developers and is intended
   *  primarily for internal use. Setting an incorrect %%startBlock%% can
   *  have devastating performance consequences if used incorrectly.
   */
  replaceableTransaction(t) {
    N(Number.isInteger(t) && t >= 0, "invalid startBlock", "startBlock", t);
    const e = new wf(this, this.provider);
    return E(e, Kn, t), e;
  }
};
Kn = new WeakMap();
let lo = wf;
function sm(r) {
  return { orphan: "drop-block", hash: r.hash, number: r.number };
}
function Ng(r, t) {
  return { orphan: "reorder-transaction", tx: r, other: t };
}
function Cg(r) {
  return { orphan: "drop-transaction", tx: r };
}
function am(r) {
  return { orphan: "drop-log", log: {
    transactionHash: r.transactionHash,
    blockHash: r.blockHash,
    blockNumber: r.blockNumber,
    address: r.address,
    data: r.data,
    topics: Object.freeze(r.topics.slice()),
    index: r.index
  } };
}
class W_ extends Bo {
  /**
   * @_ignore:
   */
  constructor(e, n, i) {
    super(e, e.provider);
    /**
     *  The Contract Interface.
     */
    z(this, "interface");
    /**
     *  The matching event.
     */
    z(this, "fragment");
    /**
     *  The parsed arguments passed to the event by ``emit``.
     */
    z(this, "args");
    const s = n.decodeEventLog(i, e.data, e.topics);
    mt(this, { args: s, fragment: i, interface: n });
  }
  /**
   *  The name of the event.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The signature of the event.
   */
  get eventSignature() {
    return this.fragment.format();
  }
}
class Fg extends Bo {
  /**
   * @_ignore:
   */
  constructor(e, n) {
    super(e, e.provider);
    /**
     *  The error encounted when trying to decode the log.
     */
    z(this, "error");
    mt(this, { error: n });
  }
}
var aa;
class om extends Tg {
  /**
   *  @_ignore:
   */
  constructor(e, n, i) {
    super(i, n);
    D(this, aa);
    E(this, aa, e);
  }
  /**
   *  The parsed logs for any [[Log]] which has a matching event in the
   *  Contract ABI.
   */
  get logs() {
    return super.logs.map((e) => {
      const n = e.topics.length ? g(this, aa).getEvent(e.topics[0]) : null;
      if (n)
        try {
          return new W_(e, g(this, aa), n);
        } catch (i) {
          return new Fg(e, i);
        }
      return e;
    });
  }
}
aa = new WeakMap();
var vo;
class K_ extends lo {
  /**
   *  @_ignore:
   */
  constructor(e, n, i) {
    super(i, n);
    D(this, vo);
    E(this, vo, e);
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(e, n) {
    const i = await super.wait(e, n);
    return i == null ? null : new om(g(this, vo), this.provider, i);
  }
}
vo = new WeakMap();
class zg extends ch {
  /**
   *  @_event:
   */
  constructor(e, n, i, s) {
    super(e, n, i);
    /**
     *  The log with no matching events.
     */
    z(this, "log");
    mt(this, { log: s });
  }
  /**
   *  Resolves to the block the event occured in.
   */
  async getBlock() {
    return await this.log.getBlock();
  }
  /**
   *  Resolves to the transaction the event occured in.
   */
  async getTransaction() {
    return await this.log.getTransaction();
  }
  /**
   *  Resolves to the transaction receipt the event occured in.
   */
  async getTransactionReceipt() {
    return await this.log.getTransactionReceipt();
  }
}
class cm extends zg {
  /**
   *  @_ignore:
   */
  constructor(t, e, n, i, s) {
    super(t, e, n, new W_(s, t.interface, i));
    const a = t.interface.decodeEventLog(i, this.log.data, this.log.topics);
    mt(this, { args: a, fragment: i });
  }
  /**
   *  The event name.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The event signature.
   */
  get eventSignature() {
    return this.fragment.format();
  }
}
const md = BigInt(0);
function Lg(r) {
  return r && typeof r.call == "function";
}
function Ug(r) {
  return r && typeof r.estimateGas == "function";
}
function ru(r) {
  return r && typeof r.resolveName == "function";
}
function Dg(r) {
  return r && typeof r.sendTransaction == "function";
}
function Mg(r) {
  if (r != null) {
    if (ru(r))
      return r;
    if (r.provider)
      return r.provider;
  }
}
var Ao;
class um {
  constructor(t, e, n) {
    D(this, Ao);
    z(this, "fragment");
    if (mt(this, { fragment: e }), e.inputs.length < n.length)
      throw new Error("too many arguments");
    const i = rs(t.runner, "resolveName"), s = ru(i) ? i : null;
    E(this, Ao, async function() {
      const a = await Promise.all(e.inputs.map((u, l) => n[l] == null ? null : u.walkAsync(n[l], (f, h) => f === "address" ? Array.isArray(h) ? Promise.all(h.map((b) => ke(b, s))) : ke(h, s) : h)));
      return t.interface.encodeFilterTopics(e, a);
    }());
  }
  getTopicFilter() {
    return g(this, Ao);
  }
}
Ao = new WeakMap();
function rs(r, t) {
  return r == null ? null : typeof r[t] == "function" ? r : r.provider && typeof r.provider[t] == "function" ? r.provider : null;
}
function vi(r) {
  return r == null ? null : r.provider || null;
}
async function jg(r, t) {
  const e = be.dereference(r, "overrides");
  N(typeof e == "object", "invalid overrides parameter", "overrides", r);
  const n = kc(e);
  return N(n.to == null || (t || []).indexOf("to") >= 0, "cannot override to", "overrides.to", n.to), N(n.data == null || (t || []).indexOf("data") >= 0, "cannot override data", "overrides.data", n.data), n.from && (n.from = n.from), n;
}
async function lm(r, t, e) {
  const n = rs(r, "resolveName"), i = ru(n) ? n : null;
  return await Promise.all(t.map((s, a) => s.walkAsync(e[a], (u, l) => (l = be.dereference(l, u), u === "address" ? ke(l, i) : l))));
}
function _m(r) {
  const t = async function(a) {
    const u = await jg(a, ["data"]);
    u.to = await r.getAddress(), u.from && (u.from = await ke(u.from, Mg(r.runner)));
    const l = r.interface, p = pt(u.value || md, "overrides.value") === md, f = (u.data || "0x") === "0x";
    l.fallback && !l.fallback.payable && l.receive && !f && !p && N(!1, "cannot send data to receive or send value to non-payable fallback", "overrides", a), N(l.fallback || f, "cannot send data to receive-only contract", "overrides.data", u.data);
    const h = l.receive || l.fallback && l.fallback.payable;
    return N(h || p, "cannot send value to non-payable fallback", "overrides.value", u.value), N(l.fallback || f, "cannot send data to receive-only contract", "overrides.data", u.data), u;
  }, e = async function(a) {
    const u = rs(r.runner, "call");
    q(Lg(u), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const l = await t(a);
    try {
      return await u.call(l);
    } catch (p) {
      throw P_(p) && p.data ? r.interface.makeError(p.data, l) : p;
    }
  }, n = async function(a) {
    const u = r.runner;
    q(Dg(u), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const l = await u.sendTransaction(await t(a)), p = vi(r.runner);
    return new K_(r.interface, p, l);
  }, i = async function(a) {
    const u = rs(r.runner, "estimateGas");
    return q(Ug(u), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await u.estimateGas(await t(a));
  }, s = async (a) => await n(a);
  return mt(s, {
    _contract: r,
    estimateGas: i,
    populateTransaction: t,
    send: n,
    staticCall: e
  }), s;
}
function fm(r, t) {
  const e = function(...p) {
    const f = r.interface.getFunction(t, p);
    return q(f, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: p }
    }), f;
  }, n = async function(...p) {
    const f = e(...p);
    let h = {};
    if (f.inputs.length + 1 === p.length && (h = await jg(p.pop()), h.from && (h.from = await ke(h.from, Mg(r.runner)))), f.inputs.length !== p.length)
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    const b = await lm(r.runner, f.inputs, p);
    return Object.assign({}, h, await ve({
      to: r.getAddress(),
      data: r.interface.encodeFunctionData(f, b)
    }));
  }, i = async function(...p) {
    const f = await u(...p);
    return f.length === 1 ? f[0] : f;
  }, s = async function(...p) {
    const f = r.runner;
    q(Dg(f), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const h = await f.sendTransaction(await n(...p)), b = vi(r.runner);
    return new K_(r.interface, b, h);
  }, a = async function(...p) {
    const f = rs(r.runner, "estimateGas");
    return q(Ug(f), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await f.estimateGas(await n(...p));
  }, u = async function(...p) {
    const f = rs(r.runner, "call");
    q(Lg(f), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const h = await n(...p);
    let b = "0x";
    try {
      b = await f.call(h);
    } catch (R) {
      throw P_(R) && R.data ? r.interface.makeError(R.data, h) : R;
    }
    const k = e(...p);
    return r.interface.decodeFunctionResult(k, b);
  }, l = async (...p) => e(...p).constant ? await i(...p) : await s(...p);
  return mt(l, {
    name: r.interface.getFunctionName(t),
    _contract: r,
    _key: t,
    getFragment: e,
    estimateGas: a,
    populateTransaction: n,
    send: s,
    staticCall: i,
    staticCallResult: u
  }), Object.defineProperty(l, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const p = r.interface.getFunction(t);
      return q(p, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), p;
    }
  }), l;
}
function dm(r, t) {
  const e = function(...i) {
    const s = r.interface.getEvent(t, i);
    return q(s, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: i }
    }), s;
  }, n = function(...i) {
    return new um(r, e(...i), i);
  };
  return mt(n, {
    name: r.interface.getEventName(t),
    _contract: r,
    _key: t,
    getFragment: e
  }), Object.defineProperty(n, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const i = r.interface.getEvent(t);
      return q(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), i;
    }
  }), n;
}
const xc = Symbol.for("_ethersInternal_contract"), Gg = /* @__PURE__ */ new WeakMap();
function pm(r, t) {
  Gg.set(r[xc], t);
}
function Fe(r) {
  return Gg.get(r[xc]);
}
function hm(r) {
  return r && typeof r == "object" && "getTopicFilter" in r && typeof r.getTopicFilter == "function" && r.fragment;
}
async function $_(r, t) {
  let e, n = null;
  if (Array.isArray(t)) {
    const s = function(a) {
      if (Wt(a, 32))
        return a;
      const u = r.interface.getEvent(a);
      return N(u, "unknown fragment", "name", a), u.topicHash;
    };
    e = t.map((a) => a == null ? null : Array.isArray(a) ? a.map(s) : s(a));
  } else t === "*" ? e = [null] : typeof t == "string" ? Wt(t, 32) ? e = [t] : (n = r.interface.getEvent(t), N(n, "unknown fragment", "event", t), e = [n.topicHash]) : hm(t) ? e = await t.getTopicFilter() : "fragment" in t ? (n = t.fragment, e = [n.topicHash]) : N(!1, "unknown event name", "event", t);
  e = e.map((s) => {
    if (s == null)
      return null;
    if (Array.isArray(s)) {
      const a = Array.from(new Set(s.map((u) => u.toLowerCase())).values());
      return a.length === 1 ? a[0] : (a.sort(), a);
    }
    return s.toLowerCase();
  });
  const i = e.map((s) => s == null ? "null" : Array.isArray(s) ? s.join("|") : s).join("&");
  return { fragment: n, tag: i, topics: e };
}
async function Va(r, t) {
  const { subs: e } = Fe(r);
  return e.get((await $_(r, t)).tag) || null;
}
async function vd(r, t, e) {
  const n = vi(r.runner);
  q(n, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation: t });
  const { fragment: i, tag: s, topics: a } = await $_(r, e), { addr: u, subs: l } = Fe(r);
  let p = l.get(s);
  if (!p) {
    const h = { address: u || r, topics: a }, b = (S) => {
      let m = i;
      if (m == null)
        try {
          m = r.interface.getEvent(S.topics[0]);
        } catch {
        }
      if (m) {
        const B = m, C = i ? r.interface.decodeEventLog(i, S.data, S.topics) : [];
        n_(r, e, C, (U) => new cm(r, U, e, B, S));
      } else
        n_(r, e, [], (B) => new zg(r, B, e, S));
    };
    let k = [];
    p = { tag: s, listeners: [], start: () => {
      k.length || k.push(n.on(h, b));
    }, stop: async () => {
      if (k.length == 0)
        return;
      let S = k;
      k = [], await Promise.all(S), n.off(h, b);
    } }, l.set(s, p);
  }
  return p;
}
let r_ = Promise.resolve();
async function gm(r, t, e, n) {
  await r_;
  const i = await Va(r, t);
  if (!i)
    return !1;
  const s = i.listeners.length;
  return i.listeners = i.listeners.filter(({ listener: a, once: u }) => {
    const l = Array.from(e);
    n && l.push(n(u ? null : a));
    try {
      a.call(r, ...l);
    } catch {
    }
    return !u;
  }), i.listeners.length === 0 && (i.stop(), Fe(r).subs.delete(i.tag)), s > 0;
}
async function n_(r, t, e, n) {
  try {
    await r_;
  } catch {
  }
  const i = gm(r, t, e, n);
  return r_ = i, await i;
}
const Vo = ["then"];
var rh;
rh = xc;
const to = class to {
  /**
   *  Creates a new contract connected to %%target%% with the %%abi%% and
   *  optionally connected to a %%runner%% to perform operations on behalf
   *  of.
   */
  constructor(t, e, n, i) {
    /**
     *  The target to connect to.
     *
     *  This can be an address, ENS name or any [[Addressable]], such as
     *  another contract. To get the resovled address, use the ``getAddress``
     *  method.
     */
    z(this, "target");
    /**
     *  The contract Interface.
     */
    z(this, "interface");
    /**
     *  The connected runner. This is generally a [[Provider]] or a
     *  [[Signer]], which dictates what operations are supported.
     *
     *  For example, a **Contract** connected to a [[Provider]] may
     *  only execute read-only operations.
     */
    z(this, "runner");
    /**
     *  All the Events available on this contract.
     */
    z(this, "filters");
    /**
     *  @_ignore:
     */
    z(this, rh);
    /**
     *  The fallback or receive function if any.
     */
    z(this, "fallback");
    N(typeof t == "string" || Kh(t), "invalid value for Contract target", "target", t), n == null && (n = null);
    const s = e_.from(e);
    mt(this, { target: t, runner: n, interface: s }), Object.defineProperty(this, xc, { value: {} });
    let a, u = null, l = null;
    if (i) {
      const h = vi(n);
      l = new K_(this.interface, h, i);
    }
    let p = /* @__PURE__ */ new Map();
    if (typeof t == "string")
      if (Wt(t))
        u = t, a = Promise.resolve(t);
      else {
        const h = rs(n, "resolveName");
        if (!ru(h))
          throw qt("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        a = h.resolveName(t).then((b) => {
          if (b == null)
            throw qt("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: t
            });
          return Fe(this).addr = b, b;
        });
      }
    else
      a = t.getAddress().then((h) => {
        if (h == null)
          throw new Error("TODO");
        return Fe(this).addr = h, h;
      });
    pm(this, { addrPromise: a, addr: u, deployTx: l, subs: p });
    const f = new Proxy({}, {
      get: (h, b, k) => {
        if (typeof b == "symbol" || Vo.indexOf(b) >= 0)
          return Reflect.get(h, b, k);
        try {
          return this.getEvent(b);
        } catch (R) {
          if (!ye(R, "INVALID_ARGUMENT") || R.argument !== "key")
            throw R;
        }
      },
      has: (h, b) => Vo.indexOf(b) >= 0 ? Reflect.has(h, b) : Reflect.has(h, b) || this.interface.hasEvent(String(b))
    });
    return mt(this, { filters: f }), mt(this, {
      fallback: s.receive || s.fallback ? _m(this) : null
    }), new Proxy(this, {
      get: (h, b, k) => {
        if (typeof b == "symbol" || b in h || Vo.indexOf(b) >= 0)
          return Reflect.get(h, b, k);
        try {
          return h.getFunction(b);
        } catch (R) {
          if (!ye(R, "INVALID_ARGUMENT") || R.argument !== "key")
            throw R;
        }
      },
      has: (h, b) => typeof b == "symbol" || b in h || Vo.indexOf(b) >= 0 ? Reflect.has(h, b) : h.interface.hasFunction(b)
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(t) {
    return new to(this.target, this.interface, t);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(t) {
    return new to(t, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await Fe(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const t = vi(this.runner);
    q(t, "runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "getDeployedCode" });
    const e = await t.getCode(await this.getAddress());
    return e === "0x" ? null : e;
  }
  /**
   *  Resolve to this Contract once the bytecode has been deployed, or
   *  resolve immediately if already deployed.
   */
  async waitForDeployment() {
    const t = this.deploymentTransaction();
    if (t)
      return await t.wait(), this;
    if (await this.getDeployedCode() != null)
      return this;
    const n = vi(this.runner);
    return q(n != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "waitForDeployment" }), new Promise((i, s) => {
      const a = async () => {
        try {
          if (await this.getDeployedCode() != null)
            return i(this);
          n.once("block", a);
        } catch (u) {
          s(u);
        }
      };
      a();
    });
  }
  /**
   *  Return the transaction used to deploy this contract.
   *
   *  This is only available if this instance was returned from a
   *  [[ContractFactory]].
   */
  deploymentTransaction() {
    return Fe(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(t) {
    return typeof t != "string" && (t = t.format()), fm(this, t);
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(t) {
    return typeof t != "string" && (t = t.format()), dm(this, t);
  }
  /**
   *  @_ignore:
   */
  async queryTransaction(t) {
    throw new Error("@TODO");
  }
  /*
      // @TODO: this is a non-backwards compatible change, but will be added
      //        in v7 and in a potential SmartContract class in an upcoming
      //        v6 release
      async getTransactionReceipt(hash: string): Promise<null | ContractTransactionReceipt> {
          const provider = getProvider(this.runner);
          assert(provider, "contract runner does not have a provider",
              "UNSUPPORTED_OPERATION", { operation: "queryTransaction" });
  
          const receipt = await provider.getTransactionReceipt(hash);
          if (receipt == null) { return null; }
  
          return new ContractTransactionReceipt(this.interface, provider, receipt);
      }
      */
  /**
   *  Provide historic access to event data for %%event%% in the range
   *  %%fromBlock%% (default: ``0``) to %%toBlock%% (default: ``"latest"``)
   *  inclusive.
   */
  async queryFilter(t, e, n) {
    e == null && (e = 0), n == null && (n = "latest");
    const { addr: i, addrPromise: s } = Fe(this), a = i || await s, { fragment: u, topics: l } = await $_(this, t), p = { address: a, topics: l, fromBlock: e, toBlock: n }, f = vi(this.runner);
    return q(f, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" }), (await f.getLogs(p)).map((h) => {
      let b = u;
      if (b == null)
        try {
          b = this.interface.getEvent(h.topics[0]);
        } catch {
        }
      if (b)
        try {
          return new W_(h, this.interface, b);
        } catch (k) {
          return new Fg(h, k);
        }
      return new Bo(h, f);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(t, e) {
    const n = await vd(this, "on", t);
    return n.listeners.push({ listener: e, once: !1 }), n.start(), this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(t, e) {
    const n = await vd(this, "once", t);
    return n.listeners.push({ listener: e, once: !0 }), n.start(), this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(t, ...e) {
    return await n_(this, t, e, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(t) {
    if (t) {
      const i = await Va(this, t);
      return i ? i.listeners.length : 0;
    }
    const { subs: e } = Fe(this);
    let n = 0;
    for (const { listeners: i } of e.values())
      n += i.length;
    return n;
  }
  /**
   *  Resolves to the listeners subscribed to %%event%% or all listeners
   *  if unspecified.
   */
  async listeners(t) {
    if (t) {
      const i = await Va(this, t);
      return i ? i.listeners.map(({ listener: s }) => s) : [];
    }
    const { subs: e } = Fe(this);
    let n = [];
    for (const { listeners: i } of e.values())
      n = n.concat(i.map(({ listener: s }) => s));
    return n;
  }
  /**
   *  Remove the %%listener%% from the listeners for %%event%% or remove
   *  all listeners if unspecified.
   */
  async off(t, e) {
    const n = await Va(this, t);
    if (!n)
      return this;
    if (e) {
      const i = n.listeners.map(({ listener: s }) => s).indexOf(e);
      i >= 0 && n.listeners.splice(i, 1);
    }
    return (e == null || n.listeners.length === 0) && (n.stop(), Fe(this).subs.delete(n.tag)), this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(t) {
    if (t) {
      const e = await Va(this, t);
      if (!e)
        return this;
      e.stop(), Fe(this).subs.delete(e.tag);
    } else {
      const { subs: e } = Fe(this);
      for (const { tag: n, stop: i } of e.values())
        i(), e.delete(n);
    }
    return this;
  }
  /**
   *  Alias for [on].
   */
  async addListener(t, e) {
    return await this.on(t, e);
  }
  /**
   *  Alias for [off].
   */
  async removeListener(t, e) {
    return await this.off(t, e);
  }
  /**
   *  Create a new Class for the %%abi%%.
   */
  static buildClass(t) {
    class e extends to {
      constructor(i, s = null) {
        super(i, t, s);
      }
    }
    return e;
  }
  /**
   *  Create a new BaseContract with a specified Interface.
   */
  static from(t, e, n) {
    return n == null && (n = null), new this(t, e, n);
  }
};
let i_ = to;
function wm() {
  return i_;
}
class Ji extends wm() {
}
function _l(r) {
  return r.match(/^ipfs:\/\/ipfs\//i) ? r = r.substring(12) : r.match(/^ipfs:\/\//i) ? r = r.substring(7) : N(!1, "unsupported IPFS format", "link", r), `https://gateway.ipfs.io/ipfs/${r}`;
}
class ym {
  /**
   *  Creates a new **MulticoinProviderPluing** for %%name%%.
   */
  constructor(t) {
    /**
     *  The name.
     */
    z(this, "name");
    mt(this, { name: t });
  }
  connect(t) {
    return this;
  }
  /**
   *  Returns ``true`` if %%coinType%% is supported by this plugin.
   */
  supportsCoinType(t) {
    return !1;
  }
  /**
   *  Resolves to the encoded %%address%% for %%coinType%%.
   */
  async encodeAddress(t, e) {
    throw new Error("unsupported coin");
  }
  /**
   *  Resolves to the decoded %%data%% for %%coinType%%.
   */
  async decodeAddress(t, e) {
    throw new Error("unsupported coin");
  }
}
const Hg = new RegExp("^(ipfs)://(.*)$", "i"), Ad = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  Hg,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
var $n, Fi, qn, gs, jc, Vg;
const Es = class Es {
  constructor(t, e, n) {
    D(this, qn);
    /**
     *  The connected provider.
     */
    z(this, "provider");
    /**
     *  The address of the resolver.
     */
    z(this, "address");
    /**
     *  The name this resolver was resolved against.
     */
    z(this, "name");
    // For EIP-2544 names, the ancestor that provided the resolver
    D(this, $n);
    D(this, Fi);
    mt(this, { provider: t, address: e, name: n }), E(this, $n, null), E(this, Fi, new Ji(e, [
      "function supportsInterface(bytes4) view returns (bool)",
      "function resolve(bytes, bytes) view returns (bytes)",
      "function addr(bytes32) view returns (address)",
      "function addr(bytes32, uint) view returns (bytes)",
      "function text(bytes32, string) view returns (string)",
      "function contenthash(bytes32) view returns (bytes)"
    ], t));
  }
  /**
   *  Resolves to true if the resolver supports wildcard resolution.
   */
  async supportsWildcard() {
    return g(this, $n) == null && E(this, $n, (async () => {
      try {
        return await g(this, Fi).supportsInterface("0x9061b923");
      } catch (t) {
        if (ye(t, "CALL_EXCEPTION"))
          return !1;
        throw E(this, $n, null), t;
      }
    })()), await g(this, $n);
  }
  /**
   *  Resolves to the address for %%coinType%% or null if the
   *  provided %%coinType%% has not been configured.
   */
  async getAddress(t) {
    if (t == null && (t = 60), t === 60)
      try {
        const s = await ct(this, qn, gs).call(this, "addr(bytes32)");
        return s == null || s === ro ? null : s;
      } catch (s) {
        if (ye(s, "CALL_EXCEPTION"))
          return null;
        throw s;
      }
    if (t >= 0 && t < 2147483648) {
      let s = t + 2147483648;
      const a = await ct(this, qn, gs).call(this, "addr(bytes32,uint)", [s]);
      if (Wt(a, 20))
        return Ut(a);
    }
    let e = null;
    for (const s of this.provider.plugins)
      if (s instanceof ym && s.supportsCoinType(t)) {
        e = s;
        break;
      }
    if (e == null)
      return null;
    const n = await ct(this, qn, gs).call(this, "addr(bytes32,uint)", [t]);
    if (n == null || n === "0x")
      return null;
    const i = await e.decodeAddress(t, n);
    if (i != null)
      return i;
    q(!1, "invalid coin data", "UNSUPPORTED_OPERATION", {
      operation: `getAddress(${t})`,
      info: { coinType: t, data: n }
    });
  }
  /**
   *  Resolves to the EIP-634 text record for %%key%%, or ``null``
   *  if unconfigured.
   */
  async getText(t) {
    const e = await ct(this, qn, gs).call(this, "text(bytes32,string)", [t]);
    return e == null || e === "0x" ? null : e;
  }
  /**
   *  Rsolves to the content-hash or ``null`` if unconfigured.
   */
  async getContentHash() {
    const t = await ct(this, qn, gs).call(this, "contenthash(bytes32)");
    if (t == null || t === "0x")
      return null;
    const e = t.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
    if (e) {
      const i = e[1] === "e3010170" ? "ipfs" : "ipns", s = parseInt(e[4], 16);
      if (e[5].length === s * 2)
        return `${i}://${Py("0x" + e[2])}`;
    }
    const n = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
    if (n && n[1].length === 64)
      return `bzz://${n[1]}`;
    q(!1, "invalid or unsupported content hash data", "UNSUPPORTED_OPERATION", {
      operation: "getContentHash()",
      info: { data: t }
    });
  }
  /**
   *  Resolves to the avatar url or ``null`` if the avatar is either
   *  unconfigured or incorrectly configured (e.g. references an NFT
   *  not owned by the address).
   *
   *  If diagnosing issues with configurations, the [[_getAvatar]]
   *  method may be useful.
   */
  async getAvatar() {
    return (await this._getAvatar()).url;
  }
  /**
   *  When resolving an avatar, there are many steps involved, such
   *  fetching metadata and possibly validating ownership of an
   *  NFT.
   *
   *  This method can be used to examine each step and the value it
   *  was working from.
   */
  async _getAvatar() {
    const t = [{ type: "name", value: this.name }];
    try {
      const e = await this.getText("avatar");
      if (e == null)
        return t.push({ type: "!avatar", value: "" }), { url: null, linkage: t };
      t.push({ type: "avatar", value: e });
      for (let n = 0; n < Ad.length; n++) {
        const i = e.match(Ad[n]);
        if (i == null)
          continue;
        const s = i[1].toLowerCase();
        switch (s) {
          case "https":
          case "data":
            return t.push({ type: "url", value: e }), { linkage: t, url: e };
          case "ipfs": {
            const a = _l(e);
            return t.push({ type: "ipfs", value: e }), t.push({ type: "url", value: a }), { linkage: t, url: a };
          }
          case "erc721":
          case "erc1155": {
            const a = s === "erc721" ? "tokenURI(uint256)" : "uri(uint256)";
            t.push({ type: s, value: e });
            const u = await this.getAddress();
            if (u == null)
              return t.push({ type: "!owner", value: "" }), { url: null, linkage: t };
            const l = (i[2] || "").split("/");
            if (l.length !== 2)
              return t.push({ type: `!${s}caip`, value: i[2] || "" }), { url: null, linkage: t };
            const p = l[1], f = new Ji(l[0], [
              // ERC-721
              "function tokenURI(uint) view returns (string)",
              "function ownerOf(uint) view returns (address)",
              // ERC-1155
              "function uri(uint) view returns (string)",
              "function balanceOf(address, uint256) view returns (uint)"
            ], this.provider);
            if (s === "erc721") {
              const x = await f.ownerOf(p);
              if (u !== x)
                return t.push({ type: "!owner", value: x }), { url: null, linkage: t };
              t.push({ type: "owner", value: x });
            } else if (s === "erc1155") {
              const x = await f.balanceOf(u, p);
              if (!x)
                return t.push({ type: "!balance", value: "0" }), { url: null, linkage: t };
              t.push({ type: "balance", value: x.toString() });
            }
            let h = await f[a](p);
            if (h == null || h === "0x")
              return t.push({ type: "!metadata-url", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata-url-base", value: h }), s === "erc1155" && (h = h.replace("{id}", oi(p, 32).substring(2)), t.push({ type: "metadata-url-expanded", value: h })), h.match(/^ipfs:/i) && (h = _l(h)), t.push({ type: "metadata-url", value: h });
            let b = {};
            const k = await new tn(h).send();
            k.assertOk();
            try {
              b = k.bodyJson;
            } catch {
              try {
                t.push({ type: "!metadata", value: k.bodyText });
              } catch {
                const m = k.body;
                return m && t.push({ type: "!metadata", value: dt(m) }), { url: null, linkage: t };
              }
              return { url: null, linkage: t };
            }
            if (!b)
              return t.push({ type: "!metadata", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata", value: JSON.stringify(b) });
            let R = b.image;
            if (typeof R != "string")
              return t.push({ type: "!imageUrl", value: "" }), { url: null, linkage: t };
            if (!R.match(/^(https:\/\/|data:)/i)) {
              if (R.match(Hg) == null)
                return t.push({ type: "!imageUrl-ipfs", value: R }), { url: null, linkage: t };
              t.push({ type: "imageUrl-ipfs", value: R }), R = _l(R);
            }
            return t.push({ type: "url", value: R }), { linkage: t, url: R };
          }
        }
      }
    } catch {
    }
    return { linkage: t, url: null };
  }
  static async getEnsAddress(t) {
    const e = await t.getNetwork(), n = e.getPlugin("org.ethers.plugins.network.Ens");
    return q(n, "network does not support ENS", "UNSUPPORTED_OPERATION", {
      operation: "getEnsAddress",
      info: { network: e }
    }), n.address;
  }
  /**
   *  Resolve to the ENS resolver for %%name%% using %%provider%% or
   *  ``null`` if unconfigured.
   */
  static async fromName(t, e) {
    var i;
    let n = e;
    for (; ; ) {
      if (n === "" || n === "." || e !== "eth" && n === "eth")
        return null;
      const s = await ct(i = Es, jc, Vg).call(i, t, n);
      if (s != null) {
        const a = new Es(t, s, e);
        return n !== e && !await a.supportsWildcard() ? null : a;
      }
      n = n.split(".").slice(1).join(".");
    }
  }
};
$n = new WeakMap(), Fi = new WeakMap(), qn = new WeakSet(), gs = async function(t, e) {
  e = (e || []).slice();
  const n = g(this, Fi).interface;
  e.unshift(Xl(this.name));
  let i = null;
  await this.supportsWildcard() && (i = n.getFunction(t), q(i, "missing fragment", "UNKNOWN_ERROR", {
    info: { funcName: t }
  }), e = [
    w1(this.name, 255),
    n.encodeFunctionData(i, e)
  ], t = "resolve(bytes,bytes)"), e.push({
    enableCcipRead: !0
  });
  try {
    const s = await g(this, Fi)[t](...e);
    return i ? n.decodeFunctionResult(i, s)[0] : s;
  } catch (s) {
    if (!ye(s, "CALL_EXCEPTION"))
      throw s;
  }
  return null;
}, jc = new WeakSet(), Vg = async function(t, e) {
  const n = await Es.getEnsAddress(t);
  try {
    const s = await new Ji(n, [
      "function resolver(bytes32) view returns (address)"
    ], t).resolver(Xl(e), {
      enableCcipRead: !0
    });
    return s === ro ? null : s;
  } catch (i) {
    throw i;
  }
  return null;
}, D(Es, jc);
let Rc = Es;
const Id = BigInt(0);
function zt(r, t) {
  return function(e) {
    return e == null ? t : r(e);
  };
}
function nu(r, t) {
  return (e) => {
    if (t && e == null)
      return null;
    if (!Array.isArray(e))
      throw new Error("not an array");
    return e.map((n) => r(n));
  };
}
function Po(r, t) {
  return (e) => {
    const n = {};
    for (const i in r) {
      let s = i;
      if (t && i in t && !(s in e)) {
        for (const a of t[i])
          if (a in e) {
            s = a;
            break;
          }
      }
      try {
        const a = r[i](e[s]);
        a !== void 0 && (n[i] = a);
      } catch (a) {
        const u = a instanceof Error ? a.message : "not-an-error";
        q(!1, `invalid value for value.${i} (${u})`, "BAD_DATA", { value: e });
      }
    }
    return n;
  };
}
function bm(r) {
  switch (r) {
    case !0:
    case "true":
      return !0;
    case !1:
    case "false":
      return !1;
  }
  N(!1, `invalid boolean; ${JSON.stringify(r)}`, "value", r);
}
function Sa(r) {
  return N(Wt(r, !0), "invalid data", "value", r), r;
}
function fe(r) {
  return N(Wt(r, 32), "invalid hash", "value", r), r;
}
const mm = Po({
  address: Ut,
  blockHash: fe,
  blockNumber: Rt,
  data: Sa,
  index: Rt,
  removed: zt(bm, !1),
  topics: nu(fe),
  transactionHash: fe,
  transactionIndex: Rt
}, {
  index: ["logIndex"]
});
function vm(r) {
  return mm(r);
}
const Am = Po({
  hash: zt(fe),
  parentHash: fe,
  parentBeaconBlockRoot: zt(fe, null),
  number: Rt,
  timestamp: Rt,
  nonce: zt(Sa),
  difficulty: pt,
  gasLimit: pt,
  gasUsed: pt,
  stateRoot: zt(fe, null),
  receiptsRoot: zt(fe, null),
  blobGasUsed: zt(pt, null),
  excessBlobGas: zt(pt, null),
  miner: zt(Ut),
  prevRandao: zt(fe, null),
  extraData: Sa,
  baseFeePerGas: zt(pt)
}, {
  prevRandao: ["mixHash"]
});
function Im(r) {
  const t = Am(r);
  return t.transactions = r.transactions.map((e) => typeof e == "string" ? e : Qg(e)), t;
}
const Em = Po({
  transactionIndex: Rt,
  blockNumber: Rt,
  transactionHash: fe,
  address: Ut,
  topics: nu(fe),
  data: Sa,
  index: Rt,
  blockHash: fe
}, {
  index: ["logIndex"]
});
function km(r) {
  return Em(r);
}
const xm = Po({
  to: zt(Ut, null),
  from: zt(Ut, null),
  contractAddress: zt(Ut, null),
  // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
  index: Rt,
  root: zt(dt),
  gasUsed: pt,
  blobGasUsed: zt(pt, null),
  logsBloom: zt(Sa),
  blockHash: fe,
  hash: fe,
  logs: nu(km),
  blockNumber: Rt,
  //confirmations: allowNull(getNumber, null),
  cumulativeGasUsed: pt,
  effectiveGasPrice: zt(pt),
  blobGasPrice: zt(pt, null),
  status: zt(Rt),
  type: zt(Rt, 0)
}, {
  effectiveGasPrice: ["gasPrice"],
  hash: ["transactionHash"],
  index: ["transactionIndex"]
});
function Rm(r) {
  return xm(r);
}
function Qg(r) {
  r.to && pt(r.to) === Id && (r.to = "0x0000000000000000000000000000000000000000");
  const t = Po({
    hash: fe,
    // Some nodes do not return this, usually test nodes (like Ganache)
    index: zt(Rt, void 0),
    type: (e) => e === "0x" || e == null ? 0 : Rt(e),
    accessList: zt(is, null),
    blobVersionedHashes: zt(nu(fe, !0), null),
    blockHash: zt(fe, null),
    blockNumber: zt(Rt, null),
    transactionIndex: zt(Rt, null),
    from: Ut,
    // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas) must be set
    gasPrice: zt(pt),
    maxPriorityFeePerGas: zt(pt),
    maxFeePerGas: zt(pt),
    maxFeePerBlobGas: zt(pt, null),
    gasLimit: pt,
    to: zt(Ut, null),
    value: pt,
    nonce: Rt,
    data: Sa,
    creates: zt(Ut, null),
    chainId: zt(pt, null)
  }, {
    data: ["input"],
    gasLimit: ["gas"],
    index: ["transactionIndex"]
  })(r);
  if (t.to == null && t.creates == null && (t.creates = m0(t)), (r.type === 1 || r.type === 2) && r.accessList == null && (t.accessList = []), r.signature ? t.signature = _r.from(r.signature) : t.signature = _r.from(r), t.chainId == null) {
    const e = t.signature.legacyChainId;
    e != null && (t.chainId = e);
  }
  return t.blockHash && pt(t.blockHash) === Id && (t.blockHash = null), t;
}
const Sm = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class Oo {
  /**
   *  Creates a new **NetworkPlugin**.
   */
  constructor(t) {
    /**
     *  The name of the plugin.
     *
     *  It is recommended to use reverse-domain-notation, which permits
     *  unique names with a known authority as well as hierarchal entries.
     */
    z(this, "name");
    mt(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new Oo(this.name);
  }
}
class iu extends Oo {
  /**
   *  Creates a new GasCostPlugin from %%effectiveBlock%% until the
   *  latest block or another GasCostPlugin supercedes that block number,
   *  with the associated %%costs%%.
   */
  constructor(e, n) {
    e == null && (e = 0);
    super(`org.ethers.network.plugins.GasCost#${e || 0}`);
    /**
     *  The block number to treat these values as valid from.
     *
     *  This allows a hardfork to have updated values included as well as
     *  mulutiple hardforks to be supported.
     */
    z(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    z(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    z(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    z(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    z(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    z(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    z(this, "txAccessListAddress");
    const i = { effectiveBlock: e };
    function s(a, u) {
      let l = (n || {})[a];
      l == null && (l = u), N(typeof l == "number", `invalud value for ${a}`, "costs", n), i[a] = l;
    }
    s("txBase", 21e3), s("txCreate", 32e3), s("txDataZero", 4), s("txDataNonzero", 16), s("txAccessListStorageKey", 1900), s("txAccessListAddress", 2400), mt(this, i);
  }
  clone() {
    return new iu(this.effectiveBlock, this);
  }
}
class su extends Oo {
  /**
   *  Creates a new **EnsPlugin** connected to %%address%% on the
   *  %%targetNetwork%%. The default ENS address and mainnet is used
   *  if unspecified.
   */
  constructor(e, n) {
    super("org.ethers.plugins.network.Ens");
    /**
     *  The ENS Registrty Contract address.
     */
    z(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    z(this, "targetNetwork");
    mt(this, {
      address: e || Sm,
      targetNetwork: n ?? 1
    });
  }
  clone() {
    return new su(this.address, this.targetNetwork);
  }
}
var Io, Eo;
class Bm extends Oo {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(e, n) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    D(this, Io);
    D(this, Eo);
    E(this, Io, e), E(this, Eo, n);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return g(this, Io);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return g(this, Eo);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
Io = new WeakMap(), Eo = new WeakMap();
const fl = /* @__PURE__ */ new Map();
var oa, ca, Yn;
const ks = class ks {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, e) {
    D(this, oa);
    D(this, ca);
    D(this, Yn);
    E(this, oa, t), E(this, ca, pt(e)), E(this, Yn, /* @__PURE__ */ new Map());
  }
  /**
   *  Returns a JSON-compatible representation of a Network.
   */
  toJSON() {
    return { name: this.name, chainId: String(this.chainId) };
  }
  /**
   *  The network common name.
   *
   *  This is the canonical name, as networks migh have multiple
   *  names.
   */
  get name() {
    return g(this, oa);
  }
  set name(t) {
    E(this, oa, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return g(this, ca);
  }
  set chainId(t) {
    E(this, ca, pt(t, "chainId"));
  }
  /**
   *  Returns true if %%other%% matches this network. Any chain ID
   *  must match, and if no chain ID is present, the name must match.
   *
   *  This method does not currently check for additional properties,
   *  such as ENS address or plug-in compatibility.
   */
  matches(t) {
    if (t == null)
      return !1;
    if (typeof t == "string") {
      try {
        return this.chainId === pt(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === pt(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === pt(t.chainId);
        } catch {
        }
        return !1;
      }
      return t.name != null ? this.name === t.name : !1;
    }
    return !1;
  }
  /**
   *  Returns the list of plugins currently attached to this Network.
   */
  get plugins() {
    return Array.from(g(this, Yn).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (g(this, Yn).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return g(this, Yn).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return g(this, Yn).get(t) || null;
  }
  /**
   *  Gets a list of all plugins that match %%name%%, with otr without
   *  a fragment.
   */
  getPlugins(t) {
    return this.plugins.filter((e) => e.name.split("#")[0] === t);
  }
  /**
   *  Create a copy of this Network.
   */
  clone() {
    const t = new ks(this.name, this.chainId);
    return this.plugins.forEach((e) => {
      t.attachPlugin(e.clone());
    }), t;
  }
  /**
   *  Compute the intrinsic gas required for a transaction.
   *
   *  A GasCostPlugin can be attached to override the default
   *  values.
   */
  computeIntrinsicGas(t) {
    const e = this.getPlugin("org.ethers.plugins.network.GasCost") || new iu();
    let n = e.txBase;
    if (t.to == null && (n += e.txCreate), t.data)
      for (let i = 2; i < t.data.length; i += 2)
        t.data.substring(i, i + 2) === "00" ? n += e.txDataZero : n += e.txDataNonzero;
    if (t.accessList) {
      const i = is(t.accessList);
      for (const s in i)
        n += e.txAccessListAddress + e.txAccessListStorageKey * i[s].storageKeys.length;
    }
    return n;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (Pm(), t == null)
      return ks.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const e = fl.get(t);
      if (e)
        return e();
      if (typeof t == "bigint")
        return new ks("unknown", t);
      N(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      N(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const e = new ks(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && e.attachPlugin(new su(t.ensAddress, t.ensNetwork)), e;
    }
    N(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, e) {
    typeof t == "number" && (t = BigInt(t));
    const n = fl.get(t);
    n && N(!1, `conflicting network for ${JSON.stringify(n.name)}`, "nameOrChainId", t), fl.set(t, e);
  }
};
oa = new WeakMap(), ca = new WeakMap(), Yn = new WeakMap();
let Br = ks;
function Ed(r, t) {
  const e = String(r);
  if (!e.match(/^[0-9.]+$/))
    throw new Error(`invalid gwei value: ${r}`);
  const n = e.split(".");
  if (n.length === 1 && n.push(""), n.length !== 2)
    throw new Error(`invalid gwei value: ${r}`);
  for (; n[1].length < t; )
    n[1] += "0";
  if (n[1].length > 9) {
    let i = BigInt(n[1].substring(0, 9));
    n[1].substring(9).match(/^0+$/) || i++, n[1] = i.toString();
  }
  return BigInt(n[0] + n[1]);
}
function kd(r) {
  return new Bm(r, async (t, e, n) => {
    n.setHeader("User-Agent", "ethers");
    let i;
    try {
      const [s, a] = await Promise.all([
        n.send(),
        t()
      ]);
      i = s;
      const u = i.bodyJson.standard;
      return {
        gasPrice: a.gasPrice,
        maxFeePerGas: Ed(u.maxFee, 9),
        maxPriorityFeePerGas: Ed(u.maxPriorityFee, 9)
      };
    } catch (s) {
      q(!1, `error encountered with polygon gas station (${JSON.stringify(n.url)})`, "SERVER_ERROR", { request: n, response: i, error: s });
    }
  });
}
let xd = !1;
function Pm() {
  if (xd)
    return;
  xd = !0;
  function r(t, e, n) {
    const i = function() {
      const s = new Br(t, e);
      return n.ensNetwork != null && s.attachPlugin(new su(null, n.ensNetwork)), s.attachPlugin(new iu()), (n.plugins || []).forEach((a) => {
        s.attachPlugin(a);
      }), s;
    };
    Br.register(t, i), Br.register(e, i), n.altNames && n.altNames.forEach((s) => {
      Br.register(s, i);
    });
  }
  r("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), r("ropsten", 3, { ensNetwork: 3 }), r("rinkeby", 4, { ensNetwork: 4 }), r("goerli", 5, { ensNetwork: 5 }), r("kovan", 42, { ensNetwork: 42 }), r("sepolia", 11155111, { ensNetwork: 11155111 }), r("holesky", 17e3, { ensNetwork: 17e3 }), r("classic", 61, {}), r("classicKotti", 6, {}), r("arbitrum", 42161, {
    ensNetwork: 1
  }), r("arbitrum-goerli", 421613, {}), r("arbitrum-sepolia", 421614, {}), r("base", 8453, { ensNetwork: 1 }), r("base-goerli", 84531, {}), r("base-sepolia", 84532, {}), r("bnb", 56, { ensNetwork: 1 }), r("bnbt", 97, {}), r("linea", 59144, { ensNetwork: 1 }), r("linea-goerli", 59140, {}), r("linea-sepolia", 59141, {}), r("matic", 137, {
    ensNetwork: 1,
    plugins: [
      kd("https://gasstation.polygon.technology/v2")
    ]
  }), r("matic-amoy", 80002, {}), r("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      kd("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), r("optimism", 10, {
    ensNetwork: 1,
    plugins: []
  }), r("optimism-goerli", 420, {}), r("optimism-sepolia", 11155420, {}), r("xdai", 100, { ensNetwork: 1 });
}
function s_(r) {
  return JSON.parse(JSON.stringify(r));
}
var Hr, Qe, Zn, Ir, ua, tc;
class Om {
  /**
   *  Create a new **PollingBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    D(this, ua);
    D(this, Hr);
    D(this, Qe);
    D(this, Zn);
    // The most recent block we have scanned for events. The value -2
    // indicates we still need to fetch an initial block number
    D(this, Ir);
    E(this, Hr, t), E(this, Qe, null), E(this, Zn, 4e3), E(this, Ir, -2);
  }
  /**
   *  The polling interval.
   */
  get pollingInterval() {
    return g(this, Zn);
  }
  set pollingInterval(t) {
    E(this, Zn, t);
  }
  start() {
    g(this, Qe) || (E(this, Qe, g(this, Hr)._setTimeout(ct(this, ua, tc).bind(this), g(this, Zn))), ct(this, ua, tc).call(this));
  }
  stop() {
    g(this, Qe) && (g(this, Hr)._clearTimeout(g(this, Qe)), E(this, Qe, null));
  }
  pause(t) {
    this.stop(), t && E(this, Ir, -2);
  }
  resume() {
    this.start();
  }
}
Hr = new WeakMap(), Qe = new WeakMap(), Zn = new WeakMap(), Ir = new WeakMap(), ua = new WeakSet(), tc = async function() {
  try {
    const t = await g(this, Hr).getBlockNumber();
    if (g(this, Ir) === -2) {
      E(this, Ir, t);
      return;
    }
    if (t !== g(this, Ir)) {
      for (let e = g(this, Ir) + 1; e <= t; e++) {
        if (g(this, Qe) == null)
          return;
        await g(this, Hr).emit("block", e);
      }
      E(this, Ir, t);
    }
  } catch {
  }
  g(this, Qe) != null && E(this, Qe, g(this, Hr)._setTimeout(ct(this, ua, tc).bind(this), g(this, Zn)));
};
var zi, Li, Xn;
class q_ {
  /**
   *  Create a new **OnBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    D(this, zi);
    D(this, Li);
    D(this, Xn);
    E(this, zi, t), E(this, Xn, !1), E(this, Li, (e) => {
      this._poll(e, g(this, zi));
    });
  }
  /**
   *  Called on every new block.
   */
  async _poll(t, e) {
    throw new Error("sub-classes must override this");
  }
  start() {
    g(this, Xn) || (E(this, Xn, !0), g(this, Li).call(this, -2), g(this, zi).on("block", g(this, Li)));
  }
  stop() {
    g(this, Xn) && (E(this, Xn, !1), g(this, zi).off("block", g(this, Li)));
  }
  pause(t) {
    this.stop();
  }
  resume() {
    this.start();
  }
}
zi = new WeakMap(), Li = new WeakMap(), Xn = new WeakMap();
var la, Vr;
class Tm extends q_ {
  constructor(e, n) {
    super(e);
    D(this, la);
    D(this, Vr);
    E(this, la, n), E(this, Vr, -2);
  }
  pause(e) {
    e && E(this, Vr, -2), super.pause(e);
  }
  async _poll(e, n) {
    const i = await n.getBlock(g(this, la));
    i != null && (g(this, Vr) === -2 ? E(this, Vr, i.number) : i.number > g(this, Vr) && (n.emit(g(this, la), i.number), E(this, Vr, i.number)));
  }
}
la = new WeakMap(), Vr = new WeakMap();
var Gc;
class Nm extends q_ {
  constructor(e, n) {
    super(e);
    D(this, Gc);
    E(this, Gc, s_(n));
  }
  async _poll(e, n) {
    throw new Error("@TODO");
  }
}
Gc = new WeakMap();
var _a;
class Cm extends q_ {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%hash%%.
   */
  constructor(e, n) {
    super(e);
    D(this, _a);
    E(this, _a, n);
  }
  async _poll(e, n) {
    const i = await n.getTransactionReceipt(g(this, _a));
    i && n.emit(g(this, _a), i);
  }
}
_a = new WeakMap();
var Qr, fa, da, ti, Je, Hc, Jg;
class Y_ {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%filter%%.
   */
  constructor(t, e) {
    D(this, Hc);
    D(this, Qr);
    D(this, fa);
    D(this, da);
    D(this, ti);
    // The most recent block we have scanned for events. The value -2
    // indicates we still need to fetch an initial block number
    D(this, Je);
    E(this, Qr, t), E(this, fa, s_(e)), E(this, da, ct(this, Hc, Jg).bind(this)), E(this, ti, !1), E(this, Je, -2);
  }
  start() {
    g(this, ti) || (E(this, ti, !0), g(this, Je) === -2 && g(this, Qr).getBlockNumber().then((t) => {
      E(this, Je, t);
    }), g(this, Qr).on("block", g(this, da)));
  }
  stop() {
    g(this, ti) && (E(this, ti, !1), g(this, Qr).off("block", g(this, da)));
  }
  pause(t) {
    this.stop(), t && E(this, Je, -2);
  }
  resume() {
    this.start();
  }
}
Qr = new WeakMap(), fa = new WeakMap(), da = new WeakMap(), ti = new WeakMap(), Je = new WeakMap(), Hc = new WeakSet(), Jg = async function(t) {
  if (g(this, Je) === -2)
    return;
  const e = s_(g(this, fa));
  e.fromBlock = g(this, Je) + 1, e.toBlock = t;
  const n = await g(this, Qr).getLogs(e);
  if (n.length === 0) {
    g(this, Je) < t - 60 && E(this, Je, t - 60);
    return;
  }
  for (const i of n)
    g(this, Qr).emit(g(this, fa), i), E(this, Je, i.blockNumber);
};
const Fm = BigInt(2), zm = 10;
function Qo(r) {
  return r && typeof r.then == "function";
}
function ec(r, t) {
  return r + ":" + JSON.stringify(t, (e, n) => {
    if (n == null)
      return "null";
    if (typeof n == "bigint")
      return `bigint:${n.toString()}`;
    if (typeof n == "string")
      return n.toLowerCase();
    if (typeof n == "object" && !Array.isArray(n)) {
      const i = Object.keys(n);
      return i.sort(), i.reduce((s, a) => (s[a] = n[a], s), {});
    }
    return n;
  });
}
class Wg {
  /**
   *  Create a new UnmanagedSubscriber with %%name%%.
   */
  constructor(t) {
    /**
     *  The name fof the event.
     */
    z(this, "name");
    mt(this, { name: t });
  }
  start() {
  }
  stop() {
  }
  pause(t) {
  }
  resume() {
  }
}
function Lm(r) {
  return JSON.parse(JSON.stringify(r));
}
function a_(r) {
  return r = Array.from(new Set(r).values()), r.sort(), r;
}
async function dl(r, t) {
  if (r == null)
    throw new Error("invalid event");
  if (Array.isArray(r) && (r = { topics: r }), typeof r == "string")
    switch (r) {
      case "block":
      case "debug":
      case "error":
      case "finalized":
      case "network":
      case "pending":
      case "safe":
        return { type: r, tag: r };
    }
  if (Wt(r, 32)) {
    const e = r.toLowerCase();
    return { type: "transaction", tag: ec("tx", { hash: e }), hash: e };
  }
  if (r.orphan) {
    const e = r;
    return { type: "orphan", tag: ec("orphan", e), filter: Lm(e) };
  }
  if (r.address || r.topics) {
    const e = r, n = {
      topics: (e.topics || []).map((i) => i == null ? null : Array.isArray(i) ? a_(i.map((s) => s.toLowerCase())) : i.toLowerCase())
    };
    if (e.address) {
      const i = [], s = [], a = (u) => {
        Wt(u) ? i.push(u) : s.push((async () => {
          i.push(await ke(u, t));
        })());
      };
      Array.isArray(e.address) ? e.address.forEach(a) : a(e.address), s.length && await Promise.all(s), n.address = a_(i.map((u) => u.toLowerCase()));
    }
    return { filter: n, tag: ec("event", n), type: "event" };
  }
  N(!1, "unknown ProviderEvent", "event", r);
}
function pl() {
  return (/* @__PURE__ */ new Date()).getTime();
}
const Um = {
  cacheTimeout: 250,
  pollingInterval: 4e3
};
var ge, ei, we, pa, De, Ui, ri, Jr, ko, We, ha, ga, xt, Ce, o_, c_, Qa, u_, Ja, rc;
class Dm {
  /**
   *  Create a new **AbstractProvider** connected to %%network%%, or
   *  use the various network detection capabilities to discover the
   *  [[Network]] if necessary.
   */
  constructor(t, e) {
    D(this, xt);
    D(this, ge);
    D(this, ei);
    // null=unpaused, true=paused+dropWhilePaused, false=paused
    D(this, we);
    D(this, pa);
    D(this, De);
    D(this, Ui);
    D(this, ri);
    // The most recent block number if running an event or -1 if no "block" event
    D(this, Jr);
    D(this, ko);
    D(this, We);
    D(this, ha);
    D(this, ga);
    if (E(this, ga, Object.assign({}, Um, e || {})), t === "any")
      E(this, Ui, !0), E(this, De, null);
    else if (t) {
      const n = Br.from(t);
      E(this, Ui, !1), E(this, De, Promise.resolve(n)), setTimeout(() => {
        this.emit("network", n, null);
      }, 0);
    } else
      E(this, Ui, !1), E(this, De, null);
    E(this, Jr, -1), E(this, ri, /* @__PURE__ */ new Map()), E(this, ge, /* @__PURE__ */ new Map()), E(this, ei, /* @__PURE__ */ new Map()), E(this, we, null), E(this, pa, !1), E(this, ko, 1), E(this, We, /* @__PURE__ */ new Map()), E(this, ha, !1);
  }
  get pollingInterval() {
    return g(this, ga).pollingInterval;
  }
  /**
   *  Returns ``this``, to allow an **AbstractProvider** to implement
   *  the [[ContractRunner]] interface.
   */
  get provider() {
    return this;
  }
  /**
   *  Returns all the registered plug-ins.
   */
  get plugins() {
    return Array.from(g(this, ei).values());
  }
  /**
   *  Attach a new plug-in.
   */
  attachPlugin(t) {
    if (g(this, ei).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return g(this, ei).set(t.name, t.connect(this)), this;
  }
  /**
   *  Get a plugin by name.
   */
  getPlugin(t) {
    return g(this, ei).get(t) || null;
  }
  /**
   *  Prevent any CCIP-read operation, regardless of whether requested
   *  in a [[call]] using ``enableCcipRead``.
   */
  get disableCcipRead() {
    return g(this, ha);
  }
  set disableCcipRead(t) {
    E(this, ha, !!t);
  }
  /**
   *  Resolves to the data for executing the CCIP-read operations.
   */
  async ccipReadFetch(t, e, n) {
    if (this.disableCcipRead || n.length === 0 || t.to == null)
      return null;
    const i = t.to.toLowerCase(), s = e.toLowerCase(), a = [];
    for (let u = 0; u < n.length; u++) {
      const l = n[u], p = l.replace("{sender}", i).replace("{data}", s), f = new tn(p);
      l.indexOf("{data}") === -1 && (f.body = { data: s, sender: i }), this.emit("debug", { action: "sendCcipReadFetchRequest", request: f, index: u, urls: n });
      let h = "unknown error";
      const b = await f.send();
      try {
        const k = b.bodyJson;
        if (k.data)
          return this.emit("debug", { action: "receiveCcipReadFetchResult", request: f, result: k }), k.data;
        k.message && (h = k.message), this.emit("debug", { action: "receiveCcipReadFetchError", request: f, result: k });
      } catch {
      }
      q(b.statusCode < 400 || b.statusCode >= 500, `response not found during CCIP fetch: ${h}`, "OFFCHAIN_FAULT", { reason: "404_MISSING_RESOURCE", transaction: t, info: { url: l, errorMessage: h } }), a.push(h);
    }
    q(!1, `error encountered during CCIP fetch: ${a.map((u) => JSON.stringify(u)).join(", ")}`, "OFFCHAIN_FAULT", {
      reason: "500_SERVER_ERROR",
      transaction: t,
      info: { urls: n, errorMessages: a }
    });
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a block before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Block]].
   */
  _wrapBlock(t, e) {
    return new im(Im(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a log before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Log]].
   */
  _wrapLog(t, e) {
    return new Bo(vm(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  receipt before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionReceipt]].
   */
  _wrapTransactionReceipt(t, e) {
    return new Tg(Rm(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  response before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionResponse]].
   */
  _wrapTransactionResponse(t, e) {
    return new lo(Qg(t), this);
  }
  /**
   *  Resolves to the Network, forcing a network detection using whatever
   *  technique the sub-class requires.
   *
   *  Sub-classes **must** override this.
   */
  _detectNetwork() {
    q(!1, "sub-classes must implement this", "UNSUPPORTED_OPERATION", {
      operation: "_detectNetwork"
    });
  }
  /**
   *  Sub-classes should use this to perform all built-in operations. All
   *  methods sanitizes and normalizes the values passed into this.
   *
   *  Sub-classes **must** override this.
   */
  async _perform(t) {
    q(!1, `unsupported method: ${t.method}`, "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: t
    });
  }
  // State
  async getBlockNumber() {
    const t = Rt(await ct(this, xt, Ce).call(this, { method: "getBlockNumber" }), "%response");
    return g(this, Jr) >= 0 && E(this, Jr, t), t;
  }
  /**
   *  Returns or resolves to the address for %%address%%, resolving ENS
   *  names and [[Addressable]] objects and returning if already an
   *  address.
   */
  _getAddress(t) {
    return ke(t, this);
  }
  /**
   *  Returns or resolves to a valid block tag for %%blockTag%%, resolving
   *  negative values and returning if already a valid block tag.
   */
  _getBlockTag(t) {
    if (t == null)
      return "latest";
    switch (t) {
      case "earliest":
        return "0x0";
      case "finalized":
      case "latest":
      case "pending":
      case "safe":
        return t;
    }
    if (Wt(t))
      return Wt(t, 32) ? t : ms(t);
    if (typeof t == "bigint" && (t = Rt(t, "blockTag")), typeof t == "number")
      return t >= 0 ? ms(t) : g(this, Jr) >= 0 ? ms(g(this, Jr) + t) : this.getBlockNumber().then((e) => ms(e + t));
    N(!1, "invalid blockTag", "blockTag", t);
  }
  /**
   *  Returns or resolves to a filter for %%filter%%, resolving any ENS
   *  names or [[Addressable]] object and returning if already a valid
   *  filter.
   */
  _getFilter(t) {
    const e = (t.topics || []).map((l) => l == null ? null : Array.isArray(l) ? a_(l.map((p) => p.toLowerCase())) : l.toLowerCase()), n = "blockHash" in t ? t.blockHash : void 0, i = (l, p, f) => {
      let h;
      switch (l.length) {
        case 0:
          break;
        case 1:
          h = l[0];
          break;
        default:
          l.sort(), h = l;
      }
      if (n && (p != null || f != null))
        throw new Error("invalid filter");
      const b = {};
      return h && (b.address = h), e.length && (b.topics = e), p && (b.fromBlock = p), f && (b.toBlock = f), n && (b.blockHash = n), b;
    };
    let s = [];
    if (t.address)
      if (Array.isArray(t.address))
        for (const l of t.address)
          s.push(this._getAddress(l));
      else
        s.push(this._getAddress(t.address));
    let a;
    "fromBlock" in t && (a = this._getBlockTag(t.fromBlock));
    let u;
    return "toBlock" in t && (u = this._getBlockTag(t.toBlock)), s.filter((l) => typeof l != "string").length || a != null && typeof a != "string" || u != null && typeof u != "string" ? Promise.all([Promise.all(s), a, u]).then((l) => i(l[0], l[1], l[2])) : i(s, a, u);
  }
  /**
   *  Returns or resolves to a transaction for %%request%%, resolving
   *  any ENS names or [[Addressable]] and returning if already a valid
   *  transaction.
   */
  _getTransactionRequest(t) {
    const e = kc(t), n = [];
    if (["to", "from"].forEach((i) => {
      if (e[i] == null)
        return;
      const s = ke(e[i], this);
      Qo(s) ? n.push(async function() {
        e[i] = await s;
      }()) : e[i] = s;
    }), e.blockTag != null) {
      const i = this._getBlockTag(e.blockTag);
      Qo(i) ? n.push(async function() {
        e.blockTag = await i;
      }()) : e.blockTag = i;
    }
    return n.length ? async function() {
      return await Promise.all(n), e;
    }() : e;
  }
  async getNetwork() {
    if (g(this, De) == null) {
      const i = (async () => {
        try {
          const s = await this._detectNetwork();
          return this.emit("network", s, null), s;
        } catch (s) {
          throw g(this, De) === i && E(this, De, null), s;
        }
      })();
      return E(this, De, i), (await i).clone();
    }
    const t = g(this, De), [e, n] = await Promise.all([
      t,
      this._detectNetwork()
      // The actual connected network
    ]);
    return e.chainId !== n.chainId && (g(this, Ui) ? (this.emit("network", n, e), g(this, De) === t && E(this, De, Promise.resolve(n))) : q(!1, `network changed: ${e.chainId} => ${n.chainId} `, "NETWORK_ERROR", {
      event: "changed"
    })), e.clone();
  }
  async getFeeData() {
    const t = await this.getNetwork(), e = async () => {
      const { _block: i, gasPrice: s, priorityFee: a } = await ve({
        _block: ct(this, xt, u_).call(this, "latest", !1),
        gasPrice: (async () => {
          try {
            const f = await ct(this, xt, Ce).call(this, { method: "getGasPrice" });
            return pt(f, "%response");
          } catch {
          }
          return null;
        })(),
        priorityFee: (async () => {
          try {
            const f = await ct(this, xt, Ce).call(this, { method: "getPriorityFee" });
            return pt(f, "%response");
          } catch {
          }
          return null;
        })()
      });
      let u = null, l = null;
      const p = this._wrapBlock(i, t);
      return p && p.baseFeePerGas && (l = a ?? BigInt("1000000000"), u = p.baseFeePerGas * Fm + l), new bd(s, u, l);
    }, n = t.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    if (n) {
      const i = new tn(n.url), s = await n.processFunc(e, this, i);
      return new bd(s.gasPrice, s.maxFeePerGas, s.maxPriorityFeePerGas);
    }
    return await e();
  }
  async estimateGas(t) {
    let e = this._getTransactionRequest(t);
    return Qo(e) && (e = await e), pt(await ct(this, xt, Ce).call(this, {
      method: "estimateGas",
      transaction: e
    }), "%response");
  }
  async call(t) {
    const { tx: e, blockTag: n } = await ve({
      tx: this._getTransactionRequest(t),
      blockTag: this._getBlockTag(t.blockTag)
    });
    return await ct(this, xt, c_).call(this, ct(this, xt, o_).call(this, e, n, t.enableCcipRead ? 0 : -1));
  }
  async getBalance(t, e) {
    return pt(await ct(this, xt, Qa).call(this, { method: "getBalance" }, t, e), "%response");
  }
  async getTransactionCount(t, e) {
    return Rt(await ct(this, xt, Qa).call(this, { method: "getTransactionCount" }, t, e), "%response");
  }
  async getCode(t, e) {
    return dt(await ct(this, xt, Qa).call(this, { method: "getCode" }, t, e));
  }
  async getStorage(t, e, n) {
    const i = pt(e, "position");
    return dt(await ct(this, xt, Qa).call(this, { method: "getStorage", position: i }, t, n));
  }
  // Write
  async broadcastTransaction(t) {
    const { blockNumber: e, hash: n, network: i } = await ve({
      blockNumber: this.getBlockNumber(),
      hash: this._perform({
        method: "broadcastTransaction",
        signedTransaction: t
      }),
      network: this.getNetwork()
    }), s = Ic.from(t);
    if (s.hash !== n)
      throw new Error("@TODO: the returned hash did not match");
    return this._wrapTransactionResponse(s, i).replaceableTransaction(e);
  }
  // Queries
  async getBlock(t, e) {
    const { network: n, params: i } = await ve({
      network: this.getNetwork(),
      params: ct(this, xt, u_).call(this, t, !!e)
    });
    return i == null ? null : this._wrapBlock(i, n);
  }
  async getTransaction(t) {
    const { network: e, params: n } = await ve({
      network: this.getNetwork(),
      params: ct(this, xt, Ce).call(this, { method: "getTransaction", hash: t })
    });
    return n == null ? null : this._wrapTransactionResponse(n, e);
  }
  async getTransactionReceipt(t) {
    const { network: e, params: n } = await ve({
      network: this.getNetwork(),
      params: ct(this, xt, Ce).call(this, { method: "getTransactionReceipt", hash: t })
    });
    if (n == null)
      return null;
    if (n.gasPrice == null && n.effectiveGasPrice == null) {
      const i = await ct(this, xt, Ce).call(this, { method: "getTransaction", hash: t });
      if (i == null)
        throw new Error("report this; could not find tx or effectiveGasPrice");
      n.effectiveGasPrice = i.gasPrice;
    }
    return this._wrapTransactionReceipt(n, e);
  }
  async getTransactionResult(t) {
    const { result: e } = await ve({
      network: this.getNetwork(),
      result: ct(this, xt, Ce).call(this, { method: "getTransactionResult", hash: t })
    });
    return e == null ? null : dt(e);
  }
  // Bloom-filter Queries
  async getLogs(t) {
    let e = this._getFilter(t);
    Qo(e) && (e = await e);
    const { network: n, params: i } = await ve({
      network: this.getNetwork(),
      params: ct(this, xt, Ce).call(this, { method: "getLogs", filter: e })
    });
    return i.map((s) => this._wrapLog(s, n));
  }
  // ENS
  _getProvider(t) {
    q(!1, "provider cannot connect to target network", "UNSUPPORTED_OPERATION", {
      operation: "_getProvider()"
    });
  }
  async getResolver(t) {
    return await Rc.fromName(this, t);
  }
  async getAvatar(t) {
    const e = await this.getResolver(t);
    return e ? await e.getAvatar() : null;
  }
  async resolveName(t) {
    const e = await this.getResolver(t);
    return e ? await e.getAddress() : null;
  }
  async lookupAddress(t) {
    t = Ut(t);
    const e = Xl(t.substring(2).toLowerCase() + ".addr.reverse");
    try {
      const n = await Rc.getEnsAddress(this), s = await new Ji(n, [
        "function resolver(bytes32) view returns (address)"
      ], this).resolver(e);
      if (s == null || s === ro)
        return null;
      const u = await new Ji(s, [
        "function name(bytes32) view returns (string)"
      ], this).name(e);
      return await this.resolveName(u) !== t ? null : u;
    } catch (n) {
      if (ye(n, "BAD_DATA") && n.value === "0x" || ye(n, "CALL_EXCEPTION"))
        return null;
      throw n;
    }
    return null;
  }
  async waitForTransaction(t, e, n) {
    const i = e ?? 1;
    return i === 0 ? this.getTransactionReceipt(t) : new Promise(async (s, a) => {
      let u = null;
      const l = async (p) => {
        try {
          const f = await this.getTransactionReceipt(t);
          if (f != null && p - f.blockNumber + 1 >= i) {
            s(f), u && (clearTimeout(u), u = null);
            return;
          }
        } catch (f) {
          console.log("EEE", f);
        }
        this.once("block", l);
      };
      n != null && (u = setTimeout(() => {
        u != null && (u = null, this.off("block", l), a(qt("timeout", "TIMEOUT", { reason: "timeout" })));
      }, n)), l(await this.getBlockNumber());
    });
  }
  async waitForBlock(t) {
    q(!1, "not implemented yet", "NOT_IMPLEMENTED", {
      operation: "waitForBlock"
    });
  }
  /**
   *  Clear a timer created using the [[_setTimeout]] method.
   */
  _clearTimeout(t) {
    const e = g(this, We).get(t);
    e && (e.timer && clearTimeout(e.timer), g(this, We).delete(t));
  }
  /**
   *  Create a timer that will execute %%func%% after at least %%timeout%%
   *  (in ms). If %%timeout%% is unspecified, then %%func%% will execute
   *  in the next event loop.
   *
   *  [Pausing](AbstractProvider-paused) the provider will pause any
   *  associated timers.
   */
  _setTimeout(t, e) {
    e == null && (e = 0);
    const n = La(this, ko)._++, i = () => {
      g(this, We).delete(n), t();
    };
    if (this.paused)
      g(this, We).set(n, { timer: null, func: i, time: e });
    else {
      const s = setTimeout(i, e);
      g(this, We).set(n, { timer: s, func: i, time: pl() });
    }
    return n;
  }
  /**
   *  Perform %%func%% on each subscriber.
   */
  _forEachSubscriber(t) {
    for (const e of g(this, ge).values())
      t(e.subscriber);
  }
  /**
   *  Sub-classes may override this to customize subscription
   *  implementations.
   */
  _getSubscriber(t) {
    switch (t.type) {
      case "debug":
      case "error":
      case "network":
        return new Wg(t.type);
      case "block": {
        const e = new Om(this);
        return e.pollingInterval = this.pollingInterval, e;
      }
      case "safe":
      case "finalized":
        return new Tm(this, t.type);
      case "event":
        return new Y_(this, t.filter);
      case "transaction":
        return new Cm(this, t.hash);
      case "orphan":
        return new Nm(this, t.filter);
    }
    throw new Error(`unsupported event: ${t.type}`);
  }
  /**
   *  If a [[Subscriber]] fails and needs to replace itself, this
   *  method may be used.
   *
   *  For example, this is used for providers when using the
   *  ``eth_getFilterChanges`` method, which can return null if state
   *  filters are not supported by the backend, allowing the Subscriber
   *  to swap in a [[PollingEventSubscriber]].
   */
  _recoverSubscriber(t, e) {
    for (const n of g(this, ge).values())
      if (n.subscriber === t) {
        n.started && n.subscriber.stop(), n.subscriber = e, n.started && e.start(), g(this, we) != null && e.pause(g(this, we));
        break;
      }
  }
  async on(t, e) {
    const n = await ct(this, xt, rc).call(this, t);
    return n.listeners.push({ listener: e, once: !1 }), n.started || (n.subscriber.start(), n.started = !0, g(this, we) != null && n.subscriber.pause(g(this, we))), this;
  }
  async once(t, e) {
    const n = await ct(this, xt, rc).call(this, t);
    return n.listeners.push({ listener: e, once: !0 }), n.started || (n.subscriber.start(), n.started = !0, g(this, we) != null && n.subscriber.pause(g(this, we))), this;
  }
  async emit(t, ...e) {
    const n = await ct(this, xt, Ja).call(this, t, e);
    if (!n || n.listeners.length === 0)
      return !1;
    const i = n.listeners.length;
    return n.listeners = n.listeners.filter(({ listener: s, once: a }) => {
      const u = new ch(this, a ? null : s, t);
      try {
        s.call(this, ...e, u);
      } catch {
      }
      return !a;
    }), n.listeners.length === 0 && (n.started && n.subscriber.stop(), g(this, ge).delete(n.tag)), i > 0;
  }
  async listenerCount(t) {
    if (t) {
      const n = await ct(this, xt, Ja).call(this, t);
      return n ? n.listeners.length : 0;
    }
    let e = 0;
    for (const { listeners: n } of g(this, ge).values())
      e += n.length;
    return e;
  }
  async listeners(t) {
    if (t) {
      const n = await ct(this, xt, Ja).call(this, t);
      return n ? n.listeners.map(({ listener: i }) => i) : [];
    }
    let e = [];
    for (const { listeners: n } of g(this, ge).values())
      e = e.concat(n.map(({ listener: i }) => i));
    return e;
  }
  async off(t, e) {
    const n = await ct(this, xt, Ja).call(this, t);
    if (!n)
      return this;
    if (e) {
      const i = n.listeners.map(({ listener: s }) => s).indexOf(e);
      i >= 0 && n.listeners.splice(i, 1);
    }
    return (!e || n.listeners.length === 0) && (n.started && n.subscriber.stop(), g(this, ge).delete(n.tag)), this;
  }
  async removeAllListeners(t) {
    if (t) {
      const { tag: e, started: n, subscriber: i } = await ct(this, xt, rc).call(this, t);
      n && i.stop(), g(this, ge).delete(e);
    } else
      for (const [e, { started: n, subscriber: i }] of g(this, ge))
        n && i.stop(), g(this, ge).delete(e);
    return this;
  }
  // Alias for "on"
  async addListener(t, e) {
    return await this.on(t, e);
  }
  // Alias for "off"
  async removeListener(t, e) {
    return this.off(t, e);
  }
  /**
   *  If this provider has been destroyed using the [[destroy]] method.
   *
   *  Once destroyed, all resources are reclaimed, internal event loops
   *  and timers are cleaned up and no further requests may be sent to
   *  the provider.
   */
  get destroyed() {
    return g(this, pa);
  }
  /**
   *  Sub-classes may use this to shutdown any sockets or release their
   *  resources and reject any pending requests.
   *
   *  Sub-classes **must** call ``super.destroy()``.
   */
  destroy() {
    this.removeAllListeners();
    for (const t of g(this, We).keys())
      this._clearTimeout(t);
    E(this, pa, !0);
  }
  /**
   *  Whether the provider is currently paused.
   *
   *  A paused provider will not emit any events, and generally should
   *  not make any requests to the network, but that is up to sub-classes
   *  to manage.
   *
   *  Setting ``paused = true`` is identical to calling ``.pause(false)``,
   *  which will buffer any events that occur while paused until the
   *  provider is unpaused.
   */
  get paused() {
    return g(this, we) != null;
  }
  set paused(t) {
    !!t !== this.paused && (this.paused ? this.resume() : this.pause(!1));
  }
  /**
   *  Pause the provider. If %%dropWhilePaused%%, any events that occur
   *  while paused are dropped, otherwise all events will be emitted once
   *  the provider is unpaused.
   */
  pause(t) {
    if (E(this, Jr, -1), g(this, we) != null) {
      if (g(this, we) == !!t)
        return;
      q(!1, "cannot change pause type; resume first", "UNSUPPORTED_OPERATION", {
        operation: "pause"
      });
    }
    this._forEachSubscriber((e) => e.pause(t)), E(this, we, !!t);
    for (const e of g(this, We).values())
      e.timer && clearTimeout(e.timer), e.time = pl() - e.time;
  }
  /**
   *  Resume the provider.
   */
  resume() {
    if (g(this, we) != null) {
      this._forEachSubscriber((t) => t.resume()), E(this, we, null);
      for (const t of g(this, We).values()) {
        let e = t.time;
        e < 0 && (e = 0), t.time = pl(), setTimeout(t.func, e);
      }
    }
  }
}
ge = new WeakMap(), ei = new WeakMap(), we = new WeakMap(), pa = new WeakMap(), De = new WeakMap(), Ui = new WeakMap(), ri = new WeakMap(), Jr = new WeakMap(), ko = new WeakMap(), We = new WeakMap(), ha = new WeakMap(), ga = new WeakMap(), xt = new WeakSet(), Ce = async function(t) {
  const e = g(this, ga).cacheTimeout;
  if (e < 0)
    return await this._perform(t);
  const n = ec(t.method, t);
  let i = g(this, ri).get(n);
  return i || (i = this._perform(t), g(this, ri).set(n, i), setTimeout(() => {
    g(this, ri).get(n) === i && g(this, ri).delete(n);
  }, e)), await i;
}, o_ = async function(t, e, n) {
  q(n < zm, "CCIP read exceeded maximum redirections", "OFFCHAIN_FAULT", {
    reason: "TOO_MANY_REDIRECTS",
    transaction: Object.assign({}, t, { blockTag: e, enableCcipRead: !0 })
  });
  const i = kc(t);
  try {
    return dt(await this._perform({ method: "call", transaction: i, blockTag: e }));
  } catch (s) {
    if (!this.disableCcipRead && P_(s) && s.data && n >= 0 && e === "latest" && i.to != null && Yt(s.data, 0, 4) === "0x556f1830") {
      const a = s.data, u = await ke(i.to, this);
      let l;
      try {
        l = Vm(Yt(s.data, 4));
      } catch (h) {
        q(!1, h.message, "OFFCHAIN_FAULT", {
          reason: "BAD_DATA",
          transaction: i,
          info: { data: a }
        });
      }
      q(l.sender.toLowerCase() === u.toLowerCase(), "CCIP Read sender mismatch", "CALL_EXCEPTION", {
        action: "call",
        data: a,
        reason: "OffchainLookup",
        transaction: i,
        invocation: null,
        revert: {
          signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
          name: "OffchainLookup",
          args: l.errorArgs
        }
      });
      const p = await this.ccipReadFetch(i, l.calldata, l.urls);
      q(p != null, "CCIP Read failed to fetch data", "OFFCHAIN_FAULT", {
        reason: "FETCH_FAILED",
        transaction: i,
        info: { data: s.data, errorArgs: l.errorArgs }
      });
      const f = {
        to: u,
        data: ee([l.selector, Hm([p, l.extraData])])
      };
      this.emit("debug", { action: "sendCcipReadCall", transaction: f });
      try {
        const h = await ct(this, xt, o_).call(this, f, e, n + 1);
        return this.emit("debug", { action: "receiveCcipReadCallResult", transaction: Object.assign({}, f), result: h }), h;
      } catch (h) {
        throw this.emit("debug", { action: "receiveCcipReadCallError", transaction: Object.assign({}, f), error: h }), h;
      }
    }
    throw s;
  }
}, c_ = async function(t) {
  const { value: e } = await ve({
    network: this.getNetwork(),
    value: t
  });
  return e;
}, Qa = async function(t, e, n) {
  let i = this._getAddress(e), s = this._getBlockTag(n);
  return (typeof i != "string" || typeof s != "string") && ([i, s] = await Promise.all([i, s])), await ct(this, xt, c_).call(this, ct(this, xt, Ce).call(this, Object.assign(t, { address: i, blockTag: s })));
}, u_ = async function(t, e) {
  if (Wt(t, 32))
    return await ct(this, xt, Ce).call(this, {
      method: "getBlock",
      blockHash: t,
      includeTransactions: e
    });
  let n = this._getBlockTag(t);
  return typeof n != "string" && (n = await n), await ct(this, xt, Ce).call(this, {
    method: "getBlock",
    blockTag: n,
    includeTransactions: e
  });
}, Ja = async function(t, e) {
  let n = await dl(t, this);
  return n.type === "event" && e && e.length > 0 && e[0].removed === !0 && (n = await dl({ orphan: "drop-log", log: e[0] }, this)), g(this, ge).get(n.tag) || null;
}, rc = async function(t) {
  const e = await dl(t, this), n = e.tag;
  let i = g(this, ge).get(n);
  return i || (i = { subscriber: this._getSubscriber(e), tag: n, addressableMap: /* @__PURE__ */ new WeakMap(), nameMap: /* @__PURE__ */ new Map(), started: !1, listeners: [] }, g(this, ge).set(n, i)), i;
};
function Mm(r, t) {
  try {
    const e = l_(r, t);
    if (e)
      return gc(e);
  } catch {
  }
  return null;
}
function l_(r, t) {
  if (r === "0x")
    return null;
  try {
    const e = Rt(Yt(r, t, t + 32)), n = Rt(Yt(r, e, e + 32));
    return Yt(r, e + 32, e + 32 + n);
  } catch {
  }
  return null;
}
function Rd(r) {
  const t = Ie(r);
  if (t.length > 32)
    throw new Error("internal; should not happen");
  const e = new Uint8Array(32);
  return e.set(t, 32 - t.length), e;
}
function jm(r) {
  if (r.length % 32 === 0)
    return r;
  const t = new Uint8Array(Math.ceil(r.length / 32) * 32);
  return t.set(r), t;
}
const Gm = new Uint8Array([]);
function Hm(r) {
  const t = [];
  let e = 0;
  for (let n = 0; n < r.length; n++)
    t.push(Gm), e += 32;
  for (let n = 0; n < r.length; n++) {
    const i = Lt(r[n]);
    t[n] = Rd(e), t.push(Rd(i.length)), t.push(jm(i)), e += 32 + Math.ceil(i.length / 32) * 32;
  }
  return ee(t);
}
const Sd = "0x0000000000000000000000000000000000000000000000000000000000000000";
function Vm(r) {
  const t = {
    sender: "",
    urls: [],
    calldata: "",
    selector: "",
    extraData: "",
    errorArgs: []
  };
  q(xs(r) >= 5 * 32, "insufficient OffchainLookup data", "OFFCHAIN_FAULT", {
    reason: "insufficient OffchainLookup data"
  });
  const e = Yt(r, 0, 32);
  q(Yt(e, 0, 12) === Yt(Sd, 0, 12), "corrupt OffchainLookup sender", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup sender"
  }), t.sender = Yt(e, 12);
  try {
    const n = [], i = Rt(Yt(r, 32, 64)), s = Rt(Yt(r, i, i + 32)), a = Yt(r, i + 32);
    for (let u = 0; u < s; u++) {
      const l = Mm(a, u * 32);
      if (l == null)
        throw new Error("abort");
      n.push(l);
    }
    t.urls = n;
  } catch {
    q(!1, "corrupt OffchainLookup urls", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup urls"
    });
  }
  try {
    const n = l_(r, 64);
    if (n == null)
      throw new Error("abort");
    t.calldata = n;
  } catch {
    q(!1, "corrupt OffchainLookup calldata", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup calldata"
    });
  }
  q(Yt(r, 100, 128) === Yt(Sd, 0, 28), "corrupt OffchainLookup callbaackSelector", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup callbaackSelector"
  }), t.selector = Yt(r, 96, 100);
  try {
    const n = l_(r, 128);
    if (n == null)
      throw new Error("abort");
    t.extraData = n;
  } catch {
    q(!1, "corrupt OffchainLookup extraData", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup extraData"
    });
  }
  return t.errorArgs = "sender,urls,calldata,selector,extraData".split(/,/).map((n) => t[n]), t;
}
function us(r, t) {
  if (r.provider)
    return r.provider;
  q(!1, "missing provider", "UNSUPPORTED_OPERATION", { operation: t });
}
async function Bd(r, t) {
  let e = kc(t);
  if (e.to != null && (e.to = ke(e.to, r)), e.from != null) {
    const n = e.from;
    e.from = Promise.all([
      r.getAddress(),
      ke(n, r)
    ]).then(([i, s]) => (N(i.toLowerCase() === s.toLowerCase(), "transaction from mismatch", "tx.from", s), i));
  } else
    e.from = r.getAddress();
  return await ve(e);
}
class Qm {
  /**
   *  Creates a new Signer connected to %%provider%%.
   */
  constructor(t) {
    /**
     *  The provider this signer is connected to.
     */
    z(this, "provider");
    mt(this, { provider: t || null });
  }
  async getNonce(t) {
    return us(this, "getTransactionCount").getTransactionCount(await this.getAddress(), t);
  }
  async populateCall(t) {
    return await Bd(this, t);
  }
  async populateTransaction(t) {
    const e = us(this, "populateTransaction"), n = await Bd(this, t);
    n.nonce == null && (n.nonce = await this.getNonce("pending")), n.gasLimit == null && (n.gasLimit = await this.estimateGas(n));
    const i = await this.provider.getNetwork();
    if (n.chainId != null) {
      const a = pt(n.chainId);
      N(a === i.chainId, "transaction chainId mismatch", "tx.chainId", t.chainId);
    } else
      n.chainId = i.chainId;
    const s = n.maxFeePerGas != null || n.maxPriorityFeePerGas != null;
    if (n.gasPrice != null && (n.type === 2 || s) ? N(!1, "eip-1559 transaction do not support gasPrice", "tx", t) : (n.type === 0 || n.type === 1) && s && N(!1, "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "tx", t), (n.type === 2 || n.type == null) && n.maxFeePerGas != null && n.maxPriorityFeePerGas != null)
      n.type = 2;
    else if (n.type === 0 || n.type === 1) {
      const a = await e.getFeeData();
      q(a.gasPrice != null, "network does not support gasPrice", "UNSUPPORTED_OPERATION", {
        operation: "getGasPrice"
      }), n.gasPrice == null && (n.gasPrice = a.gasPrice);
    } else {
      const a = await e.getFeeData();
      if (n.type == null)
        if (a.maxFeePerGas != null && a.maxPriorityFeePerGas != null)
          if (n.type = 2, n.gasPrice != null) {
            const u = n.gasPrice;
            delete n.gasPrice, n.maxFeePerGas = u, n.maxPriorityFeePerGas = u;
          } else
            n.maxFeePerGas == null && (n.maxFeePerGas = a.maxFeePerGas), n.maxPriorityFeePerGas == null && (n.maxPriorityFeePerGas = a.maxPriorityFeePerGas);
        else a.gasPrice != null ? (q(!s, "network does not support EIP-1559", "UNSUPPORTED_OPERATION", {
          operation: "populateTransaction"
        }), n.gasPrice == null && (n.gasPrice = a.gasPrice), n.type = 0) : q(!1, "failed to get consistent fee data", "UNSUPPORTED_OPERATION", {
          operation: "signer.getFeeData"
        });
      else (n.type === 2 || n.type === 3) && (n.maxFeePerGas == null && (n.maxFeePerGas = a.maxFeePerGas), n.maxPriorityFeePerGas == null && (n.maxPriorityFeePerGas = a.maxPriorityFeePerGas));
    }
    return await ve(n);
  }
  async estimateGas(t) {
    return us(this, "estimateGas").estimateGas(await this.populateCall(t));
  }
  async call(t) {
    return us(this, "call").call(await this.populateCall(t));
  }
  async resolveName(t) {
    return await us(this, "resolveName").resolveName(t);
  }
  async sendTransaction(t) {
    const e = us(this, "sendTransaction"), n = await this.populateTransaction(t);
    delete n.from;
    const i = Ic.from(n);
    return await e.broadcastTransaction(await this.signTransaction(i));
  }
}
function Jm(r) {
  return JSON.parse(JSON.stringify(r));
}
var me, Er, Di, ni, Mi, wa, ui, __, f_;
class Kg {
  /**
   *  Creates a new **FilterIdSubscriber** which will used [[_subscribe]]
   *  and [[_emitResults]] to setup the subscription and provide the event
   *  to the %%provider%%.
   */
  constructor(t) {
    D(this, ui);
    D(this, me);
    D(this, Er);
    D(this, Di);
    D(this, ni);
    D(this, Mi);
    D(this, wa);
    E(this, me, t), E(this, Er, null), E(this, Di, ct(this, ui, __).bind(this)), E(this, ni, !1), E(this, Mi, null), E(this, wa, !1);
  }
  /**
   *  Sub-classes **must** override this to begin the subscription.
   */
  _subscribe(t) {
    throw new Error("subclasses must override this");
  }
  /**
   *  Sub-classes **must** override this handle the events.
   */
  _emitResults(t, e) {
    throw new Error("subclasses must override this");
  }
  /**
   *  Sub-classes **must** override this handle recovery on errors.
   */
  _recover(t) {
    throw new Error("subclasses must override this");
  }
  start() {
    g(this, ni) || (E(this, ni, !0), ct(this, ui, __).call(this, -2));
  }
  stop() {
    g(this, ni) && (E(this, ni, !1), E(this, wa, !0), ct(this, ui, f_).call(this), g(this, me).off("block", g(this, Di)));
  }
  pause(t) {
    t && ct(this, ui, f_).call(this), g(this, me).off("block", g(this, Di));
  }
  resume() {
    this.start();
  }
}
me = new WeakMap(), Er = new WeakMap(), Di = new WeakMap(), ni = new WeakMap(), Mi = new WeakMap(), wa = new WeakMap(), ui = new WeakSet(), __ = async function(t) {
  try {
    g(this, Er) == null && E(this, Er, this._subscribe(g(this, me)));
    let e = null;
    try {
      e = await g(this, Er);
    } catch (s) {
      if (!ye(s, "UNSUPPORTED_OPERATION") || s.operation !== "eth_newFilter")
        throw s;
    }
    if (e == null) {
      E(this, Er, null), g(this, me)._recoverSubscriber(this, this._recover(g(this, me)));
      return;
    }
    const n = await g(this, me).getNetwork();
    if (g(this, Mi) || E(this, Mi, n), g(this, Mi).chainId !== n.chainId)
      throw new Error("chaid changed");
    if (g(this, wa))
      return;
    const i = await g(this, me).send("eth_getFilterChanges", [e]);
    await this._emitResults(g(this, me), i);
  } catch (e) {
    console.log("@TODO", e);
  }
  g(this, me).once("block", g(this, Di));
}, f_ = function() {
  const t = g(this, Er);
  t && (E(this, Er, null), t.then((e) => {
    g(this, me).destroyed || g(this, me).send("eth_uninstallFilter", [e]);
  }));
};
var ji;
class Wm extends Kg {
  /**
   *  Creates a new **FilterIdEventSubscriber** attached to %%provider%%
   *  listening for %%filter%%.
   */
  constructor(e, n) {
    super(e);
    D(this, ji);
    E(this, ji, Jm(n));
  }
  _recover(e) {
    return new Y_(e, g(this, ji));
  }
  async _subscribe(e) {
    return await e.send("eth_newFilter", [g(this, ji)]);
  }
  async _emitResults(e, n) {
    for (const i of n)
      e.emit(g(this, ji), e._wrapLog(i, e._network));
  }
}
ji = new WeakMap();
class Km extends Kg {
  async _subscribe(t) {
    return await t.send("eth_newPendingTransactionFilter", []);
  }
  async _emitResults(t, e) {
    for (const n of e)
      t.emit("pending", n);
  }
}
const $m = "bigint,boolean,function,number,string,symbol".split(/,/g);
function nc(r) {
  if (r == null || $m.indexOf(typeof r) >= 0 || typeof r.getAddress == "function")
    return r;
  if (Array.isArray(r))
    return r.map(nc);
  if (typeof r == "object")
    return Object.keys(r).reduce((t, e) => (t[e] = r[e], t), {});
  throw new Error(`should not happen: ${r} (${typeof r})`);
}
function qm(r) {
  return new Promise((t) => {
    setTimeout(t, r);
  });
}
function ls(r) {
  return r && r.toLowerCase();
}
function Pd(r) {
  return r && typeof r.pollingInterval == "number";
}
const $g = {
  polling: !1,
  staticNetwork: null,
  batchStallTime: 10,
  batchMaxSize: 1 << 20,
  batchMaxCount: 100,
  cacheTimeout: 250,
  pollingInterval: 4e3
};
class hl extends Qm {
  constructor(e, n) {
    super(e);
    z(this, "address");
    n = Ut(n), mt(this, { address: n });
  }
  connect(e) {
    q(!1, "cannot reconnect JsonRpcSigner", "UNSUPPORTED_OPERATION", {
      operation: "signer.connect"
    });
  }
  async getAddress() {
    return this.address;
  }
  // JSON-RPC will automatially fill in nonce, etc. so we just check from
  async populateTransaction(e) {
    return await this.populateCall(e);
  }
  // Returns just the hash of the transaction after sent, which is what
  // the bare JSON-RPC API does;
  async sendUncheckedTransaction(e) {
    const n = nc(e), i = [];
    if (n.from) {
      const a = n.from;
      i.push((async () => {
        const u = await ke(a, this.provider);
        N(u != null && u.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", e), n.from = u;
      })());
    } else
      n.from = this.address;
    if (n.gasLimit == null && i.push((async () => {
      n.gasLimit = await this.provider.estimateGas({ ...n, from: this.address });
    })()), n.to != null) {
      const a = n.to;
      i.push((async () => {
        n.to = await ke(a, this.provider);
      })());
    }
    i.length && await Promise.all(i);
    const s = this.provider.getRpcTransaction(n);
    return this.provider.send("eth_sendTransaction", [s]);
  }
  async sendTransaction(e) {
    const n = await this.provider.getBlockNumber(), i = await this.sendUncheckedTransaction(e);
    return await new Promise((s, a) => {
      const u = [1e3, 100];
      let l = 0;
      const p = async () => {
        try {
          const f = await this.provider.getTransaction(i);
          if (f != null) {
            s(f.replaceableTransaction(n));
            return;
          }
        } catch (f) {
          if (ye(f, "CANCELLED") || ye(f, "BAD_DATA") || ye(f, "NETWORK_ERROR")) {
            f.info == null && (f.info = {}), f.info.sendTransactionHash = i, a(f);
            return;
          }
          if (ye(f, "INVALID_ARGUMENT") && (l++, f.info == null && (f.info = {}), f.info.sendTransactionHash = i, l > 10)) {
            a(f);
            return;
          }
          this.provider.emit("error", qt("failed to fetch transation after sending (will try again)", "UNKNOWN_ERROR", { error: f }));
        }
        this.provider._setTimeout(() => {
          p();
        }, u.pop() || 4e3);
      };
      p();
    });
  }
  async signTransaction(e) {
    const n = nc(e);
    if (n.from) {
      const s = await ke(n.from, this.provider);
      N(s != null && s.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", e), n.from = s;
    } else
      n.from = this.address;
    const i = this.provider.getRpcTransaction(n);
    return await this.provider.send("eth_signTransaction", [i]);
  }
  async signMessage(e) {
    const n = typeof e == "string" ? Zr(e) : e;
    return await this.provider.send("personal_sign", [
      dt(n),
      this.address.toLowerCase()
    ]);
  }
  async signTypedData(e, n, i) {
    const s = nc(i), a = await Ec.resolveNames(e, n, s, async (u) => {
      const l = await ke(u);
      return N(l != null, "TypedData does not support null address", "value", u), l;
    });
    return await this.provider.send("eth_signTypedData_v4", [
      this.address.toLowerCase(),
      JSON.stringify(Ec.getPayload(a.domain, n, a.value))
    ]);
  }
  async unlock(e) {
    return this.provider.send("personal_unlockAccount", [
      this.address.toLowerCase(),
      e,
      null
    ]);
  }
  // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
  async _legacySignMessage(e) {
    const n = typeof e == "string" ? Zr(e) : e;
    return await this.provider.send("eth_sign", [
      this.address.toLowerCase(),
      dt(n)
    ]);
  }
}
var Gi, ya, Wr, kr, cr, Ke, Se, xo, d_;
class Ym extends Dm {
  constructor(e, n) {
    super(e, n);
    D(this, xo);
    D(this, Gi);
    // The next ID to use for the JSON-RPC ID field
    D(this, ya);
    // Payloads are queued and triggered in batches using the drainTimer
    D(this, Wr);
    D(this, kr);
    D(this, cr);
    D(this, Ke);
    D(this, Se);
    E(this, ya, 1), E(this, Gi, Object.assign({}, $g, n || {})), E(this, Wr, []), E(this, kr, null), E(this, Ke, null), E(this, Se, null);
    {
      let s = null;
      const a = new Promise((u) => {
        s = u;
      });
      E(this, cr, { promise: a, resolve: s });
    }
    const i = this._getOption("staticNetwork");
    typeof i == "boolean" ? (N(!i || e !== "any", "staticNetwork cannot be used on special network 'any'", "options", n), i && e != null && E(this, Ke, Br.from(e))) : i && (N(e == null || i.matches(e), "staticNetwork MUST match network object", "options", n), E(this, Ke, i));
  }
  /**
   *  Returns the value associated with the option %%key%%.
   *
   *  Sub-classes can use this to inquire about configuration options.
   */
  _getOption(e) {
    return g(this, Gi)[e];
  }
  /**
   *  Gets the [[Network]] this provider has committed to. On each call, the network
   *  is detected, and if it has changed, the call will reject.
   */
  get _network() {
    return q(g(this, Ke), "network is not available yet", "NETWORK_ERROR"), g(this, Ke);
  }
  /**
   *  Resolves to the non-normalized value by performing %%req%%.
   *
   *  Sub-classes may override this to modify behavior of actions,
   *  and should generally call ``super._perform`` as a fallback.
   */
  async _perform(e) {
    if (e.method === "call" || e.method === "estimateGas") {
      let i = e.transaction;
      if (i && i.type != null && pt(i.type) && i.maxFeePerGas == null && i.maxPriorityFeePerGas == null) {
        const s = await this.getFeeData();
        s.maxFeePerGas == null && s.maxPriorityFeePerGas == null && (e = Object.assign({}, e, {
          transaction: Object.assign({}, i, { type: void 0 })
        }));
      }
    }
    const n = this.getRpcRequest(e);
    return n != null ? await this.send(n.method, n.args) : super._perform(e);
  }
  /**
   *  Sub-classes may override this; it detects the *actual* network that
   *  we are **currently** connected to.
   *
   *  Keep in mind that [[send]] may only be used once [[ready]], otherwise the
   *  _send primitive must be used instead.
   */
  async _detectNetwork() {
    const e = this._getOption("staticNetwork");
    if (e)
      if (e === !0) {
        if (g(this, Ke))
          return g(this, Ke);
      } else
        return e;
    return g(this, Se) ? await g(this, Se) : this.ready ? (E(this, Se, (async () => {
      try {
        const n = Br.from(pt(await this.send("eth_chainId", [])));
        return E(this, Se, null), n;
      } catch (n) {
        throw E(this, Se, null), n;
      }
    })()), await g(this, Se)) : (E(this, Se, (async () => {
      const n = {
        id: La(this, ya)._++,
        method: "eth_chainId",
        params: [],
        jsonrpc: "2.0"
      };
      this.emit("debug", { action: "sendRpcPayload", payload: n });
      let i;
      try {
        i = (await this._send(n))[0], E(this, Se, null);
      } catch (s) {
        throw E(this, Se, null), this.emit("debug", { action: "receiveRpcError", error: s }), s;
      }
      if (this.emit("debug", { action: "receiveRpcResult", result: i }), "result" in i)
        return Br.from(pt(i.result));
      throw this.getRpcError(n, i);
    })()), await g(this, Se));
  }
  /**
   *  Sub-classes **MUST** call this. Until [[_start]] has been called, no calls
   *  will be passed to [[_send]] from [[send]]. If it is overridden, then
   *  ``super._start()`` **MUST** be called.
   *
   *  Calling it multiple times is safe and has no effect.
   */
  _start() {
    g(this, cr) == null || g(this, cr).resolve == null || (g(this, cr).resolve(), E(this, cr, null), (async () => {
      for (; g(this, Ke) == null && !this.destroyed; )
        try {
          E(this, Ke, await this._detectNetwork());
        } catch (e) {
          if (this.destroyed)
            break;
          console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"), this.emit("error", qt("failed to bootstrap network detection", "NETWORK_ERROR", { event: "initial-network-discovery", info: { error: e } })), await qm(1e3);
        }
      ct(this, xo, d_).call(this);
    })());
  }
  /**
   *  Resolves once the [[_start]] has been called. This can be used in
   *  sub-classes to defer sending data until the connection has been
   *  established.
   */
  async _waitUntilReady() {
    if (g(this, cr) != null)
      return await g(this, cr).promise;
  }
  /**
   *  Return a Subscriber that will manage the %%sub%%.
   *
   *  Sub-classes may override this to modify the behavior of
   *  subscription management.
   */
  _getSubscriber(e) {
    return e.type === "pending" ? new Km(this) : e.type === "event" ? this._getOption("polling") ? new Y_(this, e.filter) : new Wm(this, e.filter) : e.type === "orphan" && e.filter.orphan === "drop-log" ? new Wg("orphan") : super._getSubscriber(e);
  }
  /**
   *  Returns true only if the [[_start]] has been called.
   */
  get ready() {
    return g(this, cr) == null;
  }
  /**
   *  Returns %%tx%% as a normalized JSON-RPC transaction request,
   *  which has all values hexlified and any numeric values converted
   *  to Quantity values.
   */
  getRpcTransaction(e) {
    const n = {};
    return ["chainId", "gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach((i) => {
      if (e[i] == null)
        return;
      let s = i;
      i === "gasLimit" && (s = "gas"), n[s] = ms(pt(e[i], `tx.${i}`));
    }), ["from", "to", "data"].forEach((i) => {
      e[i] != null && (n[i] = dt(e[i]));
    }), e.accessList && (n.accessList = is(e.accessList)), e.blobVersionedHashes && (n.blobVersionedHashes = e.blobVersionedHashes.map((i) => i.toLowerCase())), n;
  }
  /**
   *  Returns the request method and arguments required to perform
   *  %%req%%.
   */
  getRpcRequest(e) {
    switch (e.method) {
      case "chainId":
        return { method: "eth_chainId", args: [] };
      case "getBlockNumber":
        return { method: "eth_blockNumber", args: [] };
      case "getGasPrice":
        return { method: "eth_gasPrice", args: [] };
      case "getPriorityFee":
        return { method: "eth_maxPriorityFeePerGas", args: [] };
      case "getBalance":
        return {
          method: "eth_getBalance",
          args: [ls(e.address), e.blockTag]
        };
      case "getTransactionCount":
        return {
          method: "eth_getTransactionCount",
          args: [ls(e.address), e.blockTag]
        };
      case "getCode":
        return {
          method: "eth_getCode",
          args: [ls(e.address), e.blockTag]
        };
      case "getStorage":
        return {
          method: "eth_getStorageAt",
          args: [
            ls(e.address),
            "0x" + e.position.toString(16),
            e.blockTag
          ]
        };
      case "broadcastTransaction":
        return {
          method: "eth_sendRawTransaction",
          args: [e.signedTransaction]
        };
      case "getBlock":
        if ("blockTag" in e)
          return {
            method: "eth_getBlockByNumber",
            args: [e.blockTag, !!e.includeTransactions]
          };
        if ("blockHash" in e)
          return {
            method: "eth_getBlockByHash",
            args: [e.blockHash, !!e.includeTransactions]
          };
        break;
      case "getTransaction":
        return {
          method: "eth_getTransactionByHash",
          args: [e.hash]
        };
      case "getTransactionReceipt":
        return {
          method: "eth_getTransactionReceipt",
          args: [e.hash]
        };
      case "call":
        return {
          method: "eth_call",
          args: [this.getRpcTransaction(e.transaction), e.blockTag]
        };
      case "estimateGas":
        return {
          method: "eth_estimateGas",
          args: [this.getRpcTransaction(e.transaction)]
        };
      case "getLogs":
        return e.filter && e.filter.address != null && (Array.isArray(e.filter.address) ? e.filter.address = e.filter.address.map(ls) : e.filter.address = ls(e.filter.address)), { method: "eth_getLogs", args: [e.filter] };
    }
    return null;
  }
  /**
   *  Returns an ethers-style Error for the given JSON-RPC error
   *  %%payload%%, coalescing the various strings and error shapes
   *  that different nodes return, coercing them into a machine-readable
   *  standardized error.
   */
  getRpcError(e, n) {
    const { method: i } = e, { error: s } = n;
    if (i === "eth_estimateGas" && s.message) {
      const l = s.message;
      if (!l.match(/revert/i) && l.match(/insufficient funds/i))
        return qt("insufficient funds", "INSUFFICIENT_FUNDS", {
          transaction: e.params[0],
          info: { payload: e, error: s }
        });
    }
    if (i === "eth_call" || i === "eth_estimateGas") {
      const l = p_(s), p = uo.getBuiltinCallException(i === "eth_call" ? "call" : "estimateGas", e.params[0], l ? l.data : null);
      return p.info = { error: s, payload: e }, p;
    }
    const a = JSON.stringify(Xm(s));
    if (typeof s.message == "string" && s.message.match(/user denied|ethers-user-denied/i))
      return qt("user rejected action", "ACTION_REJECTED", {
        action: {
          eth_sign: "signMessage",
          personal_sign: "signMessage",
          eth_signTypedData_v4: "signTypedData",
          eth_signTransaction: "signTransaction",
          eth_sendTransaction: "sendTransaction",
          eth_requestAccounts: "requestAccess",
          wallet_requestAccounts: "requestAccess"
        }[i] || "unknown",
        reason: "rejected",
        info: { payload: e, error: s }
      });
    if (i === "eth_sendRawTransaction" || i === "eth_sendTransaction") {
      const l = e.params[0];
      if (a.match(/insufficient funds|base fee exceeds gas limit/i))
        return qt("insufficient funds for intrinsic transaction cost", "INSUFFICIENT_FUNDS", {
          transaction: l,
          info: { error: s }
        });
      if (a.match(/nonce/i) && a.match(/too low/i))
        return qt("nonce has already been used", "NONCE_EXPIRED", { transaction: l, info: { error: s } });
      if (a.match(/replacement transaction/i) && a.match(/underpriced/i))
        return qt("replacement fee too low", "REPLACEMENT_UNDERPRICED", { transaction: l, info: { error: s } });
      if (a.match(/only replay-protected/i))
        return qt("legacy pre-eip-155 transactions not supported", "UNSUPPORTED_OPERATION", {
          operation: i,
          info: { transaction: l, info: { error: s } }
        });
    }
    let u = !!a.match(/the method .* does not exist/i);
    return u || s && s.details && s.details.startsWith("Unauthorized method:") && (u = !0), u ? qt("unsupported operation", "UNSUPPORTED_OPERATION", {
      operation: e.method,
      info: { error: s, payload: e }
    }) : qt("could not coalesce error", "UNKNOWN_ERROR", { error: s, payload: e });
  }
  /**
   *  Requests the %%method%% with %%params%% via the JSON-RPC protocol
   *  over the underlying channel. This can be used to call methods
   *  on the backend that do not have a high-level API within the Provider
   *  API.
   *
   *  This method queues requests according to the batch constraints
   *  in the options, assigns the request a unique ID.
   *
   *  **Do NOT override** this method in sub-classes; instead
   *  override [[_send]] or force the options values in the
   *  call to the constructor to modify this method's behavior.
   */
  send(e, n) {
    if (this.destroyed)
      return Promise.reject(qt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: e }));
    const i = La(this, ya)._++, s = new Promise((a, u) => {
      g(this, Wr).push({
        resolve: a,
        reject: u,
        payload: { method: e, params: n, id: i, jsonrpc: "2.0" }
      });
    });
    return ct(this, xo, d_).call(this), s;
  }
  /**
   *  Resolves to the [[Signer]] account for  %%address%% managed by
   *  the client.
   *
   *  If the %%address%% is a number, it is used as an index in the
   *  the accounts from [[listAccounts]].
   *
   *  This can only be used on clients which manage accounts (such as
   *  Geth with imported account or MetaMask).
   *
   *  Throws if the account doesn't exist.
   */
  async getSigner(e) {
    e == null && (e = 0);
    const n = this.send("eth_accounts", []);
    if (typeof e == "number") {
      const s = await n;
      if (e >= s.length)
        throw new Error("no such account");
      return new hl(this, s[e]);
    }
    const { accounts: i } = await ve({
      network: this.getNetwork(),
      accounts: n
    });
    e = Ut(e);
    for (const s of i)
      if (Ut(s) === e)
        return new hl(this, e);
    throw new Error("invalid account");
  }
  async listAccounts() {
    return (await this.send("eth_accounts", [])).map((n) => new hl(this, n));
  }
  destroy() {
    g(this, kr) && (clearTimeout(g(this, kr)), E(this, kr, null));
    for (const { payload: e, reject: n } of g(this, Wr))
      n(qt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: e.method }));
    E(this, Wr, []), super.destroy();
  }
}
Gi = new WeakMap(), ya = new WeakMap(), Wr = new WeakMap(), kr = new WeakMap(), cr = new WeakMap(), Ke = new WeakMap(), Se = new WeakMap(), xo = new WeakSet(), d_ = function() {
  if (g(this, kr))
    return;
  const e = this._getOption("batchMaxCount") === 1 ? 0 : this._getOption("batchStallTime");
  E(this, kr, setTimeout(() => {
    E(this, kr, null);
    const n = g(this, Wr);
    for (E(this, Wr, []); n.length; ) {
      const i = [n.shift()];
      for (; n.length && i.length !== g(this, Gi).batchMaxCount; )
        if (i.push(n.shift()), JSON.stringify(i.map((a) => a.payload)).length > g(this, Gi).batchMaxSize) {
          n.unshift(i.pop());
          break;
        }
      (async () => {
        const s = i.length === 1 ? i[0].payload : i.map((a) => a.payload);
        this.emit("debug", { action: "sendRpcPayload", payload: s });
        try {
          const a = await this._send(s);
          this.emit("debug", { action: "receiveRpcResult", result: a });
          for (const { resolve: u, reject: l, payload: p } of i) {
            if (this.destroyed) {
              l(qt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: p.method }));
              continue;
            }
            const f = a.filter((h) => h.id === p.id)[0];
            if (f == null) {
              const h = qt("missing response for request", "BAD_DATA", {
                value: a,
                info: { payload: p }
              });
              this.emit("error", h), l(h);
              continue;
            }
            if ("error" in f) {
              l(this.getRpcError(p, f));
              continue;
            }
            u(f.result);
          }
        } catch (a) {
          this.emit("debug", { action: "receiveRpcError", error: a });
          for (const { reject: u } of i)
            u(a);
        }
      })();
    }
  }, e));
};
var ii;
class qg extends Ym {
  constructor(e, n) {
    super(e, n);
    D(this, ii);
    let i = this._getOption("pollingInterval");
    i == null && (i = $g.pollingInterval), E(this, ii, i);
  }
  _getSubscriber(e) {
    const n = super._getSubscriber(e);
    return Pd(n) && (n.pollingInterval = g(this, ii)), n;
  }
  /**
   *  The polling interval (default: 4000 ms)
   */
  get pollingInterval() {
    return g(this, ii);
  }
  set pollingInterval(e) {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("invalid interval");
    E(this, ii, e), this._forEachSubscriber((n) => {
      Pd(n) && (n.pollingInterval = g(this, ii));
    });
  }
}
ii = new WeakMap();
var ba;
class Zm extends qg {
  constructor(e, n, i) {
    e == null && (e = "http://localhost:8545");
    super(n, i);
    D(this, ba);
    typeof e == "string" ? E(this, ba, new tn(e)) : E(this, ba, e.clone());
  }
  _getConnection() {
    return g(this, ba).clone();
  }
  async send(e, n) {
    return await this._start(), await super.send(e, n);
  }
  async _send(e) {
    const n = this._getConnection();
    n.body = JSON.stringify(e), n.setHeader("content-type", "application/json");
    const i = await n.send();
    i.assertOk();
    let s = i.bodyJson;
    return Array.isArray(s) || (s = [s]), s;
  }
}
ba = new WeakMap();
function p_(r) {
  if (r == null)
    return null;
  if (typeof r.message == "string" && r.message.match(/revert/i) && Wt(r.data))
    return { message: r.message, data: r.data };
  if (typeof r == "object") {
    for (const t in r) {
      const e = p_(r[t]);
      if (e)
        return e;
    }
    return null;
  }
  if (typeof r == "string")
    try {
      return p_(JSON.parse(r));
    } catch {
    }
  return null;
}
function h_(r, t) {
  if (r != null) {
    if (typeof r.message == "string" && t.push(r.message), typeof r == "object")
      for (const e in r)
        h_(r[e], t);
    if (typeof r == "string")
      try {
        return h_(JSON.parse(r), t);
      } catch {
      }
  }
}
function Xm(r) {
  const t = [];
  return h_(r, t), t;
}
var ma;
class t2 extends qg {
  /**
   *  Connnect to the %%ethereum%% provider, optionally forcing the
   *  %%network%%.
   */
  constructor(e, n, i) {
    const s = Object.assign({}, i ?? {}, { batchMaxCount: 1 });
    N(e && e.request, "invalid EIP-1193 provider", "ethereum", e);
    super(n, s);
    D(this, ma);
    E(this, ma, async (a, u) => {
      const l = { method: a, params: u };
      this.emit("debug", { action: "sendEip1193Request", payload: l });
      try {
        const p = await e.request(l);
        return this.emit("debug", { action: "receiveEip1193Result", result: p }), p;
      } catch (p) {
        const f = new Error(p.message);
        throw f.code = p.code, f.data = p.data, f.payload = l, this.emit("debug", { action: "receiveEip1193Error", error: f }), f;
      }
    });
  }
  async send(e, n) {
    return await this._start(), await super.send(e, n);
  }
  async _send(e) {
    N(!Array.isArray(e), "EIP-1193 does not support batch request", "payload", e);
    try {
      const n = await g(this, ma).call(this, e.method, e.params || []);
      return [{ id: e.id, result: n }];
    } catch (n) {
      return [{
        id: e.id,
        error: { code: n.code, data: n.data, message: n.message }
      }];
    }
  }
  getRpcError(e, n) {
    switch (n = JSON.parse(JSON.stringify(n)), n.error.code || -1) {
      case 4001:
        n.error.message = `ethers-user-denied: ${n.error.message}`;
        break;
      case 4200:
        n.error.message = `ethers-unsupported: ${n.error.message}`;
        break;
    }
    return super.getRpcError(e, n);
  }
  /**
   *  Resolves to ``true`` if the provider manages the %%address%%.
   */
  async hasSigner(e) {
    e == null && (e = 0);
    const n = await this.send("eth_accounts", []);
    return typeof e == "number" ? n.length > e : (e = e.toLowerCase(), n.filter((i) => i.toLowerCase() === e).length !== 0);
  }
  async getSigner(e) {
    if (e == null && (e = 0), !await this.hasSigner(e))
      try {
        await g(this, ma).call(this, "eth_requestAccounts", []);
      } catch (n) {
        const i = n.payload;
        throw this.getRpcError(i, { id: i.id, error: n });
      }
    return await super.getSigner(e);
  }
}
ma = new WeakMap();
var ci = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function e2(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function r2(r) {
  if (r.__esModule) return r;
  var t = r.default;
  if (typeof t == "function") {
    var e = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(e, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), e;
}
var To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
function n2(r) {
  {
    const t = Oe.from(r);
    t.reverse();
    const e = t.toString("hex");
    return e.length === 0 ? BigInt(0) : BigInt(`0x${e}`);
  }
}
To.toBigIntLE = n2;
function i2(r) {
  {
    const t = r.toString("hex");
    return t.length === 0 ? BigInt(0) : BigInt(`0x${t}`);
  }
}
var s2 = To.toBigIntBE = i2;
function a2(r, t) {
  {
    const e = r.toString(16), n = Oe.from(e.padStart(t * 2, "0").slice(0, t * 2), "hex");
    return n.reverse(), n;
  }
}
To.toBufferLE = a2;
function o2(r, t) {
  {
    const e = r.toString(16);
    return Oe.from(e.padStart(t * 2, "0").slice(0, t * 2), "hex");
  }
}
To.toBufferBE = o2;
var g_ = { exports: {} };
function c2(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Yg = { exports: {} }, re = Yg.exports = {}, gr, wr;
function w_() {
  throw new Error("setTimeout has not been defined");
}
function y_() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? gr = setTimeout : gr = w_;
  } catch {
    gr = w_;
  }
  try {
    typeof clearTimeout == "function" ? wr = clearTimeout : wr = y_;
  } catch {
    wr = y_;
  }
})();
function Zg(r) {
  if (gr === setTimeout)
    return setTimeout(r, 0);
  if ((gr === w_ || !gr) && setTimeout)
    return gr = setTimeout, setTimeout(r, 0);
  try {
    return gr(r, 0);
  } catch {
    try {
      return gr.call(null, r, 0);
    } catch {
      return gr.call(this, r, 0);
    }
  }
}
function u2(r) {
  if (wr === clearTimeout)
    return clearTimeout(r);
  if ((wr === y_ || !wr) && clearTimeout)
    return wr = clearTimeout, clearTimeout(r);
  try {
    return wr(r);
  } catch {
    try {
      return wr.call(null, r);
    } catch {
      return wr.call(this, r);
    }
  }
}
var Yr = [], Bs = !1, Ai, ic = -1;
function l2() {
  !Bs || !Ai || (Bs = !1, Ai.length ? Yr = Ai.concat(Yr) : ic = -1, Yr.length && Xg());
}
function Xg() {
  if (!Bs) {
    var r = Zg(l2);
    Bs = !0;
    for (var t = Yr.length; t; ) {
      for (Ai = Yr, Yr = []; ++ic < t; )
        Ai && Ai[ic].run();
      ic = -1, t = Yr.length;
    }
    Ai = null, Bs = !1, u2(r);
  }
}
re.nextTick = function(r) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var e = 1; e < arguments.length; e++)
      t[e - 1] = arguments[e];
  Yr.push(new tw(r, t)), Yr.length === 1 && !Bs && Zg(Xg);
};
function tw(r, t) {
  this.fun = r, this.array = t;
}
tw.prototype.run = function() {
  this.fun.apply(null, this.array);
};
re.title = "browser";
re.browser = !0;
re.env = {};
re.argv = [];
re.version = "";
re.versions = {};
function sn() {
}
re.on = sn;
re.addListener = sn;
re.once = sn;
re.off = sn;
re.removeListener = sn;
re.removeAllListeners = sn;
re.emit = sn;
re.prependListener = sn;
re.prependOnceListener = sn;
re.listeners = function(r) {
  return [];
};
re.binding = function(r) {
  throw new Error("process.binding is not supported");
};
re.cwd = function() {
  return "/";
};
re.chdir = function(r) {
  throw new Error("process.chdir is not supported");
};
re.umask = function() {
  return 0;
};
var _2 = Yg.exports;
const Bt = /* @__PURE__ */ c2(_2);
var Z_ = { exports: {} }, Ps = typeof Reflect == "object" ? Reflect : null, Od = Ps && typeof Ps.apply == "function" ? Ps.apply : function(t, e, n) {
  return Function.prototype.apply.call(t, e, n);
}, sc;
Ps && typeof Ps.ownKeys == "function" ? sc = Ps.ownKeys : Object.getOwnPropertySymbols ? sc = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : sc = function(t) {
  return Object.getOwnPropertyNames(t);
};
function f2(r) {
  console && console.warn && console.warn(r);
}
var ew = Number.isNaN || function(t) {
  return t !== t;
};
function Ht() {
  Ht.init.call(this);
}
Z_.exports = Ht;
Z_.exports.once = g2;
Ht.EventEmitter = Ht;
Ht.prototype._events = void 0;
Ht.prototype._eventsCount = 0;
Ht.prototype._maxListeners = void 0;
var Td = 10;
function au(r) {
  if (typeof r != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r);
}
Object.defineProperty(Ht, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Td;
  },
  set: function(r) {
    if (typeof r != "number" || r < 0 || ew(r))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
    Td = r;
  }
});
Ht.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
Ht.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || ew(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function rw(r) {
  return r._maxListeners === void 0 ? Ht.defaultMaxListeners : r._maxListeners;
}
Ht.prototype.getMaxListeners = function() {
  return rw(this);
};
Ht.prototype.emit = function(t) {
  for (var e = [], n = 1; n < arguments.length; n++) e.push(arguments[n]);
  var i = t === "error", s = this._events;
  if (s !== void 0)
    i = i && s.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var a;
    if (e.length > 0 && (a = e[0]), a instanceof Error)
      throw a;
    var u = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw u.context = a, u;
  }
  var l = s[t];
  if (l === void 0)
    return !1;
  if (typeof l == "function")
    Od(l, this, e);
  else
    for (var p = l.length, f = ow(l, p), n = 0; n < p; ++n)
      Od(f[n], this, e);
  return !0;
};
function nw(r, t, e, n) {
  var i, s, a;
  if (au(e), s = r._events, s === void 0 ? (s = r._events = /* @__PURE__ */ Object.create(null), r._eventsCount = 0) : (s.newListener !== void 0 && (r.emit(
    "newListener",
    t,
    e.listener ? e.listener : e
  ), s = r._events), a = s[t]), a === void 0)
    a = s[t] = e, ++r._eventsCount;
  else if (typeof a == "function" ? a = s[t] = n ? [e, a] : [a, e] : n ? a.unshift(e) : a.push(e), i = rw(r), i > 0 && a.length > i && !a.warned) {
    a.warned = !0;
    var u = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    u.name = "MaxListenersExceededWarning", u.emitter = r, u.type = t, u.count = a.length, f2(u);
  }
  return r;
}
Ht.prototype.addListener = function(t, e) {
  return nw(this, t, e, !1);
};
Ht.prototype.on = Ht.prototype.addListener;
Ht.prototype.prependListener = function(t, e) {
  return nw(this, t, e, !0);
};
function d2() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function iw(r, t, e) {
  var n = { fired: !1, wrapFn: void 0, target: r, type: t, listener: e }, i = d2.bind(n);
  return i.listener = e, n.wrapFn = i, i;
}
Ht.prototype.once = function(t, e) {
  return au(e), this.on(t, iw(this, t, e)), this;
};
Ht.prototype.prependOnceListener = function(t, e) {
  return au(e), this.prependListener(t, iw(this, t, e)), this;
};
Ht.prototype.removeListener = function(t, e) {
  var n, i, s, a, u;
  if (au(e), i = this._events, i === void 0)
    return this;
  if (n = i[t], n === void 0)
    return this;
  if (n === e || n.listener === e)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, n.listener || e));
  else if (typeof n != "function") {
    for (s = -1, a = n.length - 1; a >= 0; a--)
      if (n[a] === e || n[a].listener === e) {
        u = n[a].listener, s = a;
        break;
      }
    if (s < 0)
      return this;
    s === 0 ? n.shift() : p2(n, s), n.length === 1 && (i[t] = n[0]), i.removeListener !== void 0 && this.emit("removeListener", t, u || e);
  }
  return this;
};
Ht.prototype.off = Ht.prototype.removeListener;
Ht.prototype.removeAllListeners = function(t) {
  var e, n, i;
  if (n = this._events, n === void 0)
    return this;
  if (n.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : n[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete n[t]), this;
  if (arguments.length === 0) {
    var s = Object.keys(n), a;
    for (i = 0; i < s.length; ++i)
      a = s[i], a !== "removeListener" && this.removeAllListeners(a);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (e = n[t], typeof e == "function")
    this.removeListener(t, e);
  else if (e !== void 0)
    for (i = e.length - 1; i >= 0; i--)
      this.removeListener(t, e[i]);
  return this;
};
function sw(r, t, e) {
  var n = r._events;
  if (n === void 0)
    return [];
  var i = n[t];
  return i === void 0 ? [] : typeof i == "function" ? e ? [i.listener || i] : [i] : e ? h2(i) : ow(i, i.length);
}
Ht.prototype.listeners = function(t) {
  return sw(this, t, !0);
};
Ht.prototype.rawListeners = function(t) {
  return sw(this, t, !1);
};
Ht.listenerCount = function(r, t) {
  return typeof r.listenerCount == "function" ? r.listenerCount(t) : aw.call(r, t);
};
Ht.prototype.listenerCount = aw;
function aw(r) {
  var t = this._events;
  if (t !== void 0) {
    var e = t[r];
    if (typeof e == "function")
      return 1;
    if (e !== void 0)
      return e.length;
  }
  return 0;
}
Ht.prototype.eventNames = function() {
  return this._eventsCount > 0 ? sc(this._events) : [];
};
function ow(r, t) {
  for (var e = new Array(t), n = 0; n < t; ++n)
    e[n] = r[n];
  return e;
}
function p2(r, t) {
  for (; t + 1 < r.length; t++)
    r[t] = r[t + 1];
  r.pop();
}
function h2(r) {
  for (var t = new Array(r.length), e = 0; e < t.length; ++e)
    t[e] = r[e].listener || r[e];
  return t;
}
function g2(r, t) {
  return new Promise(function(e, n) {
    function i(a) {
      r.removeListener(t, s), n(a);
    }
    function s() {
      typeof r.removeListener == "function" && r.removeListener("error", i), e([].slice.call(arguments));
    }
    cw(r, t, s, { once: !0 }), t !== "error" && w2(r, i, { once: !0 });
  });
}
function w2(r, t, e) {
  typeof r.on == "function" && cw(r, "error", t, e);
}
function cw(r, t, e, n) {
  if (typeof r.on == "function")
    n.once ? r.once(t, e) : r.on(t, e);
  else if (typeof r.addEventListener == "function")
    r.addEventListener(t, function i(s) {
      n.once && r.removeEventListener(t, i), e(s);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
}
var uw = Z_.exports, lw = uw.EventEmitter;
const ou = /* @__PURE__ */ r2(Ey);
var X_ = {}, _w = {}, fw = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var t = {}, e = Symbol("test"), n = Object(e);
  if (typeof e == "string" || Object.prototype.toString.call(e) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var i = 42;
  t[e] = i;
  for (var s in t)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
    return !1;
  var a = Object.getOwnPropertySymbols(t);
  if (a.length !== 1 || a[0] !== e || !Object.prototype.propertyIsEnumerable.call(t, e))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var u = (
      /** @type {PropertyDescriptor} */
      Object.getOwnPropertyDescriptor(t, e)
    );
    if (u.value !== i || u.enumerable !== !0)
      return !1;
  }
  return !0;
}, y2 = fw, tf = function() {
  return y2() && !!Symbol.toStringTag;
}, b2 = Object, m2 = Error, v2 = EvalError, A2 = RangeError, I2 = ReferenceError, dw = SyntaxError, cu = TypeError, E2 = URIError, k2 = Math.abs, x2 = Math.floor, R2 = Math.max, S2 = Math.min, B2 = Math.pow, P2 = Object.getOwnPropertyDescriptor, ac = P2;
if (ac)
  try {
    ac([], "length");
  } catch {
    ac = null;
  }
var No = ac, oc = Object.defineProperty || !1;
if (oc)
  try {
    oc({}, "a", { value: 1 });
  } catch {
    oc = !1;
  }
var uu = oc, gl, Nd;
function O2() {
  if (Nd) return gl;
  Nd = 1;
  var r = typeof Symbol < "u" && Symbol, t = fw;
  return gl = function() {
    return typeof r != "function" || typeof Symbol != "function" || typeof r("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : t();
  }, gl;
}
var T2 = "Function.prototype.bind called on incompatible ", N2 = Object.prototype.toString, C2 = Math.max, F2 = "[object Function]", Cd = function(t, e) {
  for (var n = [], i = 0; i < t.length; i += 1)
    n[i] = t[i];
  for (var s = 0; s < e.length; s += 1)
    n[s + t.length] = e[s];
  return n;
}, z2 = function(t, e) {
  for (var n = [], i = e, s = 0; i < t.length; i += 1, s += 1)
    n[s] = t[i];
  return n;
}, L2 = function(r, t) {
  for (var e = "", n = 0; n < r.length; n += 1)
    e += r[n], n + 1 < r.length && (e += t);
  return e;
}, U2 = function(t) {
  var e = this;
  if (typeof e != "function" || N2.apply(e) !== F2)
    throw new TypeError(T2 + e);
  for (var n = z2(arguments, 1), i, s = function() {
    if (this instanceof i) {
      var f = e.apply(
        this,
        Cd(n, arguments)
      );
      return Object(f) === f ? f : this;
    }
    return e.apply(
      t,
      Cd(n, arguments)
    );
  }, a = C2(0, e.length - n.length), u = [], l = 0; l < a; l++)
    u[l] = "$" + l;
  if (i = Function("binder", "return function (" + L2(u, ",") + "){ return binder.apply(this,arguments); }")(s), e.prototype) {
    var p = function() {
    };
    p.prototype = e.prototype, i.prototype = new p(), p.prototype = null;
  }
  return i;
}, D2 = U2, Co = Function.prototype.bind || D2, ef = Function.prototype.call, rf = Function.prototype.apply, M2 = typeof Reflect < "u" && Reflect && Reflect.apply, j2 = Co, G2 = rf, H2 = ef, V2 = M2, pw = V2 || j2.call(H2, G2), Q2 = Co, J2 = cu, W2 = ef, K2 = pw, hw = function(t) {
  if (t.length < 1 || typeof t[0] != "function")
    throw new J2("a function is required");
  return K2(Q2, W2, t);
}, wl, Fd;
function $2() {
  if (Fd) return wl;
  Fd = 1;
  var r = hw, t = No, e = (
    /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype
  ), n = e && t && t(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), i = Object, s = i.getPrototypeOf;
  return wl = n && typeof n.get == "function" ? r([n.get]) : typeof s == "function" ? (
    /** @type {import('./get')} */
    function(u) {
      return s(u == null ? u : i(u));
    }
  ) : !1, wl;
}
var yl, zd;
function q2() {
  if (zd) return yl;
  zd = 1;
  var r = Function.prototype.call, t = Object.prototype.hasOwnProperty, e = Co;
  return yl = e.call(r, t), yl;
}
var Ot, gw = b2, Y2 = m2, Z2 = v2, X2 = A2, tv = I2, Ba = dw, Os = cu, ev = E2, rv = k2, nv = x2, iv = R2, sv = S2, av = B2, ww = Function, bl = function(r) {
  try {
    return ww('"use strict"; return (' + r + ").constructor;")();
  } catch {
  }
}, _o = No, ov = uu, ml = function() {
  throw new Os();
}, cv = _o ? function() {
  try {
    return arguments.callee, ml;
  } catch {
    try {
      return _o(arguments, "callee").get;
    } catch {
      return ml;
    }
  }
}() : ml, _s = O2()(), uv = $2(), oe = typeof Reflect == "function" && Reflect.getPrototypeOf || gw.getPrototypeOf || uv, yw = rf, Fo = ef, ws = {}, lv = typeof Uint8Array > "u" || !oe ? Ot : oe(Uint8Array), Wi = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? Ot : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? Ot : ArrayBuffer,
  "%ArrayIteratorPrototype%": _s && oe ? oe([][Symbol.iterator]()) : Ot,
  "%AsyncFromSyncIteratorPrototype%": Ot,
  "%AsyncFunction%": ws,
  "%AsyncGenerator%": ws,
  "%AsyncGeneratorFunction%": ws,
  "%AsyncIteratorPrototype%": ws,
  "%Atomics%": typeof Atomics > "u" ? Ot : Atomics,
  "%BigInt%": typeof BigInt > "u" ? Ot : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? Ot : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? Ot : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? Ot : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Y2,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Z2,
  "%Float32Array%": typeof Float32Array > "u" ? Ot : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? Ot : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? Ot : FinalizationRegistry,
  "%Function%": ww,
  "%GeneratorFunction%": ws,
  "%Int8Array%": typeof Int8Array > "u" ? Ot : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? Ot : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? Ot : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": _s && oe ? oe(oe([][Symbol.iterator]())) : Ot,
  "%JSON%": typeof JSON == "object" ? JSON : Ot,
  "%Map%": typeof Map > "u" ? Ot : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !_s || !oe ? Ot : oe((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": gw,
  "%Object.getOwnPropertyDescriptor%": _o,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? Ot : Promise,
  "%Proxy%": typeof Proxy > "u" ? Ot : Proxy,
  "%RangeError%": X2,
  "%ReferenceError%": tv,
  "%Reflect%": typeof Reflect > "u" ? Ot : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? Ot : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !_s || !oe ? Ot : oe((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? Ot : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": _s && oe ? oe(""[Symbol.iterator]()) : Ot,
  "%Symbol%": _s ? Symbol : Ot,
  "%SyntaxError%": Ba,
  "%ThrowTypeError%": cv,
  "%TypedArray%": lv,
  "%TypeError%": Os,
  "%Uint8Array%": typeof Uint8Array > "u" ? Ot : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? Ot : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? Ot : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? Ot : Uint32Array,
  "%URIError%": ev,
  "%WeakMap%": typeof WeakMap > "u" ? Ot : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? Ot : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? Ot : WeakSet,
  "%Function.prototype.call%": Fo,
  "%Function.prototype.apply%": yw,
  "%Object.defineProperty%": ov,
  "%Math.abs%": rv,
  "%Math.floor%": nv,
  "%Math.max%": iv,
  "%Math.min%": sv,
  "%Math.pow%": av
};
if (oe)
  try {
    null.error;
  } catch (r) {
    var _v = oe(oe(r));
    Wi["%Error.prototype%"] = _v;
  }
var fv = function r(t) {
  var e;
  if (t === "%AsyncFunction%")
    e = bl("async function () {}");
  else if (t === "%GeneratorFunction%")
    e = bl("function* () {}");
  else if (t === "%AsyncGeneratorFunction%")
    e = bl("async function* () {}");
  else if (t === "%AsyncGenerator%") {
    var n = r("%AsyncGeneratorFunction%");
    n && (e = n.prototype);
  } else if (t === "%AsyncIteratorPrototype%") {
    var i = r("%AsyncGenerator%");
    i && oe && (e = oe(i.prototype));
  }
  return Wi[t] = e, e;
}, Ld = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, zo = Co, Sc = q2(), dv = zo.call(Fo, Array.prototype.concat), pv = zo.call(yw, Array.prototype.splice), Ud = zo.call(Fo, String.prototype.replace), Bc = zo.call(Fo, String.prototype.slice), hv = zo.call(Fo, RegExp.prototype.exec), gv = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, wv = /\\(\\)?/g, yv = function(t) {
  var e = Bc(t, 0, 1), n = Bc(t, -1);
  if (e === "%" && n !== "%")
    throw new Ba("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && e !== "%")
    throw new Ba("invalid intrinsic syntax, expected opening `%`");
  var i = [];
  return Ud(t, gv, function(s, a, u, l) {
    i[i.length] = u ? Ud(l, wv, "$1") : a || s;
  }), i;
}, bv = function(t, e) {
  var n = t, i;
  if (Sc(Ld, n) && (i = Ld[n], n = "%" + i[0] + "%"), Sc(Wi, n)) {
    var s = Wi[n];
    if (s === ws && (s = fv(n)), typeof s > "u" && !e)
      throw new Os("intrinsic " + t + " exists, but is not available. Please file an issue!");
    return {
      alias: i,
      name: n,
      value: s
    };
  }
  throw new Ba("intrinsic " + t + " does not exist!");
}, nf = function(t, e) {
  if (typeof t != "string" || t.length === 0)
    throw new Os("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof e != "boolean")
    throw new Os('"allowMissing" argument must be a boolean');
  if (hv(/^%?[^%]*%?$/, t) === null)
    throw new Ba("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = yv(t), i = n.length > 0 ? n[0] : "", s = bv("%" + i + "%", e), a = s.name, u = s.value, l = !1, p = s.alias;
  p && (i = p[0], pv(n, dv([0, 1], p)));
  for (var f = 1, h = !0; f < n.length; f += 1) {
    var b = n[f], k = Bc(b, 0, 1), R = Bc(b, -1);
    if ((k === '"' || k === "'" || k === "`" || R === '"' || R === "'" || R === "`") && k !== R)
      throw new Ba("property names with quotes must have matching quotes");
    if ((b === "constructor" || !h) && (l = !0), i += "." + b, a = "%" + i + "%", Sc(Wi, a))
      u = Wi[a];
    else if (u != null) {
      if (!(b in u)) {
        if (!e)
          throw new Os("base intrinsic for " + t + " exists, but the property is not available.");
        return;
      }
      if (_o && f + 1 >= n.length) {
        var x = _o(u, b);
        h = !!x, h && "get" in x && !("originalValue" in x.get) ? u = x.get : u = u[b];
      } else
        h = Sc(u, b), u = u[b];
      h && !l && (Wi[a] = u);
    }
  }
  return u;
}, bw = { exports: {} }, Dd = uu, mv = dw, fs = cu, Md = No, vv = function(t, e, n) {
  if (!t || typeof t != "object" && typeof t != "function")
    throw new fs("`obj` must be an object or a function`");
  if (typeof e != "string" && typeof e != "symbol")
    throw new fs("`property` must be a string or a symbol`");
  if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
    throw new fs("`nonEnumerable`, if provided, must be a boolean or null");
  if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
    throw new fs("`nonWritable`, if provided, must be a boolean or null");
  if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
    throw new fs("`nonConfigurable`, if provided, must be a boolean or null");
  if (arguments.length > 6 && typeof arguments[6] != "boolean")
    throw new fs("`loose`, if provided, must be a boolean");
  var i = arguments.length > 3 ? arguments[3] : null, s = arguments.length > 4 ? arguments[4] : null, a = arguments.length > 5 ? arguments[5] : null, u = arguments.length > 6 ? arguments[6] : !1, l = !!Md && Md(t, e);
  if (Dd)
    Dd(t, e, {
      configurable: a === null && l ? l.configurable : !a,
      enumerable: i === null && l ? l.enumerable : !i,
      value: n,
      writable: s === null && l ? l.writable : !s
    });
  else if (u || !i && !s && !a)
    t[e] = n;
  else
    throw new mv("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
}, b_ = uu, mw = function() {
  return !!b_;
};
mw.hasArrayLengthDefineBug = function() {
  if (!b_)
    return null;
  try {
    return b_([], "length", { value: 1 }).length !== 1;
  } catch {
    return !0;
  }
};
var Av = mw, Iv = nf, jd = vv, Ev = Av(), Gd = No, Hd = cu, kv = Iv("%Math.floor%"), xv = function(t, e) {
  if (typeof t != "function")
    throw new Hd("`fn` is not a function");
  if (typeof e != "number" || e < 0 || e > 4294967295 || kv(e) !== e)
    throw new Hd("`length` must be a positive 32-bit integer");
  var n = arguments.length > 2 && !!arguments[2], i = !0, s = !0;
  if ("length" in t && Gd) {
    var a = Gd(t, "length");
    a && !a.configurable && (i = !1), a && !a.writable && (s = !1);
  }
  return (i || s || !n) && (Ev ? jd(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    e,
    !0,
    !0
  ) : jd(
    /** @type {Parameters<define>[0]} */
    t,
    "length",
    e
  )), t;
}, Rv = Co, Sv = rf, Bv = pw, Pv = function() {
  return Bv(Rv, Sv, arguments);
};
(function(r) {
  var t = xv, e = uu, n = hw, i = Pv;
  r.exports = function(a) {
    var u = n(arguments), l = a.length - (arguments.length - 1);
    return t(
      u,
      1 + (l > 0 ? l : 0),
      !0
    );
  }, e ? e(r.exports, "apply", { value: i }) : r.exports.apply = i;
})(bw);
var sf = bw.exports, vw = nf, Aw = sf, Ov = Aw(
  /** @type {typeof String.prototype.indexOf} */
  vw("String.prototype.indexOf")
), Tv = function(t, e) {
  var n = (
    /** @type {Parameters<typeof callBind>[0]} */
    vw(t, !!e)
  );
  return typeof n == "function" && Ov(t, ".prototype.") > -1 ? Aw(n) : n;
}, Nv = tf(), Cv = Tv, m_ = Cv("Object.prototype.toString"), lu = function(t) {
  return Nv && t && typeof t == "object" && Symbol.toStringTag in t ? !1 : m_(t) === "[object Arguments]";
}, Iw = function(t) {
  return lu(t) ? !0 : t !== null && typeof t == "object" && "length" in t && typeof t.length == "number" && t.length >= 0 && m_(t) !== "[object Array]" && "callee" in t && m_(t.callee) === "[object Function]";
}, Fv = function() {
  return lu(arguments);
}();
lu.isLegacyArguments = Iw;
var zv = Fv ? lu : Iw, Lv = Object.prototype.toString, Uv = Function.prototype.toString, Dv = /^\s*(?:function)?\*/, Ew = tf(), vl = Object.getPrototypeOf, Mv = function() {
  if (!Ew)
    return !1;
  try {
    return Function("return function*() {}")();
  } catch {
  }
}, Al, jv = function(t) {
  if (typeof t != "function")
    return !1;
  if (Dv.test(Uv.call(t)))
    return !0;
  if (!Ew) {
    var e = Lv.call(t);
    return e === "[object GeneratorFunction]";
  }
  if (!vl)
    return !1;
  if (typeof Al > "u") {
    var n = Mv();
    Al = n ? vl(n) : !1;
  }
  return vl(t) === Al;
}, kw = Function.prototype.toString, vs = typeof Reflect == "object" && Reflect !== null && Reflect.apply, v_, cc;
if (typeof vs == "function" && typeof Object.defineProperty == "function")
  try {
    v_ = Object.defineProperty({}, "length", {
      get: function() {
        throw cc;
      }
    }), cc = {}, vs(function() {
      throw 42;
    }, null, v_);
  } catch (r) {
    r !== cc && (vs = null);
  }
else
  vs = null;
var Gv = /^\s*class\b/, A_ = function(t) {
  try {
    var e = kw.call(t);
    return Gv.test(e);
  } catch {
    return !1;
  }
}, Il = function(t) {
  try {
    return A_(t) ? !1 : (kw.call(t), !0);
  } catch {
    return !1;
  }
}, uc = Object.prototype.toString, Hv = "[object Object]", Vv = "[object Function]", Qv = "[object GeneratorFunction]", Jv = "[object HTMLAllCollection]", Wv = "[object HTML document.all class]", Kv = "[object HTMLCollection]", $v = typeof Symbol == "function" && !!Symbol.toStringTag, qv = !(0 in [,]), I_ = function() {
  return !1;
};
if (typeof document == "object") {
  var Yv = document.all;
  uc.call(Yv) === uc.call(document.all) && (I_ = function(t) {
    if ((qv || !t) && (typeof t > "u" || typeof t == "object"))
      try {
        var e = uc.call(t);
        return (e === Jv || e === Wv || e === Kv || e === Hv) && t("") == null;
      } catch {
      }
    return !1;
  });
}
var Zv = vs ? function(t) {
  if (I_(t))
    return !0;
  if (!t || typeof t != "function" && typeof t != "object")
    return !1;
  try {
    vs(t, null, v_);
  } catch (e) {
    if (e !== cc)
      return !1;
  }
  return !A_(t) && Il(t);
} : function(t) {
  if (I_(t))
    return !0;
  if (!t || typeof t != "function" && typeof t != "object")
    return !1;
  if ($v)
    return Il(t);
  if (A_(t))
    return !1;
  var e = uc.call(t);
  return e !== Vv && e !== Qv && !/^\[object HTML/.test(e) ? !1 : Il(t);
}, Xv = Zv, tA = Object.prototype.toString, xw = Object.prototype.hasOwnProperty, eA = function(t, e, n) {
  for (var i = 0, s = t.length; i < s; i++)
    xw.call(t, i) && (n == null ? e(t[i], i, t) : e.call(n, t[i], i, t));
}, rA = function(t, e, n) {
  for (var i = 0, s = t.length; i < s; i++)
    n == null ? e(t.charAt(i), i, t) : e.call(n, t.charAt(i), i, t);
}, nA = function(t, e, n) {
  for (var i in t)
    xw.call(t, i) && (n == null ? e(t[i], i, t) : e.call(n, t[i], i, t));
}, iA = function(t, e, n) {
  if (!Xv(e))
    throw new TypeError("iterator must be a function");
  var i;
  arguments.length >= 3 && (i = n), tA.call(t) === "[object Array]" ? eA(t, e, i) : typeof t == "string" ? rA(t, e, i) : nA(t, e, i);
}, sA = iA, aA = [
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array"
], El = aA, oA = typeof globalThis > "u" ? ci : globalThis, cA = function() {
  for (var t = [], e = 0; e < El.length; e++)
    typeof oA[El[e]] == "function" && (t[t.length] = El[e]);
  return t;
}, Rw = nf, Sw = sf, uA = Sw(Rw("String.prototype.indexOf")), lA = function(t, e) {
  var n = Rw(t, !!e);
  return typeof n == "function" && uA(t, ".prototype.") > -1 ? Sw(n) : n;
}, Pc = sA, _A = cA, Vd = sf, af = lA, lc = No, fA = af("Object.prototype.toString"), Bw = tf(), Qd = typeof globalThis > "u" ? ci : globalThis, E_ = _A(), of = af("String.prototype.slice"), kl = Object.getPrototypeOf, dA = af("Array.prototype.indexOf", !0) || function(t, e) {
  for (var n = 0; n < t.length; n += 1)
    if (t[n] === e)
      return n;
  return -1;
}, Oc = { __proto__: null };
Bw && lc && kl ? Pc(E_, function(r) {
  var t = new Qd[r]();
  if (Symbol.toStringTag in t) {
    var e = kl(t), n = lc(e, Symbol.toStringTag);
    if (!n) {
      var i = kl(e);
      n = lc(i, Symbol.toStringTag);
    }
    Oc["$" + r] = Vd(n.get);
  }
}) : Pc(E_, function(r) {
  var t = new Qd[r](), e = t.slice || t.set;
  e && (Oc["$" + r] = Vd(e));
});
var pA = function(t) {
  var e = !1;
  return Pc(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    Oc,
    /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
    function(n, i) {
      if (!e)
        try {
          "$" + n(t) === i && (e = of(i, 1));
        } catch {
        }
    }
  ), e;
}, hA = function(t) {
  var e = !1;
  return Pc(
    // eslint-disable-next-line no-extra-parens
    /** @type {Record<`\$${TypedArrayName}`, Getter>} */
    /** @type {any} */
    Oc,
    /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
    function(n, i) {
      if (!e)
        try {
          n(t), e = of(i, 1);
        } catch {
        }
    }
  ), e;
}, Pw = function(t) {
  if (!t || typeof t != "object")
    return !1;
  if (!Bw) {
    var e = of(fA(t), 8, -1);
    return dA(E_, e) > -1 ? e : e !== "Object" ? !1 : hA(t);
  }
  return lc ? pA(t) : null;
}, gA = Pw, wA = function(t) {
  return !!gA(t);
};
(function(r) {
  var t = zv, e = jv, n = Pw, i = wA;
  function s($) {
    return $.call.bind($);
  }
  var a = typeof BigInt < "u", u = typeof Symbol < "u", l = s(Object.prototype.toString), p = s(Number.prototype.valueOf), f = s(String.prototype.valueOf), h = s(Boolean.prototype.valueOf);
  if (a)
    var b = s(BigInt.prototype.valueOf);
  if (u)
    var k = s(Symbol.prototype.valueOf);
  function R($, Ye) {
    if (typeof $ != "object")
      return !1;
    try {
      return Ye($), !0;
    } catch {
      return !1;
    }
  }
  r.isArgumentsObject = t, r.isGeneratorFunction = e, r.isTypedArray = i;
  function x($) {
    return typeof Promise < "u" && $ instanceof Promise || $ !== null && typeof $ == "object" && typeof $.then == "function" && typeof $.catch == "function";
  }
  r.isPromise = x;
  function S($) {
    return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView($) : i($) || H($);
  }
  r.isArrayBufferView = S;
  function m($) {
    return n($) === "Uint8Array";
  }
  r.isUint8Array = m;
  function B($) {
    return n($) === "Uint8ClampedArray";
  }
  r.isUint8ClampedArray = B;
  function C($) {
    return n($) === "Uint16Array";
  }
  r.isUint16Array = C;
  function U($) {
    return n($) === "Uint32Array";
  }
  r.isUint32Array = U;
  function M($) {
    return n($) === "Int8Array";
  }
  r.isInt8Array = M;
  function V($) {
    return n($) === "Int16Array";
  }
  r.isInt16Array = V;
  function Z($) {
    return n($) === "Int32Array";
  }
  r.isInt32Array = Z;
  function K($) {
    return n($) === "Float32Array";
  }
  r.isFloat32Array = K;
  function tt($) {
    return n($) === "Float64Array";
  }
  r.isFloat64Array = tt;
  function ht($) {
    return n($) === "BigInt64Array";
  }
  r.isBigInt64Array = ht;
  function wt($) {
    return n($) === "BigUint64Array";
  }
  r.isBigUint64Array = wt;
  function kt($) {
    return l($) === "[object Map]";
  }
  kt.working = typeof Map < "u" && kt(/* @__PURE__ */ new Map());
  function Nt($) {
    return typeof Map > "u" ? !1 : kt.working ? kt($) : $ instanceof Map;
  }
  r.isMap = Nt;
  function jt($) {
    return l($) === "[object Set]";
  }
  jt.working = typeof Set < "u" && jt(/* @__PURE__ */ new Set());
  function X($) {
    return typeof Set > "u" ? !1 : jt.working ? jt($) : $ instanceof Set;
  }
  r.isSet = X;
  function at($) {
    return l($) === "[object WeakMap]";
  }
  at.working = typeof WeakMap < "u" && at(/* @__PURE__ */ new WeakMap());
  function gt($) {
    return typeof WeakMap > "u" ? !1 : at.working ? at($) : $ instanceof WeakMap;
  }
  r.isWeakMap = gt;
  function At($) {
    return l($) === "[object WeakSet]";
  }
  At.working = typeof WeakSet < "u" && At(/* @__PURE__ */ new WeakSet());
  function vt($) {
    return At($);
  }
  r.isWeakSet = vt;
  function Ct($) {
    return l($) === "[object ArrayBuffer]";
  }
  Ct.working = typeof ArrayBuffer < "u" && Ct(new ArrayBuffer());
  function Vt($) {
    return typeof ArrayBuffer > "u" ? !1 : Ct.working ? Ct($) : $ instanceof ArrayBuffer;
  }
  r.isArrayBuffer = Vt;
  function F($) {
    return l($) === "[object DataView]";
  }
  F.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && F(new DataView(new ArrayBuffer(1), 0, 1));
  function H($) {
    return typeof DataView > "u" ? !1 : F.working ? F($) : $ instanceof DataView;
  }
  r.isDataView = H;
  var Q = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
  function lt($) {
    return l($) === "[object SharedArrayBuffer]";
  }
  function T($) {
    return typeof Q > "u" ? !1 : (typeof lt.working > "u" && (lt.working = lt(new Q())), lt.working ? lt($) : $ instanceof Q);
  }
  r.isSharedArrayBuffer = T;
  function O($) {
    return l($) === "[object AsyncFunction]";
  }
  r.isAsyncFunction = O;
  function G($) {
    return l($) === "[object Map Iterator]";
  }
  r.isMapIterator = G;
  function Y($) {
    return l($) === "[object Set Iterator]";
  }
  r.isSetIterator = Y;
  function ot($) {
    return l($) === "[object Generator]";
  }
  r.isGeneratorObject = ot;
  function v($) {
    return l($) === "[object WebAssembly.Module]";
  }
  r.isWebAssemblyCompiledModule = v;
  function I($) {
    return R($, p);
  }
  r.isNumberObject = I;
  function J($) {
    return R($, f);
  }
  r.isStringObject = J;
  function nt($) {
    return R($, h);
  }
  r.isBooleanObject = nt;
  function Pt($) {
    return a && R($, b);
  }
  r.isBigIntObject = Pt;
  function yt($) {
    return u && R($, k);
  }
  r.isSymbolObject = yt;
  function St($) {
    return I($) || J($) || nt($) || Pt($) || yt($);
  }
  r.isBoxedPrimitive = St;
  function Ne($) {
    return typeof Uint8Array < "u" && (Vt($) || T($));
  }
  r.isAnyArrayBuffer = Ne, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function($) {
    Object.defineProperty(r, $, {
      enumerable: !1,
      value: function() {
        throw new Error($ + " is not supported in userland");
      }
    });
  });
})(_w);
var yA = function(t) {
  return t && typeof t == "object" && typeof t.copy == "function" && typeof t.fill == "function" && typeof t.readUInt8 == "function";
}, k_ = { exports: {} };
typeof Object.create == "function" ? k_.exports = function(t, e) {
  e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : k_.exports = function(t, e) {
  if (e) {
    t.super_ = e;
    var n = function() {
    };
    n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
  }
};
var Ta = k_.exports;
(function(r) {
  var t = Object.getOwnPropertyDescriptors || function(H) {
    for (var Q = Object.keys(H), lt = {}, T = 0; T < Q.length; T++)
      lt[Q[T]] = Object.getOwnPropertyDescriptor(H, Q[T]);
    return lt;
  }, e = /%[sdj%]/g;
  r.format = function(F) {
    if (!M(F)) {
      for (var H = [], Q = 0; Q < arguments.length; Q++)
        H.push(a(arguments[Q]));
      return H.join(" ");
    }
    for (var Q = 1, lt = arguments, T = lt.length, O = String(F).replace(e, function(Y) {
      if (Y === "%%") return "%";
      if (Q >= T) return Y;
      switch (Y) {
        case "%s":
          return String(lt[Q++]);
        case "%d":
          return Number(lt[Q++]);
        case "%j":
          try {
            return JSON.stringify(lt[Q++]);
          } catch {
            return "[Circular]";
          }
        default:
          return Y;
      }
    }), G = lt[Q]; Q < T; G = lt[++Q])
      B(G) || !tt(G) ? O += " " + G : O += " " + a(G);
    return O;
  }, r.deprecate = function(F, H) {
    if (typeof Bt < "u" && Bt.noDeprecation === !0)
      return F;
    if (typeof Bt > "u")
      return function() {
        return r.deprecate(F, H).apply(this, arguments);
      };
    var Q = !1;
    function lt() {
      if (!Q) {
        if (Bt.throwDeprecation)
          throw new Error(H);
        Bt.traceDeprecation ? console.trace(H) : console.error(H), Q = !0;
      }
      return F.apply(this, arguments);
    }
    return lt;
  };
  var n = {}, i = /^$/;
  if (Bt.env.NODE_DEBUG) {
    var s = Bt.env.NODE_DEBUG;
    s = s.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), i = new RegExp("^" + s + "$", "i");
  }
  r.debuglog = function(F) {
    if (F = F.toUpperCase(), !n[F])
      if (i.test(F)) {
        var H = Bt.pid;
        n[F] = function() {
          var Q = r.format.apply(r, arguments);
          console.error("%s %d: %s", F, H, Q);
        };
      } else
        n[F] = function() {
        };
    return n[F];
  };
  function a(F, H) {
    var Q = {
      seen: [],
      stylize: l
    };
    return arguments.length >= 3 && (Q.depth = arguments[2]), arguments.length >= 4 && (Q.colors = arguments[3]), m(H) ? Q.showHidden = H : H && r._extend(Q, H), Z(Q.showHidden) && (Q.showHidden = !1), Z(Q.depth) && (Q.depth = 2), Z(Q.colors) && (Q.colors = !1), Z(Q.customInspect) && (Q.customInspect = !0), Q.colors && (Q.stylize = u), f(Q, F, Q.depth);
  }
  r.inspect = a, a.colors = {
    bold: [1, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    white: [37, 39],
    grey: [90, 39],
    black: [30, 39],
    blue: [34, 39],
    cyan: [36, 39],
    green: [32, 39],
    magenta: [35, 39],
    red: [31, 39],
    yellow: [33, 39]
  }, a.styles = {
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    date: "magenta",
    // "name": intentionally not styling
    regexp: "red"
  };
  function u(F, H) {
    var Q = a.styles[H];
    return Q ? "\x1B[" + a.colors[Q][0] + "m" + F + "\x1B[" + a.colors[Q][1] + "m" : F;
  }
  function l(F, H) {
    return F;
  }
  function p(F) {
    var H = {};
    return F.forEach(function(Q, lt) {
      H[Q] = !0;
    }), H;
  }
  function f(F, H, Q) {
    if (F.customInspect && H && kt(H.inspect) && // Filter out the util module, it's inspect function is special
    H.inspect !== r.inspect && // Also filter out any prototype objects using the circular check.
    !(H.constructor && H.constructor.prototype === H)) {
      var lt = H.inspect(Q, F);
      return M(lt) || (lt = f(F, lt, Q)), lt;
    }
    var T = h(F, H);
    if (T)
      return T;
    var O = Object.keys(H), G = p(O);
    if (F.showHidden && (O = Object.getOwnPropertyNames(H)), wt(H) && (O.indexOf("message") >= 0 || O.indexOf("description") >= 0))
      return b(H);
    if (O.length === 0) {
      if (kt(H)) {
        var Y = H.name ? ": " + H.name : "";
        return F.stylize("[Function" + Y + "]", "special");
      }
      if (K(H))
        return F.stylize(RegExp.prototype.toString.call(H), "regexp");
      if (ht(H))
        return F.stylize(Date.prototype.toString.call(H), "date");
      if (wt(H))
        return b(H);
    }
    var ot = "", v = !1, I = ["{", "}"];
    if (S(H) && (v = !0, I = ["[", "]"]), kt(H)) {
      var J = H.name ? ": " + H.name : "";
      ot = " [Function" + J + "]";
    }
    if (K(H) && (ot = " " + RegExp.prototype.toString.call(H)), ht(H) && (ot = " " + Date.prototype.toUTCString.call(H)), wt(H) && (ot = " " + b(H)), O.length === 0 && (!v || H.length == 0))
      return I[0] + ot + I[1];
    if (Q < 0)
      return K(H) ? F.stylize(RegExp.prototype.toString.call(H), "regexp") : F.stylize("[Object]", "special");
    F.seen.push(H);
    var nt;
    return v ? nt = k(F, H, Q, G, O) : nt = O.map(function(Pt) {
      return R(F, H, Q, G, Pt, v);
    }), F.seen.pop(), x(nt, ot, I);
  }
  function h(F, H) {
    if (Z(H))
      return F.stylize("undefined", "undefined");
    if (M(H)) {
      var Q = "'" + JSON.stringify(H).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return F.stylize(Q, "string");
    }
    if (U(H))
      return F.stylize("" + H, "number");
    if (m(H))
      return F.stylize("" + H, "boolean");
    if (B(H))
      return F.stylize("null", "null");
  }
  function b(F) {
    return "[" + Error.prototype.toString.call(F) + "]";
  }
  function k(F, H, Q, lt, T) {
    for (var O = [], G = 0, Y = H.length; G < Y; ++G)
      At(H, String(G)) ? O.push(R(
        F,
        H,
        Q,
        lt,
        String(G),
        !0
      )) : O.push("");
    return T.forEach(function(ot) {
      ot.match(/^\d+$/) || O.push(R(
        F,
        H,
        Q,
        lt,
        ot,
        !0
      ));
    }), O;
  }
  function R(F, H, Q, lt, T, O) {
    var G, Y, ot;
    if (ot = Object.getOwnPropertyDescriptor(H, T) || { value: H[T] }, ot.get ? ot.set ? Y = F.stylize("[Getter/Setter]", "special") : Y = F.stylize("[Getter]", "special") : ot.set && (Y = F.stylize("[Setter]", "special")), At(lt, T) || (G = "[" + T + "]"), Y || (F.seen.indexOf(ot.value) < 0 ? (B(Q) ? Y = f(F, ot.value, null) : Y = f(F, ot.value, Q - 1), Y.indexOf(`
`) > -1 && (O ? Y = Y.split(`
`).map(function(v) {
      return "  " + v;
    }).join(`
`).slice(2) : Y = `
` + Y.split(`
`).map(function(v) {
      return "   " + v;
    }).join(`
`))) : Y = F.stylize("[Circular]", "special")), Z(G)) {
      if (O && T.match(/^\d+$/))
        return Y;
      G = JSON.stringify("" + T), G.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (G = G.slice(1, -1), G = F.stylize(G, "name")) : (G = G.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), G = F.stylize(G, "string"));
    }
    return G + ": " + Y;
  }
  function x(F, H, Q) {
    var lt = F.reduce(function(T, O) {
      return O.indexOf(`
`) >= 0, T + O.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    return lt > 60 ? Q[0] + (H === "" ? "" : H + `
 `) + " " + F.join(`,
  `) + " " + Q[1] : Q[0] + H + " " + F.join(", ") + " " + Q[1];
  }
  r.types = _w;
  function S(F) {
    return Array.isArray(F);
  }
  r.isArray = S;
  function m(F) {
    return typeof F == "boolean";
  }
  r.isBoolean = m;
  function B(F) {
    return F === null;
  }
  r.isNull = B;
  function C(F) {
    return F == null;
  }
  r.isNullOrUndefined = C;
  function U(F) {
    return typeof F == "number";
  }
  r.isNumber = U;
  function M(F) {
    return typeof F == "string";
  }
  r.isString = M;
  function V(F) {
    return typeof F == "symbol";
  }
  r.isSymbol = V;
  function Z(F) {
    return F === void 0;
  }
  r.isUndefined = Z;
  function K(F) {
    return tt(F) && jt(F) === "[object RegExp]";
  }
  r.isRegExp = K, r.types.isRegExp = K;
  function tt(F) {
    return typeof F == "object" && F !== null;
  }
  r.isObject = tt;
  function ht(F) {
    return tt(F) && jt(F) === "[object Date]";
  }
  r.isDate = ht, r.types.isDate = ht;
  function wt(F) {
    return tt(F) && (jt(F) === "[object Error]" || F instanceof Error);
  }
  r.isError = wt, r.types.isNativeError = wt;
  function kt(F) {
    return typeof F == "function";
  }
  r.isFunction = kt;
  function Nt(F) {
    return F === null || typeof F == "boolean" || typeof F == "number" || typeof F == "string" || typeof F == "symbol" || // ES6 symbol
    typeof F > "u";
  }
  r.isPrimitive = Nt, r.isBuffer = yA;
  function jt(F) {
    return Object.prototype.toString.call(F);
  }
  function X(F) {
    return F < 10 ? "0" + F.toString(10) : F.toString(10);
  }
  var at = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function gt() {
    var F = /* @__PURE__ */ new Date(), H = [
      X(F.getHours()),
      X(F.getMinutes()),
      X(F.getSeconds())
    ].join(":");
    return [F.getDate(), at[F.getMonth()], H].join(" ");
  }
  r.log = function() {
    console.log("%s - %s", gt(), r.format.apply(r, arguments));
  }, r.inherits = Ta, r._extend = function(F, H) {
    if (!H || !tt(H)) return F;
    for (var Q = Object.keys(H), lt = Q.length; lt--; )
      F[Q[lt]] = H[Q[lt]];
    return F;
  };
  function At(F, H) {
    return Object.prototype.hasOwnProperty.call(F, H);
  }
  var vt = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
  r.promisify = function(H) {
    if (typeof H != "function")
      throw new TypeError('The "original" argument must be of type Function');
    if (vt && H[vt]) {
      var Q = H[vt];
      if (typeof Q != "function")
        throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      return Object.defineProperty(Q, vt, {
        value: Q,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Q;
    }
    function Q() {
      for (var lt, T, O = new Promise(function(ot, v) {
        lt = ot, T = v;
      }), G = [], Y = 0; Y < arguments.length; Y++)
        G.push(arguments[Y]);
      G.push(function(ot, v) {
        ot ? T(ot) : lt(v);
      });
      try {
        H.apply(this, G);
      } catch (ot) {
        T(ot);
      }
      return O;
    }
    return Object.setPrototypeOf(Q, Object.getPrototypeOf(H)), vt && Object.defineProperty(Q, vt, {
      value: Q,
      enumerable: !1,
      writable: !1,
      configurable: !0
    }), Object.defineProperties(
      Q,
      t(H)
    );
  }, r.promisify.custom = vt;
  function Ct(F, H) {
    if (!F) {
      var Q = new Error("Promise was rejected with a falsy value");
      Q.reason = F, F = Q;
    }
    return H(F);
  }
  function Vt(F) {
    if (typeof F != "function")
      throw new TypeError('The "original" argument must be of type Function');
    function H() {
      for (var Q = [], lt = 0; lt < arguments.length; lt++)
        Q.push(arguments[lt]);
      var T = Q.pop();
      if (typeof T != "function")
        throw new TypeError("The last argument must be of type Function");
      var O = this, G = function() {
        return T.apply(O, arguments);
      };
      F.apply(this, Q).then(
        function(Y) {
          Bt.nextTick(G.bind(null, null, Y));
        },
        function(Y) {
          Bt.nextTick(Ct.bind(null, Y, G));
        }
      );
    }
    return Object.setPrototypeOf(H, Object.getPrototypeOf(F)), Object.defineProperties(
      H,
      t(F)
    ), H;
  }
  r.callbackify = Vt;
})(X_);
var xl, Jd;
function bA() {
  if (Jd) return xl;
  Jd = 1;
  function r(R, x) {
    var S = Object.keys(R);
    if (Object.getOwnPropertySymbols) {
      var m = Object.getOwnPropertySymbols(R);
      x && (m = m.filter(function(B) {
        return Object.getOwnPropertyDescriptor(R, B).enumerable;
      })), S.push.apply(S, m);
    }
    return S;
  }
  function t(R) {
    for (var x = 1; x < arguments.length; x++) {
      var S = arguments[x] != null ? arguments[x] : {};
      x % 2 ? r(Object(S), !0).forEach(function(m) {
        e(R, m, S[m]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(R, Object.getOwnPropertyDescriptors(S)) : r(Object(S)).forEach(function(m) {
        Object.defineProperty(R, m, Object.getOwnPropertyDescriptor(S, m));
      });
    }
    return R;
  }
  function e(R, x, S) {
    return x = a(x), x in R ? Object.defineProperty(R, x, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : R[x] = S, R;
  }
  function n(R, x) {
    if (!(R instanceof x))
      throw new TypeError("Cannot call a class as a function");
  }
  function i(R, x) {
    for (var S = 0; S < x.length; S++) {
      var m = x[S];
      m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(R, a(m.key), m);
    }
  }
  function s(R, x, S) {
    return x && i(R.prototype, x), Object.defineProperty(R, "prototype", { writable: !1 }), R;
  }
  function a(R) {
    var x = u(R, "string");
    return typeof x == "symbol" ? x : String(x);
  }
  function u(R, x) {
    if (typeof R != "object" || R === null) return R;
    var S = R[Symbol.toPrimitive];
    if (S !== void 0) {
      var m = S.call(R, x || "default");
      if (typeof m != "object") return m;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (x === "string" ? String : Number)(R);
  }
  var l = ou, p = l.Buffer, f = X_, h = f.inspect, b = h && h.custom || "inspect";
  function k(R, x, S) {
    p.prototype.copy.call(R, x, S);
  }
  return xl = /* @__PURE__ */ function() {
    function R() {
      n(this, R), this.head = null, this.tail = null, this.length = 0;
    }
    return s(R, [{
      key: "push",
      value: function(S) {
        var m = {
          data: S,
          next: null
        };
        this.length > 0 ? this.tail.next = m : this.head = m, this.tail = m, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(S) {
        var m = {
          data: S,
          next: this.head
        };
        this.length === 0 && (this.tail = m), this.head = m, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var S = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, S;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(S) {
        if (this.length === 0) return "";
        for (var m = this.head, B = "" + m.data; m = m.next; ) B += S + m.data;
        return B;
      }
    }, {
      key: "concat",
      value: function(S) {
        if (this.length === 0) return p.alloc(0);
        for (var m = p.allocUnsafe(S >>> 0), B = this.head, C = 0; B; )
          k(B.data, m, C), C += B.data.length, B = B.next;
        return m;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(S, m) {
        var B;
        return S < this.head.data.length ? (B = this.head.data.slice(0, S), this.head.data = this.head.data.slice(S)) : S === this.head.data.length ? B = this.shift() : B = m ? this._getString(S) : this._getBuffer(S), B;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(S) {
        var m = this.head, B = 1, C = m.data;
        for (S -= C.length; m = m.next; ) {
          var U = m.data, M = S > U.length ? U.length : S;
          if (M === U.length ? C += U : C += U.slice(0, S), S -= M, S === 0) {
            M === U.length ? (++B, m.next ? this.head = m.next : this.head = this.tail = null) : (this.head = m, m.data = U.slice(M));
            break;
          }
          ++B;
        }
        return this.length -= B, C;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(S) {
        var m = p.allocUnsafe(S), B = this.head, C = 1;
        for (B.data.copy(m), S -= B.data.length; B = B.next; ) {
          var U = B.data, M = S > U.length ? U.length : S;
          if (U.copy(m, m.length - S, 0, M), S -= M, S === 0) {
            M === U.length ? (++C, B.next ? this.head = B.next : this.head = this.tail = null) : (this.head = B, B.data = U.slice(M));
            break;
          }
          ++C;
        }
        return this.length -= C, m;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: b,
      value: function(S, m) {
        return h(this, t(t({}, m), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), R;
  }(), xl;
}
function mA(r, t) {
  var e = this, n = this._readableState && this._readableState.destroyed, i = this._writableState && this._writableState.destroyed;
  return n || i ? (t ? t(r) : r && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, Bt.nextTick(x_, this, r)) : Bt.nextTick(x_, this, r)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(r || null, function(s) {
    !t && s ? e._writableState ? e._writableState.errorEmitted ? Bt.nextTick(_c, e) : (e._writableState.errorEmitted = !0, Bt.nextTick(Wd, e, s)) : Bt.nextTick(Wd, e, s) : t ? (Bt.nextTick(_c, e), t(s)) : Bt.nextTick(_c, e);
  }), this);
}
function Wd(r, t) {
  x_(r, t), _c(r);
}
function _c(r) {
  r._writableState && !r._writableState.emitClose || r._readableState && !r._readableState.emitClose || r.emit("close");
}
function vA() {
  this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
}
function x_(r, t) {
  r.emit("error", t);
}
function AA(r, t) {
  var e = r._readableState, n = r._writableState;
  e && e.autoDestroy || n && n.autoDestroy ? r.destroy(t) : r.emit("error", t);
}
var Ow = {
  destroy: mA,
  undestroy: vA,
  errorOrDestroy: AA
}, ss = {};
function IA(r, t) {
  r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.__proto__ = t;
}
var Tw = {};
function qe(r, t, e) {
  e || (e = Error);
  function n(s, a, u) {
    return typeof t == "string" ? t : t(s, a, u);
  }
  var i = /* @__PURE__ */ function(s) {
    IA(a, s);
    function a(u, l, p) {
      return s.call(this, n(u, l, p)) || this;
    }
    return a;
  }(e);
  i.prototype.name = e.name, i.prototype.code = r, Tw[r] = i;
}
function Kd(r, t) {
  if (Array.isArray(r)) {
    var e = r.length;
    return r = r.map(function(n) {
      return String(n);
    }), e > 2 ? "one of ".concat(t, " ").concat(r.slice(0, e - 1).join(", "), ", or ") + r[e - 1] : e === 2 ? "one of ".concat(t, " ").concat(r[0], " or ").concat(r[1]) : "of ".concat(t, " ").concat(r[0]);
  } else
    return "of ".concat(t, " ").concat(String(r));
}
function EA(r, t, e) {
  return r.substr(0, t.length) === t;
}
function kA(r, t, e) {
  return (e === void 0 || e > r.length) && (e = r.length), r.substring(e - t.length, e) === t;
}
function xA(r, t, e) {
  return typeof e != "number" && (e = 0), e + t.length > r.length ? !1 : r.indexOf(t, e) !== -1;
}
qe("ERR_INVALID_OPT_VALUE", function(r, t) {
  return 'The value "' + t + '" is invalid for option "' + r + '"';
}, TypeError);
qe("ERR_INVALID_ARG_TYPE", function(r, t, e) {
  var n;
  typeof t == "string" && EA(t, "not ") ? (n = "must not be", t = t.replace(/^not /, "")) : n = "must be";
  var i;
  if (kA(r, " argument"))
    i = "The ".concat(r, " ").concat(n, " ").concat(Kd(t, "type"));
  else {
    var s = xA(r, ".") ? "property" : "argument";
    i = 'The "'.concat(r, '" ').concat(s, " ").concat(n, " ").concat(Kd(t, "type"));
  }
  return i += ". Received type ".concat(typeof e), i;
}, TypeError);
qe("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
qe("ERR_METHOD_NOT_IMPLEMENTED", function(r) {
  return "The " + r + " method is not implemented";
});
qe("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
qe("ERR_STREAM_DESTROYED", function(r) {
  return "Cannot call " + r + " after a stream was destroyed";
});
qe("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
qe("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
qe("ERR_STREAM_WRITE_AFTER_END", "write after end");
qe("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
qe("ERR_UNKNOWN_ENCODING", function(r) {
  return "Unknown encoding: " + r;
}, TypeError);
qe("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
ss.codes = Tw;
var RA = ss.codes.ERR_INVALID_OPT_VALUE;
function SA(r, t, e) {
  return r.highWaterMark != null ? r.highWaterMark : t ? r[e] : null;
}
function BA(r, t, e, n) {
  var i = SA(t, n, e);
  if (i != null) {
    if (!(isFinite(i) && Math.floor(i) === i) || i < 0) {
      var s = n ? e : "highWaterMark";
      throw new RA(s, i);
    }
    return Math.floor(i);
  }
  return r.objectMode ? 16 : 16 * 1024;
}
var Nw = {
  getHighWaterMark: BA
}, PA = OA;
function OA(r, t) {
  if (Rl("noDeprecation"))
    return r;
  var e = !1;
  function n() {
    if (!e) {
      if (Rl("throwDeprecation"))
        throw new Error(t);
      Rl("traceDeprecation") ? console.trace(t) : console.warn(t), e = !0;
    }
    return r.apply(this, arguments);
  }
  return n;
}
function Rl(r) {
  try {
    if (!ci.localStorage) return !1;
  } catch {
    return !1;
  }
  var t = ci.localStorage[r];
  return t == null ? !1 : String(t).toLowerCase() === "true";
}
var Sl, $d;
function Cw() {
  if ($d) return Sl;
  $d = 1, Sl = K;
  function r(T) {
    var O = this;
    this.next = null, this.entry = null, this.finish = function() {
      lt(O, T);
    };
  }
  var t;
  K.WritableState = V;
  var e = {
    deprecate: PA
  }, n = lw, i = ou.Buffer, s = (typeof ci < "u" ? ci : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function a(T) {
    return i.from(T);
  }
  function u(T) {
    return i.isBuffer(T) || T instanceof s;
  }
  var l = Ow, p = Nw, f = p.getHighWaterMark, h = ss.codes, b = h.ERR_INVALID_ARG_TYPE, k = h.ERR_METHOD_NOT_IMPLEMENTED, R = h.ERR_MULTIPLE_CALLBACK, x = h.ERR_STREAM_CANNOT_PIPE, S = h.ERR_STREAM_DESTROYED, m = h.ERR_STREAM_NULL_VALUES, B = h.ERR_STREAM_WRITE_AFTER_END, C = h.ERR_UNKNOWN_ENCODING, U = l.errorOrDestroy;
  Ta(K, n);
  function M() {
  }
  function V(T, O, G) {
    t = t || Pa(), T = T || {}, typeof G != "boolean" && (G = O instanceof t), this.objectMode = !!T.objectMode, G && (this.objectMode = this.objectMode || !!T.writableObjectMode), this.highWaterMark = f(this, T, "writableHighWaterMark", G), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var Y = T.decodeStrings === !1;
    this.decodeStrings = !Y, this.defaultEncoding = T.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ot) {
      at(O, ot);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = T.emitClose !== !1, this.autoDestroy = !!T.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new r(this);
  }
  V.prototype.getBuffer = function() {
    for (var O = this.bufferedRequest, G = []; O; )
      G.push(O), O = O.next;
    return G;
  }, function() {
    try {
      Object.defineProperty(V.prototype, "buffer", {
        get: e.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var Z;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (Z = Function.prototype[Symbol.hasInstance], Object.defineProperty(K, Symbol.hasInstance, {
    value: function(O) {
      return Z.call(this, O) ? !0 : this !== K ? !1 : O && O._writableState instanceof V;
    }
  })) : Z = function(O) {
    return O instanceof this;
  };
  function K(T) {
    t = t || Pa();
    var O = this instanceof t;
    if (!O && !Z.call(K, this)) return new K(T);
    this._writableState = new V(T, this, O), this.writable = !0, T && (typeof T.write == "function" && (this._write = T.write), typeof T.writev == "function" && (this._writev = T.writev), typeof T.destroy == "function" && (this._destroy = T.destroy), typeof T.final == "function" && (this._final = T.final)), n.call(this);
  }
  K.prototype.pipe = function() {
    U(this, new x());
  };
  function tt(T, O) {
    var G = new B();
    U(T, G), Bt.nextTick(O, G);
  }
  function ht(T, O, G, Y) {
    var ot;
    return G === null ? ot = new m() : typeof G != "string" && !O.objectMode && (ot = new b("chunk", ["string", "Buffer"], G)), ot ? (U(T, ot), Bt.nextTick(Y, ot), !1) : !0;
  }
  K.prototype.write = function(T, O, G) {
    var Y = this._writableState, ot = !1, v = !Y.objectMode && u(T);
    return v && !i.isBuffer(T) && (T = a(T)), typeof O == "function" && (G = O, O = null), v ? O = "buffer" : O || (O = Y.defaultEncoding), typeof G != "function" && (G = M), Y.ending ? tt(this, G) : (v || ht(this, Y, T, G)) && (Y.pendingcb++, ot = kt(this, Y, v, T, O, G)), ot;
  }, K.prototype.cork = function() {
    this._writableState.corked++;
  }, K.prototype.uncork = function() {
    var T = this._writableState;
    T.corked && (T.corked--, !T.writing && !T.corked && !T.bufferProcessing && T.bufferedRequest && vt(this, T));
  }, K.prototype.setDefaultEncoding = function(O) {
    if (typeof O == "string" && (O = O.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((O + "").toLowerCase()) > -1)) throw new C(O);
    return this._writableState.defaultEncoding = O, this;
  }, Object.defineProperty(K.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function wt(T, O, G) {
    return !T.objectMode && T.decodeStrings !== !1 && typeof O == "string" && (O = i.from(O, G)), O;
  }
  Object.defineProperty(K.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function kt(T, O, G, Y, ot, v) {
    if (!G) {
      var I = wt(O, Y, ot);
      Y !== I && (G = !0, ot = "buffer", Y = I);
    }
    var J = O.objectMode ? 1 : Y.length;
    O.length += J;
    var nt = O.length < O.highWaterMark;
    if (nt || (O.needDrain = !0), O.writing || O.corked) {
      var Pt = O.lastBufferedRequest;
      O.lastBufferedRequest = {
        chunk: Y,
        encoding: ot,
        isBuf: G,
        callback: v,
        next: null
      }, Pt ? Pt.next = O.lastBufferedRequest : O.bufferedRequest = O.lastBufferedRequest, O.bufferedRequestCount += 1;
    } else
      Nt(T, O, !1, J, Y, ot, v);
    return nt;
  }
  function Nt(T, O, G, Y, ot, v, I) {
    O.writelen = Y, O.writecb = I, O.writing = !0, O.sync = !0, O.destroyed ? O.onwrite(new S("write")) : G ? T._writev(ot, O.onwrite) : T._write(ot, v, O.onwrite), O.sync = !1;
  }
  function jt(T, O, G, Y, ot) {
    --O.pendingcb, G ? (Bt.nextTick(ot, Y), Bt.nextTick(H, T, O), T._writableState.errorEmitted = !0, U(T, Y)) : (ot(Y), T._writableState.errorEmitted = !0, U(T, Y), H(T, O));
  }
  function X(T) {
    T.writing = !1, T.writecb = null, T.length -= T.writelen, T.writelen = 0;
  }
  function at(T, O) {
    var G = T._writableState, Y = G.sync, ot = G.writecb;
    if (typeof ot != "function") throw new R();
    if (X(G), O) jt(T, G, Y, O, ot);
    else {
      var v = Ct(G) || T.destroyed;
      !v && !G.corked && !G.bufferProcessing && G.bufferedRequest && vt(T, G), Y ? Bt.nextTick(gt, T, G, v, ot) : gt(T, G, v, ot);
    }
  }
  function gt(T, O, G, Y) {
    G || At(T, O), O.pendingcb--, Y(), H(T, O);
  }
  function At(T, O) {
    O.length === 0 && O.needDrain && (O.needDrain = !1, T.emit("drain"));
  }
  function vt(T, O) {
    O.bufferProcessing = !0;
    var G = O.bufferedRequest;
    if (T._writev && G && G.next) {
      var Y = O.bufferedRequestCount, ot = new Array(Y), v = O.corkedRequestsFree;
      v.entry = G;
      for (var I = 0, J = !0; G; )
        ot[I] = G, G.isBuf || (J = !1), G = G.next, I += 1;
      ot.allBuffers = J, Nt(T, O, !0, O.length, ot, "", v.finish), O.pendingcb++, O.lastBufferedRequest = null, v.next ? (O.corkedRequestsFree = v.next, v.next = null) : O.corkedRequestsFree = new r(O), O.bufferedRequestCount = 0;
    } else {
      for (; G; ) {
        var nt = G.chunk, Pt = G.encoding, yt = G.callback, St = O.objectMode ? 1 : nt.length;
        if (Nt(T, O, !1, St, nt, Pt, yt), G = G.next, O.bufferedRequestCount--, O.writing)
          break;
      }
      G === null && (O.lastBufferedRequest = null);
    }
    O.bufferedRequest = G, O.bufferProcessing = !1;
  }
  K.prototype._write = function(T, O, G) {
    G(new k("_write()"));
  }, K.prototype._writev = null, K.prototype.end = function(T, O, G) {
    var Y = this._writableState;
    return typeof T == "function" ? (G = T, T = null, O = null) : typeof O == "function" && (G = O, O = null), T != null && this.write(T, O), Y.corked && (Y.corked = 1, this.uncork()), Y.ending || Q(this, Y, G), this;
  }, Object.defineProperty(K.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function Ct(T) {
    return T.ending && T.length === 0 && T.bufferedRequest === null && !T.finished && !T.writing;
  }
  function Vt(T, O) {
    T._final(function(G) {
      O.pendingcb--, G && U(T, G), O.prefinished = !0, T.emit("prefinish"), H(T, O);
    });
  }
  function F(T, O) {
    !O.prefinished && !O.finalCalled && (typeof T._final == "function" && !O.destroyed ? (O.pendingcb++, O.finalCalled = !0, Bt.nextTick(Vt, T, O)) : (O.prefinished = !0, T.emit("prefinish")));
  }
  function H(T, O) {
    var G = Ct(O);
    if (G && (F(T, O), O.pendingcb === 0 && (O.finished = !0, T.emit("finish"), O.autoDestroy))) {
      var Y = T._readableState;
      (!Y || Y.autoDestroy && Y.endEmitted) && T.destroy();
    }
    return G;
  }
  function Q(T, O, G) {
    O.ending = !0, H(T, O), G && (O.finished ? Bt.nextTick(G) : T.once("finish", G)), O.ended = !0, T.writable = !1;
  }
  function lt(T, O, G) {
    var Y = T.entry;
    for (T.entry = null; Y; ) {
      var ot = Y.callback;
      O.pendingcb--, ot(G), Y = Y.next;
    }
    O.corkedRequestsFree.next = T;
  }
  return Object.defineProperty(K.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(O) {
      this._writableState && (this._writableState.destroyed = O);
    }
  }), K.prototype.destroy = l.destroy, K.prototype._undestroy = l.undestroy, K.prototype._destroy = function(T, O) {
    O(T);
  }, Sl;
}
var Bl, qd;
function Pa() {
  if (qd) return Bl;
  qd = 1;
  var r = Object.keys || function(p) {
    var f = [];
    for (var h in p) f.push(h);
    return f;
  };
  Bl = a;
  var t = zw(), e = Cw();
  Ta(a, t);
  for (var n = r(e.prototype), i = 0; i < n.length; i++) {
    var s = n[i];
    a.prototype[s] || (a.prototype[s] = e.prototype[s]);
  }
  function a(p) {
    if (!(this instanceof a)) return new a(p);
    t.call(this, p), e.call(this, p), this.allowHalfOpen = !0, p && (p.readable === !1 && (this.readable = !1), p.writable === !1 && (this.writable = !1), p.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", u)));
  }
  Object.defineProperty(a.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(a.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(a.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function u() {
    this._writableState.ended || Bt.nextTick(l, this);
  }
  function l(p) {
    p.end();
  }
  return Object.defineProperty(a.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(f) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = f, this._writableState.destroyed = f);
    }
  }), Bl;
}
var Pl = {}, Jo = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var Yd;
function TA() {
  return Yd || (Yd = 1, function(r, t) {
    var e = ou, n = e.Buffer;
    function i(a, u) {
      for (var l in a)
        u[l] = a[l];
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? r.exports = e : (i(e, t), t.Buffer = s);
    function s(a, u, l) {
      return n(a, u, l);
    }
    s.prototype = Object.create(n.prototype), i(n, s), s.from = function(a, u, l) {
      if (typeof a == "number")
        throw new TypeError("Argument must not be a number");
      return n(a, u, l);
    }, s.alloc = function(a, u, l) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      var p = n(a);
      return u !== void 0 ? typeof l == "string" ? p.fill(u, l) : p.fill(u) : p.fill(0), p;
    }, s.allocUnsafe = function(a) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      return n(a);
    }, s.allocUnsafeSlow = function(a) {
      if (typeof a != "number")
        throw new TypeError("Argument must be a number");
      return e.SlowBuffer(a);
    };
  }(Jo, Jo.exports)), Jo.exports;
}
var Zd;
function Xd() {
  if (Zd) return Pl;
  Zd = 1;
  var r = TA().Buffer, t = r.isEncoding || function(m) {
    switch (m = "" + m, m && m.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function e(m) {
    if (!m) return "utf8";
    for (var B; ; )
      switch (m) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return m;
        default:
          if (B) return;
          m = ("" + m).toLowerCase(), B = !0;
      }
  }
  function n(m) {
    var B = e(m);
    if (typeof B != "string" && (r.isEncoding === t || !t(m))) throw new Error("Unknown encoding: " + m);
    return B || m;
  }
  Pl.StringDecoder = i;
  function i(m) {
    this.encoding = n(m);
    var B;
    switch (this.encoding) {
      case "utf16le":
        this.text = h, this.end = b, B = 4;
        break;
      case "utf8":
        this.fillLast = l, B = 4;
        break;
      case "base64":
        this.text = k, this.end = R, B = 3;
        break;
      default:
        this.write = x, this.end = S;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(B);
  }
  i.prototype.write = function(m) {
    if (m.length === 0) return "";
    var B, C;
    if (this.lastNeed) {
      if (B = this.fillLast(m), B === void 0) return "";
      C = this.lastNeed, this.lastNeed = 0;
    } else
      C = 0;
    return C < m.length ? B ? B + this.text(m, C) : this.text(m, C) : B || "";
  }, i.prototype.end = f, i.prototype.text = p, i.prototype.fillLast = function(m) {
    if (this.lastNeed <= m.length)
      return m.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    m.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, m.length), this.lastNeed -= m.length;
  };
  function s(m) {
    return m <= 127 ? 0 : m >> 5 === 6 ? 2 : m >> 4 === 14 ? 3 : m >> 3 === 30 ? 4 : m >> 6 === 2 ? -1 : -2;
  }
  function a(m, B, C) {
    var U = B.length - 1;
    if (U < C) return 0;
    var M = s(B[U]);
    return M >= 0 ? (M > 0 && (m.lastNeed = M - 1), M) : --U < C || M === -2 ? 0 : (M = s(B[U]), M >= 0 ? (M > 0 && (m.lastNeed = M - 2), M) : --U < C || M === -2 ? 0 : (M = s(B[U]), M >= 0 ? (M > 0 && (M === 2 ? M = 0 : m.lastNeed = M - 3), M) : 0));
  }
  function u(m, B, C) {
    if ((B[0] & 192) !== 128)
      return m.lastNeed = 0, "�";
    if (m.lastNeed > 1 && B.length > 1) {
      if ((B[1] & 192) !== 128)
        return m.lastNeed = 1, "�";
      if (m.lastNeed > 2 && B.length > 2 && (B[2] & 192) !== 128)
        return m.lastNeed = 2, "�";
    }
  }
  function l(m) {
    var B = this.lastTotal - this.lastNeed, C = u(this, m);
    if (C !== void 0) return C;
    if (this.lastNeed <= m.length)
      return m.copy(this.lastChar, B, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    m.copy(this.lastChar, B, 0, m.length), this.lastNeed -= m.length;
  }
  function p(m, B) {
    var C = a(this, m, B);
    if (!this.lastNeed) return m.toString("utf8", B);
    this.lastTotal = C;
    var U = m.length - (C - this.lastNeed);
    return m.copy(this.lastChar, 0, U), m.toString("utf8", B, U);
  }
  function f(m) {
    var B = m && m.length ? this.write(m) : "";
    return this.lastNeed ? B + "�" : B;
  }
  function h(m, B) {
    if ((m.length - B) % 2 === 0) {
      var C = m.toString("utf16le", B);
      if (C) {
        var U = C.charCodeAt(C.length - 1);
        if (U >= 55296 && U <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = m[m.length - 2], this.lastChar[1] = m[m.length - 1], C.slice(0, -1);
      }
      return C;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = m[m.length - 1], m.toString("utf16le", B, m.length - 1);
  }
  function b(m) {
    var B = m && m.length ? this.write(m) : "";
    if (this.lastNeed) {
      var C = this.lastTotal - this.lastNeed;
      return B + this.lastChar.toString("utf16le", 0, C);
    }
    return B;
  }
  function k(m, B) {
    var C = (m.length - B) % 3;
    return C === 0 ? m.toString("base64", B) : (this.lastNeed = 3 - C, this.lastTotal = 3, C === 1 ? this.lastChar[0] = m[m.length - 1] : (this.lastChar[0] = m[m.length - 2], this.lastChar[1] = m[m.length - 1]), m.toString("base64", B, m.length - C));
  }
  function R(m) {
    var B = m && m.length ? this.write(m) : "";
    return this.lastNeed ? B + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : B;
  }
  function x(m) {
    return m.toString(this.encoding);
  }
  function S(m) {
    return m && m.length ? this.write(m) : "";
  }
  return Pl;
}
var tp = ss.codes.ERR_STREAM_PREMATURE_CLOSE;
function NA(r) {
  var t = !1;
  return function() {
    if (!t) {
      t = !0;
      for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++)
        n[i] = arguments[i];
      r.apply(this, n);
    }
  };
}
function CA() {
}
function FA(r) {
  return r.setHeader && typeof r.abort == "function";
}
function Fw(r, t, e) {
  if (typeof t == "function") return Fw(r, null, t);
  t || (t = {}), e = NA(e || CA);
  var n = t.readable || t.readable !== !1 && r.readable, i = t.writable || t.writable !== !1 && r.writable, s = function() {
    r.writable || u();
  }, a = r._writableState && r._writableState.finished, u = function() {
    i = !1, a = !0, n || e.call(r);
  }, l = r._readableState && r._readableState.endEmitted, p = function() {
    n = !1, l = !0, i || e.call(r);
  }, f = function(R) {
    e.call(r, R);
  }, h = function() {
    var R;
    if (n && !l)
      return (!r._readableState || !r._readableState.ended) && (R = new tp()), e.call(r, R);
    if (i && !a)
      return (!r._writableState || !r._writableState.ended) && (R = new tp()), e.call(r, R);
  }, b = function() {
    r.req.on("finish", u);
  };
  return FA(r) ? (r.on("complete", u), r.on("abort", h), r.req ? b() : r.on("request", b)) : i && !r._writableState && (r.on("end", s), r.on("close", s)), r.on("end", p), r.on("finish", u), t.error !== !1 && r.on("error", f), r.on("close", h), function() {
    r.removeListener("complete", u), r.removeListener("abort", h), r.removeListener("request", b), r.req && r.req.removeListener("finish", u), r.removeListener("end", s), r.removeListener("close", s), r.removeListener("finish", u), r.removeListener("end", p), r.removeListener("error", f), r.removeListener("close", h);
  };
}
var cf = Fw, Ol, ep;
function zA() {
  if (ep) return Ol;
  ep = 1;
  var r;
  function t(C, U, M) {
    return U = e(U), U in C ? Object.defineProperty(C, U, { value: M, enumerable: !0, configurable: !0, writable: !0 }) : C[U] = M, C;
  }
  function e(C) {
    var U = n(C, "string");
    return typeof U == "symbol" ? U : String(U);
  }
  function n(C, U) {
    if (typeof C != "object" || C === null) return C;
    var M = C[Symbol.toPrimitive];
    if (M !== void 0) {
      var V = M.call(C, U || "default");
      if (typeof V != "object") return V;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (U === "string" ? String : Number)(C);
  }
  var i = cf, s = Symbol("lastResolve"), a = Symbol("lastReject"), u = Symbol("error"), l = Symbol("ended"), p = Symbol("lastPromise"), f = Symbol("handlePromise"), h = Symbol("stream");
  function b(C, U) {
    return {
      value: C,
      done: U
    };
  }
  function k(C) {
    var U = C[s];
    if (U !== null) {
      var M = C[h].read();
      M !== null && (C[p] = null, C[s] = null, C[a] = null, U(b(M, !1)));
    }
  }
  function R(C) {
    Bt.nextTick(k, C);
  }
  function x(C, U) {
    return function(M, V) {
      C.then(function() {
        if (U[l]) {
          M(b(void 0, !0));
          return;
        }
        U[f](M, V);
      }, V);
    };
  }
  var S = Object.getPrototypeOf(function() {
  }), m = Object.setPrototypeOf((r = {
    get stream() {
      return this[h];
    },
    next: function() {
      var U = this, M = this[u];
      if (M !== null)
        return Promise.reject(M);
      if (this[l])
        return Promise.resolve(b(void 0, !0));
      if (this[h].destroyed)
        return new Promise(function(tt, ht) {
          Bt.nextTick(function() {
            U[u] ? ht(U[u]) : tt(b(void 0, !0));
          });
        });
      var V = this[p], Z;
      if (V)
        Z = new Promise(x(V, this));
      else {
        var K = this[h].read();
        if (K !== null)
          return Promise.resolve(b(K, !1));
        Z = new Promise(this[f]);
      }
      return this[p] = Z, Z;
    }
  }, t(r, Symbol.asyncIterator, function() {
    return this;
  }), t(r, "return", function() {
    var U = this;
    return new Promise(function(M, V) {
      U[h].destroy(null, function(Z) {
        if (Z) {
          V(Z);
          return;
        }
        M(b(void 0, !0));
      });
    });
  }), r), S), B = function(U) {
    var M, V = Object.create(m, (M = {}, t(M, h, {
      value: U,
      writable: !0
    }), t(M, s, {
      value: null,
      writable: !0
    }), t(M, a, {
      value: null,
      writable: !0
    }), t(M, u, {
      value: null,
      writable: !0
    }), t(M, l, {
      value: U._readableState.endEmitted,
      writable: !0
    }), t(M, f, {
      value: function(K, tt) {
        var ht = V[h].read();
        ht ? (V[p] = null, V[s] = null, V[a] = null, K(b(ht, !1))) : (V[s] = K, V[a] = tt);
      },
      writable: !0
    }), M));
    return V[p] = null, i(U, function(Z) {
      if (Z && Z.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var K = V[a];
        K !== null && (V[p] = null, V[s] = null, V[a] = null, K(Z)), V[u] = Z;
        return;
      }
      var tt = V[s];
      tt !== null && (V[p] = null, V[s] = null, V[a] = null, tt(b(void 0, !0))), V[l] = !0;
    }), U.on("readable", R.bind(null, V)), V;
  };
  return Ol = B, Ol;
}
var Tl, rp;
function LA() {
  return rp || (rp = 1, Tl = function() {
    throw new Error("Readable.from is not available in the browser");
  }), Tl;
}
var Nl, np;
function zw() {
  if (np) return Nl;
  np = 1, Nl = tt;
  var r;
  tt.ReadableState = K, uw.EventEmitter;
  var t = function(I, J) {
    return I.listeners(J).length;
  }, e = lw, n = ou.Buffer, i = (typeof ci < "u" ? ci : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function s(v) {
    return n.from(v);
  }
  function a(v) {
    return n.isBuffer(v) || v instanceof i;
  }
  var u = X_, l;
  u && u.debuglog ? l = u.debuglog("stream") : l = function() {
  };
  var p = bA(), f = Ow, h = Nw, b = h.getHighWaterMark, k = ss.codes, R = k.ERR_INVALID_ARG_TYPE, x = k.ERR_STREAM_PUSH_AFTER_EOF, S = k.ERR_METHOD_NOT_IMPLEMENTED, m = k.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, B, C, U;
  Ta(tt, e);
  var M = f.errorOrDestroy, V = ["error", "close", "destroy", "pause", "resume"];
  function Z(v, I, J) {
    if (typeof v.prependListener == "function") return v.prependListener(I, J);
    !v._events || !v._events[I] ? v.on(I, J) : Array.isArray(v._events[I]) ? v._events[I].unshift(J) : v._events[I] = [J, v._events[I]];
  }
  function K(v, I, J) {
    r = r || Pa(), v = v || {}, typeof J != "boolean" && (J = I instanceof r), this.objectMode = !!v.objectMode, J && (this.objectMode = this.objectMode || !!v.readableObjectMode), this.highWaterMark = b(this, v, "readableHighWaterMark", J), this.buffer = new p(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = v.emitClose !== !1, this.autoDestroy = !!v.autoDestroy, this.destroyed = !1, this.defaultEncoding = v.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, v.encoding && (B || (B = Xd().StringDecoder), this.decoder = new B(v.encoding), this.encoding = v.encoding);
  }
  function tt(v) {
    if (r = r || Pa(), !(this instanceof tt)) return new tt(v);
    var I = this instanceof r;
    this._readableState = new K(v, this, I), this.readable = !0, v && (typeof v.read == "function" && (this._read = v.read), typeof v.destroy == "function" && (this._destroy = v.destroy)), e.call(this);
  }
  Object.defineProperty(tt.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(I) {
      this._readableState && (this._readableState.destroyed = I);
    }
  }), tt.prototype.destroy = f.destroy, tt.prototype._undestroy = f.undestroy, tt.prototype._destroy = function(v, I) {
    I(v);
  }, tt.prototype.push = function(v, I) {
    var J = this._readableState, nt;
    return J.objectMode ? nt = !0 : typeof v == "string" && (I = I || J.defaultEncoding, I !== J.encoding && (v = n.from(v, I), I = ""), nt = !0), ht(this, v, I, !1, nt);
  }, tt.prototype.unshift = function(v) {
    return ht(this, v, null, !0, !1);
  };
  function ht(v, I, J, nt, Pt) {
    l("readableAddChunk", I);
    var yt = v._readableState;
    if (I === null)
      yt.reading = !1, at(v, yt);
    else {
      var St;
      if (Pt || (St = kt(yt, I)), St)
        M(v, St);
      else if (yt.objectMode || I && I.length > 0)
        if (typeof I != "string" && !yt.objectMode && Object.getPrototypeOf(I) !== n.prototype && (I = s(I)), nt)
          yt.endEmitted ? M(v, new m()) : wt(v, yt, I, !0);
        else if (yt.ended)
          M(v, new x());
        else {
          if (yt.destroyed)
            return !1;
          yt.reading = !1, yt.decoder && !J ? (I = yt.decoder.write(I), yt.objectMode || I.length !== 0 ? wt(v, yt, I, !1) : vt(v, yt)) : wt(v, yt, I, !1);
        }
      else nt || (yt.reading = !1, vt(v, yt));
    }
    return !yt.ended && (yt.length < yt.highWaterMark || yt.length === 0);
  }
  function wt(v, I, J, nt) {
    I.flowing && I.length === 0 && !I.sync ? (I.awaitDrain = 0, v.emit("data", J)) : (I.length += I.objectMode ? 1 : J.length, nt ? I.buffer.unshift(J) : I.buffer.push(J), I.needReadable && gt(v)), vt(v, I);
  }
  function kt(v, I) {
    var J;
    return !a(I) && typeof I != "string" && I !== void 0 && !v.objectMode && (J = new R("chunk", ["string", "Buffer", "Uint8Array"], I)), J;
  }
  tt.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, tt.prototype.setEncoding = function(v) {
    B || (B = Xd().StringDecoder);
    var I = new B(v);
    this._readableState.decoder = I, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var J = this._readableState.buffer.head, nt = ""; J !== null; )
      nt += I.write(J.data), J = J.next;
    return this._readableState.buffer.clear(), nt !== "" && this._readableState.buffer.push(nt), this._readableState.length = nt.length, this;
  };
  var Nt = 1073741824;
  function jt(v) {
    return v >= Nt ? v = Nt : (v--, v |= v >>> 1, v |= v >>> 2, v |= v >>> 4, v |= v >>> 8, v |= v >>> 16, v++), v;
  }
  function X(v, I) {
    return v <= 0 || I.length === 0 && I.ended ? 0 : I.objectMode ? 1 : v !== v ? I.flowing && I.length ? I.buffer.head.data.length : I.length : (v > I.highWaterMark && (I.highWaterMark = jt(v)), v <= I.length ? v : I.ended ? I.length : (I.needReadable = !0, 0));
  }
  tt.prototype.read = function(v) {
    l("read", v), v = parseInt(v, 10);
    var I = this._readableState, J = v;
    if (v !== 0 && (I.emittedReadable = !1), v === 0 && I.needReadable && ((I.highWaterMark !== 0 ? I.length >= I.highWaterMark : I.length > 0) || I.ended))
      return l("read: emitReadable", I.length, I.ended), I.length === 0 && I.ended ? G(this) : gt(this), null;
    if (v = X(v, I), v === 0 && I.ended)
      return I.length === 0 && G(this), null;
    var nt = I.needReadable;
    l("need readable", nt), (I.length === 0 || I.length - v < I.highWaterMark) && (nt = !0, l("length less than watermark", nt)), I.ended || I.reading ? (nt = !1, l("reading or ended", nt)) : nt && (l("do read"), I.reading = !0, I.sync = !0, I.length === 0 && (I.needReadable = !0), this._read(I.highWaterMark), I.sync = !1, I.reading || (v = X(J, I)));
    var Pt;
    return v > 0 ? Pt = O(v, I) : Pt = null, Pt === null ? (I.needReadable = I.length <= I.highWaterMark, v = 0) : (I.length -= v, I.awaitDrain = 0), I.length === 0 && (I.ended || (I.needReadable = !0), J !== v && I.ended && G(this)), Pt !== null && this.emit("data", Pt), Pt;
  };
  function at(v, I) {
    if (l("onEofChunk"), !I.ended) {
      if (I.decoder) {
        var J = I.decoder.end();
        J && J.length && (I.buffer.push(J), I.length += I.objectMode ? 1 : J.length);
      }
      I.ended = !0, I.sync ? gt(v) : (I.needReadable = !1, I.emittedReadable || (I.emittedReadable = !0, At(v)));
    }
  }
  function gt(v) {
    var I = v._readableState;
    l("emitReadable", I.needReadable, I.emittedReadable), I.needReadable = !1, I.emittedReadable || (l("emitReadable", I.flowing), I.emittedReadable = !0, Bt.nextTick(At, v));
  }
  function At(v) {
    var I = v._readableState;
    l("emitReadable_", I.destroyed, I.length, I.ended), !I.destroyed && (I.length || I.ended) && (v.emit("readable"), I.emittedReadable = !1), I.needReadable = !I.flowing && !I.ended && I.length <= I.highWaterMark, T(v);
  }
  function vt(v, I) {
    I.readingMore || (I.readingMore = !0, Bt.nextTick(Ct, v, I));
  }
  function Ct(v, I) {
    for (; !I.reading && !I.ended && (I.length < I.highWaterMark || I.flowing && I.length === 0); ) {
      var J = I.length;
      if (l("maybeReadMore read 0"), v.read(0), J === I.length)
        break;
    }
    I.readingMore = !1;
  }
  tt.prototype._read = function(v) {
    M(this, new S("_read()"));
  }, tt.prototype.pipe = function(v, I) {
    var J = this, nt = this._readableState;
    switch (nt.pipesCount) {
      case 0:
        nt.pipes = v;
        break;
      case 1:
        nt.pipes = [nt.pipes, v];
        break;
      default:
        nt.pipes.push(v);
        break;
    }
    nt.pipesCount += 1, l("pipe count=%d opts=%j", nt.pipesCount, I);
    var Pt = (!I || I.end !== !1) && v !== Bt.stdout && v !== Bt.stderr, yt = Pt ? Ne : Me;
    nt.endEmitted ? Bt.nextTick(yt) : J.once("end", yt), v.on("unpipe", St);
    function St(Xe, ie) {
      l("onunpipe"), Xe === J && ie && ie.hasUnpiped === !1 && (ie.hasUnpiped = !0, _i());
    }
    function Ne() {
      l("onend"), v.end();
    }
    var $ = Vt(J);
    v.on("drain", $);
    var Ye = !1;
    function _i() {
      l("cleanup"), v.removeListener("close", Ze), v.removeListener("finish", le), v.removeListener("drain", $), v.removeListener("error", Or), v.removeListener("unpipe", St), J.removeListener("end", Ne), J.removeListener("end", Me), J.removeListener("data", fi), Ye = !0, nt.awaitDrain && (!v._writableState || v._writableState.needDrain) && $();
    }
    J.on("data", fi);
    function fi(Xe) {
      l("ondata");
      var ie = v.write(Xe);
      l("dest.write", ie), ie === !1 && ((nt.pipesCount === 1 && nt.pipes === v || nt.pipesCount > 1 && ot(nt.pipes, v) !== -1) && !Ye && (l("false write response, pause", nt.awaitDrain), nt.awaitDrain++), J.pause());
    }
    function Or(Xe) {
      l("onerror", Xe), Me(), v.removeListener("error", Or), t(v, "error") === 0 && M(v, Xe);
    }
    Z(v, "error", Or);
    function Ze() {
      v.removeListener("finish", le), Me();
    }
    v.once("close", Ze);
    function le() {
      l("onfinish"), v.removeListener("close", Ze), Me();
    }
    v.once("finish", le);
    function Me() {
      l("unpipe"), J.unpipe(v);
    }
    return v.emit("pipe", J), nt.flowing || (l("pipe resume"), J.resume()), v;
  };
  function Vt(v) {
    return function() {
      var J = v._readableState;
      l("pipeOnDrain", J.awaitDrain), J.awaitDrain && J.awaitDrain--, J.awaitDrain === 0 && t(v, "data") && (J.flowing = !0, T(v));
    };
  }
  tt.prototype.unpipe = function(v) {
    var I = this._readableState, J = {
      hasUnpiped: !1
    };
    if (I.pipesCount === 0) return this;
    if (I.pipesCount === 1)
      return v && v !== I.pipes ? this : (v || (v = I.pipes), I.pipes = null, I.pipesCount = 0, I.flowing = !1, v && v.emit("unpipe", this, J), this);
    if (!v) {
      var nt = I.pipes, Pt = I.pipesCount;
      I.pipes = null, I.pipesCount = 0, I.flowing = !1;
      for (var yt = 0; yt < Pt; yt++) nt[yt].emit("unpipe", this, {
        hasUnpiped: !1
      });
      return this;
    }
    var St = ot(I.pipes, v);
    return St === -1 ? this : (I.pipes.splice(St, 1), I.pipesCount -= 1, I.pipesCount === 1 && (I.pipes = I.pipes[0]), v.emit("unpipe", this, J), this);
  }, tt.prototype.on = function(v, I) {
    var J = e.prototype.on.call(this, v, I), nt = this._readableState;
    return v === "data" ? (nt.readableListening = this.listenerCount("readable") > 0, nt.flowing !== !1 && this.resume()) : v === "readable" && !nt.endEmitted && !nt.readableListening && (nt.readableListening = nt.needReadable = !0, nt.flowing = !1, nt.emittedReadable = !1, l("on readable", nt.length, nt.reading), nt.length ? gt(this) : nt.reading || Bt.nextTick(H, this)), J;
  }, tt.prototype.addListener = tt.prototype.on, tt.prototype.removeListener = function(v, I) {
    var J = e.prototype.removeListener.call(this, v, I);
    return v === "readable" && Bt.nextTick(F, this), J;
  }, tt.prototype.removeAllListeners = function(v) {
    var I = e.prototype.removeAllListeners.apply(this, arguments);
    return (v === "readable" || v === void 0) && Bt.nextTick(F, this), I;
  };
  function F(v) {
    var I = v._readableState;
    I.readableListening = v.listenerCount("readable") > 0, I.resumeScheduled && !I.paused ? I.flowing = !0 : v.listenerCount("data") > 0 && v.resume();
  }
  function H(v) {
    l("readable nexttick read 0"), v.read(0);
  }
  tt.prototype.resume = function() {
    var v = this._readableState;
    return v.flowing || (l("resume"), v.flowing = !v.readableListening, Q(this, v)), v.paused = !1, this;
  };
  function Q(v, I) {
    I.resumeScheduled || (I.resumeScheduled = !0, Bt.nextTick(lt, v, I));
  }
  function lt(v, I) {
    l("resume", I.reading), I.reading || v.read(0), I.resumeScheduled = !1, v.emit("resume"), T(v), I.flowing && !I.reading && v.read(0);
  }
  tt.prototype.pause = function() {
    return l("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (l("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function T(v) {
    var I = v._readableState;
    for (l("flow", I.flowing); I.flowing && v.read() !== null; ) ;
  }
  tt.prototype.wrap = function(v) {
    var I = this, J = this._readableState, nt = !1;
    v.on("end", function() {
      if (l("wrapped end"), J.decoder && !J.ended) {
        var St = J.decoder.end();
        St && St.length && I.push(St);
      }
      I.push(null);
    }), v.on("data", function(St) {
      if (l("wrapped data"), J.decoder && (St = J.decoder.write(St)), !(J.objectMode && St == null) && !(!J.objectMode && (!St || !St.length))) {
        var Ne = I.push(St);
        Ne || (nt = !0, v.pause());
      }
    });
    for (var Pt in v)
      this[Pt] === void 0 && typeof v[Pt] == "function" && (this[Pt] = /* @__PURE__ */ function(Ne) {
        return function() {
          return v[Ne].apply(v, arguments);
        };
      }(Pt));
    for (var yt = 0; yt < V.length; yt++)
      v.on(V[yt], this.emit.bind(this, V[yt]));
    return this._read = function(St) {
      l("wrapped _read", St), nt && (nt = !1, v.resume());
    }, this;
  }, typeof Symbol == "function" && (tt.prototype[Symbol.asyncIterator] = function() {
    return C === void 0 && (C = zA()), C(this);
  }), Object.defineProperty(tt.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(tt.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(tt.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(I) {
      this._readableState && (this._readableState.flowing = I);
    }
  }), tt._fromList = O, Object.defineProperty(tt.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function O(v, I) {
    if (I.length === 0) return null;
    var J;
    return I.objectMode ? J = I.buffer.shift() : !v || v >= I.length ? (I.decoder ? J = I.buffer.join("") : I.buffer.length === 1 ? J = I.buffer.first() : J = I.buffer.concat(I.length), I.buffer.clear()) : J = I.buffer.consume(v, I.decoder), J;
  }
  function G(v) {
    var I = v._readableState;
    l("endReadable", I.endEmitted), I.endEmitted || (I.ended = !0, Bt.nextTick(Y, I, v));
  }
  function Y(v, I) {
    if (l("endReadableNT", v.endEmitted, v.length), !v.endEmitted && v.length === 0 && (v.endEmitted = !0, I.readable = !1, I.emit("end"), v.autoDestroy)) {
      var J = I._writableState;
      (!J || J.autoDestroy && J.finished) && I.destroy();
    }
  }
  typeof Symbol == "function" && (tt.from = function(v, I) {
    return U === void 0 && (U = LA()), U(tt, v, I);
  });
  function ot(v, I) {
    for (var J = 0, nt = v.length; J < nt; J++)
      if (v[J] === I) return J;
    return -1;
  }
  return Nl;
}
var Lw = rn, _u = ss.codes, UA = _u.ERR_METHOD_NOT_IMPLEMENTED, DA = _u.ERR_MULTIPLE_CALLBACK, MA = _u.ERR_TRANSFORM_ALREADY_TRANSFORMING, jA = _u.ERR_TRANSFORM_WITH_LENGTH_0, fu = Pa();
Ta(rn, fu);
function GA(r, t) {
  var e = this._transformState;
  e.transforming = !1;
  var n = e.writecb;
  if (n === null)
    return this.emit("error", new DA());
  e.writechunk = null, e.writecb = null, t != null && this.push(t), n(r);
  var i = this._readableState;
  i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
}
function rn(r) {
  if (!(this instanceof rn)) return new rn(r);
  fu.call(this, r), this._transformState = {
    afterTransform: GA.bind(this),
    needTransform: !1,
    transforming: !1,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }, this._readableState.needReadable = !0, this._readableState.sync = !1, r && (typeof r.transform == "function" && (this._transform = r.transform), typeof r.flush == "function" && (this._flush = r.flush)), this.on("prefinish", HA);
}
function HA() {
  var r = this;
  typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(t, e) {
    ip(r, t, e);
  }) : ip(this, null, null);
}
rn.prototype.push = function(r, t) {
  return this._transformState.needTransform = !1, fu.prototype.push.call(this, r, t);
};
rn.prototype._transform = function(r, t, e) {
  e(new UA("_transform()"));
};
rn.prototype._write = function(r, t, e) {
  var n = this._transformState;
  if (n.writecb = e, n.writechunk = r, n.writeencoding = t, !n.transforming) {
    var i = this._readableState;
    (n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark);
  }
};
rn.prototype._read = function(r) {
  var t = this._transformState;
  t.writechunk !== null && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0;
};
rn.prototype._destroy = function(r, t) {
  fu.prototype._destroy.call(this, r, function(e) {
    t(e);
  });
};
function ip(r, t, e) {
  if (t) return r.emit("error", t);
  if (e != null && r.push(e), r._writableState.length) throw new jA();
  if (r._transformState.transforming) throw new MA();
  return r.push(null);
}
var VA = fo, Uw = Lw;
Ta(fo, Uw);
function fo(r) {
  if (!(this instanceof fo)) return new fo(r);
  Uw.call(this, r);
}
fo.prototype._transform = function(r, t, e) {
  e(null, r);
};
var Cl;
function QA(r) {
  var t = !1;
  return function() {
    t || (t = !0, r.apply(void 0, arguments));
  };
}
var Dw = ss.codes, JA = Dw.ERR_MISSING_ARGS, WA = Dw.ERR_STREAM_DESTROYED;
function sp(r) {
  if (r) throw r;
}
function KA(r) {
  return r.setHeader && typeof r.abort == "function";
}
function $A(r, t, e, n) {
  n = QA(n);
  var i = !1;
  r.on("close", function() {
    i = !0;
  }), Cl === void 0 && (Cl = cf), Cl(r, {
    readable: t,
    writable: e
  }, function(a) {
    if (a) return n(a);
    i = !0, n();
  });
  var s = !1;
  return function(a) {
    if (!i && !s) {
      if (s = !0, KA(r)) return r.abort();
      if (typeof r.destroy == "function") return r.destroy();
      n(a || new WA("pipe"));
    }
  };
}
function ap(r) {
  r();
}
function qA(r, t) {
  return r.pipe(t);
}
function YA(r) {
  return !r.length || typeof r[r.length - 1] != "function" ? sp : r.pop();
}
function ZA() {
  for (var r = arguments.length, t = new Array(r), e = 0; e < r; e++)
    t[e] = arguments[e];
  var n = YA(t);
  if (Array.isArray(t[0]) && (t = t[0]), t.length < 2)
    throw new JA("streams");
  var i, s = t.map(function(a, u) {
    var l = u < t.length - 1, p = u > 0;
    return $A(a, l, p, function(f) {
      i || (i = f), f && s.forEach(ap), !l && (s.forEach(ap), n(i));
    });
  });
  return t.reduce(qA);
}
var XA = ZA;
(function(r, t) {
  t = r.exports = zw(), t.Stream = t, t.Readable = t, t.Writable = Cw(), t.Duplex = Pa(), t.Transform = Lw, t.PassThrough = VA, t.finished = cf, t.pipeline = XA;
})(g_, g_.exports);
var Mw = g_.exports;
const { Transform: tI } = Mw;
var eI = (r) => class jw extends tI {
  constructor(e, n, i, s, a) {
    super(a), this._rate = e, this._capacity = n, this._delimitedSuffix = i, this._hashBitLength = s, this._options = a, this._state = new r(), this._state.initialize(e, n), this._finalized = !1;
  }
  _transform(e, n, i) {
    let s = null;
    try {
      this.update(e, n);
    } catch (a) {
      s = a;
    }
    i(s);
  }
  _flush(e) {
    let n = null;
    try {
      this.push(this.digest());
    } catch (i) {
      n = i;
    }
    e(n);
  }
  update(e, n) {
    if (!Oe.isBuffer(e) && typeof e != "string") throw new TypeError("Data must be a string or a buffer");
    if (this._finalized) throw new Error("Digest already called");
    return Oe.isBuffer(e) || (e = Oe.from(e, n)), this._state.absorb(e), this;
  }
  digest(e) {
    if (this._finalized) throw new Error("Digest already called");
    this._finalized = !0, this._delimitedSuffix && this._state.absorbLastFewBits(this._delimitedSuffix);
    let n = this._state.squeeze(this._hashBitLength / 8);
    return e !== void 0 && (n = n.toString(e)), this._resetState(), n;
  }
  // remove result from memory
  _resetState() {
    return this._state.initialize(this._rate, this._capacity), this;
  }
  // because sometimes we need hash right now and little later
  _clone() {
    const e = new jw(this._rate, this._capacity, this._delimitedSuffix, this._hashBitLength, this._options);
    return this._state.copy(e._state), e._finalized = this._finalized, e;
  }
};
const { Transform: rI } = Mw;
var nI = (r) => class Gw extends rI {
  constructor(e, n, i, s) {
    super(s), this._rate = e, this._capacity = n, this._delimitedSuffix = i, this._options = s, this._state = new r(), this._state.initialize(e, n), this._finalized = !1;
  }
  _transform(e, n, i) {
    let s = null;
    try {
      this.update(e, n);
    } catch (a) {
      s = a;
    }
    i(s);
  }
  _flush() {
  }
  _read(e) {
    this.push(this.squeeze(e));
  }
  update(e, n) {
    if (!Oe.isBuffer(e) && typeof e != "string") throw new TypeError("Data must be a string or a buffer");
    if (this._finalized) throw new Error("Squeeze already called");
    return Oe.isBuffer(e) || (e = Oe.from(e, n)), this._state.absorb(e), this;
  }
  squeeze(e, n) {
    this._finalized || (this._finalized = !0, this._state.absorbLastFewBits(this._delimitedSuffix));
    let i = this._state.squeeze(e);
    return n !== void 0 && (i = i.toString(n)), i;
  }
  _resetState() {
    return this._state.initialize(this._rate, this._capacity), this;
  }
  _clone() {
    const e = new Gw(this._rate, this._capacity, this._delimitedSuffix, this._options);
    return this._state.copy(e._state), e._finalized = this._finalized, e;
  }
};
const iI = eI, sI = nI;
var aI = function(r) {
  const t = iI(r), e = sI(r);
  return function(n, i) {
    switch (typeof n == "string" ? n.toLowerCase() : n) {
      case "keccak224":
        return new t(1152, 448, null, 224, i);
      case "keccak256":
        return new t(1088, 512, null, 256, i);
      case "keccak384":
        return new t(832, 768, null, 384, i);
      case "keccak512":
        return new t(576, 1024, null, 512, i);
      case "sha3-224":
        return new t(1152, 448, 6, 224, i);
      case "sha3-256":
        return new t(1088, 512, 6, 256, i);
      case "sha3-384":
        return new t(832, 768, 6, 384, i);
      case "sha3-512":
        return new t(576, 1024, 6, 512, i);
      case "shake128":
        return new e(1344, 256, 31, i);
      case "shake256":
        return new e(1088, 512, 31, i);
      default:
        throw new Error("Invald algorithm: " + n);
    }
  };
}, Hw = {};
const op = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
Hw.p1600 = function(r) {
  for (let t = 0; t < 24; ++t) {
    const e = r[0] ^ r[10] ^ r[20] ^ r[30] ^ r[40], n = r[1] ^ r[11] ^ r[21] ^ r[31] ^ r[41], i = r[2] ^ r[12] ^ r[22] ^ r[32] ^ r[42], s = r[3] ^ r[13] ^ r[23] ^ r[33] ^ r[43], a = r[4] ^ r[14] ^ r[24] ^ r[34] ^ r[44], u = r[5] ^ r[15] ^ r[25] ^ r[35] ^ r[45], l = r[6] ^ r[16] ^ r[26] ^ r[36] ^ r[46], p = r[7] ^ r[17] ^ r[27] ^ r[37] ^ r[47], f = r[8] ^ r[18] ^ r[28] ^ r[38] ^ r[48], h = r[9] ^ r[19] ^ r[29] ^ r[39] ^ r[49];
    let b = f ^ (i << 1 | s >>> 31), k = h ^ (s << 1 | i >>> 31);
    const R = r[0] ^ b, x = r[1] ^ k, S = r[10] ^ b, m = r[11] ^ k, B = r[20] ^ b, C = r[21] ^ k, U = r[30] ^ b, M = r[31] ^ k, V = r[40] ^ b, Z = r[41] ^ k;
    b = e ^ (a << 1 | u >>> 31), k = n ^ (u << 1 | a >>> 31);
    const K = r[2] ^ b, tt = r[3] ^ k, ht = r[12] ^ b, wt = r[13] ^ k, kt = r[22] ^ b, Nt = r[23] ^ k, jt = r[32] ^ b, X = r[33] ^ k, at = r[42] ^ b, gt = r[43] ^ k;
    b = i ^ (l << 1 | p >>> 31), k = s ^ (p << 1 | l >>> 31);
    const At = r[4] ^ b, vt = r[5] ^ k, Ct = r[14] ^ b, Vt = r[15] ^ k, F = r[24] ^ b, H = r[25] ^ k, Q = r[34] ^ b, lt = r[35] ^ k, T = r[44] ^ b, O = r[45] ^ k;
    b = a ^ (f << 1 | h >>> 31), k = u ^ (h << 1 | f >>> 31);
    const G = r[6] ^ b, Y = r[7] ^ k, ot = r[16] ^ b, v = r[17] ^ k, I = r[26] ^ b, J = r[27] ^ k, nt = r[36] ^ b, Pt = r[37] ^ k, yt = r[46] ^ b, St = r[47] ^ k;
    b = l ^ (e << 1 | n >>> 31), k = p ^ (n << 1 | e >>> 31);
    const Ne = r[8] ^ b, $ = r[9] ^ k, Ye = r[18] ^ b, _i = r[19] ^ k, fi = r[28] ^ b, Or = r[29] ^ k, Ze = r[38] ^ b, le = r[39] ^ k, Me = r[48] ^ b, Xe = r[49] ^ k, ie = R, za = x, y = m << 4 | S >>> 28, _ = S << 4 | m >>> 28, d = B << 3 | C >>> 29, A = C << 3 | B >>> 29, P = M << 9 | U >>> 23, L = U << 9 | M >>> 23, W = V << 18 | Z >>> 14, It = Z << 18 | V >>> 14, Qt = K << 1 | tt >>> 31, Gt = tt << 1 | K >>> 31, Jt = wt << 12 | ht >>> 20, Mt = ht << 12 | wt >>> 20, hu = kt << 10 | Nt >>> 22, gu = Nt << 10 | kt >>> 22, wu = X << 13 | jt >>> 19, yu = jt << 13 | X >>> 19, bu = at << 2 | gt >>> 30, mu = gt << 2 | at >>> 30, vu = vt << 30 | At >>> 2, Au = At << 30 | vt >>> 2, Iu = Ct << 6 | Vt >>> 26, Eu = Vt << 6 | Ct >>> 26, ku = H << 11 | F >>> 21, xu = F << 11 | H >>> 21, Ru = Q << 15 | lt >>> 17, Su = lt << 15 | Q >>> 17, Bu = O << 29 | T >>> 3, Pu = T << 29 | O >>> 3, Ou = G << 28 | Y >>> 4, Tu = Y << 28 | G >>> 4, Nu = v << 23 | ot >>> 9, Cu = ot << 23 | v >>> 9, Fu = I << 25 | J >>> 7, zu = J << 25 | I >>> 7, Lu = nt << 21 | Pt >>> 11, Uu = Pt << 21 | nt >>> 11, Du = St << 24 | yt >>> 8, Mu = yt << 24 | St >>> 8, ju = Ne << 27 | $ >>> 5, Gu = $ << 27 | Ne >>> 5, Hu = Ye << 20 | _i >>> 12, Vu = _i << 20 | Ye >>> 12, Qu = Or << 7 | fi >>> 25, Ju = fi << 7 | Or >>> 25, Wu = Ze << 8 | le >>> 24, Ku = le << 8 | Ze >>> 24, $u = Me << 14 | Xe >>> 18, qu = Xe << 14 | Me >>> 18;
    r[0] = ie ^ ~Jt & ku, r[1] = za ^ ~Mt & xu, r[10] = Ou ^ ~Hu & d, r[11] = Tu ^ ~Vu & A, r[20] = Qt ^ ~Iu & Fu, r[21] = Gt ^ ~Eu & zu, r[30] = ju ^ ~y & hu, r[31] = Gu ^ ~_ & gu, r[40] = vu ^ ~Nu & Qu, r[41] = Au ^ ~Cu & Ju, r[2] = Jt ^ ~ku & Lu, r[3] = Mt ^ ~xu & Uu, r[12] = Hu ^ ~d & wu, r[13] = Vu ^ ~A & yu, r[22] = Iu ^ ~Fu & Wu, r[23] = Eu ^ ~zu & Ku, r[32] = y ^ ~hu & Ru, r[33] = _ ^ ~gu & Su, r[42] = Nu ^ ~Qu & P, r[43] = Cu ^ ~Ju & L, r[4] = ku ^ ~Lu & $u, r[5] = xu ^ ~Uu & qu, r[14] = d ^ ~wu & Bu, r[15] = A ^ ~yu & Pu, r[24] = Fu ^ ~Wu & W, r[25] = zu ^ ~Ku & It, r[34] = hu ^ ~Ru & Du, r[35] = gu ^ ~Su & Mu, r[44] = Qu ^ ~P & bu, r[45] = Ju ^ ~L & mu, r[6] = Lu ^ ~$u & ie, r[7] = Uu ^ ~qu & za, r[16] = wu ^ ~Bu & Ou, r[17] = yu ^ ~Pu & Tu, r[26] = Wu ^ ~W & Qt, r[27] = Ku ^ ~It & Gt, r[36] = Ru ^ ~Du & ju, r[37] = Su ^ ~Mu & Gu, r[46] = P ^ ~bu & vu, r[47] = L ^ ~mu & Au, r[8] = $u ^ ~ie & Jt, r[9] = qu ^ ~za & Mt, r[18] = Bu ^ ~Ou & Hu, r[19] = Pu ^ ~Tu & Vu, r[28] = W ^ ~Qt & Iu, r[29] = It ^ ~Gt & Eu, r[38] = Du ^ ~ju & y, r[39] = Mu ^ ~Gu & _, r[48] = bu ^ ~vu & Nu, r[49] = mu ^ ~Au & Cu, r[0] ^= op[t * 2], r[1] ^= op[t * 2 + 1];
  }
};
const Tc = Hw;
function Na() {
  this.state = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ], this.blockSize = null, this.count = 0, this.squeezing = !1;
}
Na.prototype.initialize = function(r, t) {
  for (let e = 0; e < 50; ++e) this.state[e] = 0;
  this.blockSize = r / 8, this.count = 0, this.squeezing = !1;
};
Na.prototype.absorb = function(r) {
  for (let t = 0; t < r.length; ++t)
    this.state[~~(this.count / 4)] ^= r[t] << 8 * (this.count % 4), this.count += 1, this.count === this.blockSize && (Tc.p1600(this.state), this.count = 0);
};
Na.prototype.absorbLastFewBits = function(r) {
  this.state[~~(this.count / 4)] ^= r << 8 * (this.count % 4), r & 128 && this.count === this.blockSize - 1 && Tc.p1600(this.state), this.state[~~((this.blockSize - 1) / 4)] ^= 128 << 8 * ((this.blockSize - 1) % 4), Tc.p1600(this.state), this.count = 0, this.squeezing = !0;
};
Na.prototype.squeeze = function(r) {
  this.squeezing || this.absorbLastFewBits(1);
  const t = Oe.alloc(r);
  for (let e = 0; e < r; ++e)
    t[e] = this.state[~~(this.count / 4)] >>> 8 * (this.count % 4) & 255, this.count += 1, this.count === this.blockSize && (Tc.p1600(this.state), this.count = 0);
  return t;
};
Na.prototype.copy = function(r) {
  for (let t = 0; t < 50; ++t) r.state[t] = this.state[t];
  r.blockSize = this.blockSize, r.count = this.count, r.squeezing = this.squeezing;
};
var oI = Na, cI = aI(oI);
const uI = /* @__PURE__ */ e2(cI), lI = () => (async (r) => {
  try {
    return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(r);
  } catch {
    return !1;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
var Vw = typeof hc < "u" ? hc : typeof self < "u" ? self : typeof window < "u" ? window : {};
async function _I(r, t, e) {
  if (e.numThreads() === 0)
    throw new Error("num_threads must be > 0.");
  const n = {
    module: r,
    memory: t,
    receiver: e.receiver()
  };
  await Promise.all(
    Array.from({ length: e.numThreads() }, async () => {
      let i;
      try {
        i = new Worker(
          new URL(
            /* @vite-ignore */
            "/workerHelpers.worker.js",
            import.meta.url
          ),
          {
            type: "module"
          }
        );
      } catch {
        const u = await (await fetch("/workerHelpers.worker.js")).blob(), l = URL.createObjectURL(u);
        i = new Worker(l);
      }
      return i.postMessage(n), await new Promise(
        (s) => i.addEventListener("message", s, { once: !0 })
      ), i;
    })
  ), e.build();
}
let o;
const $r = new Array(128).fill(void 0);
$r.push(void 0, null, !0, !1);
let Ya = $r.length;
function it(r) {
  Ya === $r.length && $r.push($r.length + 1);
  const t = Ya;
  return Ya = $r[t], $r[t] = r, t;
}
function bt(r) {
  return $r[r];
}
function fI(r) {
  r < 132 || ($r[r] = Ya, Ya = r);
}
function w(r) {
  const t = bt(r);
  return fI(r), t;
}
const Qw = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Qw.decode();
let Wa = null;
function Ts() {
  return (Wa === null || Wa.buffer !== o.memory.buffer) && (Wa = new Uint8Array(o.memory.buffer)), Wa;
}
function ds(r, t) {
  return r = r >>> 0, Qw.decode(Ts().slice(r, r + t));
}
let rt = 0;
const Jw = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} }, dI = function(r, t) {
  const e = Jw.encode(r);
  return t.set(e), {
    read: r.length,
    written: e.length
  };
};
function Wo(r, t, e) {
  if (e === void 0) {
    const u = Jw.encode(r), l = t(u.length, 1) >>> 0;
    return Ts().subarray(l, l + u.length).set(u), rt = u.length, l;
  }
  let n = r.length, i = t(n, 1) >>> 0;
  const s = Ts();
  let a = 0;
  for (; a < n; a++) {
    const u = r.charCodeAt(a);
    if (u > 127) break;
    s[i + a] = u;
  }
  if (a !== n) {
    a !== 0 && (r = r.slice(a)), i = e(i, n, n = a + r.length * 3, 1) >>> 0;
    const u = Ts().subarray(i + a, i + n), l = dI(r, u);
    a += l.written, i = e(i, n, a, 1) >>> 0;
  }
  return rt = a, i;
}
function Fl(r) {
  return r == null;
}
let Ka = null;
function c() {
  return (Ka === null || Ka.buffer !== o.memory.buffer) && (Ka = new DataView(o.memory.buffer)), Ka;
}
function R_(r) {
  const t = typeof r;
  if (t == "number" || t == "boolean" || r == null)
    return `${r}`;
  if (t == "string")
    return `"${r}"`;
  if (t == "symbol") {
    const i = r.description;
    return i == null ? "Symbol" : `Symbol(${i})`;
  }
  if (t == "function") {
    const i = r.name;
    return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
  }
  if (Array.isArray(r)) {
    const i = r.length;
    let s = "[";
    i > 0 && (s += R_(r[0]));
    for (let a = 1; a < i; a++)
      s += ", " + R_(r[a]);
    return s += "]", s;
  }
  const e = /\[object ([^\]]+)\]/.exec(toString.call(r));
  let n;
  if (e.length > 1)
    n = e[1];
  else
    return toString.call(r);
  if (n == "Object")
    try {
      return "Object(" + JSON.stringify(r) + ")";
    } catch {
      return "Object";
    }
  return r instanceof Error ? `${r.name}: ${r.message}
${r.stack}` : n;
}
function j(r, t) {
  if (!(r instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return r.ptr;
}
function ut(r, t) {
  return r = r >>> 0, Ts().subarray(r / 1, r / 1 + t);
}
function st(r, t) {
  const e = t(r.length * 1, 1) >>> 0;
  return Ts().set(r, e / 1), rt = r.length, e;
}
function pI() {
  o.init_panic_hook();
}
function hr(r, t) {
  try {
    return r.apply(this, t);
  } catch (e) {
    o.__wbindgen_exn_store(it(e));
  }
}
function hI(r) {
  const t = o.initThreadPool(r);
  return w(t);
}
const gI = Object.freeze({ Proof: 0, 0: "Proof", Verify: 1, 1: "Verify" });
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_boolean_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_booleanciphertext_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_booleanclientkey_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_booleancompressedciphertext_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_booleancompressedserverkey_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_booleannoisedistribution_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_booleanparameters_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_booleanpublickey_free(r >>> 0, 1));
const cp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_compactciphertextlist_free(r >>> 0, 1));
class Ki {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ki.prototype);
    return e.__wbg_ptr = t, cp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_compactciphertextlist_free(t, 0);
  }
  /**
  * @param {TfheCompactPublicKey} public_key
  * @returns {CompactCiphertextListBuilder}
  */
  static builder(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, lr), o.compactciphertextlist_builder(s, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return du.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {number}
  */
  len() {
    return o.compactciphertextlist_len(this.__wbg_ptr) >>> 0;
  }
  /**
  * @returns {boolean}
  */
  is_empty() {
    return o.compactciphertextlist_is_empty(this.__wbg_ptr) !== 0;
  }
  /**
  * @param {number} index
  * @returns {FheTypes | undefined}
  */
  get_kind_of(t) {
    const e = o.compactciphertextlist_get_kind_of(this.__wbg_ptr, t);
    return e === 30 ? void 0 : e;
  }
  /**
  * @returns {CompactCiphertextListExpander}
  */
  expand() {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlist_expand(i, this.__wbg_ptr);
      var t = c().getInt32(i + 4 * 0, !0), e = c().getInt32(i + 4 * 1, !0), n = c().getInt32(i + 4 * 2, !0);
      if (n)
        throw w(e);
      return po.__wrap(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlist_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {CompactCiphertextList}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.compactciphertextlist_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Ki.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlist_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {CompactCiphertextList}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.compactciphertextlist_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Ki.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const up = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_compactciphertextlistbuilder_free(r >>> 0, 1));
class du {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(du.prototype);
    return e.__wbg_ptr = t, up.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, up.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_compactciphertextlistbuilder_free(t, 0);
  }
  /**
  * @param {number} value
  */
  push_u2(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u2(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u4(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u4(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u6(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u6(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u8(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u8(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u10(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u10(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u12(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u12(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u14(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u14(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u16(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u16(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_u32(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u32(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  */
  push_u64(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u64(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i2(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i2(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i4(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i4(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i6(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i6(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i8(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i8(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i10(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i10(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i12(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i12(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i14(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i14(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i16(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i16(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  */
  push_i32(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i32(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  */
  push_i64(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i64(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u128(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u128(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u160(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u160(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u256(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u256(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u512(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u512(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u1024(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u1024(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_u2048(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_u2048(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_i128(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i128(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_i160(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i160(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  */
  push_i256(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_i256(i, this.__wbg_ptr, it(t));
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {boolean} value
  */
  push_boolean(t) {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_push_boolean(i, this.__wbg_ptr, t);
      var e = c().getInt32(i + 4 * 0, !0), n = c().getInt32(i + 4 * 1, !0);
      if (n)
        throw w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {CompactCiphertextList}
  */
  build() {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_build(i, this.__wbg_ptr);
      var t = c().getInt32(i + 4 * 0, !0), e = c().getInt32(i + 4 * 1, !0), n = c().getInt32(i + 4 * 2, !0);
      if (n)
        throw w(e);
      return Ki.__wrap(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {CompactCiphertextList}
  */
  build_packed() {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistbuilder_build_packed(i, this.__wbg_ptr);
      var t = c().getInt32(i + 4 * 0, !0), e = c().getInt32(i + 4 * 1, !0), n = c().getInt32(i + 4 * 2, !0);
      if (n)
        throw w(e);
      return Ki.__wrap(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {CompactPkePublicParams} public_params
  * @param {Uint8Array} metadata
  * @param {ZkComputeLoad} compute_load
  * @returns {ProvenCompactCiphertextList}
  */
  build_with_proof_packed(t, e, n) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, ai);
      const l = st(e, o.__wbindgen_malloc), p = rt;
      o.compactciphertextlistbuilder_build_with_proof_packed(u, this.__wbg_ptr, t.__wbg_ptr, l, p, n);
      var i = c().getInt32(u + 4 * 0, !0), s = c().getInt32(u + 4 * 1, !0), a = c().getInt32(u + 4 * 2, !0);
      if (a)
        throw w(s);
      return Za.__wrap(i);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const lp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_compactciphertextlistexpander_free(r >>> 0, 1));
class po {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(po.prototype);
    return e.__wbg_ptr = t, lp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_compactciphertextlistexpander_free(t, 0);
  }
  /**
  * @param {number} index
  * @returns {FheUint2}
  */
  get_uint2(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint2(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Tn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint4}
  */
  get_uint4(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint4(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return zn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint6}
  */
  get_uint6(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint6(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Un.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint8}
  */
  get_uint8(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint8(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Mn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint10}
  */
  get_uint10(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint10(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return kn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint12}
  */
  get_uint12(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint12(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Rn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint14}
  */
  get_uint14(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint14(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Bn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint16}
  */
  get_uint16(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint16(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Pn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint32}
  */
  get_uint32(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint32(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Fn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint64}
  */
  get_uint64(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint64(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Dn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint128}
  */
  get_uint128(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint128(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Sn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint160}
  */
  get_uint160(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint160(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return On.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint256}
  */
  get_uint256(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint256(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Cn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint512}
  */
  get_uint512(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint512(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Ln.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint1024}
  */
  get_uint1024(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint1024(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return xn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheUint2048}
  */
  get_uint2048(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_uint2048(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Nn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt2}
  */
  get_int2(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int2(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return yn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt4}
  */
  get_int4(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int4(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return vn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt6}
  */
  get_int6(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int6(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return An.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt8}
  */
  get_int8(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int8(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return En.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt10}
  */
  get_int10(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int10(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return fn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt12}
  */
  get_int12(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int12(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return dn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt14}
  */
  get_int14(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int14(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return hn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt16}
  */
  get_int16(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int16(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return gn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt32}
  */
  get_int32(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int32(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return mn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt64}
  */
  get_int64(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int64(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return In.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt128}
  */
  get_int128(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int128(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return pn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt160}
  */
  get_int160(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int160(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return wn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheInt256}
  */
  get_int256(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_int256(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return bn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} index
  * @returns {FheBool}
  */
  get_bool(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactciphertextlistexpander_get_bool(s, this.__wbg_ptr, t);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return _n.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {number}
  */
  len() {
    return o.compactciphertextlistexpander_len(this.__wbg_ptr) >>> 0;
  }
  /**
  * @returns {boolean}
  */
  is_empty() {
    return o.compactciphertextlistexpander_is_empty(this.__wbg_ptr) !== 0;
  }
  /**
  * @param {number} index
  * @returns {FheTypes | undefined}
  */
  get_kind_of(t) {
    const e = o.compactciphertextlistexpander_get_kind_of(this.__wbg_ptr, t);
    return e === 30 ? void 0 : e;
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compactpkecrs_free(r >>> 0, 1));
const _p = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_compactpkepublicparams_free(r >>> 0, 1));
class ai {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(ai.prototype);
    return e.__wbg_ptr = t, _p.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _p.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_compactpkepublicparams_free(t, 0);
  }
  /**
  * @param {boolean} compress
  * @returns {Uint8Array}
  */
  serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactpkepublicparams_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {CompactPkePublicParams}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.compactpkepublicparams_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return ai.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.compactpkepublicparams_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {CompactPkePublicParams}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.compactpkepublicparams_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return ai.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfhebool_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint10_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint12_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint128_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint14_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint16_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint160_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint2_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint256_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint32_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint4_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint6_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint64_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheint8_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint10_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint1024_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint12_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint128_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint14_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint16_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint160_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint2_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint2048_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint256_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint32_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint4_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint512_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint6_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint64_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_compressedfheuint8_free(r >>> 0, 1));
const fp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fhebool_free(r >>> 0, 1));
class _n {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(_n.prototype);
    return e.__wbg_ptr = t, fp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fhebool_free(t, 0);
  }
  /**
  * @param {boolean} value
  * @param {TfheClientKey} client_key
  * @returns {FheBool}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fhebool_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return _n.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {boolean} value
  * @param {TfhePublicKey} public_key
  * @returns {FheBool}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fhebool_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return _n.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {boolean} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheBool}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fhebool_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return _n.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {boolean}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fhebool_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e !== 0;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fhebool_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheBool}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fhebool_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return _n.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fhebool_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheBool}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fhebool_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return _n.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const dp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint10_free(r >>> 0, 1));
class fn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(fn.prototype);
    return e.__wbg_ptr = t, dp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint10_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt10}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint10_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt10}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint10_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt10}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint10_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint10_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt10}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint10_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return fn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint10_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt10}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint10_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const pp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint12_free(r >>> 0, 1));
class dn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(dn.prototype);
    return e.__wbg_ptr = t, pp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint12_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt12}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint12_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt12}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint12_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt12}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint12_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint12_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt12}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint12_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return dn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint12_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt12}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint12_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const hp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint128_free(r >>> 0, 1));
class pn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(pn.prototype);
    return e.__wbg_ptr = t, hp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint128_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt128}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint128_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt128}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint128_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt128}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint128_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint128_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint128_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt128}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint128_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return pn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint128_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt128}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint128_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const gp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint14_free(r >>> 0, 1));
class hn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(hn.prototype);
    return e.__wbg_ptr = t, gp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint14_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt14}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint14_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return hn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt14}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint14_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return hn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt14}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint14_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return hn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint14_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt14}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint14_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return hn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint14_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt14}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint14_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return hn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const wp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint16_free(r >>> 0, 1));
class gn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(gn.prototype);
    return e.__wbg_ptr = t, wp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint16_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt16}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint16_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return gn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt16}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint16_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return gn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt16}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint16_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return gn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint16_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt16}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint16_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return gn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint16_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt16}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint16_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return gn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const yp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint160_free(r >>> 0, 1));
class wn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(wn.prototype);
    return e.__wbg_ptr = t, yp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint160_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt160}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint160_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return wn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt160}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint160_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return wn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt160}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint160_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return wn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint160_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint160_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt160}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint160_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return wn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint160_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt160}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint160_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return wn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const bp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint2_free(r >>> 0, 1));
class yn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(yn.prototype);
    return e.__wbg_ptr = t, bp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint2_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt2}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint2_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return yn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt2}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint2_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return yn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt2}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint2_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return yn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint2_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt2}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint2_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return yn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint2_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt2}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint2_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return yn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const mp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint256_free(r >>> 0, 1));
class bn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(bn.prototype);
    return e.__wbg_ptr = t, mp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint256_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt256}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint256_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt256}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint256_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt256}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint256_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint160_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint256_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt256}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint256_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return bn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint256_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt256}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint256_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const vp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint32_free(r >>> 0, 1));
class mn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(mn.prototype);
    return e.__wbg_ptr = t, vp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint32_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt32}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint32_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt32}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint32_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt32}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint32_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint32_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint32_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt32}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint32_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return mn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint32_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt32}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint32_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Ap = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint4_free(r >>> 0, 1));
class vn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(vn.prototype);
    return e.__wbg_ptr = t, Ap.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ap.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint4_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt4}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint4_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return vn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt4}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint4_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return vn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt4}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint4_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return vn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint4_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt4}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint4_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return vn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint4_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt4}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint4_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return vn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Ip = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint6_free(r >>> 0, 1));
class An {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(An.prototype);
    return e.__wbg_ptr = t, Ip.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ip.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint6_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt6}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint6_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return An.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt6}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint6_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return An.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt6}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint6_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return An.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint6_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt6}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint6_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return An.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint6_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt6}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint6_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return An.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Ep = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint64_free(r >>> 0, 1));
class In {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(In.prototype);
    return e.__wbg_ptr = t, Ep.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ep.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint64_free(t, 0);
  }
  /**
  * @param {bigint} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt64}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint64_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return In.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt64}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint64_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return In.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt64}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint64_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return In.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {bigint}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint64_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getBigInt64(s + 8 * 0, !0), n = c().getInt32(s + 4 * 2, !0), i = c().getInt32(s + 4 * 3, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint64_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt64}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint64_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return In.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint64_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt64}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint64_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return In.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const kp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheint8_free(r >>> 0, 1));
class En {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(En.prototype);
    return e.__wbg_ptr = t, kp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheint8_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheInt8}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheint8_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return En.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheInt8}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheint8_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return En.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheInt8}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheint8_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return En.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint8_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheInt8}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheint8_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return En.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheint8_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheInt8}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheint8_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return En.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const xp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint10_free(r >>> 0, 1));
class kn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(kn.prototype);
    return e.__wbg_ptr = t, xp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint10_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint10}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint10_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return kn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint10}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint10_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return kn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint10}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint10_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return kn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint10_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint10}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint10_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return kn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint10_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint10}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint10_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return kn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Rp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint1024_free(r >>> 0, 1));
class xn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(xn.prototype);
    return e.__wbg_ptr = t, Rp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint1024_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint1024}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint1024_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return xn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint1024}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint1024_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return xn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint1024}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint1024_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return xn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint1024_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint1024_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint1024}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint1024_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return xn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint1024_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint1024}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint1024_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return xn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Sp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint12_free(r >>> 0, 1));
class Rn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Rn.prototype);
    return e.__wbg_ptr = t, Sp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint12_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint12}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint12_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Rn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint12}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint12_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Rn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint12}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint12_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Rn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint12_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint12}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint12_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Rn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint12_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint12}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint12_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Rn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Bp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint128_free(r >>> 0, 1));
class Sn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Sn.prototype);
    return e.__wbg_ptr = t, Bp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint128_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint128}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint128_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Sn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint128}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint128_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Sn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint128}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint128_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Sn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint128_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint128_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint128}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint128_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Sn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint128_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint128}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint128_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Sn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Pp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint14_free(r >>> 0, 1));
class Bn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Bn.prototype);
    return e.__wbg_ptr = t, Pp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Pp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint14_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint14}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint14_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint14}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint14_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint14}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint14_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint14_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint14}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint14_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Bn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint14_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint14}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint14_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Bn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Op = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint16_free(r >>> 0, 1));
class Pn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Pn.prototype);
    return e.__wbg_ptr = t, Op.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Op.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint16_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint16}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint16_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint16}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint16_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint16}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint16_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint10_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint16_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint16}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint16_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Pn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint16_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint16}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint16_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Pn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Tp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint160_free(r >>> 0, 1));
class On {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(On.prototype);
    return e.__wbg_ptr = t, Tp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Tp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint160_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint160}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint160_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return On.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint160}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint160_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return On.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint160}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint160_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return On.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint160_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint160_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint160}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint160_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return On.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint160_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint160}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint160_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return On.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Np = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint2_free(r >>> 0, 1));
class Tn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Tn.prototype);
    return e.__wbg_ptr = t, Np.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Np.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint2_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint2}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint2_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Tn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint2}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint2_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Tn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint2}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint2_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Tn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint2_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint2}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint2_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Tn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint2_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint2}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint2_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Tn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Cp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint2048_free(r >>> 0, 1));
class Nn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Nn.prototype);
    return e.__wbg_ptr = t, Cp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint2048_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint2048}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint2048_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Nn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint2048}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint2048_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Nn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint2048}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint2048_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Nn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint2048_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint2048_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint2048}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint2048_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Nn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint2048_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint2048}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint2048_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Nn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Fp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint256_free(r >>> 0, 1));
class Cn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Cn.prototype);
    return e.__wbg_ptr = t, Fp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint256_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint256}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint256_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Cn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint256}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint256_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Cn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint256}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint256_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Cn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint160_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint256_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint256}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint256_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Cn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint256_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint256}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint256_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Cn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const zp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint32_free(r >>> 0, 1));
class Fn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Fn.prototype);
    return e.__wbg_ptr = t, zp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint32_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint32}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint32_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint32}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint32_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint32}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint32_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint32_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e >>> 0;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint32_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint32}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint32_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Fn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint32_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint32}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint32_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Fn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Lp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint4_free(r >>> 0, 1));
class zn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(zn.prototype);
    return e.__wbg_ptr = t, Lp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint4_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint4}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint4_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return zn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint4}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint4_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return zn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint4}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint4_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return zn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint4_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint4}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint4_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return zn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint4_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint4}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint4_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return zn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Up = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint512_free(r >>> 0, 1));
class Ln {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ln.prototype);
    return e.__wbg_ptr = t, Up.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Up.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint512_free(t, 0);
  }
  /**
  * @param {any} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint512}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint512_encrypt_with_client_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Ln.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint512}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint512_encrypt_with_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Ln.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {any} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint512}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint512_encrypt_with_compressed_public_key(a, it(t), e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Ln.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {any}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint512_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return w(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint512_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint512}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint512_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Ln.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint512_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint512}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint512_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Ln.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Dp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint6_free(r >>> 0, 1));
class Un {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Un.prototype);
    return e.__wbg_ptr = t, Dp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint6_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint6}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint6_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Un.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint6}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint6_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Un.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint6}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint6_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Un.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint6_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint6}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint6_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Un.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint6_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint6}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint6_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Un.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Mp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint64_free(r >>> 0, 1));
class Dn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Dn.prototype);
    return e.__wbg_ptr = t, Mp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint64_free(t, 0);
  }
  /**
  * @param {bigint} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint64}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint64_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint64}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint64_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint64}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint64_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {bigint}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint64_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getBigInt64(s + 8 * 0, !0), n = c().getInt32(s + 4 * 2, !0), i = c().getInt32(s + 4 * 3, !0);
      if (i)
        throw w(n);
      return BigInt.asUintN(64, e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint64_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint64}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint64_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Dn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint64_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint64}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint64_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Dn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const jp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_fheuint8_free(r >>> 0, 1));
class Mn {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Mn.prototype);
    return e.__wbg_ptr = t, jp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_fheuint8_free(t, 0);
  }
  /**
  * @param {number} value
  * @param {TfheClientKey} client_key
  * @returns {FheUint8}
  */
  static encrypt_with_client_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, _t), o.fheuint8_encrypt_with_client_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfhePublicKey} public_key
  * @returns {FheUint8}
  */
  static encrypt_with_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Tt), o.fheuint8_encrypt_with_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {number} value
  * @param {TfheCompressedPublicKey} compressed_public_key
  * @returns {FheUint8}
  */
  static encrypt_with_compressed_public_key(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, Ft), o.fheuint8_encrypt_with_compressed_public_key(a, t, e.__wbg_ptr);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {number}
  */
  decrypt(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.fheuint2_decrypt(s, this.__wbg_ptr, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return e;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint8_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {FheUint8}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.fheuint8_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Mn.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.fheuint8_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {FheUint8}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.fheuint8_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Mn.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Gp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_provencompactciphertextlist_free(r >>> 0, 1));
class Za {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Za.prototype);
    return e.__wbg_ptr = t, Gp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_provencompactciphertextlist_free(t, 0);
  }
  /**
  * @param {TfheCompactPublicKey} public_key
  * @returns {CompactCiphertextListBuilder}
  */
  static builder(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, lr), o.provencompactciphertextlist_builder(s, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return du.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {number}
  */
  len() {
    return o.provencompactciphertextlist_len(this.__wbg_ptr) >>> 0;
  }
  /**
  * @returns {boolean}
  */
  is_empty() {
    return o.provencompactciphertextlist_is_empty(this.__wbg_ptr) !== 0;
  }
  /**
  * @param {number} index
  * @returns {FheTypes | undefined}
  */
  get_kind_of(t) {
    const e = o.provencompactciphertextlist_get_kind_of(this.__wbg_ptr, t);
    return e === 30 ? void 0 : e;
  }
  /**
  * @param {CompactPkePublicParams} public_params
  * @param {TfheCompactPublicKey} public_key
  * @param {Uint8Array} metadata
  * @returns {CompactCiphertextListExpander}
  */
  verify_and_expand(t, e, n) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, ai), j(e, lr);
      const l = st(n, o.__wbindgen_malloc), p = rt;
      o.provencompactciphertextlist_verify_and_expand(u, this.__wbg_ptr, t.__wbg_ptr, e.__wbg_ptr, l, p);
      var i = c().getInt32(u + 4 * 0, !0), s = c().getInt32(u + 4 * 1, !0), a = c().getInt32(u + 4 * 2, !0);
      if (a)
        throw w(s);
      return po.__wrap(i);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {CompactCiphertextListExpander}
  */
  expand_without_verification() {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.provencompactciphertextlist_expand_without_verification(i, this.__wbg_ptr);
      var t = c().getInt32(i + 4 * 0, !0), e = c().getInt32(i + 4 * 1, !0), n = c().getInt32(i + 4 * 2, !0);
      if (n)
        throw w(e);
      return po.__wrap(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.provencompactciphertextlist_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {ProvenCompactCiphertextList}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.provencompactciphertextlist_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Za.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.provencompactciphertextlist_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {ProvenCompactCiphertextList}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.provencompactciphertextlist_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Za.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortint_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortintciphertext_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortintclientkey_free(r >>> 0, 1));
const zl = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_shortintcompactpublickeyencryptionparameters_free(r >>> 0, 1));
class Nc {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Nc.prototype);
    return e.__wbg_ptr = t, zl.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zl.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_shortintcompactpublickeyencryptionparameters_free(t, 0);
  }
  /**
  * @param {ShortintCompactPublicKeyEncryptionParametersName} name
  */
  constructor(t) {
    const e = o.shortintcompactpublickeyencryptionparameters_new(t);
    return this.__wbg_ptr = e >>> 0, zl.register(this, this.__wbg_ptr, this), this;
  }
  /**
  * @param {number} encryption_lwe_dimension
  * @param {ShortintNoiseDistribution} encryption_noise_distribution
  * @param {number} message_modulus
  * @param {number} carry_modulus
  * @param {number} modulus_power_of_2_exponent
  * @param {number} ks_base_log
  * @param {number} ks_level
  * @param {ShortintEncryptionKeyChoice} encryption_key_choice
  * @returns {ShortintCompactPublicKeyEncryptionParameters}
  */
  static new_parameters(t, e, n, i, s, a, u, l) {
    try {
      const b = o.__wbindgen_add_to_stack_pointer(-16);
      j(e, uf), o.shortintcompactpublickeyencryptionparameters_new_parameters(b, t, e.__wbg_ptr, n, i, s, a, u, l);
      var p = c().getInt32(b + 4 * 0, !0), f = c().getInt32(b + 4 * 1, !0), h = c().getInt32(b + 4 * 2, !0);
      if (h)
        throw w(f);
      return Nc.__wrap(p);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortintcompressedciphertext_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortintcompressedpublickey_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortintcompressedserverkey_free(r >>> 0, 1));
const Hp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_shortintnoisedistribution_free(r >>> 0, 1));
class uf {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(uf.prototype);
    return e.__wbg_ptr = t, Hp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_shortintnoisedistribution_free(t, 0);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortintparameters_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_shortintpublickey_free(r >>> 0, 1));
const Vp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_tfheclientkey_free(r >>> 0, 1));
class _t {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(_t.prototype);
    return e.__wbg_ptr = t, Vp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_tfheclientkey_free(t, 0);
  }
  /**
  * @param {TfheConfig} config
  * @returns {TfheClientKey}
  */
  static generate(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, Cc), o.tfheclientkey_generate(s, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return _t.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {TfheConfig} config
  * @param {any} seed
  * @returns {TfheClientKey}
  */
  static generate_with_seed(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, Cc), o.tfheclientkey_generate_with_seed(a, t.__wbg_ptr, it(e));
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return _t.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfheclientkey_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfheClientKey}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.tfheclientkey_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return _t.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfheclientkey_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfheClientKey}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.tfheclientkey_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return _t.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
const Qp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_tfhecompactpublickey_free(r >>> 0, 1));
class lr {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(lr.prototype);
    return e.__wbg_ptr = t, Qp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_tfhecompactpublickey_free(t, 0);
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {TfheCompactPublicKey}
  */
  static new(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.tfhecompactpublickey_new(s, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return lr.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfhecompactpublickey_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfheCompactPublicKey}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.tfhecompactpublickey_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return lr.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfhecompactpublickey_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfheCompactPublicKey}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.tfhecompactpublickey_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return lr.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @param {ShortintCompactPublicKeyEncryptionParameters} conformance_params
  * @returns {TfheCompactPublicKey}
  */
  static safe_deserialize_conformant(t, e, n) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16), l = st(t, o.__wbindgen_malloc), p = rt;
      j(n, Nc), o.tfhecompactpublickey_safe_deserialize_conformant(u, l, p, e, n.__wbg_ptr);
      var i = c().getInt32(u + 4 * 0, !0), s = c().getInt32(u + 4 * 1, !0), a = c().getInt32(u + 4 * 2, !0);
      if (a)
        throw w(s);
      return lr.__wrap(i);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_tfhecompressedcompactpublickey_free(r >>> 0, 1));
const Jp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_tfhecompressedpublickey_free(r >>> 0, 1));
class Ft {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ft.prototype);
    return e.__wbg_ptr = t, Jp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_tfhecompressedpublickey_free(t, 0);
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {TfheCompressedPublicKey}
  */
  static new(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.tfhecompressedpublickey_new(s, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Ft.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {TfhePublicKey}
  */
  decompress() {
    try {
      const i = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfhecompressedpublickey_decompress(i, this.__wbg_ptr);
      var t = c().getInt32(i + 4 * 0, !0), e = c().getInt32(i + 4 * 1, !0), n = c().getInt32(i + 4 * 2, !0);
      if (n)
        throw w(e);
      return Tt.__wrap(t);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfhecompressedpublickey_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfheCompressedPublicKey}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.tfhecompressedpublickey_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Ft.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfhecompressedpublickey_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfheCompressedPublicKey}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.tfhecompressedpublickey_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Ft.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_tfhecompressedserverkey_free(r >>> 0, 1));
const Wp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_tfheconfig_free(r >>> 0, 1));
class Cc {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Cc.prototype);
    return e.__wbg_ptr = t, Wp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_tfheconfig_free(t, 0);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_tfheconfigbuilder_free(r >>> 0, 1));
const Kp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_tfhepublickey_free(r >>> 0, 1));
class Tt {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Tt.prototype);
    return e.__wbg_ptr = t, Kp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_tfhepublickey_free(t, 0);
  }
  /**
  * @param {TfheClientKey} client_key
  * @returns {TfhePublicKey}
  */
  static new(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16);
      j(t, _t), o.tfhepublickey_new(s, t.__wbg_ptr);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Tt.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @returns {Uint8Array}
  */
  serialize() {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfhepublickey_serialize(a, this.__wbg_ptr);
      var t = c().getInt32(a + 4 * 0, !0), e = c().getInt32(a + 4 * 1, !0), n = c().getInt32(a + 4 * 2, !0), i = c().getInt32(a + 4 * 3, !0);
      if (i)
        throw w(n);
      var s = ut(t, e).slice();
      return o.__wbindgen_free(t, e * 1, 1), s;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @returns {TfhePublicKey}
  */
  static deserialize(t) {
    try {
      const s = o.__wbindgen_add_to_stack_pointer(-16), a = st(t, o.__wbindgen_malloc), u = rt;
      o.tfhepublickey_deserialize(s, a, u);
      var e = c().getInt32(s + 4 * 0, !0), n = c().getInt32(s + 4 * 1, !0), i = c().getInt32(s + 4 * 2, !0);
      if (i)
        throw w(n);
      return Tt.__wrap(e);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {bigint} serialized_size_limit
  * @returns {Uint8Array}
  */
  safe_serialize(t) {
    try {
      const u = o.__wbindgen_add_to_stack_pointer(-16);
      o.tfhepublickey_safe_serialize(u, this.__wbg_ptr, t);
      var e = c().getInt32(u + 4 * 0, !0), n = c().getInt32(u + 4 * 1, !0), i = c().getInt32(u + 4 * 2, !0), s = c().getInt32(u + 4 * 3, !0);
      if (s)
        throw w(i);
      var a = ut(e, n).slice();
      return o.__wbindgen_free(e, n * 1, 1), a;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
  * @param {Uint8Array} buffer
  * @param {bigint} serialized_size_limit
  * @returns {TfhePublicKey}
  */
  static safe_deserialize(t, e) {
    try {
      const a = o.__wbindgen_add_to_stack_pointer(-16), u = st(t, o.__wbindgen_malloc), l = rt;
      o.tfhepublickey_safe_deserialize(a, u, l, e);
      var n = c().getInt32(a + 4 * 0, !0), i = c().getInt32(a + 4 * 1, !0), s = c().getInt32(a + 4 * 2, !0);
      if (s)
        throw w(i);
      return Tt.__wrap(n);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_tfheserverkey_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => o.__wbg_tfhe_free(r >>> 0, 1));
const $p = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => o.__wbg_wbg_rayon_poolbuilder_free(r >>> 0, 1));
class lf {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(lf.prototype);
    return e.__wbg_ptr = t, $p.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $p.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    o.__wbg_wbg_rayon_poolbuilder_free(t, 0);
  }
  /**
  * @returns {number}
  */
  numThreads() {
    return o.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr) >>> 0;
  }
  /**
  * @returns {number}
  */
  receiver() {
    return o.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr) >>> 0;
  }
  /**
  */
  build() {
    o.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
  }
}
async function wI(r, t) {
  if (typeof Response == "function" && r instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(r, t);
      } catch (n) {
        if (r.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    const e = await r.arrayBuffer();
    return await WebAssembly.instantiate(e, t);
  } else {
    const e = await WebAssembly.instantiate(r, t);
    return e instanceof WebAssembly.Instance ? { instance: e, module: r } : e;
  }
}
function yI() {
  const r = {};
  return r.wbg = {}, r.wbg.__wbindgen_number_new = function(t) {
    return it(t);
  }, r.wbg.__wbindgen_object_drop_ref = function(t) {
    w(t);
  }, r.wbg.__wbindgen_error_new = function(t, e) {
    const n = new Error(ds(t, e));
    return it(n);
  }, r.wbg.__wbindgen_bigint_from_u64 = function(t) {
    const e = BigInt.asUintN(64, t);
    return it(e);
  }, r.wbg.__wbindgen_shr = function(t, e) {
    const n = bt(t) >> bt(e);
    return it(n);
  }, r.wbg.__wbindgen_jsval_eq = function(t, e) {
    return bt(t) === bt(e);
  }, r.wbg.__wbindgen_lt = function(t, e) {
    return bt(t) < bt(e);
  }, r.wbg.__wbindgen_neg = function(t) {
    const e = -bt(t);
    return it(e);
  }, r.wbg.__wbindgen_bigint_from_str = function(t, e) {
    const n = BigInt(ds(t, e));
    return it(n);
  }, r.wbg.__wbindgen_bit_and = function(t, e) {
    const n = bt(t) & bt(e);
    return it(n);
  }, r.wbg.__wbindgen_bigint_from_i128 = function(t, e) {
    const n = t << BigInt(64) | BigInt.asUintN(64, e);
    return it(n);
  }, r.wbg.__wbindgen_bigint_from_i64 = function(t) {
    return it(t);
  }, r.wbg.__wbindgen_ge = function(t, e) {
    return bt(t) >= bt(e);
  }, r.wbg.__wbindgen_object_clone_ref = function(t) {
    const e = bt(t);
    return it(e);
  }, r.wbg.__wbindgen_bigint_from_u128 = function(t, e) {
    const n = BigInt.asUintN(64, t) << BigInt(64) | BigInt.asUintN(64, e);
    return it(n);
  }, r.wbg.__wbindgen_shl = function(t, e) {
    const n = bt(t) << bt(e);
    return it(n);
  }, r.wbg.__wbindgen_bit_or = function(t, e) {
    const n = bt(t) | bt(e);
    return it(n);
  }, r.wbg.__wbg_new_abda76e883ba8a5f = function() {
    const t = new Error();
    return it(t);
  }, r.wbg.__wbg_stack_658279fe44541cf6 = function(t, e) {
    const n = bt(e).stack, i = Wo(n, o.__wbindgen_malloc, o.__wbindgen_realloc), s = rt;
    c().setInt32(t + 4 * 1, s, !0), c().setInt32(t + 4 * 0, i, !0);
  }, r.wbg.__wbg_error_f851667af71bcfc6 = function(t, e) {
    let n, i;
    try {
      n = t, i = e, console.error(ds(t, e));
    } finally {
      o.__wbindgen_free(n, i, 1);
    }
  }, r.wbg.__wbg_crypto_1d1f22824a6a080c = function(t) {
    const e = bt(t).crypto;
    return it(e);
  }, r.wbg.__wbindgen_is_object = function(t) {
    const e = bt(t);
    return typeof e == "object" && e !== null;
  }, r.wbg.__wbg_process_4a72847cc503995b = function(t) {
    const e = bt(t).process;
    return it(e);
  }, r.wbg.__wbg_versions_f686565e586dd935 = function(t) {
    const e = bt(t).versions;
    return it(e);
  }, r.wbg.__wbg_node_104a2ff8d6ea03a2 = function(t) {
    const e = bt(t).node;
    return it(e);
  }, r.wbg.__wbindgen_is_string = function(t) {
    return typeof bt(t) == "string";
  }, r.wbg.__wbg_require_cca90b1a94a0255b = function() {
    return hr(function() {
      const t = module.require;
      return it(t);
    }, arguments);
  }, r.wbg.__wbindgen_is_function = function(t) {
    return typeof bt(t) == "function";
  }, r.wbg.__wbindgen_string_new = function(t, e) {
    const n = ds(t, e);
    return it(n);
  }, r.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(t) {
    const e = bt(t).msCrypto;
    return it(e);
  }, r.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() {
    return hr(function(t, e) {
      bt(t).randomFillSync(w(e));
    }, arguments);
  }, r.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() {
    return hr(function(t, e) {
      bt(t).getRandomValues(bt(e));
    }, arguments);
  }, r.wbg.__wbg_instanceof_Window_5012736c80a01584 = function(t) {
    let e;
    try {
      e = bt(t) instanceof Window;
    } catch {
      e = !1;
    }
    return e;
  }, r.wbg.__wbg_BigInt_c180ff1ada0e172c = function(t) {
    const e = BigInt(bt(t));
    return it(e);
  }, r.wbg.__wbg_newnoargs_76313bd6ff35d0f2 = function(t, e) {
    const n = new Function(ds(t, e));
    return it(n);
  }, r.wbg.__wbg_call_1084a111329e68ce = function() {
    return hr(function(t, e) {
      const n = bt(t).call(bt(e));
      return it(n);
    }, arguments);
  }, r.wbg.__wbindgen_string_get = function(t, e) {
    const n = bt(e), i = typeof n == "string" ? n : void 0;
    var s = Fl(i) ? 0 : Wo(i, o.__wbindgen_malloc, o.__wbindgen_realloc), a = rt;
    c().setInt32(t + 4 * 1, a, !0), c().setInt32(t + 4 * 0, s, !0);
  }, r.wbg.__wbg_self_3093d5d1f7bcb682 = function() {
    return hr(function() {
      const t = self.self;
      return it(t);
    }, arguments);
  }, r.wbg.__wbg_window_3bcfc4d31bc012f8 = function() {
    return hr(function() {
      const t = window.window;
      return it(t);
    }, arguments);
  }, r.wbg.__wbg_globalThis_86b222e13bdf32ed = function() {
    return hr(function() {
      const t = globalThis.globalThis;
      return it(t);
    }, arguments);
  }, r.wbg.__wbg_global_e5a3fe56f8be9485 = function() {
    return hr(function() {
      const t = Vw.global;
      return it(t);
    }, arguments);
  }, r.wbg.__wbindgen_is_undefined = function(t) {
    return bt(t) === void 0;
  }, r.wbg.__wbg_BigInt_38f8da7386bbae76 = function() {
    return hr(function(t) {
      const e = BigInt(bt(t));
      return it(e);
    }, arguments);
  }, r.wbg.__wbg_toString_515790fe476e2613 = function(t, e, n) {
    const i = bt(e).toString(n), s = Wo(i, o.__wbindgen_malloc, o.__wbindgen_realloc), a = rt;
    c().setInt32(t + 4 * 1, a, !0), c().setInt32(t + 4 * 0, s, !0);
  }, r.wbg.__wbg_toString_9d18e102ca933e68 = function(t) {
    const e = bt(t).toString();
    return it(e);
  }, r.wbg.__wbg_call_89af060b4e1523f2 = function() {
    return hr(function(t, e, n) {
      const i = bt(t).call(bt(e), bt(n));
      return it(i);
    }, arguments);
  }, r.wbg.__wbg_getTime_91058879093a1589 = function(t) {
    return bt(t).getTime();
  }, r.wbg.__wbg_new0_65387337a95cf44d = function() {
    return it(/* @__PURE__ */ new Date());
  }, r.wbg.__wbg_buffer_b7b08af79b0b0974 = function(t) {
    const e = bt(t).buffer;
    return it(e);
  }, r.wbg.__wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9 = function(t, e, n) {
    const i = new Uint8Array(bt(t), e >>> 0, n >>> 0);
    return it(i);
  }, r.wbg.__wbg_new_ea1883e1e5e86686 = function(t) {
    const e = new Uint8Array(bt(t));
    return it(e);
  }, r.wbg.__wbg_set_d1e79e2388520f18 = function(t, e, n) {
    bt(t).set(bt(e), n >>> 0);
  }, r.wbg.__wbg_newwithlength_ec548f448387c968 = function(t) {
    const e = new Uint8Array(t >>> 0);
    return it(e);
  }, r.wbg.__wbg_subarray_7c2e3576afe181d1 = function(t, e, n) {
    const i = bt(t).subarray(e >>> 0, n >>> 0);
    return it(i);
  }, r.wbg.__wbindgen_bigint_get_as_i64 = function(t, e) {
    const n = bt(e), i = typeof n == "bigint" ? n : void 0;
    c().setBigInt64(t + 8 * 1, Fl(i) ? BigInt(0) : i, !0), c().setInt32(t + 4 * 0, !Fl(i), !0);
  }, r.wbg.__wbindgen_debug_string = function(t, e) {
    const n = R_(bt(e)), i = Wo(n, o.__wbindgen_malloc, o.__wbindgen_realloc), s = rt;
    c().setInt32(t + 4 * 1, s, !0), c().setInt32(t + 4 * 0, i, !0);
  }, r.wbg.__wbindgen_throw = function(t, e) {
    throw new Error(ds(t, e));
  }, r.wbg.__wbindgen_module = function() {
    const t = _f.__wbindgen_wasm_module;
    return it(t);
  }, r.wbg.__wbindgen_memory = function() {
    const t = o.memory;
    return it(t);
  }, r.wbg.__wbg_startWorkers_d587c7d659590d3c = function(t, e, n) {
    const i = _I(w(t), w(e), lf.__wrap(n));
    return it(i);
  }, r;
}
function bI(r, t) {
  r.wbg.memory = t || new WebAssembly.Memory({ initial: 19, maximum: 16384, shared: !0 });
}
function mI(r, t, e) {
  if (o = r.exports, _f.__wbindgen_wasm_module = t, Ka = null, Wa = null, typeof e < "u" && (typeof e != "number" || e === 0 || e % 65536 !== 0))
    throw "invalid stack size";
  return o.__wbindgen_start(e), o;
}
async function _f(r, t) {
  if (o !== void 0) return o;
  let e;
  typeof r < "u" && Object.getPrototypeOf(r) === Object.prototype ? { module_or_path: r, memory: t, thread_stack_size: e } = r : console.warn("using deprecated parameters for the initialization function; pass a single object instead"), typeof r > "u" && (r = new URL(
    /* @vite-ignore */
    "/tfhe_bg.wasm",
    import.meta.url
  ));
  const n = yI();
  (typeof r == "string" || typeof Request == "function" && r instanceof Request || typeof URL == "function" && r instanceof URL) && (r = fetch(r)), bI(n, t);
  const { instance: i, module: s } = await wI(await r, n);
  return mI(i, s, e);
}
const vI = BigInt(1024 * 1024 * 512), ff = BigInt(1024 * 1024 * 512), df = BigInt(1024 * 1024 * 512), Fc = (r) => r ? new URL(r).href : "", qp = (r) => {
  let t = r.toString(16);
  return t.length % 2 ? "0" + t : t;
}, jn = (r) => {
  const t = r.replace(/^(0x)/, "").match(/.{1,2}/g);
  return t ? Uint8Array.from(t.map((e) => parseInt(e, 16))) : new Uint8Array();
}, Xa = (r) => r.reduce((t, e) => t + e.toString(16).padStart(2, "0"), ""), fc = function(r) {
  if (!r || (r == null ? void 0 : r.length) === 0)
    return BigInt(0);
  const t = Oe.from(r);
  return s2(t);
}, Ll = {}, Ww = async (r, t) => {
  if (Ll[r])
    return Ll[r];
  try {
    const e = await fetch(`${r}keyurl`);
    if (!e.ok)
      throw new Error(`HTTP error! status: ${e.status}`);
    const n = await e.json();
    if (n) {
      let i;
      if (!t)
        i = n.response.fhe_key_info[0].fhe_public_key.urls[0], t = n.response.fhe_key_info[0].fhe_public_key.data_id;
      else {
        const h = n.response.fhe_key_info.find((b) => b.fhe_public_key.data_id === t);
        if (!h)
          throw new Error(`Could not find FHE key info with data_id ${t}`);
        i = h.fhe_public_key.urls[0];
      }
      const a = await (await fetch(i)).arrayBuffer(), u = n.response.crs[2048].urls[0], l = n.response.crs[2048].data_id, p = await (await fetch(u)).arrayBuffer(), f = {
        publicKey: lr.safe_deserialize(new Uint8Array(a), ff),
        publicKeyId: t,
        publicParams: {
          2048: {
            publicParams: ai.safe_deserialize(new Uint8Array(p), df),
            publicParamsId: l
          }
        }
      };
      return Ll[r] = f, f;
    } else
      throw new Error("No public key available");
  } catch (e) {
    throw new Error("Impossible to fetch public key: wrong gateway url.", {
      cause: e
    });
  }
};
var AI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address"
      }
    ],
    name: "AddressEmptyCode",
    type: "error"
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256"
      }
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "ERC1967InvalidImplementation",
    type: "error"
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error"
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32"
      }
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error"
  },
  {
    anonymous: !1,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !1,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferStarted",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: !0,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "signer",
        type: "address"
      }
    ],
    name: "SignerAdded",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "signer",
        type: "address"
      }
    ],
    name: "SignerRemoved",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      {
        indexed: !0,
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address"
      }
    ],
    name: "addSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "version",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getSigners",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getVersion",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "get_DECRYPTIONRESULT_TYPE",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "isSigner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address"
      }
    ],
    name: "removeSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "aclAddress",
        type: "address"
      },
      {
        internalType: "uint256[]",
        name: "handlesList",
        type: "uint256[]"
      },
      {
        internalType: "bytes",
        name: "decryptedResult",
        type: "bytes"
      },
      {
        internalType: "bytes[]",
        name: "signatures",
        type: "bytes[]"
      }
    ],
    name: "verifySignatures",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
const II = (r) => {
  if (r.networkUrl)
    return new Zm(r.networkUrl);
  if (r.network)
    return new t2(r.network);
  throw new Error("You must provide a network URL or a EIP1193 object (eg: window.ethereum)");
}, EI = async (r, t) => {
  if (t.chainId && typeof t.chainId == "number")
    return t.chainId;
  if (t.chainId && typeof t.chainId != "number")
    throw new Error("chainId must be a number.");
  {
    const e = (await r.getNetwork()).chainId;
    return Number(e);
  }
}, kI = async (r) => {
  if (r.gatewayUrl && !r.publicKey) {
    const t = await Ww(Fc(r.gatewayUrl), r.publicKeyId);
    return { publicKey: t.publicKey, publicKeyId: t.publicKeyId };
  } else if (r.publicKey && r.publicKeyId) {
    const t = r.publicKey;
    try {
      return {
        publicKey: lr.safe_deserialize(t, ff),
        publicKeyId: r.publicKeyId
      };
    } catch (e) {
      throw new Error("Invalid public key (deserialization failed)", {
        cause: e
      });
    }
  } else
    throw new Error("You must provide a public key with its public key ID.");
}, xI = async (r) => {
  if (r.gatewayUrl && !r.publicParams)
    return (await Ww(Fc(r.gatewayUrl), r.publicKeyId)).publicParams;
  if (r.publicParams && r.publicParams[2048]) {
    const t = r.publicParams[2048].publicParams;
    try {
      return {
        2048: {
          publicParams: ai.safe_deserialize(t, df),
          publicParamsId: r.publicParams[2048].publicParamsId
        }
      };
    } catch (e) {
      throw new Error("Invalid public key (deserialization failed)", {
        cause: e
      });
    }
  } else
    throw new Error("You must provide a valid CRS with its CRS ID.");
}, RI = async (r, t) => await new Ji(t.kmsContractAddress, AI, r).getSigners(), tr = (r, t) => {
  if (r == null)
    throw new Error("Missing value");
  let e;
  if (t >= 8 ? e = BigInt(`0x${new Array(t / 8).fill(null).reduce((n) => `${n}ff`, "")}`) : e = BigInt(2 ** t - 1), typeof r != "number" && typeof r != "bigint")
    throw new Error("Value must be a number or a bigint.");
  if (r > e)
    throw new Error(`The value exceeds the limit for ${t}bits integer (${e.toString()}).`);
}, SI = (r, t, e, n, i, s) => (a, u) => {
  if (!Vi(a))
    throw new Error("Contract address is not a valid address.");
  if (!Vi(u))
    throw new Error("User address is not a valid address.");
  const l = n, p = [], f = Ki.builder(l), h = (b) => {
    if (p.reduce((k, R) => k + Math.max(2, R), 0) + b > 2048)
      throw Error("Packing more than 2048 bits in a single input ciphertext is unsupported");
    if (p.length + 1 > 256)
      throw Error("Packing more than 256 variables in a single input ciphertext is unsupported");
  };
  return {
    addBool(b) {
      if (b == null)
        throw new Error("Missing value");
      if (typeof b != "boolean" && typeof b != "number" && typeof b != "bigint")
        throw new Error("The value must be a boolean, a number or a bigint.");
      if ((typeof b != "bigint" || typeof b != "number") && Number(b) > 1)
        throw new Error("The value must be 1 or 0.");
      return tr(Number(b), 1), h(2), f.push_boolean(!!b), p.push(1), this;
    },
    add4(b) {
      return tr(b, 4), h(4), f.push_u4(Number(b)), p.push(4), this;
    },
    add8(b) {
      return tr(b, 8), h(8), f.push_u8(Number(b)), p.push(8), this;
    },
    add16(b) {
      return tr(b, 16), h(16), f.push_u16(Number(b)), p.push(16), this;
    },
    add32(b) {
      return tr(b, 32), h(32), f.push_u32(Number(b)), p.push(32), this;
    },
    add64(b) {
      return tr(b, 64), h(64), f.push_u64(BigInt(b)), p.push(64), this;
    },
    add128(b) {
      return tr(b, 128), h(128), f.push_u128(BigInt(b)), p.push(128), this;
    },
    addAddress(b) {
      if (!Vi(b))
        throw new Error("The value must be a valid address.");
      return h(160), f.push_u160(BigInt(b)), p.push(160), this;
    },
    add256(b) {
      return tr(b, 256), h(256), f.push_u256(BigInt(b)), p.push(256), this;
    },
    addBytes64(b) {
      if (b.length !== 64)
        throw Error("Uncorrect length of input Uint8Array, should be 64 for an ebytes64");
      const k = fc(b);
      return tr(k, 512), h(512), f.push_u512(k), p.push(512), this;
    },
    addBytes128(b) {
      if (b.length !== 128)
        throw Error("Uncorrect length of input Uint8Array, should be 128 for an ebytes128");
      const k = fc(b);
      return tr(k, 1024), h(1024), f.push_u1024(k), p.push(1024), this;
    },
    addBytes256(b) {
      if (b.length !== 256)
        throw Error("Uncorrect length of input Uint8Array, should be 256 for an ebytes256");
      const k = fc(b);
      return tr(k, 2048), h(2048), f.push_u2048(k), p.push(2048), this;
    },
    getBits() {
      return p;
    },
    _getClosestPP() {
      const b = (S) => Object.keys(S), k = p.reduce((S, m) => S + m, 0), R = b(s), x = R.find((S) => Number(S) >= k);
      if (!x)
        throw new Error(`Too many bits in provided values. Maximum is ${R[R.length - 1]}.`);
      return x;
    },
    async _prove() {
      const b = this._getClosestPP(), k = s[b].publicParams, R = jn(a), x = jn(u), S = jn(r), m = jn(t.toString(16)), B = new Uint8Array(R.length + x.length + S.length + 32);
      B.set(R, 0), B.set(x, 20), B.set(S, 40), B.set(m, B.length - m.length);
      const C = f.build_with_proof_packed(k, B, gI.Verify);
      return Oe.from(C.safe_serialize(vI));
    },
    async _verify(b) {
      const k = this._getClosestPP(), R = s[k].publicParamsId, x = {
        contract_address: Ut(a),
        caller_address: Ut(u),
        ct_proof: b.toString("hex"),
        key_id: i,
        crs_id: R
      }, S = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(x)
      };
      let m;
      try {
        m = await (await fetch(`${e}verify_proven_ct`, S)).json();
      } catch (V) {
        throw new Error("Gateway didn't response correctly", { cause: V });
      }
      let B = [];
      m.response.handles && m.response.handles.length > 0 && (B = m.response.handles.map(jn));
      const C = m.response.kms_signatures;
      let U = qp(B.length);
      const M = C.length;
      if (U += qp(M), m.response.proof_of_storage) {
        const V = uI("keccak256").update(Oe.from(b)).digest();
        U += V.toString("hex"), B.map((K) => Xa(K)).map((K) => U += K), U += m.response.proof_of_storage, C.map((K) => U += K);
      } else
        B.map((Z) => Xa(Z)).map((Z) => U += Z), C.map((Z) => U += Z), U += Xa(b);
      return {
        handles: B,
        inputProof: jn(U)
      };
    },
    async encrypt() {
      let b = Date.now();
      const k = await this._prove();
      console.log(`Encrypting and proving in ${Math.round((Date.now() - b) / 100) / 10}s`), b = Date.now();
      const R = await this._verify(k);
      return console.log(`Verifying in ${Math.round((Date.now() - b) / 100) / 10}s`), R;
    }
  };
};
let et;
const Kw = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Kw.decode();
let $a = null;
function Ns() {
  return ($a === null || $a.byteLength === 0) && ($a = new Uint8Array(et.memory.buffer)), $a;
}
function Ma(r, t) {
  return r = r >>> 0, Kw.decode(Ns().subarray(r, r + t));
}
let de = 0;
const dc = typeof TextEncoder < "u" ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} }, BI = typeof dc.encodeInto == "function" ? function(r, t) {
  return dc.encodeInto(r, t);
} : function(r, t) {
  const e = dc.encode(r);
  return t.set(e), {
    read: r.length,
    written: e.length
  };
};
function As(r, t, e) {
  if (e === void 0) {
    const u = dc.encode(r), l = t(u.length, 1) >>> 0;
    return Ns().subarray(l, l + u.length).set(u), de = u.length, l;
  }
  let n = r.length, i = t(n, 1) >>> 0;
  const s = Ns();
  let a = 0;
  for (; a < n; a++) {
    const u = r.charCodeAt(a);
    if (u > 127) break;
    s[i + a] = u;
  }
  if (a !== n) {
    a !== 0 && (r = r.slice(a)), i = e(i, n, n = a + r.length * 3, 1) >>> 0;
    const u = Ns().subarray(i + a, i + n), l = BI(r, u);
    a += l.written, i = e(i, n, a, 1) >>> 0;
  }
  return de = a, i;
}
function pc(r) {
  return r == null;
}
let pi = null;
function rr() {
  return (pi === null || pi.buffer.detached === !0 || pi.buffer.detached === void 0 && pi.buffer !== et.memory.buffer) && (pi = new DataView(et.memory.buffer)), pi;
}
function S_(r) {
  const t = typeof r;
  if (t == "number" || t == "boolean" || r == null)
    return `${r}`;
  if (t == "string")
    return `"${r}"`;
  if (t == "symbol") {
    const i = r.description;
    return i == null ? "Symbol" : `Symbol(${i})`;
  }
  if (t == "function") {
    const i = r.name;
    return typeof i == "string" && i.length > 0 ? `Function(${i})` : "Function";
  }
  if (Array.isArray(r)) {
    const i = r.length;
    let s = "[";
    i > 0 && (s += S_(r[0]));
    for (let a = 1; a < i; a++)
      s += ", " + S_(r[a]);
    return s += "]", s;
  }
  const e = /\[object ([^\]]+)\]/.exec(toString.call(r));
  let n;
  if (e.length > 1)
    n = e[1];
  else
    return toString.call(r);
  if (n == "Object")
    try {
      return "Object(" + JSON.stringify(r) + ")";
    } catch {
      return "Object";
    }
  return r instanceof Error ? `${r.name}: ${r.message}
${r.stack}` : n;
}
function $i(r, t) {
  if (!(r instanceof t))
    throw new Error(`expected instance of ${t.name}`);
  return r.ptr;
}
function qi(r, t) {
  return r = r >>> 0, Ns().subarray(r / 1, r / 1 + t);
}
function Cs(r, t) {
  const e = t(r.length * 1, 1) >>> 0;
  return Ns().set(r, e / 1), de = r.length, e;
}
function Ca(r) {
  const t = et.__wbindgen_export_2.get(r);
  return et.__externref_table_dealloc(r), t;
}
function $w(r) {
  const t = et.__externref_table_alloc();
  return et.__wbindgen_export_2.set(t, r), t;
}
function PI(r, t) {
  const e = t(r.length * 4, 4) >>> 0, n = rr();
  for (let i = 0; i < r.length; i++)
    n.setUint32(e + 4 * i, $w(r[i]), !0);
  return de = r.length, e;
}
function OI(r, t, e) {
  const n = PI(r, et.__wbindgen_malloc), i = de, s = As(t, et.__wbindgen_malloc, et.__wbindgen_realloc), a = de, u = As(e, et.__wbindgen_malloc, et.__wbindgen_realloc), l = de, p = et.new_client(n, i, s, a, u, l);
  if (p[2])
    throw Ca(p[1]);
  return pu.__wrap(p[0]);
}
function TI() {
  const r = et.cryptobox_keygen();
  return as.__wrap(r);
}
function NI(r) {
  $i(r, as);
  const t = et.cryptobox_get_pk(r.__wbg_ptr);
  return Fa.__wrap(t);
}
function CI(r) {
  $i(r, Fa);
  const t = et.cryptobox_pk_to_u8vec(r.__wbg_ptr);
  if (t[3])
    throw Ca(t[2]);
  var e = qi(t[0], t[1]).slice();
  return et.__wbindgen_free(t[0], t[1] * 1, 1), e;
}
function FI(r) {
  $i(r, as);
  const t = et.cryptobox_sk_to_u8vec(r.__wbg_ptr);
  if (t[3])
    throw Ca(t[2]);
  var e = qi(t[0], t[1]).slice();
  return et.__wbindgen_free(t[0], t[1] * 1, 1), e;
}
function zI(r) {
  const t = Cs(r, et.__wbindgen_malloc), e = de, n = et.u8vec_to_cryptobox_pk(t, e);
  if (n[2])
    throw Ca(n[1]);
  return Fa.__wrap(n[0]);
}
function LI(r) {
  const t = Cs(r, et.__wbindgen_malloc), e = de, n = et.u8vec_to_cryptobox_sk(t, e);
  if (n[2])
    throw Ca(n[1]);
  return as.__wrap(n[0]);
}
function UI(r, t, e, n, i, s, a) {
  $i(r, pu), $i(i, Fa), $i(s, as);
  const u = et.process_reencryption_resp_from_js(r.__wbg_ptr, t, e, n, i.__wbg_ptr, s.__wbg_ptr, a);
  if (u[3])
    throw Ca(u[2]);
  var l = qi(u[0], u[1]).slice();
  return et.__wbindgen_free(u[0], u[1] * 1, 1), l;
}
function er(r, t) {
  try {
    return r.apply(this, t);
  } catch (e) {
    const n = $w(e);
    et.__wbindgen_exn_store(n);
  }
}
const Yp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => et.__wbg_client_free(r >>> 0, 1));
class pu {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(pu.prototype);
    return e.__wbg_ptr = t, Yp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    et.__wbg_client_free(t, 0);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_cryptoboxct_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_eip712domainmsg_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_parsedreencryptionrequest_free(r >>> 0, 1));
const Zp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => et.__wbg_privateenckey_free(r >>> 0, 1));
class as {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(as.prototype);
    return e.__wbg_ptr = t, Zp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    et.__wbg_privateenckey_free(t, 0);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_privatesigkey_free(r >>> 0, 1));
const Xp = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => et.__wbg_publicenckey_free(r >>> 0, 1));
class Fa {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Fa.prototype);
    return e.__wbg_ptr = t, Xp.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xp.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    et.__wbg_publicenckey_free(t, 0);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_publicsigkey_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_reencryptionrequest_free(r >>> 0, 1));
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_reencryptionrequestpayload_free(r >>> 0, 1));
const DI = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => et.__wbg_reencryptionresponse_free(r >>> 0, 1));
class pf {
  static __unwrap(t) {
    return t instanceof pf ? t.__destroy_into_raw() : 0;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, DI.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    et.__wbg_reencryptionresponse_free(t, 0);
  }
  /**
   * @returns {Uint8Array}
   */
  get signature() {
    const t = et.__wbg_get_reencryptionresponse_signature(this.__wbg_ptr);
    var e = qi(t[0], t[1]).slice();
    return et.__wbindgen_free(t[0], t[1] * 1, 1), e;
  }
  /**
   * @param {Uint8Array} arg0
   */
  set signature(t) {
    const e = Cs(t, et.__wbindgen_malloc), n = de;
    et.__wbg_set_eip712domainmsg_name(this.__wbg_ptr, e, n);
  }
  /**
   * Signature of the serialization of \[ReencryptionResponsePayload\].
   * @returns {ReencryptionResponsePayload | undefined}
   */
  get payload() {
    const t = et.__wbg_get_reencryptionresponse_payload(this.__wbg_ptr);
    return t === 0 ? void 0 : zc.__wrap(t);
  }
  /**
   * Signature of the serialization of \[ReencryptionResponsePayload\].
   * @param {ReencryptionResponsePayload | undefined} [arg0]
   */
  set payload(t) {
    let e = 0;
    pc(t) || ($i(t, zc), e = t.__destroy_into_raw()), et.__wbg_set_reencryptionresponse_payload(this.__wbg_ptr, e);
  }
}
const th = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => et.__wbg_reencryptionresponsepayload_free(r >>> 0, 1));
class zc {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(zc.prototype);
    return e.__wbg_ptr = t, th.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, th.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    et.__wbg_reencryptionresponsepayload_free(t, 0);
  }
  /**
   * Version of the response format.
   * @returns {number}
   */
  get version() {
    return et.__wbg_get_reencryptionresponsepayload_version(this.__wbg_ptr) >>> 0;
  }
  /**
   * Version of the response format.
   * @param {number} arg0
   */
  set version(t) {
    et.__wbg_set_reencryptionresponsepayload_version(this.__wbg_ptr, t);
  }
  /**
   * The server's signature verification key.
   * Encoded using SEC1.
   * Needed to validate the response, but MUST also be linked to a list of
   * trusted keys.
   * @returns {Uint8Array}
   */
  get verification_key() {
    const t = et.__wbg_get_reencryptionresponsepayload_verification_key(this.__wbg_ptr);
    var e = qi(t[0], t[1]).slice();
    return et.__wbindgen_free(t[0], t[1] * 1, 1), e;
  }
  /**
   * The server's signature verification key.
   * Encoded using SEC1.
   * Needed to validate the response, but MUST also be linked to a list of
   * trusted keys.
   * @param {Uint8Array} arg0
   */
  set verification_key(t) {
    const e = Cs(t, et.__wbindgen_malloc), n = de;
    et.__wbg_set_eip712domainmsg_name(this.__wbg_ptr, e, n);
  }
  /**
   * The concatenation of two digests:
   * (eip712_signing_hash(pk, domain) || ciphertext digest).
   * This is needed to ensure the response corresponds to the request.
   * @returns {Uint8Array}
   */
  get digest() {
    const t = et.__wbg_get_reencryptionresponsepayload_digest(this.__wbg_ptr);
    var e = qi(t[0], t[1]).slice();
    return et.__wbindgen_free(t[0], t[1] * 1, 1), e;
  }
  /**
   * The concatenation of two digests:
   * (eip712_signing_hash(pk, domain) || ciphertext digest).
   * This is needed to ensure the response corresponds to the request.
   * @param {Uint8Array} arg0
   */
  set digest(t) {
    const e = Cs(t, et.__wbindgen_malloc), n = de;
    et.__wbg_set_eip712domainmsg_version(this.__wbg_ptr, e, n);
  }
  /**
   * The type of plaintext encrypted.
   * @returns {number}
   */
  get fhe_type() {
    return et.__wbg_get_reencryptionresponsepayload_fhe_type(this.__wbg_ptr);
  }
  /**
   * The type of plaintext encrypted.
   * @param {number} arg0
   */
  set fhe_type(t) {
    et.__wbg_set_reencryptionresponsepayload_fhe_type(this.__wbg_ptr, t);
  }
  /**
   * The signcrypted payload, using a hybrid encryption approach in
   * sign-then-encrypt.
   * @returns {Uint8Array}
   */
  get signcrypted_ciphertext() {
    const t = et.__wbg_get_reencryptionresponsepayload_signcrypted_ciphertext(this.__wbg_ptr);
    var e = qi(t[0], t[1]).slice();
    return et.__wbindgen_free(t[0], t[1] * 1, 1), e;
  }
  /**
   * The signcrypted payload, using a hybrid encryption approach in
   * sign-then-encrypt.
   * @param {Uint8Array} arg0
   */
  set signcrypted_ciphertext(t) {
    const e = Cs(t, et.__wbindgen_malloc), n = de;
    et.__wbg_set_eip712domainmsg_chain_id(this.__wbg_ptr, e, n);
  }
  /**
   * The ID of the MPC party doing the reencryption. Used for polynomial
   * reconstruction.
   * @returns {number}
   */
  get party_id() {
    return et.__wbg_get_reencryptionresponsepayload_party_id(this.__wbg_ptr) >>> 0;
  }
  /**
   * The ID of the MPC party doing the reencryption. Used for polynomial
   * reconstruction.
   * @param {number} arg0
   */
  set party_id(t) {
    et.__wbg_set_reencryptionresponsepayload_party_id(this.__wbg_ptr, t);
  }
  /**
   * The degree of the sharing scheme used.
   * @returns {number}
   */
  get degree() {
    return et.__wbg_get_reencryptionresponsepayload_degree(this.__wbg_ptr) >>> 0;
  }
  /**
   * The degree of the sharing scheme used.
   * @param {number} arg0
   */
  set degree(t) {
    et.__wbg_set_reencryptionresponsepayload_degree(this.__wbg_ptr, t);
  }
}
typeof FinalizationRegistry > "u" || new FinalizationRegistry((r) => et.__wbg_requestid_free(r >>> 0, 1));
async function MI(r, t) {
  if (typeof Response == "function" && r instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(r, t);
      } catch (n) {
        if (r.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    const e = await r.arrayBuffer();
    return await WebAssembly.instantiate(e, t);
  } else {
    const e = await WebAssembly.instantiate(r, t);
    return e instanceof WebAssembly.Instance ? { instance: e, module: r } : e;
  }
}
function jI() {
  const r = {};
  return r.wbg = {}, r.wbg.__wbindgen_error_new = function(t, e) {
    return new Error(Ma(t, e));
  }, r.wbg.__wbindgen_string_get = function(t, e) {
    const n = e, i = typeof n == "string" ? n : void 0;
    var s = pc(i) ? 0 : As(i, et.__wbindgen_malloc, et.__wbindgen_realloc), a = de;
    rr().setInt32(t + 4 * 1, a, !0), rr().setInt32(t + 4 * 0, s, !0);
  }, r.wbg.__wbindgen_is_object = function(t) {
    const e = t;
    return typeof e == "object" && e !== null;
  }, r.wbg.__wbindgen_is_undefined = function(t) {
    return t === void 0;
  }, r.wbg.__wbindgen_in = function(t, e) {
    return t in e;
  }, r.wbg.__wbindgen_is_null = function(t) {
    return t === null;
  }, r.wbg.__wbg_reencryptionresponse_unwrap = function(t) {
    return pf.__unwrap(t);
  }, r.wbg.__wbindgen_number_get = function(t, e) {
    const n = e, i = typeof n == "number" ? n : void 0;
    rr().setFloat64(t + 8 * 1, pc(i) ? 0 : i, !0), rr().setInt32(t + 4 * 0, !pc(i), !0);
  }, r.wbg.__wbindgen_jsval_loose_eq = function(t, e) {
    return t == e;
  }, r.wbg.__wbindgen_boolean_get = function(t) {
    const e = t;
    return typeof e == "boolean" ? e ? 1 : 0 : 2;
  }, r.wbg.__wbindgen_as_number = function(t) {
    return +t;
  }, r.wbg.__wbg_String_b9412f8799faab3e = function(t, e) {
    const n = String(e), i = As(n, et.__wbindgen_malloc, et.__wbindgen_realloc), s = de;
    rr().setInt32(t + 4 * 1, s, !0), rr().setInt32(t + 4 * 0, i, !0);
  }, r.wbg.__wbindgen_string_new = function(t, e) {
    return Ma(t, e);
  }, r.wbg.__wbg_getwithrefkey_edc2c8960f0f1191 = function(t, e) {
    return t[e];
  }, r.wbg.__wbg_new_abda76e883ba8a5f = function() {
    return new Error();
  }, r.wbg.__wbg_stack_658279fe44541cf6 = function(t, e) {
    const n = e.stack, i = As(n, et.__wbindgen_malloc, et.__wbindgen_realloc), s = de;
    rr().setInt32(t + 4 * 1, s, !0), rr().setInt32(t + 4 * 0, i, !0);
  }, r.wbg.__wbg_error_f851667af71bcfc6 = function(t, e) {
    let n, i;
    try {
      n = t, i = e, console.error(Ma(t, e));
    } finally {
      et.__wbindgen_free(n, i, 1);
    }
  }, r.wbg.__wbg_crypto_1d1f22824a6a080c = function(t) {
    return t.crypto;
  }, r.wbg.__wbg_process_4a72847cc503995b = function(t) {
    return t.process;
  }, r.wbg.__wbg_versions_f686565e586dd935 = function(t) {
    return t.versions;
  }, r.wbg.__wbg_node_104a2ff8d6ea03a2 = function(t) {
    return t.node;
  }, r.wbg.__wbindgen_is_string = function(t) {
    return typeof t == "string";
  }, r.wbg.__wbg_require_cca90b1a94a0255b = function() {
    return er(function() {
      return module.require;
    }, arguments);
  }, r.wbg.__wbindgen_is_function = function(t) {
    return typeof t == "function";
  }, r.wbg.__wbg_msCrypto_eb05e62b530a1508 = function(t) {
    return t.msCrypto;
  }, r.wbg.__wbg_randomFillSync_5c9c955aa56b6049 = function() {
    return er(function(t, e) {
      t.randomFillSync(e);
    }, arguments);
  }, r.wbg.__wbg_getRandomValues_3aa56aa6edec874c = function() {
    return er(function(t, e) {
      t.getRandomValues(e);
    }, arguments);
  }, r.wbg.__wbg_get_5419cf6b954aa11d = function(t, e) {
    return t[e >>> 0];
  }, r.wbg.__wbg_length_f217bbbf7e8e4df4 = function(t) {
    return t.length;
  }, r.wbg.__wbg_newnoargs_1ede4bf2ebbaaf43 = function(t, e) {
    return new Function(Ma(t, e));
  }, r.wbg.__wbg_next_13b477da1eaa3897 = function(t) {
    return t.next;
  }, r.wbg.__wbg_next_b06e115d1b01e10b = function() {
    return er(function(t) {
      return t.next();
    }, arguments);
  }, r.wbg.__wbg_done_983b5ffcaec8c583 = function(t) {
    return t.done;
  }, r.wbg.__wbg_value_2ab8a198c834c26a = function(t) {
    return t.value;
  }, r.wbg.__wbg_iterator_695d699a44d6234c = function() {
    return Symbol.iterator;
  }, r.wbg.__wbg_get_ef828680c64da212 = function() {
    return er(function(t, e) {
      return Reflect.get(t, e);
    }, arguments);
  }, r.wbg.__wbg_call_a9ef466721e824f2 = function() {
    return er(function(t, e) {
      return t.call(e);
    }, arguments);
  }, r.wbg.__wbg_self_bf91bf94d9e04084 = function() {
    return er(function() {
      return self.self;
    }, arguments);
  }, r.wbg.__wbg_window_52dd9f07d03fd5f8 = function() {
    return er(function() {
      return window.window;
    }, arguments);
  }, r.wbg.__wbg_globalThis_05c129bf37fcf1be = function() {
    return er(function() {
      return globalThis.globalThis;
    }, arguments);
  }, r.wbg.__wbg_global_3eca19bb09e9c484 = function() {
    return er(function() {
      return Vw.global;
    }, arguments);
  }, r.wbg.__wbg_isArray_6f3b47f09adb61b5 = function(t) {
    return Array.isArray(t);
  }, r.wbg.__wbg_instanceof_ArrayBuffer_74945570b4a62ec7 = function(t) {
    let e;
    try {
      e = t instanceof ArrayBuffer;
    } catch {
      e = !1;
    }
    return e;
  }, r.wbg.__wbg_call_3bfa248576352471 = function() {
    return er(function(t, e, n) {
      return t.call(e, n);
    }, arguments);
  }, r.wbg.__wbg_isSafeInteger_b9dff570f01a9100 = function(t) {
    return Number.isSafeInteger(t);
  }, r.wbg.__wbg_buffer_ccaed51a635d8a2d = function(t) {
    return t.buffer;
  }, r.wbg.__wbg_newwithbyteoffsetandlength_7e3eb787208af730 = function(t, e, n) {
    return new Uint8Array(t, e >>> 0, n >>> 0);
  }, r.wbg.__wbg_new_fec2611eb9180f95 = function(t) {
    return new Uint8Array(t);
  }, r.wbg.__wbg_set_ec2fcf81bc573fd9 = function(t, e, n) {
    t.set(e, n >>> 0);
  }, r.wbg.__wbg_length_9254c4bd3b9f23c4 = function(t) {
    return t.length;
  }, r.wbg.__wbg_instanceof_Uint8Array_df0761410414ef36 = function(t) {
    let e;
    try {
      e = t instanceof Uint8Array;
    } catch {
      e = !1;
    }
    return e;
  }, r.wbg.__wbg_newwithlength_76462a666eca145f = function(t) {
    return new Uint8Array(t >>> 0);
  }, r.wbg.__wbg_subarray_975a06f9dbd16995 = function(t, e, n) {
    return t.subarray(e >>> 0, n >>> 0);
  }, r.wbg.__wbindgen_debug_string = function(t, e) {
    const n = S_(e), i = As(n, et.__wbindgen_malloc, et.__wbindgen_realloc), s = de;
    rr().setInt32(t + 4 * 1, s, !0), rr().setInt32(t + 4 * 0, i, !0);
  }, r.wbg.__wbindgen_throw = function(t, e) {
    throw new Error(Ma(t, e));
  }, r.wbg.__wbindgen_memory = function() {
    return et.memory;
  }, r.wbg.__wbindgen_init_externref_table = function() {
    const t = et.__wbindgen_export_2, e = t.grow(4);
    t.set(0, void 0), t.set(e + 0, void 0), t.set(e + 1, null), t.set(e + 2, !0), t.set(e + 3, !1);
  }, r;
}
function GI(r, t) {
  return et = r.exports, qw.__wbindgen_wasm_module = t, pi = null, $a = null, et.__wbindgen_start(), et;
}
async function qw(r) {
  if (et !== void 0) return et;
  typeof r < "u" && (Object.getPrototypeOf(r) === Object.prototype ? { module_or_path: r } = r : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), typeof r > "u" && (r = new URL(
    /* @vite-ignore */
    "/kms_lib_bg.wasm",
    import.meta.url
  ));
  const t = jI();
  (typeof r == "string" || typeof Request == "function" && r instanceof Request || typeof URL == "function" && r instanceof URL) && (r = fetch(r));
  const { instance: e, module: n } = await MI(await r, t);
  return GI(e, n);
}
const HI = (r) => (t, e, n) => {
  if (!Vi(e))
    throw new Error("Invalid contract address.");
  if (n && !Vi(n))
    throw new Error("Invalid delegated account.");
  const i = {
    types: {
      // This refers to the domain the contract is hosted on.
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" }
      ],
      // Refer to primaryType.
      Reencrypt: [{ name: "publicKey", type: "bytes" }]
    },
    // This defines the message you're proposing the user to sign, is dapp-specific, and contains
    // anything you want. There are no required fields. Be as explicit as possible when building out
    // the message schema.
    // This refers to the keys of the following types object.
    primaryType: "Reencrypt",
    domain: {
      // Give a user-friendly name to the specific contract you're signing for.
      name: "Authorization token",
      // This identifies the latest version.
      version: "1",
      // This defines the network, in this case, Mainnet.
      chainId: r,
      // // Add a verifying contract to make sure you're establishing contracts with the proper entity.
      verifyingContract: e
    },
    message: {
      publicKey: `0x${t}`
    }
  };
  return n && (i.message.delegatedAccount = n, i.types.Reencrypt.push({
    name: "delegatedAccount",
    type: "address"
  })), i;
}, VI = () => {
  const r = TI();
  return {
    publicKey: Xa(CI(NI(r))),
    privateKey: Xa(FI(r))
  };
}, QI = [
  "function persistAllowed(uint256 handle, address account) view returns (bool)"
], JI = (r, t, e, n, i, s) => async (a, u, l, p, f, h) => {
  const b = new Ji(n, QI, s), k = await b.persistAllowed(a, h), R = await b.persistAllowed(a, f);
  if (!k)
    throw new Error("User is not authorized to reencrypt this handle!");
  if (!R)
    throw new Error("dApp contract is not authorized to reencrypt this handle!");
  if (h === f)
    throw new Error("userAddress should not be equal to contractAddress when requesting reencryption!");
  const x = {
    signature: p.replace(/^(0x)/, ""),
    client_address: Ut(h),
    enc_key: l.replace(/^(0x)/, ""),
    ciphertext_handle: a.toString(16).padStart(64, "0"),
    eip712_verifying_contract: Ut(f)
  }, S = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(x)
  };
  let m, B;
  try {
    m = zI(jn(l)), B = LI(jn(u));
  } catch (V) {
    throw new Error("Invalid public or private key", { cause: V });
  }
  let C, U;
  try {
    if (C = await fetch(`${i}reencrypt`, S), !C.ok)
      throw new Error(`Reencrypt failed: gateway respond with HTTP code ${C.status}`);
  } catch (V) {
    throw new Error("Reencrypt failed: Gateway didn't respond", { cause: V });
  }
  try {
    U = await C.json();
  } catch (V) {
    throw new Error("Reencrypt failed: Gateway didn't return a JSON", {
      cause: V
    });
  }
  if (U.status === "failure")
    throw new Error("Reencrypt failed: the reencryption didn't succeed for an unknown reason", { cause: U });
  const M = OI(r, h, "default");
  try {
    const V = new ArrayBuffer(32);
    new DataView(V).setUint32(28, t, !1);
    const tt = {
      name: "Authorization token",
      version: "1",
      chain_id: new Uint8Array(V),
      verifying_contract: f,
      salt: null
    }, { ciphertext_handle: ht, ...wt } = x, kt = {
      ...wt,
      ciphertext_digest: U.response[0].ciphertext_digest
    }, Nt = UI(M, kt, tt, U.response, m, B, !0);
    return fc(Nt);
  } catch (V) {
    throw new Error("An error occured during decryption", { cause: V });
  }
}, qI = async (r) => {
  const { publicKey: t, kmsContractAddress: e, aclContractAddress: n } = r;
  if (!e || !Vi(e))
    throw new Error("KMS contract address is not valid or empty");
  if (!n || !Vi(n))
    throw new Error("ACL contract address is not valid or empty");
  if (t && !(t instanceof Uint8Array))
    throw new Error("publicKey must be a Uint8Array");
  const i = II(r);
  if (!i)
    throw new Error("No network has been provided!");
  const s = await EI(i, r), a = await kI(r), u = await xI(r), l = await RI(i, r);
  return {
    createEncryptedInput: SI(n, s, Fc(r.gatewayUrl), a.publicKey, a.publicKeyId, u),
    generateKeypair: VI,
    createEIP712: HI(s),
    reencrypt: JI(l, s, e, n, Fc(r.gatewayUrl), i),
    getPublicKey: () => a.publicKey ? {
      publicKey: a.publicKey.safe_serialize(ff),
      publicKeyId: a.publicKeyId
    } : null,
    getPublicParams: (p) => u[p] ? {
      publicParams: u[p].publicParams.safe_serialize(df),
      publicParamsId: u[p].publicParamsId
    } : null
  };
};
let eh = !1;
const YI = async ({ tfheParams: r, kmsParams: t, thread: e } = {}) => (e == null && (e = navigator.hardwareConcurrency), await lI() || (console.warn(`This browser does not support threads. Verify that your server returns correct headers:
`, `'Cross-Origin-Opener-Policy': 'same-origin'
`, "'Cross-Origin-Embedder-Policy': 'require-corp'"), e = void 0), eh || (await _f({ module_or_path: r }), await qw({
  module_or_path: t
}), e && (pI(), await hI(e)), eh = !0), !0);
export {
  HI as createEIP712,
  qI as createInstance,
  VI as generateKeypair,
  YI as initFhevm
};
