$('#login-btn').click(function () {
    let email = $('#email').val();
    let password = $('#password').val();

    let payload = {
        email,
        password
    };

    $.ajax({
        type: 'POST',
        url: '/login',
        data: payload,
        success: isAuthenticed => {
            if (isAuthenticed)
                window.location.href = '/userBoards';                
        },
        error: function (xhr, textStatus, error) {
            console.log('incorrect email or password');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
})