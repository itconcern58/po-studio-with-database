export class Demo {
    static SumValue(): number {
      throw new Error("Method not implemented.");
    }
    sum = 10;

    get SumValue() {
        return this.sum;
    }
}