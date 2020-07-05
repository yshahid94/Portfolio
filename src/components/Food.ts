export default class GoLFood {
  constructor(Y: number, X: number, Name: string) {
    this.location = [Y, X];
    this.name = Name;
  }
  name = "";
  location = [0, 0];
  passable = "Yes";
  color = [0, 255, 0];
}
