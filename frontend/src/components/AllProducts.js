import React from 'react'
import { useState, useEffect } from "react";
import Product from './Product';
import axios from 'axios';
import { Link } from "react-router-dom";

export function AllProducts() {
    const [products, setProducts] = useState(null);
    const [deleteId, setDeleteId] = useState([]);
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const addDeleteId = (data) => {
        const currentId = deleteId;
        currentId.push(data);
        setDeleteId(currentId);
    }

    const removeDeleteId = (data) => {
        const currentId = deleteId.filter(it => it != data);
        setDeleteId(currentId);
    }

    const fetchProducts = () => {
        setProducts(null);

        fetch('./get_products.php')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
    }

    const deleteProducts = (e) => {
        e.preventDefault();

        var deletedProducts = 0;
        const deleteCount = deleteId.length;

        deleteId.map(id =>{
            let formData = new FormData();
            formData.append('deleteId', id)
            axios.post("./delete_products.php", formData)
            .then(response=>{
                if (response.data === "Success") {
                    deletedProducts += 1;
                    removeDeleteId(id);
                    fetchProducts();
                } 
            })
        })
        
        
    }

    return (
        <div>
            <form onSubmit={deleteProducts}>
                <div className='header'>
                    <div className='title'>Product List</div>
                    <div className='buttons'>
                        <Link to={'/add-product'}><button>ADD</button></Link>
                        <button type="submit">MASS DELETE</button>
                    </div>
                </div>
                <div className="content-container">
                    <div className=''>
                        {products && <div className="product-container">{products.map((product) => (
                            <div className="" key={ product.id }>
                                <Product addDeleteId={addDeleteId} removeDeleteId={removeDeleteId} deleteId={deleteId} product={ product }/>
                            </div>
                        ))}</div>}
                    </div>
                </div>
            </form>
        </div>
    );
};