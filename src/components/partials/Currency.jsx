import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

function Currency({ value, className }) {
    const displayValue = value.toLocaleString("vn-VI", { style: "currency", currency: "VND" });
    return <Typography className={`text-base font-normal ${className}`}>{displayValue}</Typography>;
}

Currency.propTypes = {
    value: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default Currency;
