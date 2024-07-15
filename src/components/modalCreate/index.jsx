import { CircleX, Image } from "lucide-react";
import "./style.css";
import React, { useState } from "react";
import { createProducts } from "../../services/product";
import ReactLoading from "react-loading";
import { errorAlert, successAlert } from "../../utils/alets";

export default function ModalCreate({
  closeModal,
  reloadProducts,
  reloadMyProducts,
  selectedSection,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [price, setPrice] = useState("");

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

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createProducts({
        name: productName,
        description: productDescription,
        image: imageUrl,
        price,
      });
      if (response.status === 201) {
        successAlert(response.data.message);
        closeModal();
        selectedSection === 1
          ? await reloadProducts()
          : await reloadMyProducts();
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
        <h2>Adicionar produto</h2>
        <form onSubmit={handleCreateProduct}>
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
                  onChange={({ target }) => setProductDescription(target.value)}
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
          <button disabled={isLoading} type="submit" className="create-button">
            {isLoading ? (
              <ReactLoading color="white" type="spin" width={20} height={20} />
            ) : (
              "Adicionar"
            )}
          </button>
        </form>
        <button className="close" onClick={closeModal}>
          <CircleX />
        </button>
      </div>
    </div>
  );
}
