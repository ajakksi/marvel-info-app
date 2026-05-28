import './comicsList.scss';
import { useState,useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    
    const [comicsList,setComicsList] = useState([]),
          [newItemLoading,setNewItemLoading] = useState(false),
          [offset,setOffset] = useState(0),
          [comicsEnded,setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();


   const comicsListLoaded = (newComicsList) => {
        let ended =false;
        if(newComicsList.length<8){
            ended = true;
        }

        setComicsList(comicsList  => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const onRequest = (offset, initial) =>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllComics(offset)
            .then(comicsListLoaded)
    }

    useEffect(()=>{
            onRequest(offset,true);
    }, [])


    const items =  comicsList.map((item)=>{
            return (
                <li className="comics__item"
                    key={item.id}>
                    
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })  

    const spinner = loading && !newItemLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/>  : null
    
    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
            {items}
            </ul>
            <button className="button button__main button__long"
            disabled = {newItemLoading}
                style = {{'display':comicsEnded?'none':'block'}}
                onClick = {()=>{onRequest(offset)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;