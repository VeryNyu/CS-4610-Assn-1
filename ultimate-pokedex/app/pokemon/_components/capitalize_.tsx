export function capitalize(func: string, word: string): string {
    switch (func) {
        case "location":
            return word.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        case "generation":
            return word.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("-");
        default:
            return word.charAt(0).toUpperCase() + word.slice(1);
    }
}