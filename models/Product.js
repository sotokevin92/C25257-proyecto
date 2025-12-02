export class Product {
    id;
    name;
    description;
    price;
    image;

    constructor({ id, name, description, price, image }) {
        this.id = id;
        this.name = name || '';
        this.description = description || '';
        this.price = Number(price) || 0;
        this.image = image || 'https://via.placeholder.com/150';
    }

    validate() {
        return [
                [ this.name.length > 0, 'El nombre no puede estar vacio.' ],
                [ this.price > 0, 'El precio debe ser positivo.' ]
            ].filter(([ passed ]) => !passed)
            .map(([ _, message ]) => message);
    }
}
