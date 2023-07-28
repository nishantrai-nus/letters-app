export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString("en-UK", {
        year: "numeric",
        month: "short",
    });
}