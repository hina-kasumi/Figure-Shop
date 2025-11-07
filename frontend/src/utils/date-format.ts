export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.getUTCDay() + 1 + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
}