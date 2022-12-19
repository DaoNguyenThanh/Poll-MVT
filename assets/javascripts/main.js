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
//POLL WEBSITE
