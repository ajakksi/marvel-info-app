import './charList.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error:false,
        newItemLoading: false,
        offset:  0,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();
    }

    onRequest= (offset) =>{
       this.onCharListLoading();

        this.marvelService.getAllCharacters(offset)
            .then(this.charListLoaded)
            .catch(this.onError)
    }

    charListLoaded = (newCharList) => {
        let ended =false;
        if(newCharList.length<9){
            ended = true;
        }

        this.setState(({offset,charList})=>({
            charList: [...charList, ...newCharList],
            loading:false,
            newItemLoading:false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onCharListLoading = () => {
        this.setState({newItemLoading: true});
    }

    onError = () =>{
        this.setState({loading:false,error: true})
    }

    refArr = [];
    
    setRef = (ref) =>{
        this.refArr.push(ref);
    }

    focusOnItem = (id) =>{
        this.refArr.forEach(item => item.classList.remove('char__item_selected'));
        this.refArr[id].classList.add('char__item_selected');
        this.refArr[id].focus();

    }

    contentLoaded = (charList) =>{
         const items =  charList.map((item,i)=>{
            return (
                <li className="char__item"
                     key={item.id}
                     ref = {this.setRef}
                     tabIndex="0"
                     onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i)
                        }}
                        onKeyDown={(e)=>{
                            if(e.key === ' ' || e.key === 'Enter'){
                                this.props.onCharSelected(item.id);
                                this.focusOnItem(i);
                            }
                            
                        }

                        }>
                    
                    <img src={item.thumbnail} alt="abyss" style={item.thumbnailStyle}/>
                    <div className="char__name">{item.name}</div>
                    
                </li>
            )
        })

          return (
            <ul className="char__grid">
                {items}
            </ul>
        )

        
    }

    render(){
        const {charList, loading,error,newItemLoading,offset,charEnded} = this.state;

        const items = this.contentLoaded(charList)

        const spinner = loading ? <Spinner/> : null
        const errorMessage = error ? <ErrorMessage/>  : null
        const content = !(loading || error) ? items : null

       

        return (
        <div className="char__list">
             {spinner}
             {errorMessage}
             {content}
            
            <button 
                className="button button__main button__long"
                disabled = {newItemLoading}
                style = {{'display':charEnded?'none':'block'}}
                onClick = {()=>{this.onRequest(offset)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
    }
}

export default CharList;