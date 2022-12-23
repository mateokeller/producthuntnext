export default function validateCreateProduct(values) {
  let errors = {};

  // validar el nombre de usuario
  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  }

  // validar empresa
  if (!values.company) {
    errors.company = "Nombre de Empresa es obligatorio";
  }

  // validar el password
  if (!values.url) {
    errors.url = "La URL del producto es obligatoria";
  } else if (!/^(ftp|http|https): \/\/ [^"]+$/.test(values.url)) {
    errors.url = "URL mal formateada o no valida";
  }

  // validar descripcion
  if (!values.description) {
    errors.description = "Agrega una descripcion a tu producto";
  }
  return errors;
}
