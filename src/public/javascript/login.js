var login = new Vue({
    el:'#login',
    data:{
        loginError:'',
        registerError:'',
        errors: [],
        nameError:'',
        name: null,
        emailError:'',
        email: null,
        passwordError:'',
        password:null,
        confirmPasswordError:'',
        confirmPassword:null,
    },
    methods: {
        checkForm: function (e) {
            this.errors = [];
    
            if (!this.name) {
                this.nameError = "Name required.";
            }else{this.nameError=""}

            if (!this.email) {
                this.emailError = 'Email required.';
            } else if (!this.validEmail(this.email)) {
                this.emailError = 'Valid email required.';
            }else{this.emailError=""}

            if(!this.password){
                this.passwordError = "password required";
            }else{this.passwordError=""}

            if(this.confirmPassword != this.password){
                this.confirmPasswordError = "Password does not match the confirm password.";
            }else{this.confirmPasswordError=""}
           
            if (!this.errors.length) {
                return true;
            }
    
            e.preventDefault();
        },
        validEmail: function (email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }
    }
})
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
            login.loginError = 'Incorrect email or passowrd';
            // console.log('incorrect email or password');
            // console.log(xhr.statusText);
            // console.log(textStatus);
            // console.log(error);
        }
    });
}

function Register() {    
    let email = $('#register-email').val();
    let password = $('#register-password').val();
    let name = $('#register-name').val();

    let payload = {
        email,
        password,
        name
    };
    $.ajax({
        type : 'POST',
        url : '/register',
        data : payload,
        success : data => {
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