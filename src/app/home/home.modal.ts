
export interface IItem {
    sku?: number;
    name?: string;
    price?: number;
    editing?: boolean;
}
export class Item {
    sku?: number;
    name?: string;
    price?: string;
    editing?: boolean;

    constructor(item: IItem) {
        item.editing = this.setState(item);
        Object.assign(this, item);
    }

    setState(item: IItem) {

        if (item == null || Object.keys(item).length === 0) {
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
