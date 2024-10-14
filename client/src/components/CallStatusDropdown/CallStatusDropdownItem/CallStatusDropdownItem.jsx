import styles from './CallStatusDropdownItem.module.css';
import cn from 'classnames';

const CallStatusDropdownItem = ({
    children,
    onClick,
    data,
    active,
}) => {

    const isActiveDropdown = active.toString() === data.toString();

    return (
        <div
            className={cn(styles.dropdownItem, {
                [styles.active]: isActiveDropdown,
            })}
            onClick={onClick}
            data-index={data}
        >
            {children}
        </div>
    );
};

export default CallStatusDropdownItem;
