import { useState } from "react";

const Product = (props) => {
    const product = props.product;

    const onChecked = (data) => {
        props.addDeleteId(data);
    }

    const onUnChecked = (data) => {
        props.removeDeleteId(data);
    }

    const checkIfChecked = (e) => {
        if (e.target.checked === true) {
            onChecked(e.target.value);
        } else {
            onUnChecked(e.target.value);
        }
    }
    return (
        <div>
            { product && <div className="product-item">
                <input value={product.id} onChange={checkIfChecked} className="delete-checkbox" type="checkbox" />
                <h4 className="about_product">{ product.sku }</h4>
                <h4 className="about_product">{ product.product_name }</h4>
                <h4 className="about_product">{ product.price } $</h4>
                { product.size && <h4 className="about_product">Size: { product.size } MB</h4> }
                { product.product_weight && <h4 className="about_product">Weight: { product.product_weight }KG</h4> }
                { product.dimensions && <h4 className="about_product">Dimension:{ product.dimensions }</h4> }
            </div> }
        </div>
    );
}

export default Product;