import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = props => {
  const { onClick, isButton } = props;
  return (
    <button
      className={isButton ? s.Button : s.Hidden}
      type="button"
      onClick={onClick}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
