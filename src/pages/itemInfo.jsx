import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, getSizes } from "../fake.api/api";

function ItemInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [currentColor, setCurrentColor] = useState(null);

  useEffect(() => {
    getProduct(id).then((data) => {
      setItem(data);
      setCurrentColor(data.colors[0]);
    });
    getSizes().then((data) => setSizes(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      {item && currentColor ? (
        <Card style={{ width: "18rem" }}>
          <Carousel>
            {currentColor.images.map((el) => (
              <Carousel.Item key={el + currentColor.id}>
                <img className="d-block w-100" src={el} alt="First slide" />
                <Carousel.Caption>
                  <h3>{currentColor.price}$</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          <Card.Body>
            <Card.Title>
              {" "}
              Это {item.name} ! Вы выбрали цвет: {currentColor.name}
            </Card.Title>
            <Card.Text> Отличный выбор!</Card.Text>
            <Card.Text> Все цвета: </Card.Text>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {item.colors.map((color) => (
                <div key={color.id + color.name}>
                  <Button
                    active={color.id === currentColor.id}
                    onClick={() => setCurrentColor(color)}
                    variant="outline-secondary"
                  >
                    {color.name}
                  </Button>
                </div>
              ))}
            </div>

            <Card.Text>
              Доступны размеры:
              {currentColor.sizes.length === 0 && (
                <div style={{ color: "red" }}>
                  К сожалению все размеры закончились
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {sizes.map((size) => {
                  return (
                    <Button
                      disabled={!currentColor.sizes.includes(size.id)}
                      variant="outline-success"
                      key={size.id}
                    >
                      {size.label}
                    </Button>
                  );
                })}
              </div>
            </Card.Text>
            <Card.Text>
              {currentColor.description}
            </Card.Text>
            <Button onClick={() => navigate("*")} variant="primary">
              Назад к списку
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </div>
  );
}

export default ItemInfo;
