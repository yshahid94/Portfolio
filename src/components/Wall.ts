export default class GoLWall {
  constructor(Y: number, X: number) {
    this.location = [Y, X];
  }
  name = "";
  location = [0, 0];
  passable = "No";
  color = [100, 100, 100];
}
