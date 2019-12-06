export const blobtoDataURL = (blob: Blob, callback: (data: string | ArrayBuffer | null) => void) => {
  const fr = new FileReader()
  fr.onload = function(e) {
    callback(e.target!.result)
  }
  fr.readAsDataURL(blob)
}

export const blobToFile = (blobData: Blob, fileName: string): File => {
  var blobReadyForFile: any = blobData

  // add missing property to blob object, get ready to case File type
  blobReadyForFile.lastModifiedDate = new Date()
  blobReadyForFile.name = fileName

  // Cast to a File() type
  return <File>blobReadyForFile
}
