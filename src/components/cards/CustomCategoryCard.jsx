import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CustomCategoryCard({ title, image_url, path }) {
    const bgs = [
        'bg-red-600',
        'bg-orange-600',
        'bg-blue-600',
        'bg-indigo-600',
        'bg-purple-600',
        'bg-green-600',
    ];

    const randomNumber = Math.floor(Math.random() * bgs.length);

    return (
        <Link to={path} className="group relative block w-full overflow-hidden pt-[calc(100%*4/3)]">
            <div className="absolute inset-0 grid place-items-center group-hover:bg-gray-300/50">
                <Button color="white" variant="text">
                    <span className="text-sm font-medium uppercase py-0.5">{title}</span>
                </Button>
            </div>
            <div className="absolute inset-0 -z-10 overflow-hidden rounded">
                <img className="h-full w-full object-cover" src={image_url} alt={title} />
            </div>
        </Link>
    );
}

CustomCategoryCard.propTypes = {
    color: PropTypes.string,
    border: PropTypes.string,
    discount: PropTypes.string,
    condition: PropTypes.string,
};

CustomCategoryCard.defaultProps = {
    color: 'red',
    border: 'white',
    discount: 'NEW10',
    condition: 'Giảm 10% đơn đầu tiên*',
};

export default CustomCategoryCard;
