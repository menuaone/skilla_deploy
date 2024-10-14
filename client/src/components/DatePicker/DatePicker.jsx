import { ReactComponent as IconLeft } from '../../assets/icons/left_icon.svg';
import { ReactComponent as IconRight } from '../../assets/icons/right_icon.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar_icon.svg';
import styles from './DatePicker.module.css';
import { useState } from 'react';

const DatePicker = ({ selectedOption, setSelectedOption, dateOptions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleCalendar = () => {
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    // Маска ввода для интервала дат
    const handleInputChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 12) {
            value = value.slice(0, 12);
        }

        const maskedValue = value
            .replace(
                /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
                '$1.$2.$3-$4.$5.$6'
            ) // Маска для полного интервала
            .replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3-$4.$5')
            .replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1.$2.$3-$4')
            .replace(/(\d{2})(\d{2})(\d{2})/, '$1.$2.$3')
            .replace(/(\d{2})(\d{2})/, '$1.$2')
            .replace(/(\d{2})/, '$1');

        setInputValue(maskedValue);
        setSelectedOption(inputValue);
    };

    const generateCalendar = () => {
        const today = new Date();
        const daysInMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        ).getDate();
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), i);
            const isSelected =
                (selectedStartDate &&
                    date.toDateString() === selectedStartDate.toDateString()) ||
                (selectedEndDate &&
                    date.toDateString() === selectedEndDate.toDateString());

            days.push(
                <div
                    key={i}
                    className={`${styles.day} ${
                        isSelected ? styles.selectedDay : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getYear().toString().slice(-2);
        console.log('#### year:', date);
        return `${day}.${month}.${year}`;
    };

    const handleDateClick = (date) => {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
        } else {
            setSelectedEndDate(date);

            const start = formatDate(selectedStartDate);
            const end = formatDate(date);
            setInputValue(`${start}-${end}`);
            setSelectedOption(`${start}-${end}`);
        }
    };

    return (
        <div className={styles.datePicker}>
            {/* Заголовок */}
            <div
                className={styles.pickerButton}
                onClick={toggleDropdown}
            >
                <IconLeft className={styles.arrowLeft} />
                <div
                    className={`${styles.calendar} ${
                        selectedOption ? styles.active : ''
                    }`}
                >
                    <CalendarIcon /> {selectedOption}
                </div>
                <IconRight className={styles.arrowRight} />
            </div>

            {/* Выпадающее меню */}
            {isOpen && (
                <div className={styles.pickerMenu}>
                    {dateOptions.map((el, index) => (
                        <div
                            key={index}
                            className={`${styles.pickerMenuItem} ${
                                selectedOption === `${el.intervalName}`
                                    ? styles.active
                                    : ''
                            }`}
                            onClick={() =>
                                handleOptionClick(`${el.intervalName}`)
                            }
                        >
                            {el.intervalName}
                        </div>
                    ))}

                    {/* Поле инпута с календарем */}
                    <p className={styles.inputHeader}>Указать даты</p>
                    <div className={styles.inputWrapper}>
                        <input
                            type='text'
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder='__.__.__-__.__.__'
                        />

                        <div
                            onClick={toggleCalendar}
                            className={styles.calendarButton}
                        >
                            <CalendarIcon />
                        </div>
                    </div>

                    {isCalendarOpen && (
                        <div className={styles.inputCalendar}>
                            <div className={styles.calendarHeader}>
                                {new Date().toLocaleString('default', {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </div>
                            <div className={styles.calendarGrid}>
                                {generateCalendar()}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DatePicker;
