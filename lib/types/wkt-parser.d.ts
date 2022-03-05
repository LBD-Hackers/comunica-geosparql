export interface WKTGeometry {
    type: geometryType;
    value: any;
}
export declare enum geometryType {
    POINT = "point",
    POINTZ = "pointz",
    POLYGON = "polygon",
    POLYGONZ = "polygonz",
    UNKNOWN = "unknown"
}
export declare const typeMap: {
    point: geometryType;
    pointz: geometryType;
    polygon: geometryType;
    polygonz: geometryType;
};
export declare function parseWKT(wktString: string): WKTGeometry | null;
//# sourceMappingURL=wkt-parser.d.ts.map