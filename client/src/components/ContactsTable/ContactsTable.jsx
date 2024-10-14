import { ReactComponent as IconDown } from '../../assets/icons/down_icon.svg';
import { ReactComponent as IconUp } from '../../assets/icons/up_icon.svg';
import styles from './ContactsTable.module.css';
import CallStatus from '../CallStatus/CallStatus';
import PersonAvatar from '../PersonAvatar/PersonAvatar';
import Quality from '../Quality/Quality';


const ContactsTable = ({
    dataSource,
    handleSortFromServer,
    order,
    sortBy,
}) => {

    const formatDurationTime = (eltime) => {
        return [Math.floor(eltime / 60), eltime % 60]
            .map((val) => ('0' + val).slice(-2))
            .join(':');
    };
    return (
        <table className={styles.table}>
            <thead className={styles.tableHeader}>
                <tr className={styles.headerRow}>
                    <th>Тип</th>
                    <th onClick={() => handleSortFromServer('dayTime')}>
                        Время{' '}
                        {sortBy === 'dayTime' && order === 'asc' ? (
                            <IconDown />
                        ) : (
                            <IconUp />
                        )}
                    </th>
                    <th>Сотрудник</th>
                    <th>Звонок</th>
                    <th>Источник</th>
                    <th>Оценка</th>
                    <th onClick={() => handleSortFromServer('time')}>
                        Длительность{' '}
                        {sortBy === 'time' && order === 'asc' ? (
                            <IconUp />
                        ) : (
                            <IconDown />
                        )}
                    </th>
                </tr>
            </thead>
            <tbody>
                {dataSource.map((el) => {
                    return (
                        <tr
                            className={styles.tableLine}
                            key={el.id}
                        >
                            <td>
                                <CallStatus
                                    inOut={el.in_out}
                                    status={el.status}
                                />{' '}
                            </td>
                            <td>
                                {new Date(el.date).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}

                                {/* {el.date} */}
                            </td>
                            <td>{<PersonAvatar personId={el.person_id} />}</td>
                            <td>
                                {el.contact_name}
                                {el.contact_name ? <br /> : ''}
                                {el.in_out === 1 ? el.from_number : el.tonumber}
                            </td>
                            <td>{el.source}</td>
                            <td>
                                <Quality />
                            </td>
                            <td>{formatDurationTime(el.time)}</td>
                        </tr>
                    );
                })}
            </tbody>
            <tfoot></tfoot>
        </table>
    );
};

export default ContactsTable;
