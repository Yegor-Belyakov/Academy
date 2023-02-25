import React, { useEffect, useState } from "react";
import { Image, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../fake.api/api";

function Products() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div style={{margin: '3rem'}}>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">№</th>
          <th scope="col">Наименование</th>
          <th scope="col">Вариант цвета</th>
          <th scope="col">Вариант цвета</th>
          <th scope="col">Вариант цвета</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <td>{product.id}</td>

            <td>{product.name}</td>
            {product.colors.map((image) => (
              
              <td key={image.id}>
                <Image width={50} src={image.images[0]} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default Products;
