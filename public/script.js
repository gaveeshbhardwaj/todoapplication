window.onload = gettodo();

function gettodo() {
    var RESPONSE_DONE = 4;
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/api/todos/',true);
    xhr.onreadystatechange = function () {
        if(this.readyState==RESPONSE_DONE && this.status==200){
            var obj = JSON.parse(xhr.responseText);
            printAll(obj);

        }
    }
    xhr.send();
}


function printAll(obj) {
    var activeDOM="";
    var deletedDOM="";
    var completedDOM="";
    obj.forEach(function (t,i) {
        if(t.status=="ACTIVE"){
            activeDOM+="<tr><td><input type='checkbox' onchange='changeStatus(\"COMPLETED\","+i+")'></td><td width='400px'>"+t.title+"</td><td class='cross-btn' onclick='deleteTodo("+i+")'><b class='links'>X</b></td></tr>";
        }
        else if(t.status=="COMPLETED"){
            completedDOM+="<tr><td><input type='checkbox'  onchange='changeStatus(\"ACTIVE\","+i+")' checked></td><td class='line-through completed'  width='400px;'>"+t.title+"</td><td class='cross-btn' onclick='deleteTodo("+i+")'><b class='links'>X</b></td></tr>";
        }
        else {
            deletedDOM+="<tr><td></td><td class='cross-btn line-through'>"+t.title+"</td></tr>";
        }
    });
    document.getElementById('todolist').innerHTML=activeDOM;
    document.getElementById('deletedlist').innerHTML=deletedDOM;
    document.getElementById('completedlist').innerHTML=completedDOM;
}


function deleteTodo(i) {
    var RESPONSE_DONE = 4;
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE','/api/todos/'+i,true);
    xhr.onreadystatechange = function () {
        if(this.readyState==RESPONSE_DONE && this.status==200){
            var obj = JSON.parse(xhr.responseText);
            printAll(obj);
        }
    }
    xhr.send();
}

function changeStatus(status,i) {
    var RESPONSE_DONE = 4;
    var xhr = new XMLHttpRequest();
    xhr.open('PUT','/api/todos/'+i,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
        if(this.readyState==RESPONSE_DONE && this.status==200){
            var obj = JSON.parse(xhr.responseText);
            printAll(obj);
        }
    }
    xhr.send("status="+status);
}

function addTodo() {
    if(document.getElementById('title').value!="" || document.getElementById('title').value.trim()!="") {
        var RESPONSE_DONE = 4;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/todos/', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (this.readyState == RESPONSE_DONE && this.status == 200) {
                var obj = JSON.parse(xhr.responseText);
                printAll(obj);
                console.log(obj);
            }
        }
        xhr.send('title=' + encodeURI(document.getElementById('title').value));
        document.getElementById('title').value="";
    }
    }

function hidedeleted() {
    if(document.getElementById('deletedlist').style.display!='none'){
        document.getElementById('hidedeloption').innerHTML="Show Deleted";
        document.getElementById('deletedlist').style.display='none';
    }
    else{
        document.getElementById('hidedeloption').innerHTML="Hide Deleted";

        document.getElementById('deletedlist').style.display='block';
    }
}
function hideCompleted() {
    if(document.getElementById('completedlist').style.display!='none'){
        document.getElementById('hideoption').innerHTML="Show Completed";
        document.getElementById('completedlist').style.display='none';
    }
    else{
        document.getElementById('hideoption').innerHTML="Hide Completed";

        document.getElementById('completedlist').style.display='block';
    }
}