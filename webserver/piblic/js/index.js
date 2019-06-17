var pageNume = 1;
var pageSize = 5;
var studentName = ''; 

function getindexStudent() {
    $.ajax({
        url: 'http://localhost:5555/student',
        // http://127.0.0.1:5555/
        data: {
            pageNume: pageNume,
            pageSize: pageSize,
            studentName: studentName
        },
        method: 'GET',
        headers: {
            Access_Token: localStorage.getItem('token')
        },
        success: function (data) {
            if (data.code === -2) {
                layer.msg(data.msg);
                return;
            }
            var list = data.data.list;

            console.log(data.data)
            var html = ``;


            $.each(list, (k, v) => {                
                html += `
                        <tr>
                        <tr data-id="${list[k]._id}">
                        <td>${k + 1}</td>
                        <td>${list[k].username}</td>
                        <td>${list[k].sex}</td>
                        <td>${list[k].gender}</td>
                        <td>${list[k].hobbies}</td>
                        <td><button type="button" class="btn btn-info">修改</button>
                          <button type="button" class="btn btn-danger">删除</button>
                          </td>               
                    </tr>
                `; 
            });
            // var page = ``;
            // page = `
            //         <li data-page="${pageNum - 1 < 1 ? 1 : pageNum -1} ">
            //             <a href="javascript:;">&lt;</a>
            //         </li>
            // `;
            // for(var i=1; i <= data.data.totalPage;i++){
            //     page += `
            //         <li data-page="${i}" class="${i === pageNum ? 'active': '' }"><a href="javascript:;">${i}</a></li>
            //     `;
                
            // }
            // page += `
            //         <li data-page="${pageNum+1 > data.data.totalPage ? data.data.totalPage : pageNum+1} ">
            //             <a href="javascript:;">&gt;</a>
            //         </li>
            // `;
            $('#tbody').html(html);
            // $('.page-ul').html(page);
            
        }
    })

}

getindexStudent();