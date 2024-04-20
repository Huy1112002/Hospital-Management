export function getRandomElement<T>(arr: T[]): T {
    if (arr.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
