import { Edit, Image, Trash } from "lucide-react";
import "./style.css";
import { formatedData, getRentability } from "../../utils/masks";

export default function CardProduct({
  product,
  users,
  selectedSection,
  setSelectedProduct,
  setShowModalEdit,
  setShowModalDelete,
}) {
  const verifyImagem = (url) => {
    if (typeof url !== "string") return false;
    return (
      url.match(/^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null
    );
  };

  return (
    <div className="card-product">
      <div className="limit-img">
        {verifyImagem(product.image) ? (
          <img src={product.image} className="img-product" alt="" />
        ) : (
          <div className="none-image">
            <Image size={50} color="gray" />
          </div>
        )}
      </div>
      <div className="info-price">
        <div className="container-info-product">
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-description">{product.description}</p>
          </div>
          <p className="date">
            Publicado em {formatedData(product.created)} por{" "}
            {users.find((item) => item.id === product.user_id)
              ? users.find((item) => item.id === product.user_id).name
              : "-"}
          </p>
        </div>
        <span className="price">{getRentability(product.price)}</span>
      </div>
      {selectedSection === 2 && (
        <div className="tools">
          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowModalEdit(true);
            }}
          >
            <Edit />
          </button>
          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowModalDelete(true);
            }}
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
