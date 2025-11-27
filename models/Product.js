export class Product {
    id;
    name;
    description;
    price;
    image;

    constructor({ id, name, description, price, image }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    validate() {
        return (
            this.id > 0 &&
            this.name.length > 0 &&
            this.price > 0
        );
    }
}
