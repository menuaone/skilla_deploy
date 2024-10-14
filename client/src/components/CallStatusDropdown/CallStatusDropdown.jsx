import { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './CallStatusDropdown.module.css';
import { ReactComponent as IconDown } from '../../assets/icons/down_icon.svg';
import { ReactComponent as IconUp } from '../../assets/icons/active_up_icon.svg';
import CallStatusDropdownItem from './CallStatusDropdownItem/CallStatusDropdownItem';

const CallStatusDropdown = ({
    buttonText,
    content,
    setDropDownValue,
    activeField,
    setActiveDropField,
    controlRef,
    isActiveFilter
}) => {
    const [open, setOpen] = useState(false);


    // закрытие всплывающего меню при нажатии в любое другое место
    useEffect(() => {
        const closeMenuOtside = (e) => {
            if(!controlRef.current.contains(e.target)){
                setOpen(false)
            }
        };

        document.addEventListener('mousedown', closeMenuOtside);

        return () => document.removeEventListener('mousedown', closeMenuOtside)
    });

    const handleClick = (e) => {
        setDropDownValue(e.target.textContent);
        setActiveDropField(e.target.dataset.index);
    };

    const toggleDropdown = () => {
        setOpen(() => !open);
    };

    return (
        <div className={styles.dropdown}>
            {/* заголовок и сброс фильтра */}
            <div
               
                className={cn(styles.button, {
                    [styles.active]: isActiveFilter,
                })}

                onClick={toggleDropdown}
            >
                {buttonText} {open ? <IconUp /> : <IconDown />}
            </div>

            {/* выпадающее меню */}
            <div
                className={cn(styles.content, {
                    [styles.contentOpen]: open,
                })}
            >
                {' '}
                {content.map((el, index) => (
                    <CallStatusDropdownItem
                        key={el.id}
                        data={index}
                        onClick={handleClick}
                        active={activeField}
                    >
                        {el.type}
                    </CallStatusDropdownItem>
                ))}
            </div>
        </div>
    );
};

export default CallStatusDropdown;
