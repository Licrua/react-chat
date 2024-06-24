import { useRef, useState } from 'react'
import styles from '../css/RemovePopUp.module.css'
import { removeChannel } from '../../request'
import { useDispatch } from 'react-redux'
import { removeSomeChannel, setConcurrentChannel } from '../channelsSlice'
import { useTranslation } from 'react-i18next'



function RemovePopUp({currentId, setRemoveToggler}) {
    const ref = useRef(null)
    const [isCancel, setisCanceled] = useState(false)
    const dispatch = useDispatch()
    const {t} = useTranslation()


    const handleRemove = (e, id) => {
        e.preventDefault();
          removeChannel(id, localStorage.getItem("token"));
          dispatch(removeSomeChannel(id));
          ref.current.style.display = 'none'
          dispatch(setConcurrentChannel('general'))
         setRemoveToggler(false)
      };

   
   function cancelHandler() {
    // setisCanceled(prevResult => !prevResult)
    setRemoveToggler(false)
    };

    const keyDownHandler = (e, currentId) => {
        if(e.key === 'enter') {
            console.log('key', e.key);
            e.preventDefault()
            handleRemove(e, currentId)
            setRemoveToggler(false)
        }
    } 


    return (
            <div  ref={ref} className={ isCancel ? `${styles.removePopUp_cointainer}` : null}>
            <div className={styles.removePopUp_overlay}></div>
        <div ref={ref} className={styles.removePopUp_container}>
            <h4>{t('delete')}</h4>
            <hr></hr>
            <p>{t('areYouSure')}</p>
            <div style={styles.buttons}>
            <a tabIndex={'1'} onClick={cancelHandler} className={styles.close_anchor}></a>
            <button tabIndex={'2'} onClick={cancelHandler}  className={styles.cancel_button}>{t('cancel')}</button>
            <button tabIndex={'3'} onKeyDown={(e) => keyDownHandler(e,currentId)} onClick={(e) => handleRemove(e, currentId)} className={styles.delete_button}>{t('delete')}</button>
            </div>
        </div>
            </div>
    )
}
export default RemovePopUp