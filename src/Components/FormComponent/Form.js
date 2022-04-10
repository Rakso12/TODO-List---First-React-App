import { useState, useEffect } from 'react';
import styles from './Form.module.css';

const FormComponent = () => {

    const [inputFirstValue, setFirstInputValue] = useState('');
    const [inputSecoundValue, setSecoundInputValue] = useState('');
    const [validateError, setValidateError] = useState(null);

    const handleChangeFirstInputValue = (event) => {
        setFirstInputValue(event.target.value);
    }

    const handleChangeSecoundInputValue = (event) => {
        setSecoundInputValue(event.target.value);
    }

    async function handleSubmit(first, secound){
        if(first !== '' && secound !== ''){
            setValidateError('');

            const data = {
                email: first,
                password: secound
            }

            const response = await fetch('https://enigmatic-atoll-16986.herokuapp.com/api/token/', {
                method: 'POST',
                headers: { "Content-Type":"application/json"},
                body: JSON.stringify(data)
            });

            if(response.ok) {
                const data = await response.json();
                
                if(response.status == 200){
                    await window.localStorage.setItem('access', data.access);
                    await window.localStorage.setItem('refresh', data.refresh);
                }
                else if(response.status == 401){
                    await setValidateError('Incorrect sign in data');
                }
                console.log(response.status);
            }
            else{
                await setValidateError('Incorrect data');
            }
        }
        else{
            await setValidateError('Incorrect sign in data');
        }
        
        getData();
    }

    async function getData(){

        console.log(window.localStorage.getItem('access'));

        const response = await fetch('https://enigmatic-atoll-16986.herokuapp.com/api/user', {
            method: 'GET',
            headers: { "Content-Type":"application/json", "Authorization": `Bearer ${window.localStorage.getItem('access')}`}
        });

        if(response.ok){
            await console.log(response.json());
        }
    }

    return (
        <div className={styles.formComponent}>
            
            <p>
                <span> Login </span>
                <input onChange={handleChangeFirstInputValue} value={inputFirstValue}/>
            </p>
            <p>
                <span> Password </span>
                <input type="password" onChange={handleChangeSecoundInputValue} value={inputSecoundValue}/>
            </p>
            <button onClick={ () => handleSubmit(inputFirstValue, inputSecoundValue)} className={styles.submitbutton}> Sign in </button>
            {validateError && <span> {validateError} </span>}
        </div>
    );
}

export default FormComponent;