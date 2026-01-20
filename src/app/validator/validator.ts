import * as yup from "yup";
const WishValidator = yup.object({
    title: yup.string().matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄҐґ]{1,30}$/).required('Title is required'),
    description: yup.string().matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄҐґ]{1,100}$/),
    price: yup.number().min(0, 'min 0').required('Price is required'),
    image: yup.string().url('Must be a valid URL').required('Image URL is required'),
    link: yup.string().url('Must be a valid URL').required('Link URL is required'),
});
export default WishValidator