export default class GoLEntity {
  constructor(Y: number, X: number, Name: string, Color: string) {
    this.location = [Y, X];
    this.name = Name;
    this.color = Color;
  }
  location = [0, 0];
  name = "";
  color = "";
  currentAge = 0;
  maxAge = 50;
  viewRange = 10; // how far the person can see
  movementSpeed = 1; // when the person gets to make their move in the frame
  movementRange = 1; // how far the person can go
  currentAction = "Wandering";
  targetLocation = [0, 0];
  passable = "Semi";
  wanderCount = 0;
  wanderLimit = 10;
  move(Y: number, X: number) {
    this.location = [Y, X];
  }
}
