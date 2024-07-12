import "./style.css";
import React, { useState } from "react";
import { deleteProduct } from "../../services/product";
import { errorAlert, successAlert } from "../../utils/alets";

export default function ModalDelete({
  closeModal,
  reloadMyProducts,
  selectedProduct,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      const response = await deleteProduct(selectedProduct.id);
      if (response.status === 204) {
        successAlert(response.data.message);
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
    <div className="modal-delete">
      <div className="container-delete">
        <h2>
          Tem certeza que deseja excluir o <br />
          produto
          <span> {selectedProduct.name} </span>
          da sua lista?
        </h2>
        <div className="options">
          <button className="not" onClick={closeModal}>
            Não
          </button>
          <button
            disabled={isLoading}
            className="yes"
            onClick={handleDeleteProduct}
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
