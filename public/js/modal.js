$('#modal-button').on('click', async ()=>{

   let res = await  fetch('/theme')
    .then(res=>res.json())
    const {fontSize=16,  Theme='white'} = res
    console.log('res', res)
    var index = layer.open({
        title:'Setting',
        type: 1,
        area: ['750px', '500px'],
        shadeClose: true, //close the window
        content: `
          <div style="padding:20px;">
              <form  onsubmit="return close()" >
                  <div class="form-group row">
                      <label for="staticEmail" class="col-sm-2 col-form-label">FontSize</label>
                      <div class="col-sm-10">
                      <input type="number" class="form-control" id="staticEmail" min="16" max="30" onchange="changeFontSize(this)" value="${fontSize}">
                      </div>
                  </div>
                  <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">Theme</label>
                      <div class="col-sm-10">
                      <select class="form-control" onchange="changeTheme(this)" value="${Theme}">
                          <option value="white">White</option>
                          <option value="#F8F8FF">GhostWhite</option>
                          <option value="#FAF0E6">Linen</option>
                          <option value="#F0FFFF">Azure</option>
                          <option value="#F5F5F5">WhiteSmoke</option>
                      </select>
                      </div>
                  </div>
                  <div class="form-group row">
                    <button style="margin-left:20px" class="btn btn-outline-success my-2 my-sm-0" type="button" id="submit" >Submit</button>
                  </div>
              </form>
          <div>`
    });

    const submitHandle = async (e)=>{
        let fontSize =  document.querySelector('html').style.fontSize
        let theme = document.body.style.backgroundColor
        fetch('/theme',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                fontSize:fontSize.split('px')[0],
                theme,
            })
        }).then(()=>layer.close(index))
        
    }

    document.querySelector('#submit').addEventListener('click', submitHandle)

    
  });

  const initTheme = async()=>{
    fetch('/theme')
    .then(res=>res.json()).then((res)=>{
        const {fontSize=16,  theme='white'} = res
        document.querySelector('html').style.fontSize = `${fontSize}px` 
        document.body.style.backgroundColor = `${theme}` 
    })
    
    
  }

  function changeFontSize(e) {
    document.querySelector('html').style.fontSize = `${e.value}px`
  }

  function changeTheme(e) {
    document.body.style.backgroundColor = `${e.value}` 
  }


  const close =()=>{
      return false
  }


  initTheme()