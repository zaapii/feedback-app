import PropTypes from "prop-types";
function Card({children, dark}) {
  return (
    <div className={`card ${dark && 'dark'}`}>{children}</div>
  )
}


Card.defaultProps = {
  dark: false,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  dark: PropTypes.bool
}


export default Card