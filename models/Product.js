export class Product {
    id;
    name;
    description;
    price;
    image;

    constructor({ id, name, description, price, image }) {
        this.id = id || 0;
        this.name = name || '';
        this.description = description || '';
        this.price = price || 0;
        this.image = image || 'https://via.placeholder.com/150';
    }

    validate() {
        return [
                [ this.id > 0, 'El ID debe ser positivo.' ],
                [ this.name.length > 0, 'El nombre no puede estar vacio.' ],
                [ this.price > 0, 'El precio debe ser positivo.' ]
            ].filter(([ passed ]) => !passed)
            .map(([ _, message ]) => message);
    }
}
