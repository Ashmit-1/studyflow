async function setData() {
    let data = await fetch("http://127.0.0.1:8000/");
    let reponse = await data.json();
    document.getElementById("hello").innerHTML = reponse.hello;
}

setData()