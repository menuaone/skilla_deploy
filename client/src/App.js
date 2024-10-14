import { useEffect, useState } from 'react';
import './App.css';
import axios, { AxiosError } from 'axios';
import ContactsTable from './components/ContactsTable/ContactsTable';
import Container from './components/Container/Container';
import Controls from './components/Controls/Controls';

/*  Todo
    функционал:
    Проигрывание записей(если есть)
    Запустить на Сервере
*/

function App() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [sortBy, setSortBy] = useState('dayTime');
    const [order, setOrder] = useState('asc');
    const [range, setRange] = useState('3 дня');
    const [callStatus, setCallStatus] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    // работа с API и сервером
    useEffect(() => {
        callBackAPI()
            .then((res) => setData(res))
            .catch((err) => console.log(err));
        //eslint-disable-next-line
    }, [order, sortBy]);

    const callBackAPI = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(
                `/contact_list?sortBy=${sortBy}&order=${order}`
            );

            setIsLoading(false);
            return data;
        } catch (error) {
            console.error(error);
            if (error instanceof AxiosError) {
                setError(error.message);
            }
            setIsLoading(false);
        }
    };

    const handleSortFromServer = (field) => {
        const newOrder = sortBy === field && order === 'asc' ? 'desc' : 'asc'; // Меняем порядок сортировки
        setSortBy(field);
        setOrder(newOrder);
    };

    // фильтрация
    useEffect(() => {
        if (data.length > 0) filterData();
        //eslint-disable-next-line
    }, [callStatus, range, data]);

    const filterData = () => {
        const today = new Date();
        let startDate;

        switch (range) {
            case '1 день':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 1);
                break;
            case '2 дня':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 2);
                break;
            case '3 дня':
                startDate = new Date(today);
                startDate.setMonth(today.getMonth() - 3);
                break;
            case 'Год':
                startDate = new Date(today);
                startDate.setFullYear(today.getFullYear() - 1);
                break;
            default:
                startDate = new Date(today);
        }

        const filtered = data.filter((el) => {
            const itemDate = new Date(el.date);
            return (
                itemDate >= startDate &&
                itemDate <= today &&
                el.in_out === callStatus
            );
        });

        setFilteredData(filtered);
    };

    return (
        <Container>
            <Controls
                setCallStatus={setCallStatus}
                setRange={setRange}
            />
            {isLoading && (
                <p className='loader'>
                    Грузим данные, придется немного подождать...
                </p>
            )}
            {filteredData.length > 0 && (
                <ContactsTable
                    dataSource={filteredData}
                    handleSortFromServer={handleSortFromServer}
                    order={order}
                    sortBy={sortBy}
                />
            )}
        </Container>
    );
}

export default App;
