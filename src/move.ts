// Please update this type as same as with the data shape.

type List = { id: string; name: string; files: { id: string; name: string }[] }[];

export default function move(list: List, source: string, destination: string): List {
  function findItem(id: string) {
    for (let i = 0; i < list.length; i += 1) {
      const folder = list[i];
      if (folder.id === id) return folder;

      const file = folder.files.find((f) => f.id === id);
      if (file) return file;
    }
    return null;
  }

  const sourceItem = findItem(source);
  const destinationItem = findItem(destination);

  if (sourceItem && destinationItem) {
    if (Object.prototype.hasOwnProperty.call(sourceItem, 'files'))
      throw new Error('You cannot move a folder');
    if (!Object.prototype.hasOwnProperty.call(destinationItem, 'files'))
      throw new Error('You cannot specify a file as the destination');

    // Remove item from the source
    list.forEach((folder) => {
      const fileIndex = folder.files.indexOf(sourceItem);
      if (fileIndex > -1) folder.files.splice(fileIndex, 1);
    });

    // Add Item to destination
    list.forEach((folder) => {
      if (folder === destinationItem) folder.files.push(sourceItem);
    });
  }

  return list;
}
