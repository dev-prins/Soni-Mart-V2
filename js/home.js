/* ==========================================
   PRINSO MART API
========================================== */

const API = {

BASE_URL: "https://prinsomart-backend.onrender.com/api",

async get(url){

const response = await fetch(

`${this.BASE_URL}${url}`

);

if(!response.ok){

throw new Error("API Error");

}

return await response.json();

},

async post(url,data){

const response = await fetch(

`${this.BASE_URL}${url}`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

}

);

if(!response.ok){

throw new Error("API Error");

}

return await response.json();

},

async put(url,data){

const response = await fetch(

`${this.BASE_URL}${url}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

}

);

return await response.json();

},

async delete(url){

const response = await fetch(

`${this.BASE_URL}${url}`,

{

method:"DELETE"

}

);

return await response.json();

}

};
