"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geometryType = void 0;
exports.parseWKT = parseWKT;
exports.typeMap = void 0;
let geometryType;
exports.geometryType = geometryType;

(function (geometryType) {
  geometryType["POINT"] = "point";
  geometryType["POINTZ"] = "pointz";
  geometryType["POLYGON"] = "polygon";
  geometryType["POLYGONZ"] = "polygonz";
  geometryType["UNKNOWN"] = "unknown";
})(geometryType || (exports.geometryType = geometryType = {}));

const typeMap = {
  "point": geometryType.POINT,
  "pointz": geometryType.POINTZ,
  "polygon": geometryType.POLYGON,
  "polygonz": geometryType.POLYGONZ
};
exports.typeMap = typeMap;

function parseWKT(wktString) {
  const type = getType(wktString);

  if (type == geometryType.POINT || type == geometryType.POINTZ) {
    const coordinates = parsePoint(wktString);
    return {
      value: coordinates,
      type
    };
  }

  if (type == geometryType.POLYGON) {
    const coordinates = parsePolygon(wktString);
    return {
      value: coordinates,
      type
    };
  }
}

function getType(wktString) {
  wktString = wktString.toLocaleLowerCase();
  let typeStr = wktString.split("(")[0]; // get everything before the paranthesis

  typeStr = typeStr.replace(/\s+/, ""); // remove all white spaces

  if (Object.keys(typeMap).indexOf(typeStr) != -1) {
    return typeMap[typeStr];
  }

  return geometryType.UNKNOWN;
}

function parsePolygon(wktString) {
  let polygon = []; // How many parantheses?

  const count = wktString.split("(").length; // Non-donut polygon

  if (count == 2) {
    const points = wktString.split("(")[1].split(")")[0].trim(); // Ex ["0 0 0"]

    points.split(",").map(point => {
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
  const point = wktString.split("(")[1].split(")")[0].trim(); // Ex ["0 0 0"]

  return parseStrCoordinate(point);
}

function parseStrCoordinate(strCoordinate) {
  return strCoordinate.split(" ").map(p => parseFloat(p));
}
//# sourceMappingURL=wkt-parser.js.map