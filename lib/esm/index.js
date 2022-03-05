"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geoSPARQLFunctions = void 0;

var _rdfDataFactory = require("rdf-data-factory");

var _wktParser = require("./wkt-parser");

var _pointInPolygon = _interopRequireDefault(require("point-in-polygon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DF = new _rdfDataFactory.DataFactory();
const geoSPARQLFunctions = {
  // geosf:distance(p1, p2, decimals, multiplicationFactor)
  'http://www.opengis.net/def/function/geosparql/distance'(args) {
    // Set defaults
    const decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;
    const mf = args[3] != undefined ? parseFloat(args[3].value) : 1;

    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
      const p1 = (0, _wktParser.parseWKT)(args[0].value);
      const p2 = (0, _wktParser.parseWKT)(args[1].value);

      if (p1 && p2 && p1.value && p2.value) {
        const a = p1.value[0] - p2.value[0];
        const b = p1.value[1] - p2.value[1];
        let d; // XY

        if (p1.type == _wktParser.geometryType.POINT && p2.type == _wktParser.geometryType.POINT) {
          d = Math.sqrt(a * a + b * b);
        } // XYZ


        if (p1.type == _wktParser.geometryType.POINTZ && p2.type == _wktParser.geometryType.POINTZ) {
          const c = p1.value[2] - p2.value[2]; // Get z- coordinates

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
  'http://www.opengis.net/def/function/geosparql/inside'(args) {
    const decimals = args[2] != undefined ? parseFloat(args[2].value) : 8;

    if (args[0].termType === 'Literal' && args[1].termType === 'Literal') {
      const point = (0, _wktParser.parseWKT)(args[0].value);
      const polygon = (0, _wktParser.parseWKT)(args[1].value);

      if (point && polygon && point.value && polygon.value.length) {
        if (polygon.type == _wktParser.geometryType.POLYGON) {
          const pg = polygon.value;
          let p = point.value;

          if (point.type == _wktParser.geometryType.POINTZ) {
            // Pop last item to make XY instead of XYZ
            p.pop();
          }

          const inside = (0, _pointInPolygon.default)(p, pg);
          return DF.literal(inside.toString(), DF.namedNode('http://www.w3.org/2001/XMLSchema#boolean'));
        }
      }
    }

    return DF.literal("ERROR");
  }

};
exports.geoSPARQLFunctions = geoSPARQLFunctions;

function round(num, decimals = 0) {
  return Math.round(num * 10 ** decimals + Number.EPSILON) / 10 ** decimals;
}
//# sourceMappingURL=index.js.map