import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    type: { type: String, required: true },
    subType: { type: String, required: true },
    stock: { type: Number, required: true },
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;
