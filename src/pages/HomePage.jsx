import { Plus } from "lucide-react";
import Header from "../components/header";
import "../styles/home.css";
import ModalCreate from "../components/modalCreate";
import { useEffect, useState } from "react";
import { getMyProducts, getProducts } from "../services/product";
import { errorAlert } from "../utils/alets";
import ReactLoading from "react-loading";
import CardProduct from "../components/cardProduct";
import { getUsers } from "../services/user";
import ModalEdit from "../components/modalEdit";
import ModalDelete from "../components/modalDelete";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedSection, setSelectedSection] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      if (response.status === 200) {
        setProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      errorAlert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMyProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getMyProducts();
      if (response.status === 200) {
        setProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      errorAlert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedSection === 1) {
      loadProducts();
    } else {
      loadMyProducts();
    }
  }, [selectedSection]);

  return (
    <div>
      <Header />
      <main>
        <section className="section-title-button">
          <div className="navigation">
            <button
              className={`change-button ${selectedSection === 1 && "selected"}`}
              onClick={() => setSelectedSection(1)}
            >
              Produtos
            </button>
            <button
              className={`change-button ${selectedSection === 2 && "selected"}`}
              onClick={() => setSelectedSection(2)}
            >
              Meus anúncios
            </button>
          </div>
          <button
            className="add-button"
            onClick={() => setShowModalCreate(true)}
          >
            <Plus />
            Adicionar produto
          </button>
        </section>
        <section className="container-main">
          {isLoading ? (
            <ReactLoading color="#1c9bfd" type="spin" width={45} />
          ) : (
            <div className="container-products">
              {products.length > 0 ? (
                products.map((product) => (
                  <CardProduct
                    key={product.id}
                    product={product}
                    users={users}
                    selectedSection={selectedSection}
                    setSelectedProduct={setSelectedProduct}
                    setShowModalEdit={setShowModalEdit}
                    setShowModalDelete={setShowModalDelete}
                  />
                ))
              ) : (
                <p className="none">
                  {selectedSection === 1
                    ? "Nenhum produto encontrado!"
                    : "Você não tem nenhum anúncio!"}
                </p>
              )}
            </div>
          )}
        </section>
      </main>
      {showModalCreate && (
        <ModalCreate
          closeModal={() => setShowModalCreate(false)}
          reloadProducts={loadProducts}
          reloadMyProducts={loadMyProducts}
          selectedSection={selectedSection}
        />
      )}
      {showModalEdit && (
        <ModalEdit
          closeModal={() => setShowModalEdit(false)}
          reloadMyProducts={loadMyProducts}
          selectedProduct={selectedProduct}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          closeModal={() => setShowModalDelete(false)}
          reloadMyProducts={loadMyProducts}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}
