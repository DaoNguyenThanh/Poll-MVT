function addRow() {
    var newRowAdd =
    `<div class="form-group">
      <div class="options">
        <label for="answer_name">Lựa Chọn</label><br/>
        <input class="form-control m-input" id="many-options" type="text" required="" name="answer_name"/>
        <div class="row mx-auto"> 
          <div class="col-lg-6 mt-3"> 
            <div class="all-btn">
              <button class="btn btn-danger float-left" id="DeleteRow" type="button" onclick="deleteRow(this)"><i class="bi bi-trash"></i>Delete</button>
            </div>
          </div>
          <div class="col-lg-6 mt-3">
            <div class="all-btn">
              <button class="btn btn-dark float-right" id="rowAdder" type="button" onclick="addRow()"><span class="bi bi-plus-square-dotted"></span> ADD</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    document.querySelector('.options').closest(".form-group").insertAdjacentHTML("beforeend",newRowAdd);
  };
  
  function deleteRow(element) {
    element.closest(".options").remove(); 
    //- if element.closest(".options") > 2
    //-   {
    //-   console.log('if')
    //-   element.closest(".options").remove();
    //- }
    //- else {
    //-   console.log('else')
    //-   return alert('Bạn không được xóa nữa');
  };
  
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');
  
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });
  
  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });
//progress bar
// var i = 0;
// function move() {
//   if (i == 0) {
//     i = 1;
//     var elem = document.getElementById("myBar");
//     var width = 10;
//     var id = setInterval(frame, 10);
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//         i = 0;
//       } else {
//         width++;
//         elem.style.width = width + "%";
//         elem.innerHTML = width  + "%";
//       }
//     }
//   }
// }

// const progress_bar = document.getElementsByClassName("myBar");

let progress = document.querySelector(".vote-btn");

let i = 0;
progress.forEach( function() {

    progress[i].addEventListener( "click", function() {

        // let getSelection = this.getAttribute("name");
        // let setSelection = document.querySelector("." + getSelection);
        // let getCounter = document.querySelector("." + getSelection).textContent;
        let getSelection = this.getAttribute("name");
        let setSelection = document.querySelector("." + getSelection);
        let getCounter = document.querySelector("." + getSelection + "-counter").textContent;
        let setCounter = Number.parseInt(getCounter) + 1;

        let currentWidth = setSelection.style.width;
        let newWidth = Number.parseInt(currentWidth) + 20;

        setSelection.classList.add("running");
        document.querySelector("#container").classList.add("running");

        setTimeout(() => {
            setSelection.classList.remove("running");
            document.querySelector("#container").classList.add("running");
        }, 1000);

        if ( isNaN(newWidth) ) {
            setSelection.style.width = "20%";
        } else {
            if ( newWidth <= 100) {
                setSelection.style.width = newWidth + "%";
            } else {
                setSelection.style.width = "0%";
                setCounter = 0;
            }
        };

        setSelection.getAttribute("style");
        document.querySelector("." + getSelection + "-counter").textContent = setCounter;
    })

    ++i;

})
