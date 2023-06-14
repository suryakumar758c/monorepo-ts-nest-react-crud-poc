import { Button, Col, Row, Table } from 'react-bootstrap';
import ApiService from '../api.service';
import { useCallback, useEffect, useState } from 'react';

import type { Product as ProductEntity } from '@mrepo2/product';
import { ProductModal } from './product-modal';

/* eslint-disable-next-line */
export interface ProductProps {}

export function Product(props: ProductProps) {
  const [productList, setProductList] = useState<ProductEntity[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<ProductEntity>(
    {} as ProductEntity
  );

  const handleClose = () => setShowPopup(false);
  const resetEditProduct = () => setEditProduct({} as ProductEntity);

  const getProducts = useCallback(async () => {
    const products = await ApiService.request<ProductEntity[]>({
      url: '/product/list',
    });

    Array.isArray(products) && setProductList(products);
  }, [setProductList]);

  const deleteProduct = async (id: number) => {
    try {
      if (window.confirm('Are you sure? Do you want to delete this product?')) {
        const response = await ApiService.request<{ message: string }>({
          url: `/product/delete/${id}`,
          method: 'DELETE',
        });

        alert(response?.message);

        getProducts();
      }
    } catch (error) {
      error instanceof Error && alert(error?.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Row>
      <Col lg="12" className="m-2">
        <h2 className="text-center">Products</h2>
      </Col>
      <Col lg="12" className="m-2 text-right">
        <Button onClick={() => setShowPopup(true)}>Add</Button>
      </Col>
      <Col lg="12" className="m-2">
        <Table
          striped
          bordered
          hover
          size="sm"
          variant="primary"
          className="text-center"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productList) ? (
              productList.map((product: ProductEntity, i: number) => {
                const { id, name, price } = product;

                return (
                  <tr key={name}>
                    <td>{i + 1}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>
                      <Button
                        variant="success m-1"
                        onClick={() => {
                          setEditProduct(product);

                          setShowPopup(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteProduct(id)}
                        variant="danger m-1"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No products found</td>
              </tr>
            )}
          </tbody>
        </Table>
        <ProductModal
          show={showPopup}
          handleClose={handleClose}
          getProducts={getProducts}
          editProduct={editProduct}
          resetEditProduct={resetEditProduct}
        />
      </Col>
    </Row>
  );
}

export default Product;
