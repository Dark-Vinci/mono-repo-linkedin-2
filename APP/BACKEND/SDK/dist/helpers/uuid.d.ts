export declare class UUID {
    private value;
    private zeroUUID;
    constructor(uuid: string);
    static new(): UUID;
    static nil(): UUID;
    static parse(uuid: string): UUID;
    private static isValidUUID;
    toString(): string;
    toJSON(): string;
    private static fromJSON;
    static reviver<T>(_key: string, value: any): T | any;
}
