
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
  
  const insert = (root,value) =>{
    if( root === null) return node(value);
    if( root.value === value) return root;
    if(value< root.value){
      root.left = insert(root.left,value);
    }
    if(value > root.value){
      root.right = insert(root.right,value);
    }
    return root;
  }
  
  const remove = (root,value) =>{
    if (root === null) return root;
  
    if(root.value > value){
      root.left = remove(root.left,value);
    }
    else if(root.value < value){
      root.right = remove(root.right,value);
    }
    else{
      if(root.left === null) return root.right;
      if(root.right === null) return root.left;
      let replacement = replacementValue(root);
      root.value = replacement.value;
      root.right = remove(root.right,replacement.value);
    }
    return root;
  }
  
  const find = (value)=>{
   return searchValue(root,value);
  }
  const searchValue = (root,value) =>{
    if(root === null) return "not found";
    else if(root.value === value) return root;
    if(root.value > value){
      root = searchValue(root.left,value);
    }else if (root.value < value ){
      root = searchValue(root.right,value);
    }
    return root;
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
    return Math.max(left,right) +1;
  }

  const replacementValue = (root)=>{
    root = root.right;
    while(root !== null && root.left !== null){
      root = root.left
    }
    return root;
  }
  return {insert,remove,getRoot, find, levelOrder,inOrder,preOrder,postOrder,height};
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

let example = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
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
let test = [1,2,3,4,5]
test = tree(test);
console.log(test.height());