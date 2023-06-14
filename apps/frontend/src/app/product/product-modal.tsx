import { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import ApiService from '../api.service';
import { Product as ProductEntity } from '@mrepo2/product';

/* eslint-disable-next-line */
export interface ProductModalProps {
  show: boolean;
  handleClose: () => void;
  getProducts: () => Promise<void>;
  editProduct?: ProductEntity;
  resetEditProduct: () => void;
}

type ProductInputType = {
  name: string;
  price: number;
  id?: number;
};

export function ProductModal({
  show,
  handleClose,
  getProducts,
  editProduct,
  resetEditProduct,
}: ProductModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductInputType>();

  const onSubmit: SubmitHandler<ProductInputType> = async (data) => {
    console.log(data);

    try {
      const config = {
        url: '/product/create',
        method: 'POST',
        data,
      };

      if (editProduct?.id && data?.id) {
        config.url = '/product/update';
        config.method = 'PUT';
        data.id = Number(data.id);
      }

      const response = await ApiService.request<{ message: string }>(
        config,
        true
      );

      alert(response?.message);

      handleClose();
      resetEditProduct();
      reset();

      getProducts();
    } catch (error) {
      console.log(error);
      error instanceof Error && alert(error?.message);
    }
  };

  useEffect(() => {
    console.log({ editProduct });
    if (editProduct?.id) {
      setValue('id', editProduct?.id);
      setValue('name', editProduct?.name);
      setValue('price', editProduct?.price);
    }
  }, [editProduct, setValue]);

  return (
    <Modal
      show={show}
      onHide={() => {
        console.log('onhide');
        resetEditProduct();
        setValue('id', 0);
        reset();
        handleClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: true })}
            ></Form.Control>
            {errors?.name?.type === 'required' && (
              <span className="text-danger">Name required!</span>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              {...register('price', { required: true, min: 1, max: 1000 })}
            ></Form.Control>
            {errors?.price?.type === 'required' && (
              <span className="text-danger">Price required!</span>
            )}
            {['min', 'max'].includes(String(errors?.price?.type)) && (
              <span className="text-danger">
                Price should be minmum 1 and should not exceed maximum 1000!
              </span>
            )}
          </Form.Group>
          <Form.Group className="mt-2">
            <input type="hidden" {...register('id', { required: false })} />
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
