function enter(e){
    let enterKey = 13;
    if(e.keyCode === enterKey){
        document.getElementById("add-btn").click();
    }
}

function addItem(){
    let list = document.getElementById("list");
    let newItem = document.getElementById("add-box");
    if(newItem.value.trim() === ""){
        return;
    }

    let li = document.createElement("button");
    li.setAttribute('id', newItem.value);
    li.setAttribute("class", "item list-group-item item-on");
    li.setAttribute("onclick", "checkOff(this)");
    li.innerHTML = newItem.value;
    list.appendChild(li);

    newItem.value = "";
}

function checkOff(btn){
    if(btn.classList.contains("item-on")){
        btn.classList.add("item-off");
        btn.classList.remove("item-on");
    }else{
        btn.classList.add("item-on");
        btn.classList.remove("item-off");
    }
}

function deleteChecked(){
    let list = document.getElementById("list");
    let checked = document.getElementsByClassName("item-off");

    let len = checked.length;
    for(let i = len-1; i >= 0; i--){
        list.removeChild(checked[i]);
    }
}