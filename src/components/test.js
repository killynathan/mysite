const PLAYER_1 = 0
const PLAYER_2 = 1

// const getWinner = (board) => {
//   return board[0] > board[board.length - 1] ? PLAYER_1 : PLAYER_2;
// }

// const hasWinner = (board, moves) => {

// }

// const isValidMove = (board, move) => {
//   for (let i = 0; i < board.length; i++) {
//     if (board[i] + move[i] < 0) return false;
//   }
//   return true;
// }

// console.log(isValidMove([1, 1, 3], [-1, -1, -4]));

// console.log(getWinner([3,0, 0, 2]))

// const makeMove = (board, move) => {
//   const result = [];
//   for (let i = 0; i < board.length; i++) {
//     result[i] = board[i] + move[i];
//   }
//   return result
// };

// console.log(makeMove([6,4,4,4], [-2, -2, 0, 0]));

// const getWins = (board, moves) => {
//   const wins = [0, 0];

//   const getWinsHelper = (board) => {
//     // if (hasWinner(board)) {
//     //   const winner = getWinner(board);
//     //   wins[winner] += 1;
//     //   return;
//     // }
//     let hasWinner = true;
//     for (const move of moves) {
//       if (isValidMove(board, move)) {
//         hasWinner = false;
//         const newBoard = makeMove(board, move);
//         getWinsHelper(newBoard);
//       }
//     }
//     if (hasWinner) {
//       const winner = getWinner(board);
//       wins[winner] += 1;
//     }
//   }

//   getWinsHelper(board);

//   console.log(`Player One: ${wins[0]}, Player Two: ${wins[1]}`);
// }

// const moves = [
//   [-2, -2, 0, 0],
// [-4, -4, -1, 0],
// [0, 0, -2, -2]
// ]

// getWins([6, 4, 4, 4], moves);

// We want to find employees who badged into our secured room together often. Given an unordered list of names and access times over a single day, find the largest group of people that were in the room together during two or more separate time periods, and the times when they were all present.

// badge_records = [
//   ["Paul",     1214, "enter"],
//   ["Paul",      830, "enter"],
//   ["Curtis",   1100, "enter"],
//   ["Paul",      903, "exit"],
//   ["John",      908, "exit"],
//   ["Paul",     1235, "exit"],
//   ["Jennifer",  900, "exit"],
//   ["Curtis",   1330, "exit"],
//   ["John",      815, "enter"],
//   ["Jennifer", 1217, "enter"],
//   ["Curtis",    745, "enter"],
//   ["John",     1230, "enter"],
//   ["Jennifer",  800, "enter"],
//   ["John",     1235, "exit"],
//   ["Curtis",    810, "exit"],
//   ["Jennifer", 1240, "exit"],
// ]

const remove = (root, cb) => {
  let newRoot = root
  if (cb(root) && root.children.length !== 0) {
    const leftMostChild = root.children[0]
    const filteredChildren = root.children.filter(
      n => n.value !== root.children[0].value
    )
    root.children[0].children.concat(filteredChildren)

    newRoot = root.children[0]
  }
  const helper = node => {
    //  if (cb(node)) {
    //      parent.children.concat(node.children)
    //      parent.children = parent.children.filter((n) => n.value !== node.value);
    //  }
    //  node.children.forEach((child) => {
    //      helper(child, node);
    //  })

    let newChildren = []
    node.children = node.children.filter(child => {
      shouldDelete = cb(child)
      console.log(child, shouldDelete)
      if (shouldDelete) {
        console.log("IN")
        newChildren = newChildren.concat(child.children)
      }
      return !shouldDelete
    })
    console.log("!!", newChildren)
    node.children = node.children.concat(newChildren)
    node.children.forEach(child => {
      helper(child)
    })
  }
  helper(newRoot)
  return newRoot
}

const a = { value: "a", children: [] }
const b = { value: "b", children: [] }
const c = { value: "c", children: [] }
const d = { value: "d", children: [b, a] }
const e = { value: "e", children: [d, c] }

const cb = node => {
  return node.value === "d"
}

console.log(remove(e, cb))
// e
// d     c
// b a
