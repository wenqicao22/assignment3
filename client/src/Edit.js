import React, { useReducer } from 'react';
import validator from 'validator';
import axios from 'axios';

//this.props.params.name
export default function Edit(props) {
   
    const {match: {params}} = props;

    const store = {
        shortUrlBefore: `https://react3demo.herokuapp.com/${params.hash}`,
        shortUrlAfter: '',
        message:'',
    }

    const user = (state, action)=>{
        switch(action.type) {
            case 'shortUrlBefore':
                return {...state, shortUrlBefore:action.value};
            case 'shortUrlAfter':
                return {...state, shortUrlAfter: action.value};
            case 'message':
                return {...state, message:action.value};
            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(user, store);


    const handleEdit = () => {
        axios.post(`https://assignment3demo.herokuapp.com/${params.hash}/edit`, {
            shortUrlBefore: state.shortUrlBefore,
            shortUrlAfter: state.shortUrlAfter
        })
        .then(res => {
            //if the branded input is empty
            if (!state.shortUrlAfter){
              (function setLinkFun ()
              {
                dispatch({type:'shortUrlAfter', value: `https://react3demo.herokuapp.com/${res.data.hash}`});
          
              }());
              
            }else {
                (function setMessageFun() {
                    dispatch({type: 'message', value: res.data.message})
                  }());
                const validURL = validator.isURL(state.shortUrlAfter, {
                    require_protocol: true
                  });
                if (!validURL) {
                    alert('The system cannot regconize this URL.')
                }else {
               
            }
        }
          })
        .catch(err => console.log(err))
        
        
      }

      const handleDelete = (e) => {
        e.preventDefault();
        
        axios.post(`https://assignment3demo.herokuapp.com/${params.hash}/delete`, {
            shortUrlBefore: state.shortUrlBefore,
            shortUrlAfter: state.shortUrlAfter
        })
        .then(res => {
          if (res.data.message) {
            (function setAllFun ()
            {
              dispatch({type:'shortUrlBefore', value: ''});
              dispatch({type: 'shortUrlAfter', value: ''});
              dispatch({type: 'message', value: res.data.message})
        
            }());
          }
        })
        .catch(err => console.log(err))
        
      }

      const handleChange = (e) => {
        dispatch({type: 'shortUrlAfter', value: e.target.value})
      }

    return(
    <div className='Container'>
        <div id='input'>
          <header>
            <h2>
              URL Shortner
            </h2>
            <h3>@Edit</h3>
          </header>
          <form>
            <fieldset>
              <div>
                <span>{`Current shorten URL: https://assignment3demo.herokuapp.com/${params.hash}`}</span>
              </div>
              <input type='text'
                      name='brandedUrl'
                      placeholder='(Optional) enter your branded URL for edit, starts with https://assignment3demo.herokuapp.com/<branded name>'
                      onChange={handleChange}/>
              <input type='button' 
                        value='Edit URL'
                        onClick={handleEdit}/>
              <input type='button' value='Delete URL' onClick={handleDelete}/>
            </fieldset>
            <fieldset>
              <span id='result'>{state.shortUrlAfter}</span>
            </fieldset>
            <fieldset>
              <span id='alert'>{state.message}</span>
            </fieldset>
          </form>
        </div>
    </div>
    );
    
    
}
