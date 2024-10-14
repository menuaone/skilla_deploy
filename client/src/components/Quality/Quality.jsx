import { useEffect, useState } from 'react';
import styles from './Quality.module.css';

const qualityData = [
    { id: 0, quality: 'veryBad', text: 'Скрипт не использован' },
    { id: 1, quality: 'bad', text: 'Плохо' },
    { id: 2, quality: 'good', text: 'Хорошо' },
    { id: 3, quality: 'perfect', text: 'Отлично' },
];

const Quality = () => {
    const [quality, setQuality] = useState(null);

    useEffect(() => {
        getQualityBlock();
        //eslint-disable-next-line
    }, []);

    const getQualityBlock = () => {
        const qualityNumber = Math.floor(Math.random() * 5);
        qualityData.map(el=>{
          if(el.id===qualityNumber){
            setQuality(<div className={styles[`${el.quality}`]}>{el.text}</div>)
          }
          return quality;
        })
      
    };

    return <>{quality}</>;
};

export default Quality;
