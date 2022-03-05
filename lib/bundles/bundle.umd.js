(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ifc-lbd"] = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var rdfDataFactory = {};

	var BlankNode$1 = {};

	Object.defineProperty(BlankNode$1, "__esModule", { value: true });
	BlankNode$1.BlankNode = void 0;
	/**
	 * A term that represents an RDF blank node with a label.
	 */
	class BlankNode {
	    constructor(value) {
	        this.termType = 'BlankNode';
	        this.value = value;
	    }
	    equals(other) {
	        return !!other && other.termType === 'BlankNode' && other.value === this.value;
	    }
	}
	BlankNode$1.BlankNode = BlankNode;

	var DataFactory$1 = {};

	var DefaultGraph$1 = {};

	Object.defineProperty(DefaultGraph$1, "__esModule", { value: true });
	DefaultGraph$1.DefaultGraph = void 0;
	/**
	 * A singleton term instance that represents the default graph.
	 * It's only allowed to assign a DefaultGraph to the .graph property of a Quad.
	 */
	class DefaultGraph {
	    constructor() {
	        this.termType = 'DefaultGraph';
	        this.value = '';
	        // Private constructor
	    }
	    equals(other) {
	        return !!other && other.termType === 'DefaultGraph';
	    }
	}
	DefaultGraph$1.DefaultGraph = DefaultGraph;
	DefaultGraph.INSTANCE = new DefaultGraph();

	var Literal$1 = {};

	var NamedNode$1 = {};

	Object.defineProperty(NamedNode$1, "__esModule", { value: true });
	NamedNode$1.NamedNode = void 0;
	/**
	 * A term that contains an IRI.
	 */
	class NamedNode {
	    constructor(value) {
	        this.termType = 'NamedNode';
	        this.value = value;
	    }
	    equals(other) {
	        return !!other && other.termType === 'NamedNode' && other.value === this.value;
	    }
	}
	NamedNode$1.NamedNode = NamedNode;

	Object.defineProperty(Literal$1, "__esModule", { value: true });
	Literal$1.Literal = void 0;
	const NamedNode_1$1 = NamedNode$1;
	/**
	 * A term that represents an RDF literal, containing a string with an optional language tag or datatype.
	 */
	class Literal {
	    constructor(value, languageOrDatatype) {
	        this.termType = 'Literal';
	        this.value = value;
	        if (typeof languageOrDatatype === 'string') {
	            this.language = languageOrDatatype;
	            this.datatype = Literal.RDF_LANGUAGE_STRING;
	        }
	        else if (languageOrDatatype) {
	            this.language = '';
	            this.datatype = languageOrDatatype;
	        }
	        else {
	            this.language = '';
	            this.datatype = Literal.XSD_STRING;
	        }
	    }
	    equals(other) {
	        return !!other && other.termType === 'Literal' && other.value === this.value &&
	            other.language === this.language && other.datatype.equals(this.datatype);
	    }
	}
	Literal$1.Literal = Literal;
	Literal.RDF_LANGUAGE_STRING = new NamedNode_1$1.NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString');
	Literal.XSD_STRING = new NamedNode_1$1.NamedNode('http://www.w3.org/2001/XMLSchema#string');

	var Quad$1 = {};

	Object.defineProperty(Quad$1, "__esModule", { value: true });
	Quad$1.Quad = void 0;
	/**
	 * An instance of DefaultGraph represents the default graph.
	 * It's only allowed to assign a DefaultGraph to the .graph property of a Quad.
	 */
	class Quad {
	    constructor(subject, predicate, object, graph) {
	        this.termType = 'Quad';
	        this.value = '';
	        this.subject = subject;
	        this.predicate = predicate;
	        this.object = object;
	        this.graph = graph;
	    }
	    equals(other) {
	        // `|| !other.termType` is for backwards-compatibility with old factories without RDF* support.
	        return !!other && (other.termType === 'Quad' || !other.termType) &&
	            this.subject.equals(other.subject) &&
	            this.predicate.equals(other.predicate) &&
	            this.object.equals(other.object) &&
	            this.graph.equals(other.graph);
	    }
	}
	Quad$1.Quad = Quad;

	var Variable$1 = {};

	Object.defineProperty(Variable$1, "__esModule", { value: true });
	Variable$1.Variable = void 0;
	/**
	 * A term that represents a variable.
	 */
	class Variable {
	    constructor(value) {
	        this.termType = 'Variable';
	        this.value = value;
	    }
	    equals(other) {
	        return !!other && other.termType === 'Variable' && other.value === this.value;
	    }
	}
	Variable$1.Variable = Variable;

	Object.defineProperty(DataFactory$1, "__esModule", { value: true });
	DataFactory$1.DataFactory = void 0;
	const BlankNode_1 = BlankNode$1;
	const DefaultGraph_1 = DefaultGraph$1;
	const Literal_1 = Literal$1;
	const NamedNode_1 = NamedNode$1;
	const Quad_1 = Quad$1;
	const Variable_1 = Variable$1;
	let dataFactoryCounter = 0;
	/**
	 * A factory for instantiating RDF terms and quads.
	 */
	class DataFactory {
	    constructor(options) {
	        this.blankNodeCounter = 0;
	        options = options || {};
	        this.blankNodePrefix = options.blankNodePrefix || `df_${dataFactoryCounter++}_`;
	    }
	    /**
	     * @param value The IRI for the named node.
	     * @return A new instance of NamedNode.
	     * @see NamedNode
	     */
	    namedNode(value) {
	        return new NamedNode_1.NamedNode(value);
	    }
	    /**
	     * @param value The optional blank node identifier.
	     * @return A new instance of BlankNode.
	     *         If the `value` parameter is undefined a new identifier
	     *         for the blank node is generated for each call.
	     * @see BlankNode
	     */
	    blankNode(value) {
	        return new BlankNode_1.BlankNode(value || `${this.blankNodePrefix}${this.blankNodeCounter++}`);
	    }
	    /**
	     * @param value              The literal value.
	     * @param languageOrDatatype The optional language or datatype.
	     *                           If `languageOrDatatype` is a NamedNode,
	     *                           then it is used for the value of `NamedNode.datatype`.
	     *                           Otherwise `languageOrDatatype` is used for the value
	     *                           of `NamedNode.language`.
	     * @return A new instance of Literal.
	     * @see Literal
	     */
	    literal(value, languageOrDatatype) {
	        return new Literal_1.Literal(value, languageOrDatatype);
	    }
	    /**
	     * This method is optional.
	     * @param value The variable name
	     * @return A new instance of Variable.
	     * @see Variable
	     */
	    variable(value) {
	        return new Variable_1.Variable(value);
	    }
	    /**
	     * @return An instance of DefaultGraph.
	     */
	    defaultGraph() {
	        return DefaultGraph_1.DefaultGraph.INSTANCE;
	    }
	    /**
	     * @param subject   The quad subject term.
	     * @param predicate The quad predicate term.
	     * @param object    The quad object term.
	     * @param graph     The quad graph term.
	     * @return A new instance of Quad.
	     * @see Quad
	     */
	    quad(subject, predicate, object, graph) {
	        return new Quad_1.Quad(subject, predicate, object, graph || this.defaultGraph());
	    }
	    /**
	     * Create a deep copy of the given term using this data factory.
	     * @param original An RDF term.
	     * @return A deep copy of the given term.
	     */
	    fromTerm(original) {
	        // TODO: remove nasty any casts when this TS bug has been fixed:
	        //  https://github.com/microsoft/TypeScript/issues/26933
	        switch (original.termType) {
	            case 'NamedNode':
	                return this.namedNode(original.value);
	            case 'BlankNode':
	                return this.blankNode(original.value);
	            case 'Literal':
	                if (original.language) {
	                    return this.literal(original.value, original.language);
	                }
	                if (!original.datatype.equals(Literal_1.Literal.XSD_STRING)) {
	                    return this.literal(original.value, this.fromTerm(original.datatype));
	                }
	                return this.literal(original.value);
	            case 'Variable':
	                return this.variable(original.value);
	            case 'DefaultGraph':
	                return this.defaultGraph();
	            case 'Quad':
	                return this.quad(this.fromTerm(original.subject), this.fromTerm(original.predicate), this.fromTerm(original.object), this.fromTerm(original.graph));
	        }
	    }
	    /**
	     * Create a deep copy of the given quad using this data factory.
	     * @param original An RDF quad.
	     * @return A deep copy of the given quad.
	     */
	    fromQuad(original) {
	        return this.fromTerm(original);
	    }
	    /**
	     * Reset the internal blank node counter.
	     */
	    resetBlankNodeCounter() {
	        this.blankNodeCounter = 0;
	    }
	}
	DataFactory$1.DataFactory = DataFactory;

	(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(BlankNode$1, exports);
	__exportStar(DataFactory$1, exports);
	__exportStar(DefaultGraph$1, exports);
	__exportStar(Literal$1, exports);
	__exportStar(NamedNode$1, exports);
	__exportStar(Quad$1, exports);
	__exportStar(Variable$1, exports);

	}(rdfDataFactory));

	var geometryType;

	(function (geometryType) {
	  geometryType["POINT"] = "point";
	  geometryType["POINTZ"] = "pointz";
	  geometryType["POLYGON"] = "polygon";
	  geometryType["POLYGONZ"] = "polygonz";
	  geometryType["UNKNOWN"] = "unknown";
	})(geometryType || (geometryType = {}));

	var typeMap = {
	  "point": geometryType.POINT,
	  "pointz": geometryType.POINTZ,
	  "polygon": geometryType.POLYGON,
	  "polygonz": geometryType.POLYGONZ
	};
	function parseWKT(wktString) {
	  var type = getType(wktString);

	  if (type == geometryType.POINT || type == geometryType.POINTZ) {
	    var coordinates = parsePoint(wktString);
	    return {
	      value: coordinates,
	      type: type
	    };
	  }

	  if (type == geometryType.POLYGON) {
	    var _coordinates = parsePolygon(wktString);

	    return {
	      value: _coordinates,
	      type: type
	    };
	  }
	}

	function getType(wktString) {
	  wktString = wktString.toLocaleLowerCase();
	  var typeStr = wktString.split("(")[0]; // get everything before the paranthesis

	  typeStr = typeStr.replace(/\s+/, ""); // remove all white spaces

	  if (Object.keys(typeMap).indexOf(typeStr) != -1) {
	    return typeMap[typeStr];
	  }

	  return geometryType.UNKNOWN;
	}

	function parsePolygon(wktString) {
	  var polygon = []; // How many parantheses?

	  var count = wktString.split("(").length; // Non-donut polygon

	  if (count == 2) {
	    var points = wktString.split("(")[1].split(")")[0].trim(); // Ex ["0 0 0"]

	    points.split(",").map(function (point) {
	      point = point.trim();
	      polygon.push(parseStrCoordinate(point));
	    });
	  } // Donut polygon
	  else {
	    console.log(wktString);
	    console.log("Non-donut not yet supported!!");
	  }

	  return polygon;
	}

	function parsePoint(wktString) {
	  var point = wktString.split("(")[1].split(")")[0].trim(); // Ex ["0 0 0"]

	  return parseStrCoordinate(point);
	}

	function parseStrCoordinate(strCoordinate) {
	  return strCoordinate.split(" ").map(function (p) {
	    return parseFloat(p);
	  });
	}

	var pointInPolygon$1 = {exports: {}};

	var flat = function pointInPolygonFlat (point, vs, start, end) {
	    var x = point[0], y = point[1];
	    var inside = false;
	    if (start === undefined) start = 0;
	    if (end === undefined) end = vs.length;
	    var len = (end-start)/2;
	    for (var i = 0, j = len - 1; i < len; j = i++) {
	        var xi = vs[start+i*2+0], yi = vs[start+i*2+1];
	        var xj = vs[start+j*2+0], yj = vs[start+j*2+1];
	        var intersect = ((yi > y) !== (yj > y))
	            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
	        if (intersect) inside = !inside;
	    }
	    return inside;
	};

	// ray-casting algorithm based on
	// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

	var nested = function pointInPolygonNested (point, vs, start, end) {
	    var x = point[0], y = point[1];
	    var inside = false;
	    if (start === undefined) start = 0;
	    if (end === undefined) end = vs.length;
	    var len = end - start;
	    for (var i = 0, j = len - 1; i < len; j = i++) {
	        var xi = vs[i+start][0], yi = vs[i+start][1];
	        var xj = vs[j+start][0], yj = vs[j+start][1];
	        var intersect = ((yi > y) !== (yj > y))
	            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
	        if (intersect) inside = !inside;
	    }
	    return inside;
	};

	var pointInPolygonFlat = flat;
	var pointInPolygonNested = nested;

	pointInPolygon$1.exports = function pointInPolygon (point, vs, start, end) {
	    if (vs.length > 0 && Array.isArray(vs[0])) {
	        return pointInPolygonNested(point, vs, start, end);
	    } else {
	        return pointInPolygonFlat(point, vs, start, end);
	    }
	};
	pointInPolygon$1.exports.nested = pointInPolygonNested;
	pointInPolygon$1.exports.flat = pointInPolygonFlat;

	var pointInPolygon = pointInPolygon$1.exports;

	var DF = new rdfDataFactory.DataFactory();
	var geoSPARQLFunctions = {
	  // geosf:distance(p1, p2, decimals, multiplicationFactor)
	  'http://www.opengis.net/def/function/geosparql/distance': function httpWwwOpengisNetDefFunctionGeosparqlDistance(args) {
	    // Set defaults
	    var decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;
	    var mf = args[3] != undefined ? parseFloat(args[3].value) : 1;

	    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
	      var p1 = parseWKT(args[0].value);
	      var p2 = parseWKT(args[1].value);

	      if (p1 && p2 && p1.value && p2.value) {
	        var a = p1.value[0] - p2.value[0];
	        var b = p1.value[1] - p2.value[1];
	        var d; // XY

	        if (p1.type == geometryType.POINT && p2.type == geometryType.POINT) {
	          d = Math.sqrt(a * a + b * b);
	        } // XYZ


	        if (p1.type == geometryType.POINTZ && p2.type == geometryType.POINTZ) {
	          var c = p1.value[2] - p2.value[2]; // Get z- coordinates

	          d = Math.sqrt(a * a + b * b + c * c);
	        } // Apply multiplication factor and round


	        d = d * mf;
	        d = round(d, decimals);
	        return DF.literal(d.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#decimal'));
	      }
	    }

	    return DF.literal("ERROR");
	  },
	  // geosf:inside(point, polygon)
	  'http://www.opengis.net/def/function/geosparql/inside': function httpWwwOpengisNetDefFunctionGeosparqlInside(args) {
	    args[2] != undefined ? parseFloat(args[2].value) : 8;

	    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
	      var point = parseWKT(args[0].value);
	      var polygon = parseWKT(args[1].value);

	      if (point && polygon && point.value && polygon.value.length) {
	        if (polygon.type == geometryType.POLYGON) {
	          var pg = polygon.value;
	          var p = point.value;

	          if (point.type == geometryType.POINTZ) {
	            // Pop last item to make XY instead of XYZ
	            p.pop();
	          }

	          var inside = pointInPolygon(p, pg);
	          return DF.literal(inside.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'));
	        }
	      }
	    }

	    return DF.literal("ERROR");
	  }
	};

	function round(num) {
	  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  return Math.round(num * Math.pow(10, decimals) + Number.EPSILON) / Math.pow(10, decimals);
	}

	exports.geoSPARQLFunctions = geoSPARQLFunctions;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bundle.umd.js.map
