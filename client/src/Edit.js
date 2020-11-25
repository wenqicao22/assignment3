import React, { useReducer } from 'react';
import validator from 'validator';
import axios from 'axios';

//this.props.params.name
export default function Edit(props) {
   
    const {match: {params}} = props;

    const store = {
        shortUrlBefore: `http://wenqi/${params.hash}`,
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
        
        console.log('URL is', state.shortUrlAfter);
        axios.post(`http://localhost:5000/${params.hash}/edit`, {
            shortUrlBefore: state.shortUrlBefore,
            shortUrlAfter: state.shortUrlAfter
        })
        .then(res => {
            //if the branded input is empty
            if (!state.shortUrlAfter){
              (function setLinkFun ()
              {
                dispatch({type:'shortUrlAfter', value: `http://wenqi/${res.data.hash}`});
          
              }());
              
            }else {
                console.log(state.shortUrlAfter)
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
        
        axios.post(`http://localhost:5000/${params.hash}/delete`, {
            shortUrlBefore: state.shortUrlBefore,
            shortUrlAfter: state.shortUrlAfter
        })
        .catch(err => console.log(err))
        
      }

      const handleChange = (e) => {
        dispatch({type: 'shortUrlAfter', value: e.target.value})
        console.log(e.target.value)
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
                <span>{`Current shorten URL: http://wenqi/${params.hash}`}</span>
              </div>
              <input type='text'
                      name='brandedUrl'
                      placeholder='(Optional) enter your branded URL for edit, starts with http://wenqi/<branded name>'
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
