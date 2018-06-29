navigator.serviceWorker.register('/service-worker.js').then(function() {
  console.log('Service Worker registered!');
}).catch(function(){
  console.log('Registration Failed');
});

function getCurrencies() {  
  const url = `https://free.currencyconverterapi.com/api/v5/currencies`;

  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {      
    const values = data.results;    
    let options = `<option value="0">Select Currency</option>`;
 
      for(var key in values){
      const currencyId = key;
      const currencyItem = values[key].currencyName;      
      options += `<option value="${currencyId}">${currencyItem}</option>`;                 
    } 
 
  document.getElementById("fromcur").innerHTML = options;
  document.getElementById("tocur").innerHTML = options;

  }).catch(function() {
    console.log("Couldn't get currencies");
  });
}

getCurrencies();

document.getElementById("tocur").addEventListener('change', (e) => {
	
	const fromcur = document.getElementById("fromcur").value;
	const tocur = document.getElementById("tocur").value;
	const amount = document.getElementById("amount").value;
	
	const query = `${fromcur}_${tocur}`;
	const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`;
	
	//console.log(url);
	fetch(url).then(function(response) {
	return response.json();
	}).then(function(data) {
	const ratio = data[query];
	const resultamount = (amount * ratio).toFixed(2);
	document.getElementById("resultamount").setAttribute('value',resultamount);
	}).catch(function() {
	console.log("Ops");
	});
});




