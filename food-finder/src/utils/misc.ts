export function toTitleCase(input: string): string {
    return input.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}
