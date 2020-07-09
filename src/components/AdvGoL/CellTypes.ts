
export enum Direction {
    Plus,
    Cross,
    Diagonal
  }

  class GoLCell {
    constructor(
      Y: number,
      X: number
    ) {
      this.location = [Y, X];
    }
    location: [number, number] = [0, 0];
    public atSameLocation(otherCell: any): boolean {
      return (this.location[0] == otherCell.location[0] &&
        this.location[1] == otherCell.location[1])
    }
  }
  
  export class GoLEntity extends GoLCell {
  constructor(
    Y: number,
    X: number,
    Name: string,
    Color: [number, number, number],
    ViewRange: number,
    Speed: number,
    directionStyle: Direction
  ) {
    super(Y, X);
    this.name = Name;
    this.color = Color;
    this.viewRange = ViewRange;
    this.speed = Speed;
    this.directionStyle = directionStyle;
  }
  name = "";
  color: [number, number, number] = [0,0,0];
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
  directionStyle: Direction = Direction.Plus;
  log: string[] = [];
  move(Y: number, X: number) {
    this.location = [Y, X];
  }
  inRangeCellsPositions(x: number, y: number): Array<[number, number]>{
    
        // Get neighbors
      if(this.directionStyle == Direction.Cross)
      {
        return  [
            [x - 1, y - 1],
            [x - 1, y + 1],
            [x + 1, y + 1],
            [x + 1, y - 1],
          ];
      }
      else if(this.directionStyle == Direction.Plus){
        return [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1]
        ];
      }
      else {
        return  [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
            [x + 1, y],
            [x + 1, y - 1],
            [x, y - 1]
          ];
      }
  }
}

export class GoLWall {
  constructor(Y: number, X: number) {
    this.location = [Y, X];
  }
  name = "";
  location: [number, number] = [0, 0];
  passable = "No";
  color = [255, 255, 255];
}

export class GoLFood {
  constructor(Y: number, X: number, Name: string) {
    this.location = [Y, X];
    this.name = Name;
  }
  name = "";
  location: [number, number] = [0, 0];
  passable = "Yes";
  color = [255, 0, 0];
}

export class GoLEmpty {
    constructor(Y: number, X: number) {
      this.location = [Y, X];
    }
    name = "";
    location: [number, number] = [0, 0];
    passable = "Yes";
    color = [0, 0, 0];
  }
