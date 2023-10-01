
  async function mainfunction() {
    let input = prompt("Type a product you want")
    url = 'https://asos10.p.rapidapi.com/api/v1/getProductListBySearchTerm?searchTerm=' + input + '&currency=USD&country=US&store=US&languageShort=en&sizeSchema=US&limit=50&offset=0';
 const options = {
   method: 'GET',
   headers: {
     'X-RapidAPI-Key': 'a7a689d058mshfeb58166ddc732bp190777jsncde7698094e2',
     'X-RapidAPI-Host': 'asos10.p.rapidapi.com'
   }
 };
 
 try {
   const response = await fetch(url, options);
   const result = await response.json();
     console.log(result.data.products[0].name);
     console.log(result.data.products[0].price.current.text);
     display_image(0, result.data.products[0].imageUrl);
     display_image(1, result.data.products[1].imageUrl);
     display_image(2, result.data.products[2].imageUrl);
     console.log(result.data.products[0]);
     console.log(result.data.products[1]);
     console.log(result.data.products[2]);
 } catch (error) {
   console.error(error);
 }
 }

  
  function display_image(number, image_url){
    document.getElementById("image" + number).src = 'https://'+ image_url;
  }
  