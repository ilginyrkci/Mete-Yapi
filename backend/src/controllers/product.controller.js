import { listProducts, getProductById, createProduct, updateProduct, deleteProduct, addProductImages } from "../services/product.service.js";

export async function getProductsController(req, res) {
  const result = await listProducts(req.query);
  res.json(result);
}

export async function getProductController(req, res) {
  const product = await getProductById(req.params.id);
  res.json(product);
}

export async function createProductController(req, res) {
  const product = await createProduct(req.body);
  res.status(201).json(product);
}

export async function updateProductController(req, res) {
  const product = await updateProduct(req.params.id, req.body);
  res.json(product);
}

export async function deleteProductController(req, res) {
  await deleteProduct(req.params.id);
  res.json({ message: "Ürün silindi" });
}

export async function uploadImagesController(req, res) {
  const images = await addProductImages(req.params.id, req.files);
  res.json({ images });
}
