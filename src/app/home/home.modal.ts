
export interface IItem {
    sku?: number;
    name?: string;
    price?: number;
    editing?: boolean;
}
export class Item {
    sku = Math.floor(Math.random() * Math.floor(99999));
    name?: string;
    price?: number;
    editing?: boolean;

    constructor(item: IItem) {
        item.editing = this.setState(item);
        Object.assign(this, item);
    }

    setState(item: IItem) {

        if (item.name == null) {

            return true;
        }
        let editing = false;

        Object.keys(item).forEach((key) => {
            console.log('from setState...', item[key]);
            if (item[key] == null) {
                editing = true;
            }
        });
        return editing;
    }
}
