export class Node {
  public parent?: Node;
  public position?: [number, number];

  public g: number;
  public h: number;
  public f: number;
  constructor(parent?: Node, position?: [number, number]) {
    this.parent = parent;
    this.position = position;

    this.g = 0;
    this.h = 0;
    this.f = 0;
  }

  // Compare nodes by position
  public equalTo(other: Node): boolean {
    return (
      this.position![0] == other.position![0] &&
      this.position![1] == other.position![1]
    );
  }
}

export class AStar {
  public static run(
    board2d: Array<any[]>,
    start: [number, number],
    end: [number, number]
  ): Array<[number, number]> {
    const startNode = new Node(undefined, start);
    startNode.g = startNode.h = startNode.f = 0;
    const endNode = new Node(undefined, end);
    endNode.g = endNode.h = endNode.f = 0;

    const openSet: Node[] = [];
    const closedSet: Node[] = [];

    openSet.push(startNode);

    //Keep running till all nodes have been closed
    while (openSet.length > 0) {
      // if(debug){
      //     const openclosedboard = mainBoard.getOpenSet2dFromBoard(open_set, closed_set)
      //     mainBoard.printOpenSetBoard(openclosedboard)
      // }

      // Get the lowest cost node and set as current node
      // Pop current node off open list, add to closed list
      openSet.sort(function(a, b) {
        return a.f - b.f;
      });
      const currentNode: Node = openSet.shift()!;
      //open_set.pop(current_index)
      closedSet.push(currentNode);

      // if(debug):
      //     print(str(current_node.position[0]) + ' ' + str(current_node.position[1]))

      //console.log(currentNode.position[0] + ' ' + currentNode.position[1]);

      // Exit the loop once end node has been hit and return path
      if (currentNode.equalTo(endNode)) {
        const path = Array<[number, number]>();
        let current = currentNode;
        while (current != null) {
          path.push(current.position!);
          current = current.parent!;
        }
        return path.reverse(); // Return reversed path
      }

      // Unzip the current node position
      const x = currentNode.position![0];
      const y = currentNode.position![1];

      const startX = startNode.position![0];
      const startY = startNode.position![1];

      // Get neighbors
      //const neighbors = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
      //   const neighbors2: Array<[number, number]> = [
      //     [x - 1, y - 1],
      //     [x - 1, y],
      //     [x - 1, y + 1],
      //     [x, y + 1],
      //     [x + 1, y + 1],
      //     [x + 1, y],
      //     [x + 1, y - 1],
      //     [x, y - 1]
      //   ];

      const neighbors: Array<[number, number]> = board2d[startX][
        startY
      ].inRangeCellsPositions(x, y);

      //   if(neighbors.length != neighbors2.length || neighbors[0][0] != neighbors2[0][0] )
      //   {
      //       console.log("sumting wong");
      //   }

      for (const node of neighbors) {
        //neighbors.forEach(node => { // Adjacent squares

        // Make sure within range
        if (
          node[0] > board2d.length - 1 ||
          node[0] < 0 ||
          node[1] > board2d[board2d.length - 1].length - 1 ||
          node[1] < 0
        ) {
          continue;
        }

        // Make sure terrain is passable
        if (!(board2d[node[0]][node[1]].passable == "Yes")) {
          continue;
        }
        // if (!((node[0] > (board2d.length - 1) || node[0] < 0 || node[1] > (board2d[board2d.length-1].length -1) || node[1] < 0) || (!(board2d[node[0]][node[1]] == null || board2d[node[0]][node[1]].passable == "Yes"))))
        // {

        // Create new node
        const newNode = new Node(currentNode, node);

        // Append
        if (
          closedSet.some(
            (closedNode) =>
              closedNode.position![0] == newNode.position![0] &&
              closedNode.position![1] == newNode.position![1]
          )
        ) {
          continue;
        }

        // Generate heuristics (A Star)
        newNode.g = currentNode.g + 1;
        newNode.h =
          (newNode.position![0] - endNode.position![0]) ** 2 +
          (newNode.position![1] - endNode.position![1]) ** 2;
        newNode.f = newNode.g + newNode.h;

        // Generate heuristics (Manhattan distance)
        // new_node.g = abs(new_node.position[0] - start_node.position[0]) + abs(new_node.position[1] - start_node.position[1])
        // new_node.h = abs(new_node.position[0] - end_node.position[0]) + abs(new_node.position[1] - end_node.position[1])
        // new_node.f = new_node.g + new_node.h

        // Child is already in the open list
        let add = true;
        for (const openNode of openSet) {
          if (newNode.equalTo(openNode) && newNode.f >= openNode.f) {
            add = false;
            break;
          }
        }

        if (add) {
          //If child isn't open already with a better value (loop didnt break)
          // Add the child to the open list
          openSet.push(newNode);
        }

        // if(!openSet.some(openNode => newNode.equalTo(openNode) && newNode.f >= openNode.f)) {

        //     openSet.push(newNode);
        // }
        // }
        // }
      }
    }

    return [];
  }
}
