export default function checkName(name: string, limit: number) {
    if (name) {
        if (name.length > limit) {
            return `${name.slice(0, limit)}...`
        }
        return name
    } else {
        return name
    }
}
