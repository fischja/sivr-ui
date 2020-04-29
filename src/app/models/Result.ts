export class Result {
    v3CId: number;
    keyframeNumber: number;
    thumbnail: any;

    constructor(v3CId: number, frame: number) {
        this.v3CId = v3CId;
        this.keyframeNumber = frame;
    }


}