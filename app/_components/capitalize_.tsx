export function capitalize(word: string, func: string): string {
    switch (func) {
        case "move":
            var list = word.split("-");
            for (let i = 0; i < list.length; i++) {
                list[i] = list[i].charAt(0).toUpperCase() + list[i].slice(1);
            }
            return list.join(" ");
        case "game":
            var list = word.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1));
            list.splice(list.length / 2, 0, "/");
            return list.join(" ");
        case "location":
            return word.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        case "generation":
            var list = word.split("-");
            list[0] = list[0].charAt(0).toUpperCase() + list[0].slice(1);
            if (list[1]) {
                list[1] = list[1].toUpperCase();
            }
            return list.join(" ");
        default:
            return word.charAt(0).toUpperCase() + word.slice(1);
    }
}