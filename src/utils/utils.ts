export const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) {
    return text
  } else {
    return text.slice(0, trimBy) + '...'
  }
}
