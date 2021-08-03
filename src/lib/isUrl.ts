export default function isUrl(text: string) {
  if (text.match(/\n/)) {
    return false;
  }

  try {
    const url = new URL(text);
    return url.hostname !== "" || /^[a-z][a-z0-9+\-.]*:\/\/\S+$/.test(text);
  } catch (err) {
    return false;
  }
}
