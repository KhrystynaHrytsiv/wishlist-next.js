import * as yup from "yup";
const WishValidator = yup.object({
    title: yup.string().required('Title is required and can contain max 30 characters'),
    description: yup.string().required('Description can contain max 100 characters'),
    price: yup.number().min(0).required('Price is required and must be number'),
    image: yup.string().url('Must be a valid URL').required('Image URL is required and must starts with https://'),
    link: yup.string().url('Must be a valid URL').required('Link URL is required and must starts with https://'),
});
export default WishValidator