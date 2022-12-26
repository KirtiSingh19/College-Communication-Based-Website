shownotes();

let addbtn=document.getElementById('addbtn');
addbtn.addEventListener("click",function(e){
    let addtxt=document.getElementById('addtxt');
    let addtitle=document.getElementById('addtitle');
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesobj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    addtxt.value="";
    addtitle.value="";
    
    shownotes();
  
});
function shownotes()
{
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    let html ="";
    notesobj.forEach(function(element,index){
        html+=`
        <div class="notescard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        </div>
      </div>`;
    });
    let noteselm=document.getElementById('notes');
    if(notesobj.length!=0){
        noteselm.innerHTML=html;
    }
    else{
        noteselm.innerHTML=`nothing`;
    }


}
function deletenote(index){
   // console.log("I am deleteing",index);
    let notes=localStorage.getItem("notes");
    if(notes==null)
    {
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesobj));

    shownotes();
}
let search=document.getElementById('searchtxt');
search.addEventListener("input",function(){
    let inputval=search.value.toLowerCase();
    //console.log("input event fired!",inputval);
    let notescards=document.getElementsByClassName('notescard');
    Array.from(notescards).forEach(function(element){
        let cardtext=element.getElementsByTagName("p")[0].innerText;
        if(cardtext.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        //console.log(cardtext);

    })

});


