import { useEffect, useState } from 'react';
import avatar1 from '../../assets/img/avatar1.png';
import avatar2 from '../../assets/img/avatar2.png';
import avatar3 from '../../assets/img/avatar3.png';
import defaulAvatar from '../../assets/img/avatar4.png';
import styles from './PersonAvatar.module.css'

const personsData = [
    {
        id: 4730,
        name: 'Kate',
        img: avatar1,
    },
    {
        id: 3487,
        name: 'Sara',
        img: avatar2,
    },
    {
        id: 2726,
        name: 'John',
        img: avatar3,
    },
];

const PersonAvatar = ({ personId }) => {
    const [avatar, setAvatar] = useState(defaulAvatar);
    const [alt, setAlt] = useState('Default Person');

    useEffect(() => {
        getAvatar(personId);
        //eslint-disable-next-line
    }, []);

    const getAvatar = (id) => {
        personsData.map((el) => {
            if (el.id === id) {
                const avatarSrc = el.img;
                setAvatar(avatarSrc);
                const altSrc = el.name;
                setAlt(altSrc);
            }
            return avatar;
        });
    };

    return (
        <div className={styles.imgBox}>
            <img
                src={avatar}
                alt={alt}
            />
        </div>
    );
};

export default PersonAvatar;
