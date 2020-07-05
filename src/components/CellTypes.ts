export class GoLEntity {
  constructor(
    Y: number,
    X: number,
    Name: string,
    Color: string,
    ViewRange: number,
    Speed: number
  ) {
    this.location = [Y, X];
    this.name = Name;
    this.color = Color;
    this.viewRange = ViewRange;
    this.speed = Speed;
  }
  location: [number, number] = [0, 0];
  name = "";
  color = "";
  currentAge = 0;
  maxAge = 50;
  viewRange = 50; // how far the person can see
  speed = 1; // when the person gets to make their move in the frame
  movementRange = 1; // how far the person can go
  currentAction = "Wandering";
  targetLocation: [number, number] = [0, 0];
  passable = "Semi";
  wanderCount = 0;
  wanderLimit = 10;
  foodAte = 0;
  selected = false;
  move(Y: number, X: number) {
    this.location = [Y, X];
  }
}

export class GoLWall {
  constructor(Y: number, X: number) {
    this.location = [Y, X];
  }
  name = "";
  location: [number, number] = [0, 0];
  passable = "No";
  color = "white";
}

export class GoLFood {
  constructor(Y: number, X: number, Name: string) {
    this.location = [Y, X];
    this.name = Name;
  }
  name = "";
  location: [number, number] = [0, 0];
  passable = "Yes";
  color = "red";
}
