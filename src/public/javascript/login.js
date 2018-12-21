function Login() {
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
                window.location.href = '/home';                
        },
        error: function (xhr, textStatus, error) {
            console.log('incorrect email or password');
            console.log(xhr.statusText);
            console.log(textStatus);
            console.log(error);
        }
    });
}

function Register() {    
    let email = $('#register-email').val();
    let password = $('#register-password').val();

    let payload = {
        email,
        password
    };

    $.ajax({
        type : 'POST',
        url : '/register',
        data : payload,
        success : data => {
            console.log(data);
            window.location.href = '/login';
        },
        error : (xhr, exception) => { 
            console.log(xhr.responseText);
        }
    });    
}

$('#login-btn').click(Login);
$('#password').keyup((e) => {
    const code = e.which;
    if (code == 13)
        Login();
});

$('#register-btn').click(Register);
$('#register-confirm-password').keyup((e) => {
    const code = e.which;
    if (code == 13) 
        Register();
});