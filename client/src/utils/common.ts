export const blobtoDataURL = (
  blob: Blob,
  callback: (data: string | ArrayBuffer | null) => void
) => {
  const fr = new FileReader()
  fr.onload = function(e) {
    callback(e.target!.result)
  }
  fr.readAsDataURL(blob)
}
