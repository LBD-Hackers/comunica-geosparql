"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geometryType = void 0;
exports.parseWKT = parseWKT;
exports.typeMap = void 0;
var geometryType;
exports.geometryType = geometryType;

(function (geometryType) {
  geometryType["POINT"] = "point";
  geometryType["POINTZ"] = "pointz";
  geometryType["POLYGON"] = "polygon";
  geometryType["POLYGONZ"] = "polygonz";
  geometryType["UNKNOWN"] = "unknown";
})(geometryType || (exports.geometryType = geometryType = {}));

var typeMap = {
  "point": geometryType.POINT,
  "pointz": geometryType.POINTZ,
  "polygon": geometryType.POLYGON,
  "polygonz": geometryType.POLYGONZ
};
exports.typeMap = typeMap;

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
//# sourceMappingURL=wkt-parser.js.map