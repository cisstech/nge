export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const copy = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if ((obj as any).hasOwnProperty(key)) {
      (copy as any)[key] = deepCopy(obj[key]);
    }
  }
  return copy as T;
}
