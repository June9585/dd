

$('#title').on('blur', function () {
    if (!$(this).val()) {
        console.log('不能为空');
        return;
    }
    var username = $(this).val();
    // console.log(username);
})
$('#inpwd').on('blur', function () {
    if (!$(this).val()) {
        console.log('不能为空')
        return;
    }
    var password = $(this).val();
})
$('#enter').on('click', () => {
    var username = $('#title').val();
    var password = $('#inpwd').val() ; 
    $.post("http://127.0.0.1:5555/",
        { username: username, password: password },
        function (data) {
            if(data.code == 0){
                console.log(data.msg);
                localStorage.setItem('token',data.data.token);
                location.href = './index.html';
            }else{
                console.log(data.msg);
            }
           
        }, "json");

})