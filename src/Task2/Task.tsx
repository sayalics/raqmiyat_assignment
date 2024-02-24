const directory = [
  {
    name: "folder1",
    children: [
      { name: "file1.txt", children: [] },
      {
        name: "folder2",
        children: [
          { name: "file2.txt", children: [] },
          { name: "file3.txt", children: [] },
        ],
      },
    ],
  },
  { name: "file4.txt", children: [] },
];

// const sampleDirectory = [
//   {
//     name: 'Folder1',
//     children: [
//       {
//         name: 'File1-1',
//         children: [],
//       },
//       {
//         name: 'File1-2',
//         children: [],
//       },
//     ],
//   },
//   {
//     name: 'Folder2',
//     children: [
//       {
//         name: 'File2-1',
//         children: [
//           {
//             name: 'File2-1-1',
//             children: [],
//           },
//           {
//             name: 'File2-1-2',
//             children: [],
//           },
//         ],
//       },
//       {
//         name: 'File2-2',
//         children: [],
//       },
//     ],
//   },
//   {
//     name: 'File3',
//     children: [],
//   },
// ];

function flattenDirectory(directory) {
  const result = [];

  function flat(currentPath, currentDirectory) {
    currentDirectory.forEach((item) => {
      const itemPath = currentPath + (currentPath !== "" ? "/" : "") + item.name;

      if (item.children.length === 0) {
        result.push({ path: itemPath});
      } else {
        flat(itemPath, item.children);
      }
    });
  }

  flat("", directory);

  // console.log(result)

  // Extract and return only the paths
  return result.map((item) => item.path);
}


// const flattenedDirectory = flattenDirectory(sampleDirectory);
const flattenedDirectory = flattenDirectory(directory);
console.log(flattenedDirectory);
