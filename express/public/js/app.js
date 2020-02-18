

let form=document.querySelector('form');
let local=document.querySelector('input');
let p=document.getElementById('first_p');

form.addEventListener('submit',()=>{
    event.preventDefault();
    const adress=local.value
    p.innerText='Carregando informações...'
    fetch('http://localhost:8080/weather_data?adress='+encodeURIComponent(adress)).then((response)=>{
        response.json().then(data=>{
            
            let string=`Essas são as informações referentes a <h5>${data.local}:</h5>
            <ul>
            <li><p>Temperatura:${data.temp} graus</p>  </li>
            <li> <p>Possibilidade de chuva: ${data.precip}%</p>  </li>
            <li> <p> ${data.info} </p>  </li>
           </ul> `
            p.innerHTML=string
            local.value='';
        })
    })


})

