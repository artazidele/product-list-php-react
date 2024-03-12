import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export function AddProduct() {
    const [disk, setDisk] = useState(true);
    const [book, setBook] = useState(false);
    const [furniture, setFurniture] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sku, setSKU] = useState("");
    const [product_name, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [product_weight, setProductWeight] = useState("");
    const [heigth, setHeigth] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");

    const changeType = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        if (e.target.value == "disk") {
            setBook(false);
            setProductWeight('');
            setFurniture(false);
            setLength('');
            setHeigth('');
            setWidth('');
            setDisk(true);
        } else if(e.target.value == "book") {
            setFurniture(false);
            setLength('');
            setHeigth('');
            setWidth('');
            setDisk(false);
            setSize('');
            setBook(true);
        } else {
            setBook(false);
            setProductWeight('');
            setDisk(false);
            setSize('');
            setFurniture(true);
        }
    }

    const saveProductClicked = (e) => {
        e.preventDefault();

        setLoading(true);
        let formData = new FormData();
        formData.append('sku', sku)
        formData.append('product_name', product_name)
        formData.append('price', price)
        formData.append('size', size)
        formData.append('product_weight', product_weight)
        formData.append('heigth', heigth)
        formData.append('length', length)
        formData.append('width', width)

        axios.post("http://localhost/2-03-2024/server/add_product.php", formData)
        .then(response=>{
            if (response.data === "Success") {
                window.location = "/";
                setLoading(false);
            } else {
                setError(response.data);
                setLoading(false);
            }
        });
    }

    return (
        <div>
            <form id='product_form' onSubmit={saveProductClicked}>
            <div className='header'>
                <div className='title'>Product Add</div>
                <div className='buttons'>
                    {!loading && <button type='submit'>Save</button>}
                    {loading && <button disabled>Saving...</button>}
                    {!loading && <Link to={'/'}><button>Cancel</button></Link>}
                    {loading && <button disabled>Cancel</button>}
                </div>
            </div>
            <div className="content-container">
                <div className='form-fields'>
                    {error && <p>{error}</p>}
                    <div className='form-fields-input'>
                        <label>SKU</label>
                        <input id='sku' type="text" value={sku} onChange={(e) => setSKU(e.target.value)}/>
                    </div>
                    <div className='form-fields-input'>
                        <label>Name</label>
                        <input id='name' type="text" value={product_name} onChange={(e) => setProductName(e.target.value)}/>
                    </div>
                    <div className='form-fields-input'>
                        <label>Price ($)</label>
                        <input id='price' type="text" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className='form-fields-input'>
                        <label>Type Switcher</label>
                        <select id='productType' onChange={changeType}>
                            <option value="disk">Disk</option>
                            <option value="book">Book</option>
                            <option value="furniture">Furniture</option>
                        </select>
                    </div>
                    {disk && <div className='form-fields-input'>
                        <label>Size (MB)</label>
                        <input id='size' type="text" value={size} onChange={(e) => setSize(e.target.value)}/>
                        <p>Please provide size in whole numbers</p>
                        </div>}
                    {book && <div className='form-fields-input'>
                        <label>Weight (KG)</label>
                        <input id='weight' type="text" value={product_weight} onChange={(e) => setProductWeight(e.target.value)}/>
                        <p>Please provide weight in 0.000 format</p>
                        </div>}
                    {furniture && <div className='form-fields-input'>
                        <div className='form-fields-input'>
                        <label>Heigth (CM)</label>
                        <input id='height' type="text" value={heigth} onChange={(e) => setHeigth(e.target.value)}/>
                        </div>
                        <div className='form-fields-input'>
                        <label>Width (CM)</label>
                        <input id='width' type="text" value={width} onChange={(e) => setWidth(e.target.value)}/>
                        </div>
                        <div className='form-fields-input'>
                        <label>Length (CM)</label>
                        <input id='lenght' type="text" value={length} onChange={(e) => setLength(e.target.value)}/>
                        </div>
                        <p>Please provide dimensions in HxWxL format</p>
                        </div>}
                </div>
            </div>
            </form>
        </div>
    );
};