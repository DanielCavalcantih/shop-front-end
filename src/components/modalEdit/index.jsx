import { CircleX, Image } from "lucide-react";
import "./style.css";
import React, { useState } from "react";
import { editProducts } from "../../services/product";
import ReactLoading from "react-loading";
import { errorAlert, successAlert } from "../../utils/alets";

export default function ModalEdit({
  closeModal,
  reloadMyProducts,
  selectedSection,
  selectedProduct,
}) {
  const getRentability = (value) => {
    return Number(value).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };
  const [imageUrl, setImageUrl] = useState(selectedProduct.image);
  const [productName, setProductName] = useState(selectedProduct.name);
  const [isLoading, setIsLoading] = useState(false);
  const [productDescription, setProductDescription] = useState(
    selectedProduct.description
  );
  const [productPrice, setProductPrice] = useState(
    getRentability(selectedProduct.price)
  );
  const [price, setPrice] = useState(selectedProduct.price);

  const formatNumberToBRL = (event) => {
    // Remove any non-numeric characters from the input
    const userInput = event.target.value.replace(/[^0-9]/g, "");

    if (userInput === "") {
      setProductPrice("");
    } else {
      // Convert the input to a number and divide by 100 to get the value in BRL
      const userInputAsNumber = parseInt(userInput, 10) / 100;
      setPrice(userInputAsNumber);
      // Format the number as BRL currency
      const formatedNumber = `R$ ${userInputAsNumber
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+,)/g, "$1.")}`;

      setProductPrice(formatedNumber);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await editProducts(
        {
          name: productName,
          description: productDescription,
          image: imageUrl,
          price,
        },
        selectedProduct.id
      );
      if (response.status === 200) {
        successAlert("Produto editado com sucesso!");
        closeModal();
        await reloadMyProducts();
      }
    } catch (error) {
      errorAlert(error.response.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="container-add">
        <h2>Editar produto</h2>
        {isLoading ? (
          <div className="container-loading">
            <ReactLoading color="#1c9bfd" type="spin" width={45} />
          </div>
        ) : (
          <form onSubmit={handleEditProduct}>
            <div className="container-img-form">
              <div className="input-img">
                {imageUrl === "" ? (
                  <div className="none-image">
                    <Image size={50} color="gray" />
                  </div>
                ) : (
                  <img src={imageUrl} alt="" className="image-change" />
                )}
                <label htmlFor="product_name">
                  <span>Imagem URL:</span>
                  <input
                    id="product_name"
                    type="text"
                    placeholder="Cole aqui o endereço da imagem"
                    onChange={({ target }) => setImageUrl(target.value)}
                    value={imageUrl}
                  />
                </label>
              </div>
              <div className="info-products">
                <label htmlFor="product_name">
                  <span>Nome:</span>
                  <input
                    id="product_name"
                    type="text"
                    placeholder="Nome do produto"
                    onChange={({ target }) => setProductName(target.value)}
                    value={productName}
                  />
                </label>
                <label htmlFor="description">
                  <span>Descrição:</span>
                  <textarea
                    rows={3}
                    id="description"
                    placeholder="Descrição do produto"
                    type="text"
                    onChange={({ target }) =>
                      setProductDescription(target.value)
                    }
                    value={productDescription}
                  />
                </label>
                <label htmlFor="price">
                  <span>Preço:</span>
                  <input
                    id="price"
                    placeholder="Preço do produto"
                    type="text"
                    onChange={formatNumberToBRL}
                    value={productPrice}
                  />
                </label>
              </div>
            </div>
            <button disabled={isLoading} type="submit" className="add-button">
              Editar
            </button>
          </form>
        )}
        <button className="close" onClick={closeModal}>
          <CircleX />
        </button>
      </div>
    </div>
  );
}
