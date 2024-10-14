import { useEffect, useRef, useState } from 'react';
import styles from './Controls.module.css';
import cn from 'classnames';
import { ReactComponent as IconReset } from '../../assets/icons/reset_icon.svg';
import CallStatusDropdown from '../CallStatusDropdown/CallStatusDropdown';
import DatePicker from '../DatePicker/DatePicker';

const callOptions = {
    items: [
        { id: 0, type: 'Все типы' },
        { id: 1, type: 'Входящие' },
        { id: 2, type: 'Исходящие' },
    ],
    active: null,
};

const dateOptions = [
    { id: 0, intervalName: '1 день' },
    { id: 1, intervalName: '2 дня' },
    { id: 2, intervalName: '3 дня' },
    { id: 3, intervalName: 'Год' },
];

const Controls = ({
    setCallStatus,
    setRange,
}) => {
    const [dropdownValue, setDropDownValue] = useState(callOptions.items[0].type);
    const [activeDropItem, setActiveDropItem] = useState(callOptions.items[0].id);

    const [selectedOption, setSelectedOption] = useState(
        dateOptions[2].intervalName
    );
    // const [activeDateItem, setActiveDateItems] = useState('3 дня');
    const controlRef = useRef();

    const isActiveFilter = activeDropItem > callOptions.items[0].id || selectedOption !== '3 дня'

    const resetFilter = () => {
        setActiveDropItem(callOptions.items[0].id);
        setDropDownValue(callOptions.items[0].type);
        setCallStatus('');
        setSelectedOption(dateOptions[2].intervalName);

    };

    useEffect(() => {
        const setCallStatusNumber = () => {
            if (dropdownValue.toLocaleLowerCase().trim() === 'входящие') {
                return 1;
            } else return 0;
        };
        setCallStatus(() => setCallStatusNumber());
        //eslint-disable-next-line
    }, [isActiveFilter, dropdownValue]);

    useEffect(() => {
        setRange(selectedOption);
        //eslint-disable-next-line
    }, [selectedOption]);

    return (
        <div
            className={styles.wrapper}
            ref={controlRef}
        >
            {/* Выпадающее меню с фильтрацией по статусу звонка */}
            <div className={styles.dropdownMenu}>
                <CallStatusDropdown
                    buttonText={dropdownValue}
                    setDropDownValue={setDropDownValue}
                    content={callOptions.items}
                    activeField={activeDropItem}
                    setActiveDropField={setActiveDropItem}
                    controlRef={controlRef}
                    isActiveFilter={isActiveFilter}
                />

                <div
                    className={cn(styles.resetFilter, {
                        [styles.activeFilter]: isActiveFilter,
                    })}
                    onClick={resetFilter}
                >
                    Сбросить фильтры <IconReset />
                </div>
            </div>

            {/* DatePicker c фильтрацией по дате и каленадарем */}
            <DatePicker setSelectedOption={setSelectedOption} selectedOption={selectedOption} dateOptions={dateOptions}/>
        </div>
    );
};

export default Controls;
