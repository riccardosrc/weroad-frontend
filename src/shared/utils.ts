export class Utils {
  static dateToISO8601(date: Date = new Date()) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
