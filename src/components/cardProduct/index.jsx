import { Edit, Trash } from "lucide-react";
import "./style.css";
import { formatedData, getRentability } from "../../utils/masks";

export default function CardProduct({
  product,
  user,
  selectedSection,
  setSelectedProduct,
  setShowModalEdit,
  setShowModalDelete,
}) {
  return (
    <div className="card-product">
      <div className="img-texts">
        <div className="limit-img">
          <img src={product.image} height={150} alt="" />
        </div>
        <div className="container-info-product">
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-description">{product.description}</p>
          </div>
          <p className="date">
            Publicado em {formatedData(product.created)} por {user.name}
          </p>
        </div>
      </div>
      <span className="price">{getRentability(product.price)}</span>
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