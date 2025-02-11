import QN from 'crypto';
import {randomFillSync as Lie} from 'crypto';
import {randomUUID as Bie} from 'crypto';
import {createServer as kN} from 'http';
import {Http2ServerRequest as Lf} from 'http2';
import {createRequire} from 'module';
import {Readable as $N} from 'stream';

const require = createRequire(import.meta.url);
var TN = Object.create;
var gs = Object.defineProperty;
var AN = Object.getOwnPropertyDescriptor;
var SN = Object.getOwnPropertyNames;
var ON = Object.getPrototypeOf,
	RN = Object.prototype.hasOwnProperty;
var _ = ((r) =>
	typeof require < 'u'
		? require
		: typeof Proxy < 'u'
			? new Proxy(r, {get: (e, t) => (typeof require < 'u' ? require : e)[t]})
			: r)(function (r) {
	if (typeof require < 'u') return require.apply(this, arguments);
	throw Error('Dynamic require of "' + r + '" is not supported');
});
var NN = (r, e) => () => (r && (e = r((r = 0))), e);
var l = (r, e) => () => (e || r((e = {exports: {}}).exports, e), e.exports),
	IN = (r, e) => {
		for (var t in e) gs(r, t, {get: e[t], enumerable: !0});
	},
	jf = (r, e, t, n) => {
		if ((e && typeof e == 'object') || typeof e == 'function')
			for (let i of SN(e))
				!RN.call(r, i) &&
					i !== t &&
					gs(r, i, {
						get: () => e[i],
						enumerable: !(n = AN(e, i)) || n.enumerable,
					});
		return r;
	};
var Fa = (r, e, t) => (
		(t = r != null ? TN(ON(r)) : {}),
		jf(
			e || !r || !r.__esModule
				? gs(t, 'default', {value: r, enumerable: !0})
				: t,
			r
		)
	),
	PN = (r) => jf(gs({}, '__esModule', {value: !0}), r);
var zf = l((Fr) => {
	'use strict';
	function Yn(r, e) {
		var t = {};
		for (var n in r)
			Object.prototype.hasOwnProperty.call(r, n) &&
				e.indexOf(n) < 0 &&
				(t[n] = r[n]);
		if (r != null && typeof Object.getOwnPropertySymbols == 'function')
			for (var i = 0, n = Object.getOwnPropertySymbols(r); i < n.length; i++)
				e.indexOf(n[i]) < 0 &&
					Object.prototype.propertyIsEnumerable.call(r, n[i]) &&
					(t[n[i]] = r[n[i]]);
		return t;
	}
	function M(r, e) {
		var t;
		return ((t = r?._def) === null || t === void 0 ? void 0 : t.typeName) === e;
	}
	function tI(r) {
		return '_def' in r;
	}
	function zn(r, e) {
		let t = r.ZodType.prototype[e];
		r.ZodType.prototype[e] = function (...n) {
			let i = t.apply(this, n);
			return (i._def.openapi = this._def.openapi), i;
		};
	}
	function rI(r) {
		if (typeof r.ZodType.prototype.openapi < 'u') return;
		(r.ZodType.prototype.openapi = function (i, s) {
			var o, a, u, c, h, d;
			let f = typeof i == 'string' ? s : i,
				m = f ?? {},
				{param: g} = m,
				y = Yn(m, ['param']),
				E = Object.assign(
					Object.assign(
						{},
						(o = this._def.openapi) === null || o === void 0
							? void 0
							: o._internal
					),
					typeof i == 'string' ? {refId: i} : void 0
				),
				N = Object.assign(
					Object.assign(
						Object.assign(
							{},
							(a = this._def.openapi) === null || a === void 0
								? void 0
								: a.metadata
						),
						y
					),
					(!(
						(c =
							(u = this._def.openapi) === null || u === void 0
								? void 0
								: u.metadata) === null || c === void 0
					) &&
						c.param) ||
						g
						? {
								param: Object.assign(
									Object.assign(
										{},
										(d =
											(h = this._def.openapi) === null || h === void 0
												? void 0
												: h.metadata) === null || d === void 0
											? void 0
											: d.param
									),
									g
								),
							}
						: void 0
				),
				j = new this.constructor(
					Object.assign(Object.assign({}, this._def), {
						openapi: Object.assign(
							Object.assign(
								{},
								Object.keys(E).length > 0 ? {_internal: E} : void 0
							),
							Object.keys(N).length > 0 ? {metadata: N} : void 0
						),
					})
				);
			if (M(this, 'ZodObject')) {
				let ae = this.extend;
				j.extend = function (...ee) {
					var ue, _e, gt, We, Vn, Da;
					let Ua = ae.apply(this, ee);
					return (
						(Ua._def.openapi = {
							_internal: {
								extendedFrom:
									!(
										(_e =
											(ue = this._def.openapi) === null || ue === void 0
												? void 0
												: ue._internal) === null || _e === void 0
									) && _e.refId
										? {
												refId:
													(We =
														(gt = this._def.openapi) === null || gt === void 0
															? void 0
															: gt._internal) === null || We === void 0
														? void 0
														: We.refId,
												schema: this,
											}
										: (Vn = this._def.openapi) === null || Vn === void 0
											? void 0
											: Vn._internal.extendedFrom,
							},
							metadata:
								(Da = Ua._def.openapi) === null || Da === void 0
									? void 0
									: Da.metadata,
						}),
						Ua
					);
				};
			}
			return j;
		}),
			zn(r, 'optional'),
			zn(r, 'nullable'),
			zn(r, 'default'),
			zn(r, 'transform'),
			zn(r, 'refine');
		let e = r.ZodObject.prototype.deepPartial;
		r.ZodObject.prototype.deepPartial = function () {
			let i = this._def.shape(),
				s = e.apply(this),
				o = s._def.shape();
			return (
				Object.entries(o).forEach(([a, u]) => {
					var c, h;
					u._def.openapi =
						(h = (c = i[a]) === null || c === void 0 ? void 0 : c._def) ===
							null || h === void 0
							? void 0
							: h.openapi;
				}),
				(s._def.openapi = void 0),
				s
			);
		};
		let t = r.ZodObject.prototype.pick;
		r.ZodObject.prototype.pick = function (...i) {
			let s = t.apply(this, i);
			return (s._def.openapi = void 0), s;
		};
		let n = r.ZodObject.prototype.omit;
		r.ZodObject.prototype.omit = function (...i) {
			let s = n.apply(this, i);
			return (s._def.openapi = void 0), s;
		};
	}
	function Es(r, e) {
		if (r == null || e === null || e === void 0) return r === e;
		if (r === e || r.valueOf() === e.valueOf()) return !0;
		if (
			(Array.isArray(r) && (!Array.isArray(e) || r.length !== e.length)) ||
			!(r instanceof Object) ||
			!(e instanceof Object)
		)
			return !1;
		let t = Object.keys(r);
		return (
			Object.keys(e).every((n) => t.indexOf(n) !== -1) &&
			t.every((n) => Es(r[n], e[n]))
		);
	}
	var Xa = class {
		constructor() {
			this.buckets = new Map();
		}
		put(e) {
			let t = this.hashCodeOf(e),
				n = this.buckets.get(t);
			if (!n) {
				this.buckets.set(t, [e]);
				return;
			}
			n.some((s) => Es(s, e)) || n.push(e);
		}
		contains(e) {
			let t = this.hashCodeOf(e),
				n = this.buckets.get(t);
			return n ? n.some((i) => Es(i, e)) : !1;
		}
		values() {
			return [...this.buckets.values()].flat();
		}
		stats() {
			let e = 0,
				t = 0,
				n = 0;
			for (let s of this.buckets.values())
				(e += 1), (t += s.length), s.length > 1 && (n += 1);
			let i = e / t;
			return {
				totalBuckets: e,
				collisions: n,
				totalValues: t,
				hashEffectiveness: i,
			};
		}
		hashCodeOf(e) {
			let t = 0;
			if (Array.isArray(e)) {
				for (let n = 0; n < e.length; n++) t ^= this.hashCodeOf(e[n]) * n;
				return t;
			}
			if (typeof e == 'string') {
				for (let n = 0; n < e.length; n++) t ^= e.charCodeAt(n) * n;
				return t;
			}
			if (typeof e == 'number') return e;
			if (typeof e == 'object')
				for (let [n, i] of Object.entries(e))
					t ^= this.hashCodeOf(n) + this.hashCodeOf(i ?? '');
			return t;
		}
	};
	function Br(r) {
		return r == null;
	}
	function Xn(r, e) {
		let t = {};
		return (
			Object.entries(r).forEach(([n, i]) => {
				t[n] = e(i);
			}),
			t
		);
	}
	function nI(r, e) {
		let t = {};
		return (
			Object.entries(r).forEach(([n, i]) => {
				e.some((s) => s === n) || (t[n] = i);
			}),
			t
		);
	}
	function Ht(r, e) {
		let t = {};
		return (
			Object.entries(r).forEach(([n, i]) => {
				e(i, n) || (t[n] = i);
			}),
			t
		);
	}
	function Jf(r) {
		return r.filter((e) => !Br(e));
	}
	var eu = Es;
	function iI(r) {
		let e = new Xa();
		return r.forEach((t) => e.put(t)), [...e.values()];
	}
	function Kf(r) {
		return typeof r == 'string';
	}
	function sI(r) {
		var e, t;
		return Ht(
			(t =
				(e = r._def.openapi) === null || e === void 0 ? void 0 : e.metadata) !==
				null && t !== void 0
				? t
				: {},
			Br
		);
	}
	var tu = class {
			constructor(e) {
				(this.parents = e), (this._definitions = []);
			}
			get definitions() {
				var e, t;
				return [
					...((t =
						(e = this.parents) === null || e === void 0
							? void 0
							: e.flatMap((i) => i.definitions)) !== null && t !== void 0
						? t
						: []),
					...this._definitions,
				];
			}
			register(e, t) {
				let n = this.schemaWithRefId(e, t);
				return this._definitions.push({type: 'schema', schema: n}), n;
			}
			registerParameter(e, t) {
				var n, i, s;
				let o = this.schemaWithRefId(e, t),
					a =
						(n = o._def.openapi) === null || n === void 0 ? void 0 : n.metadata,
					u = o.openapi(
						Object.assign(Object.assign({}, a), {
							param: Object.assign(Object.assign({}, a?.param), {
								name:
									(s =
										(i = a?.param) === null || i === void 0
											? void 0
											: i.name) !== null && s !== void 0
										? s
										: e,
							}),
						})
					);
				return this._definitions.push({type: 'parameter', schema: u}), u;
			}
			registerPath(e) {
				this._definitions.push({type: 'route', route: e});
			}
			registerWebhook(e) {
				this._definitions.push({type: 'webhook', webhook: e});
			}
			registerComponent(e, t, n) {
				return (
					this._definitions.push({
						type: 'component',
						componentType: e,
						name: t,
						component: n,
					}),
					{name: t, ref: {$ref: `#/components/${e}/${t}`}}
				);
			}
			schemaWithRefId(e, t) {
				return t.openapi(e);
			}
		},
		Dr = class {
			constructor(e) {
				this.message = e;
			}
		},
		Qt = class extends Dr {
			constructor(e, t) {
				super(e), (this.data = t);
			}
		},
		Ur = class extends Dr {
			constructor(e) {
				super(
					`Missing parameter data, please specify \`${e.missingField}\` and other OpenAPI parameter props using the \`param\` field of \`ZodSchema.openapi\``
				),
					(this.data = e);
			}
		};
	function Zn(r, e) {
		try {
			return r();
		} catch (t) {
			throw t instanceof Ur
				? new Ur(Object.assign(Object.assign({}, t.data), e))
				: t;
		}
	}
	var ru = class extends Dr {
			constructor(e) {
				super(
					'Unknown zod object type, please specify `type` and other OpenAPI props using `ZodSchema.openapi`.'
				),
					(this.data = e);
			}
		},
		B = class {
			static getMetadata(e) {
				var t;
				let n = this.unwrapChained(e),
					i = e._def.openapi ? e._def.openapi : n._def.openapi,
					s = (t = e.description) !== null && t !== void 0 ? t : n.description;
				return {
					_internal: i?._internal,
					metadata: Object.assign({description: s}, i?.metadata),
				};
			}
			static getInternalMetadata(e) {
				let t = this.unwrapChained(e),
					n = e._def.openapi ? e._def.openapi : t._def.openapi;
				return n?._internal;
			}
			static getParamMetadata(e) {
				var t, n;
				let i = this.unwrapChained(e),
					s = e._def.openapi ? e._def.openapi : i._def.openapi,
					o = (t = e.description) !== null && t !== void 0 ? t : i.description;
				return {
					_internal: s?._internal,
					metadata: Object.assign(Object.assign({}, s?.metadata), {
						param: Object.assign(
							{description: o},
							(n = s?.metadata) === null || n === void 0 ? void 0 : n.param
						),
					}),
				};
			}
			static buildSchemaMetadata(e) {
				return Ht(nI(e, ['param']), Br);
			}
			static buildParameterMetadata(e) {
				return Ht(e, Br);
			}
			static applySchemaMetadata(e, t) {
				return Ht(
					Object.assign(Object.assign({}, e), this.buildSchemaMetadata(t)),
					Br
				);
			}
			static getRefId(e) {
				var t;
				return (t = this.getInternalMetadata(e)) === null || t === void 0
					? void 0
					: t.refId;
			}
			static unwrapChained(e) {
				return this.unwrapUntil(e);
			}
			static getDefaultValue(e) {
				let t = this.unwrapUntil(e, 'ZodDefault');
				return t?._def.defaultValue();
			}
			static unwrapUntil(e, t) {
				return t && M(e, t)
					? e
					: M(e, 'ZodOptional') || M(e, 'ZodNullable') || M(e, 'ZodBranded')
						? this.unwrapUntil(e.unwrap(), t)
						: M(e, 'ZodDefault') || M(e, 'ZodReadonly')
							? this.unwrapUntil(e._def.innerType, t)
							: M(e, 'ZodEffects')
								? this.unwrapUntil(e._def.schema, t)
								: M(e, 'ZodPipeline')
									? this.unwrapUntil(e._def.in, t)
									: t
										? void 0
										: e;
			}
			static isOptionalSchema(e) {
				return e.isOptional();
			}
		},
		nu = class {
			transform(e, t, n) {
				var i, s;
				let o = e._def.type;
				return Object.assign(Object.assign({}, t('array')), {
					items: n(o),
					minItems:
						(i = e._def.minLength) === null || i === void 0 ? void 0 : i.value,
					maxItems:
						(s = e._def.maxLength) === null || s === void 0 ? void 0 : s.value,
				});
			}
		},
		iu = class {
			transform(e) {
				return Object.assign(Object.assign({}, e('string')), {pattern: '^d+$'});
			}
		},
		su = class {
			transform(e, t, n, i, s) {
				let o = [...e.options.values()],
					a = o.map(i);
				return t
					? {oneOf: n(a, t)}
					: {
							oneOf: a,
							discriminator: this.mapDiscriminator(o, e.discriminator, s),
						};
			}
			mapDiscriminator(e, t, n) {
				if (e.some((s) => B.getRefId(s) === void 0)) return;
				let i = {};
				return (
					e.forEach((s) => {
						var o;
						let a = B.getRefId(s),
							u = (o = s.shape) === null || o === void 0 ? void 0 : o[t];
						if (M(u, 'ZodEnum') || M(u, 'ZodNativeEnum')) {
							Object.values(u.enum)
								.filter(Kf)
								.forEach((d) => {
									i[d] = n(a);
								});
							return;
						}
						let c = u?._def.value;
						if (typeof c != 'string')
							throw new Error(
								`Discriminator ${t} could not be found in one of the values of a discriminated union`
							);
						i[c] = n(a);
					}),
					{propertyName: t, mapping: i}
				);
			}
		},
		ou = class {
			transform(e, t) {
				return Object.assign(Object.assign({}, t('string')), {
					enum: e._def.values,
				});
			}
		},
		au = class {
			transform(e, t, n, i) {
				let o = {allOf: this.flattenIntersectionTypes(e).map(i)};
				return t ? {anyOf: n([o], t)} : o;
			}
			flattenIntersectionTypes(e) {
				if (!M(e, 'ZodIntersection')) return [e];
				let t = this.flattenIntersectionTypes(e._def.left),
					n = this.flattenIntersectionTypes(e._def.right);
				return [...t, ...n];
			}
		},
		uu = class {
			transform(e, t) {
				return Object.assign(Object.assign({}, t(typeof e._def.value)), {
					enum: [e._def.value],
				});
			}
		};
	function oI(r) {
		let t = Object.keys(r)
				.filter((s) => typeof r[r[s]] != 'number')
				.map((s) => r[s]),
			n = t.filter((s) => typeof s == 'number').length,
			i = n === 0 ? 'string' : n === t.length ? 'numeric' : 'mixed';
		return {values: t, type: i};
	}
	var cu = class {
			transform(e, t) {
				let {type: n, values: i} = oI(e._def.values);
				if (n === 'mixed')
					throw new Dr(
						'Enum has mixed string and number values, please specify the OpenAPI type manually'
					);
				return Object.assign(
					Object.assign({}, t(n === 'numeric' ? 'integer' : 'string')),
					{enum: i}
				);
			}
		},
		lu = class {
			transform(e, t, n) {
				return Object.assign(
					Object.assign({}, t(e.isInt ? 'integer' : 'number')),
					n(e._def.checks)
				);
			}
		},
		hu = class {
			transform(e, t, n, i) {
				var s;
				let o =
						(s = B.getInternalMetadata(e)) === null || s === void 0
							? void 0
							: s.extendedFrom,
					a = this.requiredKeysOf(e),
					u = Xn(e._def.shape(), i);
				if (!o)
					return Object.assign(
						Object.assign(
							Object.assign(Object.assign({}, n('object')), {
								properties: u,
								default: t,
							}),
							a.length > 0 ? {required: a} : {}
						),
						this.generateAdditionalProperties(e, i)
					);
				let c = o.schema;
				i(c);
				let h = this.requiredKeysOf(c),
					d = Xn(c?._def.shape(), i),
					f = Object.fromEntries(
						Object.entries(u).filter(([y, E]) => !eu(d[y], E))
					),
					m = a.filter((y) => !h.includes(y)),
					g = Object.assign(
						Object.assign(
							Object.assign(Object.assign({}, n('object')), {
								default: t,
								properties: f,
							}),
							m.length > 0 ? {required: m} : {}
						),
						this.generateAdditionalProperties(e, i)
					);
				return {allOf: [{$ref: `#/components/schemas/${o.refId}`}, g]};
			}
			generateAdditionalProperties(e, t) {
				let n = e._def.unknownKeys,
					i = e._def.catchall;
				return M(i, 'ZodNever')
					? n === 'strict'
						? {additionalProperties: !1}
						: {}
					: {additionalProperties: t(i)};
			}
			requiredKeysOf(e) {
				return Object.entries(e._def.shape())
					.filter(([t, n]) => !B.isOptionalSchema(n))
					.map(([t, n]) => t);
			}
		},
		du = class {
			transform(e, t, n) {
				let i = e._def.valueType,
					s = e._def.keyType,
					o = n(i);
				if (M(s, 'ZodEnum') || M(s, 'ZodNativeEnum')) {
					let u = Object.values(s.enum)
						.filter(Kf)
						.reduce(
							(c, h) => Object.assign(Object.assign({}, c), {[h]: o}),
							{}
						);
					return Object.assign(Object.assign({}, t('object')), {properties: u});
				}
				return Object.assign(Object.assign({}, t('object')), {
					additionalProperties: o,
				});
			}
		},
		fu = class {
			transform(e, t) {
				var n, i, s;
				let o = this.getZodStringCheck(e, 'regex'),
					a =
						(n = this.getZodStringCheck(e, 'length')) === null || n === void 0
							? void 0
							: n.value,
					u =
						Number.isFinite(e.minLength) &&
						(i = e.minLength) !== null &&
						i !== void 0
							? i
							: void 0,
					c =
						Number.isFinite(e.maxLength) &&
						(s = e.maxLength) !== null &&
						s !== void 0
							? s
							: void 0;
				return Object.assign(Object.assign({}, t('string')), {
					minLength: a ?? u,
					maxLength: a ?? c,
					format: this.mapStringFormat(e),
					pattern: o?.regex.source,
				});
			}
			mapStringFormat(e) {
				if (e.isUUID) return 'uuid';
				if (e.isEmail) return 'email';
				if (e.isURL) return 'uri';
				if (e.isDate) return 'date';
				if (e.isDatetime) return 'date-time';
				if (e.isCUID) return 'cuid';
				if (e.isCUID2) return 'cuid2';
				if (e.isULID) return 'ulid';
				if (e.isIP) return 'ip';
				if (e.isEmoji) return 'emoji';
			}
			getZodStringCheck(e, t) {
				return e._def.checks.find((n) => n.kind === t);
			}
		},
		pu = class {
			constructor(e) {
				this.versionSpecifics = e;
			}
			transform(e, t, n) {
				let {items: i} = e._def,
					s = i.map(n);
				return Object.assign(
					Object.assign({}, t('array')),
					this.versionSpecifics.mapTupleItems(s)
				);
			}
		},
		mu = class {
			transform(e, t, n) {
				let s = this.flattenUnionTypes(e).map((o) => {
					let a = this.unwrapNullable(o);
					return n(a);
				});
				return {anyOf: t(s)};
			}
			flattenUnionTypes(e) {
				return M(e, 'ZodUnion')
					? e._def.options.flatMap((n) => this.flattenUnionTypes(n))
					: [e];
			}
			unwrapNullable(e) {
				return M(e, 'ZodNullable') ? this.unwrapNullable(e.unwrap()) : e;
			}
		},
		gu = class {
			constructor(e) {
				(this.versionSpecifics = e),
					(this.objectTransformer = new hu()),
					(this.stringTransformer = new fu()),
					(this.numberTransformer = new lu()),
					(this.bigIntTransformer = new iu()),
					(this.literalTransformer = new uu()),
					(this.enumTransformer = new ou()),
					(this.nativeEnumTransformer = new cu()),
					(this.arrayTransformer = new nu()),
					(this.unionTransformer = new mu()),
					(this.discriminatedUnionTransformer = new su()),
					(this.intersectionTransformer = new au()),
					(this.recordTransformer = new du()),
					(this.tupleTransformer = new pu(e));
			}
			transform(e, t, n, i, s) {
				if (M(e, 'ZodNull')) return this.versionSpecifics.nullType;
				if (M(e, 'ZodUnknown') || M(e, 'ZodAny'))
					return this.versionSpecifics.mapNullableType(void 0, t);
				if (M(e, 'ZodObject'))
					return this.objectTransformer.transform(
						e,
						s,
						(a) => this.versionSpecifics.mapNullableType(a, t),
						n
					);
				let o = this.transformSchemaWithoutDefault(e, t, n, i);
				return Object.assign(Object.assign({}, o), {default: s});
			}
			transformSchemaWithoutDefault(e, t, n, i) {
				if (M(e, 'ZodUnknown') || M(e, 'ZodAny'))
					return this.versionSpecifics.mapNullableType(void 0, t);
				if (M(e, 'ZodString'))
					return this.stringTransformer.transform(e, (o) =>
						this.versionSpecifics.mapNullableType(o, t)
					);
				if (M(e, 'ZodNumber'))
					return this.numberTransformer.transform(
						e,
						(o) => this.versionSpecifics.mapNullableType(o, t),
						(o) => this.versionSpecifics.getNumberChecks(o)
					);
				if (M(e, 'ZodBigInt'))
					return this.bigIntTransformer.transform((o) =>
						this.versionSpecifics.mapNullableType(o, t)
					);
				if (M(e, 'ZodBoolean'))
					return this.versionSpecifics.mapNullableType('boolean', t);
				if (M(e, 'ZodLiteral'))
					return this.literalTransformer.transform(e, (o) =>
						this.versionSpecifics.mapNullableType(o, t)
					);
				if (M(e, 'ZodEnum'))
					return this.enumTransformer.transform(e, (o) =>
						this.versionSpecifics.mapNullableType(o, t)
					);
				if (M(e, 'ZodNativeEnum'))
					return this.nativeEnumTransformer.transform(e, (o) =>
						this.versionSpecifics.mapNullableType(o, t)
					);
				if (M(e, 'ZodArray'))
					return this.arrayTransformer.transform(
						e,
						(o) => this.versionSpecifics.mapNullableType(o, t),
						n
					);
				if (M(e, 'ZodTuple'))
					return this.tupleTransformer.transform(
						e,
						(o) => this.versionSpecifics.mapNullableType(o, t),
						n
					);
				if (M(e, 'ZodUnion'))
					return this.unionTransformer.transform(
						e,
						(o) => this.versionSpecifics.mapNullableOfArray(o, t),
						n
					);
				if (M(e, 'ZodDiscriminatedUnion'))
					return this.discriminatedUnionTransformer.transform(
						e,
						t,
						(o) => this.versionSpecifics.mapNullableOfArray(o, t),
						n,
						i
					);
				if (M(e, 'ZodIntersection'))
					return this.intersectionTransformer.transform(
						e,
						t,
						(o) => this.versionSpecifics.mapNullableOfArray(o, t),
						n
					);
				if (M(e, 'ZodRecord'))
					return this.recordTransformer.transform(
						e,
						(o) => this.versionSpecifics.mapNullableType(o, t),
						n
					);
				if (M(e, 'ZodDate'))
					return this.versionSpecifics.mapNullableType('string', t);
				let s = B.getRefId(e);
				throw new ru({currentSchema: e._def, schemaName: s});
			}
		},
		xs = class {
			constructor(e, t) {
				(this.definitions = e),
					(this.versionSpecifics = t),
					(this.schemaRefs = {}),
					(this.paramRefs = {}),
					(this.pathRefs = {}),
					(this.rawComponents = []),
					(this.openApiTransformer = new gu(t)),
					this.sortDefinitions();
			}
			generateDocumentData() {
				return (
					this.definitions.forEach((e) => this.generateSingle(e)),
					{components: this.buildComponents(), paths: this.pathRefs}
				);
			}
			generateComponents() {
				return (
					this.definitions.forEach((e) => this.generateSingle(e)),
					{components: this.buildComponents()}
				);
			}
			buildComponents() {
				var e, t;
				let n = {};
				return (
					this.rawComponents.forEach(
						({componentType: i, name: s, component: o}) => {
							var a;
							((a = n[i]) !== null && a !== void 0) || (n[i] = {}),
								(n[i][s] = o);
						}
					),
					Object.assign(Object.assign({}, n), {
						schemas: Object.assign(
							Object.assign(
								{},
								(e = n.schemas) !== null && e !== void 0 ? e : {}
							),
							this.schemaRefs
						),
						parameters: Object.assign(
							Object.assign(
								{},
								(t = n.parameters) !== null && t !== void 0 ? t : {}
							),
							this.paramRefs
						),
					})
				);
			}
			sortDefinitions() {
				let e = ['schema', 'parameter', 'component', 'route'];
				this.definitions.sort((t, n) => {
					if (!('type' in t)) return 'type' in n ? -1 : 0;
					if (!('type' in n)) return 1;
					let i = e.findIndex((o) => o === t.type),
						s = e.findIndex((o) => o === n.type);
					return i - s;
				});
			}
			generateSingle(e) {
				if (!('type' in e)) {
					this.generateSchemaWithRef(e);
					return;
				}
				switch (e.type) {
					case 'parameter':
						this.generateParameterDefinition(e.schema);
						return;
					case 'schema':
						this.generateSchemaWithRef(e.schema);
						return;
					case 'route':
						this.generateSingleRoute(e.route);
						return;
					case 'component':
						this.rawComponents.push(e);
						return;
				}
			}
			generateParameterDefinition(e) {
				let t = B.getRefId(e),
					n = this.generateParameter(e);
				return t && (this.paramRefs[t] = n), n;
			}
			getParameterRef(e, t) {
				var n, i, s, o, a;
				let u = (n = e?.metadata) === null || n === void 0 ? void 0 : n.param,
					c =
						!((i = e?._internal) === null || i === void 0) && i.refId
							? this.paramRefs[
									(s = e._internal) === null || s === void 0 ? void 0 : s.refId
								]
							: void 0;
				if (
					!(!(!((o = e?._internal) === null || o === void 0) && o.refId) || !c)
				) {
					if ((u && c.in !== u.in) || (t?.in && c.in !== t.in))
						throw new Qt(`Conflicting location for parameter ${c.name}`, {
							key: 'in',
							values: Jf([c.in, t?.in, u?.in]),
						});
					if ((u && c.name !== u.name) || (t?.name && c.name !== t?.name))
						throw new Qt('Conflicting names for parameter', {
							key: 'name',
							values: Jf([c.name, t?.name, u?.name]),
						});
					return {
						$ref: `#/components/parameters/${(a = e._internal) === null || a === void 0 ? void 0 : a.refId}`,
					};
				}
			}
			generateInlineParameters(e, t) {
				var n;
				let i = B.getMetadata(e),
					s = (n = i?.metadata) === null || n === void 0 ? void 0 : n.param,
					o = this.getParameterRef(i, {in: t});
				if (o) return [o];
				if (M(e, 'ZodObject')) {
					let a = e._def.shape();
					return Object.entries(a).map(([c, h]) => {
						var d, f;
						let m = B.getMetadata(h),
							g = this.getParameterRef(m, {in: t, name: c});
						if (g) return g;
						let y =
							(d = m?.metadata) === null || d === void 0 ? void 0 : d.param;
						if (y?.name && y.name !== c)
							throw new Qt('Conflicting names for parameter', {
								key: 'name',
								values: [c, y.name],
							});
						if (y?.in && y.in !== t)
							throw new Qt(
								`Conflicting location for parameter ${(f = y.name) !== null && f !== void 0 ? f : c}`,
								{key: 'in', values: [t, y.in]}
							);
						return this.generateParameter(h.openapi({param: {name: c, in: t}}));
					});
				}
				if (s?.in && s.in !== t)
					throw new Qt(`Conflicting location for parameter ${s.name}`, {
						key: 'in',
						values: [t, s.in],
					});
				return [this.generateParameter(e.openapi({param: {in: t}}))];
			}
			generateSimpleParameter(e) {
				var t;
				let n = B.getParamMetadata(e),
					i = (t = n?.metadata) === null || t === void 0 ? void 0 : t.param,
					s = !B.isOptionalSchema(e) && !e.isNullable(),
					o = this.generateSchemaWithRef(e);
				return Object.assign(
					{schema: o, required: s},
					i ? B.buildParameterMetadata(i) : {}
				);
			}
			generateParameter(e) {
				var t;
				let n = B.getMetadata(e),
					i = (t = n?.metadata) === null || t === void 0 ? void 0 : t.param,
					s = i?.name,
					o = i?.in;
				if (!s) throw new Ur({missingField: 'name'});
				if (!o) throw new Ur({missingField: 'in', paramName: s});
				let a = this.generateSimpleParameter(e);
				return Object.assign(Object.assign({}, a), {in: o, name: s});
			}
			generateSchemaWithMetadata(e) {
				var t;
				let n = B.unwrapChained(e),
					i = B.getMetadata(e),
					s = B.getDefaultValue(e),
					o =
						!((t = i?.metadata) === null || t === void 0) && t.type
							? {type: i?.metadata.type}
							: this.toOpenAPISchema(n, e.isNullable(), s);
				return i?.metadata ? B.applySchemaMetadata(o, i.metadata) : Ht(o, Br);
			}
			constructReferencedOpenAPISchema(e) {
				var t;
				let n = B.getMetadata(e),
					i = B.unwrapChained(e),
					s = B.getDefaultValue(e),
					o = e.isNullable();
				return !((t = n?.metadata) === null || t === void 0) && t.type
					? this.versionSpecifics.mapNullableType(n.metadata.type, o)
					: this.toOpenAPISchema(i, o, s);
			}
			generateSimpleSchema(e) {
				var t;
				let n = B.getMetadata(e),
					i = B.getRefId(e);
				if (!i || !this.schemaRefs[i])
					return this.generateSchemaWithMetadata(e);
				let s = this.schemaRefs[i],
					o = {$ref: this.generateSchemaRef(i)},
					a = Ht(
						B.buildSchemaMetadata(
							(t = n?.metadata) !== null && t !== void 0 ? t : {}
						),
						(h, d) => h === void 0 || eu(h, s[d])
					);
				if (a.type) return {allOf: [o, a]};
				let u = Ht(
						this.constructReferencedOpenAPISchema(e),
						(h, d) => h === void 0 || eu(h, s[d])
					),
					c = B.applySchemaMetadata(u, a);
				return Object.keys(c).length > 0 ? {allOf: [o, c]} : o;
			}
			generateSchemaWithRef(e) {
				let t = B.getRefId(e),
					n = this.generateSimpleSchema(e);
				return t && this.schemaRefs[t] === void 0
					? ((this.schemaRefs[t] = n), {$ref: this.generateSchemaRef(t)})
					: n;
			}
			generateSchemaRef(e) {
				return `#/components/schemas/${e}`;
			}
			getRequestBody(e) {
				if (!e) return;
				let {content: t} = e,
					n = Yn(e, ['content']),
					i = this.getBodyContent(t);
				return Object.assign(Object.assign({}, n), {content: i});
			}
			getParameters(e) {
				if (!e) return [];
				let {headers: t} = e,
					n = this.cleanParameter(e.query),
					i = this.cleanParameter(e.params),
					s = this.cleanParameter(e.cookies),
					o = Zn(() => (n ? this.generateInlineParameters(n, 'query') : []), {
						location: 'query',
					}),
					a = Zn(() => (i ? this.generateInlineParameters(i, 'path') : []), {
						location: 'path',
					}),
					u = Zn(() => (s ? this.generateInlineParameters(s, 'cookie') : []), {
						location: 'cookie',
					}),
					c = Zn(
						() => {
							if (Array.isArray(t))
								return t.flatMap((d) =>
									this.generateInlineParameters(d, 'header')
								);
							let h = this.cleanParameter(t);
							return h ? this.generateInlineParameters(h, 'header') : [];
						},
						{location: 'header'}
					);
				return [...a, ...o, ...c, ...u];
			}
			cleanParameter(e) {
				if (e)
					return M(e, 'ZodEffects') ? this.cleanParameter(e._def.schema) : e;
			}
			generatePath(e) {
				let {method: t, path: n, request: i, responses: s} = e,
					o = Yn(e, ['method', 'path', 'request', 'responses']),
					a = Xn(s, (d) => this.getResponse(d)),
					u = Zn(() => this.getParameters(i), {route: `${t} ${n}`}),
					c = this.getRequestBody(i?.body);
				return {
					[t]: Object.assign(
						Object.assign(
							Object.assign(
								Object.assign({}, o),
								u.length > 0
									? {parameters: [...(o.parameters || []), ...u]}
									: {}
							),
							c ? {requestBody: c} : {}
						),
						{responses: a}
					),
				};
			}
			generateSingleRoute(e) {
				let t = this.generatePath(e);
				return (
					(this.pathRefs[e.path] = Object.assign(
						Object.assign({}, this.pathRefs[e.path]),
						t
					)),
					t
				);
			}
			getResponse(e) {
				if (this.isReferenceObject(e)) return e;
				let {content: t, headers: n} = e,
					i = Yn(e, ['content', 'headers']),
					s = t ? {content: this.getBodyContent(t)} : {};
				if (!n) return Object.assign(Object.assign({}, i), s);
				let o = M(n, 'ZodObject') ? this.getResponseHeaders(n) : n;
				return Object.assign(
					Object.assign(Object.assign({}, i), {headers: o}),
					s
				);
			}
			isReferenceObject(e) {
				return '$ref' in e;
			}
			getResponseHeaders(e) {
				let t = e._def.shape();
				return Xn(t, (i) => this.generateSimpleParameter(i));
			}
			getBodyContent(e) {
				return Xn(e, (t) => {
					if (!t || !tI(t.schema)) return t;
					let {schema: n} = t,
						i = Yn(t, ['schema']),
						s = this.generateSchemaWithRef(n);
					return Object.assign({schema: s}, i);
				});
			}
			toOpenAPISchema(e, t, n) {
				return this.openApiTransformer.transform(
					e,
					t,
					(i) => this.generateSchemaWithRef(i),
					(i) => this.generateSchemaRef(i),
					n
				);
			}
		},
		yu = class {
			get nullType() {
				return {nullable: !0};
			}
			mapNullableOfArray(e, t) {
				return t ? [...e, this.nullType] : e;
			}
			mapNullableType(e, t) {
				return Object.assign(
					Object.assign({}, e ? {type: e} : void 0),
					t ? this.nullType : void 0
				);
			}
			mapTupleItems(e) {
				let t = iI(e);
				return {
					items: t.length === 1 ? t[0] : {anyOf: t},
					minItems: e.length,
					maxItems: e.length,
				};
			}
			getNumberChecks(e) {
				return Object.assign(
					{},
					...e.map((t) => {
						switch (t.kind) {
							case 'min':
								return t.inclusive
									? {minimum: Number(t.value)}
									: {minimum: Number(t.value), exclusiveMinimum: !0};
							case 'max':
								return t.inclusive
									? {maximum: Number(t.value)}
									: {maximum: Number(t.value), exclusiveMaximum: !0};
							default:
								return {};
						}
					})
				);
			}
		},
		bu = class {
			constructor(e) {
				let t = new yu();
				this.generator = new xs(e, t);
			}
			generateDocument(e) {
				let t = this.generator.generateDocumentData();
				return Object.assign(Object.assign({}, e), t);
			}
			generateComponents() {
				return this.generator.generateComponents();
			}
		},
		_u = class {
			get nullType() {
				return {type: 'null'};
			}
			mapNullableOfArray(e, t) {
				return t ? [...e, this.nullType] : e;
			}
			mapNullableType(e, t) {
				return e
					? t
						? {type: Array.isArray(e) ? [...e, 'null'] : [e, 'null']}
						: {type: e}
					: {};
			}
			mapTupleItems(e) {
				return {prefixItems: e};
			}
			getNumberChecks(e) {
				return Object.assign(
					{},
					...e.map((t) => {
						switch (t.kind) {
							case 'min':
								return t.inclusive
									? {minimum: Number(t.value)}
									: {exclusiveMinimum: Number(t.value)};
							case 'max':
								return t.inclusive
									? {maximum: Number(t.value)}
									: {exclusiveMaximum: Number(t.value)};
							default:
								return {};
						}
					})
				);
			}
		};
	function aI(r) {
		return 'type' in r && r.type === 'webhook';
	}
	var wu = class {
		constructor(e) {
			(this.definitions = e), (this.webhookRefs = {});
			let t = new _u();
			this.generator = new xs(this.definitions, t);
		}
		generateDocument(e) {
			let t = this.generator.generateDocumentData();
			return (
				this.definitions
					.filter(aI)
					.forEach((n) => this.generateSingleWebhook(n.webhook)),
				Object.assign(Object.assign(Object.assign({}, e), t), {
					webhooks: this.webhookRefs,
				})
			);
		}
		generateComponents() {
			return this.generator.generateComponents();
		}
		generateSingleWebhook(e) {
			let t = this.generator.generatePath(e);
			return (
				(this.webhookRefs[e.path] = Object.assign(
					Object.assign({}, this.webhookRefs[e.path]),
					t
				)),
				t
			);
		}
	};
	Fr.OpenAPIRegistry = tu;
	Fr.OpenApiGeneratorV3 = bu;
	Fr.OpenApiGeneratorV31 = wu;
	Fr.extendZodWithOpenApi = rI;
	Fr.getOpenApiMetadata = sI;
});
var Wu = l((Hu) => {
	'use strict';
	Object.defineProperty(Hu, '__esModule', {value: !0});
	var Qu = class extends Error {};
	Hu.TimeoutError = Qu;
});
var Pp = l((Gu) => {
	'use strict';
	Object.defineProperty(Gu, '__esModule', {value: !0});
	var Vu = class {
		constructor(e) {
			(this._value = e.value), (this._error = e.error);
		}
		value() {
			return this._value;
		}
		reason() {
			return this._error;
		}
		isRejected() {
			return !!this._error;
		}
		isFulfilled() {
			return !!this._value;
		}
	};
	Gu.PromiseInspection = Vu;
});
var Ds = l((Ke) => {
	'use strict';
	Object.defineProperty(Ke, '__esModule', {value: !0});
	var kp = Pp();
	function BP() {
		let r = null,
			e = null;
		return {
			promise: new Promise((n, i) => {
				(r = n), (e = i);
			}),
			resolve: r,
			reject: e,
		};
	}
	Ke.defer = BP;
	function DP() {
		return Date.now();
	}
	Ke.now = DP;
	function UP(r, e) {
		return Math.abs(e - r);
	}
	Ke.duration = UP;
	function FP(r) {
		return typeof r > 'u' ? !0 : $p(r);
	}
	Ke.checkOptionalTime = FP;
	function $p(r) {
		return typeof r == 'number' && r === Math.round(r) && r > 0;
	}
	Ke.checkRequiredTime = $p;
	function QP(r) {
		return new Promise((e) => setTimeout(e, r));
	}
	Ke.delay = QP;
	function HP(r) {
		return r
			.then((e) => new kp.PromiseInspection({value: e}))
			.catch((e) => new kp.PromiseInspection({error: e}));
	}
	Ke.reflect = HP;
	function WP(r) {
		try {
			let e = r();
			return Promise.resolve(e);
		} catch (e) {
			return Promise.reject(e);
		}
	}
	Ke.tryPromise = WP;
});
var Mp = l((Ku) => {
	'use strict';
	Object.defineProperty(Ku, '__esModule', {value: !0});
	var Us = Wu(),
		VP = Ds(),
		Ju = class {
			constructor(e) {
				(this.timeoutMillis = e),
					(this.deferred = VP.defer()),
					(this.possibleTimeoutCause = null),
					(this.isRejected = !1),
					(this.promise = GP(this.deferred.promise, e).catch(
						(t) => (
							t instanceof Us.TimeoutError &&
								(this.possibleTimeoutCause
									? (t = new Us.TimeoutError(this.possibleTimeoutCause.message))
									: (t = new Us.TimeoutError(
											'operation timed out for an unknown reason'
										))),
							(this.isRejected = !0),
							Promise.reject(t)
						)
					));
			}
			abort() {
				this.reject(new Error('aborted'));
			}
			reject(e) {
				this.deferred.reject(e);
			}
			resolve(e) {
				this.deferred.resolve(e);
			}
		};
	Ku.PendingOperation = Ju;
	function GP(r, e) {
		return new Promise((t, n) => {
			let i = setTimeout(() => n(new Us.TimeoutError()), e);
			r.then((s) => {
				clearTimeout(i), t(s);
			}).catch((s) => {
				clearTimeout(i), n(s);
			});
		});
	}
});
var Lp = l((Zu) => {
	'use strict';
	Object.defineProperty(Zu, '__esModule', {value: !0});
	var jp = Ds(),
		zu = class r {
			constructor(e) {
				(this.resource = e),
					(this.resource = e),
					(this.timestamp = jp.now()),
					(this.deferred = jp.defer());
			}
			get promise() {
				return this.deferred.promise;
			}
			resolve() {
				return this.deferred.resolve(void 0), new r(this.resource);
			}
		};
	Zu.Resource = zu;
});
var Dp = l((Xu) => {
	'use strict';
	Object.defineProperty(Xu, '__esModule', {value: !0});
	var Fs = Mp(),
		JP = Lp(),
		me = Ds(),
		KP = _('events'),
		Bp = _('timers'),
		Yu = class {
			constructor(e) {
				if (
					((this.destroyed = !1),
					(this.emitter = new KP.EventEmitter()),
					(e = e || {}),
					!e.create)
				)
					throw new Error('Tarn: opt.create function most be provided');
				if (!e.destroy)
					throw new Error('Tarn: opt.destroy function most be provided');
				if (
					typeof e.min != 'number' ||
					e.min < 0 ||
					e.min !== Math.round(e.min)
				)
					throw new Error('Tarn: opt.min must be an integer >= 0');
				if (
					typeof e.max != 'number' ||
					e.max <= 0 ||
					e.max !== Math.round(e.max)
				)
					throw new Error('Tarn: opt.max must be an integer > 0');
				if (e.min > e.max)
					throw new Error('Tarn: opt.max is smaller than opt.min');
				if (!me.checkOptionalTime(e.acquireTimeoutMillis))
					throw new Error(
						'Tarn: invalid opt.acquireTimeoutMillis ' +
							JSON.stringify(e.acquireTimeoutMillis)
					);
				if (!me.checkOptionalTime(e.createTimeoutMillis))
					throw new Error(
						'Tarn: invalid opt.createTimeoutMillis ' +
							JSON.stringify(e.createTimeoutMillis)
					);
				if (!me.checkOptionalTime(e.destroyTimeoutMillis))
					throw new Error(
						'Tarn: invalid opt.destroyTimeoutMillis ' +
							JSON.stringify(e.destroyTimeoutMillis)
					);
				if (!me.checkOptionalTime(e.idleTimeoutMillis))
					throw new Error(
						'Tarn: invalid opt.idleTimeoutMillis ' +
							JSON.stringify(e.idleTimeoutMillis)
					);
				if (!me.checkOptionalTime(e.reapIntervalMillis))
					throw new Error(
						'Tarn: invalid opt.reapIntervalMillis ' +
							JSON.stringify(e.reapIntervalMillis)
					);
				if (!me.checkOptionalTime(e.createRetryIntervalMillis))
					throw new Error(
						'Tarn: invalid opt.createRetryIntervalMillis ' +
							JSON.stringify(e.createRetryIntervalMillis)
					);
				let t = {
					create: !0,
					validate: !0,
					destroy: !0,
					log: !0,
					min: !0,
					max: !0,
					acquireTimeoutMillis: !0,
					createTimeoutMillis: !0,
					destroyTimeoutMillis: !0,
					idleTimeoutMillis: !0,
					reapIntervalMillis: !0,
					createRetryIntervalMillis: !0,
					propagateCreateError: !0,
				};
				for (let n of Object.keys(e))
					if (!t[n]) throw new Error(`Tarn: unsupported option opt.${n}`);
				(this.creator = e.create),
					(this.destroyer = e.destroy),
					(this.validate =
						typeof e.validate == 'function' ? e.validate : () => !0),
					(this.log = e.log || (() => {})),
					(this.acquireTimeoutMillis = e.acquireTimeoutMillis || 3e4),
					(this.createTimeoutMillis = e.createTimeoutMillis || 3e4),
					(this.destroyTimeoutMillis = e.destroyTimeoutMillis || 5e3),
					(this.idleTimeoutMillis = e.idleTimeoutMillis || 3e4),
					(this.reapIntervalMillis = e.reapIntervalMillis || 1e3),
					(this.createRetryIntervalMillis = e.createRetryIntervalMillis || 200),
					(this.propagateCreateError = !!e.propagateCreateError),
					(this.min = e.min),
					(this.max = e.max),
					(this.used = []),
					(this.free = []),
					(this.pendingCreates = []),
					(this.pendingAcquires = []),
					(this.pendingDestroys = []),
					(this.pendingValidations = []),
					(this.destroyed = !1),
					(this.interval = null),
					(this.eventId = 1);
			}
			numUsed() {
				return this.used.length;
			}
			numFree() {
				return this.free.length;
			}
			numPendingAcquires() {
				return this.pendingAcquires.length;
			}
			numPendingValidations() {
				return this.pendingValidations.length;
			}
			numPendingCreates() {
				return this.pendingCreates.length;
			}
			acquire() {
				let e = this.eventId++;
				this._executeEventHandlers('acquireRequest', e);
				let t = new Fs.PendingOperation(this.acquireTimeoutMillis);
				return (
					this.pendingAcquires.push(t),
					(t.promise = t.promise
						.then(
							(n) => (this._executeEventHandlers('acquireSuccess', e, n), n)
						)
						.catch(
							(n) => (
								this._executeEventHandlers('acquireFail', e, n),
								Xr(this.pendingAcquires, t),
								Promise.reject(n)
							)
						)),
					this._tryAcquireOrCreate(),
					t
				);
			}
			release(e) {
				this._executeEventHandlers('release', e);
				for (let t = 0, n = this.used.length; t < n; ++t) {
					let i = this.used[t];
					if (i.resource === e)
						return (
							this.used.splice(t, 1),
							this.free.push(i.resolve()),
							this._tryAcquireOrCreate(),
							!0
						);
				}
				return !1;
			}
			isEmpty() {
				return (
					[
						this.numFree(),
						this.numUsed(),
						this.numPendingAcquires(),
						this.numPendingValidations(),
						this.numPendingCreates(),
					].reduce((e, t) => e + t) === 0
				);
			}
			check() {
				let e = me.now(),
					t = [],
					n = this.min - this.used.length,
					i = this.free.length - n,
					s = 0;
				this.free.forEach((o) => {
					me.duration(e, o.timestamp) >= this.idleTimeoutMillis && s < i
						? (s++, this._destroy(o.resource))
						: t.push(o);
				}),
					(this.free = t),
					this.isEmpty() && this._stopReaping();
			}
			destroy() {
				let e = this.eventId++;
				return (
					this._executeEventHandlers('poolDestroyRequest', e),
					this._stopReaping(),
					(this.destroyed = !0),
					me
						.reflect(
							Promise.all(this.pendingCreates.map((t) => me.reflect(t.promise)))
								.then(
									() =>
										new Promise((t, n) => {
											if (this.numPendingValidations() === 0) {
												t();
												return;
											}
											let i = setInterval(() => {
												this.numPendingValidations() === 0 &&
													(Bp.clearInterval(i), t());
											}, 100);
										})
								)
								.then(() =>
									Promise.all(this.used.map((t) => me.reflect(t.promise)))
								)
								.then(() =>
									Promise.all(
										this.pendingAcquires.map(
											(t) => (t.abort(), me.reflect(t.promise))
										)
									)
								)
								.then(() =>
									Promise.all(
										this.free.map((t) => me.reflect(this._destroy(t.resource)))
									)
								)
								.then(() =>
									Promise.all(this.pendingDestroys.map((t) => t.promise))
								)
								.then(() => {
									(this.free = []), (this.pendingAcquires = []);
								})
						)
						.then(
							(t) => (
								this._executeEventHandlers('poolDestroySuccess', e),
								this.emitter.removeAllListeners(),
								t
							)
						)
				);
			}
			on(e, t) {
				this.emitter.on(e, t);
			}
			removeListener(e, t) {
				this.emitter.removeListener(e, t);
			}
			removeAllListeners(e) {
				this.emitter.removeAllListeners(e);
			}
			_tryAcquireOrCreate() {
				this.destroyed ||
					(this._hasFreeResources()
						? this._doAcquire()
						: this._shouldCreateMoreResources() && this._doCreate());
			}
			_hasFreeResources() {
				return this.free.length > 0;
			}
			_doAcquire() {
				for (; this._canAcquire(); ) {
					let e = this.pendingAcquires.shift(),
						t = this.free.pop();
					if (t === void 0 || e === void 0) {
						let i = 'this.free was empty while trying to acquire resource';
						throw (
							(this.log(`Tarn: ${i}`, 'warn'),
							new Error(`Internal error, should never happen. ${i}`))
						);
					}
					this.pendingValidations.push(e), this.used.push(t);
					let n = new Fs.PendingOperation(this.acquireTimeoutMillis);
					e.promise.catch((i) => {
						n.abort();
					}),
						n.promise
							.catch(
								(i) => (
									this.log(
										'Tarn: resource validator threw an exception ' + i.stack,
										'warn'
									),
									!1
								)
							)
							.then((i) => {
								try {
									i && !e.isRejected
										? (this._startReaping(), e.resolve(t.resource))
										: (Xr(this.used, t),
											i
												? this.free.push(t)
												: (this._destroy(t.resource),
													setTimeout(() => {
														this._tryAcquireOrCreate();
													}, 0)),
											e.isRejected || this.pendingAcquires.unshift(e));
								} finally {
									Xr(this.pendingValidations, e);
								}
							}),
						this._validateResource(t.resource)
							.then((i) => {
								n.resolve(i);
							})
							.catch((i) => {
								n.reject(i);
							});
				}
			}
			_canAcquire() {
				return this.free.length > 0 && this.pendingAcquires.length > 0;
			}
			_validateResource(e) {
				try {
					return Promise.resolve(this.validate(e));
				} catch (t) {
					return Promise.reject(t);
				}
			}
			_shouldCreateMoreResources() {
				return (
					this.used.length + this.pendingCreates.length < this.max &&
					this.pendingCreates.length < this.pendingAcquires.length
				);
			}
			_doCreate() {
				let e = this.pendingAcquires.slice();
				this._create()
					.promise.then(() => (this._tryAcquireOrCreate(), null))
					.catch((n) => {
						this.propagateCreateError &&
							this.pendingAcquires.length !== 0 &&
							this.pendingAcquires[0].reject(n),
							e.forEach((i) => {
								i.possibleTimeoutCause = n;
							}),
							me
								.delay(this.createRetryIntervalMillis)
								.then(() => this._tryAcquireOrCreate());
					});
			}
			_create() {
				let e = this.eventId++;
				this._executeEventHandlers('createRequest', e);
				let t = new Fs.PendingOperation(this.createTimeoutMillis);
				return (
					(t.promise = t.promise.catch((n) => {
						throw (
							(Xr(this.pendingCreates, t) &&
								this._executeEventHandlers('createFail', e, n),
							n)
						);
					})),
					this.pendingCreates.push(t),
					zP(this.creator)
						.then((n) =>
							t.isRejected
								? (this.destroyer(n), null)
								: (Xr(this.pendingCreates, t),
									this.free.push(new JP.Resource(n)),
									t.resolve(n),
									this._executeEventHandlers('createSuccess', e, n),
									null)
						)
						.catch(
							(n) => (
								t.isRejected ||
									(Xr(this.pendingCreates, t) &&
										this._executeEventHandlers('createFail', e, n),
									t.reject(n)),
								null
							)
						),
					t
				);
			}
			_destroy(e) {
				let t = this.eventId++;
				this._executeEventHandlers('destroyRequest', t, e);
				let n = new Fs.PendingOperation(this.destroyTimeoutMillis);
				return (
					Promise.resolve()
						.then(() => this.destroyer(e))
						.then(() => {
							n.resolve(e);
						})
						.catch((s) => {
							n.reject(s);
						}),
					this.pendingDestroys.push(n),
					n.promise
						.then(
							(s) => (this._executeEventHandlers('destroySuccess', t, e), s)
						)
						.catch((s) => this._logDestroyerError(t, e, s))
						.then((s) => {
							let o = this.pendingDestroys.findIndex((a) => a === n);
							return this.pendingDestroys.splice(o, 1), s;
						})
				);
			}
			_logDestroyerError(e, t, n) {
				this._executeEventHandlers('destroyFail', e, t, n),
					this.log(
						'Tarn: resource destroyer threw an exception ' + n.stack,
						'warn'
					);
			}
			_startReaping() {
				this.interval ||
					(this._executeEventHandlers('startReaping'),
					(this.interval = setInterval(
						() => this.check(),
						this.reapIntervalMillis
					)));
			}
			_stopReaping() {
				this.interval !== null &&
					(this._executeEventHandlers('stopReaping'),
					Bp.clearInterval(this.interval)),
					(this.interval = null);
			}
			_executeEventHandlers(e, ...t) {
				this.emitter.listeners(e).forEach((i) => {
					try {
						i(...t);
					} catch (s) {
						this.log(
							`Tarn: event handler "${e}" threw an exception ${s.stack}`,
							'warn'
						);
					}
				});
			}
		};
	Xu.Pool = Yu;
	function Xr(r, e) {
		let t = r.indexOf(e);
		return t === -1 ? !1 : (r.splice(t, 1), !0);
	}
	function zP(r) {
		return new Promise((e, t) => {
			let n = (i, s) => {
				i ? t(i) : e(s);
			};
			me.tryPromise(() => r(n))
				.then((i) => {
					i && e(i);
				})
				.catch((i) => {
					t(i);
				});
		});
	}
});
var Hp = l((Qs, Qp) => {
	'use strict';
	Object.defineProperty(Qs, '__esModule', {value: !0});
	var Up = Dp();
	Qs.Pool = Up.Pool;
	var Fp = Wu();
	Qs.TimeoutError = Fp.TimeoutError;
	Qp.exports = {Pool: Up.Pool, TimeoutError: Fp.TimeoutError};
});
var Ws = l((zoe, Kp) => {
	var Hs = /[\0\b\t\n\r\x1a"'\\]/g,
		Wp = {
			'\0': '\\0',
			'\b': '\\b',
			'	': '\\t',
			'\n': '\\n',
			'\r': '\\r',
			'': '\\Z',
			'"': '\\"',
			"'": "\\'",
			'\\': '\\\\',
		};
	function ZP(r) {
		return function e(t, n = {}) {
			return r(t, e, n);
		};
	}
	function YP(r = {}) {
		let e = r.escapeDate || Jp,
			t = r.escapeArray || ec,
			n = r.escapeBuffer || Gp,
			i = r.escapeString || tc,
			s = r.escapeObject || Vp,
			o = r.wrap || ZP;
		function a(u, c, h) {
			if (u == null) return 'NULL';
			switch (typeof u) {
				case 'boolean':
					return u ? 'true' : 'false';
				case 'number':
					return u + '';
				case 'object':
					if (u instanceof Date) u = e(u, c, h);
					else
						return Array.isArray(u)
							? t(u, c, h)
							: Buffer.isBuffer(u)
								? n(u, c, h)
								: s(u, c, h);
			}
			return i(u, c, h);
		}
		return o ? o(a) : a;
	}
	function Vp(r, e, t) {
		return r && typeof r.toSQL == 'function' ? r.toSQL(t) : JSON.stringify(r);
	}
	function ec(r, e, t) {
		let n = '';
		for (let i = 0; i < r.length; i++) {
			let s = r[i];
			Array.isArray(s)
				? (n += (i === 0 ? '' : ', ') + '(' + ec(s, e, t) + ')')
				: (n += (i === 0 ? '' : ', ') + e(s, t));
		}
		return n;
	}
	function Gp(r) {
		return 'X' + tc(r.toString('hex'));
	}
	function tc(r, e, t) {
		let n = (Hs.lastIndex = 0),
			i = '',
			s;
		for (; (s = Hs.exec(r)); )
			(i += r.slice(n, s.index) + Wp[s[0]]), (n = Hs.lastIndex);
		return n === 0
			? "'" + r + "'"
			: n < r.length
				? "'" + i + r.slice(n) + "'"
				: "'" + i + "'";
	}
	function Jp(r, e, t = {}) {
		let n = t.timeZone || 'local',
			i = new Date(r),
			s,
			o,
			a,
			u,
			c,
			h,
			d;
		if (n === 'local')
			(s = i.getFullYear()),
				(o = i.getMonth() + 1),
				(a = i.getDate()),
				(u = i.getHours()),
				(c = i.getMinutes()),
				(h = i.getSeconds()),
				(d = i.getMilliseconds());
		else {
			let f = XP(n);
			f !== !1 && f !== 0 && i.setTime(i.getTime() + f * 6e4),
				(s = i.getUTCFullYear()),
				(o = i.getUTCMonth() + 1),
				(a = i.getUTCDate()),
				(u = i.getUTCHours()),
				(c = i.getUTCMinutes()),
				(h = i.getUTCSeconds()),
				(d = i.getUTCMilliseconds());
		}
		return (
			ur(s, 4) +
			'-' +
			ur(o, 2) +
			'-' +
			ur(a, 2) +
			' ' +
			ur(u, 2) +
			':' +
			ur(c, 2) +
			':' +
			ur(h, 2) +
			'.' +
			ur(d, 3)
		);
	}
	function ur(r, e) {
		for (r = r.toString(); r.length < e; ) r = '0' + r;
		return r;
	}
	function XP(r) {
		if (r === 'Z') return 0;
		let e = r.match(/([+\-\s])(\d\d):?(\d\d)?/);
		return e
			? (e[1] == '-' ? -1 : 1) *
					(parseInt(e[2], 10) + (e[3] ? parseInt(e[3], 10) : 0) / 60) *
					60
			: !1;
	}
	Kp.exports = {
		arrayToList: ec,
		bufferToString: Gp,
		dateToString: Jp,
		escapeString: tc,
		charsRegex: Hs,
		charsMap: Wp,
		escapeObject: Vp,
		makeEscape: YP,
	};
});
var Zp = l((Zoe, zp) => {
	function ek() {
		(this.__data__ = []), (this.size = 0);
	}
	zp.exports = ek;
});
var vt = l((Yoe, Yp) => {
	function tk(r, e) {
		return r === e || (r !== r && e !== e);
	}
	Yp.exports = tk;
});
var li = l((Xoe, Xp) => {
	var rk = vt();
	function nk(r, e) {
		for (var t = r.length; t--; ) if (rk(r[t][0], e)) return t;
		return -1;
	}
	Xp.exports = nk;
});
var tm = l((eae, em) => {
	var ik = li(),
		sk = Array.prototype,
		ok = sk.splice;
	function ak(r) {
		var e = this.__data__,
			t = ik(e, r);
		if (t < 0) return !1;
		var n = e.length - 1;
		return t == n ? e.pop() : ok.call(e, t, 1), --this.size, !0;
	}
	em.exports = ak;
});
var nm = l((tae, rm) => {
	var uk = li();
	function ck(r) {
		var e = this.__data__,
			t = uk(e, r);
		return t < 0 ? void 0 : e[t][1];
	}
	rm.exports = ck;
});
var sm = l((rae, im) => {
	var lk = li();
	function hk(r) {
		return lk(this.__data__, r) > -1;
	}
	im.exports = hk;
});
var am = l((nae, om) => {
	var dk = li();
	function fk(r, e) {
		var t = this.__data__,
			n = dk(t, r);
		return n < 0 ? (++this.size, t.push([r, e])) : (t[n][1] = e), this;
	}
	om.exports = fk;
});
var hi = l((iae, um) => {
	var pk = Zp(),
		mk = tm(),
		gk = nm(),
		yk = sm(),
		bk = am();
	function en(r) {
		var e = -1,
			t = r == null ? 0 : r.length;
		for (this.clear(); ++e < t; ) {
			var n = r[e];
			this.set(n[0], n[1]);
		}
	}
	en.prototype.clear = pk;
	en.prototype.delete = mk;
	en.prototype.get = gk;
	en.prototype.has = yk;
	en.prototype.set = bk;
	um.exports = en;
});
var lm = l((sae, cm) => {
	var _k = hi();
	function wk() {
		(this.__data__ = new _k()), (this.size = 0);
	}
	cm.exports = wk;
});
var dm = l((oae, hm) => {
	function vk(r) {
		var e = this.__data__,
			t = e.delete(r);
		return (this.size = e.size), t;
	}
	hm.exports = vk;
});
var pm = l((aae, fm) => {
	function Ek(r) {
		return this.__data__.get(r);
	}
	fm.exports = Ek;
});
var gm = l((uae, mm) => {
	function xk(r) {
		return this.__data__.has(r);
	}
	mm.exports = xk;
});
var rc = l((cae, ym) => {
	var Ck =
		typeof global == 'object' && global && global.Object === Object && global;
	ym.exports = Ck;
});
var Le = l((lae, bm) => {
	var qk = rc(),
		Tk = typeof self == 'object' && self && self.Object === Object && self,
		Ak = qk || Tk || Function('return this')();
	bm.exports = Ak;
});
var Et = l((hae, _m) => {
	var Sk = Le(),
		Ok = Sk.Symbol;
	_m.exports = Ok;
});
var xm = l((dae, Em) => {
	var wm = Et(),
		vm = Object.prototype,
		Rk = vm.hasOwnProperty,
		Nk = vm.toString,
		di = wm ? wm.toStringTag : void 0;
	function Ik(r) {
		var e = Rk.call(r, di),
			t = r[di];
		try {
			r[di] = void 0;
			var n = !0;
		} catch {}
		var i = Nk.call(r);
		return n && (e ? (r[di] = t) : delete r[di]), i;
	}
	Em.exports = Ik;
});
var qm = l((fae, Cm) => {
	var Pk = Object.prototype,
		kk = Pk.toString;
	function $k(r) {
		return kk.call(r);
	}
	Cm.exports = $k;
});
var st = l((pae, Sm) => {
	var Tm = Et(),
		Mk = xm(),
		jk = qm(),
		Lk = '[object Null]',
		Bk = '[object Undefined]',
		Am = Tm ? Tm.toStringTag : void 0;
	function Dk(r) {
		return r == null
			? r === void 0
				? Bk
				: Lk
			: Am && Am in Object(r)
				? Mk(r)
				: jk(r);
	}
	Sm.exports = Dk;
});
var qe = l((mae, Om) => {
	function Uk(r) {
		var e = typeof r;
		return r != null && (e == 'object' || e == 'function');
	}
	Om.exports = Uk;
});
var fi = l((gae, Rm) => {
	var Fk = st(),
		Qk = qe(),
		Hk = '[object AsyncFunction]',
		Wk = '[object Function]',
		Vk = '[object GeneratorFunction]',
		Gk = '[object Proxy]';
	function Jk(r) {
		if (!Qk(r)) return !1;
		var e = Fk(r);
		return e == Wk || e == Vk || e == Hk || e == Gk;
	}
	Rm.exports = Jk;
});
var Im = l((yae, Nm) => {
	var Kk = Le(),
		zk = Kk['__core-js_shared__'];
	Nm.exports = zk;
});
var $m = l((bae, km) => {
	var nc = Im(),
		Pm = (function () {
			var r = /[^.]+$/.exec((nc && nc.keys && nc.keys.IE_PROTO) || '');
			return r ? 'Symbol(src)_1.' + r : '';
		})();
	function Zk(r) {
		return !!Pm && Pm in r;
	}
	km.exports = Zk;
});
var ic = l((_ae, Mm) => {
	var Yk = Function.prototype,
		Xk = Yk.toString;
	function e$(r) {
		if (r != null) {
			try {
				return Xk.call(r);
			} catch {}
			try {
				return r + '';
			} catch {}
		}
		return '';
	}
	Mm.exports = e$;
});
var Lm = l((wae, jm) => {
	var t$ = fi(),
		r$ = $m(),
		n$ = qe(),
		i$ = ic(),
		s$ = /[\\^$.*+?()[\]{}|]/g,
		o$ = /^\[object .+?Constructor\]$/,
		a$ = Function.prototype,
		u$ = Object.prototype,
		c$ = a$.toString,
		l$ = u$.hasOwnProperty,
		h$ = RegExp(
			'^' +
				c$
					.call(l$)
					.replace(s$, '\\$&')
					.replace(
						/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
						'$1.*?'
					) +
				'$'
		);
	function d$(r) {
		if (!n$(r) || r$(r)) return !1;
		var e = t$(r) ? h$ : o$;
		return e.test(i$(r));
	}
	jm.exports = d$;
});
var Dm = l((vae, Bm) => {
	function f$(r, e) {
		return r?.[e];
	}
	Bm.exports = f$;
});
var xt = l((Eae, Um) => {
	var p$ = Lm(),
		m$ = Dm();
	function g$(r, e) {
		var t = m$(r, e);
		return p$(t) ? t : void 0;
	}
	Um.exports = g$;
});
var Vs = l((xae, Fm) => {
	var y$ = xt(),
		b$ = Le(),
		_$ = y$(b$, 'Map');
	Fm.exports = _$;
});
var pi = l((Cae, Qm) => {
	var w$ = xt(),
		v$ = w$(Object, 'create');
	Qm.exports = v$;
});
var Vm = l((qae, Wm) => {
	var Hm = pi();
	function E$() {
		(this.__data__ = Hm ? Hm(null) : {}), (this.size = 0);
	}
	Wm.exports = E$;
});
var Jm = l((Tae, Gm) => {
	function x$(r) {
		var e = this.has(r) && delete this.__data__[r];
		return (this.size -= e ? 1 : 0), e;
	}
	Gm.exports = x$;
});
var zm = l((Aae, Km) => {
	var C$ = pi(),
		q$ = '__lodash_hash_undefined__',
		T$ = Object.prototype,
		A$ = T$.hasOwnProperty;
	function S$(r) {
		var e = this.__data__;
		if (C$) {
			var t = e[r];
			return t === q$ ? void 0 : t;
		}
		return A$.call(e, r) ? e[r] : void 0;
	}
	Km.exports = S$;
});
var Ym = l((Sae, Zm) => {
	var O$ = pi(),
		R$ = Object.prototype,
		N$ = R$.hasOwnProperty;
	function I$(r) {
		var e = this.__data__;
		return O$ ? e[r] !== void 0 : N$.call(e, r);
	}
	Zm.exports = I$;
});
var eg = l((Oae, Xm) => {
	var P$ = pi(),
		k$ = '__lodash_hash_undefined__';
	function $$(r, e) {
		var t = this.__data__;
		return (
			(this.size += this.has(r) ? 0 : 1),
			(t[r] = P$ && e === void 0 ? k$ : e),
			this
		);
	}
	Xm.exports = $$;
});
var rg = l((Rae, tg) => {
	var M$ = Vm(),
		j$ = Jm(),
		L$ = zm(),
		B$ = Ym(),
		D$ = eg();
	function tn(r) {
		var e = -1,
			t = r == null ? 0 : r.length;
		for (this.clear(); ++e < t; ) {
			var n = r[e];
			this.set(n[0], n[1]);
		}
	}
	tn.prototype.clear = M$;
	tn.prototype.delete = j$;
	tn.prototype.get = L$;
	tn.prototype.has = B$;
	tn.prototype.set = D$;
	tg.exports = tn;
});
var sg = l((Nae, ig) => {
	var ng = rg(),
		U$ = hi(),
		F$ = Vs();
	function Q$() {
		(this.size = 0),
			(this.__data__ = {
				hash: new ng(),
				map: new (F$ || U$)(),
				string: new ng(),
			});
	}
	ig.exports = Q$;
});
var ag = l((Iae, og) => {
	function H$(r) {
		var e = typeof r;
		return e == 'string' || e == 'number' || e == 'symbol' || e == 'boolean'
			? r !== '__proto__'
			: r === null;
	}
	og.exports = H$;
});
var mi = l((Pae, ug) => {
	var W$ = ag();
	function V$(r, e) {
		var t = r.__data__;
		return W$(e) ? t[typeof e == 'string' ? 'string' : 'hash'] : t.map;
	}
	ug.exports = V$;
});
var lg = l((kae, cg) => {
	var G$ = mi();
	function J$(r) {
		var e = G$(this, r).delete(r);
		return (this.size -= e ? 1 : 0), e;
	}
	cg.exports = J$;
});
var dg = l(($ae, hg) => {
	var K$ = mi();
	function z$(r) {
		return K$(this, r).get(r);
	}
	hg.exports = z$;
});
var pg = l((Mae, fg) => {
	var Z$ = mi();
	function Y$(r) {
		return Z$(this, r).has(r);
	}
	fg.exports = Y$;
});
var gg = l((jae, mg) => {
	var X$ = mi();
	function e1(r, e) {
		var t = X$(this, r),
			n = t.size;
		return t.set(r, e), (this.size += t.size == n ? 0 : 1), this;
	}
	mg.exports = e1;
});
var Gs = l((Lae, yg) => {
	var t1 = sg(),
		r1 = lg(),
		n1 = dg(),
		i1 = pg(),
		s1 = gg();
	function rn(r) {
		var e = -1,
			t = r == null ? 0 : r.length;
		for (this.clear(); ++e < t; ) {
			var n = r[e];
			this.set(n[0], n[1]);
		}
	}
	rn.prototype.clear = t1;
	rn.prototype.delete = r1;
	rn.prototype.get = n1;
	rn.prototype.has = i1;
	rn.prototype.set = s1;
	yg.exports = rn;
});
var _g = l((Bae, bg) => {
	var o1 = hi(),
		a1 = Vs(),
		u1 = Gs(),
		c1 = 200;
	function l1(r, e) {
		var t = this.__data__;
		if (t instanceof o1) {
			var n = t.__data__;
			if (!a1 || n.length < c1 - 1)
				return n.push([r, e]), (this.size = ++t.size), this;
			t = this.__data__ = new u1(n);
		}
		return t.set(r, e), (this.size = t.size), this;
	}
	bg.exports = l1;
});
var gi = l((Dae, wg) => {
	var h1 = hi(),
		d1 = lm(),
		f1 = dm(),
		p1 = pm(),
		m1 = gm(),
		g1 = _g();
	function nn(r) {
		var e = (this.__data__ = new h1(r));
		this.size = e.size;
	}
	nn.prototype.clear = d1;
	nn.prototype.delete = f1;
	nn.prototype.get = p1;
	nn.prototype.has = m1;
	nn.prototype.set = g1;
	wg.exports = nn;
});
var Js = l((Uae, vg) => {
	function y1(r, e) {
		for (
			var t = -1, n = r == null ? 0 : r.length;
			++t < n && e(r[t], t, r) !== !1;

		);
		return r;
	}
	vg.exports = y1;
});
var sc = l((Fae, Eg) => {
	var b1 = xt(),
		_1 = (function () {
			try {
				var r = b1(Object, 'defineProperty');
				return r({}, '', {}), r;
			} catch {}
		})();
	Eg.exports = _1;
});
var yi = l((Qae, Cg) => {
	var xg = sc();
	function w1(r, e, t) {
		e == '__proto__' && xg
			? xg(r, e, {configurable: !0, enumerable: !0, value: t, writable: !0})
			: (r[e] = t);
	}
	Cg.exports = w1;
});
var bi = l((Hae, qg) => {
	var v1 = yi(),
		E1 = vt(),
		x1 = Object.prototype,
		C1 = x1.hasOwnProperty;
	function q1(r, e, t) {
		var n = r[e];
		(!(C1.call(r, e) && E1(n, t)) || (t === void 0 && !(e in r))) &&
			v1(r, e, t);
	}
	qg.exports = q1;
});
var ot = l((Wae, Tg) => {
	var T1 = bi(),
		A1 = yi();
	function S1(r, e, t, n) {
		var i = !t;
		t || (t = {});
		for (var s = -1, o = e.length; ++s < o; ) {
			var a = e[s],
				u = n ? n(t[a], r[a], a, t, r) : void 0;
			u === void 0 && (u = r[a]), i ? A1(t, a, u) : T1(t, a, u);
		}
		return t;
	}
	Tg.exports = S1;
});
var Sg = l((Vae, Ag) => {
	function O1(r, e) {
		for (var t = -1, n = Array(r); ++t < r; ) n[t] = e(t);
		return n;
	}
	Ag.exports = O1;
});
var Ne = l((Gae, Og) => {
	function R1(r) {
		return r != null && typeof r == 'object';
	}
	Og.exports = R1;
});
var Ng = l((Jae, Rg) => {
	var N1 = st(),
		I1 = Ne(),
		P1 = '[object Arguments]';
	function k1(r) {
		return I1(r) && N1(r) == P1;
	}
	Rg.exports = k1;
});
var sn = l((Kae, kg) => {
	var Ig = Ng(),
		$1 = Ne(),
		Pg = Object.prototype,
		M1 = Pg.hasOwnProperty,
		j1 = Pg.propertyIsEnumerable,
		L1 = Ig(
			(function () {
				return arguments;
			})()
		)
			? Ig
			: function (r) {
					return $1(r) && M1.call(r, 'callee') && !j1.call(r, 'callee');
				};
	kg.exports = L1;
});
var V = l((zae, $g) => {
	var B1 = Array.isArray;
	$g.exports = B1;
});
var jg = l((Zae, Mg) => {
	function D1() {
		return !1;
	}
	Mg.exports = D1;
});
var cr = l((_i, on) => {
	var U1 = Le(),
		F1 = jg(),
		Dg = typeof _i == 'object' && _i && !_i.nodeType && _i,
		Lg = Dg && typeof on == 'object' && on && !on.nodeType && on,
		Q1 = Lg && Lg.exports === Dg,
		Bg = Q1 ? U1.Buffer : void 0,
		H1 = Bg ? Bg.isBuffer : void 0,
		W1 = H1 || F1;
	on.exports = W1;
});
var wi = l((Yae, Ug) => {
	var V1 = 9007199254740991,
		G1 = /^(?:0|[1-9]\d*)$/;
	function J1(r, e) {
		var t = typeof r;
		return (
			(e = e ?? V1),
			!!e &&
				(t == 'number' || (t != 'symbol' && G1.test(r))) &&
				r > -1 &&
				r % 1 == 0 &&
				r < e
		);
	}
	Ug.exports = J1;
});
var Ks = l((Xae, Fg) => {
	var K1 = 9007199254740991;
	function z1(r) {
		return typeof r == 'number' && r > -1 && r % 1 == 0 && r <= K1;
	}
	Fg.exports = z1;
});
var Hg = l((eue, Qg) => {
	var Z1 = st(),
		Y1 = Ks(),
		X1 = Ne(),
		eM = '[object Arguments]',
		tM = '[object Array]',
		rM = '[object Boolean]',
		nM = '[object Date]',
		iM = '[object Error]',
		sM = '[object Function]',
		oM = '[object Map]',
		aM = '[object Number]',
		uM = '[object Object]',
		cM = '[object RegExp]',
		lM = '[object Set]',
		hM = '[object String]',
		dM = '[object WeakMap]',
		fM = '[object ArrayBuffer]',
		pM = '[object DataView]',
		mM = '[object Float32Array]',
		gM = '[object Float64Array]',
		yM = '[object Int8Array]',
		bM = '[object Int16Array]',
		_M = '[object Int32Array]',
		wM = '[object Uint8Array]',
		vM = '[object Uint8ClampedArray]',
		EM = '[object Uint16Array]',
		xM = '[object Uint32Array]',
		Q = {};
	Q[mM] = Q[gM] = Q[yM] = Q[bM] = Q[_M] = Q[wM] = Q[vM] = Q[EM] = Q[xM] = !0;
	Q[eM] =
		Q[tM] =
		Q[fM] =
		Q[rM] =
		Q[pM] =
		Q[nM] =
		Q[iM] =
		Q[sM] =
		Q[oM] =
		Q[aM] =
		Q[uM] =
		Q[cM] =
		Q[lM] =
		Q[hM] =
		Q[dM] =
			!1;
	function CM(r) {
		return X1(r) && Y1(r.length) && !!Q[Z1(r)];
	}
	Qg.exports = CM;
});
var an = l((tue, Wg) => {
	function qM(r) {
		return function (e) {
			return r(e);
		};
	}
	Wg.exports = qM;
});
var zs = l((vi, un) => {
	var TM = rc(),
		Vg = typeof vi == 'object' && vi && !vi.nodeType && vi,
		Ei = Vg && typeof un == 'object' && un && !un.nodeType && un,
		AM = Ei && Ei.exports === Vg,
		oc = AM && TM.process,
		SM = (function () {
			try {
				var r = Ei && Ei.require && Ei.require('util').types;
				return r || (oc && oc.binding && oc.binding('util'));
			} catch {}
		})();
	un.exports = SM;
});
var lr = l((rue, Kg) => {
	var OM = Hg(),
		RM = an(),
		Gg = zs(),
		Jg = Gg && Gg.isTypedArray,
		NM = Jg ? RM(Jg) : OM;
	Kg.exports = NM;
});
var ac = l((nue, zg) => {
	var IM = Sg(),
		PM = sn(),
		kM = V(),
		$M = cr(),
		MM = wi(),
		jM = lr(),
		LM = Object.prototype,
		BM = LM.hasOwnProperty;
	function DM(r, e) {
		var t = kM(r),
			n = !t && PM(r),
			i = !t && !n && $M(r),
			s = !t && !n && !i && jM(r),
			o = t || n || i || s,
			a = o ? IM(r.length, String) : [],
			u = a.length;
		for (var c in r)
			(e || BM.call(r, c)) &&
				!(
					o &&
					(c == 'length' ||
						(i && (c == 'offset' || c == 'parent')) ||
						(s && (c == 'buffer' || c == 'byteLength' || c == 'byteOffset')) ||
						MM(c, u))
				) &&
				a.push(c);
		return a;
	}
	zg.exports = DM;
});
var cn = l((iue, Zg) => {
	var UM = Object.prototype;
	function FM(r) {
		var e = r && r.constructor,
			t = (typeof e == 'function' && e.prototype) || UM;
		return r === t;
	}
	Zg.exports = FM;
});
var uc = l((sue, Yg) => {
	function QM(r, e) {
		return function (t) {
			return r(e(t));
		};
	}
	Yg.exports = QM;
});
var ey = l((oue, Xg) => {
	var HM = uc(),
		WM = HM(Object.keys, Object);
	Xg.exports = WM;
});
var cc = l((aue, ty) => {
	var VM = cn(),
		GM = ey(),
		JM = Object.prototype,
		KM = JM.hasOwnProperty;
	function zM(r) {
		if (!VM(r)) return GM(r);
		var e = [];
		for (var t in Object(r)) KM.call(r, t) && t != 'constructor' && e.push(t);
		return e;
	}
	ty.exports = zM;
});
var Be = l((uue, ry) => {
	var ZM = fi(),
		YM = Ks();
	function XM(r) {
		return r != null && YM(r.length) && !ZM(r);
	}
	ry.exports = XM;
});
var at = l((cue, ny) => {
	var ej = ac(),
		tj = cc(),
		rj = Be();
	function nj(r) {
		return rj(r) ? ej(r) : tj(r);
	}
	ny.exports = nj;
});
var sy = l((lue, iy) => {
	var ij = ot(),
		sj = at();
	function oj(r, e) {
		return r && ij(e, sj(e), r);
	}
	iy.exports = oj;
});
var ay = l((hue, oy) => {
	function aj(r) {
		var e = [];
		if (r != null) for (var t in Object(r)) e.push(t);
		return e;
	}
	oy.exports = aj;
});
var cy = l((due, uy) => {
	var uj = qe(),
		cj = cn(),
		lj = ay(),
		hj = Object.prototype,
		dj = hj.hasOwnProperty;
	function fj(r) {
		if (!uj(r)) return lj(r);
		var e = cj(r),
			t = [];
		for (var n in r) (n == 'constructor' && (e || !dj.call(r, n))) || t.push(n);
		return t;
	}
	uy.exports = fj;
});
var ut = l((fue, ly) => {
	var pj = ac(),
		mj = cy(),
		gj = Be();
	function yj(r) {
		return gj(r) ? pj(r, !0) : mj(r);
	}
	ly.exports = yj;
});
var dy = l((pue, hy) => {
	var bj = ot(),
		_j = ut();
	function wj(r, e) {
		return r && bj(e, _j(e), r);
	}
	hy.exports = wj;
});
var lc = l((xi, ln) => {
	var vj = Le(),
		gy = typeof xi == 'object' && xi && !xi.nodeType && xi,
		fy = gy && typeof ln == 'object' && ln && !ln.nodeType && ln,
		Ej = fy && fy.exports === gy,
		py = Ej ? vj.Buffer : void 0,
		my = py ? py.allocUnsafe : void 0;
	function xj(r, e) {
		if (e) return r.slice();
		var t = r.length,
			n = my ? my(t) : new r.constructor(t);
		return r.copy(n), n;
	}
	ln.exports = xj;
});
var Zs = l((mue, yy) => {
	function Cj(r, e) {
		var t = -1,
			n = r.length;
		for (e || (e = Array(n)); ++t < n; ) e[t] = r[t];
		return e;
	}
	yy.exports = Cj;
});
var Ys = l((gue, by) => {
	function qj(r, e) {
		for (var t = -1, n = r == null ? 0 : r.length, i = 0, s = []; ++t < n; ) {
			var o = r[t];
			e(o, t, r) && (s[i++] = o);
		}
		return s;
	}
	by.exports = qj;
});
var hc = l((yue, _y) => {
	function Tj() {
		return [];
	}
	_y.exports = Tj;
});
var Xs = l((bue, vy) => {
	var Aj = Ys(),
		Sj = hc(),
		Oj = Object.prototype,
		Rj = Oj.propertyIsEnumerable,
		wy = Object.getOwnPropertySymbols,
		Nj = wy
			? function (r) {
					return r == null
						? []
						: ((r = Object(r)),
							Aj(wy(r), function (e) {
								return Rj.call(r, e);
							}));
				}
			: Sj;
	vy.exports = Nj;
});
var xy = l((_ue, Ey) => {
	var Ij = ot(),
		Pj = Xs();
	function kj(r, e) {
		return Ij(r, Pj(r), e);
	}
	Ey.exports = kj;
});
var eo = l((wue, Cy) => {
	function $j(r, e) {
		for (var t = -1, n = e.length, i = r.length; ++t < n; ) r[i + t] = e[t];
		return r;
	}
	Cy.exports = $j;
});
var Ci = l((vue, qy) => {
	var Mj = uc(),
		jj = Mj(Object.getPrototypeOf, Object);
	qy.exports = jj;
});
var dc = l((Eue, Ty) => {
	var Lj = eo(),
		Bj = Ci(),
		Dj = Xs(),
		Uj = hc(),
		Fj = Object.getOwnPropertySymbols,
		Qj = Fj
			? function (r) {
					for (var e = []; r; ) Lj(e, Dj(r)), (r = Bj(r));
					return e;
				}
			: Uj;
	Ty.exports = Qj;
});
var Sy = l((xue, Ay) => {
	var Hj = ot(),
		Wj = dc();
	function Vj(r, e) {
		return Hj(r, Wj(r), e);
	}
	Ay.exports = Vj;
});
var fc = l((Cue, Oy) => {
	var Gj = eo(),
		Jj = V();
	function Kj(r, e, t) {
		var n = e(r);
		return Jj(r) ? n : Gj(n, t(r));
	}
	Oy.exports = Kj;
});
var pc = l((que, Ry) => {
	var zj = fc(),
		Zj = Xs(),
		Yj = at();
	function Xj(r) {
		return zj(r, Yj, Zj);
	}
	Ry.exports = Xj;
});
var mc = l((Tue, Ny) => {
	var eL = fc(),
		tL = dc(),
		rL = ut();
	function nL(r) {
		return eL(r, rL, tL);
	}
	Ny.exports = nL;
});
var Py = l((Aue, Iy) => {
	var iL = xt(),
		sL = Le(),
		oL = iL(sL, 'DataView');
	Iy.exports = oL;
});
var $y = l((Sue, ky) => {
	var aL = xt(),
		uL = Le(),
		cL = aL(uL, 'Promise');
	ky.exports = cL;
});
var gc = l((Oue, My) => {
	var lL = xt(),
		hL = Le(),
		dL = lL(hL, 'Set');
	My.exports = dL;
});
var Ly = l((Rue, jy) => {
	var fL = xt(),
		pL = Le(),
		mL = fL(pL, 'WeakMap');
	jy.exports = mL;
});
var dr = l((Nue, Wy) => {
	var yc = Py(),
		bc = Vs(),
		_c = $y(),
		wc = gc(),
		vc = Ly(),
		Hy = st(),
		hn = ic(),
		By = '[object Map]',
		gL = '[object Object]',
		Dy = '[object Promise]',
		Uy = '[object Set]',
		Fy = '[object WeakMap]',
		Qy = '[object DataView]',
		yL = hn(yc),
		bL = hn(bc),
		_L = hn(_c),
		wL = hn(wc),
		vL = hn(vc),
		hr = Hy;
	((yc && hr(new yc(new ArrayBuffer(1))) != Qy) ||
		(bc && hr(new bc()) != By) ||
		(_c && hr(_c.resolve()) != Dy) ||
		(wc && hr(new wc()) != Uy) ||
		(vc && hr(new vc()) != Fy)) &&
		(hr = function (r) {
			var e = Hy(r),
				t = e == gL ? r.constructor : void 0,
				n = t ? hn(t) : '';
			if (n)
				switch (n) {
					case yL:
						return Qy;
					case bL:
						return By;
					case _L:
						return Dy;
					case wL:
						return Uy;
					case vL:
						return Fy;
				}
			return e;
		});
	Wy.exports = hr;
});
var Gy = l((Iue, Vy) => {
	var EL = Object.prototype,
		xL = EL.hasOwnProperty;
	function CL(r) {
		var e = r.length,
			t = new r.constructor(e);
		return (
			e &&
				typeof r[0] == 'string' &&
				xL.call(r, 'index') &&
				((t.index = r.index), (t.input = r.input)),
			t
		);
	}
	Vy.exports = CL;
});
var Ec = l((Pue, Jy) => {
	var qL = Le(),
		TL = qL.Uint8Array;
	Jy.exports = TL;
});
var to = l((kue, zy) => {
	var Ky = Ec();
	function AL(r) {
		var e = new r.constructor(r.byteLength);
		return new Ky(e).set(new Ky(r)), e;
	}
	zy.exports = AL;
});
var Yy = l(($ue, Zy) => {
	var SL = to();
	function OL(r, e) {
		var t = e ? SL(r.buffer) : r.buffer;
		return new r.constructor(t, r.byteOffset, r.byteLength);
	}
	Zy.exports = OL;
});
var eb = l((Mue, Xy) => {
	var RL = /\w*$/;
	function NL(r) {
		var e = new r.constructor(r.source, RL.exec(r));
		return (e.lastIndex = r.lastIndex), e;
	}
	Xy.exports = NL;
});
var sb = l((jue, ib) => {
	var tb = Et(),
		rb = tb ? tb.prototype : void 0,
		nb = rb ? rb.valueOf : void 0;
	function IL(r) {
		return nb ? Object(nb.call(r)) : {};
	}
	ib.exports = IL;
});
var xc = l((Lue, ob) => {
	var PL = to();
	function kL(r, e) {
		var t = e ? PL(r.buffer) : r.buffer;
		return new r.constructor(t, r.byteOffset, r.length);
	}
	ob.exports = kL;
});
var ub = l((Bue, ab) => {
	var $L = to(),
		ML = Yy(),
		jL = eb(),
		LL = sb(),
		BL = xc(),
		DL = '[object Boolean]',
		UL = '[object Date]',
		FL = '[object Map]',
		QL = '[object Number]',
		HL = '[object RegExp]',
		WL = '[object Set]',
		VL = '[object String]',
		GL = '[object Symbol]',
		JL = '[object ArrayBuffer]',
		KL = '[object DataView]',
		zL = '[object Float32Array]',
		ZL = '[object Float64Array]',
		YL = '[object Int8Array]',
		XL = '[object Int16Array]',
		eB = '[object Int32Array]',
		tB = '[object Uint8Array]',
		rB = '[object Uint8ClampedArray]',
		nB = '[object Uint16Array]',
		iB = '[object Uint32Array]';
	function sB(r, e, t) {
		var n = r.constructor;
		switch (e) {
			case JL:
				return $L(r);
			case DL:
			case UL:
				return new n(+r);
			case KL:
				return ML(r, t);
			case zL:
			case ZL:
			case YL:
			case XL:
			case eB:
			case tB:
			case rB:
			case nB:
			case iB:
				return BL(r, t);
			case FL:
				return new n();
			case QL:
			case VL:
				return new n(r);
			case HL:
				return jL(r);
			case WL:
				return new n();
			case GL:
				return LL(r);
		}
	}
	ab.exports = sB;
});
var Cc = l((Due, lb) => {
	var oB = qe(),
		cb = Object.create,
		aB = (function () {
			function r() {}
			return function (e) {
				if (!oB(e)) return {};
				if (cb) return cb(e);
				r.prototype = e;
				var t = new r();
				return (r.prototype = void 0), t;
			};
		})();
	lb.exports = aB;
});
var qc = l((Uue, hb) => {
	var uB = Cc(),
		cB = Ci(),
		lB = cn();
	function hB(r) {
		return typeof r.constructor == 'function' && !lB(r) ? uB(cB(r)) : {};
	}
	hb.exports = hB;
});
var fb = l((Fue, db) => {
	var dB = dr(),
		fB = Ne(),
		pB = '[object Map]';
	function mB(r) {
		return fB(r) && dB(r) == pB;
	}
	db.exports = mB;
});
var yb = l((Que, gb) => {
	var gB = fb(),
		yB = an(),
		pb = zs(),
		mb = pb && pb.isMap,
		bB = mb ? yB(mb) : gB;
	gb.exports = bB;
});
var _b = l((Hue, bb) => {
	var _B = dr(),
		wB = Ne(),
		vB = '[object Set]';
	function EB(r) {
		return wB(r) && _B(r) == vB;
	}
	bb.exports = EB;
});
var xb = l((Wue, Eb) => {
	var xB = _b(),
		CB = an(),
		wb = zs(),
		vb = wb && wb.isSet,
		qB = vb ? CB(vb) : xB;
	Eb.exports = qB;
});
var Tc = l((Vue, Ab) => {
	var TB = gi(),
		AB = Js(),
		SB = bi(),
		OB = sy(),
		RB = dy(),
		NB = lc(),
		IB = Zs(),
		PB = xy(),
		kB = Sy(),
		$B = pc(),
		MB = mc(),
		jB = dr(),
		LB = Gy(),
		BB = ub(),
		DB = qc(),
		UB = V(),
		FB = cr(),
		QB = yb(),
		HB = qe(),
		WB = xb(),
		VB = at(),
		GB = ut(),
		JB = 1,
		KB = 2,
		zB = 4,
		Cb = '[object Arguments]',
		ZB = '[object Array]',
		YB = '[object Boolean]',
		XB = '[object Date]',
		eD = '[object Error]',
		qb = '[object Function]',
		tD = '[object GeneratorFunction]',
		rD = '[object Map]',
		nD = '[object Number]',
		Tb = '[object Object]',
		iD = '[object RegExp]',
		sD = '[object Set]',
		oD = '[object String]',
		aD = '[object Symbol]',
		uD = '[object WeakMap]',
		cD = '[object ArrayBuffer]',
		lD = '[object DataView]',
		hD = '[object Float32Array]',
		dD = '[object Float64Array]',
		fD = '[object Int8Array]',
		pD = '[object Int16Array]',
		mD = '[object Int32Array]',
		gD = '[object Uint8Array]',
		yD = '[object Uint8ClampedArray]',
		bD = '[object Uint16Array]',
		_D = '[object Uint32Array]',
		D = {};
	D[Cb] =
		D[ZB] =
		D[cD] =
		D[lD] =
		D[YB] =
		D[XB] =
		D[hD] =
		D[dD] =
		D[fD] =
		D[pD] =
		D[mD] =
		D[rD] =
		D[nD] =
		D[Tb] =
		D[iD] =
		D[sD] =
		D[oD] =
		D[aD] =
		D[gD] =
		D[yD] =
		D[bD] =
		D[_D] =
			!0;
	D[eD] = D[qb] = D[uD] = !1;
	function ro(r, e, t, n, i, s) {
		var o,
			a = e & JB,
			u = e & KB,
			c = e & zB;
		if ((t && (o = i ? t(r, n, i, s) : t(r)), o !== void 0)) return o;
		if (!HB(r)) return r;
		var h = UB(r);
		if (h) {
			if (((o = LB(r)), !a)) return IB(r, o);
		} else {
			var d = jB(r),
				f = d == qb || d == tD;
			if (FB(r)) return NB(r, a);
			if (d == Tb || d == Cb || (f && !i)) {
				if (((o = u || f ? {} : DB(r)), !a))
					return u ? kB(r, RB(o, r)) : PB(r, OB(o, r));
			} else {
				if (!D[d]) return i ? r : {};
				o = BB(r, d, a);
			}
		}
		s || (s = new TB());
		var m = s.get(r);
		if (m) return m;
		s.set(r, o),
			WB(r)
				? r.forEach(function (E) {
						o.add(ro(E, e, t, E, r, s));
					})
				: QB(r) &&
					r.forEach(function (E, N) {
						o.set(N, ro(E, e, t, N, r, s));
					});
		var g = c ? (u ? MB : $B) : u ? GB : VB,
			y = h ? void 0 : g(r);
		return (
			AB(y || r, function (E, N) {
				y && ((N = E), (E = r[N])), SB(o, N, ro(E, e, t, N, r, s));
			}),
			o
		);
	}
	Ab.exports = ro;
});
var Ob = l((Gue, Sb) => {
	var wD = Tc(),
		vD = 1,
		ED = 4;
	function xD(r) {
		return wD(r, vD | ED);
	}
	Sb.exports = xD;
});
var ge = l((Jue, Rb) => {
	function CD(r) {
		return r;
	}
	Rb.exports = CD;
});
var Ac = l((Kue, Nb) => {
	function qD(r, e, t) {
		switch (t.length) {
			case 0:
				return r.call(e);
			case 1:
				return r.call(e, t[0]);
			case 2:
				return r.call(e, t[0], t[1]);
			case 3:
				return r.call(e, t[0], t[1], t[2]);
		}
		return r.apply(e, t);
	}
	Nb.exports = qD;
});
var kb = l((zue, Pb) => {
	var TD = Ac(),
		Ib = Math.max;
	function AD(r, e, t) {
		return (
			(e = Ib(e === void 0 ? r.length - 1 : e, 0)),
			function () {
				for (
					var n = arguments, i = -1, s = Ib(n.length - e, 0), o = Array(s);
					++i < s;

				)
					o[i] = n[e + i];
				i = -1;
				for (var a = Array(e + 1); ++i < e; ) a[i] = n[i];
				return (a[e] = t(o)), TD(r, this, a);
			}
		);
	}
	Pb.exports = AD;
});
var Sc = l((Zue, $b) => {
	function SD(r) {
		return function () {
			return r;
		};
	}
	$b.exports = SD;
});
var Lb = l((Yue, jb) => {
	var OD = Sc(),
		Mb = sc(),
		RD = ge(),
		ND = Mb
			? function (r, e) {
					return Mb(r, 'toString', {
						configurable: !0,
						enumerable: !1,
						value: OD(e),
						writable: !0,
					});
				}
			: RD;
	jb.exports = ND;
});
var Db = l((Xue, Bb) => {
	var ID = 800,
		PD = 16,
		kD = Date.now;
	function $D(r) {
		var e = 0,
			t = 0;
		return function () {
			var n = kD(),
				i = PD - (n - t);
			if (((t = n), i > 0)) {
				if (++e >= ID) return arguments[0];
			} else e = 0;
			return r.apply(void 0, arguments);
		};
	}
	Bb.exports = $D;
});
var Fb = l((ece, Ub) => {
	var MD = Lb(),
		jD = Db(),
		LD = jD(MD);
	Ub.exports = LD;
});
var fr = l((tce, Qb) => {
	var BD = ge(),
		DD = kb(),
		UD = Fb();
	function FD(r, e) {
		return UD(DD(r, e, BD), r + '');
	}
	Qb.exports = FD;
});
var pr = l((rce, Hb) => {
	var QD = vt(),
		HD = Be(),
		WD = wi(),
		VD = qe();
	function GD(r, e, t) {
		if (!VD(t)) return !1;
		var n = typeof e;
		return (n == 'number' ? HD(t) && WD(e, t.length) : n == 'string' && e in t)
			? QD(t[e], r)
			: !1;
	}
	Hb.exports = GD;
});
var Oc = l((nce, Vb) => {
	var JD = fr(),
		KD = vt(),
		zD = pr(),
		ZD = ut(),
		Wb = Object.prototype,
		YD = Wb.hasOwnProperty,
		XD = JD(function (r, e) {
			r = Object(r);
			var t = -1,
				n = e.length,
				i = n > 2 ? e[2] : void 0;
			for (i && zD(e[0], e[1], i) && (n = 1); ++t < n; )
				for (var s = e[t], o = ZD(s), a = -1, u = o.length; ++a < u; ) {
					var c = o[a],
						h = r[c];
					(h === void 0 || (KD(h, Wb[c]) && !YD.call(r, c))) && (r[c] = s[c]);
				}
			return r;
		});
	Vb.exports = XD;
});
var mr = l((ice, Gb) => {
	function eU(r, e) {
		for (var t = -1, n = r == null ? 0 : r.length, i = Array(n); ++t < n; )
			i[t] = e(r[t], t, r);
		return i;
	}
	Gb.exports = eU;
});
var gr = l((sce, Jb) => {
	var tU = st(),
		rU = Ne(),
		nU = '[object Symbol]';
	function iU(r) {
		return typeof r == 'symbol' || (rU(r) && tU(r) == nU);
	}
	Jb.exports = iU;
});
var e_ = l((oce, Xb) => {
	var Kb = Et(),
		sU = mr(),
		oU = V(),
		aU = gr(),
		uU = 1 / 0,
		zb = Kb ? Kb.prototype : void 0,
		Zb = zb ? zb.toString : void 0;
	function Yb(r) {
		if (typeof r == 'string') return r;
		if (oU(r)) return sU(r, Yb) + '';
		if (aU(r)) return Zb ? Zb.call(r) : '';
		var e = r + '';
		return e == '0' && 1 / r == -uU ? '-0' : e;
	}
	Xb.exports = Yb;
});
var qi = l((ace, t_) => {
	var cU = e_();
	function lU(r) {
		return r == null ? '' : cU(r);
	}
	t_.exports = lU;
});
var Rc = l((uce, r_) => {
	var hU = qi(),
		dU = 0;
	function fU(r) {
		var e = ++dU;
		return hU(r) + e;
	}
	r_.exports = fU;
});
var yr = l((cce, Nc) => {
	var no = class extends Error {
		constructor(e) {
			super(e), (this.name = 'KnexTimeoutError');
		}
	};
	function pU(r, e) {
		return new Promise(function (t, n) {
			let i = setTimeout(function () {
				n(new no('operation timed out'));
			}, e);
			function s(a) {
				clearTimeout(i), t(a);
			}
			function o(a) {
				clearTimeout(i), n(a);
			}
			r.then(s, o);
		});
	}
	Nc.exports.KnexTimeoutError = no;
	Nc.exports.timeout = pU;
});
var i_ = l((lce, n_) => {
	function mU(r) {
		r.client.emit('start', r.builder), r.builder.emit('start', r.builder);
		let e = r.builder.toSQL();
		return (
			r.builder._debug && r.client.logger.debug(e),
			Array.isArray(e) ? r.queryArray(e) : r.query(e)
		);
	}
	function gU(r, e) {
		try {
			let t = r.builder.toSQL();
			if (Array.isArray(t) && e.hasHandler)
				throw new Error(
					'The stream may only be used with a single query statement.'
				);
			return r.client.stream(r.connection, t, e.stream, e.options);
		} catch (t) {
			throw (e.stream.emit('error', t), t);
		}
	}
	n_.exports = {
		ensureConnectionCallback: mU,
		ensureConnectionStreamCallback: gU,
	};
});
var a_ = l((hce, o_) => {
	var {KnexTimeoutError: s_} = yr(),
		{timeout: yU} = yr(),
		{ensureConnectionCallback: bU, ensureConnectionStreamCallback: _U} = i_(),
		Ic,
		Pc = class r {
			constructor(e, t) {
				(this.client = e),
					(this.builder = t),
					(this.queries = []),
					(this.connection = void 0);
			}
			async run() {
				let e = this;
				try {
					let t = await this.ensureConnection(bU);
					return e.builder.emit('end'), t;
				} catch (t) {
					throw (
						(e.builder._events &&
							e.builder._events.error &&
							e.builder.emit('error', t),
						t)
					);
				}
			}
			stream(e, t) {
				let n = typeof e == 'function' && arguments.length === 1,
					i = n ? {} : e,
					s = n ? e : t,
					o = typeof s == 'function';
				Ic = Ic || _('stream').Transform;
				let a = this.builder.queryContext(),
					u = new Ic({
						objectMode: !0,
						transform: (h, d, f) => {
							f(null, this.client.postProcessResponse(h, a));
						},
					});
				u.on('close', () => {
					this.client.releaseConnection(this.connection);
				}),
					u.on('pipe', (h) => {
						let d = () => {
							h.closed || h.destroy();
						};
						u.closed ? d() : u.on('close', d);
					});
				let c = this.ensureConnection(_U, {
					options: i,
					hasHandler: o,
					stream: u,
				}).catch((h) => {
					this.connection || u.emit('error', h);
				});
				return o ? (s(u), c) : u;
			}
			pipe(e, t) {
				return this.stream(t).pipe(e);
			}
			async query(e) {
				let {__knexUid: t, __knexTxId: n} = this.connection;
				this.builder.emit(
					'query',
					Object.assign({__knexUid: t, __knexTxId: n}, e)
				);
				let i = this,
					s = this.builder.queryContext();
				e !== null && typeof e == 'object' && (e.queryContext = s);
				let o = this.client.query(this.connection, e);
				return (
					e.timeout && (o = yU(o, e.timeout)),
					o
						.then((a) => this.client.processResponse(a, i))
						.then((a) => {
							let u = this.client.postProcessResponse(a, s);
							return (
								this.builder.emit(
									'query-response',
									u,
									Object.assign({__knexUid: t, __knexTxId: n}, e),
									this.builder
								),
								this.client.emit(
									'query-response',
									u,
									Object.assign({__knexUid: t, __knexTxId: n}, e),
									this.builder
								),
								u
							);
						})
						.catch((a) => {
							if (!(a instanceof s_)) return Promise.reject(a);
							let {timeout: u, sql: c, bindings: h} = e,
								d;
							return (
								e.cancelOnTimeout
									? (d = this.client.cancelQuery(this.connection))
									: ((this.connection.__knex__disposed = a),
										(d = Promise.resolve())),
								d
									.catch((f) => {
										throw (
											((this.connection.__knex__disposed = a),
											Object.assign(f, {
												message: `After query timeout of ${u}ms exceeded, cancelling of query failed.`,
												sql: c,
												bindings: h,
												timeout: u,
											}))
										);
									})
									.then(() => {
										throw Object.assign(a, {
											message: `Defined query timeout of ${u}ms exceeded when running query.`,
											sql: c,
											bindings: h,
											timeout: u,
										});
									})
							);
						})
						.catch((a) => {
							throw (
								(this.builder.emit(
									'query-error',
									a,
									Object.assign(
										{__knexUid: t, __knexTxId: n, queryContext: s},
										e
									)
								),
								a)
							);
						})
				);
			}
			async queryArray(e) {
				if (e.length === 1) {
					let n = e[0];
					if (!n.statementsProducer) return this.query(n);
					let i = await n.statementsProducer(void 0, this.connection),
						s = i.sql.map((c) => ({sql: c, bindings: n.bindings})),
						o = i.pre.map((c) => ({sql: c, bindings: n.bindings})),
						a = i.post.map((c) => ({sql: c, bindings: n.bindings})),
						u = [];
					await this.queryArray(o);
					try {
						await this.client.transaction(
							async (c) => {
								let h = new r(c.client, this.builder);
								if (
									((h.connection = this.connection),
									(u = await h.queryArray(s)),
									i.check && (await c.raw(i.check)).length > 0)
								)
									throw new Error('FOREIGN KEY constraint failed');
							},
							{connection: this.connection}
						);
					} finally {
						await this.queryArray(a);
					}
					return u;
				}
				let t = [];
				for (let n of e) t.push(await this.queryArray([n]));
				return t;
			}
			async ensureConnection(e, t) {
				if (
					(this.builder._connection &&
						(this.connection = this.builder._connection),
					this.connection)
				)
					return e(this, t);
				let n;
				try {
					n = await this.client.acquireConnection();
				} catch (i) {
					if (!(i instanceof s_)) return Promise.reject(i);
					throw (
						(this.builder &&
							((i.sql = this.builder.sql),
							(i.bindings = this.builder.bindings)),
						i)
					);
				}
				try {
					return (this.connection = n), await e(this, t);
				} finally {
					await this.client.releaseConnection(n);
				}
			}
		};
	o_.exports = Pc;
});
var c_ = l((dce, u_) => {
	var dn = 1e3,
		fn = dn * 60,
		pn = fn * 60,
		br = pn * 24,
		wU = br * 7,
		vU = br * 365.25;
	u_.exports = function (r, e) {
		e = e || {};
		var t = typeof r;
		if (t === 'string' && r.length > 0) return EU(r);
		if (t === 'number' && isFinite(r)) return e.long ? CU(r) : xU(r);
		throw new Error(
			'val is not a non-empty string or a valid number. val=' +
				JSON.stringify(r)
		);
	};
	function EU(r) {
		if (((r = String(r)), !(r.length > 100))) {
			var e =
				/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
					r
				);
			if (e) {
				var t = parseFloat(e[1]),
					n = (e[2] || 'ms').toLowerCase();
				switch (n) {
					case 'years':
					case 'year':
					case 'yrs':
					case 'yr':
					case 'y':
						return t * vU;
					case 'weeks':
					case 'week':
					case 'w':
						return t * wU;
					case 'days':
					case 'day':
					case 'd':
						return t * br;
					case 'hours':
					case 'hour':
					case 'hrs':
					case 'hr':
					case 'h':
						return t * pn;
					case 'minutes':
					case 'minute':
					case 'mins':
					case 'min':
					case 'm':
						return t * fn;
					case 'seconds':
					case 'second':
					case 'secs':
					case 'sec':
					case 's':
						return t * dn;
					case 'milliseconds':
					case 'millisecond':
					case 'msecs':
					case 'msec':
					case 'ms':
						return t;
					default:
						return;
				}
			}
		}
	}
	function xU(r) {
		var e = Math.abs(r);
		return e >= br
			? Math.round(r / br) + 'd'
			: e >= pn
				? Math.round(r / pn) + 'h'
				: e >= fn
					? Math.round(r / fn) + 'm'
					: e >= dn
						? Math.round(r / dn) + 's'
						: r + 'ms';
	}
	function CU(r) {
		var e = Math.abs(r);
		return e >= br
			? io(r, e, br, 'day')
			: e >= pn
				? io(r, e, pn, 'hour')
				: e >= fn
					? io(r, e, fn, 'minute')
					: e >= dn
						? io(r, e, dn, 'second')
						: r + ' ms';
	}
	function io(r, e, t, n) {
		var i = e >= t * 1.5;
		return Math.round(r / t) + ' ' + n + (i ? 's' : '');
	}
});
var kc = l((fce, l_) => {
	function qU(r) {
		(t.debug = t),
			(t.default = t),
			(t.coerce = u),
			(t.disable = s),
			(t.enable = i),
			(t.enabled = o),
			(t.humanize = c_()),
			(t.destroy = c),
			Object.keys(r).forEach((h) => {
				t[h] = r[h];
			}),
			(t.names = []),
			(t.skips = []),
			(t.formatters = {});
		function e(h) {
			let d = 0;
			for (let f = 0; f < h.length; f++)
				(d = (d << 5) - d + h.charCodeAt(f)), (d |= 0);
			return t.colors[Math.abs(d) % t.colors.length];
		}
		t.selectColor = e;
		function t(h) {
			let d,
				f = null,
				m,
				g;
			function y(...E) {
				if (!y.enabled) return;
				let N = y,
					j = Number(new Date()),
					ae = j - (d || j);
				(N.diff = ae),
					(N.prev = d),
					(N.curr = j),
					(d = j),
					(E[0] = t.coerce(E[0])),
					typeof E[0] != 'string' && E.unshift('%O');
				let ee = 0;
				(E[0] = E[0].replace(/%([a-zA-Z%])/g, (_e, gt) => {
					if (_e === '%%') return '%';
					ee++;
					let We = t.formatters[gt];
					if (typeof We == 'function') {
						let Vn = E[ee];
						(_e = We.call(N, Vn)), E.splice(ee, 1), ee--;
					}
					return _e;
				})),
					t.formatArgs.call(N, E),
					(N.log || t.log).apply(N, E);
			}
			return (
				(y.namespace = h),
				(y.useColors = t.useColors()),
				(y.color = t.selectColor(h)),
				(y.extend = n),
				(y.destroy = t.destroy),
				Object.defineProperty(y, 'enabled', {
					enumerable: !0,
					configurable: !1,
					get: () =>
						f !== null
							? f
							: (m !== t.namespaces && ((m = t.namespaces), (g = t.enabled(h))),
								g),
					set: (E) => {
						f = E;
					},
				}),
				typeof t.init == 'function' && t.init(y),
				y
			);
		}
		function n(h, d) {
			let f = t(this.namespace + (typeof d > 'u' ? ':' : d) + h);
			return (f.log = this.log), f;
		}
		function i(h) {
			t.save(h), (t.namespaces = h), (t.names = []), (t.skips = []);
			let d,
				f = (typeof h == 'string' ? h : '').split(/[\s,]+/),
				m = f.length;
			for (d = 0; d < m; d++)
				f[d] &&
					((h = f[d].replace(/\*/g, '.*?')),
					h[0] === '-'
						? t.skips.push(new RegExp('^' + h.slice(1) + '$'))
						: t.names.push(new RegExp('^' + h + '$')));
		}
		function s() {
			let h = [...t.names.map(a), ...t.skips.map(a).map((d) => '-' + d)].join(
				','
			);
			return t.enable(''), h;
		}
		function o(h) {
			if (h[h.length - 1] === '*') return !0;
			let d, f;
			for (d = 0, f = t.skips.length; d < f; d++)
				if (t.skips[d].test(h)) return !1;
			for (d = 0, f = t.names.length; d < f; d++)
				if (t.names[d].test(h)) return !0;
			return !1;
		}
		function a(h) {
			return h
				.toString()
				.substring(2, h.toString().length - 2)
				.replace(/\.\*\?$/, '*');
		}
		function u(h) {
			return h instanceof Error ? h.stack || h.message : h;
		}
		function c() {
			console.warn(
				'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
			);
		}
		return t.enable(t.load()), t;
	}
	l_.exports = qU;
});
var h_ = l((Te, so) => {
	Te.formatArgs = AU;
	Te.save = SU;
	Te.load = OU;
	Te.useColors = TU;
	Te.storage = RU();
	Te.destroy = (() => {
		let r = !1;
		return () => {
			r ||
				((r = !0),
				console.warn(
					'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
				));
		};
	})();
	Te.colors = [
		'#0000CC',
		'#0000FF',
		'#0033CC',
		'#0033FF',
		'#0066CC',
		'#0066FF',
		'#0099CC',
		'#0099FF',
		'#00CC00',
		'#00CC33',
		'#00CC66',
		'#00CC99',
		'#00CCCC',
		'#00CCFF',
		'#3300CC',
		'#3300FF',
		'#3333CC',
		'#3333FF',
		'#3366CC',
		'#3366FF',
		'#3399CC',
		'#3399FF',
		'#33CC00',
		'#33CC33',
		'#33CC66',
		'#33CC99',
		'#33CCCC',
		'#33CCFF',
		'#6600CC',
		'#6600FF',
		'#6633CC',
		'#6633FF',
		'#66CC00',
		'#66CC33',
		'#9900CC',
		'#9900FF',
		'#9933CC',
		'#9933FF',
		'#99CC00',
		'#99CC33',
		'#CC0000',
		'#CC0033',
		'#CC0066',
		'#CC0099',
		'#CC00CC',
		'#CC00FF',
		'#CC3300',
		'#CC3333',
		'#CC3366',
		'#CC3399',
		'#CC33CC',
		'#CC33FF',
		'#CC6600',
		'#CC6633',
		'#CC9900',
		'#CC9933',
		'#CCCC00',
		'#CCCC33',
		'#FF0000',
		'#FF0033',
		'#FF0066',
		'#FF0099',
		'#FF00CC',
		'#FF00FF',
		'#FF3300',
		'#FF3333',
		'#FF3366',
		'#FF3399',
		'#FF33CC',
		'#FF33FF',
		'#FF6600',
		'#FF6633',
		'#FF9900',
		'#FF9933',
		'#FFCC00',
		'#FFCC33',
	];
	function TU() {
		return typeof window < 'u' &&
			window.process &&
			(window.process.type === 'renderer' || window.process.__nwjs)
			? !0
			: typeof navigator < 'u' &&
				  navigator.userAgent &&
				  navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
				? !1
				: (typeof document < 'u' &&
						document.documentElement &&
						document.documentElement.style &&
						document.documentElement.style.WebkitAppearance) ||
					(typeof window < 'u' &&
						window.console &&
						(window.console.firebug ||
							(window.console.exception && window.console.table))) ||
					(typeof navigator < 'u' &&
						navigator.userAgent &&
						navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
						parseInt(RegExp.$1, 10) >= 31) ||
					(typeof navigator < 'u' &&
						navigator.userAgent &&
						navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}
	function AU(r) {
		if (
			((r[0] =
				(this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				r[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' +
				so.exports.humanize(this.diff)),
			!this.useColors)
		)
			return;
		let e = 'color: ' + this.color;
		r.splice(1, 0, e, 'color: inherit');
		let t = 0,
			n = 0;
		r[0].replace(/%[a-zA-Z%]/g, (i) => {
			i !== '%%' && (t++, i === '%c' && (n = t));
		}),
			r.splice(n, 0, e);
	}
	Te.log = console.debug || console.log || (() => {});
	function SU(r) {
		try {
			r ? Te.storage.setItem('debug', r) : Te.storage.removeItem('debug');
		} catch {}
	}
	function OU() {
		let r;
		try {
			r = Te.storage.getItem('debug');
		} catch {}
		return (
			!r && typeof process < 'u' && 'env' in process && (r = process.env.DEBUG),
			r
		);
	}
	function RU() {
		try {
			return localStorage;
		} catch {}
	}
	so.exports = kc()(Te);
	var {formatters: NU} = so.exports;
	NU.j = function (r) {
		try {
			return JSON.stringify(r);
		} catch (e) {
			return '[UnexpectedJSONParseError]: ' + e.message;
		}
	};
});
var f_ = l((pce, d_) => {
	'use strict';
	d_.exports = (r, e = process.argv) => {
		let t = r.startsWith('-') ? '' : r.length === 1 ? '-' : '--',
			n = e.indexOf(t + r),
			i = e.indexOf('--');
		return n !== -1 && (i === -1 || n < i);
	};
});
var g_ = l((mce, m_) => {
	'use strict';
	var IU = _('os'),
		p_ = _('tty'),
		Ie = f_(),
		{env: te} = process,
		Ct;
	Ie('no-color') || Ie('no-colors') || Ie('color=false') || Ie('color=never')
		? (Ct = 0)
		: (Ie('color') || Ie('colors') || Ie('color=true') || Ie('color=always')) &&
			(Ct = 1);
	'FORCE_COLOR' in te &&
		(te.FORCE_COLOR === 'true'
			? (Ct = 1)
			: te.FORCE_COLOR === 'false'
				? (Ct = 0)
				: (Ct =
						te.FORCE_COLOR.length === 0
							? 1
							: Math.min(parseInt(te.FORCE_COLOR, 10), 3)));
	function $c(r) {
		return r === 0
			? !1
			: {level: r, hasBasic: !0, has256: r >= 2, has16m: r >= 3};
	}
	function Mc(r, e) {
		if (Ct === 0) return 0;
		if (Ie('color=16m') || Ie('color=full') || Ie('color=truecolor')) return 3;
		if (Ie('color=256')) return 2;
		if (r && !e && Ct === void 0) return 0;
		let t = Ct || 0;
		if (te.TERM === 'dumb') return t;
		if (process.platform === 'win32') {
			let n = IU.release().split('.');
			return Number(n[0]) >= 10 && Number(n[2]) >= 10586
				? Number(n[2]) >= 14931
					? 3
					: 2
				: 1;
		}
		if ('CI' in te)
			return [
				'TRAVIS',
				'CIRCLECI',
				'APPVEYOR',
				'GITLAB_CI',
				'GITHUB_ACTIONS',
				'BUILDKITE',
			].some((n) => n in te) || te.CI_NAME === 'codeship'
				? 1
				: t;
		if ('TEAMCITY_VERSION' in te)
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(te.TEAMCITY_VERSION) ? 1 : 0;
		if (te.COLORTERM === 'truecolor') return 3;
		if ('TERM_PROGRAM' in te) {
			let n = parseInt((te.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
			switch (te.TERM_PROGRAM) {
				case 'iTerm.app':
					return n >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
			}
		}
		return /-256(color)?$/i.test(te.TERM)
			? 2
			: /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
						te.TERM
				  ) || 'COLORTERM' in te
				? 1
				: t;
	}
	function PU(r) {
		let e = Mc(r, r && r.isTTY);
		return $c(e);
	}
	m_.exports = {
		supportsColor: PU,
		stdout: $c(Mc(!0, p_.isatty(1))),
		stderr: $c(Mc(!0, p_.isatty(2))),
	};
});
var b_ = l((ce, ao) => {
	var kU = _('tty'),
		oo = _('util');
	ce.init = UU;
	ce.log = LU;
	ce.formatArgs = MU;
	ce.save = BU;
	ce.load = DU;
	ce.useColors = $U;
	ce.destroy = oo.deprecate(
		() => {},
		'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
	);
	ce.colors = [6, 2, 3, 4, 5, 1];
	try {
		let r = g_();
		r &&
			(r.stderr || r).level >= 2 &&
			(ce.colors = [
				20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63,
				68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128,
				129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168,
				169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200,
				201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221,
			]);
	} catch {}
	ce.inspectOpts = Object.keys(process.env)
		.filter((r) => /^debug_/i.test(r))
		.reduce((r, e) => {
			let t = e
					.substring(6)
					.toLowerCase()
					.replace(/_([a-z])/g, (i, s) => s.toUpperCase()),
				n = process.env[e];
			return (
				/^(yes|on|true|enabled)$/i.test(n)
					? (n = !0)
					: /^(no|off|false|disabled)$/i.test(n)
						? (n = !1)
						: n === 'null'
							? (n = null)
							: (n = Number(n)),
				(r[t] = n),
				r
			);
		}, {});
	function $U() {
		return 'colors' in ce.inspectOpts
			? !!ce.inspectOpts.colors
			: kU.isatty(process.stderr.fd);
	}
	function MU(r) {
		let {namespace: e, useColors: t} = this;
		if (t) {
			let n = this.color,
				i = '\x1B[3' + (n < 8 ? n : '8;5;' + n),
				s = `  ${i};1m${e} \x1B[0m`;
			(r[0] =
				s +
				r[0]
					.split(
						`
`
					)
					.join(
						`
` + s
					)),
				r.push(i + 'm+' + ao.exports.humanize(this.diff) + '\x1B[0m');
		} else r[0] = jU() + e + ' ' + r[0];
	}
	function jU() {
		return ce.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ';
	}
	function LU(...r) {
		return process.stderr.write(
			oo.format(...r) +
				`
`
		);
	}
	function BU(r) {
		r ? (process.env.DEBUG = r) : delete process.env.DEBUG;
	}
	function DU() {
		return process.env.DEBUG;
	}
	function UU(r) {
		r.inspectOpts = {};
		let e = Object.keys(ce.inspectOpts);
		for (let t = 0; t < e.length; t++)
			r.inspectOpts[e[t]] = ce.inspectOpts[e[t]];
	}
	ao.exports = kc()(ce);
	var {formatters: y_} = ao.exports;
	y_.o = function (r) {
		return (
			(this.inspectOpts.colors = this.useColors),
			oo
				.inspect(r, this.inspectOpts)
				.split(
					`
`
				)
				.map((e) => e.trim())
				.join(' ')
		);
	};
	y_.O = function (r) {
		return (
			(this.inspectOpts.colors = this.useColors),
			oo.inspect(r, this.inspectOpts)
		);
	};
});
var Pe = l((gce, jc) => {
	typeof process > 'u' ||
	process.type === 'renderer' ||
	process.browser === !0 ||
	process.__nwjs
		? (jc.exports = h_())
		: (jc.exports = b_());
});
var w_ = l((yce, __) => {
	var FU = '__lodash_hash_undefined__';
	function QU(r) {
		return this.__data__.set(r, FU), this;
	}
	__.exports = QU;
});
var E_ = l((bce, v_) => {
	function HU(r) {
		return this.__data__.has(r);
	}
	v_.exports = HU;
});
var co = l((_ce, x_) => {
	var WU = Gs(),
		VU = w_(),
		GU = E_();
	function uo(r) {
		var e = -1,
			t = r == null ? 0 : r.length;
		for (this.__data__ = new WU(); ++e < t; ) this.add(r[e]);
	}
	uo.prototype.add = uo.prototype.push = VU;
	uo.prototype.has = GU;
	x_.exports = uo;
});
var q_ = l((wce, C_) => {
	function JU(r, e, t, n) {
		for (var i = r.length, s = t + (n ? 1 : -1); n ? s-- : ++s < i; )
			if (e(r[s], s, r)) return s;
		return -1;
	}
	C_.exports = JU;
});
var A_ = l((vce, T_) => {
	function KU(r) {
		return r !== r;
	}
	T_.exports = KU;
});
var O_ = l((Ece, S_) => {
	function zU(r, e, t) {
		for (var n = t - 1, i = r.length; ++n < i; ) if (r[n] === e) return n;
		return -1;
	}
	S_.exports = zU;
});
var lo = l((xce, R_) => {
	var ZU = q_(),
		YU = A_(),
		XU = O_();
	function eF(r, e, t) {
		return e === e ? XU(r, e, t) : ZU(r, YU, t);
	}
	R_.exports = eF;
});
var Lc = l((Cce, N_) => {
	var tF = lo();
	function rF(r, e) {
		var t = r == null ? 0 : r.length;
		return !!t && tF(r, e, 0) > -1;
	}
	N_.exports = rF;
});
var Bc = l((qce, I_) => {
	function nF(r, e, t) {
		for (var n = -1, i = r == null ? 0 : r.length; ++n < i; )
			if (t(e, r[n])) return !0;
		return !1;
	}
	I_.exports = nF;
});
var ho = l((Tce, P_) => {
	function iF(r, e) {
		return r.has(e);
	}
	P_.exports = iF;
});
var $_ = l((Ace, k_) => {
	var sF = co(),
		oF = Lc(),
		aF = Bc(),
		uF = mr(),
		cF = an(),
		lF = ho(),
		hF = 200;
	function dF(r, e, t, n) {
		var i = -1,
			s = oF,
			o = !0,
			a = r.length,
			u = [],
			c = e.length;
		if (!a) return u;
		t && (e = uF(e, cF(t))),
			n
				? ((s = aF), (o = !1))
				: e.length >= hF && ((s = lF), (o = !1), (e = new sF(e)));
		e: for (; ++i < a; ) {
			var h = r[i],
				d = t == null ? h : t(h);
			if (((h = n || h !== 0 ? h : 0), o && d === d)) {
				for (var f = c; f--; ) if (e[f] === d) continue e;
				u.push(h);
			} else s(e, d, n) || u.push(h);
		}
		return u;
	}
	k_.exports = dF;
});
var B_ = l((Sce, L_) => {
	var M_ = Et(),
		fF = sn(),
		pF = V(),
		j_ = M_ ? M_.isConcatSpreadable : void 0;
	function mF(r) {
		return pF(r) || fF(r) || !!(j_ && r && r[j_]);
	}
	L_.exports = mF;
});
var fo = l((Oce, U_) => {
	var gF = eo(),
		yF = B_();
	function D_(r, e, t, n, i) {
		var s = -1,
			o = r.length;
		for (t || (t = yF), i || (i = []); ++s < o; ) {
			var a = r[s];
			e > 0 && t(a)
				? e > 1
					? D_(a, e - 1, t, n, i)
					: gF(i, a)
				: n || (i[i.length] = a);
		}
		return i;
	}
	U_.exports = D_;
});
var Dc = l((Rce, F_) => {
	var bF = Be(),
		_F = Ne();
	function wF(r) {
		return _F(r) && bF(r);
	}
	F_.exports = wF;
});
var Uc = l((Nce, Q_) => {
	function vF(r) {
		var e = r == null ? 0 : r.length;
		return e ? r[e - 1] : void 0;
	}
	Q_.exports = vF;
});
var W_ = l((Ice, H_) => {
	var EF = $_(),
		xF = fo(),
		CF = fr(),
		Fc = Dc(),
		qF = Uc(),
		TF = CF(function (r, e) {
			var t = qF(e);
			return (
				Fc(t) && (t = void 0), Fc(r) ? EF(r, xF(e, 1, Fc, !0), void 0, t) : []
			);
		});
	H_.exports = TF;
});
var po = l((Pce, V_) => {
	var AF = V(),
		SF = gr(),
		OF = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
		RF = /^\w*$/;
	function NF(r, e) {
		if (AF(r)) return !1;
		var t = typeof r;
		return t == 'number' ||
			t == 'symbol' ||
			t == 'boolean' ||
			r == null ||
			SF(r)
			? !0
			: RF.test(r) || !OF.test(r) || (e != null && r in Object(e));
	}
	V_.exports = NF;
});
var K_ = l((kce, J_) => {
	var G_ = Gs(),
		IF = 'Expected a function';
	function Qc(r, e) {
		if (typeof r != 'function' || (e != null && typeof e != 'function'))
			throw new TypeError(IF);
		var t = function () {
			var n = arguments,
				i = e ? e.apply(this, n) : n[0],
				s = t.cache;
			if (s.has(i)) return s.get(i);
			var o = r.apply(this, n);
			return (t.cache = s.set(i, o) || s), o;
		};
		return (t.cache = new (Qc.Cache || G_)()), t;
	}
	Qc.Cache = G_;
	J_.exports = Qc;
});
var Z_ = l(($ce, z_) => {
	var PF = K_(),
		kF = 500;
	function $F(r) {
		var e = PF(r, function (n) {
				return t.size === kF && t.clear(), n;
			}),
			t = e.cache;
		return e;
	}
	z_.exports = $F;
});
var X_ = l((Mce, Y_) => {
	var MF = Z_(),
		jF =
			/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
		LF = /\\(\\)?/g,
		BF = MF(function (r) {
			var e = [];
			return (
				r.charCodeAt(0) === 46 && e.push(''),
				r.replace(jF, function (t, n, i, s) {
					e.push(i ? s.replace(LF, '$1') : n || t);
				}),
				e
			);
		});
	Y_.exports = BF;
});
var Ti = l((jce, ew) => {
	var DF = V(),
		UF = po(),
		FF = X_(),
		QF = qi();
	function HF(r, e) {
		return DF(r) ? r : UF(r, e) ? [r] : FF(QF(r));
	}
	ew.exports = HF;
});
var mn = l((Lce, tw) => {
	var WF = gr(),
		VF = 1 / 0;
	function GF(r) {
		if (typeof r == 'string' || WF(r)) return r;
		var e = r + '';
		return e == '0' && 1 / r == -VF ? '-0' : e;
	}
	tw.exports = GF;
});
var Ai = l((Bce, rw) => {
	var JF = Ti(),
		KF = mn();
	function zF(r, e) {
		e = JF(e, r);
		for (var t = 0, n = e.length; r != null && t < n; ) r = r[KF(e[t++])];
		return t && t == n ? r : void 0;
	}
	rw.exports = zF;
});
var Hc = l((Dce, nw) => {
	var ZF = Ai();
	function YF(r, e, t) {
		var n = r == null ? void 0 : ZF(r, e);
		return n === void 0 ? t : n;
	}
	nw.exports = YF;
});
var we = l((Uce, iw) => {
	var XF = cc(),
		e2 = dr(),
		t2 = sn(),
		r2 = V(),
		n2 = Be(),
		i2 = cr(),
		s2 = cn(),
		o2 = lr(),
		a2 = '[object Map]',
		u2 = '[object Set]',
		c2 = Object.prototype,
		l2 = c2.hasOwnProperty;
	function h2(r) {
		if (r == null) return !0;
		if (
			n2(r) &&
			(r2(r) ||
				typeof r == 'string' ||
				typeof r.splice == 'function' ||
				i2(r) ||
				o2(r) ||
				t2(r))
		)
			return !r.length;
		var e = e2(r);
		if (e == a2 || e == u2) return !r.size;
		if (s2(r)) return !XF(r).length;
		for (var t in r) if (l2.call(r, t)) return !1;
		return !0;
	}
	iw.exports = h2;
});
var ow = l((Fce, sw) => {
	var d2 = gr();
	function f2(r, e, t) {
		for (var n = -1, i = r.length; ++n < i; ) {
			var s = r[n],
				o = e(s);
			if (o != null && (a === void 0 ? o === o && !d2(o) : t(o, a)))
				var a = o,
					u = s;
		}
		return u;
	}
	sw.exports = f2;
});
var uw = l((Qce, aw) => {
	function p2(r, e) {
		return r > e;
	}
	aw.exports = p2;
});
var lw = l((Hce, cw) => {
	var m2 = ow(),
		g2 = uw(),
		y2 = ge();
	function b2(r) {
		return r && r.length ? m2(r, y2, g2) : void 0;
	}
	cw.exports = b2;
});
var mo = l((Wce, hw) => {
	function _2(r, e) {
		return e ? `${e}.${r}` : r;
	}
	function w2(r, e, t) {
		return t ? r(e).withSchema(t) : r(e);
	}
	function Wc(r) {
		return r + '_lock';
	}
	function v2(r, e) {
		return e ? e + '.' + Wc(r) : Wc(r);
	}
	hw.exports = {
		getLockTableName: Wc,
		getLockTableNameWithSchema: v2,
		getTable: w2,
		getTableName: _2,
	};
});
var Vc = l((Vce, dw) => {
	var {
		getTable: E2,
		getLockTableName: x2,
		getLockTableNameWithSchema: C2,
		getTableName: q2,
	} = mo();
	function T2(r, e, t) {
		let n = x2(r);
		return Si(t, e)
			.hasTable(r)
			.then((i) => !i && A2(r, e, t))
			.then(() => Si(t, e).hasTable(n))
			.then((i) => !i && S2(n, e, t))
			.then(() => E2(t, n, e).select('*'))
			.then((i) => !i.length && O2(r, e, t));
	}
	function A2(r, e, t) {
		return Si(t, e).createTable(q2(r), function (n) {
			n.increments(),
				n.string('name'),
				n.integer('batch'),
				n.timestamp('migration_time');
		});
	}
	function S2(r, e, t) {
		return Si(t, e).createTable(r, function (n) {
			n.increments('index').primary(), n.integer('is_locked');
		});
	}
	function O2(r, e, t) {
		let n = C2(r, e);
		return t
			.select('*')
			.from(n)
			.then((i) => (i.length ? null : t.from(n).insert({is_locked: 0})));
	}
	function Si(r, e) {
		return e ? r.schema.withSchema(e) : r.schema;
	}
	dw.exports = {ensureTable: T2, getSchemaBuilder: Si};
});
var gw = l((Gce, mw) => {
	var {getTableName: R2} = mo(),
		{ensureTable: N2} = Vc();
	function fw(r, e) {
		return r.getMigrations(e);
	}
	async function pw(r, e, t) {
		return (
			await N2(r, e, t), await t.from(R2(r, e)).orderBy('id').select('name')
		);
	}
	function I2(r, e) {
		return Promise.all([
			fw(r.migrationSource, r.loadExtensions),
			pw(r.tableName, r.schemaName, e),
		]);
	}
	mw.exports = {listAll: fw, listAllAndCompleted: I2, listCompleted: pw};
});
var Oi = l((Jce, yw) => {
	var P2 = fr(),
		k2 = pr();
	function $2(r) {
		return P2(function (e, t) {
			var n = -1,
				i = t.length,
				s = i > 1 ? t[i - 1] : void 0,
				o = i > 2 ? t[2] : void 0;
			for (
				s = r.length > 3 && typeof s == 'function' ? (i--, s) : void 0,
					o && k2(t[0], t[1], o) && ((s = i < 3 ? void 0 : s), (i = 1)),
					e = Object(e);
				++n < i;

			) {
				var a = t[n];
				a && r(e, a, n, s);
			}
			return e;
		});
	}
	yw.exports = $2;
});
var _w = l((Kce, bw) => {
	var M2 = ot(),
		j2 = Oi(),
		L2 = ut(),
		B2 = j2(function (r, e, t, n) {
			M2(e, L2(e), r, n);
		});
	bw.exports = B2;
});
var ze = l((zce, vw) => {
	var D2 = st(),
		U2 = Ci(),
		F2 = Ne(),
		Q2 = '[object Object]',
		H2 = Function.prototype,
		W2 = Object.prototype,
		ww = H2.toString,
		V2 = W2.hasOwnProperty,
		G2 = ww.call(Object);
	function J2(r) {
		if (!F2(r) || D2(r) != Q2) return !1;
		var e = U2(r);
		if (e === null) return !0;
		var t = V2.call(e, 'constructor') && e.constructor;
		return typeof t == 'function' && t instanceof t && ww.call(t) == G2;
	}
	vw.exports = J2;
});
var Gc = l((Zce, Ew) => {
	var K2 = st(),
		z2 = Ne(),
		Z2 = ze(),
		Y2 = '[object DOMException]',
		X2 = '[object Error]';
	function eQ(r) {
		if (!z2(r)) return !1;
		var e = K2(r);
		return (
			e == X2 ||
			e == Y2 ||
			(typeof r.message == 'string' && typeof r.name == 'string' && !Z2(r))
		);
	}
	Ew.exports = eQ;
});
var Cw = l((Yce, xw) => {
	var tQ = Ac(),
		rQ = fr(),
		nQ = Gc(),
		iQ = rQ(function (r, e) {
			try {
				return tQ(r, void 0, e);
			} catch (t) {
				return nQ(t) ? t : new Error(t);
			}
		});
	xw.exports = iQ;
});
var Jc = l((Xce, qw) => {
	var sQ = mr();
	function oQ(r, e) {
		return sQ(e, function (t) {
			return r[t];
		});
	}
	qw.exports = oQ;
});
var Sw = l((ele, Aw) => {
	var aQ = vt(),
		Tw = Object.prototype,
		uQ = Tw.hasOwnProperty;
	function cQ(r, e, t, n) {
		return r === void 0 || (aQ(r, Tw[t]) && !uQ.call(n, t)) ? e : r;
	}
	Aw.exports = cQ;
});
var Rw = l((tle, Ow) => {
	var lQ = {
		'\\': '\\',
		"'": "'",
		'\n': 'n',
		'\r': 'r',
		'\u2028': 'u2028',
		'\u2029': 'u2029',
	};
	function hQ(r) {
		return '\\' + lQ[r];
	}
	Ow.exports = hQ;
});
var Kc = l((rle, Nw) => {
	var dQ = /<%=([\s\S]+?)%>/g;
	Nw.exports = dQ;
});
var Pw = l((nle, Iw) => {
	function fQ(r) {
		return function (e) {
			return r?.[e];
		};
	}
	Iw.exports = fQ;
});
var $w = l((ile, kw) => {
	var pQ = Pw(),
		mQ = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'},
		gQ = pQ(mQ);
	kw.exports = gQ;
});
var Lw = l((sle, jw) => {
	var yQ = $w(),
		bQ = qi(),
		Mw = /[&<>"']/g,
		_Q = RegExp(Mw.source);
	function wQ(r) {
		return (r = bQ(r)), r && _Q.test(r) ? r.replace(Mw, yQ) : r;
	}
	jw.exports = wQ;
});
var Dw = l((ole, Bw) => {
	var vQ = /<%-([\s\S]+?)%>/g;
	Bw.exports = vQ;
});
var Fw = l((ale, Uw) => {
	var EQ = /<%([\s\S]+?)%>/g;
	Uw.exports = EQ;
});
var Hw = l((ule, Qw) => {
	var xQ = Lw(),
		CQ = Dw(),
		qQ = Fw(),
		TQ = Kc(),
		AQ = {
			escape: CQ,
			evaluate: qQ,
			interpolate: TQ,
			variable: '',
			imports: {_: {escape: xQ}},
		};
	Qw.exports = AQ;
});
var zw = l((cle, Kw) => {
	var Ww = _w(),
		SQ = Cw(),
		OQ = Jc(),
		Vw = Sw(),
		RQ = Rw(),
		NQ = Gc(),
		IQ = pr(),
		PQ = at(),
		kQ = Kc(),
		Gw = Hw(),
		$Q = qi(),
		MQ = 'Invalid `variable` option passed into `_.template`',
		jQ = /\b__p \+= '';/g,
		LQ = /\b(__p \+=) '' \+/g,
		BQ = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
		DQ = /[()=,{}\[\]\/\s]/,
		UQ = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
		go = /($^)/,
		FQ = /['\n\r\u2028\u2029\\]/g,
		QQ = Object.prototype,
		Jw = QQ.hasOwnProperty;
	function HQ(r, e, t) {
		var n = Gw.imports._.templateSettings || Gw;
		t && IQ(r, e, t) && (e = void 0), (r = $Q(r)), (e = Ww({}, e, n, Vw));
		var i = Ww({}, e.imports, n.imports, Vw),
			s = PQ(i),
			o = OQ(i, s),
			a,
			u,
			c = 0,
			h = e.interpolate || go,
			d = "__p += '",
			f = RegExp(
				(e.escape || go).source +
					'|' +
					h.source +
					'|' +
					(h === kQ ? UQ : go).source +
					'|' +
					(e.evaluate || go).source +
					'|$',
				'g'
			),
			m = Jw.call(e, 'sourceURL')
				? '//# sourceURL=' +
					(e.sourceURL + '').replace(/\s/g, ' ') +
					`
`
				: '';
		r.replace(f, function (E, N, j, ae, ee, ue) {
			return (
				j || (j = ae),
				(d += r.slice(c, ue).replace(FQ, RQ)),
				N &&
					((a = !0),
					(d +=
						`' +
__e(` +
						N +
						`) +
'`)),
				ee &&
					((u = !0),
					(d +=
						`';
` +
						ee +
						`;
__p += '`)),
				j &&
					(d +=
						`' +
((__t = (` +
						j +
						`)) == null ? '' : __t) +
'`),
				(c = ue + E.length),
				E
			);
		}),
			(d += `';
`);
		var g = Jw.call(e, 'variable') && e.variable;
		if (!g)
			d =
				`with (obj) {
` +
				d +
				`
}
`;
		else if (DQ.test(g)) throw new Error(MQ);
		(d = (u ? d.replace(jQ, '') : d).replace(LQ, '$1').replace(BQ, '$1;')),
			(d =
				'function(' +
				(g || 'obj') +
				`) {
` +
				(g
					? ''
					: `obj || (obj = {});
`) +
				"var __t, __p = ''" +
				(a ? ', __e = _.escape' : '') +
				(u
					? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
					: `;
`) +
				d +
				`return __p
}`);
		var y = SQ(function () {
			return Function(s, m + 'return ' + d).apply(void 0, o);
		});
		if (((y.source = d), NQ(y))) throw y;
		return y;
	}
	Kw.exports = HQ;
});
var Ri = l((lle, Zw) => {
	var WQ = fo();
	function VQ(r) {
		var e = r == null ? 0 : r.length;
		return e ? WQ(r, 1) : [];
	}
	Zw.exports = VQ;
});
var yn = l((hle, tv) => {
	var _r = _('fs'),
		GQ = Ri(),
		JQ = _('os'),
		Yw = _('path'),
		{promisify: gn} = _('util'),
		zc = gn(_r.stat),
		KQ = gn(_r.readFile),
		zQ = gn(_r.writeFile),
		Xw = gn(_r.readdir),
		ZQ = gn(_r.mkdir);
	function YQ(r) {
		try {
			return _r.accessSync(r), !0;
		} catch {
			return !1;
		}
	}
	function XQ() {
		return gn(_r.mkdtemp)(`${JQ.tmpdir()}${Yw.sep}`);
	}
	function eH(r) {
		return zc(r).catch(() => ZQ(r, {recursive: !0}));
	}
	async function ev(r, e = !1) {
		let t = await Xw(r);
		return GQ(
			await Promise.all(
				t.sort().map(async (n) => {
					let i = Yw.resolve(r, n),
						s = await zc(i);
					return s && s.isDirectory() ? (e ? await ev(i, !0) : []) : [i];
				})
			)
		);
	}
	tv.exports = {
		existsSync: YQ,
		stat: zc,
		readdir: Xw,
		readFile: KQ,
		writeFile: zQ,
		createTemp: XQ,
		ensureDirectoryExists: eH,
		getFilepathsInFolder: ev,
	};
});
var Zc = l((dle, iv) => {
	var tH = zw(),
		{readFile: rH, writeFile: nH} = yn(),
		rv = (r, e) => tH(r, {interpolate: /<%=([\s\S]+?)%>/g, ...e}),
		nv = async (r, e) => {
			let t = await rH(r);
			return rv(t.toString(), e);
		},
		iH = async (r, e, t, n) => nH(r, (await nv(e, t))(n));
	iv.exports = {
		jsSourceTemplate: rv,
		jsFileTemplate: nv,
		writeJsFileUsingTemplate: iH,
	};
});
var Yc = l((fle, sv) => {
	function sH(r, e) {
		for (var t = -1, n = r == null ? 0 : r.length; ++t < n; )
			if (e(r[t], t, r)) return !0;
		return !1;
	}
	sv.exports = sH;
});
var Xc = l((ple, ov) => {
	var oH = co(),
		aH = Yc(),
		uH = ho(),
		cH = 1,
		lH = 2;
	function hH(r, e, t, n, i, s) {
		var o = t & cH,
			a = r.length,
			u = e.length;
		if (a != u && !(o && u > a)) return !1;
		var c = s.get(r),
			h = s.get(e);
		if (c && h) return c == e && h == r;
		var d = -1,
			f = !0,
			m = t & lH ? new oH() : void 0;
		for (s.set(r, e), s.set(e, r); ++d < a; ) {
			var g = r[d],
				y = e[d];
			if (n) var E = o ? n(y, g, d, e, r, s) : n(g, y, d, r, e, s);
			if (E !== void 0) {
				if (E) continue;
				f = !1;
				break;
			}
			if (m) {
				if (
					!aH(e, function (N, j) {
						if (!uH(m, j) && (g === N || i(g, N, t, n, s))) return m.push(j);
					})
				) {
					f = !1;
					break;
				}
			} else if (!(g === y || i(g, y, t, n, s))) {
				f = !1;
				break;
			}
		}
		return s.delete(r), s.delete(e), f;
	}
	ov.exports = hH;
});
var el = l((mle, av) => {
	function dH(r) {
		var e = -1,
			t = Array(r.size);
		return (
			r.forEach(function (n, i) {
				t[++e] = [i, n];
			}),
			t
		);
	}
	av.exports = dH;
});
var Ni = l((gle, uv) => {
	function fH(r) {
		var e = -1,
			t = Array(r.size);
		return (
			r.forEach(function (n) {
				t[++e] = n;
			}),
			t
		);
	}
	uv.exports = fH;
});
var fv = l((yle, dv) => {
	var cv = Et(),
		lv = Ec(),
		pH = vt(),
		mH = Xc(),
		gH = el(),
		yH = Ni(),
		bH = 1,
		_H = 2,
		wH = '[object Boolean]',
		vH = '[object Date]',
		EH = '[object Error]',
		xH = '[object Map]',
		CH = '[object Number]',
		qH = '[object RegExp]',
		TH = '[object Set]',
		AH = '[object String]',
		SH = '[object Symbol]',
		OH = '[object ArrayBuffer]',
		RH = '[object DataView]',
		hv = cv ? cv.prototype : void 0,
		tl = hv ? hv.valueOf : void 0;
	function NH(r, e, t, n, i, s, o) {
		switch (t) {
			case RH:
				if (r.byteLength != e.byteLength || r.byteOffset != e.byteOffset)
					return !1;
				(r = r.buffer), (e = e.buffer);
			case OH:
				return !(r.byteLength != e.byteLength || !s(new lv(r), new lv(e)));
			case wH:
			case vH:
			case CH:
				return pH(+r, +e);
			case EH:
				return r.name == e.name && r.message == e.message;
			case qH:
			case AH:
				return r == e + '';
			case xH:
				var a = gH;
			case TH:
				var u = n & bH;
				if ((a || (a = yH), r.size != e.size && !u)) return !1;
				var c = o.get(r);
				if (c) return c == e;
				(n |= _H), o.set(r, e);
				var h = mH(a(r), a(e), n, i, s, o);
				return o.delete(r), h;
			case SH:
				if (tl) return tl.call(r) == tl.call(e);
		}
		return !1;
	}
	dv.exports = NH;
});
var gv = l((ble, mv) => {
	var pv = pc(),
		IH = 1,
		PH = Object.prototype,
		kH = PH.hasOwnProperty;
	function $H(r, e, t, n, i, s) {
		var o = t & IH,
			a = pv(r),
			u = a.length,
			c = pv(e),
			h = c.length;
		if (u != h && !o) return !1;
		for (var d = u; d--; ) {
			var f = a[d];
			if (!(o ? f in e : kH.call(e, f))) return !1;
		}
		var m = s.get(r),
			g = s.get(e);
		if (m && g) return m == e && g == r;
		var y = !0;
		s.set(r, e), s.set(e, r);
		for (var E = o; ++d < u; ) {
			f = a[d];
			var N = r[f],
				j = e[f];
			if (n) var ae = o ? n(j, N, f, e, r, s) : n(N, j, f, r, e, s);
			if (!(ae === void 0 ? N === j || i(N, j, t, n, s) : ae)) {
				y = !1;
				break;
			}
			E || (E = f == 'constructor');
		}
		if (y && !E) {
			var ee = r.constructor,
				ue = e.constructor;
			ee != ue &&
				'constructor' in r &&
				'constructor' in e &&
				!(
					typeof ee == 'function' &&
					ee instanceof ee &&
					typeof ue == 'function' &&
					ue instanceof ue
				) &&
				(y = !1);
		}
		return s.delete(r), s.delete(e), y;
	}
	mv.exports = $H;
});
var Cv = l((_le, xv) => {
	var rl = gi(),
		MH = Xc(),
		jH = fv(),
		LH = gv(),
		yv = dr(),
		bv = V(),
		_v = cr(),
		BH = lr(),
		DH = 1,
		wv = '[object Arguments]',
		vv = '[object Array]',
		yo = '[object Object]',
		UH = Object.prototype,
		Ev = UH.hasOwnProperty;
	function FH(r, e, t, n, i, s) {
		var o = bv(r),
			a = bv(e),
			u = o ? vv : yv(r),
			c = a ? vv : yv(e);
		(u = u == wv ? yo : u), (c = c == wv ? yo : c);
		var h = u == yo,
			d = c == yo,
			f = u == c;
		if (f && _v(r)) {
			if (!_v(e)) return !1;
			(o = !0), (h = !1);
		}
		if (f && !h)
			return (
				s || (s = new rl()),
				o || BH(r) ? MH(r, e, t, n, i, s) : jH(r, e, u, t, n, i, s)
			);
		if (!(t & DH)) {
			var m = h && Ev.call(r, '__wrapped__'),
				g = d && Ev.call(e, '__wrapped__');
			if (m || g) {
				var y = m ? r.value() : r,
					E = g ? e.value() : e;
				return s || (s = new rl()), i(y, E, t, n, s);
			}
		}
		return f ? (s || (s = new rl()), LH(r, e, t, n, i, s)) : !1;
	}
	xv.exports = FH;
});
var nl = l((wle, Av) => {
	var QH = Cv(),
		qv = Ne();
	function Tv(r, e, t, n, i) {
		return r === e
			? !0
			: r == null || e == null || (!qv(r) && !qv(e))
				? r !== r && e !== e
				: QH(r, e, t, n, Tv, i);
	}
	Av.exports = Tv;
});
var Ov = l((vle, Sv) => {
	var HH = gi(),
		WH = nl(),
		VH = 1,
		GH = 2;
	function JH(r, e, t, n) {
		var i = t.length,
			s = i,
			o = !n;
		if (r == null) return !s;
		for (r = Object(r); i--; ) {
			var a = t[i];
			if (o && a[2] ? a[1] !== r[a[0]] : !(a[0] in r)) return !1;
		}
		for (; ++i < s; ) {
			a = t[i];
			var u = a[0],
				c = r[u],
				h = a[1];
			if (o && a[2]) {
				if (c === void 0 && !(u in r)) return !1;
			} else {
				var d = new HH();
				if (n) var f = n(c, h, u, r, e, d);
				if (!(f === void 0 ? WH(h, c, VH | GH, n, d) : f)) return !1;
			}
		}
		return !0;
	}
	Sv.exports = JH;
});
var il = l((Ele, Rv) => {
	var KH = qe();
	function zH(r) {
		return r === r && !KH(r);
	}
	Rv.exports = zH;
});
var Iv = l((xle, Nv) => {
	var ZH = il(),
		YH = at();
	function XH(r) {
		for (var e = YH(r), t = e.length; t--; ) {
			var n = e[t],
				i = r[n];
			e[t] = [n, i, ZH(i)];
		}
		return e;
	}
	Nv.exports = XH;
});
var sl = l((Cle, Pv) => {
	function e3(r, e) {
		return function (t) {
			return t == null ? !1 : t[r] === e && (e !== void 0 || r in Object(t));
		};
	}
	Pv.exports = e3;
});
var $v = l((qle, kv) => {
	var t3 = Ov(),
		r3 = Iv(),
		n3 = sl();
	function i3(r) {
		var e = r3(r);
		return e.length == 1 && e[0][2]
			? n3(e[0][0], e[0][1])
			: function (t) {
					return t === r || t3(t, r, e);
				};
	}
	kv.exports = i3;
});
var jv = l((Tle, Mv) => {
	function s3(r, e) {
		return r != null && e in Object(r);
	}
	Mv.exports = s3;
});
var ol = l((Ale, Lv) => {
	var o3 = Ti(),
		a3 = sn(),
		u3 = V(),
		c3 = wi(),
		l3 = Ks(),
		h3 = mn();
	function d3(r, e, t) {
		e = o3(e, r);
		for (var n = -1, i = e.length, s = !1; ++n < i; ) {
			var o = h3(e[n]);
			if (!(s = r != null && t(r, o))) break;
			r = r[o];
		}
		return s || ++n != i
			? s
			: ((i = r == null ? 0 : r.length),
				!!i && l3(i) && c3(o, i) && (u3(r) || a3(r)));
	}
	Lv.exports = d3;
});
var Dv = l((Sle, Bv) => {
	var f3 = jv(),
		p3 = ol();
	function m3(r, e) {
		return r != null && p3(r, e, f3);
	}
	Bv.exports = m3;
});
var Fv = l((Ole, Uv) => {
	var g3 = nl(),
		y3 = Hc(),
		b3 = Dv(),
		_3 = po(),
		w3 = il(),
		v3 = sl(),
		E3 = mn(),
		x3 = 1,
		C3 = 2;
	function q3(r, e) {
		return _3(r) && w3(e)
			? v3(E3(r), e)
			: function (t) {
					var n = y3(t, r);
					return n === void 0 && n === e ? b3(t, r) : g3(e, n, x3 | C3);
				};
	}
	Uv.exports = q3;
});
var Hv = l((Rle, Qv) => {
	function T3(r) {
		return function (e) {
			return e?.[r];
		};
	}
	Qv.exports = T3;
});
var Vv = l((Nle, Wv) => {
	var A3 = Ai();
	function S3(r) {
		return function (e) {
			return A3(e, r);
		};
	}
	Wv.exports = S3;
});
var Jv = l((Ile, Gv) => {
	var O3 = Hv(),
		R3 = Vv(),
		N3 = po(),
		I3 = mn();
	function P3(r) {
		return N3(r) ? O3(I3(r)) : R3(r);
	}
	Gv.exports = P3;
});
var De = l((Ple, Kv) => {
	var k3 = $v(),
		$3 = Fv(),
		M3 = ge(),
		j3 = V(),
		L3 = Jv();
	function B3(r) {
		return typeof r == 'function'
			? r
			: r == null
				? M3
				: typeof r == 'object'
					? j3(r)
						? $3(r[0], r[1])
						: k3(r)
					: L3(r);
	}
	Kv.exports = B3;
});
var Zv = l((kle, zv) => {
	function D3(r) {
		return function (e, t, n) {
			for (var i = -1, s = Object(e), o = n(e), a = o.length; a--; ) {
				var u = o[r ? a : ++i];
				if (t(s[u], u, s) === !1) break;
			}
			return e;
		};
	}
	zv.exports = D3;
});
var al = l(($le, Yv) => {
	var U3 = Zv(),
		F3 = U3();
	Yv.exports = F3;
});
var ul = l((Mle, Xv) => {
	var Q3 = al(),
		H3 = at();
	function W3(r, e) {
		return r && Q3(r, e, H3);
	}
	Xv.exports = W3;
});
var tE = l((jle, eE) => {
	var V3 = Be();
	function G3(r, e) {
		return function (t, n) {
			if (t == null) return t;
			if (!V3(t)) return r(t, n);
			for (
				var i = t.length, s = e ? i : -1, o = Object(t);
				(e ? s-- : ++s < i) && n(o[s], s, o) !== !1;

			);
			return t;
		};
	}
	eE.exports = G3;
});
var wr = l((Lle, rE) => {
	var J3 = ul(),
		K3 = tE(),
		z3 = K3(J3);
	rE.exports = z3;
});
var cl = l((Ble, nE) => {
	var Z3 = wr(),
		Y3 = Be();
	function X3(r, e) {
		var t = -1,
			n = Y3(r) ? Array(r.length) : [];
		return (
			Z3(r, function (i, s, o) {
				n[++t] = e(i, s, o);
			}),
			n
		);
	}
	nE.exports = X3;
});
var sE = l((Dle, iE) => {
	function eW(r, e) {
		var t = r.length;
		for (r.sort(e); t--; ) r[t] = r[t].value;
		return r;
	}
	iE.exports = eW;
});
var uE = l((Ule, aE) => {
	var oE = gr();
	function tW(r, e) {
		if (r !== e) {
			var t = r !== void 0,
				n = r === null,
				i = r === r,
				s = oE(r),
				o = e !== void 0,
				a = e === null,
				u = e === e,
				c = oE(e);
			if (
				(!a && !c && !s && r > e) ||
				(s && o && u && !a && !c) ||
				(n && o && u) ||
				(!t && u) ||
				!i
			)
				return 1;
			if (
				(!n && !s && !c && r < e) ||
				(c && t && i && !n && !s) ||
				(a && t && i) ||
				(!o && i) ||
				!u
			)
				return -1;
		}
		return 0;
	}
	aE.exports = tW;
});
var lE = l((Fle, cE) => {
	var rW = uE();
	function nW(r, e, t) {
		for (
			var n = -1, i = r.criteria, s = e.criteria, o = i.length, a = t.length;
			++n < o;

		) {
			var u = rW(i[n], s[n]);
			if (u) {
				if (n >= a) return u;
				var c = t[n];
				return u * (c == 'desc' ? -1 : 1);
			}
		}
		return r.index - e.index;
	}
	cE.exports = nW;
});
var dE = l((Qle, hE) => {
	var ll = mr(),
		iW = Ai(),
		sW = De(),
		oW = cl(),
		aW = sE(),
		uW = an(),
		cW = lE(),
		lW = ge(),
		hW = V();
	function dW(r, e, t) {
		e.length
			? (e = ll(e, function (s) {
					return hW(s)
						? function (o) {
								return iW(o, s.length === 1 ? s[0] : s);
							}
						: s;
				}))
			: (e = [lW]);
		var n = -1;
		e = ll(e, uW(sW));
		var i = oW(r, function (s, o, a) {
			var u = ll(e, function (c) {
				return c(s);
			});
			return {criteria: u, index: ++n, value: s};
		});
		return aW(i, function (s, o) {
			return cW(s, o, t);
		});
	}
	hE.exports = dW;
});
var mE = l((Hle, pE) => {
	var fW = fo(),
		pW = dE(),
		mW = fr(),
		fE = pr(),
		gW = mW(function (r, e) {
			if (r == null) return [];
			var t = e.length;
			return (
				t > 1 && fE(r, e[0], e[1])
					? (e = [])
					: t > 2 && fE(e[0], e[1], e[2]) && (e = [e[0]]),
				pW(r, fW(e, 1), [])
			);
		});
	pE.exports = gW;
});
var hl = l((Wle, yE) => {
	'use strict';
	var gE = _('path');
	function yW(r) {
		let e = gE.basename(r);
		return gE.sep === '\\' && (e = e.toLowerCase()), e === 'node_modules';
	}
	yE.exports = yW;
});
var dl = l((Vle, bE) => {
	'use strict';
	bE.exports = new Map();
});
var vE = l((Gle, wE) => {
	'use strict';
	var _o = _('path'),
		{promisify: bW} = _('util'),
		_W = bW(_('fs').readFile),
		wW = hl(),
		fl = dl(),
		bo = new Map();
	async function vW(r) {
		if (wW(r)) return 'commonjs';
		try {
			return (
				JSON.parse(await _W(_o.resolve(r, 'package.json'))).type || 'commonjs'
			);
		} catch {}
		let e = _o.dirname(r);
		return e === r ? 'commonjs' : _E(e);
	}
	async function _E(r) {
		if (fl.has(r)) return fl.get(r);
		if (bo.has(r)) return bo.get(r);
		let e = vW(r);
		bo.set(r, e);
		let t = await e;
		return fl.set(r, t), bo.delete(r), t;
	}
	function EW(r) {
		return _E(_o.resolve(_o.dirname(r)));
	}
	wE.exports = EW;
});
var CE = l((Jle, xE) => {
	'use strict';
	var wo = _('path'),
		{readFileSync: xW} = _('fs'),
		CW = hl(),
		pl = dl();
	function qW(r) {
		if (CW(r)) return 'commonjs';
		try {
			return JSON.parse(xW(wo.resolve(r, 'package.json'))).type || 'commonjs';
		} catch {}
		let e = wo.dirname(r);
		return e === r ? 'commonjs' : EE(e);
	}
	function EE(r) {
		if (pl.has(r)) return pl.get(r);
		let e = qW(r);
		return pl.set(r, e), e;
	}
	function TW(r) {
		return EE(wo.resolve(wo.dirname(r)));
	}
	xE.exports = TW;
});
var qE = l((Kle, ml) => {
	'use strict';
	var AW = vE(),
		SW = CE();
	ml.exports = (r) => AW(r);
	ml.exports.sync = SW;
});
var AE = l((zle, TE) => {
	var OW = qE();
	TE.exports = async function (e) {
		return (
			e.endsWith('.mjs') || (!e.endsWith('.cjs') && (await OW(e)) === 'module')
		);
	};
});
var gl = l((Zle, SE) => {
	var RW = AE();
	SE.exports = async function (e) {
		return (await RW(e)) ? import(_('url').pathToFileURL(e)) : _(e);
	};
});
var Ii = l((Xle, NE) => {
	var OE = _('path'),
		RE = Object.freeze([
			'.co',
			'.coffee',
			'.eg',
			'.iced',
			'.js',
			'.cjs',
			'.litcoffee',
			'.ls',
			'.ts',
		]),
		yl = class {
			constructor(e, t, n) {
				(this.sortDirsSeparately = t),
					Array.isArray(e) || (e = [e]),
					(this.migrationsPaths = e),
					(this.loadExtensions = n || RE);
			}
			getFile(e) {
				let t = OE.resolve(process.cwd(), e.directory),
					n = OE.join(t, e.file);
				return gl()(n);
			}
		};
	NE.exports = {DEFAULT_LOAD_EXTENSIONS: RE, AbstractMigrationsLoader: yl};
});
var $E = l((ehe, kE) => {
	var PE = _('path'),
		NW = mE(),
		{readdir: IW} = yn(),
		{AbstractMigrationsLoader: PW} = Ii(),
		bl = class extends PW {
			getMigrations(e) {
				let t = this.migrationsPaths.map((n) => {
					let i = PE.resolve(process.cwd(), n);
					return IW(i).then((s) => ({files: s, configDir: n, absoluteDir: i}));
				});
				return Promise.all(t).then((n) => {
					let i = n.reduce(
						(s, o) => (
							this.sortDirsSeparately && (o.files = o.files.sort()),
							o.files.forEach((a) => s.push({file: a, directory: o.configDir})),
							s
						),
						[]
					);
					return this.sortDirsSeparately
						? IE(this, i, e || this.loadExtensions)
						: IE(this, NW(i, 'file'), e || this.loadExtensions);
				});
			}
			getMigrationName(e) {
				return e.file;
			}
			getMigration(e) {
				return this.getFile(e);
			}
		};
	function IE(r, e, t) {
		return e.filter((n) => {
			let i = r.getMigrationName(n),
				s = PE.extname(i);
			return t.includes(s);
		});
	}
	kE.exports = {FsMigrations: bl};
});
var FE = l((R) => {
	'use strict';
	Object.defineProperty(R, '__esModule', {value: !0});
	var kW = _('tty');
	function $W(r) {
		if (r && r.__esModule) return r;
		var e = Object.create(null);
		return (
			r &&
				Object.keys(r).forEach(function (t) {
					if (t !== 'default') {
						var n = Object.getOwnPropertyDescriptor(r, t);
						Object.defineProperty(
							e,
							t,
							n.get
								? n
								: {
										enumerable: !0,
										get: function () {
											return r[t];
										},
									}
						);
					}
				}),
			(e.default = r),
			Object.freeze(e)
		);
	}
	var _l = $W(kW),
		{
			env: qt = {},
			argv: jE = [],
			platform: MW = '',
		} = typeof process > 'u' ? {} : process,
		jW = 'NO_COLOR' in qt || jE.includes('--no-color'),
		LW = 'FORCE_COLOR' in qt || jE.includes('--color'),
		BW = MW === 'win32',
		LE = qt.TERM === 'dumb',
		DW = _l && _l.isatty && _l.isatty(1) && qt.TERM && !LE,
		UW =
			'CI' in qt &&
			('GITHUB_ACTIONS' in qt || 'GITLAB_CI' in qt || 'CIRCLECI' in qt),
		BE = !jW && (LW || (BW && !LE) || DW || UW),
		DE = (
			r,
			e,
			t,
			n,
			i = e.substring(0, r) + n,
			s = e.substring(r + t.length),
			o = s.indexOf(t)
		) => i + (o < 0 ? s : DE(o, s, t, n)),
		FW = (r, e, t, n, i) => (r < 0 ? t + e + n : t + DE(r, e, n, i) + n),
		QW =
			(r, e, t = r, n = r.length + 1) =>
			(i) =>
				i || !(i === '' || i === void 0)
					? FW(('' + i).indexOf(e, n), i, r, e, t)
					: '',
		$ = (r, e, t) => QW(`\x1B[${r}m`, `\x1B[${e}m`, t),
		ME = {
			reset: $(0, 0),
			bold: $(1, 22, '\x1B[22m\x1B[1m'),
			dim: $(2, 22, '\x1B[22m\x1B[2m'),
			italic: $(3, 23),
			underline: $(4, 24),
			inverse: $(7, 27),
			hidden: $(8, 28),
			strikethrough: $(9, 29),
			black: $(30, 39),
			red: $(31, 39),
			green: $(32, 39),
			yellow: $(33, 39),
			blue: $(34, 39),
			magenta: $(35, 39),
			cyan: $(36, 39),
			white: $(37, 39),
			gray: $(90, 39),
			bgBlack: $(40, 49),
			bgRed: $(41, 49),
			bgGreen: $(42, 49),
			bgYellow: $(43, 49),
			bgBlue: $(44, 49),
			bgMagenta: $(45, 49),
			bgCyan: $(46, 49),
			bgWhite: $(47, 49),
			blackBright: $(90, 39),
			redBright: $(91, 39),
			greenBright: $(92, 39),
			yellowBright: $(93, 39),
			blueBright: $(94, 39),
			magentaBright: $(95, 39),
			cyanBright: $(96, 39),
			whiteBright: $(97, 39),
			bgBlackBright: $(100, 49),
			bgRedBright: $(101, 49),
			bgGreenBright: $(102, 49),
			bgYellowBright: $(103, 49),
			bgBlueBright: $(104, 49),
			bgMagentaBright: $(105, 49),
			bgCyanBright: $(106, 49),
			bgWhiteBright: $(107, 49),
		},
		UE = ({useColor: r = BE} = {}) =>
			r ? ME : Object.keys(ME).reduce((e, t) => ({...e, [t]: String}), {}),
		{
			reset: HW,
			bold: WW,
			dim: VW,
			italic: GW,
			underline: JW,
			inverse: KW,
			hidden: zW,
			strikethrough: ZW,
			black: YW,
			red: XW,
			green: eV,
			yellow: tV,
			blue: rV,
			magenta: nV,
			cyan: iV,
			white: sV,
			gray: oV,
			bgBlack: aV,
			bgRed: uV,
			bgGreen: cV,
			bgYellow: lV,
			bgBlue: hV,
			bgMagenta: dV,
			bgCyan: fV,
			bgWhite: pV,
			blackBright: mV,
			redBright: gV,
			greenBright: yV,
			yellowBright: bV,
			blueBright: _V,
			magentaBright: wV,
			cyanBright: vV,
			whiteBright: EV,
			bgBlackBright: xV,
			bgRedBright: CV,
			bgGreenBright: qV,
			bgYellowBright: TV,
			bgBlueBright: AV,
			bgMagentaBright: SV,
			bgCyanBright: OV,
			bgWhiteBright: RV,
		} = UE();
	R.bgBlack = aV;
	R.bgBlackBright = xV;
	R.bgBlue = hV;
	R.bgBlueBright = AV;
	R.bgCyan = fV;
	R.bgCyanBright = OV;
	R.bgGreen = cV;
	R.bgGreenBright = qV;
	R.bgMagenta = dV;
	R.bgMagentaBright = SV;
	R.bgRed = uV;
	R.bgRedBright = CV;
	R.bgWhite = pV;
	R.bgWhiteBright = RV;
	R.bgYellow = lV;
	R.bgYellowBright = TV;
	R.black = YW;
	R.blackBright = mV;
	R.blue = rV;
	R.blueBright = _V;
	R.bold = WW;
	R.createColors = UE;
	R.cyan = iV;
	R.cyanBright = vV;
	R.dim = VW;
	R.gray = oV;
	R.green = eV;
	R.greenBright = yV;
	R.hidden = zW;
	R.inverse = KW;
	R.isColorSupported = BE;
	R.italic = GW;
	R.magenta = nV;
	R.magentaBright = wV;
	R.red = XW;
	R.redBright = gV;
	R.reset = HW;
	R.strikethrough = ZW;
	R.underline = JW;
	R.white = sV;
	R.whiteBright = EV;
	R.yellow = tV;
	R.yellowBright = bV;
});
var U = l((rhe, QE) => {
	function NV(r) {
		return typeof r == 'string';
	}
	function IV(r) {
		return typeof r == 'number';
	}
	function PV(r) {
		return typeof r == 'boolean';
	}
	function kV(r) {
		return typeof r > 'u';
	}
	function $V(r) {
		return typeof r == 'object' && r !== null;
	}
	function MV(r) {
		return typeof r == 'function';
	}
	QE.exports = {
		isString: NV,
		isNumber: IV,
		isBoolean: PV,
		isUndefined: kV,
		isObject: $V,
		isFunction: MV,
	};
});
var vo = l((nhe, WE) => {
	var wl = FE(),
		{inspect: jV} = _('util'),
		{isString: LV, isFunction: HE} = U(),
		vl = class {
			constructor(e = {}) {
				let {
					log: {
						debug: t,
						warn: n,
						error: i,
						deprecate: s,
						inspectionDepth: o,
						enableColors: a,
					} = {},
				} = e;
				(this._inspectionDepth = o || 5),
					(this._enableColors = BV(a)),
					(this._debug = t),
					(this._warn = n),
					(this._error = i),
					(this._deprecate = s);
			}
			_log(e, t, n) {
				if (t != null && !HE(t))
					throw new TypeError('Extensions to knex logger must be functions!');
				if (HE(t)) {
					t(e);
					return;
				}
				LV(e) ||
					(e = jV(e, {
						depth: this._inspectionDepth,
						colors: this._enableColors,
					})),
					console.log(n ? n(e) : e);
			}
			debug(e) {
				this._log(e, this._debug);
			}
			warn(e) {
				this._log(e, this._warn, wl.yellow);
			}
			error(e) {
				this._log(e, this._error, wl.red);
			}
			deprecate(e, t) {
				let n = `${e} is deprecated, please use ${t}`;
				this._log(n, this._deprecate, wl.yellow);
			}
		};
	function BV(r) {
		return r ?? (process && process.stdout ? process.stdout.isTTY : !1);
	}
	WE.exports = vl;
});
var El = l((ihe, VE) => {
	var {FsMigrations: DV} = $E(),
		UV = vo(),
		{DEFAULT_LOAD_EXTENSIONS: FV} = Ii(),
		QV = new UV(),
		HV = Object.freeze({
			extension: 'js',
			loadExtensions: FV,
			tableName: 'knex_migrations',
			schemaName: null,
			directory: './migrations',
			disableTransactions: !1,
			disableMigrationsListValidation: !1,
			sortDirsSeparately: !1,
		});
	function WV(r, e, t = QV) {
		let n = Object.assign({}, HV, e || {}, r);
		return (
			r &&
				(r.directory || r.sortDirsSeparately !== void 0 || r.loadExtensions) &&
				(r.migrationSource &&
					t.warn(
						'FS-related option specified for migration configuration. This resets migrationSource to default FsMigrations'
					),
				(n.migrationSource = null)),
			n.migrationSource ||
				(n.migrationSource = new DV(
					n.directory,
					n.sortDirsSeparately,
					n.loadExtensions
				)),
			n
		);
	}
	VE.exports = {getMergedConfig: WV};
});
var xl = l((she, GE) => {
	function VV() {
		let r = new Date();
		return (
			r.getUTCFullYear().toString() +
			(r.getUTCMonth() + 1).toString().padStart(2, '0') +
			r.getUTCDate().toString().padStart(2, '0') +
			r.getUTCHours().toString().padStart(2, '0') +
			r.getUTCMinutes().toString().padStart(2, '0') +
			r.getUTCSeconds().toString().padStart(2, '0')
		);
	}
	GE.exports = {yyyymmddhhmmss: VV};
});
var zE = l((ohe, KE) => {
	var Cl = _('path'),
		{writeJsFileUsingTemplate: GV} = Zc(),
		{getMergedConfig: JE} = El(),
		{ensureDirectoryExists: JV} = yn(),
		{yyyymmddhhmmss: KV} = xl(),
		ql = class {
			constructor(e, t) {
				this.config = JE(e, void 0, t);
			}
			async make(e, t, n) {
				return (
					(this.config = JE(t, this.config, n)),
					e
						? (await this._ensureFolder(), await this._writeNewMigration(e))
						: Promise.reject(
								new Error(
									'A name must be specified for the generated migration'
								)
							)
				);
			}
			_ensureFolder() {
				let t = this._absoluteConfigDirs().map(JV);
				return Promise.all(t);
			}
			_getStubPath() {
				return (
					this.config.stub ||
					Cl.join(__dirname, 'stub', this.config.extension + '.stub')
				);
			}
			_getNewMigrationName(e) {
				return (
					e[0] === '-' && (e = e.slice(1)),
					KV() + '_' + e + '.' + this.config.extension.split('-')[0]
				);
			}
			_getNewMigrationPath(e) {
				let t = this._getNewMigrationName(e),
					i = this._absoluteConfigDirs().slice(-1)[0];
				return Cl.join(i, t);
			}
			async _writeNewMigration(e) {
				let t = this._getNewMigrationPath(e);
				return (
					await GV(
						t,
						this._getStubPath(),
						{variable: 'd'},
						this.config.variables || {}
					),
					t
				);
			}
			_absoluteConfigDirs() {
				return (
					Array.isArray(this.config.directory)
						? this.config.directory
						: [this.config.directory]
				).map(
					(t) => (
						t ||
							console.warn(
								'Failed to resolve config file, knex cannot determine where to generate migrations'
							),
						Cl.resolve(process.cwd(), t)
					)
				);
			}
		};
	KE.exports = ql;
});
var ex = l((ahe, XE) => {
	var YE = W_(),
		zV = Hc(),
		ZV = we(),
		YV = lw(),
		{getLockTableName: Tl, getTable: Pi, getTableName: Eo} = mo(),
		{getSchemaBuilder: XV} = Vc(),
		Tt = gw(),
		e6 = zE(),
		{getMergedConfig: ct} = El(),
		{isBoolean: t6, isFunction: r6} = U(),
		Co = class extends Error {
			constructor(e) {
				super(e), (this.name = 'MigrationLocked');
			}
		},
		Al = class {
			constructor(e) {
				r6(e)
					? e.isTransaction
						? (this.knex = e)
						: (this.knex = e.withUserParams({...e.userParams}))
					: ((this.knex = Object.assign({}, e)),
						(this.knex.userParams = this.knex.userParams || {})),
					(this.config = ct(
						this.knex.client.config.migrations,
						void 0,
						this.knex.client.logger
					)),
					(this.generator = new e6(
						this.knex.client.config.migrations,
						this.knex.client.logger
					)),
					(this._activeMigration = {fileName: null});
			}
			async latest(e) {
				this._disableProcessing(),
					(this.config = ct(e, this.config, this.knex.client.logger));
				let t = await Tt.listAllAndCompleted(this.config, this.knex);
				this.config.disableMigrationsListValidation ||
					ki(this.config.migrationSource, t);
				let [n, i] = t,
					s = xo(this.config.migrationSource, n, i);
				return !this.config.disableTransactions &&
					!(
						await Promise.all(
							s.map(async (a) => {
								let u = await this.config.migrationSource.getMigration(a);
								return !this._useTransaction(u);
							})
						)
					).some((a) => a)
					? this.knex.transaction((a) => this._runBatch(s, 'up', a))
					: this._runBatch(s, 'up');
			}
			async up(e) {
				this._disableProcessing(),
					(this.config = ct(e, this.config, this.knex.client.logger));
				let t = await Tt.listAllAndCompleted(this.config, this.knex);
				this.config.disableMigrationsListValidation ||
					ki(this.config.migrationSource, t);
				let [n, i] = t,
					s = xo(this.config.migrationSource, n, i),
					o,
					a = this.config.name;
				if (a) {
					if (
						!i.includes(a) &&
						((o = s.find(
							(d) => this.config.migrationSource.getMigrationName(d) === a
						)),
						!o)
					)
						throw new Error(`Migration "${a}" not found.`);
				} else o = s[0];
				let u =
						!o ||
						this._useTransaction(
							await this.config.migrationSource.getMigration(o)
						),
					c = [];
				return (
					o && c.push(o),
					!this.config.disableTransactions && (!o || u)
						? await this.knex.transaction((d) => this._runBatch(c, 'up', d))
						: await this._runBatch(c, 'up')
				);
			}
			rollback(e, t = !1) {
				return (
					this._disableProcessing(),
					new Promise((n, i) => {
						try {
							this.config = ct(e, this.config, this.knex.client.logger);
						} catch (s) {
							i(s);
						}
						Tt.listAllAndCompleted(this.config, this.knex)
							.then(
								(s) => (
									this.config.disableMigrationsListValidation ||
										ki(this.config.migrationSource, s),
									s
								)
							)
							.then((s) => {
								let [o, a] = s;
								return t
									? o
											.filter((u) =>
												a
													.map((c) => c.name)
													.includes(
														this.config.migrationSource.getMigrationName(u)
													)
											)
											.reverse()
									: this._getLastBatch(s);
							})
							.then((s) => this._runBatch(s, 'down'))
							.then(n, i);
					})
				);
			}
			down(e) {
				return (
					this._disableProcessing(),
					(this.config = ct(e, this.config, this.knex.client.logger)),
					Tt.listAllAndCompleted(this.config, this.knex)
						.then(
							(t) => (
								this.config.disableMigrationsListValidation ||
									ki(this.config.migrationSource, t),
								t
							)
						)
						.then(([t, n]) => {
							let i = t.filter((u) =>
									n
										.map((c) => c.name)
										.includes(this.config.migrationSource.getMigrationName(u))
								),
								s,
								o = this.config.name;
							if (o) {
								if (
									((s = i.find(
										(u) => this.config.migrationSource.getMigrationName(u) === o
									)),
									!s)
								)
									throw new Error(`Migration "${o}" was not run.`);
							} else s = i[i.length - 1];
							let a = [];
							return s && a.push(s), this._runBatch(a, 'down');
						})
				);
			}
			status(e) {
				return (
					this._disableProcessing(),
					(this.config = ct(e, this.config, this.knex.client.logger)),
					Promise.all([
						Pi(this.knex, this.config.tableName, this.config.schemaName).select(
							'*'
						),
						Tt.listAll(this.config.migrationSource),
					]).then(([t, n]) => t.length - n.length)
				);
			}
			currentVersion(e) {
				return (
					this._disableProcessing(),
					(this.config = ct(e, this.config, this.knex.client.logger)),
					Tt.listCompleted(
						this.config.tableName,
						this.config.schemaName,
						this.knex
					).then((t) => {
						let n = YV(t.map((i) => i.name.split('_')[0]));
						return n === void 0 ? 'none' : n;
					})
				);
			}
			async list(e) {
				this._disableProcessing(),
					(this.config = ct(e, this.config, this.knex.client.logger));
				let [t, n] = await Tt.listAllAndCompleted(this.config, this.knex);
				this.config.disableMigrationsListValidation ||
					ki(this.config.migrationSource, [t, n]);
				let i = xo(this.config.migrationSource, t, n);
				return [n, i];
			}
			async forceFreeMigrationsLock(e) {
				this._disableProcessing(),
					(this.config = ct(e, this.config, this.knex.client.logger));
				let {schemaName: t, tableName: n} = this.config,
					i = Tl(n),
					{knex: s} = this,
					o = () => Pi(s, i, t);
				(await XV(s, t).hasTable(i)) &&
					(await o().del(), await o().insert({is_locked: 0}));
			}
			make(e, t) {
				return this.generator.make(e, t, this.knex.client.logger);
			}
			_disableProcessing() {
				this.knex.disableProcessing && this.knex.disableProcessing();
			}
			_lockMigrations(e) {
				let t = Tl(this.config.tableName);
				return Pi(this.knex, t, this.config.schemaName)
					.transacting(e)
					.where('is_locked', '=', 0)
					.update({is_locked: 1})
					.then((n) => {
						if (n !== 1) throw new Error('Migration table is already locked');
					});
			}
			_getLock(e) {
				return (e ? (n) => n(e) : (n) => this.knex.transaction(n))((n) =>
					this._lockMigrations(n)
				).catch((n) => {
					throw new Co(n.message);
				});
			}
			_freeLock(e = this.knex) {
				let t = Tl(this.config.tableName);
				return Pi(e, t, this.config.schemaName).update({is_locked: 0});
			}
			async _runBatch(e, t, n) {
				let i = this.knex.client.driverName !== 'cockroachdb';
				try {
					await this._getLock(i ? n : void 0);
					let s = n
						? await Tt.listCompleted(
								this.config.tableName,
								this.config.schemaName,
								n
							)
						: [];
					(e = xo(this.config.migrationSource, e, s)),
						await Promise.all(
							e.map(this._validateMigrationStructure.bind(this))
						);
					let o = await this._latestBatchNumber(n);
					t === 'up' && o++;
					let a = await this._waterfallBatch(o, e, t, n);
					return await this._freeLock(i ? n : void 0), a;
				} catch (s) {
					let o = Promise.resolve();
					s instanceof Co
						? (this.knex.client.logger.warn(
								`Can't take lock to run migrations: ${s.message}`
							),
							this.knex.client.logger.warn(
								"If you are sure migrations are not running you can release the lock manually by running 'knex migrate:unlock'"
							))
						: (this._activeMigration.fileName &&
								this.knex.client.logger.warn(
									`migration file "${this._activeMigration.fileName}" failed`
								),
							this.knex.client.logger.warn(
								`migration failed with error: ${s.message}`
							),
							(o = this._freeLock(i ? n : void 0)));
					try {
						await o;
					} catch {}
					throw s;
				}
			}
			async _validateMigrationStructure(e) {
				let t = this.config.migrationSource.getMigrationName(e),
					n = await this.config.migrationSource.getMigration(e);
				if (typeof n.up != 'function' || typeof n.down != 'function')
					throw new Error(
						`Invalid migration: ${t} must have both an up and down function`
					);
				return e;
			}
			async _getLastBatch([e]) {
				let {tableName: t, schemaName: n} = this.config,
					s = (
						await Pi(this.knex, t, n)
							.where('batch', function (o) {
								o.max('batch').from(Eo(t, n));
							})
							.orderBy('id', 'desc')
					).map((o) =>
						e.find(
							(a) => this.config.migrationSource.getMigrationName(a) === o.name
						)
					);
				return Promise.all(s);
			}
			_latestBatchNumber(e = this.knex) {
				return e
					.from(Eo(this.config.tableName, this.config.schemaName))
					.max('batch as max_batch')
					.then((t) => t[0].max_batch || 0);
			}
			_useTransaction(e, t) {
				let n = zV(e, 'config.transaction');
				return t6(n) ? n : !t;
			}
			_waterfallBatch(e, t, n, i) {
				let s = i || this.knex,
					{tableName: o, schemaName: a, disableTransactions: u} = this.config,
					c = Promise.resolve(),
					h = [];
				return (
					t.forEach((d) => {
						let f = this.config.migrationSource.getMigrationName(d);
						this._activeMigration.fileName = f;
						let m = this.config.migrationSource.getMigration(d);
						c = c
							.then(async () => await m)
							.then(
								(g) => (
									(this._activeMigration.fileName = f),
									!i && this._useTransaction(g, u)
										? (this.knex.enableProcessing(),
											this._transaction(this.knex, g, n, f))
										: (s.enableProcessing(),
											ZE(this.knex.client.logger, g[n](s), f))
								)
							)
							.then(() => {
								if (
									(s.disableProcessing(),
									this.knex.disableProcessing(),
									h.push(f),
									n === 'up')
								)
									return s
										.into(Eo(o, a))
										.insert({name: f, batch: e, migration_time: new Date()});
								if (n === 'down')
									return s.from(Eo(o, a)).where({name: f}).del();
							});
					}),
					c.then(() => [e, h])
				);
			}
			_transaction(e, t, n, i) {
				return e.transaction((s) =>
					ZE(e.client.logger, t[n](s), i, () => {
						s.commit();
					})
				);
			}
		};
	function ki(r, e) {
		let [t, n] = e,
			i = n6(r, n, t);
		if (!ZV(i)) {
			let s = i.map((o) => o.name);
			throw new Error(
				`The migration directory is corrupt, the following files are missing: ${s.join(', ')}`
			);
		}
	}
	function n6(r, e, t) {
		return YE(e, t, (n, i) => n.name === r.getMigrationName(i));
	}
	function xo(r, e, t) {
		return YE(e, t, (n, i) => i.name === r.getMigrationName(n));
	}
	function ZE(r, e, t, n) {
		return (
			(!e || typeof e.then != 'function') &&
				(r.warn(`migration ${t} did not return a promise`), n && n()),
			e
		);
	}
	XE.exports = {Migrator: Al};
});
var Sl = l((uhe, tx) => {
	var i6 = st(),
		s6 = V(),
		o6 = Ne(),
		a6 = '[object String]';
	function u6(r) {
		return typeof r == 'string' || (!s6(r) && o6(r) && i6(r) == a6);
	}
	tx.exports = u6;
});
var nx = l((che, rx) => {
	var c6 = /\s/;
	function l6(r) {
		for (var e = r.length; e-- && c6.test(r.charAt(e)); );
		return e;
	}
	rx.exports = l6;
});
var sx = l((lhe, ix) => {
	var h6 = nx(),
		d6 = /^\s+/;
	function f6(r) {
		return r && r.slice(0, h6(r) + 1).replace(d6, '');
	}
	ix.exports = f6;
});
var cx = l((hhe, ux) => {
	var p6 = sx(),
		ox = qe(),
		m6 = gr(),
		ax = NaN,
		g6 = /^[-+]0x[0-9a-f]+$/i,
		y6 = /^0b[01]+$/i,
		b6 = /^0o[0-7]+$/i,
		_6 = parseInt;
	function w6(r) {
		if (typeof r == 'number') return r;
		if (m6(r)) return ax;
		if (ox(r)) {
			var e = typeof r.valueOf == 'function' ? r.valueOf() : r;
			r = ox(e) ? e + '' : e;
		}
		if (typeof r != 'string') return r === 0 ? r : +r;
		r = p6(r);
		var t = y6.test(r);
		return t || b6.test(r) ? _6(r.slice(2), t ? 2 : 8) : g6.test(r) ? ax : +r;
	}
	ux.exports = w6;
});
var dx = l((dhe, hx) => {
	var v6 = cx(),
		lx = 1 / 0,
		E6 = 17976931348623157e292;
	function x6(r) {
		if (!r) return r === 0 ? r : 0;
		if (((r = v6(r)), r === lx || r === -lx)) {
			var e = r < 0 ? -1 : 1;
			return e * E6;
		}
		return r === r ? r : 0;
	}
	hx.exports = x6;
});
var qo = l((fhe, fx) => {
	var C6 = dx();
	function q6(r) {
		var e = C6(r),
			t = e % 1;
		return e === e ? (t ? e - t : e) : 0;
	}
	fx.exports = q6;
});
var To = l((phe, px) => {
	var T6 = Jc(),
		A6 = at();
	function S6(r) {
		return r == null ? [] : T6(r, A6(r));
	}
	px.exports = S6;
});
var gx = l((mhe, mx) => {
	var O6 = lo(),
		R6 = Be(),
		N6 = Sl(),
		I6 = qo(),
		P6 = To(),
		k6 = Math.max;
	function $6(r, e, t, n) {
		(r = R6(r) ? r : P6(r)), (t = t && !n ? I6(t) : 0);
		var i = r.length;
		return (
			t < 0 && (t = k6(i + t, 0)),
			N6(r) ? t <= i && r.indexOf(e, t) > -1 : !!i && O6(r, e, t) > -1
		);
	}
	mx.exports = $6;
});
var bx = l((ghe, yx) => {
	var Ol = _('path'),
		M6 = Ri(),
		j6 = gx(),
		{AbstractMigrationsLoader: L6} = Ii(),
		{getFilepathsInFolder: B6} = yn(),
		D6 = (r) => (e) => {
			let t = Ol.extname(e);
			return j6(r, t);
		},
		Rl = class extends L6 {
			_getConfigDirectories(e) {
				return this.migrationsPaths.map(
					(n) => (
						n ||
							e.warn(
								'Empty value passed as a directory for Seeder, this is not supported.'
							),
						Ol.resolve(process.cwd(), n)
					)
				);
			}
			async getSeeds(e) {
				let {loadExtensions: t, recursive: n, specific: i} = e,
					o = M6(
						await Promise.all(
							this._getConfigDirectories(e.logger).map((a) => B6(a, n))
						)
					).filter(D6(t));
				if (
					(this.sortDirsSeparately || o.sort(),
					i && ((o = o.filter((a) => Ol.basename(a) === i)), o.length === 0))
				)
					throw new Error(
						`Invalid argument provided: the specific seed "${i}" does not exist.`
					);
				return o;
			}
			async getSeed(e) {
				return await gl()(e);
			}
		};
	yx.exports = {FsSeeds: Rl};
});
var wx = l((yhe, _x) => {
	var {FsSeeds: U6} = bx(),
		F6 = vo(),
		{DEFAULT_LOAD_EXTENSIONS: Q6} = Ii(),
		H6 = new F6(),
		W6 = Object.freeze({
			extension: 'js',
			directory: './seeds',
			loadExtensions: Q6,
			specific: null,
			timestampFilenamePrefix: !1,
			recursive: !1,
			sortDirsSeparately: !1,
		});
	function V6(r, e, t = H6) {
		let n = Object.assign({}, W6, e || {}, r, {logger: t});
		return (
			r &&
				(r.directory || r.sortDirsSeparately !== void 0 || r.loadExtensions) &&
				(r.seedSource &&
					t.warn(
						'FS-related option specified for seed configuration. This resets seedSource to default FsMigrations'
					),
				(n.seedSource = null)),
			n.seedSource ||
				(n.seedSource = new U6(
					n.directory,
					n.sortDirsSeparately,
					n.loadExtensions
				)),
			n
		);
	}
	_x.exports = {getMergedConfig: V6};
});
var xx = l((bhe, Ex) => {
	var vx = _('path'),
		{ensureDirectoryExists: G6} = yn(),
		{writeJsFileUsingTemplate: J6} = Zc(),
		{yyyymmddhhmmss: K6} = xl(),
		{getMergedConfig: z6} = wx(),
		Nl = class {
			constructor(e) {
				(this.knex = e),
					(this.config = this.resolveConfig(e.client.config.seeds));
			}
			async run(e) {
				this.config = this.resolveConfig(e);
				let t = await this.config.seedSource.getSeeds(this.config);
				return this._runSeeds(t);
			}
			async make(e, t) {
				if (((this.config = this.resolveConfig(t)), !e))
					throw new Error('A name must be specified for the generated seed');
				return await this._ensureFolder(t), await this._writeNewSeed(e);
			}
			_ensureFolder() {
				let t = this.config.seedSource
					._getConfigDirectories(this.config.logger)
					.map(G6);
				return Promise.all(t);
			}
			async _runSeeds(e) {
				for (let t of e) await this._validateSeedStructure(t);
				return this._waterfallBatch(e);
			}
			async _validateSeedStructure(e) {
				if (typeof (await this.config.seedSource.getSeed(e)).seed != 'function')
					throw new Error(`Invalid seed file: ${e} must have a seed function`);
				return e;
			}
			_getStubPath() {
				return (
					this.config.stub ||
					vx.join(__dirname, 'stub', this.config.extension + '.stub')
				);
			}
			_getNewStubFileName(e) {
				return (
					e[0] === '-' && (e = e.slice(1)),
					this.config.timestampFilenamePrefix === !0 && (e = `${K6()}_${e}`),
					`${e}.${this.config.extension}`
				);
			}
			_getNewStubFilePath(e) {
				let t = this._getNewStubFileName(e),
					i = this.config.seedSource
						._getConfigDirectories(this.config.logger)
						.slice(-1)[0];
				return vx.join(i, t);
			}
			async _writeNewSeed(e) {
				let t = this._getNewStubFilePath(e);
				return (
					await J6(
						t,
						this._getStubPath(),
						{variable: 'd'},
						this.config.variables || {}
					),
					t
				);
			}
			async _listAll(e) {
				return (
					(this.config = this.resolveConfig(e)),
					this.config.seedSource.getSeeds(this.config)
				);
			}
			async _waterfallBatch(e) {
				let {knex: t} = this,
					n = [];
				for (let i of e) {
					let s = await this.config.seedSource.getSeed(i);
					try {
						await s.seed(t), n.push(i);
					} catch (o) {
						let a = new Error(
							`Error while executing "${i}" seed: ${o.message}`
						);
						throw (
							((a.original = o),
							(a.stack =
								a.stack
									.split(
										`
`
									)
									.slice(0, 2).join(`
`) +
								`
` +
								o.stack),
							a)
						);
					}
				}
				return [n];
			}
			resolveConfig(e) {
				return z6(e, this.config, this.knex.client.logger);
			}
		};
	Ex.exports = Nl;
});
var qx = l((_he, Cx) => {
	var Il = class {
		constructor(e) {
			this.client = e;
		}
		now(e) {
			return typeof e == 'number'
				? this.client.raw(`CURRENT_TIMESTAMP(${e})`)
				: this.client.raw('CURRENT_TIMESTAMP');
		}
		uuid() {
			switch (this.client.driverName) {
				case 'sqlite3':
				case 'better-sqlite3':
					return this.client.raw(
						"(lower(hex(randomblob(4))) || '-' || lower(hex(randomblob(2))) || '-4' || substr(lower(hex(randomblob(2))),2) || '-' || substr('89ab',abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || '-' || lower(hex(randomblob(6))))"
					);
				case 'mssql':
					return this.client.raw('(NEWID())');
				case 'pg':
				case 'pgnative':
				case 'cockroachdb':
					return this.client.raw('(gen_random_uuid())');
				case 'oracle':
				case 'oracledb':
					return this.client.raw('(random_uuid())');
				case 'mysql':
				case 'mysql2':
					return this.client.raw('(UUID())');
				default:
					throw new Error(
						`${this.client.driverName} does not have a uuid function`
					);
			}
		}
		uuidToBin(e, t = !0) {
			let n = Buffer.from(e.replace(/-/g, ''), 'hex');
			return t
				? Buffer.concat([
						n.slice(6, 8),
						n.slice(4, 6),
						n.slice(0, 4),
						n.slice(8, 16),
					])
				: Buffer.concat([
						n.slice(0, 4),
						n.slice(4, 6),
						n.slice(6, 8),
						n.slice(8, 16),
					]);
		}
		binToUuid(e, t = !0) {
			let n = Buffer.from(e, 'hex');
			return t
				? [
						n.toString('hex', 4, 8),
						n.toString('hex', 2, 4),
						n.toString('hex', 0, 2),
						n.toString('hex', 8, 10),
						n.toString('hex', 10, 16),
					].join('-')
				: [
						n.toString('hex', 0, 4),
						n.toString('hex', 4, 6),
						n.toString('hex', 6, 8),
						n.toString('hex', 8, 10),
						n.toString('hex', 10, 16),
					].join('-');
		}
	};
	Cx.exports = Il;
});
var Pl = l((whe, Tx) => {
	Tx.exports = [
		'with',
		'withRecursive',
		'withMaterialized',
		'withNotMaterialized',
		'select',
		'as',
		'columns',
		'column',
		'from',
		'fromJS',
		'fromRaw',
		'into',
		'withSchema',
		'table',
		'distinct',
		'join',
		'joinRaw',
		'innerJoin',
		'leftJoin',
		'leftOuterJoin',
		'rightJoin',
		'rightOuterJoin',
		'outerJoin',
		'fullOuterJoin',
		'crossJoin',
		'where',
		'andWhere',
		'orWhere',
		'whereNot',
		'orWhereNot',
		'whereLike',
		'andWhereLike',
		'orWhereLike',
		'whereILike',
		'andWhereILike',
		'orWhereILike',
		'whereRaw',
		'whereWrapped',
		'havingWrapped',
		'orWhereRaw',
		'whereExists',
		'orWhereExists',
		'whereNotExists',
		'orWhereNotExists',
		'whereIn',
		'orWhereIn',
		'whereNotIn',
		'orWhereNotIn',
		'whereNull',
		'orWhereNull',
		'whereNotNull',
		'orWhereNotNull',
		'whereBetween',
		'whereNotBetween',
		'andWhereBetween',
		'andWhereNotBetween',
		'orWhereBetween',
		'orWhereNotBetween',
		'groupBy',
		'groupByRaw',
		'orderBy',
		'orderByRaw',
		'union',
		'unionAll',
		'intersect',
		'except',
		'having',
		'havingRaw',
		'orHaving',
		'orHavingRaw',
		'offset',
		'limit',
		'count',
		'countDistinct',
		'min',
		'max',
		'sum',
		'sumDistinct',
		'avg',
		'avgDistinct',
		'increment',
		'decrement',
		'first',
		'debug',
		'pluck',
		'clearSelect',
		'clearWhere',
		'clearGroup',
		'clearOrder',
		'clearHaving',
		'insert',
		'update',
		'returning',
		'del',
		'delete',
		'truncate',
		'transacting',
		'connection',
		'jsonExtract',
		'jsonSet',
		'jsonInsert',
		'jsonRemove',
		'whereJsonObject',
		'orWhereJsonObject',
		'andWhereJsonObject',
		'whereNotJsonObject',
		'orWhereNotJsonObject',
		'andWhereNotJsonObject',
		'whereJsonPath',
		'orWhereJsonPath',
		'andWhereJsonPath',
		'whereJsonSupersetOf',
		'orWhereJsonSupersetOf',
		'andWhereJsonSupersetOf',
		'whereJsonNotSupersetOf',
		'orWhereJsonNotSupersetOf',
		'andWhereJsonNotSupersetOf',
		'whereJsonSubsetOf',
		'orWhereJsonSubsetOf',
		'andWhereJsonSubsetOf',
		'whereJsonNotSubsetOf',
		'orWhereJsonNotSubsetOf',
		'andWhereJsonNotSubsetOf',
	];
});
var kl = l((vhe, Ax) => {
	var Z6 = yi(),
		Y6 = vt();
	function X6(r, e, t) {
		((t !== void 0 && !Y6(r[e], t)) || (t === void 0 && !(e in r))) &&
			Z6(r, e, t);
	}
	Ax.exports = X6;
});
var $l = l((Ehe, Sx) => {
	function e4(r, e) {
		if (!(e === 'constructor' && typeof r[e] == 'function') && e != '__proto__')
			return r[e];
	}
	Sx.exports = e4;
});
var Rx = l((xhe, Ox) => {
	var t4 = ot(),
		r4 = ut();
	function n4(r) {
		return t4(r, r4(r));
	}
	Ox.exports = n4;
});
var Mx = l((Che, $x) => {
	var Nx = kl(),
		i4 = lc(),
		s4 = xc(),
		o4 = Zs(),
		a4 = qc(),
		Ix = sn(),
		Px = V(),
		u4 = Dc(),
		c4 = cr(),
		l4 = fi(),
		h4 = qe(),
		d4 = ze(),
		f4 = lr(),
		kx = $l(),
		p4 = Rx();
	function m4(r, e, t, n, i, s, o) {
		var a = kx(r, t),
			u = kx(e, t),
			c = o.get(u);
		if (c) {
			Nx(r, t, c);
			return;
		}
		var h = s ? s(a, u, t + '', r, e, o) : void 0,
			d = h === void 0;
		if (d) {
			var f = Px(u),
				m = !f && c4(u),
				g = !f && !m && f4(u);
			(h = u),
				f || m || g
					? Px(a)
						? (h = a)
						: u4(a)
							? (h = o4(a))
							: m
								? ((d = !1), (h = i4(u, !0)))
								: g
									? ((d = !1), (h = s4(u, !0)))
									: (h = [])
					: d4(u) || Ix(u)
						? ((h = a), Ix(a) ? (h = p4(a)) : (!h4(a) || l4(a)) && (h = a4(u)))
						: (d = !1);
		}
		d && (o.set(u, h), i(h, u, n, s, o), o.delete(u)), Nx(r, t, h);
	}
	$x.exports = m4;
});
var Bx = l((qhe, Lx) => {
	var g4 = gi(),
		y4 = kl(),
		b4 = al(),
		_4 = Mx(),
		w4 = qe(),
		v4 = ut(),
		E4 = $l();
	function jx(r, e, t, n, i) {
		r !== e &&
			b4(
				e,
				function (s, o) {
					if ((i || (i = new g4()), w4(s))) _4(r, e, o, t, jx, n, i);
					else {
						var a = n ? n(E4(r, o), s, o + '', r, e, i) : void 0;
						a === void 0 && (a = s), y4(r, o, a);
					}
				},
				v4
			);
	}
	Lx.exports = jx;
});
var Ux = l((The, Dx) => {
	var x4 = Bx(),
		C4 = Oi(),
		q4 = C4(function (r, e, t) {
			x4(r, e, t);
		});
	Dx.exports = q4;
});
var Ml = l((Ahe, Fx) => {
	function T4(r, e, t) {
		var n = -1,
			i = r.length;
		e < 0 && (e = -e > i ? 0 : i + e),
			(t = t > i ? i : t),
			t < 0 && (t += i),
			(i = e > t ? 0 : (t - e) >>> 0),
			(e >>>= 0);
		for (var s = Array(i); ++n < i; ) s[n] = r[n + e];
		return s;
	}
	Fx.exports = T4;
});
var Hx = l((She, Qx) => {
	var A4 = Ml(),
		S4 = pr(),
		O4 = qo(),
		R4 = Math.ceil,
		N4 = Math.max;
	function I4(r, e, t) {
		(t ? S4(r, e, t) : e === void 0) ? (e = 1) : (e = N4(O4(e), 0));
		var n = r == null ? 0 : r.length;
		if (!n || e < 1) return [];
		for (var i = 0, s = 0, o = Array(R4(n / e)); i < n; )
			o[s++] = A4(r, i, (i += e));
		return o;
	}
	Qx.exports = I4;
});
var Vx = l((Ohe, Wx) => {
	Wx.exports = (r) => new Promise((e) => setTimeout(e, r));
});
var Jx = l((Rhe, Gx) => {
	var P4 = Hx(),
		k4 = Ri(),
		$4 = Vx(),
		{isNumber: M4} = U();
	function j4(r, e, t, n = 1e3) {
		let i,
			s = null;
		if (!M4(n) || n < 1) throw new TypeError(`Invalid chunkSize: ${n}`);
		if (!Array.isArray(t))
			throw new TypeError(`Invalid batch: Expected array, got ${typeof t}`);
		let o = P4(t, n),
			a = (u) => (s ? u(s) : r.transaction(u));
		return Object.assign(
			Promise.resolve().then(
				async () => (
					await $4(1),
					a(async (u) => {
						let c = [];
						for (let h of o) c.push(await u(e).insert(h, i));
						return k4(c);
					})
				)
			),
			{
				returning(u) {
					return (i = u), this;
				},
				transacting(u) {
					return (s = u), this;
				},
			}
		);
	}
	Gx.exports = j4;
});
var Ao = l((Nhe, Kx) => {
	function L4(r, e, t = 'password') {
		e || (e = r), Object.defineProperty(r, t, {enumerable: !1, value: e[t]});
	}
	Kx.exports = {setHiddenProperty: L4};
});
var jl = l((Ihe, eC) => {
	var {EventEmitter: B4} = _('events'),
		{Migrator: D4} = ex(),
		U4 = xx(),
		F4 = qx(),
		zx = Pl(),
		Q4 = Ux(),
		H4 = Jx(),
		{isObject: W4} = U(),
		{setHiddenProperty: V4} = Ao(),
		Zx = {
			client: {
				get() {
					return this.context.client;
				},
				set(r) {
					this.context.client = r;
				},
				configurable: !0,
			},
			userParams: {
				get() {
					return this.context.userParams;
				},
				set(r) {
					this.context.userParams = r;
				},
				configurable: !0,
			},
			schema: {
				get() {
					return this.client.schemaBuilder();
				},
				configurable: !0,
			},
			migrate: {
				get() {
					return new D4(this);
				},
				configurable: !0,
			},
			seed: {
				get() {
					return new U4(this);
				},
				configurable: !0,
			},
			fn: {
				get() {
					return new F4(this.client);
				},
				configurable: !0,
			},
		},
		G4 = [
			'raw',
			'batchInsert',
			'transaction',
			'transactionProvider',
			'initialize',
			'destroy',
			'ref',
			'withUserParams',
			'queryBuilder',
			'disableProcessing',
			'enableProcessing',
		];
	for (let r of G4)
		Zx[r] = {
			value: function (...e) {
				return this.context[r](...e);
			},
			configurable: !0,
		};
	function J4(r) {
		function e(t, n) {
			return Xx(e.context, t, n);
		}
		return Yx(e, r), e;
	}
	function K4(r) {
		let e = r.context || {};
		Object.assign(e, {
			queryBuilder() {
				return this.client.queryBuilder();
			},
			raw() {
				return this.client.raw.apply(this.client, arguments);
			},
			batchInsert(t, n, i = 1e3) {
				return H4(this, t, n, i);
			},
			transaction(t, n) {
				!n && W4(t) && ((n = t), (t = null));
				let i = Object.assign({}, n);
				return (
					(i.userParams = this.userParams || {}),
					i.doNotRejectOnRollback === void 0 && (i.doNotRejectOnRollback = !0),
					this._transaction(t, i)
				);
			},
			_transaction(t, n, i = null) {
				return t
					? this.client.transaction(t, n, i)
					: new Promise((s, o) => {
							this.client.transaction(s, n, i).catch(o);
						});
			},
			transactionProvider(t) {
				let n;
				return () => (n || (n = this.transaction(void 0, t)), n);
			},
			initialize(t) {
				return this.client.initializePool(t);
			},
			destroy(t) {
				return this.client.destroy(t);
			},
			ref(t) {
				return this.client.ref(t);
			},
			disableProcessing() {
				this.userParams.isProcessingDisabled ||
					((this.userParams.wrapIdentifier = this.client.config.wrapIdentifier),
					(this.userParams.postProcessResponse =
						this.client.config.postProcessResponse),
					(this.client.config.wrapIdentifier = null),
					(this.client.config.postProcessResponse = null),
					(this.userParams.isProcessingDisabled = !0));
			},
			enableProcessing() {
				this.userParams.isProcessingDisabled &&
					((this.client.config.wrapIdentifier = this.userParams.wrapIdentifier),
					(this.client.config.postProcessResponse =
						this.userParams.postProcessResponse),
					(this.userParams.isProcessingDisabled = !1));
			},
			withUserParams(t) {
				let n = z4(r);
				return (
					this.client &&
						((n.client = Object.create(this.client.constructor.prototype)),
						Q4(n.client, this.client),
						(n.client.config = Object.assign({}, this.client.config)),
						this.client.config.password &&
							V4(n.client.config, this.client.config)),
					Yx(n, n.client),
					So('query', r, n),
					So('query-error', r, n),
					So('query-response', r, n),
					So('start', r, n),
					(n.userParams = t),
					n
				);
			},
		}),
			r.context || (r.context = e);
	}
	function So(r, e, t) {
		e.listeners(r).forEach((i) => {
			t.on(r, i);
		});
	}
	function Yx(r, e) {
		for (let n = 0; n < zx.length; n++) {
			let i = zx[n];
			r[i] = function () {
				let s = this.queryBuilder();
				return s[i].apply(s, arguments);
			};
		}
		Object.defineProperties(r, Zx), K4(r), (r.client = e), (r.userParams = {});
		let t = new B4();
		for (let n in t) r[n] = t[n];
		r._internalListeners &&
			r._internalListeners.forEach(({eventName: n, listener: i}) => {
				r.client.removeListener(n, i);
			}),
			(r._internalListeners = []),
			Oo(r, 'start', (n) => {
				r.emit('start', n);
			}),
			Oo(r, 'query', (n) => {
				r.emit('query', n);
			}),
			Oo(r, 'query-error', (n, i) => {
				r.emit('query-error', n, i);
			}),
			Oo(r, 'query-response', (n, i, s) => {
				r.emit('query-response', n, i, s);
			});
	}
	function Oo(r, e, t) {
		r.client.on(e, t), r._internalListeners.push({eventName: e, listener: t});
	}
	function Xx(r, e, t) {
		let n = r.queryBuilder();
		return (
			e ||
				r.client.logger.warn(
					'calling knex without a tableName is deprecated. Use knex.queryBuilder() instead.'
				),
			e ? n.table(e, t) : n
		);
	}
	function z4(r) {
		let e = Object.create(
				Object.getPrototypeOf(r),
				Object.getOwnPropertyDescriptors(r)
			),
			t = {},
			i = ((s, o) => Xx(t, s, o)).bind(e);
		return Object.assign(i, r), (i.context = t), i;
	}
	eC.exports = J4;
});
var Ll = l((Phe, tC) => {
	tC.exports = function () {};
});
var Bl = l((khe, rC) => {
	var Z4 = Ll(),
		Y4 = (r) =>
			Object.assign(r, {
				finally(e) {
					return this.then().finally(e);
				},
			});
	rC.exports = Promise.prototype.finally ? Y4 : Z4;
});
var lt = l(($he, aC) => {
	var {EventEmitter: X4} = _('events'),
		e9 = Pe(),
		t9 = Rc(),
		{callbackify: r9} = _('util'),
		n9 = jl(),
		{timeout: nC, KnexTimeoutError: iC} = yr(),
		i9 = Bl(),
		$i = e9('knex:tx');
	function s9() {
		return {userParams: {}, doNotRejectOnRollback: !0};
	}
	var sC = [
			'read uncommitted',
			'read committed',
			'snapshot',
			'repeatable read',
			'serializable',
		],
		Ro = class extends X4 {
			constructor(e, t, n = s9(), i = null) {
				super(),
					(this.userParams = n.userParams),
					(this.doNotRejectOnRollback = n.doNotRejectOnRollback);
				let s = (this.txid = t9('trx'));
				(this.client = e),
					(this.logger = e.logger),
					(this.outerTx = i),
					(this.trxClient = void 0),
					(this._completed = !1),
					(this._debug = e.config && e.config.debug),
					(this.readOnly = n.readOnly),
					n.isolationLevel && this.setIsolationLevel(n.isolationLevel),
					$i('%s: Starting %s transaction', s, i ? 'nested' : 'top level'),
					(this._lastChild = Promise.resolve());
				let a = (i ? i._lastChild : Promise.resolve()).then(() =>
					this._evaluateContainer(n, t)
				);
				(this._promise = a.then((u) => u)),
					i && (i._lastChild = a.catch(() => {}));
			}
			isCompleted() {
				return (
					this._completed || (this.outerTx && this.outerTx.isCompleted()) || !1
				);
			}
			begin(e) {
				let t = [
					this.isolationLevel ? `ISOLATION LEVEL ${this.isolationLevel}` : '',
					this.readOnly ? 'READ ONLY' : '',
				]
					.join(' ')
					.trim();
				return t.length === 0
					? this.query(e, 'BEGIN;')
					: this.query(e, `SET TRANSACTION ${t};`).then(() =>
							this.query(e, 'BEGIN;')
						);
			}
			savepoint(e) {
				return this.query(e, `SAVEPOINT ${this.txid};`);
			}
			commit(e, t) {
				return this.query(e, 'COMMIT;', 1, t);
			}
			release(e, t) {
				return this.query(e, `RELEASE SAVEPOINT ${this.txid};`, 1, t);
			}
			setIsolationLevel(e) {
				if (!sC.includes(e))
					throw new Error(
						`Invalid isolationLevel, supported isolation levels are: ${JSON.stringify(sC)}`
					);
				return (this.isolationLevel = e), this;
			}
			rollback(e, t) {
				return nC(this.query(e, 'ROLLBACK', 2, t), 5e3).catch((n) => {
					if (!(n instanceof iC)) return Promise.reject(n);
					this._rejecter(t);
				});
			}
			rollbackTo(e, t) {
				return nC(
					this.query(e, `ROLLBACK TO SAVEPOINT ${this.txid}`, 2, t),
					5e3
				).catch((n) => {
					if (!(n instanceof iC)) return Promise.reject(n);
					this._rejecter(t);
				});
			}
			query(e, t, n, i) {
				let s = this.trxClient
					.query(e, t)
					.catch((o) => {
						(n = 2),
							(i = o),
							(this._completed = !0),
							$i('%s error running transaction query', this.txid);
					})
					.then((o) => {
						if ((n === 1 && this._resolver(i), n === 2)) {
							if (i === void 0) {
								if (this.doNotRejectOnRollback && /^ROLLBACK\b/i.test(t)) {
									this._resolver();
									return;
								}
								i = new Error(`Transaction rejected with non-error: ${i}`);
							}
							this._rejecter(i);
						}
						return o;
					});
				return (n === 1 || n === 2) && (this._completed = !0), s;
			}
			debug(e) {
				return (this._debug = arguments.length ? e : !0), this;
			}
			async _evaluateContainer(e, t) {
				return this.acquireConnection(e, (n) => {
					let i = (this.trxClient = a9(this, this.client, n)),
						s = this.client.transacting ? this.savepoint(n) : this.begin(n),
						o = new Promise((a, u) => {
							(this._resolver = a), (this._rejecter = u);
						});
					return (
						s
							.then(() => o9(this, n, i))
							.then((a) => {
								(this.transactor = a),
									this.outerTx &&
										(a.parentTransaction = this.outerTx.transactor),
									(a.executionPromise = o);
								let u;
								try {
									u = t(a);
								} catch (c) {
									u = Promise.reject(c);
								}
								return (
									u &&
										u.then &&
										typeof u.then == 'function' &&
										u.then((c) => a.commit(c)).catch((c) => a.rollback(c)),
									null
								);
							})
							.catch((a) => this._rejecter(a)),
						o
					);
				});
			}
			async acquireConnection(e, t) {
				let n = e && e.connection,
					i = n || (await this.client.acquireConnection());
				try {
					return (i.__knexTxId = this.txid), await t(i);
				} finally {
					n
						? $i('%s: not releasing external connection', this.txid)
						: ($i('%s: releasing connection', this.txid),
							this.client.releaseConnection(i));
				}
			}
			then(e, t) {
				return this._promise.then(e, t);
			}
			catch(...e) {
				return this._promise.catch(...e);
			}
			asCallback(e) {
				return r9(() => this._promise)(e), this._promise;
			}
		};
	i9(Ro.prototype);
	function o9(r, e, t) {
		let n = n9(t);
		return (
			(n.context.withUserParams = () => {
				throw new Error(
					'Cannot set user params on a transaction - it can only inherit params from main knex instance'
				);
			}),
			(n.isTransaction = !0),
			(n.userParams = r.userParams || {}),
			(n.context.transaction = function (i, s) {
				return (
					s
						? s.doNotRejectOnRollback === void 0 &&
							(s.doNotRejectOnRollback = !0)
						: (s = {doNotRejectOnRollback: !0}),
					this._transaction(i, s, r)
				);
			}),
			(n.savepoint = function (i, s) {
				return n.transaction(i, s);
			}),
			r.client.transacting
				? ((n.commit = (i) => r.release(e, i)),
					(n.rollback = (i) => r.rollbackTo(e, i)))
				: ((n.commit = (i) => r.commit(e, i)),
					(n.rollback = (i) => r.rollback(e, i))),
			(n.isCompleted = () => r.isCompleted()),
			n
		);
	}
	function a9(r, e, t) {
		let n = Object.create(e.constructor.prototype);
		(n.version = e.version),
			(n.config = e.config),
			(n.driver = e.driver),
			(n.connectionSettings = e.connectionSettings),
			(n.transacting = !0),
			(n.valueForUndefined = e.valueForUndefined),
			(n.logger = e.logger),
			n.on('start', function (o) {
				r.emit('start', o), e.emit('start', o);
			}),
			n.on('query', function (o) {
				r.emit('query', o), e.emit('query', o);
			}),
			n.on('query-error', function (o, a) {
				r.emit('query-error', o, a), e.emit('query-error', o, a);
			}),
			n.on('query-response', function (o, a, u) {
				r.emit('query-response', o, a, u), e.emit('query-response', o, a, u);
			});
		let i = n.query;
		n.query = function (o, a) {
			let u = r.isCompleted();
			return new Promise(function (c, h) {
				try {
					if (o !== t)
						throw new Error('Invalid connection for transaction query.');
					u && oC(r, a), c(i.call(n, o, a));
				} catch (d) {
					h(d);
				}
			});
		};
		let s = n.stream;
		return (
			(n.stream = function (o, a, u, c) {
				let h = r.isCompleted();
				return new Promise(function (d, f) {
					try {
						if (o !== t)
							throw new Error('Invalid connection for transaction query.');
						h && oC(r, a), d(s.call(n, o, a, u, c));
					} catch (m) {
						f(m);
					}
				});
			}),
			(n.acquireConnection = function () {
				return Promise.resolve(t);
			}),
			(n.releaseConnection = function () {
				return Promise.resolve();
			}),
			n
		);
	}
	function oC(r, e) {
		let t = typeof e == 'string' ? e : e && e.sql;
		throw (
			($i('%s: Transaction completed: %s', r.txid, t),
			new Error(
				'Transaction query already complete, run with DEBUG=knex:tx for more info'
			))
		);
	}
	aC.exports = Ro;
});
var Dl = l((Mhe, cC) => {
	var u9 = Pe()('knex:query'),
		c9 = Pe()('knex:bindings'),
		l9 = (r, e) => u9(r.replace(/%/g, '%%'), e),
		{isString: h9} = U();
	function uC(r, e, t, n) {
		e = e == null ? [] : [].concat(e);
		let i = 0;
		return r.replace(/\\?\?/g, (s) => {
			if (s === '\\?') return '?';
			if (i === e.length) return s;
			let o = e[i++];
			return n._escapeBinding(o, {timeZone: t});
		});
	}
	function d9(r, e, t) {
		let n = h9(e) ? {sql: e} : e;
		(n.bindings = t.prepBindings(n.bindings)),
			(n.sql = t.positionBindings(n.sql));
		let {__knexUid: i, __knexTxId: s} = r;
		return (
			t.emit('query', Object.assign({__knexUid: i, __knexTxId: s}, n)),
			l9(n.sql, s),
			c9(n.bindings, s),
			n
		);
	}
	function f9(r, e, t) {
		return t._query(r, e).catch((n) => {
			throw (
				(t.config && t.config.compileSqlOnError === !1
					? (n.message = e.sql + ' - ' + n.message)
					: (n.message = uC(e.sql, e.bindings, void 0, t) + ' - ' + n.message),
				t.emit(
					'query-error',
					n,
					Object.assign({__knexUid: r.__knexUid, __knexTxId: r.__knexUid}, e)
				),
				n)
			);
		});
	}
	cC.exports = {enrichQueryObject: d9, executeQuery: f9, formatQuery: uC};
});
var At = l((jhe, lC) => {
	var p9 = bi(),
		m9 = ot(),
		g9 = Oi(),
		y9 = Be(),
		b9 = cn(),
		_9 = at(),
		w9 = Object.prototype,
		v9 = w9.hasOwnProperty,
		E9 = g9(function (r, e) {
			if (b9(e) || y9(e)) {
				m9(e, _9(e), r);
				return;
			}
			for (var t in e) v9.call(e, t) && p9(r, t, e[t]);
		});
	lC.exports = E9;
});
var No = l((Lhe, hC) => {
	var x9 = Tc(),
		C9 = 4;
	function q9(r) {
		return x9(r, C9);
	}
	hC.exports = q9;
});
var fC = l((Bhe, dC) => {
	var T9 = ge();
	function A9(r) {
		return typeof r == 'function' ? r : T9;
	}
	dC.exports = A9;
});
var mC = l((Dhe, pC) => {
	var S9 = Js(),
		O9 = wr(),
		R9 = fC(),
		N9 = V();
	function I9(r, e) {
		var t = N9(r) ? S9 : O9;
		return t(r, R9(e));
	}
	pC.exports = I9;
});
var bn = l((Uhe, gC) => {
	gC.exports = mC();
});
var Ul = l((Fhe, yC) => {
	var P9 = wr();
	function k9(r, e) {
		var t = [];
		return (
			P9(r, function (n, i, s) {
				e(n, i, s) && t.push(n);
			}),
			t
		);
	}
	yC.exports = k9;
});
var Fl = l((Qhe, bC) => {
	var $9 = 'Expected a function';
	function M9(r) {
		if (typeof r != 'function') throw new TypeError($9);
		return function () {
			var e = arguments;
			switch (e.length) {
				case 0:
					return !r.call(this);
				case 1:
					return !r.call(this, e[0]);
				case 2:
					return !r.call(this, e[0], e[1]);
				case 3:
					return !r.call(this, e[0], e[1], e[2]);
			}
			return !r.apply(this, e);
		};
	}
	bC.exports = M9;
});
var wC = l((Hhe, _C) => {
	var j9 = Ys(),
		L9 = Ul(),
		B9 = De(),
		D9 = V(),
		U9 = Fl();
	function F9(r, e) {
		var t = D9(r) ? j9 : L9;
		return t(r, U9(B9(e, 3)));
	}
	_C.exports = F9;
});
var Mi = l((Whe, vC) => {
	var Q9 = Ml();
	function H9(r) {
		var e = r == null ? 0 : r.length;
		return e ? Q9(r, 1, e) : [];
	}
	vC.exports = H9;
});
var xC = l((Vhe, EC) => {
	function W9(r) {
		for (var e, t = []; !(e = r.next()).done; ) t.push(e.value);
		return t;
	}
	EC.exports = W9;
});
var qC = l((Ghe, CC) => {
	function V9(r) {
		return r.split('');
	}
	CC.exports = V9;
});
var AC = l((Jhe, TC) => {
	var G9 = '\\ud800-\\udfff',
		J9 = '\\u0300-\\u036f',
		K9 = '\\ufe20-\\ufe2f',
		z9 = '\\u20d0-\\u20ff',
		Z9 = J9 + K9 + z9,
		Y9 = '\\ufe0e\\ufe0f',
		X9 = '\\u200d',
		eG = RegExp('[' + X9 + G9 + Z9 + Y9 + ']');
	function tG(r) {
		return eG.test(r);
	}
	TC.exports = tG;
});
var $C = l((Khe, kC) => {
	var SC = '\\ud800-\\udfff',
		rG = '\\u0300-\\u036f',
		nG = '\\ufe20-\\ufe2f',
		iG = '\\u20d0-\\u20ff',
		sG = rG + nG + iG,
		oG = '\\ufe0e\\ufe0f',
		aG = '[' + SC + ']',
		Ql = '[' + sG + ']',
		Hl = '\\ud83c[\\udffb-\\udfff]',
		uG = '(?:' + Ql + '|' + Hl + ')',
		OC = '[^' + SC + ']',
		RC = '(?:\\ud83c[\\udde6-\\uddff]){2}',
		NC = '[\\ud800-\\udbff][\\udc00-\\udfff]',
		cG = '\\u200d',
		IC = uG + '?',
		PC = '[' + oG + ']?',
		lG = '(?:' + cG + '(?:' + [OC, RC, NC].join('|') + ')' + PC + IC + ')*',
		hG = PC + IC + lG,
		dG = '(?:' + [OC + Ql + '?', Ql, RC, NC, aG].join('|') + ')',
		fG = RegExp(Hl + '(?=' + Hl + ')|' + dG + hG, 'g');
	function pG(r) {
		return r.match(fG) || [];
	}
	kC.exports = pG;
});
var jC = l((zhe, MC) => {
	var mG = qC(),
		gG = AC(),
		yG = $C();
	function bG(r) {
		return gG(r) ? yG(r) : mG(r);
	}
	MC.exports = bG;
});
var _n = l((Zhe, BC) => {
	var LC = Et(),
		_G = Zs(),
		wG = dr(),
		vG = Be(),
		EG = Sl(),
		xG = xC(),
		CG = el(),
		qG = Ni(),
		TG = jC(),
		AG = To(),
		SG = '[object Map]',
		OG = '[object Set]',
		Wl = LC ? LC.iterator : void 0;
	function RG(r) {
		if (!r) return [];
		if (vG(r)) return EG(r) ? TG(r) : _G(r);
		if (Wl && r[Wl]) return xG(r[Wl]());
		var e = wG(r),
			t = e == SG ? CG : e == OG ? qG : AG;
		return t(r);
	}
	BC.exports = RG;
});
var Io = l((Yhe, UC) => {
	var DC = Object.freeze({
			pg: 'postgres',
			postgresql: 'postgres',
			sqlite: 'sqlite3',
		}),
		NG = Object.freeze(
			[
				'mssql',
				'mysql',
				'mysql2',
				'oracledb',
				'postgres',
				'pgnative',
				'redshift',
				'sqlite3',
				'cockroachdb',
				'better-sqlite3',
			].concat(Object.keys(DC))
		),
		IG = Object.freeze({
			MsSQL: 'mssql',
			MySQL: 'mysql',
			MySQL2: 'mysql2',
			Oracle: 'oracledb',
			PostgreSQL: 'pg',
			PgNative: 'pgnative',
			Redshift: 'pg-redshift',
			SQLite: 'sqlite3',
			CockroachDB: 'cockroachdb',
			BetterSQLite3: 'better-sqlite3',
		}),
		PG = Object.freeze([
			'maxWaitingClients',
			'testOnBorrow',
			'fifo',
			'priorityRange',
			'autostart',
			'evictionRunIntervalMillis',
			'numTestsPerRun',
			'softIdleTimeoutMillis',
			'Promise',
		]),
		kG = /,[\s](?![^(]*\))/g;
	UC.exports = {
		CLIENT_ALIASES: DC,
		SUPPORTED_CLIENTS: NG,
		POOL_CONFIG_OPTIONS: PG,
		COMMA_NO_PAREN_REGEX: kG,
		DRIVER_NAMES: IG,
	};
});
var re = l((Xhe, QC) => {
	var FC = ze(),
		$G = lr(),
		{CLIENT_ALIASES: MG} = Io(),
		{isFunction: jG} = U();
	function LG(...r) {
		return Array.isArray(r[0]) ? r[0] : r;
	}
	function ji(r) {
		let e = !1;
		if ($G(r)) return !1;
		if (r && jG(r.toSQL)) return e;
		if (Array.isArray(r)) for (let t = 0; t < r.length && !e; t++) e = ji(r[t]);
		else
			FC(r)
				? Object.keys(r).forEach((t) => {
						e || (e = ji(r[t]));
					})
				: (e = r === void 0);
		return e;
	}
	function BG(r) {
		let e = [];
		return (
			Array.isArray(r)
				? r.forEach((t, n) => {
						ji(t) && e.push(n);
					})
				: FC(r)
					? Object.keys(r).forEach((t) => {
							ji(r[t]) && e.push(t);
						})
					: e.push(0),
			e
		);
	}
	function DG(r) {
		r.prototype.queryContext = function (e) {
			return e === void 0
				? this._queryContext
				: ((this._queryContext = e), this);
		};
	}
	function UG(r) {
		return MG[r] || r;
	}
	function FG(r, e) {
		if (r == null) return e;
		let t = parseInt(r, 10);
		return isNaN(t) ? e : t;
	}
	QC.exports = {
		addQueryContext: DG,
		containsUndefined: ji,
		getUndefinedIndices: BG,
		normalizeArr: LG,
		resolveClientNameWithAliases: UG,
		toNumber: FG,
	};
});
var Vl = l((ede, VC) => {
	var HC = _('assert');
	function WC(r, e, t, n, i) {
		if (typeof t == 'function') return {type: 'onWrapped', value: t, bool: e};
		switch (arguments.length) {
			case 3:
				return {type: 'onRaw', value: t, bool: e};
			case 4:
				return {type: r, column: t, operator: '=', value: n, bool: e};
			default:
				return {type: r, column: t, operator: n, value: i, bool: e};
		}
	}
	var H = class {
		constructor(e, t, n) {
			(this.schema = n),
				(this.table = e),
				(this.joinType = t),
				(this.and = this),
				(this.clauses = []);
		}
		get or() {
			return this._bool('or');
		}
		on(e) {
			if (typeof e == 'object' && typeof e.toSQL != 'function') {
				let n = Object.keys(e),
					i = -1,
					s = this._bool() === 'or' ? 'orOn' : 'on';
				for (; ++i < n.length; ) this[s](n[i], e[n[i]]);
				return this;
			}
			let t = WC('onBasic', this._bool(), ...arguments);
			return t && this.clauses.push(t), this;
		}
		orOn(e, t, n) {
			return this._bool('or').on.apply(this, arguments);
		}
		onJsonPathEquals(e, t, n, i) {
			return (
				this.clauses.push({
					type: 'onJsonPathEquals',
					columnFirst: e,
					jsonPathFirst: t,
					columnSecond: n,
					jsonPathSecond: i,
					bool: this._bool(),
					not: this._not(),
				}),
				this
			);
		}
		orOnJsonPathEquals(e, t, n, i) {
			return this._bool('or').onJsonPathEquals.apply(this, arguments);
		}
		using(e) {
			return this.clauses.push({
				type: 'onUsing',
				column: e,
				bool: this._bool(),
			});
		}
		onVal(e) {
			if (typeof e == 'object' && typeof e.toSQL != 'function') {
				let n = Object.keys(e),
					i = -1,
					s = this._bool() === 'or' ? 'orOnVal' : 'onVal';
				for (; ++i < n.length; ) this[s](n[i], e[n[i]]);
				return this;
			}
			let t = WC('onVal', this._bool(), ...arguments);
			return t && this.clauses.push(t), this;
		}
		andOnVal() {
			return this.onVal(...arguments);
		}
		orOnVal() {
			return this._bool('or').onVal(...arguments);
		}
		onBetween(e, t) {
			return (
				HC(
					Array.isArray(t),
					'The second argument to onBetween must be an array.'
				),
				HC(
					t.length === 2,
					'You must specify 2 values for the onBetween clause'
				),
				this.clauses.push({
					type: 'onBetween',
					column: e,
					value: t,
					bool: this._bool(),
					not: this._not(),
				}),
				this
			);
		}
		onNotBetween(e, t) {
			return this._not(!0).onBetween(e, t);
		}
		orOnBetween(e, t) {
			return this._bool('or').onBetween(e, t);
		}
		orOnNotBetween(e, t) {
			return this._bool('or')._not(!0).onBetween(e, t);
		}
		onIn(e, t) {
			return Array.isArray(t) && t.length === 0
				? this.on(1, '=', 0)
				: (this.clauses.push({
						type: 'onIn',
						column: e,
						value: t,
						not: this._not(),
						bool: this._bool(),
					}),
					this);
		}
		onNotIn(e, t) {
			return this._not(!0).onIn(e, t);
		}
		orOnIn(e, t) {
			return this._bool('or').onIn(e, t);
		}
		orOnNotIn(e, t) {
			return this._bool('or')._not(!0).onIn(e, t);
		}
		onNull(e) {
			return (
				this.clauses.push({
					type: 'onNull',
					column: e,
					not: this._not(),
					bool: this._bool(),
				}),
				this
			);
		}
		orOnNull(e) {
			return this._bool('or').onNull(e);
		}
		onNotNull(e) {
			return this._not(!0).onNull(e);
		}
		orOnNotNull(e) {
			return this._not(!0)._bool('or').onNull(e);
		}
		onExists(e) {
			return (
				this.clauses.push({
					type: 'onExists',
					value: e,
					not: this._not(),
					bool: this._bool(),
				}),
				this
			);
		}
		orOnExists(e) {
			return this._bool('or').onExists(e);
		}
		onNotExists(e) {
			return this._not(!0).onExists(e);
		}
		orOnNotExists(e) {
			return this._not(!0)._bool('or').onExists(e);
		}
		type(e) {
			return (this.joinType = e), this;
		}
		_bool(e) {
			if (arguments.length === 1) return (this._boolFlag = e), this;
			let t = this._boolFlag || 'and';
			return (this._boolFlag = 'and'), t;
		}
		_not(e) {
			if (arguments.length === 1) return (this._notFlag = e), this;
			let t = this._notFlag;
			return (this._notFlag = !1), t;
		}
	};
	Object.assign(H.prototype, {grouping: 'join'});
	H.prototype.andOn = H.prototype.on;
	H.prototype.andOnIn = H.prototype.onIn;
	H.prototype.andOnNotIn = H.prototype.onNotIn;
	H.prototype.andOnNull = H.prototype.onNull;
	H.prototype.andOnNotNull = H.prototype.onNotNull;
	H.prototype.andOnExists = H.prototype.onExists;
	H.prototype.andOnNotExists = H.prototype.onNotExists;
	H.prototype.andOnBetween = H.prototype.onBetween;
	H.prototype.andOnNotBetween = H.prototype.onNotBetween;
	H.prototype.andOnJsonPathEquals = H.prototype.onJsonPathEquals;
	VC.exports = H;
});
var KC = l((tde, JC) => {
	var GC = _('assert'),
		Gl = class {
			constructor(e, t, n, i, s) {
				(this.schema = t),
					(this.type = 'analytic'),
					(this.method = e),
					(this.order = i || []),
					(this.partitions = s || []),
					(this.alias = n),
					(this.and = this),
					(this.grouping = 'columns');
			}
			partitionBy(e, t) {
				return (
					GC(
						Array.isArray(e) || typeof e == 'string',
						`The argument to an analytic partitionBy function must be either a string
            or an array of string.`
					),
					Array.isArray(e)
						? (this.partitions = this.partitions.concat(e))
						: this.partitions.push({column: e, order: t}),
					this
				);
			}
			orderBy(e, t) {
				return (
					GC(
						Array.isArray(e) || typeof e == 'string',
						`The argument to an analytic orderBy function must be either a string
            or an array of string.`
					),
					Array.isArray(e)
						? (this.order = this.order.concat(e))
						: this.order.push({column: e, order: t}),
					this
				);
			}
		};
	JC.exports = Gl;
});
var Po = l((rde, zC) => {
	zC.exports = function (e, t) {
		e.client.config.asyncStackTraces &&
			(e._asyncStack = {error: new Error(), lines: t});
	};
});
var YC = l((nde, ZC) => {
	ZC.exports = {
		lockMode: {
			forShare: 'forShare',
			forUpdate: 'forUpdate',
			forNoKeyUpdate: 'forNoKeyUpdate',
			forKeyShare: 'forKeyShare',
		},
		waitMode: {skipLocked: 'skipLocked', noWait: 'noWait'},
	};
});
var ko = l((ide, XC) => {
	var QG = No(),
		HG = we(),
		{callbackify: WG} = _('util'),
		VG = Bl(),
		{formatQuery: GG} = Dl();
	function JG(r) {
		(r.prototype.toQuery = function (e) {
			let t = this.toSQL(this._method, e);
			return (
				Array.isArray(t) || (t = [t]),
				t.length
					? t
							.map((n) => GG(n.sql, n.bindings, e, this.client))
							.reduce((n, i) =>
								n.concat(
									n.endsWith(';')
										? `
`
										: `;
`,
									i
								)
							)
					: ''
			);
		}),
			(r.prototype.then = function () {
				let e = this.client.runner(this).run();
				return (
					this.client.config.asyncStackTraces &&
						(e = e.catch((t) => {
							t.originalStack = t.stack;
							let n = t.stack.split(`
`)[0],
								{error: i, lines: s} = this._asyncStack,
								a = i.stack
									.split(
										`
`
									)
									.slice(s);
							throw (
								(a.unshift(n),
								(t.stack = a.join(`
`)),
								t)
							);
						})),
					e.then.apply(e, arguments)
				);
			}),
			(r.prototype.options = function (e) {
				return (
					(this._options = this._options || []),
					this._options.push(QG(e) || {}),
					this
				);
			}),
			(r.prototype.connection = function (e) {
				return (
					(this._connection = e), this.client.processPassedConnection(e), this
				);
			}),
			(r.prototype.debug = function (e) {
				return (this._debug = arguments.length ? e : !0), this;
			}),
			(r.prototype.transacting = function (e) {
				if (
					(e &&
						e.client &&
						(e.client.transacting
							? (this.client = e.client)
							: e.client.logger.warn(`Invalid transaction value: ${e.client}`)),
					HG(e))
				)
					throw (
						(this.client.logger.error(
							'Invalid value on transacting call, potential bug'
						),
						Error(
							'Invalid transacting value (null, undefined or empty object)'
						))
					);
				return this;
			}),
			(r.prototype.stream = function (e) {
				return this.client.runner(this).stream(e);
			}),
			(r.prototype.pipe = function (e, t) {
				return this.client.runner(this).pipe(e, t);
			}),
			(r.prototype.asCallback = function (e) {
				let t = this.then();
				return WG(() => t)(e), t;
			}),
			(r.prototype.catch = function (e) {
				return this.then().catch(e);
			}),
			Object.defineProperty(r.prototype, Symbol.toStringTag, {
				get: () => 'object',
			}),
			VG(r.prototype);
	}
	XC.exports = {augmentWithBuilderInterface: JG};
});
var Ze = l((sde, rq) => {
	var wn = _('assert'),
		{EventEmitter: KG} = _('events'),
		zG = At(),
		Li = No(),
		ZG = bn(),
		vn = we(),
		eq = ze(),
		YG = Uc(),
		XG = wC(),
		eJ = Mi(),
		tJ = _n(),
		{addQueryContext: rJ, normalizeArr: Bi} = re(),
		Jl = Vl(),
		nJ = KC(),
		iJ = Po(),
		{
			isBoolean: Kl,
			isNumber: tq,
			isObject: ht,
			isString: $o,
			isFunction: sJ,
		} = U(),
		{lockMode: St, waitMode: Mo} = YC(),
		{augmentWithBuilderInterface: oJ} = ko(),
		aJ = new Set(['pluck', 'first', 'select']),
		uJ = new Set([
			'with',
			'select',
			'columns',
			'hintComments',
			'where',
			'union',
			'join',
			'group',
			'order',
			'having',
			'limit',
			'offset',
			'counter',
			'counters',
		]),
		cJ = new Set([
			St.forShare,
			St.forUpdate,
			St.forNoKeyUpdate,
			St.forKeyShare,
		]),
		q = class r extends KG {
			constructor(e) {
				super(),
					(this.client = e),
					(this.and = this),
					(this._single = {}),
					(this._comments = []),
					(this._statements = []),
					(this._method = 'select'),
					e.config && (iJ(this, 5), (this._debug = e.config.debug)),
					(this._joinFlag = 'inner'),
					(this._boolFlag = 'and'),
					(this._notFlag = !1),
					(this._asColumnFlag = !1);
			}
			toString() {
				return this.toQuery();
			}
			toSQL(e, t) {
				return this.client.queryCompiler(this).toSQL(e || this._method, t);
			}
			clone() {
				let e = new this.constructor(this.client);
				return (
					(e._method = this._method),
					(e._single = Li(this._single)),
					(e._comments = Li(this._comments)),
					(e._statements = Li(this._statements)),
					(e._debug = this._debug),
					this._options !== void 0 && (e._options = Li(this._options)),
					this._queryContext !== void 0 &&
						(e._queryContext = Li(this._queryContext)),
					this._connection !== void 0 && (e._connection = this._connection),
					e
				);
			}
			timeout(e, {cancel: t} = {}) {
				return (
					tq(e) &&
						e > 0 &&
						((this._timeout = e),
						t &&
							(this.client.assertCanCancelQuery(),
							(this._cancelOnTimeout = !0))),
					this
				);
			}
			isValidStatementArg(e) {
				return (
					typeof e == 'function' || e instanceof r || (e && e.isRawInstance)
				);
			}
			_validateWithArgs(e, t, n, i) {
				let [s, o] = typeof n > 'u' ? [t, void 0] : [n, t];
				if (typeof e != 'string')
					throw new Error(`${i}() first argument must be a string`);
				if (this.isValidStatementArg(s) && typeof o > 'u') return;
				if (
					!(
						Array.isArray(o) &&
						o.length > 0 &&
						o.every((u) => typeof u == 'string')
					)
				)
					throw new Error(
						`${i}() second argument must be a statement or non-empty column name list.`
					);
				if (!this.isValidStatementArg(s))
					throw new Error(
						`${i}() third argument must be a function / QueryBuilder or a raw when its second argument is a column name list`
					);
			}
			with(e, t, n) {
				return (
					this._validateWithArgs(e, t, n, 'with'), this.withWrapped(e, t, n)
				);
			}
			withMaterialized(e, t, n) {
				throw new Error('With materialized is not supported by this dialect');
			}
			withNotMaterialized(e, t, n) {
				throw new Error('With materialized is not supported by this dialect');
			}
			withWrapped(e, t, n, i) {
				let [s, o] = typeof n > 'u' ? [t, void 0] : [n, t],
					a = {
						grouping: 'with',
						type: 'withWrapped',
						alias: e,
						columnList: o,
						value: s,
					};
				return (
					i !== void 0 && (a.materialized = i), this._statements.push(a), this
				);
			}
			withRecursive(e, t, n) {
				return (
					this._validateWithArgs(e, t, n, 'withRecursive'),
					this.withRecursiveWrapped(e, t, n)
				);
			}
			withRecursiveWrapped(e, t, n) {
				return (
					this.withWrapped(e, t, n),
					(this._statements[this._statements.length - 1].recursive = !0),
					this
				);
			}
			columns(e) {
				return !e && e !== 0
					? this
					: (this._statements.push({
							grouping: 'columns',
							value: Bi(...arguments),
						}),
						this);
			}
			comment(e) {
				if (!$o(e)) throw new Error('Comment must be a string');
				let t = ['/*', '*/', '?'];
				if (t.some((n) => e.includes(n)))
					throw new Error(`Cannot include ${t.join(', ')} in comment`);
				return this._comments.push({comment: e}), this;
			}
			as(e) {
				return (this._single.as = e), this;
			}
			hintComment(e) {
				if (((e = Array.isArray(e) ? e : [e]), e.some((t) => !$o(t))))
					throw new Error('Hint comment must be a string');
				if (e.some((t) => t.includes('/*') || t.includes('*/')))
					throw new Error('Hint comment cannot include "/*" or "*/"');
				if (e.some((t) => t.includes('?')))
					throw new Error('Hint comment cannot include "?"');
				return (
					this._statements.push({grouping: 'hintComments', value: e}), this
				);
			}
			withSchema(e) {
				return (this._single.schema = e), this;
			}
			table(e, t = {}) {
				return (
					(this._single.table = e), (this._single.only = t.only === !0), this
				);
			}
			distinct(...e) {
				return (
					this._statements.push({
						grouping: 'columns',
						value: Bi(...e),
						distinct: !0,
					}),
					this
				);
			}
			distinctOn(...e) {
				if (vn(e)) throw new Error('distinctOn requires at least on argument');
				return (
					this._statements.push({
						grouping: 'columns',
						value: Bi(...e),
						distinctOn: !0,
					}),
					this
				);
			}
			join(e, t, ...n) {
				let i,
					s =
						e instanceof r || typeof e == 'function'
							? void 0
							: this._single.schema,
					o = this._joinType();
				return (
					typeof t == 'function'
						? ((i = new Jl(e, o, s)), t.call(i, i))
						: o === 'raw'
							? (i = new Jl(this.client.raw(e, t), 'raw'))
							: ((i = new Jl(e, o, s)), t && i.on(t, ...n)),
					this._statements.push(i),
					this
				);
			}
			using(e) {
				throw new Error(
					"'using' function is only available in PostgreSQL dialect with Delete statements."
				);
			}
			innerJoin(...e) {
				return this._joinType('inner').join(...e);
			}
			leftJoin(...e) {
				return this._joinType('left').join(...e);
			}
			leftOuterJoin(...e) {
				return this._joinType('left outer').join(...e);
			}
			rightJoin(...e) {
				return this._joinType('right').join(...e);
			}
			rightOuterJoin(...e) {
				return this._joinType('right outer').join(...e);
			}
			outerJoin(...e) {
				return this._joinType('outer').join(...e);
			}
			fullOuterJoin(...e) {
				return this._joinType('full outer').join(...e);
			}
			crossJoin(...e) {
				return this._joinType('cross').join(...e);
			}
			joinRaw(...e) {
				return this._joinType('raw').join(...e);
			}
			get or() {
				return this._bool('or');
			}
			get not() {
				return this._not(!0);
			}
			where(e, t, n) {
				let i = arguments.length;
				if (e === !1 || e === !0) return this.where(1, '=', e ? 1 : 0);
				if (typeof e == 'function') return this.whereWrapped(e);
				if (ht(e) && !e.isRawInstance) return this._objectWhere(e);
				if (e && e.isRawInstance && i === 1) return this.whereRaw(e);
				if (i === 2 && ((n = t), (t = '='), n === null))
					return this.whereNull(e);
				let s = `${t}`.toLowerCase().trim();
				if (i === 3) {
					if (s === 'in' || s === 'not in')
						return this._not(s === 'not in').whereIn(e, n);
					if (s === 'between' || s === 'not between')
						return this._not(s === 'not between').whereBetween(e, n);
				}
				return n === null && (s === 'is' || s === 'is not')
					? this._not(s === 'is not').whereNull(e)
					: (this._statements.push({
							grouping: 'where',
							type: 'whereBasic',
							column: e,
							operator: t,
							value: n,
							not: this._not(),
							bool: this._bool(),
							asColumn: this._asColumnFlag,
						}),
						this);
			}
			whereColumn(...e) {
				return (
					(this._asColumnFlag = !0),
					this.where(...e),
					(this._asColumnFlag = !1),
					this
				);
			}
			orWhere(e, ...t) {
				this._bool('or');
				let n = e;
				return ht(n) && !n.isRawInstance
					? this.whereWrapped(function () {
							for (let i in n) this.andWhere(i, n[i]);
						})
					: this.where(e, ...t);
			}
			orWhereColumn(e, ...t) {
				this._bool('or');
				let n = e;
				return ht(n) && !n.isRawInstance
					? this.whereWrapped(function () {
							for (let i in n) this.andWhereColumn(i, '=', n[i]);
						})
					: this.whereColumn(e, ...t);
			}
			whereNot(e, ...t) {
				return (
					t.length >= 2 &&
						(t[0] === 'in' || t[0] === 'between') &&
						this.client.logger.warn(
							'whereNot is not suitable for "in" and "between" type subqueries. You should use "not in" and "not between" instead.'
						),
					this._not(!0).where(e, ...t)
				);
			}
			whereNotColumn(...e) {
				return this._not(!0).whereColumn(...e);
			}
			orWhereNot(...e) {
				return this._bool('or').whereNot(...e);
			}
			orWhereNotColumn(...e) {
				return this._bool('or').whereNotColumn(...e);
			}
			_objectWhere(e) {
				let t = this._bool(),
					n = this._not() ? 'Not' : '';
				for (let i in e) this[t + 'Where' + n](i, e[i]);
				return this;
			}
			whereRaw(e, t) {
				let n = e.isRawInstance ? e : this.client.raw(e, t);
				return (
					this._statements.push({
						grouping: 'where',
						type: 'whereRaw',
						value: n,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			orWhereRaw(e, t) {
				return this._bool('or').whereRaw(e, t);
			}
			whereWrapped(e) {
				return (
					this._statements.push({
						grouping: 'where',
						type: 'whereWrapped',
						value: e,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			whereExists(e) {
				return (
					this._statements.push({
						grouping: 'where',
						type: 'whereExists',
						value: e,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			orWhereExists(e) {
				return this._bool('or').whereExists(e);
			}
			whereNotExists(e) {
				return this._not(!0).whereExists(e);
			}
			orWhereNotExists(e) {
				return this._bool('or').whereNotExists(e);
			}
			whereIn(e, t) {
				return Array.isArray(t) && vn(t)
					? this.where(this._not())
					: (this._statements.push({
							grouping: 'where',
							type: 'whereIn',
							column: e,
							value: t,
							not: this._not(),
							bool: this._bool(),
						}),
						this);
			}
			orWhereIn(e, t) {
				return this._bool('or').whereIn(e, t);
			}
			whereNotIn(e, t) {
				return this._not(!0).whereIn(e, t);
			}
			orWhereNotIn(e, t) {
				return this._bool('or')._not(!0).whereIn(e, t);
			}
			whereNull(e) {
				return (
					this._statements.push({
						grouping: 'where',
						type: 'whereNull',
						column: e,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			orWhereNull(e) {
				return this._bool('or').whereNull(e);
			}
			whereNotNull(e) {
				return this._not(!0).whereNull(e);
			}
			orWhereNotNull(e) {
				return this._bool('or').whereNotNull(e);
			}
			whereBetween(e, t) {
				return (
					wn(
						Array.isArray(t),
						'The second argument to whereBetween must be an array.'
					),
					wn(
						t.length === 2,
						'You must specify 2 values for the whereBetween clause'
					),
					this._statements.push({
						grouping: 'where',
						type: 'whereBetween',
						column: e,
						value: t,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			whereNotBetween(e, t) {
				return this._not(!0).whereBetween(e, t);
			}
			orWhereBetween(e, t) {
				return this._bool('or').whereBetween(e, t);
			}
			orWhereNotBetween(e, t) {
				return this._bool('or').whereNotBetween(e, t);
			}
			_whereLike(e, t, n) {
				return (
					this._statements.push({
						grouping: 'where',
						type: e,
						column: t,
						value: n,
						not: this._not(),
						bool: this._bool(),
						asColumn: this._asColumnFlag,
					}),
					this
				);
			}
			whereLike(e, t) {
				return this._whereLike('whereLike', e, t);
			}
			orWhereLike(e, t) {
				return this._bool('or')._whereLike('whereLike', e, t);
			}
			whereILike(e, t) {
				return this._whereLike('whereILike', e, t);
			}
			orWhereILike(e, t) {
				return this._bool('or')._whereLike('whereILike', e, t);
			}
			groupBy(e) {
				return e && e.isRawInstance
					? this.groupByRaw.apply(this, arguments)
					: (this._statements.push({
							grouping: 'group',
							type: 'groupByBasic',
							value: Bi(...arguments),
						}),
						this);
			}
			groupByRaw(e, t) {
				let n = e.isRawInstance ? e : this.client.raw(e, t);
				return (
					this._statements.push({
						grouping: 'group',
						type: 'groupByRaw',
						value: n,
					}),
					this
				);
			}
			orderBy(e, t, n = '') {
				return Array.isArray(e)
					? this._orderByArray(e)
					: (this._statements.push({
							grouping: 'order',
							type: 'orderByBasic',
							value: e,
							direction: t,
							nulls: n,
						}),
						this);
			}
			_orderByArray(e) {
				for (let t = 0; t < e.length; t++) {
					let n = e[t];
					ht(n)
						? this._statements.push({
								grouping: 'order',
								type: 'orderByBasic',
								value: n.column,
								direction: n.order,
								nulls: n.nulls,
							})
						: ($o(n) || tq(n)) &&
							this._statements.push({
								grouping: 'order',
								type: 'orderByBasic',
								value: n,
							});
				}
				return this;
			}
			orderByRaw(e, t) {
				let n = e.isRawInstance ? e : this.client.raw(e, t);
				return (
					this._statements.push({
						grouping: 'order',
						type: 'orderByRaw',
						value: n,
					}),
					this
				);
			}
			_union(e, t) {
				let n = t[0],
					i = t[1];
				if (t.length === 1 || (t.length === 2 && Kl(i))) {
					Array.isArray(n) || (n = [n]);
					for (let s = 0, o = n.length; s < o; s++)
						this._statements.push({
							grouping: 'union',
							clause: e,
							value: n[s],
							wrap: i || !1,
						});
				} else
					(n = tJ(t).slice(0, t.length - 1)),
						(i = t[t.length - 1]),
						Kl(i) || (n.push(i), (i = !1)),
						this._union(e, [n, i]);
				return this;
			}
			union(...e) {
				return this._union('union', e);
			}
			unionAll(...e) {
				return this._union('union all', e);
			}
			intersect(...e) {
				return this._union('intersect', e);
			}
			except(...e) {
				return this._union('except', e);
			}
			having(e, t, n) {
				return e.isRawInstance && arguments.length === 1
					? this.havingRaw(e)
					: typeof e == 'function'
						? this.havingWrapped(e)
						: (this._statements.push({
								grouping: 'having',
								type: 'havingBasic',
								column: e,
								operator: t,
								value: n,
								bool: this._bool(),
								not: this._not(),
							}),
							this);
			}
			orHaving(e, ...t) {
				this._bool('or');
				let n = e;
				return ht(n) && !n.isRawInstance
					? this.havingWrapped(function () {
							for (let i in n) this.andHaving(i, n[i]);
						})
					: this.having(e, ...t);
			}
			havingWrapped(e) {
				return (
					this._statements.push({
						grouping: 'having',
						type: 'havingWrapped',
						value: e,
						bool: this._bool(),
						not: this._not(),
					}),
					this
				);
			}
			havingNull(e) {
				return (
					this._statements.push({
						grouping: 'having',
						type: 'havingNull',
						column: e,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			orHavingNull(e) {
				return this._bool('or').havingNull(e);
			}
			havingNotNull(e) {
				return this._not(!0).havingNull(e);
			}
			orHavingNotNull(e) {
				return this._not(!0)._bool('or').havingNull(e);
			}
			havingExists(e) {
				return (
					this._statements.push({
						grouping: 'having',
						type: 'havingExists',
						value: e,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			orHavingExists(e) {
				return this._bool('or').havingExists(e);
			}
			havingNotExists(e) {
				return this._not(!0).havingExists(e);
			}
			orHavingNotExists(e) {
				return this._not(!0)._bool('or').havingExists(e);
			}
			havingBetween(e, t) {
				return (
					wn(
						Array.isArray(t),
						'The second argument to havingBetween must be an array.'
					),
					wn(
						t.length === 2,
						'You must specify 2 values for the havingBetween clause'
					),
					this._statements.push({
						grouping: 'having',
						type: 'havingBetween',
						column: e,
						value: t,
						not: this._not(),
						bool: this._bool(),
					}),
					this
				);
			}
			orHavingBetween(e, t) {
				return this._bool('or').havingBetween(e, t);
			}
			havingNotBetween(e, t) {
				return this._not(!0).havingBetween(e, t);
			}
			orHavingNotBetween(e, t) {
				return this._not(!0)._bool('or').havingBetween(e, t);
			}
			havingIn(e, t) {
				return Array.isArray(t) && vn(t)
					? this.where(this._not())
					: (this._statements.push({
							grouping: 'having',
							type: 'havingIn',
							column: e,
							value: t,
							not: this._not(),
							bool: this._bool(),
						}),
						this);
			}
			orHavingIn(e, t) {
				return this._bool('or').havingIn(e, t);
			}
			havingNotIn(e, t) {
				return this._not(!0).havingIn(e, t);
			}
			orHavingNotIn(e, t) {
				return this._bool('or')._not(!0).havingIn(e, t);
			}
			havingRaw(e, t) {
				let n = e.isRawInstance ? e : this.client.raw(e, t);
				return (
					this._statements.push({
						grouping: 'having',
						type: 'havingRaw',
						value: n,
						bool: this._bool(),
						not: this._not(),
					}),
					this
				);
			}
			orHavingRaw(e, t) {
				return this._bool('or').havingRaw(e, t);
			}
			_setSkipBinding(e, t) {
				let n = t;
				ht(t) && (n = t.skipBinding),
					(this._single.skipBinding = this._single.skipBinding || {}),
					(this._single.skipBinding[e] = n);
			}
			offset(e, t) {
				if (e == null || e.isRawInstance || e instanceof r)
					this._single.offset = e;
				else {
					let n = parseInt(e, 10);
					if (isNaN(n))
						this.client.logger.warn(
							'A valid integer must be provided to offset'
						);
					else {
						if (n < 0)
							throw new Error(
								'A non-negative integer must be provided to offset.'
							);
						this._single.offset = n;
					}
				}
				return this._setSkipBinding('offset', t), this;
			}
			limit(e, t) {
				let n = parseInt(e, 10);
				return (
					isNaN(n)
						? this.client.logger.warn(
								'A valid integer must be provided to limit'
							)
						: ((this._single.limit = n), this._setSkipBinding('limit', t)),
					this
				);
			}
			count(e, t) {
				return this._aggregate('count', e || '*', t);
			}
			min(e, t) {
				return this._aggregate('min', e, t);
			}
			max(e, t) {
				return this._aggregate('max', e, t);
			}
			sum(e, t) {
				return this._aggregate('sum', e, t);
			}
			avg(e, t) {
				return this._aggregate('avg', e, t);
			}
			countDistinct(...e) {
				let t;
				return (
					e.length > 1 && eq(YG(e)) && ([t] = e.splice(e.length - 1, 1)),
					e.length ? e.length === 1 && (e = e[0]) : (e = '*'),
					this._aggregate('count', e, {...t, distinct: !0})
				);
			}
			sumDistinct(e, t) {
				return this._aggregate('sum', e, {...t, distinct: !0});
			}
			avgDistinct(e, t) {
				return this._aggregate('avg', e, {...t, distinct: !0});
			}
			increment(e, t = 1) {
				if (ht(e)) {
					for (let n in e) this._counter(n, e[n]);
					return this;
				}
				return this._counter(e, t);
			}
			decrement(e, t = 1) {
				if (ht(e)) {
					for (let n in e) this._counter(n, -e[n]);
					return this;
				}
				return this._counter(e, -t);
			}
			clearCounters() {
				return (this._single.counter = {}), this;
			}
			first(...e) {
				if (this._method && this._method !== 'select')
					throw new Error(`Cannot chain .first() on "${this._method}" query`);
				return (
					this.select(Bi(...e)), (this._method = 'first'), this.limit(1), this
				);
			}
			connection(e) {
				return (
					(this._connection = e), this.client.processPassedConnection(e), this
				);
			}
			pluck(e) {
				if (this._method && this._method !== 'select')
					throw new Error(`Cannot chain .pluck() on "${this._method}" query`);
				return (
					(this._method = 'pluck'),
					(this._single.pluck = e),
					this._statements.push({grouping: 'columns', type: 'pluck', value: e}),
					this
				);
			}
			clearSelect() {
				return this._clearGrouping('columns'), this;
			}
			clearWhere() {
				return this._clearGrouping('where'), this;
			}
			clearGroup() {
				return this._clearGrouping('group'), this;
			}
			clearOrder() {
				return this._clearGrouping('order'), this;
			}
			clearHaving() {
				return this._clearGrouping('having'), this;
			}
			clear(e) {
				if (!uJ.has(e)) throw new Error(`Knex Error: unknown statement '${e}'`);
				return e.startsWith('counter')
					? this.clearCounters()
					: (e === 'select' && (e = 'columns'), this._clearGrouping(e), this);
			}
			insert(e, t, n) {
				return (
					(this._method = 'insert'),
					vn(t) || this.returning(t, n),
					(this._single.insert = e),
					this
				);
			}
			update(e, t, n) {
				let i,
					s = this._single.update || {};
				if (((this._method = 'update'), $o(e)))
					eq(t) ? (s[e] = JSON.stringify(t)) : (s[e] = t),
						arguments.length > 2 && (i = arguments[2]);
				else {
					let o = Object.keys(e);
					this._single.update &&
						this.client.logger.warn(
							'Update called multiple times with objects.'
						);
					let a = -1;
					for (; ++a < o.length; ) s[o[a]] = e[o[a]];
					i = arguments[1];
				}
				return vn(i) || this.returning(i, n), (this._single.update = s), this;
			}
			returning(e, t) {
				return (this._single.returning = e), (this._single.options = t), this;
			}
			onConflict(e) {
				return typeof e == 'string' && (e = [e]), new zl(this, e || !0);
			}
			delete(e, t) {
				return (this._method = 'del'), vn(e) || this.returning(e, t), this;
			}
			truncate(e) {
				return (this._method = 'truncate'), e && (this._single.table = e), this;
			}
			columnInfo(e) {
				return (
					(this._method = 'columnInfo'), (this._single.columnInfo = e), this
				);
			}
			forUpdate(...e) {
				return (
					(this._single.lock = St.forUpdate),
					e.length === 1 && Array.isArray(e[0])
						? (this._single.lockTables = e[0])
						: (this._single.lockTables = e),
					this
				);
			}
			forShare(...e) {
				return (
					(this._single.lock = St.forShare), (this._single.lockTables = e), this
				);
			}
			forNoKeyUpdate(...e) {
				return (
					(this._single.lock = St.forNoKeyUpdate),
					(this._single.lockTables = e),
					this
				);
			}
			forKeyShare(...e) {
				return (
					(this._single.lock = St.forKeyShare),
					(this._single.lockTables = e),
					this
				);
			}
			skipLocked() {
				if (!this._isSelectQuery())
					throw new Error(
						`Cannot chain .skipLocked() on "${this._method}" query!`
					);
				if (!this._hasLockMode())
					throw new Error(
						'.skipLocked() can only be used after a call to .forShare() or .forUpdate()!'
					);
				if (this._single.waitMode === Mo.noWait)
					throw new Error(
						'.skipLocked() cannot be used together with .noWait()!'
					);
				return (this._single.waitMode = Mo.skipLocked), this;
			}
			noWait() {
				if (!this._isSelectQuery())
					throw new Error(`Cannot chain .noWait() on "${this._method}" query!`);
				if (!this._hasLockMode())
					throw new Error(
						'.noWait() can only be used after a call to .forShare() or .forUpdate()!'
					);
				if (this._single.waitMode === Mo.skipLocked)
					throw new Error(
						'.noWait() cannot be used together with .skipLocked()!'
					);
				return (this._single.waitMode = Mo.noWait), this;
			}
			fromJS(e) {
				return (
					ZG(e, (t, n) => {
						typeof this[n] != 'function' &&
							this.client.logger.warn(`Knex Error: unknown key ${n}`),
							Array.isArray(t) ? this[n].apply(this, t) : this[n](t);
					}),
					this
				);
			}
			fromRaw(e, t) {
				let n = e.isRawInstance ? e : this.client.raw(e, t);
				return this.from(n);
			}
			modify(e) {
				return e.apply(this, [this].concat(eJ(arguments))), this;
			}
			upsert(e, t, n) {
				throw new Error(
					`Upsert is not yet supported for dialect ${this.client.dialect}`
				);
			}
			_json(e, t) {
				return (
					this._statements.push({
						grouping: 'columns',
						type: 'json',
						method: e,
						params: t,
					}),
					this
				);
			}
			jsonExtract() {
				let e = arguments[0],
					t,
					n,
					i = !0;
				return (
					arguments.length >= 2 && (t = arguments[1]),
					arguments.length >= 3 && (n = arguments[2]),
					arguments.length === 4 && (i = arguments[3]),
					arguments.length === 2 &&
						Array.isArray(arguments[0]) &&
						Kl(arguments[1]) &&
						(i = arguments[1]),
					this._json('jsonExtract', {
						column: e,
						path: t,
						alias: n,
						singleValue: i,
					})
				);
			}
			jsonSet(e, t, n, i) {
				return this._json('jsonSet', {column: e, path: t, value: n, alias: i});
			}
			jsonInsert(e, t, n, i) {
				return this._json('jsonInsert', {
					column: e,
					path: t,
					value: n,
					alias: i,
				});
			}
			jsonRemove(e, t, n) {
				return this._json('jsonRemove', {column: e, path: t, alias: n});
			}
			_isJsonObject(e) {
				return ht(e) && !(e instanceof r);
			}
			_whereJsonWrappedValue(e, t, n) {
				let i = {
					grouping: 'where',
					type: e,
					column: t,
					value: n,
					not: this._not(),
					bool: this._bool(),
					asColumn: this._asColumnFlag,
				};
				arguments[3] && (i.operator = arguments[3]),
					arguments[4] && (i.jsonPath = arguments[4]),
					this._statements.push(i);
			}
			whereJsonObject(e, t) {
				return this._whereJsonWrappedValue('whereJsonObject', e, t), this;
			}
			orWhereJsonObject(e, t) {
				return this._bool('or').whereJsonObject(e, t);
			}
			whereNotJsonObject(e, t) {
				return this._not(!0).whereJsonObject(e, t);
			}
			orWhereNotJsonObject(e, t) {
				return this._bool('or').whereNotJsonObject(e, t);
			}
			whereJsonPath(e, t, n, i) {
				return this._whereJsonWrappedValue('whereJsonPath', e, i, n, t), this;
			}
			orWhereJsonPath(e, t, n, i) {
				return this._bool('or').whereJsonPath(e, t, n, i);
			}
			whereJsonSupersetOf(e, t) {
				return this._whereJsonWrappedValue('whereJsonSupersetOf', e, t), this;
			}
			whereJsonNotSupersetOf(e, t) {
				return this._not(!0).whereJsonSupersetOf(e, t);
			}
			orWhereJsonSupersetOf(e, t) {
				return this._bool('or').whereJsonSupersetOf(e, t);
			}
			orWhereJsonNotSupersetOf(e, t) {
				return this._bool('or').whereJsonNotSupersetOf(e, t);
			}
			whereJsonSubsetOf(e, t) {
				return this._whereJsonWrappedValue('whereJsonSubsetOf', e, t), this;
			}
			whereJsonNotSubsetOf(e, t) {
				return this._not(!0).whereJsonSubsetOf(e, t);
			}
			orWhereJsonSubsetOf(e, t) {
				return this._bool('or').whereJsonSubsetOf(e, t);
			}
			orWhereJsonNotSubsetOf(e, t) {
				return this._bool('or').whereJsonNotSubsetOf(e, t);
			}
			whereJsonHasNone(e, t) {
				return this._not(!0).whereJsonHasAll(e, t), this;
			}
			_analytic(e, t, n) {
				let i,
					{schema: s} = this._single,
					o = this._analyticMethod();
				if (
					((e = typeof e == 'string' ? e : null),
					wn(
						typeof t == 'function' ||
							t.isRawInstance ||
							Array.isArray(t) ||
							typeof t == 'string' ||
							typeof t == 'object',
						`The second argument to an analytic function must be either a function, a raw,
       an array of string or object, an object or a single string.`
					),
					n &&
						wn(
							Array.isArray(n) || typeof n == 'string' || typeof n == 'object',
							'The third argument to an analytic function must be either a string, an array of string or object or an object.'
						),
					sJ(t))
				)
					(i = new nJ(o, s, e)), t.call(i, i);
				else if (t.isRawInstance)
					i = {
						grouping: 'columns',
						type: 'analytic',
						method: o,
						raw: t,
						alias: e,
					};
				else {
					let a = Array.isArray(t) ? t : [t],
						u = n || [];
					(u = Array.isArray(u) ? u : [u]),
						(i = {
							grouping: 'columns',
							type: 'analytic',
							method: o,
							order: a,
							alias: e,
							partitions: u,
						});
				}
				return this._statements.push(i), this;
			}
			rank(...e) {
				return this._analyticMethod('rank')._analytic(...e);
			}
			denseRank(...e) {
				return this._analyticMethod('dense_rank')._analytic(...e);
			}
			rowNumber(...e) {
				return this._analyticMethod('row_number')._analytic(...e);
			}
			_counter(e, t) {
				return (
					(t = parseFloat(t)),
					(this._method = 'update'),
					(this._single.counter = this._single.counter || {}),
					(this._single.counter[e] = t),
					this
				);
			}
			_bool(e) {
				if (arguments.length === 1) return (this._boolFlag = e), this;
				let t = this._boolFlag;
				return (this._boolFlag = 'and'), t;
			}
			_not(e) {
				if (arguments.length === 1) return (this._notFlag = e), this;
				let t = this._notFlag;
				return (this._notFlag = !1), t;
			}
			_joinType(e) {
				if (arguments.length === 1) return (this._joinFlag = e), this;
				let t = this._joinFlag || 'inner';
				return (this._joinFlag = 'inner'), t;
			}
			_analyticMethod(e) {
				return arguments.length === 1
					? ((this._analyticFlag = e), this)
					: this._analyticFlag || 'row_number';
			}
			_aggregate(e, t, n = {}) {
				return (
					this._statements.push({
						grouping: 'columns',
						type: t.isRawInstance ? 'aggregateRaw' : 'aggregate',
						method: e,
						value: t,
						aggregateDistinct: n.distinct || !1,
						alias: n.as,
					}),
					this
				);
			}
			_clearGrouping(e) {
				e in this._single
					? (this._single[e] = void 0)
					: (this._statements = XG(this._statements, {grouping: e}));
			}
			_isSelectQuery() {
				return aJ.has(this._method);
			}
			_hasLockMode() {
				return cJ.has(this._single.lock);
			}
		};
	q.prototype.select = q.prototype.columns;
	q.prototype.column = q.prototype.columns;
	q.prototype.andWhereNot = q.prototype.whereNot;
	q.prototype.andWhereNotColumn = q.prototype.whereNotColumn;
	q.prototype.andWhere = q.prototype.where;
	q.prototype.andWhereColumn = q.prototype.whereColumn;
	q.prototype.andWhereRaw = q.prototype.whereRaw;
	q.prototype.andWhereBetween = q.prototype.whereBetween;
	q.prototype.andWhereNotBetween = q.prototype.whereNotBetween;
	q.prototype.andWhereJsonObject = q.prototype.whereJsonObject;
	q.prototype.andWhereNotJsonObject = q.prototype.whereNotJsonObject;
	q.prototype.andWhereJsonPath = q.prototype.whereJsonPath;
	q.prototype.andWhereLike = q.prototype.whereLike;
	q.prototype.andWhereILike = q.prototype.whereILike;
	q.prototype.andHaving = q.prototype.having;
	q.prototype.andHavingIn = q.prototype.havingIn;
	q.prototype.andHavingNotIn = q.prototype.havingNotIn;
	q.prototype.andHavingNull = q.prototype.havingNull;
	q.prototype.andHavingNotNull = q.prototype.havingNotNull;
	q.prototype.andHavingExists = q.prototype.havingExists;
	q.prototype.andHavingNotExists = q.prototype.havingNotExists;
	q.prototype.andHavingBetween = q.prototype.havingBetween;
	q.prototype.andHavingNotBetween = q.prototype.havingNotBetween;
	q.prototype.from = q.prototype.table;
	q.prototype.into = q.prototype.table;
	q.prototype.del = q.prototype.delete;
	oJ(q);
	rJ(q);
	q.extend = (r, e) => {
		if (Object.prototype.hasOwnProperty.call(q.prototype, r))
			throw new Error(
				`Can't extend QueryBuilder with existing method ('${r}').`
			);
		zG(q.prototype, {[r]: e});
	};
	var zl = class {
		constructor(e, t) {
			(this.builder = e), (this._columns = t);
		}
		ignore() {
			return (
				(this.builder._single.onConflict = this._columns),
				(this.builder._single.ignore = !0),
				this.builder
			);
		}
		merge(e) {
			return (
				(this.builder._single.onConflict = this._columns),
				(this.builder._single.merge = {updates: e}),
				this.builder
			);
		}
		then() {
			throw new Error(
				'Incomplete onConflict clause. .onConflict() must be directly followed by either .merge() or .ignore()'
			);
		}
	};
	rq.exports = q;
});
var iq = l((ode, nq) => {
	function lJ(r, e, t, n) {
		var i = -1,
			s = r == null ? 0 : r.length;
		for (n && s && (t = r[++i]); ++i < s; ) t = e(t, r[i], i, r);
		return t;
	}
	nq.exports = lJ;
});
var oq = l((ade, sq) => {
	function hJ(r, e, t, n, i) {
		return (
			i(r, function (s, o, a) {
				t = n ? ((n = !1), s) : e(t, s, o, a);
			}),
			t
		);
	}
	sq.exports = hJ;
});
var En = l((ude, aq) => {
	var dJ = iq(),
		fJ = wr(),
		pJ = De(),
		mJ = oq(),
		gJ = V();
	function yJ(r, e, t) {
		var n = gJ(r) ? dJ : mJ,
			i = arguments.length < 3;
		return n(r, pJ(e, 4), t, i, fJ);
	}
	aq.exports = yJ;
});
var cq = l((cde, uq) => {
	var bJ = Js(),
		_J = Cc(),
		wJ = ul(),
		vJ = De(),
		EJ = Ci(),
		xJ = V(),
		CJ = cr(),
		qJ = fi(),
		TJ = qe(),
		AJ = lr();
	function SJ(r, e, t) {
		var n = xJ(r),
			i = n || CJ(r) || AJ(r);
		if (((e = vJ(e, 4)), t == null)) {
			var s = r && r.constructor;
			i
				? (t = n ? new s() : [])
				: TJ(r)
					? (t = qJ(s) ? _J(EJ(r)) : {})
					: (t = {});
		}
		return (
			(i ? bJ : wJ)(r, function (o, a, u) {
				return e(t, o, a, u);
			}),
			t
		);
	}
	uq.exports = SJ;
});
var Ot = l((lde, lq) => {
	var {isObject: OJ} = U();
	function RJ(r, e, t, n) {
		let i = t.queryBuilder();
		return (
			r.call(i, i),
			t.queryCompiler(i, n.bindings).toSQL(e || i._method || 'select')
		);
	}
	function NJ(r, e, t) {
		let n = e.queryContext();
		return t.wrapIdentifier((r || '').trim(), n);
	}
	function IJ(r, e, t) {
		return r === void 0
			? ''
			: r === null
				? 'null'
				: r && r.isRawInstance
					? r.toQuery()
					: e === 'bool'
						? (r === 'false' && (r = 0), `'${r ? 1 : 0}'`)
						: (e === 'json' || e === 'jsonb') && OJ(r)
							? `'${JSON.stringify(r)}'`
							: t._escapeBinding(r.toString());
	}
	lq.exports = {compileCallback: RJ, wrapAsIdentifier: NJ, formatDefault: IJ};
});
var ne = l((hde, dq) => {
	var PJ = cq(),
		hq = Ze(),
		{compileCallback: Zl, wrapAsIdentifier: jo} = Ot(),
		kJ = ['asc', 'desc'],
		$J = PJ(
			[
				'=',
				'<',
				'>',
				'<=',
				'>=',
				'<>',
				'!=',
				'like',
				'not like',
				'between',
				'not between',
				'ilike',
				'not ilike',
				'exists',
				'not exist',
				'rlike',
				'not rlike',
				'regexp',
				'not regexp',
				'match',
				'&',
				'|',
				'^',
				'<<',
				'>>',
				'~',
				'~=',
				'~*',
				'!~',
				'!~*',
				'#',
				'&&',
				'@>',
				'<@',
				'||',
				'&<',
				'&>',
				'-|-',
				'@@',
				'!!',
				['?', '\\?'],
				['?|', '\\?|'],
				['?&', '\\?&'],
			],
			(r, e) => {
				Array.isArray(e) ? (r[e[0]] = e[1]) : (r[e] = e);
			},
			{}
		);
	function MJ(r, e, t, n) {
		let i = Array.isArray(r) ? r : [r],
			s = '',
			o = -1;
		for (; ++o < i.length; )
			o > 0 && (s += ', '), (s += Lo(i[o], void 0, e, t, n));
		return s;
	}
	function Lo(r, e, t, n, i) {
		let s = Ui(r, e, t, n, i);
		if (s) return s;
		switch (typeof r) {
			case 'function':
				return Fi(Zl(r, void 0, n, i), !0, t, n);
			case 'object':
				return LJ(r, t, n, i);
			case 'number':
				return r;
			default:
				return Di(r + '', t, n);
		}
	}
	function Ui(r, e, t, n, i) {
		let s;
		if (r instanceof hq)
			return (
				(s = n.queryCompiler(r).toSQL()),
				s.bindings && i.bindings.push(...s.bindings),
				Fi(s, e, t, n)
			);
		if (r && r.isRawInstance)
			return (
				(r.client = n),
				t._queryContext && (r.queryContext = () => t._queryContext),
				(s = r.toSQL()),
				s.bindings && i.bindings.push(...s.bindings),
				s.sql
			);
		e && i.bindings.push(r);
	}
	function jJ(r, e, t, n) {
		let i = Ui(r, void 0, e, t, n);
		if (i) return i;
		let s = $J[(r || '').toLowerCase()];
		if (!s) throw new TypeError(`The operator "${r}" is not permitted`);
		return s;
	}
	function Di(r, e, t) {
		let n = r.toLowerCase().indexOf(' as ');
		if (n !== -1) {
			let a = r.slice(0, n),
				u = r.slice(n + 4);
			return t.alias(Di(a, e, t), jo(u, e, t));
		}
		let i = [],
			s = -1,
			o = r.split('.');
		for (; ++s < o.length; )
			(r = o[s]),
				s === 0 && o.length > 1
					? i.push(Di((r || '').trim(), e, t))
					: i.push(jo(r, e, t));
		return i.join('.');
	}
	function LJ(r, e, t, n) {
		let i = [];
		for (let s in r) {
			let o = r[s];
			if (typeof o == 'function') {
				let a = Zl(o, void 0, t, n);
				(a.as = s), i.push(Fi(a, !0, e, t));
			} else
				o instanceof hq
					? i.push(t.alias(`(${Lo(o, void 0, e, t, n)})`, jo(s, e, t)))
					: i.push(t.alias(Lo(o, void 0, e, t, n), jo(s, e, t)));
		}
		return i.join(', ');
	}
	function Fi(r, e, t, n) {
		let i = r.sql || '';
		return i &&
			(r.method === 'select' || r.method === 'first') &&
			(e || r.as) &&
			((i = `(${i})`), r.as)
			? n.alias(i, Di(r.as, t, n))
			: i;
	}
	function BJ(r, e, t, n, i) {
		return typeof r == 'function'
			? Fi(Zl(r, e, n, i), void 0, t, n)
			: Ui(r, void 0, t, n, i) || '';
	}
	function DJ(r, e, t, n) {
		let i = Ui(r, void 0, e, t, n);
		return i || (kJ.indexOf((r || '').toLowerCase()) !== -1 ? r : 'asc');
	}
	dq.exports = {
		columnize: MJ,
		direction: DJ,
		operator: jJ,
		outputQuery: Fi,
		rawOrFn: BJ,
		unwrapRaw: Ui,
		wrap: Lo,
		wrapString: Di,
	};
});
var mq = l((dde, pq) => {
	var {columnize: fq} = ne();
	function UJ(r, e) {
		let t = {bindings: []},
			n = r,
			i = r.bindings.length,
			s = r.bindings,
			o = 0,
			a = r.sql.replace(/\\?\?\??/g, function (u) {
				if (u === '\\?') return u;
				let c = s[o++];
				return u === '??' ? fq(c, n, e, t) : e.parameter(c, n, t);
			});
		if (i !== o) throw new Error(`Expected ${i} bindings, saw ${o}`);
		return {method: 'raw', sql: a, bindings: t.bindings};
	}
	function FJ(r, e) {
		let t = {bindings: []},
			n = r,
			i = r.bindings,
			s = /\\?(:(\w+):(?=::)|:(\w+):(?!:)|:(\w+))/g;
		return {
			method: 'raw',
			sql: r.sql.replace(s, function (a, u, c, h, d) {
				if (a !== u) return u;
				let f = c || h || d,
					m = a.trim(),
					g = m[m.length - 1] === ':',
					y = i[f];
				return y === void 0
					? (Object.prototype.hasOwnProperty.call(i, f) && t.bindings.push(y),
						a)
					: g
						? a.replace(u, fq(y, n, e, t))
						: a.replace(u, e.parameter(y, n, t));
			}),
			bindings: t.bindings,
		};
	}
	pq.exports = {replaceKeyBindings: FJ, replaceRawArrBindings: UJ};
});
var Bo = l((fde, gq) => {
	var QJ = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW',
		HJ = '0123456789';
	function WJ(r = 21) {
		let e = '',
			t = r;
		for (; t--; ) e += QJ[(Math.random() * 64) | 0];
		return e;
	}
	function VJ(r = 21) {
		let e = '',
			t = r;
		for (; t--; ) e += HJ[(Math.random() * 10) | 0];
		return e;
	}
	gq.exports = {nanoid: WJ, nanonum: VJ};
});
var vr = l((pde, yq) => {
	var {EventEmitter: GJ} = _('events'),
		JJ = Pe(),
		KJ = At(),
		zJ = ze(),
		ZJ = En(),
		{replaceRawArrBindings: YJ, replaceKeyBindings: XJ} = mq(),
		Yl = re(),
		eK = Po(),
		{nanoid: tK} = Bo(),
		{isNumber: rK, isObject: nK} = U(),
		{augmentWithBuilderInterface: iK} = ko(),
		sK = JJ('knex:bindings'),
		xn = class extends GJ {
			constructor(e) {
				super(),
					(this.client = e),
					(this.sql = ''),
					(this.bindings = []),
					(this._wrappedBefore = void 0),
					(this._wrappedAfter = void 0),
					e && e.config && ((this._debug = e.config.debug), eK(this, 4));
			}
			set(e, t) {
				return (
					(this.sql = e),
					(this.bindings = (nK(t) && !t.toSQL) || t === void 0 ? t : [t]),
					this
				);
			}
			timeout(e, {cancel: t} = {}) {
				return (
					rK(e) &&
						e > 0 &&
						((this._timeout = e),
						t &&
							(this.client.assertCanCancelQuery(),
							(this._cancelOnTimeout = !0))),
					this
				);
			}
			wrap(e, t) {
				return (this._wrappedBefore = e), (this._wrappedAfter = t), this;
			}
			toString() {
				return this.toQuery();
			}
			toSQL(e, t) {
				let n;
				if (
					(Array.isArray(this.bindings)
						? (n = YJ(this, this.client))
						: this.bindings && zJ(this.bindings)
							? (n = XJ(this, this.client))
							: (n = {
									method: 'raw',
									sql: this.sql,
									bindings: this.bindings === void 0 ? [] : [this.bindings],
								}),
					this._wrappedBefore && (n.sql = this._wrappedBefore + n.sql),
					this._wrappedAfter && (n.sql = n.sql + this._wrappedAfter),
					(n.options = ZJ(this._options, KJ, {})),
					this._timeout &&
						((n.timeout = this._timeout),
						this._cancelOnTimeout &&
							(n.cancelOnTimeout = this._cancelOnTimeout)),
					(n.bindings = n.bindings || []),
					Yl.containsUndefined(n.bindings))
				) {
					let i = Yl.getUndefinedIndices(this.bindings);
					throw (
						(sK(n.bindings),
						new Error(
							`Undefined binding(s) detected for keys [${i}] when compiling RAW query: ${n.sql}`
						))
					);
				}
				return (
					(n.__knexQueryUid = tK()),
					Object.defineProperties(n, {
						toNative: {
							value: () => ({
								sql: this.client.positionBindings(n.sql),
								bindings: this.client.prepBindings(n.bindings),
							}),
							enumerable: !1,
						},
					}),
					n
				);
			}
		};
	xn.prototype.isRawInstance = !0;
	iK(xn);
	Yl.addQueryContext(xn);
	yq.exports = xn;
});
var Do = l((mde, bq) => {
	function oK(r) {
		for (var e = -1, t = r == null ? 0 : r.length, n = 0, i = []; ++e < t; ) {
			var s = r[e];
			s && (i[n++] = s);
		}
		return i;
	}
	bq.exports = oK;
});
var wq = l((gde, _q) => {
	function aK(r, e, t, n) {
		for (var i = -1, s = r == null ? 0 : r.length; ++i < s; ) {
			var o = r[i];
			e(n, o, t(o), r);
		}
		return n;
	}
	_q.exports = aK;
});
var Eq = l((yde, vq) => {
	var uK = wr();
	function cK(r, e, t, n) {
		return (
			uK(r, function (i, s, o) {
				e(n, i, t(i), o);
			}),
			n
		);
	}
	vq.exports = cK;
});
var Cq = l((bde, xq) => {
	var lK = wq(),
		hK = Eq(),
		dK = De(),
		fK = V();
	function pK(r, e) {
		return function (t, n) {
			var i = fK(t) ? lK : hK,
				s = e ? e() : {};
			return i(t, r, dK(n, 2), s);
		};
	}
	xq.exports = pK;
});
var Qi = l((_de, qq) => {
	var mK = yi(),
		gK = Cq(),
		yK = Object.prototype,
		bK = yK.hasOwnProperty,
		_K = gK(function (r, e, t) {
			bK.call(r, t) ? r[t].push(e) : mK(r, t, [e]);
		});
	qq.exports = _K;
});
var Aq = l((wde, Tq) => {
	var wK = Object.prototype,
		vK = wK.hasOwnProperty;
	function EK(r, e) {
		return r != null && vK.call(r, e);
	}
	Tq.exports = EK;
});
var Hi = l((vde, Sq) => {
	var xK = Aq(),
		CK = ol();
	function qK(r, e) {
		return r != null && CK(r, e, xK);
	}
	Sq.exports = qK;
});
var Rt = l((Ede, Oq) => {
	var TK = mr(),
		AK = De(),
		SK = cl(),
		OK = V();
	function RK(r, e) {
		var t = OK(r) ? TK : SK;
		return t(r, AK(e, 3));
	}
	Oq.exports = RK;
});
var Iq = l((xde, Nq) => {
	var NK = bi(),
		IK = Ti(),
		PK = wi(),
		Rq = qe(),
		kK = mn();
	function $K(r, e, t, n) {
		if (!Rq(r)) return r;
		e = IK(e, r);
		for (var i = -1, s = e.length, o = s - 1, a = r; a != null && ++i < s; ) {
			var u = kK(e[i]),
				c = t;
			if (u === '__proto__' || u === 'constructor' || u === 'prototype')
				return r;
			if (i != o) {
				var h = a[u];
				(c = n ? n(h, u, a) : void 0),
					c === void 0 && (c = Rq(h) ? h : PK(e[i + 1]) ? [] : {});
			}
			NK(a, u, c), (a = a[u]);
		}
		return r;
	}
	Nq.exports = $K;
});
var kq = l((Cde, Pq) => {
	var MK = Ai(),
		jK = Iq(),
		LK = Ti();
	function BK(r, e, t) {
		for (var n = -1, i = e.length, s = {}; ++n < i; ) {
			var o = e[n],
				a = MK(r, o);
			t(a, o) && jK(s, LK(o, r), a);
		}
		return s;
	}
	Pq.exports = BK;
});
var Mq = l((qde, $q) => {
	var DK = mr(),
		UK = De(),
		FK = kq(),
		QK = mc();
	function HK(r, e) {
		if (r == null) return {};
		var t = DK(QK(r), function (n) {
			return [n];
		});
		return (
			(e = UK(e)),
			FK(r, t, function (n, i) {
				return e(n, i[0]);
			})
		);
	}
	$q.exports = HK;
});
var Lq = l((Tde, jq) => {
	var WK = De(),
		VK = Fl(),
		GK = Mq();
	function JK(r, e) {
		return GK(r, VK(WK(e)));
	}
	jq.exports = JK;
});
var It = l((Ade, Qq) => {
	var KK = re(),
		Cn = vr(),
		Uo = Ze(),
		zK = Vl(),
		ZK = Pe(),
		Bq = At(),
		Wi = Do(),
		YK = Qi(),
		XK = Hi(),
		Dq = we(),
		Uq = Rt(),
		ez = Lq(),
		tz = En(),
		{nanoid: rz} = Bo(),
		{isString: Xl, isUndefined: nz} = U(),
		{
			columnize: dt,
			direction: Fq,
			operator: Vi,
			wrap: Y,
			unwrapRaw: qn,
			rawOrFn: Nt,
		} = ne(),
		iz = ZK('knex:bindings'),
		sz = [
			'comments',
			'columns',
			'join',
			'where',
			'union',
			'group',
			'having',
			'order',
			'limit',
			'offset',
			'lock',
			'waitMode',
		],
		eh = class {
			constructor(e, t, n) {
				(this.client = e),
					(this.method = t._method || 'select'),
					(this.options = t._options),
					(this.single = t._single),
					(this.queryComments = t._comments),
					(this.timeout = t._timeout || !1),
					(this.cancelOnTimeout = t._cancelOnTimeout || !1),
					(this.grouped = YK(t._statements, 'grouping')),
					(this.formatter = e.formatter(t)),
					(this._emptyInsertValue = 'default values'),
					(this.first = this.select),
					(this.bindings = n || []),
					(this.formatter.bindings = this.bindings),
					(this.bindingsHolder = this),
					(this.builder = this.formatter.builder);
			}
			toSQL(e, t) {
				(this._undefinedInWhereClause = !1),
					(this.undefinedBindingsInfo = []),
					(e = e || this.method);
				let n = this[e]() || '',
					i = {
						method: e,
						options: tz(this.options, Bq, {}),
						timeout: this.timeout,
						cancelOnTimeout: this.cancelOnTimeout,
						bindings: this.bindingsHolder.bindings || [],
						__knexQueryUid: rz(),
					};
				if (
					(Object.defineProperties(i, {
						toNative: {
							value: () => ({
								sql: this.client.positionBindings(i.sql),
								bindings: this.client.prepBindings(i.bindings),
							}),
							enumerable: !1,
						},
					}),
					Xl(n) ? (i.sql = n) : Bq(i, n),
					(e === 'select' || e === 'first') &&
						this.single.as &&
						(i.as = this.single.as),
					this._undefinedInWhereClause)
				)
					throw (
						(iz(i.bindings),
						new Error(
							`Undefined binding(s) detected when compiling ${e.toUpperCase()}. Undefined column(s): [${this.undefinedBindingsInfo.join(', ')}] query: ${i.sql}`
						))
					);
				return i;
			}
			select() {
				let e = this.with(),
					t = '',
					n = [],
					i = [];
				sz.forEach((o) => {
					let a = this[o](this);
					switch (o) {
						case 'union':
							t = a;
							break;
						case 'comments':
						case 'columns':
						case 'join':
						case 'where':
							n.push(a);
							break;
						default:
							i.push(a);
							break;
					}
				});
				let s =
					this.grouped.union &&
					this.grouped.union.map((o) => o.wrap).some((o) => o);
				if (this.onlyUnions()) {
					let o = Wi(n.concat(i)).join(' ');
					e += t + (o ? ' ' + o : '');
				} else {
					let o = (s ? '(' : '') + Wi(n).join(' ') + (s ? ')' : ''),
						a = Wi(i).join(' ');
					e += o + (t ? ' ' + t : '') + (a && ' ' + a);
				}
				return e;
			}
			pluck() {
				let e = this.single.pluck;
				return (
					e.indexOf('.') !== -1 && (e = e.split('.').slice(-1)[0]),
					{sql: this.select(), pluck: e}
				);
			}
			insert() {
				let e = this.single.insert || [],
					t = this.with() + `insert into ${this.tableName} `,
					n = this._insertBody(e);
				return n === '' ? '' : t + n;
			}
			_onConflictClause(e) {
				return e instanceof Cn
					? this.formatter.wrap(e)
					: `(${this.formatter.columnize(e)})`;
			}
			_buildInsertValues(e) {
				let t = '',
					n = -1;
				for (; ++n < e.values.length; )
					n !== 0 && (t += '), ('),
						(t += this.client.parameterize(
							e.values[n],
							this.client.valueForUndefined,
							this.builder,
							this.bindingsHolder
						));
				return t;
			}
			_insertBody(e) {
				let t = '';
				if (Array.isArray(e)) {
					if (e.length === 0) return '';
				} else if (typeof e == 'object' && Dq(e))
					return t + this._emptyInsertValue;
				let n = this._prepInsert(e);
				return (
					typeof n == 'string'
						? (t += n)
						: n.columns.length
							? ((t += `(${dt(n.columns, this.builder, this.client, this.bindingsHolder)}`),
								(t += ') values (' + this._buildInsertValues(n) + ')'))
							: e.length === 1 && e[0]
								? (t += this._emptyInsertValue)
								: (t = ''),
					t
				);
			}
			update() {
				let e = this.with(),
					{tableName: t} = this,
					n = this._prepUpdate(this.single.update),
					i = this.where();
				return (
					e +
					`update ${this.single.only ? 'only ' : ''}${t} set ` +
					n.join(', ') +
					(i ? ` ${i}` : '')
				);
			}
			_hintComments() {
				let e = this.grouped.hintComments || [];
				return (
					(e = e.map((t) => Wi(t.value).join(' '))),
					(e = Wi(e).join(' ')),
					e ? `/*+ ${e} */ ` : ''
				);
			}
			columns() {
				let e = '';
				if (this.onlyUnions()) return '';
				let t = this._hintComments(),
					n = this.grouped.columns || [],
					i = -1,
					s = [];
				if (n)
					for (; ++i < n.length; ) {
						let a = n[i];
						if ((a.distinct && (e = 'distinct '), a.distinctOn)) {
							e = this.distinctOn(a.value);
							continue;
						}
						a.type === 'aggregate'
							? s.push(...this.aggregate(a))
							: a.type === 'aggregateRaw'
								? s.push(this.aggregateRaw(a))
								: a.type === 'analytic'
									? s.push(this.analytic(a))
									: a.type === 'json'
										? s.push(this.json(a))
										: a.value &&
											a.value.length > 0 &&
											s.push(
												dt(
													a.value,
													this.builder,
													this.client,
													this.bindingsHolder
												)
											);
					}
				return (
					s.length === 0 && (s = ['*']),
					`${this.onlyJson() ? '' : 'select '}${t}${e}` +
						s.join(', ') +
						(this.tableName
							? ` from ${this.single.only ? 'only ' : ''}${this.tableName}`
							: '')
				);
			}
			comments() {
				return this.queryComments.length
					? this.queryComments.map((e) => `/* ${e.comment} */`).join(' ')
					: '';
			}
			_aggregate(e, {aliasSeparator: t = ' as ', distinctParentheses: n} = {}) {
				let i = e.value,
					s = e.method,
					o = e.aggregateDistinct ? 'distinct ' : '',
					a = (g) =>
						Y(g, void 0, this.builder, this.client, this.bindingsHolder),
					u = (g, y) => (y ? g + t + a(y) : g),
					c = (g, y) => {
						let E = g.map(a).join(', ');
						if (o) {
							let j = n ? '(' : ' ',
								ae = n ? ')' : '';
							E = o.trim() + j + E + ae;
						}
						let N = `${s}(${E})`;
						return u(N, y);
					},
					h = (g, y) => {
						let E = `${s}(${o + a(g)})`;
						return u(E, y);
					};
				if (Array.isArray(i)) return [c(i)];
				if (typeof i == 'object') {
					if (e.alias)
						throw new Error(
							'When using an object explicit alias can not be used'
						);
					return Object.entries(i).map(([g, y]) =>
						Array.isArray(y) ? c(y, g) : h(y, g)
					);
				}
				let d = i.toLowerCase().indexOf(' as '),
					f = i,
					{alias: m} = e;
				if (d !== -1) {
					if (((f = i.slice(0, d)), m))
						throw new Error(`Found multiple aliases for same column: ${f}`);
					m = i.slice(d + 4);
				}
				return [h(f, m)];
			}
			aggregate(e) {
				return this._aggregate(e);
			}
			aggregateRaw(e) {
				let t = e.aggregateDistinct ? 'distinct ' : '';
				return `${e.method}(${t + qn(e.value, void 0, this.builder, this.client, this.bindingsHolder)})`;
			}
			_joinTable(e) {
				return e.schema && !(e.table instanceof Cn)
					? `${e.schema}.${e.table}`
					: e.table;
			}
			join() {
				let e = '',
					t = -1,
					n = this.grouped.join;
				if (!n) return '';
				for (; ++t < n.length; ) {
					let i = n[t],
						s = this._joinTable(i);
					if ((t > 0 && (e += ' '), i.joinType === 'raw'))
						e += qn(
							i.table,
							void 0,
							this.builder,
							this.client,
							this.bindingsHolder
						);
					else {
						e +=
							i.joinType +
							' join ' +
							Y(s, void 0, this.builder, this.client, this.bindingsHolder);
						let o = -1;
						for (; ++o < i.clauses.length; ) {
							let a = i.clauses[o];
							o > 0
								? (e += ` ${a.bool} `)
								: (e += ` ${a.type === 'onUsing' ? 'using' : 'on'} `);
							let u = this[a.type](a);
							u && (e += u);
						}
					}
				}
				return e;
			}
			onBetween(e) {
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' ' +
					this._not(e, 'between') +
					' ' +
					e.value
						.map((t) =>
							this.client.parameter(t, this.builder, this.bindingsHolder)
						)
						.join(' and ')
				);
			}
			onNull(e) {
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' is ' +
					this._not(e, 'null')
				);
			}
			onExists(e) {
				return (
					this._not(e, 'exists') +
					' (' +
					Nt(e.value, void 0, this.builder, this.client, this.bindingsHolder) +
					')'
				);
			}
			onIn(e) {
				if (Array.isArray(e.column)) return this.multiOnIn(e);
				let t;
				return (
					e.value instanceof Cn
						? (t = this.client.parameter(e.value, this.builder, this.formatter))
						: (t = this.client.parameterize(
								e.value,
								void 0,
								this.builder,
								this.bindingsHolder
							)),
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
						' ' +
						this._not(e, 'in ') +
						this.wrap(t)
				);
			}
			multiOnIn(e) {
				let t = -1,
					n = `(${dt(e.column, this.builder, this.client, this.bindingsHolder)}) `;
				for (n += this._not(e, 'in ') + '(('; ++t < e.value.length; )
					t !== 0 && (n += '),('),
						(n += this.client.parameterize(
							e.value[t],
							void 0,
							this.builder,
							this.bindingsHolder
						));
				return n + '))';
			}
			where() {
				let e = this.grouped.where;
				if (!e) return;
				let t = [],
					n = -1;
				for (; ++n < e.length; ) {
					let i = e[n];
					Object.prototype.hasOwnProperty.call(i, 'value') &&
						KK.containsUndefined(i.value) &&
						(this.undefinedBindingsInfo.push(i.column),
						(this._undefinedInWhereClause = !0));
					let s = this[i.type](i);
					s && (t.length === 0 ? (t[0] = 'where') : t.push(i.bool), t.push(s));
				}
				return t.length > 1 ? t.join(' ') : '';
			}
			group() {
				return this._groupsOrders('group');
			}
			order() {
				return this._groupsOrders('order');
			}
			having() {
				let e = this.grouped.having;
				if (!e) return '';
				let t = ['having'];
				for (let n = 0, i = e.length; n < i; n++) {
					let s = e[n],
						o = this[s.type](s);
					o &&
						(t.length === 0 && (t[0] = 'where'),
						(t.length > 1 || (t.length === 1 && t[0] !== 'having')) &&
							t.push(s.bool),
						t.push(o));
				}
				return t.length > 1 ? t.join(' ') : '';
			}
			havingRaw(e) {
				return (
					this._not(e, '') +
					qn(e.value, void 0, this.builder, this.client, this.bindingsHolder)
				);
			}
			havingWrapped(e) {
				let t = Nt(
					e.value,
					'where',
					this.builder,
					this.client,
					this.bindingsHolder
				);
				return (t && this._not(e, '') + '(' + t.slice(6) + ')') || '';
			}
			havingBasic(e) {
				return (
					this._not(e, '') +
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' ' +
					Vi(e.operator, this.builder, this.client, this.bindingsHolder) +
					' ' +
					this.client.parameter(e.value, this.builder, this.bindingsHolder)
				);
			}
			havingNull(e) {
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' is ' +
					this._not(e, 'null')
				);
			}
			havingExists(e) {
				return (
					this._not(e, 'exists') +
					' (' +
					Nt(e.value, void 0, this.builder, this.client, this.bindingsHolder) +
					')'
				);
			}
			havingBetween(e) {
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' ' +
					this._not(e, 'between') +
					' ' +
					e.value
						.map((t) =>
							this.client.parameter(t, this.builder, this.bindingsHolder)
						)
						.join(' and ')
				);
			}
			havingIn(e) {
				return Array.isArray(e.column)
					? this.multiHavingIn(e)
					: Y(
							e.column,
							void 0,
							this.builder,
							this.client,
							this.bindingsHolder
						) +
							' ' +
							this._not(e, 'in ') +
							this.wrap(
								this.client.parameterize(
									e.value,
									void 0,
									this.builder,
									this.bindingsHolder
								)
							);
			}
			multiHavingIn(e) {
				return this.multiOnIn(e);
			}
			union() {
				let e = this.onlyUnions(),
					t = this.grouped.union;
				if (!t) return '';
				let n = '';
				for (let i = 0, s = t.length; i < s; i++) {
					let o = t[i];
					i > 0 && (n += ' '), (i > 0 || !e) && (n += o.clause + ' ');
					let a = Nt(
						o.value,
						void 0,
						this.builder,
						this.client,
						this.bindingsHolder
					);
					if (a) {
						let u = o.wrap;
						u && (n += '('), (n += a), u && (n += ')');
					}
				}
				return n;
			}
			onlyUnions() {
				return (
					(!this.grouped.columns || !!this.grouped.columns[0].value) &&
					this.grouped.union &&
					!this.tableName
				);
			}
			_getValueOrParameterFromAttribute(e, t) {
				return this.single.skipBinding[e] === !0
					? (t ?? this.single[e])
					: this.client.parameter(
							this.single[e],
							this.builder,
							this.bindingsHolder
						);
			}
			onlyJson() {
				return (
					!this.tableName &&
					this.grouped.columns &&
					this.grouped.columns.length === 1 &&
					this.grouped.columns[0].type === 'json'
				);
			}
			limit() {
				return !this.single.limit && this.single.limit !== 0
					? ''
					: `limit ${this._getValueOrParameterFromAttribute('limit')}`;
			}
			offset() {
				return this.single.offset
					? `offset ${this._getValueOrParameterFromAttribute('offset')}`
					: '';
			}
			del() {
				let {tableName: e} = this,
					t = this.with(),
					n = this.where(),
					i = this.join(),
					s = i ? e + ' ' : '';
				return (
					t +
					`delete ${s}from ${this.single.only ? 'only ' : ''}${e}` +
					(i ? ` ${i}` : '') +
					(n ? ` ${n}` : '')
				);
			}
			truncate() {
				return `truncate ${this.tableName}`;
			}
			lock() {
				if (this.single.lock) return this[this.single.lock]();
			}
			waitMode() {
				if (this.single.waitMode) return this[this.single.waitMode]();
			}
			skipLocked() {
				throw new Error(
					'.skipLocked() is currently only supported on MySQL 8.0+ and PostgreSQL 9.5+'
				);
			}
			noWait() {
				throw new Error(
					'.noWait() is currently only supported on MySQL 8.0+, MariaDB 10.3.0+ and PostgreSQL 9.5+'
				);
			}
			distinctOn(e) {
				throw new Error(
					'.distinctOn() is currently only supported on PostgreSQL'
				);
			}
			onWrapped(e) {
				let t = this,
					n = new zK();
				e.value.call(n, n);
				let i = '';
				for (let s = 0; s < n.clauses.length; s++) {
					let o = n.clauses[s];
					s > 0 && (i += ` ${o.bool} `);
					let a = t[o.type](o);
					a && (i += a);
				}
				return i.length ? `(${i})` : '';
			}
			onBasic(e) {
				let t = e.value instanceof Uo;
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' ' +
					Vi(e.operator, this.builder, this.client, this.bindingsHolder) +
					' ' +
					(t ? '(' : '') +
					Y(e.value, void 0, this.builder, this.client, this.bindingsHolder) +
					(t ? ')' : '')
				);
			}
			onVal(e) {
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' ' +
					Vi(e.operator, this.builder, this.client, this.bindingsHolder) +
					' ' +
					this.client.parameter(e.value, this.builder, this.bindingsHolder)
				);
			}
			onRaw(e) {
				return qn(
					e.value,
					void 0,
					this.builder,
					this.client,
					this.bindingsHolder
				);
			}
			onUsing(e) {
				return (
					'(' +
					dt(e.column, this.builder, this.client, this.bindingsHolder) +
					')'
				);
			}
			_valueClause(e) {
				return e.asColumn
					? Y(e.value, void 0, this.builder, this.client, this.bindingsHolder)
					: this.client.parameter(e.value, this.builder, this.bindingsHolder);
			}
			_columnClause(e) {
				let t;
				return (
					Array.isArray(e.column)
						? (t = `(${dt(e.column, this.builder, this.client, this.bindingsHolder)})`)
						: (t = Y(
								e.column,
								void 0,
								this.builder,
								this.client,
								this.bindingsHolder
							)),
					t
				);
			}
			whereIn(e) {
				let t = this.client.values(e.value, this.builder, this.bindingsHolder);
				return `${this._columnClause(e)} ${this._not(e, 'in ')}${t}`;
			}
			whereLike(e) {
				return `${this._columnClause(e)} ${this._not(e, 'like ')}${this._valueClause(e)}`;
			}
			whereILike(e) {
				return `${this._columnClause(e)} ${this._not(e, 'ilike ')}${this._valueClause(e)}`;
			}
			whereNull(e) {
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' is ' +
					this._not(e, 'null')
				);
			}
			whereBasic(e) {
				return (
					this._not(e, '') +
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' ' +
					Vi(e.operator, this.builder, this.client, this.bindingsHolder) +
					' ' +
					this._valueClause(e)
				);
			}
			whereExists(e) {
				return (
					this._not(e, 'exists') +
					' (' +
					Nt(e.value, void 0, this.builder, this.client, this.bindingsHolder) +
					')'
				);
			}
			whereWrapped(e) {
				let t = Nt(
					e.value,
					'where',
					this.builder,
					this.client,
					this.bindingsHolder
				);
				return (t && this._not(e, '') + '(' + t.slice(6) + ')') || '';
			}
			whereBetween(e) {
				return (
					Y(e.column, void 0, this.builder, this.client, this.bindingsHolder) +
					' ' +
					this._not(e, 'between') +
					' ' +
					e.value
						.map((t) =>
							this.client.parameter(t, this.builder, this.bindingsHolder)
						)
						.join(' and ')
				);
			}
			whereRaw(e) {
				return (
					this._not(e, '') +
					qn(e.value, void 0, this.builder, this.client, this.bindingsHolder)
				);
			}
			_jsonWrapValue(e) {
				if (!this.builder._isJsonObject(e))
					try {
						return JSON.stringify(JSON.parse(e.replace(/\n|\t/g, '')));
					} catch {
						return e;
					}
				return JSON.stringify(e);
			}
			_jsonValueClause(e) {
				return (e.value = this._jsonWrapValue(e.value)), this._valueClause(e);
			}
			whereJsonObject(e) {
				return `${this._columnClause(e)} ${e.not ? '!=' : '='} ${this._jsonValueClause(e)}`;
			}
			wrap(e) {
				return e.charAt(0) !== '(' ? `(${e})` : e;
			}
			json(e) {
				return this[e.method](e.params);
			}
			analytic(e) {
				let t = '',
					n = this;
				return (
					(t += e.method + '() over ('),
					e.raw
						? (t += e.raw)
						: (e.partitions.length &&
								((t += 'partition by '),
								(t +=
									Uq(e.partitions, function (i) {
										return Xl(i)
											? n.formatter.columnize(i)
											: n.formatter.columnize(i.column) +
													(i.order ? ' ' + i.order : '');
									}).join(', ') + ' ')),
							(t += 'order by '),
							(t += Uq(e.order, function (i) {
								return Xl(i)
									? n.formatter.columnize(i)
									: n.formatter.columnize(i.column) +
											(i.order ? ' ' + i.order : '');
							}).join(', '))),
					(t += ')'),
					e.alias && (t += ' as ' + e.alias),
					t
				);
			}
			with() {
				if (!this.grouped.with || !this.grouped.with.length) return '';
				let e = this.grouped.with;
				if (!e) return;
				let t = [],
					n = -1,
					i = !1;
				for (; ++n < e.length; ) {
					let s = e[n];
					s.recursive && (i = !0);
					let o = this[s.type](s);
					t.push(o);
				}
				return `with ${i ? 'recursive ' : ''}${t.join(', ')} `;
			}
			withWrapped(e) {
				let t = Nt(
						e.value,
						void 0,
						this.builder,
						this.client,
						this.bindingsHolder
					),
					n = e.columnList
						? '(' +
							dt(e.columnList, this.builder, this.client, this.bindingsHolder) +
							')'
						: '',
					i =
						e.materialized === void 0
							? ''
							: e.materialized
								? 'materialized '
								: 'not materialized ';
				return (
					(t &&
						dt(e.alias, this.builder, this.client, this.bindingsHolder) +
							n +
							' as ' +
							i +
							'(' +
							t +
							')') ||
					''
				);
			}
			_not(e, t) {
				return e.not ? `not ${t}` : t;
			}
			_prepInsert(e) {
				let t = Nt(e, void 0, this.builder, this.client, this.bindingsHolder);
				if (t) return t;
				let n = [],
					i = [];
				Array.isArray(e) || (e = e ? [e] : []);
				let s = -1;
				for (; ++s < e.length && e[s] != null; ) {
					s === 0 && (n = Object.keys(e[s]).sort());
					let o = new Array(n.length),
						a = Object.keys(e[s]),
						u = -1;
					for (; ++u < a.length; ) {
						let c = a[u],
							h = n.indexOf(c);
						if (h === -1) {
							(n = n.concat(c).sort()), (h = n.indexOf(c));
							let d = -1;
							for (; ++d < i.length; ) i[d].splice(h, 0, void 0);
							o.splice(h, 0, void 0);
						}
						o[h] = e[s][c];
					}
					i.push(o);
				}
				return {columns: n, values: i};
			}
			_prepUpdate(e = {}) {
				let {counter: t = {}} = this.single;
				for (let o of Object.keys(t)) {
					if (XK(e, o)) {
						this.client.logger.warn(
							'increment/decrement called for a column that has already been specified in main .update() call. Ignoring increment/decrement and using value from .update() call.'
						);
						continue;
					}
					let a = t[o],
						u = a < 0 ? '-' : '+';
					u === '-' && (a = -a), (e[o] = this.client.raw(`?? ${u} ?`, [o, a]));
				}
				e = ez(e, nz);
				let n = [],
					i = Object.keys(e),
					s = -1;
				for (; ++s < i.length; )
					n.push(
						Y(i[s], void 0, this.builder, this.client, this.bindingsHolder) +
							' = ' +
							this.client.parameter(e[i[s]], this.builder, this.bindingsHolder)
					);
				if (Dq(n))
					throw new Error(
						[
							'Empty .update() call detected!',
							'Update data does not contain any values to update.',
							'This will result in a faulty query.',
							this.single.table ? `Table: ${this.single.table}.` : '',
							this.single.update
								? `Columns: ${Object.keys(this.single.update)}.`
								: '',
						].join(' ')
					);
				return n;
			}
			_formatGroupsItemValue(e, t) {
				let {formatter: n} = this,
					i = '';
				t === 'last' ? (i = ' is null') : t === 'first' && (i = ' is not null');
				let s;
				return (
					e instanceof Cn
						? (s = qn(
								e,
								void 0,
								this.builder,
								this.client,
								this.bindingsHolder
							))
						: e instanceof Uo || t
							? (s = '(' + n.columnize(e) + i + ')')
							: (s = n.columnize(e)),
					s
				);
			}
			_basicGroupOrder(e, t) {
				let n = this._formatGroupsItemValue(e.value, e.nulls),
					i =
						t === 'order' && e.type !== 'orderByRaw'
							? ` ${Fq(e.direction, this.builder, this.client, this.bindingsHolder)}`
							: '';
				return n + i;
			}
			_groupOrder(e, t) {
				return this._basicGroupOrder(e, t);
			}
			_groupOrderNulls(e, t) {
				let n = this._formatGroupsItemValue(e.value),
					i =
						t === 'order' && e.type !== 'orderByRaw'
							? ` ${Fq(e.direction, this.builder, this.client, this.bindingsHolder)}`
							: '';
				return e.nulls && !(e.value instanceof Cn)
					? `${n}${i || ''} nulls ${e.nulls}`
					: n + i;
			}
			_groupsOrders(e) {
				let t = this.grouped[e];
				if (!t) return '';
				let n = t.map((i) => this._groupOrder(i, e));
				return n.length ? e + ' by ' + n.join(', ') : '';
			}
			get tableName() {
				if (!this._tableName) {
					let e = this.single.table,
						t = this.single.schema;
					if (e && t) {
						let n = e instanceof Uo,
							i = e instanceof Cn;
						!n && !i && !(typeof e == 'function') && (e = `${t}.${e}`);
					}
					this._tableName = e
						? Y(
								e,
								e instanceof Uo,
								this.builder,
								this.client,
								this.bindingsHolder
							)
						: '';
				}
				return this._tableName;
			}
			_jsonPathWrap(e) {
				return this.client.parameter(
					e.path || e[1],
					this.builder,
					this.bindingsHolder
				);
			}
			_jsonExtract(e, t) {
				let n;
				return (
					Array.isArray(t.column) ? (n = t.column) : (n = [t]),
					Array.isArray(e) || (e = [e]),
					n
						.map((i) => {
							let s = `${dt(i.column || i[0], this.builder, this.client, this.bindingsHolder)}, ${this._jsonPathWrap(i)}`;
							e.forEach((a) => {
								s = a + '(' + s + ')';
							});
							let o = i.alias || i[2];
							return o ? this.client.alias(s, this.formatter.wrap(o)) : s;
						})
						.join(', ')
				);
			}
			_jsonSet(e, t) {
				let n = `${e}(${dt(t.column, this.builder, this.client, this.bindingsHolder)}, ${this.client.parameter(t.path, this.builder, this.bindingsHolder)}, ${this.client.parameter(t.value, this.builder, this.bindingsHolder)})`;
				return t.alias ? this.client.alias(n, this.formatter.wrap(t.alias)) : n;
			}
			_whereJsonPath(e, t) {
				return `${e}(${this._columnClause(t)}, ${this._jsonPathWrap({path: t.jsonPath})}) ${Vi(t.operator, this.builder, this.client, this.bindingsHolder)} ${this._jsonValueClause(t)}`;
			}
			_onJsonPathEquals(e, t) {
				return (
					e +
					'(' +
					Y(
						t.columnFirst,
						void 0,
						this.builder,
						this.client,
						this.bindingsHolder
					) +
					', ' +
					this.client.parameter(
						t.jsonPathFirst,
						this.builder,
						this.bindingsHolder
					) +
					') = ' +
					e +
					'(' +
					Y(
						t.columnSecond,
						void 0,
						this.builder,
						this.client,
						this.bindingsHolder
					) +
					', ' +
					this.client.parameter(
						t.jsonPathSecond,
						this.builder,
						this.bindingsHolder
					) +
					')'
				);
			}
		};
	Qq.exports = eh;
});
var th = l((Sde, Hq) => {
	var {EventEmitter: oz} = _('events'),
		az = _n(),
		uz = At(),
		{addQueryContext: cz} = re(),
		lz = Po(),
		{augmentWithBuilderInterface: hz} = ko(),
		ft = class extends oz {
			constructor(e) {
				super(),
					(this.client = e),
					(this._sequence = []),
					e.config && ((this._debug = e.config.debug), lz(this, 4));
			}
			withSchema(e) {
				return (this._schema = e), this;
			}
			toString() {
				return this.toQuery();
			}
			toSQL() {
				return this.client.schemaCompiler(this).toSQL();
			}
			async generateDdlCommands() {
				return await this.client.schemaCompiler(this).generateDdlCommands();
			}
		};
	[
		'createTable',
		'createTableIfNotExists',
		'createTableLike',
		'createView',
		'createViewOrReplace',
		'createMaterializedView',
		'refreshMaterializedView',
		'dropView',
		'dropViewIfExists',
		'dropMaterializedView',
		'dropMaterializedViewIfExists',
		'createSchema',
		'createSchemaIfNotExists',
		'dropSchema',
		'dropSchemaIfExists',
		'createExtension',
		'createExtensionIfNotExists',
		'dropExtension',
		'dropExtensionIfExists',
		'table',
		'alterTable',
		'view',
		'alterView',
		'hasTable',
		'hasColumn',
		'dropTable',
		'renameTable',
		'renameView',
		'dropTableIfExists',
		'raw',
	].forEach(function (r) {
		ft.prototype[r] = function () {
			return (
				r === 'createTableIfNotExists' &&
					this.client.logger.warn(
						[
							'Use async .hasTable to check if table exists and then use plain .createTable. Since ',
							'.createTableIfNotExists actually just generates plain "CREATE TABLE IF NOT EXIST..." ',
							'query it will not work correctly if there are any alter table queries generated for ',
							'columns afterwards. To not break old migrations this function is left untouched for now',
							', but it should not be used when writing new code and it is removed from documentation.',
						].join('')
					),
				r === 'table' && (r = 'alterTable'),
				r === 'view' && (r = 'alterView'),
				this._sequence.push({method: r, args: az(arguments)}),
				this
			);
		};
	});
	ft.extend = (r, e) => {
		if (Object.prototype.hasOwnProperty.call(ft.prototype, r))
			throw new Error(
				`Can't extend SchemaBuilder with existing method ('${r}').`
			);
		uz(ft.prototype, {[r]: e});
	};
	hz(ft);
	cz(ft);
	Hq.exports = ft;
});
var Gi = l((Ode, Vq) => {
	var dz = Mi(),
		{isString: Wq} = U();
	function fz(r) {
		r &&
			(Wq(r) && (r = {sql: r}),
			r.bindings || (r.bindings = this.bindingsHolder.bindings),
			this.sequence.push(r),
			(this.formatter = this.client.formatter(this._commonBuilder)),
			(this.bindings = []),
			(this.formatter.bindings = this.bindings));
	}
	function pz(r) {
		let e = new this.constructor(
			this.client,
			this.tableCompiler,
			this.columnBuilder
		);
		r.call(e, dz(arguments)),
			(this.sequence.additional = (this.sequence.additional || []).concat(
				e.sequence
			));
	}
	function mz(r) {
		r &&
			(Wq(r) && (r = {sql: r}),
			r.bindings || (r.bindings = this.bindingsHolder.bindings),
			this.sequence.unshift(r),
			(this.formatter = this.client.formatter(this._commonBuilder)),
			(this.bindings = []),
			(this.formatter.bindings = this.bindings));
	}
	Vq.exports = {pushAdditional: pz, pushQuery: fz, unshiftQuery: mz};
});
var Er = l((Rde, Gq) => {
	var {pushQuery: gz, pushAdditional: yz, unshiftQuery: bz} = Gi(),
		ie = class {
			constructor(e, t) {
				(this.builder = t),
					(this._commonBuilder = this.builder),
					(this.client = e),
					(this.schema = t._schema),
					(this.bindings = []),
					(this.bindingsHolder = this),
					(this.formatter = e.formatter(t)),
					(this.formatter.bindings = this.bindings),
					(this.sequence = []);
			}
			createSchema() {
				Fo('createSchema');
			}
			createSchemaIfNotExists() {
				Fo('createSchemaIfNotExists');
			}
			dropSchema() {
				Fo('dropSchema');
			}
			dropSchemaIfExists() {
				Fo('dropSchemaIfExists');
			}
			dropTable(e) {
				this.pushQuery(
					this.dropTablePrefix + this.formatter.wrap(rh(this.schema, e))
				);
			}
			dropTableIfExists(e) {
				this.pushQuery(
					this.dropTablePrefix +
						'if exists ' +
						this.formatter.wrap(rh(this.schema, e))
				);
			}
			dropView(e) {
				this._dropView(e, !1, !1);
			}
			dropViewIfExists(e) {
				this._dropView(e, !0, !1);
			}
			dropMaterializedView(e) {
				throw new Error(
					'materialized views are not supported by this dialect.'
				);
			}
			dropMaterializedViewIfExists(e) {
				throw new Error(
					'materialized views are not supported by this dialect.'
				);
			}
			renameView(e, t) {
				throw new Error(
					'rename view is not supported by this dialect (instead drop then create another view).'
				);
			}
			refreshMaterializedView() {
				throw new Error(
					'materialized views are not supported by this dialect.'
				);
			}
			_dropView(e, t, n) {
				this.pushQuery(
					(n ? this.dropMaterializedViewPrefix : this.dropViewPrefix) +
						(t ? 'if exists ' : '') +
						this.formatter.wrap(rh(this.schema, e))
				);
			}
			raw(e, t) {
				this.sequence.push(this.client.raw(e, t).toSQL());
			}
			toSQL() {
				let e = this.builder._sequence;
				for (let t = 0, n = e.length; t < n; t++) {
					let i = e[t];
					this[i.method].apply(this, i.args);
				}
				return this.sequence;
			}
			async generateDdlCommands() {
				let e = this.toSQL();
				return {
					pre: [],
					sql: Array.isArray(e) ? e : [e],
					check: null,
					post: [],
				};
			}
		};
	ie.prototype.dropTablePrefix = 'drop table ';
	ie.prototype.dropViewPrefix = 'drop view ';
	ie.prototype.dropMaterializedViewPrefix = 'drop materialized view ';
	ie.prototype.alterViewPrefix = 'alter view ';
	ie.prototype.alterTable = Qo('alter');
	ie.prototype.createTable = Qo('create');
	ie.prototype.createTableIfNotExists = Qo('createIfNot');
	ie.prototype.createTableLike = Qo('createLike');
	ie.prototype.createView = Ho('create');
	ie.prototype.createViewOrReplace = Ho('createOrReplace');
	ie.prototype.createMaterializedView = Ho('createMaterializedView');
	ie.prototype.alterView = Ho('alter');
	ie.prototype.pushQuery = gz;
	ie.prototype.pushAdditional = yz;
	ie.prototype.unshiftQuery = bz;
	function nh(r) {
		let e = this.builder.queryContext();
		e !== void 0 && r.queryContext() === void 0 && r.queryContext(e),
			r.setSchema(this.schema);
		let t = r.toSQL();
		for (let n = 0, i = t.length; n < i; n++) this.sequence.push(t[n]);
	}
	function Qo(r) {
		return r === 'createLike'
			? function (e, t, n) {
					let i = this.client.tableBuilder(r, e, t, n);
					nh.call(this, i);
				}
			: function (e, t) {
					let n = this.client.tableBuilder(r, e, null, t);
					nh.call(this, n);
				};
	}
	function Ho(r) {
		return function (e, t) {
			let n = this.client.viewBuilder(r, e, t);
			nh.call(this, n);
		};
	}
	function rh(r, e) {
		return r ? `${r}.${e}` : e;
	}
	function Fo(r) {
		throw new Error(
			`${r} is not supported for this dialect (only PostgreSQL supports it currently).`
		);
	}
	Gq.exports = ie;
});
var Kq = l((Nde, Jq) => {
	var _z = ot(),
		wz = Oi(),
		vz = ut(),
		Ez = wz(function (r, e) {
			_z(e, vz(e), r);
		});
	Jq.exports = Ez;
});
var Ji = l((Ide, zq) => {
	zq.exports = Kq();
});
var sh = l((Pde, Yq) => {
	var xz = bn(),
		Zq = Ji(),
		Cz = At(),
		Wo = _n(),
		qz = re(),
		{isString: Tz, isFunction: Az, isObject: Sz} = U(),
		Ye = class {
			constructor(e, t, n, i, s) {
				if (
					((this.client = e),
					(this._fn = s),
					(this._method = t),
					(this._schemaName = void 0),
					(this._tableName = n),
					(this._tableNameLike = i),
					(this._statements = []),
					(this._single = {}),
					!i && !Az(this._fn))
				)
					throw new TypeError(
						'A callback function must be supplied to calls against `.createTable` and `.table`'
					);
			}
			setSchema(e) {
				this._schemaName = e;
			}
			toSQL() {
				return (
					this._method === 'alter' && Zq(this, ih),
					this._fn && this._fn.call(this, this),
					this.client.tableCompiler(this).toSQL()
				);
			}
			timestamps(e, t, n) {
				Sz(e) && ({useTimestamps: e, defaultToNow: t, useCamelCase: n} = e);
				let i = e === !0 ? 'timestamp' : 'datetime',
					s = this[i](n ? 'createdAt' : 'created_at'),
					o = this[i](n ? 'updatedAt' : 'updated_at');
				if (t === !0) {
					let a = this.client.raw('CURRENT_TIMESTAMP');
					s.notNullable().defaultTo(a), o.notNullable().defaultTo(a);
				}
			}
			comment(e) {
				if (typeof e != 'string')
					throw new TypeError('Table comment must be string');
				this._single.comment = e;
			}
			foreign(e, t) {
				let n = {column: e, keyName: t};
				this._statements.push({
					grouping: 'alterTable',
					method: 'foreign',
					args: [n],
				});
				let i = {
					references(s) {
						let o;
						return (
							Tz(s) && (o = s.split('.')),
							!o || o.length === 1
								? ((n.references = o ? o[0] : s),
									{
										on(a) {
											if (typeof a != 'string')
												throw new TypeError(
													`Expected tableName to be a string, got: ${typeof a}`
												);
											return (n.inTable = a), i;
										},
										inTable() {
											return this.on.apply(this, arguments);
										},
									})
								: ((n.inTable = o[0]), (n.references = o[1]), i)
						);
					},
					withKeyName(s) {
						return (n.keyName = s), i;
					},
					onUpdate(s) {
						return (n.onUpdate = s), i;
					},
					onDelete(s) {
						return (n.onDelete = s), i;
					},
					deferrable: (s) => {
						if (
							['mysql', 'mssql', 'redshift', 'mysql2', 'oracledb'].indexOf(
								this.client.dialect
							) !== -1
						)
							throw new Error(
								`${this.client.dialect} does not support deferrable`
							);
						return (n.deferrable = s), i;
					},
					_columnBuilder(s) {
						return Zq(s, i), (i = s), s;
					},
				};
				return i;
			}
			check(e, t, n) {
				return (
					this._statements.push({grouping: 'checks', args: [e, t, n]}), this
				);
			}
		};
	[
		'index',
		'primary',
		'unique',
		'dropPrimary',
		'dropUnique',
		'dropIndex',
		'dropForeign',
	].forEach((r) => {
		Ye.prototype[r] = function () {
			return (
				this._statements.push({
					grouping: 'alterTable',
					method: r,
					args: Wo(arguments),
				}),
				this
			);
		};
	});
	var Oz = {mysql: ['engine', 'charset', 'collate'], postgresql: ['inherits']};
	xz(Oz, function (r, e) {
		r.forEach(function (t) {
			Ye.prototype[t] = function (n) {
				if (this.client.dialect !== e)
					throw new Error(`Knex only supports ${t} statement with ${e}.`);
				if (this._method === 'alter')
					throw new Error(
						`Knex does not support altering the ${t} outside of create table, please use knex.raw statement.`
					);
				this._single[t] = n;
			};
		});
	});
	qz.addQueryContext(Ye);
	var Rz = [
		'tinyint',
		'smallint',
		'mediumint',
		'int',
		'bigint',
		'decimal',
		'float',
		'double',
		'real',
		'bit',
		'boolean',
		'serial',
		'date',
		'datetime',
		'timestamp',
		'time',
		'year',
		'geometry',
		'geography',
		'point',
		'char',
		'varchar',
		'tinytext',
		'tinyText',
		'text',
		'mediumtext',
		'mediumText',
		'longtext',
		'longText',
		'binary',
		'varbinary',
		'tinyblob',
		'tinyBlob',
		'mediumblob',
		'mediumBlob',
		'blob',
		'longblob',
		'longBlob',
		'enum',
		'set',
		'bool',
		'dateTime',
		'increments',
		'bigincrements',
		'bigIncrements',
		'integer',
		'biginteger',
		'bigInteger',
		'string',
		'json',
		'jsonb',
		'uuid',
		'enu',
		'specificType',
	];
	Rz.forEach((r) => {
		Ye.prototype[r] = function () {
			let e = Wo(arguments),
				t = this.client.columnBuilder(this, r, e);
			return this._statements.push({grouping: 'columns', builder: t}), t;
		};
	});
	var ih = {
		renameColumn(r, e) {
			return (
				this._statements.push({
					grouping: 'alterTable',
					method: 'renameColumn',
					args: [r, e],
				}),
				this
			);
		},
		dropTimestamps() {
			return this.dropColumns(
				arguments[0] === !0
					? ['createdAt', 'updatedAt']
					: ['created_at', 'updated_at']
			);
		},
		setNullable(r) {
			return (
				this._statements.push({
					grouping: 'alterTable',
					method: 'setNullable',
					args: [r],
				}),
				this
			);
		},
		check(r, e, t) {
			this._statements.push({
				grouping: 'alterTable',
				method: 'check',
				args: [r, e, t],
			});
		},
		dropChecks() {
			this._statements.push({
				grouping: 'alterTable',
				method: 'dropChecks',
				args: Wo(arguments),
			});
		},
		dropNullable(r) {
			return (
				this._statements.push({
					grouping: 'alterTable',
					method: 'dropNullable',
					args: [r],
				}),
				this
			);
		},
	};
	ih.dropColumn = ih.dropColumns = function () {
		return (
			this._statements.push({
				grouping: 'alterTable',
				method: 'dropColumn',
				args: Wo(arguments),
			}),
			this
		);
	};
	Ye.extend = (r, e) => {
		if (Object.prototype.hasOwnProperty.call(Ye.prototype, r))
			throw new Error(
				`Can't extend TableBuilder with existing method ('${r}').`
			);
		Cz(Ye.prototype, {[r]: e});
	};
	Yq.exports = Ye;
});
var e0 = l((kde, Xq) => {
	var Nz = lo(),
		Iz = qo(),
		Pz = Math.max;
	function kz(r, e, t) {
		var n = r == null ? 0 : r.length;
		if (!n) return -1;
		var i = t == null ? 0 : Iz(t);
		return i < 0 && (i = Pz(n + i, 0)), Nz(r, e, i);
	}
	Xq.exports = kz;
});
var xr = l(($de, r0) => {
	var {pushAdditional: $z, pushQuery: Mz, unshiftQuery: jz} = Gi(),
		Lz = re(),
		Bz = Qi(),
		Dz = e0(),
		t0 = we(),
		Uz = Mi(),
		{normalizeArr: Fz} = re(),
		ke = class {
			constructor(e, t) {
				(this.client = e),
					(this.tableBuilder = t),
					(this._commonBuilder = this.tableBuilder),
					(this.method = t._method),
					(this.schemaNameRaw = t._schemaName),
					(this.tableNameRaw = t._tableName),
					(this.tableNameLikeRaw = t._tableNameLike),
					(this.single = t._single),
					(this.grouped = Bz(t._statements, 'grouping')),
					(this.formatter = e.formatter(t)),
					(this.bindings = []),
					(this.formatter.bindings = this.bindings),
					(this.bindingsHolder = this),
					(this.sequence = []),
					(this._formatting = e.config && e.config.formatting),
					(this.checksCount = 0);
			}
			toSQL() {
				return this[this.method](), this.sequence;
			}
			create(e, t) {
				let i = this.getColumns().map((o) => o.toSQL()),
					s = this.getColumnTypes(i);
				this.createAlterTableMethods && this.alterTableForCreate(s),
					this.createQuery(s, e, t),
					this.columnQueries(i),
					delete this.single.comment,
					this.alterTable();
			}
			createIfNot() {
				this.create(!0);
			}
			createLike() {
				this.create(!1, !0);
			}
			createLikeIfNot() {
				this.create(!0, !0);
			}
			alter() {
				let t = this.getColumns().map((a) => a.toSQL()),
					n = this.getColumns('alter'),
					i = n.map((a) => a.toSQL()),
					s = this.getColumnTypes(t),
					o = this.getColumnTypes(i);
				this.addColumns(s),
					this.alterColumns(o, n),
					this.columnQueries(t),
					this.columnQueries(i),
					this.alterTable();
			}
			foreign(e) {
				if (e.inTable && e.references) {
					let t = e.keyName
							? this.formatter.wrap(e.keyName)
							: this._indexCommand('foreign', this.tableNameRaw, e.column),
						n = this.formatter.columnize(e.column),
						i = this.formatter.columnize(e.references),
						s = this.formatter.wrap(e.inTable),
						o = e.onUpdate
							? (this.lowerCase ? ' on update ' : ' ON UPDATE ') + e.onUpdate
							: '',
						a = e.onDelete
							? (this.lowerCase ? ' on delete ' : ' ON DELETE ') + e.onDelete
							: '',
						u = e.deferrable
							? this.lowerCase
								? ` deferrable initially ${e.deferrable.toLowerCase()} `
								: ` DEFERRABLE INITIALLY ${e.deferrable.toUpperCase()} `
							: '';
					this.lowerCase
						? this.pushQuery(
								(this.forCreate ? '' : `alter table ${this.tableName()} add `) +
									'constraint ' +
									t +
									' foreign key (' +
									n +
									') references ' +
									s +
									' (' +
									i +
									')' +
									o +
									a +
									u
							)
						: this.pushQuery(
								(this.forCreate ? '' : `ALTER TABLE ${this.tableName()} ADD `) +
									'CONSTRAINT ' +
									t +
									' FOREIGN KEY (' +
									n +
									') REFERENCES ' +
									s +
									' (' +
									i +
									')' +
									o +
									a +
									u
							);
				}
			}
			getColumnTypes(e) {
				return e.reduce(
					function (t, n) {
						let i = n[0];
						return t.sql.push(i.sql), t.bindings.concat(i.bindings), t;
					},
					{sql: [], bindings: []}
				);
			}
			columnQueries(e) {
				let t = e.reduce(function (n, i) {
					let s = Uz(i);
					return t0(s) ? n : n.concat(s);
				}, []);
				for (let n of t) this.pushQuery(n);
			}
			addColumns(e, t) {
				if (((t = t || this.addColumnsPrefix), e.sql.length > 0)) {
					let n = e.sql.map((i) => t + i);
					this.pushQuery({
						sql:
							(this.lowerCase ? 'alter table ' : 'ALTER TABLE ') +
							this.tableName() +
							' ' +
							n.join(', '),
						bindings: e.bindings,
					});
				}
			}
			alterColumns(e, t) {
				e.sql.length > 0 && this.addColumns(e, this.alterColumnsPrefix, t);
			}
			getColumns(e) {
				let t = this.grouped.columns || [];
				e = e || 'add';
				let n = this.tableBuilder.queryContext();
				return t
					.filter((i) => i.builder._method === e)
					.map(
						(i) => (
							n !== void 0 &&
								i.builder.queryContext() === void 0 &&
								i.builder.queryContext(n),
							this.client.columnCompiler(this, i.builder)
						)
					);
			}
			tableName() {
				let e = this.schemaNameRaw
					? `${this.schemaNameRaw}.${this.tableNameRaw}`
					: this.tableNameRaw;
				return this.formatter.wrap(e);
			}
			tableNameLike() {
				let e = this.schemaNameRaw
					? `${this.schemaNameRaw}.${this.tableNameLikeRaw}`
					: this.tableNameLikeRaw;
				return this.formatter.wrap(e);
			}
			alterTable() {
				let e = this.grouped.alterTable || [];
				for (let t = 0, n = e.length; t < n; t++) {
					let i = e[t];
					this[i.method]
						? this[i.method].apply(this, i.args)
						: this.client.logger.error(`Debug: ${i.method} does not exist`);
				}
				for (let t in this.single)
					typeof this[t] == 'function' && this[t](this.single[t]);
			}
			alterTableForCreate(e) {
				this.forCreate = !0;
				let t = this.sequence,
					n = this.grouped.alterTable || [];
				this.grouped.alterTable = [];
				for (let i = 0, s = n.length; i < s; i++) {
					let o = n[i];
					if (Dz(this.createAlterTableMethods, o.method) < 0) {
						this.grouped.alterTable.push(o);
						continue;
					}
					this[o.method]
						? ((this.sequence = []),
							this[o.method].apply(this, o.args),
							e.sql.push(this.sequence[0].sql))
						: this.client.logger.error(`Debug: ${o.method} does not exist`);
				}
				(this.sequence = t), (this.forCreate = !1);
			}
			dropIndex(e) {
				this.pushQuery(`drop index${e}`);
			}
			dropUnique() {
				throw new Error('Method implemented in the dialect driver');
			}
			dropForeign() {
				throw new Error('Method implemented in the dialect driver');
			}
			dropColumn() {
				let e = Lz.normalizeArr.apply(null, arguments),
					t = (Array.isArray(e) ? e : [e]).map(
						(n) => this.dropColumnPrefix + this.formatter.wrap(n)
					);
				this.pushQuery(
					(this.lowerCase ? 'alter table ' : 'ALTER TABLE ') +
						this.tableName() +
						' ' +
						t.join(', ')
				);
			}
			_setNullableState(e, t) {
				let n = this.tableName(),
					i = this.formatter.columnize(e),
					s = this.alterColumnsPrefix;
				return this.pushQuery({
					sql: 'SELECT 1',
					output: () =>
						this.client
							.queryBuilder()
							.from(this.tableNameRaw)
							.columnInfo(e)
							.then((o) => {
								if (t0(o))
									throw new Error(
										`.setNullable: Column ${i} does not exist in table ${n}.`
									);
								let a = t ? 'null' : 'not null',
									u = o.type + (o.maxLength ? `(${o.maxLength})` : ''),
									c =
										o.defaultValue !== null && o.defaultValue !== void 0
											? `default '${o.defaultValue}'`
											: '',
									h = `alter table ${n} ${s} ${i} ${u} ${a} ${c}`;
								return this.client.raw(h);
							}),
				});
			}
			setNullable(e) {
				return this._setNullableState(e, !0);
			}
			dropNullable(e) {
				return this._setNullableState(e, !1);
			}
			dropChecks(e) {
				if (e === void 0) return '';
				e = Fz(e);
				let n = `alter table ${this.tableName()} ${e.map((i) => `drop constraint ${i}`).join(', ')}`;
				this.pushQuery(n);
			}
			check(e, t, n) {
				let i = this.tableName(),
					s = n;
				s || (this.checksCount++, (s = i + '_' + this.checksCount));
				let o = `alter table ${i} add constraint ${s} check(${e})`;
				this.pushQuery(o);
			}
			_addChecks() {
				return this.grouped.checks
					? ', ' +
							this.grouped.checks
								.map(
									(e) =>
										`${e.args[2] ? 'constraint ' + e.args[2] + ' ' : ''}check (${this.client.raw(e.args[0], e.args[1])})`
								)
								.join(', ')
					: '';
			}
			_indexCommand(e, t, n) {
				Array.isArray(n) || (n = n ? [n] : []);
				let s = (
					t.replace(/\.|-/g, '_') +
					'_' +
					n.join('_') +
					'_' +
					e
				).toLowerCase();
				return this.formatter.wrap(s);
			}
			_getPrimaryKeys() {
				return (this.grouped.alterTable || [])
					.filter((e) => e.method === 'primary')
					.flatMap((e) => e.args)
					.flat();
			}
			_canBeAddPrimaryKey(e) {
				return e.primaryKey && this._getPrimaryKeys().length === 0;
			}
			_getIncrementsColumnNames() {
				return this.grouped.columns
					.filter((e) => e.builder._type === 'increments')
					.map((e) => e.builder._args[0]);
			}
			_getBigIncrementsColumnNames() {
				return this.grouped.columns
					.filter((e) => e.builder._type === 'bigincrements')
					.map((e) => e.builder._args[0]);
			}
		};
	ke.prototype.pushQuery = Mz;
	ke.prototype.pushAdditional = $z;
	ke.prototype.unshiftQuery = jz;
	ke.prototype.lowerCase = !0;
	ke.prototype.createAlterTableMethods = null;
	ke.prototype.addColumnsPrefix = 'add column ';
	ke.prototype.alterColumnsPrefix = 'alter column ';
	ke.prototype.modifyColumnPrefix = 'modify column ';
	ke.prototype.dropColumnPrefix = 'drop column ';
	r0.exports = ke;
});
var Ki = l((Mde, i0) => {
	var Qz = Ji(),
		Hz = At(),
		n0 = _n(),
		{addQueryContext: Wz} = re(),
		Ue = class {
			constructor(e, t, n, i) {
				(this.client = e),
					(this._method = 'add'),
					(this._single = {}),
					(this._modifiers = {}),
					(this._statements = []),
					(this._type = Jz[n] || n),
					(this._args = i),
					(this._tableBuilder = t),
					t._method === 'alter' && Qz(this, Vo);
			}
			references(e) {
				return this._tableBuilder.foreign
					.call(this._tableBuilder, this._args[0], void 0, this)
					._columnBuilder(this)
					.references(e);
			}
		},
		Vz = [
			'default',
			'defaultsTo',
			'defaultTo',
			'unsigned',
			'nullable',
			'first',
			'after',
			'comment',
			'collate',
			'check',
			'checkPositive',
			'checkNegative',
			'checkIn',
			'checkNotIn',
			'checkBetween',
			'checkLength',
			'checkRegex',
		],
		Gz = {default: 'defaultTo', defaultsTo: 'defaultTo'};
	Vz.forEach(function (r) {
		let e = Gz[r] || r;
		Ue.prototype[r] = function () {
			return (this._modifiers[e] = n0(arguments)), this;
		};
	});
	Wz(Ue);
	Ue.prototype.notNull = Ue.prototype.notNullable = function () {
		return this.nullable(!1);
	};
	['index', 'primary', 'unique'].forEach(function (r) {
		Ue.prototype[r] = function () {
			return (
				this._type.toLowerCase().indexOf('increments') === -1 &&
					this._tableBuilder[r].apply(
						this._tableBuilder,
						[this._args[0]].concat(n0(arguments))
					),
				this
			);
		};
	});
	Ue.extend = (r, e) => {
		if (Object.prototype.hasOwnProperty.call(Ue.prototype, r))
			throw new Error(
				`Can't extend ColumnBuilder with existing method ('${r}').`
			);
		Hz(Ue.prototype, {[r]: e});
	};
	var Vo = {};
	Vo.drop = function () {
		return (this._single.drop = !0), this;
	};
	Vo.alterType = function (r) {
		return this._statements.push({grouping: 'alterType', value: r}), this;
	};
	Vo.alter = function ({alterNullable: r = !0, alterType: e = !0} = {}) {
		return (
			(this._method = 'alter'),
			(this.alterNullable = r),
			(this.alterType = e),
			this
		);
	};
	var Jz = {
		float: 'floating',
		enum: 'enu',
		boolean: 'bool',
		string: 'varchar',
		bigint: 'bigInteger',
	};
	i0.exports = Ue;
});
var o0 = l((jde, s0) => {
	function Kz(r) {
		return r && r.length ? r[0] : void 0;
	}
	s0.exports = Kz;
});
var u0 = l((Lde, a0) => {
	a0.exports = o0();
});
var Pt = l((Bde, c0) => {
	var ah = Gi(),
		zz = Qi(),
		Zz = u0(),
		Yz = Hi(),
		Xz = Mi(),
		{toNumber: Tn} = re(),
		{formatDefault: e5} = Ot(),
		{operator: oh} = ne(),
		F = class {
			constructor(e, t, n) {
				(this.client = e),
					(this.tableCompiler = t),
					(this.columnBuilder = n),
					(this._commonBuilder = this.columnBuilder),
					(this.args = n._args),
					(this.type = n._type.toLowerCase()),
					(this.grouped = zz(n._statements, 'grouping')),
					(this.modified = n._modifiers),
					(this.isIncrements = this.type.indexOf('increments') !== -1),
					(this.formatter = e.formatter(n)),
					(this.bindings = []),
					(this.formatter.bindings = this.bindings),
					(this.bindingsHolder = this),
					(this.sequence = []),
					(this.modifiers = []),
					(this.checksCount = 0);
			}
			_addCheckModifiers() {
				this.modifiers.push(
					'check',
					'checkPositive',
					'checkNegative',
					'checkIn',
					'checkNotIn',
					'checkBetween',
					'checkLength',
					'checkRegex'
				);
			}
			defaults(e) {
				if (Object.prototype.hasOwnProperty.call(this._defaultMap, e))
					return this._defaultMap[e].bind(this)();
				throw new Error(
					`There is no default for the specified identifier ${e}`
				);
			}
			toSQL() {
				return (
					this.pushQuery(this.compileColumn()),
					this.sequence.additional &&
						(this.sequence = this.sequence.concat(this.sequence.additional)),
					this.sequence
				);
			}
			compileColumn() {
				return (
					this.formatter.wrap(this.getColumnName()) +
					' ' +
					this.getColumnType() +
					this.getModifiers()
				);
			}
			getColumnName() {
				return Zz(this.args) || this.defaults('columnName');
			}
			getColumnType() {
				if (!this._columnType) {
					let e = this[this.type];
					this._columnType =
						typeof e == 'function' ? e.apply(this, Xz(this.args)) : e;
				}
				return this._columnType;
			}
			getModifiers() {
				let e = [];
				for (let t = 0, n = this.modifiers.length; t < n; t++) {
					let i = this.modifiers[t];
					if (
						(!this.isIncrements || (this.isIncrements && i === 'comment')) &&
						Yz(this.modified, i)
					) {
						let s = this[i].apply(this, this.modified[i]);
						s && e.push(s);
					}
				}
				return e.length > 0 ? ` ${e.join(' ')}` : '';
			}
			varchar(e) {
				return `varchar(${Tn(e, 255)})`;
			}
			floating(e, t) {
				return `float(${Tn(e, 8)}, ${Tn(t, 2)})`;
			}
			decimal(e, t) {
				if (e === null)
					throw new Error(
						'Specifying no precision on decimal columns is not supported for that SQL dialect.'
					);
				return `decimal(${Tn(e, 8)}, ${Tn(t, 2)})`;
			}
			specifictype(e) {
				return e;
			}
			nullable(e) {
				return e === !1 ? 'not null' : 'null';
			}
			notNullable() {
				return this.nullable(!1);
			}
			defaultTo(e) {
				return `default ${e5(e, this.type, this.client)}`;
			}
			increments(e = {primaryKey: !0}) {
				return (
					'integer not null' +
					(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '') +
					' autoincrement'
				);
			}
			bigincrements(e = {primaryKey: !0}) {
				return this.increments(e);
			}
			_pushAlterCheckQuery(e, t) {
				let n = t;
				n ||
					(this.checksCount++,
					(n =
						this.tableCompiler.tableNameRaw +
						'_' +
						this.getColumnName() +
						'_' +
						this.checksCount)),
					this.pushAdditional(function () {
						this.pushQuery(
							`alter table ${this.tableCompiler.tableName()} add constraint ${n} check(${e})`
						);
					});
			}
			_checkConstraintName(e) {
				return e ? `constraint ${e} ` : '';
			}
			_check(e, t) {
				return this.columnBuilder._method === 'alter'
					? (this._pushAlterCheckQuery(e, t), '')
					: `${this._checkConstraintName(t)}check (${e})`;
			}
			checkPositive(e) {
				return this._check(
					`${this.formatter.wrap(this.getColumnName())} ${oh('>', this.columnBuilder, this.bindingsHolder)} 0`,
					e
				);
			}
			checkNegative(e) {
				return this._check(
					`${this.formatter.wrap(this.getColumnName())} ${oh('<', this.columnBuilder, this.bindingsHolder)} 0`,
					e
				);
			}
			_checkIn(e, t, n) {
				return this._check(
					`${this.formatter.wrap(this.getColumnName())} ${n ? 'not ' : ''}in (${e.map((i) => this.client._escapeBinding(i)).join(',')})`,
					t
				);
			}
			checkIn(e, t) {
				return this._checkIn(e, t);
			}
			checkNotIn(e, t) {
				return this._checkIn(e, t, !0);
			}
			checkBetween(e, t) {
				e.length === 2 &&
					!Array.isArray(e[0]) &&
					!Array.isArray(e[1]) &&
					(e = [e]);
				let n = e
					.map(
						(i) =>
							`${this.formatter.wrap(this.getColumnName())} between ${this.client._escapeBinding(i[0])} and ${this.client._escapeBinding(i[1])}`
					)
					.join(' or ');
				return this._check(n, t);
			}
			checkLength(e, t, n) {
				return this._check(
					`length(${this.formatter.wrap(this.getColumnName())}) ${oh(e, this.columnBuilder, this.bindingsHolder)} ${Tn(t)}`,
					n
				);
			}
		};
	F.prototype.binary = 'blob';
	F.prototype.bool = 'boolean';
	F.prototype.date = 'date';
	F.prototype.datetime = 'datetime';
	F.prototype.time = 'time';
	F.prototype.timestamp = 'timestamp';
	F.prototype.geometry = 'geometry';
	F.prototype.geography = 'geography';
	F.prototype.point = 'point';
	F.prototype.enu = 'varchar';
	F.prototype.bit = F.prototype.json = 'text';
	F.prototype.uuid = ({useBinaryUuid: r = !1, primaryKey: e = !1} = {}) =>
		r ? 'binary(16)' : 'char(36)';
	F.prototype.integer =
		F.prototype.smallint =
		F.prototype.mediumint =
			'integer';
	F.prototype.biginteger = 'bigint';
	F.prototype.text = 'text';
	F.prototype.tinyint = 'tinyint';
	F.prototype.pushQuery = ah.pushQuery;
	F.prototype.pushAdditional = ah.pushAdditional;
	F.prototype.unshiftQuery = ah.unshiftQuery;
	F.prototype._defaultMap = {
		columnName: function () {
			if (!this.isIncrements)
				throw new Error(
					`You did not specify a column name for the ${this.type} column.`
				);
			return 'id';
		},
	};
	c0.exports = F;
});
var h0 = l((Dde, l0) => {
	var t5 = vr(),
		uh = class extends t5 {
			constructor(e, t) {
				super(e), (this.ref = t), (this._schema = null), (this._alias = null);
			}
			withSchema(e) {
				return (this._schema = e), this;
			}
			as(e) {
				return (this._alias = e), this;
			}
			toSQL() {
				let e = this._schema ? `${this._schema}.${this.ref}` : this.ref,
					t = this.client.formatter(this),
					n = t.columnize(e),
					i = this._alias ? `${n} as ${t.wrap(this._alias)}` : n;
				return this.set(i, []), super.toSQL(...arguments);
			}
		};
	l0.exports = uh;
});
var zi = l((Ude, d0) => {
	var {columnize: r5, wrap: n5} = ne(),
		ch = class {
			constructor(e, t) {
				(this.client = e), (this.builder = t), (this.bindings = []);
			}
			columnize(e) {
				return r5(e, this.builder, this.client, this);
			}
			wrap(e, t) {
				return n5(e, t, this.builder, this.client, this);
			}
		};
	d0.exports = ch;
});
var An = l((Fde, f0) => {
	var i5 = re(),
		s5 = Ji(),
		o5 = At(),
		Cr = class {
			constructor(e, t, n, i) {
				(this.client = e),
					(this._method = t),
					(this._schemaName = void 0),
					(this._columns = void 0),
					(this._fn = i),
					(this._viewName = n),
					(this._statements = []),
					(this._single = {});
			}
			setSchema(e) {
				this._schemaName = e;
			}
			columns(e) {
				this._columns = e;
			}
			as(e) {
				this._selectQuery = e;
			}
			checkOption() {
				throw new Error(
					'check option definition is not supported by this dialect.'
				);
			}
			localCheckOption() {
				throw new Error(
					'check option definition is not supported by this dialect.'
				);
			}
			cascadedCheckOption() {
				throw new Error(
					'check option definition is not supported by this dialect.'
				);
			}
			toSQL() {
				return (
					this._method === 'alter' && s5(this, a5),
					this._fn.call(this, this),
					this.client.viewCompiler(this).toSQL()
				);
			}
		},
		a5 = {
			column(r) {
				let e = this;
				return {
					rename: function (t) {
						return (
							e._statements.push({
								grouping: 'alterView',
								method: 'renameColumn',
								args: [r, t],
							}),
							this
						);
					},
					defaultTo: function (t) {
						return (
							e._statements.push({
								grouping: 'alterView',
								method: 'defaultTo',
								args: [r, t],
							}),
							this
						);
					},
				};
			},
		};
	i5.addQueryContext(Cr);
	Cr.extend = (r, e) => {
		if (Object.prototype.hasOwnProperty.call(Cr.prototype, r))
			throw new Error(
				`Can't extend ViewBuilder with existing method ('${r}').`
			);
		o5(Cr.prototype, {[r]: e});
	};
	f0.exports = Cr;
});
var qr = l((Qde, p0) => {
	var {pushQuery: u5} = Gi(),
		c5 = Qi(),
		{columnize: l5} = ne(),
		Go = class {
			constructor(e, t) {
				(this.client = e),
					(this.viewBuilder = t),
					(this._commonBuilder = this.viewBuilder),
					(this.method = t._method),
					(this.schemaNameRaw = t._schemaName),
					(this.viewNameRaw = t._viewName),
					(this.single = t._single),
					(this.selectQuery = t._selectQuery),
					(this.columns = t._columns),
					(this.grouped = c5(t._statements, 'grouping')),
					(this.formatter = e.formatter(t)),
					(this.bindings = []),
					(this.formatter.bindings = this.bindings),
					(this.bindingsHolder = this),
					(this.sequence = []);
			}
			toSQL() {
				return this[this.method](), this.sequence;
			}
			create() {
				this.createQuery(this.columns, this.selectQuery);
			}
			createOrReplace() {
				throw new Error('replace views is not supported by this dialect.');
			}
			createMaterializedView() {
				throw new Error(
					'materialized views are not supported by this dialect.'
				);
			}
			createQuery(e, t, n, i) {
				let s =
						'create ' +
						(n ? 'materialized ' : '') +
						(i ? 'or replace ' : '') +
						'view ',
					o = e
						? ' (' +
							l5(e, this.viewBuilder, this.client, this.bindingsHolder) +
							')'
						: '',
					a = s + this.viewName() + o;
				switch (((a += ' as '), (a += t.toString()), this.single.checkOption)) {
					case 'default_option':
						a += ' with check option';
						break;
					case 'local':
						a += ' with local check option';
						break;
					case 'cascaded':
						a += ' with cascaded check option';
						break;
					default:
						break;
				}
				this.pushQuery({sql: a});
			}
			renameView(e, t) {
				throw new Error(
					'rename view is not supported by this dialect (instead drop, then create another view).'
				);
			}
			refreshMaterializedView() {
				throw new Error(
					'materialized views are not supported by this dialect.'
				);
			}
			alter() {
				this.alterView();
			}
			alterView() {
				let e = this.grouped.alterView || [];
				for (let t = 0, n = e.length; t < n; t++) {
					let i = e[t];
					this[i.method]
						? this[i.method].apply(this, i.args)
						: this.client.logger.error(`Debug: ${i.method} does not exist`);
				}
				for (let t in this.single)
					typeof this[t] == 'function' && this[t](this.single[t]);
			}
			renameColumn(e, t) {
				throw new Error(
					'rename column of views is not supported by this dialect.'
				);
			}
			defaultTo(e, t) {
				throw new Error(
					'change default values of views is not supported by this dialect.'
				);
			}
			viewName() {
				let e = this.schemaNameRaw
					? `${this.schemaNameRaw}.${this.viewNameRaw}`
					: this.viewNameRaw;
				return this.formatter.wrap(e);
			}
		};
	Go.prototype.pushQuery = u5;
	p0.exports = Go;
});
var kt = l((Hde, g0) => {
	var {Pool: h5, TimeoutError: d5} = Hp(),
		{EventEmitter: f5} = _('events'),
		{promisify: p5} = _('util'),
		{makeEscape: m5} = Ws(),
		g5 = Ob(),
		y5 = Oc(),
		b5 = Rc(),
		_5 = a_(),
		w5 = lt(),
		{executeQuery: v5, enrichQueryObject: m0} = Dl(),
		E5 = Ze(),
		x5 = It(),
		C5 = th(),
		q5 = Er(),
		T5 = sh(),
		A5 = xr(),
		S5 = Ki(),
		O5 = Pt(),
		{KnexTimeoutError: R5} = yr(),
		{outputQuery: N5, unwrapRaw: I5} = ne(),
		{compileCallback: P5} = Ot(),
		k5 = vr(),
		$5 = h0(),
		M5 = zi(),
		j5 = vo(),
		{POOL_CONFIG_OPTIONS: L5} = Io(),
		B5 = An(),
		D5 = qr(),
		U5 = ze(),
		{setHiddenProperty: Jo} = Ao(),
		lh = Pe()('knex:client'),
		Ko = class extends f5 {
			constructor(e = {}) {
				if (
					(super(),
					(this.config = e),
					(this.logger = new j5(e)),
					this.config.connection &&
						this.config.connection.password &&
						Jo(this.config.connection),
					this.dialect &&
						!this.config.client &&
						this.logger.warn(
							"Using 'this.dialect' to identify the client is deprecated and support for it will be removed in the future. Please use configuration option 'client' instead."
						),
					!(this.config.client || this.dialect))
				)
					throw new Error(
						"knex: Required configuration option 'client' is missing."
					);
				e.version && (this.version = e.version),
					e.connection && e.connection instanceof Function
						? ((this.connectionConfigProvider = e.connection),
							(this.connectionConfigExpirationChecker = () => !0))
						: ((this.connectionSettings = g5(e.connection || {})),
							e.connection &&
								e.connection.password &&
								Jo(this.connectionSettings, e.connection),
							(this.connectionConfigExpirationChecker = null)),
					this.driverName &&
						e.connection &&
						(this.initializeDriver(),
						(!e.pool || (e.pool && e.pool.max !== 0)) &&
							this.initializePool(e)),
					(this.valueForUndefined = this.raw('DEFAULT')),
					e.useNullAsDefault && (this.valueForUndefined = null);
			}
			formatter(e) {
				return new M5(this, e);
			}
			queryBuilder() {
				return new E5(this);
			}
			queryCompiler(e, t) {
				return new x5(this, e, t);
			}
			schemaBuilder() {
				return new C5(this);
			}
			schemaCompiler(e) {
				return new q5(this, e);
			}
			tableBuilder(e, t, n, i) {
				return new T5(this, e, t, n, i);
			}
			viewBuilder(e, t, n) {
				return new B5(this, e, t, n);
			}
			tableCompiler(e) {
				return new A5(this, e);
			}
			viewCompiler(e) {
				return new D5(this, e);
			}
			columnBuilder(e, t, n) {
				return new S5(this, e, t, n);
			}
			columnCompiler(e, t) {
				return new O5(this, e, t);
			}
			runner(e) {
				return new _5(this, e);
			}
			transaction(e, t, n) {
				return new w5(this, e, t, n);
			}
			raw() {
				return new k5(this).set(...arguments);
			}
			ref() {
				return new $5(this, ...arguments);
			}
			query(e, t) {
				let n = m0(e, t, this);
				return v5(e, n, this);
			}
			stream(e, t, n, i) {
				let s = m0(e, t, this);
				return this._stream(e, s, n, i);
			}
			prepBindings(e) {
				return e;
			}
			positionBindings(e) {
				return e;
			}
			postProcessResponse(e, t) {
				return this.config.postProcessResponse
					? this.config.postProcessResponse(e, t)
					: e;
			}
			wrapIdentifier(e, t) {
				return this.customWrapIdentifier(e, this.wrapIdentifierImpl, t);
			}
			customWrapIdentifier(e, t, n) {
				return this.config.wrapIdentifier
					? this.config.wrapIdentifier(e, t, n)
					: t(e);
			}
			wrapIdentifierImpl(e) {
				return e !== '*' ? `"${e.replace(/"/g, '""')}"` : '*';
			}
			initializeDriver() {
				try {
					this.driver = this._driver();
				} catch (e) {
					let t = `Knex: run
$ npm install ${this.driverName} --save`;
					throw (
						(this.logger.error(`${t}
${e.message}
${e.stack}`),
						new Error(`${t}
${e.message}`))
					);
				}
			}
			poolDefaults() {
				return {min: 2, max: 10, propagateCreateError: !0};
			}
			getPoolSettings(e) {
				(e = y5({}, e, this.poolDefaults())),
					L5.forEach((s) => {
						s in e &&
							this.logger.warn(
								[
									`Pool config option "${s}" is no longer supported.`,
									'See https://github.com/Vincit/tarn.js for possible pool config options.',
								].join(' ')
							);
					});
				let t = 6e4,
					n = [
						this.config.acquireConnectionTimeout,
						e.acquireTimeoutMillis,
					].filter((s) => s !== void 0);
				n.length || n.push(t), (e.acquireTimeoutMillis = Math.min(...n));
				let i = async () => {
					if (
						!this.connectionConfigProvider ||
						!this.connectionConfigExpirationChecker ||
						!this.connectionConfigExpirationChecker()
					)
						return;
					let s = await this.connectionConfigProvider();
					s.expirationChecker
						? ((this.connectionConfigExpirationChecker = s.expirationChecker),
							delete s.expirationChecker)
						: (this.connectionConfigExpirationChecker = null),
						(this.connectionSettings = s);
				};
				return Object.assign(e, {
					create: async () => {
						await i();
						let s = await this.acquireRawConnection();
						return (
							(s.__knexUid = b5('__knexUid')),
							e.afterCreate && (await p5(e.afterCreate)(s)),
							s
						);
					},
					destroy: (s) => {
						if (s !== void 0) return this.destroyRawConnection(s);
					},
					validate: (s) =>
						s.__knex__disposed
							? (this.logger.warn(`Connection Error: ${s.__knex__disposed}`),
								!1)
							: this.validateConnection(s),
				});
			}
			initializePool(e = this.config) {
				if (this.pool) {
					this.logger.warn('The pool has already been initialized');
					return;
				}
				let t = {...this.getPoolSettings(e.pool)};
				t.afterCreate && delete t.afterCreate, (this.pool = new h5(t));
			}
			validateConnection(e) {
				return !0;
			}
			async acquireConnection() {
				if (!this.pool) throw new Error('Unable to acquire a connection');
				try {
					let e = await this.pool.acquire().promise;
					return (
						lh('acquired connection from pool: %s', e.__knexUid),
						e.config &&
							(e.config.password && Jo(e.config),
							e.config.authentication &&
								e.config.authentication.options &&
								e.config.authentication.options.password &&
								Jo(e.config.authentication.options)),
						e
					);
				} catch (e) {
					let t = e;
					throw (
						(e instanceof d5 &&
							(t = new R5(
								'Knex: Timeout acquiring a connection. The pool is probably full. Are you missing a .transacting(trx) call?'
							)),
						t)
					);
				}
			}
			releaseConnection(e) {
				return (
					lh('releasing connection to pool: %s', e.__knexUid),
					this.pool.release(e) ||
						lh('pool refused connection: %s', e.__knexUid),
					Promise.resolve()
				);
			}
			async destroy(e) {
				try {
					this.pool && this.pool.destroy && (await this.pool.destroy()),
						(this.pool = void 0),
						typeof e == 'function' && e();
				} catch (t) {
					if (typeof e == 'function') return e(t);
					throw t;
				}
			}
			database() {
				return this.connectionSettings.database;
			}
			toString() {
				return '[object KnexClient]';
			}
			assertCanCancelQuery() {
				if (!this.canCancelQuery)
					throw new Error('Query cancelling not supported for this dialect');
			}
			cancelQuery() {
				throw new Error('Query cancelling not supported for this dialect');
			}
			alias(e, t) {
				return e + ' as ' + t;
			}
			parameter(e, t, n) {
				return typeof e == 'function'
					? N5(P5(e, void 0, this, n), !0, t, this)
					: I5(e, !0, t, this, n) || '?';
			}
			parameterize(e, t, n, i) {
				if (typeof e == 'function') return this.parameter(e, n, i);
				e = Array.isArray(e) ? e : [e];
				let s = '',
					o = -1;
				for (; ++o < e.length; ) {
					o > 0 && (s += ', ');
					let a = e[o];
					U5(a) && (a = JSON.stringify(a)),
						(s += this.parameter(a === void 0 ? t : a, n, i));
				}
				return s;
			}
			values(e, t, n) {
				return Array.isArray(e)
					? Array.isArray(e[0])
						? `(${e.map((i) => `(${this.parameterize(i, void 0, t, n)})`).join(', ')})`
						: `(${this.parameterize(e, void 0, t, n)})`
					: e && e.isRawInstance
						? `(${this.parameter(e, t, n)})`
						: this.parameter(e, t, n);
			}
			processPassedConnection(e) {}
			toPathForJson(e) {
				return e;
			}
		};
	Object.assign(Ko.prototype, {
		_escapeBinding: m5({
			escapeString(r) {
				return `'${r.replace(/'/g, "''")}'`;
			},
		}),
		canCancelQuery: !1,
	});
	g0.exports = Ko;
});
var b0 = l((Wde, y0) => {
	'use strict';
	function hh(r) {
		if (r.charAt(0) === '/') {
			let a = r.split(' ');
			return {host: a[0], database: a[1]};
		}
		let e = {},
			t,
			n = !1;
		/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) &&
			(r = encodeURI(r).replace(/\%25(\d\d)/g, '%$1'));
		try {
			t = new URL(r, 'postgres://base');
		} catch {
			(t = new URL(r.replace('@/', '@___DUMMY___/'), 'postgres://base')),
				(n = !0);
		}
		for (let a of t.searchParams.entries()) e[a[0]] = a[1];
		if (
			((e.user = e.user || decodeURIComponent(t.username)),
			(e.password = e.password || decodeURIComponent(t.password)),
			t.protocol == 'socket:')
		)
			return (
				(e.host = decodeURI(t.pathname)),
				(e.database = t.searchParams.get('db')),
				(e.client_encoding = t.searchParams.get('encoding')),
				e
			);
		let i = n ? '' : t.hostname;
		e.host
			? i && /^%2f/i.test(i) && (t.pathname = i + t.pathname)
			: (e.host = decodeURIComponent(i)),
			e.port || (e.port = t.port);
		let s = t.pathname.slice(1) || null;
		(e.database = s ? decodeURI(s) : null),
			(e.ssl === 'true' || e.ssl === '1') && (e.ssl = !0),
			e.ssl === '0' && (e.ssl = !1),
			(e.sslcert || e.sslkey || e.sslrootcert || e.sslmode) && (e.ssl = {});
		let o = e.sslcert || e.sslkey || e.sslrootcert ? _('fs') : null;
		switch (
			(e.sslcert && (e.ssl.cert = o.readFileSync(e.sslcert).toString()),
			e.sslkey && (e.ssl.key = o.readFileSync(e.sslkey).toString()),
			e.sslrootcert && (e.ssl.ca = o.readFileSync(e.sslrootcert).toString()),
			e.sslmode)
		) {
			case 'disable': {
				e.ssl = !1;
				break;
			}
			case 'prefer':
			case 'require':
			case 'verify-ca':
			case 'verify-full':
				break;
			case 'no-verify': {
				e.ssl.rejectUnauthorized = !1;
				break;
			}
		}
		return e;
	}
	y0.exports = hh;
	hh.parse = hh;
});
var w0 = l((Vde, _0) => {
	var {parse: F5} = b0(),
		Q5 = F5,
		H5 = process && process.platform && process.platform === 'win32';
	function W5(r) {
		try {
			return new URL(r);
		} catch {
			return null;
		}
	}
	_0.exports = function (e) {
		let t = W5(e),
			n = H5 && t && t.protocol.length === 2;
		if (!t || n) return {client: 'sqlite3', connection: {filename: e}};
		let {protocol: i} = t;
		i.slice(-1) === ':' && (i = i.slice(0, -1));
		let s = ['postgresql', 'postgres'].includes(i);
		return {client: i, connection: s ? Q5(e) : V5(t)};
	};
	function V5(r) {
		let e = {},
			t = r.pathname;
		if (
			(t[0] === '/' && (t = t.slice(1)),
			(e.database = t),
			r.hostname &&
				(r.protocol.indexOf('mssql') === 0
					? (e.server = r.hostname)
					: (e.host = r.hostname)),
			r.port && (e.port = r.port),
			(r.username || r.password) && (e.user = decodeURIComponent(r.username)),
			r.password && (e.password = decodeURIComponent(r.password)),
			r.searchParams)
		)
			for (let [n, i] of r.searchParams.entries())
				if (['mysql:', 'mariadb:', 'mssql:'].includes(r.protocol))
					try {
						e[n] = JSON.parse(i);
					} catch {
						e[n] = i;
					}
				else e[n] = i;
		return e;
	}
});
var E0 = l((Gde, v0) => {
	var G5 = lt(),
		dh = class extends G5 {
			begin(e) {
				return (
					this.isolationLevel &&
						this.client.logger.warn(
							'sqlite3 only supports serializable transactions, ignoring the isolation level param'
						),
					this.readOnly &&
						this.client.logger.warn(
							'sqlite3 implicitly handles read vs write transactions'
						),
					this.query(e, 'BEGIN;')
				);
			}
		};
	v0.exports = dh;
});
var T0 = l((Jde, q0) => {
	var J5 = Sc(),
		K5 = bn(),
		z5 = ge(),
		x0 = we(),
		Z5 = En(),
		Y5 = It(),
		X5 = Ll(),
		{isString: e8} = U(),
		{wrapString: C0, columnize: t8} = ne(),
		zo = J5(''),
		fh = class extends Y5 {
			constructor(e, t, n) {
				super(e, t, n),
					(this.forShare = zo),
					(this.forKeyShare = zo),
					(this.forUpdate = zo),
					(this.forNoKeyUpdate = zo);
			}
			insert() {
				let e = this.single.insert || [],
					t = this.with() + `insert into ${this.tableName} `;
				if (Array.isArray(e)) {
					if (e.length === 0) return '';
					if (e.length === 1 && e[0] && x0(e[0]))
						return {sql: t + this._emptyInsertValue};
				} else if (typeof e == 'object' && x0(e))
					return {sql: t + this._emptyInsertValue};
				let n = this._prepInsert(e);
				if (e8(n)) return {sql: t + n};
				if (n.columns.length === 0) return {sql: ''};
				if (
					((t += `(${this.formatter.columnize(n.columns)})`),
					this.client.valueForUndefined !== null &&
						n.values.forEach((h) => {
							K5(h, (d) => {
								if (d === void 0)
									throw new TypeError(
										'`sqlite` does not support inserting default values. Specify values explicitly or use the `useNullAsDefault` config flag. (see docs https://knexjs.org/guide/query-builder.html#insert).'
									);
							});
						}),
					n.values.length === 1)
				) {
					let h = this.client.parameterize(
						n.values[0],
						this.client.valueForUndefined,
						this.builder,
						this.bindingsHolder
					);
					t += ` values (${h})`;
					let {onConflict: d, ignore: f, merge: m} = this.single;
					if (d && f) t += this._ignore(d);
					else if (d && m) {
						t += this._merge(m.updates, d, e);
						let y = this.where();
						y && (t += ` ${y}`);
					}
					let {returning: g} = this.single;
					return g && (t += this._returning(g)), {sql: t, returning: g};
				}
				let i = [],
					s = -1;
				for (; ++s < n.values.length; ) {
					let h = -1,
						d = (i[s] = []),
						f = n.values[s];
					for (
						f = f === void 0 ? this.client.valueForUndefined : f;
						++h < n.columns.length;

					)
						d.push(
							this.client.alias(
								this.client.parameter(f[h], this.builder, this.bindingsHolder),
								this.formatter.wrap(n.columns[h])
							)
						);
					i[s] = d.join(', ');
				}
				t += ' select ' + i.join(' union all select ');
				let {onConflict: o, ignore: a, merge: u} = this.single;
				o && a
					? (t += ' where true' + this._ignore(o))
					: o && u && (t += ' where true' + this._merge(u.updates, o, e));
				let {returning: c} = this.single;
				return c && (t += this._returning(c)), {sql: t, returning: c};
			}
			update() {
				let e = this.with(),
					t = this._prepUpdate(this.single.update),
					n = this.where(),
					{returning: i} = this.single;
				return {
					sql:
						e +
						`update ${this.single.only ? 'only ' : ''}${this.tableName} set ${t.join(', ')}` +
						(n ? ` ${n}` : '') +
						this._returning(i),
					returning: i,
				};
			}
			_ignore(e) {
				return e === !0
					? ' on conflict do nothing'
					: ` on conflict ${this._onConflictClause(e)} do nothing`;
			}
			_merge(e, t, n) {
				let i = ` on conflict ${this._onConflictClause(t)} do update set `;
				if (e && Array.isArray(e))
					return (
						(i += e
							.map((s) =>
								C0(
									s.split('.').pop(),
									this.formatter.builder,
									this.client,
									this.formatter
								)
							)
							.map((s) => `${s} = excluded.${s}`)
							.join(', ')),
						i
					);
				if (e && typeof e == 'object') {
					let s = this._prepUpdate(e);
					return typeof s == 'string' ? (i += s) : (i += s.join(',')), i;
				} else {
					let s = this._prepInsert(n);
					if (typeof s == 'string')
						throw new Error(
							'If using merge with a raw insert query, then updates must be provided'
						);
					return (
						(i += s.columns
							.map((o) => C0(o.split('.').pop(), this.builder, this.client))
							.map((o) => `${o} = excluded.${o}`)
							.join(', ')),
						i
					);
				}
			}
			_returning(e) {
				return e ? ` returning ${this.formatter.columnize(e)}` : '';
			}
			truncate() {
				let {table: e} = this.single;
				return {
					sql: `delete from ${this.tableName}`,
					output() {
						return this.query({
							sql: `delete from sqlite_sequence where name = '${e}'`,
						}).catch(X5);
					},
				};
			}
			columnInfo() {
				let e = this.single.columnInfo;
				return {
					sql: `PRAGMA table_info(\`${this.client.customWrapIdentifier(this.single.table, z5)}\`)`,
					output(n) {
						let i = /.*\((\d+)\)/,
							s = Z5(
								n,
								function (o, a) {
									let {type: u} = a,
										c = u.match(i);
									return (
										c && (c = c[1]),
										(u = c ? u.split('(')[0] : u),
										(o[a.name] = {
											type: u.toLowerCase(),
											maxLength: c,
											nullable: !a.notnull,
											defaultValue: a.dflt_value,
										}),
										o
									);
								},
								{}
							);
						return (e && s[e]) || s;
					},
				};
			}
			limit() {
				let e = !this.single.limit && this.single.limit !== 0;
				return e && !this.single.offset
					? ''
					: ((this.single.limit = e ? -1 : this.single.limit),
						`limit ${this._getValueOrParameterFromAttribute('limit')}`);
			}
			jsonExtract(e) {
				return this._jsonExtract('json_extract', e);
			}
			jsonSet(e) {
				return this._jsonSet('json_set', e);
			}
			jsonInsert(e) {
				return this._jsonSet('json_insert', e);
			}
			jsonRemove(e) {
				let t = `json_remove(${t8(e.column, this.builder, this.client, this.bindingsHolder)},${this.client.parameter(e.path, this.builder, this.bindingsHolder)})`;
				return e.alias ? this.client.alias(t, this.formatter.wrap(e.alias)) : t;
			}
			whereJsonPath(e) {
				return this._whereJsonPath('json_extract', e);
			}
			whereJsonSupersetOf(e) {
				throw new Error(
					'Json superset where clause not actually supported by SQLite'
				);
			}
			whereJsonSubsetOf(e) {
				throw new Error(
					'Json subset where clause not actually supported by SQLite'
				);
			}
			onJsonPathEquals(e) {
				return this._onJsonPathEquals('json_extract', e);
			}
		};
	q0.exports = fh;
});
var S0 = l((Kde, A0) => {
	var r8 = wr();
	function n8(r, e) {
		var t;
		return (
			r8(r, function (n, i, s) {
				return (t = e(n, i, s)), !t;
			}),
			!!t
		);
	}
	A0.exports = n8;
});
var R0 = l((zde, O0) => {
	var i8 = Yc(),
		s8 = De(),
		o8 = S0(),
		a8 = V(),
		u8 = pr();
	function c8(r, e, t) {
		var n = a8(r) ? i8 : o8;
		return t && u8(r, e, t) && (e = void 0), n(r, s8(e, 3));
	}
	O0.exports = c8;
});
var I0 = l((Zde, N0) => {
	var l8 = Er(),
		h8 = R0(),
		ph = class extends l8 {
			constructor(e, t) {
				super(e, t);
			}
			hasTable(e) {
				let t = `select * from sqlite_master where type = 'table' and name = ${this.client.parameter(this.formatter.wrap(e).replace(/`/g, ''), this.builder, this.bindingsHolder)}`;
				this.pushQuery({sql: t, output: (n) => n.length > 0});
			}
			hasColumn(e, t) {
				this.pushQuery({
					sql: `PRAGMA table_info(${this.formatter.wrap(e)})`,
					output(n) {
						return h8(
							n,
							(i) =>
								this.client.wrapIdentifier(i.name.toLowerCase()) ===
								this.client.wrapIdentifier(t.toLowerCase())
						);
					},
				});
			}
			renameTable(e, t) {
				this.pushQuery(
					`alter table ${this.formatter.wrap(e)} rename to ${this.formatter.wrap(t)}`
				);
			}
			async generateDdlCommands() {
				let e = this.builder._sequence;
				for (let n = 0, i = e.length; n < i; n++) {
					let s = e[n];
					this[s.method].apply(this, s.args);
				}
				let t = this.sequence;
				if (t.length === 1 && t[0].statementsProducer)
					return t[0].statementsProducer();
				{
					let n = [];
					for (let i of t) {
						let s = i.sql;
						Array.isArray(s) ? n.push(...s) : n.push(s);
					}
					return {pre: [], sql: n, check: null, post: []};
				}
			}
		};
	N0.exports = ph;
});
var k0 = l((Yde, P0) => {
	var d8 = Pt(),
		Fe = class extends d8 {
			constructor() {
				super(...arguments),
					(this.modifiers = ['nullable', 'defaultTo']),
					this._addCheckModifiers();
			}
			enu(e) {
				return `text check (${this.formatter.wrap(this.args[0])} in ('${e.join("', '")}'))`;
			}
			_pushAlterCheckQuery(e, t) {
				throw new Error(
					'Alter table with to add constraints is not permitted in SQLite'
				);
			}
			checkRegex(e, t) {
				return this._check(
					`${this.formatter.wrap(this.getColumnName())} REGEXP ${this.client._escapeBinding(e)}`,
					t
				);
			}
		};
	Fe.prototype.json = 'json';
	Fe.prototype.jsonb = 'json';
	Fe.prototype.double = Fe.prototype.decimal = Fe.prototype.floating = 'float';
	Fe.prototype.timestamp = 'datetime';
	Fe.prototype.increments = Fe.prototype.bigincrements =
		'integer not null primary key autoincrement';
	P0.exports = Fe;
});
var M0 = l((Xde, $0) => {
	var f8 = Ys(),
		p8 = Ul(),
		m8 = De(),
		g8 = V();
	function y8(r, e) {
		var t = g8(r) ? f8 : p8;
		return t(r, m8(e, 3));
	}
	$0.exports = y8;
});
var B0 = l((efe, L0) => {
	var j0 = M0(),
		b8 = To(),
		Xe = ge(),
		{isObject: mh} = U(),
		_8 = xr(),
		{formatDefault: w8} = Ot(),
		gh = class extends _8 {
			constructor() {
				super(...arguments);
			}
			createQuery(e, t, n) {
				let s =
					(t ? 'create table if not exists ' : 'create table ') +
					this.tableName();
				n && this.tableNameLike()
					? (s += ' as select * from ' + this.tableNameLike() + ' where 0=1')
					: ((s += ' (' + e.sql.join(', ')),
						(s += this.foreignKeys() || ''),
						(s += this.primaryKeys() || ''),
						(s += this._addChecks()),
						(s += ')')),
					this.pushQuery(s),
					n && this.addColumns(e, this.addColumnsPrefix);
			}
			addColumns(e, t, n) {
				if (t === this.alterColumnsPrefix) {
					let i = this,
						s = n.map((o) => {
							let a = this.client.customWrapIdentifier(
									o.getColumnName(),
									Xe,
									o.columnBuilder.queryContext()
								),
								u = o.getColumnType(),
								c = o.modified.defaultTo
									? w8(o.modified.defaultTo[0], o.type, this.client)
									: null,
								h = o.modified.nullable && o.modified.nullable[0] === !1;
							return {name: a, type: u, defaultTo: c, notNull: h};
						});
					this.pushQuery({
						sql: `PRAGMA table_info(${this.tableName()})`,
						statementsProducer(o, a) {
							return i.client.ddl(i, o, a).alterColumn(s);
						},
					});
				} else
					for (let i = 0, s = e.sql.length; i < s; i++)
						this.pushQuery({
							sql: `alter table ${this.tableName()} add column ${e.sql[i]}`,
							bindings: e.bindings[i],
						});
			}
			dropUnique(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('unique', this.tableNameRaw, e)),
					this.pushQuery(`drop index ${t}`);
			}
			dropForeign(e, t) {
				let n = this;
				(e = Array.isArray(e) ? e : [e]),
					(e = e.map((i) => this.client.customWrapIdentifier(i, Xe))),
					(t = this.client.customWrapIdentifier(t, Xe)),
					this.pushQuery({
						sql: `PRAGMA table_info(${this.tableName()})`,
						output(i) {
							return n.client.ddl(n, i, this.connection).dropForeign(e, t);
						},
					});
			}
			dropPrimary(e) {
				let t = this;
				(e = this.client.customWrapIdentifier(e, Xe)),
					this.pushQuery({
						sql: `PRAGMA table_info(${this.tableName()})`,
						output(n) {
							return t.client.ddl(t, n, this.connection).dropPrimary(e);
						},
					});
			}
			dropIndex(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e)),
					this.pushQuery(`drop index ${t}`);
			}
			unique(e, t) {
				let n, i;
				mh(t) && ({indexName: t, deferrable: n, predicate: i} = t),
					n &&
						n !== 'not deferrable' &&
						this.client.logger.warn(
							`sqlite3: unique index \`${t}\` will not be deferrable ${n} because sqlite3 does not support deferred constraints.`
						),
					(t = t
						? this.formatter.wrap(t)
						: this._indexCommand('unique', this.tableNameRaw, e)),
					(e = this.formatter.columnize(e));
				let s = i ? ' ' + this.client.queryCompiler(i).where() : '';
				this.pushQuery(
					`create unique index ${t} on ${this.tableName()} (${e})${s}`
				);
			}
			index(e, t, n) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e)),
					(e = this.formatter.columnize(e));
				let i;
				mh(n) && ({predicate: i} = n);
				let s = i ? ' ' + this.client.queryCompiler(i).where() : '';
				this.pushQuery(`create index ${t} on ${this.tableName()} (${e})${s}`);
			}
			primary(e, t) {
				let n = this;
				(e = Array.isArray(e) ? e : [e]),
					(e = e.map((s) => this.client.customWrapIdentifier(s, Xe)));
				let i;
				mh(t) && ({constraintName: t, deferrable: i} = t),
					i &&
						i !== 'not deferrable' &&
						this.client.logger.warn(
							`sqlite3: primary key constraint \`${t}\` will not be deferrable ${i} because sqlite3 does not support deferred constraints.`
						),
					(t = this.client.customWrapIdentifier(t, Xe)),
					this.method !== 'create' &&
						this.method !== 'createIfNot' &&
						this.pushQuery({
							sql: `PRAGMA table_info(${this.tableName()})`,
							output(s) {
								return n.client.ddl(n, s, this.connection).primary(e, t);
							},
						});
			}
			foreign(e) {
				let t = this;
				this.method !== 'create' &&
					this.method !== 'createIfNot' &&
					((e.column = Array.isArray(e.column) ? e.column : [e.column]),
					(e.column = e.column.map((n) =>
						this.client.customWrapIdentifier(n, Xe)
					)),
					(e.inTable = this.client.customWrapIdentifier(e.inTable, Xe)),
					(e.references = Array.isArray(e.references)
						? e.references
						: [e.references]),
					(e.references = e.references.map((n) =>
						this.client.customWrapIdentifier(n, Xe)
					)),
					this.pushQuery({
						sql: `PRAGMA table_info(${this.tableName()})`,
						statementsProducer(n, i) {
							return t.client.ddl(t, n, i).foreign(e);
						},
					}));
			}
			primaryKeys() {
				let e = j0(this.grouped.alterTable || [], {method: 'primary'});
				if (e.length > 0 && e[0].args.length > 0) {
					let t = e[0].args[0],
						n = e[0].args[1] || '';
					n && (n = ' constraint ' + this.formatter.wrap(n));
					let i =
						this.grouped.columns.filter((s) => s.builder._type === 'increments')
							.length > 0;
					return `,${n} ${i ? 'unique' : 'primary key'} (${this.formatter.columnize(t)})`;
				}
			}
			foreignKeys() {
				let e = '',
					t = j0(this.grouped.alterTable || [], {method: 'foreign'});
				for (let n = 0, i = t.length; n < i; n++) {
					let s = t[n].args[0],
						o = this.formatter.columnize(s.column),
						a = this.formatter.columnize(s.references),
						u = this.formatter.wrap(s.inTable),
						c = s.keyName || '';
					c && (c = ' constraint ' + this.formatter.wrap(c)),
						(e += `,${c} foreign key(${o}) references ${u}(${a})`),
						s.onDelete && (e += ` on delete ${s.onDelete}`),
						s.onUpdate && (e += ` on update ${s.onUpdate}`);
				}
				return e;
			}
			createTableBlock() {
				return this.getColumns().concat().join(',');
			}
			renameColumn(e, t) {
				this.pushQuery({
					sql: `alter table ${this.tableName()} rename ${this.formatter.wrap(e)} to ${this.formatter.wrap(t)}`,
				});
			}
			_setNullableState(e, t) {
				let n = this;
				this.pushQuery({
					sql: `PRAGMA table_info(${this.tableName()})`,
					statementsProducer(i, s) {
						return n.client.ddl(n, i, s).setNullable(e, t);
					},
				});
			}
			dropColumn() {
				let e = this,
					n = b8(arguments).map((i) => this.client.customWrapIdentifier(i, Xe));
				this.pushQuery({
					sql: `PRAGMA table_info(${this.tableName()})`,
					output(i) {
						return e.client.ddl(e, i, this.connection).dropColumn(n);
					},
				});
			}
		};
	L0.exports = gh;
});
var U0 = l((tfe, D0) => {
	var v8 = qr(),
		{columnize: E8} = ne(),
		yh = class extends v8 {
			constructor(e, t) {
				super(e, t);
			}
			createOrReplace() {
				let e = this.columns,
					t = this.selectQuery.toString(),
					n = this.viewName(),
					i = e
						? ' (' +
							E8(e, this.viewBuilder, this.client, this.bindingsHolder) +
							')'
						: '',
					s = `drop view if exists ${n}`,
					o = `create view ${n}${i} as ${t}`;
				this.pushQuery({sql: s}), this.pushQuery({sql: o});
			}
		};
	D0.exports = yh;
});
var Q0 = l((rfe, F0) => {
	function x8(r, e, t) {
		return `INSERT INTO "${e}" SELECT ${t === void 0 ? '*' : t.map((n) => `"${n}"`).join(', ')} FROM "${r}";`;
	}
	function C8(r) {
		return `DROP TABLE "${r}"`;
	}
	function q8(r, e) {
		return `ALTER TABLE "${r}" RENAME TO "${e}"`;
	}
	function T8(r) {
		return `SELECT type, sql FROM sqlite_master WHERE (type='table' OR (type='index' AND sql IS NOT NULL)) AND lower(tbl_name)='${r.toLowerCase()}'`;
	}
	function A8() {
		return 'PRAGMA foreign_keys';
	}
	function S8(r) {
		return `PRAGMA foreign_keys = ${r ? 'ON' : 'OFF'}`;
	}
	function O8() {
		return 'PRAGMA foreign_key_check';
	}
	F0.exports = {
		copyData: x8,
		dropOriginal: C8,
		renameTable: q8,
		getTableSql: T8,
		isForeignCheckEnabled: A8,
		setForeignCheck: S8,
		executeForeignCheck: O8,
	};
});
var W0 = l((nfe, H0) => {
	function R8(r, e) {
		let t = new RegExp(
				Object.entries(e)
					.map(([s, o]) => `(?<${s}>${o.source})`)
					.join('|'),
				'yi'
			),
			n = 0,
			i = [];
		for (; n < r.length; ) {
			t.lastIndex = n;
			let s = r.match(t);
			if (s !== null) {
				let [o, a] = Object.entries(s.groups).find(([u, c]) => c !== void 0);
				(n += a.length), o.startsWith('_') || i.push({type: o, text: a});
			} else
				throw new Error(
					`No matching tokenizer rule found at: [${r.substring(n)}]`
				);
		}
		return i;
	}
	H0.exports = {tokenize: R8};
});
var G0 = l((ife, V0) => {
	function N8(r, e = (t) => t) {
		return function ({index: t = 0, input: n}) {
			let i = t,
				s = [];
			for (let o of r) {
				let a = o({index: i, input: n});
				if (a.success) (i = a.index), s.push(a.ast);
				else return a;
			}
			return {success: !0, ast: e(s), index: i, input: n};
		};
	}
	function I8(r, e = (t) => t) {
		return function ({index: t = 0, input: n}) {
			for (let i of r) {
				let s = i({index: t, input: n});
				if (s.success)
					return {success: !0, ast: e(s.ast), index: s.index, input: n};
			}
			return {success: !1, ast: null, index: t, input: n};
		};
	}
	function P8(r, e = (t) => t) {
		return function ({index: t = 0, input: n}) {
			let i = {},
				s = t,
				o = [];
			do
				(i = r({index: s, input: n})),
					i.success && ((s = i.index), o.push(i.ast));
			while (i.success);
			return o.length > 0
				? {success: !0, ast: e(o), index: s, input: n}
				: {success: !1, ast: null, index: s, input: n};
		};
	}
	function k8(r, e = (t) => t) {
		return function ({index: t = 0, input: n}) {
			let i = r({index: t, input: n});
			return i.success
				? {success: !0, ast: e(i.ast), index: i.index, input: n}
				: {success: !0, ast: e(null), index: t, input: n};
		};
	}
	function $8(r, e = (t) => t) {
		return function ({index: t = 0, input: n}) {
			let i = r.do({index: t, input: n});
			return i.success && r.next({index: i.index, input: n}).success
				? {success: !0, ast: e(i.ast), index: i.index, input: n}
				: {success: !1, ast: null, index: t, input: n};
		};
	}
	function M8(r, e = (t) => t) {
		return function ({index: t = 0, input: n}) {
			let i = r.do({index: t, input: n});
			return i.success && !r.not({index: t, input: n}).success
				? {success: !0, ast: e(i.ast), index: i.index, input: n}
				: {success: !1, ast: null, index: t, input: n};
		};
	}
	function j8(r, e = (t) => t.text) {
		return function ({index: t = 0, input: n}) {
			let i = n[t];
			return i !== void 0 &&
				(r.type === void 0 || r.type === i.type) &&
				(r.text === void 0 || r.text.toUpperCase() === i.text.toUpperCase())
				? {success: !0, ast: e(i), index: t + 1, input: n}
				: {success: !1, ast: null, index: t, input: n};
		};
	}
	var L8 = function ({index: r = 0, input: e}) {
			return {success: !0, ast: null, index: r, input: e};
		},
		B8 = function ({index: r = 0, input: e}) {
			return {success: r === e.length, ast: null, index: r, input: e};
		};
	V0.exports = {s: N8, a: I8, m: P8, o: k8, l: $8, n: M8, t: j8, e: L8, f: B8};
});
var cT = l((sfe, uT) => {
	var {tokenize: Y0} = W0(),
		{s: x, a: Z, m: Tr, o: X, l: J0, n: bh, t: p, e: Yi, f: X0} = G0(),
		eT = {
			keyword:
				/(?:ABORT|ACTION|ADD|AFTER|ALL|ALTER|ALWAYS|ANALYZE|AND|AS|ASC|ATTACH|AUTOINCREMENT|BEFORE|BEGIN|BETWEEN|BY|CASCADE|CASE|CAST|CHECK|COLLATE|COLUMN|COMMIT|CONFLICT|CONSTRAINT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|DATABASE|DEFAULT|DEFERRED|DEFERRABLE|DELETE|DESC|DETACH|DISTINCT|DO|DROP|END|EACH|ELSE|ESCAPE|EXCEPT|EXCLUSIVE|EXCLUDE|EXISTS|EXPLAIN|FAIL|FILTER|FIRST|FOLLOWING|FOR|FOREIGN|FROM|FULL|GENERATED|GLOB|GROUP|GROUPS|HAVING|IF|IGNORE|IMMEDIATE|IN|INDEX|INDEXED|INITIALLY|INNER|INSERT|INSTEAD|INTERSECT|INTO|IS|ISNULL|JOIN|KEY|LAST|LEFT|LIKE|LIMIT|MATCH|MATERIALIZED|NATURAL|NO|NOT|NOTHING|NOTNULL|NULL|NULLS|OF|OFFSET|ON|OR|ORDER|OTHERS|OUTER|OVER|PARTITION|PLAN|PRAGMA|PRECEDING|PRIMARY|QUERY|RAISE|RANGE|RECURSIVE|REFERENCES|REGEXP|REINDEX|RELEASE|RENAME|REPLACE|RESTRICT|RETURNING|RIGHT|ROLLBACK|ROW|ROWS|SAVEPOINT|SELECT|SET|TABLE|TEMP|TEMPORARY|THEN|TIES|TO|TRANSACTION|TRIGGER|UNBOUNDED|UNION|UNIQUE|UPDATE|USING|VACUUM|VALUES|VIEW|VIRTUAL|WHEN|WHERE|WINDOW|WITH|WITHOUT)(?=\s+|-|\(|\)|;|\+|\*|\/|%|==|=|<=|<>|<<|<|>=|>>|>|!=|,|&|~|\|\||\||\.)/,
			id: /"[^"]*(?:""[^"]*)*"|`[^`]*(?:``[^`]*)*`|\[[^[\]]*\]|[a-z_][a-z0-9_$]*/,
			string: /'[^']*(?:''[^']*)*'/,
			blob: /x'(?:[0-9a-f][0-9a-f])+'/,
			numeric: /(?:\d+(?:\.\d*)?|\.\d+)(?:e(?:\+|-)?\d+)?|0x[0-9a-f]+/,
			variable: /\?\d*|[@$:][a-z0-9_$]+/,
			operator:
				/-|\(|\)|;|\+|\*|\/|%|==|=|<=|<>|<<|<|>=|>>|>|!=|,|&|~|\|\||\||\./,
			_ws: /\s+/,
		};
	function D8(r) {
		let e = F8({input: Y0(r, eT)});
		if (!e.success)
			throw new Error(
				`Parsing CREATE TABLE failed at [${e.input
					.slice(e.index)
					.map((t) => t.text)
					.join(' ')}] of "${r}"`
			);
		return e.ast;
	}
	function U8(r) {
		let e = mZ({input: Y0(r, eT)});
		if (!e.success)
			throw new Error(
				`Parsing CREATE INDEX failed at [${e.input
					.slice(e.index)
					.map((t) => t.text)
					.join(' ')}] of "${r}"`
			);
		return e.ast;
	}
	function F8(r) {
		return x(
			[
				p({text: 'CREATE'}, (e) => null),
				Q8,
				p({text: 'TABLE'}, (e) => null),
				iT,
				sT,
				_h,
				p({text: '('}, (e) => null),
				tT,
				iZ,
				p({text: ')'}, (e) => null),
				H8,
				X0,
			],
			(e) => Object.assign({}, ...e.filter((t) => t !== null))
		)(r);
	}
	function Q8(r) {
		return Z([p({text: 'TEMP'}), p({text: 'TEMPORARY'}), Yi], (e) => ({
			temporary: e !== null,
		}))(r);
	}
	function H8(r) {
		return X(x([p({text: 'WITHOUT'}), p({text: 'ROWID'})]), (e) => ({
			rowid: e !== null,
		}))(r);
	}
	function tT(r) {
		return Z([
			x([K0, p({text: ','}), tT], (e) => ({
				columns: [e[0]].concat(e[2].columns),
			})),
			x([K0], (e) => ({columns: [e[0]]})),
		])(r);
	}
	function K0(r) {
		return x([x([$t], (e) => ({name: e[0]})), W8, V8], (e) =>
			Object.assign({}, ...e)
		)(r);
	}
	function W8(r) {
		return X(
			x(
				[
					Tr(p({type: 'id'})),
					Z([
						x(
							[p({text: '('}), Zo, p({text: ','}), Zo, p({text: ')'})],
							(e) => `(${e[1]}, ${e[3]})`
						),
						x([p({text: '('}), Zo, p({text: ')'})], (e) => `(${e[1]})`),
						Yi,
					]),
				],
				(e) => `${e[0].join(' ')}${e[1] || ''}`
			),
			(e) => ({type: e})
		)(r);
	}
	function V8(r) {
		return X(Tr(G8), (e) => ({
			constraints: Object.assign(
				{
					primary: null,
					notnull: null,
					null: null,
					unique: null,
					check: null,
					default: null,
					collate: null,
					references: null,
					as: null,
				},
				...(e || [])
			),
		}))(r);
	}
	function G8(r) {
		return Z([J8, z8, Z8, Y8, X8, eZ, tZ, rZ, nZ])(r);
	}
	function J8(r) {
		return x(
			[
				Ae,
				p({text: 'PRIMARY'}, (e) => null),
				p({text: 'KEY'}, (e) => null),
				wh,
				Sn,
				K8,
			],
			(e) => ({primary: Object.assign({}, ...e.filter((t) => t !== null))})
		)(r);
	}
	function K8(r) {
		return X(p({text: 'AUTOINCREMENT'}), (e) => ({autoincrement: e !== null}))(
			r
		);
	}
	function z8(r) {
		return x(
			[Ae, p({text: 'NOT'}, (e) => null), p({text: 'NULL'}, (e) => null), Sn],
			(e) => ({notnull: Object.assign({}, ...e.filter((t) => t !== null))})
		)(r);
	}
	function Z8(r) {
		return x([Ae, p({text: 'NULL'}, (e) => null), Sn], (e) => ({
			null: Object.assign({}, ...e.filter((t) => t !== null)),
		}))(r);
	}
	function Y8(r) {
		return x([Ae, p({text: 'UNIQUE'}, (e) => null), Sn], (e) => ({
			unique: Object.assign({}, ...e.filter((t) => t !== null)),
		}))(r);
	}
	function X8(r) {
		return x(
			[
				Ae,
				p({text: 'CHECK'}, (e) => null),
				p({text: '('}, (e) => null),
				x([Ar], (e) => ({expression: e[0]})),
				p({text: ')'}, (e) => null),
			],
			(e) => ({check: Object.assign({}, ...e.filter((t) => t !== null))})
		)(r);
	}
	function eZ(r) {
		return x(
			[
				Ae,
				p({text: 'DEFAULT'}, (e) => null),
				Z([
					x([p({text: '('}), Ar, p({text: ')'})], (e) => ({
						value: e[1],
						expression: !0,
					})),
					x([wZ], (e) => ({value: e[0], expression: !1})),
					x([Zo], (e) => ({value: e[0], expression: !1})),
				]),
			],
			(e) => ({default: Object.assign({}, ...e.filter((t) => t !== null))})
		)(r);
	}
	function tZ(r) {
		return x(
			[
				Ae,
				p({text: 'COLLATE'}, (e) => null),
				p({type: 'id'}, (e) => ({collation: e.text})),
			],
			(e) => ({collate: Object.assign({}, ...e.filter((t) => t !== null))})
		)(r);
	}
	function rZ(r) {
		return x([Ae, x([rT], (e) => e[0].references)], (e) => ({
			references: Object.assign({}, ...e.filter((t) => t !== null)),
		}))(r);
	}
	function nZ(r) {
		return x(
			[
				Ae,
				X(x([p({text: 'GENERATED'}), p({text: 'ALWAYS'})]), (e) => ({
					generated: e !== null,
				})),
				p({text: 'AS'}, (e) => null),
				p({text: '('}, (e) => null),
				x([Ar], (e) => ({expression: e[0]})),
				p({text: ')'}, (e) => null),
				Z([p({text: 'STORED'}), p({text: 'VIRTUAL'}), Yi], (e) => ({
					mode: e ? e.toUpperCase() : null,
				})),
			],
			(e) => ({as: Object.assign({}, ...e.filter((t) => t !== null))})
		)(r);
	}
	function iZ(r) {
		return X(Tr(x([p({text: ','}), sZ], (e) => e[1])), (e) => ({
			constraints: e || [],
		}))(r);
	}
	function sZ(r) {
		return Z([oZ, aZ, uZ, cZ])(r);
	}
	function oZ(r) {
		return x(
			[
				Ae,
				p({text: 'PRIMARY'}, (e) => null),
				p({text: 'KEY'}, (e) => null),
				p({text: '('}, (e) => null),
				Zi,
				p({text: ')'}, (e) => null),
				Sn,
			],
			(e) =>
				Object.assign({type: 'PRIMARY KEY'}, ...e.filter((t) => t !== null))
		)(r);
	}
	function aZ(r) {
		return x(
			[
				Ae,
				p({text: 'UNIQUE'}, (e) => null),
				p({text: '('}, (e) => null),
				Zi,
				p({text: ')'}, (e) => null),
				Sn,
			],
			(e) => Object.assign({type: 'UNIQUE'}, ...e.filter((t) => t !== null))
		)(r);
	}
	function Sn(r) {
		return X(
			x(
				[
					p({text: 'ON'}),
					p({text: 'CONFLICT'}),
					Z([
						p({text: 'ROLLBACK'}),
						p({text: 'ABORT'}),
						p({text: 'FAIL'}),
						p({text: 'IGNORE'}),
						p({text: 'REPLACE'}),
					]),
				],
				(e) => e[2]
			),
			(e) => ({conflict: e ? e.toUpperCase() : null})
		)(r);
	}
	function uZ(r) {
		return x(
			[
				Ae,
				p({text: 'CHECK'}, (e) => null),
				p({text: '('}, (e) => null),
				x([Ar], (e) => ({expression: e[0]})),
				p({text: ')'}, (e) => null),
			],
			(e) => Object.assign({type: 'CHECK'}, ...e.filter((t) => t !== null))
		)(r);
	}
	function cZ(r) {
		return x(
			[
				Ae,
				p({text: 'FOREIGN'}, (e) => null),
				p({text: 'KEY'}, (e) => null),
				p({text: '('}, (e) => null),
				nT,
				p({text: ')'}, (e) => null),
				rT,
			],
			(e) =>
				Object.assign({type: 'FOREIGN KEY'}, ...e.filter((t) => t !== null))
		)(r);
	}
	function rT(r) {
		return x(
			[
				p({text: 'REFERENCES'}, (e) => null),
				_h,
				lZ,
				X(Tr(Z([hZ, dZ, fZ])), (e) =>
					Object.assign({delete: null, update: null, match: null}, ...(e || []))
				),
				pZ,
			],
			(e) => ({references: Object.assign({}, ...e.filter((t) => t !== null))})
		)(r);
	}
	function lZ(r) {
		return X(
			x([p({text: '('}), nT, p({text: ')'})], (e) => e[1]),
			(e) => ({columns: e ? e.columns : []})
		)(r);
	}
	function nT(r) {
		return x(
			[
				X(Tr(x([$t, p({text: ','})], (e) => e[0])), (e) =>
					e !== null ? e : []
				),
				$t,
			],
			(e) => ({columns: e[0].concat([e[1]])})
		)(r);
	}
	function hZ(r) {
		return x([p({text: 'ON'}), p({text: 'DELETE'}), aT], (e) => ({
			delete: e[2],
		}))(r);
	}
	function dZ(r) {
		return x([p({text: 'ON'}), p({text: 'UPDATE'}), aT], (e) => ({
			update: e[2],
		}))(r);
	}
	function fZ(r) {
		return x(
			[p({text: 'MATCH'}), Z([p({type: 'keyword'}), p({type: 'id'})])],
			(e) => ({match: e[1]})
		)(r);
	}
	function pZ(r) {
		return X(
			x([
				X(p({text: 'NOT'})),
				p({text: 'DEFERRABLE'}),
				X(
					x(
						[
							p({text: 'INITIALLY'}),
							Z([p({text: 'DEFERRED'}), p({text: 'IMMEDIATE'})]),
						],
						(e) => e[1].toUpperCase()
					)
				),
			]),
			(e) => ({deferrable: e ? {not: e[0] !== null, initially: e[2]} : null})
		)(r);
	}
	function Ae(r) {
		return X(
			x([p({text: 'CONSTRAINT'}), $t], (e) => e[1]),
			(e) => ({name: e})
		)(r);
	}
	function mZ(r) {
		return x(
			[
				p({text: 'CREATE'}, (e) => null),
				gZ,
				p({text: 'INDEX'}, (e) => null),
				iT,
				sT,
				yZ,
				p({text: 'ON'}, (e) => null),
				_h,
				p({text: '('}, (e) => null),
				Zi,
				p({text: ')'}, (e) => null),
				bZ,
				X0,
			],
			(e) => Object.assign({}, ...e.filter((t) => t !== null))
		)(r);
	}
	function gZ(r) {
		return X(p({text: 'UNIQUE'}), (e) => ({unique: e !== null}))(r);
	}
	function iT(r) {
		return X(
			x([p({text: 'IF'}), p({text: 'NOT'}), p({text: 'EXISTS'})]),
			(e) => ({exists: e !== null})
		)(r);
	}
	function sT(r) {
		return X(
			x([$t, p({text: '.'})], (e) => e[0]),
			(e) => ({schema: e})
		)(r);
	}
	function yZ(r) {
		return x([$t], (e) => ({index: e[0]}))(r);
	}
	function _h(r) {
		return x([$t], (e) => ({table: e[0]}))(r);
	}
	function bZ(r) {
		return X(
			x([p({text: 'WHERE'}), Ar], (e) => e[1]),
			(e) => ({where: e})
		)(r);
	}
	function Zi(r) {
		return Z([
			x([z0, p({text: ','}), Zi], (e) => ({
				columns: [e[0]].concat(e[2].columns),
			})),
			x([Z0, p({text: ','}), Zi], (e) => ({
				columns: [e[0]].concat(e[2].columns),
			})),
			J0({do: z0, next: p({text: ')'})}, (e) => ({columns: [e]})),
			J0({do: Z0, next: p({text: ')'})}, (e) => ({columns: [e]})),
		])(r);
	}
	function z0(r) {
		return x([x([$t], (e) => ({name: e[0], expression: !1})), oT, wh], (e) =>
			Object.assign({}, ...e.filter((t) => t !== null))
		)(r);
	}
	function Z0(r) {
		return x([x([_Z], (e) => ({name: e[0], expression: !0})), oT, wh], (e) =>
			Object.assign({}, ...e.filter((t) => t !== null))
		)(r);
	}
	function oT(r) {
		return X(
			x([p({text: 'COLLATE'}), p({type: 'id'})], (e) => e[1]),
			(e) => ({collation: e})
		)(r);
	}
	function wh(r) {
		return Z([p({text: 'ASC'}), p({text: 'DESC'}), Yi], (e) => ({
			order: e ? e.toUpperCase() : null,
		}))(r);
	}
	function _Z(r) {
		return Tr(
			Z([
				bh({
					do: p({type: 'keyword'}),
					not: Z([p({text: 'COLLATE'}), p({text: 'ASC'}), p({text: 'DESC'})]),
				}),
				p({type: 'id'}),
				p({type: 'string'}),
				p({type: 'blob'}),
				p({type: 'numeric'}),
				p({type: 'variable'}),
				bh({
					do: p({type: 'operator'}),
					not: Z([p({text: '('}), p({text: ')'}), p({text: ','})]),
				}),
				x([p({text: '('}), X(Ar), p({text: ')'})], (e) => e[1] || []),
			])
		)(r);
	}
	function Ar(r) {
		return Tr(
			Z([
				p({type: 'keyword'}),
				p({type: 'id'}),
				p({type: 'string'}),
				p({type: 'blob'}),
				p({type: 'numeric'}),
				p({type: 'variable'}),
				bh({
					do: p({type: 'operator'}),
					not: Z([p({text: '('}), p({text: ')'})]),
				}),
				x([p({text: '('}), X(Ar), p({text: ')'})], (e) => e[1] || []),
			])
		)(r);
	}
	function $t(r) {
		return Z([p({type: 'id'}), p({type: 'string'})], (e) =>
			/^["`['][^]*["`\]']$/.test(e) ? e.substring(1, e.length - 1) : e
		)(r);
	}
	function aT(r) {
		return Z(
			[
				x([p({text: 'SET'}), p({text: 'NULL'})], (e) => `${e[0]} ${e[1]}`),
				x([p({text: 'SET'}), p({text: 'DEFAULT'})], (e) => `${e[0]} ${e[1]}`),
				p({text: 'CASCADE'}),
				p({text: 'RESTRICT'}),
				x([p({text: 'NO'}), p({text: 'ACTION'})], (e) => `${e[0]} ${e[1]}`),
			],
			(e) => e.toUpperCase()
		)(r);
	}
	function wZ(r) {
		return Z([
			p({type: 'numeric'}),
			p({type: 'string'}),
			p({type: 'id'}),
			p({type: 'blob'}),
			p({text: 'NULL'}),
			p({text: 'TRUE'}),
			p({text: 'FALSE'}),
			p({text: 'CURRENT_TIME'}),
			p({text: 'CURRENT_DATE'}),
			p({text: 'CURRENT_TIMESTAMP'}),
		])(r);
	}
	function Zo(r) {
		return x(
			[Z([p({text: '+'}), p({text: '-'}), Yi]), p({type: 'numeric'})],
			(e) => `${e[0] || ''}${e[1]}`
		)(r);
	}
	uT.exports = {parseCreateTable: D8, parseCreateIndex: U8};
});
var gT = l((ofe, mT) => {
	function vZ(r, e = (t) => t) {
		return xZ(r, e);
	}
	function EZ(r, e = (t) => t) {
		return YZ(r, e);
	}
	function xZ(r, e) {
		return `CREATE${CZ(r, e)} TABLE${dT(r, e)} ${fT(r, e)}${vh(r, e)} (${TZ(r, e)}${DZ(r, e)})${qZ(r, e)}`;
	}
	function CZ(r, e) {
		return r.temporary ? ' TEMP' : '';
	}
	function qZ(r, e) {
		return r.rowid ? ' WITHOUT ROWID' : '';
	}
	function TZ(r, e) {
		return r.columns.map((t) => AZ(t, e)).join(', ');
	}
	function AZ(r, e) {
		return `${Or(r.name, e)}${SZ(r, e)}${OZ(r.constraints, e)}`;
	}
	function SZ(r, e) {
		return r.type !== null ? ` ${r.type}` : '';
	}
	function OZ(r, e) {
		return `${RZ(r, e)}${IZ(r, e)}${PZ(r, e)}${kZ(r, e)}${$Z(r, e)}${MZ(r, e)}${jZ(r, e)}${LZ(r, e)}${BZ(r, e)}`;
	}
	function RZ(r, e) {
		return r.primary !== null
			? ` ${Se(r.primary, e)}PRIMARY KEY${xh(r.primary, e)}${On(r.primary, e)}${NZ(r.primary, e)}`
			: '';
	}
	function NZ(r, e) {
		return r.autoincrement ? ' AUTOINCREMENT' : '';
	}
	function IZ(r, e) {
		return r.notnull !== null
			? ` ${Se(r.notnull, e)}NOT NULL${On(r.notnull, e)}`
			: '';
	}
	function PZ(r, e) {
		return r.null !== null ? ` ${Se(r.null, e)}NULL${On(r.null, e)}` : '';
	}
	function kZ(r, e) {
		return r.unique !== null
			? ` ${Se(r.unique, e)}UNIQUE${On(r.unique, e)}`
			: '';
	}
	function $Z(r, e) {
		return r.check !== null
			? ` ${Se(r.check, e)}CHECK (${Sr(r.check.expression, e)})`
			: '';
	}
	function MZ(r, e) {
		return r.default !== null
			? ` ${Se(r.default, e)}DEFAULT ${r.default.expression ? `(${Sr(r.default.value, e)})` : r.default.value}`
			: '';
	}
	function jZ(r, e) {
		return r.collate !== null
			? ` ${Se(r.collate, e)}COLLATE ${r.collate.collation}`
			: '';
	}
	function LZ(r, e) {
		return r.references !== null
			? ` ${Se(r.references, e)}${lT(r.references, e)}`
			: '';
	}
	function BZ(r, e) {
		return r.as !== null
			? ` ${Se(r.as, e)}${r.as.generated ? 'GENERATED ALWAYS ' : ''}AS (${Sr(r.as.expression, e)})${r.as.mode !== null ? ` ${r.as.mode}` : ''}`
			: '';
	}
	function DZ(r, e) {
		return r.constraints.reduce((t, n) => `${t}, ${UZ(n, e)}`, '');
	}
	function UZ(r, e) {
		switch (r.type) {
			case 'PRIMARY KEY':
				return FZ(r, e);
			case 'UNIQUE':
				return QZ(r, e);
			case 'CHECK':
				return HZ(r, e);
			case 'FOREIGN KEY':
				return WZ(r, e);
		}
	}
	function FZ(r, e) {
		return `${Se(r, e)}PRIMARY KEY (${Eh(r, e)})${On(r, e)}`;
	}
	function QZ(r, e) {
		return `${Se(r, e)}UNIQUE (${Eh(r, e)})${On(r, e)}`;
	}
	function On(r, e) {
		return r.conflict !== null ? ` ON CONFLICT ${r.conflict}` : '';
	}
	function HZ(r, e) {
		return `${Se(r, e)}CHECK (${Sr(r.expression, e)})`;
	}
	function WZ(r, e) {
		return `${Se(r, e)}FOREIGN KEY (${hT(r, e)}) ${lT(r.references, e)}`;
	}
	function lT(r, e) {
		return `REFERENCES ${vh(r, e)}${VZ(r, e)}${GZ(r, e)}${ZZ(r.deferrable, e)}`;
	}
	function VZ(r, e) {
		return r.columns.length > 0 ? ` (${hT(r, e)})` : '';
	}
	function hT(r, e) {
		return r.columns.map((t) => Or(t, e)).join(', ');
	}
	function GZ(r, e) {
		return `${JZ(r, e)}${KZ(r, e)}${zZ(r, e)}`;
	}
	function JZ(r, e) {
		return r.delete !== null ? ` ON DELETE ${r.delete}` : '';
	}
	function KZ(r, e) {
		return r.update !== null ? ` ON UPDATE ${r.update}` : '';
	}
	function zZ(r, e) {
		return r.match !== null ? ` MATCH ${r.match}` : '';
	}
	function ZZ(r, e) {
		return r !== null
			? ` ${r.not ? 'NOT ' : ''}DEFERRABLE${r.initially !== null ? ` INITIALLY ${r.initially}` : ''}`
			: '';
	}
	function Se(r, e) {
		return r.name !== null ? `CONSTRAINT ${Or(r.name, e)} ` : '';
	}
	function YZ(r, e) {
		return `CREATE${XZ(r, e)} INDEX${dT(r, e)} ${fT(r, e)}${eY(r, e)} on ${vh(r, e)} (${Eh(r, e)})${tY(r, e)}`;
	}
	function XZ(r, e) {
		return r.unique ? ' UNIQUE' : '';
	}
	function dT(r, e) {
		return r.exists ? ' IF NOT EXISTS' : '';
	}
	function fT(r, e) {
		return r.schema !== null ? `${Or(r.schema, e)}.` : '';
	}
	function eY(r, e) {
		return Or(r.index, e);
	}
	function vh(r, e) {
		return Or(r.table, e);
	}
	function tY(r, e) {
		return r.where !== null ? ` where ${Sr(r.where)}` : '';
	}
	function Eh(r, e) {
		return r.columns
			.map((t) => (t.expression ? nY(t, e) : rY(t, e)))
			.join(', ');
	}
	function rY(r, e) {
		return `${Or(r.name, e)}${pT(r, e)}${xh(r, e)}`;
	}
	function nY(r, e) {
		return `${iY(r.name, e)}${pT(r, e)}${xh(r, e)}`;
	}
	function pT(r, e) {
		return r.collation !== null ? ` COLLATE ${r.collation}` : '';
	}
	function xh(r, e) {
		return r.order !== null ? ` ${r.order}` : '';
	}
	function iY(r, e) {
		return Sr(r, e);
	}
	function Sr(r, e) {
		return r.reduce(
			(t, n) => (Array.isArray(n) ? `${t}(${Sr(n)})` : t ? `${t} ${n}` : n),
			''
		);
	}
	function Or(r, e) {
		return e(r);
	}
	mT.exports = {compileCreateTable: vZ, compileCreateIndex: EZ};
});
var _T = l((afe, bT) => {
	function yT(r, e) {
		return r.toLowerCase() === e.toLowerCase();
	}
	function sY(r, e) {
		return r.some((t) => yT(t, e));
	}
	bT.exports = {isEqualId: yT, includesId: sY};
});
var qT = l((ufe, CT) => {
	var oY = ge(),
		{nanonum: aY} = Bo(),
		{
			copyData: wT,
			dropOriginal: vT,
			renameTable: ET,
			getTableSql: uY,
			isForeignCheckEnabled: cY,
			setForeignCheck: Ch,
			executeForeignCheck: xT,
		} = Q0(),
		{parseCreateTable: Rr, parseCreateIndex: lY} = cT(),
		{compileCreateTable: Nr, compileCreateIndex: hY} = gT(),
		{isEqualId: Yo, includesId: Ir} = _T(),
		qh = class {
			constructor(e, t, n, i) {
				(this.client = e),
					(this.tableCompiler = t),
					(this.pragma = n),
					(this.tableNameRaw = this.tableCompiler.tableNameRaw),
					(this.alteredName = `_knex_temp_alter${aY(3)}`),
					(this.connection = i),
					(this.formatter = (s) => this.client.customWrapIdentifier(s, oY)),
					(this.wrap = (s) => this.client.wrapIdentifierImpl(s));
			}
			tableName() {
				return this.formatter(this.tableNameRaw);
			}
			getTableSql() {
				let e = this.tableName();
				return this.client.transaction(
					async (t) => {
						t.disableProcessing();
						let n = await t.raw(uY(e));
						return (
							t.enableProcessing(),
							{
								createTable: n.filter((i) => i.type === 'table')[0].sql,
								createIndices: n
									.filter((i) => i.type === 'index')
									.map((i) => i.sql),
							}
						);
					},
					{connection: this.connection}
				);
			}
			async isForeignCheckEnabled() {
				return (
					(await this.client.raw(cY()).connection(this.connection))[0]
						.foreign_keys === 1
				);
			}
			async setForeignCheck(e) {
				await this.client.raw(Ch(e)).connection(this.connection);
			}
			renameTable(e) {
				return e.raw(ET(this.alteredName, this.tableName()));
			}
			dropOriginal(e) {
				return e.raw(vT(this.tableName()));
			}
			copyData(e, t) {
				return e.raw(wT(this.tableName(), this.alteredName, t));
			}
			async alterColumn(e) {
				let {createTable: t, createIndices: n} = await this.getTableSql(),
					i = Rr(t);
				(i.table = this.alteredName),
					(i.columns = i.columns.map((o) => {
						let a = e.find((u) => Yo(u.name, o.name));
						return (
							a &&
								((o.type = a.type),
								(o.constraints.default =
									a.defaultTo !== null
										? {name: null, value: a.defaultTo, expression: !1}
										: null),
								(o.constraints.notnull = a.notNull
									? {name: null, conflict: null}
									: null),
								(o.constraints.null = a.notNull ? null : o.constraints.null)),
							o
						);
					}));
				let s = Nr(i, this.wrap);
				return this.generateAlterCommands(s, n);
			}
			async dropColumn(e) {
				let {createTable: t, createIndices: n} = await this.getTableSql(),
					i = Rr(t);
				if (
					((i.table = this.alteredName),
					(i.columns = i.columns.filter((u) => u.expression || !Ir(e, u.name))),
					i.columns.length === 0)
				)
					throw new Error('Unable to drop last column from table');
				i.constraints = i.constraints.filter((u) =>
					u.type === 'PRIMARY KEY' || u.type === 'UNIQUE'
						? u.columns.every((c) => c.expression || !Ir(e, c.name))
						: u.type === 'FOREIGN KEY'
							? u.columns.every((c) => !Ir(e, c)) &&
								(u.references.table !== i.table ||
									u.references.columns.every((c) => !Ir(e, c)))
							: !0
				);
				let s = i.columns.map((u) => u.name),
					o = Nr(i, this.wrap),
					a = [];
				for (let u of n) {
					let c = lY(u);
					(c.columns = c.columns.filter((h) => h.expression || !Ir(e, h.name))),
						c.columns.length > 0 && a.push(hY(c, this.wrap));
				}
				return this.alter(o, a, s);
			}
			async dropForeign(e, t) {
				let {createTable: n, createIndices: i} = await this.getTableSql(),
					s = Rr(n);
				(s.table = this.alteredName),
					t ||
						(s.columns = s.columns.map((a) => ({
							...a,
							references: Ir(e, a.name) ? null : a.references,
						}))),
					(s.constraints = s.constraints.filter((a) =>
						a.type === 'FOREIGN KEY'
							? t
								? !a.name || !Yo(a.name, t)
								: a.columns.every((u) => !Ir(e, u))
							: !0
					));
				let o = Nr(s, this.wrap);
				return this.alter(o, i);
			}
			async dropPrimary(e) {
				let {createTable: t, createIndices: n} = await this.getTableSql(),
					i = Rr(t);
				(i.table = this.alteredName),
					(i.columns = i.columns.map((o) => ({...o, primary: null}))),
					(i.constraints = i.constraints.filter((o) =>
						o.type === 'PRIMARY KEY' ? (e ? !o.name || !Yo(o.name, e) : !1) : !0
					));
				let s = Nr(i, this.wrap);
				return this.alter(s, n);
			}
			async primary(e, t) {
				let {createTable: n, createIndices: i} = await this.getTableSql(),
					s = Rr(n);
				(s.table = this.alteredName),
					(s.columns = s.columns.map((a) => ({...a, primary: null}))),
					(s.constraints = s.constraints.filter(
						(a) => a.type !== 'PRIMARY KEY'
					)),
					s.constraints.push({
						type: 'PRIMARY KEY',
						name: t || null,
						columns: e.map((a) => ({
							name: a,
							expression: !1,
							collation: null,
							order: null,
						})),
						conflict: null,
					});
				let o = Nr(s, this.wrap);
				return this.alter(o, i);
			}
			async foreign(e) {
				let {createTable: t, createIndices: n} = await this.getTableSql(),
					i = Rr(t);
				(i.table = this.alteredName),
					i.constraints.push({
						type: 'FOREIGN KEY',
						name: e.keyName || null,
						columns: e.column,
						references: {
							table: e.inTable,
							columns: e.references,
							delete: e.onDelete || null,
							update: e.onUpdate || null,
							match: null,
							deferrable: null,
						},
					});
				let s = Nr(i, this.wrap);
				return this.generateAlterCommands(s, n);
			}
			async setNullable(e, t) {
				let {createTable: n, createIndices: i} = await this.getTableSql(),
					s = Rr(n);
				s.table = this.alteredName;
				let o = s.columns.find((u) => Yo(e, u.name));
				if (!o)
					throw new Error(
						`.setNullable: Column ${e} does not exist in table ${this.tableName()}.`
					);
				(o.constraints.notnull = t ? null : {name: null, conflict: null}),
					(o.constraints.null = t ? o.constraints.null : null);
				let a = Nr(s, this.wrap);
				return this.generateAlterCommands(a, i);
			}
			async alter(e, t, n) {
				let i = await this.isForeignCheckEnabled();
				i && (await this.setForeignCheck(!1));
				try {
					await this.client.transaction(
						async (s) => {
							await s.raw(e),
								await this.copyData(s, n),
								await this.dropOriginal(s),
								await this.renameTable(s);
							for (let o of t) await s.raw(o);
							if (i && (await s.raw(xT())).length > 0)
								throw new Error('FOREIGN KEY constraint failed');
						},
						{connection: this.connection}
					);
				} finally {
					i && (await this.setForeignCheck(!0));
				}
			}
			async generateAlterCommands(e, t, n) {
				let i = [],
					s = [],
					o = [],
					a = null;
				i.push(e),
					i.push(wT(this.tableName(), this.alteredName, n)),
					i.push(vT(this.tableName())),
					i.push(ET(this.alteredName, this.tableName()));
				for (let c of t) i.push(c);
				return (
					(await this.isForeignCheckEnabled()) &&
						(s.push(Ch(!1)), o.push(Ch(!0)), (a = xT())),
					{pre: s, sql: i, check: a, post: o}
				);
			}
		};
	CT.exports = qh;
});
var AT = l((lfe, TT) => {
	var dY = Ze();
	TT.exports = class extends dY {
		withMaterialized(e, t, n) {
			return (
				this._validateWithArgs(e, t, n, 'with'), this.withWrapped(e, t, n, !0)
			);
		}
		withNotMaterialized(e, t, n) {
			return (
				this._validateWithArgs(e, t, n, 'with'), this.withWrapped(e, t, n, !1)
			);
		}
	};
});
var Th = l((hfe, ST) => {
	var fY = Oc(),
		pY = Rt(),
		{promisify: mY} = _('util'),
		gY = kt(),
		yY = vr(),
		bY = E0(),
		_Y = T0(),
		wY = I0(),
		vY = k0(),
		EY = B0(),
		xY = U0(),
		CY = qT(),
		qY = zi(),
		TY = AT(),
		Xo = class extends gY {
			constructor(e) {
				super(e),
					e.connection &&
						e.connection.filename === void 0 &&
						this.logger.warn(
							'Could not find `connection.filename` in config. Please specify the database path and name to avoid errors. (see docs https://knexjs.org/guide/#configuration-options)'
						),
					e.useNullAsDefault === void 0 &&
						this.logger.warn(
							'sqlite does not support inserting default values. Set the `useNullAsDefault` flag to hide this warning. (see docs https://knexjs.org/guide/query-builder.html#insert).'
						);
			}
			_driver() {
				return _('sqlite3');
			}
			schemaCompiler() {
				return new wY(this, ...arguments);
			}
			transaction() {
				return new bY(this, ...arguments);
			}
			queryCompiler(e, t) {
				return new _Y(this, e, t);
			}
			queryBuilder() {
				return new TY(this);
			}
			viewCompiler(e, t) {
				return new xY(this, e, t);
			}
			columnCompiler() {
				return new vY(this, ...arguments);
			}
			tableCompiler() {
				return new EY(this, ...arguments);
			}
			ddl(e, t, n) {
				return new CY(this, e, t, n);
			}
			wrapIdentifierImpl(e) {
				return e !== '*' ? `\`${e.replace(/`/g, '``')}\`` : '*';
			}
			acquireRawConnection() {
				return new Promise((e, t) => {
					let n = this.driver.OPEN_READWRITE | this.driver.OPEN_CREATE;
					if (this.connectionSettings.flags) {
						if (!Array.isArray(this.connectionSettings.flags))
							throw new Error('flags must be an array of strings');
						this.connectionSettings.flags.forEach((s) => {
							if (!s.startsWith('OPEN_') || !this.driver[s])
								throw new Error(`flag ${s} not supported by node-sqlite3`);
							n = n | this.driver[s];
						});
					}
					let i = new this.driver.Database(
						this.connectionSettings.filename,
						n,
						(s) => {
							if (s) return t(s);
							e(i);
						}
					);
				});
			}
			async destroyRawConnection(e) {
				return mY((n) => e.close(n))();
			}
			_query(e, t) {
				if (!t.sql) throw new Error('The query is empty');
				let {method: n} = t,
					i;
				switch (n) {
					case 'insert':
					case 'update':
						i = t.returning ? 'all' : 'run';
						break;
					case 'counter':
					case 'del':
						i = 'run';
						break;
					default:
						i = 'all';
				}
				return new Promise(function (s, o) {
					if (!e || !e[i])
						return o(new Error(`Error calling ${i} on connection.`));
					e[i](t.sql, t.bindings, function (a, u) {
						return a ? o(a) : ((t.response = u), (t.context = this), s(t));
					});
				});
			}
			_stream(e, t, n) {
				if (!t.sql) throw new Error('The query is empty');
				let i = this;
				return new Promise(function (s, o) {
					return (
						n.on('error', o),
						n.on('end', s),
						i
							._query(e, t)
							.then((a) => a.response)
							.then((a) => a.forEach((u) => n.write(u)))
							.catch(function (a) {
								n.emit('error', a);
							})
							.then(function () {
								n.end();
							})
					);
				});
			}
			processResponse(e, t) {
				let n = e.context,
					{response: i, returning: s} = e;
				if (e.output) return e.output.call(t, i);
				switch (e.method) {
					case 'select':
						return i;
					case 'first':
						return i[0];
					case 'pluck':
						return pY(i, e.pluck);
					case 'insert':
						return s && i ? i : [n.lastID];
					case 'update':
						return s && i ? i : n.changes;
					case 'del':
					case 'counter':
						return n.changes;
					default:
						return i;
				}
			}
			poolDefaults() {
				return fY({min: 1, max: 1}, super.poolDefaults());
			}
			formatter(e) {
				return new qY(this, e);
			}
			values(e, t, n) {
				return Array.isArray(e)
					? Array.isArray(e[0])
						? `( values ${e.map((i) => `(${this.parameterize(i, void 0, t, n)})`).join(', ')})`
						: `(${this.parameterize(e, void 0, t, n)})`
					: e instanceof yY
						? `(${this.parameter(e, t, n)})`
						: this.parameter(e, t, n);
			}
		};
	Object.assign(Xo.prototype, {dialect: 'sqlite3', driverName: 'sqlite3'});
	ST.exports = Xo;
});
var RT = l((dfe, OT) => {
	var AY = Th(),
		ea = class extends AY {
			_driver() {
				return _('better-sqlite3');
			}
			async acquireRawConnection() {
				let e = this.connectionSettings.options || {};
				return new this.driver(this.connectionSettings.filename, {
					nativeBinding: e.nativeBinding,
					readonly: !!e.readonly,
				});
			}
			async destroyRawConnection(e) {
				return e.close();
			}
			async _query(e, t) {
				if (!t.sql) throw new Error('The query is empty');
				if (!e) throw new Error('No connection provided');
				let n = e.prepare(t.sql),
					i = this._formatBindings(t.bindings);
				if (n.reader) {
					let o = await n.all(i);
					return (t.response = o), t;
				}
				let s = await n.run(i);
				return (
					(t.response = s),
					(t.context = {lastID: s.lastInsertRowid, changes: s.changes}),
					t
				);
			}
			_formatBindings(e) {
				return e
					? e.map((t) =>
							t instanceof Date
								? t.valueOf()
								: typeof t == 'boolean'
									? Number(t)
									: t
						)
					: [];
			}
		};
	Object.assign(ea.prototype, {driverName: 'better-sqlite3'});
	OT.exports = ea;
});
var Sh = l((ffe, NT) => {
	var SY = lt(),
		Ah = class extends SY {
			begin(e) {
				let t = [
					this.isolationLevel ? `ISOLATION LEVEL ${this.isolationLevel}` : '',
					this.readOnly ? 'READ ONLY' : '',
				]
					.join(' ')
					.trim();
				return t.length === 0
					? this.query(e, 'BEGIN;')
					: this.query(e, `BEGIN TRANSACTION ${t};`);
			}
		};
	NT.exports = Ah;
});
var ta = l((pfe, MT) => {
	var IT = ge(),
		OY = En(),
		RY = It(),
		{wrapString: PT, columnize: kT, operator: NY, wrap: $T} = ne(),
		Oh = class extends RY {
			constructor(e, t, n) {
				super(e, t, n), (this._defaultInsertValue = 'default');
			}
			truncate() {
				return `truncate ${this.tableName} restart identity`;
			}
			insert() {
				let e = super.insert();
				if (e === '') return e;
				let {
					returning: t,
					onConflict: n,
					ignore: i,
					merge: s,
					insert: o,
				} = this.single;
				if ((n && i && (e += this._ignore(n)), n && s)) {
					e += this._merge(s.updates, n, o);
					let a = this.where();
					a && (e += ` ${a}`);
				}
				return t && (e += this._returning(t)), {sql: e, returning: t};
			}
			update() {
				let e = this.with(),
					t = this._prepUpdate(this.single.update),
					n = this.where(),
					{returning: i, updateFrom: s} = this.single;
				return {
					sql:
						e +
						`update ${this.single.only ? 'only ' : ''}${this.tableName} set ${t.join(', ')}` +
						this._updateFrom(s) +
						(n ? ` ${n}` : '') +
						this._returning(i),
					returning: i,
				};
			}
			using() {
				let e = this.single.using;
				if (!e) return;
				let t = 'using ';
				return (
					Array.isArray(e)
						? (t += e.map((n) => this.formatter.wrap(n)).join(','))
						: (t += this.formatter.wrap(e)),
					t
				);
			}
			del() {
				let {tableName: e} = this,
					t = this.with(),
					n = this.where() || '',
					i = this.using() || '',
					s = this.grouped.join,
					o = [];
				if (Array.isArray(s)) {
					for (let c of s) {
						o.push(
							$T(
								this._joinTable(c),
								void 0,
								this.builder,
								this.client,
								this.bindingsHolder
							)
						);
						let h = [];
						for (let d of c.clauses)
							h.push(
								this.whereBasic({
									column: d.column,
									operator: '=',
									value: d.value,
									asColumn: !0,
								})
							);
						h.length > 0 && (n += (n ? ' and ' : 'where ') + h.join(' and '));
					}
					o.length > 0 && (i += (i ? ',' : 'using ') + o.join(','));
				}
				let a =
						t +
						`delete from ${this.single.only ? 'only ' : ''}${e}` +
						(i ? ` ${i}` : '') +
						(n ? ` ${n}` : ''),
					{returning: u} = this.single;
				return {sql: a + this._returning(u), returning: u};
			}
			aggregate(e) {
				return this._aggregate(e, {distinctParentheses: !0});
			}
			_returning(e) {
				return e ? ` returning ${this.formatter.columnize(e)}` : '';
			}
			_updateFrom(e) {
				return e ? ` from ${this.formatter.wrap(e)}` : '';
			}
			_ignore(e) {
				return e === !0
					? ' on conflict do nothing'
					: ` on conflict ${this._onConflictClause(e)} do nothing`;
			}
			_merge(e, t, n) {
				let i = ` on conflict ${this._onConflictClause(t)} do update set `;
				if (e && Array.isArray(e))
					return (
						(i += e
							.map((s) =>
								PT(
									s.split('.').pop(),
									this.formatter.builder,
									this.client,
									this.formatter
								)
							)
							.map((s) => `${s} = excluded.${s}`)
							.join(', ')),
						i
					);
				if (e && typeof e == 'object') {
					let s = this._prepUpdate(e);
					return typeof s == 'string' ? (i += s) : (i += s.join(',')), i;
				} else {
					let s = this._prepInsert(n);
					if (typeof s == 'string')
						throw new Error(
							'If using merge with a raw insert query, then updates must be provided'
						);
					return (
						(i += s.columns
							.map((o) => PT(o.split('.').pop(), this.builder, this.client))
							.map((o) => `${o} = excluded.${o}`)
							.join(', ')),
						i
					);
				}
			}
			_tableNames(e) {
				let t = this.single.schema,
					n = [];
				for (let i = 0; i < e.length; i++) {
					let s = e[i];
					s && (t && (s = `${t}.${s}`), n.push(this.formatter.wrap(s)));
				}
				return n.join(', ');
			}
			_lockingClause(e) {
				let t = this.single.lockTables || [];
				return e + (t.length ? ' of ' + this._tableNames(t) : '');
			}
			_groupOrder(e, t) {
				return super._groupOrderNulls(e, t);
			}
			forUpdate() {
				return this._lockingClause('for update');
			}
			forShare() {
				return this._lockingClause('for share');
			}
			forNoKeyUpdate() {
				return this._lockingClause('for no key update');
			}
			forKeyShare() {
				return this._lockingClause('for key share');
			}
			skipLocked() {
				return 'skip locked';
			}
			noWait() {
				return 'nowait';
			}
			columnInfo() {
				let e = this.single.columnInfo,
					t = this.single.schema,
					n = this.client.customWrapIdentifier(this.single.table, IT);
				t && (t = this.client.customWrapIdentifier(t, IT));
				let i =
						'select * from information_schema.columns where table_name = ? and table_catalog = current_database()',
					s = [n];
				return this._buildColumnInfoQuery(t, i, s, e);
			}
			_buildColumnInfoQuery(e, t, n, i) {
				return (
					e
						? ((t += ' and table_schema = ?'), n.push(e))
						: (t += ' and table_schema = current_schema()'),
					{
						sql: t,
						bindings: n,
						output(s) {
							let o = OY(
								s.rows,
								function (a, u) {
									return (
										(a[u.column_name] = {
											type: u.data_type,
											maxLength: u.character_maximum_length,
											nullable: u.is_nullable === 'YES',
											defaultValue: u.column_default,
										}),
										a
									);
								},
								{}
							);
							return (i && o[i]) || o;
						},
					}
				);
			}
			distinctOn(e) {
				return 'distinct on (' + this.formatter.columnize(e) + ') ';
			}
			jsonExtract(e) {
				return this._jsonExtract('jsonb_path_query', e);
			}
			jsonSet(e) {
				return this._jsonSet(
					'jsonb_set',
					Object.assign({}, e, {path: this.client.toPathForJson(e.path)})
				);
			}
			jsonInsert(e) {
				return this._jsonSet(
					'jsonb_insert',
					Object.assign({}, e, {path: this.client.toPathForJson(e.path)})
				);
			}
			jsonRemove(e) {
				let t = `${kT(e.column, this.builder, this.client, this.bindingsHolder)} #- ${this.client.parameter(this.client.toPathForJson(e.path), this.builder, this.bindingsHolder)}`;
				return e.alias ? this.client.alias(t, this.formatter.wrap(e.alias)) : t;
			}
			whereJsonPath(e) {
				let t = '';
				return (
					!isNaN(e.value) && parseInt(e.value)
						? (t = '::int')
						: !isNaN(e.value) && parseFloat(e.value)
							? (t = '::float')
							: (t = " #>> '{}'"),
					`jsonb_path_query_first(${this._columnClause(e)}, ${this.client.parameter(e.jsonPath, this.builder, this.bindingsHolder)})${t} ${NY(e.operator, this.builder, this.client, this.bindingsHolder)} ${this._jsonValueClause(e)}`
				);
			}
			whereJsonSupersetOf(e) {
				return this._not(
					e,
					`${$T(e.column, void 0, this.builder, this.client, this.bindingsHolder)} @> ${this._jsonValueClause(e)}`
				);
			}
			whereJsonSubsetOf(e) {
				return this._not(
					e,
					`${kT(e.column, this.builder, this.client, this.bindingsHolder)} <@ ${this._jsonValueClause(e)}`
				);
			}
			onJsonPathEquals(e) {
				return this._onJsonPathEquals('jsonb_path_query_first', e);
			}
		};
	MT.exports = Oh;
});
var LT = l((gfe, jT) => {
	var IY = Ze();
	jT.exports = class extends IY {
		updateFrom(e) {
			return (this._single.updateFrom = e), this;
		}
		using(e) {
			return (this._single.using = e), this;
		}
		withMaterialized(e, t, n) {
			return (
				this._validateWithArgs(e, t, n, 'with'), this.withWrapped(e, t, n, !0)
			);
		}
		withNotMaterialized(e, t, n) {
			return (
				this._validateWithArgs(e, t, n, 'with'), this.withWrapped(e, t, n, !1)
			);
		}
	};
});
var ra = l((yfe, UT) => {
	var PY = Pt(),
		{isObject: kY} = U(),
		{toNumber: BT} = re(),
		$Y = /(?<!')'(?!')/g,
		et = class extends PY {
			constructor(e, t, n) {
				super(e, t, n),
					(this.modifiers = ['nullable', 'defaultTo', 'comment']),
					this._addCheckModifiers();
			}
			bit(e) {
				return e.length !== !1 ? `bit(${e.length})` : 'bit';
			}
			enu(e, t) {
				t = t || {};
				let n = t.useNative && t.existingType ? void 0 : e.join("', '");
				if (t.useNative) {
					let i = '',
						s = t.schemaName || this.tableCompiler.schemaNameRaw;
					return (
						s && (i += `"${s}".`),
						(i += `"${t.enumName}"`),
						t.existingType ||
							this.tableCompiler.unshiftQuery(
								`create type ${i} as enum ('${n}')`
							),
						i
					);
				}
				return `text check (${this.formatter.wrap(this.args[0])} in ('${n}'))`;
			}
			decimal(e, t) {
				return e === null ? 'decimal' : `decimal(${BT(e, 8)}, ${BT(t, 2)})`;
			}
			json(e) {
				return (
					e && this.client.logger.deprecate('json(true)', 'jsonb()'),
					DT(this.client, e)
				);
			}
			jsonb() {
				return DT(this.client, !0);
			}
			checkRegex(e, t) {
				return this._check(
					`${this.formatter.wrap(this.getColumnName())} ~ ${this.client._escapeBinding(e)}`,
					t
				);
			}
			datetime(e = !1, t) {
				let n;
				return (
					kY(e) ? ({useTz: n, precision: t} = e) : (n = !e),
					(n = typeof n == 'boolean' ? n : !0),
					(t = t != null ? '(' + t + ')' : ''),
					`${n ? 'timestamptz' : 'timestamp'}${t}`
				);
			}
			timestamp(e = !1, t) {
				return this.datetime(e, t);
			}
			comment(e) {
				let t = this.args[0] || this.defaults('columnName'),
					n = e ? `'${e.replace($Y, "''")}'` : 'NULL';
				this.pushAdditional(function () {
					this.pushQuery(
						`comment on column ${this.tableCompiler.tableName()}.` +
							this.formatter.wrap(t) +
							` is ${n}`
					);
				}, e);
			}
			increments(e = {primaryKey: !0}) {
				return (
					'serial' +
					(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '')
				);
			}
			bigincrements(e = {primaryKey: !0}) {
				return (
					'bigserial' +
					(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '')
				);
			}
			uuid(e = {primaryKey: !1}) {
				return (
					'uuid' +
					(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '')
				);
			}
		};
	et.prototype.bigint = 'bigint';
	et.prototype.binary = 'bytea';
	et.prototype.bool = 'boolean';
	et.prototype.double = 'double precision';
	et.prototype.floating = 'real';
	et.prototype.smallint = 'smallint';
	et.prototype.tinyint = 'smallint';
	function DT(r, e) {
		return !r.version ||
			r.config.client === 'cockroachdb' ||
			r.config.jsonbSupport === !0 ||
			parseFloat(r.version) >= 9.2
			? e
				? 'jsonb'
				: 'json'
			: 'text';
	}
	UT.exports = et;
});
var ia = l((bfe, FT) => {
	var MY = Hi(),
		jY = xr(),
		{isObject: na, isString: LY} = U(),
		Rh = class extends jY {
			constructor(e, t) {
				super(e, t);
			}
			renameColumn(e, t) {
				return this.pushQuery({
					sql: `alter table ${this.tableName()} rename ${this.formatter.wrap(e)} to ${this.formatter.wrap(t)}`,
				});
			}
			_setNullableState(e, t) {
				let n = t ? 'drop not null' : 'set not null',
					i = `alter table ${this.tableName()} alter column ${this.formatter.wrap(e)} ${n}`;
				return this.pushQuery({sql: i});
			}
			compileAdd(e) {
				let t = this.formatter.wrap(e),
					n = this.prefixArray('add column', this.getColumns(e));
				return this.pushQuery({sql: `alter table ${t} ${n.join(', ')}`});
			}
			createQuery(e, t, n) {
				let i = t ? 'create table if not exists ' : 'create table ',
					s = ` (${e.sql.join(', ')}${this.primaryKeys() || ''}${this._addChecks()})`,
					o =
						i +
						this.tableName() +
						(n && this.tableNameLike()
							? ' (like ' +
								this.tableNameLike() +
								' including all' +
								(e.sql.length ? ', ' + e.sql.join(', ') : '') +
								')'
							: s);
				this.single.inherits &&
					(o += ` inherits (${this.formatter.wrap(this.single.inherits)})`),
					this.pushQuery({sql: o, bindings: e.bindings}),
					MY(this.single, 'comment') && this.comment(this.single.comment);
			}
			primaryKeys() {
				let e = (this.grouped.alterTable || []).filter(
					(t) => t.method === 'primary'
				);
				if (e.length > 0 && e[0].args.length > 0) {
					let t = e[0].args[0],
						n = e[0].args[1] || '',
						i;
					return (
						na(n) && ({constraintName: n, deferrable: i} = n),
						(i = i ? ` deferrable initially ${i}` : ''),
						(n = n
							? this.formatter.wrap(n)
							: this.formatter.wrap(`${this.tableNameRaw}_pkey`)),
						`, constraint ${n} primary key (${this.formatter.columnize(t)})${i}`
					);
				}
			}
			addColumns(e, t, n) {
				if (t === this.alterColumnsPrefix) for (let i of n) this._addColumn(i);
				else super.addColumns(e, t);
			}
			_addColumn(e) {
				let t = this.tableName(),
					n = e.getColumnType(),
					i = this.client.wrapIdentifier(
						e.getColumnName(),
						e.columnBuilder.queryContext()
					),
					s = e.type === 'enu';
				this.pushQuery({
					sql: `alter table ${t} alter column ${i} drop default`,
					bindings: [],
				});
				let o = e.columnBuilder.alterNullable;
				o &&
					this.pushQuery({
						sql: `alter table ${t} alter column ${i} drop not null`,
						bindings: [],
					}),
					e.columnBuilder.alterType &&
						this.pushQuery({
							sql: `alter table ${t} alter column ${i} type ${n} using (${i}${s ? '::text::' : '::'}${n})`,
							bindings: [],
						});
				let u = e.modified.defaultTo;
				if (u) {
					let c = e.defaultTo.apply(e, u);
					this.pushQuery({
						sql: `alter table ${t} alter column ${i} set ${c}`,
						bindings: [],
					});
				}
				if (o) {
					let c = e.modified.nullable;
					c &&
						c[0] === !1 &&
						this.pushQuery({
							sql: `alter table ${t} alter column ${i} set not null`,
							bindings: [],
						});
				}
			}
			comment(e) {
				this.pushQuery(
					`comment on table ${this.tableName()} is '${this.single.comment}'`
				);
			}
			primary(e, t) {
				let n;
				na(t) && ({constraintName: t, deferrable: n} = t),
					(n = n ? ` deferrable initially ${n}` : ''),
					(t = t
						? this.formatter.wrap(t)
						: this.formatter.wrap(`${this.tableNameRaw}_pkey`)),
					this.method !== 'create' &&
						this.method !== 'createIfNot' &&
						this.pushQuery(
							`alter table ${this.tableName()} add constraint ${t} primary key (${this.formatter.columnize(e)})${n}`
						);
			}
			unique(e, t) {
				let n,
					i = !0,
					s;
				if (
					(na(t) &&
						(({
							indexName: t,
							deferrable: n,
							useConstraint: i,
							predicate: s,
						} = t),
						i === void 0 && (i = !!n || !s)),
					!i && n && n !== 'not deferrable')
				)
					throw new Error('postgres cannot create deferrable index');
				if (i && s)
					throw new Error('postgres cannot create constraint with predicate');
				if (
					((n = n ? ` deferrable initially ${n}` : ''),
					(t = t
						? this.formatter.wrap(t)
						: this._indexCommand('unique', this.tableNameRaw, e)),
					i)
				)
					this.pushQuery(
						`alter table ${this.tableName()} add constraint ${t} unique (` +
							this.formatter.columnize(e) +
							')' +
							n
					);
				else {
					let o = s ? ' ' + this.client.queryCompiler(s).where() : '';
					this.pushQuery(
						`create unique index ${t} on ${this.tableName()} (${this.formatter.columnize(e)})${o}`
					);
				}
			}
			index(e, t, n) {
				t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e);
				let i, s, o;
				LY(n)
					? (s = n)
					: na(n) &&
						({indexType: o, storageEngineIndexType: s, predicate: i} = n);
				let a = i ? ' ' + this.client.queryCompiler(i).where() : '';
				this.pushQuery(
					`create${typeof o == 'string' && o.toLowerCase() === 'unique' ? ' unique' : ''} index ${t} on ${this.tableName()}${(s && ` using ${s}`) || ''} (` +
						this.formatter.columnize(e) +
						`)${a}`
				);
			}
			dropPrimary(e) {
				(e = e
					? this.formatter.wrap(e)
					: this.formatter.wrap(this.tableNameRaw + '_pkey')),
					this.pushQuery(
						`alter table ${this.tableName()} drop constraint ${e}`
					);
			}
			dropIndex(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e)),
					(t = this.schemaNameRaw
						? `${this.formatter.wrap(this.schemaNameRaw)}.${t}`
						: t),
					this.pushQuery(`drop index ${t}`);
			}
			dropUnique(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('unique', this.tableNameRaw, e)),
					this.pushQuery(
						`alter table ${this.tableName()} drop constraint ${t}`
					);
			}
			dropForeign(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('foreign', this.tableNameRaw, e)),
					this.pushQuery(
						`alter table ${this.tableName()} drop constraint ${t}`
					);
			}
		};
	FT.exports = Rh;
});
var sa = l((_fe, QT) => {
	var BY = qr(),
		Nh = class extends BY {
			constructor(e, t) {
				super(e, t);
			}
			renameColumn(e, t) {
				return this.pushQuery({
					sql: `alter view ${this.viewName()} rename ${this.formatter.wrap(e)} to ${this.formatter.wrap(t)}`,
				});
			}
			defaultTo(e, t) {
				return this.pushQuery({
					sql: `alter view ${this.viewName()} alter ${this.formatter.wrap(e)} set default ${t}`,
				});
			}
			createOrReplace() {
				this.createQuery(this.columns, this.selectQuery, !1, !0);
			}
			createMaterializedView() {
				this.createQuery(this.columns, this.selectQuery, !0);
			}
		};
	QT.exports = Nh;
});
var WT = l((wfe, HT) => {
	var DY = An(),
		Ih = class extends DY {
			constructor() {
				super(...arguments);
			}
			checkOption() {
				this._single.checkOption = 'default_option';
			}
			localCheckOption() {
				this._single.checkOption = 'local';
			}
			cascadedCheckOption() {
				this._single.checkOption = 'cascaded';
			}
		};
	HT.exports = Ih;
});
var kh = l((vfe, VT) => {
	var UY = Er(),
		Ph = class extends UY {
			constructor(e, t) {
				super(e, t);
			}
			hasTable(e) {
				let t = 'select * from information_schema.tables where table_name = ?',
					n = [e];
				this.schema
					? ((t += ' and table_schema = ?'), n.push(this.schema))
					: (t += ' and table_schema = current_schema()'),
					this.pushQuery({
						sql: t,
						bindings: n,
						output(i) {
							return i.rows.length > 0;
						},
					});
			}
			hasColumn(e, t) {
				let n =
						'select * from information_schema.columns where table_name = ? and column_name = ?',
					i = [e, t];
				this.schema
					? ((n += ' and table_schema = ?'), i.push(this.schema))
					: (n += ' and table_schema = current_schema()'),
					this.pushQuery({
						sql: n,
						bindings: i,
						output(s) {
							return s.rows.length > 0;
						},
					});
			}
			qualifiedTableName(e) {
				let t = this.schema ? `${this.schema}.${e}` : e;
				return this.formatter.wrap(t);
			}
			renameTable(e, t) {
				this.pushQuery(
					`alter table ${this.qualifiedTableName(e)} rename to ${this.formatter.wrap(t)}`
				);
			}
			createSchema(e) {
				this.pushQuery(`create schema ${this.formatter.wrap(e)}`);
			}
			createSchemaIfNotExists(e) {
				this.pushQuery(`create schema if not exists ${this.formatter.wrap(e)}`);
			}
			dropSchema(e, t = !1) {
				this.pushQuery(
					`drop schema ${this.formatter.wrap(e)}${t ? ' cascade' : ''}`
				);
			}
			dropSchemaIfExists(e, t = !1) {
				this.pushQuery(
					`drop schema if exists ${this.formatter.wrap(e)}${t ? ' cascade' : ''}`
				);
			}
			dropExtension(e) {
				this.pushQuery(`drop extension ${this.formatter.wrap(e)}`);
			}
			dropExtensionIfExists(e) {
				this.pushQuery(`drop extension if exists ${this.formatter.wrap(e)}`);
			}
			createExtension(e) {
				this.pushQuery(`create extension ${this.formatter.wrap(e)}`);
			}
			createExtensionIfNotExists(e) {
				this.pushQuery(
					`create extension if not exists ${this.formatter.wrap(e)}`
				);
			}
			renameView(e, t) {
				this.pushQuery(
					this.alterViewPrefix +
						`${this.formatter.wrap(e)} rename to ${this.formatter.wrap(t)}`
				);
			}
			refreshMaterializedView(e, t = !1) {
				this.pushQuery({
					sql: `refresh materialized view${t ? ' concurrently' : ''} ${this.formatter.wrap(e)}`,
				});
			}
			dropMaterializedView(e) {
				this._dropView(e, !1, !0);
			}
			dropMaterializedViewIfExists(e) {
				this._dropView(e, !0, !0);
			}
		};
	VT.exports = Ph;
});
var Mh = l((GT) => {
	'use strict';
	GT.parse = function (r, e) {
		return new $h(r, e).parse();
	};
	var $h = class r {
		constructor(e, t) {
			(this.source = e),
				(this.transform = t || FY),
				(this.position = 0),
				(this.entries = []),
				(this.recorded = []),
				(this.dimension = 0);
		}
		isEof() {
			return this.position >= this.source.length;
		}
		nextCharacter() {
			var e = this.source[this.position++];
			return e === '\\'
				? {value: this.source[this.position++], escaped: !0}
				: {value: e, escaped: !1};
		}
		record(e) {
			this.recorded.push(e);
		}
		newEntry(e) {
			var t;
			(this.recorded.length > 0 || e) &&
				((t = this.recorded.join('')),
				t === 'NULL' && !e && (t = null),
				t !== null && (t = this.transform(t)),
				this.entries.push(t),
				(this.recorded = []));
		}
		consumeDimensions() {
			if (this.source[0] === '[')
				for (; !this.isEof(); ) {
					var e = this.nextCharacter();
					if (e.value === '=') break;
				}
		}
		parse(e) {
			var t, n, i;
			for (this.consumeDimensions(); !this.isEof(); )
				if (((t = this.nextCharacter()), t.value === '{' && !i))
					this.dimension++,
						this.dimension > 1 &&
							((n = new r(
								this.source.substr(this.position - 1),
								this.transform
							)),
							this.entries.push(n.parse(!0)),
							(this.position += n.position - 2));
				else if (t.value === '}' && !i) {
					if ((this.dimension--, !this.dimension && (this.newEntry(), e)))
						return this.entries;
				} else
					t.value === '"' && !t.escaped
						? (i && this.newEntry(!0), (i = !i))
						: t.value === ',' && !i
							? this.newEntry()
							: this.record(t.value);
			if (this.dimension !== 0) throw new Error('array dimension not balanced');
			return this.entries;
		}
	};
	function FY(r) {
		return r;
	}
});
var jh = l((xfe, JT) => {
	var QY = Mh();
	JT.exports = {
		create: function (r, e) {
			return {
				parse: function () {
					return QY.parse(r, e);
				},
			};
		},
	};
});
var ZT = l((Cfe, zT) => {
	'use strict';
	var HY =
			/(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/,
		WY = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/,
		VY = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/,
		GY = /^-?infinity$/;
	zT.exports = function (e) {
		if (GY.test(e)) return Number(e.replace('i', 'I'));
		var t = HY.exec(e);
		if (!t) return JY(e) || null;
		var n = !!t[8],
			i = parseInt(t[1], 10);
		n && (i = KT(i));
		var s = parseInt(t[2], 10) - 1,
			o = t[3],
			a = parseInt(t[4], 10),
			u = parseInt(t[5], 10),
			c = parseInt(t[6], 10),
			h = t[7];
		h = h ? 1e3 * parseFloat(h) : 0;
		var d,
			f = KY(e);
		return (
			f != null
				? ((d = new Date(Date.UTC(i, s, o, a, u, c, h))),
					Lh(i) && d.setUTCFullYear(i),
					f !== 0 && d.setTime(d.getTime() - f))
				: ((d = new Date(i, s, o, a, u, c, h)), Lh(i) && d.setFullYear(i)),
			d
		);
	};
	function JY(r) {
		var e = WY.exec(r);
		if (e) {
			var t = parseInt(e[1], 10),
				n = !!e[4];
			n && (t = KT(t));
			var i = parseInt(e[2], 10) - 1,
				s = e[3],
				o = new Date(t, i, s);
			return Lh(t) && o.setFullYear(t), o;
		}
	}
	function KY(r) {
		if (r.endsWith('+00')) return 0;
		var e = VY.exec(r.split(' ')[1]);
		if (e) {
			var t = e[1];
			if (t === 'Z') return 0;
			var n = t === '-' ? -1 : 1,
				i =
					parseInt(e[2], 10) * 3600 +
					parseInt(e[3] || 0, 10) * 60 +
					parseInt(e[4] || 0, 10);
			return i * n * 1e3;
		}
	}
	function KT(r) {
		return -(r - 1);
	}
	function Lh(r) {
		return r >= 0 && r < 100;
	}
});
var XT = l((qfe, YT) => {
	YT.exports = ZY;
	var zY = Object.prototype.hasOwnProperty;
	function ZY(r) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var n in t) zY.call(t, n) && (r[n] = t[n]);
		}
		return r;
	}
});
var rA = l((Tfe, tA) => {
	'use strict';
	var YY = XT();
	tA.exports = Rn;
	function Rn(r) {
		if (!(this instanceof Rn)) return new Rn(r);
		YY(this, l7(r));
	}
	var XY = ['seconds', 'minutes', 'hours', 'days', 'months', 'years'];
	Rn.prototype.toPostgres = function () {
		var r = XY.filter(this.hasOwnProperty, this);
		return (
			this.milliseconds && r.indexOf('seconds') < 0 && r.push('seconds'),
			r.length === 0
				? '0'
				: r
						.map(function (e) {
							var t = this[e] || 0;
							return (
								e === 'seconds' &&
									this.milliseconds &&
									(t = (t + this.milliseconds / 1e3)
										.toFixed(6)
										.replace(/\.?0+$/, '')),
								t + ' ' + e
							);
						}, this)
						.join(' ')
		);
	};
	var e7 = {
			years: 'Y',
			months: 'M',
			days: 'D',
			hours: 'H',
			minutes: 'M',
			seconds: 'S',
		},
		t7 = ['years', 'months', 'days'],
		r7 = ['hours', 'minutes', 'seconds'];
	Rn.prototype.toISOString = Rn.prototype.toISO = function () {
		var r = t7.map(t, this).join(''),
			e = r7.map(t, this).join('');
		return 'P' + r + 'T' + e;
		function t(n) {
			var i = this[n] || 0;
			return (
				n === 'seconds' &&
					this.milliseconds &&
					(i = (i + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, '')),
				i + e7[n]
			);
		}
	};
	var Bh = '([+-]?\\d+)',
		n7 = Bh + '\\s+years?',
		i7 = Bh + '\\s+mons?',
		s7 = Bh + '\\s+days?',
		o7 = '([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?',
		a7 = new RegExp(
			[n7, i7, s7, o7]
				.map(function (r) {
					return '(' + r + ')?';
				})
				.join('\\s*')
		),
		eA = {
			years: 2,
			months: 4,
			days: 6,
			hours: 9,
			minutes: 10,
			seconds: 11,
			milliseconds: 12,
		},
		u7 = ['hours', 'minutes', 'seconds', 'milliseconds'];
	function c7(r) {
		var e = r + '000000'.slice(r.length);
		return parseInt(e, 10) / 1e3;
	}
	function l7(r) {
		if (!r) return {};
		var e = a7.exec(r),
			t = e[8] === '-';
		return Object.keys(eA).reduce(function (n, i) {
			var s = eA[i],
				o = e[s];
			return (
				!o ||
					((o = i === 'milliseconds' ? c7(o) : parseInt(o, 10)), !o) ||
					(t && ~u7.indexOf(i) && (o *= -1), (n[i] = o)),
				n
			);
		}, {});
	}
});
var iA = l((Afe, nA) => {
	'use strict';
	nA.exports = function (e) {
		if (/^\\x/.test(e)) return new Buffer(e.substr(2), 'hex');
		for (var t = '', n = 0; n < e.length; )
			if (e[n] !== '\\') (t += e[n]), ++n;
			else if (/[0-7]{3}/.test(e.substr(n + 1, 3)))
				(t += String.fromCharCode(parseInt(e.substr(n + 1, 3), 8))), (n += 4);
			else {
				for (var i = 1; n + i < e.length && e[n + i] === '\\'; ) i++;
				for (var s = 0; s < Math.floor(i / 2); ++s) t += '\\';
				n += Math.floor(i / 2) * 2;
			}
		return new Buffer(t, 'binary');
	};
});
var hA = l((Sfe, lA) => {
	var Xi = Mh(),
		es = jh(),
		oa = ZT(),
		oA = rA(),
		aA = iA();
	function aa(r) {
		return function (t) {
			return t === null ? t : r(t);
		};
	}
	function uA(r) {
		return r === null
			? r
			: r === 'TRUE' ||
					r === 't' ||
					r === 'true' ||
					r === 'y' ||
					r === 'yes' ||
					r === 'on' ||
					r === '1';
	}
	function h7(r) {
		return r ? Xi.parse(r, uA) : null;
	}
	function d7(r) {
		return parseInt(r, 10);
	}
	function Dh(r) {
		return r ? Xi.parse(r, aa(d7)) : null;
	}
	function f7(r) {
		return r
			? Xi.parse(
					r,
					aa(function (e) {
						return cA(e).trim();
					})
				)
			: null;
	}
	var p7 = function (r) {
			if (!r) return null;
			var e = es.create(r, function (t) {
				return t !== null && (t = Hh(t)), t;
			});
			return e.parse();
		},
		Uh = function (r) {
			if (!r) return null;
			var e = es.create(r, function (t) {
				return t !== null && (t = parseFloat(t)), t;
			});
			return e.parse();
		},
		$e = function (r) {
			if (!r) return null;
			var e = es.create(r);
			return e.parse();
		},
		Fh = function (r) {
			if (!r) return null;
			var e = es.create(r, function (t) {
				return t !== null && (t = oa(t)), t;
			});
			return e.parse();
		},
		m7 = function (r) {
			if (!r) return null;
			var e = es.create(r, function (t) {
				return t !== null && (t = oA(t)), t;
			});
			return e.parse();
		},
		g7 = function (r) {
			return r ? Xi.parse(r, aa(aA)) : null;
		},
		Qh = function (r) {
			return parseInt(r, 10);
		},
		cA = function (r) {
			var e = String(r);
			return /^\d+$/.test(e) ? e : r;
		},
		sA = function (r) {
			return r ? Xi.parse(r, aa(JSON.parse)) : null;
		},
		Hh = function (r) {
			return r[0] !== '('
				? null
				: ((r = r.substring(1, r.length - 1).split(',')),
					{x: parseFloat(r[0]), y: parseFloat(r[1])});
		},
		y7 = function (r) {
			if (r[0] !== '<' && r[1] !== '(') return null;
			for (var e = '(', t = '', n = !1, i = 2; i < r.length - 1; i++) {
				if ((n || (e += r[i]), r[i] === ')')) {
					n = !0;
					continue;
				} else if (!n) continue;
				r[i] !== ',' && (t += r[i]);
			}
			var s = Hh(e);
			return (s.radius = parseFloat(t)), s;
		},
		b7 = function (r) {
			r(20, cA),
				r(21, Qh),
				r(23, Qh),
				r(26, Qh),
				r(700, parseFloat),
				r(701, parseFloat),
				r(16, uA),
				r(1082, oa),
				r(1114, oa),
				r(1184, oa),
				r(600, Hh),
				r(651, $e),
				r(718, y7),
				r(1e3, h7),
				r(1001, g7),
				r(1005, Dh),
				r(1007, Dh),
				r(1028, Dh),
				r(1016, f7),
				r(1017, p7),
				r(1021, Uh),
				r(1022, Uh),
				r(1231, Uh),
				r(1014, $e),
				r(1015, $e),
				r(1008, $e),
				r(1009, $e),
				r(1040, $e),
				r(1041, $e),
				r(1115, Fh),
				r(1182, Fh),
				r(1185, Fh),
				r(1186, oA),
				r(1187, m7),
				r(17, aA),
				r(114, JSON.parse.bind(JSON)),
				r(3802, JSON.parse.bind(JSON)),
				r(199, sA),
				r(3807, sA),
				r(3907, $e),
				r(2951, $e),
				r(791, $e),
				r(1183, $e),
				r(1270, $e);
		};
	lA.exports = {init: b7};
});
var fA = l((Ofe, dA) => {
	'use strict';
	var ve = 1e6;
	function _7(r) {
		var e = r.readInt32BE(0),
			t = r.readUInt32BE(4),
			n = '';
		e < 0 && ((e = ~e + (t === 0)), (t = (~t + 1) >>> 0), (n = '-'));
		var i = '',
			s,
			o,
			a,
			u,
			c,
			h;
		{
			if (
				((s = e % ve),
				(e = (e / ve) >>> 0),
				(o = 4294967296 * s + t),
				(t = (o / ve) >>> 0),
				(a = '' + (o - ve * t)),
				t === 0 && e === 0)
			)
				return n + a + i;
			for (u = '', c = 6 - a.length, h = 0; h < c; h++) u += '0';
			i = u + a + i;
		}
		{
			if (
				((s = e % ve),
				(e = (e / ve) >>> 0),
				(o = 4294967296 * s + t),
				(t = (o / ve) >>> 0),
				(a = '' + (o - ve * t)),
				t === 0 && e === 0)
			)
				return n + a + i;
			for (u = '', c = 6 - a.length, h = 0; h < c; h++) u += '0';
			i = u + a + i;
		}
		{
			if (
				((s = e % ve),
				(e = (e / ve) >>> 0),
				(o = 4294967296 * s + t),
				(t = (o / ve) >>> 0),
				(a = '' + (o - ve * t)),
				t === 0 && e === 0)
			)
				return n + a + i;
			for (u = '', c = 6 - a.length, h = 0; h < c; h++) u += '0';
			i = u + a + i;
		}
		return (
			(s = e % ve), (o = 4294967296 * s + t), (a = '' + (o % ve)), n + a + i
		);
	}
	dA.exports = _7;
});
var bA = l((Rfe, yA) => {
	var w7 = fA(),
		G = function (r, e, t, n, i) {
			(t = t || 0),
				(n = n || !1),
				(i =
					i ||
					function (m, g, y) {
						return m * Math.pow(2, y) + g;
					});
			var s = t >> 3,
				o = function (m) {
					return n ? ~m & 255 : m;
				},
				a = 255,
				u = 8 - (t % 8);
			e < u && ((a = (255 << (8 - e)) & 255), (u = e)), t && (a = a >> t % 8);
			var c = 0;
			(t % 8) + e >= 8 && (c = i(0, o(r[s]) & a, u));
			for (var h = (e + t) >> 3, d = s + 1; d < h; d++) c = i(c, o(r[d]), 8);
			var f = (e + t) % 8;
			return f > 0 && (c = i(c, o(r[h]) >> (8 - f), f)), c;
		},
		gA = function (r, e, t) {
			var n = Math.pow(2, t - 1) - 1,
				i = G(r, 1),
				s = G(r, t, 1);
			if (s === 0) return 0;
			var o = 1,
				a = function (c, h, d) {
					c === 0 && (c = 1);
					for (var f = 1; f <= d; f++)
						(o /= 2), (h & (1 << (d - f))) > 0 && (c += o);
					return c;
				},
				u = G(r, e, t + 1, !1, a);
			return s == Math.pow(2, t + 1) - 1
				? u === 0
					? i === 0
						? 1 / 0
						: -1 / 0
					: NaN
				: (i === 0 ? 1 : -1) * Math.pow(2, s - n) * u;
		},
		v7 = function (r) {
			return G(r, 1) == 1 ? -1 * (G(r, 15, 1, !0) + 1) : G(r, 15, 1);
		},
		pA = function (r) {
			return G(r, 1) == 1 ? -1 * (G(r, 31, 1, !0) + 1) : G(r, 31, 1);
		},
		E7 = function (r) {
			return gA(r, 23, 8);
		},
		x7 = function (r) {
			return gA(r, 52, 11);
		},
		C7 = function (r) {
			var e = G(r, 16, 32);
			if (e == 49152) return NaN;
			for (
				var t = Math.pow(1e4, G(r, 16, 16)), n = 0, i = [], s = G(r, 16), o = 0;
				o < s;
				o++
			)
				(n += G(r, 16, 64 + 16 * o) * t), (t /= 1e4);
			var a = Math.pow(10, G(r, 16, 48));
			return ((e === 0 ? 1 : -1) * Math.round(n * a)) / a;
		},
		mA = function (r, e) {
			var t = G(e, 1),
				n = G(e, 63, 1),
				i = new Date(((t === 0 ? 1 : -1) * n) / 1e3 + 9466848e5);
			return (
				r || i.setTime(i.getTime() + i.getTimezoneOffset() * 6e4),
				(i.usec = n % 1e3),
				(i.getMicroSeconds = function () {
					return this.usec;
				}),
				(i.setMicroSeconds = function (s) {
					this.usec = s;
				}),
				(i.getUTCMicroSeconds = function () {
					return this.usec;
				}),
				i
			);
		},
		ts = function (r) {
			for (
				var e = G(r, 32),
					t = G(r, 32, 32),
					n = G(r, 32, 64),
					i = 96,
					s = [],
					o = 0;
				o < e;
				o++
			)
				(s[o] = G(r, 32, i)), (i += 32), (i += 32);
			var a = function (c) {
					var h = G(r, 32, i);
					if (((i += 32), h == 4294967295)) return null;
					var d;
					if (c == 23 || c == 20) return (d = G(r, h * 8, i)), (i += h * 8), d;
					if (c == 25)
						return (
							(d = r.toString(this.encoding, i >> 3, (i += h << 3) >> 3)), d
						);
					console.log('ERROR: ElementType not implemented: ' + c);
				},
				u = function (c, h) {
					var d = [],
						f;
					if (c.length > 1) {
						var m = c.shift();
						for (f = 0; f < m; f++) d[f] = u(c, h);
						c.unshift(m);
					} else for (f = 0; f < c[0]; f++) d[f] = a(h);
					return d;
				};
			return u(s, n);
		},
		q7 = function (r) {
			return r.toString('utf8');
		},
		T7 = function (r) {
			return r === null ? null : G(r, 8) > 0;
		},
		A7 = function (r) {
			r(20, w7),
				r(21, v7),
				r(23, pA),
				r(26, pA),
				r(1700, C7),
				r(700, E7),
				r(701, x7),
				r(16, T7),
				r(1114, mA.bind(null, !1)),
				r(1184, mA.bind(null, !0)),
				r(1e3, ts),
				r(1007, ts),
				r(1016, ts),
				r(1008, ts),
				r(1009, ts),
				r(25, q7);
		};
	yA.exports = {init: A7};
});
var wA = l((Nfe, _A) => {
	_A.exports = {
		BOOL: 16,
		BYTEA: 17,
		CHAR: 18,
		INT8: 20,
		INT2: 21,
		INT4: 23,
		REGPROC: 24,
		TEXT: 25,
		OID: 26,
		TID: 27,
		XID: 28,
		CID: 29,
		JSON: 114,
		XML: 142,
		PG_NODE_TREE: 194,
		SMGR: 210,
		PATH: 602,
		POLYGON: 604,
		CIDR: 650,
		FLOAT4: 700,
		FLOAT8: 701,
		ABSTIME: 702,
		RELTIME: 703,
		TINTERVAL: 704,
		CIRCLE: 718,
		MACADDR8: 774,
		MONEY: 790,
		MACADDR: 829,
		INET: 869,
		ACLITEM: 1033,
		BPCHAR: 1042,
		VARCHAR: 1043,
		DATE: 1082,
		TIME: 1083,
		TIMESTAMP: 1114,
		TIMESTAMPTZ: 1184,
		INTERVAL: 1186,
		TIMETZ: 1266,
		BIT: 1560,
		VARBIT: 1562,
		NUMERIC: 1700,
		REFCURSOR: 1790,
		REGPROCEDURE: 2202,
		REGOPER: 2203,
		REGOPERATOR: 2204,
		REGCLASS: 2205,
		REGTYPE: 2206,
		UUID: 2950,
		TXID_SNAPSHOT: 2970,
		PG_LSN: 3220,
		PG_NDISTINCT: 3361,
		PG_DEPENDENCIES: 3402,
		TSVECTOR: 3614,
		TSQUERY: 3615,
		GTSVECTOR: 3642,
		REGCONFIG: 3734,
		REGDICTIONARY: 3769,
		JSONB: 3802,
		REGNAMESPACE: 4089,
		REGROLE: 4096,
	};
});
var is = l((ns) => {
	var S7 = hA(),
		O7 = bA(),
		R7 = jh(),
		N7 = wA();
	ns.getTypeParser = I7;
	ns.setTypeParser = P7;
	ns.arrayParser = R7;
	ns.builtins = N7;
	var rs = {text: {}, binary: {}};
	function vA(r) {
		return String(r);
	}
	function I7(r, e) {
		return (e = e || 'text'), (rs[e] && rs[e][r]) || vA;
	}
	function P7(r, e, t) {
		typeof e == 'function' && ((t = e), (e = 'text')), (rs[e][r] = t);
	}
	S7.init(function (r, e) {
		rs.text[r] = e;
	});
	O7.init(function (r, e) {
		rs.binary[r] = e;
	});
});
var ss = l((Pfe, Wh) => {
	'use strict';
	Wh.exports = {
		host: 'localhost',
		user:
			process.platform === 'win32' ? process.env.USERNAME : process.env.USER,
		database: void 0,
		password: null,
		connectionString: void 0,
		port: 5432,
		rows: 0,
		binary: !1,
		max: 10,
		idleTimeoutMillis: 3e4,
		client_encoding: '',
		ssl: !1,
		application_name: void 0,
		fallback_application_name: void 0,
		options: void 0,
		parseInputDatesAsUTC: !1,
		statement_timeout: !1,
		lock_timeout: !1,
		idle_in_transaction_session_timeout: !1,
		query_timeout: !1,
		connect_timeout: 0,
		keepalives: 1,
		keepalives_idle: 0,
	};
	var Nn = is(),
		k7 = Nn.getTypeParser(20, 'text'),
		$7 = Nn.getTypeParser(1016, 'text');
	Wh.exports.__defineSetter__('parseInt8', function (r) {
		Nn.setTypeParser(20, 'text', r ? Nn.getTypeParser(23, 'text') : k7),
			Nn.setTypeParser(1016, 'text', r ? Nn.getTypeParser(1007, 'text') : $7);
	});
});
var os = l((kfe, xA) => {
	'use strict';
	var M7 = ss();
	function j7(r) {
		var e = r.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
		return '"' + e + '"';
	}
	function EA(r) {
		for (var e = '{', t = 0; t < r.length; t++)
			if ((t > 0 && (e = e + ','), r[t] === null || typeof r[t] > 'u'))
				e = e + 'NULL';
			else if (Array.isArray(r[t])) e = e + EA(r[t]);
			else if (ArrayBuffer.isView(r[t])) {
				var n = r[t];
				if (!(n instanceof Buffer)) {
					var i = Buffer.from(n.buffer, n.byteOffset, n.byteLength);
					i.length === n.byteLength
						? (n = i)
						: (n = i.slice(n.byteOffset, n.byteOffset + n.byteLength));
				}
				e += '\\\\x' + n.toString('hex');
			} else e += j7(ua(r[t]));
		return (e = e + '}'), e;
	}
	var ua = function (r, e) {
		if (r == null) return null;
		if (r instanceof Buffer) return r;
		if (ArrayBuffer.isView(r)) {
			var t = Buffer.from(r.buffer, r.byteOffset, r.byteLength);
			return t.length === r.byteLength
				? t
				: t.slice(r.byteOffset, r.byteOffset + r.byteLength);
		}
		return r instanceof Date
			? M7.parseInputDatesAsUTC
				? D7(r)
				: B7(r)
			: Array.isArray(r)
				? EA(r)
				: typeof r == 'object'
					? L7(r, e)
					: r.toString();
	};
	function L7(r, e) {
		if (r && typeof r.toPostgres == 'function') {
			if (((e = e || []), e.indexOf(r) !== -1))
				throw new Error(
					'circular reference detected while preparing "' + r + '" for query'
				);
			return e.push(r), ua(r.toPostgres(ua), e);
		}
		return JSON.stringify(r);
	}
	function fe(r, e) {
		for (r = '' + r; r.length < e; ) r = '0' + r;
		return r;
	}
	function B7(r) {
		var e = -r.getTimezoneOffset(),
			t = r.getFullYear(),
			n = t < 1;
		n && (t = Math.abs(t) + 1);
		var i =
			fe(t, 4) +
			'-' +
			fe(r.getMonth() + 1, 2) +
			'-' +
			fe(r.getDate(), 2) +
			'T' +
			fe(r.getHours(), 2) +
			':' +
			fe(r.getMinutes(), 2) +
			':' +
			fe(r.getSeconds(), 2) +
			'.' +
			fe(r.getMilliseconds(), 3);
		return (
			e < 0 ? ((i += '-'), (e *= -1)) : (i += '+'),
			(i += fe(Math.floor(e / 60), 2) + ':' + fe(e % 60, 2)),
			n && (i += ' BC'),
			i
		);
	}
	function D7(r) {
		var e = r.getUTCFullYear(),
			t = e < 1;
		t && (e = Math.abs(e) + 1);
		var n =
			fe(e, 4) +
			'-' +
			fe(r.getUTCMonth() + 1, 2) +
			'-' +
			fe(r.getUTCDate(), 2) +
			'T' +
			fe(r.getUTCHours(), 2) +
			':' +
			fe(r.getUTCMinutes(), 2) +
			':' +
			fe(r.getUTCSeconds(), 2) +
			'.' +
			fe(r.getUTCMilliseconds(), 3);
		return (n += '+00:00'), t && (n += ' BC'), n;
	}
	function U7(r, e, t) {
		return (
			(r = typeof r == 'string' ? {text: r} : r),
			e && (typeof e == 'function' ? (r.callback = e) : (r.values = e)),
			t && (r.callback = t),
			r
		);
	}
	var F7 = function (r) {
			return '"' + r.replace(/"/g, '""') + '"';
		},
		Q7 = function (r) {
			for (var e = !1, t = "'", n = 0; n < r.length; n++) {
				var i = r[n];
				i === "'"
					? (t += i + i)
					: i === '\\'
						? ((t += i + i), (e = !0))
						: (t += i);
			}
			return (t += "'"), e === !0 && (t = ' E' + t), t;
		};
	xA.exports = {
		prepareValue: function (e) {
			return ua(e);
		},
		normalizeQueryConfig: U7,
		escapeIdentifier: F7,
		escapeLiteral: Q7,
	};
});
var qA = l(($fe, CA) => {
	'use strict';
	var as = _('crypto');
	function Vh(r) {
		return as.createHash('md5').update(r, 'utf-8').digest('hex');
	}
	function H7(r, e, t) {
		var n = Vh(e + r),
			i = Vh(Buffer.concat([Buffer.from(n), t]));
		return 'md5' + i;
	}
	function W7(r) {
		return as.createHash('sha256').update(r).digest();
	}
	function V7(r, e) {
		return as.createHmac('sha256', r).update(e).digest();
	}
	async function G7(r, e, t) {
		return as.pbkdf2Sync(r, e, t, 32, 'sha256');
	}
	CA.exports = {
		postgresMd5PasswordHash: H7,
		randomBytes: as.randomBytes,
		deriveKey: G7,
		sha256: W7,
		hmacSha256: V7,
		md5: Vh,
	};
});
var OA = l((Mfe, SA) => {
	var TA = _('crypto');
	SA.exports = {
		postgresMd5PasswordHash: K7,
		randomBytes: J7,
		deriveKey: Y7,
		sha256: z7,
		hmacSha256: Z7,
		md5: Gh,
	};
	var AA = TA.webcrypto || globalThis.crypto,
		In = AA.subtle,
		Jh = new TextEncoder();
	function J7(r) {
		return AA.getRandomValues(Buffer.alloc(r));
	}
	async function Gh(r) {
		try {
			return TA.createHash('md5').update(r, 'utf-8').digest('hex');
		} catch {
			let t = typeof r == 'string' ? Jh.encode(r) : r,
				n = await In.digest('MD5', t);
			return Array.from(new Uint8Array(n))
				.map((i) => i.toString(16).padStart(2, '0'))
				.join('');
		}
	}
	async function K7(r, e, t) {
		var n = await Gh(e + r),
			i = await Gh(Buffer.concat([Buffer.from(n), t]));
		return 'md5' + i;
	}
	async function z7(r) {
		return await In.digest('SHA-256', r);
	}
	async function Z7(r, e) {
		let t = await In.importKey('raw', r, {name: 'HMAC', hash: 'SHA-256'}, !1, [
			'sign',
		]);
		return await In.sign('HMAC', t, Jh.encode(e));
	}
	async function Y7(r, e, t) {
		let n = await In.importKey('raw', Jh.encode(r), 'PBKDF2', !1, [
				'deriveBits',
			]),
			i = {name: 'PBKDF2', hash: 'SHA-256', salt: e, iterations: t};
		return await In.deriveBits(i, n, 32 * 8, ['deriveBits']);
	}
});
var zh = l((jfe, Kh) => {
	'use strict';
	var X7 =
		parseInt(
			process.versions &&
				process.versions.node &&
				process.versions.node.split('.')[0]
		) < 15;
	X7 ? (Kh.exports = qA()) : (Kh.exports = OA());
});
var PA = l((Lfe, IA) => {
	'use strict';
	var Pr = zh();
	function eX(r) {
		if (r.indexOf('SCRAM-SHA-256') === -1)
			throw new Error(
				'SASL: Only mechanism SCRAM-SHA-256 is currently supported'
			);
		let e = Pr.randomBytes(18).toString('base64');
		return {
			mechanism: 'SCRAM-SHA-256',
			clientNonce: e,
			response: 'n,,n=*,r=' + e,
			message: 'SASLInitialResponse',
		};
	}
	async function tX(r, e, t) {
		if (r.message !== 'SASLInitialResponse')
			throw new Error('SASL: Last message was not SASLInitialResponse');
		if (typeof e != 'string')
			throw new Error(
				'SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string'
			);
		if (e === '')
			throw new Error(
				'SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string'
			);
		if (typeof t != 'string')
			throw new Error(
				'SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string'
			);
		let n = iX(t);
		if (n.nonce.startsWith(r.clientNonce)) {
			if (n.nonce.length === r.clientNonce.length)
				throw new Error(
					'SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short'
				);
		} else
			throw new Error(
				'SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce'
			);
		var i = 'n=*,r=' + r.clientNonce,
			s = 'r=' + n.nonce + ',s=' + n.salt + ',i=' + n.iteration,
			o = 'c=biws,r=' + n.nonce,
			a = i + ',' + s + ',' + o,
			u = Buffer.from(n.salt, 'base64'),
			c = await Pr.deriveKey(e, u, n.iteration),
			h = await Pr.hmacSha256(c, 'Client Key'),
			d = await Pr.sha256(h),
			f = await Pr.hmacSha256(d, a),
			m = oX(Buffer.from(h), Buffer.from(f)).toString('base64'),
			g = await Pr.hmacSha256(c, 'Server Key'),
			y = await Pr.hmacSha256(g, a);
		(r.message = 'SASLResponse'),
			(r.serverSignature = Buffer.from(y).toString('base64')),
			(r.response = o + ',p=' + m);
	}
	function rX(r, e) {
		if (r.message !== 'SASLResponse')
			throw new Error('SASL: Last message was not SASLResponse');
		if (typeof e != 'string')
			throw new Error(
				'SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string'
			);
		let {serverSignature: t} = sX(e);
		if (t !== r.serverSignature)
			throw new Error(
				'SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match'
			);
	}
	function nX(r) {
		if (typeof r != 'string')
			throw new TypeError('SASL: text must be a string');
		return r
			.split('')
			.map((e, t) => r.charCodeAt(t))
			.every((e) => (e >= 33 && e <= 43) || (e >= 45 && e <= 126));
	}
	function RA(r) {
		return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(
			r
		);
	}
	function NA(r) {
		if (typeof r != 'string')
			throw new TypeError('SASL: attribute pairs text must be a string');
		return new Map(
			r.split(',').map((e) => {
				if (!/^.=/.test(e))
					throw new Error('SASL: Invalid attribute pair entry');
				let t = e[0],
					n = e.substring(2);
				return [t, n];
			})
		);
	}
	function iX(r) {
		let e = NA(r),
			t = e.get('r');
		if (t) {
			if (!nX(t))
				throw new Error(
					'SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters'
				);
		} else throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing');
		let n = e.get('s');
		if (n) {
			if (!RA(n))
				throw new Error(
					'SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64'
				);
		} else throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing');
		let i = e.get('i');
		if (i) {
			if (!/^[1-9][0-9]*$/.test(i))
				throw new Error(
					'SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count'
				);
		} else
			throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing');
		let s = parseInt(i, 10);
		return {nonce: t, salt: n, iteration: s};
	}
	function sX(r) {
		let t = NA(r).get('v');
		if (t) {
			if (!RA(t))
				throw new Error(
					'SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64'
				);
		} else
			throw new Error(
				'SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing'
			);
		return {serverSignature: t};
	}
	function oX(r, e) {
		if (!Buffer.isBuffer(r))
			throw new TypeError('first argument must be a Buffer');
		if (!Buffer.isBuffer(e))
			throw new TypeError('second argument must be a Buffer');
		if (r.length !== e.length) throw new Error('Buffer lengths must match');
		if (r.length === 0) throw new Error('Buffers cannot be empty');
		return Buffer.from(r.map((t, n) => r[n] ^ e[n]));
	}
	IA.exports = {startSession: eX, continueSession: tX, finalizeSession: rX};
});
var Zh = l((Bfe, kA) => {
	'use strict';
	var aX = is();
	function ca(r) {
		(this._types = r || aX), (this.text = {}), (this.binary = {});
	}
	ca.prototype.getOverrides = function (r) {
		switch (r) {
			case 'text':
				return this.text;
			case 'binary':
				return this.binary;
			default:
				return {};
		}
	};
	ca.prototype.setTypeParser = function (r, e, t) {
		typeof e == 'function' && ((t = e), (e = 'text')),
			(this.getOverrides(e)[r] = t);
	};
	ca.prototype.getTypeParser = function (r, e) {
		return (
			(e = e || 'text'),
			this.getOverrides(e)[r] || this._types.getTypeParser(r, e)
		);
	};
	kA.exports = ca;
});
var MA = l((Dfe, $A) => {
	'use strict';
	function Yh(r) {
		if (r.charAt(0) === '/') {
			let a = r.split(' ');
			return {host: a[0], database: a[1]};
		}
		let e = {},
			t,
			n = !1;
		/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(r) &&
			(r = encodeURI(r).replace(/\%25(\d\d)/g, '%$1'));
		try {
			t = new URL(r, 'postgres://base');
		} catch {
			(t = new URL(r.replace('@/', '@___DUMMY___/'), 'postgres://base')),
				(n = !0);
		}
		for (let a of t.searchParams.entries()) e[a[0]] = a[1];
		if (
			((e.user = e.user || decodeURIComponent(t.username)),
			(e.password = e.password || decodeURIComponent(t.password)),
			t.protocol == 'socket:')
		)
			return (
				(e.host = decodeURI(t.pathname)),
				(e.database = t.searchParams.get('db')),
				(e.client_encoding = t.searchParams.get('encoding')),
				e
			);
		let i = n ? '' : t.hostname;
		e.host
			? i && /^%2f/i.test(i) && (t.pathname = i + t.pathname)
			: (e.host = decodeURIComponent(i)),
			e.port || (e.port = t.port);
		let s = t.pathname.slice(1) || null;
		(e.database = s ? decodeURI(s) : null),
			(e.ssl === 'true' || e.ssl === '1') && (e.ssl = !0),
			e.ssl === '0' && (e.ssl = !1),
			(e.sslcert || e.sslkey || e.sslrootcert || e.sslmode) && (e.ssl = {});
		let o = e.sslcert || e.sslkey || e.sslrootcert ? _('fs') : null;
		switch (
			(e.sslcert && (e.ssl.cert = o.readFileSync(e.sslcert).toString()),
			e.sslkey && (e.ssl.key = o.readFileSync(e.sslkey).toString()),
			e.sslrootcert && (e.ssl.ca = o.readFileSync(e.sslrootcert).toString()),
			e.sslmode)
		) {
			case 'disable': {
				e.ssl = !1;
				break;
			}
			case 'prefer':
			case 'require':
			case 'verify-ca':
			case 'verify-full':
				break;
			case 'no-verify': {
				e.ssl.rejectUnauthorized = !1;
				break;
			}
		}
		return e;
	}
	$A.exports = Yh;
	Yh.parse = Yh;
});
var ed = l((Ufe, BA) => {
	'use strict';
	var uX = _('dns'),
		LA = ss(),
		jA = MA().parse,
		ye = function (r, e, t) {
			return (
				t === void 0
					? (t = process.env['PG' + r.toUpperCase()])
					: t === !1 || (t = process.env[t]),
				e[r] || t || LA[r]
			);
		},
		cX = function () {
			switch (process.env.PGSSLMODE) {
				case 'disable':
					return !1;
				case 'prefer':
				case 'require':
				case 'verify-ca':
				case 'verify-full':
					return !0;
				case 'no-verify':
					return {rejectUnauthorized: !1};
			}
			return LA.ssl;
		},
		Pn = function (r) {
			return "'" + ('' + r).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
		},
		Me = function (r, e, t) {
			var n = e[t];
			n != null && r.push(t + '=' + Pn(n));
		},
		Xh = class {
			constructor(e) {
				(e = typeof e == 'string' ? jA(e) : e || {}),
					e.connectionString &&
						(e = Object.assign({}, e, jA(e.connectionString))),
					(this.user = ye('user', e)),
					(this.database = ye('database', e)),
					this.database === void 0 && (this.database = this.user),
					(this.port = parseInt(ye('port', e), 10)),
					(this.host = ye('host', e)),
					Object.defineProperty(this, 'password', {
						configurable: !0,
						enumerable: !1,
						writable: !0,
						value: ye('password', e),
					}),
					(this.binary = ye('binary', e)),
					(this.options = ye('options', e)),
					(this.ssl = typeof e.ssl > 'u' ? cX() : e.ssl),
					typeof this.ssl == 'string' && this.ssl === 'true' && (this.ssl = !0),
					this.ssl === 'no-verify' && (this.ssl = {rejectUnauthorized: !1}),
					this.ssl &&
						this.ssl.key &&
						Object.defineProperty(this.ssl, 'key', {enumerable: !1}),
					(this.client_encoding = ye('client_encoding', e)),
					(this.replication = ye('replication', e)),
					(this.isDomainSocket = !(this.host || '').indexOf('/')),
					(this.application_name = ye('application_name', e, 'PGAPPNAME')),
					(this.fallback_application_name = ye(
						'fallback_application_name',
						e,
						!1
					)),
					(this.statement_timeout = ye('statement_timeout', e, !1)),
					(this.lock_timeout = ye('lock_timeout', e, !1)),
					(this.idle_in_transaction_session_timeout = ye(
						'idle_in_transaction_session_timeout',
						e,
						!1
					)),
					(this.query_timeout = ye('query_timeout', e, !1)),
					e.connectionTimeoutMillis === void 0
						? (this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0)
						: (this.connect_timeout = Math.floor(
								e.connectionTimeoutMillis / 1e3
							)),
					e.keepAlive === !1
						? (this.keepalives = 0)
						: e.keepAlive === !0 && (this.keepalives = 1),
					typeof e.keepAliveInitialDelayMillis == 'number' &&
						(this.keepalives_idle = Math.floor(
							e.keepAliveInitialDelayMillis / 1e3
						));
			}
			getLibpqConnectionString(e) {
				var t = [];
				Me(t, this, 'user'),
					Me(t, this, 'password'),
					Me(t, this, 'port'),
					Me(t, this, 'application_name'),
					Me(t, this, 'fallback_application_name'),
					Me(t, this, 'connect_timeout'),
					Me(t, this, 'options');
				var n =
					typeof this.ssl == 'object'
						? this.ssl
						: this.ssl
							? {sslmode: this.ssl}
							: {};
				if (
					(Me(t, n, 'sslmode'),
					Me(t, n, 'sslca'),
					Me(t, n, 'sslkey'),
					Me(t, n, 'sslcert'),
					Me(t, n, 'sslrootcert'),
					this.database && t.push('dbname=' + Pn(this.database)),
					this.replication && t.push('replication=' + Pn(this.replication)),
					this.host && t.push('host=' + Pn(this.host)),
					this.isDomainSocket)
				)
					return e(null, t.join(' '));
				this.client_encoding &&
					t.push('client_encoding=' + Pn(this.client_encoding)),
					uX.lookup(this.host, function (i, s) {
						return i
							? e(i, null)
							: (t.push('hostaddr=' + Pn(s)), e(null, t.join(' ')));
					});
			}
		};
	BA.exports = Xh;
});
var FA = l((Ffe, UA) => {
	'use strict';
	var lX = is(),
		DA = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/,
		td = class {
			constructor(e, t) {
				(this.command = null),
					(this.rowCount = null),
					(this.oid = null),
					(this.rows = []),
					(this.fields = []),
					(this._parsers = void 0),
					(this._types = t),
					(this.RowCtor = null),
					(this.rowAsArray = e === 'array'),
					this.rowAsArray && (this.parseRow = this._parseRowAsArray),
					(this._prebuiltEmptyResultObject = null);
			}
			addCommandComplete(e) {
				var t;
				e.text ? (t = DA.exec(e.text)) : (t = DA.exec(e.command)),
					t &&
						((this.command = t[1]),
						t[3]
							? ((this.oid = parseInt(t[2], 10)),
								(this.rowCount = parseInt(t[3], 10)))
							: t[2] && (this.rowCount = parseInt(t[2], 10)));
			}
			_parseRowAsArray(e) {
				for (var t = new Array(e.length), n = 0, i = e.length; n < i; n++) {
					var s = e[n];
					s !== null ? (t[n] = this._parsers[n](s)) : (t[n] = null);
				}
				return t;
			}
			parseRow(e) {
				for (
					var t = {...this._prebuiltEmptyResultObject}, n = 0, i = e.length;
					n < i;
					n++
				) {
					var s = e[n],
						o = this.fields[n].name;
					s !== null ? (t[o] = this._parsers[n](s)) : (t[o] = null);
				}
				return t;
			}
			addRow(e) {
				this.rows.push(e);
			}
			addFields(e) {
				(this.fields = e),
					this.fields.length && (this._parsers = new Array(e.length));
				for (var t = {}, n = 0; n < e.length; n++) {
					var i = e[n];
					(t[i.name] = null),
						this._types
							? (this._parsers[n] = this._types.getTypeParser(
									i.dataTypeID,
									i.format || 'text'
								))
							: (this._parsers[n] = lX.getTypeParser(
									i.dataTypeID,
									i.format || 'text'
								));
				}
				this._prebuiltEmptyResultObject = {...t};
			}
		};
	UA.exports = td;
});
var VA = l((Qfe, WA) => {
	'use strict';
	var {EventEmitter: hX} = _('events'),
		QA = FA(),
		HA = os(),
		rd = class extends hX {
			constructor(e, t, n) {
				super(),
					(e = HA.normalizeQueryConfig(e, t, n)),
					(this.text = e.text),
					(this.values = e.values),
					(this.rows = e.rows),
					(this.types = e.types),
					(this.name = e.name),
					(this.queryMode = e.queryMode),
					(this.binary = e.binary),
					(this.portal = e.portal || ''),
					(this.callback = e.callback),
					(this._rowMode = e.rowMode),
					process.domain &&
						e.callback &&
						(this.callback = process.domain.bind(e.callback)),
					(this._result = new QA(this._rowMode, this.types)),
					(this._results = this._result),
					(this._canceledDueToError = !1);
			}
			requiresPreparation() {
				return this.queryMode === 'extended' || this.name || this.rows
					? !0
					: !this.text || !this.values
						? !1
						: this.values.length > 0;
			}
			_checkForMultirow() {
				this._result.command &&
					(Array.isArray(this._results) || (this._results = [this._result]),
					(this._result = new QA(this._rowMode, this._result._types)),
					this._results.push(this._result));
			}
			handleRowDescription(e) {
				this._checkForMultirow(),
					this._result.addFields(e.fields),
					(this._accumulateRows =
						this.callback || !this.listeners('row').length);
			}
			handleDataRow(e) {
				let t;
				if (!this._canceledDueToError) {
					try {
						t = this._result.parseRow(e.fields);
					} catch (n) {
						this._canceledDueToError = n;
						return;
					}
					this.emit('row', t, this._result),
						this._accumulateRows && this._result.addRow(t);
				}
			}
			handleCommandComplete(e, t) {
				this._checkForMultirow(),
					this._result.addCommandComplete(e),
					this.rows && t.sync();
			}
			handleEmptyQuery(e) {
				this.rows && e.sync();
			}
			handleError(e, t) {
				if (
					(this._canceledDueToError &&
						((e = this._canceledDueToError), (this._canceledDueToError = !1)),
					this.callback)
				)
					return this.callback(e);
				this.emit('error', e);
			}
			handleReadyForQuery(e) {
				if (this._canceledDueToError)
					return this.handleError(this._canceledDueToError, e);
				if (this.callback)
					try {
						this.callback(null, this._results);
					} catch (t) {
						process.nextTick(() => {
							throw t;
						});
					}
				this.emit('end', this._results);
			}
			submit(e) {
				if (typeof this.text != 'string' && typeof this.name != 'string')
					return new Error(
						'A query must have either text or a name. Supplying neither is unsupported.'
					);
				let t = e.parsedStatements[this.name];
				return this.text && t && this.text !== t
					? new Error(
							`Prepared statements must be unique - '${this.name}' was used for a different statement`
						)
					: this.values && !Array.isArray(this.values)
						? new Error('Query values must be an array')
						: (this.requiresPreparation()
								? this.prepare(e)
								: e.query(this.text),
							null);
			}
			hasBeenParsed(e) {
				return this.name && e.parsedStatements[this.name];
			}
			handlePortalSuspended(e) {
				this._getRows(e, this.rows);
			}
			_getRows(e, t) {
				e.execute({portal: this.portal, rows: t}), t ? e.flush() : e.sync();
			}
			prepare(e) {
				this.hasBeenParsed(e) ||
					e.parse({text: this.text, name: this.name, types: this.types});
				try {
					e.bind({
						portal: this.portal,
						statement: this.name,
						values: this.values,
						binary: this.binary,
						valueMapper: HA.prepareValue,
					});
				} catch (t) {
					this.handleError(t, e);
					return;
				}
				e.describe({type: 'P', name: this.portal || ''}),
					this._getRows(e, this.rows);
			}
			handleCopyInResponse(e) {
				e.sendCopyFail('No source stream defined');
			}
			handleCopyData(e, t) {}
		};
	WA.exports = rd;
});
var yd = l((O) => {
	'use strict';
	Object.defineProperty(O, '__esModule', {value: !0});
	O.NoticeMessage =
		O.DataRowMessage =
		O.CommandCompleteMessage =
		O.ReadyForQueryMessage =
		O.NotificationResponseMessage =
		O.BackendKeyDataMessage =
		O.AuthenticationMD5Password =
		O.ParameterStatusMessage =
		O.ParameterDescriptionMessage =
		O.RowDescriptionMessage =
		O.Field =
		O.CopyResponse =
		O.CopyDataMessage =
		O.DatabaseError =
		O.copyDone =
		O.emptyQuery =
		O.replicationStart =
		O.portalSuspended =
		O.noData =
		O.closeComplete =
		O.bindComplete =
		O.parseComplete =
			void 0;
	O.parseComplete = {name: 'parseComplete', length: 5};
	O.bindComplete = {name: 'bindComplete', length: 5};
	O.closeComplete = {name: 'closeComplete', length: 5};
	O.noData = {name: 'noData', length: 5};
	O.portalSuspended = {name: 'portalSuspended', length: 5};
	O.replicationStart = {name: 'replicationStart', length: 4};
	O.emptyQuery = {name: 'emptyQuery', length: 4};
	O.copyDone = {name: 'copyDone', length: 4};
	var nd = class extends Error {
		constructor(e, t, n) {
			super(e), (this.length = t), (this.name = n);
		}
	};
	O.DatabaseError = nd;
	var id = class {
		constructor(e, t) {
			(this.length = e), (this.chunk = t), (this.name = 'copyData');
		}
	};
	O.CopyDataMessage = id;
	var sd = class {
		constructor(e, t, n, i) {
			(this.length = e),
				(this.name = t),
				(this.binary = n),
				(this.columnTypes = new Array(i));
		}
	};
	O.CopyResponse = sd;
	var od = class {
		constructor(e, t, n, i, s, o, a) {
			(this.name = e),
				(this.tableID = t),
				(this.columnID = n),
				(this.dataTypeID = i),
				(this.dataTypeSize = s),
				(this.dataTypeModifier = o),
				(this.format = a);
		}
	};
	O.Field = od;
	var ad = class {
		constructor(e, t) {
			(this.length = e),
				(this.fieldCount = t),
				(this.name = 'rowDescription'),
				(this.fields = new Array(this.fieldCount));
		}
	};
	O.RowDescriptionMessage = ad;
	var ud = class {
		constructor(e, t) {
			(this.length = e),
				(this.parameterCount = t),
				(this.name = 'parameterDescription'),
				(this.dataTypeIDs = new Array(this.parameterCount));
		}
	};
	O.ParameterDescriptionMessage = ud;
	var cd = class {
		constructor(e, t, n) {
			(this.length = e),
				(this.parameterName = t),
				(this.parameterValue = n),
				(this.name = 'parameterStatus');
		}
	};
	O.ParameterStatusMessage = cd;
	var ld = class {
		constructor(e, t) {
			(this.length = e),
				(this.salt = t),
				(this.name = 'authenticationMD5Password');
		}
	};
	O.AuthenticationMD5Password = ld;
	var hd = class {
		constructor(e, t, n) {
			(this.length = e),
				(this.processID = t),
				(this.secretKey = n),
				(this.name = 'backendKeyData');
		}
	};
	O.BackendKeyDataMessage = hd;
	var dd = class {
		constructor(e, t, n, i) {
			(this.length = e),
				(this.processId = t),
				(this.channel = n),
				(this.payload = i),
				(this.name = 'notification');
		}
	};
	O.NotificationResponseMessage = dd;
	var fd = class {
		constructor(e, t) {
			(this.length = e), (this.status = t), (this.name = 'readyForQuery');
		}
	};
	O.ReadyForQueryMessage = fd;
	var pd = class {
		constructor(e, t) {
			(this.length = e), (this.text = t), (this.name = 'commandComplete');
		}
	};
	O.CommandCompleteMessage = pd;
	var md = class {
		constructor(e, t) {
			(this.length = e),
				(this.fields = t),
				(this.name = 'dataRow'),
				(this.fieldCount = t.length);
		}
	};
	O.DataRowMessage = md;
	var gd = class {
		constructor(e, t) {
			(this.length = e), (this.message = t), (this.name = 'notice');
		}
	};
	O.NoticeMessage = gd;
});
var GA = l((la) => {
	'use strict';
	Object.defineProperty(la, '__esModule', {value: !0});
	la.Writer = void 0;
	var bd = class {
		constructor(e = 256) {
			(this.size = e),
				(this.offset = 5),
				(this.headerPosition = 0),
				(this.buffer = Buffer.allocUnsafe(e));
		}
		ensure(e) {
			var t = this.buffer.length - this.offset;
			if (t < e) {
				var n = this.buffer,
					i = n.length + (n.length >> 1) + e;
				(this.buffer = Buffer.allocUnsafe(i)), n.copy(this.buffer);
			}
		}
		addInt32(e) {
			return (
				this.ensure(4),
				(this.buffer[this.offset++] = (e >>> 24) & 255),
				(this.buffer[this.offset++] = (e >>> 16) & 255),
				(this.buffer[this.offset++] = (e >>> 8) & 255),
				(this.buffer[this.offset++] = (e >>> 0) & 255),
				this
			);
		}
		addInt16(e) {
			return (
				this.ensure(2),
				(this.buffer[this.offset++] = (e >>> 8) & 255),
				(this.buffer[this.offset++] = (e >>> 0) & 255),
				this
			);
		}
		addCString(e) {
			if (!e) this.ensure(1);
			else {
				var t = Buffer.byteLength(e);
				this.ensure(t + 1),
					this.buffer.write(e, this.offset, 'utf-8'),
					(this.offset += t);
			}
			return (this.buffer[this.offset++] = 0), this;
		}
		addString(e = '') {
			var t = Buffer.byteLength(e);
			return (
				this.ensure(t),
				this.buffer.write(e, this.offset),
				(this.offset += t),
				this
			);
		}
		add(e) {
			return (
				this.ensure(e.length),
				e.copy(this.buffer, this.offset),
				(this.offset += e.length),
				this
			);
		}
		join(e) {
			if (e) {
				this.buffer[this.headerPosition] = e;
				let t = this.offset - (this.headerPosition + 1);
				this.buffer.writeInt32BE(t, this.headerPosition + 1);
			}
			return this.buffer.slice(e ? 0 : 5, this.offset);
		}
		flush(e) {
			var t = this.join(e);
			return (
				(this.offset = 5),
				(this.headerPosition = 0),
				(this.buffer = Buffer.allocUnsafe(this.size)),
				t
			);
		}
	};
	la.Writer = bd;
});
var KA = l((da) => {
	'use strict';
	Object.defineProperty(da, '__esModule', {value: !0});
	da.serialize = void 0;
	var _d = GA(),
		J = new _d.Writer(),
		dX = (r) => {
			J.addInt16(3).addInt16(0);
			for (let n of Object.keys(r)) J.addCString(n).addCString(r[n]);
			J.addCString('client_encoding').addCString('UTF8');
			var e = J.addCString('').flush(),
				t = e.length + 4;
			return new _d.Writer().addInt32(t).add(e).flush();
		},
		fX = () => {
			let r = Buffer.allocUnsafe(8);
			return r.writeInt32BE(8, 0), r.writeInt32BE(80877103, 4), r;
		},
		pX = (r) => J.addCString(r).flush(112),
		mX = function (r, e) {
			return (
				J.addCString(r).addInt32(Buffer.byteLength(e)).addString(e),
				J.flush(112)
			);
		},
		gX = function (r) {
			return J.addString(r).flush(112);
		},
		yX = (r) => J.addCString(r).flush(81),
		JA = [],
		bX = (r) => {
			let e = r.name || '';
			e.length > 63 &&
				(console.error(
					'Warning! Postgres only supports 63 characters for query names.'
				),
				console.error('You supplied %s (%s)', e, e.length),
				console.error(
					'This can cause conflicts and silent errors executing queries'
				));
			let t = r.types || JA;
			for (
				var n = t.length,
					i = J.addCString(e).addCString(r.text).addInt16(n),
					s = 0;
				s < n;
				s++
			)
				i.addInt32(t[s]);
			return J.flush(80);
		},
		kn = new _d.Writer(),
		_X = function (r, e) {
			for (let t = 0; t < r.length; t++) {
				let n = e ? e(r[t], t) : r[t];
				n == null
					? (J.addInt16(0), kn.addInt32(-1))
					: n instanceof Buffer
						? (J.addInt16(1), kn.addInt32(n.length), kn.add(n))
						: (J.addInt16(0),
							kn.addInt32(Buffer.byteLength(n)),
							kn.addString(n));
			}
		},
		wX = (r = {}) => {
			let e = r.portal || '',
				t = r.statement || '',
				n = r.binary || !1,
				i = r.values || JA,
				s = i.length;
			return (
				J.addCString(e).addCString(t),
				J.addInt16(s),
				_X(i, r.valueMapper),
				J.addInt16(s),
				J.add(kn.flush()),
				J.addInt16(n ? 1 : 0),
				J.flush(66)
			);
		},
		vX = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]),
		EX = (r) => {
			if (!r || (!r.portal && !r.rows)) return vX;
			let e = r.portal || '',
				t = r.rows || 0,
				n = Buffer.byteLength(e),
				i = 4 + n + 1 + 4,
				s = Buffer.allocUnsafe(1 + i);
			return (
				(s[0] = 69),
				s.writeInt32BE(i, 1),
				s.write(e, 5, 'utf-8'),
				(s[n + 5] = 0),
				s.writeUInt32BE(t, s.length - 4),
				s
			);
		},
		xX = (r, e) => {
			let t = Buffer.allocUnsafe(16);
			return (
				t.writeInt32BE(16, 0),
				t.writeInt16BE(1234, 4),
				t.writeInt16BE(5678, 6),
				t.writeInt32BE(r, 8),
				t.writeInt32BE(e, 12),
				t
			);
		},
		wd = (r, e) => {
			let n = 4 + Buffer.byteLength(e) + 1,
				i = Buffer.allocUnsafe(1 + n);
			return (
				(i[0] = r), i.writeInt32BE(n, 1), i.write(e, 5, 'utf-8'), (i[n] = 0), i
			);
		},
		CX = J.addCString('P').flush(68),
		qX = J.addCString('S').flush(68),
		TX = (r) =>
			r.name ? wd(68, `${r.type}${r.name || ''}`) : r.type === 'P' ? CX : qX,
		AX = (r) => {
			let e = `${r.type}${r.name || ''}`;
			return wd(67, e);
		},
		SX = (r) => J.add(r).flush(100),
		OX = (r) => wd(102, r),
		ha = (r) => Buffer.from([r, 0, 0, 0, 4]),
		RX = ha(72),
		NX = ha(83),
		IX = ha(88),
		PX = ha(99),
		kX = {
			startup: dX,
			password: pX,
			requestSsl: fX,
			sendSASLInitialResponseMessage: mX,
			sendSCRAMClientFinalMessage: gX,
			query: yX,
			parse: bX,
			bind: wX,
			execute: EX,
			describe: TX,
			close: AX,
			flush: () => RX,
			sync: () => NX,
			end: () => IX,
			copyData: SX,
			copyDone: () => PX,
			copyFail: OX,
			cancel: xX,
		};
	da.serialize = kX;
});
var zA = l((fa) => {
	'use strict';
	Object.defineProperty(fa, '__esModule', {value: !0});
	fa.BufferReader = void 0;
	var $X = Buffer.allocUnsafe(0),
		vd = class {
			constructor(e = 0) {
				(this.offset = e), (this.buffer = $X), (this.encoding = 'utf-8');
			}
			setBuffer(e, t) {
				(this.offset = e), (this.buffer = t);
			}
			int16() {
				let e = this.buffer.readInt16BE(this.offset);
				return (this.offset += 2), e;
			}
			byte() {
				let e = this.buffer[this.offset];
				return this.offset++, e;
			}
			int32() {
				let e = this.buffer.readInt32BE(this.offset);
				return (this.offset += 4), e;
			}
			string(e) {
				let t = this.buffer.toString(
					this.encoding,
					this.offset,
					this.offset + e
				);
				return (this.offset += e), t;
			}
			cstring() {
				let e = this.offset,
					t = e;
				for (; this.buffer[t++] !== 0; );
				return (this.offset = t), this.buffer.toString(this.encoding, e, t - 1);
			}
			bytes(e) {
				let t = this.buffer.slice(this.offset, this.offset + e);
				return (this.offset += e), t;
			}
		};
	fa.BufferReader = vd;
});
var XA = l((pa) => {
	'use strict';
	Object.defineProperty(pa, '__esModule', {value: !0});
	pa.Parser = void 0;
	var K = yd(),
		MX = zA(),
		Ed = 1,
		jX = 4,
		ZA = Ed + jX,
		YA = Buffer.allocUnsafe(0),
		xd = class {
			constructor(e) {
				if (
					((this.buffer = YA),
					(this.bufferLength = 0),
					(this.bufferOffset = 0),
					(this.reader = new MX.BufferReader()),
					e?.mode === 'binary')
				)
					throw new Error('Binary mode not supported yet');
				this.mode = e?.mode || 'text';
			}
			parse(e, t) {
				this.mergeBuffer(e);
				let n = this.bufferOffset + this.bufferLength,
					i = this.bufferOffset;
				for (; i + ZA <= n; ) {
					let s = this.buffer[i],
						o = this.buffer.readUInt32BE(i + Ed),
						a = Ed + o;
					if (a + i <= n) {
						let u = this.handlePacket(i + ZA, s, o, this.buffer);
						t(u), (i += a);
					} else break;
				}
				i === n
					? ((this.buffer = YA),
						(this.bufferLength = 0),
						(this.bufferOffset = 0))
					: ((this.bufferLength = n - i), (this.bufferOffset = i));
			}
			mergeBuffer(e) {
				if (this.bufferLength > 0) {
					let t = this.bufferLength + e.byteLength;
					if (t + this.bufferOffset > this.buffer.byteLength) {
						let i;
						if (
							t <= this.buffer.byteLength &&
							this.bufferOffset >= this.bufferLength
						)
							i = this.buffer;
						else {
							let s = this.buffer.byteLength * 2;
							for (; t >= s; ) s *= 2;
							i = Buffer.allocUnsafe(s);
						}
						this.buffer.copy(
							i,
							0,
							this.bufferOffset,
							this.bufferOffset + this.bufferLength
						),
							(this.buffer = i),
							(this.bufferOffset = 0);
					}
					e.copy(this.buffer, this.bufferOffset + this.bufferLength),
						(this.bufferLength = t);
				} else
					(this.buffer = e),
						(this.bufferOffset = 0),
						(this.bufferLength = e.byteLength);
			}
			handlePacket(e, t, n, i) {
				switch (t) {
					case 50:
						return K.bindComplete;
					case 49:
						return K.parseComplete;
					case 51:
						return K.closeComplete;
					case 110:
						return K.noData;
					case 115:
						return K.portalSuspended;
					case 99:
						return K.copyDone;
					case 87:
						return K.replicationStart;
					case 73:
						return K.emptyQuery;
					case 68:
						return this.parseDataRowMessage(e, n, i);
					case 67:
						return this.parseCommandCompleteMessage(e, n, i);
					case 90:
						return this.parseReadyForQueryMessage(e, n, i);
					case 65:
						return this.parseNotificationMessage(e, n, i);
					case 82:
						return this.parseAuthenticationResponse(e, n, i);
					case 83:
						return this.parseParameterStatusMessage(e, n, i);
					case 75:
						return this.parseBackendKeyData(e, n, i);
					case 69:
						return this.parseErrorMessage(e, n, i, 'error');
					case 78:
						return this.parseErrorMessage(e, n, i, 'notice');
					case 84:
						return this.parseRowDescriptionMessage(e, n, i);
					case 116:
						return this.parseParameterDescriptionMessage(e, n, i);
					case 71:
						return this.parseCopyInMessage(e, n, i);
					case 72:
						return this.parseCopyOutMessage(e, n, i);
					case 100:
						return this.parseCopyData(e, n, i);
					default:
						return new K.DatabaseError(
							'received invalid response: ' + t.toString(16),
							n,
							'error'
						);
				}
			}
			parseReadyForQueryMessage(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.string(1);
				return new K.ReadyForQueryMessage(t, i);
			}
			parseCommandCompleteMessage(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.cstring();
				return new K.CommandCompleteMessage(t, i);
			}
			parseCopyData(e, t, n) {
				let i = n.slice(e, e + (t - 4));
				return new K.CopyDataMessage(t, i);
			}
			parseCopyInMessage(e, t, n) {
				return this.parseCopyMessage(e, t, n, 'copyInResponse');
			}
			parseCopyOutMessage(e, t, n) {
				return this.parseCopyMessage(e, t, n, 'copyOutResponse');
			}
			parseCopyMessage(e, t, n, i) {
				this.reader.setBuffer(e, n);
				let s = this.reader.byte() !== 0,
					o = this.reader.int16(),
					a = new K.CopyResponse(t, i, s, o);
				for (let u = 0; u < o; u++) a.columnTypes[u] = this.reader.int16();
				return a;
			}
			parseNotificationMessage(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.int32(),
					s = this.reader.cstring(),
					o = this.reader.cstring();
				return new K.NotificationResponseMessage(t, i, s, o);
			}
			parseRowDescriptionMessage(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.int16(),
					s = new K.RowDescriptionMessage(t, i);
				for (let o = 0; o < i; o++) s.fields[o] = this.parseField();
				return s;
			}
			parseField() {
				let e = this.reader.cstring(),
					t = this.reader.int32(),
					n = this.reader.int16(),
					i = this.reader.int32(),
					s = this.reader.int16(),
					o = this.reader.int32(),
					a = this.reader.int16() === 0 ? 'text' : 'binary';
				return new K.Field(e, t, n, i, s, o, a);
			}
			parseParameterDescriptionMessage(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.int16(),
					s = new K.ParameterDescriptionMessage(t, i);
				for (let o = 0; o < i; o++) s.dataTypeIDs[o] = this.reader.int32();
				return s;
			}
			parseDataRowMessage(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.int16(),
					s = new Array(i);
				for (let o = 0; o < i; o++) {
					let a = this.reader.int32();
					s[o] = a === -1 ? null : this.reader.string(a);
				}
				return new K.DataRowMessage(t, s);
			}
			parseParameterStatusMessage(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.cstring(),
					s = this.reader.cstring();
				return new K.ParameterStatusMessage(t, i, s);
			}
			parseBackendKeyData(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.int32(),
					s = this.reader.int32();
				return new K.BackendKeyDataMessage(t, i, s);
			}
			parseAuthenticationResponse(e, t, n) {
				this.reader.setBuffer(e, n);
				let i = this.reader.int32(),
					s = {name: 'authenticationOk', length: t};
				switch (i) {
					case 0:
						break;
					case 3:
						s.length === 8 && (s.name = 'authenticationCleartextPassword');
						break;
					case 5:
						if (s.length === 12) {
							s.name = 'authenticationMD5Password';
							let a = this.reader.bytes(4);
							return new K.AuthenticationMD5Password(t, a);
						}
						break;
					case 10:
						(s.name = 'authenticationSASL'), (s.mechanisms = []);
						let o;
						do (o = this.reader.cstring()), o && s.mechanisms.push(o);
						while (o);
						break;
					case 11:
						(s.name = 'authenticationSASLContinue'),
							(s.data = this.reader.string(t - 8));
						break;
					case 12:
						(s.name = 'authenticationSASLFinal'),
							(s.data = this.reader.string(t - 8));
						break;
					default:
						throw new Error('Unknown authenticationOk message type ' + i);
				}
				return s;
			}
			parseErrorMessage(e, t, n, i) {
				this.reader.setBuffer(e, n);
				let s = {},
					o = this.reader.string(1);
				for (; o !== '\0'; )
					(s[o] = this.reader.cstring()), (o = this.reader.string(1));
				let a = s.M,
					u =
						i === 'notice'
							? new K.NoticeMessage(t, a)
							: new K.DatabaseError(a, t, i);
				return (
					(u.severity = s.S),
					(u.code = s.C),
					(u.detail = s.D),
					(u.hint = s.H),
					(u.position = s.P),
					(u.internalPosition = s.p),
					(u.internalQuery = s.q),
					(u.where = s.W),
					(u.schema = s.s),
					(u.table = s.t),
					(u.column = s.c),
					(u.dataType = s.d),
					(u.constraint = s.n),
					(u.file = s.F),
					(u.line = s.L),
					(u.routine = s.R),
					u
				);
			}
		};
	pa.Parser = xd;
});
var Cd = l((Mt) => {
	'use strict';
	Object.defineProperty(Mt, '__esModule', {value: !0});
	Mt.DatabaseError = Mt.serialize = Mt.parse = void 0;
	var LX = yd();
	Object.defineProperty(Mt, 'DatabaseError', {
		enumerable: !0,
		get: function () {
			return LX.DatabaseError;
		},
	});
	var BX = KA();
	Object.defineProperty(Mt, 'serialize', {
		enumerable: !0,
		get: function () {
			return BX.serialize;
		},
	});
	var DX = XA();
	function UX(r, e) {
		let t = new DX.Parser();
		return (
			r.on('data', (n) => t.parse(n, e)),
			new Promise((n) => r.on('end', () => n()))
		);
	}
	Mt.parse = UX;
});
var eS = {};
IN(eS, {default: () => FX});
var FX,
	tS = NN(() => {
		FX = {};
	});
var nS = l((zfe, rS) => {
	var {getStream: QX, getSecureStream: HX} = JX();
	rS.exports = {getStream: QX, getSecureStream: HX};
	function WX() {
		function r(t) {
			let n = _('net');
			return new n.Socket();
		}
		function e(t) {
			var n = _('tls');
			return n.connect(t);
		}
		return {getStream: r, getSecureStream: e};
	}
	function VX() {
		function r(t) {
			let {CloudflareSocket: n} = (tS(), PN(eS));
			return new n(t);
		}
		function e(t) {
			return t.socket.startTls(t), t.socket;
		}
		return {getStream: r, getSecureStream: e};
	}
	function GX() {
		if (
			typeof navigator == 'object' &&
			navigator !== null &&
			typeof navigator.userAgent == 'string'
		)
			return navigator.userAgent === 'Cloudflare-Workers';
		if (typeof Response == 'function') {
			let r = new Response(null, {cf: {thing: !0}});
			if (typeof r.cf == 'object' && r.cf !== null && r.cf.thing) return !0;
		}
		return !1;
	}
	function JX() {
		return GX() ? VX() : WX();
	}
});
var Td = l((Zfe, iS) => {
	'use strict';
	var KX = _('events').EventEmitter,
		{parse: zX, serialize: se} = Cd(),
		{getStream: ZX, getSecureStream: YX} = nS(),
		XX = se.flush(),
		eee = se.sync(),
		tee = se.end(),
		qd = class extends KX {
			constructor(e) {
				super(),
					(e = e || {}),
					(this.stream = e.stream || ZX(e.ssl)),
					typeof this.stream == 'function' && (this.stream = this.stream(e)),
					(this._keepAlive = e.keepAlive),
					(this._keepAliveInitialDelayMillis = e.keepAliveInitialDelayMillis),
					(this.lastBuffer = !1),
					(this.parsedStatements = {}),
					(this.ssl = e.ssl || !1),
					(this._ending = !1),
					(this._emitMessage = !1);
				var t = this;
				this.on('newListener', function (n) {
					n === 'message' && (t._emitMessage = !0);
				});
			}
			connect(e, t) {
				var n = this;
				(this._connecting = !0),
					this.stream.setNoDelay(!0),
					this.stream.connect(e, t),
					this.stream.once('connect', function () {
						n._keepAlive &&
							n.stream.setKeepAlive(!0, n._keepAliveInitialDelayMillis),
							n.emit('connect');
					});
				let i = function (s) {
					(n._ending && (s.code === 'ECONNRESET' || s.code === 'EPIPE')) ||
						n.emit('error', s);
				};
				if (
					(this.stream.on('error', i),
					this.stream.on('close', function () {
						n.emit('end');
					}),
					!this.ssl)
				)
					return this.attachListeners(this.stream);
				this.stream.once('data', function (s) {
					var o = s.toString('utf8');
					switch (o) {
						case 'S':
							break;
						case 'N':
							return (
								n.stream.end(),
								n.emit(
									'error',
									new Error('The server does not support SSL connections')
								)
							);
						default:
							return (
								n.stream.end(),
								n.emit(
									'error',
									new Error('There was an error establishing an SSL connection')
								)
							);
					}
					let a = {socket: n.stream};
					n.ssl !== !0 &&
						(Object.assign(a, n.ssl), 'key' in n.ssl && (a.key = n.ssl.key));
					var u = _('net');
					u.isIP && u.isIP(t) === 0 && (a.servername = t);
					try {
						n.stream = YX(a);
					} catch (c) {
						return n.emit('error', c);
					}
					n.attachListeners(n.stream),
						n.stream.on('error', i),
						n.emit('sslconnect');
				});
			}
			attachListeners(e) {
				zX(e, (t) => {
					var n = t.name === 'error' ? 'errorMessage' : t.name;
					this._emitMessage && this.emit('message', t), this.emit(n, t);
				});
			}
			requestSsl() {
				this.stream.write(se.requestSsl());
			}
			startup(e) {
				this.stream.write(se.startup(e));
			}
			cancel(e, t) {
				this._send(se.cancel(e, t));
			}
			password(e) {
				this._send(se.password(e));
			}
			sendSASLInitialResponseMessage(e, t) {
				this._send(se.sendSASLInitialResponseMessage(e, t));
			}
			sendSCRAMClientFinalMessage(e) {
				this._send(se.sendSCRAMClientFinalMessage(e));
			}
			_send(e) {
				return this.stream.writable ? this.stream.write(e) : !1;
			}
			query(e) {
				this._send(se.query(e));
			}
			parse(e) {
				this._send(se.parse(e));
			}
			bind(e) {
				this._send(se.bind(e));
			}
			execute(e) {
				this._send(se.execute(e));
			}
			flush() {
				this.stream.writable && this.stream.write(XX);
			}
			sync() {
				(this._ending = !0), this._send(eee);
			}
			ref() {
				this.stream.ref();
			}
			unref() {
				this.stream.unref();
			}
			end() {
				if (((this._ending = !0), !this._connecting || !this.stream.writable)) {
					this.stream.end();
					return;
				}
				return this.stream.write(tee, () => {
					this.stream.end();
				});
			}
			close(e) {
				this._send(se.close(e));
			}
			describe(e) {
				this._send(se.describe(e));
			}
			sendCopyFromChunk(e) {
				this._send(se.copyData(e));
			}
			endCopyFrom() {
				this._send(se.copyDone());
			}
			sendCopyFail(e) {
				this._send(se.copyFail(e));
			}
		};
	iS.exports = qd;
});
var uS = l((Yfe, aS) => {
	'use strict';
	var {Transform: ree} = _('stream'),
		{StringDecoder: nee} = _('string_decoder'),
		jt = Symbol('last'),
		ma = Symbol('decoder');
	function iee(r, e, t) {
		let n;
		if (this.overflow) {
			if (((n = this[ma].write(r).split(this.matcher)), n.length === 1))
				return t();
			n.shift(), (this.overflow = !1);
		} else (this[jt] += this[ma].write(r)), (n = this[jt].split(this.matcher));
		this[jt] = n.pop();
		for (let i = 0; i < n.length; i++)
			try {
				oS(this, this.mapper(n[i]));
			} catch (s) {
				return t(s);
			}
		if (
			((this.overflow = this[jt].length > this.maxLength),
			this.overflow && !this.skipOverflow)
		) {
			t(new Error('maximum buffer reached'));
			return;
		}
		t();
	}
	function see(r) {
		if (((this[jt] += this[ma].end()), this[jt]))
			try {
				oS(this, this.mapper(this[jt]));
			} catch (e) {
				return r(e);
			}
		r();
	}
	function oS(r, e) {
		e !== void 0 && r.push(e);
	}
	function sS(r) {
		return r;
	}
	function oee(r, e, t) {
		switch (
			((r = r || /\r?\n/), (e = e || sS), (t = t || {}), arguments.length)
		) {
			case 1:
				typeof r == 'function'
					? ((e = r), (r = /\r?\n/))
					: typeof r == 'object' &&
						!(r instanceof RegExp) &&
						!r[Symbol.split] &&
						((t = r), (r = /\r?\n/));
				break;
			case 2:
				typeof r == 'function'
					? ((t = e), (e = r), (r = /\r?\n/))
					: typeof e == 'object' && ((t = e), (e = sS));
		}
		(t = Object.assign({}, t)),
			(t.autoDestroy = !0),
			(t.transform = iee),
			(t.flush = see),
			(t.readableObjectMode = !0);
		let n = new ree(t);
		return (
			(n[jt] = ''),
			(n[ma] = new nee('utf8')),
			(n.matcher = r),
			(n.mapper = e),
			(n.maxLength = t.maxLength),
			(n.skipOverflow = t.skipOverflow || !1),
			(n.overflow = !1),
			(n._destroy = function (i, s) {
				(this._writableState.errorEmitted = !1), s(i);
			}),
			n
		);
	}
	aS.exports = oee;
});
var hS = l((Xfe, pt) => {
	'use strict';
	var cS = _('path'),
		aee = _('stream').Stream,
		uee = uS(),
		lS = _('util'),
		cee = 5432,
		ga = process.platform === 'win32',
		us = process.stderr,
		lee = 56,
		hee = 7,
		dee = 61440,
		fee = 32768;
	function pee(r) {
		return (r & dee) == fee;
	}
	var $n = ['host', 'port', 'database', 'user', 'password'],
		Ad = $n.length,
		mee = $n[Ad - 1];
	function Sd() {
		var r = us instanceof aee && us.writable === !0;
		if (r) {
			var e = Array.prototype.slice.call(arguments).concat(`
`);
			us.write(lS.format.apply(lS, e));
		}
	}
	Object.defineProperty(pt.exports, 'isWin', {
		get: function () {
			return ga;
		},
		set: function (r) {
			ga = r;
		},
	});
	pt.exports.warnTo = function (r) {
		var e = us;
		return (us = r), e;
	};
	pt.exports.getFileName = function (r) {
		var e = r || process.env,
			t =
				e.PGPASSFILE ||
				(ga
					? cS.join(e.APPDATA || './', 'postgresql', 'pgpass.conf')
					: cS.join(e.HOME || './', '.pgpass'));
		return t;
	};
	pt.exports.usePgPass = function (r, e) {
		return Object.prototype.hasOwnProperty.call(process.env, 'PGPASSWORD')
			? !1
			: ga
				? !0
				: ((e = e || '<unkn>'),
					pee(r.mode)
						? r.mode & (lee | hee)
							? (Sd(
									'WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less',
									e
								),
								!1)
							: !0
						: (Sd('WARNING: password file "%s" is not a plain file', e), !1));
	};
	var gee = (pt.exports.match = function (r, e) {
		return $n.slice(0, -1).reduce(function (t, n, i) {
			return i == 1 && Number(r[n] || cee) === Number(e[n])
				? t && !0
				: t && (e[n] === '*' || e[n] === r[n]);
		}, !0);
	});
	pt.exports.getPassword = function (r, e, t) {
		var n,
			i = e.pipe(uee());
		function s(u) {
			var c = yee(u);
			c && bee(c) && gee(r, c) && ((n = c[mee]), i.end());
		}
		var o = function () {
				e.destroy(), t(n);
			},
			a = function (u) {
				e.destroy(), Sd('WARNING: error on reading file: %s', u), t(void 0);
			};
		e.on('error', a), i.on('data', s).on('end', o).on('error', a);
	};
	var yee = (pt.exports.parseLine = function (r) {
			if (r.length < 11 || r.match(/^\s+#/)) return null;
			for (
				var e = '',
					t = '',
					n = 0,
					i = 0,
					s = 0,
					o = {},
					a = !1,
					u = function (h, d, f) {
						var m = r.substring(d, f);
						Object.hasOwnProperty.call(process.env, 'PGPASS_NO_DEESCAPE') ||
							(m = m.replace(/\\([:\\])/g, '$1')),
							(o[$n[h]] = m);
					},
					c = 0;
				c < r.length - 1;
				c += 1
			) {
				if (((e = r.charAt(c + 1)), (t = r.charAt(c)), (a = n == Ad - 1), a)) {
					u(n, i);
					break;
				}
				c >= 0 &&
					e == ':' &&
					t !== '\\' &&
					(u(n, i, c + 1), (i = c + 2), (n += 1));
			}
			return (o = Object.keys(o).length === Ad ? o : null), o;
		}),
		bee = (pt.exports.isValidEntry = function (r) {
			for (
				var e = {
						0: function (o) {
							return o.length > 0;
						},
						1: function (o) {
							return o === '*'
								? !0
								: ((o = Number(o)),
									isFinite(o) &&
										o > 0 &&
										o < 9007199254740992 &&
										Math.floor(o) === o);
						},
						2: function (o) {
							return o.length > 0;
						},
						3: function (o) {
							return o.length > 0;
						},
						4: function (o) {
							return o.length > 0;
						},
					},
					t = 0;
				t < $n.length;
				t += 1
			) {
				var n = e[t],
					i = r[$n[t]] || '',
					s = n(i);
				if (!s) return !1;
			}
			return !0;
		});
});
var fS = l((tpe, Od) => {
	'use strict';
	var epe = _('path'),
		dS = _('fs'),
		ya = hS();
	Od.exports = function (r, e) {
		var t = ya.getFileName();
		dS.stat(t, function (n, i) {
			if (n || !ya.usePgPass(i, t)) return e(void 0);
			var s = dS.createReadStream(t);
			ya.getPassword(r, s, e);
		});
	};
	Od.exports.warnTo = ya.warnTo;
});
var yS = l((rpe, gS) => {
	'use strict';
	var _ee = _('events').EventEmitter,
		pS = os(),
		Rd = PA(),
		wee = Zh(),
		vee = ed(),
		mS = VA(),
		Eee = ss(),
		xee = Td(),
		Cee = zh(),
		ba = class extends _ee {
			constructor(e) {
				super(),
					(this.connectionParameters = new vee(e)),
					(this.user = this.connectionParameters.user),
					(this.database = this.connectionParameters.database),
					(this.port = this.connectionParameters.port),
					(this.host = this.connectionParameters.host),
					Object.defineProperty(this, 'password', {
						configurable: !0,
						enumerable: !1,
						writable: !0,
						value: this.connectionParameters.password,
					}),
					(this.replication = this.connectionParameters.replication);
				var t = e || {};
				(this._Promise = t.Promise || global.Promise),
					(this._types = new wee(t.types)),
					(this._ending = !1),
					(this._ended = !1),
					(this._connecting = !1),
					(this._connected = !1),
					(this._connectionError = !1),
					(this._queryable = !0),
					(this.connection =
						t.connection ||
						new xee({
							stream: t.stream,
							ssl: this.connectionParameters.ssl,
							keepAlive: t.keepAlive || !1,
							keepAliveInitialDelayMillis: t.keepAliveInitialDelayMillis || 0,
							encoding: this.connectionParameters.client_encoding || 'utf8',
						})),
					(this.queryQueue = []),
					(this.binary = t.binary || Eee.binary),
					(this.processID = null),
					(this.secretKey = null),
					(this.ssl = this.connectionParameters.ssl || !1),
					this.ssl &&
						this.ssl.key &&
						Object.defineProperty(this.ssl, 'key', {enumerable: !1}),
					(this._connectionTimeoutMillis = t.connectionTimeoutMillis || 0);
			}
			_errorAllQueries(e) {
				let t = (n) => {
					process.nextTick(() => {
						n.handleError(e, this.connection);
					});
				};
				this.activeQuery && (t(this.activeQuery), (this.activeQuery = null)),
					this.queryQueue.forEach(t),
					(this.queryQueue.length = 0);
			}
			_connect(e) {
				var t = this,
					n = this.connection;
				if (
					((this._connectionCallback = e), this._connecting || this._connected)
				) {
					let i = new Error(
						'Client has already been connected. You cannot reuse a client.'
					);
					process.nextTick(() => {
						e(i);
					});
					return;
				}
				(this._connecting = !0),
					this._connectionTimeoutMillis > 0 &&
						(this.connectionTimeoutHandle = setTimeout(() => {
							(n._ending = !0), n.stream.destroy(new Error('timeout expired'));
						}, this._connectionTimeoutMillis)),
					this.host && this.host.indexOf('/') === 0
						? n.connect(this.host + '/.s.PGSQL.' + this.port)
						: n.connect(this.port, this.host),
					n.on('connect', function () {
						t.ssl ? n.requestSsl() : n.startup(t.getStartupConf());
					}),
					n.on('sslconnect', function () {
						n.startup(t.getStartupConf());
					}),
					this._attachListeners(n),
					n.once('end', () => {
						let i = this._ending
							? new Error('Connection terminated')
							: new Error('Connection terminated unexpectedly');
						clearTimeout(this.connectionTimeoutHandle),
							this._errorAllQueries(i),
							(this._ended = !0),
							this._ending ||
								(this._connecting && !this._connectionError
									? this._connectionCallback
										? this._connectionCallback(i)
										: this._handleErrorEvent(i)
									: this._connectionError || this._handleErrorEvent(i)),
							process.nextTick(() => {
								this.emit('end');
							});
					});
			}
			connect(e) {
				if (e) {
					this._connect(e);
					return;
				}
				return new this._Promise((t, n) => {
					this._connect((i) => {
						i ? n(i) : t();
					});
				});
			}
			_attachListeners(e) {
				e.on(
					'authenticationCleartextPassword',
					this._handleAuthCleartextPassword.bind(this)
				),
					e.on(
						'authenticationMD5Password',
						this._handleAuthMD5Password.bind(this)
					),
					e.on('authenticationSASL', this._handleAuthSASL.bind(this)),
					e.on(
						'authenticationSASLContinue',
						this._handleAuthSASLContinue.bind(this)
					),
					e.on('authenticationSASLFinal', this._handleAuthSASLFinal.bind(this)),
					e.on('backendKeyData', this._handleBackendKeyData.bind(this)),
					e.on('error', this._handleErrorEvent.bind(this)),
					e.on('errorMessage', this._handleErrorMessage.bind(this)),
					e.on('readyForQuery', this._handleReadyForQuery.bind(this)),
					e.on('notice', this._handleNotice.bind(this)),
					e.on('rowDescription', this._handleRowDescription.bind(this)),
					e.on('dataRow', this._handleDataRow.bind(this)),
					e.on('portalSuspended', this._handlePortalSuspended.bind(this)),
					e.on('emptyQuery', this._handleEmptyQuery.bind(this)),
					e.on('commandComplete', this._handleCommandComplete.bind(this)),
					e.on('parseComplete', this._handleParseComplete.bind(this)),
					e.on('copyInResponse', this._handleCopyInResponse.bind(this)),
					e.on('copyData', this._handleCopyData.bind(this)),
					e.on('notification', this._handleNotification.bind(this));
			}
			_checkPgPass(e) {
				let t = this.connection;
				if (typeof this.password == 'function')
					this._Promise
						.resolve()
						.then(() => this.password())
						.then((n) => {
							if (n !== void 0) {
								if (typeof n != 'string') {
									t.emit('error', new TypeError('Password must be a string'));
									return;
								}
								this.connectionParameters.password = this.password = n;
							} else this.connectionParameters.password = this.password = null;
							e();
						})
						.catch((n) => {
							t.emit('error', n);
						});
				else if (this.password !== null) e();
				else
					try {
						fS()(this.connectionParameters, (i) => {
							i !== void 0 &&
								(this.connectionParameters.password = this.password = i),
								e();
						});
					} catch (n) {
						this.emit('error', n);
					}
			}
			_handleAuthCleartextPassword(e) {
				this._checkPgPass(() => {
					this.connection.password(this.password);
				});
			}
			_handleAuthMD5Password(e) {
				this._checkPgPass(async () => {
					try {
						let t = await Cee.postgresMd5PasswordHash(
							this.user,
							this.password,
							e.salt
						);
						this.connection.password(t);
					} catch (t) {
						this.emit('error', t);
					}
				});
			}
			_handleAuthSASL(e) {
				this._checkPgPass(() => {
					try {
						(this.saslSession = Rd.startSession(e.mechanisms)),
							this.connection.sendSASLInitialResponseMessage(
								this.saslSession.mechanism,
								this.saslSession.response
							);
					} catch (t) {
						this.connection.emit('error', t);
					}
				});
			}
			async _handleAuthSASLContinue(e) {
				try {
					await Rd.continueSession(this.saslSession, this.password, e.data),
						this.connection.sendSCRAMClientFinalMessage(
							this.saslSession.response
						);
				} catch (t) {
					this.connection.emit('error', t);
				}
			}
			_handleAuthSASLFinal(e) {
				try {
					Rd.finalizeSession(this.saslSession, e.data),
						(this.saslSession = null);
				} catch (t) {
					this.connection.emit('error', t);
				}
			}
			_handleBackendKeyData(e) {
				(this.processID = e.processID), (this.secretKey = e.secretKey);
			}
			_handleReadyForQuery(e) {
				this._connecting &&
					((this._connecting = !1),
					(this._connected = !0),
					clearTimeout(this.connectionTimeoutHandle),
					this._connectionCallback &&
						(this._connectionCallback(null, this),
						(this._connectionCallback = null)),
					this.emit('connect'));
				let {activeQuery: t} = this;
				(this.activeQuery = null),
					(this.readyForQuery = !0),
					t && t.handleReadyForQuery(this.connection),
					this._pulseQueryQueue();
			}
			_handleErrorWhileConnecting(e) {
				if (!this._connectionError) {
					if (
						((this._connectionError = !0),
						clearTimeout(this.connectionTimeoutHandle),
						this._connectionCallback)
					)
						return this._connectionCallback(e);
					this.emit('error', e);
				}
			}
			_handleErrorEvent(e) {
				if (this._connecting) return this._handleErrorWhileConnecting(e);
				(this._queryable = !1), this._errorAllQueries(e), this.emit('error', e);
			}
			_handleErrorMessage(e) {
				if (this._connecting) return this._handleErrorWhileConnecting(e);
				let t = this.activeQuery;
				if (!t) {
					this._handleErrorEvent(e);
					return;
				}
				(this.activeQuery = null), t.handleError(e, this.connection);
			}
			_handleRowDescription(e) {
				this.activeQuery.handleRowDescription(e);
			}
			_handleDataRow(e) {
				this.activeQuery.handleDataRow(e);
			}
			_handlePortalSuspended(e) {
				this.activeQuery.handlePortalSuspended(this.connection);
			}
			_handleEmptyQuery(e) {
				this.activeQuery.handleEmptyQuery(this.connection);
			}
			_handleCommandComplete(e) {
				if (this.activeQuery == null) {
					let t = new Error(
						'Received unexpected commandComplete message from backend.'
					);
					this._handleErrorEvent(t);
					return;
				}
				this.activeQuery.handleCommandComplete(e, this.connection);
			}
			_handleParseComplete() {
				if (this.activeQuery == null) {
					let e = new Error(
						'Received unexpected parseComplete message from backend.'
					);
					this._handleErrorEvent(e);
					return;
				}
				this.activeQuery.name &&
					(this.connection.parsedStatements[this.activeQuery.name] =
						this.activeQuery.text);
			}
			_handleCopyInResponse(e) {
				this.activeQuery.handleCopyInResponse(this.connection);
			}
			_handleCopyData(e) {
				this.activeQuery.handleCopyData(e, this.connection);
			}
			_handleNotification(e) {
				this.emit('notification', e);
			}
			_handleNotice(e) {
				this.emit('notice', e);
			}
			getStartupConf() {
				var e = this.connectionParameters,
					t = {user: e.user, database: e.database},
					n = e.application_name || e.fallback_application_name;
				return (
					n && (t.application_name = n),
					e.replication && (t.replication = '' + e.replication),
					e.statement_timeout &&
						(t.statement_timeout = String(parseInt(e.statement_timeout, 10))),
					e.lock_timeout &&
						(t.lock_timeout = String(parseInt(e.lock_timeout, 10))),
					e.idle_in_transaction_session_timeout &&
						(t.idle_in_transaction_session_timeout = String(
							parseInt(e.idle_in_transaction_session_timeout, 10)
						)),
					e.options && (t.options = e.options),
					t
				);
			}
			cancel(e, t) {
				if (e.activeQuery === t) {
					var n = this.connection;
					this.host && this.host.indexOf('/') === 0
						? n.connect(this.host + '/.s.PGSQL.' + this.port)
						: n.connect(this.port, this.host),
						n.on('connect', function () {
							n.cancel(e.processID, e.secretKey);
						});
				} else
					e.queryQueue.indexOf(t) !== -1 &&
						e.queryQueue.splice(e.queryQueue.indexOf(t), 1);
			}
			setTypeParser(e, t, n) {
				return this._types.setTypeParser(e, t, n);
			}
			getTypeParser(e, t) {
				return this._types.getTypeParser(e, t);
			}
			escapeIdentifier(e) {
				return pS.escapeIdentifier(e);
			}
			escapeLiteral(e) {
				return pS.escapeLiteral(e);
			}
			_pulseQueryQueue() {
				if (this.readyForQuery === !0)
					if (
						((this.activeQuery = this.queryQueue.shift()), this.activeQuery)
					) {
						(this.readyForQuery = !1), (this.hasExecuted = !0);
						let e = this.activeQuery.submit(this.connection);
						e &&
							process.nextTick(() => {
								this.activeQuery.handleError(e, this.connection),
									(this.readyForQuery = !0),
									this._pulseQueryQueue();
							});
					} else
						this.hasExecuted && ((this.activeQuery = null), this.emit('drain'));
			}
			query(e, t, n) {
				var i, s, o, a, u;
				if (e == null)
					throw new TypeError('Client was passed a null or undefined query');
				return (
					typeof e.submit == 'function'
						? ((o = e.query_timeout || this.connectionParameters.query_timeout),
							(s = i = e),
							typeof t == 'function' && (i.callback = i.callback || t))
						: ((o = e.query_timeout || this.connectionParameters.query_timeout),
							(i = new mS(e, t, n)),
							i.callback ||
								(s = new this._Promise((c, h) => {
									i.callback = (d, f) => (d ? h(d) : c(f));
								}).catch((c) => {
									throw (Error.captureStackTrace(c), c);
								}))),
					o &&
						((u = i.callback),
						(a = setTimeout(() => {
							var c = new Error('Query read timeout');
							process.nextTick(() => {
								i.handleError(c, this.connection);
							}),
								u(c),
								(i.callback = () => {});
							var h = this.queryQueue.indexOf(i);
							h > -1 && this.queryQueue.splice(h, 1), this._pulseQueryQueue();
						}, o)),
						(i.callback = (c, h) => {
							clearTimeout(a), u(c, h);
						})),
					this.binary && !i.binary && (i.binary = !0),
					i._result && !i._result._types && (i._result._types = this._types),
					this._queryable
						? this._ending
							? (process.nextTick(() => {
									i.handleError(
										new Error('Client was closed and is not queryable'),
										this.connection
									);
								}),
								s)
							: (this.queryQueue.push(i), this._pulseQueryQueue(), s)
						: (process.nextTick(() => {
								i.handleError(
									new Error(
										'Client has encountered a connection error and is not queryable'
									),
									this.connection
								);
							}),
							s)
				);
			}
			ref() {
				this.connection.ref();
			}
			unref() {
				this.connection.unref();
			}
			end(e) {
				if (((this._ending = !0), !this.connection._connecting || this._ended))
					if (e) e();
					else return this._Promise.resolve();
				if (
					(this.activeQuery || !this._queryable
						? this.connection.stream.destroy()
						: this.connection.end(),
					e)
				)
					this.connection.once('end', e);
				else
					return new this._Promise((t) => {
						this.connection.once('end', t);
					});
			}
		};
	ba.Query = mS;
	gS.exports = ba;
});
var vS = l((npe, wS) => {
	'use strict';
	var qee = _('events').EventEmitter,
		bS = function () {},
		_S = (r, e) => {
			let t = r.findIndex(e);
			return t === -1 ? void 0 : r.splice(t, 1)[0];
		},
		Nd = class {
			constructor(e, t, n) {
				(this.client = e), (this.idleListener = t), (this.timeoutId = n);
			}
		},
		Mn = class {
			constructor(e) {
				this.callback = e;
			}
		};
	function Tee() {
		throw new Error(
			'Release called on client which has already been released to the pool.'
		);
	}
	function _a(r, e) {
		if (e) return {callback: e, result: void 0};
		let t,
			n,
			i = function (o, a) {
				o ? t(o) : n(a);
			},
			s = new r(function (o, a) {
				(n = o), (t = a);
			}).catch((o) => {
				throw (Error.captureStackTrace(o), o);
			});
		return {callback: i, result: s};
	}
	function Aee(r, e) {
		return function t(n) {
			(n.client = e),
				e.removeListener('error', t),
				e.on('error', () => {
					r.log('additional client error after disconnection due to error', n);
				}),
				r._remove(e),
				r.emit('error', n, e);
		};
	}
	var Id = class extends qee {
		constructor(e, t) {
			super(),
				(this.options = Object.assign({}, e)),
				e != null &&
					'password' in e &&
					Object.defineProperty(this.options, 'password', {
						configurable: !0,
						enumerable: !1,
						writable: !0,
						value: e.password,
					}),
				e != null &&
					e.ssl &&
					e.ssl.key &&
					Object.defineProperty(this.options.ssl, 'key', {enumerable: !1}),
				(this.options.max = this.options.max || this.options.poolSize || 10),
				(this.options.maxUses = this.options.maxUses || 1 / 0),
				(this.options.allowExitOnIdle = this.options.allowExitOnIdle || !1),
				(this.options.maxLifetimeSeconds =
					this.options.maxLifetimeSeconds || 0),
				(this.log = this.options.log || function () {}),
				(this.Client = this.options.Client || t || cs().Client),
				(this.Promise = this.options.Promise || global.Promise),
				typeof this.options.idleTimeoutMillis > 'u' &&
					(this.options.idleTimeoutMillis = 1e4),
				(this._clients = []),
				(this._idle = []),
				(this._expired = new WeakSet()),
				(this._pendingQueue = []),
				(this._endCallback = void 0),
				(this.ending = !1),
				(this.ended = !1);
		}
		_isFull() {
			return this._clients.length >= this.options.max;
		}
		_pulseQueue() {
			if ((this.log('pulse queue'), this.ended)) {
				this.log('pulse queue ended');
				return;
			}
			if (this.ending) {
				this.log('pulse queue on ending'),
					this._idle.length &&
						this._idle.slice().map((t) => {
							this._remove(t.client);
						}),
					this._clients.length || ((this.ended = !0), this._endCallback());
				return;
			}
			if (!this._pendingQueue.length) {
				this.log('no queued requests');
				return;
			}
			if (!this._idle.length && this._isFull()) return;
			let e = this._pendingQueue.shift();
			if (this._idle.length) {
				let t = this._idle.pop();
				clearTimeout(t.timeoutId);
				let n = t.client;
				n.ref && n.ref();
				let i = t.idleListener;
				return this._acquireClient(n, e, i, !1);
			}
			if (!this._isFull()) return this.newClient(e);
			throw new Error('unexpected condition');
		}
		_remove(e) {
			let t = _S(this._idle, (n) => n.client === e);
			t !== void 0 && clearTimeout(t.timeoutId),
				(this._clients = this._clients.filter((n) => n !== e)),
				e.end(),
				this.emit('remove', e);
		}
		connect(e) {
			if (this.ending) {
				let i = new Error('Cannot use a pool after calling end on the pool');
				return e ? e(i) : this.Promise.reject(i);
			}
			let t = _a(this.Promise, e),
				n = t.result;
			if (this._isFull() || this._idle.length) {
				if (
					(this._idle.length && process.nextTick(() => this._pulseQueue()),
					!this.options.connectionTimeoutMillis)
				)
					return this._pendingQueue.push(new Mn(t.callback)), n;
				let i = (a, u, c) => {
						clearTimeout(o), t.callback(a, u, c);
					},
					s = new Mn(i),
					o = setTimeout(() => {
						_S(this._pendingQueue, (a) => a.callback === i),
							(s.timedOut = !0),
							t.callback(new Error('timeout exceeded when trying to connect'));
					}, this.options.connectionTimeoutMillis);
				return this._pendingQueue.push(s), n;
			}
			return this.newClient(new Mn(t.callback)), n;
		}
		newClient(e) {
			let t = new this.Client(this.options);
			this._clients.push(t);
			let n = Aee(this, t);
			this.log('checking client timeout');
			let i,
				s = !1;
			this.options.connectionTimeoutMillis &&
				(i = setTimeout(() => {
					this.log('ending client due to timeout'),
						(s = !0),
						t.connection ? t.connection.stream.destroy() : t.end();
				}, this.options.connectionTimeoutMillis)),
				this.log('connecting new client'),
				t.connect((o) => {
					if ((i && clearTimeout(i), t.on('error', n), o))
						this.log('client failed to connect', o),
							(this._clients = this._clients.filter((a) => a !== t)),
							s &&
								(o.message = 'Connection terminated due to connection timeout'),
							this._pulseQueue(),
							e.timedOut || e.callback(o, void 0, bS);
					else {
						if (
							(this.log('new client connected'),
							this.options.maxLifetimeSeconds !== 0)
						) {
							let a = setTimeout(() => {
								this.log('ending client due to expired lifetime'),
									this._expired.add(t),
									this._idle.findIndex((c) => c.client === t) !== -1 &&
										this._acquireClient(t, new Mn((c, h, d) => d()), n, !1);
							}, this.options.maxLifetimeSeconds * 1e3);
							a.unref(), t.once('end', () => clearTimeout(a));
						}
						return this._acquireClient(t, e, n, !0);
					}
				});
		}
		_acquireClient(e, t, n, i) {
			i && this.emit('connect', e),
				this.emit('acquire', e),
				(e.release = this._releaseOnce(e, n)),
				e.removeListener('error', n),
				t.timedOut
					? i && this.options.verify
						? this.options.verify(e, e.release)
						: e.release()
					: i && this.options.verify
						? this.options.verify(e, (s) => {
								if (s) return e.release(s), t.callback(s, void 0, bS);
								t.callback(void 0, e, e.release);
							})
						: t.callback(void 0, e, e.release);
		}
		_releaseOnce(e, t) {
			let n = !1;
			return (i) => {
				n && Tee(), (n = !0), this._release(e, t, i);
			};
		}
		_release(e, t, n) {
			if (
				(e.on('error', t),
				(e._poolUseCount = (e._poolUseCount || 0) + 1),
				this.emit('release', n, e),
				n ||
					this.ending ||
					!e._queryable ||
					e._ending ||
					e._poolUseCount >= this.options.maxUses)
			) {
				e._poolUseCount >= this.options.maxUses &&
					this.log('remove expended client'),
					this._remove(e),
					this._pulseQueue();
				return;
			}
			if (this._expired.has(e)) {
				this.log('remove expired client'),
					this._expired.delete(e),
					this._remove(e),
					this._pulseQueue();
				return;
			}
			let s;
			this.options.idleTimeoutMillis &&
				((s = setTimeout(() => {
					this.log('remove idle client'), this._remove(e);
				}, this.options.idleTimeoutMillis)),
				this.options.allowExitOnIdle && s.unref()),
				this.options.allowExitOnIdle && e.unref(),
				this._idle.push(new Nd(e, t, s)),
				this._pulseQueue();
		}
		query(e, t, n) {
			if (typeof e == 'function') {
				let s = _a(this.Promise, e);
				return (
					setImmediate(function () {
						return s.callback(
							new Error(
								'Passing a function as the first parameter to pool.query is not supported'
							)
						);
					}),
					s.result
				);
			}
			typeof t == 'function' && ((n = t), (t = void 0));
			let i = _a(this.Promise, n);
			return (
				(n = i.callback),
				this.connect((s, o) => {
					if (s) return n(s);
					let a = !1,
						u = (c) => {
							a || ((a = !0), o.release(c), n(c));
						};
					o.once('error', u), this.log('dispatching query');
					try {
						o.query(e, t, (c, h) => {
							if (
								(this.log('query dispatched'), o.removeListener('error', u), !a)
							)
								return (a = !0), o.release(c), c ? n(c) : n(void 0, h);
						});
					} catch (c) {
						return o.release(c), n(c);
					}
				}),
				i.result
			);
		}
		end(e) {
			if ((this.log('ending'), this.ending)) {
				let n = new Error('Called end on pool more than once');
				return e ? e(n) : this.Promise.reject(n);
			}
			this.ending = !0;
			let t = _a(this.Promise, e);
			return (this._endCallback = t.callback), this._pulseQueue(), t.result;
		}
		get waitingCount() {
			return this._pendingQueue.length;
		}
		get idleCount() {
			return this._idle.length;
		}
		get expiredCount() {
			return this._clients.reduce(
				(e, t) => e + (this._expired.has(t) ? 1 : 0),
				0
			);
		}
		get totalCount() {
			return this._clients.length;
		}
	};
	wS.exports = Id;
});
var CS = l((ipe, xS) => {
	'use strict';
	var ES = _('events').EventEmitter,
		See = _('util'),
		Pd = os(),
		jn = (xS.exports = function (r, e, t) {
			ES.call(this),
				(r = Pd.normalizeQueryConfig(r, e, t)),
				(this.text = r.text),
				(this.values = r.values),
				(this.name = r.name),
				(this.queryMode = r.queryMode),
				(this.callback = r.callback),
				(this.state = 'new'),
				(this._arrayMode = r.rowMode === 'array'),
				(this._emitRowEvents = !1),
				this.on(
					'newListener',
					function (n) {
						n === 'row' && (this._emitRowEvents = !0);
					}.bind(this)
				);
		});
	See.inherits(jn, ES);
	var Oee = {
		sqlState: 'code',
		statementPosition: 'position',
		messagePrimary: 'message',
		context: 'where',
		schemaName: 'schema',
		tableName: 'table',
		columnName: 'column',
		dataTypeName: 'dataType',
		constraintName: 'constraint',
		sourceFile: 'file',
		sourceLine: 'line',
		sourceFunction: 'routine',
	};
	jn.prototype.handleError = function (r) {
		var e = this.native.pq.resultErrorFields();
		if (e)
			for (var t in e) {
				var n = Oee[t] || t;
				r[n] = e[t];
			}
		this.callback ? this.callback(r) : this.emit('error', r),
			(this.state = 'error');
	};
	jn.prototype.then = function (r, e) {
		return this._getPromise().then(r, e);
	};
	jn.prototype.catch = function (r) {
		return this._getPromise().catch(r);
	};
	jn.prototype._getPromise = function () {
		return this._promise
			? this._promise
			: ((this._promise = new Promise(
					function (r, e) {
						this._once('end', r), this._once('error', e);
					}.bind(this)
				)),
				this._promise);
	};
	jn.prototype.submit = function (r) {
		this.state = 'running';
		var e = this;
		(this.native = r.native), (r.native.arrayMode = this._arrayMode);
		var t = function (s, o, a) {
			if (
				((r.native.arrayMode = !1),
				setImmediate(function () {
					e.emit('_done');
				}),
				s)
			)
				return e.handleError(s);
			e._emitRowEvents &&
				(a.length > 1
					? o.forEach((u, c) => {
							u.forEach((h) => {
								e.emit('row', h, a[c]);
							});
						})
					: o.forEach(function (u) {
							e.emit('row', u, a);
						})),
				(e.state = 'end'),
				e.emit('end', a),
				e.callback && e.callback(null, a);
		};
		if ((process.domain && (t = process.domain.bind(t)), this.name)) {
			this.name.length > 63 &&
				(console.error(
					'Warning! Postgres only supports 63 characters for query names.'
				),
				console.error('You supplied %s (%s)', this.name, this.name.length),
				console.error(
					'This can cause conflicts and silent errors executing queries'
				));
			var n = (this.values || []).map(Pd.prepareValue);
			if (r.namedQueries[this.name]) {
				if (this.text && r.namedQueries[this.name] !== this.text) {
					let s = new Error(
						`Prepared statements must be unique - '${this.name}' was used for a different statement`
					);
					return t(s);
				}
				return r.native.execute(this.name, n, t);
			}
			return r.native.prepare(this.name, this.text, n.length, function (s) {
				return s
					? t(s)
					: ((r.namedQueries[e.name] = e.text), e.native.execute(e.name, n, t));
			});
		} else if (this.values) {
			if (!Array.isArray(this.values)) {
				let s = new Error('Query values must be an array');
				return t(s);
			}
			var i = this.values.map(Pd.prepareValue);
			r.native.query(this.text, i, t);
		} else
			this.queryMode === 'extended'
				? r.native.query(this.text, [], t)
				: r.native.query(this.text, t);
	};
});
var OS = l((spe, SS) => {
	'use strict';
	var qS;
	try {
		qS = _('pg-native');
	} catch (r) {
		throw r;
	}
	var Ree = Zh(),
		TS = _('events').EventEmitter,
		Nee = _('util'),
		Iee = ed(),
		AS = CS(),
		Ee = (SS.exports = function (r) {
			TS.call(this),
				(r = r || {}),
				(this._Promise = r.Promise || global.Promise),
				(this._types = new Ree(r.types)),
				(this.native = new qS({types: this._types})),
				(this._queryQueue = []),
				(this._ending = !1),
				(this._connecting = !1),
				(this._connected = !1),
				(this._queryable = !0);
			var e = (this.connectionParameters = new Iee(r));
			r.nativeConnectionString &&
				(e.nativeConnectionString = r.nativeConnectionString),
				(this.user = e.user),
				Object.defineProperty(this, 'password', {
					configurable: !0,
					enumerable: !1,
					writable: !0,
					value: e.password,
				}),
				(this.database = e.database),
				(this.host = e.host),
				(this.port = e.port),
				(this.namedQueries = {});
		});
	Ee.Query = AS;
	Nee.inherits(Ee, TS);
	Ee.prototype._errorAllQueries = function (r) {
		let e = (t) => {
			process.nextTick(() => {
				(t.native = this.native), t.handleError(r);
			});
		};
		this._hasActiveQuery() &&
			(e(this._activeQuery), (this._activeQuery = null)),
			this._queryQueue.forEach(e),
			(this._queryQueue.length = 0);
	};
	Ee.prototype._connect = function (r) {
		var e = this;
		if (this._connecting) {
			process.nextTick(() =>
				r(
					new Error(
						'Client has already been connected. You cannot reuse a client.'
					)
				)
			);
			return;
		}
		(this._connecting = !0),
			this.connectionParameters.getLibpqConnectionString(function (t, n) {
				if (
					(e.connectionParameters.nativeConnectionString &&
						(n = e.connectionParameters.nativeConnectionString),
					t)
				)
					return r(t);
				e.native.connect(n, function (i) {
					if (i) return e.native.end(), r(i);
					(e._connected = !0),
						e.native.on('error', function (s) {
							(e._queryable = !1), e._errorAllQueries(s), e.emit('error', s);
						}),
						e.native.on('notification', function (s) {
							e.emit('notification', {channel: s.relname, payload: s.extra});
						}),
						e.emit('connect'),
						e._pulseQueryQueue(!0),
						r();
				});
			});
	};
	Ee.prototype.connect = function (r) {
		if (r) {
			this._connect(r);
			return;
		}
		return new this._Promise((e, t) => {
			this._connect((n) => {
				n ? t(n) : e();
			});
		});
	};
	Ee.prototype.query = function (r, e, t) {
		var n, i, s, o, a;
		if (r == null)
			throw new TypeError('Client was passed a null or undefined query');
		if (typeof r.submit == 'function')
			(s = r.query_timeout || this.connectionParameters.query_timeout),
				(i = n = r),
				typeof e == 'function' && (r.callback = e);
		else if (
			((s = r.query_timeout || this.connectionParameters.query_timeout),
			(n = new AS(r, e, t)),
			!n.callback)
		) {
			let u, c;
			(i = new this._Promise((h, d) => {
				(u = h), (c = d);
			}).catch((h) => {
				throw (Error.captureStackTrace(h), h);
			})),
				(n.callback = (h, d) => (h ? c(h) : u(d)));
		}
		return (
			s &&
				((a = n.callback),
				(o = setTimeout(() => {
					var u = new Error('Query read timeout');
					process.nextTick(() => {
						n.handleError(u, this.connection);
					}),
						a(u),
						(n.callback = () => {});
					var c = this._queryQueue.indexOf(n);
					c > -1 && this._queryQueue.splice(c, 1), this._pulseQueryQueue();
				}, s)),
				(n.callback = (u, c) => {
					clearTimeout(o), a(u, c);
				})),
			this._queryable
				? this._ending
					? ((n.native = this.native),
						process.nextTick(() => {
							n.handleError(
								new Error('Client was closed and is not queryable')
							);
						}),
						i)
					: (this._queryQueue.push(n), this._pulseQueryQueue(), i)
				: ((n.native = this.native),
					process.nextTick(() => {
						n.handleError(
							new Error(
								'Client has encountered a connection error and is not queryable'
							)
						);
					}),
					i)
		);
	};
	Ee.prototype.end = function (r) {
		var e = this;
		(this._ending = !0),
			this._connected || this.once('connect', this.end.bind(this, r));
		var t;
		return (
			r ||
				(t = new this._Promise(function (n, i) {
					r = (s) => (s ? i(s) : n());
				})),
			this.native.end(function () {
				e._errorAllQueries(new Error('Connection terminated')),
					process.nextTick(() => {
						e.emit('end'), r && r();
					});
			}),
			t
		);
	};
	Ee.prototype._hasActiveQuery = function () {
		return (
			this._activeQuery &&
			this._activeQuery.state !== 'error' &&
			this._activeQuery.state !== 'end'
		);
	};
	Ee.prototype._pulseQueryQueue = function (r) {
		if (this._connected && !this._hasActiveQuery()) {
			var e = this._queryQueue.shift();
			if (!e) {
				r || this.emit('drain');
				return;
			}
			(this._activeQuery = e), e.submit(this);
			var t = this;
			e.once('_done', function () {
				t._pulseQueryQueue();
			});
		}
	};
	Ee.prototype.cancel = function (r) {
		this._activeQuery === r
			? this.native.cancel(function () {})
			: this._queryQueue.indexOf(r) !== -1 &&
				this._queryQueue.splice(this._queryQueue.indexOf(r), 1);
	};
	Ee.prototype.ref = function () {};
	Ee.prototype.unref = function () {};
	Ee.prototype.setTypeParser = function (r, e, t) {
		return this._types.setTypeParser(r, e, t);
	};
	Ee.prototype.getTypeParser = function (r, e) {
		return this._types.getTypeParser(r, e);
	};
});
var kd = l((ope, RS) => {
	'use strict';
	RS.exports = OS();
});
var cs = l((upe, ls) => {
	'use strict';
	var Pee = yS(),
		kee = ss(),
		$ee = Td(),
		Mee = vS(),
		{DatabaseError: jee} = Cd(),
		{escapeIdentifier: Lee, escapeLiteral: Bee} = os(),
		Dee = (r) =>
			class extends Mee {
				constructor(t) {
					super(t, r);
				}
			},
		$d = function (r) {
			(this.defaults = kee),
				(this.Client = r),
				(this.Query = this.Client.Query),
				(this.Pool = Dee(this.Client)),
				(this._pools = []),
				(this.Connection = $ee),
				(this.types = is()),
				(this.DatabaseError = jee),
				(this.escapeIdentifier = Lee),
				(this.escapeLiteral = Bee);
		};
	typeof process.env.NODE_PG_FORCE_NATIVE < 'u'
		? (ls.exports = new $d(kd()))
		: ((ls.exports = new $d(Pee)),
			Object.defineProperty(ls.exports, 'native', {
				configurable: !0,
				enumerable: !1,
				get() {
					var r = null;
					try {
						r = new $d(kd());
					} catch (e) {
						if (e.code !== 'MODULE_NOT_FOUND') throw e;
					}
					return Object.defineProperty(ls.exports, 'native', {value: r}), r;
				},
			}));
});
var Ln = l((cpe, PS) => {
	var Uee = Ji(),
		Fee = Rt(),
		{promisify: Qee} = _('util'),
		Hee = kt(),
		Wee = Sh(),
		Vee = ta(),
		Gee = LT(),
		Jee = ra(),
		Kee = ia(),
		zee = sa(),
		Zee = WT(),
		Yee = kh(),
		{makeEscape: Xee} = Ws(),
		{isString: NS} = U(),
		wa = class extends Hee {
			constructor(e) {
				super(e),
					e.returning && (this.defaultReturning = e.returning),
					e.searchPath && (this.searchPath = e.searchPath);
			}
			transaction() {
				return new Wee(this, ...arguments);
			}
			queryBuilder() {
				return new Gee(this);
			}
			queryCompiler(e, t) {
				return new Vee(this, e, t);
			}
			columnCompiler() {
				return new Jee(this, ...arguments);
			}
			schemaCompiler() {
				return new Yee(this, ...arguments);
			}
			tableCompiler() {
				return new Kee(this, ...arguments);
			}
			viewCompiler() {
				return new zee(this, ...arguments);
			}
			viewBuilder() {
				return new Zee(this, ...arguments);
			}
			_driver() {
				return cs();
			}
			wrapIdentifierImpl(e) {
				if (e === '*') return e;
				let t = '',
					n = e.match(/(.*?)(\[[0-9]+\])/);
				return n && ((e = n[1]), (t = n[2])), `"${e.replace(/"/g, '""')}"${t}`;
			}
			_acquireOnlyConnection() {
				let e = new this.driver.Client(this.connectionSettings);
				return (
					e.on('error', (t) => {
						e.__knex__disposed = t;
					}),
					e.on('end', (t) => {
						e.__knex__disposed = t || 'Connection ended unexpectedly';
					}),
					e.connect().then(() => e)
				);
			}
			acquireRawConnection() {
				let e = this;
				return this._acquireOnlyConnection()
					.then(function (t) {
						return e.version
							? t
							: e.checkVersion(t).then(function (n) {
									return (e.version = n), t;
								});
					})
					.then(async function (n) {
						return await e.setSchemaSearchPath(n), n;
					});
			}
			async destroyRawConnection(e) {
				return Qee((n) => e.end(n))();
			}
			checkVersion(e) {
				return new Promise((t, n) => {
					e.query('select version();', (i, s) => {
						if (i) return n(i);
						t(this._parseVersion(s.rows[0].version));
					});
				});
			}
			_parseVersion(e) {
				return /^PostgreSQL (.*?)( |$)/.exec(e)[1];
			}
			positionBindings(e) {
				let t = 0;
				return e.replace(/(\\*)(\?)/g, function (n, i) {
					return i.length % 2 ? '?' : (t++, `$${t}`);
				});
			}
			setSchemaSearchPath(e, t) {
				let n = t || this.searchPath;
				if (!n) return Promise.resolve(!0);
				if (!Array.isArray(n) && !NS(n))
					throw new TypeError(
						`knex: Expected searchPath to be Array/String, got: ${typeof n}`
					);
				if (NS(n)) {
					if (n.includes(',')) {
						let s = `[${n
							.split(',')
							.map((o) => `'${o}'`)
							.join(', ')}]`;
						this.logger.warn(
							`Detected comma in searchPath "${n}".If you are trying to specify multiple schemas, use Array syntax: ${s}`
						);
					}
					n = [n];
				}
				return (
					(n = n.map((i) => `"${i}"`).join(',')),
					new Promise(function (i, s) {
						e.query(`set search_path to ${n}`, function (o) {
							if (o) return s(o);
							i(!0);
						});
					})
				);
			}
			_stream(e, t, n, i) {
				if (!t.sql) throw new Error('The query is empty');
				let s = process.browser ? void 0 : _('pg-query-stream'),
					o = t.sql;
				return new Promise(function (a, u) {
					let c = e.query(new s(o, t.bindings, i), (h) => {
						u(h);
					});
					c.on('error', function (h) {
						u(h), n.emit('error', h);
					}),
						n.on('end', a),
						c.pipe(n);
				});
			}
			_query(e, t) {
				if (!t.sql) throw new Error('The query is empty');
				let n = {text: t.sql, values: t.bindings || []};
				return (
					t.options && (n = Uee(n, t.options)),
					new Promise(function (i, s) {
						e.query(n, function (o, a) {
							if (o) return s(o);
							(t.response = a), i(t);
						});
					})
				);
			}
			processResponse(e, t) {
				let n = e.response;
				if (e.output) return e.output.call(t, n);
				if (e.method === 'raw') return n;
				let {returning: i} = e;
				if (n.command === 'SELECT')
					return e.method === 'first'
						? n.rows[0]
						: e.method === 'pluck'
							? Fee(n.rows, e.pluck)
							: n.rows;
				if (i) {
					let s = [];
					for (let o = 0, a = n.rows.length; o < a; o++) {
						let u = n.rows[o];
						s[o] = u;
					}
					return s;
				}
				return n.command === 'UPDATE' || n.command === 'DELETE'
					? n.rowCount
					: n;
			}
			async cancelQuery(e) {
				let t = await this.acquireRawConnection();
				try {
					return await this._wrappedCancelQueryCall(t, e);
				} finally {
					await this.destroyRawConnection(t).catch((n) => {
						this.logger.warn(`Connection Error: ${n}`);
					});
				}
			}
			_wrappedCancelQueryCall(e, t) {
				return this._query(e, {
					sql: 'SELECT pg_cancel_backend($1);',
					bindings: [t.processID],
					options: {},
				});
			}
			toPathForJson(e) {
				let t = /^{.*}$/;
				return e.match(t)
					? e
					: '{' +
							e
								.replace(/^(\$\.)/, '')
								.replace('.', ',')
								.replace(/\[([0-9]+)]/, ',$1') +
							'}';
			}
		};
	Object.assign(wa.prototype, {
		dialect: 'postgresql',
		driverName: 'pg',
		canCancelQuery: !0,
		_escapeBinding: Xee({
			escapeArray(r, e) {
				return e(IS(r, e));
			},
			escapeString(r) {
				let e = !1,
					t = "'";
				for (let n = 0; n < r.length; n++) {
					let i = r[n];
					i === "'"
						? (t += i + i)
						: i === '\\'
							? ((t += i + i), (e = !0))
							: (t += i);
				}
				return (t += "'"), e === !0 && (t = 'E' + t), t;
			},
			escapeObject(r, e, t, n = []) {
				if (r && typeof r.toPostgres == 'function') {
					if (((n = n || []), n.indexOf(r) !== -1))
						throw new Error(
							`circular reference detected while preparing "${r}" for query`
						);
					return n.push(r), e(r.toPostgres(e), n);
				}
				return JSON.stringify(r);
			},
		}),
	});
	function IS(r, e) {
		let t = '{';
		for (let n = 0; n < r.length; n++) {
			n > 0 && (t += ',');
			let i = r[n];
			i === null || typeof i > 'u'
				? (t += 'NULL')
				: Array.isArray(i)
					? (t += IS(i, e))
					: typeof i == 'number'
						? (t += i)
						: (t += JSON.stringify(typeof i == 'string' ? i : e(i)));
		}
		return t + '}';
	}
	PS.exports = wa;
});
var MS = l((lpe, $S) => {
	var ete = ta(),
		{columnize: tte, wrap: kS, operator: rte} = ne(),
		Md = class extends ete {
			truncate() {
				return `truncate ${this.tableName}`;
			}
			upsert() {
				let e = this._upsert();
				if (e === '') return e;
				let {returning: t} = this.single;
				return t && (e += this._returning(t)), {sql: e, returning: t};
			}
			_upsert() {
				let e = this.single.upsert || [],
					t = this.with() + `upsert into ${this.tableName} `,
					n = this._insertBody(e);
				return n === '' ? '' : t + n;
			}
			_groupOrder(e, t) {
				return this._basicGroupOrder(e, t);
			}
			whereJsonPath(e) {
				let t = '';
				return (
					!isNaN(e.value) && parseInt(e.value)
						? (t = '::int')
						: !isNaN(e.value) && parseFloat(e.value)
							? (t = '::float')
							: (t = " #>> '{}'"),
					`json_extract_path(${this._columnClause(e)}, ${this.client.toArrayPathFromJsonPath(e.jsonPath, this.builder, this.bindingsHolder)})${t} ${rte(e.operator, this.builder, this.client, this.bindingsHolder)} ${this._jsonValueClause(e)}`
				);
			}
			_jsonExtract(e, t) {
				let n;
				return (
					Array.isArray(t.column) ? (n = t.column) : (n = [t]),
					n
						.map((i) => {
							let s = `json_extract_path(${tte(i.column || i[0], this.builder, this.client, this.bindingsHolder)}, ${this.client.toArrayPathFromJsonPath(i.path || i[1], this.builder, this.bindingsHolder)})`,
								o = i.alias || i[2];
							return o ? this.client.alias(s, this.formatter.wrap(o)) : s;
						})
						.join(', ')
				);
			}
			_onJsonPathEquals(e, t) {
				return (
					'json_extract_path(' +
					kS(
						t.columnFirst,
						void 0,
						this.builder,
						this.client,
						this.bindingsHolder
					) +
					', ' +
					this.client.toArrayPathFromJsonPath(
						t.jsonPathFirst,
						this.builder,
						this.bindingsHolder
					) +
					') = json_extract_path(' +
					kS(
						t.columnSecond,
						void 0,
						this.builder,
						this.client,
						this.bindingsHolder
					) +
					', ' +
					this.client.toArrayPathFromJsonPath(
						t.jsonPathSecond,
						this.builder,
						this.bindingsHolder
					) +
					')'
				);
			}
		};
	$S.exports = Md;
});
var LS = l((hpe, jS) => {
	var nte = ra(),
		jd = class extends nte {
			uuid(e = {primaryKey: !1}) {
				return (
					'uuid' +
					(this.tableCompiler._canBeAddPrimaryKey(e)
						? ' primary key default gen_random_uuid()'
						: '')
				);
			}
		};
	jS.exports = jd;
});
var DS = l((dpe, BS) => {
	var ite = ia(),
		Ld = class extends ite {
			constructor(e, t) {
				super(e, t);
			}
			addColumns(e, t, n) {
				if (t === this.alterColumnsPrefix)
					for (let i of n)
						this.client.logger.warn(
							'Experimental alter column in use, see issue: https://github.com/cockroachdb/cockroach/issues/49329'
						),
							this.pushQuery({
								sql: 'SET enable_experimental_alter_column_type_general = true',
								bindings: [],
							}),
							super._addColumn(i);
				else super.addColumns(e, t);
			}
			dropUnique(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('unique', this.tableNameRaw, e)),
					this.pushQuery(`drop index ${this.tableName()}@${t} cascade `);
			}
		};
	BS.exports = Ld;
});
var FS = l((fpe, US) => {
	var ste = sa(),
		Bd = class extends ste {
			renameColumn(e, t) {
				throw new Error(
					'rename column of views is not supported by this dialect.'
				);
			}
			defaultTo(e, t) {
				throw new Error(
					'change default values of views is not supported by this dialect.'
				);
			}
		};
	US.exports = Bd;
});
var HS = l((mpe, QS) => {
	var ote = Ze(),
		ate = we();
	QS.exports = class extends ote {
		upsert(e, t, n) {
			return (
				(this._method = 'upsert'),
				ate(t) || this.returning(t, n),
				(this._single.upsert = e),
				this
			);
		}
	};
});
var VS = l((gpe, WS) => {
	var ute = Ln(),
		cte = Sh(),
		lte = MS(),
		hte = LS(),
		dte = DS(),
		fte = FS(),
		pte = HS(),
		va = class extends ute {
			transaction() {
				return new cte(this, ...arguments);
			}
			queryCompiler(e, t) {
				return new lte(this, e, t);
			}
			columnCompiler() {
				return new hte(this, ...arguments);
			}
			tableCompiler() {
				return new dte(this, ...arguments);
			}
			viewCompiler() {
				return new fte(this, ...arguments);
			}
			queryBuilder() {
				return new pte(this);
			}
			_parseVersion(e) {
				return e.split(' ')[2];
			}
			async cancelQuery(e) {
				try {
					return await this._wrappedCancelQueryCall(null, e);
				} catch (t) {
					throw (this.logger.warn(`Connection Error: ${t}`), t);
				}
			}
			_wrappedCancelQueryCall(e, t) {
				if (!(t.activeQuery.processID === 0 && t.activeQuery.secretKey === 0))
					return t.cancel(t, t.activeQuery);
			}
			toArrayPathFromJsonPath(e, t, n) {
				return e
					.replace(/^(\$\.)/, '')
					.replace(/\[([0-9]+)]/, '.$1')
					.split('.')
					.map(
						function (i) {
							return this.parameter(i, t, n);
						}.bind(this)
					)
					.join(', ');
			}
		};
	Object.assign(va.prototype, {driverName: 'cockroachdb'});
	WS.exports = va;
});
var JS = l((ype, GS) => {
	function mte(r) {
		return r == null;
	}
	GS.exports = mte;
});
var zS = l((bpe, KS) => {
	var gte = zi(),
		Dd = class extends gte {
			columnizeWithPrefix(e, t) {
				let n = typeof t == 'string' ? [t] : t,
					i = '',
					s = -1;
				for (; ++s < n.length; )
					s > 0 && (i += ', '), (i += e + this.wrap(n[s]));
				return i;
			}
			escapingStringDelimiters(e) {
				return (e || '').replace(/'/g, "''");
			}
		};
	KS.exports = Dd;
});
var XS = l((_pe, YS) => {
	var yte = lt(),
		Lt = Pe()('knex:tx'),
		Ud = class extends yte {
			begin(e) {
				return (
					Lt('transaction::begin id=%s', this.txid),
					new Promise((t, n) => {
						e.beginTransaction(
							(i) => {
								if (i)
									return (
										Lt(
											'transaction::begin error id=%s message=%s',
											this.txid,
											i.message
										),
										n(i)
									);
								t();
							},
							this.outerTx ? this.txid : void 0,
							bte(this.isolationLevel)
						);
					}).then(this._resolver, this._rejecter)
				);
			}
			savepoint(e) {
				return (
					Lt('transaction::savepoint id=%s', this.txid),
					new Promise((t, n) => {
						e.saveTransaction(
							(i) => {
								if (i)
									return (
										Lt(
											'transaction::savepoint id=%s message=%s',
											this.txid,
											i.message
										),
										n(i)
									);
								this.trxClient.emit('query', {
									__knexUid: this.trxClient.__knexUid,
									__knexTxId: this.trxClient.__knexTxId,
									autogenerated: !0,
									sql: this.outerTx
										? `SAVE TRANSACTION [${this.txid}]`
										: 'SAVE TRANSACTION',
								}),
									t();
							},
							this.outerTx ? this.txid : void 0
						);
					})
				);
			}
			commit(e, t) {
				return (
					Lt('transaction::commit id=%s', this.txid),
					new Promise((n, i) => {
						e.commitTransaction(
							(s) => {
								if (s)
									return (
										Lt(
											'transaction::commit error id=%s message=%s',
											this.txid,
											s.message
										),
										i(s)
									);
								(this._completed = !0), n(t);
							},
							this.outerTx ? this.txid : void 0
						);
					}).then(() => this._resolver(t), this._rejecter)
				);
			}
			release(e, t) {
				return this._resolver(t);
			}
			rollback(e, t) {
				return (
					(this._completed = !0),
					Lt('transaction::rollback id=%s', this.txid),
					new Promise((n, i) => {
						if (!e.inTransaction)
							return i(
								t || new Error('Transaction rejected with non-error: undefined')
							);
						if (e.state.name !== 'LoggedIn')
							return i(
								new Error(
									"Can't rollback transaction. There is a request in progress"
								)
							);
						e.rollbackTransaction(
							(s) => {
								s &&
									Lt(
										'transaction::rollback error id=%s message=%s',
										this.txid,
										s.message
									),
									i(
										s ||
											t ||
											new Error(
												'Transaction rejected with non-error: undefined'
											)
									);
							},
							this.outerTx ? this.txid : void 0
						);
					}).catch((n) => {
						if (!t && this.doNotRejectOnRollback) {
							this._resolver();
							return;
						}
						if (t)
							try {
								n.originalError = t;
							} catch {}
						this._rejecter(n);
					})
				);
			}
			rollbackTo(e, t) {
				return this.rollback(e, t).then(
					() =>
						void this.trxClient.emit('query', {
							__knexUid: this.trxClient.__knexUid,
							__knexTxId: this.trxClient.__knexTxId,
							autogenerated: !0,
							sql: 'ROLLBACK TRANSACTION',
						})
				);
			}
		};
	YS.exports = Ud;
	function bte(r) {
		if (!r) return;
		r = r.toUpperCase().replace(' ', '_');
		let e = ZS[r];
		if (!e)
			throw new Error(
				`Unknown Isolation level, was expecting one of: ${JSON.stringify(_te)}`
			);
		return e;
	}
	var ZS = {
			READ_UNCOMMITTED: 1,
			READ_COMMITTED: 2,
			REPEATABLE_READ: 3,
			SERIALIZABLE: 4,
			SNAPSHOT: 5,
		},
		_te = Object.keys(ZS).map((r) => r.toLowerCase().replace('_', ' '));
});
var iO = l((wpe, nO) => {
	var wte = It(),
		vte = Do(),
		eO = ge(),
		tO = we(),
		Ete = vr(),
		{columnize: rO} = ne(),
		xte = [
			'comments',
			'columns',
			'join',
			'lock',
			'where',
			'union',
			'group',
			'having',
			'order',
			'limit',
			'offset',
		],
		Fd = class extends wte {
			constructor(e, t, n) {
				super(e, t, n);
				let {onConflict: i} = this.single;
				if (i) throw new Error('.onConflict() is not supported for mssql.');
				this._emptyInsertValue = 'default values';
			}
			with() {
				let e = [];
				if (this.grouped.with)
					for (let n of this.grouped.with)
						n.recursive && (e.push(n), (n.recursive = !1));
				let t = super.with();
				for (let n of e) n.recursive = !0;
				return t;
			}
			select() {
				let e = this.with(),
					t = xte.map((n) => this[n](this));
				return e + vte(t).join(' ');
			}
			insert() {
				return this.single.options &&
					this.single.options.includeTriggerModifications
					? this.insertWithTriggers()
					: this.standardInsert();
			}
			insertWithTriggers() {
				let e = this.single.insert || [],
					{returning: t} = this.single,
					n =
						this.with() +
						`${this._buildTempTable(t)}insert into ${this.tableName} `,
					i = t ? this._returning('insert', t, !0) + ' ' : '';
				if (Array.isArray(e)) {
					if (e.length === 0) return '';
				} else if (typeof e == 'object' && tO(e))
					return {
						sql: n + i + this._emptyInsertValue + this._buildReturningSelect(t),
						returning: t,
					};
				return (
					(n += this._buildInsertData(e, i)),
					t && (n += this._buildReturningSelect(t)),
					{sql: n, returning: t}
				);
			}
			_buildInsertData(e, t) {
				let n = '',
					i = this._prepInsert(e);
				if (typeof i == 'string') n += i;
				else if (i.columns.length)
					(n += `(${this.formatter.columnize(i.columns)}`),
						(n += `) ${t}values (` + this._buildInsertValues(i) + ')');
				else if (e.length === 1 && e[0]) n += t + this._emptyInsertValue;
				else return '';
				return n;
			}
			standardInsert() {
				let e = this.single.insert || [],
					t = this.with() + `insert into ${this.tableName} `,
					{returning: n} = this.single,
					i = n ? this._returning('insert', n) + ' ' : '';
				if (Array.isArray(e)) {
					if (e.length === 0) return '';
				} else if (typeof e == 'object' && tO(e))
					return {sql: t + i + this._emptyInsertValue, returning: n};
				return (t += this._buildInsertData(e, i)), {sql: t, returning: n};
			}
			update() {
				return this.single.options &&
					this.single.options.includeTriggerModifications
					? this.updateWithTriggers()
					: this.standardUpdate();
			}
			updateWithTriggers() {
				let e = this.top(),
					t = this.with(),
					n = this._prepUpdate(this.single.update),
					i = this.join(),
					s = this.where(),
					o = this.order(),
					{returning: a} = this.single,
					u = this._buildTempTable(a);
				return {
					sql:
						t +
						u +
						`update ${e ? e + ' ' : ''}${this.tableName} set ` +
						n.join(', ') +
						(a ? ` ${this._returning('update', a, !0)}` : '') +
						(i ? ` from ${this.tableName} ${i}` : '') +
						(s ? ` ${s}` : '') +
						(o ? ` ${o}` : '') +
						(a
							? this._buildReturningSelect(a)
							: this._returning('rowcount', '@@rowcount')),
					returning: a || '@@rowcount',
				};
			}
			_formatGroupsItemValue(e, t) {
				let n = super._formatGroupsItemValue(e);
				if (t && !(e instanceof Ete)) {
					let i = `IIF(${n} is null,`;
					if (t === 'first') return `${i}0,1)`;
					if (t === 'last') return `${i}1,0)`;
				}
				return n;
			}
			standardUpdate() {
				let e = this.top(),
					t = this.with(),
					n = this._prepUpdate(this.single.update),
					i = this.join(),
					s = this.where(),
					o = this.order(),
					{returning: a} = this.single;
				return {
					sql:
						t +
						`update ${e ? e + ' ' : ''}${this.tableName} set ` +
						n.join(', ') +
						(a ? ` ${this._returning('update', a)}` : '') +
						(i ? ` from ${this.tableName} ${i}` : '') +
						(s ? ` ${s}` : '') +
						(o ? ` ${o}` : '') +
						(a ? '' : this._returning('rowcount', '@@rowcount')),
					returning: a || '@@rowcount',
				};
			}
			del() {
				return this.single.options &&
					this.single.options.includeTriggerModifications
					? this.deleteWithTriggers()
					: this.standardDelete();
			}
			deleteWithTriggers() {
				let e = this.with(),
					{tableName: t} = this,
					n = this.where(),
					i = this.join(),
					{returning: s} = this.single,
					o = s ? ` ${this._returning('del', s, !0)}` : '',
					a = i ? `${t}${o} ` : '';
				return {
					sql:
						e +
						`${this._buildTempTable(s)}delete ${a}from ${t}` +
						(i ? '' : o) +
						(i ? ` ${i}` : '') +
						(n ? ` ${n}` : '') +
						(s
							? this._buildReturningSelect(s)
							: this._returning('rowcount', '@@rowcount')),
					returning: s || '@@rowcount',
				};
			}
			standardDelete() {
				let e = this.with(),
					{tableName: t} = this,
					n = this.where(),
					i = this.join(),
					{returning: s} = this.single,
					o = s ? ` ${this._returning('del', s)}` : '',
					a = i ? `${t}${o} ` : '';
				return {
					sql:
						e +
						`delete ${a}from ${t}` +
						(i ? '' : o) +
						(i ? ` ${i}` : '') +
						(n ? ` ${n}` : '') +
						(s ? '' : this._returning('rowcount', '@@rowcount')),
					returning: s || '@@rowcount',
				};
			}
			columns() {
				let e = '';
				if (this.onlyUnions()) return '';
				let t = this.top(),
					n = this._hintComments(),
					i = this.grouped.columns || [],
					s = -1,
					o = [];
				if (i)
					for (; ++s < i.length; ) {
						let u = i[s];
						if ((u.distinct && (e = 'distinct '), u.distinctOn)) {
							e = this.distinctOn(u.value);
							continue;
						}
						u.type === 'aggregate'
							? o.push(...this.aggregate(u))
							: u.type === 'aggregateRaw'
								? o.push(this.aggregateRaw(u))
								: u.type === 'analytic'
									? o.push(this.analytic(u))
									: u.type === 'json'
										? o.push(this.json(u))
										: u.value &&
											u.value.length > 0 &&
											o.push(this.formatter.columnize(u.value));
					}
				return (
					o.length === 0 && (o = ['*']),
					`${this.onlyJson() ? '' : 'select '}${n}${e}` +
						(t ? t + ' ' : '') +
						o.join(', ') +
						(this.tableName ? ` from ${this.tableName}` : '')
				);
			}
			_returning(e, t, n) {
				switch (e) {
					case 'update':
					case 'insert':
						return t
							? `output ${this.formatter.columnizeWithPrefix('inserted.', t)}${n ? ' into #out' : ''}`
							: '';
					case 'del':
						return t
							? `output ${this.formatter.columnizeWithPrefix('deleted.', t)}${n ? ' into #out' : ''}`
							: '';
					case 'rowcount':
						return t ? ';select @@rowcount' : '';
				}
			}
			_buildTempTable(e) {
				if (e && e.length > 0) {
					let t = '';
					Array.isArray(e)
						? (t = e.map((i) => `[t].${this.formatter.columnize(i)}`).join(','))
						: (t = `[t].${this.formatter.columnize(e)}`);
					let n = `select top(0) ${t} into #out `;
					return (
						(n += `from ${this.tableName} as t `),
						(n += `left join ${this.tableName} on 0=1;`),
						n
					);
				}
				return '';
			}
			_buildReturningSelect(e) {
				if (e && e.length > 0) {
					let t = '';
					Array.isArray(e)
						? (t = e.map((i) => `${this.formatter.columnize(i)}`).join(','))
						: (t = this.formatter.columnize(e));
					let n = `; select ${t} from #out; `;
					return (n += 'drop table #out;'), n;
				}
				return '';
			}
			truncate() {
				return `truncate table ${this.tableName}`;
			}
			forUpdate() {
				return 'with (UPDLOCK)';
			}
			forShare() {
				return 'with (HOLDLOCK)';
			}
			columnInfo() {
				let e = this.single.columnInfo,
					t = this.single.schema,
					n = this.client.customWrapIdentifier(this.single.table, eO);
				t && (t = this.client.customWrapIdentifier(t, eO));
				let i =
						'select [COLUMN_NAME], [COLUMN_DEFAULT], [DATA_TYPE], [CHARACTER_MAXIMUM_LENGTH], [IS_NULLABLE] from INFORMATION_SCHEMA.COLUMNS where table_name = ? and table_catalog = ?',
					s = [n, this.client.database()];
				return (
					t
						? ((i += ' and table_schema = ?'), s.push(t))
						: (i += " and table_schema = 'dbo'"),
					{
						sql: i,
						bindings: s,
						output(o) {
							let a = o.reduce(
								(u, c) => (
									(u[c[0].value] = {
										defaultValue: c[1].value,
										type: c[2].value,
										maxLength: c[3].value,
										nullable: c[4].value === 'YES',
									}),
									u
								),
								{}
							);
							return (e && a[e]) || a;
						},
					}
				);
			}
			top() {
				let e = !this.single.limit && this.single.limit !== 0,
					t = !this.single.offset;
				return e || !t
					? ''
					: `top (${this._getValueOrParameterFromAttribute('limit')})`;
			}
			limit() {
				return '';
			}
			offset() {
				let e = !this.single.limit && this.single.limit !== 0,
					t = !this.single.offset;
				if (t) return '';
				let n = `offset ${t ? '0' : this._getValueOrParameterFromAttribute('offset')} rows`;
				return (
					e ||
						(n += ` fetch next ${this._getValueOrParameterFromAttribute('limit')} rows only`),
					n
				);
			}
			whereLike(e) {
				return `${this._columnClause(e)} collate SQL_Latin1_General_CP1_CS_AS ${this._not(e, 'like ')}${this._valueClause(e)}`;
			}
			whereILike(e) {
				return `${this._columnClause(e)} collate SQL_Latin1_General_CP1_CI_AS ${this._not(e, 'like ')}${this._valueClause(e)}`;
			}
			jsonExtract(e) {
				return this._jsonExtract(
					e.singleValue ? 'JSON_VALUE' : 'JSON_QUERY',
					e
				);
			}
			jsonSet(e) {
				return this._jsonSet('JSON_MODIFY', e);
			}
			jsonInsert(e) {
				return this._jsonSet('JSON_MODIFY', e);
			}
			jsonRemove(e) {
				let t = `JSON_MODIFY(${rO(e.column, this.builder, this.client, this.bindingsHolder)},${this.client.parameter(e.path, this.builder, this.bindingsHolder)}, NULL)`;
				return e.alias ? this.client.alias(t, this.formatter.wrap(e.alias)) : t;
			}
			whereJsonPath(e) {
				return this._whereJsonPath('JSON_VALUE', e);
			}
			whereJsonSupersetOf(e) {
				throw new Error(
					'Json superset where clause not actually supported by MSSQL'
				);
			}
			whereJsonSubsetOf(e) {
				throw new Error(
					'Json subset where clause not actually supported by MSSQL'
				);
			}
			_getExtracts(e, t) {
				let n = rO(e.column, this.builder, this.client, this.bindingsHolder);
				return (Array.isArray(e.values) ? e.values : [e.values])
					.map(function (i) {
						return (
							'JSON_VALUE(' +
							n +
							',' +
							this.client.parameter(i, this.builder, this.bindingsHolder) +
							')'
						);
					}, this)
					.join(t);
			}
			onJsonPathEquals(e) {
				return this._onJsonPathEquals('JSON_VALUE', e);
			}
		};
	nO.exports = Fd;
});
var oO = l((vpe, sO) => {
	var Cte = Er(),
		Ea = class extends Cte {
			constructor(e, t) {
				super(e, t);
			}
			dropTableIfExists(e) {
				let t = this.formatter.wrap(Bn(this.schema, e));
				this.pushQuery(`if object_id('${t}', 'U') is not null DROP TABLE ${t}`);
			}
			dropViewIfExists(e) {
				let t = this.formatter.wrap(Bn(this.schema, e));
				this.pushQuery(`if object_id('${t}', 'V') is not null DROP VIEW ${t}`);
			}
			renameTable(e, t) {
				this.pushQuery(
					`exec sp_rename ${this.client.parameter(Bn(this.schema, e), this.builder, this.bindingsHolder)}, ${this.client.parameter(t, this.builder, this.bindingsHolder)}`
				);
			}
			renameView(e, t) {
				this.pushQuery(
					`exec sp_rename ${this.client.parameter(Bn(this.schema, e), this.builder, this.bindingsHolder)}, ${this.client.parameter(t, this.builder, this.bindingsHolder)}`
				);
			}
			hasTable(e) {
				let t = this.client.parameter(
						Bn(this.schema, e),
						this.builder,
						this.bindingsHolder
					),
					n = [e],
					i = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ${t}`;
				this.schema && ((i += ' AND TABLE_SCHEMA = ?'), n.push(this.schema)),
					this.pushQuery({sql: i, bindings: n, output: (s) => s.length > 0});
			}
			hasColumn(e, t) {
				let n = this.client.parameter(t, this.builder, this.bindingsHolder),
					i = this.client.parameter(
						this.formatter.wrap(Bn(this.schema, e)),
						this.builder,
						this.bindingsHolder
					),
					s = `select object_id from sys.columns where name = ${n} and object_id = object_id(${i})`;
				this.pushQuery({sql: s, output: (o) => o.length > 0});
			}
		};
	Ea.prototype.dropTablePrefix = 'DROP TABLE ';
	function Bn(r, e) {
		return r ? `${r}.${e}` : e;
	}
	sO.exports = Ea;
});
var uO = l((Epe, aO) => {
	var qte = xr(),
		Tte = re(),
		{isObject: Qd} = U(),
		Bt = class extends qte {
			constructor(e, t) {
				super(e, t);
			}
			createQuery(e, t, n) {
				let i = t ? `if object_id('${this.tableName()}', 'U') is null ` : '';
				n
					? (i += `SELECT * INTO ${this.tableName()} FROM ${this.tableNameLike()} WHERE 0=1`)
					: (i +=
							'CREATE TABLE ' +
							this.tableName() +
							(this._formatting
								? ` (
    `
								: ' (') +
							e.sql.join(
								this._formatting
									? `,
    `
									: ', '
							) +
							this._addChecks() +
							')'),
					this.pushQuery(i),
					this.single.comment && this.comment(this.single.comment),
					n && this.addColumns(e, this.addColumnsPrefix);
			}
			comment(e) {
				if (!e) return;
				e.length > 7500 / 2 &&
					this.client.logger.warn(
						'Your comment might be longer than the max comment length for MSSQL of 7,500 bytes.'
					);
				let t = this.formatter.escapingStringDelimiters(e),
					n = this.formatter.escapingStringDelimiters(
						this.schemaNameRaw || 'dbo'
					),
					i = this.formatter.escapingStringDelimiters(this.tableNameRaw),
					s = `N'MS_Description', N'${t}', N'Schema', N'${n}', N'Table', N'${i}'`,
					o = `EXISTS(SELECT * FROM sys.fn_listextendedproperty(N'MS_Description', N'Schema', N'${n}', N'Table', N'${i}', NULL, NULL))`;
				this.pushQuery(`IF ${o}
  EXEC sys.sp_updateextendedproperty ${s}
ELSE
  EXEC sys.sp_addextendedproperty ${s}`);
			}
			addColumns(e, t) {
				(t = t || this.addColumnsPrefix),
					e.sql.length > 0 &&
						this.pushQuery({
							sql:
								(this.lowerCase ? 'alter table ' : 'ALTER TABLE ') +
								this.tableName() +
								' ' +
								t +
								e.sql.join(', '),
							bindings: e.bindings,
						});
			}
			alterColumns(e, t) {
				for (let n = 0, i = t.length; n < i; n++) {
					let s = t[n];
					if (s.modified.defaultTo) {
						let a = `
              DECLARE @constraint varchar(100) = (SELECT default_constraints.name
                                                  FROM sys.all_columns
                                                  INNER JOIN sys.tables
                                                    ON all_columns.object_id = tables.object_id
                                                  INNER JOIN sys.schemas
                                                    ON tables.schema_id = schemas.schema_id
                                                  INNER JOIN sys.default_constraints
                                                    ON all_columns.default_object_id = default_constraints.object_id
                                                  WHERE schemas.name = '${this.schemaNameRaw || 'dbo'}'
                                                  AND tables.name = '${this.tableNameRaw}'
                                                  AND all_columns.name = '${s.getColumnName()}')

              IF @constraint IS NOT NULL EXEC('ALTER TABLE ${this.tableNameRaw} DROP CONSTRAINT ' + @constraint)`;
						this.pushQuery(a);
					}
				}
				e.sql.forEach((n) => {
					this.pushQuery({
						sql:
							(this.lowerCase ? 'alter table ' : 'ALTER TABLE ') +
							this.tableName() +
							' ' +
							(this.lowerCase
								? this.alterColumnPrefix.toLowerCase()
								: this.alterColumnPrefix) +
							n,
						bindings: e.bindings,
					});
				});
			}
			dropColumn() {
				let e = this,
					t = Tte.normalizeArr.apply(null, arguments),
					i = (Array.isArray(t) ? t : [t]).map((o) => e.formatter.wrap(o)),
					s = this.schemaNameRaw || 'dbo';
				for (let o of t) {
					let a = `
              DECLARE @constraint varchar(100) = (SELECT default_constraints.name
                                                  FROM sys.all_columns
                                                  INNER JOIN sys.tables
                                                    ON all_columns.object_id = tables.object_id
                                                  INNER JOIN sys.schemas
                                                    ON tables.schema_id = schemas.schema_id
                                                  INNER JOIN sys.default_constraints
                                                    ON all_columns.default_object_id = default_constraints.object_id
                                                  WHERE schemas.name = '${s}'
                                                  AND tables.name = '${this.tableNameRaw}'
                                                  AND all_columns.name = '${o}')

              IF @constraint IS NOT NULL EXEC('ALTER TABLE ${this.tableNameRaw} DROP CONSTRAINT ' + @constraint)`;
					this.pushQuery(a);
				}
				this.pushQuery(
					(this.lowerCase ? 'alter table ' : 'ALTER TABLE ') +
						this.tableName() +
						' ' +
						this.dropColumnPrefix +
						i.join(', ')
				);
			}
			changeType() {}
			renameColumn(e, t) {
				this.pushQuery(
					`exec sp_rename ${this.client.parameter(this.tableName() + '.' + e, this.tableBuilder, this.bindingsHolder)}, ${this.client.parameter(t, this.tableBuilder, this.bindingsHolder)}, 'COLUMN'`
				);
			}
			dropFKRefs(e, t) {
				let n = this.client.formatter(this.tableBuilder);
				return Promise.all(
					t.map(function (i) {
						let s = n.wrap(i.CONSTRAINT_NAME),
							o = n.wrap(i.TABLE_NAME);
						return e.query({sql: `ALTER TABLE ${o} DROP CONSTRAINT ${s}`});
					})
				);
			}
			createFKRefs(e, t) {
				let n = this.client.formatter(this.tableBuilder);
				return Promise.all(
					t.map(function (i) {
						let s = n.wrap(i.TABLE_NAME),
							o = n.wrap(i.CONSTRAINT_NAME),
							a = n.columnize(i.COLUMN_NAME),
							u = n.columnize(i.REFERENCED_COLUMN_NAME),
							c = n.wrap(i.REFERENCED_TABLE_NAME),
							h = ` ON UPDATE ${i.UPDATE_RULE}`,
							d = ` ON DELETE ${i.DELETE_RULE}`;
						return e.query({
							sql:
								`ALTER TABLE ${s} ADD CONSTRAINT ${o} FOREIGN KEY (` +
								a +
								') REFERENCES ' +
								c +
								' (' +
								u +
								')' +
								h +
								d,
						});
					})
				);
			}
			index(e, t, n) {
				t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e);
				let i;
				Qd(n) && ({predicate: i} = n);
				let s = i ? ' ' + this.client.queryCompiler(i).where() : '';
				this.pushQuery(
					`CREATE INDEX ${t} ON ${this.tableName()} (${this.formatter.columnize(e)})${s}`
				);
			}
			primary(e, t) {
				let n;
				Qd(t) && ({constraintName: t, deferrable: n} = t),
					n &&
						n !== 'not deferrable' &&
						this.client.logger.warn(
							`mssql: primary key constraint [${t}] will not be deferrable ${n} because mssql does not support deferred constraints.`
						),
					(t = t
						? this.formatter.wrap(t)
						: this.formatter.wrap(`${this.tableNameRaw}_pkey`)),
					this.forCreate
						? this.pushQuery(
								`CONSTRAINT ${t} PRIMARY KEY (${this.formatter.columnize(e)})`
							)
						: this.pushQuery(
								`ALTER TABLE ${this.tableName()} ADD CONSTRAINT ${t} PRIMARY KEY (${this.formatter.columnize(e)})`
							);
			}
			unique(e, t) {
				let n,
					i = !1,
					s;
				if (
					(Qd(t) &&
						({indexName: t, deferrable: n, useConstraint: i, predicate: s} = t),
					n &&
						n !== 'not deferrable' &&
						this.client.logger.warn(
							`mssql: unique index [${t}] will not be deferrable ${n} because mssql does not support deferred constraints.`
						),
					i && s)
				)
					throw new Error('mssql cannot create constraint with predicate');
				if (
					((t = t
						? this.formatter.wrap(t)
						: this._indexCommand('unique', this.tableNameRaw, e)),
					Array.isArray(e) || (e = [e]),
					i)
				)
					this.pushQuery(
						`ALTER TABLE ${this.tableName()} ADD CONSTRAINT ${t} UNIQUE (${this.formatter.columnize(e)})`
					);
				else {
					let o = s
						? ' ' + this.client.queryCompiler(s).where()
						: ' WHERE ' +
							e
								.map((a) => this.formatter.columnize(a) + ' IS NOT NULL')
								.join(' AND ');
					this.pushQuery(
						`CREATE UNIQUE INDEX ${t} ON ${this.tableName()} (${this.formatter.columnize(e)})${o}`
					);
				}
			}
			dropIndex(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e)),
					this.pushQuery(`DROP INDEX ${t} ON ${this.tableName()}`);
			}
			dropForeign(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('foreign', this.tableNameRaw, e)),
					this.pushQuery(
						`ALTER TABLE ${this.tableName()} DROP CONSTRAINT ${t}`
					);
			}
			dropPrimary(e) {
				(e = e
					? this.formatter.wrap(e)
					: this.formatter.wrap(`${this.tableNameRaw}_pkey`)),
					this.pushQuery(
						`ALTER TABLE ${this.tableName()} DROP CONSTRAINT ${e}`
					);
			}
			dropUnique(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('unique', this.tableNameRaw, e)),
					this.pushQuery(`DROP INDEX ${t} ON ${this.tableName()}`);
			}
		};
	Bt.prototype.createAlterTableMethods = ['foreign', 'primary'];
	Bt.prototype.lowerCase = !1;
	Bt.prototype.addColumnsPrefix = 'ADD ';
	Bt.prototype.dropColumnPrefix = 'DROP COLUMN ';
	Bt.prototype.alterColumnPrefix = 'ALTER COLUMN ';
	aO.exports = Bt;
});
var lO = l((xpe, cO) => {
	var Ate = qr(),
		{columnize: Ste} = ne(),
		Hd = class extends Ate {
			constructor(e, t) {
				super(e, t);
			}
			createQuery(e, t, n, i) {
				let o = 'CREATE ' + (i ? 'OR ALTER ' : '') + 'VIEW ' + this.viewName(),
					a = e
						? ' (' +
							Ste(e, this.viewBuilder, this.client, this.bindingsHolder) +
							')'
						: '';
				(o += a), (o += ' AS '), (o += t.toString()), this.pushQuery({sql: o});
			}
			renameColumn(e, t) {
				this.pushQuery(
					`exec sp_rename ${this.client.parameter(this.viewName() + '.' + e, this.viewBuilder, this.bindingsHolder)}, ${this.client.parameter(t, this.viewBuilder, this.bindingsHolder)}, 'COLUMN'`
				);
			}
			createOrReplace() {
				this.createQuery(this.columns, this.selectQuery, !1, !0);
			}
		};
	cO.exports = Hd;
});
var dO = l((Cpe, hO) => {
	var Ote = Pt(),
		{toNumber: Wd} = re(),
		{formatDefault: Rte} = Ot(),
		{operator: Nte} = ne(),
		be = class extends Ote {
			constructor(e, t, n) {
				super(e, t, n),
					(this.modifiers = [
						'nullable',
						'defaultTo',
						'first',
						'after',
						'comment',
					]),
					this._addCheckModifiers();
			}
			double(e, t) {
				return 'float';
			}
			floating(e, t) {
				return 'float';
			}
			integer() {
				return 'int';
			}
			tinyint() {
				return 'tinyint';
			}
			varchar(e) {
				return `nvarchar(${Wd(e, 255)})`;
			}
			timestamp({useTz: e = !1} = {}) {
				return e ? 'datetimeoffset' : 'datetime2';
			}
			bit(e) {
				return (
					e > 1 &&
						this.client.logger.warn(
							'Bit field is exactly 1 bit length for MSSQL'
						),
					'bit'
				);
			}
			binary(e) {
				return e ? `varbinary(${Wd(e)})` : 'varbinary(max)';
			}
			first() {
				return (
					this.client.logger.warn(
						'Column first modifier not available for MSSQL'
					),
					''
				);
			}
			after(e) {
				return (
					this.client.logger.warn(
						'Column after modifier not available for MSSQL'
					),
					''
				);
			}
			defaultTo(e, {constraintName: t} = {}) {
				let n = Rte(e, this.type, this.client);
				return (
					(t =
						typeof t < 'u'
							? t
							: `${this.tableCompiler.tableNameRaw}_${this.getColumnName()}_default`.toLowerCase()),
					this.columnBuilder._method === 'alter'
						? (this.pushAdditional(function () {
								this.pushQuery(
									`ALTER TABLE ${this.tableCompiler.tableName()} ADD CONSTRAINT ${this.formatter.wrap(t)} DEFAULT ${n} FOR ${this.formatter.wrap(this.getColumnName())}`
								);
							}),
							'')
						: t
							? `CONSTRAINT ${this.formatter.wrap(t)} DEFAULT ${n}`
							: `DEFAULT ${n}`
				);
			}
			comment(e) {
				if (!e) return;
				e &&
					e.length > 7500 / 2 &&
					this.client.logger.warn(
						'Your comment might be longer than the max comment length for MSSQL of 7,500 bytes.'
					);
				let t = this.formatter.escapingStringDelimiters(e),
					n = this.tableCompiler.schemaNameRaw || 'dbo',
					i = this.formatter.escapingStringDelimiters(
						this.tableCompiler.tableNameRaw
					),
					s = this.formatter.escapingStringDelimiters(
						this.args[0] || this.defaults('columnName')
					),
					o = `N'MS_Description', N'${t}', N'Schema', N'${n}', N'Table', N'${i}', N'Column', N'${s}'`;
				return (
					this.pushAdditional(function () {
						let a = `EXISTS(SELECT * FROM sys.fn_listextendedproperty(N'MS_Description', N'Schema', N'${n}', N'Table', N'${i}', N'Column', N'${s}'))`;
						this.pushQuery(`IF ${a}
  EXEC sys.sp_updateextendedproperty ${o}
ELSE
  EXEC sys.sp_addextendedproperty ${o}`);
					}),
					''
				);
			}
			checkLength(e, t, n) {
				return this._check(
					`LEN(${this.formatter.wrap(this.getColumnName())}) ${Nte(e, this.columnBuilder, this.bindingsHolder)} ${Wd(t)}`,
					n
				);
			}
			checkRegex(e, t) {
				return this._check(
					`${this.formatter.wrap(this.getColumnName())} LIKE ${this.client._escapeBinding('%' + e + '%')}`,
					t
				);
			}
			increments(e = {primaryKey: !0}) {
				return (
					'int identity(1,1) not null' +
					(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '')
				);
			}
			bigincrements(e = {primaryKey: !0}) {
				return (
					'bigint identity(1,1) not null' +
					(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '')
				);
			}
		};
	be.prototype.bigint = 'bigint';
	be.prototype.mediumint = 'int';
	be.prototype.smallint = 'smallint';
	be.prototype.text = 'nvarchar(max)';
	be.prototype.mediumtext = 'nvarchar(max)';
	be.prototype.longtext = 'nvarchar(max)';
	be.prototype.json = be.prototype.jsonb = 'nvarchar(max)';
	be.prototype.enu = 'nvarchar(100)';
	be.prototype.uuid = ({useBinaryUuid: r = !1} = {}) =>
		r ? 'binary(16)' : 'uniqueidentifier';
	be.prototype.datetime = 'datetime2';
	be.prototype.bool = 'bit';
	hO.exports = be;
});
var gO = l((qpe, mO) => {
	var Ite = Rt(),
		Pte = JS(),
		kte = kt(),
		$te = zS(),
		Mte = XS(),
		jte = iO(),
		Lte = oO(),
		Bte = uO(),
		Dte = lO(),
		Ute = dO(),
		Fte = Ze(),
		{setHiddenProperty: Qte} = Ao(),
		oe = Pe()('knex:mssql'),
		fO = {MIN: -2147483648, MAX: 2147483647},
		pO = {MIN: -9007199254740991, MAX: 9007199254740991},
		xa = class extends kte {
			constructor(e = {}) {
				super(e);
			}
			_generateConnection() {
				let e = this.connectionSettings;
				e.options = e.options || {};
				let t = {
					authentication: {
						type: e.type || 'default',
						options: {
							userName: e.userName || e.user,
							password: e.password,
							domain: e.domain,
							token: e.token,
							clientId: e.clientId,
							clientSecret: e.clientSecret,
							tenantId: e.tenantId,
							msiEndpoint: e.msiEndpoint,
						},
					},
					server: e.server || e.host,
					options: {
						database: e.database,
						encrypt: e.encrypt || !1,
						port: e.port || 1433,
						connectTimeout: e.connectionTimeout || e.timeout || 15e3,
						requestTimeout: Pte(e.requestTimeout) ? 15e3 : e.requestTimeout,
						rowCollectionOnDone: !1,
						rowCollectionOnRequestCompletion: !1,
						useColumnNames: !1,
						tdsVersion: e.options.tdsVersion || '7_4',
						appName: e.options.appName || 'knex',
						trustServerCertificate: !1,
						...e.options,
					},
				};
				return (
					t.authentication.options.password && Qte(t.authentication.options),
					t.options.instanceName && delete t.options.port,
					isNaN(t.options.requestTimeout) && (t.options.requestTimeout = 15e3),
					t.options.requestTimeout === 1 / 0 && (t.options.requestTimeout = 0),
					t.options.requestTimeout < 0 && (t.options.requestTimeout = 0),
					e.debug &&
						(t.options.debug = {packet: !0, token: !0, data: !0, payload: !0}),
					t
				);
			}
			_driver() {
				return _('tedious');
			}
			formatter() {
				return new $te(this, ...arguments);
			}
			transaction() {
				return new Mte(this, ...arguments);
			}
			queryCompiler() {
				return new jte(this, ...arguments);
			}
			schemaCompiler() {
				return new Lte(this, ...arguments);
			}
			tableCompiler() {
				return new Bte(this, ...arguments);
			}
			viewCompiler() {
				return new Dte(this, ...arguments);
			}
			queryBuilder() {
				return new Fte(this);
			}
			columnCompiler() {
				return new Ute(this, ...arguments);
			}
			wrapIdentifierImpl(e) {
				return e === '*' ? '*' : `[${e.replace(/[[\]]+/g, '')}]`;
			}
			acquireRawConnection() {
				return new Promise((e, t) => {
					oe('connection::connection new connection requested');
					let n = this._driver(),
						i = Object.assign({}, this._generateConnection()),
						s = new n.Connection(i);
					s.connect((o) =>
						o
							? (oe('connection::connect error: %s', o.message), t(o))
							: (oe('connection::connect connected to server'),
								(s.connected = !0),
								s.on('error', (a) => {
									oe('connection::error message=%s', a.message),
										(s.__knex__disposed = a),
										(s.connected = !1);
								}),
								s.once('end', () => {
									(s.connected = !1),
										(s.__knex__disposed =
											'Connection to server was terminated.'),
										oe('connection::end connection ended.');
								}),
								e(s))
					);
				});
			}
			validateConnection(e) {
				return e && e.connected;
			}
			destroyRawConnection(e) {
				return (
					oe('connection::destroy'),
					new Promise((t) => {
						e.once('end', () => {
							t();
						}),
							e.close();
					})
				);
			}
			positionBindings(e) {
				let t = -1;
				return e.replace(/\\?\?/g, (n) =>
					n === '\\?' ? '?' : ((t += 1), `@p${t}`)
				);
			}
			_chomp(e) {
				if (e.state.name === 'LoggedIn') {
					let t = this.requestQueue.pop();
					t &&
						(oe(
							'connection::query executing query, %d more in queue',
							this.requestQueue.length
						),
						e.execSql(t));
				}
			}
			_enqueueRequest(e, t) {
				this.requestQueue.push(e), this._chomp(t);
			}
			_makeRequest(e, t) {
				let n = this._driver(),
					i = typeof e == 'string' ? e : e.sql,
					s = 0;
				if (!i) throw new Error('The query is empty');
				oe('request::request sql=%s', i);
				let o = new n.Request(i, (a, u) => {
					if (a) return oe('request::error message=%s', a.message), t(a);
					(s = u), oe('request::callback rowCount=%d', s);
				});
				return (
					o.on('prepared', () => {
						oe('request %s::request prepared', this.id);
					}),
					o.on('done', (a, u) => {
						oe('request::done rowCount=%d more=%s', a, u);
					}),
					o.on('doneProc', (a, u) => {
						oe('request::doneProc id=%s rowCount=%d more=%s', o.id, a, u);
					}),
					o.on('doneInProc', (a, u) => {
						oe('request::doneInProc id=%s rowCount=%d more=%s', o.id, a, u);
					}),
					o.once(
						'requestCompleted',
						() => (oe('request::completed id=%s', o.id), t(null, s))
					),
					o.on(
						'error',
						(a) => (
							oe('request::error id=%s message=%s', o.id, a.message), t(a)
						)
					),
					o
				);
			}
			_stream(e, t, n) {
				return new Promise((i, s) => {
					let o = this._makeRequest(t, (a) => {
						if (a) return n.emit('error', a), s(a);
						i();
					});
					o.on('row', (a) => {
						n.write(
							a.reduce((u, c) => ({...u, [c.metadata.colName]: c.value}), {})
						);
					}),
						o.on('error', (a) => {
							n.emit('error', a), s(a);
						}),
						o.once('requestCompleted', () => {
							n.end(), i();
						}),
						this._assignBindings(o, t.bindings),
						this._enqueueRequest(o, e);
				});
			}
			_assignBindings(e, t) {
				if (Array.isArray(t))
					for (let n = 0; n < t.length; n++) {
						let i = t[n];
						this._setReqInput(e, n, i);
					}
			}
			_scaleForBinding(e) {
				if (e % 1 === 0)
					throw new Error(`The binding value ${e} must be a decimal number.`);
				return {scale: 10};
			}
			_typeForBinding(e) {
				let t = this._driver();
				if (
					this.connectionSettings.options &&
					this.connectionSettings.options.mapBinding
				) {
					let n = this.connectionSettings.options.mapBinding(e);
					if (n) return [n.value, n.type];
				}
				switch (typeof e) {
					case 'string':
						return [e, t.TYPES.NVarChar];
					case 'boolean':
						return [e, t.TYPES.Bit];
					case 'number': {
						if (e % 1 !== 0) return [e, t.TYPES.Float];
						if (e < fO.MIN || e > fO.MAX) {
							if (e < pO.MIN || e > pO.MAX)
								throw new Error(
									`Bigint must be safe integer or must be passed as string, saw ${e}`
								);
							return [e, t.TYPES.BigInt];
						}
						return [e, t.TYPES.Int];
					}
					default:
						return e instanceof Date
							? [e, t.TYPES.DateTime]
							: e instanceof Buffer
								? [e, t.TYPES.VarBinary]
								: [e, t.TYPES.NVarChar];
				}
			}
			_query(e, t) {
				return new Promise((n, i) => {
					let s = [],
						o = this._makeRequest(t, (a, u) => {
							if (a) return i(a);
							(t.response = s), process.nextTick(() => this._chomp(e)), n(t);
						});
					o.on('row', (a) => {
						oe('request::row'), s.push(a);
					}),
						this._assignBindings(o, t.bindings),
						this._enqueueRequest(o, e);
				});
			}
			_setReqInput(e, t, n) {
				let [i, s] = this._typeForBinding(n),
					o = 'p'.concat(t),
					a;
				typeof i == 'number' && i % 1 !== 0 && (a = this._scaleForBinding(i)),
					oe('request::binding pos=%d type=%s value=%s', t, s.name, i),
					Buffer.isBuffer(i) && (a = {length: 'max'}),
					e.addParameter(o, s, i, a);
			}
			processResponse(e, t) {
				if (e == null) return;
				let {response: n} = e,
					{method: i} = e;
				if (
					e.output ||
					((n = n.map((s) =>
						s.reduce((o, a) => {
							let u = a.metadata.colName;
							return (
								o[u]
									? (Array.isArray(o[u]) || (o[u] = [o[u]]), o[u].push(a.value))
									: (o[u] = a.value),
								o
							);
						}, {})
					)),
					e.output)
				)
					return e.output.call(t, n);
				switch (i) {
					case 'select':
						return n;
					case 'first':
						return n[0];
					case 'pluck':
						return Ite(n, e.pluck);
					case 'insert':
					case 'del':
					case 'update':
					case 'counter':
						return e.returning && e.returning === '@@rowcount' ? n[0][''] : n;
					default:
						return n;
				}
			}
		};
	Object.assign(xa.prototype, {
		requestQueue: [],
		dialect: 'mssql',
		driverName: 'mssql',
	});
	mO.exports = xa;
});
var bO = l((Tpe, yO) => {
	var Hte = 'Expected a function';
	function Wte(r, e, t) {
		if (typeof r != 'function') throw new TypeError(Hte);
		return setTimeout(function () {
			r.apply(void 0, t);
		}, e);
	}
	yO.exports = Wte;
});
var wO = l((Ape, _O) => {
	var Vte = bO(),
		Gte = fr(),
		Jte = Gte(function (r, e) {
			return Vte(r, 1, e);
		});
	_O.exports = Jte;
});
var EO = l((Spe, vO) => {
	var Kte = lt(),
		zte = Pe(),
		Zte = zte('knex:tx'),
		Vd = class extends Kte {
			query(e, t, n, i) {
				let s = this,
					o = this.trxClient
						.query(e, t)
						.catch((a) => {
							if (a.errno === 1305) {
								this.trxClient.logger.warn(
									'Transaction was implicitly committed, do not mix transactions and DDL with MySQL (#805)'
								);
								return;
							}
							(n = 2),
								(i = a),
								(s._completed = !0),
								Zte('%s error running transaction query', s.txid);
						})
						.then(function (a) {
							if ((n === 1 && s._resolver(i), n === 2)) {
								if (i === void 0) {
									if (s.doNotRejectOnRollback && /^ROLLBACK\b/i.test(t)) {
										s._resolver();
										return;
									}
									i = new Error(`Transaction rejected with non-error: ${i}`);
								}
								s._rejecter(i);
							}
							return a;
						});
				return (n === 1 || n === 2) && (s._completed = !0), o;
			}
		};
	vO.exports = Vd;
});
var CO = l((Rpe, xO) => {
	var Yte = Ze(),
		Xte = we();
	xO.exports = class extends Yte {
		upsert(e, t, n) {
			return (
				(this._method = 'upsert'),
				Xte(t) || this.returning(t, n),
				(this._single.upsert = e),
				this
			);
		}
	};
});
var RO = l((Npe, OO) => {
	var qO = _('assert'),
		ere = ge(),
		tre = ze(),
		rre = we(),
		nre = It(),
		{wrapAsIdentifier: TO} = Ot(),
		{columnize: ire, wrap: AO} = ne(),
		SO = (r) => tre(r) || Array.isArray(r),
		Gd = class extends nre {
			constructor(e, t, n) {
				super(e, t, n);
				let {returning: i} = this.single;
				i &&
					this.client.logger.warn(
						'.returning() is not supported by mysql and will not have any effect.'
					),
					(this._emptyInsertValue = '() values ()');
			}
			del() {
				let e = super.del();
				if (e === '') return e;
				let t = this.comments();
				return (t === '' ? '' : t + ' ') + e;
			}
			insert() {
				let e = super.insert();
				if (e === '') return e;
				let t = this.comments();
				e = (t === '' ? '' : t + ' ') + e;
				let {ignore: n, merge: i, insert: s} = this.single;
				if (
					(n && (e = e.replace('insert into', 'insert ignore into')),
					i && ((e += this._merge(i.updates, s)), this.where()))
				)
					throw new Error(
						'.onConflict().merge().where() is not supported for mysql'
					);
				return e;
			}
			upsert() {
				let e = this.single.upsert || [],
					t = this.with() + `replace into ${this.tableName} `,
					n = this._insertBody(e);
				return n === '' ? '' : t + n;
			}
			_merge(e, t) {
				let n = ' on duplicate key update ';
				if (e && Array.isArray(e))
					return (
						n +
						e
							.map((i) => TO(i, this.formatter.builder, this.client))
							.map((i) => `${i} = values(${i})`)
							.join(', ')
					);
				if (e && typeof e == 'object') {
					let i = this._prepUpdate(e);
					return n + i.join(',');
				} else {
					let i = this._prepInsert(t);
					if (typeof i == 'string')
						throw new Error(
							'If using merge with a raw insert query, then updates must be provided'
						);
					return (
						n +
						i.columns
							.map((s) => TO(s, this.builder, this.client))
							.map((s) => `${s} = values(${s})`)
							.join(', ')
					);
				}
			}
			update() {
				let e = this.comments(),
					t = this.with(),
					n = this.join(),
					i = this._prepUpdate(this.single.update),
					s = this.where(),
					o = this.order(),
					a = this.limit();
				return (
					(e === '' ? '' : e + ' ') +
					t +
					`update ${this.tableName}` +
					(n ? ` ${n}` : '') +
					' set ' +
					i.join(', ') +
					(s ? ` ${s}` : '') +
					(o ? ` ${o}` : '') +
					(a ? ` ${a}` : '')
				);
			}
			forUpdate() {
				return 'for update';
			}
			forShare() {
				return 'lock in share mode';
			}
			skipLocked() {
				return 'skip locked';
			}
			noWait() {
				return 'nowait';
			}
			columnInfo() {
				let e = this.single.columnInfo;
				return {
					sql: 'select * from information_schema.columns where table_name = ? and table_schema = ?',
					bindings: [
						this.client.customWrapIdentifier(this.single.table, ere),
						this.client.database(),
					],
					output(n) {
						let i = n.reduce(function (s, o) {
							return (
								(s[o.COLUMN_NAME] = {
									defaultValue:
										o.COLUMN_DEFAULT === 'NULL' ? null : o.COLUMN_DEFAULT,
									type: o.DATA_TYPE,
									maxLength: o.CHARACTER_MAXIMUM_LENGTH,
									nullable: o.IS_NULLABLE === 'YES',
								}),
								s
							);
						}, {});
						return (e && i[e]) || i;
					},
				};
			}
			limit() {
				let e = !this.single.limit && this.single.limit !== 0;
				return e && !this.single.offset
					? ''
					: `limit ${this.single.offset && e ? '18446744073709551615' : this._getValueOrParameterFromAttribute('limit')}`;
			}
			whereBasic(e) {
				return (
					qO(
						!SO(e.value),
						'The values in where clause must not be object or array.'
					),
					super.whereBasic(e)
				);
			}
			whereRaw(e) {
				return (
					qO(
						rre(e.value.bindings) || !Object.values(e.value.bindings).some(SO),
						'The values in where clause must not be object or array.'
					),
					super.whereRaw(e)
				);
			}
			whereLike(e) {
				return `${this._columnClause(e)} ${this._not(e, 'like ')}${this._valueClause(e)} COLLATE utf8_bin`;
			}
			whereILike(e) {
				return `${this._columnClause(e)} ${this._not(e, 'like ')}${this._valueClause(e)}`;
			}
			jsonExtract(e) {
				return this._jsonExtract(['json_extract', 'json_unquote'], e);
			}
			jsonSet(e) {
				return this._jsonSet('json_set', e);
			}
			jsonInsert(e) {
				return this._jsonSet('json_insert', e);
			}
			jsonRemove(e) {
				let t = `json_remove(${ire(e.column, this.builder, this.client, this.bindingsHolder)},${this.client.parameter(e.path, this.builder, this.bindingsHolder)})`;
				return e.alias ? this.client.alias(t, this.formatter.wrap(e.alias)) : t;
			}
			whereJsonObject(e) {
				return this._not(
					e,
					`json_contains(${this._columnClause(e)}, ${this._jsonValueClause(e)})`
				);
			}
			whereJsonPath(e) {
				return this._whereJsonPath('json_extract', e);
			}
			whereJsonSupersetOf(e) {
				return this._not(
					e,
					`json_contains(${AO(e.column, void 0, this.builder, this.client, this.bindingsHolder)},${this._jsonValueClause(e)})`
				);
			}
			whereJsonSubsetOf(e) {
				return this._not(
					e,
					`json_contains(${this._jsonValueClause(e)},${AO(e.column, void 0, this.builder, this.client, this.bindingsHolder)})`
				);
			}
			onJsonPathEquals(e) {
				return this._onJsonPathEquals('json_extract', e);
			}
		};
	OO.exports = Gd;
});
var IO = l((Ipe, NO) => {
	var sre = Er(),
		Jd = class extends sre {
			constructor(e, t) {
				super(e, t);
			}
			renameTable(e, t) {
				this.pushQuery(
					`rename table ${this.formatter.wrap(e)} to ${this.formatter.wrap(t)}`
				);
			}
			renameView(e, t) {
				this.renameTable(e, t);
			}
			hasTable(e) {
				let t = 'select * from information_schema.tables where table_name = ?',
					n = [e];
				this.schema
					? ((t += ' and table_schema = ?'), n.push(this.schema))
					: (t += ' and table_schema = database()'),
					this.pushQuery({
						sql: t,
						bindings: n,
						output: function (s) {
							return s.length > 0;
						},
					});
			}
			hasColumn(e, t) {
				this.pushQuery({
					sql: `show columns from ${this.formatter.wrap(e)}`,
					output(n) {
						return n.some(
							(i) =>
								this.client.wrapIdentifier(i.Field.toLowerCase()) ===
								this.client.wrapIdentifier(t.toLowerCase())
						);
					},
				});
			}
		};
	NO.exports = Jd;
});
var kO = l((Ppe, PO) => {
	var ore = xr(),
		{isObject: Kd, isString: are} = U(),
		Dn = class extends ore {
			constructor(e, t) {
				super(e, t);
			}
			createQuery(e, t, n) {
				let i = t ? 'create table if not exists ' : 'create table ',
					{client: s} = this,
					o = {},
					a = ' (' + e.sql.join(', ');
				(a += this.primaryKeys() || ''), (a += this._addChecks()), (a += ')');
				let u =
					i +
					this.tableName() +
					(n && this.tableNameLike() ? ' like ' + this.tableNameLike() : a);
				s.connectionSettings && (o = s.connectionSettings);
				let c = this.single.charset || o.charset || '',
					h = this.single.collate || o.collate || '',
					d = this.single.engine || '';
				if (
					(c && !n && (u += ` default character set ${c}`),
					h && (u += ` collate ${h}`),
					d && (u += ` engine = ${d}`),
					this.single.comment)
				) {
					let f = this.single.comment || '',
						m = 1024;
					f.length > m &&
						this.client.logger.warn(
							`The max length for a table comment is ${m} characters`
						),
						(u += ` comment = '${f}'`);
				}
				this.pushQuery(u), n && this.addColumns(e, this.addColumnsPrefix);
			}
			comment(e) {
				this.pushQuery(`alter table ${this.tableName()} comment = '${e}'`);
			}
			changeType() {}
			renameColumn(e, t) {
				let n = this,
					i = this.tableName(),
					s = this.formatter.wrap(e) + ' ' + this.formatter.wrap(t);
				this.pushQuery({
					sql:
						`show full fields from ${i} where field = ` +
						this.client.parameter(e, this.tableBuilder, this.bindingsHolder),
					output(o) {
						let a = o[0],
							u = this;
						return n.getFKRefs(u).then(([c]) =>
							new Promise((h, d) => {
								try {
									c.length || h(), h(n.dropFKRefs(u, c));
								} catch (f) {
									d(f);
								}
							})
								.then(function () {
									let h = `alter table ${i} change ${s} ${a.Type}`;
									return (
										String(a.Null).toUpperCase() !== 'YES'
											? (h += ' NOT NULL')
											: (h += ' NULL'),
										a.Default !== void 0 &&
											a.Default !== null &&
											(h += ` DEFAULT '${a.Default}'`),
										a.Collation !== void 0 &&
											a.Collation !== null &&
											(h += ` COLLATE '${a.Collation}'`),
										a.Extra == 'auto_increment' && (h += ' AUTO_INCREMENT'),
										u.query({sql: h})
									);
								})
								.then(function () {
									if (c.length)
										return n.createFKRefs(
											u,
											c.map(function (h) {
												return (
													h.REFERENCED_COLUMN_NAME === e &&
														(h.REFERENCED_COLUMN_NAME = t),
													h.COLUMN_NAME === e && (h.COLUMN_NAME = t),
													h
												);
											})
										);
								})
						);
					},
				});
			}
			primaryKeys() {
				let e = (this.grouped.alterTable || []).filter(
					(t) => t.method === 'primary'
				);
				if (e.length > 0 && e[0].args.length > 0) {
					let t = e[0].args[0],
						n = e[0].args[1] || '';
					if (
						(n && (n = ' constraint ' + this.formatter.wrap(n)),
						this.grouped.columns)
					) {
						let i = this._getIncrementsColumnNames();
						i.length &&
							i.forEach((o) => {
								t.includes(o) || t.unshift(o);
							});
						let s = this._getBigIncrementsColumnNames();
						s.length &&
							s.forEach((o) => {
								t.includes(o) || t.unshift(o);
							});
					}
					return `,${n} primary key (${this.formatter.columnize(t)})`;
				}
			}
			getFKRefs(e) {
				let t = {bindings: []},
					n =
						'SELECT KCU.CONSTRAINT_NAME, KCU.TABLE_NAME, KCU.COLUMN_NAME,        KCU.REFERENCED_TABLE_NAME, KCU.REFERENCED_COLUMN_NAME,        RC.UPDATE_RULE, RC.DELETE_RULE FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS KCU JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS AS RC        USING(CONSTRAINT_NAME)WHERE KCU.REFERENCED_TABLE_NAME = ' +
						this.client.parameter(this.tableNameRaw, this.tableBuilder, t) +
						'   AND KCU.CONSTRAINT_SCHEMA = ' +
						this.client.parameter(
							this.client.database(),
							this.tableBuilder,
							t
						) +
						'   AND RC.CONSTRAINT_SCHEMA = ' +
						this.client.parameter(this.client.database(), this.tableBuilder, t);
				return e.query({sql: n, bindings: t.bindings});
			}
			dropFKRefs(e, t) {
				let n = this.client.formatter(this.tableBuilder);
				return Promise.all(
					t.map(function (i) {
						let s = n.wrap(i.CONSTRAINT_NAME),
							o = n.wrap(i.TABLE_NAME);
						return e.query({sql: `alter table ${o} drop foreign key ${s}`});
					})
				);
			}
			createFKRefs(e, t) {
				let n = this.client.formatter(this.tableBuilder);
				return Promise.all(
					t.map(function (i) {
						let s = n.wrap(i.TABLE_NAME),
							o = n.wrap(i.CONSTRAINT_NAME),
							a = n.columnize(i.COLUMN_NAME),
							u = n.columnize(i.REFERENCED_COLUMN_NAME),
							c = n.wrap(i.REFERENCED_TABLE_NAME),
							h = ` ON UPDATE ${i.UPDATE_RULE}`,
							d = ` ON DELETE ${i.DELETE_RULE}`;
						return e.query({
							sql:
								`alter table ${s} add constraint ${o} foreign key (` +
								a +
								') references ' +
								c +
								' (' +
								u +
								')' +
								h +
								d,
						});
					})
				);
			}
			index(e, t, n) {
				let i, s;
				are(n)
					? (s = n)
					: Kd(n) && ({indexType: s, storageEngineIndexType: i} = n),
					(t = t
						? this.formatter.wrap(t)
						: this._indexCommand('index', this.tableNameRaw, e)),
					(i = i ? ` using ${i}` : ''),
					this.pushQuery(
						`alter table ${this.tableName()} add${s ? ` ${s}` : ''} index ${t}(${this.formatter.columnize(e)})${i}`
					);
			}
			primary(e, t) {
				let n;
				Kd(t) && ({constraintName: t, deferrable: n} = t),
					n &&
						n !== 'not deferrable' &&
						this.client.logger.warn(
							`mysql: primary key constraint \`${t}\` will not be deferrable ${n} because mysql does not support deferred constraints.`
						),
					(t = t
						? this.formatter.wrap(t)
						: this.formatter.wrap(`${this.tableNameRaw}_pkey`));
				let i = e,
					s = [],
					o = [];
				this.grouped.columns &&
					((s = this._getIncrementsColumnNames()),
					s &&
						s.forEach((a) => {
							i.includes(a) || i.unshift(a);
						}),
					(o = this._getBigIncrementsColumnNames()),
					o &&
						o.forEach((a) => {
							i.includes(a) || i.unshift(a);
						})),
					this.method !== 'create' &&
						this.method !== 'createIfNot' &&
						this.pushQuery(
							`alter table ${this.tableName()} add primary key ${t}(${this.formatter.columnize(i)})`
						),
					s.length &&
						this.pushQuery(
							`alter table ${this.tableName()} modify column ${this.formatter.columnize(s)} int unsigned not null auto_increment`
						),
					o.length &&
						this.pushQuery(
							`alter table ${this.tableName()} modify column ${this.formatter.columnize(o)} bigint unsigned not null auto_increment`
						);
			}
			unique(e, t) {
				let n, i;
				Kd(t) && ({indexName: t, deferrable: i, storageEngineIndexType: n} = t),
					i &&
						i !== 'not deferrable' &&
						this.client.logger.warn(
							`mysql: unique index \`${t}\` will not be deferrable ${i} because mysql does not support deferred constraints.`
						),
					(t = t
						? this.formatter.wrap(t)
						: this._indexCommand('unique', this.tableNameRaw, e)),
					(n = n ? ` using ${n}` : ''),
					this.pushQuery(
						`alter table ${this.tableName()} add unique ${t}(${this.formatter.columnize(e)})${n}`
					);
			}
			dropIndex(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e)),
					this.pushQuery(`alter table ${this.tableName()} drop index ${t}`);
			}
			dropForeign(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('foreign', this.tableNameRaw, e)),
					this.pushQuery(
						`alter table ${this.tableName()} drop foreign key ${t}`
					);
			}
			dropPrimary() {
				this.pushQuery(`alter table ${this.tableName()} drop primary key`);
			}
			dropUnique(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('unique', this.tableNameRaw, e)),
					this.pushQuery(`alter table ${this.tableName()} drop index ${t}`);
			}
		};
	Dn.prototype.addColumnsPrefix = 'add ';
	Dn.prototype.alterColumnsPrefix = 'modify ';
	Dn.prototype.dropColumnPrefix = 'drop ';
	PO.exports = Dn;
});
var MO = l((kpe, $O) => {
	var ure = Pt(),
		{isObject: Ca} = U(),
		{toNumber: Un} = re(),
		cre = /(?<!\\)'/g,
		Fn = class extends ure {
			constructor(e, t, n) {
				super(e, t, n),
					(this.modifiers = [
						'unsigned',
						'nullable',
						'defaultTo',
						'comment',
						'collate',
						'first',
						'after',
					]),
					this._addCheckModifiers();
			}
			double(e, t) {
				return e ? `double(${Un(e, 8)}, ${Un(t, 2)})` : 'double';
			}
			integer(e) {
				return (e = e ? `(${Un(e, 11)})` : ''), `int${e}`;
			}
			tinyint(e) {
				return (e = e ? `(${Un(e, 1)})` : ''), `tinyint${e}`;
			}
			text(e) {
				switch (e) {
					case 'medium':
					case 'mediumtext':
						return 'mediumtext';
					case 'long':
					case 'longtext':
						return 'longtext';
					default:
						return 'text';
				}
			}
			mediumtext() {
				return this.text('medium');
			}
			longtext() {
				return this.text('long');
			}
			enu(e) {
				return `enum('${e.join("', '")}')`;
			}
			datetime(e) {
				return (
					Ca(e) && ({precision: e} = e),
					typeof e == 'number' ? `datetime(${e})` : 'datetime'
				);
			}
			timestamp(e) {
				return (
					Ca(e) && ({precision: e} = e),
					typeof e == 'number' ? `timestamp(${e})` : 'timestamp'
				);
			}
			time(e) {
				return (
					Ca(e) && ({precision: e} = e),
					typeof e == 'number' ? `time(${e})` : 'time'
				);
			}
			bit(e) {
				return e ? `bit(${Un(e)})` : 'bit';
			}
			binary(e) {
				return e ? `varbinary(${Un(e)})` : 'blob';
			}
			json() {
				return 'json';
			}
			jsonb() {
				return 'json';
			}
			defaultTo(e) {
				if (e == null) return;
				if ((this.type === 'json' || this.type === 'jsonb') && Ca(e))
					return `default ('${JSON.stringify(e)}')`;
				let t = super.defaultTo.apply(this, arguments);
				return this.type !== 'blob' && this.type.indexOf('text') === -1
					? t
					: '';
			}
			unsigned() {
				return 'unsigned';
			}
			comment(e) {
				return (
					e &&
						e.length > 255 &&
						this.client.logger.warn(
							'Your comment is longer than the max comment length for MySQL'
						),
					e && `comment '${e.replace(cre, "\\'")}'`
				);
			}
			first() {
				return 'first';
			}
			after(e) {
				return `after ${this.formatter.wrap(e)}`;
			}
			collate(e) {
				return e && `collate '${e}'`;
			}
			checkRegex(e, t) {
				return this._check(
					`${this.formatter.wrap(this.getColumnName())} REGEXP ${this.client._escapeBinding(e)}`,
					t
				);
			}
			increments(e = {primaryKey: !0}) {
				return (
					'int unsigned not null' +
					(this.tableCompiler._canBeAddPrimaryKey(e)
						? ' auto_increment primary key'
						: '')
				);
			}
			bigincrements(e = {primaryKey: !0}) {
				return (
					'bigint unsigned not null' +
					(this.tableCompiler._canBeAddPrimaryKey(e)
						? ' auto_increment primary key'
						: '')
				);
			}
		};
	Fn.prototype.bigint = 'bigint';
	Fn.prototype.mediumint = 'mediumint';
	Fn.prototype.smallint = 'smallint';
	$O.exports = Fn;
});
var LO = l(($pe, jO) => {
	var lre = qr(),
		zd = class extends lre {
			constructor(e, t) {
				super(e, t);
			}
			createOrReplace() {
				this.createQuery(this.columns, this.selectQuery, !1, !0);
			}
		};
	jO.exports = zd;
});
var DO = l((Mpe, BO) => {
	var hre = An(),
		Zd = class extends hre {
			constructor() {
				super(...arguments);
			}
			checkOption() {
				this._single.checkOption = 'default_option';
			}
			localCheckOption() {
				this._single.checkOption = 'local';
			}
			cascadedCheckOption() {
				this._single.checkOption = 'cascaded';
			}
		};
	BO.exports = Zd;
});
var Yd = l((jpe, UO) => {
	var dre = wO(),
		fre = Rt(),
		{promisify: pre} = _('util'),
		mre = kt(),
		gre = EO(),
		yre = CO(),
		bre = RO(),
		_re = IO(),
		wre = kO(),
		vre = MO(),
		{makeEscape: Ere} = Ws(),
		xre = LO(),
		Cre = DO(),
		qa = class extends mre {
			_driver() {
				return _('mysql');
			}
			queryBuilder() {
				return new yre(this);
			}
			queryCompiler(e, t) {
				return new bre(this, e, t);
			}
			schemaCompiler() {
				return new _re(this, ...arguments);
			}
			tableCompiler() {
				return new wre(this, ...arguments);
			}
			viewCompiler() {
				return new xre(this, ...arguments);
			}
			viewBuilder() {
				return new Cre(this, ...arguments);
			}
			columnCompiler() {
				return new vre(this, ...arguments);
			}
			transaction() {
				return new gre(this, ...arguments);
			}
			wrapIdentifierImpl(e) {
				return e !== '*' ? `\`${e.replace(/`/g, '``')}\`` : '*';
			}
			acquireRawConnection() {
				return new Promise((e, t) => {
					let n = this.driver.createConnection(this.connectionSettings);
					n.on('error', (i) => {
						n.__knex__disposed = i;
					}),
						n.connect((i) => {
							if (i) return n.removeAllListeners(), t(i);
							e(n);
						});
				});
			}
			async destroyRawConnection(e) {
				try {
					return await pre((n) => e.end(n))();
				} catch (t) {
					e.__knex__disposed = t;
				} finally {
					dre(() => e.removeAllListeners());
				}
			}
			validateConnection(e) {
				return e.state === 'connected' || e.state === 'authenticated';
			}
			_stream(e, t, n, i) {
				if (!t.sql) throw new Error('The query is empty');
				i = i || {};
				let s = Object.assign({sql: t.sql}, t.options);
				return new Promise((o, a) => {
					n.on('error', a), n.on('end', o);
					let u = e.query(s, t.bindings).stream(i);
					u.on('error', (c) => {
						a(c), n.emit('error', c);
					}),
						u.pipe(n);
				});
			}
			_query(e, t) {
				if (((!t || typeof t == 'string') && (t = {sql: t}), !t.sql))
					throw new Error('The query is empty');
				return new Promise(function (n, i) {
					if (!t.sql) {
						n();
						return;
					}
					let s = Object.assign({sql: t.sql}, t.options);
					e.query(s, t.bindings, function (o, a, u) {
						if (o) return i(o);
						(t.response = [a, u]), n(t);
					});
				});
			}
			processResponse(e, t) {
				if (e == null) return;
				let {response: n} = e,
					{method: i} = e,
					s = n[0],
					o = n[1];
				if (e.output) return e.output.call(t, s, o);
				switch (i) {
					case 'select':
						return s;
					case 'first':
						return s[0];
					case 'pluck':
						return fre(s, e.pluck);
					case 'insert':
						return [s.insertId];
					case 'del':
					case 'update':
					case 'counter':
						return s.affectedRows;
					default:
						return n;
				}
			}
			async cancelQuery(e) {
				let t = await this.acquireRawConnection();
				try {
					return await this._wrappedCancelQueryCall(t, e);
				} finally {
					await this.destroyRawConnection(t),
						t.__knex__disposed &&
							this.logger.warn(`Connection Error: ${t.__knex__disposed}`);
				}
			}
			_wrappedCancelQueryCall(e, t) {
				return this._query(e, {
					sql: 'KILL QUERY ?',
					bindings: [t.threadId],
					options: {},
				});
			}
		};
	Object.assign(qa.prototype, {
		dialect: 'mysql',
		driverName: 'mysql',
		_escapeBinding: Ere(),
		canCancelQuery: !0,
	});
	UO.exports = qa;
});
var QO = l((Lpe, FO) => {
	var qre = lt(),
		Tre = Pe()('knex:tx'),
		Xd = class extends qre {
			query(e, t, n, i) {
				let s = this,
					o = this.trxClient
						.query(e, t)
						.catch((a) => {
							if (a.code === 'ER_SP_DOES_NOT_EXIST') {
								this.trxClient.logger.warn(
									'Transaction was implicitly committed, do not mix transactions and DDL with MySQL (#805)'
								);
								return;
							}
							(n = 2),
								(i = a),
								(s._completed = !0),
								Tre('%s error running transaction query', s.txid);
						})
						.then(function (a) {
							if ((n === 1 && s._resolver(i), n === 2)) {
								if (i === void 0) {
									if (s.doNotRejectOnRollback && /^ROLLBACK\b/i.test(t)) {
										s._resolver();
										return;
									}
									i = new Error(`Transaction rejected with non-error: ${i}`);
								}
								return s._rejecter(i), a;
							}
						});
				return (n === 1 || n === 2) && (s._completed = !0), o;
			}
		};
	FO.exports = Xd;
});
var WO = l((Bpe, HO) => {
	var Are = Yd(),
		Sre = QO(),
		Ta = class extends Are {
			transaction() {
				return new Sre(this, ...arguments);
			}
			_driver() {
				return _('mysql2');
			}
			initializeDriver() {
				try {
					this.driver = this._driver();
				} catch (e) {
					let t = `Knex: run
$ npm install ${this.driverName}`;
					throw (
						(process.version.replace(/^v/, '').split('.')[0] <= 12 &&
							((t += '@3.2.0'),
							this.logger.error(
								'Mysql2 version 3.2.0 is the latest version to support Node.js 12 or lower.'
							)),
						(t += ' --save'),
						this.logger.error(`${t}
${e.message}
${e.stack}`),
						new Error(`${t}
${e.message}`))
					);
				}
			}
			validateConnection(e) {
				return (
					e &&
					!e._fatalError &&
					!e._protocolError &&
					!e._closing &&
					!e.stream.destroyed
				);
			}
		};
	Object.assign(Ta.prototype, {driverName: 'mysql2'});
	HO.exports = Ta;
});
var Dt = l((Dpe, GO) => {
	var ef = class {
		constructor(e) {
			this.oracleVersion = e;
			let t = e.split('.').map((n) => parseInt(n));
			t[0] > 12 || (t[0] === 12 && t[1] >= 2)
				? (this.limit = 128)
				: (this.limit = 30);
		}
		generateCombinedName(e, t, n, i) {
			let s = _('crypto');
			Array.isArray(i) || (i = i ? [i] : []);
			let o = n.replace(/\.|-/g, '_'),
				a = i.join('_'),
				u = `${o}_${a.length ? a + '_' : ''}${t}`.toLowerCase();
			return (
				u.length > this.limit &&
					(e.warn(
						`Automatically generated name "${u}" exceeds ${this.limit} character limit for Oracle Database ${this.oracleVersion}. Using base64 encoded sha1 of that name instead.`
					),
					(u = s
						.createHash('sha1')
						.update(u)
						.digest('base64')
						.replace('=', ''))),
				u
			);
		}
	};
	function Ore(r, e) {
		return `begin execute immediate '${r.replace(/'/g, "''")}'; exception when others then if sqlcode != ${e} then raise; end if; end;`;
	}
	function VO(r) {
		this.columnName = r;
	}
	VO.prototype.toString = function () {
		return `[object ReturningHelper:${this.columnName}]`;
	};
	function Rre(r) {
		return [
			'DPI-1010',
			'DPI-1080',
			'ORA-03114',
			'ORA-03113',
			'ORA-03135',
			'ORA-12514',
			'ORA-00022',
			'ORA-00028',
			'ORA-00031',
			'ORA-00045',
			'ORA-00378',
			'ORA-00602',
			'ORA-00603',
			'ORA-00609',
			'ORA-01012',
			'ORA-01041',
			'ORA-01043',
			'ORA-01089',
			'ORA-01092',
			'ORA-02396',
			'ORA-03122',
			'ORA-12153',
			'ORA-12537',
			'ORA-12547',
			'ORA-12570',
			'ORA-12583',
			'ORA-27146',
			'ORA-28511',
			'ORA-56600',
			'NJS-024',
			'NJS-003',
		].some(function (e) {
			return r.message.indexOf(e) === 0;
		});
	}
	GO.exports = {
		NameHelper: ef,
		isConnectionError: Rre,
		wrapSqlWithCatch: Ore,
		ReturningHelper: VO,
	};
});
var Aa = l((Upe, JO) => {
	var {NameHelper: Nre} = Dt(),
		tf = class {
			constructor(e) {
				this.nameHelper = new Nre(e);
			}
			renameColumnTrigger(e, t, n, i) {
				let s = this.nameHelper.generateCombinedName(e, 'autoinc_trg', t),
					o = this.nameHelper.generateCombinedName(e, 'seq', t);
				return `DECLARE PK_NAME VARCHAR(200); IS_AUTOINC NUMBER := 0; BEGIN  EXECUTE IMMEDIATE ('ALTER TABLE "${t}" RENAME COLUMN "${n}" TO "${i}"');  SELECT COUNT(*) INTO IS_AUTOINC from "USER_TRIGGERS" where trigger_name = '${s}';  IF (IS_AUTOINC > 0) THEN    SELECT cols.column_name INTO PK_NAME    FROM all_constraints cons, all_cons_columns cols    WHERE cons.constraint_type = 'P'    AND cons.constraint_name = cols.constraint_name    AND cons.owner = cols.owner    AND cols.table_name = '${t}';    IF ('${i}' = PK_NAME) THEN      EXECUTE IMMEDIATE ('DROP TRIGGER "${s}"');      EXECUTE IMMEDIATE ('create or replace trigger "${s}"      BEFORE INSERT on "${t}" for each row        declare        checking number := 1;        begin          if (:new."${i}" is null) then            while checking >= 1 loop              select "${o}".nextval into :new."${i}" from dual;              select count("${i}") into checking from "${t}"              where "${i}" = :new."${i}";            end loop;          end if;        end;');    end if;  end if;END;`;
			}
			createAutoIncrementTrigger(e, t, n) {
				let i = `"${t}"`,
					s = t,
					o = n ? `"${n}".` : '',
					a = n ? `'${n}'` : 'cols.owner',
					u = this.nameHelper.generateCombinedName(e, 'autoinc_trg', t),
					h = `"${this.nameHelper.generateCombinedName(e, 'seq', t)}"`;
				return `DECLARE PK_NAME VARCHAR(200); BEGIN  EXECUTE IMMEDIATE ('CREATE SEQUENCE ${o}${h}');  SELECT cols.column_name INTO PK_NAME  FROM all_constraints cons, all_cons_columns cols  WHERE cons.constraint_type = 'P'  AND cons.constraint_name = cols.constraint_name  AND cons.owner = ${a}  AND cols.table_name = '${s}';  execute immediate ('create or replace trigger ${o}"${u}"  BEFORE INSERT on ${o}${i}  for each row  declare  checking number := 1;  begin    if (:new."' || PK_NAME || '" is null) then      while checking >= 1 loop        select ${o}${h}.nextval into :new."' || PK_NAME || '" from dual;        select count("' || PK_NAME || '") into checking from ${o}${i}        where "' || PK_NAME || '" = :new."' || PK_NAME || '";      end loop;    end if;  end;'); END;`;
			}
			renameTableAndAutoIncrementTrigger(e, t, n) {
				let i = this.nameHelper.generateCombinedName(e, 'autoinc_trg', t),
					s = this.nameHelper.generateCombinedName(e, 'seq', t),
					o = this.nameHelper.generateCombinedName(e, 'autoinc_trg', n),
					a = this.nameHelper.generateCombinedName(e, 'seq', n);
				return `DECLARE PK_NAME VARCHAR(200); IS_AUTOINC NUMBER := 0; BEGIN  EXECUTE IMMEDIATE ('RENAME "${t}" TO "${n}"');  SELECT COUNT(*) INTO IS_AUTOINC from "USER_TRIGGERS" where trigger_name = '${i}';  IF (IS_AUTOINC > 0) THEN    EXECUTE IMMEDIATE ('DROP TRIGGER "${i}"');    EXECUTE IMMEDIATE ('RENAME "${s}" TO "${a}"');    SELECT cols.column_name INTO PK_NAME    FROM all_constraints cons, all_cons_columns cols    WHERE cons.constraint_type = 'P'    AND cons.constraint_name = cols.constraint_name    AND cons.owner = cols.owner    AND cols.table_name = '${n}';    EXECUTE IMMEDIATE ('create or replace trigger "${o}"    BEFORE INSERT on "${n}" for each row      declare      checking number := 1;      begin        if (:new."' || PK_NAME || '" is null) then          while checking >= 1 loop            select "${a}".nextval into :new."' || PK_NAME || '" from dual;            select count("' || PK_NAME || '") into checking from "${n}"            where "' || PK_NAME || '" = :new."' || PK_NAME || '";          end loop;        end if;      end;');  end if;END;`;
			}
		};
	JO.exports = tf;
});
var zO = l((Fpe, KO) => {
	var Ire = Er(),
		rf = Dt(),
		Pre = Aa(),
		nf = class extends Ire {
			constructor() {
				super(...arguments);
			}
			renameTable(e, t) {
				let i = new Pre(this.client.version).renameTableAndAutoIncrementTrigger(
					this.client.logger,
					e,
					t
				);
				this.pushQuery(i);
			}
			hasTable(e) {
				this.pushQuery({
					sql:
						'select TABLE_NAME from USER_TABLES where TABLE_NAME = ' +
						this.client.parameter(e, this.builder, this.bindingsHolder),
					output(t) {
						return t.length > 0;
					},
				});
			}
			hasColumn(e, t) {
				let n = `select COLUMN_NAME from ALL_TAB_COLUMNS where TABLE_NAME = ${this.client.parameter(e, this.builder, this.bindingsHolder)} and COLUMN_NAME = ${this.client.parameter(t, this.builder, this.bindingsHolder)}`;
				this.pushQuery({sql: n, output: (i) => i.length > 0});
			}
			dropSequenceIfExists(e) {
				let t = this.schema ? `"${this.schema}".` : '';
				this.pushQuery(
					rf.wrapSqlWithCatch(
						`drop sequence ${t}${this.formatter.wrap(e)}`,
						-2289
					)
				);
			}
			_dropRelatedSequenceIfExists(e) {
				let n = new rf.NameHelper(this.client.version).generateCombinedName(
					this.client.logger,
					'seq',
					e
				);
				this.dropSequenceIfExists(n);
			}
			dropTable(e) {
				let t = this.schema ? `"${this.schema}".` : '';
				this.pushQuery(`drop table ${t}${this.formatter.wrap(e)}`),
					this._dropRelatedSequenceIfExists(e);
			}
			dropTableIfExists(e) {
				this.dropObject(e, 'table');
			}
			dropViewIfExists(e) {
				this.dropObject(e, 'view');
			}
			dropObject(e, t) {
				let n = this.schema ? `"${this.schema}".` : '',
					i = -942;
				t === 'materialized view' && (i = -12003),
					this.pushQuery(
						rf.wrapSqlWithCatch(`drop ${t} ${n}${this.formatter.wrap(e)}`, i)
					),
					this._dropRelatedSequenceIfExists(e);
			}
			refreshMaterializedView(e) {
				return this.pushQuery({
					sql: `BEGIN DBMS_MVIEW.REFRESH('${this.schemaNameRaw ? this.schemaNameRaw + '.' : ''}${e}'); END;`,
				});
			}
			dropMaterializedView(e) {
				this._dropView(e, !1, !0);
			}
			dropMaterializedViewIfExists(e) {
				this.dropObject(e, 'materialized view');
			}
		};
	KO.exports = nf;
});
var YO = l((Qpe, ZO) => {
	var kre = Ki(),
		$re = _n(),
		sf = class extends kre {
			constructor() {
				super(...arguments);
			}
			checkIn() {
				return (this._modifiers.checkIn = $re(arguments)), this;
			}
		};
	ZO.exports = sf;
});
var eR = l((Hpe, XO) => {
	function Mre() {}
	XO.exports = Mre;
});
var rR = l((Wpe, tR) => {
	var of = gc(),
		jre = eR(),
		Lre = Ni(),
		Bre = 1 / 0,
		Dre =
			of && 1 / Lre(new of([, -0]))[1] == Bre
				? function (r) {
						return new of(r);
					}
				: jre;
	tR.exports = Dre;
});
var iR = l((Vpe, nR) => {
	var Ure = co(),
		Fre = Lc(),
		Qre = Bc(),
		Hre = ho(),
		Wre = rR(),
		Vre = Ni(),
		Gre = 200;
	function Jre(r, e, t) {
		var n = -1,
			i = Fre,
			s = r.length,
			o = !0,
			a = [],
			u = a;
		if (t) (o = !1), (i = Qre);
		else if (s >= Gre) {
			var c = e ? null : Wre(r);
			if (c) return Vre(c);
			(o = !1), (i = Hre), (u = new Ure());
		} else u = e ? [] : a;
		e: for (; ++n < s; ) {
			var h = r[n],
				d = e ? e(h) : h;
			if (((h = t || h !== 0 ? h : 0), o && d === d)) {
				for (var f = u.length; f--; ) if (u[f] === d) continue e;
				e && u.push(d), a.push(h);
			} else i(u, d, t) || (u !== a && u.push(d), a.push(h));
		}
		return a;
	}
	nR.exports = Jre;
});
var oR = l((Gpe, sR) => {
	var Kre = iR();
	function zre(r) {
		return r && r.length ? Kre(r) : [];
	}
	sR.exports = zre;
});
var uR = l((Jpe, aR) => {
	var Zre = Aa();
	function Yre(r) {
		let e = new Zre(r.client.version);
		r.pushAdditional(function () {
			let t = this.tableCompiler.tableNameRaw,
				n = this.tableCompiler.schemaNameRaw,
				i = e.createAutoIncrementTrigger(this.client.logger, t, n);
			this.pushQuery(i);
		});
	}
	aR.exports = {createAutoIncrementTriggerAndSequence: Yre};
});
var af = l((Kpe, lR) => {
	var Xre = oR(),
		ene = vr(),
		tne = Pt(),
		{createAutoIncrementTriggerAndSequence: cR} = uR(),
		{toNumber: kr} = re(),
		Qe = class extends tne {
			constructor() {
				super(...arguments),
					(this.modifiers = ['defaultTo', 'checkIn', 'nullable', 'comment']);
			}
			increments(e = {primaryKey: !0}) {
				return (
					cR(this),
					'integer not null' +
						(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '')
				);
			}
			bigincrements(e = {primaryKey: !0}) {
				return (
					cR(this),
					'number(20, 0) not null' +
						(this.tableCompiler._canBeAddPrimaryKey(e) ? ' primary key' : '')
				);
			}
			floating(e) {
				let t = kr(e, 0);
				return `float${t ? `(${t})` : ''}`;
			}
			double(e, t) {
				return `number(${kr(e, 8)}, ${kr(t, 2)})`;
			}
			decimal(e, t) {
				return e === null ? 'decimal' : `decimal(${kr(e, 8)}, ${kr(t, 2)})`;
			}
			integer(e) {
				return e ? `number(${kr(e, 11)})` : 'integer';
			}
			enu(e) {
				e = Xre(e);
				let t = (e || []).reduce((n, i) => Math.max(n, String(i).length), 1);
				return (this.columnBuilder._modifiers.checkIn = [e]), `varchar2(${t})`;
			}
			datetime(e) {
				return e ? 'timestamp' : 'timestamp with time zone';
			}
			timestamp(e) {
				return e ? 'timestamp' : 'timestamp with time zone';
			}
			bool() {
				return (
					(this.columnBuilder._modifiers.checkIn = [[0, 1]]), 'number(1, 0)'
				);
			}
			varchar(e) {
				return `varchar2(${kr(e, 255)})`;
			}
			comment(e) {
				let t = this.args[0] || this.defaults('columnName');
				this.pushAdditional(function () {
					this.pushQuery(
						`comment on column ${this.tableCompiler.tableName()}.` +
							this.formatter.wrap(t) +
							" is '" +
							(e || '') +
							"'"
					);
				}, e);
			}
			checkIn(e) {
				return e === void 0
					? ''
					: (e instanceof ene
							? (e = e.toQuery())
							: Array.isArray(e)
								? (e = e.map((t) => `'${t}'`).join(', '))
								: (e = `'${e}'`),
						`check (${this.formatter.wrap(this.args[0])} in (${e}))`);
			}
		};
	Qe.prototype.tinyint = 'smallint';
	Qe.prototype.smallint = 'smallint';
	Qe.prototype.mediumint = 'integer';
	Qe.prototype.biginteger = 'number(20, 0)';
	Qe.prototype.text = 'clob';
	Qe.prototype.time = 'timestamp with time zone';
	Qe.prototype.bit = 'clob';
	Qe.prototype.json = 'clob';
	lR.exports = Qe;
});
var uf = l((zpe, fR) => {
	var hR = Dt(),
		rne = xr(),
		nne = re(),
		ine = Aa(),
		{isObject: dR} = U(),
		hs = class extends rne {
			constructor() {
				super(...arguments);
			}
			addColumns(e, t) {
				if (e.sql.length > 0) {
					t = t || this.addColumnsPrefix;
					let n = e.sql,
						s = `${this.lowerCase ? 'alter table ' : 'ALTER TABLE '}${this.tableName()} ${t}`;
					e.sql.length > 1 ? (s += `(${n.join(', ')})`) : (s += n.join(', ')),
						this.pushQuery({sql: s, bindings: e.bindings});
				}
			}
			renameColumn(e, t) {
				let n = this.tableName().slice(1, -1),
					i = new ine(this.client.version);
				return this.pushQuery(
					i.renameColumnTrigger(this.client.logger, n, e, t)
				);
			}
			compileAdd(e) {
				let t = this.formatter.wrap(e),
					n = this.prefixArray('add column', this.getColumns(e));
				return this.pushQuery({sql: `alter table ${t} ${n.join(', ')}`});
			}
			createQuery(e, t, n) {
				let i =
						n && this.tableNameLike()
							? ' as (select * from ' + this.tableNameLike() + ' where 0=1)'
							: ' (' + e.sql.join(', ') + this._addChecks() + ')',
					s = `create table ${this.tableName()}${i}`;
				this.pushQuery({
					sql: t ? hR.wrapSqlWithCatch(s, -955) : s,
					bindings: e.bindings,
				}),
					this.single.comment && this.comment(this.single.comment),
					n && this.addColumns(e, this.addColumnsPrefix);
			}
			comment(e) {
				this.pushQuery(`comment on table ${this.tableName()} is '${e}'`);
			}
			dropColumn() {
				let e = nne.normalizeArr.apply(null, arguments);
				this.pushQuery(
					`alter table ${this.tableName()} drop (${this.formatter.columnize(e)})`
				);
			}
			_indexCommand(e, t, n) {
				let i = new hR.NameHelper(this.client.version);
				return this.formatter.wrap(
					i.generateCombinedName(this.client.logger, e, t, n)
				);
			}
			primary(e, t) {
				let n;
				dR(t) && ({constraintName: t, deferrable: n} = t),
					(n = n ? ` deferrable initially ${n}` : ''),
					(t = t
						? this.formatter.wrap(t)
						: this.formatter.wrap(`${this.tableNameRaw}_pkey`));
				let i = e,
					s = [];
				this.grouped.columns &&
					((s = this._getIncrementsColumnNames()),
					s &&
						s.forEach((o) => {
							i.includes(o) || i.unshift(o);
						})),
					this.pushQuery(
						`alter table ${this.tableName()} add constraint ${t} primary key (${this.formatter.columnize(i)})${n}`
					);
			}
			dropPrimary(e) {
				(e = e
					? this.formatter.wrap(e)
					: this.formatter.wrap(this.tableNameRaw + '_pkey')),
					this.pushQuery(
						`alter table ${this.tableName()} drop constraint ${e}`
					);
			}
			index(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e)),
					this.pushQuery(
						`create index ${t} on ${this.tableName()} (` +
							this.formatter.columnize(e) +
							')'
					);
			}
			dropIndex(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('index', this.tableNameRaw, e)),
					this.pushQuery(`drop index ${t}`);
			}
			unique(e, t) {
				let n;
				dR(t) && ({indexName: t, deferrable: n} = t),
					(n = n ? ` deferrable initially ${n}` : ''),
					(t = t
						? this.formatter.wrap(t)
						: this._indexCommand('unique', this.tableNameRaw, e)),
					this.pushQuery(
						`alter table ${this.tableName()} add constraint ${t} unique (` +
							this.formatter.columnize(e) +
							')' +
							n
					);
			}
			dropUnique(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('unique', this.tableNameRaw, e)),
					this.pushQuery(
						`alter table ${this.tableName()} drop constraint ${t}`
					);
			}
			dropForeign(e, t) {
				(t = t
					? this.formatter.wrap(t)
					: this._indexCommand('foreign', this.tableNameRaw, e)),
					this.pushQuery(
						`alter table ${this.tableName()} drop constraint ${t}`
					);
			}
		};
	hs.prototype.addColumnsPrefix = 'add ';
	hs.prototype.alterColumnsPrefix = 'modify ';
	fR.exports = hs;
});
var cf = l((Zpe, pR) => {
	var {ReturningHelper: sne} = Dt(),
		{isConnectionError: one} = Dt(),
		ane = kt(),
		une = zO(),
		cne = YO(),
		lne = af(),
		hne = uf(),
		Sa = class extends ane {
			schemaCompiler() {
				return new une(this, ...arguments);
			}
			columnBuilder() {
				return new cne(this, ...arguments);
			}
			columnCompiler() {
				return new lne(this, ...arguments);
			}
			tableCompiler() {
				return new hne(this, ...arguments);
			}
			database() {
				return this.connectionSettings.database;
			}
			positionBindings(e) {
				let t = 0;
				return e.replace(/\?/g, function () {
					return (t += 1), `:${t}`;
				});
			}
			_stream(e, t, n, i) {
				if (!t.sql) throw new Error('The query is empty');
				return new Promise(function (s, o) {
					n.on('error', (u) => {
						one(u) && (e.__knex__disposed = u), o(u);
					}),
						n.on('end', s);
					let a = e.queryStream(t.sql, t.bindings, i);
					a.pipe(n),
						a.on('error', function (u) {
							o(u), n.emit('error', u);
						});
				});
			}
			alias(e, t) {
				return e + ' ' + t;
			}
			parameter(e, t, n) {
				return (
					e instanceof sne && this.driver
						? (e = new this.driver.OutParam(this.driver.OCCISTRING))
						: typeof e == 'boolean' && (e = e ? 1 : 0),
					super.parameter(e, t, n)
				);
			}
		};
	Object.assign(Sa.prototype, {dialect: 'oracle', driverName: 'oracle'});
	pR.exports = Sa;
});
var bR = l((Ype, yR) => {
	var dne = Do(),
		fne = ge(),
		mR = we(),
		pne = ze(),
		mne = En(),
		gne = It(),
		{ReturningHelper: gR} = Dt(),
		{isString: yne} = U(),
		bne = [
			'comments',
			'columns',
			'join',
			'where',
			'union',
			'group',
			'having',
			'order',
			'lock',
		],
		lf = class extends gne {
			constructor(e, t, n) {
				super(e, t, n);
				let {onConflict: i} = this.single;
				if (i) throw new Error('.onConflict() is not supported for oracledb.');
				this.first = this.select;
			}
			insert() {
				let e = this.single.insert || [],
					{returning: t} = this.single;
				if (
					(!Array.isArray(e) &&
						pne(this.single.insert) &&
						(e = [this.single.insert]),
					t && !Array.isArray(t) && (t = [t]),
					Array.isArray(e) && e.length === 1 && mR(e[0]))
				)
					return this._addReturningToSqlAndConvert(
						`insert into ${this.tableName} (${this.formatter.wrap(this.single.returning)}) values (default)`,
						t,
						this.tableName
					);
				if (mR(this.single.insert) && typeof this.single.insert != 'function')
					return '';
				let n = this._prepInsert(e),
					i = {};
				if (yne(n))
					return this._addReturningToSqlAndConvert(
						`insert into ${this.tableName} ${n}`,
						t
					);
				if (n.values.length === 1)
					return this._addReturningToSqlAndConvert(
						`insert into ${this.tableName} (${this.formatter.columnize(n.columns)}) values (${this.client.parameterize(n.values[0], void 0, this.builder, this.bindingsHolder)})`,
						t,
						this.tableName
					);
				let s = n.columns.length === 0;
				return (
					(i.sql =
						'begin ' +
						n.values
							.map((o) => {
								let a,
									u = s
										? ''
										: this.client.parameterize(
												o,
												this.client.valueForUndefined,
												this.builder,
												this.bindingsHolder
											),
									c = Array.isArray(t) ? t : [t],
									h = `insert into ${this.tableName} `;
								t &&
									((a = new gR(c.join(':'))),
									(i.outParams = (i.outParams || []).concat(a))),
									s
										? (h += `(${this.formatter.wrap(this.single.returning)}) values (default)`)
										: (h += `(${this.formatter.columnize(n.columns)}) values (${u})`),
									(h += t
										? ` returning ROWID into ${this.client.parameter(a, this.builder, this.bindingsHolder)}`
										: ''),
									(h = this.formatter.client.positionBindings(h));
								let d = u.replace('DEFAULT, ', '').replace(', DEFAULT', '');
								return (
									`execute immediate '${h.replace(/'/g, "''")}` +
									(d || t ? "' using " : '') +
									d +
									(d && t ? ', ' : '') +
									(t ? 'out ?' : '') +
									';'
								);
							})
							.join(' ') +
						'end;'),
					t &&
						((i.returning = t),
						(i.returningSql =
							`select ${this.formatter.columnize(t)} from ` +
							this.tableName +
							' where ROWID in (' +
							i.outParams.map((o, a) => `:${a + 1}`).join(', ') +
							') order by case ROWID ' +
							i.outParams
								.map((o, a) => `when CHARTOROWID(:${a + 1}) then ${a}`)
								.join(' ') +
							' end')),
					i
				);
			}
			update() {
				let e = this._prepUpdate(this.single.update),
					t = this.where(),
					{returning: n} = this.single,
					i =
						`update ${this.tableName} set ` + e.join(', ') + (t ? ` ${t}` : '');
				return n
					? (Array.isArray(n) || (n = [n]),
						this._addReturningToSqlAndConvert(i, n, this.tableName))
					: i;
			}
			truncate() {
				return `truncate table ${this.tableName}`;
			}
			forUpdate() {
				return 'for update';
			}
			forShare() {
				return (
					this.client.logger.warn(
						'lock for share is not supported by oracle dialect'
					),
					''
				);
			}
			columnInfo() {
				let e = this.single.columnInfo;
				return {
					sql: `select * from xmltable( '/ROWSET/ROW'
      passing dbms_xmlgen.getXMLType('
      select char_col_decl_length, column_name, data_type, data_default, nullable
      from all_tab_columns where table_name = ''${this.client.customWrapIdentifier(this.single.table, fne)}'' ')
      columns
      CHAR_COL_DECL_LENGTH number, COLUMN_NAME varchar2(200), DATA_TYPE varchar2(106),
      DATA_DEFAULT clob, NULLABLE varchar2(1))`,
					output(i) {
						let s = mne(
							i,
							function (o, a) {
								return (
									(o[a.COLUMN_NAME] = {
										type: a.DATA_TYPE,
										defaultValue: a.DATA_DEFAULT,
										maxLength: a.CHAR_COL_DECL_LENGTH,
										nullable: a.NULLABLE === 'Y',
									}),
									o
								);
							},
							{}
						);
						return (e && s[e]) || s;
					},
				};
			}
			select() {
				let e = this.with(),
					t = bne.map((n) => this[n]());
				return (
					(e += dne(t).join(' ')), this._surroundQueryWithLimitAndOffset(e)
				);
			}
			aggregate(e) {
				return this._aggregate(e, {aliasSeparator: ' '});
			}
			_addReturningToSqlAndConvert(e, t, n) {
				let i = {sql: e};
				if (!t) return i;
				let s = Array.isArray(t) ? t : [t],
					o = new gR(s.join(':'));
				return (
					(i.sql =
						e +
						' returning ROWID into ' +
						this.client.parameter(o, this.builder, this.bindingsHolder)),
					(i.returningSql = `select ${this.formatter.columnize(t)} from ${n} where ROWID = :1`),
					(i.outParams = [o]),
					(i.returning = t),
					i
				);
			}
			_surroundQueryWithLimitAndOffset(e) {
				let {limit: t} = this.single,
					{offset: n} = this.single,
					i = t || t === 0 || t === '0';
				if (((t = +t), !i && !n)) return e;
				if (((e = e || ''), i && !n))
					return `select * from (${e}) where rownum <= ${this._getValueOrParameterFromAttribute('limit', t)}`;
				let s = +n + (i ? t : 1e13);
				return (
					'select * from (select row_.*, ROWNUM rownum_ from (' +
					e +
					') row_ where rownum <= ' +
					(this.single.skipBinding.offset
						? s
						: this.client.parameter(s, this.builder, this.bindingsHolder)) +
					') where rownum_ > ' +
					this._getValueOrParameterFromAttribute('offset', n)
				);
			}
		};
	yR.exports = lf;
});
var Oa = l((Xpe, vR) => {
	var Qn = Dt(),
		{promisify: _R} = _('util'),
		_ne = _('stream');
	function wR(r, e) {
		(this.columnName = r), (this.value = e), (this.returning = !1);
	}
	wR.prototype.toString = function () {
		return '[object BlobHelper:' + this.columnName + ']';
	};
	function wne(r, e) {
		return new Promise((t, n) => {
			let i = e === 'string' ? '' : Buffer.alloc(0);
			r.on('error', function (s) {
				n(s);
			}),
				r.on('data', function (s) {
					e === 'string' ? (i += s) : (i = Buffer.concat([i, s]));
				}),
				r.on('end', function () {
					t(i);
				});
		});
	}
	var vne = function (r) {
		let e = _('oracledb'),
			t;
		if (r.type)
			r.type === e.BLOB ? (t = 'buffer') : r.type === e.CLOB && (t = 'string');
		else if (r.iLob)
			r.iLob.type === e.CLOB
				? (t = 'string')
				: r.iLob.type === e.BLOB && (t = 'buffer');
		else throw new Error('Unrecognized oracledb lob stream type');
		return t === 'string' && r.setEncoding('utf-8'), wne(r, t);
	};
	function Ene(r, e) {
		if (r.executeAsync) return;
		(r.commitAsync = function () {
			return new Promise((n, i) => {
				this.commit(function (s) {
					if (s) return i(s);
					n();
				});
			});
		}),
			(r.rollbackAsync = function () {
				return new Promise((n, i) => {
					this.rollback(function (s) {
						if (s) return i(s);
						n();
					});
				});
			});
		let t = _R(function (n, i, s, o) {
			if (
				((s = s || {}),
				(s.outFormat = e.driver.OUT_FORMAT_OBJECT || e.driver.OBJECT),
				!s.outFormat)
			)
				throw new Error('not found oracledb.outFormat constants');
			s.resultSet
				? r.execute(n, i || [], s, function (a, u) {
						if (a)
							return (
								Qn.isConnectionError(a) &&
									(r.close().catch(function (f) {}), (r.__knex__disposed = a)),
								o(a)
							);
						let c = {rows: [], resultSet: u.resultSet},
							h = 100,
							d = function (f, m, g) {
								m.getRows(g, function (y, E) {
									if (y)
										Qn.isConnectionError(y) &&
											(f.close().catch(function (N) {}),
											(f.__knex__disposed = y)),
											m.close(function () {
												return o(y);
											});
									else {
										if (E.length === 0) return o(null, c);
										if (E.length > 0)
											if (E.length === g)
												(c.rows = c.rows.concat(E)), d(f, m, g);
											else return (c.rows = c.rows.concat(E)), o(null, c);
									}
								});
							};
						d(r, u.resultSet, h);
					})
				: r.execute(n, i || [], s, function (a, u) {
						return a
							? (Qn.isConnectionError(a) &&
									(r.close().catch(function (c) {}), (r.__knex__disposed = a)),
								o(a))
							: o(null, u);
					});
		});
		r.executeAsync = function (n, i, s) {
			return t(n, i, s).then(async (o) => {
				let a = () =>
						o.resultSet
							? _R(o.resultSet.close).call(o.resultSet)
							: Promise.resolve(),
					u = [];
				if (o.rows && Array.isArray(o.rows))
					for (let c = 0; c < o.rows.length; c++) {
						let h = o.rows[c];
						for (let d in h)
							h[d] instanceof _ne.Readable &&
								u.push({index: c, key: d, stream: h[d]});
					}
				try {
					for (let c of u) o.rows[c.index][c.key] = await vne(c.stream);
				} catch (c) {
					throw (await a().catch(() => {}), c);
				}
				return await a(), o;
			});
		};
	}
	Qn.BlobHelper = wR;
	Qn.monkeyPatchConnection = Ene;
	vR.exports = Qn;
});
var xR = l((eme, ER) => {
	var xne = No(),
		hf = bn(),
		Ra = we(),
		Cne = ze(),
		qne = bR(),
		df = Oa().ReturningHelper,
		ds = Oa().BlobHelper,
		{isString: Tne} = U(),
		{columnize: ff} = ne(),
		pf = class extends qne {
			insert() {
				let e = this,
					t = this._prepOutbindings(this.single.insert, this.single.returning),
					n = t.outBinding,
					i = t.returning,
					s = t.values;
				if (Array.isArray(s) && s.length === 1 && Ra(s[0])) {
					let c = this.single.returning
						? ' (' + this.formatter.wrap(this.single.returning) + ')'
						: '';
					return this._addReturningToSqlAndConvert(
						'insert into ' + this.tableName + c + ' values (default)',
						n[0],
						this.tableName,
						i
					);
				}
				if (Ra(this.single.insert) && typeof this.single.insert != 'function')
					return '';
				let o = this._prepInsert(s),
					a = {};
				if (Tne(o))
					return this._addReturningToSqlAndConvert(
						'insert into ' + this.tableName + ' ' + o,
						n[0],
						this.tableName,
						i
					);
				if (o.values.length === 1)
					return this._addReturningToSqlAndConvert(
						'insert into ' +
							this.tableName +
							' (' +
							this.formatter.columnize(o.columns) +
							') values (' +
							this.client.parameterize(
								o.values[0],
								void 0,
								this.builder,
								this.bindingsHolder
							) +
							')',
						n[0],
						this.tableName,
						i
					);
				let u = o.columns.length === 0;
				return (
					(a.returning = i),
					(a.sql =
						'begin ' +
						o.values
							.map(function (c, h) {
								let d = u
										? ''
										: e.client.parameterize(
												c,
												e.client.valueForUndefined,
												e.builder,
												e.bindingsHolder
											),
									f = 'insert into ' + e.tableName;
								u
									? (f +=
											' (' +
											e.formatter.wrap(e.single.returning) +
											') values (default)')
									: (f +=
											' (' +
											e.formatter.columnize(o.columns) +
											') values (' +
											d +
											')');
								let m = '',
									g = '',
									y = '',
									E = '';
								hf(c, function (j) {
									j instanceof ds || (y += ' ?,');
								}),
									(y = y.slice(0, -1)),
									n[h].forEach(function (j) {
										let ae = j.columnName || j;
										if (
											((m += e.formatter.wrap(ae) + ','),
											(g += ' ?,'),
											(E += ' out ?,'),
											j instanceof ds)
										)
											return e.formatter.bindings.push(j);
										e.formatter.bindings.push(new df(ae));
									}),
									(m = m.slice(0, -1)),
									(g = g.slice(0, -1)),
									(E = E.slice(0, -1)),
									m && g && (f += ' returning ' + m + ' into' + g),
									(f = e.formatter.client.positionBindings(f));
								let N = d
									.replace(/DEFAULT, /g, '')
									.replace(/, DEFAULT/g, '')
									.replace('EMPTY_BLOB(), ', '')
									.replace(', EMPTY_BLOB()', '');
								return (
									"execute immediate '" +
									f.replace(/'/g, "''") +
									(N || c ? "' using " : '') +
									N +
									(N && E ? ',' : '') +
									E +
									';'
								);
							})
							.join(' ') +
						'end;'),
					(a.outBinding = n),
					i[0] === '*' &&
						(a.returningSql = function () {
							return (
								'select * from ' +
								e.tableName +
								' where ROWID in (' +
								this.outBinding
									.map(function (c, h) {
										return ':' + (h + 1);
									})
									.join(', ') +
								') order by case ROWID ' +
								this.outBinding
									.map(function (c, h) {
										return 'when CHARTOROWID(:' + (h + 1) + ') then ' + h;
									})
									.join(' ') +
								' end'
							);
						}),
					a
				);
			}
			with() {
				let e = [];
				if (this.grouped.with)
					for (let n of this.grouped.with)
						n.recursive && (e.push(n), (n.recursive = !1));
				let t = super.with();
				for (let n of e) n.recursive = !0;
				return t;
			}
			_addReturningToSqlAndConvert(e, t, n, i) {
				let s = this,
					o = {sql: e};
				if (!t) return o;
				let a = Array.isArray(t) ? t : [t],
					u = '',
					c = '';
				return (
					a.forEach(function (h) {
						let d = h.columnName || h;
						if (
							((u += s.formatter.wrap(d) + ','), (c += '?,'), h instanceof ds)
						)
							return s.formatter.bindings.push(h);
						s.formatter.bindings.push(new df(d));
					}),
					(o.sql = e),
					(u = u.slice(0, -1)),
					(c = c.slice(0, -1)),
					u && c && (o.sql += ' returning ' + u + ' into ' + c),
					(o.outBinding = [t]),
					i[0] === '*' &&
						(o.returningSql = function () {
							return 'select * from ' + s.tableName + ' where ROWID = :1';
						}),
					(o.returning = i),
					o
				);
			}
			_prepOutbindings(e, t) {
				let n = {},
					i = e || [],
					s = t || [];
				!Array.isArray(i) && Cne(e) && (i = [i]),
					s && !Array.isArray(s) && (s = [s]);
				let o = [];
				return (
					hf(i, function (a, u) {
						s[0] === '*' ? (o[u] = ['ROWID']) : (o[u] = xne(s)),
							hf(a, function (c, h) {
								if (c instanceof Buffer) {
									a[h] = new ds(h, c);
									let d = o[u].indexOf(h);
									d >= 0 && (o[u].splice(d, 1), (a[h].returning = !0)),
										o[u].push(a[h]);
								}
								c === void 0 && delete i[u][h];
							});
					}),
					(n.returning = s),
					(n.outBinding = o),
					(n.values = i),
					n
				);
			}
			_groupOrder(e, t) {
				return super._groupOrderNulls(e, t);
			}
			update() {
				let e = this,
					t = {},
					n = this._prepOutbindings(
						this.single.update || this.single.counter,
						this.single.returning
					),
					i = n.outBinding,
					s = n.returning,
					o = this._prepUpdate(this.single.update),
					a = this.where(),
					u = '',
					c = '';
				return Ra(o) && typeof this.single.update != 'function'
					? ''
					: (i.forEach(function (h) {
							h.forEach(function (d) {
								let f = d.columnName || d;
								if (
									((u += e.formatter.wrap(f) + ','),
									(c += ' ?,'),
									d instanceof ds)
								)
									return e.formatter.bindings.push(d);
								e.formatter.bindings.push(new df(f));
							});
						}),
						(u = u.slice(0, -1)),
						(c = c.slice(0, -1)),
						(t.outBinding = i),
						(t.returning = s),
						(t.sql =
							'update ' +
							this.tableName +
							' set ' +
							o.join(', ') +
							(a ? ' ' + a : '')),
						i.length && !Ra(i[0]) && (t.sql += ' returning ' + u + ' into' + c),
						s[0] === '*' &&
							(t.returningSql = function () {
								let h = 'select * from ' + e.tableName,
									d = this.rowsAffected.length || this.rowsAffected,
									f = ' where ROWID in (',
									m = ') order by case ROWID ';
								for (let g = 0; g < d; g++)
									this.returning[0] === '*' &&
										((f += ':' + (g + 1) + ', '),
										(m +=
											'when CHARTOROWID(:' + (g + 1) + ') then ' + g + ' '));
								return (
									this.returning[0] === '*' &&
										((this.returning = this.returning.slice(0, -1)),
										(f = f.slice(0, -2)),
										(m = m.slice(0, -1))),
									(h += f + m + ' end')
								);
							}),
						t);
			}
			_jsonPathWrap(e) {
				return `'${e.path || e[1]}'`;
			}
			jsonExtract(e) {
				return this._jsonExtract(
					e.singleValue ? 'json_value' : 'json_query',
					e
				);
			}
			jsonSet(e) {
				return `json_transform(${ff(e.column, this.builder, this.client, this.bindingsHolder)}, set ${this.client.parameter(e.path, this.builder, this.bindingsHolder)} = ${this.client.parameter(e.value, this.builder, this.bindingsHolder)})`;
			}
			jsonInsert(e) {
				return `json_transform(${ff(e.column, this.builder, this.client, this.bindingsHolder)}, insert ${this.client.parameter(e.path, this.builder, this.bindingsHolder)} = ${this.client.parameter(e.value, this.builder, this.bindingsHolder)})`;
			}
			jsonRemove(e) {
				let t = `json_transform(${ff(e.column, this.builder, this.client, this.bindingsHolder)}, remove ${this.client.parameter(e.path, this.builder, this.bindingsHolder)})`;
				return e.alias ? this.client.alias(t, this.formatter.wrap(e.alias)) : t;
			}
			whereJsonPath(e) {
				return this._whereJsonPath('json_value', e);
			}
			whereJsonSupersetOf(e) {
				throw new Error(
					'Json superset where clause not actually supported by Oracle'
				);
			}
			whereJsonSubsetOf(e) {
				throw new Error(
					'Json subset where clause not actually supported by Oracle'
				);
			}
			onJsonPathEquals(e) {
				return this._onJsonPathEquals('json_value', e);
			}
		};
	ER.exports = pf;
});
var qR = l((tme, CR) => {
	var Ane = uf(),
		mf = class extends Ane {
			constructor(e, t) {
				super(e, t);
			}
			_setNullableState(e, t) {
				let n = t ? 'NULL' : 'NOT NULL',
					i = `alter table ${this.tableName()} modify (${this.formatter.wrap(e)} ${n})`;
				return this.pushQuery({sql: i});
			}
		};
	CR.exports = mf;
});
var SR = l((rme, AR) => {
	var Sne = af(),
		{isObject: TR} = U(),
		fs = class extends Sne {
			constructor() {
				super(...arguments),
					(this.modifiers = ['defaultTo', 'nullable', 'comment', 'checkJson']),
					this._addCheckModifiers();
			}
			datetime(e) {
				let t;
				return (
					TR(e) ? ({useTz: t} = e) : (t = !e),
					t ? 'timestamp with local time zone' : 'timestamp'
				);
			}
			timestamp(e) {
				let t;
				return (
					TR(e) ? ({useTz: t} = e) : (t = !e),
					t ? 'timestamp with local time zone' : 'timestamp'
				);
			}
			checkRegex(e, t) {
				return this._check(
					`REGEXP_LIKE(${this.formatter.wrap(this.getColumnName())},${this.client._escapeBinding(e)})`,
					t
				);
			}
			json() {
				return (
					(this.columnBuilder._modifiers.checkJson = [
						this.formatter.columnize(this.getColumnName()),
					]),
					'varchar2(4000)'
				);
			}
			jsonb() {
				return this.json();
			}
			checkJson(e) {
				return `check (${e} is json)`;
			}
		};
	fs.prototype.time = 'timestamp with local time zone';
	fs.prototype.uuid = ({useBinaryUuid: r = !1} = {}) =>
		r ? 'raw(16)' : 'char(36)';
	AR.exports = fs;
});
var RR = l((nme, OR) => {
	var One = qr(),
		gf = class extends One {
			constructor(e, t) {
				super(e, t);
			}
			createOrReplace() {
				this.createQuery(this.columns, this.selectQuery, !1, !0);
			}
			createMaterializedView() {
				this.createQuery(this.columns, this.selectQuery, !0);
			}
		};
	OR.exports = gf;
});
var IR = l((ime, NR) => {
	var Rne = An(),
		yf = class extends Rne {
			constructor() {
				super(...arguments);
			}
			checkOption() {
				this._single.checkOption = 'default_option';
			}
		};
	NR.exports = yf;
});
var kR = l((ome, PR) => {
	var Nne = lt(),
		{timeout: Ine, KnexTimeoutError: Pne} = yr(),
		bf = Pe()('knex:tx'),
		kne = ['read committed', 'serializable'],
		$ne = !1;
	PR.exports = class extends Nne {
		begin(e) {
			if (this.isolationLevel)
				if ($ne)
					if (!kne.includes(this.isolationLevel))
						this.client.logger.warn(
							'Oracle only supports read committed and serializable transactions, ignoring the isolation level param'
						);
					else return this.query(e, `SET TRANSACTION ${this.isolationLevel}`);
				else
					this.client.logger.warn(
						'Transaction isolation is not currently supported for Oracle'
					);
			return Promise.resolve();
		}
		async commit(e, t) {
			this._completed = !0;
			try {
				await e.commitAsync(), this._resolver(t);
			} catch (n) {
				this._rejecter(n);
			}
		}
		release(e, t) {
			return this._resolver(t);
		}
		rollback(e, t) {
			return (
				(this._completed = !0),
				bf('%s: rolling back', this.txid),
				Ine(e.rollbackAsync(), 5e3)
					.catch((n) => {
						if (!(n instanceof Pne)) return Promise.reject(n);
						this._rejecter(n);
					})
					.then(() => {
						if (t === void 0) {
							if (this.doNotRejectOnRollback) {
								this._resolver();
								return;
							}
							t = new Error(`Transaction rejected with non-error: ${t}`);
						}
						this._rejecter(t);
					})
			);
		}
		savepoint(e) {
			return this.query(e, `SAVEPOINT ${this.txid}`);
		}
		async acquireConnection(e, t) {
			let n = e && e.connection,
				i = n || (await this.client.acquireConnection());
			try {
				return (i.__knexTxId = this.txid), (i.isTransaction = !0), await t(i);
			} finally {
				bf('%s: releasing connection', this.txid), (i.isTransaction = !1);
				try {
					await i.commitAsync();
				} catch (s) {
					this._rejecter(s);
				} finally {
					n
						? bf('%s: not releasing external connection', this.txid)
						: await this.client.releaseConnection(i);
				}
			}
		}
	};
});
var BR = l((ame, LR) => {
	var Mne = bn(),
		jne = Ri(),
		Lne = we(),
		$R = Rt(),
		Bne = zi(),
		Dne = xR(),
		Une = qR(),
		Fne = SR(),
		{BlobHelper: _f, ReturningHelper: Qne, monkeyPatchConnection: MR} = Oa(),
		Hne = RR(),
		Wne = IR(),
		Vne = kR(),
		Gne = cf(),
		{isString: Jne} = U(),
		{outputQuery: Kne, unwrapRaw: zne} = ne(),
		{compileCallback: Zne} = Ot(),
		Na = class extends Gne {
			constructor(e) {
				super(e),
					this.version && (this.version = jR(this.version)),
					this.driver &&
						((process.env.UV_THREADPOOL_SIZE =
							process.env.UV_THREADPOOL_SIZE || 1),
						(process.env.UV_THREADPOOL_SIZE =
							parseInt(process.env.UV_THREADPOOL_SIZE) + this.driver.poolMax));
			}
			_driver() {
				let e = this,
					t = _('oracledb');
				return (
					(e.fetchAsString = []),
					this.config.fetchAsString &&
						Array.isArray(this.config.fetchAsString) &&
						this.config.fetchAsString.forEach(function (n) {
							Jne(n) &&
								((n = n.toUpperCase()),
								t[n] &&
									(n !== 'NUMBER' &&
										n !== 'DATE' &&
										n !== 'CLOB' &&
										n !== 'BUFFER' &&
										this.logger.warn(
											'Only "date", "number", "clob" and "buffer" are supported for fetchAsString'
										),
									e.fetchAsString.push(t[n])));
						}),
					t
				);
			}
			queryCompiler(e, t) {
				return new Dne(this, e, t);
			}
			tableCompiler() {
				return new Une(this, ...arguments);
			}
			columnCompiler() {
				return new Fne(this, ...arguments);
			}
			viewBuilder() {
				return new Wne(this, ...arguments);
			}
			viewCompiler() {
				return new Hne(this, ...arguments);
			}
			formatter(e) {
				return new Bne(this, e);
			}
			transaction() {
				return new Vne(this, ...arguments);
			}
			prepBindings(e) {
				return $R(e, (t) =>
					t instanceof _f && this.driver
						? {type: this.driver.BLOB, dir: this.driver.BIND_OUT}
						: t instanceof Qne && this.driver
							? {type: this.driver.STRING, dir: this.driver.BIND_OUT}
							: typeof t == 'boolean'
								? t
									? 1
									: 0
								: t
				);
			}
			parameter(e, t, n) {
				return typeof e == 'function'
					? Kne(Zne(e, void 0, this, n), !0, t, this)
					: e instanceof _f
						? (n.bindings.push(e.value), '?')
						: zne(e, !0, t, this, n) || '?';
			}
			acquireRawConnection() {
				return new Promise((e, t) => {
					let n = this.connectionSettings.externalAuth
						? {externalAuth: this.connectionSettings.externalAuth}
						: {
								user: this.connectionSettings.user,
								password: this.connectionSettings.password,
							};
					(n.connectString = Yne(this.connectionSettings)),
						this.connectionSettings.prefetchRowCount &&
							(n.prefetchRows = this.connectionSettings.prefetchRowCount),
						this.connectionSettings.stmtCacheSize !== void 0 &&
							(n.stmtCacheSize = this.connectionSettings.stmtCacheSize),
						(this.driver.fetchAsString = this.fetchAsString),
						this.driver.getConnection(n, (i, s) => {
							if (i) return t(i);
							MR(s, this), e(s);
						});
				});
			}
			destroyRawConnection(e) {
				return e.release();
			}
			async acquireConnection() {
				let e = await super.acquireConnection();
				return this.checkVersion(e), e;
			}
			checkVersion(e) {
				if (this.version) return this.version;
				let t = jR(e.oracleServerVersionString);
				if (!t)
					throw new Error(
						this.version === null
							? 'Invalid Oracledb version number format passed to knex. Unable to successfully auto-detect as fallback. Please specify a valid oracledb version.'
							: 'Unable to detect Oracledb version number automatically. Please specify the version in knex configuration.'
					);
				return (this.version = t), t;
			}
			_query(e, t) {
				if (!t.sql) throw new Error('The query is empty');
				let n = Object.assign({}, t.options, {autoCommit: !1});
				return (
					t.method === 'select' && (n.resultSet = !0),
					e.executeAsync(t.sql, t.bindings, n).then(async function (i) {
						let s = jne(i.outBinds);
						if (
							((t.response = i.rows || []),
							(t.rowsAffected = i.rows ? i.rows.rowsAffected : i.rowsAffected),
							t.method === 'raw' && s.length > 0)
						)
							return {response: s};
						if (t.method === 'update') {
							let u = t.rowsAffected.length || t.rowsAffected,
								c = [],
								h = [],
								d = (f) =>
									function (m, g) {
										let y = g * u;
										h.push(s[f + y]);
									};
							for (let f = 0; f < u; f++)
								c.push(t.outBinding[0]), Mne(t.outBinding[0], d(f));
							(s = h), (t.outBinding = c);
						}
						if (!t.returning && s.length === 0)
							return e.isTransaction || (await e.commitAsync()), t;
						let o = [],
							a = 0;
						for (let u = 0; u < t.outBinding.length; u++) {
							let c = t.outBinding[u];
							a = a + (t.outBinding[u - 1] ? t.outBinding[u - 1].length : 0);
							for (let h = 0; h < c.length; h++) {
								let d = c[h];
								await new Promise(function (f, m) {
									if (d instanceof _f) {
										let g = s[h + a];
										d.returning &&
											((t.response[u] = t.response[u] || {}),
											(t.response[u][d.columnName] = d.value)),
											g.on('error', function (y) {
												m(y);
											}),
											g.on('finish', function () {
												f();
											}),
											g.write(d.value),
											g.end();
									} else
										t.outBinding[u][h] === 'ROWID'
											? (o.push(s[h + a]), f())
											: ((t.response[u] = t.response[u] || {}),
												(t.response[u][d] = s[h + a]),
												f());
								});
							}
						}
						if (t.returningSql) {
							let u = await e.executeAsync(t.returningSql(), o, {
								resultSet: !0,
							});
							t.response = u.rows;
						}
						return e.isTransaction || (await e.commitAsync()), t;
					})
				);
			}
			processResponse(e, t) {
				let {response: n} = e;
				if (e.output) return e.output.call(t, n);
				switch (e.method) {
					case 'select':
						return n;
					case 'first':
						return n[0];
					case 'pluck':
						return $R(n, e.pluck);
					case 'insert':
					case 'del':
					case 'update':
					case 'counter':
						return (e.returning && !Lne(e.returning)) || e.returningSql
							? n
							: e.rowsAffected !== void 0
								? e.rowsAffected
								: 1;
					default:
						return n;
				}
			}
			processPassedConnection(e) {
				this.checkVersion(e), MR(e, this);
			}
		};
	Na.prototype.driverName = 'oracledb';
	function jR(r) {
		try {
			let e = r.split('.').slice(0, 2);
			e.forEach((n, i) => {
				e[i] = n.replace(/\D$/, '');
			});
			let t = e.join('.');
			return t.match(/^\d+\.?\d*$/) ? t : null;
		} catch {
			return null;
		}
	}
	function Yne(r) {
		return r.connectString
			? r.connectString
			: r.port
				? r.host + ':' + r.port + '/' + r.database
				: r.host + '/' + r.database;
	}
	LR.exports = Na;
});
var UR = l((ume, DR) => {
	var Xne = Ln(),
		wf = class extends Xne {
			constructor(...e) {
				super(...e), (this.driverName = 'pgnative'), (this.canCancelQuery = !0);
			}
			_driver() {
				return cs().native;
			}
			_stream(e, t, n, i) {
				if (!t.sql) throw new Error('The query is empty');
				let s = this;
				return new Promise(
					(o, a) => (
						n.on('error', a),
						n.on('end', o),
						s
							._query(e, t)
							.then((u) => u.response)
							.then(({rows: u}) => u.forEach((c) => n.write(c)))
							.catch(function (u) {
								n.emit('error', u);
							})
							.then(function () {
								n.end();
							})
					)
				);
			}
			async cancelQuery(e) {
				try {
					return await this._wrappedCancelQueryCall(null, e);
				} catch (t) {
					throw (this.logger.warn(`Connection Error: ${t}`), t);
				}
			}
			_wrappedCancelQueryCall(e, t) {
				return new Promise(function (n, i) {
					t.native.cancel(function (s) {
						if (s) {
							i(s);
							return;
						}
						n(!0);
					});
				});
			}
		};
	DR.exports = wf;
});
var QR = l((lme, FR) => {
	var eie = lt();
	FR.exports = class extends eie {
		begin(e) {
			let t = [
				this.isolationLevel ? `ISOLATION LEVEL ${this.isolationLevel}` : '',
				this.readOnly ? 'READ ONLY' : '',
			]
				.join(' ')
				.trim();
			return t.length === 0
				? this.query(e, 'BEGIN;')
				: this.query(e, `BEGIN ${t};`);
		}
		savepoint(e) {
			return (
				this.trxClient.logger('Redshift does not support savepoints.'),
				Promise.resolve()
			);
		}
		release(e, t) {
			return (
				this.trxClient.logger('Redshift does not support savepoints.'),
				Promise.resolve()
			);
		}
		rollbackTo(e, t) {
			return (
				this.trxClient.logger('Redshift does not support savepoints.'),
				Promise.resolve()
			);
		}
	};
});
var VR = l((hme, WR) => {
	var vf = It(),
		tie = ta(),
		HR = ge(),
		{columnize: rie} = ne(),
		Ef = class extends tie {
			truncate() {
				return `truncate ${this.tableName.toLowerCase()}`;
			}
			insert() {
				let e = vf.prototype.insert.apply(this, arguments);
				return e === '' ? e : (this._slightReturn(), {sql: e});
			}
			update() {
				let e = vf.prototype.update.apply(this, arguments);
				return this._slightReturn(), {sql: e};
			}
			del() {
				let e = vf.prototype.del.apply(this, arguments);
				return this._slightReturn(), {sql: e};
			}
			_slightReturn() {
				this.single.isReturning &&
					this.client.logger.warn(
						'insert/update/delete returning is not supported by redshift dialect'
					);
			}
			forUpdate() {
				return (
					this.client.logger.warn(
						'table lock is not supported by redshift dialect'
					),
					''
				);
			}
			forShare() {
				return (
					this.client.logger.warn(
						'lock for share is not supported by redshift dialect'
					),
					''
				);
			}
			forNoKeyUpdate() {
				return (
					this.client.logger.warn(
						'table lock is not supported by redshift dialect'
					),
					''
				);
			}
			forKeyShare() {
				return (
					this.client.logger.warn(
						'lock for share is not supported by redshift dialect'
					),
					''
				);
			}
			columnInfo() {
				let e = this.single.columnInfo,
					t = this.single.schema,
					n = this.client.customWrapIdentifier(this.single.table, HR);
				t && (t = this.client.customWrapIdentifier(t, HR));
				let i =
						'select * from information_schema.columns where table_name = ? and table_catalog = ?',
					s = [n.toLowerCase(), this.client.database().toLowerCase()];
				return this._buildColumnInfoQuery(t, i, s, e);
			}
			jsonExtract(e) {
				let t;
				return (
					Array.isArray(e.column) ? (t = e.column) : (t = [e]),
					t
						.map((n) => {
							let i = `json_extract_path_text(${rie(n.column || n[0], this.builder, this.client, this.bindingsHolder)}, ${this.client.toPathForJson(e.path || n[1], this.builder, this.bindingsHolder)})`,
								s = n.alias || n[2];
							return s ? this.client.alias(i, this.formatter.wrap(s)) : i;
						})
						.join(', ')
				);
			}
			jsonSet(e) {
				throw new Error('Json set is not supported by Redshift');
			}
			jsonInsert(e) {
				throw new Error('Json insert is not supported by Redshift');
			}
			jsonRemove(e) {
				throw new Error('Json remove is not supported by Redshift');
			}
			whereJsonPath(e) {
				return this._whereJsonPath(
					'json_extract_path_text',
					Object.assign({}, e, {path: this.client.toPathForJson(e.path)})
				);
			}
			whereJsonSupersetOf(e) {
				throw new Error('Json superset is not supported by Redshift');
			}
			whereJsonSubsetOf(e) {
				throw new Error('Json subset is not supported by Redshift');
			}
			onJsonPathEquals(e) {
				return this._onJsonPathEquals('json_extract_path_text', e);
			}
		};
	WR.exports = Ef;
});
var JR = l((dme, GR) => {
	var nie = Ki(),
		xf = class extends nie {
			constructor() {
				super(...arguments);
			}
			primary() {
				return this.notNullable(), super.primary(...arguments);
			}
			index() {
				return (
					this.client.logger.warn(
						'Redshift does not support the creation of indexes.'
					),
					this
				);
			}
		};
	GR.exports = xf;
});
var zR = l((fme, KR) => {
	var iie = ra(),
		sie = Pt(),
		W = class extends iie {
			constructor() {
				super(...arguments);
			}
			bit(e) {
				return e.length !== !1 ? `char(${e.length})` : 'char(1)';
			}
			datetime(e) {
				return e ? 'timestamp' : 'timestamptz';
			}
			timestamp(e) {
				return e ? 'timestamp' : 'timestamptz';
			}
			comment(e) {
				this.pushAdditional(function () {
					this.pushQuery(
						`comment on column ${this.tableCompiler.tableName()}.` +
							this.formatter.wrap(this.args[0]) +
							' is ' +
							(e ? `'${e}'` : 'NULL')
					);
				}, e);
			}
		};
	W.prototype.increments = ({primaryKey: r = !0} = {}) =>
		'integer identity(1,1)' + (r ? ' primary key' : '') + ' not null';
	W.prototype.bigincrements = ({primaryKey: r = !0} = {}) =>
		'bigint identity(1,1)' + (r ? ' primary key' : '') + ' not null';
	W.prototype.binary = 'varchar(max)';
	W.prototype.blob = 'varchar(max)';
	W.prototype.enu = 'varchar(255)';
	W.prototype.enum = 'varchar(255)';
	W.prototype.json = 'varchar(max)';
	W.prototype.jsonb = 'varchar(max)';
	W.prototype.longblob = 'varchar(max)';
	W.prototype.mediumblob = 'varchar(16777218)';
	W.prototype.set = 'text';
	W.prototype.text = 'varchar(max)';
	W.prototype.tinyblob = 'varchar(256)';
	W.prototype.uuid = sie.prototype.uuid;
	W.prototype.varbinary = 'varchar(max)';
	W.prototype.bigint = 'bigint';
	W.prototype.bool = 'boolean';
	W.prototype.double = 'double precision';
	W.prototype.floating = 'real';
	W.prototype.smallint = 'smallint';
	W.prototype.tinyint = 'smallint';
	KR.exports = W;
});
var YR = l((pme, ZR) => {
	var oie = Hi(),
		aie = ia(),
		Cf = class extends aie {
			constructor() {
				super(...arguments);
			}
			index(e, t, n) {
				this.client.logger.warn(
					'Redshift does not support the creation of indexes.'
				);
			}
			dropIndex(e, t) {
				this.client.logger.warn(
					'Redshift does not support the deletion of indexes.'
				);
			}
			createQuery(e, t, n) {
				let i = t ? 'create table if not exists ' : 'create table ',
					s = ' (' + e.sql.join(', ') + this._addChecks() + ')',
					o =
						i +
						this.tableName() +
						(n && this.tableNameLike()
							? ' (like ' + this.tableNameLike() + ')'
							: s);
				this.single.inherits &&
					(o += ` like (${this.formatter.wrap(this.single.inherits)})`),
					this.pushQuery({sql: o, bindings: e.bindings}),
					oie(this.single, 'comment') && this.comment(this.single.comment),
					n && this.addColumns(e, this.addColumnsPrefix);
			}
			primary(e, t) {
				let n = this;
				(t = t
					? n.formatter.wrap(t)
					: n.formatter.wrap(`${this.tableNameRaw}_pkey`)),
					e.constructor !== Array && (e = [e]);
				let i = n.grouped.columns;
				if (i)
					for (let s = 0; s < e.length; s++) {
						let o = i.find(
							(u) =>
								u.grouping === 'columns' &&
								u.builder &&
								u.builder._method === 'add' &&
								u.builder._args &&
								u.builder._args.indexOf(e[s]) > -1
						);
						if (
							(o && (o = o.builder),
							!(
								o &&
								o._modifiers &&
								o._modifiers.nullable &&
								o._modifiers.nullable[0] === !1
							))
						)
							return o
								? this.client.logger.warn(
										'Redshift does not allow primary keys to contain nullable columns.'
									)
								: this.client.logger.warn(
										'Redshift does not allow primary keys to contain nonexistent columns.'
									);
					}
				return n.pushQuery(
					`alter table ${n.tableName()} add constraint ${t} primary key (${n.formatter.columnize(e)})`
				);
			}
			addColumns(e, t, n) {
				if (t === this.alterColumnsPrefix) super.addColumns(e, t, n);
				else {
					(t = t || this.addColumnsPrefix), (n = n || this.getColumns());
					for (let i of n) {
						let s = this.tableName(),
							o = i.compileColumn();
						this.pushQuery({sql: `alter table ${s} ${t}${o}`, bindings: []});
					}
				}
			}
		};
	ZR.exports = Cf;
});
var eN = l((mme, XR) => {
	var uie = kh(),
		qf = class extends uie {
			constructor() {
				super(...arguments);
			}
		};
	XR.exports = qf;
});
var rN = l((gme, tN) => {
	var cie = sa(),
		Tf = class extends cie {
			constructor(e, t) {
				super(e, t);
			}
		};
	tN.exports = Tf;
});
var iN = l((yme, nN) => {
	var lie = Ln(),
		hie = Rt(),
		die = QR(),
		fie = VR(),
		pie = JR(),
		mie = zR(),
		gie = YR(),
		yie = eN(),
		bie = rN(),
		Ia = class extends lie {
			transaction() {
				return new die(this, ...arguments);
			}
			queryCompiler(e, t) {
				return new fie(this, e, t);
			}
			columnBuilder() {
				return new pie(this, ...arguments);
			}
			columnCompiler() {
				return new mie(this, ...arguments);
			}
			tableCompiler() {
				return new gie(this, ...arguments);
			}
			schemaCompiler() {
				return new yie(this, ...arguments);
			}
			viewCompiler() {
				return new bie(this, ...arguments);
			}
			_driver() {
				return cs();
			}
			processResponse(e, t) {
				let n = e.response;
				return e.output
					? e.output.call(t, n)
					: e.method === 'raw'
						? n
						: n.command === 'SELECT'
							? e.method === 'first'
								? n.rows[0]
								: e.method === 'pluck'
									? hie(n.rows, e.pluck)
									: n.rows
							: n.command === 'INSERT' ||
								  n.command === 'UPDATE' ||
								  n.command === 'DELETE'
								? n.rowCount
								: n;
			}
			toPathForJson(e, t, n) {
				return e
					.replace(/^(\$\.)/, '')
					.split('.')
					.map(
						function (i) {
							return this.parameter(i, t, n);
						}.bind(this)
					)
					.join(', ');
			}
		};
	Object.assign(Ia.prototype, {dialect: 'redshift', driverName: 'pg-redshift'});
	nN.exports = Ia;
});
var sN = l((Pa) => {
	'use strict';
	Object.defineProperty(Pa, '__esModule', {value: !0});
	Pa.getDialectByNameOrAlias = void 0;
	var {resolveClientNameWithAliases: _ie} = re(),
		wie = Object.freeze({
			'better-sqlite3': () => RT(),
			cockroachdb: () => VS(),
			mssql: () => gO(),
			mysql: () => Yd(),
			mysql2: () => WO(),
			oracle: () => cf(),
			oracledb: () => BR(),
			pgnative: () => UR(),
			postgres: () => Ln(),
			redshift: () => iN(),
			sqlite3: () => Th(),
		});
	function vie(r) {
		let e = _ie(r),
			t = wie[e];
		if (!t) throw new Error(`Invalid clientName given: ${r}`);
		return t();
	}
	Pa.getDialectByNameOrAlias = vie;
});
var uN = l((_me, aN) => {
	var Eie = kt(),
		{SUPPORTED_CLIENTS: xie} = Io(),
		oN = w0(),
		{getDialectByNameOrAlias: Cie} = sN();
	function qie(r) {
		let e,
			t,
			n = typeof r == 'string' ? Object.assign(oN(r), arguments[2]) : r;
		if (arguments.length === 0 || (!n.client && !n.dialect)) e = Eie;
		else if (typeof n.client == 'function') e = n.client;
		else {
			let i = n.client || n.dialect;
			if (!xie.includes(i))
				throw new Error(
					`knex: Unknown configuration option 'client' value ${i}. Note that it is case-sensitive, check documentation for supported values.`
				);
			e = Cie(i);
		}
		return (
			typeof n.connection == 'string'
				? (t = Object.assign({}, n, {connection: oN(n.connection).connection}))
				: (t = Object.assign({}, n)),
			{resolvedConfig: t, Dialect: e}
		);
	}
	aN.exports = {resolveConfig: qie};
});
var lN = l((wme, cN) => {
	var Tie = kt(),
		Aie = Ze(),
		Sie = Pl(),
		Oie = jl(),
		{KnexTimeoutError: Rie} = yr(),
		{resolveConfig: Nie} = uN(),
		Iie = th(),
		Pie = An(),
		kie = Ki(),
		$ie = sh();
	function Ut(r) {
		let {resolvedConfig: e, Dialect: t} = Nie(...arguments),
			n = Oie(new t(e));
		return e.userParams && (n.userParams = e.userParams), n;
	}
	Ut.Client = Tie;
	Ut.KnexTimeoutError = Rie;
	Ut.QueryBuilder = {
		extend: function (r, e) {
			Aie.extend(r, e), Sie.push(r);
		},
	};
	Ut.SchemaBuilder = {
		extend: function (r, e) {
			Iie.extend(r, e);
		},
	};
	Ut.ViewBuilder = {
		extend: function (r, e) {
			Pie.extend(r, e);
		},
	};
	Ut.ColumnBuilder = {
		extend: function (r, e) {
			kie.extend(r, e);
		},
	};
	Ut.TableBuilder = {
		extend: function (r, e) {
			$ie.extend(r, e);
		},
	};
	cN.exports = Ut;
});
var dN = l((vme, hN) => {
	var Mie = lN();
	hN.exports = Mie;
});
var pN = l((Eme, fN) => {
	var ps = dN();
	ps.knex = ps;
	ps.default = ps;
	fN.exports = ps;
});
import {createServer as kN} from 'http';
import {Http2ServerRequest as Lf} from 'http2';
import {Readable as $N} from 'stream';
import QN from 'crypto';
var ys = class extends Error {
		static name = 'RequestError';
		constructor(r, e) {
			super(r, e);
		}
	},
	MN = (r) => (r instanceof ys ? r : new ys(r.message, {cause: r})),
	jN = global.Request,
	Gn = class extends jN {
		constructor(r, e) {
			typeof r == 'object' && Mr in r && (r = r[Mr]()),
				typeof e?.body?.getReader < 'u' && (e.duplex ??= 'half'),
				super(r, e);
		}
	},
	LN = (r, e, t, n) => {
		let i = [],
			s = t.rawHeaders;
		for (let a = 0; a < s.length; a += 2) {
			let {[a]: u, [a + 1]: c} = s;
			u.charCodeAt(0) !== 58 && i.push([u, c]);
		}
		let o = {method: r, headers: i, signal: n.signal};
		if (r === 'TRACE') {
			o.method = 'GET';
			let a = new Gn(e, o);
			return (
				Object.defineProperty(a, 'method', {
					get() {
						return 'TRACE';
					},
				}),
				a
			);
		}
		return r === 'GET' || r === 'HEAD' || (o.body = $N.toWeb(t)), new Gn(e, o);
	},
	Mr = Symbol('getRequestCache'),
	BN = Symbol('requestCache'),
	Ha = Symbol('incomingKey'),
	Wa = Symbol('urlKey'),
	Qa = Symbol('abortControllerKey'),
	Va = Symbol('getAbortController'),
	bs = {
		get method() {
			return this[Ha].method || 'GET';
		},
		get url() {
			return this[Wa];
		},
		[Va]() {
			return this[Mr](), this[Qa];
		},
		[Mr]() {
			return (
				(this[Qa] ||= new AbortController()),
				(this[BN] ||= LN(this.method, this[Wa], this[Ha], this[Qa]))
			);
		},
	};
[
	'body',
	'bodyUsed',
	'cache',
	'credentials',
	'destination',
	'headers',
	'integrity',
	'mode',
	'redirect',
	'referrer',
	'referrerPolicy',
	'signal',
	'keepalive',
].forEach((r) => {
	Object.defineProperty(bs, r, {
		get() {
			return this[Mr]()[r];
		},
	});
});
['arrayBuffer', 'blob', 'clone', 'formData', 'json', 'text'].forEach((r) => {
	Object.defineProperty(bs, r, {
		value: function () {
			return this[Mr]()[r]();
		},
	});
});
Object.setPrototypeOf(bs, Gn.prototype);
var DN = (r, e) => {
	let t = Object.create(bs);
	t[Ha] = r;
	let n = (r instanceof Lf ? r.authority : r.headers.host) || e;
	if (!n) throw new ys('Missing host header');
	let i = new URL(
		`${r instanceof Lf || (r.socket && r.socket.encrypted) ? 'https' : 'http'}://${n}${r.url}`
	);
	if (i.hostname.length !== n.length && i.hostname !== n.replace(/:\d+$/, ''))
		throw new ys('Invalid host header');
	return (t[Wa] = i.href), t;
};
function Ga(r, e) {
	if (r.locked) throw new TypeError('ReadableStream is locked.');
	if (e.destroyed) {
		r.cancel();
		return;
	}
	let t = r.getReader();
	return (
		e.on('close', n),
		e.on('error', n),
		t.read().then(s, n),
		t.closed.finally(() => {
			e.off('close', n), e.off('error', n);
		})
	);
	function n(o) {
		t.cancel(o).catch(() => {}), o && e.destroy(o);
	}
	function i() {
		t.read().then(s, n);
	}
	function s({done: o, value: a}) {
		try {
			if (o) e.end();
			else if (!e.write(a)) e.once('drain', i);
			else return t.read().then(s, n);
		} catch (u) {
			n(u);
		}
	}
}
var Df = (r) => {
		let e = {};
		r instanceof Headers || (r = new Headers(r ?? void 0));
		let t = [];
		for (let [n, i] of r) n === 'set-cookie' ? t.push(i) : (e[n] = i);
		return (
			t.length > 0 && (e['set-cookie'] = t),
			(e['content-type'] ??= 'text/plain; charset=UTF-8'),
			e
		);
	},
	Bf = Symbol('responseCache'),
	Jn = Symbol('getResponseCache'),
	Kn = Symbol('cache'),
	_s = global.Response,
	jr = class Uf {
		#t;
		#e;
		[Jn]() {
			return delete this[Kn], (this[Bf] ||= new _s(this.#t, this.#e));
		}
		constructor(e, t) {
			if (((this.#t = e), t instanceof Uf)) {
				let n = t[Bf];
				if (n) {
					(this.#e = n), this[Jn]();
					return;
				} else this.#e = t.#e;
			} else this.#e = t;
			if (typeof e == 'string' || typeof e?.getReader < 'u') {
				let n = t?.headers || {'content-type': 'text/plain; charset=UTF-8'};
				n instanceof Headers && (n = Df(n)),
					(this[Kn] = [t?.status || 200, e, n]);
			}
		}
	};
[
	'body',
	'bodyUsed',
	'headers',
	'ok',
	'redirected',
	'status',
	'statusText',
	'trailers',
	'type',
	'url',
].forEach((r) => {
	Object.defineProperty(jr.prototype, r, {
		get() {
			return this[Jn]()[r];
		},
	});
});
['arrayBuffer', 'blob', 'clone', 'formData', 'json', 'text'].forEach((r) => {
	Object.defineProperty(jr.prototype, r, {
		value: function () {
			return this[Jn]()[r]();
		},
	});
});
Object.setPrototypeOf(jr, _s);
Object.setPrototypeOf(jr.prototype, _s.prototype);
var Ja = Reflect.ownKeys(new _s()).find(
	(r) => typeof r == 'symbol' && r.toString() === 'Symbol(state)'
);
Ja || console.warn('Failed to find Response internal state key');
function UN(r) {
	if (!Ja) return;
	r instanceof jr && (r = r[Jn]());
	let e = r[Ja];
	return (e && e.body) || void 0;
}
var FN = 'x-hono-already-sent',
	HN = global.fetch;
typeof global.crypto > 'u' && (global.crypto = QN);
global.fetch = (r, e) => ((e = {compress: !1, ...e}), HN(r, e));
var WN = /^no$/i,
	VN = /^(application\/json\b|text\/(?!event-stream\b))/i,
	GN = () => new Response(null, {status: 400}),
	Ff = (r) =>
		new Response(null, {
			status:
				r instanceof Error &&
				(r.name === 'TimeoutError' || r.constructor.name === 'TimeoutError')
					? 504
					: 500,
		}),
	Ka = (r, e) => {
		let t = r instanceof Error ? r : new Error('unknown error', {cause: r});
		t.code === 'ERR_STREAM_PREMATURE_CLOSE'
			? console.info('The user aborted a request.')
			: (console.error(r),
				e.headersSent || e.writeHead(500, {'Content-Type': 'text/plain'}),
				e.end(`Error: ${t.message}`),
				e.destroy(t));
	},
	Qf = (r, e) => {
		let [t, n, i] = r[Kn];
		if (typeof n == 'string')
			(i['Content-Length'] = Buffer.byteLength(n)), e.writeHead(t, i), e.end(n);
		else return e.writeHead(t, i), Ga(n, e)?.catch((s) => Ka(s, e));
	},
	JN = async (r, e, t = {}) => {
		if (r instanceof Promise)
			if (t.errorHandler)
				try {
					r = await r;
				} catch (s) {
					let o = await t.errorHandler(s);
					if (!o) return;
					r = o;
				}
			else r = await r.catch(Ff);
		if (Kn in r) return Qf(r, e);
		let n = Df(r.headers),
			i = UN(r);
		if (i) {
			let {length: s, source: o, stream: a} = i;
			if (!(o instanceof Uint8Array && o.byteLength !== s)) {
				s && (n['content-length'] = s),
					e.writeHead(r.status, n),
					typeof o == 'string' || o instanceof Uint8Array
						? e.end(o)
						: o instanceof Blob
							? e.end(new Uint8Array(await o.arrayBuffer()))
							: await Ga(a, e);
				return;
			}
		}
		if (r.body) {
			let {
				'transfer-encoding': s,
				'content-encoding': o,
				'content-length': a,
				'x-accel-buffering': u,
				'content-type': c,
			} = n;
			if (s || o || a || (u && WN.test(u)) || !VN.test(c))
				e.writeHead(r.status, n), await Ga(r.body, e);
			else {
				let h = await r.arrayBuffer();
				(n['content-length'] = h.byteLength),
					e.writeHead(r.status, n),
					e.end(new Uint8Array(h));
			}
		} else n[FN] || (e.writeHead(r.status, n), e.end());
	},
	KN = (r, e = {}) => (
		e.overrideGlobalObjects !== !1 &&
			global.Request !== Gn &&
			(Object.defineProperty(global, 'Request', {value: Gn}),
			Object.defineProperty(global, 'Response', {value: jr})),
		async (t, n) => {
			let i, s;
			try {
				if (
					((s = DN(t, e.hostname)),
					n.on('close', () => {
						t.errored
							? s[Va]().abort(t.errored.toString())
							: n.writableFinished ||
								s[Va]().abort('Client connection prematurely closed.');
					}),
					(i = r(s, {incoming: t, outgoing: n})),
					Kn in i)
				)
					return Qf(i, n);
			} catch (o) {
				if (i) return Ka(o, n);
				if (e.errorHandler) {
					if (((i = await e.errorHandler(s ? o : MN(o))), !i)) return;
				} else s ? (i = Ff(o)) : (i = GN());
			}
			try {
				return JN(i, n, e);
			} catch (o) {
				return Ka(o, n);
			}
		}
	),
	zN = (r) => {
		let e = r.fetch,
			t = KN(e, {
				hostname: r.hostname,
				overrideGlobalObjects: r.overrideGlobalObjects,
			});
		return (r.createServer || kN)(r.serverOptions || {}, t);
	},
	Hf = (r, e) => {
		let t = zN(r);
		return (
			t.listen(r?.port ?? 3e3, r.hostname, () => {
				let n = t.address();
				e && e(n);
			}),
			t
		);
	};
var za = {Stringify: 1, BeforeStream: 2, Stream: 3},
	Lr = (r, e) => {
		let t = new String(r);
		return (t.isEscaped = !0), (t.callbacks = e), t;
	},
	ZN = /[&<>'"]/,
	Wf = async (r, e) => {
		let t = '';
		e ||= [];
		let n = await Promise.all(r);
		for (let i = n.length - 1; (t += n[i]), i--, !(i < 0); i--) {
			let s = n[i];
			typeof s == 'object' && e.push(...(s.callbacks || []));
			let o = s.isEscaped;
			if (
				((s = await (typeof s == 'object' ? s.toString() : s)),
				typeof s == 'object' && e.push(...(s.callbacks || [])),
				s.isEscaped ?? o)
			)
				t += s;
			else {
				let a = [t];
				ws(s, a), (t = a[0]);
			}
		}
		return Lr(t, e);
	},
	ws = (r, e) => {
		let t = r.search(ZN);
		if (t === -1) {
			e[0] += r;
			return;
		}
		let n,
			i,
			s = 0;
		for (i = t; i < r.length; i++) {
			switch (r.charCodeAt(i)) {
				case 34:
					n = '&quot;';
					break;
				case 39:
					n = '&#39;';
					break;
				case 38:
					n = '&amp;';
					break;
				case 60:
					n = '&lt;';
					break;
				case 62:
					n = '&gt;';
					break;
				default:
					continue;
			}
			(e[0] += r.substring(s, i) + n), (s = i + 1);
		}
		e[0] += r.substring(s, i);
	},
	Vf = (r) => {
		let e = r.callbacks;
		if (!e?.length) return r;
		let t = [r],
			n = {};
		return (
			e.forEach((i) => i({phase: za.Stringify, buffer: t, context: n})), t[0]
		);
	},
	Za = async (r, e, t, n, i) => {
		typeof r == 'object' &&
			!(r instanceof String) &&
			(r instanceof Promise || (r = r.toString()),
			r instanceof Promise && (r = await r));
		let s = r.callbacks;
		if (!s?.length) return Promise.resolve(r);
		i ? (i[0] += r) : (i = [r]);
		let o = Promise.all(
			s.map((a) => a({phase: e, buffer: i, context: n}))
		).then((a) =>
			Promise.all(a.filter(Boolean).map((u) => Za(u, e, !1, n, i))).then(
				() => i[0]
			)
		);
		return t ? Lr(await o, s) : o;
	};
var Ya = (r, ...e) => {
	let t = [''];
	for (let n = 0, i = r.length - 1; n < i; n++) {
		t[0] += r[n];
		let s = Array.isArray(e[n]) ? e[n].flat(1 / 0) : [e[n]];
		for (let o = 0, a = s.length; o < a; o++) {
			let u = s[o];
			if (typeof u == 'string') ws(u, t);
			else if (typeof u == 'number') t[0] += u;
			else {
				if (typeof u == 'boolean' || u === null || u === void 0) continue;
				if (typeof u == 'object' && u.isEscaped)
					if (u.callbacks) t.unshift('', u);
					else {
						let c = u.toString();
						c instanceof Promise ? t.unshift('', c) : (t[0] += c);
					}
				else u instanceof Promise ? t.unshift('', u) : ws(u.toString(), t);
			}
		}
	}
	return (
		(t[0] += r.at(-1)),
		t.length === 1
			? 'callbacks' in t
				? Lr(Vf(Lr(t[0], t.callbacks)))
				: Lr(t[0])
			: Wf(t, t.callbacks)
	);
};
var k = {
		STRING_ARRAY: 'string_array',
		STRING: 'string',
		JSON_STRING: 'json_string',
		RAW: 'raw',
	},
	vs = {
		configUrl: k.STRING,
		deepLinking: k.RAW,
		presets: k.STRING_ARRAY,
		plugins: k.STRING_ARRAY,
		spec: k.JSON_STRING,
		url: k.STRING,
		urls: k.JSON_STRING,
		layout: k.STRING,
		docExpansion: k.STRING,
		maxDisplayedTags: k.RAW,
		operationsSorter: k.RAW,
		requestInterceptor: k.RAW,
		responseInterceptor: k.RAW,
		persistAuthorization: k.RAW,
		defaultModelsExpandDepth: k.RAW,
		defaultModelExpandDepth: k.RAW,
		defaultModelRendering: k.STRING,
		displayRequestDuration: k.RAW,
		filter: k.RAW,
		showExtensions: k.RAW,
		showCommonExtensions: k.RAW,
		queryConfigEnabled: k.RAW,
		displayOperationId: k.RAW,
		tagsSorter: k.RAW,
		onComplete: k.RAW,
		syntaxHighlight: k.JSON_STRING,
		tryItOutEnabled: k.RAW,
		requestSnippetsEnabled: k.RAW,
		requestSnippets: k.JSON_STRING,
		oauth2RedirectUrl: k.STRING,
		showMutabledRequest: k.RAW,
		request: k.JSON_STRING,
		supportedSubmitMethods: k.JSON_STRING,
		validatorUrl: k.STRING,
		withCredentials: k.RAW,
		modelPropertyMacro: k.RAW,
		parameterMacro: k.RAW,
	},
	YN = (r) =>
		Object.entries(r)
			.map(([t, n]) => {
				let i = t;
				return vs[i] === k.STRING
					? `${i}: '${n}'`
					: vs[i] === k.STRING_ARRAY
						? Array.isArray(n)
							? `${i}: [${n.map((s) => `${s}`).join(',')}]`
							: ''
						: vs[i] === k.JSON_STRING
							? `${i}: ${JSON.stringify(n)}`
							: vs[i] === k.RAW
								? `${i}: ${n}`
								: '';
			})
			.join(','),
	XN = ({version: r}) => {
		let e = `https://cdn.jsdelivr.net/npm/swagger-ui-dist${r !== void 0 ? `@${r}` : ''}`;
		return {css: [`${e}/swagger-ui.css`], js: [`${e}/swagger-ui-bundle.js`]};
	},
	eI = (r) => {
		let e = XN({version: r?.version});
		if ((delete r.version, r.manuallySwaggerUIHtml))
			return r.manuallySwaggerUIHtml(e);
		let t = YN(r);
		return `
    <div>
      <div id="swagger-ui"></div>
      ${e.css.map((n) => Ya`<link rel="stylesheet" href="${n}" />`)}
      ${e.js.map((n) => Ya`<script src="${n}" crossorigin="anonymous"></script>`)}
      <script>
        window.onload = () => {
          window.ui = SwaggerUIBundle({
            dom_id: '#swagger-ui',${t},
          })
        }
      </script>
    </div>
  `;
	},
	Gf = (r) => async (e) => {
		let t = r?.title ?? 'SwaggerUI';
		return e.html(`
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="SwaggerUI" />
          <title>${t}</title>
        </head>
        <body>
          ${eI(r)}
        </body>
      </html>
    `);
	};
var wt = Fa(zf(), 1);
var Eu = (r) => {
		let e = r.split('/');
		return e[0] === '' && e.shift(), e;
	},
	Zf = (r) => {
		let {groups: e, path: t} = uI(r),
			n = Eu(t);
		return cI(n, e);
	},
	uI = (r) => {
		let e = [];
		return (
			(r = r.replace(/\{[^}]+\}/g, (t, n) => {
				let i = `@${n}`;
				return e.push([i, t]), i;
			})),
			{groups: e, path: r}
		);
	},
	cI = (r, e) => {
		for (let t = e.length - 1; t >= 0; t--) {
			let [n] = e[t];
			for (let i = r.length - 1; i >= 0; i--)
				if (r[i].includes(n)) {
					r[i] = r[i].replace(n, e[t][1]);
					break;
				}
		}
		return r;
	},
	Cs = {},
	xu = (r) => {
		if (r === '*') return '*';
		let e = r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
		return e
			? (Cs[r] ||
					(e[2]
						? (Cs[r] = [r, e[1], new RegExp('^' + e[2] + '$')])
						: (Cs[r] = [r, e[1], !0])),
				Cs[r])
			: null;
	},
	Cu = (r, e) => {
		try {
			return e(r);
		} catch {
			return r.replace(/(?:%[0-9A-Fa-f]{2})+/g, (t) => {
				try {
					return e(t);
				} catch {
					return t;
				}
			});
		}
	},
	lI = (r) => Cu(r, decodeURI),
	qu = (r) => {
		let e = r.url,
			t = e.indexOf('/', 8),
			n = t;
		for (; n < e.length; n++) {
			let i = e.charCodeAt(n);
			if (i === 37) {
				let s = e.indexOf('?', n),
					o = e.slice(t, s === -1 ? void 0 : s);
				return lI(o.includes('%25') ? o.replace(/%25/g, '%2525') : o);
			} else if (i === 63) break;
		}
		return e.slice(t, n);
	};
var Yf = (r) => {
		let e = qu(r);
		return e.length > 1 && e.at(-1) === '/' ? e.slice(0, -1) : e;
	},
	Ve = (...r) => {
		let e = '',
			t = !1;
		for (let n of r)
			e.at(-1) === '/' && ((e = e.slice(0, -1)), (t = !0)),
				n[0] !== '/' && (n = `/${n}`),
				n === '/' && t ? (e = `${e}/`) : n !== '/' && (e = `${e}${n}`),
				n === '/' && e === '' && (e = '/');
		return e;
	},
	qs = (r) => {
		if (!r.match(/\:.+\?$/)) return null;
		let e = r.split('/'),
			t = [],
			n = '';
		return (
			e.forEach((i) => {
				if (i !== '' && !/\:/.test(i)) n += '/' + i;
				else if (/\:/.test(i))
					if (/\?/.test(i)) {
						t.length === 0 && n === '' ? t.push('/') : t.push(n);
						let s = i.replace('?', '');
						(n += '/' + s), t.push(n);
					} else n += '/' + i;
			}),
			t.filter((i, s, o) => o.indexOf(i) === s)
		);
	},
	vu = (r) =>
		/[%+]/.test(r)
			? (r.indexOf('+') !== -1 && (r = r.replace(/\+/g, ' ')),
				r.indexOf('%') !== -1 ? ei(r) : r)
			: r,
	Xf = (r, e, t) => {
		let n;
		if (!t && e && !/[%+]/.test(e)) {
			let o = r.indexOf(`?${e}`, 8);
			for (o === -1 && (o = r.indexOf(`&${e}`, 8)); o !== -1; ) {
				let a = r.charCodeAt(o + e.length + 1);
				if (a === 61) {
					let u = o + e.length + 2,
						c = r.indexOf('&', u);
					return vu(r.slice(u, c === -1 ? void 0 : c));
				} else if (a == 38 || isNaN(a)) return '';
				o = r.indexOf(`&${e}`, o + 1);
			}
			if (((n = /[%+]/.test(r)), !n)) return;
		}
		let i = {};
		n ??= /[%+]/.test(r);
		let s = r.indexOf('?', 8);
		for (; s !== -1; ) {
			let o = r.indexOf('&', s + 1),
				a = r.indexOf('=', s);
			a > o && o !== -1 && (a = -1);
			let u = r.slice(s + 1, a === -1 ? (o === -1 ? void 0 : o) : a);
			if ((n && (u = vu(u)), (s = o), u === '')) continue;
			let c;
			a === -1
				? (c = '')
				: ((c = r.slice(a + 1, o === -1 ? void 0 : o)), n && (c = vu(c))),
				t
					? ((i[u] && Array.isArray(i[u])) || (i[u] = []), i[u].push(c))
					: (i[u] ??= c);
		}
		return e ? i[e] : i;
	},
	ep = Xf,
	tp = (r, e) => Xf(r, e, !0),
	ei = decodeURIComponent;
var hI = /^[\w!#$%&'*.^`|~+-]+$/,
	dI = /^[ !#-:<-[\]-~]*$/,
	Tu = (r, e) => {
		if (e && r.indexOf(e) === -1) return {};
		let t = r.trim().split(';'),
			n = {};
		for (let i of t) {
			i = i.trim();
			let s = i.indexOf('=');
			if (s === -1) continue;
			let o = i.substring(0, s).trim();
			if ((e && e !== o) || !hI.test(o)) continue;
			let a = i.substring(s + 1).trim();
			if (
				(a.startsWith('"') && a.endsWith('"') && (a = a.slice(1, -1)),
				dI.test(a) && ((n[o] = ei(a)), e))
			)
				break;
		}
		return n;
	};
var rp = (r, e, t) => {
	let n = r.req.raw.headers.get('Cookie');
	if (typeof e == 'string') {
		if (!n) return;
		let s = e;
		return (
			t === 'secure'
				? (s = '__Secure-' + e)
				: t === 'host' && (s = '__Host-' + e),
			Tu(n, s)[s]
		);
	}
	return n ? Tu(n) : {};
};
var ti = class extends Error {
	res;
	status;
	constructor(r = 500, e) {
		super(e?.message, {cause: e?.cause}),
			(this.res = e?.res),
			(this.status = r);
	}
	getResponse() {
		return this.res
			? new Response(this.res.body, {
					status: this.status,
					headers: this.res.headers,
				})
			: new Response(this.message, {status: this.status});
	}
};
var np = async (r) => await fI(r, {name: 'SHA-256', alias: 'sha256'});
var fI = async (r, e) => {
	let t;
	if (
		(ArrayBuffer.isView(r) || r instanceof ArrayBuffer
			? (t = r)
			: (typeof r == 'object' && (r = JSON.stringify(r)),
				(t = new TextEncoder().encode(String(r)))),
		crypto && crypto.subtle)
	) {
		let n = await crypto.subtle.digest({name: e.name}, t);
		return Array.prototype.map
			.call(new Uint8Array(n), (s) => ('00' + s.toString(16)).slice(-2))
			.join('');
	}
	return null;
};
var Au = async (r, e, t) => {
	t || (t = np);
	let [n, i] = await Promise.all([t(r), t(e)]);
	return !n || !i ? !1 : n === i && r === e;
};
var ip = (r, e) => new Response(r, {headers: {'Content-Type': e}}).formData();
var pI = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
	mI = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/,
	gI = /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/,
	Su = (r, e) => async (t, n) => {
		let i = {},
			s = t.req.header('Content-Type');
		switch (r) {
			case 'json':
				if (!s || !pI.test(s)) break;
				try {
					i = await t.req.json();
				} catch {
					let a = 'Malformed JSON in request body';
					throw new ti(400, {message: a});
				}
				break;
			case 'form': {
				if (!s || !(mI.test(s) || gI.test(s))) break;
				let a;
				if (t.req.bodyCache.formData) a = await t.req.bodyCache.formData;
				else
					try {
						let c = await t.req.arrayBuffer();
						(a = await ip(c, s)), (t.req.bodyCache.formData = a);
					} catch (c) {
						let h = 'Malformed FormData request.';
						throw (
							((h += c instanceof Error ? ` ${c.message}` : ` ${String(c)}`),
							new ti(400, {message: h}))
						);
					}
				let u = {};
				a.forEach((c, h) => {
					h.endsWith('[]')
						? (u[h] ??= []).push(c)
						: Array.isArray(u[h])
							? u[h].push(c)
							: h in u
								? (u[h] = [u[h], c])
								: (u[h] = c);
				}),
					(i = u);
				break;
			}
			case 'query':
				i = Object.fromEntries(
					Object.entries(t.req.queries()).map(([a, u]) =>
						u.length === 1 ? [a, u[0]] : [a, u]
					)
				);
				break;
			case 'param':
				i = t.req.param();
				break;
			case 'header':
				i = t.req.header();
				break;
			case 'cookie':
				i = rp(t);
				break;
		}
		let o = await e(i, t);
		if (o instanceof Response) return o;
		t.req.addValidatedData(r, o), await n();
	};
var L;
(function (r) {
	r.assertEqual = (i) => i;
	function e(i) {}
	r.assertIs = e;
	function t(i) {
		throw new Error();
	}
	(r.assertNever = t),
		(r.arrayToEnum = (i) => {
			let s = {};
			for (let o of i) s[o] = o;
			return s;
		}),
		(r.getValidEnumValues = (i) => {
			let s = r.objectKeys(i).filter((a) => typeof i[i[a]] != 'number'),
				o = {};
			for (let a of s) o[a] = i[a];
			return r.objectValues(o);
		}),
		(r.objectValues = (i) =>
			r.objectKeys(i).map(function (s) {
				return i[s];
			})),
		(r.objectKeys =
			typeof Object.keys == 'function'
				? (i) => Object.keys(i)
				: (i) => {
						let s = [];
						for (let o in i)
							Object.prototype.hasOwnProperty.call(i, o) && s.push(o);
						return s;
					}),
		(r.find = (i, s) => {
			for (let o of i) if (s(o)) return o;
		}),
		(r.isInteger =
			typeof Number.isInteger == 'function'
				? (i) => Number.isInteger(i)
				: (i) => typeof i == 'number' && isFinite(i) && Math.floor(i) === i);
	function n(i, s = ' | ') {
		return i.map((o) => (typeof o == 'string' ? `'${o}'` : o)).join(s);
	}
	(r.joinValues = n),
		(r.jsonStringifyReplacer = (i, s) =>
			typeof s == 'bigint' ? s.toString() : s);
})(L || (L = {}));
var Ru;
(function (r) {
	r.mergeShapes = (e, t) => ({...e, ...t});
})(Ru || (Ru = {}));
var v = L.arrayToEnum([
		'string',
		'nan',
		'number',
		'integer',
		'float',
		'boolean',
		'date',
		'bigint',
		'symbol',
		'function',
		'undefined',
		'null',
		'array',
		'object',
		'unknown',
		'promise',
		'void',
		'never',
		'map',
		'set',
	]),
	rt = (r) => {
		switch (typeof r) {
			case 'undefined':
				return v.undefined;
			case 'string':
				return v.string;
			case 'number':
				return isNaN(r) ? v.nan : v.number;
			case 'boolean':
				return v.boolean;
			case 'function':
				return v.function;
			case 'bigint':
				return v.bigint;
			case 'symbol':
				return v.symbol;
			case 'object':
				return Array.isArray(r)
					? v.array
					: r === null
						? v.null
						: r.then &&
							  typeof r.then == 'function' &&
							  r.catch &&
							  typeof r.catch == 'function'
							? v.promise
							: typeof Map < 'u' && r instanceof Map
								? v.map
								: typeof Set < 'u' && r instanceof Set
									? v.set
									: typeof Date < 'u' && r instanceof Date
										? v.date
										: v.object;
			default:
				return v.unknown;
		}
	},
	b = L.arrayToEnum([
		'invalid_type',
		'invalid_literal',
		'custom',
		'invalid_union',
		'invalid_union_discriminator',
		'invalid_enum_value',
		'unrecognized_keys',
		'invalid_arguments',
		'invalid_return_type',
		'invalid_date',
		'invalid_string',
		'too_small',
		'too_big',
		'invalid_intersection_types',
		'not_multiple_of',
		'not_finite',
	]),
	yI = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, '$1:'),
	xe = class r extends Error {
		get errors() {
			return this.issues;
		}
		constructor(e) {
			super(),
				(this.issues = []),
				(this.addIssue = (n) => {
					this.issues = [...this.issues, n];
				}),
				(this.addIssues = (n = []) => {
					this.issues = [...this.issues, ...n];
				});
			let t = new.target.prototype;
			Object.setPrototypeOf
				? Object.setPrototypeOf(this, t)
				: (this.__proto__ = t),
				(this.name = 'ZodError'),
				(this.issues = e);
		}
		format(e) {
			let t =
					e ||
					function (s) {
						return s.message;
					},
				n = {_errors: []},
				i = (s) => {
					for (let o of s.issues)
						if (o.code === 'invalid_union') o.unionErrors.map(i);
						else if (o.code === 'invalid_return_type') i(o.returnTypeError);
						else if (o.code === 'invalid_arguments') i(o.argumentsError);
						else if (o.path.length === 0) n._errors.push(t(o));
						else {
							let a = n,
								u = 0;
							for (; u < o.path.length; ) {
								let c = o.path[u];
								u === o.path.length - 1
									? ((a[c] = a[c] || {_errors: []}), a[c]._errors.push(t(o)))
									: (a[c] = a[c] || {_errors: []}),
									(a = a[c]),
									u++;
							}
						}
				};
			return i(this), n;
		}
		static assert(e) {
			if (!(e instanceof r)) throw new Error(`Not a ZodError: ${e}`);
		}
		toString() {
			return this.message;
		}
		get message() {
			return JSON.stringify(this.issues, L.jsonStringifyReplacer, 2);
		}
		get isEmpty() {
			return this.issues.length === 0;
		}
		flatten(e = (t) => t.message) {
			let t = {},
				n = [];
			for (let i of this.issues)
				i.path.length > 0
					? ((t[i.path[0]] = t[i.path[0]] || []), t[i.path[0]].push(e(i)))
					: n.push(e(i));
			return {formErrors: n, fieldErrors: t};
		}
		get formErrors() {
			return this.flatten();
		}
	};
xe.create = (r) => new xe(r);
var Wr = (r, e) => {
		let t;
		switch (r.code) {
			case b.invalid_type:
				r.received === v.undefined
					? (t = 'Required')
					: (t = `Expected ${r.expected}, received ${r.received}`);
				break;
			case b.invalid_literal:
				t = `Invalid literal value, expected ${JSON.stringify(r.expected, L.jsonStringifyReplacer)}`;
				break;
			case b.unrecognized_keys:
				t = `Unrecognized key(s) in object: ${L.joinValues(r.keys, ', ')}`;
				break;
			case b.invalid_union:
				t = 'Invalid input';
				break;
			case b.invalid_union_discriminator:
				t = `Invalid discriminator value. Expected ${L.joinValues(r.options)}`;
				break;
			case b.invalid_enum_value:
				t = `Invalid enum value. Expected ${L.joinValues(r.options)}, received '${r.received}'`;
				break;
			case b.invalid_arguments:
				t = 'Invalid function arguments';
				break;
			case b.invalid_return_type:
				t = 'Invalid function return type';
				break;
			case b.invalid_date:
				t = 'Invalid date';
				break;
			case b.invalid_string:
				typeof r.validation == 'object'
					? 'includes' in r.validation
						? ((t = `Invalid input: must include "${r.validation.includes}"`),
							typeof r.validation.position == 'number' &&
								(t = `${t} at one or more positions greater than or equal to ${r.validation.position}`))
						: 'startsWith' in r.validation
							? (t = `Invalid input: must start with "${r.validation.startsWith}"`)
							: 'endsWith' in r.validation
								? (t = `Invalid input: must end with "${r.validation.endsWith}"`)
								: L.assertNever(r.validation)
					: r.validation !== 'regex'
						? (t = `Invalid ${r.validation}`)
						: (t = 'Invalid');
				break;
			case b.too_small:
				r.type === 'array'
					? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'more than'} ${r.minimum} element(s)`)
					: r.type === 'string'
						? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'over'} ${r.minimum} character(s)`)
						: r.type === 'number'
							? (t = `Number must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${r.minimum}`)
							: r.type === 'date'
								? (t = `Date must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(r.minimum))}`)
								: (t = 'Invalid input');
				break;
			case b.too_big:
				r.type === 'array'
					? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'less than'} ${r.maximum} element(s)`)
					: r.type === 'string'
						? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'under'} ${r.maximum} character(s)`)
						: r.type === 'number'
							? (t = `Number must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
							: r.type === 'bigint'
								? (t = `BigInt must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
								: r.type === 'date'
									? (t = `Date must be ${r.exact ? 'exactly' : r.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(r.maximum))}`)
									: (t = 'Invalid input');
				break;
			case b.custom:
				t = 'Invalid input';
				break;
			case b.invalid_intersection_types:
				t = 'Intersection results could not be merged';
				break;
			case b.not_multiple_of:
				t = `Number must be a multiple of ${r.multipleOf}`;
				break;
			case b.not_finite:
				t = 'Number must be finite';
				break;
			default:
				(t = e.defaultError), L.assertNever(r);
		}
		return {message: t};
	},
	ap = Wr;
function bI(r) {
	ap = r;
}
function Ts() {
	return ap;
}
var As = (r) => {
		let {data: e, path: t, errorMaps: n, issueData: i} = r,
			s = [...t, ...(i.path || [])],
			o = {...i, path: s};
		if (i.message !== void 0) return {...i, path: s, message: i.message};
		let a = '',
			u = n
				.filter((c) => !!c)
				.slice()
				.reverse();
		for (let c of u) a = c(o, {data: e, defaultError: a}).message;
		return {...i, path: s, message: a};
	},
	_I = [];
function w(r, e) {
	let t = Ts(),
		n = As({
			issueData: e,
			data: r.data,
			path: r.path,
			errorMaps: [
				r.common.contextualErrorMap,
				r.schemaErrorMap,
				t,
				t === Wr ? void 0 : Wr,
			].filter((i) => !!i),
		});
	r.common.issues.push(n);
}
var he = class r {
		constructor() {
			this.value = 'valid';
		}
		dirty() {
			this.value === 'valid' && (this.value = 'dirty');
		}
		abort() {
			this.value !== 'aborted' && (this.value = 'aborted');
		}
		static mergeArray(e, t) {
			let n = [];
			for (let i of t) {
				if (i.status === 'aborted') return S;
				i.status === 'dirty' && e.dirty(), n.push(i.value);
			}
			return {status: e.value, value: n};
		}
		static async mergeObjectAsync(e, t) {
			let n = [];
			for (let i of t) {
				let s = await i.key,
					o = await i.value;
				n.push({key: s, value: o});
			}
			return r.mergeObjectSync(e, n);
		}
		static mergeObjectSync(e, t) {
			let n = {};
			for (let i of t) {
				let {key: s, value: o} = i;
				if (s.status === 'aborted' || o.status === 'aborted') return S;
				s.status === 'dirty' && e.dirty(),
					o.status === 'dirty' && e.dirty(),
					s.value !== '__proto__' &&
						(typeof o.value < 'u' || i.alwaysSet) &&
						(n[s.value] = o.value);
			}
			return {status: e.value, value: n};
		}
	},
	S = Object.freeze({status: 'aborted'}),
	Hr = (r) => ({status: 'dirty', value: r}),
	pe = (r) => ({status: 'valid', value: r}),
	Nu = (r) => r.status === 'aborted',
	Iu = (r) => r.status === 'dirty',
	Wt = (r) => r.status === 'valid',
	ii = (r) => typeof Promise < 'u' && r instanceof Promise;
function Ss(r, e, t, n) {
	if (t === 'a' && !n)
		throw new TypeError('Private accessor was defined without a getter');
	if (typeof e == 'function' ? r !== e || !n : !e.has(r))
		throw new TypeError(
			'Cannot read private member from an object whose class did not declare it'
		);
	return t === 'm' ? n : t === 'a' ? n.call(r) : n ? n.value : e.get(r);
}
function up(r, e, t, n, i) {
	if (n === 'm') throw new TypeError('Private method is not writable');
	if (n === 'a' && !i)
		throw new TypeError('Private accessor was defined without a setter');
	if (typeof e == 'function' ? r !== e || !i : !e.has(r))
		throw new TypeError(
			'Cannot write private member to an object whose class did not declare it'
		);
	return n === 'a' ? i.call(r, t) : i ? (i.value = t) : e.set(r, t), t;
}
var C;
(function (r) {
	(r.errToObj = (e) => (typeof e == 'string' ? {message: e} : e || {})),
		(r.toString = (e) => (typeof e == 'string' ? e : e?.message));
})(C || (C = {}));
var ri,
	ni,
	Re = class {
		constructor(e, t, n, i) {
			(this._cachedPath = []),
				(this.parent = e),
				(this.data = t),
				(this._path = n),
				(this._key = i);
		}
		get path() {
			return (
				this._cachedPath.length ||
					(this._key instanceof Array
						? this._cachedPath.push(...this._path, ...this._key)
						: this._cachedPath.push(...this._path, this._key)),
				this._cachedPath
			);
		}
	},
	sp = (r, e) => {
		if (Wt(e)) return {success: !0, data: e.value};
		if (!r.common.issues.length)
			throw new Error('Validation failed but no issues detected.');
		return {
			success: !1,
			get error() {
				if (this._error) return this._error;
				let t = new xe(r.common.issues);
				return (this._error = t), this._error;
			},
		};
	};
function P(r) {
	if (!r) return {};
	let {
		errorMap: e,
		invalid_type_error: t,
		required_error: n,
		description: i,
	} = r;
	if (e && (t || n))
		throw new Error(
			`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
		);
	return e
		? {errorMap: e, description: i}
		: {
				errorMap: (o, a) => {
					var u, c;
					let {message: h} = r;
					return o.code === 'invalid_enum_value'
						? {message: h ?? a.defaultError}
						: typeof a.data > 'u'
							? {
									message:
										(u = h ?? n) !== null && u !== void 0 ? u : a.defaultError,
								}
							: o.code !== 'invalid_type'
								? {message: a.defaultError}
								: {
										message:
											(c = h ?? t) !== null && c !== void 0
												? c
												: a.defaultError,
									};
				},
				description: i,
			};
}
var I = class {
		get description() {
			return this._def.description;
		}
		_getType(e) {
			return rt(e.data);
		}
		_getOrReturnCtx(e, t) {
			return (
				t || {
					common: e.parent.common,
					data: e.data,
					parsedType: rt(e.data),
					schemaErrorMap: this._def.errorMap,
					path: e.path,
					parent: e.parent,
				}
			);
		}
		_processInputParams(e) {
			return {
				status: new he(),
				ctx: {
					common: e.parent.common,
					data: e.data,
					parsedType: rt(e.data),
					schemaErrorMap: this._def.errorMap,
					path: e.path,
					parent: e.parent,
				},
			};
		}
		_parseSync(e) {
			let t = this._parse(e);
			if (ii(t)) throw new Error('Synchronous parse encountered promise.');
			return t;
		}
		_parseAsync(e) {
			let t = this._parse(e);
			return Promise.resolve(t);
		}
		parse(e, t) {
			let n = this.safeParse(e, t);
			if (n.success) return n.data;
			throw n.error;
		}
		safeParse(e, t) {
			var n;
			let i = {
					common: {
						issues: [],
						async: (n = t?.async) !== null && n !== void 0 ? n : !1,
						contextualErrorMap: t?.errorMap,
					},
					path: t?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: rt(e),
				},
				s = this._parseSync({data: e, path: i.path, parent: i});
			return sp(i, s);
		}
		'~validate'(e) {
			var t, n;
			let i = {
				common: {issues: [], async: !!this['~standard'].async},
				path: [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data: e,
				parsedType: rt(e),
			};
			if (!this['~standard'].async)
				try {
					let s = this._parseSync({data: e, path: [], parent: i});
					return Wt(s) ? {value: s.value} : {issues: i.common.issues};
				} catch (s) {
					!(
						(n =
							(t = s?.message) === null || t === void 0
								? void 0
								: t.toLowerCase()) === null || n === void 0
					) &&
						n.includes('encountered') &&
						(this['~standard'].async = !0),
						(i.common = {issues: [], async: !0});
				}
			return this._parseAsync({data: e, path: [], parent: i}).then((s) =>
				Wt(s) ? {value: s.value} : {issues: i.common.issues}
			);
		}
		async parseAsync(e, t) {
			let n = await this.safeParseAsync(e, t);
			if (n.success) return n.data;
			throw n.error;
		}
		async safeParseAsync(e, t) {
			let n = {
					common: {issues: [], contextualErrorMap: t?.errorMap, async: !0},
					path: t?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data: e,
					parsedType: rt(e),
				},
				i = this._parse({data: e, path: n.path, parent: n}),
				s = await (ii(i) ? i : Promise.resolve(i));
			return sp(n, s);
		}
		refine(e, t) {
			let n = (i) =>
				typeof t == 'string' || typeof t > 'u'
					? {message: t}
					: typeof t == 'function'
						? t(i)
						: t;
			return this._refinement((i, s) => {
				let o = e(i),
					a = () => s.addIssue({code: b.custom, ...n(i)});
				return typeof Promise < 'u' && o instanceof Promise
					? o.then((u) => (u ? !0 : (a(), !1)))
					: o
						? !0
						: (a(), !1);
			});
		}
		refinement(e, t) {
			return this._refinement((n, i) =>
				e(n) ? !0 : (i.addIssue(typeof t == 'function' ? t(n, i) : t), !1)
			);
		}
		_refinement(e) {
			return new Ce({
				schema: this,
				typeName: A.ZodEffects,
				effect: {type: 'refinement', refinement: e},
			});
		}
		superRefine(e) {
			return this._refinement(e);
		}
		constructor(e) {
			(this.spa = this.safeParseAsync),
				(this._def = e),
				(this.parse = this.parse.bind(this)),
				(this.safeParse = this.safeParse.bind(this)),
				(this.parseAsync = this.parseAsync.bind(this)),
				(this.safeParseAsync = this.safeParseAsync.bind(this)),
				(this.spa = this.spa.bind(this)),
				(this.refine = this.refine.bind(this)),
				(this.refinement = this.refinement.bind(this)),
				(this.superRefine = this.superRefine.bind(this)),
				(this.optional = this.optional.bind(this)),
				(this.nullable = this.nullable.bind(this)),
				(this.nullish = this.nullish.bind(this)),
				(this.array = this.array.bind(this)),
				(this.promise = this.promise.bind(this)),
				(this.or = this.or.bind(this)),
				(this.and = this.and.bind(this)),
				(this.transform = this.transform.bind(this)),
				(this.brand = this.brand.bind(this)),
				(this.default = this.default.bind(this)),
				(this.catch = this.catch.bind(this)),
				(this.describe = this.describe.bind(this)),
				(this.pipe = this.pipe.bind(this)),
				(this.readonly = this.readonly.bind(this)),
				(this.isNullable = this.isNullable.bind(this)),
				(this.isOptional = this.isOptional.bind(this)),
				(this['~standard'] = {
					version: 1,
					vendor: 'zod',
					validate: (t) => this['~validate'](t),
				});
		}
		optional() {
			return Oe.create(this, this._def);
		}
		nullable() {
			return Je.create(this, this._def);
		}
		nullish() {
			return this.nullable().optional();
		}
		array() {
			return it.create(this);
		}
		promise() {
			return _t.create(this, this._def);
		}
		or(e) {
			return Yt.create([this, e], this._def);
		}
		and(e) {
			return Xt.create(this, e, this._def);
		}
		transform(e) {
			return new Ce({
				...P(this._def),
				schema: this,
				typeName: A.ZodEffects,
				effect: {type: 'transform', transform: e},
			});
		}
		default(e) {
			let t = typeof e == 'function' ? e : () => e;
			return new ir({
				...P(this._def),
				innerType: this,
				defaultValue: t,
				typeName: A.ZodDefault,
			});
		}
		brand() {
			return new si({typeName: A.ZodBranded, type: this, ...P(this._def)});
		}
		catch(e) {
			let t = typeof e == 'function' ? e : () => e;
			return new sr({
				...P(this._def),
				innerType: this,
				catchValue: t,
				typeName: A.ZodCatch,
			});
		}
		describe(e) {
			let t = this.constructor;
			return new t({...this._def, description: e});
		}
		pipe(e) {
			return oi.create(this, e);
		}
		readonly() {
			return or.create(this);
		}
		isOptional() {
			return this.safeParse(void 0).success;
		}
		isNullable() {
			return this.safeParse(null).success;
		}
	},
	wI = /^c[^\s-]{8,}$/i,
	vI = /^[0-9a-z]+$/,
	EI = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
	xI =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
	CI = /^[a-z0-9_-]{21}$/i,
	qI = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
	TI =
		/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
	AI =
		/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
	SI = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$',
	Ou,
	OI =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	RI =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	NI =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
	II =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	PI = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	kI = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	cp =
		'((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
	$I = new RegExp(`^${cp}$`);
function lp(r) {
	let e = '([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d';
	return (
		r.precision
			? (e = `${e}\\.\\d{${r.precision}}`)
			: r.precision == null && (e = `${e}(\\.\\d+)?`),
		e
	);
}
function MI(r) {
	return new RegExp(`^${lp(r)}$`);
}
function hp(r) {
	let e = `${cp}T${lp(r)}`,
		t = [];
	return (
		t.push(r.local ? 'Z?' : 'Z'),
		r.offset && t.push('([+-]\\d{2}:?\\d{2})'),
		(e = `${e}(${t.join('|')})`),
		new RegExp(`^${e}$`)
	);
}
function jI(r, e) {
	return !!(
		((e === 'v4' || !e) && OI.test(r)) ||
		((e === 'v6' || !e) && NI.test(r))
	);
}
function LI(r, e) {
	if (!qI.test(r)) return !1;
	try {
		let [t] = r.split('.'),
			n = t
				.replace(/-/g, '+')
				.replace(/_/g, '/')
				.padEnd(t.length + ((4 - (t.length % 4)) % 4), '='),
			i = JSON.parse(atob(n));
		return !(
			typeof i != 'object' ||
			i === null ||
			!i.typ ||
			!i.alg ||
			(e && i.alg !== e)
		);
	} catch {
		return !1;
	}
}
function BI(r, e) {
	return !!(
		((e === 'v4' || !e) && RI.test(r)) ||
		((e === 'v6' || !e) && II.test(r))
	);
}
var yt = class r extends I {
	_parse(e) {
		if (
			(this._def.coerce && (e.data = String(e.data)),
			this._getType(e) !== v.string)
		) {
			let s = this._getOrReturnCtx(e);
			return (
				w(s, {
					code: b.invalid_type,
					expected: v.string,
					received: s.parsedType,
				}),
				S
			);
		}
		let n = new he(),
			i;
		for (let s of this._def.checks)
			if (s.kind === 'min')
				e.data.length < s.value &&
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						code: b.too_small,
						minimum: s.value,
						type: 'string',
						inclusive: !0,
						exact: !1,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'max')
				e.data.length > s.value &&
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						code: b.too_big,
						maximum: s.value,
						type: 'string',
						inclusive: !0,
						exact: !1,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'length') {
				let o = e.data.length > s.value,
					a = e.data.length < s.value;
				(o || a) &&
					((i = this._getOrReturnCtx(e, i)),
					o
						? w(i, {
								code: b.too_big,
								maximum: s.value,
								type: 'string',
								inclusive: !0,
								exact: !0,
								message: s.message,
							})
						: a &&
							w(i, {
								code: b.too_small,
								minimum: s.value,
								type: 'string',
								inclusive: !0,
								exact: !0,
								message: s.message,
							}),
					n.dirty());
			} else if (s.kind === 'email')
				AI.test(e.data) ||
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						validation: 'email',
						code: b.invalid_string,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'emoji')
				Ou || (Ou = new RegExp(SI, 'u')),
					Ou.test(e.data) ||
						((i = this._getOrReturnCtx(e, i)),
						w(i, {
							validation: 'emoji',
							code: b.invalid_string,
							message: s.message,
						}),
						n.dirty());
			else if (s.kind === 'uuid')
				xI.test(e.data) ||
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						validation: 'uuid',
						code: b.invalid_string,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'nanoid')
				CI.test(e.data) ||
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						validation: 'nanoid',
						code: b.invalid_string,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'cuid')
				wI.test(e.data) ||
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						validation: 'cuid',
						code: b.invalid_string,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'cuid2')
				vI.test(e.data) ||
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						validation: 'cuid2',
						code: b.invalid_string,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'ulid')
				EI.test(e.data) ||
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						validation: 'ulid',
						code: b.invalid_string,
						message: s.message,
					}),
					n.dirty());
			else if (s.kind === 'url')
				try {
					new URL(e.data);
				} catch {
					(i = this._getOrReturnCtx(e, i)),
						w(i, {
							validation: 'url',
							code: b.invalid_string,
							message: s.message,
						}),
						n.dirty();
				}
			else
				s.kind === 'regex'
					? ((s.regex.lastIndex = 0),
						s.regex.test(e.data) ||
							((i = this._getOrReturnCtx(e, i)),
							w(i, {
								validation: 'regex',
								code: b.invalid_string,
								message: s.message,
							}),
							n.dirty()))
					: s.kind === 'trim'
						? (e.data = e.data.trim())
						: s.kind === 'includes'
							? e.data.includes(s.value, s.position) ||
								((i = this._getOrReturnCtx(e, i)),
								w(i, {
									code: b.invalid_string,
									validation: {includes: s.value, position: s.position},
									message: s.message,
								}),
								n.dirty())
							: s.kind === 'toLowerCase'
								? (e.data = e.data.toLowerCase())
								: s.kind === 'toUpperCase'
									? (e.data = e.data.toUpperCase())
									: s.kind === 'startsWith'
										? e.data.startsWith(s.value) ||
											((i = this._getOrReturnCtx(e, i)),
											w(i, {
												code: b.invalid_string,
												validation: {startsWith: s.value},
												message: s.message,
											}),
											n.dirty())
										: s.kind === 'endsWith'
											? e.data.endsWith(s.value) ||
												((i = this._getOrReturnCtx(e, i)),
												w(i, {
													code: b.invalid_string,
													validation: {endsWith: s.value},
													message: s.message,
												}),
												n.dirty())
											: s.kind === 'datetime'
												? hp(s).test(e.data) ||
													((i = this._getOrReturnCtx(e, i)),
													w(i, {
														code: b.invalid_string,
														validation: 'datetime',
														message: s.message,
													}),
													n.dirty())
												: s.kind === 'date'
													? $I.test(e.data) ||
														((i = this._getOrReturnCtx(e, i)),
														w(i, {
															code: b.invalid_string,
															validation: 'date',
															message: s.message,
														}),
														n.dirty())
													: s.kind === 'time'
														? MI(s).test(e.data) ||
															((i = this._getOrReturnCtx(e, i)),
															w(i, {
																code: b.invalid_string,
																validation: 'time',
																message: s.message,
															}),
															n.dirty())
														: s.kind === 'duration'
															? TI.test(e.data) ||
																((i = this._getOrReturnCtx(e, i)),
																w(i, {
																	validation: 'duration',
																	code: b.invalid_string,
																	message: s.message,
																}),
																n.dirty())
															: s.kind === 'ip'
																? jI(e.data, s.version) ||
																	((i = this._getOrReturnCtx(e, i)),
																	w(i, {
																		validation: 'ip',
																		code: b.invalid_string,
																		message: s.message,
																	}),
																	n.dirty())
																: s.kind === 'jwt'
																	? LI(e.data, s.alg) ||
																		((i = this._getOrReturnCtx(e, i)),
																		w(i, {
																			validation: 'jwt',
																			code: b.invalid_string,
																			message: s.message,
																		}),
																		n.dirty())
																	: s.kind === 'cidr'
																		? BI(e.data, s.version) ||
																			((i = this._getOrReturnCtx(e, i)),
																			w(i, {
																				validation: 'cidr',
																				code: b.invalid_string,
																				message: s.message,
																			}),
																			n.dirty())
																		: s.kind === 'base64'
																			? PI.test(e.data) ||
																				((i = this._getOrReturnCtx(e, i)),
																				w(i, {
																					validation: 'base64',
																					code: b.invalid_string,
																					message: s.message,
																				}),
																				n.dirty())
																			: s.kind === 'base64url'
																				? kI.test(e.data) ||
																					((i = this._getOrReturnCtx(e, i)),
																					w(i, {
																						validation: 'base64url',
																						code: b.invalid_string,
																						message: s.message,
																					}),
																					n.dirty())
																				: L.assertNever(s);
		return {status: n.value, value: e.data};
	}
	_regex(e, t, n) {
		return this.refinement((i) => e.test(i), {
			validation: t,
			code: b.invalid_string,
			...C.errToObj(n),
		});
	}
	_addCheck(e) {
		return new r({...this._def, checks: [...this._def.checks, e]});
	}
	email(e) {
		return this._addCheck({kind: 'email', ...C.errToObj(e)});
	}
	url(e) {
		return this._addCheck({kind: 'url', ...C.errToObj(e)});
	}
	emoji(e) {
		return this._addCheck({kind: 'emoji', ...C.errToObj(e)});
	}
	uuid(e) {
		return this._addCheck({kind: 'uuid', ...C.errToObj(e)});
	}
	nanoid(e) {
		return this._addCheck({kind: 'nanoid', ...C.errToObj(e)});
	}
	cuid(e) {
		return this._addCheck({kind: 'cuid', ...C.errToObj(e)});
	}
	cuid2(e) {
		return this._addCheck({kind: 'cuid2', ...C.errToObj(e)});
	}
	ulid(e) {
		return this._addCheck({kind: 'ulid', ...C.errToObj(e)});
	}
	base64(e) {
		return this._addCheck({kind: 'base64', ...C.errToObj(e)});
	}
	base64url(e) {
		return this._addCheck({kind: 'base64url', ...C.errToObj(e)});
	}
	jwt(e) {
		return this._addCheck({kind: 'jwt', ...C.errToObj(e)});
	}
	ip(e) {
		return this._addCheck({kind: 'ip', ...C.errToObj(e)});
	}
	cidr(e) {
		return this._addCheck({kind: 'cidr', ...C.errToObj(e)});
	}
	datetime(e) {
		var t, n;
		return typeof e == 'string'
			? this._addCheck({
					kind: 'datetime',
					precision: null,
					offset: !1,
					local: !1,
					message: e,
				})
			: this._addCheck({
					kind: 'datetime',
					precision: typeof e?.precision > 'u' ? null : e?.precision,
					offset: (t = e?.offset) !== null && t !== void 0 ? t : !1,
					local: (n = e?.local) !== null && n !== void 0 ? n : !1,
					...C.errToObj(e?.message),
				});
	}
	date(e) {
		return this._addCheck({kind: 'date', message: e});
	}
	time(e) {
		return typeof e == 'string'
			? this._addCheck({kind: 'time', precision: null, message: e})
			: this._addCheck({
					kind: 'time',
					precision: typeof e?.precision > 'u' ? null : e?.precision,
					...C.errToObj(e?.message),
				});
	}
	duration(e) {
		return this._addCheck({kind: 'duration', ...C.errToObj(e)});
	}
	regex(e, t) {
		return this._addCheck({kind: 'regex', regex: e, ...C.errToObj(t)});
	}
	includes(e, t) {
		return this._addCheck({
			kind: 'includes',
			value: e,
			position: t?.position,
			...C.errToObj(t?.message),
		});
	}
	startsWith(e, t) {
		return this._addCheck({kind: 'startsWith', value: e, ...C.errToObj(t)});
	}
	endsWith(e, t) {
		return this._addCheck({kind: 'endsWith', value: e, ...C.errToObj(t)});
	}
	min(e, t) {
		return this._addCheck({kind: 'min', value: e, ...C.errToObj(t)});
	}
	max(e, t) {
		return this._addCheck({kind: 'max', value: e, ...C.errToObj(t)});
	}
	length(e, t) {
		return this._addCheck({kind: 'length', value: e, ...C.errToObj(t)});
	}
	nonempty(e) {
		return this.min(1, C.errToObj(e));
	}
	trim() {
		return new r({...this._def, checks: [...this._def.checks, {kind: 'trim'}]});
	}
	toLowerCase() {
		return new r({
			...this._def,
			checks: [...this._def.checks, {kind: 'toLowerCase'}],
		});
	}
	toUpperCase() {
		return new r({
			...this._def,
			checks: [...this._def.checks, {kind: 'toUpperCase'}],
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((e) => e.kind === 'datetime');
	}
	get isDate() {
		return !!this._def.checks.find((e) => e.kind === 'date');
	}
	get isTime() {
		return !!this._def.checks.find((e) => e.kind === 'time');
	}
	get isDuration() {
		return !!this._def.checks.find((e) => e.kind === 'duration');
	}
	get isEmail() {
		return !!this._def.checks.find((e) => e.kind === 'email');
	}
	get isURL() {
		return !!this._def.checks.find((e) => e.kind === 'url');
	}
	get isEmoji() {
		return !!this._def.checks.find((e) => e.kind === 'emoji');
	}
	get isUUID() {
		return !!this._def.checks.find((e) => e.kind === 'uuid');
	}
	get isNANOID() {
		return !!this._def.checks.find((e) => e.kind === 'nanoid');
	}
	get isCUID() {
		return !!this._def.checks.find((e) => e.kind === 'cuid');
	}
	get isCUID2() {
		return !!this._def.checks.find((e) => e.kind === 'cuid2');
	}
	get isULID() {
		return !!this._def.checks.find((e) => e.kind === 'ulid');
	}
	get isIP() {
		return !!this._def.checks.find((e) => e.kind === 'ip');
	}
	get isCIDR() {
		return !!this._def.checks.find((e) => e.kind === 'cidr');
	}
	get isBase64() {
		return !!this._def.checks.find((e) => e.kind === 'base64');
	}
	get isBase64url() {
		return !!this._def.checks.find((e) => e.kind === 'base64url');
	}
	get minLength() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
yt.create = (r) => {
	var e;
	return new yt({
		checks: [],
		typeName: A.ZodString,
		coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
		...P(r),
	});
};
function DI(r, e) {
	let t = (r.toString().split('.')[1] || '').length,
		n = (e.toString().split('.')[1] || '').length,
		i = t > n ? t : n,
		s = parseInt(r.toFixed(i).replace('.', '')),
		o = parseInt(e.toFixed(i).replace('.', ''));
	return (s % o) / Math.pow(10, i);
}
var Vt = class r extends I {
	constructor() {
		super(...arguments),
			(this.min = this.gte),
			(this.max = this.lte),
			(this.step = this.multipleOf);
	}
	_parse(e) {
		if (
			(this._def.coerce && (e.data = Number(e.data)),
			this._getType(e) !== v.number)
		) {
			let s = this._getOrReturnCtx(e);
			return (
				w(s, {
					code: b.invalid_type,
					expected: v.number,
					received: s.parsedType,
				}),
				S
			);
		}
		let n,
			i = new he();
		for (let s of this._def.checks)
			s.kind === 'int'
				? L.isInteger(e.data) ||
					((n = this._getOrReturnCtx(e, n)),
					w(n, {
						code: b.invalid_type,
						expected: 'integer',
						received: 'float',
						message: s.message,
					}),
					i.dirty())
				: s.kind === 'min'
					? (s.inclusive ? e.data < s.value : e.data <= s.value) &&
						((n = this._getOrReturnCtx(e, n)),
						w(n, {
							code: b.too_small,
							minimum: s.value,
							type: 'number',
							inclusive: s.inclusive,
							exact: !1,
							message: s.message,
						}),
						i.dirty())
					: s.kind === 'max'
						? (s.inclusive ? e.data > s.value : e.data >= s.value) &&
							((n = this._getOrReturnCtx(e, n)),
							w(n, {
								code: b.too_big,
								maximum: s.value,
								type: 'number',
								inclusive: s.inclusive,
								exact: !1,
								message: s.message,
							}),
							i.dirty())
						: s.kind === 'multipleOf'
							? DI(e.data, s.value) !== 0 &&
								((n = this._getOrReturnCtx(e, n)),
								w(n, {
									code: b.not_multiple_of,
									multipleOf: s.value,
									message: s.message,
								}),
								i.dirty())
							: s.kind === 'finite'
								? Number.isFinite(e.data) ||
									((n = this._getOrReturnCtx(e, n)),
									w(n, {code: b.not_finite, message: s.message}),
									i.dirty())
								: L.assertNever(s);
		return {status: i.value, value: e.data};
	}
	gte(e, t) {
		return this.setLimit('min', e, !0, C.toString(t));
	}
	gt(e, t) {
		return this.setLimit('min', e, !1, C.toString(t));
	}
	lte(e, t) {
		return this.setLimit('max', e, !0, C.toString(t));
	}
	lt(e, t) {
		return this.setLimit('max', e, !1, C.toString(t));
	}
	setLimit(e, t, n, i) {
		return new r({
			...this._def,
			checks: [
				...this._def.checks,
				{kind: e, value: t, inclusive: n, message: C.toString(i)},
			],
		});
	}
	_addCheck(e) {
		return new r({...this._def, checks: [...this._def.checks, e]});
	}
	int(e) {
		return this._addCheck({kind: 'int', message: C.toString(e)});
	}
	positive(e) {
		return this._addCheck({
			kind: 'min',
			value: 0,
			inclusive: !1,
			message: C.toString(e),
		});
	}
	negative(e) {
		return this._addCheck({
			kind: 'max',
			value: 0,
			inclusive: !1,
			message: C.toString(e),
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: 'max',
			value: 0,
			inclusive: !0,
			message: C.toString(e),
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: 'min',
			value: 0,
			inclusive: !0,
			message: C.toString(e),
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: 'multipleOf',
			value: e,
			message: C.toString(t),
		});
	}
	finite(e) {
		return this._addCheck({kind: 'finite', message: C.toString(e)});
	}
	safe(e) {
		return this._addCheck({
			kind: 'min',
			inclusive: !0,
			value: Number.MIN_SAFE_INTEGER,
			message: C.toString(e),
		})._addCheck({
			kind: 'max',
			inclusive: !0,
			value: Number.MAX_SAFE_INTEGER,
			message: C.toString(e),
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find(
			(e) =>
				e.kind === 'int' || (e.kind === 'multipleOf' && L.isInteger(e.value))
		);
	}
	get isFinite() {
		let e = null,
			t = null;
		for (let n of this._def.checks) {
			if (n.kind === 'finite' || n.kind === 'int' || n.kind === 'multipleOf')
				return !0;
			n.kind === 'min'
				? (t === null || n.value > t) && (t = n.value)
				: n.kind === 'max' && (e === null || n.value < e) && (e = n.value);
		}
		return Number.isFinite(t) && Number.isFinite(e);
	}
};
Vt.create = (r) =>
	new Vt({checks: [], typeName: A.ZodNumber, coerce: r?.coerce || !1, ...P(r)});
var Gt = class r extends I {
	constructor() {
		super(...arguments), (this.min = this.gte), (this.max = this.lte);
	}
	_parse(e) {
		if (this._def.coerce)
			try {
				e.data = BigInt(e.data);
			} catch {
				return this._getInvalidInput(e);
			}
		if (this._getType(e) !== v.bigint) return this._getInvalidInput(e);
		let n,
			i = new he();
		for (let s of this._def.checks)
			s.kind === 'min'
				? (s.inclusive ? e.data < s.value : e.data <= s.value) &&
					((n = this._getOrReturnCtx(e, n)),
					w(n, {
						code: b.too_small,
						type: 'bigint',
						minimum: s.value,
						inclusive: s.inclusive,
						message: s.message,
					}),
					i.dirty())
				: s.kind === 'max'
					? (s.inclusive ? e.data > s.value : e.data >= s.value) &&
						((n = this._getOrReturnCtx(e, n)),
						w(n, {
							code: b.too_big,
							type: 'bigint',
							maximum: s.value,
							inclusive: s.inclusive,
							message: s.message,
						}),
						i.dirty())
					: s.kind === 'multipleOf'
						? e.data % s.value !== BigInt(0) &&
							((n = this._getOrReturnCtx(e, n)),
							w(n, {
								code: b.not_multiple_of,
								multipleOf: s.value,
								message: s.message,
							}),
							i.dirty())
						: L.assertNever(s);
		return {status: i.value, value: e.data};
	}
	_getInvalidInput(e) {
		let t = this._getOrReturnCtx(e);
		return (
			w(t, {code: b.invalid_type, expected: v.bigint, received: t.parsedType}),
			S
		);
	}
	gte(e, t) {
		return this.setLimit('min', e, !0, C.toString(t));
	}
	gt(e, t) {
		return this.setLimit('min', e, !1, C.toString(t));
	}
	lte(e, t) {
		return this.setLimit('max', e, !0, C.toString(t));
	}
	lt(e, t) {
		return this.setLimit('max', e, !1, C.toString(t));
	}
	setLimit(e, t, n, i) {
		return new r({
			...this._def,
			checks: [
				...this._def.checks,
				{kind: e, value: t, inclusive: n, message: C.toString(i)},
			],
		});
	}
	_addCheck(e) {
		return new r({...this._def, checks: [...this._def.checks, e]});
	}
	positive(e) {
		return this._addCheck({
			kind: 'min',
			value: BigInt(0),
			inclusive: !1,
			message: C.toString(e),
		});
	}
	negative(e) {
		return this._addCheck({
			kind: 'max',
			value: BigInt(0),
			inclusive: !1,
			message: C.toString(e),
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: 'max',
			value: BigInt(0),
			inclusive: !0,
			message: C.toString(e),
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: 'min',
			value: BigInt(0),
			inclusive: !0,
			message: C.toString(e),
		});
	}
	multipleOf(e, t) {
		return this._addCheck({
			kind: 'multipleOf',
			value: e,
			message: C.toString(t),
		});
	}
	get minValue() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e;
	}
};
Gt.create = (r) => {
	var e;
	return new Gt({
		checks: [],
		typeName: A.ZodBigInt,
		coerce: (e = r?.coerce) !== null && e !== void 0 ? e : !1,
		...P(r),
	});
};
var Jt = class extends I {
	_parse(e) {
		if (
			(this._def.coerce && (e.data = !!e.data), this._getType(e) !== v.boolean)
		) {
			let n = this._getOrReturnCtx(e);
			return (
				w(n, {
					code: b.invalid_type,
					expected: v.boolean,
					received: n.parsedType,
				}),
				S
			);
		}
		return pe(e.data);
	}
};
Jt.create = (r) =>
	new Jt({typeName: A.ZodBoolean, coerce: r?.coerce || !1, ...P(r)});
var Kt = class r extends I {
	_parse(e) {
		if (
			(this._def.coerce && (e.data = new Date(e.data)),
			this._getType(e) !== v.date)
		) {
			let s = this._getOrReturnCtx(e);
			return (
				w(s, {code: b.invalid_type, expected: v.date, received: s.parsedType}),
				S
			);
		}
		if (isNaN(e.data.getTime())) {
			let s = this._getOrReturnCtx(e);
			return w(s, {code: b.invalid_date}), S;
		}
		let n = new he(),
			i;
		for (let s of this._def.checks)
			s.kind === 'min'
				? e.data.getTime() < s.value &&
					((i = this._getOrReturnCtx(e, i)),
					w(i, {
						code: b.too_small,
						message: s.message,
						inclusive: !0,
						exact: !1,
						minimum: s.value,
						type: 'date',
					}),
					n.dirty())
				: s.kind === 'max'
					? e.data.getTime() > s.value &&
						((i = this._getOrReturnCtx(e, i)),
						w(i, {
							code: b.too_big,
							message: s.message,
							inclusive: !0,
							exact: !1,
							maximum: s.value,
							type: 'date',
						}),
						n.dirty())
					: L.assertNever(s);
		return {status: n.value, value: new Date(e.data.getTime())};
	}
	_addCheck(e) {
		return new r({...this._def, checks: [...this._def.checks, e]});
	}
	min(e, t) {
		return this._addCheck({
			kind: 'min',
			value: e.getTime(),
			message: C.toString(t),
		});
	}
	max(e, t) {
		return this._addCheck({
			kind: 'max',
			value: e.getTime(),
			message: C.toString(t),
		});
	}
	get minDate() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e != null ? new Date(e) : null;
	}
	get maxDate() {
		let e = null;
		for (let t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e != null ? new Date(e) : null;
	}
};
Kt.create = (r) =>
	new Kt({checks: [], coerce: r?.coerce || !1, typeName: A.ZodDate, ...P(r)});
var Vr = class extends I {
	_parse(e) {
		if (this._getType(e) !== v.symbol) {
			let n = this._getOrReturnCtx(e);
			return (
				w(n, {
					code: b.invalid_type,
					expected: v.symbol,
					received: n.parsedType,
				}),
				S
			);
		}
		return pe(e.data);
	}
};
Vr.create = (r) => new Vr({typeName: A.ZodSymbol, ...P(r)});
var zt = class extends I {
	_parse(e) {
		if (this._getType(e) !== v.undefined) {
			let n = this._getOrReturnCtx(e);
			return (
				w(n, {
					code: b.invalid_type,
					expected: v.undefined,
					received: n.parsedType,
				}),
				S
			);
		}
		return pe(e.data);
	}
};
zt.create = (r) => new zt({typeName: A.ZodUndefined, ...P(r)});
var Zt = class extends I {
	_parse(e) {
		if (this._getType(e) !== v.null) {
			let n = this._getOrReturnCtx(e);
			return (
				w(n, {code: b.invalid_type, expected: v.null, received: n.parsedType}),
				S
			);
		}
		return pe(e.data);
	}
};
Zt.create = (r) => new Zt({typeName: A.ZodNull, ...P(r)});
var bt = class extends I {
	constructor() {
		super(...arguments), (this._any = !0);
	}
	_parse(e) {
		return pe(e.data);
	}
};
bt.create = (r) => new bt({typeName: A.ZodAny, ...P(r)});
var nt = class extends I {
	constructor() {
		super(...arguments), (this._unknown = !0);
	}
	_parse(e) {
		return pe(e.data);
	}
};
nt.create = (r) => new nt({typeName: A.ZodUnknown, ...P(r)});
var je = class extends I {
	_parse(e) {
		let t = this._getOrReturnCtx(e);
		return (
			w(t, {code: b.invalid_type, expected: v.never, received: t.parsedType}), S
		);
	}
};
je.create = (r) => new je({typeName: A.ZodNever, ...P(r)});
var Gr = class extends I {
	_parse(e) {
		if (this._getType(e) !== v.undefined) {
			let n = this._getOrReturnCtx(e);
			return (
				w(n, {code: b.invalid_type, expected: v.void, received: n.parsedType}),
				S
			);
		}
		return pe(e.data);
	}
};
Gr.create = (r) => new Gr({typeName: A.ZodVoid, ...P(r)});
var it = class r extends I {
	_parse(e) {
		let {ctx: t, status: n} = this._processInputParams(e),
			i = this._def;
		if (t.parsedType !== v.array)
			return (
				w(t, {code: b.invalid_type, expected: v.array, received: t.parsedType}),
				S
			);
		if (i.exactLength !== null) {
			let o = t.data.length > i.exactLength.value,
				a = t.data.length < i.exactLength.value;
			(o || a) &&
				(w(t, {
					code: o ? b.too_big : b.too_small,
					minimum: a ? i.exactLength.value : void 0,
					maximum: o ? i.exactLength.value : void 0,
					type: 'array',
					inclusive: !0,
					exact: !0,
					message: i.exactLength.message,
				}),
				n.dirty());
		}
		if (
			(i.minLength !== null &&
				t.data.length < i.minLength.value &&
				(w(t, {
					code: b.too_small,
					minimum: i.minLength.value,
					type: 'array',
					inclusive: !0,
					exact: !1,
					message: i.minLength.message,
				}),
				n.dirty()),
			i.maxLength !== null &&
				t.data.length > i.maxLength.value &&
				(w(t, {
					code: b.too_big,
					maximum: i.maxLength.value,
					type: 'array',
					inclusive: !0,
					exact: !1,
					message: i.maxLength.message,
				}),
				n.dirty()),
			t.common.async)
		)
			return Promise.all(
				[...t.data].map((o, a) => i.type._parseAsync(new Re(t, o, t.path, a)))
			).then((o) => he.mergeArray(n, o));
		let s = [...t.data].map((o, a) =>
			i.type._parseSync(new Re(t, o, t.path, a))
		);
		return he.mergeArray(n, s);
	}
	get element() {
		return this._def.type;
	}
	min(e, t) {
		return new r({...this._def, minLength: {value: e, message: C.toString(t)}});
	}
	max(e, t) {
		return new r({...this._def, maxLength: {value: e, message: C.toString(t)}});
	}
	length(e, t) {
		return new r({
			...this._def,
			exactLength: {value: e, message: C.toString(t)},
		});
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
it.create = (r, e) =>
	new it({
		type: r,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: A.ZodArray,
		...P(e),
	});
function Qr(r) {
	if (r instanceof de) {
		let e = {};
		for (let t in r.shape) {
			let n = r.shape[t];
			e[t] = Oe.create(Qr(n));
		}
		return new de({...r._def, shape: () => e});
	} else
		return r instanceof it
			? new it({...r._def, type: Qr(r.element)})
			: r instanceof Oe
				? Oe.create(Qr(r.unwrap()))
				: r instanceof Je
					? Je.create(Qr(r.unwrap()))
					: r instanceof Ge
						? Ge.create(r.items.map((e) => Qr(e)))
						: r;
}
var de = class r extends I {
	constructor() {
		super(...arguments),
			(this._cached = null),
			(this.nonstrict = this.passthrough),
			(this.augment = this.extend);
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let e = this._def.shape(),
			t = L.objectKeys(e);
		return (this._cached = {shape: e, keys: t});
	}
	_parse(e) {
		if (this._getType(e) !== v.object) {
			let c = this._getOrReturnCtx(e);
			return (
				w(c, {
					code: b.invalid_type,
					expected: v.object,
					received: c.parsedType,
				}),
				S
			);
		}
		let {status: n, ctx: i} = this._processInputParams(e),
			{shape: s, keys: o} = this._getCached(),
			a = [];
		if (
			!(this._def.catchall instanceof je && this._def.unknownKeys === 'strip')
		)
			for (let c in i.data) o.includes(c) || a.push(c);
		let u = [];
		for (let c of o) {
			let h = s[c],
				d = i.data[c];
			u.push({
				key: {status: 'valid', value: c},
				value: h._parse(new Re(i, d, i.path, c)),
				alwaysSet: c in i.data,
			});
		}
		if (this._def.catchall instanceof je) {
			let c = this._def.unknownKeys;
			if (c === 'passthrough')
				for (let h of a)
					u.push({
						key: {status: 'valid', value: h},
						value: {status: 'valid', value: i.data[h]},
					});
			else if (c === 'strict')
				a.length > 0 && (w(i, {code: b.unrecognized_keys, keys: a}), n.dirty());
			else if (c !== 'strip')
				throw new Error('Internal ZodObject error: invalid unknownKeys value.');
		} else {
			let c = this._def.catchall;
			for (let h of a) {
				let d = i.data[h];
				u.push({
					key: {status: 'valid', value: h},
					value: c._parse(new Re(i, d, i.path, h)),
					alwaysSet: h in i.data,
				});
			}
		}
		return i.common.async
			? Promise.resolve()
					.then(async () => {
						let c = [];
						for (let h of u) {
							let d = await h.key,
								f = await h.value;
							c.push({key: d, value: f, alwaysSet: h.alwaysSet});
						}
						return c;
					})
					.then((c) => he.mergeObjectSync(n, c))
			: he.mergeObjectSync(n, u);
	}
	get shape() {
		return this._def.shape();
	}
	strict(e) {
		return (
			C.errToObj,
			new r({
				...this._def,
				unknownKeys: 'strict',
				...(e !== void 0
					? {
							errorMap: (t, n) => {
								var i, s, o, a;
								let u =
									(o =
										(s = (i = this._def).errorMap) === null || s === void 0
											? void 0
											: s.call(i, t, n).message) !== null && o !== void 0
										? o
										: n.defaultError;
								return t.code === 'unrecognized_keys'
									? {
											message:
												(a = C.errToObj(e).message) !== null && a !== void 0
													? a
													: u,
										}
									: {message: u};
							},
						}
					: {}),
			})
		);
	}
	strip() {
		return new r({...this._def, unknownKeys: 'strip'});
	}
	passthrough() {
		return new r({...this._def, unknownKeys: 'passthrough'});
	}
	extend(e) {
		return new r({...this._def, shape: () => ({...this._def.shape(), ...e})});
	}
	merge(e) {
		return new r({
			unknownKeys: e._def.unknownKeys,
			catchall: e._def.catchall,
			shape: () => ({...this._def.shape(), ...e._def.shape()}),
			typeName: A.ZodObject,
		});
	}
	setKey(e, t) {
		return this.augment({[e]: t});
	}
	catchall(e) {
		return new r({...this._def, catchall: e});
	}
	pick(e) {
		let t = {};
		return (
			L.objectKeys(e).forEach((n) => {
				e[n] && this.shape[n] && (t[n] = this.shape[n]);
			}),
			new r({...this._def, shape: () => t})
		);
	}
	omit(e) {
		let t = {};
		return (
			L.objectKeys(this.shape).forEach((n) => {
				e[n] || (t[n] = this.shape[n]);
			}),
			new r({...this._def, shape: () => t})
		);
	}
	deepPartial() {
		return Qr(this);
	}
	partial(e) {
		let t = {};
		return (
			L.objectKeys(this.shape).forEach((n) => {
				let i = this.shape[n];
				e && !e[n] ? (t[n] = i) : (t[n] = i.optional());
			}),
			new r({...this._def, shape: () => t})
		);
	}
	required(e) {
		let t = {};
		return (
			L.objectKeys(this.shape).forEach((n) => {
				if (e && !e[n]) t[n] = this.shape[n];
				else {
					let s = this.shape[n];
					for (; s instanceof Oe; ) s = s._def.innerType;
					t[n] = s;
				}
			}),
			new r({...this._def, shape: () => t})
		);
	}
	keyof() {
		return dp(L.objectKeys(this.shape));
	}
};
de.create = (r, e) =>
	new de({
		shape: () => r,
		unknownKeys: 'strip',
		catchall: je.create(),
		typeName: A.ZodObject,
		...P(e),
	});
de.strictCreate = (r, e) =>
	new de({
		shape: () => r,
		unknownKeys: 'strict',
		catchall: je.create(),
		typeName: A.ZodObject,
		...P(e),
	});
de.lazycreate = (r, e) =>
	new de({
		shape: r,
		unknownKeys: 'strip',
		catchall: je.create(),
		typeName: A.ZodObject,
		...P(e),
	});
var Yt = class extends I {
	_parse(e) {
		let {ctx: t} = this._processInputParams(e),
			n = this._def.options;
		function i(s) {
			for (let a of s) if (a.result.status === 'valid') return a.result;
			for (let a of s)
				if (a.result.status === 'dirty')
					return t.common.issues.push(...a.ctx.common.issues), a.result;
			let o = s.map((a) => new xe(a.ctx.common.issues));
			return w(t, {code: b.invalid_union, unionErrors: o}), S;
		}
		if (t.common.async)
			return Promise.all(
				n.map(async (s) => {
					let o = {...t, common: {...t.common, issues: []}, parent: null};
					return {
						result: await s._parseAsync({
							data: t.data,
							path: t.path,
							parent: o,
						}),
						ctx: o,
					};
				})
			).then(i);
		{
			let s,
				o = [];
			for (let u of n) {
				let c = {...t, common: {...t.common, issues: []}, parent: null},
					h = u._parseSync({data: t.data, path: t.path, parent: c});
				if (h.status === 'valid') return h;
				h.status === 'dirty' && !s && (s = {result: h, ctx: c}),
					c.common.issues.length && o.push(c.common.issues);
			}
			if (s) return t.common.issues.push(...s.ctx.common.issues), s.result;
			let a = o.map((u) => new xe(u));
			return w(t, {code: b.invalid_union, unionErrors: a}), S;
		}
	}
	get options() {
		return this._def.options;
	}
};
Yt.create = (r, e) => new Yt({options: r, typeName: A.ZodUnion, ...P(e)});
var tt = (r) =>
		r instanceof er
			? tt(r.schema)
			: r instanceof Ce
				? tt(r.innerType())
				: r instanceof tr
					? [r.value]
					: r instanceof rr
						? r.options
						: r instanceof nr
							? L.objectValues(r.enum)
							: r instanceof ir
								? tt(r._def.innerType)
								: r instanceof zt
									? [void 0]
									: r instanceof Zt
										? [null]
										: r instanceof Oe
											? [void 0, ...tt(r.unwrap())]
											: r instanceof Je
												? [null, ...tt(r.unwrap())]
												: r instanceof si || r instanceof or
													? tt(r.unwrap())
													: r instanceof sr
														? tt(r._def.innerType)
														: [],
	Os = class r extends I {
		_parse(e) {
			let {ctx: t} = this._processInputParams(e);
			if (t.parsedType !== v.object)
				return (
					w(t, {
						code: b.invalid_type,
						expected: v.object,
						received: t.parsedType,
					}),
					S
				);
			let n = this.discriminator,
				i = t.data[n],
				s = this.optionsMap.get(i);
			return s
				? t.common.async
					? s._parseAsync({data: t.data, path: t.path, parent: t})
					: s._parseSync({data: t.data, path: t.path, parent: t})
				: (w(t, {
						code: b.invalid_union_discriminator,
						options: Array.from(this.optionsMap.keys()),
						path: [n],
					}),
					S);
		}
		get discriminator() {
			return this._def.discriminator;
		}
		get options() {
			return this._def.options;
		}
		get optionsMap() {
			return this._def.optionsMap;
		}
		static create(e, t, n) {
			let i = new Map();
			for (let s of t) {
				let o = tt(s.shape[e]);
				if (!o.length)
					throw new Error(
						`A discriminator value for key \`${e}\` could not be extracted from all schema options`
					);
				for (let a of o) {
					if (i.has(a))
						throw new Error(
							`Discriminator property ${String(e)} has duplicate value ${String(a)}`
						);
					i.set(a, s);
				}
			}
			return new r({
				typeName: A.ZodDiscriminatedUnion,
				discriminator: e,
				options: t,
				optionsMap: i,
				...P(n),
			});
		}
	};
function Pu(r, e) {
	let t = rt(r),
		n = rt(e);
	if (r === e) return {valid: !0, data: r};
	if (t === v.object && n === v.object) {
		let i = L.objectKeys(e),
			s = L.objectKeys(r).filter((a) => i.indexOf(a) !== -1),
			o = {...r, ...e};
		for (let a of s) {
			let u = Pu(r[a], e[a]);
			if (!u.valid) return {valid: !1};
			o[a] = u.data;
		}
		return {valid: !0, data: o};
	} else if (t === v.array && n === v.array) {
		if (r.length !== e.length) return {valid: !1};
		let i = [];
		for (let s = 0; s < r.length; s++) {
			let o = r[s],
				a = e[s],
				u = Pu(o, a);
			if (!u.valid) return {valid: !1};
			i.push(u.data);
		}
		return {valid: !0, data: i};
	} else
		return t === v.date && n === v.date && +r == +e
			? {valid: !0, data: r}
			: {valid: !1};
}
var Xt = class extends I {
	_parse(e) {
		let {status: t, ctx: n} = this._processInputParams(e),
			i = (s, o) => {
				if (Nu(s) || Nu(o)) return S;
				let a = Pu(s.value, o.value);
				return a.valid
					? ((Iu(s) || Iu(o)) && t.dirty(), {status: t.value, value: a.data})
					: (w(n, {code: b.invalid_intersection_types}), S);
			};
		return n.common.async
			? Promise.all([
					this._def.left._parseAsync({data: n.data, path: n.path, parent: n}),
					this._def.right._parseAsync({data: n.data, path: n.path, parent: n}),
				]).then(([s, o]) => i(s, o))
			: i(
					this._def.left._parseSync({data: n.data, path: n.path, parent: n}),
					this._def.right._parseSync({data: n.data, path: n.path, parent: n})
				);
	}
};
Xt.create = (r, e, t) =>
	new Xt({left: r, right: e, typeName: A.ZodIntersection, ...P(t)});
var Ge = class r extends I {
	_parse(e) {
		let {status: t, ctx: n} = this._processInputParams(e);
		if (n.parsedType !== v.array)
			return (
				w(n, {code: b.invalid_type, expected: v.array, received: n.parsedType}),
				S
			);
		if (n.data.length < this._def.items.length)
			return (
				w(n, {
					code: b.too_small,
					minimum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: 'array',
				}),
				S
			);
		!this._def.rest &&
			n.data.length > this._def.items.length &&
			(w(n, {
				code: b.too_big,
				maximum: this._def.items.length,
				inclusive: !0,
				exact: !1,
				type: 'array',
			}),
			t.dirty());
		let s = [...n.data]
			.map((o, a) => {
				let u = this._def.items[a] || this._def.rest;
				return u ? u._parse(new Re(n, o, n.path, a)) : null;
			})
			.filter((o) => !!o);
		return n.common.async
			? Promise.all(s).then((o) => he.mergeArray(t, o))
			: he.mergeArray(t, s);
	}
	get items() {
		return this._def.items;
	}
	rest(e) {
		return new r({...this._def, rest: e});
	}
};
Ge.create = (r, e) => {
	if (!Array.isArray(r))
		throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
	return new Ge({items: r, typeName: A.ZodTuple, rest: null, ...P(e)});
};
var Rs = class r extends I {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(e) {
			let {status: t, ctx: n} = this._processInputParams(e);
			if (n.parsedType !== v.object)
				return (
					w(n, {
						code: b.invalid_type,
						expected: v.object,
						received: n.parsedType,
					}),
					S
				);
			let i = [],
				s = this._def.keyType,
				o = this._def.valueType;
			for (let a in n.data)
				i.push({
					key: s._parse(new Re(n, a, n.path, a)),
					value: o._parse(new Re(n, n.data[a], n.path, a)),
					alwaysSet: a in n.data,
				});
			return n.common.async
				? he.mergeObjectAsync(t, i)
				: he.mergeObjectSync(t, i);
		}
		get element() {
			return this._def.valueType;
		}
		static create(e, t, n) {
			return t instanceof I
				? new r({keyType: e, valueType: t, typeName: A.ZodRecord, ...P(n)})
				: new r({
						keyType: yt.create(),
						valueType: e,
						typeName: A.ZodRecord,
						...P(t),
					});
		}
	},
	Jr = class extends I {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(e) {
			let {status: t, ctx: n} = this._processInputParams(e);
			if (n.parsedType !== v.map)
				return (
					w(n, {code: b.invalid_type, expected: v.map, received: n.parsedType}),
					S
				);
			let i = this._def.keyType,
				s = this._def.valueType,
				o = [...n.data.entries()].map(([a, u], c) => ({
					key: i._parse(new Re(n, a, n.path, [c, 'key'])),
					value: s._parse(new Re(n, u, n.path, [c, 'value'])),
				}));
			if (n.common.async) {
				let a = new Map();
				return Promise.resolve().then(async () => {
					for (let u of o) {
						let c = await u.key,
							h = await u.value;
						if (c.status === 'aborted' || h.status === 'aborted') return S;
						(c.status === 'dirty' || h.status === 'dirty') && t.dirty(),
							a.set(c.value, h.value);
					}
					return {status: t.value, value: a};
				});
			} else {
				let a = new Map();
				for (let u of o) {
					let c = u.key,
						h = u.value;
					if (c.status === 'aborted' || h.status === 'aborted') return S;
					(c.status === 'dirty' || h.status === 'dirty') && t.dirty(),
						a.set(c.value, h.value);
				}
				return {status: t.value, value: a};
			}
		}
	};
Jr.create = (r, e, t) =>
	new Jr({valueType: e, keyType: r, typeName: A.ZodMap, ...P(t)});
var Kr = class r extends I {
	_parse(e) {
		let {status: t, ctx: n} = this._processInputParams(e);
		if (n.parsedType !== v.set)
			return (
				w(n, {code: b.invalid_type, expected: v.set, received: n.parsedType}), S
			);
		let i = this._def;
		i.minSize !== null &&
			n.data.size < i.minSize.value &&
			(w(n, {
				code: b.too_small,
				minimum: i.minSize.value,
				type: 'set',
				inclusive: !0,
				exact: !1,
				message: i.minSize.message,
			}),
			t.dirty()),
			i.maxSize !== null &&
				n.data.size > i.maxSize.value &&
				(w(n, {
					code: b.too_big,
					maximum: i.maxSize.value,
					type: 'set',
					inclusive: !0,
					exact: !1,
					message: i.maxSize.message,
				}),
				t.dirty());
		let s = this._def.valueType;
		function o(u) {
			let c = new Set();
			for (let h of u) {
				if (h.status === 'aborted') return S;
				h.status === 'dirty' && t.dirty(), c.add(h.value);
			}
			return {status: t.value, value: c};
		}
		let a = [...n.data.values()].map((u, c) =>
			s._parse(new Re(n, u, n.path, c))
		);
		return n.common.async ? Promise.all(a).then((u) => o(u)) : o(a);
	}
	min(e, t) {
		return new r({...this._def, minSize: {value: e, message: C.toString(t)}});
	}
	max(e, t) {
		return new r({...this._def, maxSize: {value: e, message: C.toString(t)}});
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
};
Kr.create = (r, e) =>
	new Kr({
		valueType: r,
		minSize: null,
		maxSize: null,
		typeName: A.ZodSet,
		...P(e),
	});
var Ns = class r extends I {
		constructor() {
			super(...arguments), (this.validate = this.implement);
		}
		_parse(e) {
			let {ctx: t} = this._processInputParams(e);
			if (t.parsedType !== v.function)
				return (
					w(t, {
						code: b.invalid_type,
						expected: v.function,
						received: t.parsedType,
					}),
					S
				);
			function n(a, u) {
				return As({
					data: a,
					path: t.path,
					errorMaps: [
						t.common.contextualErrorMap,
						t.schemaErrorMap,
						Ts(),
						Wr,
					].filter((c) => !!c),
					issueData: {code: b.invalid_arguments, argumentsError: u},
				});
			}
			function i(a, u) {
				return As({
					data: a,
					path: t.path,
					errorMaps: [
						t.common.contextualErrorMap,
						t.schemaErrorMap,
						Ts(),
						Wr,
					].filter((c) => !!c),
					issueData: {code: b.invalid_return_type, returnTypeError: u},
				});
			}
			let s = {errorMap: t.common.contextualErrorMap},
				o = t.data;
			if (this._def.returns instanceof _t) {
				let a = this;
				return pe(async function (...u) {
					let c = new xe([]),
						h = await a._def.args.parseAsync(u, s).catch((m) => {
							throw (c.addIssue(n(u, m)), c);
						}),
						d = await Reflect.apply(o, this, h);
					return await a._def.returns._def.type.parseAsync(d, s).catch((m) => {
						throw (c.addIssue(i(d, m)), c);
					});
				});
			} else {
				let a = this;
				return pe(function (...u) {
					let c = a._def.args.safeParse(u, s);
					if (!c.success) throw new xe([n(u, c.error)]);
					let h = Reflect.apply(o, this, c.data),
						d = a._def.returns.safeParse(h, s);
					if (!d.success) throw new xe([i(h, d.error)]);
					return d.data;
				});
			}
		}
		parameters() {
			return this._def.args;
		}
		returnType() {
			return this._def.returns;
		}
		args(...e) {
			return new r({...this._def, args: Ge.create(e).rest(nt.create())});
		}
		returns(e) {
			return new r({...this._def, returns: e});
		}
		implement(e) {
			return this.parse(e);
		}
		strictImplement(e) {
			return this.parse(e);
		}
		static create(e, t, n) {
			return new r({
				args: e || Ge.create([]).rest(nt.create()),
				returns: t || nt.create(),
				typeName: A.ZodFunction,
				...P(n),
			});
		}
	},
	er = class extends I {
		get schema() {
			return this._def.getter();
		}
		_parse(e) {
			let {ctx: t} = this._processInputParams(e);
			return this._def.getter()._parse({data: t.data, path: t.path, parent: t});
		}
	};
er.create = (r, e) => new er({getter: r, typeName: A.ZodLazy, ...P(e)});
var tr = class extends I {
	_parse(e) {
		if (e.data !== this._def.value) {
			let t = this._getOrReturnCtx(e);
			return (
				w(t, {
					received: t.data,
					code: b.invalid_literal,
					expected: this._def.value,
				}),
				S
			);
		}
		return {status: 'valid', value: e.data};
	}
	get value() {
		return this._def.value;
	}
};
tr.create = (r, e) => new tr({value: r, typeName: A.ZodLiteral, ...P(e)});
function dp(r, e) {
	return new rr({values: r, typeName: A.ZodEnum, ...P(e)});
}
var rr = class r extends I {
	constructor() {
		super(...arguments), ri.set(this, void 0);
	}
	_parse(e) {
		if (typeof e.data != 'string') {
			let t = this._getOrReturnCtx(e),
				n = this._def.values;
			return (
				w(t, {
					expected: L.joinValues(n),
					received: t.parsedType,
					code: b.invalid_type,
				}),
				S
			);
		}
		if (
			(Ss(this, ri, 'f') || up(this, ri, new Set(this._def.values), 'f'),
			!Ss(this, ri, 'f').has(e.data))
		) {
			let t = this._getOrReturnCtx(e),
				n = this._def.values;
			return (
				w(t, {received: t.data, code: b.invalid_enum_value, options: n}), S
			);
		}
		return pe(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		let e = {};
		for (let t of this._def.values) e[t] = t;
		return e;
	}
	extract(e, t = this._def) {
		return r.create(e, {...this._def, ...t});
	}
	exclude(e, t = this._def) {
		return r.create(
			this.options.filter((n) => !e.includes(n)),
			{...this._def, ...t}
		);
	}
};
ri = new WeakMap();
rr.create = dp;
var nr = class extends I {
	constructor() {
		super(...arguments), ni.set(this, void 0);
	}
	_parse(e) {
		let t = L.getValidEnumValues(this._def.values),
			n = this._getOrReturnCtx(e);
		if (n.parsedType !== v.string && n.parsedType !== v.number) {
			let i = L.objectValues(t);
			return (
				w(n, {
					expected: L.joinValues(i),
					received: n.parsedType,
					code: b.invalid_type,
				}),
				S
			);
		}
		if (
			(Ss(this, ni, 'f') ||
				up(this, ni, new Set(L.getValidEnumValues(this._def.values)), 'f'),
			!Ss(this, ni, 'f').has(e.data))
		) {
			let i = L.objectValues(t);
			return (
				w(n, {received: n.data, code: b.invalid_enum_value, options: i}), S
			);
		}
		return pe(e.data);
	}
	get enum() {
		return this._def.values;
	}
};
ni = new WeakMap();
nr.create = (r, e) => new nr({values: r, typeName: A.ZodNativeEnum, ...P(e)});
var _t = class extends I {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		let {ctx: t} = this._processInputParams(e);
		if (t.parsedType !== v.promise && t.common.async === !1)
			return (
				w(t, {
					code: b.invalid_type,
					expected: v.promise,
					received: t.parsedType,
				}),
				S
			);
		let n = t.parsedType === v.promise ? t.data : Promise.resolve(t.data);
		return pe(
			n.then((i) =>
				this._def.type.parseAsync(i, {
					path: t.path,
					errorMap: t.common.contextualErrorMap,
				})
			)
		);
	}
};
_t.create = (r, e) => new _t({type: r, typeName: A.ZodPromise, ...P(e)});
var Ce = class extends I {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === A.ZodEffects
			? this._def.schema.sourceType()
			: this._def.schema;
	}
	_parse(e) {
		let {status: t, ctx: n} = this._processInputParams(e),
			i = this._def.effect || null,
			s = {
				addIssue: (o) => {
					w(n, o), o.fatal ? t.abort() : t.dirty();
				},
				get path() {
					return n.path;
				},
			};
		if (((s.addIssue = s.addIssue.bind(s)), i.type === 'preprocess')) {
			let o = i.transform(n.data, s);
			if (n.common.async)
				return Promise.resolve(o).then(async (a) => {
					if (t.value === 'aborted') return S;
					let u = await this._def.schema._parseAsync({
						data: a,
						path: n.path,
						parent: n,
					});
					return u.status === 'aborted'
						? S
						: u.status === 'dirty' || t.value === 'dirty'
							? Hr(u.value)
							: u;
				});
			{
				if (t.value === 'aborted') return S;
				let a = this._def.schema._parseSync({data: o, path: n.path, parent: n});
				return a.status === 'aborted'
					? S
					: a.status === 'dirty' || t.value === 'dirty'
						? Hr(a.value)
						: a;
			}
		}
		if (i.type === 'refinement') {
			let o = (a) => {
				let u = i.refinement(a, s);
				if (n.common.async) return Promise.resolve(u);
				if (u instanceof Promise)
					throw new Error(
						'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
					);
				return a;
			};
			if (n.common.async === !1) {
				let a = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n,
				});
				return a.status === 'aborted'
					? S
					: (a.status === 'dirty' && t.dirty(),
						o(a.value),
						{status: t.value, value: a.value});
			} else
				return this._def.schema
					._parseAsync({data: n.data, path: n.path, parent: n})
					.then((a) =>
						a.status === 'aborted'
							? S
							: (a.status === 'dirty' && t.dirty(),
								o(a.value).then(() => ({status: t.value, value: a.value})))
					);
		}
		if (i.type === 'transform')
			if (n.common.async === !1) {
				let o = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n,
				});
				if (!Wt(o)) return o;
				let a = i.transform(o.value, s);
				if (a instanceof Promise)
					throw new Error(
						'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.'
					);
				return {status: t.value, value: a};
			} else
				return this._def.schema
					._parseAsync({data: n.data, path: n.path, parent: n})
					.then((o) =>
						Wt(o)
							? Promise.resolve(i.transform(o.value, s)).then((a) => ({
									status: t.value,
									value: a,
								}))
							: o
					);
		L.assertNever(i);
	}
};
Ce.create = (r, e, t) =>
	new Ce({schema: r, typeName: A.ZodEffects, effect: e, ...P(t)});
Ce.createWithPreprocess = (r, e, t) =>
	new Ce({
		schema: e,
		effect: {type: 'preprocess', transform: r},
		typeName: A.ZodEffects,
		...P(t),
	});
var Oe = class extends I {
	_parse(e) {
		return this._getType(e) === v.undefined
			? pe(void 0)
			: this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Oe.create = (r, e) => new Oe({innerType: r, typeName: A.ZodOptional, ...P(e)});
var Je = class extends I {
	_parse(e) {
		return this._getType(e) === v.null
			? pe(null)
			: this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
};
Je.create = (r, e) => new Je({innerType: r, typeName: A.ZodNullable, ...P(e)});
var ir = class extends I {
	_parse(e) {
		let {ctx: t} = this._processInputParams(e),
			n = t.data;
		return (
			t.parsedType === v.undefined && (n = this._def.defaultValue()),
			this._def.innerType._parse({data: n, path: t.path, parent: t})
		);
	}
	removeDefault() {
		return this._def.innerType;
	}
};
ir.create = (r, e) =>
	new ir({
		innerType: r,
		typeName: A.ZodDefault,
		defaultValue: typeof e.default == 'function' ? e.default : () => e.default,
		...P(e),
	});
var sr = class extends I {
	_parse(e) {
		let {ctx: t} = this._processInputParams(e),
			n = {...t, common: {...t.common, issues: []}},
			i = this._def.innerType._parse({
				data: n.data,
				path: n.path,
				parent: {...n},
			});
		return ii(i)
			? i.then((s) => ({
					status: 'valid',
					value:
						s.status === 'valid'
							? s.value
							: this._def.catchValue({
									get error() {
										return new xe(n.common.issues);
									},
									input: n.data,
								}),
				}))
			: {
					status: 'valid',
					value:
						i.status === 'valid'
							? i.value
							: this._def.catchValue({
									get error() {
										return new xe(n.common.issues);
									},
									input: n.data,
								}),
				};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
sr.create = (r, e) =>
	new sr({
		innerType: r,
		typeName: A.ZodCatch,
		catchValue: typeof e.catch == 'function' ? e.catch : () => e.catch,
		...P(e),
	});
var zr = class extends I {
	_parse(e) {
		if (this._getType(e) !== v.nan) {
			let n = this._getOrReturnCtx(e);
			return (
				w(n, {code: b.invalid_type, expected: v.nan, received: n.parsedType}), S
			);
		}
		return {status: 'valid', value: e.data};
	}
};
zr.create = (r) => new zr({typeName: A.ZodNaN, ...P(r)});
var UI = Symbol('zod_brand'),
	si = class extends I {
		_parse(e) {
			let {ctx: t} = this._processInputParams(e),
				n = t.data;
			return this._def.type._parse({data: n, path: t.path, parent: t});
		}
		unwrap() {
			return this._def.type;
		}
	},
	oi = class r extends I {
		_parse(e) {
			let {status: t, ctx: n} = this._processInputParams(e);
			if (n.common.async)
				return (async () => {
					let s = await this._def.in._parseAsync({
						data: n.data,
						path: n.path,
						parent: n,
					});
					return s.status === 'aborted'
						? S
						: s.status === 'dirty'
							? (t.dirty(), Hr(s.value))
							: this._def.out._parseAsync({
									data: s.value,
									path: n.path,
									parent: n,
								});
				})();
			{
				let i = this._def.in._parseSync({
					data: n.data,
					path: n.path,
					parent: n,
				});
				return i.status === 'aborted'
					? S
					: i.status === 'dirty'
						? (t.dirty(), {status: 'dirty', value: i.value})
						: this._def.out._parseSync({
								data: i.value,
								path: n.path,
								parent: n,
							});
			}
		}
		static create(e, t) {
			return new r({in: e, out: t, typeName: A.ZodPipeline});
		}
	},
	or = class extends I {
		_parse(e) {
			let t = this._def.innerType._parse(e),
				n = (i) => (Wt(i) && (i.value = Object.freeze(i.value)), i);
			return ii(t) ? t.then((i) => n(i)) : n(t);
		}
		unwrap() {
			return this._def.innerType;
		}
	};
or.create = (r, e) => new or({innerType: r, typeName: A.ZodReadonly, ...P(e)});
function fp(r, e = {}, t) {
	return r
		? bt.create().superRefine((n, i) => {
				var s, o;
				if (!r(n)) {
					let a =
							typeof e == 'function'
								? e(n)
								: typeof e == 'string'
									? {message: e}
									: e,
						u =
							(o = (s = a.fatal) !== null && s !== void 0 ? s : t) !== null &&
							o !== void 0
								? o
								: !0,
						c = typeof a == 'string' ? {message: a} : a;
					i.addIssue({code: 'custom', ...c, fatal: u});
				}
			})
		: bt.create();
}
var FI = {object: de.lazycreate},
	A;
(function (r) {
	(r.ZodString = 'ZodString'),
		(r.ZodNumber = 'ZodNumber'),
		(r.ZodNaN = 'ZodNaN'),
		(r.ZodBigInt = 'ZodBigInt'),
		(r.ZodBoolean = 'ZodBoolean'),
		(r.ZodDate = 'ZodDate'),
		(r.ZodSymbol = 'ZodSymbol'),
		(r.ZodUndefined = 'ZodUndefined'),
		(r.ZodNull = 'ZodNull'),
		(r.ZodAny = 'ZodAny'),
		(r.ZodUnknown = 'ZodUnknown'),
		(r.ZodNever = 'ZodNever'),
		(r.ZodVoid = 'ZodVoid'),
		(r.ZodArray = 'ZodArray'),
		(r.ZodObject = 'ZodObject'),
		(r.ZodUnion = 'ZodUnion'),
		(r.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
		(r.ZodIntersection = 'ZodIntersection'),
		(r.ZodTuple = 'ZodTuple'),
		(r.ZodRecord = 'ZodRecord'),
		(r.ZodMap = 'ZodMap'),
		(r.ZodSet = 'ZodSet'),
		(r.ZodFunction = 'ZodFunction'),
		(r.ZodLazy = 'ZodLazy'),
		(r.ZodLiteral = 'ZodLiteral'),
		(r.ZodEnum = 'ZodEnum'),
		(r.ZodEffects = 'ZodEffects'),
		(r.ZodNativeEnum = 'ZodNativeEnum'),
		(r.ZodOptional = 'ZodOptional'),
		(r.ZodNullable = 'ZodNullable'),
		(r.ZodDefault = 'ZodDefault'),
		(r.ZodCatch = 'ZodCatch'),
		(r.ZodPromise = 'ZodPromise'),
		(r.ZodBranded = 'ZodBranded'),
		(r.ZodPipeline = 'ZodPipeline'),
		(r.ZodReadonly = 'ZodReadonly');
})(A || (A = {}));
var QI = (r, e = {message: `Input not instance of ${r.name}`}) =>
		fp((t) => t instanceof r, e),
	pp = yt.create,
	mp = Vt.create,
	HI = zr.create,
	WI = Gt.create,
	gp = Jt.create,
	VI = Kt.create,
	GI = Vr.create,
	JI = zt.create,
	KI = Zt.create,
	zI = bt.create,
	ZI = nt.create,
	YI = je.create,
	XI = Gr.create,
	eP = it.create,
	tP = de.create,
	rP = de.strictCreate,
	nP = Yt.create,
	iP = Os.create,
	sP = Xt.create,
	oP = Ge.create,
	aP = Rs.create,
	uP = Jr.create,
	cP = Kr.create,
	lP = Ns.create,
	hP = er.create,
	dP = tr.create,
	fP = rr.create,
	pP = nr.create,
	mP = _t.create,
	op = Ce.create,
	gP = Oe.create,
	yP = Je.create,
	bP = Ce.createWithPreprocess,
	_P = oi.create,
	wP = () => pp().optional(),
	vP = () => mp().optional(),
	EP = () => gp().optional(),
	xP = {
		string: (r) => yt.create({...r, coerce: !0}),
		number: (r) => Vt.create({...r, coerce: !0}),
		boolean: (r) => Jt.create({...r, coerce: !0}),
		bigint: (r) => Gt.create({...r, coerce: !0}),
		date: (r) => Kt.create({...r, coerce: !0}),
	},
	CP = S,
	T = Object.freeze({
		__proto__: null,
		defaultErrorMap: Wr,
		setErrorMap: bI,
		getErrorMap: Ts,
		makeIssue: As,
		EMPTY_PATH: _I,
		addIssueToContext: w,
		ParseStatus: he,
		INVALID: S,
		DIRTY: Hr,
		OK: pe,
		isAborted: Nu,
		isDirty: Iu,
		isValid: Wt,
		isAsync: ii,
		get util() {
			return L;
		},
		get objectUtil() {
			return Ru;
		},
		ZodParsedType: v,
		getParsedType: rt,
		ZodType: I,
		datetimeRegex: hp,
		ZodString: yt,
		ZodNumber: Vt,
		ZodBigInt: Gt,
		ZodBoolean: Jt,
		ZodDate: Kt,
		ZodSymbol: Vr,
		ZodUndefined: zt,
		ZodNull: Zt,
		ZodAny: bt,
		ZodUnknown: nt,
		ZodNever: je,
		ZodVoid: Gr,
		ZodArray: it,
		ZodObject: de,
		ZodUnion: Yt,
		ZodDiscriminatedUnion: Os,
		ZodIntersection: Xt,
		ZodTuple: Ge,
		ZodRecord: Rs,
		ZodMap: Jr,
		ZodSet: Kr,
		ZodFunction: Ns,
		ZodLazy: er,
		ZodLiteral: tr,
		ZodEnum: rr,
		ZodNativeEnum: nr,
		ZodPromise: _t,
		ZodEffects: Ce,
		ZodTransformer: Ce,
		ZodOptional: Oe,
		ZodNullable: Je,
		ZodDefault: ir,
		ZodCatch: sr,
		ZodNaN: zr,
		BRAND: UI,
		ZodBranded: si,
		ZodPipeline: oi,
		ZodReadonly: or,
		custom: fp,
		Schema: I,
		ZodSchema: I,
		late: FI,
		get ZodFirstPartyTypeKind() {
			return A;
		},
		coerce: xP,
		any: zI,
		array: eP,
		bigint: WI,
		boolean: gp,
		date: VI,
		discriminatedUnion: iP,
		effect: op,
		enum: fP,
		function: lP,
		instanceof: QI,
		intersection: sP,
		lazy: hP,
		literal: dP,
		map: uP,
		nan: HI,
		nativeEnum: pP,
		never: YI,
		null: KI,
		nullable: yP,
		number: mp,
		object: tP,
		oboolean: EP,
		onumber: vP,
		optional: gP,
		ostring: wP,
		pipeline: _P,
		preprocess: bP,
		promise: mP,
		record: aP,
		set: cP,
		strictObject: rP,
		string: pp,
		symbol: GI,
		transformer: op,
		tuple: oP,
		undefined: JI,
		union: nP,
		unknown: ZI,
		void: XI,
		NEVER: CP,
		ZodIssueCode: b,
		quotelessJson: yI,
		ZodError: xe,
	});
var ar = (r, e, t) =>
	Su(r, async (n, i) => {
		let s = n;
		if (r === 'header' && e instanceof de) {
			let a = Object.keys(e.shape),
				u = Object.fromEntries(a.map((c) => [c.toLowerCase(), c]));
			s = Object.fromEntries(Object.entries(n).map(([c, h]) => [u[c] || c, h]));
		}
		let o = await e.safeParseAsync(s);
		if (t) {
			let a = await t({data: s, ...o, target: r}, i);
			if (a) {
				if (a instanceof Response) return a;
				if ('response' in a) return a.response;
			}
		}
		return o.success ? o.data : i.json(o, 400);
	});
var yp = async (r, e = Object.create(null)) => {
	let {all: t = !1, dot: n = !1} = e,
		s = (r instanceof Is ? r.raw.headers : r.headers).get('Content-Type');
	return s?.startsWith('multipart/form-data') ||
		s?.startsWith('application/x-www-form-urlencoded')
		? qP(r, {all: t, dot: n})
		: {};
};
async function qP(r, e) {
	let t = await r.formData();
	return t ? TP(t, e) : {};
}
function TP(r, e) {
	let t = Object.create(null);
	return (
		r.forEach((n, i) => {
			e.all || i.endsWith('[]') ? AP(t, i, n) : (t[i] = n);
		}),
		e.dot &&
			Object.entries(t).forEach(([n, i]) => {
				n.includes('.') && (SP(t, n, i), delete t[n]);
			}),
		t
	);
}
var AP = (r, e, t) => {
		r[e] !== void 0
			? Array.isArray(r[e])
				? r[e].push(t)
				: (r[e] = [r[e], t])
			: (r[e] = t);
	},
	SP = (r, e, t) => {
		let n = r,
			i = e.split('.');
		i.forEach((s, o) => {
			o === i.length - 1
				? (n[s] = t)
				: ((!n[s] ||
						typeof n[s] != 'object' ||
						Array.isArray(n[s]) ||
						n[s] instanceof File) &&
						(n[s] = Object.create(null)),
					(n = n[s]));
		});
	};
var bp = (r) => Cu(r, ei),
	Is = class {
		raw;
		#t;
		#e;
		routeIndex = 0;
		path;
		bodyCache = {};
		constructor(r, e = '/', t = [[]]) {
			(this.raw = r), (this.path = e), (this.#e = t), (this.#t = {});
		}
		param(r) {
			return r ? this.#n(r) : this.#s();
		}
		#n(r) {
			let e = this.#e[0][this.routeIndex][1][r],
				t = this.#i(e);
			return t ? (/\%/.test(t) ? bp(t) : t) : void 0;
		}
		#s() {
			let r = {},
				e = Object.keys(this.#e[0][this.routeIndex][1]);
			for (let t of e) {
				let n = this.#i(this.#e[0][this.routeIndex][1][t]);
				n && typeof n == 'string' && (r[t] = /\%/.test(n) ? bp(n) : n);
			}
			return r;
		}
		#i(r) {
			return this.#e[1] ? this.#e[1][r] : r;
		}
		query(r) {
			return ep(this.url, r);
		}
		queries(r) {
			return tp(this.url, r);
		}
		header(r) {
			if (r) return this.raw.headers.get(r.toLowerCase()) ?? void 0;
			let e = {};
			return (
				this.raw.headers.forEach((t, n) => {
					e[n] = t;
				}),
				e
			);
		}
		async parseBody(r) {
			return (this.bodyCache.parsedBody ??= await yp(this, r));
		}
		#r = (r) => {
			let {bodyCache: e, raw: t} = this,
				n = e[r];
			if (n) return n;
			let i = Object.keys(e)[0];
			return i
				? e[i].then(
						(s) => (
							i === 'json' && (s = JSON.stringify(s)), new Response(s)[r]()
						)
					)
				: (e[r] = t[r]());
		};
		json() {
			return this.#r('json');
		}
		text() {
			return this.#r('text');
		}
		arrayBuffer() {
			return this.#r('arrayBuffer');
		}
		blob() {
			return this.#r('blob');
		}
		formData() {
			return this.#r('formData');
		}
		addValidatedData(r, e) {
			this.#t[r] = e;
		}
		valid(r) {
			return this.#t[r];
		}
		get url() {
			return this.raw.url;
		}
		get method() {
			return this.raw.method;
		}
		get matchedRoutes() {
			return this.#e[0].map(([[, r]]) => r);
		}
		get routePath() {
			return this.#e[0].map(([[, r]]) => r)[this.routeIndex].path;
		}
	};
var OP = 'text/plain; charset=UTF-8',
	ku = (r, e = {}) => {
		for (let t of Object.keys(e)) r.set(t, e[t]);
		return r;
	},
	Ps = class {
		#t;
		#e;
		env = {};
		#n;
		finalized = !1;
		error;
		#s = 200;
		#i;
		#r;
		#o;
		#u;
		#c = !0;
		#d;
		#l;
		#h;
		#f;
		#p;
		constructor(r, e) {
			(this.#t = r),
				e &&
					((this.#i = e.executionCtx),
					(this.env = e.env),
					(this.#h = e.notFoundHandler),
					(this.#p = e.path),
					(this.#f = e.matchResult));
		}
		get req() {
			return (this.#e ??= new Is(this.#t, this.#p, this.#f)), this.#e;
		}
		get event() {
			if (this.#i && 'respondWith' in this.#i) return this.#i;
			throw Error('This context has no FetchEvent');
		}
		get executionCtx() {
			if (this.#i) return this.#i;
			throw Error('This context has no ExecutionContext');
		}
		get res() {
			return (
				(this.#c = !1),
				(this.#u ||= new Response('404 Not Found', {status: 404}))
			);
		}
		set res(r) {
			if (((this.#c = !1), this.#u && r))
				try {
					for (let [e, t] of this.#u.headers.entries())
						if (e !== 'content-type')
							if (e === 'set-cookie') {
								let n = this.#u.headers.getSetCookie();
								r.headers.delete('set-cookie');
								for (let i of n) r.headers.append('set-cookie', i);
							} else r.headers.set(e, t);
				} catch (e) {
					if (e instanceof TypeError && e.message.includes('immutable')) {
						this.res = new Response(r.body, {
							headers: r.headers,
							status: r.status,
						});
						return;
					} else throw e;
				}
			(this.#u = r), (this.finalized = !0);
		}
		render = (...r) => ((this.#l ??= (e) => this.html(e)), this.#l(...r));
		setLayout = (r) => (this.#d = r);
		getLayout = () => this.#d;
		setRenderer = (r) => {
			this.#l = r;
		};
		header = (r, e, t) => {
			if (e === void 0) {
				this.#r
					? this.#r.delete(r)
					: this.#o && delete this.#o[r.toLocaleLowerCase()],
					this.finalized && this.res.headers.delete(r);
				return;
			}
			t?.append
				? (this.#r ||
						((this.#c = !1), (this.#r = new Headers(this.#o)), (this.#o = {})),
					this.#r.append(r, e))
				: this.#r
					? this.#r.set(r, e)
					: ((this.#o ??= {}), (this.#o[r.toLowerCase()] = e)),
				this.finalized &&
					(t?.append
						? this.res.headers.append(r, e)
						: this.res.headers.set(r, e));
		};
		status = (r) => {
			(this.#c = !1), (this.#s = r);
		};
		set = (r, e) => {
			(this.#n ??= new Map()), this.#n.set(r, e);
		};
		get = (r) => (this.#n ? this.#n.get(r) : void 0);
		get var() {
			return this.#n ? Object.fromEntries(this.#n) : {};
		}
		#a(r, e, t) {
			if (this.#c && !t && !e && this.#s === 200)
				return new Response(r, {headers: this.#o});
			if (e && typeof e != 'number') {
				let i = new Headers(e.headers);
				this.#r &&
					this.#r.forEach((o, a) => {
						a === 'set-cookie' ? i.append(a, o) : i.set(a, o);
					});
				let s = ku(i, this.#o);
				return new Response(r, {headers: s, status: e.status ?? this.#s});
			}
			let n = typeof e == 'number' ? e : this.#s;
			(this.#o ??= {}),
				(this.#r ??= new Headers()),
				ku(this.#r, this.#o),
				this.#u &&
					(this.#u.headers.forEach((i, s) => {
						s === 'set-cookie' ? this.#r?.append(s, i) : this.#r?.set(s, i);
					}),
					ku(this.#r, this.#o)),
				(t ??= {});
			for (let [i, s] of Object.entries(t))
				if (typeof s == 'string') this.#r.set(i, s);
				else {
					this.#r.delete(i);
					for (let o of s) this.#r.append(i, o);
				}
			return new Response(r, {status: n, headers: this.#r});
		}
		newResponse = (...r) => this.#a(...r);
		body = (r, e, t) =>
			typeof e == 'number' ? this.#a(r, e, t) : this.#a(r, e);
		text = (r, e, t) => {
			if (!this.#o) {
				if (this.#c && !t && !e) return new Response(r);
				this.#o = {};
			}
			return (
				(this.#o['content-type'] = OP),
				typeof e == 'number' ? this.#a(r, e, t) : this.#a(r, e)
			);
		};
		json = (r, e, t) => {
			let n = JSON.stringify(r);
			return (
				(this.#o ??= {}),
				(this.#o['content-type'] = 'application/json'),
				typeof e == 'number' ? this.#a(n, e, t) : this.#a(n, e)
			);
		};
		html = (r, e, t) => (
			(this.#o ??= {}),
			(this.#o['content-type'] = 'text/html; charset=UTF-8'),
			typeof r == 'object'
				? Za(r, za.Stringify, !1, {}).then((n) =>
						typeof e == 'number' ? this.#a(n, e, t) : this.#a(n, e)
					)
				: typeof e == 'number'
					? this.#a(r, e, t)
					: this.#a(r, e)
		);
		redirect = (r, e) => (
			(this.#r ??= new Headers()),
			this.#r.set('Location', String(r)),
			this.newResponse(null, e ?? 302)
		);
		notFound = () => ((this.#h ??= () => new Response()), this.#h(this));
	};
var $u = (r, e, t) => (n, i) => {
	let s = -1,
		o = n instanceof Ps;
	return a(0);
	async function a(u) {
		if (u <= s) throw new Error('next() called multiple times');
		s = u;
		let c,
			h = !1,
			d;
		if (
			(r[u]
				? ((d = r[u][0][0]), o && (n.req.routeIndex = u))
				: (d = (u === r.length && i) || void 0),
			!d)
		)
			o && n.finalized === !1 && t && (c = await t(n));
		else
			try {
				c = await d(n, () => a(u + 1));
			} catch (f) {
				if (f instanceof Error && o && e)
					(n.error = f), (c = await e(f, n)), (h = !0);
				else throw f;
			}
		return c && (n.finalized === !1 || h) && (n.res = c), n;
	}
};
var z = 'ALL',
	_p = 'all',
	wp = ['get', 'post', 'put', 'delete', 'options', 'patch'],
	ks = 'Can not add a route since the matcher is already built.',
	$s = class extends Error {};
var vp = '__COMPOSED_HANDLER';
var RP = (r) => r.text('404 Not Found', 404),
	Ep = (r, e) =>
		'getResponse' in r
			? r.getResponse()
			: (console.error(r), e.text('Internal Server Error', 500)),
	Mu = class {
		get;
		post;
		put;
		delete;
		options;
		patch;
		all;
		on;
		use;
		router;
		getPath;
		_basePath = '/';
		#t = '/';
		routes = [];
		constructor(r = {}) {
			[...wp, _p].forEach((n) => {
				this[n] = (i, ...s) => (
					typeof i == 'string' ? (this.#t = i) : this.#s(n, this.#t, i),
					s.forEach((o) => {
						this.#s(n, this.#t, o);
					}),
					this
				);
			}),
				(this.on = (n, i, ...s) => {
					for (let o of [i].flat()) {
						this.#t = o;
						for (let a of [n].flat())
							s.map((u) => {
								this.#s(a.toUpperCase(), this.#t, u);
							});
					}
					return this;
				}),
				(this.use = (n, ...i) => (
					typeof n == 'string'
						? (this.#t = n)
						: ((this.#t = '*'), i.unshift(n)),
					i.forEach((s) => {
						this.#s(z, this.#t, s);
					}),
					this
				));
			let t = r.strict ?? !0;
			delete r.strict,
				Object.assign(this, r),
				(this.getPath = t ? (r.getPath ?? qu) : Yf);
		}
		#e() {
			let r = new Mu({router: this.router, getPath: this.getPath});
			return (r.routes = this.routes), r;
		}
		#n = RP;
		errorHandler = Ep;
		route(r, e) {
			let t = this.basePath(r);
			return (
				e.routes.map((n) => {
					let i;
					e.errorHandler === Ep
						? (i = n.handler)
						: ((i = async (s, o) =>
								(await $u([], e.errorHandler)(s, () => n.handler(s, o))).res),
							(i[vp] = n.handler)),
						t.#s(n.method, n.path, i);
				}),
				this
			);
		}
		basePath(r) {
			let e = this.#e();
			return (e._basePath = Ve(this._basePath, r)), e;
		}
		onError = (r) => ((this.errorHandler = r), this);
		notFound = (r) => ((this.#n = r), this);
		mount(r, e, t) {
			let n, i;
			t &&
				(typeof t == 'function'
					? (i = t)
					: ((i = t.optionHandler), (n = t.replaceRequest)));
			let s = i
				? (a) => {
						let u = i(a);
						return Array.isArray(u) ? u : [u];
					}
				: (a) => {
						let u;
						try {
							u = a.executionCtx;
						} catch {}
						return [a.env, u];
					};
			n ||= (() => {
				let a = Ve(this._basePath, r),
					u = a === '/' ? 0 : a.length;
				return (c) => {
					let h = new URL(c.url);
					return (h.pathname = h.pathname.slice(u) || '/'), new Request(h, c);
				};
			})();
			let o = async (a, u) => {
				let c = await e(n(a.req.raw), ...s(a));
				if (c) return c;
				await u();
			};
			return this.#s(z, Ve(r, '*'), o), this;
		}
		#s(r, e, t) {
			(r = r.toUpperCase()), (e = Ve(this._basePath, e));
			let n = {path: e, method: r, handler: t};
			this.router.add(r, e, [t, n]), this.routes.push(n);
		}
		#i(r, e) {
			if (r instanceof Error) return this.errorHandler(r, e);
			throw r;
		}
		#r(r, e, t, n) {
			if (n === 'HEAD')
				return (async () =>
					new Response(null, await this.#r(r, e, t, 'GET')))();
			let i = this.getPath(r, {env: t}),
				s = this.router.match(n, i),
				o = new Ps(r, {
					path: i,
					matchResult: s,
					env: t,
					executionCtx: e,
					notFoundHandler: this.#n,
				});
			if (s[0].length === 1) {
				let u;
				try {
					u = s[0][0][0][0](o, async () => {
						o.res = await this.#n(o);
					});
				} catch (c) {
					return this.#i(c, o);
				}
				return u instanceof Promise
					? u
							.then((c) => c || (o.finalized ? o.res : this.#n(o)))
							.catch((c) => this.#i(c, o))
					: (u ?? this.#n(o));
			}
			let a = $u(s[0], this.errorHandler, this.#n);
			return (async () => {
				try {
					let u = await a(o);
					if (!u.finalized)
						throw new Error(
							'Context is not finalized. Did you forget to return a Response object or `await next()`?'
						);
					return u.res;
				} catch (u) {
					return this.#i(u, o);
				}
			})();
		}
		fetch = (r, ...e) => this.#r(r, e[1], e[0], r.method);
		request = (r, e, t, n) =>
			r instanceof Request
				? this.fetch(e ? new Request(r, e) : r, t, n)
				: ((r = r.toString()),
					this.fetch(
						new Request(
							/^https?:\/\//.test(r) ? r : `http://localhost${Ve('/', r)}`,
							e
						),
						t,
						n
					));
		fire = () => {
			addEventListener('fetch', (r) => {
				r.respondWith(this.#r(r.request, r, void 0, r.request.method));
			});
		};
	};
var Ms = '[^/]+',
	ai = '.*',
	ui = '(?:|/.*)',
	Zr = Symbol(),
	NP = new Set('.\\+*[^]$()');
function IP(r, e) {
	return r.length === 1
		? e.length === 1
			? r < e
				? -1
				: 1
			: -1
		: e.length === 1 || r === ai || r === ui
			? 1
			: e === ai || e === ui
				? -1
				: r === Ms
					? 1
					: e === Ms
						? -1
						: r.length === e.length
							? r < e
								? -1
								: 1
							: e.length - r.length;
}
var js = class {
	#t;
	#e;
	#n = Object.create(null);
	insert(r, e, t, n, i) {
		if (r.length === 0) {
			if (this.#t !== void 0) throw Zr;
			if (i) return;
			this.#t = e;
			return;
		}
		let [s, ...o] = r,
			a =
				s === '*'
					? o.length === 0
						? ['', '', ai]
						: ['', '', Ms]
					: s === '/*'
						? ['', '', ui]
						: s.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),
			u;
		if (a) {
			let c = a[1],
				h = a[2] || Ms;
			if (
				c &&
				a[2] &&
				((h = h.replace(/^\((?!\?:)(?=[^)]+\)$)/, '(?:')), /\((?!\?:)/.test(h))
			)
				throw Zr;
			if (((u = this.#n[h]), !u)) {
				if (Object.keys(this.#n).some((d) => d !== ai && d !== ui)) throw Zr;
				if (i) return;
				(u = this.#n[h] = new js()), c !== '' && (u.#e = n.varIndex++);
			}
			!i && c !== '' && t.push([c, u.#e]);
		} else if (((u = this.#n[s]), !u)) {
			if (
				Object.keys(this.#n).some((c) => c.length > 1 && c !== ai && c !== ui)
			)
				throw Zr;
			if (i) return;
			u = this.#n[s] = new js();
		}
		u.insert(o, e, t, n, i);
	}
	buildRegExpStr() {
		let e = Object.keys(this.#n)
			.sort(IP)
			.map((t) => {
				let n = this.#n[t];
				return (
					(typeof n.#e == 'number'
						? `(${t})@${n.#e}`
						: NP.has(t)
							? `\\${t}`
							: t) + n.buildRegExpStr()
				);
			});
		return (
			typeof this.#t == 'number' && e.unshift(`#${this.#t}`),
			e.length === 0 ? '' : e.length === 1 ? e[0] : '(?:' + e.join('|') + ')'
		);
	}
};
var xp = class {
	#t = {varIndex: 0};
	#e = new js();
	insert(r, e, t) {
		let n = [],
			i = [];
		for (let o = 0; ; ) {
			let a = !1;
			if (
				((r = r.replace(/\{[^}]+\}/g, (u) => {
					let c = `@\\${o}`;
					return (i[o] = [c, u]), o++, (a = !0), c;
				})),
				!a)
			)
				break;
		}
		let s = r.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
		for (let o = i.length - 1; o >= 0; o--) {
			let [a] = i[o];
			for (let u = s.length - 1; u >= 0; u--)
				if (s[u].indexOf(a) !== -1) {
					s[u] = s[u].replace(a, i[o][1]);
					break;
				}
		}
		return this.#e.insert(s, e, n, this.#t, t), n;
	}
	buildRegExp() {
		let r = this.#e.buildRegExpStr();
		if (r === '') return [/^$/, [], []];
		let e = 0,
			t = [],
			n = [];
		return (
			(r = r.replace(/#(\d+)|@(\d+)|\.\*\$/g, (i, s, o) =>
				s !== void 0
					? ((t[++e] = Number(s)), '$()')
					: (o !== void 0 && (n[Number(o)] = ++e), '')
			)),
			[new RegExp(`^${r}`), t, n]
		);
	}
};
var Cp = [],
	PP = [/^$/, [], Object.create(null)],
	qp = Object.create(null);
function Tp(r) {
	return (qp[r] ??= new RegExp(
		r === '*'
			? ''
			: `^${r.replace(/\/\*$|([.\\+*[^\]$()])/g, (e, t) => (t ? `\\${t}` : '(?:|/.*)'))}$`
	));
}
function kP() {
	qp = Object.create(null);
}
function $P(r) {
	let e = new xp(),
		t = [];
	if (r.length === 0) return PP;
	let n = r
			.map((c) => [!/\*|\/:/.test(c[0]), ...c])
			.sort(([c, h], [d, f]) => (c ? 1 : d ? -1 : h.length - f.length)),
		i = Object.create(null);
	for (let c = 0, h = -1, d = n.length; c < d; c++) {
		let [f, m, g] = n[c];
		f ? (i[m] = [g.map(([E]) => [E, Object.create(null)]), Cp]) : h++;
		let y;
		try {
			y = e.insert(m, h, f);
		} catch (E) {
			throw E === Zr ? new $s(m) : E;
		}
		f ||
			(t[h] = g.map(([E, N]) => {
				let j = Object.create(null);
				for (N -= 1; N >= 0; N--) {
					let [ae, ee] = y[N];
					j[ae] = ee;
				}
				return [E, j];
			}));
	}
	let [s, o, a] = e.buildRegExp();
	for (let c = 0, h = t.length; c < h; c++)
		for (let d = 0, f = t[c].length; d < f; d++) {
			let m = t[c][d]?.[1];
			if (!m) continue;
			let g = Object.keys(m);
			for (let y = 0, E = g.length; y < E; y++) m[g[y]] = a[m[g[y]]];
		}
	let u = [];
	for (let c in o) u[c] = t[o[c]];
	return [s, u, i];
}
function Yr(r, e) {
	if (r) {
		for (let t of Object.keys(r).sort((n, i) => i.length - n.length))
			if (Tp(t).test(e)) return [...r[t]];
	}
}
var ju = class {
	name = 'RegExpRouter';
	#t;
	#e;
	constructor() {
		(this.#t = {[z]: Object.create(null)}),
			(this.#e = {[z]: Object.create(null)});
	}
	add(r, e, t) {
		let n = this.#t,
			i = this.#e;
		if (!n || !i) throw new Error(ks);
		n[r] ||
			[n, i].forEach((a) => {
				(a[r] = Object.create(null)),
					Object.keys(a[z]).forEach((u) => {
						a[r][u] = [...a[z][u]];
					});
			}),
			e === '/*' && (e = '*');
		let s = (e.match(/\/:/g) || []).length;
		if (/\*$/.test(e)) {
			let a = Tp(e);
			r === z
				? Object.keys(n).forEach((u) => {
						n[u][e] ||= Yr(n[u], e) || Yr(n[z], e) || [];
					})
				: (n[r][e] ||= Yr(n[r], e) || Yr(n[z], e) || []),
				Object.keys(n).forEach((u) => {
					(r === z || r === u) &&
						Object.keys(n[u]).forEach((c) => {
							a.test(c) && n[u][c].push([t, s]);
						});
				}),
				Object.keys(i).forEach((u) => {
					(r === z || r === u) &&
						Object.keys(i[u]).forEach((c) => a.test(c) && i[u][c].push([t, s]));
				});
			return;
		}
		let o = qs(e) || [e];
		for (let a = 0, u = o.length; a < u; a++) {
			let c = o[a];
			Object.keys(i).forEach((h) => {
				(r === z || r === h) &&
					((i[h][c] ||= [...(Yr(n[h], c) || Yr(n[z], c) || [])]),
					i[h][c].push([t, s - u + a + 1]));
			});
		}
	}
	match(r, e) {
		kP();
		let t = this.#n();
		return (
			(this.match = (n, i) => {
				let s = t[n] || t[z],
					o = s[2][i];
				if (o) return o;
				let a = i.match(s[0]);
				if (!a) return [[], Cp];
				let u = a.indexOf('', 1);
				return [s[1][u], a];
			}),
			this.match(r, e)
		);
	}
	#n() {
		let r = Object.create(null);
		return (
			Object.keys(this.#e)
				.concat(Object.keys(this.#t))
				.forEach((e) => {
					r[e] ||= this.#s(e);
				}),
			(this.#t = this.#e = void 0),
			r
		);
	}
	#s(r) {
		let e = [],
			t = r === z;
		return (
			[this.#t, this.#e].forEach((n) => {
				let i = n[r] ? Object.keys(n[r]).map((s) => [s, n[r][s]]) : [];
				i.length !== 0
					? ((t ||= !0), e.push(...i))
					: r !== z && e.push(...Object.keys(n[z]).map((s) => [s, n[z][s]]));
			}),
			t ? $P(e) : null
		);
	}
};
var Lu = class {
	name = 'SmartRouter';
	#t = [];
	#e = [];
	constructor(r) {
		this.#t = r.routers;
	}
	add(r, e, t) {
		if (!this.#e) throw new Error(ks);
		this.#e.push([r, e, t]);
	}
	match(r, e) {
		if (!this.#e) throw new Error('Fatal error');
		let t = this.#t,
			n = this.#e,
			i = t.length,
			s = 0,
			o;
		for (; s < i; s++) {
			let a = t[s];
			try {
				for (let u = 0, c = n.length; u < c; u++) a.add(...n[u]);
				o = a.match(r, e);
			} catch (u) {
				if (u instanceof $s) continue;
				throw u;
			}
			(this.match = a.match.bind(a)), (this.#t = [a]), (this.#e = void 0);
			break;
		}
		if (s === i) throw new Error('Fatal error');
		return (this.name = `SmartRouter + ${this.activeRouter.name}`), o;
	}
	get activeRouter() {
		if (this.#e || this.#t.length !== 1)
			throw new Error('No active router has been determined yet.');
		return this.#t[0];
	}
};
var ci = Object.create(null),
	Bu = class {
		#t;
		#e;
		#n;
		#s = 0;
		#i = ci;
		constructor(r, e, t) {
			if (((this.#e = t || Object.create(null)), (this.#t = []), r && e)) {
				let n = Object.create(null);
				(n[r] = {handler: e, possibleKeys: [], score: 0}), (this.#t = [n]);
			}
			this.#n = [];
		}
		insert(r, e, t) {
			this.#s = ++this.#s;
			let n = this,
				i = Zf(e),
				s = [];
			for (let u = 0, c = i.length; u < c; u++) {
				let h = i[u];
				if (Object.keys(n.#e).includes(h)) {
					n = n.#e[h];
					let f = xu(h);
					f && s.push(f[1]);
					continue;
				}
				n.#e[h] = new Bu();
				let d = xu(h);
				d && (n.#n.push(d), s.push(d[1])), (n = n.#e[h]);
			}
			let o = Object.create(null),
				a = {
					handler: t,
					possibleKeys: s.filter((u, c, h) => h.indexOf(u) === c),
					score: this.#s,
				};
			return (o[r] = a), n.#t.push(o), n;
		}
		#r(r, e, t, n) {
			let i = [];
			for (let s = 0, o = r.#t.length; s < o; s++) {
				let a = r.#t[s],
					u = a[e] || a[z],
					c = {};
				if (
					u !== void 0 &&
					((u.params = Object.create(null)),
					i.push(u),
					t !== ci || (n && n !== ci))
				)
					for (let h = 0, d = u.possibleKeys.length; h < d; h++) {
						let f = u.possibleKeys[h],
							m = c[u.score];
						(u.params[f] = n?.[f] && !m ? n[f] : (t[f] ?? n?.[f])),
							(c[u.score] = !0);
					}
			}
			return i;
		}
		search(r, e) {
			let t = [];
			this.#i = ci;
			let i = [this],
				s = Eu(e);
			for (let o = 0, a = s.length; o < a; o++) {
				let u = s[o],
					c = o === a - 1,
					h = [];
				for (let d = 0, f = i.length; d < f; d++) {
					let m = i[d],
						g = m.#e[u];
					g &&
						((g.#i = m.#i),
						c
							? (g.#e['*'] && t.push(...this.#r(g.#e['*'], r, m.#i)),
								t.push(...this.#r(g, r, m.#i)))
							: h.push(g));
					for (let y = 0, E = m.#n.length; y < E; y++) {
						let N = m.#n[y],
							j = m.#i === ci ? {} : {...m.#i};
						if (N === '*') {
							let We = m.#e['*'];
							We && (t.push(...this.#r(We, r, m.#i)), h.push(We));
							continue;
						}
						if (u === '') continue;
						let [ae, ee, ue] = N,
							_e = m.#e[ae],
							gt = s.slice(o).join('/');
						if (ue instanceof RegExp && ue.test(gt)) {
							(j[ee] = gt), t.push(...this.#r(_e, r, m.#i, j));
							continue;
						}
						(ue === !0 || ue.test(u)) &&
							((j[ee] = u),
							c
								? (t.push(...this.#r(_e, r, j, m.#i)),
									_e.#e['*'] && t.push(...this.#r(_e.#e['*'], r, j, m.#i)))
								: ((_e.#i = j), h.push(_e)));
					}
				}
				i = h;
			}
			return (
				t.length > 1 && t.sort((o, a) => o.score - a.score),
				[t.map(({handler: o, params: a}) => [o, a])]
			);
		}
	};
var Du = class {
	name = 'TrieRouter';
	#t;
	constructor() {
		this.#t = new Bu();
	}
	add(r, e, t) {
		let n = qs(e);
		if (n) {
			for (let i = 0, s = n.length; i < s; i++) this.#t.insert(r, n[i], t);
			return;
		}
		this.#t.insert(r, e, t);
	}
	match(r, e) {
		return this.#t.search(r, e);
	}
};
var Uu = class extends Mu {
	constructor(r = {}) {
		super(r),
			(this.router = r.router ?? new Lu({routers: [new ju(), new Du()]}));
	}
};
var Ls = class Fu extends Uu {
		openAPIRegistry;
		defaultHook;
		constructor(e) {
			super(e),
				(this.openAPIRegistry = new wt.OpenAPIRegistry()),
				(this.defaultHook = e?.defaultHook);
		}
		openapi = ({middleware: e, ...t}, n, i = this.defaultHook) => {
			this.openAPIRegistry.registerPath(t);
			let s = [];
			if (t.request?.query) {
				let u = ar('query', t.request.query, i);
				s.push(u);
			}
			if (t.request?.params) {
				let u = ar('param', t.request.params, i);
				s.push(u);
			}
			if (t.request?.headers) {
				let u = ar('header', t.request.headers, i);
				s.push(u);
			}
			if (t.request?.cookies) {
				let u = ar('cookie', t.request.cookies, i);
				s.push(u);
			}
			let o = t.request?.body?.content;
			if (o)
				for (let u of Object.keys(o)) {
					if (!o[u]) continue;
					let c = o[u].schema;
					if (c instanceof I) {
						if (Sp(u)) {
							let h = ar('json', c, i);
							if (t.request?.body?.required) s.push(h);
							else {
								let d = async (f, m) => {
									if (
										f.req.header('content-type') &&
										Sp(f.req.header('content-type'))
									)
										return await h(f, m);
									f.req.addValidatedData('json', {}), await m();
								};
								s.push(d);
							}
						}
						if (Op(u)) {
							let h = ar('form', c, i);
							if (t.request?.body?.required) s.push(h);
							else {
								let d = async (f, m) => {
									if (
										f.req.header('content-type') &&
										Op(f.req.header('content-type'))
									)
										return await h(f, m);
									f.req.addValidatedData('form', {}), await m();
								};
								s.push(d);
							}
						}
					}
				}
			let a = e ? (Array.isArray(e) ? e : [e]) : [];
			return (
				this.on(
					[t.method],
					t.path.replaceAll(/\/{(.+?)}/g, '/:$1'),
					...a,
					...s,
					n
				),
				this
			);
		};
		getOpenAPIDocument = (e) => {
			let n = new wt.OpenApiGeneratorV3(
				this.openAPIRegistry.definitions
			).generateDocument(e);
			return this._basePath ? Ap(n, this._basePath) : n;
		};
		getOpenAPI31Document = (e) => {
			let n = new wt.OpenApiGeneratorV31(
				this.openAPIRegistry.definitions
			).generateDocument(e);
			return this._basePath ? Ap(n, this._basePath) : n;
		};
		doc = (e, t) =>
			this.get(e, (n) => {
				let i = typeof t == 'function' ? t(n) : t;
				try {
					let s = this.getOpenAPIDocument(i);
					return n.json(s);
				} catch (s) {
					return n.json(s, 500);
				}
			});
		doc31 = (e, t) =>
			this.get(e, (n) => {
				let i = typeof t == 'function' ? t(n) : t;
				try {
					let s = this.getOpenAPI31Document(i);
					return n.json(s);
				} catch (s) {
					return n.json(s, 500);
				}
			});
		route(e, t) {
			let n = e.replaceAll(/:([^\/]+)/g, '{$1}');
			return (
				super.route(e, t),
				t instanceof Fu
					? (t.openAPIRegistry.definitions.forEach((i) => {
							switch (i.type) {
								case 'component':
									return this.openAPIRegistry.registerComponent(
										i.componentType,
										i.name,
										i.component
									);
								case 'route':
									return this.openAPIRegistry.registerPath({
										...i.route,
										path: Ve(n, i.route.path),
									});
								case 'webhook':
									return this.openAPIRegistry.registerWebhook({
										...i.webhook,
										path: Ve(n, i.webhook.path),
									});
								case 'schema':
									return this.openAPIRegistry.register(
										i.schema._def.openapi._internal.refId,
										i.schema
									);
								case 'parameter':
									return this.openAPIRegistry.registerParameter(
										i.schema._def.openapi._internal.refId,
										i.schema
									);
								default: {
									let s = i;
									throw new Error(`Unknown registry type: ${s}`);
								}
							}
						}),
						this)
					: this
			);
		}
		basePath(e) {
			return new Fu({...super.basePath(e), defaultHook: this.defaultHook});
		}
	},
	Bs = (r) => {
		let e = {
			...r,
			getRoutingPath() {
				return r.path.replaceAll(/\/{(.+?)}/g, '/:$1');
			},
		};
		return Object.defineProperty(e, 'getRoutingPath', {enumerable: !1});
	};
(0, wt.extendZodWithOpenApi)(T);
function Ap(r, e) {
	let t = {};
	return (
		Object.keys(r.paths).forEach((n) => {
			t[Ve(e, n)] = r.paths[n];
		}),
		{...r, paths: t}
	);
}
function Sp(r) {
	return /^application\/([a-z-\.]+\+)?json/.test(r);
}
function Op(r) {
	return (
		r.startsWith('multipart/form-data') ||
		r.startsWith('application/x-www-form-urlencoded')
	);
}
var Rp = (r) => {
	let e = atob(r),
		t = new Uint8Array(new ArrayBuffer(e.length)),
		n = e.length / 2;
	for (let i = 0, s = e.length - 1; i <= n; i++, s--)
		(t[i] = e.charCodeAt(i)), (t[s] = e.charCodeAt(s));
	return t;
};
var MP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/,
	jP = /^([^:]*):(.*)$/,
	LP = new TextDecoder(),
	Np = (r) => {
		let e = MP.exec(r.headers.get('Authorization') || '');
		if (!e) return;
		let t;
		try {
			t = jP.exec(LP.decode(Rp(e[1])));
		} catch {}
		if (t) return {username: t[1], password: t[2]};
	};
var Ip = (r, ...e) => {
	let t = 'username' in r && 'password' in r,
		n = 'verifyUser' in r;
	if (!(t || n))
		throw new Error(
			'basic auth middleware requires options for "username and password" or "verifyUser"'
		);
	return (
		r.realm || (r.realm = 'Secure Area'),
		r.invalidUserMessage || (r.invalidUserMessage = 'Unauthorized'),
		t && e.unshift({username: r.username, password: r.password}),
		async function (s, o) {
			let a = Np(s.req.raw);
			if (a)
				if (n) {
					if (await r.verifyUser(a.username, a.password, s)) {
						await o();
						return;
					}
				} else
					for (let f of e) {
						let [m, g] = await Promise.all([
							Au(f.username, a.username, r.hashFunction),
							Au(f.password, a.password, r.hashFunction),
						]);
						if (m && g) {
							await o();
							return;
						}
					}
			let u = 401,
				c = {
					'WWW-Authenticate':
						'Basic realm="' + r.realm?.replace(/"/g, '\\"') + '"',
				},
				h =
					typeof r.invalidUserMessage == 'function'
						? await r.invalidUserMessage(s)
						: r.invalidUserMessage,
				d =
					typeof h == 'string'
						? new Response(h, {status: u, headers: c})
						: new Response(JSON.stringify(h), {
								status: u,
								headers: {...c, 'content-type': 'application/json'},
							});
			throw new ti(u, {res: d});
		}
	);
};
var gN = Fa(pN(), 1),
	yN = Fa(Ln(), 1);
console.log('config', {
	host: process.env.POSTGRES_HOST ?? 'host.docker.internal',
	port: process.env.POSTGRES_PORT ?? '5432',
	user: process.env.POSTGRES_USER ?? 'app',
	password: process.env.POSTGRES_PASSWORD ?? 'example',
	database: process.env.POSTGRES_DB ?? 'elaut',
});
var Af,
	mN = () =>
		(0, gN.default)({
			dialect: 'postgres',
			client: yN.default,
			pool: {min: 5, max: 50},
			connection: {
				host: process.env.POSTGRES_HOST,
				port: process.env.POSTGRES_PORT
					? parseInt(process.env.POSTGRES_PORT)
					: 5432,
				user: process.env.POSTGRES_USER,
				password: process.env.POSTGRES_PASSWORD,
				database: process.env.POSTGRES_DB,
			},
		});
process.env.NODE_ENV !== 'production'
	? (global.postgresDatabase || (global.postgresDatabase = mN()),
		(Af = global.postgresDatabase))
	: (Af = mN());
var Sf = Af;
var jie = 'Resource not found',
	Hn = class extends Error {
		constructor(e) {
			super(e ?? jie), (this.name = 'NotFoundError');
		}
	};
var Ft = class extends Error {
	constructor(e) {
		super(e),
			(this.name = 'DatabaseRetrieveError'),
			Object.setPrototypeOf(this, new.target.prototype);
	}
};
var mt = T.object({
		statusCode: T.number(),
		message: T.string(),
		key: T.string(),
		validationErrors: T.array(
			T.object({type: T.string(), message: T.string(), property: T.string()})
		).optional(),
	}),
	ms = class r {
		constructor(e, t, n) {
			(this.type = e), (this.message = t), (this.property = n);
		}
		static fromZodError(e) {
			return e.issues.map((t) => new r(t.code, t.message, t.path.join('.')));
		}
		toJSON() {
			return {type: this.type, message: this.message, property: this.property};
		}
	},
	$r = class r extends Error {
		constructor(t, n, i, s = []) {
			super(n);
			this.validationErrors = [];
			(this.key = i), (this.statusCode = t), (this.validationErrors = s);
		}
		toJSON() {
			return {
				statusCode: this.statusCode,
				message: this.message,
				key: this.key,
				...(this.validationErrors.length > 0 && {
					validationErrors: this.validationErrors.map((t) => t.toJSON()),
				}),
			};
		}
		static fromError(t) {
			return t instanceof r
				? t
				: t instanceof Hn
					? new r(404, t.message, 'NOT_FOUND')
					: t instanceof Ft
						? new r(
								500,
								'Could not find the requested resource',
								'RESOURCE_NOT_FOUND'
							)
						: new r(200, 'Internal Server Error', 'INTERNAL_SERVER_ERROR');
		}
	};
var le = [];
for (let r = 0; r < 256; ++r) le.push((r + 256).toString(16).slice(1));
function bN(r, e = 0) {
	return (
		le[r[e + 0]] +
		le[r[e + 1]] +
		le[r[e + 2]] +
		le[r[e + 3]] +
		'-' +
		le[r[e + 4]] +
		le[r[e + 5]] +
		'-' +
		le[r[e + 6]] +
		le[r[e + 7]] +
		'-' +
		le[r[e + 8]] +
		le[r[e + 9]] +
		'-' +
		le[r[e + 10]] +
		le[r[e + 11]] +
		le[r[e + 12]] +
		le[r[e + 13]] +
		le[r[e + 14]] +
		le[r[e + 15]]
	).toLowerCase();
}
import {randomFillSync as Lie} from 'crypto';
var $a = new Uint8Array(256),
	ka = $a.length;
function Of() {
	return ka > $a.length - 16 && (Lie($a), (ka = 0)), $a.slice(ka, (ka += 16));
}
import {randomUUID as Bie} from 'crypto';
var Rf = {randomUUID: Bie};
function Die(r, e, t) {
	if (Rf.randomUUID && !e && !r) return Rf.randomUUID();
	r = r || {};
	let n = r.random ?? r.rng?.() ?? Of();
	if (n.length < 16) throw new Error('Random bytes length must be >= 16');
	if (((n[6] = (n[6] & 15) | 64), (n[8] = (n[8] & 63) | 128), e)) {
		if (((t = t || 0), t < 0 || t + 16 > e.length))
			throw new RangeError(
				`UUID byte range ${t}:${t + 15} is out of buffer bounds`
			);
		for (let i = 0; i < 16; ++i) e[t + i] = n[i];
		return e;
	}
	return bN(n);
}
var Nf = Die;
var _N = T.object({
		id: T.string(),
		serialNumber: T.string(),
		name: T.string(),
		gameTypeId: T.string().optional(),
		tenantId: T.string().optional(),
		locationId: T.string().optional(),
	}).openapi('Machine'),
	wN = T.object({
		id: T.string(),
		serial_number: T.string(),
		name: T.string(),
		game_type_id: T.string().optional(),
		tenant_id: T.string().optional(),
		location_id: T.string().optional(),
	}),
	If = T.object({
		serialNumber: T.string(),
		name: T.string(),
		gameTypeId: T.string(),
		tenantId: T.string().optional(),
		locationId: T.string().optional(),
	}),
	vN = T.object({
		id: T.string(),
		serial_number: T.string(),
		name: T.string(),
		game_type_id: T.string().optional(),
		tenant_id: T.string().optional(),
		location_id: T.string().optional(),
	}),
	EN = T.object({
		name: T.string(),
		tenantId: T.string().optional(),
		locationId: T.string().optional(),
	}),
	xN = T.object({
		name: T.string().optional(),
		tenant_id: T.string().optional(),
		location_id: T.string().optional(),
	});
var He = class r {
	static {
		this.schemas = {
			DTOSchema: _N,
			DBSchema: wN,
			CreateDTOSchema: If,
			InsertDBSchema: vN,
			UpdateDTOSchema: EN,
			UpdateDBSchema: xN,
		};
	}
	constructor(e, t, n, i, s) {
		(this.id = e),
			(this.serialNumber = t),
			(this.name = n),
			(this.gameTypeId = i),
			(this.tenantId = s);
	}
	toJSON() {
		return {
			id: this.id,
			serialNumber: this.serialNumber,
			name: this.name,
			gameTypeId: this.gameTypeId,
		};
	}
	toDBType() {
		return {
			id: this.id,
			serial_number: this.serialNumber,
			name: this.name,
			game_type_id: this.gameTypeId,
		};
	}
	static fromJSON(e) {
		return Array.isArray(e)
			? e.map(
					(t) => new r(t.id, t.serialNumber, t.name, t.gameTypeId, t.tenantId)
				)
			: new r(e.id, e.serialNumber, e.name, e.gameTypeId, e.tenantId);
	}
	static fromDBType(e) {
		return Array.isArray(e)
			? e.map(
					(t) =>
						new r(t.id, t.serial_number, t.name, t.game_type_id, t.tenant_id)
				)
			: new r(e.id, e.serial_number, e.name, e.game_type_id, e.tenant_id);
	}
	static create(e) {
		let t = Nf();
		if (!If.safeParse(e).success)
			throw new Error('Could not create a valid Machine');
		return new r(t, e.serialNumber, e.name, e.gameTypeId, e.tenantId);
	}
};
var Ma = class {
	constructor(e) {
		this.db = e;
	}
	async getMachines() {
		try {
			let e = await this.db.select('*').from('machine');
			return He.fromDBType(e);
		} catch (e) {
			throw (
				(console.error(e),
				new Ft('Error retrieving machines from the database'))
			);
		}
	}
	async getMachineById(e) {
		try {
			let t = await this.db.select('*').from('machine').where({id: e}).first();
			return t ? He.fromDBType(t) : void 0;
		} catch (t) {
			throw (
				(console.error(t),
				new Ft(`Error retrieving machine with id ${e} from the database`))
			);
		}
	}
	async updateMachine(e, t) {
		try {
			let i = (
				await this.db.update(t).from('machine').where({id: e}).returning('*')
			)[0];
			return He.fromDBType(i);
		} catch (n) {
			throw (
				(console.error(n),
				new Ft(`Error updating machine with id ${e} in the database`))
			);
		}
	}
};
var ja = class {
	constructor(e) {
		this.machineRepository = e;
	}
	async getAllMachines() {
		return this.machineRepository.getMachines();
	}
	async getMachineById(e) {
		let t = await this.machineRepository.getMachineById(e);
		if (!t) throw new Hn(`Machine with id ${e} not found`);
		return t;
	}
	async updateMachine(e, t) {
		return this.machineRepository.updateMachine(e, t);
	}
};
var Uie = (r) => {
		switch (r) {
			case 'query':
				return 'REQUEST_QUERY_PARAM_ERROR';
			case 'param':
				return 'REQUEST_PATH_PARAM_ERROR';
			case 'json':
				return 'REQUEST_BODY_ERROR';
			case 'header':
				return 'REQUEST_HEADER_ERROR';
			case 'cookie':
				return 'REQUEST_COOKIE_ERROR';
			default:
				return 'BAD_REQUEST';
		}
	},
	La = async (r, e) => {
		if (!r.success) {
			let t = Uie(r.target),
				n = ms.fromZodError(r.error);
			return e.json(new $r(400, 'Bad request', t, n));
		}
	},
	Ba = (r, e, t) => {
		let s =
			r.responses[200]?.content?.['application/json']?.schema?.safeParse?.(t);
		if (!s?.success) {
			let o = s?.error ? ms.fromZodError(s.error) : [];
			throw new $r(
				503,
				'Could not create a valid response',
				'RESPONSE_VALIDATION_ERROR',
				o
			);
		}
		return s.data;
	};
var Fie = (r) => typeof r.res < 'u',
	CN = async (r, e) => {
		if ((console.error(r), Fie(r))) return r.res;
		let t = $r.fromError(r);
		return e.json(t, t.statusCode);
	};
var Pf = Bs({
		summary: 'Get all machines',
		method: 'get',
		path: '/',
		responses: {
			200: {
				summary: 'Successful response',
				description: 'Returns a json body with a list of all machines',
				content: {'application/json': {schema: T.array(He.schemas.DTOSchema)}},
			},
			503: {
				description: 'Request validation Error',
				content: {'application/json': {schema: mt}},
			},
			500: {
				description: 'Internal Server Error',
				content: {'application/json': {schema: mt}},
			},
		},
	}),
	kf = Bs({
		summary: 'Get a machine by id',
		method: 'get',
		path: '/{id}',
		request: {params: T.object({id: T.string()})},
		responses: {
			200: {
				summary: 'Successful response',
				description: 'Returns a json body with a machine',
				content: {'application/json': {schema: He.schemas.DTOSchema}},
			},
			404: {
				description: 'Machine not found',
				content: {'application/json': {schema: mt}},
			},
			503: {
				description: 'Request validation Error',
				content: {'application/json': {schema: mt}},
			},
			500: {
				description: 'Internal Server Error',
				content: {'application/json': {schema: mt}},
			},
		},
	}),
	$f = Bs({
		summary: 'Update a machine',
		method: 'put',
		path: '/{id}',
		request: {
			params: T.object({id: T.string()}),
			body: {
				content: {'application/json': {schema: He.schemas.UpdateDTOSchema}},
			},
		},
		responses: {
			200: {
				summary: 'Successful response',
				description: 'Returns a json body with the updated machine',
				content: {'application/json': {schema: He.schemas.DTOSchema}},
			},
			404: {
				description: 'Machine not found',
				content: {'application/json': {schema: mt}},
			},
			503: {
				description: 'Request validation Error',
				content: {'application/json': {schema: mt}},
			},
			500: {
				description: 'Internal Server Error',
				content: {'application/json': {schema: mt}},
			},
		},
	});
var qN = (r) => {
	let e = new Ls({strict: !0, defaultHook: La});
	return (
		e.openapi(Pf, async (t) => {
			let i = (await r.getAllMachines()).map((o) => o.toJSON()),
				s = Ba(Pf, t, i);
			return t.json(s, 200);
		}),
		e.openapi(kf, async (t) => {
			let n = t.req.param('id');
			console.log('machineId', n);
			let s = (await r.getMachineById(n)).toJSON(),
				o = Ba(kf, t, s);
			return t.json(o, 200);
		}),
		e.openapi($f, async (t) => {
			let n = t.req.param('id'),
				i = t.req.valid('json');
			console.log('machineId', n), console.log('machine', i);
			let o = (await r.updateMachine(n, i)).toJSON(),
				a = Ba($f, t, o);
			return t.json(a, 200);
		}),
		e
	);
};
var Wn = new Ls({strict: !0, defaultHook: La});
Wn.onError(CN);
var Qie = new Ma(Sf),
	Hie = new ja(Qie);
Wn.route('/machines', qN(Hie));
Wn.doc('/openapi', {
	openapi: '3.0.0',
	info: {title: 'Elaut API', version: '1.0.0'},
});
Wn.use('/swagger', Ip({username: 'lica', password: 'hellothere'}));
Wn.get('/swagger', Gf({url: '/openapi'}));
var Mf = Wn;
Hf({fetch: Mf.fetch.bind(Mf), port: 3e3}, (r) => {
	console.log(`Server running at ${r.port}`);
});
