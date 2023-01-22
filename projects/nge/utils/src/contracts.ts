export function ensuresNonNull<T>(value?: T, message?: string): value is T {
    if (value == null) {
        throw new ReferenceError(message);
    }
    return true;
}

export function ensuresNonNullArray<T>(value?: T[], message?: string): value is T[] {
    if (value == null) {
        throw new ReferenceError(message);
    }
    value.forEach(v => {
        if (v == null) {
            throw ReferenceError(message);
        }
    });
    return true;
}

export function ensuresNonNullString(value?: string, message?: string): value is string {
    if (value == null || value.trim().length === 0) {
        message = message || `'require non null|empty string`;
        throw new ReferenceError(message);
    }
    return true;
}

export function ensures(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
