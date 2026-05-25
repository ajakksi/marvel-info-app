import './charList.scss';
import { useEffect, useState,useRef } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

const marvelService = new MarvelService();

const CharList = (props) => {

    const [charList,setCharList] = useState([]),
          [loading, setLoading] = useState(true),
          [error,setError] = useState(false),
          [newItemLoading,setNewItemLoading] = useState(false),
          [offset,setOffset] = useState(0),
          [charEnded,setCharEnded] = useState(false);
    

   const charListLoaded = (newCharList) => {
        let ended =false;
        if(newCharList.length<9){
            ended = true;
        }

        setCharList(charList  => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onError = () =>{
        setLoading(false);
        setError(true);
    }

    const onRequest = (offset) =>{
        onCharListLoading();

        marvelService.getAllCharacters(offset)
            .then(charListLoaded)
            .catch(onError)
    }

    const initialRequest = useRef(false);

    useEffect(()=>{
        if (initialRequest.current) return;
        initialRequest.current = true;

        onRequest();
    }, [])

    const refArr = useRef([]);

    const focusOnItem = (id) =>{
        refArr.current.forEach(item => item.classList.remove('char__item_selected'));
        refArr.current[id].classList.add('char__item_selected');
        refArr.current[id].focus();

    }


    
         const items =  charList.map((item,i)=>{
            return (
                <li className="char__item"
                     key={item.id}
                     ref = {(el => refArr.current[i] = el)}
                     tabIndex="0"
                     onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                        }}
                        onKeyDown={(e)=>{
                            if(e.key === ' ' || e.key === 'Enter'){
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                            
                        }

                        }>
                    
                    <img src={item.thumbnail} alt="abyss" style={item.thumbnailStyle}/>
                    <div className="char__name">{item.name}</div>
                    
                </li>
            )
        })  

        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/>  : null
        const content = !(loading || error) ? <ul className="char__grid">{items}</ul> : null

       
        return (
        <div className="char__list">
             {spinner}
             {errorMessage}
             {content}
            
            <button 
                className="button button__main button__long"
                disabled = {newItemLoading}
                style = {{'display':charEnded?'none':'block'}}
                onClick = {()=>{onRequest(offset)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}

export default CharList;