
const node = function (nodeValue){
  const value = nodeValue;
  const left = null;
  const right = null;
  return {  value, left, right}
}

const buildTree = (array) =>{
  let sortedArray = mergeSort(array);
  sortedArray = duplicate(sortedArray);
  let length = sortedArray.length - 1;
  let balancedTree = bst(sortedArray, 0, length);
  return balancedTree;
}



const bst = (array, start,end) =>{
  if( start > end ) return null;
  let mid = start + Math.floor((end - start) / 2);
  let root = node(array[mid]);
  root.left = bst (array, start, mid-1);
  root.right = bst (array, mid+1, end)
  return root;
}

const tree = function (array){
  let root = buildTree(array);

  const getRoot = ()=>{
    return root;
  }
  
  const insert = (currentNode,value) =>{
    if( currentNode === null) return node(value);
    if( currentNode.value === value) return currentNode;
    if(value< currentNode.value){
      currentNode.left = insert(currentNode.left,value);
    }
    if(value > currentNode.value){
      currentNode.right = insert(currentNode.right,value);
    }
    return currentNode;
  }
  
  const remove = (currentNode,value) =>{
    if (currentNode === null) return currentNode;
  
    if(currentNode.value > value){
      currentNode.left = remove(currentNode.left,value);
    }
    else if(currentNode.value < value){
      currentNode.right = remove(currentNode.right,value);
    }
    else{
      if(currentNode.left === null) return currentNode.right;
      if(currentNode.right === null) return currentNode.left;
      let replacement = replacementValue(currentNode);
      currentNode.value = replacement.value;
      currentNode.right = remove(currentNode.right,replacement.value);
    }
    return currentNode;
  }
  
  const find = (value)=>{
   return searchValue(root,value);
  }

  const searchValue = (currentNode,value) =>{
    if(currentNode === null) return "not found";
    else if(currentNode.value === value) return currentNode;
    if(currentNode.value > value){
      currentNode = searchValue(currentNode.left,value);
    }else if (currentNode.value < value ){
      currentNode = searchValue(currentNode.right,value);
    }
    return currentNode;
  }
  
  const levelOrder = (callBack,queue = [root]) =>{
    if(typeof callBack !== 'function') throw new Error("You messed up GUY! This aint a function.")
    if(queue.length === 0) return;
    else callBack(queue[0]);
    if (queue[0].left !== null) queue.push(queue[0].left)
    if (queue[0].right !== null) queue.push(queue[0].right);
    queue.shift();
    levelOrder(callBack,queue);
    return; 
  }
  const inOrder = (callBack,nodeRoot = root )=>{
    if( nodeRoot === null) return;
    inOrder(callBack,nodeRoot.left);
    callBack(nodeRoot);
    inOrder(callBack,nodeRoot.right);
  }
  const preOrder = (callBack,nodeRoot = root )=>{
    if( nodeRoot === null) return;
    callBack(nodeRoot);
    preOrder(callBack,nodeRoot.left);
    preOrder(callBack,nodeRoot.right);
  }

  const postOrder = (callBack,nodeRoot = root )=>{
    if( nodeRoot === null) return;
    postOrder(callBack,nodeRoot.left);
    postOrder(callBack,nodeRoot.right);
    callBack(nodeRoot);
  }

  const height = (node = root)=>{
    if (node === null) return -1;
    let left = height(node.left);
    let right = height(node.right);
    return Math.max(left,right) + 1;
  }

  const depth = (node) =>{
    let count = depthCount(root,node.value, 0)
    return count;
  }
  const depthCount = (currentNode,value,count) =>{
    if(currentNode === null) return "not found";
    else if(currentNode.value === value) return count;
    if(currentNode.value > value){
      return depthCount(currentNode.left,value,count+1);
    }else if (currentNode.value < value ){
      return depthCount(currentNode.right,value,count+1);
    }
  }
  const isBalanced = (node = root) =>{
    return isBalancedRec(root) > 0;
  }
  const isBalancedRec = (node = root)=>{
    if(node === null) return 0;

    let left = isBalancedRec(node.left);
    let right = isBalancedRec(node.right);

    if(left === -1 || right === -1 || Math.abs(left - right) > 1)
      return -1
    return Math.max(left,right) + 1;
  }
  const balanceTraversal = (arr = [], nodeRoot = root )=>{
    if( nodeRoot === null) return;
    balanceTraversal(arr,nodeRoot.left);
    balanceTraversal(arr,nodeRoot.right);
    arr.push(nodeRoot.value);
    return arr;
  }

  const reBalance = () =>{
    let arr = balanceTraversal();
    root = buildTree(arr);
  }
  return {insert,remove,getRoot, find, levelOrder,inOrder,preOrder,postOrder,height,depth, isBalanced,reBalance};
}

function mergeSort(arr){
  if(arr.length <= 1) return arr;
  let start = 0;
  let middle = (arr.length+start) / 2;
  let left = arr.slice(0,middle);
  let right = arr.slice(middle);
  let sortedLeft = mergeSort(left);
  let sortedRight = mergeSort(right);
  return merge(sortedLeft,sortedRight);
}

function merge(left,right){
  const arr =[];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while(leftIndex < left.length && rightIndex < right.length){
    if(left[leftIndex] < right[rightIndex]) { 
      arr.push(left[leftIndex]);
      leftIndex++;
    }
    else { 
      arr.push(right[rightIndex]);
      rightIndex++;
    }
  }
  left = left.slice(leftIndex);
  right = right.slice(rightIndex);
  return arr.concat(left).concat(right);
}

function duplicate(arr){
  let s = new Set(arr);
  arr = [...s];
  return arr;
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,7000,9000,123,435,213];
let balancedTree = tree(example)
// balancedTree.insert(balancedTree.getRoot(),200);
// prettyPrint(balancedTree.getRoot());
// balancedTree.remove(balancedTree.getRoot(),67);
// prettyPrint(balancedTree.getRoot());
// balancedTree.remove(balancedTree.getRoot(),4);
// prettyPrint(balancedTree.getRoot());
// prettyPrint(balancedTree.getRoot());
// prettyPrint(balancedTree.getRoot());
// balancedTree.levelOrder((root)=>{
//   root.value += 1;
// })
prettyPrint(balancedTree.getRoot());
// console.log(balancedTree.getRoot())
// balancedTree.levelOrder();
balancedTree.postOrder((root)=>{
  root.value += 1;
})
prettyPrint(balancedTree.getRoot());
console.log(balancedTree.height())
let testValue = balancedTree.find(24);
console.log(balancedTree.depth(testValue))
balancedTree.insert(balancedTree.getRoot(),10453)
balancedTree.insert(balancedTree.getRoot(),143250)
balancedTree.insert(balancedTree.getRoot(),4235)
balancedTree.reBalance();
prettyPrint(balancedTree.getRoot());
console.log("test")
console.log(balancedTree.isBalanced());

// console.log(balancedTree.find(5));
// console.log(balancedTree.height(balancedTree.find(325)))
// console.log(balancedTree.depth(balancedTree.find(325)))
// let test = [1,2,3,4,5]
// test = tree(test);
// console.log(test.height());