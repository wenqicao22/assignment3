import React, { useReducer} from 'react';
import './App.css';
import axios from 'axios';
import validator from 'validator';



export function App() {
  //create store
  const store = {
    url: '',
    link: '',
    message: '',
  }

  //create reducer
  const user = (state, action)=> {
    switch(action.type) {
      case 'url':
        return {...state, url:action.value};
        case 'link':
          return {...state, link: action.value};
          case 'message':
            return {...state, message:action.value};
          default:
            return state;
    }
  }

  //create useReducer
  const [state, dispatch] = useReducer(user, store)

  const handleSumbit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(state.url, {
      require_protocol: true
    });
    if (!validURL) {
      alert('The system cannot regconize this URL.')
    }else {
      console.log('URL is', state.url);
      axios.post('http://localhost:5000/api/shorten', {
      url: state.url,
      link: state.link
      })
      .then(res => {
        if (!state.link){
          (function setLinkFun ()
          {
            dispatch({type:'link', value: `http://wenqi/${res.data.hash}`});
      
          }());
          // setLink();
        }else {
          (function setMessageFun() {
            dispatch({type: 'message', value: res.data.message})
          }());
          console.log(`link is not empty${res.data.message}`);
        }
      })
      .catch(err => console.log(err))
    }
    
  }

  
    return (
      <div className="Container">
        <div id='input'>
          <header>
            <h2>
              URL Shortner
            </h2>
          </header>
          <form onSubmit={handleSumbit}>
            <fieldset>
              <input type='text' 
                      name='url' 
                      placeholder='Enter URL including the http://'
                      onChange={(e)=>dispatch({type: 'url', value: e.target.value})} />
              <input type='submit' value='shorten'/>
            </fieldset>
            <fieldset>
              <input type='text'
                      name='brandedUrl'
                      placeholder='(Optional) enter your branded URL starts with http://wenqi/<branded name>'
                      onChange={(e)=>dispatch({type: 'link', value: e.target.value})}/>
            </fieldset>
            <fieldset>
              <span id='result'>{state.link}</span>
            </fieldset>
            <fieldset>
              <span id='alert'>{state.message}</span>
            </fieldset>
          </form>
        </div>
      </div>
    )
  
}

export default App;
