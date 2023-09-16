export declare class Hasher {
    private readonly round;
    constructor(round: number);
    private salter;
    hash(value: string): Promise<string>;
    static compare(password: string, hashed: string): Promise<boolean>;
}
export declare class Encoder {
    private readonly password;
    private readonly round;
    constructor(password: string, round: number);
    private getRandomIV;
    private salter;
    private getKey;
    encode(text: any): Promise<string>;
    decode(encryptedString: string): Promise<string>;
}
