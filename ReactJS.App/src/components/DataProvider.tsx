export class DataProvider {

    public static getManufacturer(objectId: string) {
        return {object_id: Math.floor(Math.random() * 100).toString(), name: this.randomString(12),  country: 'Russia' };
    }

    public static getAllManufacturers() {
        return [{}];
    }

    public static saveManufacturer(manufacturer: any): void {
        let b = manufacturer;
        console.log (manufacturer);
        b = b;
    }

    private static randomString(length: number): string {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}